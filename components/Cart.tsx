import { useCart } from '../hooks/useCart';
import { updateItemQuantity, removeItemFromCart, clearCart } from '../commands/cartCommands';

export default function Cart({ onClose }) {
    const { items, totalPrice } = useCart();

    const handlePlaceOrder = () => {
        alert('Thank you for your order! Your food is on the way.');
        clearCart();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} aria-modal="true" role="dialog">
            <div 
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl z-50 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Order</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors" aria-label="Close cart">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                        <svg className="h-24 w-24 text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Your cart is empty</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Add some delicious food to get started!</p>
                    </div>
                ) : (
                    <div className="flex-grow overflow-y-auto p-6 divide-y divide-gray-100 dark:divide-slate-700">
                        {items.map(item => (
                            <div key={item.id} className="flex items-center justify-between py-4 text-gray-800 dark:text-gray-200">
                                <div className="flex-grow pr-4">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">฿{item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center bg-gray-100 dark:bg-slate-700 rounded-lg">
                                        <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 font-bold text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-l-lg transition-all transform active:scale-90">-</button>
                                        <span className="px-3 font-medium w-10 text-center">{item.quantity}</span>
                                        <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 font-bold text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-r-lg transition-all transform active:scale-90">+</button>
                                    </div>
                                    <button onClick={() => removeItemFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label={`Remove ${item.name} from cart`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {items.length > 0 && (
                    <div className="p-6 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                        <div className="flex justify-between font-semibold text-lg mb-4 text-gray-800 dark:text-white">
                            <span>Total</span>
                            <span>฿{totalPrice.toFixed(2)}</span>
                        </div>
                        <button 
                            onClick={handlePlaceOrder}
                            className="w-full bg-emerald-600 text-white py-3.5 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800 transform hover:-translate-y-0.5"
                        >
                            Place Order
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}