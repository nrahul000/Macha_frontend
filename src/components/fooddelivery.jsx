import React from "react";
import { ShoppingBasket, Package, Clock, Phone } from "lucide-react";

const foodFeatures = [
    {
        icon: <ShoppingBasket size={28} className="text-green-600" />,
        title: "All Food Delivery",
        desc: "Meals, snacks, tiffins, lunch boxes delivered hot & fresh.",
    },
    {
        icon: <Package size={28} className="text-green-600" />,
        title: "Groceries & Essentials",
        desc: "Daily needs, organic vegetables, fruit boxes at your doorstep.",
    },
    {
        icon: <Clock size={28} className="text-green-600" />,
        title: "Fast Delivery",
        desc: "Quick and reliable delivery across Choutuppal and nearby areas.",
    },
    {
        icon: <Phone size={28} className="text-green-600" />,
        title: "Easy Ordering",
        desc: "Order via call or WhatsApp for instant service.",
    },
];

const FoodDelivery = () => (
    <section className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 py-16 px-4 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-green-100 mb-4">Food Delivery Service</h1>
            <p className="text-lg text-green-50 mb-8">
                Get delicious food, groceries, fruit boxes, lunch boxes, and organic vegetables delivered to your home or office in Choutuppal and surrounding areas. Fast, fresh, and always reliable!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {foodFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-4 bg-white/10 rounded-xl p-4">
                        <span>{feature.icon}</span>
                        <div>
                            <h3 className="font-semibold text-green-100 text-lg mb-1">{feature.title}</h3>
                            <p className="text-green-200 text-sm">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
                <a
                    href="tel:+918008330905"
                    className="rounded-full inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white cursor-pointer shadow-lg transition-all transform hover:scale-105 hover:bg-black"
                >
                    Call Now
                </a>
                <a
                    href="https://wa.me/917057058841"
                    className="rounded-full inline-flex items-center justify-center px-8 py-4 bg-black hover:bg-green-950 text-white cursor-pointer shadow-lg border border-green-900 transition-all transform hover:scale-105"
                >
                    WhatsApp
                </a>
            </div>
            <p className="text-green-200 text-sm mt-8">
                <strong>Note:</strong> If you select "Food Delivery" in the services filter, you will be navigated to this page for more details and to place your order.
            </p>
        </div>
    </section>
);

export default FoodDelivery;