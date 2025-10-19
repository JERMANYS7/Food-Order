import { useCallback, useEffect, useState, useMemo } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import RestaurantCard from '../components/RestaurantCard';
import SkeletonCard from '../components/SkeletonCard';
import RestaurantDetailModal from '../components/RestaurantDetailModal';
import { Restaurant } from '../types';
import { useRestaurantStore } from '../store/restaurantStore';

// Per guidelines, API key is in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const restaurantSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: 'Unique identifier for the restaurant' },
      name: { type: Type.STRING, description: 'Name of the restaurant' },
      description: { type: Type.STRING, description: 'A short description of the restaurant' },
      menu: {
        type: Type.ARRAY,
        description: 'A list of food items available on the menu',
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: 'Unique identifier for the food item' },
            name: { type: Type.STRING, description: 'Name of the food item' },
            price: { type: Type.NUMBER, description: 'Price of the food item in THB' },
          },
          required: ['id', 'name', 'price'],
        },
      },
      imageUrl: { type: Type.STRING, description: 'A dynamically generated image URL from Unsplash Source (e.g., "https://source.unsplash.com/800x600/?thai,food").' },
      cuisine: { type: Type.STRING, description: 'Type of cuisine (e.g., Thai, Italian, Japanese)' },
      rating: { type: Type.NUMBER, description: 'Customer rating from 1 to 5' },
      address: { type: Type.STRING, description: 'A plausible fictional street address in Bangkok' },
      openingHours: { type: Type.STRING, description: 'Typical opening and closing times, e.g., "11:00 AM - 10:00 PM"' },
    },
    required: ['id', 'name', 'description', 'menu', 'imageUrl', 'cuisine', 'rating', 'address', 'openingHours'],
  },
};

interface HomePageProps {
  searchQuery: string;
}

export default function HomePage({ searchQuery }: HomePageProps) {
  const { restaurants, setRestaurants } = useRestaurantStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const fetchRestaurants = useCallback(async () => {
    // Only fetch if the store is empty
    if (restaurants.length > 0) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: 'Generate a list of 6 diverse, fictional restaurants in Bangkok, Thailand. For each restaurant, create an appealing image URL using the Unsplash Source API format: "https://source.unsplash.com/800x600/?<query>", where <query> is a comma-separated list of relevant keywords for the restaurant\'s cuisine (e.g., "thai,food,curry"). Ensure a variety of cuisines like Thai, Japanese, Italian, and Mexican. Include a unique menu with 3-4 items for each. Provide realistic details like rating, a fictional but plausible address in Bangkok, and typical opening hours.',
          config: {
              responseMimeType: "application/json",
              responseSchema: restaurantSchema,
          },
      });
      
      const jsonText = response.text.trim();
      const data = JSON.parse(jsonText);

      if (!Array.isArray(data)) {
        throw new Error("API did not return a valid array of restaurants.");
      }
      setRestaurants(data); // Populate the global store
    } catch (e) {
      console.error(e);
      setError('Failed to fetch restaurants. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [restaurants.length, setRestaurants]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const cuisines = useMemo(() => {
    const allCuisines = restaurants.map(r => r.cuisine);
    return ['All', ...Array.from(new Set(allCuisines))];
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants;

    if (selectedCuisine !== 'All') {
      filtered = filtered.filter(r => r.cuisine === selectedCuisine);
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [restaurants, selectedCuisine, searchQuery]);
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10 px-4">
          <p className="text-red-500 font-semibold mb-4">{error}</p>
          <button
            onClick={() => {
                // Clear existing restaurants to force a refetch
                setRestaurants([]);
                fetchRestaurants();
            }}
            className="bg-emerald-500 text-white font-bold py-2 px-4 rounded hover:bg-emerald-600 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }
    
    if (filteredRestaurants.length === 0) {
        return <p className="text-center text-gray-500 dark:text-gray-400 py-10">No restaurants match your criteria.</p>;
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
              Find Your Next Favorite Meal
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
              Explore a curated list of the best restaurants in town.
            </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-slate-800 p-2 rounded-full">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                  selectedCuisine === cuisine
                    ? 'bg-emerald-500 text-white shadow'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
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
