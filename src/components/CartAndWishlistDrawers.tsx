import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, Heart, ArrowRight, CreditCard, ShieldCheck } from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartAndWishlistDrawersProps {
  // Cart Props
  cartItems: CartItem[];
  isCartOpen: boolean;
  onCloseCart: () => void;
  onUpdateCartItemAndSize: (index: number, quantity: number) => void;
  onRemoveCartItem: (index: number) => void;
  onClearCart: () => void;
  
  // Wishlist Props
  wishlistItems: Product[];
  isWishlistOpen: boolean;
  onCloseWishlist: () => void;
  onRemoveFromWishlist: (product: Product) => void;
  onMoveWishlistItemToCart: (product: Product) => void;
}

export default function CartAndWishlistDrawers({
  cartItems,
  isCartOpen,
  onCloseCart,
  onUpdateCartItemAndSize,
  onRemoveCartItem,
  onClearCart,
  wishlistItems,
  isWishlistOpen,
  onCloseWishlist,
  onRemoveFromWishlist,
  onMoveWishlistItemToCart,
}: CartAndWishlistDrawersProps) {
  const [isCheckoutSimulated, setIsCheckoutSimulated] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    name: 'Andra Wijaya',
    phone: '08123456789',
    street: 'Jl. Senopati No. 42, Kebayoran Baru',
    city: 'Jakarta Selatan',
    postalCode: '12190',
  });
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const subTotal = cartTotal;
  const deliveryFee = cartTotal > 500000 ? 0 : 35000;
  const grandTotal = subTotal + deliveryFee;

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutComplete(false);
      setIsCheckoutSimulated(false);
      onCloseCart();
    }, 4000);
  };

  return (
    <>
      {/* 1. SHOPPING CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseCart}
              className="absolute inset-0 bg-black/55 backdrop-blur-3xs"
            />

            {/* Slider Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 27, stiffness: 220 }}
              className="relative w-full max-w-md h-full bg-[#FAF8F5] text-[#1C1A17] shadow-2xl flex flex-col justify-between z-10"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#8E7E6A]" />
                  <h3 className="font-serif text-lg font-medium">Keranjang Belanja</h3>
                  <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full font-semibold">
                    {cartItems.length}
                  </span>
                </div>
                <button
                  onClick={onCloseCart}
                  className="p-2 rounded-full hover:bg-black/5 text-gray-500 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable list */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
                    <ShoppingBag className="w-12 h-12 stroke-[1.2] mb-4 text-[#8E7E6A]/50" />
                    <p className="font-serif text-base mb-1 text-[#1C1A17]">Keranjang Kosong</p>
                    <p className="text-xs max-w-xs">Jelajahi katalogue kami dan temukan gaya pakaian premium terbaikmu hari ini.</p>
                    <button
                      onClick={onCloseCart}
                      className="mt-6 border border-black hover:bg-black hover:text-white transition-all text-xs tracking-widest font-semibold px-5 py-2.5 uppercase"
                    >
                      Mulai Belanja
                    </button>
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:shadow-xs transition-shadow"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      {/* Info & Adjusters */}
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <h4 className="text-sm font-medium leading-tight text-gray-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <div className="flex gap-2 items-center mt-1 text-[11px] text-gray-500">
                            <span>S: {item.selectedSize}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <span className={`w-2.5 h-2.5 rounded-full ${item.selectedColor.class} inline-block border border-gray-200`} />
                              <span>{item.selectedColor.name}</span>
                            </div>
                          </div>
                          <div className="mt-1.5 font-semibold text-xs text-black">
                            Rp {item.product.price.toLocaleString('id-ID')}
                          </div>
                        </div>

                        {/* Adjuster button and Trash */}
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center border border-gray-200 rounded-md bg-gray-50 h-7 text-xs">
                            <button
                              onClick={() => onUpdateCartItemAndSize(index, item.quantity - 1)}
                              className="px-2.5 h-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 font-semibold text-[#1C1A17]">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateCartItemAndSize(index, item.quantity + 1)}
                              className="px-2.5 h-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveCartItem(index)}
                            className="p-1 px-1.5 rounded-md hover:bg-rose-50 text-gray-400 hover:text-rose-500 transition-colors"
                            title="Hapus item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Sticky Calculation */}
              {cartItems.length > 0 && (
                <div className="p-5 border-t border-gray-100 bg-white space-y-4">
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Subtotal Belanja</span>
                      <span className="font-semibold text-black">Rp {subTotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ongkos Kirim Premium</span>
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-semibold tracking-wide uppercase">Gratis Ongkir</span>
                      ) : (
                        <span className="font-semibold text-black">Rp {deliveryFee.toLocaleString('id-ID')}</span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-400 leading-normal">
                      *Gratis ongkos kirim ke seluruh Indonesia untuk total pembelanjaan di atas Rp 500.000.
                    </p>
                    <div className="h-px bg-gray-100 my-2" />
                    <div className="flex justify-between text-sm text-[#1C1A17]">
                      <span className="font-serif font-medium">Grand Total</span>
                      <span className="text-base font-bold text-black font-serif">
                        Rp {grandTotal.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => setIsCheckoutSimulated(true)}
                    className="w-full bg-black text-white py-3.5 rounded-xl text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-black/95 transition-all active:scale-[0.98]"
                  >
                    Selesaikan Pembayaran <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. WISHLIST DRAWER (Loved items) */}
      <AnimatePresence>
        {isWishlistOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseWishlist}
              className="absolute inset-0 bg-black/55 backdrop-blur-3xs"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 27, stiffness: 220 }}
              className="relative w-full max-w-sm h-full bg-[#FAF8F5] text-[#1C1A17] shadow-2xl flex flex-col justify-between z-10"
            >
              {// Header
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-current" />
                  <h3 className="font-serif text-lg font-medium">Gaya Favorit</h3>
                  <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full font-semibold">
                    {wishlistItems.length}
                  </span>
                </div>
                <button
                  onClick={onCloseWishlist}
                  className="p-2 rounded-full hover:bg-black/5 text-gray-500 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>}

              {/* List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {wishlistItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
                    <Heart className="w-12 h-12 stroke-[1.2] mb-4 text-rose-300" />
                    <p className="font-serif text-base mb-1 text-[#1C1A17]">Wishlist Kosong</p>
                    <p className="text-xs max-w-xs">Gunakan ikon hati pada kartu produk untuk menyimpan koleksi pakaian impianmu ke dalam wishlist ini.</p>
                  </div>
                ) : (
                  wishlistItems.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl"
                    >
                      {/* Image */}
                      <div className="w-16 aspect-[3/4] rounded-lg overflow-hidden shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      {/* Info & Move to Cart */}
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="text-[10px] text-gray-400 tracking-wider uppercase block mt-0.5">
                            {product.subcategory}
                          </span>
                          <span className="font-bold text-xs mt-1 block">
                            Rp {product.price.toLocaleString('id-ID')}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => onMoveWishlistItemToCart(product)}
                            className="bg-black hover:bg-black/90 text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-md flex-1 transition-all"
                          >
                            Tambah Ke Keranjang
                          </button>
                          <button
                            onClick={() => onRemoveFromWishlist(product)}
                            className="text-gray-400 hover:text-rose-500 p-1.5 hover:bg-rose-50 rounded-md transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Close footer item */}
              <div className="p-5 border-t border-gray-100 bg-white text-center">
                <button
                  onClick={onCloseWishlist}
                  className="w-full border border-black hover:bg-black hover:text-white text-xs tracking-widest font-semibold uppercase py-3 transition-all"
                >
                  Lihat Koleksi Lainnya
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. SIMULATED CHECKOUT MODAL FLOW */}
      <AnimatePresence>
        {isCheckoutSimulated && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!checkoutComplete) setIsCheckoutSimulated(false);
              }}
              className="absolute inset-0 bg-black/65 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#FCFAF7] rounded-2xl overflow-hidden p-6 hover:shadow-2xl z-20 text-[#1C1A17] border border-[#ECDCCB]"
            >
              {!checkoutComplete ? (
                <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                  <div className="text-center relative">
                    <h3 className="font-serif text-2xl font-medium tracking-tight">Selesaikan Pembayaran</h3>
                    <p className="text-xs text-gray-400 mt-1">Konfirmasi tujuan pengiriman untuk mengirimkan koleksi busana premium Anda.</p>
                    <button
                      type="button"
                      onClick={() => setIsCheckoutSimulated(false)}
                      className="absolute -top-1 -right-1 p-1 rounded-full hover:bg-black/5"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="h-px bg-gray-100" />

                  {/* Address fields */}
                  <div className="space-y-4">
                    <span className="block text-[11px] font-bold tracking-widest uppercase text-gray-500">
                      Detail Pengiriman & Pengirim
                    </span>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-gray-500 font-medium mb-1 uppercase">Nama Penerima</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.name}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-hidden focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-500 font-medium mb-1 uppercase">No. Handphone</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.phone}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-hidden focus:border-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-500 font-medium mb-1 uppercase">Alamat Jalan Lengkap</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.street}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-hidden focus:border-black"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-gray-500 font-medium mb-1 uppercase">Kota</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-hidden focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-500 font-medium mb-1 uppercase">Kode Pos</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.postalCode}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                          className="w-full text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-hidden focus:border-black"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100" />

                  {/* Payment Info */}
                  <div className="space-y-3">
                    <span className="block text-[11px] font-bold tracking-widest uppercase text-gray-500">
                      Metode Pembayaran (Eksklusif)
                    </span>

                    <div className="border border-black bg-white rounded-xl p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FAF7F2] p-2 rounded-lg text-[#8E7E6A] border border-gray-100">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Virtual Account Premium Mandiri / BCA</p>
                          <p className="text-[10px] text-[#8E7E6A]">Proses verifikasi otomatis cepat</p>
                        </div>
                      </div>
                      <div className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                    </div>
                  </div>

                  {/* Secure info and total */}
                  <div className="bg-[#FCFAF7] border border-gray-100 rounded-xl p-4 gap-3 flex flex-col justify-between">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Total Pembayaran</span>
                      <span className="text-sm font-bold text-[#1C1A17] font-serif">Rp {grandTotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                      <ShieldCheck className="w-4 h-4 text-[#8E7E6A] shrink-0" />
                      <span>Sistem pembayaran aman dengan enkripsi bank berstandar internasional SSL 256-bit.</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-[#FAF8F5] py-4 rounded-xl text-xs font-semibold tracking-wider uppercase hover:bg-black/90 transition-all flex items-center justify-center gap-2.5 shadow-md"
                  >
                    Bayar Sekarang • Rp {grandTotal.toLocaleString('id-ID')}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-5">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-16 h-16 bg-[#FAF7F2] border border-[#E9DFD0] text-[#8E7E6A] rounded-full flex items-center justify-center mx-auto shadow-sm"
                  >
                    <ShieldCheck className="w-8 h-8 stroke-[1.5]" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-medium tracking-tight text-black">Pesanan Tersimpan!</h3>
                    <p className="text-xs text-[#8E7E6A] tracking-wider uppercase">Terima kasih atas kepercayaan Anda</p>
                  </div>

                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Pesanan Anda dengan total <strong className="font-semibold text-black">Rp {grandTotal.toLocaleString('id-ID')}</strong> berhasil diproses. Sistem kami sedang menyiapkan struk pembayaran eksklusif dan petunjuk pengiriman ke alamat <code className="bg-gray-100 p-1 text-[11px] rounded">{shippingAddress.street}, {shippingAddress.city}</code>.
                  </p>

                  <div className="pt-4 flex items-center justify-center gap-3 text-xs text-center text-gray-400 shrink-0">
                    <span className="animate-pulse inline-block w-2.5 h-2.5 rounded-full bg-black" />
                    <span>Mengalihkan dalam beberapa detik...</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
