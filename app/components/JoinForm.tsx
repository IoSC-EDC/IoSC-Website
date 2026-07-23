"use client";

import React, { useState } from "react";
import { submitApplication, ApplicationData } from "../../lib/api";
import { User, Mail, GraduationCap, Code2, Github, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";

const INTEREST_OPTIONS = [
  "i3",
  "i5",
  "i7",
  "i9",
  "Xeon",
  "Arc",
];

export default function JoinForm() {
  const [formData, setFormData] = useState<ApplicationData>({
    fullName: "",
    email: "",
    enrollmentNumber: "",
    yearOfStudy: 1,
    department: "USAR - AI & Data Science",
    interests: ["i7"],
    githubUrl: "",
    linkedinUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [popup, setPopup] = useState<{
    show: boolean;
    type: "email-sent" | "email-failed" | "error";
    title: string;
    message: string;
  }>({ show: false, type: "email-sent", title: "", message: "" });

  const selectInterest = (interest: string) => {
    setFormData((prev) => ({ ...prev, interests: [interest] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload: ApplicationData = {
        ...formData,
        enrollmentNumber: formData.enrollmentNumber || undefined,
        githubUrl: formData.githubUrl || undefined,
        linkedinUrl: formData.linkedinUrl || undefined,
      };

      const res = await submitApplication(payload);
      const emailSent = res?.data?.emailSent;

      if (emailSent) {
        setPopup({
          show: true,
          type: "email-sent",
          title: "Registration Successful! ✉️",
          message: `Your application has been saved to PostgreSQL, and a confirmation email was sent to ${formData.email}. Please check your inbox!`,
        });
      } else {
        setPopup({
          show: true,
          type: "email-failed",
          title: "Registration Saved! (Email Notice ⚠️)",
          message: res?.message || "Your registration was saved to the database! However, a confirmation email could not be sent to your email address (check Resend testing domain restrictions or API key).",
        });
      }

      setMessage({
        type: emailSent ? "success" : "error",
        text: res?.message || "Application submitted successfully!",
      });

      setFormData({
        fullName: "",
        email: "",
        enrollmentNumber: "",
        yearOfStudy: 1,
        department: "USAR - AI & Data Science",
        interests: ["i7"],
        githubUrl: "",
        linkedinUrl: "",
      });
    } catch (err: any) {
      const errText = err.message || "Failed to submit application.";
      setMessage({ type: "error", text: errText });
      setPopup({
        show: true,
        type: "error",
        title: "Submission Error ❌",
        message: errText,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-800 shadow-2xl max-w-2xl mx-auto my-2 mb-3">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-lg">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide">IoSC Club Membership Application</h2>
          <p className="text-xs text-slate-400">Join the Intel oneAPI Student Club at GGSIPU East Delhi Campus</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                required
                placeholder="e.g. Alex Johnson"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                required
                placeholder="alex@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Enrollment No.
            </label>
            <input
              type="text"
              placeholder="e.g. 01213302722"
              value={formData.enrollmentNumber}
              onChange={(e) => setFormData({ ...formData, enrollmentNumber: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Year of Study *
            </label>
            <select
              value={formData.yearOfStudy}
              onChange={(e) => setFormData({ ...formData, yearOfStudy: parseInt(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
              <option value={4}>4th Year</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Department *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. USAR - AI & DS"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            IoSC Team * (Select one)
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((interest) => {
              const selected = formData.interests.includes(interest);
              return (
                <button
                  type="button"
                  key={interest}
                  onClick={() => selectInterest(interest)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selected
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              GitHub Profile (Optional)
            </label>
            <div className="relative">
              <Github className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="url"
                placeholder="https://github.com/username"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              LinkedIn Profile (Optional)
            </label>
            <div className="relative">
              <Linkedin className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 text-white font-medium text-sm rounded-lg shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            {loading ? "Submitting Application..." : "Submit Application"}
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {popup.show && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setPopup(prev => ({ ...prev, show: false }))}>
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl text-center text-slate-100" onClick={e => e.stopPropagation()}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/80 border border-slate-700">
              {popup.type === "email-sent" && <CheckCircle2 className="h-8 w-8 text-emerald-400" />}
              {popup.type === "email-failed" && <AlertCircle className="h-8 w-8 text-amber-400" />}
              {popup.type === "error" && <AlertCircle className="h-8 w-8 text-rose-400" />}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{popup.title}</h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">{popup.message}</p>
            <button
              onClick={() => setPopup(prev => ({ ...prev, show: false }))}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg shadow-lg shadow-emerald-600/30 cursor-pointer transition-colors"
            >
              OK, Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
