import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Clock, Bookmark, Share2 } from 'lucide-react';
import { BlogArticle } from '../types';

interface BlogDetailModalProps {
  article: BlogArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogDetailModal({ article, isOpen, onClose }: BlogDetailModalProps) {
  if (!article) return null;

  const idPrefix = `blog-detail-${article.id}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            id={`${idPrefix}-backdrop`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            id={`${idPrefix}-container`}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="relative w-full max-w-3xl bg-[#FCFAF7] text-[#1C1A17] overflow-hidden rounded-2xl shadow-2xl z-10 flex flex-col max-h-[92vh]"
          >
            {/* Action Bar / Header */}
            <div className="px-6 py-4 border-b border-[#F0E6D8] flex items-center justify-between bg-[#FCFAF7]">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#8E7E6A]">
                {article.category}
              </span>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-black/5 text-gray-500 hover:text-black transition-colors" title="Bookmark artikel">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-black/5 text-gray-500 hover:text-black transition-colors" title="Share artikel">
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  id={`${idPrefix}-close-btn`}
                  onClick={onClose}
                  className="p-2 rounded-full bg-black/5 hover:bg-black text-[#1C1A17] hover:text-white transition-all shadow-xs ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Editorial Section */}
            <div className="overflow-y-auto p-6 md:p-10 flex-1">
              {/* Cover Image */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-8 shadow-xs">
                <img
                  id={`${idPrefix}-img`}
                  src={article.image}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-[#8E7E6A] font-medium tracking-wider mb-4 border-b border-gray-100 pb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Oleh: {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h1 id={`${idPrefix}-title`} className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-6 leading-tight text-[#1C1A17]">
                {article.title}
              </h1>

              {/* Excerpt */}
              <div id={`${idPrefix}-excerpt`} className="border-l-2 border-[#8E7E6A] pl-4 italic text-gray-600 text-lg mb-8 font-serif leading-relaxed">
                "{article.excerpt}"
              </div>

              {/* Paragraphs */}
              <div id={`${idPrefix}-content-body`} className="prose max-w-none text-[#1C1A17] space-y-6 text-sm md:text-base leading-relaxed whitespace-pre-line font-light">
                {article.content.map((paragraph, index) => (
                  <p key={index} className="first-letter:text-2xl first-letter:font-serif first-letter:float-left first-letter:mr-2">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Newsletter Call to Read inside detail */}
              <div className="mt-12 bg-[#F5EFE6] rounded-xl p-6.5 text-center border border-[#E9DFD0]">
                <h3 className="font-serif text-xl font-medium mb-2">Tertarik dengan Fesyen Minimalis?</h3>
                <p className="text-xs text-gray-500 mb-4">Dapatkan kurasi mingguan gaya berpakaian terbaik langsung ke email Anda secara gratis.</p>
                <div className="flex gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Alamat email Anda"
                    className="flex-1 px-4 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-hidden focus:border-black"
                  />
                  <button className="bg-black text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-black/95 transition-all">
                    Gabung
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
