export interface FuelPrice {
  id: string;
  name: string;
  price: number; // in UGX
  currency: string;
  unit: string; // e.g. "Litre", "Can"
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export type ServiceCategory = 'fuel-retail' | 'fuel-distribution' | 'logistics' | 'service-bay' | 'washing-bay' | 'convenience' | 'lubricants';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  icon: string; // lucide icon name
  image: string;
  benefits: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'station' | 'tankers' | 'garage' | 'supermarket' | 'washing' | 'operations';
  imageUrl: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number; // 1-5
  avatar?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email: string;
  serviceRequired: string;
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'resolved';
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  coordinates: string;
  plusCode: string;
  strategicContext: string;
  powerBackup: string;
  capacities: { product: string; capacity: string }[];
  localStack: {
    payments: string;
    forecourt: string;
    connectivity: string;
  };
}
