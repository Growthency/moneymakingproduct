import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import Stripe from "stripe";

const http = httpRouter();
auth.addHttpRoutes(http);
http.route({ path: "/stripe/webhook", method: "POST", handler: httpAction(async (ctx, request) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-02-24.acacia" });
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) return new Response("No signature", { status: 400 });
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!); }
  catch (err) { return new Response(`Webhook Error: ${err}`, { status: 400 }); }
  switch (event.type) {
    case "checkout.session.completed": { const session = event.data.object as Stripe.Checkout.Session; if (session.subscription && session.customer) { await ctx.runMutation(internal.profiles.updateSubscription, { stripeCustomerId: session.customer as string, stripeSubscriptionId: session.subscription as string, plan: (session.metadata?.plan as "starter"|"growth"|"agency") || "starter" }); } break; }
    case "customer.subscription.deleted": { const subscription = event.data.object as Stripe.Subscription; await ctx.runMutation(internal.profiles.cancelSubscription, { stripeCustomerId: subscription.customer as string }); break; }
    case "customer.subscription.updated": { const subscription = event.data.object as Stripe.Subscription; const priceId = subscription.items.data[0]?.price.id; let plan: "starter"|"growth"|"agency" = "starter"; if (priceId === process.env.STRIPE_GROWTH_PRICE_ID) plan = "growth"; if (priceId === process.env.STRIPE_AGENCY_PRICE_ID) plan = "agency"; await ctx.runMutation(internal.profiles.updateSubscription, { stripeCustomerId: subscription.customer as string, stripeSubscriptionId: subscription.id, plan }); break; }
  }
  return new Response(null, { status: 200 });
}) });
export default http;
