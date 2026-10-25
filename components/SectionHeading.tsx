type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${centered ? "mx-auto max-w-[840px] text-center" : "max-w-[800px]"} ${className}`}>
      {eyebrow && (
        <div className={`mb-3.5 flex items-center gap-3.5 ${centered ? "justify-center" : "text-left"}`}>
          <p className="giving-purpose-heading m-0 whitespace-nowrap font-brand text-[clamp(20px,2.4vw,32px)] font-extrabold italic leading-[1.1] tracking-[-.04em] text-[#00876f]">
            {eyebrow}
          </p>
          <span
            aria-hidden="true"
            className="giving-purpose-rule h-px min-w-[20px] flex-1 max-w-[100px] bg-[#83b9a7]"
          />
          <svg
            aria-hidden="true"
            className="giving-purpose-sparkle h-[17px] w-[17px] shrink-0 text-[#00876f]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="m12 2 2.45 7.55L22 12l-7.55 2.45L12 22l-2.45-7.55L2 12l7.55-2.45L12 2Z" />
          </svg>
        </div>
      )}

      <h2 className="m-0 font-sans text-[clamp(28px,3.5vw,46px)] font-bold leading-[1.15] tracking-[-.035em] text-brand-forest">
        {title}
      </h2>

      {description && (
        <p className="mb-0 mt-3.5 text-[16px] sm:text-[17px] leading-[1.75] text-brand-muted">
          {description}
        </p>
      )}
    </div>
  );
}
