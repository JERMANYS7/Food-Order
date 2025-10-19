import { useCallback, useEffect, useState, useMemo } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import RestaurantCard from '../components/RestaurantCard';
import SkeletonCard from '../components/SkeletonCard';
import RestaurantDetailModal from '../components/RestaurantDetailModal';
import { Restaurant } from '../types';
import { useRestaurantStore } from '../store/restaurantStore';


interface RecommendedPageProps {
  searchQuery: string;
}

export default function RecommendedPage({ searchQuery }: RecommendedPageProps) {
  // Recommended page now uses the same global store
  const restaurants = useRestaurantStore((state) => state.restaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // Recommendations are now filtered from the main list.
  // We can define "recommended" as restaurants with a high rating.
  const recommendedRestaurants = useMemo(() => {
    return restaurants.filter(r => r.rating >= 4.5).sort((a, b) => b.rating - a.rating);
  }, [restaurants]);


  const filteredRestaurants = useMemo(() => {
    if (searchQuery.trim() === '') {
        return recommendedRestaurants;
    }
    return recommendedRestaurants.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [recommendedRestaurants, searchQuery]);

  // Note: This page assumes HomePage has already fetched the data.
  // If a user lands here first, the list will be empty until they visit Home.
  // A more robust solution might involve a global loading/error state in the store.
  const isLoading = useRestaurantStore((state) => state.restaurants.length === 0);

  const renderContent = () => {
    if (isLoading) {
      return (
         <div className="text-center py-10 px-4">
          <p className="text-gray-500 dark:text-gray-400">Loading recommendations... visit the Home page to fetch restaurant data.</p>
        </div>
      );
    }
    
    if (filteredRestaurants.length === 0) {
        return <p className="text-center text-gray-500 dark:text-gray-400 py-10">No recommended restaurants match your search.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard 
            key={restaurant.id} 
            restaurant={restaurant} 
            onViewDetails={() => setSelectedRestaurant(restaurant)}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <main className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl tracking-tight">
              Our Top Picks for You
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
              Highly-rated restaurants we think you'll love.
            </p>
        </div>
        {renderContent()}
      </main>

      {selectedRestaurant && (
        <RestaurantDetailModal 
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </>
  );
}
