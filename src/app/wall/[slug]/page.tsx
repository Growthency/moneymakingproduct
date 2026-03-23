"use client";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Star, ExternalLink } from "lucide-react";
import { getInitials, formatDate } from "@/lib/utils";
import Link from "next/link";
export default function WallOfLovePage() {
  const params = useParams();
  const slug = params.slug as string;
  const space = useQuery(api.spaces.getSpaceBySlug, { slug });
  const testimonials = useQuery(api.testimonials.getApprovedTestimonials, space?._id ? { spaceId: space._id } : "skip");
  if (space === undefined || testimonials === undefined) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" /></div>;
  if (!space) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Page not found</p></div>;
  const avgRating = testimonials.length > 0 ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length : 0;
  const pc = space.primaryColor || "#6366f1";
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16 px-8 text-center text-white" style={{ background: `linear-gradient(135deg, ${pc}, ${pc}cc)` }}>
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-white/20 text-2xl font-bold">{space.name[0].toUpperCase()}</div>
          <h1 className="text-4xl font-bold mb-3">Wall of Love ❤️</h1>
          <p className="text-white/80 text-lg mb-6">What customers are saying about {space.name}</p>
          {testimonials.length > 0 && <div className="flex items-center justify-center gap-8"><div><div className="text-3xl font-bold">{testimonials.length}</div><div className="text-white/70 text-sm">Reviews</div></div><div><div className="flex items-center gap-1 justify-center"><span className="text-3xl font-bold">{avgRating.toFixed(1)}</span><Star className="w-6 h-6 fill-amber-400 text-amber-400" /></div><div className="text-white/70 text-sm">Avg rating</div></div></div>}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {testimonials.length === 0 ? <div className="text-center py-16"><p className="text-gray-400 text-lg">No testimonials yet.</p><Link href={`/t/${slug}`} className="mt-4 inline-flex items-center gap-2 text-indigo-600 font-medium">Be the first to leave a review →</Link></div> :
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">{testimonials.map((t) => (<div key={t._id} className="break-inside-avoid mb-4"><div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"><div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(i=><Star key={i} className={`w-4 h-4 ${i<=t.rating?"text-amber-400 fill-amber-400":"text-gray-200 fill-gray-200"}`} />)}</div><p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{t.content}&rdquo;</p><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background:`linear-gradient(135deg,${pc},${pc}99)`}}>{getInitials(t.authorName)}</div><div><p className="font-semibold text-gray-900 text-sm">{t.authorName}</p>{(t.authorRole||t.authorCompany)&&<p className="text-xs text-gray-400">{t.authorRole}{t.authorRole&&t.authorCompany&&" · "}{t.authorCompany}</p>}</div><div className="ml-auto text-xs text-gray-300">{formatDate(new Date(t._creationTime).toISOString())}</div></div></div></div>))}</div>}
        <div className="mt-12 rounded-3xl p-8 text-center text-white" style={{background:`linear-gradient(135deg,${pc},${pc}cc)`}}>
          <h3 className="text-2xl font-bold mb-2">Share your experience</h3><p className="text-white/80 mb-6">Have you used {space.name}? We&apos;d love to hear from you.</p>
          <Link href={`/t/${slug}`} className="inline-flex items-center gap-2 bg-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-50" style={{color:pc}}>Leave a Testimonial<ExternalLink className="w-4 h-4" /></Link>
        </div>
      </div>
      <div className="text-center py-6 border-t border-gray-100"><p className="text-xs text-gray-400">Powered by <a href="https://proofly.io" className="font-medium hover:text-indigo-600">Proofly</a></p></div>
    </div>
  );
}
