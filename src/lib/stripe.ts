import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-02-24.acacia", typescript: true });
export const PRICING_TIERS = [
  { name: "Starter", price: 19, priceId: process.env.STRIPE_STARTER_PRICE_ID||"" , description: "Perfect for freelancers", features: ["Up to 100 testimonials","3 spaces","All embed widgets","Email request links","CSV export","Remove Proofly branding"], recommended: false, cta: "Start with Starter" },
  { name: "Growth", price: 49, priceId: process.env.STRIPE_GROWTH_PRICE_ID||"" , description: "For growing SaaS", features: ["Unlimited testimonials","10 spaces","AI-powered highlights","Auto social post generator","Stripe integration","Priority support","3 team members"], recommended: true, cta: "Start Growing" },
  { name: "Agency", price: 99, priceId: process.env.STRIPE_AGENCY_PRICE_ID||"" , description: "For agencies", features: ["Everything in Growth","Unlimited spaces","White-label","Unlimited team members","API access","Dedicated Slack support","Custom integrations"], recommended: false, cta: "Scale with Agency" },
];
