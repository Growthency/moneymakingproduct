"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { PRICING_TIERS } from "@/lib/stripe";
import { Check, CreditCard, User, Zap } from "lucide-react";
import toast from "react-hot-toast";

type Tab = "profile" | "billing";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as Tab | null;
  const [activeTab, setActiveTab] = useState<Tab>(tabParam || "profile");

  const profile = useQuery(api.profiles.getMyProfile);
  const updateProfile = useMutation(api.profiles.updateProfile);
  const [name, setName] = useState(profile?.fullName || "");
  const [saving, setSaving] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({ fullName: name });
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleUpgrade = async (priceId: string, planName: string) => {
    if (!profile) return;
    setCheckoutLoading(priceId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          planName: planName.toLowerCase(),
          customerEmail: profile.email,
          stripeCustomerId: profile.stripeCustomerId,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Checkout failed");
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Failed to start checkout");
    } finally {
      setCheckoutLoading(null);
    }
  };

  const tabs = [
    { id: "profile" as Tab, label: "Profile", icon: User },
    { id: "billing" as Tab, label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and subscription.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit mb-8">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <Card className="max-w-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <Input
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <Input
              label="Email address"
              value={profile?.email || ""}
              disabled
              hint="Email cannot be changed"
            />
            <div className="pt-2">
              <Button type="submit" loading={saving}>
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      )}

      {activeTab === "billing" && (
        <div>
          {/* Current plan */}
          <Card className="mb-8 max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                <Zap className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Current Plan</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant={profile?.plan === "free" ? "default" : "purple"}>
                    {profile?.plan?.toUpperCase() || "FREE"}
                  </Badge>
                  {profile?.plan !== "free" && (
                    <span className="text-xs text-gray-400">Active subscription</span>
                  )}
                </div>
              </div>
            </div>
            {profile?.plan === "free" && (
              <p className="text-sm text-gray-500">
                You&apos;re on the free plan. Upgrade to unlock unlimited testimonials, AI features, and more.
              </p>
            )}
          </Card>

          {/* Pricing tiers */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {profile?.plan === "free" ? "Upgrade Your Plan" : "Change Plan"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            {PRICING_TIERS.map((tier) => {
              const isCurrentPlan = profile?.plan === tier.name.toLowerCase();
              return (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl border-2 p-6 ${
                    tier.recommended
                      ? "border-brand-500 bg-brand-50"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">{tier.name}</h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-bold text-gray-900">${tier.price}</span>
                      <span className="text-gray-400 text-sm">/month</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{tier.description}</p>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={isCurrentPlan ? "ghost" : tier.recommended ? "primary" : "outline"}
                    disabled={isCurrentPlan}
                    loading={checkoutLoading === tier.priceId}
                    onClick={() => !isCurrentPlan && handleUpgrade(tier.priceId, tier.name)}
                  >
                    {isCurrentPlan ? "Current Plan" : tier.cta}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
