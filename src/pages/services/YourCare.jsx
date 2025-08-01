import React from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
    Phone,
    Calendar,
    ArrowLeft,
    Users,
    Home,
    Heart,
    Baby,
    User,
    PawPrint,
    Hospital,
    Star,
    Send,
} from "lucide-react";
// import e from "cors";

const caregivers = [
    {
        icon: <Users className="w-8 h-8 text-fuchsia-600" />,
        title: "Elder Care",
        img: "https://media.istockphoto.com/id/2032240867/photo/caregiver-helping-woman-with-disability-in-park-for-support-trust-and-care-in-retirement.jpg?s=612x612&w=0&k=20&c=hkYMhFNG0IYcdIli55q_rVnTvbDskVtR-M76KWRBT_c=",
        emoji: "👵",
        desc: "Compassionate support for seniors, including daily assistance, companionship, and health monitoring.",
    },
    {
        icon: <Baby className="w-8 h-8 text-fuchsia-600" />,
        title: "Child Care",
        img: "https://media.istockphoto.com/id/1328474502/photo/mothers-day-concept-mother-holds-and-hugs-her-newborn-baby-son-at-home-happy-infant-and-mom.jpg?s=612x612&w=0&k=20&c=GVdfBjRs_NN5LGz2Ua2m4TUAoKV8QqgwLZpxQHPNlQI=",
        emoji: "👶",
        desc: "Trusted caregivers for infants and children, ensuring safety, learning, and fun at home.",
    },
    {
        icon: <Heart className="w-8 h-8 text-fuchsia-600" />,
        title: "Maternity Support",
        img: "https://media.istockphoto.com/id/1461207702/photo/side-view-of-a-doctor-touching-a-pregnant-womans-belly-feeling-the-baby-inside-the-tummy.jpg?s=612x612&w=0&k=20&c=8nRXGFPv81vHcbTu0MgpW6JEvyh_VLQX5nGROIxFhKc=",
        emoji: "🤰",
        desc: "Pre and post-natal care for mothers and newborns, including feeding, hygiene, and emotional support.",
    },
    {
        icon: <User className="w-8 h-8 text-fuchsia-600" />,
        title: "Adult Assistance",
        img: "https://media.istockphoto.com/id/2160439495/photo/primary-teacher-help-little-boy-with-homework-after-lesson.jpg?s=612x612&w=0&k=20&c=XOpU7KzzH1qtqCJEm_Qg9TyET3blleEbV7U5GfQPy_A=",
        emoji: "🧑",
        desc: "Personalized care for adults needing temporary or ongoing support due to illness or disability.",
    },
    {
        icon: <PawPrint className="w-8 h-8 text-fuchsia-600" />,
        title: "Pet Care",
        img: "https://media.istockphoto.com/id/1126947324/photo/dog-walker.jpg?s=612x612&w=0&k=20&c=bS2IWiDdRi-4SrJ87oz_nx6y3jtoZtfRkRKHqwn7UmU=",
        emoji: "🐾",
        desc: "Pet sitting, feeding, walking, and companionship by animal-loving caregivers.",
    },
    {
        icon: <Hospital className="w-8 h-8 text-fuchsia-600" />,
        title: "Patient/Home Health Care",
        img: "https://media.istockphoto.com/id/1313001485/photo/home-caregiver-helping-a-senior-man-standing-up-at-home.jpg?s=612x612&w=0&k=20&c=HiCPFMILa6QxCeF0YsegxZ0jY0xJY34C28QN7-hdyRE=",
        emoji: "🏥",
        desc: "Professional care for patients at home, including medication, hygiene, and recovery support.",
    },
];

const plans = ["Hourly", "Daily", "Weekly", "Monthly"];

const assurances = [
    "Background-verified caregivers",
    "Safety-first approach",
    "Personalized attention",
    "Flexible scheduling",
    "Local employment empowerment",
];

