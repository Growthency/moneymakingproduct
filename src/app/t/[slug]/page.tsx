"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Star, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;

  const space = useQuery(api.spaces.getSpaceBySlug, { slug });
  const submitTestimonial = useMutation(api.testimonials.submitTestimonial);

  const [step, setStep] = useState<"form" | "success" | "error">("form");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!space || !name.trim() || !content.trim()) return;
    if (content.length < 20) {
      toast.error("Please write at least 20 characters");
      return;
    }

    setSubmitting(true);
    try {
      await submitTestimonial({
        spaceId: space._id,
        authorName: name.trim(),
        authorEmail: email.trim() || undefined,
        authorCompany: company.trim() || undefined,
        authorRole: role.trim() || undefined,
        content: content.trim(),
        rating,
      });
      setStep("success");
    } catch (err) {
      console.error(err);
      setStep("error");
    } finally {
      setSubmitting(false);
    }
  };

  if (space === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-purple-50">
        <div className="w-10 h-10 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
      </div>
    );
  }

  if (space === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Page not found</h1>
          <p className="text-gray-500">This testimonial collection page doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const primaryColor = space.primaryColor || "#6366f1";

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #f5f0ff 100%)" }}>
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {space.thankYouMessage}
          </h1>
          <p className="text-gray-500 mb-8">
            Your testimonial has been submitted and is awaiting review. We appreciate you taking the time to share your experience!
          </p>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 py-12"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}15 0%, ${primaryColor}08 100%)`,
      }}
    >
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          {space.logoUrl ? (
            <img
              src={space.logoUrl}
              alt={space.name}
              className="w-16 h-16 rounded-2xl object-cover mx-auto mb-4 shadow-lg"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-white text-2xl font-bold"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)` }}
            >
              {space.name[0].toUpperCase()}
            </div>
          )}
          <h1 className="text-2xl font-bold text-gray-900">{space.name}</h1>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            Share your experience to help others discover what {space.name} can do.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          {/* Question prompt */}
          <div
            className="rounded-xl p-4 mb-6 text-sm"
            style={{ background: `${primaryColor}10`, color: primaryColor }}
          >
            <span className="font-medium">✨ </span>
            {space.questionPrompt}
          </div>

          {/* Star rating */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Your rating</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setHoveredRating(i)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(i)}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    className={`w-9 h-9 transition-colors ${
                      i <= (hoveredRating || rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200 fill-gray-200"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Testimonial content */}
            <Textarea
              label="Your testimonial"
              placeholder="Tell us about your experience, the results you got, what you love most..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              required
              hint={`${content.length} characters${content.length < 20 ? " (min 20)" : " ✓"}`}
            />

            {/* Author info */}
            <Input
              label="Your name"
              placeholder="Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Email (optional)"
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              hint="Your email won't be displayed publicly"
            />

            {space.collectCompany && (
              <Input
                label="Company (optional)"
                placeholder="Acme Inc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            )}

            {space.collectRole && (
              <Input
                label="Job title (optional)"
                placeholder="CEO, Freelancer, Developer..."
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting || !name.trim() || !content.trim()}
                className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] shadow-lg"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)` }}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Testimonial ✨"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Powered by */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Powered by{" "}
          <a href="https://proofly.io" className="hover:text-brand-600 font-medium transition-colors">
            Proofly
          </a>
        </p>
      </div>
    </div>
  );
}
