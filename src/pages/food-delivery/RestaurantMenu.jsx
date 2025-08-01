import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFoodDelivery } from '../../context/FoodDeliveryContext';
import { Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RestaurantMenu = () => {
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { addToCart, removeFromCart, cart, cartRestaurant, clearCart, getCartTotal } = useFoodDelivery();
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_BASE_URL}/restaurants/${restaurantId}`);
                setRestaurant(res.data.restaurant);

                const menuRes = await axios.get(`${API_BASE_URL}/restaurants/${restaurantId}/menu`);
                setMenuItems(menuRes.data.menuItems || []);
            } catch (err) {
                setRestaurant(null);
                setMenuItems([]);
            }
            setLoading(false);
        };
        fetchData();
    }, [restaurantId, API_BASE_URL]);

    const cartTotals = getCartTotal();

    if (loading || !restaurant || !restaurant._id) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white ">
                <div className="text-gray-700 dark:text-gray-200 text-xl font-semibold">
                    {loading ? "Loading..." : "Restaurant not found."}
                </div>
            </div>
        );
    }
    if (!restaurant) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-gray-700 dark:text-gray-200 text-xl font-semibold">Restaurant not found.</div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-white transition-colors duration-300">
            {/* MACHA-style Navbar */}
            <nav className="w-full bg-gradient-to-r from-green-900 via-green-800 to-emerald-700 shadow-lg py-5 mb-8">
                <div className="container mx-auto px-4 flex items-center">
                    <button
                        type="button"
                        className="text-white font-bold text-lg flex items-center hover:underline"
                        onClick={() => navigate('/food-delivery')}
                    >
                        &larr; <span className="ml-2">Back to Restaurants</span>
                    </button>
                    <span className="mx-auto font-seriflogo font-bold text-2xl md:text-3xl tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        MACHA <span className="text-green-400">Food</span>
                    </span>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-4">
                <div className="mb-8">
                    <h1 className="text-3xl text-black font-bold mb-1">{restaurant.name}</h1>
                    <p className="mb-2 text-black text-gray-600">{restaurant.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span>⭐ {restaurant.rating || '4.2'}</span>
                        <span>• {restaurant.cuisineType?.join(', ') || restaurant.cuisineType || ''}</span>
                    </div>
                    <div className="text-xs text-green-700 font-semibold">{restaurant.discount}</div>
                </div>
                <h2 className="text-2xl text-black font-semibold mb-4">Menu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {menuItems.length === 0 ? (
                        <div className="col-span-full text-gray-500">No menu items available.</div>
                    ) : (
                        menuItems.map(item => {
                            const inCart = cart.find(cartItem => cartItem.id === item._id);
                            return (
                                <div key={item._id} className="bg-white rounded-xl shadow-lg p-5 flex flex-col hover:shadow-2xl transition-shadow">
                                    <div className="relative mb-3">
                                        <img
                                            src={item.imageUrl || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'}
                                            alt={item.name}
                                            className="h-44 w-full object-cover rounded-lg"
                                        />
                                        <span className={`absolute top-2 left-2 px-2 py-1 text-xs rounded-full font-semibold ${item.isVegetarian ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {item.isVegetarian ? 'Veg' : 'Non-Veg'}
                                        </span>
                                        {item.bestseller && (
                                            <span className="absolute top-2 right-2 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-semibold">
                                                Bestseller
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg  text-black font-bold mb-1">{item.name}</h3>
                                    <p className="text-gray-600 mb-2 text-black line-clamp-2">{item.description}</p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="font-semibold text-green-700 text-lg">₹{item.price}</span>
                                        {inCart ? (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="w-8 h-8 rounded-full bg-red-50 text-red-600 border border-red-400 font-bold"
                                                    onClick={() => removeFromCart(item._id)}
                                                >-</button>
                                                <span className="font-semibold text-black">{inCart.quantity}</span>
                                                <button
                                                    className="w-8 h-8 rounded-full bg-green-50 text-green-600 border border-green-500 font-bold"
                                                    onClick={() => addToCart({ ...item, id: item._id }, { id: restaurant._id, name: restaurant.name })}
                                                >+</button>
                                            </div>
                                        ) : (
                                            <button
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                                                onClick={() => addToCart({ ...item, id: item._id }, { id: restaurant._id, name: restaurant.name })}
                                            >
                                                Add to Cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Cart Footer Box */}
            <AnimatePresence>
                {cart.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 z-50"
                    >
                        <div className="container mx-auto flex justify-between items-center">
                            <div>
                                <div className="flex items-center">
                                    <div className="text-gray-700 font-medium mr-4">
                                        {cart.reduce((total, item) => total + item.quantity, 0)} Items | ₹{cartTotals.subtotal.toFixed(2)}
                                    </div>
                                    {cartRestaurant && (
                                        <div className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-800">
                                            from {cartRestaurant.name}
                                        </div>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500 flex items-center">
                                    <Clock size={12} className="mr-1" />
                                    Delivery: 30-45 min • Extra charges may apply
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={clearCart}
                                    className="px-3 py-2 border border-red-500 text-red-500 rounded-lg text-sm hover:bg-red-50"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={() => navigate('/food-delivery/checkout')}
                                    className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RestaurantMenu;