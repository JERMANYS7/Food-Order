import { addItemToCart } from '../commands/cartCommands';
import { Restaurant, FoodItem } from '../types';

interface Props {
  restaurant: Restaurant;
  onViewDetails: () => void;
}

export default function RestaurantCard({ restaurant, onViewDetails }: Props) {
  const handleAddItem = (e: React.MouseEvent, item: FoodItem) => {
    e.stopPropagation(); // Prevent modal from opening when clicking add
    addItemToCart(item);
  };

  return (
    <div 
      onClick={onViewDetails}
      className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl dark:hover:shadow-emerald-900/50 hover:-translate-y-1.5 flex flex-col cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" src={restaurant.imageUrl} alt={restaurant.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
            <span className="inline-block bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{restaurant.cuisine}</span>
        </div>
        <div className="absolute top-0 right-0 p-2.5">
            <div className="flex items-center gap-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{restaurant.rating.toFixed(1)}</span>
            </div>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">{restaurant.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-grow h-10">{restaurant.description}</p>
        
        <div className="space-y-3 mt-auto">
          {restaurant.menu.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-gray-50 dark:bg-slate-700/50 p-3 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{item.name}</p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">฿{item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={(e) => handleAddItem(e, item)}
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
  );
}
