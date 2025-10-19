import { useCartStore } from '../store/cartStore';
import { FoodItem } from '../types';

export const addItemToCart = (item: FoodItem) => {
  useCartStore.getState().addItem(item);
};

export const removeItemFromCart = (itemId: string) => {
  useCartStore.getState().removeItem(itemId);
};

export const updateItemQuantity = (itemId: string, quantity: number) => {
  useCartStore.getState().updateQuantity(itemId, quantity);
};

export const clearCart = () => {
    useCartStore.getState().clearCart();
};
