import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Mail,
  ArrowUp,
  Menu,
  Instagram,
  MessageSquare,
  Check,
  UserCheck,
  Package,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { Product, CartItem, BlogArticle } from './types';
import { PRODUCTS, ARTICLES, REVIEWS, LOOKBOOK_GALLERY, BRAND_ADVANTAGES } from './data';
import QuickViewModal from './components/QuickViewModal';
import BlogDetailModal from './components/BlogDetailModal';
import CartAndWishlistDrawers from './components/CartAndWishlistDrawers';

export default function App() {
  // Navigation & Drawer States
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Interactive Cart & Wishlist storage
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  // Active Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [selectedLook, setSelectedLook] = useState<typeof LOOKBOOK_GALLERY[0] | null>(null);

  // User Profile Drawer Simulation
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=82',
      title: 'Style yang Menginspirasi,\nTampil Lebih Percaya Diri',
      subtitle: 'Koleksi fashion terbaru untuk pria dan wanita dengan desain modern, kualitas premium.',
      tag: 'Koleksi Musim Panas 2024'
    },
    {
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=82',
      title: 'Esensi Keindahan\nQuiet Luxury',
      subtitle: 'Sentuhan kemewahan sejati dalam heningnya ornamen. Menyajikan material wol & sutra terbaik.',
      tag: 'Editorial Edisi Terbatas'
    },
    {
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=82',
      title: 'Presisi Jahitan & Siluet\nKorea Kontemporer',
      subtitle: 'Memadukan kenyamanan bergerak dengan potongan struktural modern dari penjahit berkelas dunia.',
      tag: 'Gaya Urban Terpilih'
    }
  ];

  // Auto scroll hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Back to top button
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Filter products based on search query AND active category tab
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Action managers
  const handleAddToCart = (product: Product, size: string, color: { name: string; class: string }) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const isAlready = prev.some((item) => item.id === product.id);
      if (isAlready) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleMoveWishlistItemToCart = (product: Product) => {
    // Moves using default size and first color available
    handleAddToCart(product, product.sizes[0], product.colors[0]);
    // Remove from wishlist
    setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
    // Provide instant feedback in console or layout
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Newsletter interactive submission feedback
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSubmitted, setNewsSubmitted] = useState(false);

  const handleNewsSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsEmail) {
      setNewsSubmitted(true);
      setTimeout(() => {
        setNewsEmail('');
        setNewsSubmitted(false);
      }, 3500);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#1C1A17] overflow-x-hidden" id="homepage">
      {/* 1. TOPBAR ANNOUNCEMENT BAR */}
      <div 
        id="topbar-announcement"
        className="bg-black text-[#FAF8F5] py-2 px-4 text-center text-[10px] md:text-xs font-medium uppercase tracking-widest leading-relaxed flex items-center justify-center gap-1.5 transition-all"
      >
        <span>NEW ARRIVAL: Koleksi Terbaru Musim Panas 2024 Telah Tersedia!</span>
        <button 
          onClick={() => scrollToSection('featured-products')} 
          className="underline hover:text-[#D4BFA7] transition-colors focus:outline-none focus:ring-1 focus:ring-[#D4BFA7]"
        >
          Belanja Sekarang →
        </button>
      </div>

      {/* 2. HEADER / NAVBAR (Sticky, elegant glassmorphism) */}
      <header
        id="navbar-sticky"
        className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#F2EAE0] transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Mobile menu panel trigger icon */}
          <div className="flex md:hidden" id="nav-mobile-trigger">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 rounded-full hover:bg-black/5"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Luxury Brand & Tagline logo */}
          <div className="flex flex-col items-center md:items-start select-none" id="brand-identity-hub">
            <button
              onClick={() => scrollToSection('homepage')}
              className="text-[#1C1A17] font-serif font-black tracking-widest text-lg sm:text-xl lg:text-2xl uppercase focus:outline-none transition-transform active:scale-98"
            >
              STYLEHUB FASHION
            </button>
            <span className="hidden sm:inline-block text-[9px] text-[#8E7E6A] tracking-wider uppercase font-semibold">
              “Temukan Gaya Terbaikmu”
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold uppercase tracking-widest text-gray-500" id="desktop-routing-nav">
            <button onClick={() => scrollToSection('homepage')} className="text-black hover:text-[#8E7E6A] transition-colors">Beranda</button>
            <button onClick={() => { setActiveCategory('wanita'); scrollToSection('featured-products'); }} className="hover:text-black transition-colors">Wanita</button>
            <button onClick={() => { setActiveCategory('pria'); scrollToSection('featured-products'); }} className="hover:text-black transition-colors">Pria</button>
            <button onClick={() => { setActiveCategory('aksesoris'); scrollToSection('featured-products'); }} className="hover:text-black transition-colors">Aksesoris</button>
            <button onClick={() => { setActiveCategory('sale'); scrollToSection('featured-products'); }} className="text-red-600 hover:text-red-700 transition-colors tracking-widest font-bold">Sale</button>
            <button onClick={() => scrollToSection('editorial-lookbook')} className="hover:text-black transition-colors">Lookbook</button>
            <button onClick={() => scrollToSection('fashion-blog')} className="hover:text-black transition-colors">Blog</button>
          </nav>

          {/* Header Interactions (Icon actions) */}
          <div className="flex items-center gap-1.5 sm:gap-3" id="navigation-actions-pack">
            {/* Elegant search toggler */}
            <div className={`relative flex items-center ${isSearchActive ? 'w-44 sm:w-56' : 'w-8'} transition-all duration-300`}>
              {isSearchActive ? (
                <div className="flex items-center w-full bg-[#FAF7F2] border border-[#ECDCCB] rounded-full px-3 py-1">
                  <input
                    type="text"
                    required
                    placeholder="Cari gaya..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (e.target.value) {
                        scrollToSection('featured-products');
                      }
                    }}
                    className="w-full bg-transparent text-xs text-black border-none focus:outline-hidden"
                  />
                  <button onClick={() => { setSearchQuery(''); setIsSearchActive(false); }} className="p-0.5 rounded-full hover:bg-black/10 text-gray-400 hover:text-black transition-colors ml-1">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchActive(true)}
                  className="p-2 rounded-full hover:bg-black/5 text-[#1C1A17] transition-all"
                  title="Cari"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              )}
            </div>

            {/* Simulated User Profile Portal */}
            <button
              id="profile-trigger-btn"
              onClick={() => setIsProfileOpen(true)}
              className="p-2 rounded-full hover:bg-black/5 text-[#1C1A17] transition-all"
              title="Akun Saya"
            >
              <User className="w-4.5 h-4.5" />
            </button>

            {/* Wishlist triggers */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 rounded-full hover:bg-black/5 text-[#1C1A17] transition-all relative"
              title="Favorit"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </button>

            {/* Cart with count dynamics */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-full hover:bg-black/5 text-[#1C1A17] hover:scale-105 transition-all relative"
              title="Keranjang"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartItems.length > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-black text-[#FAF8F5] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#FAF8F5]">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel Flyout */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-navigation-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#FAF8F5] border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3 font-semibold uppercase tracking-widest text-xs text-gray-500 flex flex-col">
                <button 
                  onClick={() => scrollToSection('homepage')} 
                  className="py-2.5 text-left text-black border-b border-gray-50"
                >
                  Beranda
                </button>
                <button 
                  onClick={() => { setActiveCategory('wanita'); scrollToSection('featured-products'); }} 
                  className="py-2.5 text-left border-b border-gray-50"
                >
                  Wanita
                </button>
                <button 
                  onClick={() => { setActiveCategory('pria'); scrollToSection('featured-products'); }} 
                  className="py-2.5 text-left border-b border-gray-50"
                >
                  Pria
                </button>
                <button 
                  onClick={() => { setActiveCategory('aksesoris'); scrollToSection('featured-products'); }} 
                  className="py-2.5 text-left border-b border-gray-50"
                >
                  Aksesoris
                </button>
                <button 
                  onClick={() => { setActiveCategory('sale'); scrollToSection('featured-products'); }} 
                  className="py-2.5 text-left text-red-600 border-b border-gray-50 font-bold"
                >
                  Sale %
                </button>
                <button 
                  onClick={() => scrollToSection('editorial-lookbook')} 
                  className="py-2.5 text-left border-b border-gray-50"
                >
                  Lookbook
                </button>
                <button 
                  onClick={() => scrollToSection('fashion-blog')} 
                  className="py-2.5 text-left"
                >
                  Blog
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. HERO SECTION WITH IMAGE SLIDER & FLOAT PROMO BANNERS */}
      <section id="hero-carousel-section" className="relative w-full h-[70vh] md:h-[80vh] bg-black overflow-hidden flex items-center">
        {/* Background slider with infinite image transition */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.65, scale: 1.01 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.1 }}
              className="absolute inset-0"
            >
              <img
                src={heroSlides[currentSlide].image}
                alt="Model Fashion Editorial"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
          {/* Subtle elegant gradient backdrop */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Carousel Slide Content Interface */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
          {/* Left Text Block */}
          <div className="max-w-2xl text-[#FAF8F5] space-y-4">
            <motion.p
              key={`tag-${currentSlide}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#D4BFA7] text-[10px] sm:text-xs font-bold tracking-widest uppercase"
            >
              {heroSlides[currentSlide].tag}
            </motion.p>

            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight whitespace-pre-line"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>

            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-sm sm:text-base font-light max-w-lg leading-relaxed"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4 flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollToSection('featured-products')}
                className="bg-white text-black hover:bg-[#D4BFA7] hover:text-black hover:border-[#D4BFA7] transition-all text-xs tracking-widest font-bold uppercase px-6 py-3.5 rounded-md flex items-center gap-2"
              >
                Belanja Sekarang
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollToSection('editorial-lookbook')}
                className="border border-white/60 text-white hover:bg-white/10 transition-all text-xs tracking-widest font-semibold uppercase px-6 py-3.5 rounded-md"
              >
                Lihat Koleksi
              </button>
            </motion.div>
          </div>

          {/* Right Floating Promo Banner Side-Card (Inspired by French Luxury Boutiques) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full md:w-80 bg-[#FAF8F5] text-black rounded-2xl overflow-hidden shadow-2xl p-6 border border-[#ECE2D4] shrink-0"
          >
            <div className="border-b border-gray-100 pb-4 mb-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Limited Offer
              </span>
              <h3 className="font-serif text-xl font-medium mt-2">Summer Collection 2024</h3>
              <p className="text-xs text-gray-500 mt-1">Dapatkan diskon eksklusif untuk koleksi premium linen.</p>
            </div>

            <div className="flex justify-between items-baseline mb-5">
              <span className="text-[#8E7E6A] text-xs font-semibold tracking-wide uppercase">Discount Up To</span>
              <span className="text-3xl font-bold tracking-tight text-red-600 font-serif">30% OFF</span>
            </div>

            <button
              onClick={() => {
                setActiveCategory('sale');
                scrollToSection('featured-products');
              }}
              className="w-full bg-black text-white text-xs font-bold tracking-wider uppercase py-3 rounded-lg hover:bg-black/90 transition-all flex items-center justify-center gap-1.5"
            >
              Klaim Penawaran <Sparkles className="w-4 h-4 text-amber-500" />
            </button>
          </motion.div>
        </div>

        {/* Carousel manual navigation arrow icons */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-4">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="p-3 border border-white/30 rounded-full text-white/75 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {/* Progress Indicator dots */}
          <div className="flex items-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlide === i ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="p-3 border border-white/30 rounded-full text-white/75 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. SECTION KEUNGGULAN (Advantage Cards) */}
      <section id="advantages-section" className="py-12 bg-[#FAF7F2] border-b border-[#F2EAE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BRAND_ADVANTAGES.map((adv, i) => {
              // Icon selector
              let IconComp = Truck;
              if (adv.icon === 'ShieldCheck') IconComp = ShieldCheck;
              if (adv.icon === 'Sparkles') IconComp = Sparkles;

              return (
                <div
                  key={i}
                  className="bg-white border border-[#EFE5D9] rounded-2xl p-6.5 text-center flex flex-col items-center space-y-3 transition-transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-[#FAF7F2] rounded-full flex items-center justify-center text-[#8E7E6A] border border-[#EFE5D9]">
                    <IconComp className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#1C1A17]">{adv.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-xs">{adv.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SECTION KATEGORI POPULER WITH ZOOM OVERLAY */}
      <section id="popular-categories" className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[#8E7E6A] text-[10px] font-bold tracking-widest uppercase block">Kategori Terlaris</span>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-black">Jelajahi Berdasarkan Kategori</h2>
            <div className="w-12 h-0.5 bg-[#8E7E6A] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'wanita',
                title: 'Wanita',
                tag: 'Gaya Elegan',
                img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
              },
              {
                id: 'pria',
                title: 'Pria',
                tag: 'Potongan Minimalis',
                img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80',
              },
              {
                id: 'aksesoris',
                title: 'Aksesoris & Tas',
                tag: 'Bahan Kulit Asli',
                img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
              },
              {
                id: 'sale',
                title: 'Penawaran Spesial',
                tag: 'Diskon Akhir Pekan',
                img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
                isSale: true
              }
            ].map((cat, i) => (
              <div
                key={i}
                onClick={() => {
                  setActiveCategory(cat.id);
                  scrollToSection('featured-products');
                }}
                className="group relative h-[38vh] rounded-2xl overflow-hidden cursor-pointer bg-black shadow-xs hover:shadow-lg transition-all"
              >
                {/* Background zoom effect */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Info positioning */}
                <div className="relative z-10 h-full p-6 flex flex-col justify-end text-white">
                  <span className={`text-[9px] font-bold tracking-widest uppercase ${cat.isSale ? 'text-red-400' : 'text-[#D4BFA7]'}`}>
                    {cat.tag}
                  </span>
                  <h3 className="font-serif text-lg font-semibold mt-1 flex items-center gap-1.5">
                    {cat.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SECTION PRODUK UNGGULAN (Core Catalog & Real Filter/Search) */}
      <section id="featured-products" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[#8E7E6A] text-[10px] font-bold tracking-widest uppercase block">Katalog Terbaik</span>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-black">Produk Busana Unggulan</h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto">Filtrasi koleksi di bawah ini untuk melihat busana premium internasional kami.</p>
            <div className="w-12 h-0.5 bg-[#8E7E6A] mx-auto mt-4" />
          </div>

          {/* Filtering Tabs & Search Status */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider" id="filter-tabs-pack">
              {[
                { label: 'Semua Koleksi', id: 'all' },
                { label: 'Wanita', id: 'wanita' },
                { label: 'Pria', id: 'pria' },
                { label: 'Aksesoris', id: 'aksesoris' },
                { label: 'Edisi Sale %', id: 'sale' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id);
                  }}
                  className={`px-4.5 py-2.5 rounded-full transition-all border ${
                    activeCategory === tab.id
                      ? 'bg-black text-[#FAF8F5] border-black shadow-xs'
                      : 'border-transparent text-gray-500 hover:text-black hover:border-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Realtime Search Info */}
            {searchQuery && (
              <div className="text-xs text-[#8E7E6A] flex items-center gap-2">
                <span>Ditemukan {filteredProducts.length} gaya dengan kata kunci:</span>
                <code className="bg-gray-100 px-2 py-0.5 rounded font-bold text-black font-mono">"{searchQuery}"</code>
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:bg-black/5 rounded text-gray-400 hover:text-black"
                  title="Clear"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Catalog Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-400" id="empty-catalog-fallback">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-[1.2] mb-4 text-[#8E7E6A]/50" />
              <p className="font-serif text-lg text-black mb-1">Koleksi Tidak Ditemukan</p>
              <p className="text-xs max-w-sm mx-auto">Kami tidak dapat menemukan busana yang sesuai dengan pencarian Anda. Silakan coba filter/kategori lain.</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="mt-6 bg-black text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase px-4.5 py-2"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10" id="products-catalog-grid">
              {filteredProducts.map((prod) => {
                const isItemWishlisted = wishlistItems.some((w) => w.id === prod.id);

                return (
                  <div
                    key={prod.id}
                    className="group relative flex flex-col justify-between"
                  >
                    {/* Visual box wrapper */}
                    <div>
                      {/* Product Thumbnail Container with hover image-swap */}
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#F2EAE0]">
                        
                        {/* Dynamic absolute badges */}
                        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                          {prod.originalPrice && (
                            <span className="bg-red-600 text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm shadow-xs">
                              Sale
                            </span>
                          )}
                          {prod.newArrival && (
                            <span className="bg-[#FAF8F5]/90 text-black border border-gray-100 text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-sm shadow-xs">
                              New
                            </span>
                          )}
                        </div>

                        {/* Slide actions overlay (Wishlist icon) */}
                        <button
                          onClick={() => handleToggleWishlist(prod)}
                          className={`absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 shadow-sm border border-gray-100 text-[#1C1A17] hover:scale-110 active:scale-95 transition-all ${
                            isItemWishlisted ? 'text-rose-500 bg-rose-50 border-rose-100' : 'hover:bg-white'
                          }`}
                          title="Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${isItemWishlisted ? 'fill-current' : ''}`} />
                        </button>

                        {/* First Default image */}
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top absolute inset-0 transition-opacity duration-700 group-hover:opacity-0"
                        />
                        {/* Hover image swap */}
                        <img
                          src={prod.images[1]}
                          alt={`${prod.name} hover view`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top absolute inset-0 transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                        />

                        {/* Interactive overlay options block on hover */}
                        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <button
                            onClick={() => setSelectedProduct(prod)}
                            className="w-full bg-[#FAF8F5] hover:bg-black hover:text-white text-black py-3.5 rounded-xl text-xs font-semibold tracking-widest uppercase shadow-lg transition-all transform translate-y-2 group-hover:translate-y-0 duration-300"
                          >
                            Tinjau Cepat (Quick View)
                          </button>
                        </div>
                      </div>

                      {/* Header spec & content */}
                      <div className="mt-4 space-y-1 px-1">
                        <div className="flex justify-between items-baseline text-[10px] text-gray-400 font-semibold tracking-wider uppercase">
                          <span>{prod.subcategory}</span>
                          <span className="flex items-center gap-0.5 text-amber-500 text-xs font-medium">
                            <Star className="w-3 h-3 fill-current" />
                            {prod.rating.toFixed(1)}
                          </span>
                        </div>

                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#8E7E6A] transition-colors leading-tight line-clamp-1">
                          {prod.name}
                        </h3>
                      </div>
                    </div>

                    {/* Lower Price details and quick-add actions */}
                    <div className="mt-2.5 px-1 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-black font-serif">
                          Rp {prod.price.toLocaleString('id-ID')}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-[11px] line-through text-gray-400">
                            Rp {prod.originalPrice.toLocaleString('id-ID')}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedProduct(prod)}
                        className="p-2 rounded-lg bg-black/5 hover:bg-black text-black hover:text-white transition-all"
                        title="Detail & Beli"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 7. SECTION EDITORIAL LOOKBOOK (Magazine layout style) */}
      <section id="editorial-lookbook" className="py-24 bg-[#FAF7F2] border-t border-[#F2EAE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[#8E7E6A] text-[10px] font-bold tracking-widest uppercase block">Gaya Fotografi</span>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-black">Editorial Lookbook 2024</h2>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">Menampilkan narasi visual rancangan busana terbaik kami langsung dari studio.</p>
            <div className="w-12 h-0.5 bg-[#8E7E6A] mx-auto mt-4" />
          </div>

          {/* Magazine Collage grid (Non-uniform layout) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="editorial-collage-grid">
            {LOOKBOOK_GALLERY.map((look, idx) => {
              // Custom grid columns/rows spanned for non-uniform editorial styling
              let colSpan = 'md:col-span-4';
              let height = 'h-80 md:h-[480px]';
              if (idx === 1) { colSpan = 'md:col-span-8'; height = 'h-80 md:h-[480px]'; }
              if (idx === 2) { colSpan = 'md:col-span-6'; height = 'h-[360px]'; }
              if (idx === 3) { colSpan = 'md:col-span-6'; height = 'h-[360px]'; }
              if (idx === 4) { colSpan = 'md:col-span-12'; height = 'h-[440px]'; }

              return (
                <div
                  key={look.id}
                  onClick={() => setSelectedLook(look)}
                  className={`group relative ${colSpan} ${height} rounded-2xl overflow-hidden shadow-xs cursor-pointer bg-black`}
                >
                  <img
                    src={look.image}
                    alt={look.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-90 transition-all duration-700 group-hover:scale-103"
                  />
                  {/* Glassmorphism description plate */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent flex flex-col justify-end p-6 text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] text-[#D4BFA7] uppercase tracking-widest">{look.location}</span>
                    <h3 className="font-serif text-xl font-medium mt-1">{look.title}</h3>
                    <p className="text-xs text-gray-300 font-light mt-1.5 leading-relaxed max-w-md">{look.desc}</p>
                    <span className="text-[10px] underline tracking-widest uppercase font-semibold mt-3 flex items-center gap-1">
                      Detail Koleksi <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Desktop minimal indicator when not hovered */}
                  <div className="absolute bottom-5 left-5 text-white/95 font-serif text-sm tracking-wide md:group-hover:opacity-0 transition-opacity duration-200">
                    #{look.id.replace('lb-', '0')} — {look.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lookbook Lightbox Card Modal */}
      <AnimatePresence>
        {selectedLook && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLook(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#FCFAF7] rounded-2xl overflow-hidden p-6 text-black z-10 space-y-4"
            >
              <button
                onClick={() => setSelectedLook(null)}
                className="absolute right-4 top-4 bg-white/90 p-2 rounded-full hover:bg-white text-black z-20"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-[16/10] rounded-xl overflow-hidden">
                <img
                  src={selectedLook.image}
                  alt={selectedLook.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-[#8E7E6A]">{selectedLook.location}</span>
                <h3 className="font-serif text-2xl font-medium text-[#1C1A17]">{selectedLook.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">{selectedLook.desc}</p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
                <span>Fotografer: STYLEHUB Global Creative Team</span>
                <button
                  onClick={() => {
                    setSelectedLook(null);
                    scrollToSection('featured-products');
                  }}
                  className="text-black hover:underline"
                >
                  Belanja Tema Ini
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. SECTION PROMO BANNER (Countdown focus) */}
      <section id="promo-sale-banner" className="relative py-24 bg-black overflow-hidden flex items-center">
        {/* Abstract model cover */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1500&q=80"
            alt="Exclusive collection banner background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35"
          />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-[#FAF8F5] space-y-6">
          <span className="text-amber-400 text-xs sm:text-sm font-bold tracking-widest uppercase block animate-pulse">
            ★ SALE AKHIR MUSIM ★
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
            Exclusive Summer Sale
          </h2>
          <p className="font-serif text-xl md:text-2xl text-red-400 font-semibold italic">
            Diskon Hingga 70% Untuk Semua Produk Terakhir
          </p>
          <p className="text-gray-300 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Silakan raih kesempatan terakhir mengoleksi gaun sutra, tas jinjing minimalis, dan blazer berstruktur sutra premium dengan penawaran harga pangkas kami.
          </p>

          <div className="pt-4">
            <button
              onClick={() => {
                setActiveCategory('sale');
                scrollToSection('featured-products');
              }}
              className="bg-white text-black hover:bg-red-600 hover:text-white transition-all text-xs tracking-widest font-bold uppercase px-8 py-4 rounded-xl shadow-lg flex items-center gap-2 mx-auto"
            >
              Belanja Sekarang <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. SECTION TESTIMONI CLIENT */}
      <section id="testimonials-section" className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[#8E7E6A] text-[10px] font-bold tracking-widest uppercase block">Ulasan Pelanggan</span>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-black">Dipercaya Oleh Pengamat Fesyen</h2>
            <div className="w-12 h-0.5 bg-[#8E7E6A] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-[#F2EAE0] rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex text-amber-500 gap-1 mb-4" id={`rev-stars-${rev.id}`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rev.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>

                  {/* Quote Body */}
                  <p className="text-xs md:text-sm text-gray-600 italic leading-relaxed font-light">
                    "{rev.comment}"
                  </p>
                </div>

                {/* User Info card segment */}
                <div className="flex items-center gap-3 mt-6 border-t border-gray-50 pt-4" id={`rev-user-${rev.id}`}>
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 leading-tight">
                      {rev.name}
                    </h4>
                    <span className="text-[10px] text-gray-400 tracking-wider">
                      {rev.role} • {rev.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. SECTION BLOG ARTINYA INSIGHT FASHION */}
      <section id="fashion-blog" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[#8E7E6A] text-[10px] font-bold tracking-widest uppercase block">Sudut Blog Gaya</span>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-black">Inspirasi Mode & Trend Terbaru</h2>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">Pelajari cara menata pakaian, merawat wol murni, dan merancang busana minimalismu.</p>
            <div className="w-12 h-0.5 bg-[#8E7E6A] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ARTICLES.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="group flex flex-col h-full bg-[#FAF8F5] border border-gray-100 rounded-2xl overflow-hidden cursor-pointer shadow-3xs hover:shadow-md transition-shadow"
              >
                {/* Blog Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 bg-[#FAF7F2]">
                  <img
                    src={art.image}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-all duration-500"
                  />
                  <span className="absolute bottom-3 left-3 bg-black/75 text-white text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm">
                    {art.category}
                  </span>
                </div>

                {/* Content body layout */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-medium tracking-wider block">
                      {art.date} • {art.readTime}
                    </span>
                    <h3 className="font-serif text-sm font-semibold text-[#1C1A17] hover:text-[#8E7E6A] transition-colors mt-2 line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mt-2.5 font-light">
                      {art.excerpt}
                    </p>
                  </div>

                  <span className="text-[10px] uppercase font-bold text-black tracking-widest mt-4 flex items-center gap-1 hover:underline">
                    Baca Selengkapnya →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. SECTION NEWSLETTER (Interactive, subscription system simulation) */}
      <section id="newsletter-subscription" className="py-20 bg-[#FAF7F2] border-t border-b border-[#F2EAE0]">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#8E7E6A] border border-[#ECE2D4] mx-auto">
            <Mail className="w-5 h-5" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-black">
              Dapatkan Update Fashion Terbaru
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              Mendaftarlah hari ini dan dapatkan <strong className="font-semibold text-black">diskon 10%</strong> untuk pesanan perdana Anda, serta kiriman buletin digital busana eksklusif Stylehub.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!newsSubmitted ? (
              <motion.form
                onSubmit={handleNewsSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Alamat email premium Anda"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="flex-1 text-xs px-4.5 py-3.5 bg-white border border-[#E9DFD0] rounded-xl focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black placeholder-gray-400 shrink-0"
                />
                <button
                  type="submit"
                  className="bg-black text-[#FAF8F5] px-6 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-black/90 transition-all active:scale-[0.98]"
                >
                  Join
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs leading-normal flex items-center justify-center gap-2 max-w-sm mx-auto"
              >
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Terima kasih! Kode kupon diskon 10% dikirimkan ke email Anda.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer id="website-footer" className="bg-[#1C1A17] text-gray-400 py-16 text-xs border-t border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo Brand Segment */}
          <div className="space-y-4">
            <h3 className="font-serif text-[#FAF8F5] font-black uppercase text-lg tracking-widest">
              STYLEHUB FASHION
            </h3>
            <p className="text-[11px] text-gray-500 leading-relaxed font-light">
              Brand fesyen premium internasional yang mendedikasikan inovasi tekstil pada garis rajut modern bernuansa quiet luxury, minimalis, dan elegan.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://instagram.com" referrerPolicy="no-referrer" target="_blank" className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://whatsapp.com" referrerPolicy="no-referrer" target="_blank" className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Menu */}
          <div className="space-y-3">
            <h4 className="font-serif text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase">Kategori Belanja</h4>
            <div className="flex flex-col gap-2 font-medium">
              <button onClick={() => { setActiveCategory('wanita'); scrollToSection('featured-products'); }} className="text-left hover:text-white transition-colors">Pakaian Wanita</button>
              <button onClick={() => { setActiveCategory('pria'); scrollToSection('featured-products'); }} className="text-left hover:text-white transition-colors">Koleksi Pria</button>
              <button onClick={() => { setActiveCategory('aksesoris'); scrollToSection('featured-products'); }} className="text-left hover:text-white transition-colors">Aksesoris & Tas</button>
              <button onClick={() => { setActiveCategory('sale'); scrollToSection('featured-products'); }} className="text-left text-red-500 hover:text-red-400 transition-colors font-bold">Lapak Diskon Sale</button>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h4 className="font-serif text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase">Layanan Pelanggan</h4>
            <div className="flex flex-col gap-2 font-medium">
              <button className="text-left hover:text-white transition-colors">Hubungi Support WA</button>
              <button className="text-left hover:text-white transition-colors">Panduan Penukaran Ukuran</button>
              <button className="text-left hover:text-white transition-colors">Kebijakan Pengembalian</button>
              <button className="text-left hover:text-white transition-colors">Lacak Kiriman Premium</button>
            </div>
          </div>

          {/* Contacts & Payment channels */}
          <div className="space-y-4">
            <h4 className="font-serif text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase">Pembayaran Aman</h4>
            <p className="text-[11px] text-gray-500 leading-tight block">
              Menerima Virtual Account Mandiri, BCA, BRI, Visa, Mastercard, AMEX & QRIS.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px]" id="payment-methods-badges">
              <span className="px-2 py-1 bg-white/5 border border-white/10 text-white rounded font-bold font-sans">BCA</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 text-white rounded font-bold font-sans">MANDIRI</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 text-white rounded font-bold font-sans">VISA</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 text-white rounded font-bold font-sans">QRIS</span>
            </div>

            <div className="h-px bg-white/10" />

            <div className="text-[10px] text-gray-500">
              <span className="bold block text-white font-serif mb-0.5">STYLEHUB Kantor Pusat</span>
              <span>Kebayoran Baru, Jakarta Selatan, 12190.</span>
            </div>
          </div>
        </div>

        {/* Outer Legal Line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-[10px]" id="footer-legal-bar">
          <p>© {new Date().getFullYear()} STYLEHUB FASHION. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex gap-4">
            <button className="hover:text-white transition-colors">Kebijakan Privasi</button>
            <button className="hover:text-white transition-colors">Syarat & Ketentuan</button>
          </div>
        </div>
      </footer>

      {/* 13. ADDITIONAL INTERACTIVE FEATURES */}

      {/* Profile Drawer Overlay (Fictional account sync details) */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-3xs"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 27, stiffness: 220 }}
              className="relative w-full max-w-sm h-full bg-[#FAF8F5] text-[#1C1A17] shadow-2xl flex flex-col justify-between z-10"
            >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#8E7E6A]" />
                  <h3 className="font-serif text-lg font-medium">Akun Fesyen Saya</h3>
                </div>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 text-gray-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Account Profile and Status */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div className="text-center p-4 bg-white border border-gray-100 rounded-2xl shadow-3xs">
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-[#E9DFD0]">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
                      alt="Profile Avatar"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-sm font-bold">Andra Wijaya</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">andra.wijaya@gmail.com</p>
                  
                  {/* Member Badge Tier */}
                  <div className="mt-3.5 inline-block bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold tracking-widest uppercase px-3.5 py-1 rounded-full">
                    ★ Prestige Gold Member
                  </div>
                </div>

                {/* Loyalty Point stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-gray-100 rounded-xl p-3 text-center">
                    <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Style Points</span>
                    <span className="text-lg font-bold text-[#1C1A17]">1,450 pts</span>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-3 text-center">
                    <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Kupon Promo</span>
                    <span className="text-lg font-bold text-red-600">3 Tersedia</span>
                  </div>
                </div>

                {/* Purchase History */}
                <div className="space-y-3">
                  <span className="block text-[11px] font-semibold tracking-widest uppercase text-gray-400">
                    Histori Pembelian
                  </span>

                  {[
                    { id: 'TRX-94827', date: '14 Mei 2026', total: 1450000, status: 'Sedang Dikirim' },
                    { id: 'TRX-58273', date: '10 Apr 2026', total: 899000, status: 'Selesai' }
                  ].map((trx, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-xl p-3.5 text-xs text-gray-500">
                      <div className="flex justify-between font-bold text-black">
                        <span>{trx.id}</span>
                        <span>Rp {trx.total.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between text-[11px] mt-1">
                        <span>{trx.date}</span>
                        <span className={trx.status === 'Selesai' ? 'text-emerald-600 font-semibold' : 'text-amber-600 font-semibold'}>
                          {trx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Exclusive Services list */}
                <div className="space-y-2 text-xs">
                  <span className="block text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-2">
                    Layanan VIP
                  </span>
                  <div className="p-3 bg-[#FAF7F2] border border-[#EBE2D5] rounded-xl flex items-center gap-3">
                    <Package className="w-5 h-5 text-[#8E7E6A] shrink-0" />
                    <div>
                      <p className="font-semibold text-black">Gratis Penjemputan Retur VIP</p>
                      <p className="text-[10px] text-gray-500 leading-tight">Kurir eksklusif kami siap menjemput produk retur langsung dari kediaman Anda.</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#FAF7F2] border border-[#EBE2D5] rounded-xl flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#8E7E6A] shrink-0" />
                    <div>
                      <p className="font-semibold text-black">Konsultasi Desainer Pribadi</p>
                      <p className="text-[10px] text-gray-500 leading-tight">Gunakan WhatsApp call untuk konsultasi kecocokan ukuran dan mix-and-match.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-gray-100 bg-white text-center">
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full bg-black text-white text-xs font-semibold tracking-widest uppercase py-3 rounded-lg hover:bg-black/90"
                >
                  Tutup Panel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick View Modal Hookup */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlistItems.some((w) => w.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Blog Reading Modal Hookup */}
      <BlogDetailModal
        article={selectedArticle}
        isOpen={selectedArticle !== null}
        onClose={() => setSelectedArticle(null)}
      />

      {/* Right Drawer managers */}
      <CartAndWishlistDrawers
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        onCloseCart={() => setIsCartOpen(false)}
        onUpdateCartItemAndSize={handleUpdateCartQuantity}
        onRemoveCartItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        wishlistItems={wishlistItems}
        isWishlistOpen={isWishlistOpen}
        onCloseWishlist={() => setIsWishlistOpen(false)}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveWishlistItemToCart={handleMoveWishlistItemToCart}
      />

      {/* Floating Scroll To Top Indicator Button */}
      {showScrollTop && (
        <button
          onClick={() => scrollToSection('homepage')}
          className="fixed bottom-6 right-6 z-30 p-3 bg-black hover:bg-black/95 text-white rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 border border-white/10"
          title="Kembali ke Atas"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
