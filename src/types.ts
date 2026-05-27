export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'wanita' | 'pria' | 'aksesoris' | 'sale';
  subcategory: string;
  images: [string, string]; // First is default, second is hover swap
  sizes: string[];
  colors: { name: string; class: string }[];
  description: string;
  details: string[];
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  newArrival?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; class: string };
  quantity: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  role: string;
  date: string;
}
