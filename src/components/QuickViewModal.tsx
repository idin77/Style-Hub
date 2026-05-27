import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, HelpCircle } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: { name: string; class: string }) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; class: string } | null>(null);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0] || null);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Pilih ukuran terlebih dahulu');
      return;
    }
    if (!selectedColor) {
      alert('Pilih warna terlebih dahulu');
      return;
    }
    onAddToCart(product, selectedSize, selectedColor);
    setAddedMessage('Berhasil ditambahkan ke Keranjang Belanja!');
    setTimeout(() => {
      setAddedMessage(null);
    }, 2500);
  };

  const idPrefix = `qv-${product.id}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
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
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-4xl bg-[#FAF8F5] text-[#1C1A17] overflow-hidden rounded-2xl shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Close Button */}
            <button
              id={`${idPrefix}-close-btn`}
              onClick={onClose}
              className="absolute right-4 top-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#1C1A17] transition-colors shadow-xs"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image Media */}
            <div className="relative p-6 bg-[#FAF7F2] flex flex-col justify-between overflow-y-auto">
              <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-white shadow-xs">
                <img
                  id={`${idPrefix}-main-img`}
                  src={selectedImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-all duration-700 hover:scale-105"
                />
                {product.originalPrice && (
                  <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs tracking-widest font-medium uppercase">
                    Sale
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4 overflow-x-auto pb-1" id={`${idPrefix}-thumbnails`}>
                {product.images.map((img, i) => (
                  <button
                    id={`${idPrefix}-thumb-${i}`}
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 aspect-[3/4] rounded-md overflow-hidden bg-white border shrink-0 transition-all ${
                      selectedImage === img ? 'border-black ring-1 ring-black' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} preview ${i+1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Details Content */}
            <div className="p-8 flex flex-col justify-between overflow-y-auto bg-white border-l border-gray-100">
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs text-[#8E7E6A] font-medium tracking-widest uppercase">
                  <span>{product.subcategory}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-400">({product.reviewsCount} reviewed)</span>
                </div>

                <h2 id={`${idPrefix}-title`} className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-4 text-[#1C1A17]">
                  {product.name}
                </h2>

                {/* Price tag */}
                <div className="flex items-baseline gap-3 mb-6" id={`${idPrefix}-price`}>
                  <span className="text-xl md:text-2xl font-semibold tracking-tight text-black">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-gray-400">
                      Rp {product.originalPrice.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>

                <div className="h-px bg-gray-100 my-4" />

                <p id={`${idPrefix}-desc`} className="text-sm text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Color Swatches */}
                {selectedColor && (
                  <div className="mb-6" id={`${idPrefix}-colors`}>
                    <span className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-3">
                      Warna: <span className="text-[#1C1A17] font-medium normal-case">{selectedColor.name}</span>
                    </span>
                    <div className="flex gap-3">
                      {product.colors.map((color, i) => (
                        <button
                          id={`${idPrefix}-color-${i}`}
                          key={i}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                            selectedColor.name === color.name ? 'ring-2 ring-offset-2 ring-black scale-110' : 'border-gray-200'
                          }`}
                          title={color.name}
                        >
                          <span className={`w-6 h-6 rounded-full ${color.class} block shadow-inner flex items-center justify-center`}>
                            {selectedColor.name === color.name && (
                              <Check className={`w-3.5 h-3.5 ${color.class === 'bg-[#FAFAF0]' || color.class === 'bg-[#FFF3E3]' || color.class === 'bg-[#FFF9F2]' ? 'text-black' : 'text-white'}`} />
                            )}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes.length > 0 && product.sizes[0] !== 'All Size' && (
                  <div className="mb-6" id={`${idPrefix}-sizes`}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                        Ukuran: <span className="text-[#1C1A17] font-semibold">{selectedSize}</span>
                      </span>
                      <button className="text-xs text-[#8E7E6A] flex items-center gap-1 hover:underline">
                        <HelpCircle className="w-3.5 h-3.5" /> Panduan Ukuran
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          id={`${idPrefix}-size-btn-${size}`}
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[42px] h-[42px] border rounded-lg text-xs tracking-wider font-semibold transition-all ${
                            selectedSize === size
                              ? 'bg-black text-white border-black shadow-xs'
                              : 'border-gray-200 text-[#1C1A17] hover:border-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div>
                {/* Micro-Notification Banner inside modal feedback */}
                <AnimatePresence>
                  {addedMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs mb-4 flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{addedMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3" id={`${idPrefix}-ctas`}>
                  <button
                    id={`${idPrefix}-add-to-cart-btn`}
                    onClick={handleAddToCart}
                    className="flex-1 bg-black text-[#FAF8F5] py-4 rounded-xl font-semibold tracking-wider hover:bg-black/90 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Tambah ke Keranjang
                  </button>

                  <button
                    id={`${idPrefix}-wishlist-btn`}
                    onClick={() => onToggleWishlist(product)}
                    className={`p-4 border rounded-xl transition-all ${
                      isWishlisted
                        ? 'border-rose-200 text-rose-500 bg-rose-50'
                        : 'border-gray-200 text-gray-500 hover:border-black'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Luxury Credentials */}
                <div className="mt-6 flex items-center justify-around text-center text-xs text-gray-400 border-t border-gray-100 pt-5">
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#8E7E6A]" />
                    <span>Garansi Ori 100%</span>
                  </div>
                  <span className="w-px h-6 bg-gray-100" />
                  <div className="flex flex-col items-center gap-1">
                    <ShoppingBag className="w-4 h-4 text-[#8E7E6A]" />
                    <span>Tukar Ukuran Mudah</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
