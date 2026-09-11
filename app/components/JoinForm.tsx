"use client";

import React, { useState } from "react";
import { submitApplication, ApplicationData } from "../../lib/api";
import { User, Mail, GraduationCap, Code2, Github, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";

const DEPARTMENT_OPTIONS = [
  "USAR - AI-Data Science",
  "USAR - AI-Machine learning",
  "USAR - Industrial IoT",
  "USAR - Automation and Robotics",
  "Others",
];

const INTEREST_OPTIONS = [
  "i3",
  "i5",
  "i7",
  "i9",
  "Xeon",
  "Arc",
];

const initialFormData: ApplicationData = {
  fullName: "",
  email: "",
  enrollmentNumber: "",
  yearOfStudy: 1,
  department: "USAR - AI-Data Science",
  interests: ["i7"],
  githubUrl: "",
  linkedinUrl: "",
};

export default function JoinForm() {
  const [formData, setFormData] = useState<ApplicationData>(initialFormData);
  const [selectedDept, setSelectedDept] = useState<string>("USAR - AI-Data Science");
  const [customDept, setCustomDept] = useState<string>("");

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

  const handleDeptSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedDept(value);
    if (value !== "Others") {
      setFormData((prev) => ({ ...prev, department: value }));
    } else {
      setFormData((prev) => ({ ...prev, department: customDept.trim() || "Others" }));
    }
  };

  const handleCustomDeptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomDept(value);
    setFormData((prev) => ({ ...prev, department: value.trim() || "Others" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const finalDept = selectedDept === "Others" ? (customDept.trim() || "Others") : selectedDept;
      const payload: ApplicationData = {
        ...formData,
        department: finalDept,
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
          message: `Your submission have been received, and a confirmation email was sent to ${formData.email}. Please check your inbox!`,
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
        department: "USAR - AI-Data Science",
        interests: ["i7"],
        githubUrl: "",
        linkedinUrl: "",
      });
      setSelectedDept("USAR - AI-Data Science");
      setCustomDept("");
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

  const isI3Selected = formData.interests.includes("i3");

  return (
    <div className="w-full mx-auto">
      <div className="xp-dialog">
        <div className="xp-dialog-header">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-white/20 rounded-sm"><GraduationCap className="w-5 h-5" /></div>
            <div>
              <div className="text-sm font-bold tracking-wide">IoSC Club Membership Application</div>
              <div className="text-[11px] text-slate-200">Event registration</div>
            </div>
          </div>
          <div className="text-[11px] text-slate-200">Join the Intel oneAPI Student Club</div>
        </div>

        <div className="xp-dialog-body">
          {message && (
            <div className={`p-3 rounded-sm flex items-center gap-3 mb-4 ${message.type === "success" ? "bg-emerald-100 border border-emerald-300 text-emerald-900" : "bg-rose-100 border border-rose-300 text-rose-900"
              }`}>
              {message.type === "success" ? <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />}
              <span className="text-sm">{message.text}</span>
            </div>
          )}

          <form id="join-form" onSubmit={handleSubmit} className="space-y-5">
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
                    className="w-full xp-form-input pl-9"
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
                    className="w-full xp-form-input pl-9"
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
                  className="w-full xp-form-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Year of Study *
                </label>
                <select
                  value={formData.yearOfStudy}
                  onChange={(e) => setFormData({ ...formData, yearOfStudy: parseInt(e.target.value) })}
                  className="w-full xp-form-input"
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
                <select
                  value={selectedDept}
                  onChange={handleDeptSelectChange}
                  className="w-full xp-form-input"
                >
                  {DEPARTMENT_OPTIONS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {selectedDept === "Others" && (
                  <input
                    type="text"
                    required
                    placeholder="Specify Department"
                    value={customDept}
                    onChange={handleCustomDeptChange}
                    className="w-full xp-form-input mt-2"
                  />
                )}
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
                      className={`xp-pill-button ${selected ? "selected" : ""}`}
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
                  GitHub Profile {isI3Selected ? <span className="text-amber-400 normal-case font-bold ml-1">(Preferable for Team i3)</span> : "(Optional)"}
                </label>
                <div className="relative">
                  <Github className={`w-4 h-4 absolute left-3 top-3 ${isI3Selected ? "text-amber-400" : "text-slate-500"}`} />
                  <input
                    type="url"
                    placeholder={isI3Selected ? "https://github.com/username (Preferable for i3)" : "https://github.com/username"}
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className={`w-full xp-form-input pl-9 ${isI3Selected ? "border-amber-500/50 focus:border-amber-400" : ""}`}
                  />
                </div>
                {isI3Selected && (
                  <p className="text-[11px] text-amber-400/90 mt-1 font-medium">
                    ★ Providing a GitHub profile is highly recommended for Team i3 applicants.
                  </p>
                )}
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
                    className="w-full xp-form-input pl-9"
                  />
                </div>
              </div>
            </div>

            <div className="xp-dialog-actions">
              <button
                type="button"
                onClick={() => {
                  setFormData(initialFormData);
                  setMessage(null);
                }}
                disabled={loading}
                className="xp-secondary-button"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="xp-primary-button flex items-center gap-2"
              >
                {loading ? "Submitting..." : "Submit"}
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

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
