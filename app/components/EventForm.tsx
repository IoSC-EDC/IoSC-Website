"use client";

import React, { useState } from "react";
import { createEvent, EventData } from "../../lib/api";
import { CalendarDays, MapPin, Tag, Link as LinkIcon, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface EventFormProps {
  onSuccess?: () => void;
}

export default function EventForm({ onSuccess }: EventFormProps) {
  const [formData, setFormData] = useState<EventData>({
    title: "",
    eventType: "Hackathon",
    description: "",
    location: "USAR, GGSIPU EDC",
    startDate: "",
    endDate: "",
    registrationLink: "",
    accentColor: "#0068b5",
    isArchived: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Convert HTML datetime-local format to ISO string format required by API
      const payload: EventData = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
        registrationLink: formData.registrationLink || undefined,
      };

      await createEvent(payload);
      setMessage({ type: "success", text: "Event created successfully in PostgreSQL!" });
      setFormData({
        title: "",
        eventType: "Hackathon",
        description: "",
        location: "USAR, GGSIPU EDC",
        startDate: "",
        endDate: "",
        registrationLink: "",
        accentColor: "#0068b5",
        isArchived: false,
      });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to connect to backend server." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="xp-dialog max-w-2xl mx-auto">
      <div className="xp-dialog-header">
        <div className="flex items-center gap-3">
          <div className="p-1 bg-white/20 rounded-sm"><CalendarDays className="w-5 h-5" /></div>
          <div>
            <div className="text-sm font-bold tracking-wide">Create New IoSC Event</div>
            <div className="text-[11px] text-slate-200">Post a new hackathon, workshop, or campus event to PostgreSQL</div>
          </div>
        </div>
        <div className="text-[11px] text-slate-200">Intel oneAPI Student Club event form</div>
      </div>

      <div className="xp-dialog-body">
        {message && (
          <div className={`p-3 rounded-sm flex items-center gap-3 mb-4 ${
            message.type === "success" ? "bg-emerald-100 border border-emerald-300 text-emerald-900" : "bg-rose-100 border border-rose-300 text-rose-900"
          }`}>
            {message.type === "success" ? <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />}
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AzinHack '25"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full xp-form-input"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Event Type *
              </label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full xp-form-input"
              >
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Workshop</option>
                <option value="Tech event">Tech event</option>
                <option value="Bootcamp">Bootcamp</option>
                <option value="Speaker session">Speaker session</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Location *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. USAR, GGSIPU EDC"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full xp-form-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Start Date & Time *
              </label>
              <input
                type="datetime-local"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full xp-form-input"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                End Date & Time (Optional)
              </label>
              <input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full xp-form-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Registration URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://unstop.com/or-linktree"
              value={formData.registrationLink}
              onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
              className="w-full xp-form-input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Brief overview of the event..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full xp-form-input resize-none"
            />
          </div>

          <div className="xp-dialog-actions">
            <div className="flex items-center gap-3">
              <label className="text-xs text-slate-500">Accent Color:</label>
              <input
                type="color"
                value={formData.accentColor}
                onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                className="h-9 w-9 rounded border border-slate-400 bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="xp-primary-button flex items-center gap-2"
            >
              {loading ? "Saving..." : "Publish Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
