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
    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-800 shadow-2xl max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="p-3 bg-blue-600/20 text-blue-400 rounded-lg">
          <CalendarDays className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide">Create New IoSC Event</h2>
          <p className="text-xs text-slate-400">Post a new hackathon, workshop, or campus event to PostgreSQL</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 mb-6 ${
          message.type === "success" ? "bg-emerald-950/80 border border-emerald-500/30 text-emerald-300" : "bg-rose-950/80 border border-rose-500/30 text-rose-300"
        }`}>
          {message.type === "success" ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
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
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
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
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
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
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
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
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-300"
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
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-300"
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
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
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
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <label className="text-xs text-slate-400">Accent Color:</label>
            <input
              type="color"
              value={formData.accentColor}
              onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
              className="w-8 h-8 rounded bg-transparent cursor-pointer border-0"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm rounded-lg shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            {loading ? "Saving to Database..." : "Publish Event"}
          </button>
        </div>
      </form>
    </div>
  );
}
