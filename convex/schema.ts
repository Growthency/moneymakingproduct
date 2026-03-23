import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  profiles: defineTable({
    userId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    plan: v.union(v.literal("free"),v.literal("starter"),v.literal("growth"),v.literal("agency")),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
  }).index("by_user",["userId"]).index("by_stripe_customer",["stripeCustomerId"]),
  spaces: defineTable({
    userId: v.string(),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
    theme: v.union(v.literal("light"),v.literal("dark")),
    primaryColor: v.string(),
    thankYouMessage: v.string(),
    questionPrompt: v.string(),
    collectCompany: v.boolean(),
    collectRole: v.boolean(),
  }).index("by_user",["userId"]).index("by_slug",["slug"]),
  testimonials: defineTable({
    spaceId: v.id("spaces"),
    authorName: v.string(),
    authorEmail: v.optional(v.string()),
    authorCompany: v.optional(v.string()),
    authorRole: v.optional(v.string()),
    authorAvatar: v.optional(v.string()),
    content: v.string(),
    rating: v.number(),
    status: v.union(v.literal("pending"),v.literal("approved"),v.literal("archived")),
    featured: v.boolean(),
    source: v.string(),
  }).index("by_space",["spaceId"]).index("by_space_status",["spaceId","status"]).index("by_status",["status"]),
  widgets: defineTable({
    spaceId: v.id("spaces"),
    name: v.string(),
    type: v.union(v.literal("carousel"),v.literal("wall"),v.literal("single"),v.literal("badge")),
    showRating: v.boolean(),
    showAvatar: v.boolean(),
    maxItems: v.number(),
    theme: v.union(v.literal("light"),v.literal("dark")),
  }).index("by_space",["spaceId"]),
});
