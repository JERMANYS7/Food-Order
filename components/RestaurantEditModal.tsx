import { useState, useEffect } from 'react';
import { Restaurant, FoodItem } from '../types';
import { useRestaurantStore } from '../store/restaurantStore';

interface Props {
  restaurant: Restaurant | null;
  onClose: () => void;
}

export default function RestaurantEditModal({ restaurant, onClose }: Props) {
  const { addRestaurant, updateRestaurant } = useRestaurantStore();
  const [formData, setFormData] = useState<Omit<Restaurant, 'id'>>({
    name: '',
    description: '',
    cuisine: '',
    rating: 4.5,
    address: '',
    openingHours: '',
    imageUrl: '',
    menu: [],
  });

  useEffect(() => {
    if (restaurant) {
      setFormData(restaurant);
    }
  }, [restaurant]);

  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
  };

  const handleMenuChange = (index: number, field: keyof FoodItem, value: string | number) => {
    const newMenu = [...formData.menu];
    const item = newMenu[index];
    if (field === 'price') {
        (item as any)[field] = parseFloat(value as string) || 0;
    } else {
        (item as any)[field] = value;
    }
    setFormData(prev => ({ ...prev, menu: newMenu }));
  };

  const addMenuItem = () => {
    setFormData(prev => ({
      ...prev,
      menu: [...prev.menu, { id: `new-${Date.now()}`, name: '', price: 0 }],
    }));
  };

  const removeMenuItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (restaurant) { // Editing existing
      updateRestaurant({ ...formData, id: restaurant.id });
    } else { // Adding new
      addRestaurant({ ...formData, id: `rest-${Date.now()}` });
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex justify-center items-center" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {restaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors" aria-label="Close form">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200" />
                </div>
                <div>
                    <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cuisine</label>
                    <input type="text" name="cuisine" id="cuisine" value={formData.cuisine} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200" />
                </div>
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200"></textarea>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                    <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200" />
                </div>
                 <div>
                    <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Opening Hours</label>
                    <input type="text" name="openingHours" id="openingHours" value={formData.openingHours} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200" />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                    <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200" />
                </div>
                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
                    <input type="number" name="rating" id="rating" value={formData.rating} onChange={handleChange} required min="1" max="5" step="0.1" className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200" />
                </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Menu Items</h3>
                <button type="button" onClick={addMenuItem} className="text-sm font-semibold text-emerald-600 hover:text-emerald-500">Add Item</button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {formData.menu.map((item, index) => (
                  <div key={index} className="grid grid-cols-10 gap-2 items-center">
                    <input type="text" value={item.name} onChange={(e) => handleMenuChange(index, 'name', e.target.value)} placeholder="Item name" required className="col-span-6 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-gray-200" />
                    <input type="number" value={item.price} onChange={(e) => handleMenuChange(index, 'price', e.target.value)} placeholder="Price" required min="0" step="0.01" className="col-span-3 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-gray-200" />
                    <button type="button" onClick={() => removeMenuItem(index)} className="col-span-1 text-gray-400 hover:text-red-500 transition-colors" aria-label="Remove item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-5 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="bg-white dark:bg-slate-700 py-2 px-4 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">Save</button>
            </div>
        </form>
      </div>
    </div>
  );
}