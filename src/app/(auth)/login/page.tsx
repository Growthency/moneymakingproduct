"use client";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Star } from "lucide-react";

export default function LoginPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const handleLogin = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); try { await signIn("password", { email, password, flow: "signIn" }); router.push("/dashboard"); } catch { toast.error("Invalid email or password."); } finally { setLoading(false); } };
  const handleGoogleLogin = async () => { setGoogleLoading(true); try { await signIn("google"); } catch { toast.error("Google sign-in failed."); setGoogleLoading(false); } };
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-10"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg"><Star className="w-5 h-5 text-white fill-white" /></div><span className="text-xl font-bold text-gray-900">Proofly</span></Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-8">Sign in to your Proofly account.</p>
          <Button variant="outline" className="w-full mb-6 gap-3" onClick={handleGoogleLogin} loading={googleLoading}>
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </Button>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input label="Email address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            <Button type="submit" className="w-full" size="lg" loading={loading}>Sign In</Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">Don&apos;t have an account? <Link href="/signup" className="text-indigo-600 font-semibold">Start for free</Link></p>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-800 p-12">
        <div className="max-w-md text-white"><h2 className="text-4xl font-bold mb-6">Social proof that converts visitors into customers.</h2><div className="bg-white/10 rounded-2xl p-6 border border-white/20"><div className="flex gap-1 mb-3">{[1,2,3,4,5].map(i=><Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div><p className="text-white/90 text-sm mb-4">&ldquo;Proofly helped me collect 47 testimonials in my first week. Conversion went from 2.1% to 6.8%.&rdquo;</p><p className="text-white/60 text-xs">Jake Morrison — Founder, LaunchKit</p></div></div>
      </div>
    </div>
  );
}
