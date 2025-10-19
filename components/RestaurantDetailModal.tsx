import { useEffect } from 'react';
import { Restaurant, FoodItem } from '../types';
import { addItemToCart } from '../commands/cartCommands';

interface Props {
  restaurant: Restaurant;
  onClose: () => void;
}

export default function RestaurantDetailModal({ restaurant, onClose }: Props) {

  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleAddItem = (item: FoodItem) => {
    addItemToCart(item);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex justify-center items-center" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="restaurant-title"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img 
            src={restaurant.imageUrl} 
            alt={restaurant.name} 
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
            aria-label="Close details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 id="restaurant-title" className="text-3xl font-bold text-gray-900 dark:text-white">{restaurant.name}</h2>
              <span className="inline-block bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 text-sm font-semibold px-3 py-1 rounded-full mt-2">{restaurant.cuisine}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-slate-700 px-3 py-1.5 rounded-full shadow-sm flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{restaurant.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{restaurant.description}</p>

          <div className="space-y-4 mb-6 text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{restaurant.openingHours}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-t border-gray-200 dark:border-slate-700 pt-4">Menu</h3>
          <div className="space-y-3">
            {restaurant.menu.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-gray-50 dark:bg-slate-700/50 p-3 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{item.name}</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">฿{item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleAddItem(item)}
                  className="bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:ring-offset-slate-800 transform active:scale-95"
                  aria-label={`Add ${item.name} to cart`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span>Add</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
