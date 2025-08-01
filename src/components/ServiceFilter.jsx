import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Filter, ArrowRight, X, Star, Clock
} from 'lucide-react';

// Service details for modal or future use
const serviceDetails = {
  "Food Delivery": {
    rating: 4.8,
    reviews: "1.2M",
    price: 299,
    oldPrice: 399,
    duration: "45 min",
    perUnit: "per order",
    included: [
      { title: "Fast delivery", desc: "Get your food delivered hot and fresh." },
      { title: "Multiple cuisines", desc: "Choose from a variety of restaurants." }
    ]
  },
  "Grocery Delivery": {
    rating: 4.7,
    reviews: "900K",
    price: 199,
    oldPrice: 249,
    duration: "1 hr",
    perUnit: "per order",
    included: [
      { title: "Fresh groceries", desc: "Daily essentials delivered to your door." },
      { title: "Scheduled delivery", desc: "Choose your preferred delivery slot." }
    ]
  },
  "Organic Products": {
    rating: 4.9,
    reviews: "500K",
    price: 399,
    oldPrice: 499,
    duration: "2 hrs",
    perUnit: "per box",
    included: [
      { title: "Certified organic", desc: "Sourced from trusted local farms." },
      { title: "Seasonal produce", desc: "Enjoy the freshest fruits and veggies." }
    ]
  },
  "Medicine Delivery": {
    rating: 4.85,
    reviews: "800K",
    price: 150,
    oldPrice: 200,
    duration: "30 min",
    perUnit: "per order",
    included: [
      { title: "Prescription pickup", desc: "Upload your prescription for quick delivery." },
      { title: "Wide range", desc: "All major medicines and brands available." }
    ]
  },
  "Electrician": {
    rating: 4.75,
    reviews: "600K",
    price: 299,
    oldPrice: 399,
    duration: "1 hr",
    perUnit: "per visit",
    included: [
      { title: "Wiring & repairs", desc: "All types of electrical work handled." },
      { title: "Quick response", desc: "Same-day service available." }
    ]
  },
  "Plumber": {
    rating: 4.7,
    reviews: "500K",
    price: 349,
    oldPrice: 449,
    duration: "1 hr",
    perUnit: "per visit",
    included: [
      { title: "Leak repairs", desc: "Fixing leaks, taps, and pipes." },
      { title: "Installations", desc: "Fittings for bathrooms and kitchens." }
    ]
  },
  "Carpenter": {
    rating: 4.8,
    reviews: "300K",
    price: 399,
    oldPrice: 499,
    duration: "2 hrs",
    perUnit: "per visit",
    included: [
      { title: "Furniture repair", desc: "All types of woodwork and repairs." },
      { title: "Custom work", desc: "Shelves, cabinets, and more." }
    ]
  },
  "AC Technician": {
    rating: 4.9,
    reviews: "250K",
    price: 499,
    oldPrice: 599,
    duration: "1.5 hrs",
    perUnit: "per AC",
    included: [
      { title: "Servicing", desc: "AC cleaning and maintenance." },
      { title: "Repairs", desc: "Gas filling, part replacement." }
    ]
  },
  "Transport Services": {
    rating: 4.6,
    reviews: "200K",
    price: 599,
    oldPrice: 799,
    duration: "Varies",
    perUnit: "per trip",
    included: [
      { title: "Vehicle rental", desc: "Cars, bikes, and vans available." },
      { title: "Logistics", desc: "Goods transport and shifting." }
    ]
  },
  "Security Services": {
    rating: 4.8,
    reviews: "150K",
    price: 999,
    oldPrice: 1200,
    duration: "8 hrs",
    perUnit: "per guard",
    included: [
      { title: "Trained guards", desc: "Background-checked and experienced." },
      { title: "Flexible shifts", desc: "Day/night security available." }
    ]
  },
  "Sanitization": {
    rating: 4.85,
    reviews: "180K",
    price: 499,
    oldPrice: 599,
    duration: "2 hrs",
    perUnit: "per 1000 sq.ft.",
    included: [
      { title: "Hospital-grade chemicals", desc: "Safe for kids and pets." },
      { title: "Full coverage", desc: "Home, office, and vehicles." }
    ]
  },
  "Event Management": {
    rating: 4.9,
    reviews: "90K",
    price: 4999,
    oldPrice: 5999,
    duration: "Varies",
    perUnit: "per event",
    included: [
      { title: "Planning", desc: "End-to-end event planning." },
      { title: "Execution", desc: "Decor, catering, and more." }
    ]
  },
  "Digital Marketing": {
    rating: 4.8,
    reviews: "120K",
    price: 2999,
    oldPrice: 3999,
    duration: "1 month",
    perUnit: "per campaign",
    included: [
      { title: "Social media", desc: "Facebook, Instagram, Google Ads." },
      { title: "Content creation", desc: "Posts, videos, and blogs." }
    ]
  },
  "Home Tutors": {
    rating: 4.85,
    reviews: "200K",
    price: 499,
    oldPrice: 599,
    duration: "1 hr",
    perUnit: "per session",
    included: [
      { title: "Qualified tutors", desc: "All subjects and grades." },
      { title: "Flexible timing", desc: "Home and online options." }
    ]
  },
  "Medical Services": {
    rating: 4.9,
    reviews: "80K",
    price: 299,
    oldPrice: 399,
    duration: "30 min",
    perUnit: "per visit",
    included: [
      { title: "Sample collection", desc: "At-home blood and urine tests." },
      { title: "Doctor consult", desc: "Book appointments easily." }
    ]
  },
  "Software Development": {
    rating: 4.95,
    reviews: "50K",
    price: 9999,
    oldPrice: 12000,
    duration: "Varies",
    perUnit: "per project",
    included: [
      { title: "Web & mobile", desc: "Custom websites and apps." },
      { title: "Maintenance", desc: "Ongoing support available." }
    ]
  },
  "Home Keeping ": {
    rating: 4.8,
    reviews: "300K",
    price: 799,
    oldPrice: 999,
    duration: "3 hrs",
    perUnit: "per visit",
    included: [
      { title: "Deep cleaning", desc: "All rooms, kitchen, and bathrooms." },
      { title: "Eco-friendly", desc: "Safe cleaning products." }
    ]
  },
  "Online Classes": {
    rating: 4.7,
    reviews: "100K",
    price: 299,
    oldPrice: 399,
    duration: "1 hr",
    perUnit: "per class",
    included: [
      { title: "Live sessions", desc: "Interactive and engaging." },
      { title: "All subjects", desc: "Academic and hobby classes." }
    ]
  },
  "Lunch Box Supply": {
    rating: 4.8,
    reviews: "60K",
    price: 99,
    oldPrice: 120,
    duration: "Daily",
    perUnit: "per box",
    included: [
      { title: "Fresh meals", desc: "Hygienic and tasty." },
      { title: "Customizable", desc: "Veg and non-veg options." }
    ]
  },
  "Fruit box Supply": {
    rating: 4.85,
    reviews: "40K",
    price: 149,
    oldPrice: 180,
    duration: "Daily",
    perUnit: "per box",
    included: [
      { title: "Seasonal fruits", desc: "Handpicked and fresh." },
      { title: "Doorstep delivery", desc: "On time, every time." }
    ]
  },
  "House Rental": {
    rating: 4.7,
    reviews: "30K",
    price: 5000,
    oldPrice: 6000,
    duration: "Monthly",
    perUnit: "per house",
    included: [
      { title: "Verified listings", desc: "Safe and secure homes." },
      { title: "Support", desc: "Help with agreements and moving." }
    ]
  },
  "Packers and Movers": {
    rating: 4.8,
    reviews: "70K",
    price: 2999,
    oldPrice: 3500,
    duration: "Varies",
    perUnit: "per move",
    included: [
      { title: "Packing", desc: "Safe and secure packing." },
      { title: "Transport", desc: "Timely and insured delivery." }
    ]
  }
};

