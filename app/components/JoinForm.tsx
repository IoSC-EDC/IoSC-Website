"use client";

import React, { useState } from "react";
import { submitApplication, ApplicationData } from "../../lib/api";
import { User, Mail, GraduationCap, Github, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";

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

export default function JoinForm({ onClose }: { onClose?: () => void }) {
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
          message: `Your submission has been received, and a team-specific resource email was sent to ${formData.email}. Please check your inbox!`,
        });
      } else {
        setPopup({
          show: true,
          type: "email-failed",
          title: "Registration Saved! ⚠️",
          message: res?.message || "Your application was submitted successfully!",
        });
      }

      setMessage({
        type: emailSent ? "success" : "error",
        text: res?.message || "Application submitted successfully!",
      });

      setFormData(initialFormData);
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
    <div className="w-full mx-auto text-slate-900 font-sans">
      {message && (
        <div
          className={`p-3 rounded flex items-center gap-3 mb-4 text-xs font-semibold ${
            message.type === "success"
              ? "bg-emerald-100 border border-emerald-400 text-emerald-900"
              : "bg-rose-100 border border-rose-400 text-rose-900"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form id="join-form" onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Full Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#0a246a] uppercase tracking-wider mb-1">
              Full Name <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                required
                placeholder="e.g. Alex Johnson"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#7f9db9] rounded text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0054e3] focus:border-[#0054e3] shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0a246a] uppercase tracking-wider mb-1">
              Email Address <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="email"
                required
                placeholder="alex@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#7f9db9] rounded text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0054e3] focus:border-[#0054e3] shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Enrollment No, Year of Study, Department */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#0a246a] uppercase tracking-wider mb-1">
              Enrollment No.
            </label>
            <input
              type="text"
              placeholder="e.g. 01213302722"
              value={formData.enrollmentNumber || ""}
              onChange={(e) => setFormData({ ...formData, enrollmentNumber: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#7f9db9] rounded text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0054e3] focus:border-[#0054e3] shadow-inner"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0a246a] uppercase tracking-wider mb-1">
              Year of Study <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.yearOfStudy}
              onChange={(e) => setFormData({ ...formData, yearOfStudy: parseInt(e.target.value) })}
              className="w-full px-3 py-2 bg-white border border-[#7f9db9] rounded text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0054e3] focus:border-[#0054e3] shadow-inner"
            >
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
              <option value={4}>4th Year</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0a246a] uppercase tracking-wider mb-1">
              Department <span className="text-red-600">*</span>
            </label>
            <select
              value={selectedDept}
              onChange={handleDeptSelectChange}
              className="w-full px-3 py-2 bg-white border border-[#7f9db9] rounded text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0054e3] focus:border-[#0054e3] shadow-inner"
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
                className="w-full px-3 py-2 bg-white border border-[#7f9db9] rounded text-xs text-slate-900 mt-2 focus:outline-none focus:ring-2 focus:ring-[#0054e3] shadow-inner"
              />
            )}
          </div>
        </div>

        {/* Row 3: Team Selection */}
        <div>
          <label className="block text-xs font-bold text-[#0a246a] uppercase tracking-wider mb-1.5">
            IoSC Team <span className="text-red-600">*</span> (Select one)
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((interest) => {
              const selected = formData.interests.includes(interest);
              return (
                <button
                  type="button"
                  key={interest}
                  onClick={() => selectInterest(interest)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded border transition-all cursor-pointer ${
                    selected
                      ? "bg-gradient-to-b from-[#3593ff] to-[#0054e3] text-white border-[#003cb3] shadow-[0_0_10px_rgba(0,84,227,0.4)]"
                      : "bg-white hover:bg-slate-100 text-slate-700 border-[#7f9db9]"
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 4: GitHub & LinkedIn Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#0a246a] uppercase tracking-wider mb-1">
              GitHub Profile{" "}
              {isI3Selected ? (
                <span className="text-amber-700 font-extrabold normal-case ml-1">(Preferable for Team i3)</span>
              ) : (
                <span className="text-slate-500 font-normal normal-case">(Optional)</span>
              )}
            </label>
            <div className="relative">
              <Github className={`w-4 h-4 absolute left-3 top-2.5 ${isI3Selected ? "text-amber-600" : "text-slate-500"}`} />
              <input
                type="url"
                placeholder={isI3Selected ? "https://github.com/username (Recommended for i3)" : "https://github.com/username"}
                value={formData.githubUrl || ""}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className={`w-full pl-9 pr-3 py-2 bg-white border rounded text-xs text-slate-900 focus:outline-none focus:ring-2 shadow-inner ${
                  isI3Selected ? "border-amber-500 bg-amber-50/40 focus:ring-amber-500" : "border-[#7f9db9] focus:ring-[#0054e3]"
                }`}
              />
            </div>
            {isI3Selected && (
              <p className="text-[11px] text-amber-700 mt-1 font-semibold flex items-center gap-1">
                <span>★</span> Providing a GitHub profile is highly recommended for Team i3 applicants.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0a246a] uppercase tracking-wider mb-1">
              LinkedIn Profile <span className="text-slate-500 font-normal normal-case">(Optional)</span>
            </label>
            <div className="relative">
              <Linkedin className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedinUrl || ""}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#7f9db9] rounded text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0054e3] shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-3 border-t border-[#c0bba6] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setFormData(initialFormData);
              setMessage(null);
              if (onClose) onClose();
            }}
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-b from-white to-[#e3decc] hover:from-[#f5f2e6] hover:to-[#dad4c0] active:bg-[#c8c2b0] text-[#111] text-xs font-bold rounded border border-[#7f9db9] shadow-[inset_1px_1px_0_#fff] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="glowing-register-btn px-5 py-2 bg-gradient-to-b from-[#3593ff] to-[#0054e3] hover:from-[#4ba0ff] hover:to-[#0060f0] text-white text-xs font-bold rounded border border-[#003cb3] flex items-center gap-2 cursor-pointer"
          >
            {loading ? "Submitting..." : "Submit Application"}
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Confirmation Popup Modal */}
      {popup.show && (
        <div
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPopup((prev) => ({ ...prev, show: false }))}
        >
          <div
            className="relative w-full max-w-md bg-[#ece9d8] border-2 border-[#0054e3] rounded-lg p-5 shadow-2xl text-center text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-[#7f9db9] shadow-inner">
              {popup.type === "email-sent" && <CheckCircle2 className="h-7 w-7 text-emerald-600" />}
              {popup.type === "email-failed" && <AlertCircle className="h-7 w-7 text-amber-600" />}
              {popup.type === "error" && <AlertCircle className="h-7 w-7 text-rose-600" />}
            </div>
            <h3 className="text-base font-bold text-[#0a246a] mb-1.5">{popup.title}</h3>
            <p className="text-xs text-slate-800 mb-5 leading-relaxed">{popup.message}</p>
            <button
              onClick={() => {
                setPopup((prev) => ({ ...prev, show: false }));
                if (onClose) onClose();
              }}
              className="w-full py-2 bg-gradient-to-b from-[#3593ff] to-[#0054e3] hover:from-[#4ba0ff] hover:to-[#0060f0] text-white font-bold text-xs rounded border border-[#003cb3] cursor-pointer shadow"
            >
              OK, Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
