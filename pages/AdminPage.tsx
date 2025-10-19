import { useState } from 'react';
import { useRestaurantStore } from '../store/restaurantStore';
import RestaurantEditModal from '../components/RestaurantEditModal';
import { Restaurant } from '../types';

export default function AdminPage() {
  const { restaurants, deleteRestaurant } = useRestaurantStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);

  const handleAddNew = () => {
    setEditingRestaurant(null);
    setIsModalOpen(true);
  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const handleDelete = (restaurantId: string) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      deleteRestaurant(restaurantId);
    }
  };

  return (
    <>
      <main className="container mx-auto px-4 py-12 sm:py-16">
        <div className="flex justify-between items-center mb-12">
          <div className="text-left">
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl tracking-tight">
                Admin Panel
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
                Manage your restaurants and menus.
              </p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800 transform hover:-translate-y-0.5"
          >
            Add New Restaurant
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3 font-bold">Restaurant Name</th>
                  <th scope="col" className="px-6 py-3 font-bold">Cuisine</th>
                  <th scope="col" className="px-6 py-3 font-bold">Rating</th>
                  <th scope="col" className="px-6 py-3 font-bold text-center">Menu Items</th>
                  <th scope="col" className="px-6 py-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant) => (
                  <tr key={restaurant.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {restaurant.name}
                    </th>
                    <td className="px-6 py-4">{restaurant.cuisine}</td>
                    <td className="px-6 py-4">{restaurant.rating.toFixed(1)}</td>
                    <td className="px-6 py-4 text-center">{restaurant.menu.length}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => handleEdit(restaurant)} className="font-medium text-emerald-600 dark:text-emerald-500 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(restaurant.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
             {restaurants.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-10">No restaurants found. Click "Add New Restaurant" to get started.</p>
            )}
          </div>
        </div>
      </main>

      {isModalOpen && (
        <RestaurantEditModal
          restaurant={editingRestaurant}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
