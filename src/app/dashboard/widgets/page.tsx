"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { absoluteUrl } from "@/lib/utils";
import {
  Code2,
  Copy,
  Trash2,
  Plus,
  LayoutGrid,
  Columns2,
  Square,
  Award,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const WIDGET_TYPES = [
  {
    type: "wall" as const,
    icon: LayoutGrid,
    label: "Wall of Love",
    desc: "Display all testimonials in a beautiful masonry grid",
  },
  {
    type: "carousel" as const,
    icon: Columns2,
    label: "Carousel",
    desc: "Rotating testimonial carousel for hero sections",
  },
  {
    type: "single" as const,
    icon: Square,
    label: "Single Quote",
    desc: "One powerful testimonial with rich formatting",
  },
  {
    type: "badge" as const,
    icon: Award,
    label: "Rating Badge",
    desc: "Compact star rating badge — perfect for headers",
  },
];

export default function WidgetsPage() {
  const spaces = useQuery(api.spaces.getMySpaces);
  const [selectedSpaceId, setSelectedSpaceId] = useState<Id<"spaces"> | null>(null);
  const [showCreator, setShowCreator] = useState(false);
  const [selectedType, setSelectedType] = useState<"wall" | "carousel" | "single" | "badge">("wall");

  const activeSpaceId = selectedSpaceId || spaces?.[0]?._id;
  const widgets = useQuery(
    api.widgets.getWidgetsForSpace,
    activeSpaceId ? { spaceId: activeSpaceId } : "skip"
  );

  const createWidget = useMutation(api.widgets.createWidget);
  const deleteWidget = useMutation(api.widgets.deleteWidget);

  const generateEmbedCode = (widgetId: Id<"widgets">, spaceSlug: string) => {
    const src = absoluteUrl(`/embed/${spaceSlug}/${widgetId}`);
    return `<script src="${absoluteUrl('/widget.js')}" data-proofly="${widgetId}" data-space="${spaceSlug}" async></script>`;
  };

  const handleCreate = async () => {
    if (!activeSpaceId) return;
    const space = spaces?.find((s) => s._id === activeSpaceId);
    if (!space) return;

    await createWidget({
      spaceId: activeSpaceId,
      name: `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Widget`,
      type: selectedType,
      showRating: true,
      showAvatar: true,
      maxItems: 10,
      theme: "light",
    });
    toast.success("Widget created!");
    setShowCreator(false);
  };

  const handleDelete = async (id: Id<"widgets">) => {
    if (!confirm("Delete this widget?")) return;
    await deleteWidget({ widgetId: id });
    toast.success("Widget deleted");
  };

  const copyEmbed = (widgetId: Id<"widgets">) => {
    const space = spaces?.find((s) => s._id === activeSpaceId);
    if (!space) return;
    const code = generateEmbedCode(widgetId, space.slug);
    navigator.clipboard.writeText(code);
    toast.success("Embed code copied!");
  };

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Widgets & Embeds</h1>
          <p className="text-gray-500 mt-1">
            Generate embed codes to showcase testimonials on any website.
          </p>
        </div>
        <Button onClick={() => setShowCreator(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Widget
        </Button>
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
                  ? "bg-brand-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {space.name}
            </button>
          ))}
        </div>
      )}

      {/* Widget type selector modal */}
      {showCreator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg relative">
            <button
              onClick={() => setShowCreator(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Choose Widget Type</h2>
            <p className="text-gray-500 text-sm mb-6">
              Select how you want to display your testimonials.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {WIDGET_TYPES.map(({ type, icon: Icon, label, desc }) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedType === type
                      ? "border-brand-500 bg-brand-50"
                      : "border-gray-100 hover:border-brand-200"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 mb-2 ${
                      selectedType === type ? "text-brand-600" : "text-gray-400"
                    }`}
                  />
                  <p className="font-semibold text-gray-900 text-sm">{label}</p>
                  <p className="text-xs text-gray-400 mt-1">{desc}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setShowCreator(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCreate} className="flex-1">
                Create Widget
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Widgets list */}
      {widgets === undefined ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : widgets.length === 0 ? (
        <EmptyWidgets onCreateWidget={() => setShowCreator(true)} />
      ) : (
        <div className="space-y-4">
          {widgets.map((widget) => {
            const space = spaces?.find((s) => s._id === widget.spaceId);
            const embedCode = space
              ? generateEmbedCode(widget._id, space.slug)
              : "";

            const typeInfo = WIDGET_TYPES.find((t) => t.type === widget.type);

            return (
              <Card key={widget._id}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {typeInfo && (
                      <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                        <typeInfo.icon className="w-5 h-5 text-brand-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">{widget.name}</p>
                      <Badge variant="purple" className="mt-1">
                        {widget.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => copyEmbed(widget._id)}
                      className="gap-2"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy Code
                    </Button>
                    <button
                      onClick={() => handleDelete(widget._id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Embed code preview */}
                <div className="bg-gray-950 rounded-xl p-4 font-mono text-xs text-green-400 overflow-x-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-500 text-xs">Embed code</span>
                  </div>
                  <code className="break-all">{embedCode}</code>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EmptyWidgets({ onCreateWidget }: { onCreateWidget: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-3xl bg-brand-50 flex items-center justify-center mb-6">
        <Code2 className="w-10 h-10 text-brand-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No widgets yet</h3>
      <p className="text-gray-500 max-w-sm mb-6">
        Create a widget and paste the embed code anywhere on your website to showcase testimonials.
      </p>
      <Button onClick={onCreateWidget} className="gap-2">
        <Plus className="w-4 h-4" />
        Create Your First Widget
      </Button>
    </div>
  );
}
