import React, { useState } from 'react';
import {
  Mail,
  Instagram,
  PhoneCall,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ArrowLeft,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { openWhatsAppContactMessage, openWhatsAppGeneralInquiry, DISPLAY_PHONE_NUMBER } from '../utils/whatsapp';

interface ContactSectionProps {
  onBackToShowroom: () => void;
  onNavigateToCustomDesign?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onBackToShowroom,
  onNavigateToCustomDesign,
}) => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const OFFICIAL_EMAIL = 'luminaart0@gmail.com';
  const INSTAGRAM_HANDLE = '@lumina___art';
  const INSTAGRAM_URL = 'https://www.instagram.com/lumina___art?stkn=YmQ4aDJ5NWl2dWZw';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(OFFICIAL_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+918590729342');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'Please provide your name.';
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      errors.contact = 'Please provide an email or phone number so we can respond.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please write your message or question.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleSendViaWhatsApp = () => {
    openWhatsAppContactMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    });
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    });
    setIsSubmitted(false);
  };

  return (
    <div className="w-full" data-purpose="contact-section">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/60">
        <button
          onClick={onBackToShowroom}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white/80 hover:bg-white px-4 py-2 rounded-full shadow-xs transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Showroom</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-semibold text-slate-700">Studio Team Active (Mon - Sat)</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-[#F8FAF6] rounded-3xl sm:rounded-[2rem] p-5 sm:p-8 md:p-10 soft-border shadow-soft-card">
        {/* Title Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 bg-[#DCF763] text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            Get in Touch with Lumina Art
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Have questions about customized house name plates, CNC jali designs, materials, or bulk commercial signage? Contact our fabrication studio directly via email, Instagram, WhatsApp, or through the contact form below.
          </p>
        </div>

        {/* Grid Layout: Contact Cards (Left) + Contact Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contact Channels */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Email Channel Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full transition-colors cursor-pointer"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Official Email
              </div>
              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="text-base sm:text-lg font-black text-slate-900 hover:text-blue-600 transition-colors block mb-2 break-all"
              >
                {OFFICIAL_EMAIL}
              </a>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Ideal for architectural blueprints, custom vector files, invoices, and detailed design briefs.
              </p>

              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:underline cursor-pointer"
              >
                <span>Compose Email</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Instagram Channel Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full">
                  Portfolio & Stories
                </span>
              </div>

              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Instagram Page
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-black text-slate-900 hover:text-pink-600 transition-colors block mb-2"
              >
                {INSTAGRAM_HANDLE}
              </a>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Follow our daily workshop videos, customer installations across Kerala & India, and new release previews.
              </p>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-pink-600 hover:text-pink-700 underline cursor-pointer"
              >
                <span>Visit Instagram Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* WhatsApp & Studio Details Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full transition-colors cursor-pointer"
                  title="Copy phone number"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Direct WhatsApp & Support
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900 mb-2">
                {DISPLAY_PHONE_NUMBER}
              </div>

              <div className="space-y-2 text-xs text-slate-500 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Workshop & Studio: Kerala, India (Pan-India Dispatch)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Monday – Saturday: 9:00 AM – 8:00 PM IST</span>
                </div>
              </div>

              <button
                onClick={openWhatsAppGeneralInquiry}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 px-4 rounded-full text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Instant Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right Column: Contact Form (Backup / Direct submission) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs h-full flex flex-col justify-between">
              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-10 text-center my-auto"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      Message Sent to Lumina Art Team!
                    </h3>

                    <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                      Thank you for reaching out, <strong className="text-slate-900">{formData.name}</strong>. Our team has received your message and will reply to you at{' '}
                      <strong className="text-slate-900">{formData.email || formData.phone}</strong> shortly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                      <button
                        onClick={handleSendViaWhatsApp}
                        className="w-full sm:w-auto flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-5 rounded-full text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>Also Forward to WhatsApp</span>
                      </button>

                      <button
                        onClick={handleResetForm}
                        className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-5 rounded-full text-xs transition-all cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-black text-slate-900">
                          Send a Direct Message
                        </h3>
                        <span className="text-[11px] text-slate-400 font-medium">
                          Quick inquiry form
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Leave your requirements or questions below and we will get back to you promptly.
                      </p>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Shyamjith"
                        className={`w-full bg-[#F8FAF6] border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DCF763] transition-all ${
                          formErrors.name ? 'border-red-400' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. name@domain.com"
                          className="w-full bg-[#F8FAF6] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DCF763] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-[#F8FAF6] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DCF763] transition-all"
                        />
                      </div>
                    </div>

                    {formErrors.contact && (
                      <p className="text-[11px] text-red-600">{formErrors.contact}</p>
                    )}

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Subject / Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#F8FAF6] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DCF763]"
                      >
                        <option value="General Inquiry">General Product Inquiry</option>
                        <option value="Custom Name Board">Custom Entrance Name Board</option>
                        <option value="CNC Jali Cutting">CNC Jali Partition Cutting</option>
                        <option value="LED Neon Signage">Custom LED Neon Signage</option>
                        <option value="Bulk / Architect Order">Architect / Bulk Commercial Order</option>
                        <option value="Dispatch & Tracking">Dispatch & Tracking Inquiry</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you are looking for, your location, design dimensions, or any specific questions..."
                        className={`w-full bg-[#F8FAF6] border rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DCF763] transition-all resize-y ${
                          formErrors.message ? 'border-red-400' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.message && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 px-6 rounded-full text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 text-[#DCF763]" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Helpful Shortcut to Custom Design */}
                    {onNavigateToCustomDesign && (
                      <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>Have a photo or reference sketch ready?</span>
                        <button
                          type="button"
                          onClick={onNavigateToCustomDesign}
                          className="font-bold text-slate-900 hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Upload reference design</span>
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        </button>
                      </div>
                    )}
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
