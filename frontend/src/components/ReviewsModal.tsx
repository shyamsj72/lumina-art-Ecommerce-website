import React from 'react';
import { X, Star, CheckCircle, ShieldCheck, MessageCircle } from 'lucide-react';
import { openWhatsAppGeneralInquiry } from '../utils/whatsapp';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const craftReviews = [
    {
      id: 'rev-1',
      author: 'Arjun & Sneha Nair',
      location: 'Kochi, Kerala',
      rating: 5,
      date: '3 days ago',
      productName: 'Premium Name Board - Style 1 (4mm Acrylic)',
      comment:
        'The gold mirror acrylic finish on matte black base is breathtaking. Arrived safely in heavy wooden-backed packaging without a single scratch. Installed at our villa entrance!',
    },
    {
      id: 'rev-2',
      author: 'Rohit K. Sharma',
      location: 'Bengaluru, Karnataka',
      rating: 5,
      date: '1 week ago',
      productName: 'Geometric Laser-Cut Jali Panel (4mm)',
      comment:
        'Ordered 3 custom jali panels for our living room pooja partition. The CNC cutting precision is 10/10. WhatsApp team sent CAD mockups before starting production.',
    },
    {
      id: 'rev-3',
      author: 'Dr. Priya Varma',
      location: 'Hyderabad, Telangana',
      rating: 5,
      date: '2 weeks ago',
      productName: 'Custom Glow Neon Sign (Warm White)',
      comment:
        'Custom clinic name neon board looks vibrant and warm. Energy-efficient, doesn’t heat up, and came with acrylic standoffs ready to mount on drywall.',
    },
    {
      id: 'rev-4',
      author: 'Vikram Sundaram',
      location: 'Chennai, Tamil Nadu',
      rating: 4.8,
      date: '3 weeks ago',
      productName: 'Laser-Cut Wooden Keepsake Box',
      comment:
        'High quality teak finish plywood with smooth magnetic clasp. Exceptional craftsmanship for gifting.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-[#F8FAF6] rounded-4xl soft-border shadow-2xl overflow-hidden relative p-6 md:p-8 max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900">Client Craft Reviews</h2>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" /> 4.8★
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified feedback from 500+ homes and commercial spaces delivered Pan-India
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-600 hover:text-black cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Rating Breakdown */}
        <div className="py-4 border-b border-slate-200/50 grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/80 p-3 rounded-2xl soft-border">
            <div className="text-2xl font-black text-slate-900">99%</div>
            <div className="text-[10px] text-slate-500 font-medium">Cutting Accuracy</div>
          </div>
          <div className="bg-white/80 p-3 rounded-2xl soft-border">
            <div className="text-2xl font-black text-slate-900">100%</div>
            <div className="text-[10px] text-slate-500 font-medium">Weather-Proof Rated</div>
          </div>
          <div className="bg-white/80 p-3 rounded-2xl soft-border">
            <div className="text-2xl font-black text-slate-900">48h</div>
            <div className="text-[10px] text-slate-500 font-medium">CAD Preview Turnaround</div>
          </div>
        </div>

        {/* List of Reviews */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {craftReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-4 soft-border shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">{review.author}</h4>
                    <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded-full font-bold flex items-center gap-0.5">
                      <CheckCircle className="w-2.5 h-2.5" /> Verified Buyer
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{review.location} • {review.date}</span>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>

              <div className="text-[11px] font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded-lg">
                Purchased: {review.productName}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Have custom design inquiries?</span>
          </div>
          <button
            onClick={() => {
              onClose();
              openWhatsAppGeneralInquiry();
            }}
            className="flex items-center gap-1.5 text-xs font-bold bg-[#25D366] text-white px-3 py-1.5 rounded-full hover:bg-[#20ba59] transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Chat with Craftsman</span>
          </button>
        </div>
      </div>
    </div>
  );
};