const testimonials = [
    {
        name: "Mrs. Sharma",
        role: "Daughter of Elderly Client",
        quote:
            "Your Care gave us peace of mind. The caregiver was kind, punctual, and truly cared for my mother.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
        name: "Rohit S.",
        role: "Parent",
        quote:
            "We booked Your Care for our toddler. The nanny was professional and our child loved her!",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/43.jpg",
    },
];

const YourCare = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-b from-white to-fuchsia-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen py-40  bg-gradient-to-b from-fuchsia-900 to-fuchsia-900 mix-blend-multiply mt-10">
                <div className="absolute inset-0 bg-opacity-100 bg-[url('https://media.istockphoto.com/id/1719538017/photo/home-care-healthcare-professional-hugging-senior-patient.jpg?s=612x612&w=0&k=20&c=DTQwVD1DTH0CMQ78aox8-cVKg8Nl-wCkSwY-S072M4E=')] bg-cover bg-center mix-blend-overlay"></div>

                {/* Back to Services button positioned below navbar */}
                <div className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 z-20">
                    <Link
                        to="/"
                        className="inline-flex items-center text-white hover:text-fuchsia-100 transition-colors px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        <span className="font-medium">Back to Services</span>
                    </Link>
                </div>

                <div className="container mx-auto pt-40 px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center text-white"
                    >
                        <div className="w-24 h-24 bg-fuchsia-500/30 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-fuchsia-400/30 text-5xl">
                            🧑‍🤝‍🧑
                        </div>
                        <h1 className="text-5xl md:text-5xl font-bold mb-4">
                            <span className="text-fuchsia-300">Your CARE</span>
                        </h1>
                        <p className="text-2xl md:text-2xl mb-8 text-fuchsia-100">
                            Flexible & Personal Care, Anytime. Elder, child, maternity, adult,
                            pet, and patient care by trusted, verified caregivers.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="tel:+918008330905"
                                className="px-8 py-3 bg-white text-xl text-fuchsia-700 font-semibold rounded-full hover:bg-fuchsia-50 transition-colors"
                            >
                                <Phone className="w-6 h-6 mr-2 inline" /> Call For Care
                            </a>
                            <button
                                onClick={() => navigate("/book")}
                                className="px-8 py-3 bg-fuchsia-500 text-xl text-white font-semibold rounded-full hover:bg-fuchsia-600 transition-colors border border-white border-opacity-25"
                            >
                                <Calendar className="w-6 h-6 mr-2 inline" /> Book Your Care
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="py-16 bg-fuchsia-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm font-medium mb-4">
                            OUR CARE SERVICES
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                            Personalized Care for Every Need
                        </h2>
                        <p className="text-lg text-gray-800 max-w-2xl mx-auto">
                            We provide trusted, professional, and verified caregivers for:
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {caregivers.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 border border-fuchsia-100 flex flex-col items-center text-center"
                            >
                                {/* Image with emoji */}
                                <div className="relative w-full h-40 mb-4">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover rounded-lg shadow-md border border-gray-200"
                                    />
                                    <span className="absolute bottom-2 right-2 text-2xl">
                                        {item.emoji}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div className="mb-4 text-5xl text-fuchsia-500">
                                    {item.icon}
                                </div>

                                {/* Title & Description */}
                                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                                    {item.title}
                                </h3>
                                <p className="text-gray-800">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plans & Assurance */}
            <section className="relative py-20 bg-fuchsia-100 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-100 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>

                <div className="relative container mx-auto px-4 z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-fuchsia-800">
                                ✨ Flexible Plans Just for You
                            </h2>

                            <p className="text-lg text-fuchsia-900 mb-6">
                                Choose a plan that fits your care needs and enjoy peace of mind
                                with our verified caregivers.
                            </p>

                            <ul className="flex flex-wrap gap-4 mb-10">
                                {plans.map((plan) => (
                                    <li
                                        key={plan}
                                        className="px-5 py-2 bg-white text-xl text-fuchsia-700 border border-fuchsia-300 rounded-full font-medium text-sm hover:scale-105 hover:shadow-md transition-all duration-300"
                                    >
                                        {plan}
                                    </li>
                                ))}
                            </ul>

                            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-fuchsia-800">
                                🔒 Assurance
                            </h2>

                            <ul className="space-y-3">
                                {assurances.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center text-fuchsia-900 hover:translate-x-2 transition-all duration-300"
                                    >
                                        <Star className="w-5 h-5 mr-3 text-fuchsia-500" />
                                        <span className="text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Image Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="flex justify-center"
                        >
                            <div className="relative group w-full max-w-md md:max-w-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop"
                                    alt="Your Care"
                                    className="rounded-3xl shadow-xl w-full h-auto transform group-hover:scale-105 group-hover:shadow-2xl transition-transform duration-500"
                                />
                                <div className="absolute -top-4 -right-4 bg-white text-fuchsia-600 border border-fuchsia-200 rounded-full px-4 py-1 text-sm font-semibold shadow-md">
                                    ❤️ Trusted by Families
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-fuchsia-50 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm font-medium mb-4">
                            TESTIMONIALS
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                            What Families Say
                        </h2>
                        <p className="text-lg text-gray-800 max-w-2xl mx-auto">
                            Hear from those who trust Your Care for their loved ones
                        </p>
                    </motion.div>

                    {/* Testimonial Cards */}
                    <div className="flex flex-wrap gap-10 justify-center">
                        {testimonials.map((t, idx) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-fuchsia-100 w-full max-w-md flex-1"
                            >
                                {/* User Info */}
                                <div className="flex items-center mb-6">
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        className="w-20 h-20 rounded-full border-2 border-fuchsia-300 shadow-md object-cover mr-5 transition-transform duration-300 hover:scale-105"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-fuchsia-700 text-xl">
                                            {t.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">{t.role}</p>
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="flex mb-4">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 text-yellow-400 fill-current"
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="italic text-gray-800 text-base leading-relaxed">
                                    "{t.quote}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Book Now */}
            <section className="py-16 bg-gradient-to-br from-fuchsia-600 to-fuchsia-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>

                <div className="container mx-auto px-4 relative ">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1 bg-fuchsia-200 text-xl text-fuchsia-700 rounded-full text-sm font-medium mb-4">
                            BOOKING
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready for Flexible, Trusted Care?
                        </h2>
                        <p className="text-xl text-fuchsia-100 max-w-3xl mx-auto">
                            Schedule your Your Care service today for peace of mind and
                            comfort at home.
                        </p>
                    </motion.div>
                    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-fuchsia-100 mb-2 text-sm font-medium">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-fuchsia-100 mb-2 text-sm font-medium">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                                        placeholder="Your phone number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-fuchsia-100 mb-2 text-sm font-medium">
                                        Care Type
                                    </label>
                                    <select className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400">
                                        <option value="" className="bg-fuchsia-800">
                                            Select care type
                                        </option>
                                        {caregivers.map((c) => (
                                            <option
                                                key={c.title}
                                                value={c.title}
                                                className="bg-fuchsia-800"
                                            >
                                                {c.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-fuchsia-100 mb-2 text-sm font-medium">
                                        Preferred Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-fuchsia-100 mb-2 text-sm font-medium">
                                    Address
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 h-24 resize-none"
                                    placeholder="Your address"
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold rounded-xl shadow-lg transition-colors flex items-center"
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    Book Your Care
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="mt-12 text-center">
                        <p className="text-fuchsia-100 mb-2">
                            Prefer to speak with our team?
                        </p>
                        <a
                            href="tel:+918008330905"
                            className="inline-flex items-center text-white font-semibold hover:text-fuchsia-200 transition-colors text-lg"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            +91 8008 330 905
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default YourCare;
