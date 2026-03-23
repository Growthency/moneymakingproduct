import Link from "next/link";
import {
  Star,
  Check,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Code2,
  Users,
  TrendingUp,
  MessageSquareQuote,
  Sparkles,
  Globe,
} from "lucide-react";
import { PRICING_TIERS } from "@/lib/stripe";

const FEATURES = [
  {
    icon: Zap,
    title: "Collect in 60 seconds",
    description:
      "Create a beautiful collection page in under a minute. Share the link anywhere — email, Slack, your product itself.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Sparkles,
    title: "AI-powered highlights",
    description:
      "Our AI automatically extracts the most compelling quotes and reformats them for social media, email, and your website.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Code2,
    title: "One-line embeds",
    description:
      "Drop a single script tag to show a beautiful testimonial wall, carousel, or badge anywhere on your site.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Shield,
    title: "Moderate before publishing",
    description:
      "Every testimonial waits in your inbox until you approve it. Full control over what goes live.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Globe,
    title: "Wall of Love page",
    description:
      "Every space comes with a beautiful, shareable Wall of Love page you can link to from anywhere.",
    color: "text-brand-600",
    bg: "bg-brand-50",
  },
  {
    icon: BarChart3,
    title: "Track what works",
    description:
      "See which testimonials get the most engagement and understand what customers love about your product.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
];

const TESTIMONIALS = [
  {
    name: "Marcus Chen",
    role: "Founder",
    company: "DevFlow",
    avatar: "MC",
    rating: 5,
    content:
      "I went from 0 to 34 approved testimonials in my first week. My landing page conversion rate jumped from 2.3% to 7.1%. Proofly pays for itself 100x over.",
  },
  {
    name: "Sarah Okonkwo",
    role: "Growth Lead",
    company: "Notaku",
    avatar: "SO",
    rating: 5,
    content:
      "Setting up took 3 minutes. I shared the link in my welcome email and testimonials just started coming in. The embed widget looks stunning on our site.",
  },
  {
    name: "Jaime Rivera",
    role: "Freelance Designer",
    company: "",
    avatar: "JR",
    rating: 5,
    content:
      "As a freelancer I needed something simple. Proofly is exactly that — beautiful collection pages, easy management, no fuss. My clients love the experience.",
  },
  {
    name: "Priya Mehta",
    role: "CEO",
    company: "LearnAI",
    avatar: "PM",
    rating: 5,
    content:
      "The Wall of Love feature is a killer. I linked to it in my cold outreach emails and my reply rate went up by 40%. Instant credibility.",
  },
  {
    name: "Tom Hartley",
    role: "Indie Hacker",
    company: "",
    avatar: "TH",
    rating: 5,
    content:
      "Ditched Testimonial.to for Proofly. Same quality, better UX, and the AI social post generator alone is worth the price. Don't sleep on this.",
  },
  {
    name: "Lisa Tran",
    role: "Marketing Director",
    company: "PulseHQ",
    avatar: "LT",
    rating: 5,
    content:
      "We manage testimonials for 6 brands through Proofly's agency plan. White-label, multi-space, clean dashboard. Exactly what we needed.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Create a Space",
    description:
      "Give your product a name. Proofly generates a beautiful, branded collection page instantly.",
  },
  {
    step: "02",
    title: "Share the link",
    description:
      "Copy your collection link and share it in your welcome email, support chats, or product itself.",
  },
  {
    step: "03",
    title: "Approve & showcase",
    description:
      "Review submissions, approve the good ones, and embed them anywhere with one line of code.",
  },
];

const FAQS = [
  {
    q: "How is Proofly different from Testimonial.to?",
    a: "Proofly has a cleaner UI, better embed widgets, AI social post generation (Growth+), and agency multi-brand support — all at a better price point.",
  },
  {
    q: "Does the free plan remove Proofly branding?",
    a: 'The free plan includes a small "Powered by Proofly" link. Paid plans remove branding completely.',
  },
  {
    q: "Can I collect video testimonials?",
    a: "Video testimonials are on our roadmap and coming in Q2 2026. Text and star rating testimonials are fully supported now.",
  },
  {
    q: "What happens when I hit the free plan limit?",
    a: "You can still view existing testimonials, but new submissions will be held until you upgrade or archive old ones.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. We use Convex's enterprise-grade infrastructure with end-to-end encryption and GDPR compliance.",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Proofly</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              How it works
            </Link>
            <Link href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all active:scale-[0.98]"
            >
              Start free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-brand-100 to-purple-100 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          {/* Social proof pill */}
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4" />
            Trusted by 2,000+ founders and creators
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
            Turn happy customers into{" "}
            <span className="gradient-text">your best salespeople</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Proofly makes it effortless to collect, manage, and showcase
            testimonials that build trust and convert visitors into customers.
            Set up in 60 seconds, free forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 transition-all active:scale-[0.98] text-lg"
            >
              Start collecting for free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/wall/demo"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold text-lg group"
            >
              See a live example
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            {[
              { value: "47,000+", label: "Testimonials collected" },
              { value: "3.2x", label: "Avg conversion lift" },
              { value: "2,000+", label: "Happy founders" },
              { value: "60 sec", label: "Setup time" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-black text-gray-900">{value}</div>
                <div className="text-sm text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials marquee preview */}
      <section className="py-12 bg-gray-50 overflow-hidden border-y border-gray-100">
        <p className="text-center text-sm font-medium text-gray-400 mb-8 uppercase tracking-widest">
          What founders are saying about Proofly
        </p>
        <div className="flex gap-4 overflow-hidden">
          <div className="flex gap-4 animate-[scroll_30s_linear_infinite] whitespace-nowrap">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div
                key={i}
                className="inline-flex flex-col gap-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm w-72 flex-shrink-0 whitespace-normal"
              >
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}{t.company && ` · ${t.company}`}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-brand-600 font-semibold text-sm mb-4">
              <Zap className="w-4 h-4" />
              Everything you need
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Social proof, simplified
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Proofly takes care of the entire testimonial lifecycle — from
              collection to conversion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Up and running in 3 steps
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              No developers, no complicated setup, no waiting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={step.step} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-brand-600 to-transparent z-10" />
                )}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-brand-500/30 transition-all">
                  <div className="text-4xl font-black text-brand-500 mb-4 opacity-60">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-500">
              Start free. Upgrade when you&apos;re ready. No surprises.
            </p>
          </div>

          {/* Free plan */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-6 max-w-sm mx-auto text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Free Forever</h3>
            <div className="text-4xl font-black text-gray-900 mb-2">$0</div>
            <p className="text-gray-500 text-sm mb-4">
              10 testimonials · 1 space · Basic widgets
            </p>
            <Link
              href="/signup"
              className="inline-block w-full py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
            >
              Get started free
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-7 border-2 ${
                  tier.recommended
                    ? "border-brand-500 shadow-xl shadow-brand-500/20"
                    : "border-gray-100"
                }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-black text-gray-900">
                      ${tier.price}
                    </span>
                    <span className="text-gray-400 text-sm">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1.5">{tier.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`block w-full py-3.5 rounded-xl font-semibold text-center transition-all active:scale-[0.98] ${
                    tier.recommended
                      ? "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/25"
                      : "border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-8">
            All plans include a 14-day free trial. No credit card required to start.
          </p>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Loved by founders worldwide
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Star key={j} className="w4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w410 h-10 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">
                      {t.role}
                      {t.company && ` · ${t.company}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-brand-600 to-purple-700">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to grow with social proof?
          </h2>
          <p className="text-brand-100 text-xl mb-10 max-w-xl mx-auto">
            Join 2,000+ founders collecting testimonials with Proofly. Start free, upgrade when you&apos;re ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2.5 bg-white text-brand-700 font-bold px-8 py-4 rounded-2xl shadow-xl hover:bg-gray-50 transition-colors active:scale-[0.98] text-lg"
            >
              Start collecting for free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-brand-200 text-sm">
              No credit card required · Free forever plan
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
            <div className="max-w-xs">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="text-lg font-bold text-white">Proofly</span>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed">
                The simplest way to collect, manage, and showcase customer
                testimonials that convert.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><a href="mailto:hello@proofly.io" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © 2026 Proofly. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w4 h-4" />
              <TrendingUp className="w4 h-4" />
              <MessageSquareQuote className="w-4 h-4" />
              <span>Built with ❤️ for founders</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
