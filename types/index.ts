// FIX: Define and export the application's data model types.
// This file was incorrectly containing a duplicate of the theme store.
// It should define the core types used across the application.
export interface FoodItem {
  id: string;
  name: string;
  price: number;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  menu: FoodItem[];
  imageUrl: string;
  cuisine: string;
  rating: number;
  address: string;
  openingHours: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}
