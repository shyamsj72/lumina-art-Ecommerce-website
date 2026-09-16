import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Send,
  MessageCircle,
  Mail,
  Sparkles,
  ArrowLeft,
  Info,
  ShieldCheck,
  Layers,
  Palette,
  Ruler,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { openWhatsAppCustomDesignQuote } from '../utils/whatsapp';
import { CustomDesignRequest } from '../types';
import { apiClient } from '../api/client';

interface CustomDesignSectionProps {
  onBackToShowroom: () => void;
  onNavigateToContact?: () => void;
}

const COMMON_MATERIALS = [
  'Live-Edge Dark Walnut Wood',
  'Glossy Black Acrylic (2mm / 4mm)',
  '3D Mirror Gold Inlay',
  'Polished Brass Metal Finish',
  'Warm-White LED Neon Glow',
  'CNC Jali Cut Lattice',
  'Weather-Proof Outdoor Composite',
];

const COMMON_SIZES = [
  '12" × 6" (Standard Door)',
  '16" × 8" (Entrance Villa)',
  '20" × 10" (Gate / Bungalow)',
  '24" × 12" (Commercial / Large)',
  'Custom Dimensions',
];

const LOCAL_STORAGE_KEY = 'lumina_custom_requests_history';

export const CustomDesignSection: React.FC<CustomDesignSectionProps> = ({
  onBackToShowroom,
  onNavigateToContact,
}) => {
  // Form State
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(COMMON_MATERIALS[0]);
  const [selectedSize, setSelectedSize] = useState(COMMON_SIZES[1]);
  const [customDimensions, setCustomDimensions] = useState('');
  const [description, setDescription] = useState('');

  // File Upload State
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<CustomDesignRequest | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleFile = (selectedFile: File) => {
    setFileError(null);
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const validExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];

    const fileExt = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
    const isValidType =
      validTypes.includes(selectedFile.type) || validExtensions.includes(fileExt);

    if (!isValidType) {
      setFileError('Invalid file format. Please upload a JPG, PNG, or PDF file.');
      return;
    }

    // Limit to 20MB
    if (selectedFile.size > 20 * 1024 * 1024) {
      setFileError('File size exceeds 20MB. Please choose a smaller reference file.');
      return;
    }

    setFile(selectedFile);

    // If image, create thumbnail preview
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null); // PDF preview represented by document badge
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!description.trim()) {
      errors.description = 'Please describe your customization requirements or ideas.';
    }

    if (!userName.trim()) {
      errors.userName = 'Please enter your name.';
    }

    if (!userPhone.trim()) {
      errors.userPhone = 'Please enter your phone or WhatsApp number.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    const generatedId = `LUM-CUSTOM-${Math.floor(100000 + Math.random() * 900000)}`;
    const effectiveSize = selectedSize === 'Custom Dimensions' && customDimensions ? customDimensions : selectedSize;

    const requestData: CustomDesignRequest = {
      id: generatedId,
      name: userName.trim(),
      phone: userPhone.trim(),
      email: userEmail.trim(),
      material: selectedMaterial,
      size: effectiveSize,
      customizationDetails: description.trim(),
      fileName: file ? file.name : undefined,
      fileSize: file ? formatFileSize(file.size) : undefined,
      fileType: file ? file.type : undefined,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage history
    try {
      const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(requestData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list.slice(0, 10)));
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRequest(requestData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleSendViaWhatsApp = () => {
    if (!submittedRequest) return;
    openWhatsAppCustomDesignQuote({
      requestId: submittedRequest.id,
      name: submittedRequest.name,
      phone: submittedRequest.phone,
      email: submittedRequest.email,
      material: submittedRequest.material,
      size: submittedRequest.size,
      customizationDetails: submittedRequest.customizationDetails,
      hasFile: !!submittedRequest.fileName,
      fileName: submittedRequest.fileName,
    });
  };

  const handleSendViaEmail = async () => {
    if (!submittedRequest) return;
    
    setIsEmailing(true);
    
    try {
      const formData = new FormData();
      formData.append('name', submittedRequest.name);
      formData.append('phone', submittedRequest.phone);
      formData.append('email', submittedRequest.email || '');
      formData.append('material', submittedRequest.material);
      formData.append('size', submittedRequest.size);
      formData.append('customizationDetails', submittedRequest.customizationDetails);
      
      if (file) {
        formData.append('file', file);
      }

      await apiClient.sendCustomDesignEmail(formData);
      setEmailSuccess(true);
    } catch (error) {
      console.error('Failed to send email', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setIsEmailing(false);
    }
  };

  const resetForm = () => {
    setSubmittedRequest(null);
    setFile(null);
    setPreviewUrl(null);
    setDescription('');
    setCustomDimensions('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full" data-purpose="custom-design-upload-section">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/60">
        <button
          onClick={onBackToShowroom}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white/80 hover:bg-white px-4 py-2 rounded-full shadow-xs transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Showroom</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="font-semibold text-slate-700">Bespoke CNC & Laser Fabrication</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-[#F8FAF6] rounded-3xl sm:rounded-[2rem] p-5 sm:p-8 md:p-10 soft-border shadow-soft-card">
        {/* Success Confirmation State */}
        <AnimatePresence>
          {submittedRequest ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="max-w-2xl mx-auto py-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
                Request Registered Successfully
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 mb-2 tracking-tight">
                Your Idea Is In Good Hands!
              </h2>

              <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
                Thank you, <strong className="text-slate-900">{submittedRequest.name}</strong>. Our design engineering team at Lumina Art will review your requirements and provide a visual 3D mock and transparent price quote.
              </p>

              {/* Reference Details Ticket */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs text-left max-w-lg mx-auto mb-8">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Quote Reference ID</span>
                  <span className="text-xs font-black text-slate-900 bg-[#DCF763] px-2.5 py-0.5 rounded-full">
                    #{submittedRequest.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 text-xs border-b border-slate-100">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Preferred Material</span>
                    <span className="font-bold text-slate-800">{submittedRequest.material}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Approx Dimensions</span>
                    <span className="font-bold text-slate-800">{submittedRequest.size}</span>
                  </div>
                </div>

                {submittedRequest.fileName && (
                  <div className="pt-3 flex items-center gap-2 text-xs">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500 truncate max-w-[280px]">
                      Reference: <strong className="text-slate-700">{submittedRequest.fileName}</strong> ({submittedRequest.fileSize})
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
                <button
                  onClick={handleSendViaWhatsApp}
                  className="w-full sm:w-auto flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-6 rounded-full shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Send Reference on WhatsApp</span>
                </button>

                <button
                  onClick={handleSendViaEmail}
                  disabled={isEmailing || emailSuccess}
                  className={`w-full sm:w-auto font-bold py-3.5 px-6 rounded-full border shadow-xs transition-all flex items-center justify-center gap-2 text-sm cursor-pointer ${
                    emailSuccess
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 cursor-default'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:shadow disabled:opacity-60'
                  }`}
                >
                  {isEmailing ? (
                    <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                  ) : emailSuccess ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Mail className="w-4 h-4 text-slate-600" />
                  )}
                  <span>{emailSuccess ? 'Email Sent Successfully!' : 'Email Quote Request'}</span>
                </button>
              </div>

              <div className="mt-6">
                <button
                  onClick={resetForm}
                  className="text-xs text-slate-500 hover:text-slate-900 font-bold underline transition-colors cursor-pointer"
                >
                  Upload Another Reference Design
                </button>
              </div>
            </motion.div>
          ) : (
            <div>
              {/* Header Title & Pitch */}
              <div className="max-w-3xl mb-8">
                <div className="inline-flex items-center gap-2 bg-[#DCF763] text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Studio Atelier</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                  Custom Design Upload & Bespoke Fabrication
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Have a specific vision, sketch, architect blueprint, or inspiration image? Upload your reference design and our CNC & laser craft specialists in Kerala will manufacture it with microscopic precision.
                </p>
              </div>

              {/* Form Grid */}
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Upload Box + Guidance Note */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  {/* Instructional Note Above Upload Box (Specified in request) */}
                  <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-0.5">
                        Designer's Note
                      </h4>
                      <p className="text-xs text-amber-800 leading-relaxed font-medium">
                        Upload a photo, sketch, or PDF of your design, then tell us how you'd like it customized — we'll bring your idea to life.
                      </p>
                    </div>
                  </div>

                  {/* Upload Box (Drag and Drop + Click) */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                      Reference Design File <span className="text-slate-400 font-normal">(Accepted: JPG, PNG, PDF • Max 20MB)</span>
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                      onChange={handleFileInputChange}
                      className="hidden"
                      id="custom-design-file-input"
                    />

                    {!file ? (
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[260px] ${
                          isDragging
                            ? 'border-slate-900 bg-white ring-4 ring-[#DCF763]/50 scale-[1.01]'
                            : 'border-slate-300 bg-white/70 hover:bg-white hover:border-slate-400 shadow-xs'
                        }`}
                      >
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 mb-3 shadow-xs group-hover:scale-110 transition-transform">
                          <UploadCloud className="w-7 h-7" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">
                          Drag & drop your design here, or <span className="text-blue-600 underline">browse files</span>
                        </h4>
                        <p className="text-xs text-slate-500 mb-3">
                          Accepts high-resolution JPG, PNG, or vector PDF
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold bg-slate-100 px-3 py-1 rounded-full">
                          <span>Photos</span>
                          <span>•</span>
                          <span>Sketches</span>
                          <span>•</span>
                          <span>CAD / Vector PDFs</span>
                        </div>
                      </div>
                    ) : (
                      /* Active File Preview */
                      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs relative">
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-start gap-4">
                          {previewUrl ? (
                            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                              <img
                                src={previewUrl}
                                alt="Custom design preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-24 h-24 rounded-2xl bg-red-50 border border-red-200/80 shrink-0 flex flex-col items-center justify-center text-red-600">
                              <FileText className="w-8 h-8 mb-1" />
                              <span className="text-[10px] font-black uppercase">PDF File</span>
                            </div>
                          )}

                          <div className="flex-1 min-w-0 pr-8">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                Ready for Review
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 truncate mb-1" title={file.name}>
                              {file.name}
                            </h4>
                            <p className="text-xs text-slate-500 mb-3">
                              Size: {formatFileSize(file.size)}
                            </p>

                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="text-xs font-bold text-slate-700 hover:text-slate-950 underline cursor-pointer"
                            >
                              Replace with another file
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {fileError && (
                      <p className="text-xs font-medium text-red-600 mt-2 flex items-center gap-1.5">
                        <X className="w-3.5 h-3.5" />
                        <span>{fileError}</span>
                      </p>
                    )}
                  </div>

                  {/* Manufacturing Trust Features */}
                  <div className="grid grid-cols-3 gap-2.5 pt-2">
                    <div className="bg-white/80 p-3 rounded-2xl border border-slate-200/60 text-center">
                      <Layers className="w-4 h-4 text-slate-700 mx-auto mb-1" />
                      <div className="text-[11px] font-bold text-slate-800">Laser & CNC</div>
                      <div className="text-[10px] text-slate-500">Sub-mm accuracy</div>
                    </div>
                    <div className="bg-white/80 p-3 rounded-2xl border border-slate-200/60 text-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                      <div className="text-[11px] font-bold text-slate-800">Weather-Proof</div>
                      <div className="text-[10px] text-slate-500">Outdoor cast acrylic</div>
                    </div>
                    <div className="bg-white/80 p-3 rounded-2xl border border-slate-200/60 text-center">
                      <Clock className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                      <div className="text-[11px] font-bold text-slate-800">Fast Turnaround</div>
                      <div className="text-[10px] text-slate-500">Kerala to Pan-India</div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Customization Specs + Description + Contact */}
                <div className="lg:col-span-6 flex flex-col gap-5">
                  {/* Textarea: Customization Details (Specified in request) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="customization-description" className="text-xs font-black uppercase tracking-wider text-slate-700">
                        Customization Instructions <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400">Be as specific as you like</span>
                    </div>

                    <textarea
                      id="customization-description"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe colors, size, style changes, placement, materials, fonts, script (e.g. Malayalam / English / Arabic), family names, house numbers, or lighting preferences..."
                      className={`w-full bg-white border rounded-2xl p-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DCF763] transition-all resize-y min-h-[110px] ${
                        formErrors.description ? 'border-red-400 ring-1 ring-red-300' : 'border-slate-200'
                      }`}
                    />
                    {formErrors.description && (
                      <p className="text-xs text-red-600 mt-1 font-medium">{formErrors.description}</p>
                    )}
                  </div>

                  {/* Material Preference Quick Select */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                      Preferred Material / Finish
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {COMMON_MATERIALS.map((mat) => (
                        <button
                          key={mat}
                          type="button"
                          onClick={() => setSelectedMaterial(mat)}
                          className={`text-xs py-1.5 px-3 rounded-full font-bold transition-all cursor-pointer ${
                            selectedMaterial === mat
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size & Dimensions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        Target Dimensions
                      </label>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#DCF763]"
                      >
                        {COMMON_SIZES.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedSize === 'Custom Dimensions' && (
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                          Specify Dimensions
                        </label>
                        <input
                          type="text"
                          value={customDimensions}
                          onChange={(e) => setCustomDimensions(e.target.value)}
                          placeholder="e.g. 30 × 14 inches / 2.5 × 1.2 ft"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DCF763]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Contact Info (for quote dispatch) */}
                  <div className="bg-white/80 p-4 rounded-2xl border border-slate-200/80">
                    <div className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                      Where Should We Send Your Quote & Digital Preview?
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="e.g. Shyamjith / Dr. Anoop"
                          className={`w-full bg-white border rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DCF763] ${
                            formErrors.userName ? 'border-red-400' : 'border-slate-200'
                          }`}
                        />
                        {formErrors.userName && (
                          <p className="text-[10px] text-red-600 mt-0.5">{formErrors.userName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Phone / WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={userPhone}
                          onChange={(e) => setUserPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className={`w-full bg-white border rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DCF763] ${
                            formErrors.userPhone ? 'border-red-400' : 'border-slate-200'
                          }`}
                        />
                        {formErrors.userPhone && (
                          <p className="text-[10px] text-red-600 mt-0.5">{formErrors.userPhone}</p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Email Address <span className="text-slate-400 font-normal">(Optional, for PDF invoice/quote copy)</span>
                        </label>
                        <input
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="e.g. yourname@gmail.com"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DCF763]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Request Button (Specified in request) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 px-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Preparing Your Quote Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#DCF763]" />
                          <span>Submit Request for Review & Quote</span>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-center text-slate-500 mt-2.5">
                      Free design consultation • Transparent pricing • No purchase obligation
                    </p>
                  </div>
                </div>
              </form>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
