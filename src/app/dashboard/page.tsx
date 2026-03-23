"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { generateSlug, absoluteUrl } from "@/lib/utils";
import {
  Plus,
  MessageSquareQuote,
  Star,
  TrendingUp,
  ExternalLink,
  Copy,
  Layers,
  ChevronRight,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Id } from "../../../convex/_generated/dataModel";

export default function DashboardPage() {
  const spaces = useQuery(api.spaces.getMySpaces);
  const profile = useQuery(api.profiles.getMyProfile);
  const createSpace = useMutation(api.spaces.createSpace);

  const [showNewSpace, setShowNewSpace] = useState(false);
  const [spaceName, setSpaceName] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreateSpace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spaceName.trim()) return;

    setCreating(true);
    try {
      const slug = generateSlug(spaceName);
      await createSpace({
        name: spaceName,
        slug,
        theme: "light",
        primaryColor: "#6366f1",
        thankYouMessage: "Thank you so much! Your testimonial means the world to us 🙏",
        questionPrompt: `How has ${spaceName} helped you? What results did you get?`,
        collectCompany: true,
        collectRole: true,
      });
      toast.success(`Space "${spaceName}" created! 🎉`);
      setSpaceName("");
      setShowNewSpace(false);
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Failed to create space");
    } finally {
      setCreating(false);
    }
  };

  const copyCollectionLink = (slug: string) => {
    const url = absoluteUrl(`/t/${slug}`);
    navigator.clipboard.writeText(url);
    toast.success("Collection link copied!");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back{profile?.fullName ? `, ${profile.fullName.split(" ")[0]}` : ""}! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your testimonial spaces and track your social proof.
          </p>
        </div>
        <Button
          onClick={() => setShowNewSpace(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Space
        </Button>
      </div>

      {/* New Space Modal */}
      {showNewSpace && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md relative">
            <button
              onClick={() => setShowNewSpace(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>

            <div className="mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-brand-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Create a Space</h2>
              <p className="text-gray-500 text-sm mt-1">
                A space is a collection page for one product or brand.
              </p>
            </div>

            <form onSubmit={handleCreateSpace} className="space-y-4">
              <Input
                label="Product or brand name"
                placeholder="e.g. My SaaS App, Portfolio, Agency Name"
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
                required
                autoFocus
              />
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowNewSpace(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  loading={creating}
                  disabled={!spaceName.trim()}
                >
                  Create Space
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={<Layers className="w-5 h-5 text-brand-600" />}
          label="Spaces"
          value={spaces?.length || 0}
          color="bg-brand-50"
        />
        <StatCard
          icon={<MessageSquareQuote className="w-5 h-5 text-green-600" />}
          label="Total Testimonials"
          value="—"
          color="bg-green-50"
        />
        <StatCard
          icon={<Star className="w-5 h-5 text-amber-500" />}
          label="Avg Rating"
          value="—"
          color="bg-amber-50"
        />
      </div>

      {/* Spaces list */}
      {spaces === undefined ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : spaces.length === 0 ? (
        <EmptyState onCreateSpace={() => setShowNewSpace(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spaces.map((space) => (
            <SpaceCard
              key={space._id}
              space={space}
              onCopyLink={() => copyCollectionLink(space.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </Card>
  );
}

function SpaceCard({
  space,
  onCopyLink,
}: {
  space: { _id: Id<"spaces">; name: string; slug: string; _creationTime: number };
  onCopyLink: () => void;
}) {
  return (
    <Card hover className="group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
          {space.name[0].toUpperCase()}
        </div>
        <Badge variant="purple">Active</Badge>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-1">{space.name}</h3>
      <p className="text-sm text-gray-400 mb-4 font-mono">proofly.io/t/{space.slug}</p>

      <div className="flex items-center gap-2">
        <button
          onClick={onCopyLink}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-medium transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
          Copy link
        </button>
        <a
          href={`/t/${space.slug}`}
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <Link
          href={`/dashboard/testimonials?space=${space._id}`}
          className="flex items-center gap-1 py-2 px-3 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-medium transition-colors"
        >
          Manage
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
}

function EmptyState({ onCreateSpace }: { onCreateSpace: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-3xl bg-brand-50 flex items-center justify-center mb-6">
        <TrendingUp className="w-10 h-10 text-brand-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Create your first Space
      </h3>
      <p className="text-gray-500 max-w-sm mb-8">
        A Space is a collection page for your product or brand. Share the link and start collecting testimonials in minutes.
      </p>
      <Button onClick={onCreateSpace} size="lg" className="gap-2">
        <Plus className="w-5 h-5" />
        Create Your First Space
      </Button>
    </div>
  );
}
