import { Product, BlogArticle, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'sh-001',
    name: 'Classy Beige Oversized Blazer',
    price: 899000,
    originalPrice: 1299000,
    category: 'wanita',
    subcategory: 'Blazer',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal Beige', class: 'bg-[#E5D3C0]' },
      { name: 'Classic Black', class: 'bg-black' },
      { name: 'Warm Cream', class: 'bg-[#FFF3E3]' }
    ],
    description: 'Blazer premium berkualitas tinggi dengan siluet oversized modern. Potongan presisi yang memberikan kesan clean luxury sekaligus santai. Dibuat menggunakan serat wol ringan terbaik yang nyaman dipakai sepanjang hari.',
    details: [
      'Bahan premium blend ultra-soft wool & polyester',
      'Detail double-breasted dengan kancing premium',
      'Dua saku samping fungsional dengan flap',
      'Furing dalam sutra yang sangat halus dan sejuk',
      'Model menggunakan ukuran S (tinggi badan 174cm)'
    ],
    rating: 4.9,
    reviewsCount: 48,
    featured: true,
    newArrival: true
  },
  {
    id: 'sh-002',
    name: 'Grecian Pleated Silk Maxi Dress',
    price: 1450000,
    category: 'wanita',
    subcategory: 'Dress',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Champagne Silk', class: 'bg-[#F1E5D1]' },
      { name: 'Soft Olive', class: 'bg-[#8E9B84]' },
      { name: 'Ethereal Rose', class: 'bg-[#EDC5C5]' }
    ],
    description: 'Gaun malam sutra berlipit yang mengalir lembut mengikuti gerakan Anda. Sentuhan kemewahan murni dengan bahu asimetris dan detail kerutan drapery khas Yunani kuno. Sangat sempurna untuk perayaan formal mewah.',
    details: [
      '100% serat sutra murni premium mulberry silk',
      'Detail pleated halus buatan tangan pengrajin',
      'Dilengkapi ritsleting tersembunyi berkualitas di samping',
      'Garis pinggang drapery elastis yang memeluk lekuk tubuh dengan nyaman',
      'Hanya untuk cuci kering profesional (Dry Clean)'
    ],
    rating: 5.0,
    reviewsCount: 32,
    featured: true,
    newArrival: true
  },
  {
    id: 'sh-003',
    name: 'Minimalist Signature Leather Handbag',
    price: 1850000,
    originalPrice: 2400000,
    category: 'aksesoris',
    subcategory: 'Handbag',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['All Size'],
    colors: [
      { name: 'Ebony Black', class: 'bg-[#181818]' },
      { name: 'Cognac Brown', class: 'bg-[#A05C2E]' },
      { name: 'Alabaster Ivory', class: 'bg-[#FAFAF0]' }
    ],
    description: 'Tas kulit eksklusif dengan kompartemen luas yang dirancang secara minimalis geometric. Dibuat tangan dari kulit sapi full-grain bertekstur kerikil halus yang tahan gores dan waktu.',
    details: [
      'Bahan kulit sapi full-grain premium impor Prancis',
      'Hardware kuningan berlapis emas 18 karat tahan karat',
      'Tali bahu kulit yang dapat dilepas-pasang dan disesuaikan',
      'Bagian dalam dilapisi microsuede tebal mewah',
      'Dimensi: 28cm x 22cm x 12cm'
    ],
    rating: 4.8,
    reviewsCount: 19,
    featured: true,
    newArrival: true
  },
  {
    id: 'sh-004',
    name: 'Urban Casual Suede Pointed Boots',
    price: 1250000,
    category: 'aksesoris',
    subcategory: 'Sepatu',
    images: [
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Suede Camel', class: 'bg-[#C19A6B]' },
      { name: 'Suede Espresso', class: 'bg-[#3D2314]' },
      { name: 'Midnight Charcoal', class: 'bg-[#2E2E2E]' }
    ],
    description: 'Boots ujung runcing bermaterial suede asli berkualitas tinggi yang mendefinisikan estetika high-fashion. Menghadirkan pilar tinggi hak 5cm yang super stabil untuk menunjang aktivitas padat bergaya.',
    details: [
      'Bahan 100% suede sapi asli dengan finishing water-resistant',
      'Insole berlapis memory foam empuk antilelah',
      'Sol luar karet anti-slip premium berkepadatan tinggi',
      'Desain ritsleting samping berlapis kulit untuk kemudahan pakai',
      'Heel tinggi 5.5cm berpotongan silinder kokoh'
    ],
    rating: 4.7,
    reviewsCount: 24,
    featured: false,
    newArrival: false
  },
  {
    id: 'sh-005',
    name: 'Oversized Silk-Blend Linen Shirt',
    price: 649000,
    originalPrice: 799000,
    category: 'pria',
    subcategory: 'Kemeja',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Ivory Cream', class: 'bg-[#FBF6ED]' },
      { name: 'Sage Green', class: 'bg-[#A2B19F]' },
      { name: 'Ocean Mist Blue', class: 'bg-[#CAD2D7]' }
    ],
    description: 'Kemeja berpotongan santai dengan perpaduan serat sutra dan linen premium. Menghasilkan sirkulasi udara luar biasa di hari panas, sambil tetap mempertahankan jatuhan bahan yang mewah dan berkilau halus.',
    details: [
      'Bahan 70% Italian Linen, 30% Mulberry Silk',
      'Kancing kerang mutiara (mother-of-pearl) eksklusif',
      'Kerah berpotongan retro santai (camp collar)',
      'Detail jahitan tepi single-needle ultra-rapi',
      'Model menggunakan ukuran L (tinggi badan 183cm)'
    ],
    rating: 4.9,
    reviewsCount: 56,
    featured: true,
    newArrival: false
  },
  {
    id: 'sh-006',
    name: 'Seasons Cream Knit Lounge Suit',
    price: 1199000,
    category: 'sale',
    originalPrice: 1999000,
    subcategory: 'Casual Outfit',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vanilla Cream', class: 'bg-[#FFF9F2]' },
      { name: 'Pebble Melange', class: 'bg-[#D3D3D3]' },
      { name: 'Toasted Almond', class: 'bg-[#D1B894]' }
    ],
    description: 'Paket set luar biasa dari knit top dan pant yang membungkus kehangatan dalam kemewahan murni. Sangat sempurna sebagai pakaian penerbangan, bepergian santai, maupun aktivitas sore nan elegan.',
    details: [
      'Kombinasi wol rajut kasmir super lembut yang sejuk dan elastis',
      'Celana palazzo berpinggang lebar elastis bersaku',
      'Knut baju berpola ribbed eksklusif di pergelangan tangan',
      'Tekstur kain solid tidak menerawang saat dipakai',
      'Potongan relaxed fit universal yang ultra-nyaman'
    ],
    rating: 4.8,
    reviewsCount: 42,
    featured: true,
    newArrival: false
  },
  {
    id: 'sh-007',
    name: 'Man Tailored Structured Trench',
    price: 1599000,
    originalPrice: 2299000,
    category: 'pria',
    subcategory: 'Blazer',
    images: [
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Classic Khaki', class: 'bg-[#C5A07A]' },
      { name: 'Deep Onyx', class: 'bg-[#121212]' }
    ],
    description: 'Mantel blazer terstruktur pria dengan gaya kontemporer Korea. Memberikan ketajaman bahu yang sempurna dengan penutupan minimalis kancing tersembunyi. Sempurna jika dikombinasikan dengan turtle-neck.',
    details: [
      'Kain gabardin katun premium tahan air (water-resistant)',
      'Detail saku dada dalam untuk gadget dan kartu',
      'Bahu berbusa tipis terstruktur yang gagah',
      'Bagian belakang bercelah (center-vent) untuk kenyamanan melangkah',
      'Lapisan furing tahan angin satin premium'
    ],
    rating: 4.9,
    reviewsCount: 38,
    featured: false,
    newArrival: true
  },
  {
    id: 'sh-008',
    name: 'Silk Essence Scarf Wrap',
    price: 399000,
    originalPrice: 599000,
    category: 'aksesoris',
    subcategory: 'Scarf',
    images: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['All Size'],
    colors: [
      { name: 'Copper Rust', class: 'bg-[#A75D3F]' },
      { name: 'Golden Sage', class: 'bg-[#D1B894]' },
      { name: 'Nacre White', class: 'bg-[#FFFDF9]' }
    ],
    description: 'Syal satin sutra elegan dengan visual motif lukisan abstrak orisinal. Memancarkan aura kemewahan klasik yang sangat memikat untuk disampirkan di bahu, leher, maupun diikat pada tas favorit Anda.',
    details: [
      'Material 100% Satin Sutra Crepe',
      'Pinggiran syal yang dijahit tangan melingkar (hand-rolled edges)',
      'Tekstur selembut sutra dengan kilau mutiara alami',
      'Ukuran optimal persegi: 90cm x 90cm',
      'Warna cerah abadi berteknologi pewarnaan ramah lingkungan'
    ],
    rating: 4.9,
    reviewsCount: 15,
    featured: false,
    newArrival: false
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-001',
    name: 'Victoria Amanda',
    rating: 5,
    comment: 'Kualitas Blazer Beige-nya luar biasa! Jatuhannya sangat rapi, tebal tapi tidak gerah sama sekali. Potongan jahitannya setara dengan brand high-end Eropa dengan harga berkali-kali lipat. Sangat merekomendasikan brand ini!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    role: 'Fashion Enthusiast',
    date: '12 Mei 2026'
  },
  {
    id: 'rev-002',
    name: 'Andra Wijaya',
    rating: 5,
    comment: 'Membeli Kemeja Oversized Silk-Linen untuk acara gala semi-formal. Tekstur kancing kerang mutiaranya terlihat mewah saat terkena sorotan lampu. Sifat sejuk dari linennya benar-benar terasa namun tidak berkerut kasar seperti linen biasa karena ada campuran silk-nya.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    role: 'Creative Director',
    date: '02 Mei 2026'
  },
  {
    id: 'rev-003',
    name: 'Soraya Pratiwi',
    rating: 4.8,
    comment: 'Handbag-nya berstruktur sempurna dengan jepitan hardware emas yang super solid dan elegan. Bahannya kulit asli sehingga wangi kulit alamiahnya tercium mewah. Pengirimannya pun dibungkus box beludru kancing magnet yang sangat eksklusif.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'Business Consultant',
    date: '28 April 2026'
  }
];

export const ARTICLES: BlogArticle[] = [
  {
    id: 'art-001',
    title: 'Minimalisme Quiet Luxury: Trend Mode Abadi 2024',
    excerpt: 'Memahami fenomena mode yang mengutamakan kualitas jahitan murni dan keheningan branding di atas logo mencolok.',
    category: 'Trend Fashion',
    date: '24 Mei 2026',
    readTime: '5 Menit Membaca',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    author: 'Gabriella Chen',
    content: [
      'Gaya hidup modern kini mengarah ke esensi yang semakin tenang. Dikenal dengan "Quiet Luxury", tren ini menjauh dari logo-logo desainer yang berukuran besar dan berisik, beralih ke material kelas premium yang berbicara lewat tekstur dan potongan baju yang sempurna.',
      'Untuk merealisasikan gaya ini, pilih palet warna netral yang bernuansa hangat seperti oatmeal, sand, charcoal, bone white, dan warm olive. Busana tanpa pola polos dengan garis arsitektur tegas adalah modal utama kesuksesan gaya elegan ini.',
      'Kunci rahasia dari quiet luxury terletak pada detail investasi jangka panjang. Sebuah blazer terstruktur wol murni atau kemeja perpaduan sutra akan bertahan puluhan tahun, memberikan siluet yang murni setiap kali dipakai tanpa khawatir tersingkir oleh perputaran tren musiman.'
    ]
  },
  {
    id: 'art-002',
    title: 'Panduan Praktis Membangun Capsule Wardrobe Minimalis',
    excerpt: 'Bagaimana mengkurasi hanya 15 pakaian esensial untuk menciptakan lebih dari 50 kombinasi gaya harian berbeda.',
    category: 'Outfit Tips',
    date: '18 Mei 2026',
    readTime: '4 Menit Membaca',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    author: 'Michael Hartono',
    content: [
      'Melangkah keluar rumah dengan percaya diri tidak memerlukan tumpukan lemari pakaian yang meluap penuh. Pendekatan capsule wardrobe menantang kita mengkurasi koleksi pakaian dengan fokus utama pada keselarasan kombinasi (mix-and-match adaptability).',
      'Langkah pertama: Pilih basis satu blazer oversized warna beige, dua kemeja linen netral berkualitas tinggi, celana pensil hitam berstruktur, dan satu pasang sepatu boots berkelas. Kunci keindahan padu-padan ini terletak pada pilihan warna dasar komplementer.',
      'Dengan merampingkan isi lemari Anda, Anda tidak hanya menghemat waktu bernilai setiap pagi tapi juga mendukung gaya hidup fesyen berkelanjutan (sustainable fashion) yang mengurangi sampah tekstil global secara signifikan.'
    ]
  },
  {
    id: 'art-003',
    title: 'Revitalisasi Sutra & Linen Dalam Padu Padan Cuaca Tropis',
    excerpt: 'Eksplorasi teknik pelapisan (layering) pakaian tipis premium agar tetap bergaya santai namun berkelas di iklim tropis.',
    category: 'Gaya Wanita',
    date: '11 Mei 2026',
    readTime: '6 Menit Membaca',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    author: 'Clara Sutjiandra',
    content: [
      'Cuaca hangat sering kali menghalangi pecinta fesyen untuk melakukan padu padan layering karena ketakutan akan kegerahan fisik. Namun, inovasi material seperti anyaman linen sutra bersirkulasi udara tinggi mengubah seluruh hukum fesyen tropis.',
      'Cobalah paduan kemeja linen mulberry di atas bra rajut krem tipis, dipadukan kulot lebar warna batu pasir. Tambahkan aksen mewah berupa syal sutra alam bermotif lukisan tangan yang diikat longgar pada leher atau diikat di tali tas kulit minimalis.',
      'Ini memberikan dimensi tekstur instan yang melahirkan aura estetika santai khas resor namun sangat siap dipakai untuk pertemuan makan siang profesional yang elegan.'
    ]
  },
  {
    id: 'art-004',
    title: 'Seni Siluet Arsitektur: Reformasi Fashion Pria Modern',
    excerpt: 'Cara desainer Seoul merevolusi bahu lebar dan potongan celana lebar terstruktur untuk pria urban kontemporer.',
    category: 'Gaya Pria',
    date: '04 Mei 2026',
    readTime: '4 Menit Membaca',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80',
    author: 'Davin Yudhistira',
    content: [
      'Sepanjang dekade terakhir, pakaian pria didominasi oleh siluet berpotongan ultra-slim fit yang kaku. Musim ini menandai transisi besar menuju kemerdekaan bergerak: siluet arsitektural yang bertumpu pada potongan boxy dan bahu lebar terstruktur drop-shoulder.',
      'Mantel trench berpotongan tegas yang dikombinasikan dengan celana wol ringan berlipit ganda melahirkan keseimbangan visual yang maskulin sekaligus anggun. Desain ini condong pada visual minimalis Korea abad ini.',
      'Siasat terbaik memakainya adalah menahan diri dari menambahkan aksesoris logam berpola ramai. Cukup satukan dominasi trench jacket di atas kaus katun organik premium dengan jam tangan berdesain mekanis bersih untuk tampilan kemewahan mutakhir.'
    ]
  }
];

export const BRAND_ADVANTAGES = [
  {
    title: 'Gratis Pengiriman Premium',
    description: 'Kami menanggung seluruh ongkir pengiriman ke seluruh wilayah Indonesia dengan jaminan asuransi penuh.',
    icon: 'Truck'
  },
  {
    title: 'Garansi 100% Originalitas',
    description: 'Seluruh material pakaian bersumber dari produsen tekstil bersertifikat internasional dengan garansi keaslian bahan.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Pengembalian 30 Hari Mudah',
    description: 'Ukuran busana kurang presisi? Tukarkan dengan penjemputan barang gratis ke rumah Anda dalam jangka 30 hari.',
    icon: 'Sparkles'
  }
];

export const LOOKBOOK_GALLERY = [
  {
    id: 'lb-1',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80',
    title: 'The Silent Hour',
    location: 'Sila Studio, Seoul',
    desc: 'Oatmeal double wool coat with silk inner linings.'
  },
  {
    id: 'lb-2',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    title: 'Warm Sand Breeze',
    location: 'Marrakech Resort Loft',
    desc: 'Pure mulberry silk drapery gowns and accessories.'
  },
  {
    id: 'lb-3',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
    title: 'Sculpted Shadows',
    location: 'National Museum of Contemporary Arts',
    desc: 'Structured trench tailoring and fine leather goods.'
  },
  {
    id: 'lb-4',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    title: 'Golden Linen Chapter',
    location: 'Santorini Residence',
    desc: 'Relaxed linen camp collars and matching flow pants.'
  },
  {
    id: 'lb-5',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    title: 'Modern Symphony',
    location: 'Urban Plaza, Tokyo',
    desc: 'High-waisted elegant casual sets for city movement.'
  }
];
