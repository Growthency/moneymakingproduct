"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate, getInitials, absoluteUrl } from "@/lib/utils";
import {
  Star,
  Check,
  Archive,
  Trash2,
  Bookmark,
  BookmarkCheck,
  Copy,
  ExternalLink,
  Filter,
  MessageSquareQuote,
} from "lucide-react";
import toast from "react-hot-toast";

type StatusFilter = "all" | "pending" | "approved" | "archived";

export default function TestimonialsPage() {
  const searchParams = useSearchParams();
  const spaceIdParam = searchParams.get("space");
  const spaces = useQuery(api.spaces.getMySpaces);
  const [selectedSpaceId, setSelectedSpaceId] = useState<Id<"spaces"> | null>(
    spaceIdParam as Id<"spaces"> | null
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const activeSpaceId = selectedSpaceId || spaces?.[0]?._id;

  const testimonials = useQuery(
    api.testimonials.getTestimonialsForSpace,
    activeSpaceId
      ? {
          spaceId: activeSpaceId,
          status: statusFilter === "all" ? undefined : statusFilter,
        }
      : "skip"
  );

  const approve = useMutation(api.testimonials.approveTestimonial);
  const archive = useMutation(api.testimonials.archiveTestimonial);
  const toggleFeatured = useMutation(api.testimonials.toggleFeatured);
  const deleteTestimonial = useMutation(api.testimonials.deleteTestimonial);

  const activeSpace = spaces?.find((s) => s._id === activeSpaceId);

  const handleApprove = async (id: Id<"testimonials">) => {
    await approve({ testimonialId: id });
    toast.success("Testimonial approved ✓");
  };

  const handleArchive = async (id: Id<"testimonials">) => {
    await archive({ testimonialId: id });
    toast.success("Archived");
  };

  const handleDelete = async (id: Id<"testimonials">) => {
    if (!confirm("Delete this testimonial permanently?")) return;
    await deleteTestimonial({ testimonialId: id });
    toast.success("Deleted");
  };

  const handleToggleFeatured = async (id: Id<"testimonials">) => {
    await toggleFeatured({ testimonialId: id });
    toast.success("Updated");
  };

  const copyCollectionLink = () => {
    if (!activeSpace) return;
    navigator.clipboard.writeText(absoluteUrl(`/t/${activeSpace.slug}`));
    toast.success("Collection link copied!");
  };

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500 mt-1">
            Review, approve, and showcase customer feedback.
          </p>
        </div>
        {activeSpace && (
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={copyCollectionLink} className="gap-2">
              <Copy className="w-4 h-4" />
              Copy collection link
            </Button>
            <a href={`/t/${activeSpace.slug}`} target="_blank" rel="noreferrer">
              <Button variant="ghost" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Preview
              </Button>
            </a>
          </div>
        )}
      </div>

      {/* Space selector */}
      {spaces && spaces.length > 1 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {spaces.map((space) => (
            <button
              key={space._id}
              onClick={() => setSelectedSpaceId(space._id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeSpaceId === space._id
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-500/25"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {space.name}
            </button>
          ))}
        </div>
      )}

      {/* Status filter */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-gray-400" />
        {(["all", "pending", "approved", "archived"] as StatusFilter[]).map(
          (status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                statusFilter === status
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* Testimonials grid */}
      {testimonials === undefined ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <EmptyTestimonials spaceSlug={activeSpace?.slug} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t._id}
              testimonial={t}
              onApprove={() => handleApprove(t._id)}
              onArchive={() => handleArchive(t._id)}
              onDelete={() => handleDelete(t._id)}
              onToggleFeatured={() => handleToggleFeatured(t._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  onApprove,
  onArchive,
  onDelete,
  onToggleFeatured,
}: {
  testimonial: {
    _id: Id<"testimonials">;
    authorName: string;
    authorCompany?: string;
    authorRole?: string;
    content: string;
    rating: number;
    status: string;
    featured: boolean;
    _creationTime: number;
  };
  onApprove: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onToggleFeatured: () => void;
}) {
  const statusVariant: Record<string, "warning" | "success" | "default"> = {
    pending: "warning",
    approved: "success",
    archived: "default",
  };

  return (
    <Card className="testimonial-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {getInitials(testimonial.authorName)}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{testimonial.authorName}</p>
            {(testimonial.authorRole || testimonial.authorCompany) && (
              <p className="text-xs text-gray-400">
                {testimonial.authorRole}
                {testimonial.authorRole && testimonial.authorCompany && " · "}
                {testimonial.authorCompany}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={statusVariant[testimonial.status]}>
            {testimonial.status}
          </Badge>
          {testimonial.featured && (
            <Badge variant="purple">⭐ Featured</Badge>
          )}
        </div>
      </div>

      {/* Star rating */}
      <div className="flex gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i <= testimonial.rating
                ? "text-amber-400 fill-amber-400"
                : "text-gray-200 fill-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {formatDate(new Date(testimonial._creationTime).toISOString())}
        </span>

        <div className="flex items-center gap-1">
          {testimonial.status === "pending" && (
            <button
              onClick={onApprove}
              className="p-2 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors"
              title="Approve"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onToggleFeatured}
            className={`p-2 rounded-lg transition-colors ${
              testimonial.featured
                ? "text-amber-500 bg-amber-50"
                : "hover:bg-gray-50 text-gray-400 hover:text-amber-500"
            }`}
            title={testimonial.featured ? "Unfeature" : "Feature"}
          >
            {testimonial.featured ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
          {testimonial.status !== "archived" && (
            <button
              onClick={onArchive}
              className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
              title="Archive"
            >
              <Archive className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onDelete}
            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}

function EmptyTestimonials({ spaceSlug }: { spaceSlug?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-3xl bg-brand-50 flex items-center justify-center mb-6">
        <MessageSquareQuote className="w-10 h-10 text-brand-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No testimonials yet</h3>
      <p className="text-gray-500 max-w-sm mb-6">
        Share your collection link with customers to start receiving testimonials.
      </p>
      {spaceSlug && (
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 max-w-sm">
          <span className="text-sm text-gray-500 truncate">
            proofly.io/t/{spaceSlug}
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(absoluteUrl(`/t/${spaceSlug}`));
              toast.success("Copied!");
            }}
            className="flex-shrink-0 p-1.5 bg-white rounded-lg shadow-sm hover:shadow transition-shadow"
          >
            <Copy className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
}
