-- Persistent rate-limit buckets for the admin login endpoint.
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;

CREATE TABLE IF NOT EXISTS private.admin_login_rate_limits (
  bucket_hash TEXT PRIMARY KEY CHECK (bucket_hash ~ '^[a-f0-9]{64}$'),
  window_started_at TIMESTAMPTZ NOT NULL,
  attempts INTEGER NOT NULL CHECK (attempts > 0)
);

CREATE INDEX IF NOT EXISTS admin_login_rate_limits_window_started_idx
  ON private.admin_login_rate_limits (window_started_at);

ALTER TABLE private.admin_login_rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE private.admin_login_rate_limits FROM PUBLIC, anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.consume_admin_login_rate_limit(
  p_bucket_hash TEXT,
  p_max_attempts INTEGER,
  p_window_seconds INTEGER
)
RETURNS TABLE (allowed BOOLEAN, retry_after_seconds INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_now TIMESTAMPTZ := pg_catalog.clock_timestamp();
  v_window_started_at TIMESTAMPTZ;
  v_attempts INTEGER;
  v_allowed BOOLEAN;
  v_retry_after_seconds INTEGER;
BEGIN
  IF p_bucket_hash IS NULL OR p_bucket_hash !~ '^[a-f0-9]{64}$'
     OR p_max_attempts < 1 OR p_window_seconds < 1 THEN
    RAISE EXCEPTION 'Invalid rate-limit parameters';
  END IF;

  DELETE FROM private.admin_login_rate_limits
  WHERE window_started_at < v_now - INTERVAL '1 day';

  INSERT INTO private.admin_login_rate_limits AS buckets
    (bucket_hash, window_started_at, attempts)
  VALUES (p_bucket_hash, v_now, 1)
  ON CONFLICT (bucket_hash) DO UPDATE
  SET window_started_at = CASE
        WHEN buckets.window_started_at + pg_catalog.make_interval(secs => p_window_seconds) <= v_now
          THEN v_now
        ELSE buckets.window_started_at
      END,
      attempts = CASE
        WHEN buckets.window_started_at + pg_catalog.make_interval(secs => p_window_seconds) <= v_now
          THEN 1
        ELSE buckets.attempts + 1
      END
  RETURNING window_started_at, attempts
  INTO v_window_started_at, v_attempts;

  v_allowed := v_attempts <= p_max_attempts;
  IF v_allowed THEN
    v_retry_after_seconds := 0;
  ELSE
    v_retry_after_seconds := GREATEST(
      1,
      CEIL(EXTRACT(EPOCH FROM (
        v_window_started_at + pg_catalog.make_interval(secs => p_window_seconds) - v_now
      )))::INTEGER
    );
  END IF;

  RETURN QUERY SELECT v_allowed, v_retry_after_seconds;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_admin_login_rate_limit(TEXT, INTEGER, INTEGER)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_admin_login_rate_limit(TEXT, INTEGER, INTEGER)
  TO service_role;

NOTIFY pgrst, 'reload schema';
