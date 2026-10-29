export type TeamMember = {
  id?: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  image?: string;
  department?: string;
  order_index?: number;
  is_published?: boolean;
};
