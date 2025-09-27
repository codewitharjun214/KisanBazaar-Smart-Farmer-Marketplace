export type Role = 'farmer' | 'consumer';

export interface User {
  name: string;
  role: Role;
}

export type Page = 'home' | 'marketplace' | 'smart-farming' | 'dashboard';

export type ProductCategory = 'All' | 'Vegetable' | 'Fruit' | 'Grain' | 'Dairy' | 'Other';

export interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  farmer: string;
  location: string;
  category: ProductCategory;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CropSuggestion {
  name: string;
  sowing_season: string;
  water_requirements: string;
  soil_suitability: string;
  potential_yield: string;
  common_pests_diseases: string;
}

export interface FarmingAdvice {
  weather_summary: string;
  crop_suggestions: CropSuggestion[];
}