// Custom icon components for each service
const CustomIcons = {
  FoodDelivery: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-orange-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        <line x1="6" y1="1" x2="6" y2="4"></line>
        <line x1="10" y1="1" x2="10" y2="4"></line>
        <line x1="14" y1="1" x2="14" y2="4"></line>
      </svg>
    </div>
  ),
  Groceries: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-green-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    </div>
  ),
  Organic: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-emerald-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M6 3v12a3 3 0 1 0 6 0V3"></path>
        <path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
        <path d="M18 15a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
      </svg>
    </div>
  ),
  Electrician: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-yellow-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14.5 8.5L19 4l-1-1-4.5 4.5"></path>
        <path d="m9 15-4.5 4.5 1 1L10 16"></path>
        <path d="M15 5 5 15"></path>
        <path d="M18.5 2.5 21 5 5 21 2.5 18.5"></path>
      </svg>
    </div>
  ),
  Plumber: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2v4"></path>
        <path d="M4 8h16"></path>
        <path d="M8 8v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V8"></path>
        <path d="M10 15h4"></path>
      </svg>
    </div>
  ),
  Carpenter: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-amber-600 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"></path>
        <path d="M17.64 15 22 10.64"></path>
        <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"></path>
      </svg>
    </div>
  ),
  ACTechnician: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-cyan-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M9.5 7.5V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3.5"></path>
        <path d="M4 7.5a2.5 2.5 0 0 1 5 0"></path>
        <path d="M20 7.5a2.5 2.5 0 0 0-5 0"></path>
        <path d="M12 7v13"></path>
        <path d="M10 12H2"></path>
        <path d="M22 12h-8"></path>
      </svg>
    </div>
  ),
  Transport: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-indigo-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M5 17h14"></path>
        <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <path d="M8 2h8"></path>
        <path d="M8 7V2"></path>
        <path d="M16 7V2"></path>
      </svg>
    </div>
  ),
  Security: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-purple-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    </div>
  ),
  Sanitization: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-green-400 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4.93 19.07A10 10 0 0 1 2 12C2 6.5 6.5 2 12 2s10 4.5 10 10c0 2.75-1.1 5.25-2.93 7.07"></path>
        <path d="M9 15h6"></path>
        <path d="M9.5 9l5 3-5 3z"></path>
      </svg>
    </div>
  ),
  Events: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-pink-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
      </svg>
    </div>
  ),
  Marketing: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-rose-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
      </svg>
    </div>
  ),
  HomeTutors: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-red-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="m2 7 8-5 8 5"></path>
        <path d="M10 20.5 2 16V8"></path>
        <path d="m14 20.5 8-4.5V8"></path>
        <path d="M10 20.5v-9L18 8"></path>
        <path d="M6 11.5 10 14"></path>
      </svg>
    </div>
  ),
  Medical: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-sky-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M7 20h10"></path>
        <path d="M10 17v3"></path>
        <path d="M14 17v3"></path>
        <path d="M5 11a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"></path>
        <path d="M9 9V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
        <path d="M12 12h.01"></path>
      </svg>
    </div>
  ),
  Software: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-violet-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"></path>
        <path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06"></path>
        <path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8"></path>
      </svg>
    </div>
  ),
  Cleaning: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-teal-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 11v11"></path>
        <path d="M21 22V9a5 5 0 0 0-5-5H8a5 5 0 0 0-4 2"></path>
        <path d="M12 7v13"></path>
        <path d="m8 2 4 4 4-4"></path>
      </svg>
    </div>
  ),
  OnlineClasses: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-orange-400 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect width="16" height="12" x="4" y="2" rx="2"></rect>
        <rect width="8" height="8" x="8" y="14" rx="2"></rect>
        <path d="M13 14v-4"></path>
        <path d="M8 22h8"></path>
      </svg>
    </div>
  ),
  Medicine: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-pink-400 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="m19 5-7 7-7-7"></path>
        <path d="M12 19V12"></path>
      </svg>
    </div>
  ),
  LunchBox: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-lime-500 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <rect x="3" y="7" width="18" height="10" rx="2" strokeWidth="2" />
        <path d="M7 7V5a5 5 0 0 1 10 0v2" strokeWidth="2" />
      </svg>
    </div>
  ),
  FruitBox: () => (
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-green-700 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <circle cx="12" cy="12" r="8" strokeWidth="2" />
        <path d="M8 12a4 4 0 0 1 8 0" strokeWidth="2" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    </div>
  ),
};

