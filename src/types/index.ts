export type Plan = "free" | "starter" | "growth" | "agency";
export interface Profile { id: string; email: string; full_name: string | null; avatar_url: string | null; plan: Plan; stripe_customer_id: string | null; stripe_subscription_id: string | null; }
export interface Space { id: string; user_id: string; name: string; slug: string; description: string | null; theme: "light" | "dark"; primary_color: string; thank_you_message: string; question_prompt: string; }
export type TestimonialStatus = "pending" | "approved" | "archived";
export interface Testimonial { id: string; space_id: string; author_name: string; author_email: string | null; content: string; rating: number; status: TestimonialStatus; featured: boolean; source: string; }
export interface Widget { id: string; space_id: string; name: string; type: "carousel" | "wall" | "single" | "badge"; settings: Record<string, unknown>; }
