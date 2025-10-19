import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Restaurant } from '../types';

interface RestaurantState {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
  addRestaurant: (restaurant: Restaurant) => void;
  updateRestaurant: (restaurant: Restaurant) => void;
  deleteRestaurant: (restaurantId: string) => void;
}

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      restaurants: [],
      setRestaurants: (restaurants) => set({ restaurants }),
      addRestaurant: (restaurant) =>
        set((state) => ({
          restaurants: [...state.restaurants, restaurant],
        })),
      updateRestaurant: (restaurant) =>
        set((state) => ({
          restaurants: state.restaurants.map((r) =>
            r.id === restaurant.id ? restaurant : r
          ),
        })),
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