// Service categories
const serviceCategories = [
  { id: 'all', name: 'All Services' },
  { id: 'delivery', name: 'Delivery', count: 4 },
  { id: 'technicians', name: 'Technicians', count: 4 },
  { id: 'events', name: 'Events', count: 1 },
  { id: 'health', name: 'Health', count: 2 },
  { id: 'education', name: 'Education', count: 2 },
  { id: 'digital', name: 'Digital', count: 2 },
  { id: 'home', name: 'Home Services', count: 3 },
];

// Services array
const services = [
  {
    id: 1,
    name: 'Food Delivery',
    category: 'delivery',
    icon: <CustomIcons.FoodDelivery />,
    description: 'Get food delivered from local restaurants',
    color: 'text-orange-500',
    bgLight: 'bg-orange-50',
    backgroundImage: 'https://media.istockphoto.com/id/1457979959/photo/snack-junk-fast-food-on-table-in-restaurant-soup-sauce-ornament-grill-hamburger-french-fries.jpg?s=612x612&w=0&k=20&c=QbFk2SfDb-7oK5Wo9dKmzFGNoi-h8HVEdOYWZbIjffo='
  },
  {
    id: 2,
    name: 'Grocery Delivery',
    category: 'delivery',
    icon: <CustomIcons.Groceries />,
    description: 'Fresh groceries delivered to your doorstep',
    color: 'text-green-500',
    bgLight: 'bg-green-50',
    backgroundImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop',
    link: '/grocery',  // Direct link to grocery section
    popular: true
  },
    {
    id: 3,
    name: 'Technicians',
    category: 'technicians',
    icon: <CustomIcons.Electrician />,
    description: 'Professional home repair and installation services',
    color: 'text-yellow-500',
    bgLight: 'bg-yellow-50',
    backgroundImage: 'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/services/technicians',
    popular: true,
  },
  {
    id: 4,
    name: 'Organic Products',
    category: 'delivery',
    icon: <CustomIcons.Organic />,
    description: 'Fresh organic produce from local farms',
    color: 'text-emerald-500',
    bgLight: 'bg-emerald-50',
    backgroundImage: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Medicine Delivery',
    category: 'delivery',
    icon: <CustomIcons.Medicine />,
    description: 'Quick delivery of medicines',
    color: 'text-pink-400',
    bgLight: 'bg-pink-50',
    backgroundImage: 'https://media.istockphoto.com/id/1225647177/photo/order-medicines-online-and-delivery.jpg?s=612x612&w=0&k=20&c=PSLelJ85yxg-iXi28su7xJ5-dB9SdENVStJFEhBrYAY='
  },
  {
    id: 9,
    name: 'Transport Services',
    category: 'delivery',
    icon: <CustomIcons.Transport />,
    description: 'Vehicle rentals and logistics solutions',
    color: 'text-indigo-500',
    bgLight: 'bg-indigo-50',
    backgroundImage: 'https://imgs.search.brave.com/YqaGUstRcVY2j8swTu8dukBBnrD3K4D5N52bbml3xrc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9yb2Fk/LXRyYW5zcG9ydC1s/b3JyeS1tb3Rvcndh/eS1ldXJvcGVhbi1i/cml0aXNoLTgwMzQw/OTcxLmpwZw'
  },
  {
    id: 10,
    name: 'Security Services',
    category: 'home',
    icon: <CustomIcons.Security />,
    description: 'Reliable security guards services',
    color: 'text-purple-500',
    bgLight: 'bg-purple-50',
    backgroundImage: 'https://imgs.search.brave.com/dJObYy83XjYsYO3sgB-7YndhX5R-0QkCRoUgoJAfwIA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODMz/MDYzNTY0L3Bob3Rv/L3NlY3VyaXR5LWd1/YXJkLXN0YW5kaW5n/LW91dHNpZGUtdGhl/LWhvdXNlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1zdnpY/b2RaaUpZSENQSFNS/S0piLTU2ckhibXgz/el9GYkgtWHlMTGF2/N01ZPQ'
  },
  {
    id: 11,
    name: 'Sanitization',
    category: 'health',
    icon: <CustomIcons.Sanitization />,
    description: 'Professional home and office sanitization',
    color: 'text-green-400',
    bgLight: 'bg-green-50',
    backgroundImage: 'https://imgs.search.brave.com/sw2Jh4eoEdD4WvGSTb4zTCVINPvFb9GplOm0f_xay_g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9j/b3JvbmF2aXJ1cy1w/YW5kZW1pYy1kaXNp/bmZlY3Rvci1wcm90/ZWN0aXZlLXN1aXQt/bWFzay1zcHJheXMt/ZGlzaW5mZWN0YW50/cy1ob3VzZS1vZmZp/Y2VfMTU1MDAzLTcz/MTQuanBnP3NlbXQ9/YWlzX2h5YnJpZA'
  },
  {
    id: 12,
    name: 'Event Management',
    category: 'events',
    icon: <CustomIcons.Events />,
    description: 'Complete event planning services',
    color: 'text-pink-500',
    bgLight: 'bg-pink-50',
    backgroundImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 13,
    name: 'Digital Marketing',
    category: 'digital',
    icon: <CustomIcons.Marketing />,
    description: 'Social media management and advertising',
    color: 'text-rose-500',
    bgLight: 'bg-rose-50',
    backgroundImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 14,
    name: 'Home Tutors',
    category: 'education',
    icon: <CustomIcons.HomeTutors />,
    description: 'Qualified tutors for all subjects',
    color: 'text-red-500',
    bgLight: 'bg-red-50',
    backgroundImage: 'https://imgs.search.brave.com/-o6DsCf0S92n8XM2Vf3vgYIdldObf3aSyEjBnVcPv0U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vbGlhaXNvbi1p/bmMvaW1hZ2UvdXBs/b2FkL2NfZml0LGZf/YXV0byxxX2F1dG8s/d18xMjAwL3NlcnZp/Y2VzL3R1dG9ycy9i/YWNrZ3JvdW5kcy9t/YXRoLmpwZw'
  },
  {
    id: 15,
    name: 'Medical Services',
    category: 'health',
    icon: <CustomIcons.Medical />,
    description: 'Lab sample collection and appointments',
    color: 'text-sky-500',
    bgLight: 'bg-sky-50',
    backgroundImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 16,
    name: 'Software Development',
    category: 'digital',
    icon: <CustomIcons.Software />,
    description: 'Custom websites and app development',
    color: 'text-violet-500',
    bgLight: 'bg-violet-50',
    backgroundImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 17,
    name: 'Home Keeping ',
    category: 'home',
    icon: <CustomIcons.Cleaning />,
    description: 'Professional home cleaning',
    color: 'text-teal-500',
    bgLight: 'bg-teal-50',
    backgroundImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 18,
    name: 'Online Classes',
    category: 'education',
    icon: <CustomIcons.OnlineClasses />,
    description: 'Virtual classes for all age groups',
    color: 'text-orange-400',
    bgLight: 'bg-orange-50',
    backgroundImage: 'https://images.unsplash.com/photo-1584697964358-3e14ca57658b?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 19,
    name: 'Lunch Box Supply',
    category: 'delivery',
    icon: <CustomIcons.LunchBox />,
    description: 'Fresh and hygienic lunch boxes delivered to your location',
    color: 'text-lime-500',
    bgLight: 'bg-lime-50',
    backgroundImage: 'https://imgs.search.brave.com/hL0uYUXn_ooQsvtua6t1ssuIlM6mNy6wh2A8cm6Xrfs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ydWtt/aW5pbTIuZmxpeGNh/cnQuY29tL2ltYWdl/LzYxMi82MTIvazNq/MXowdzAvbHVuY2gt/Ym94L3gvay80L3N0/ZWVsLWx1bmNib3gt/Z3JlZW4tZmxpcGth/cnQtc21hcnRidXkt/My1vcmlnaW5hbC1p/bWFmbW16d2hiZWV2/emd2LmpwZWc_cT03/MA'
  },
  {
    id: 20,
    name: 'Fruit box Supply',
    category: 'delivery',
    icon: <CustomIcons.FruitBox />,
    description: 'Nutritious fruit boxes delivered daily',
    color: 'text-green-700',
    bgLight: 'bg-green-50',
    backgroundImage: 'https://imgs.search.brave.com/hfsb2bw5zm8x77g8kuebF4dSu56WUfKvcleOHRi4Z2o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/NDAxMjEyNi9waG90/by9tdWx0aWNvbG9y/ZWQtZnJ1aXRzLWlu/LWEtY3JhdGUtb24t/d2hpdGUtYmFja2dy/b3VuZC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9dVJfTVNv/SUt4c1Eya1BtdnVB/VURaN0pjRlRzRi1K/bzJ3UE92ZVN6bGxl/Yz0'
  },
  {
    id: 21,
    name: 'House Rental',
    category: 'home',
    icon: (
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-400 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path d="M3 10.5L12 4l9 6.5" strokeWidth="2" />
          <rect x="6" y="14" width="12" height="6" rx="2" strokeWidth="2" />
          <path d="M9 20v-4h6v4" strokeWidth="2" />
        </svg>
      </div>
    ),
    description: 'Find rental houses and flats in your area',
    color: 'text-blue-400',
    bgLight: 'bg-blue-50',
    backgroundImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 22,
    name: 'Packers and Movers',
    category: 'home',
    icon: (
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-yellow-600 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <rect x="3" y="7" width="18" height="13" rx="2" strokeWidth="2" />
          <path d="M16 3v4M8 3v4" strokeWidth="2" />
          <path d="M3 10h18" strokeWidth="2" />
        </svg>
      </div>
    ),
    description: 'Professional packing and moving services',
    color: 'text-yellow-600',
    bgLight: 'bg-yellow-50',
    backgroundImage: 'https://imgs.search.brave.com/fbsotaVuIbi-odEy_2I1XqsVJK9fZ4ASKWMjRUZMDRk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZWF4/Mzh6dmthdTlkLmNs/b3VkZnJvbnQubmV0/L3Byb2QvYXNzZXRz/L2ltYWdlcy91cGxv/YWRzL3NlcnZpY2Vz/LzE2ODEyMDUzODhw/YWNrZXJzLWFuZC1t/b3ZlcnMtc2Vydmlj/ZS53ZWJwP2Y9d2Vi/cCZ3PTEyODA'
  },
  // ...existing services...
  {
    id: 23,
    name: 'YOUR CARE',
    category: 'home',
    icon: (
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-fuchsia-600 text-white text-2xl font-bold">
        🧑‍🤝‍🧑
      </div>
    ),
    description: 'Flexible & Personal Care, Anytime. Elder, child, maternity, adult, pet, and patient care by trusted, verified caregivers.',
    color: 'text-fuchsia-600',
    bgLight: 'bg-fuchsia-50',
    backgroundImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop',
    details: `
We provide trusted, professional, and verified caregivers for:
🧓 Elder Care
👶 Child Care
🤰 Maternity Support
🧍 Adult Assistance
🐶 Pet Care
🏥 Patient/Home Health Care

Plans: Hourly • Daily • Weekly • Monthly
Assurance: Background-verified caregivers, safety-first approach, and personalized attention.

Your care. Your comfort. Your schedule.
#SaathiCare | Empowering families & creating local employment
  `
  },
  {
    id: 24,
    name: 'Outsourcing',
    category: 'digital',
    icon: (
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-700 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path d="M9 17v-2a4 4 0 0 1 8 0v2" strokeWidth="2" />
          <circle cx="13" cy="7" r="4" strokeWidth="2" />
          <rect x="2" y="17" width="20" height="5" rx="2" strokeWidth="2" />
        </svg>
      </div>
    ),
    description: 'Hire external experts to handle your business processes and operations efficiently.',
    color: 'text-blue-700',
    bgLight: 'bg-blue-50',
    backgroundImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&auto=format&fit=crop',
    details: `
  Outsourcing services refer to the practice of hiring external third-party providers to handle specific business functions, operations, or processes instead of managing them in-house. Companies outsource to reduce costs, improve efficiency, and focus on their core business activities.
    `
  },

];

const ServiceFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredServices, setFilteredServices] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const filterRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Initialize filteredServices on component mount
  useEffect(() => {
    setFilteredServices(services);
  }, []);

  // Update filteredServices when filters change
  useEffect(() => {
    filterServices();
  }, [searchTerm, selectedCategory]);

  const filterServices = () => {
    let results = [...services];
    if (selectedCategory !== 'all') {
      results = results.filter(service => service.category === selectedCategory);
    }
    if (searchTerm.trim() !== '') {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(
        service => service.name.toLowerCase().includes(searchTermLower) ||
          service.description.toLowerCase().includes(searchTermLower)
      );
    }
    setFilteredServices(results);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  const handleServiceClick = (serviceName, service) => {
    // If the service has a direct link, use that
    if (service.link) {
      navigate(service.link);
      return;
    }

    // Otherwise, use the existing switch statement logic
    switch(serviceName) {
      case 'Food Delivery':
        navigate('/food-delivery');
        break;
      case 'Medicine Delivery':
        navigate('/services/medicine-delivery');
        break;
      case 'Sanitization':
        navigate('/services/sanitization');
        break;
      case 'Event Management':
        navigate('/services/event-management');
        break;
      case 'Organic Products':
        navigate('/services/organic-products');
        break;
      case 'Security Services':
        navigate('/services/security-services');
        break;
      case 'Transport Services':
        navigate('/services/transport-services');
        break;
      case 'Technicians':
        navigate('/services/technicians');
        break;
      default:
        navigate(`/services/${serviceName.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  // Map service names to their route paths
  const getServicePath = (name) => {
    const serviceRoutes = {
      'Sanitization': 'sanitization',
      'Medicine Delivery': 'medicine-delivery',
      'Event Management': 'event-management',
      'Organic Products': 'organic-products',
      'Security Services': 'security-services',
      'Transport Services': 'transport-services',
      'Fruit box Supply': 'fruit-box-supply'
    };
    
    return serviceRoutes[name] || name.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium inline-block mb-4">
            OUR EXPERTISE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-600"> Services We Offer</span>
          </h2>
          <div className="w-16 h-1 bg-green-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Find and filter through our comprehensive range of services for all your needs
          </p>
        </motion.div>

        {/* Search and filter controls */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row gap-3 items-stretch">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-black">
                <Search size={18} />
              </div>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search for services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleSearchFocus}
                className="w-full h-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 bg-gray-100 text-black placeholder:text-gray-400"
                aria-label="Search services"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-black hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="flex-shrink-0 w-full md:w-1/3">
              <div className="relative h-full">
                <select
                  id="category-filters"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-full pl-3 pr-8 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 bg-gray-100 text-black appearance-none"
                  aria-label="Filter services by category"
                >
                  {serviceCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} {category.count ? `(${category.count})` : ''}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile filter button */}
          <div className="md:hidden mt-4" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center w-full gap-2 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700"
              aria-expanded={isFilterOpen}
              aria-controls="mobile-filters"
            >
              <Filter size={18} />
              <span>{isFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isFilterOpen ? 'auto' : 0,
                opacity: isFilterOpen ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div id="mobile-filters" className="mt-3 p-4 rounded-lg bg-white border border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {serviceCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategory === category.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Show filter tags on desktop */}
          <div className="hidden md:flex flex-wrap gap-2 mt-6 justify-center">
            {serviceCategories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategory === category.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Service cards */}
        {filteredServices.length > 0 ? (
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div 
                  className="relative bg-white rounded-xl overflow-hidden h-full border border-gray-200 hover:border-green-300 transition-all shadow-sm hover:shadow-md"
                  onClick={() => handleServiceClick(service.name, service)}
                  style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Background image with overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${service.backgroundImage})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-5 h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-3">
                      {service.icon}
                      <h3 className="text-lg font-semibold text-white group-hover:text-green-300 mt-1 drop-shadow-md">
                        {service.name}
                      </h3>
                    </div>

                    <p className="text-white text-sm mb-4 drop-shadow-md">{service.description}</p>

                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-white/20">
                      <span className="text-xs py-1 px-2.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                        {serviceCategories.find(cat => cat.id === service.category)?.name}
                      </span>
                      <Link 
                        to={service.link || `/services/${getServicePath(service.name)}`}
                        className="text-sm font-medium text-white hover:text-green-300 flex items-center gap-1"
                      >
                        View Details
                        <ArrowRight size={14} className="ml-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 rounded-xl bg-white border border-gray-200 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4 mx-auto">
              <Search size={20} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any services matching your criteria.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
        <div className="text-center mt-12">
          <Link
            to="/book"
            className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm"
          >
            Book a Custom Service
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div >
    </section >
  );
};

export default ServiceFilter;