"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { cn } from "@/lib/utils";
import {
  Star, LayoutDashboard, MessageSquareQuote, Code2, Settings, LogOut, Plus, Zap, ChevronUp,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/testimonials", icon: MessageSquareQuote, label: "Testimonials" },
  { href: "/dashboard/widgets", icon: Code2, label: "Widgets & Embeds" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuthActions();
  const profile = useQuery(api.profiles.getMyProfile);
  const [signingOut, setSigningOut] = useState(false);
  const handleSignOut = async () => { setSigningOut(true); try { await signOut(); router.push("/"); } catch { toast.error("Sign out failed"); } finally { setSigningOut(false); } };
  return (
    <aside className="w-64 min-h-screen bg-gray-950 flex flex-col border-r border-gray-800">
      <div className="p-6 border-b border-gray-800"><Link href="/dashboard" className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"><Star className="w-4 h-4 text-white fill-white" /></div><span className="text-lg font-bold text-white">Proofly</span></Link></div>
      <div className="p-4 border-b border-gray-800"><Link href="/dashboard?new=true" className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"><Plus className="w-4 h-4" />New Space</Link></div>
      <nav className="flex-1 p-4 space-y-1">{NAV_ITEMS.map((item) => { const isActive = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href); return (<Link key={item.href} href={item.href} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all", isActive ? "bg-indigo-600/20 text-indigo-400 border border-indigo-600/30" : "text-gray-400 hover:text-white hover:bg-white/5")}><item.icon className="w-4 h-4" />{item.label}</Link>); })}</nav>
      {profile?.plan === "free" && (<div className="mx-4 mb-4 p-4 rounded-xl bg-gradient-to-br from-indigo-900 to-purple-900 border border-indigo-700"><div className="flex items-center gap-2 mb-2"><Zap className="w-4 h-4 text-indigo-400" /><span className="text-sm font-semibold text-white">Upgrade to Pro</span></div><p className="text-xs text-gray-400 mb-3">Unlock AI features, unlimited testimonials, and more.</p><Link href="/dashboard/settings?tab=billing" className="block text-center text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg">View Plans →</Link></div>)}
      <div className="p-4 border-t border-gray-800"><div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 group"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">{profile?.fullName?.[0]?.toUpperCase() || profile?.email?.[0]?.toUpperCase() || "U"}</div><div className="flex-1 min-w-0"><p className="text-sm font-medium text-white truncate">{profile?.fullName || "Account"}</p><span className="text-xs text-gray-400">{profile?.plan || "free"}</span></div><button onClick={handleSignOut} disabled={signingOut} className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-white/10" title="Sign out">{signingOut ? <ChevronUp className="w-4 h-4 text-gray-400 animate-spin" /> : <LogOut className="w-4 h-4 text-gray-400" />}</button></div></div>
    </aside>
  );
}
