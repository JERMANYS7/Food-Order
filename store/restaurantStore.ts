import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Restaurant } from '../types';

interface RestaurantState {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
  // FIX: Add method signatures for adding, updating, and deleting restaurants to resolve errors.
  addRestaurant: (restaurant: Restaurant) => void;
  updateRestaurant: (restaurant: Restaurant) => void;
  deleteRestaurant: (restaurantId: string) => void;
}

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      restaurants: [],
      setRestaurants: (restaurants) => set({ restaurants }),
      // FIX: Implement addRestaurant to support creating new restaurants.
      addRestaurant: (restaurant) =>
        set((state) => ({
          restaurants: [...state.restaurants, restaurant],
        })),
      // FIX: Implement updateRestaurant to support editing existing restaurants.
      updateRestaurant: (restaurant) =>
        set((state) => ({
          restaurants: state.restaurants.map((r) =>
            r.id === restaurant.id ? restaurant : r
          ),
        })),
      // FIX: Implement deleteRestaurant to support deleting restaurants from the admin page.
      deleteRestaurant: (restaurantId) =>
        set((state) => ({
          restaurants: state.restaurants.filter(
            (r) => r.id !== restaurantId
          ),
        })),
    }),
    {
      name: 'restaurant-storage',
    }
  )
);
