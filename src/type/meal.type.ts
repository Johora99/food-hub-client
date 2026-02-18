export interface Meal {
  id: string;
  title: string;
  content: string;
  category: string;
  dietary: string;
  price: number;
  image?: string;
  quantity: number;
  isFeatured: boolean;
  isAvailable: boolean;
  views: number;
  rating: number;
  providerId: string;
  createdAt: string;
  updatedAt: string;
}