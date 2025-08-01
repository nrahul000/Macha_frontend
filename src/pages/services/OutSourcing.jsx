import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Home,
    Building,
    CheckCircle,
    Check,
    ArrowLeft,
    Calendar,
    Phone,
    Eye,
    FileText,
    Lock,
    Users,
    Wallet,
    Headphones,
    Layers,
    Settings,
    MapPin,
    MonitorSmartphone,
    Key,
    Search,
} from "lucide-react";

const HouseRental = () => {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/book");
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
            {/* Hero Section */}
            <section className="relative  py-40 pt-60  py-20 bg-gradient-to-b from-green-900 to-green-900 mix-blend-multiply pt-32">
                <div className="absolute inset-0 bg-opacity-100 bg-[url('https://cdn.pixabay.com/photo/2024/02/17/10/48/business-8579092_1280.jpg')] bg-cover bg-center mix-blend-overlay"></div>

                {/* Back to Services button positioned below navbar */}
                <div className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 z-20">
                    <Link
                        to="/"
                        className="inline-flex items-center text-white hover:text-green-100 transition-colors px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
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
                        <h1 className="text-5xl md:text-5xl font-bold mb-4">
                            Reliable Outsourcing Solutions
                        </h1>
                        <p className="text-2xl md:text-2xl mb-8">
                            Scale smarter by delegating operations to expert teams while you
                            focus on driving business growth.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="tel:+918008330905"
                                className="px-8 py-3 bg-white text-xl text-green-500 font-semibold rounded-full hover:bg-green-50 transition-colors"
                            >
                                <Phone className="w-6 h-6 mr-2 inline" /> Call Now
                            </a>
                            <button
                                onClick={handleBookNow}
                                className="px-8 py-3 bg-green-600 text-xl text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
                            >
                                <Calendar className="w-6 h-6 mr-2 inline" /> Book Consultation
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-30">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
                        Reliable Outsourcing Solutions
                    </h2>
                    <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg">
                        Scale smarter by delegating operations to expert teams while you
                        focus on driving business growth.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
                        {/* Card 1 */}
                        <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
                            <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                                <img
                                    src="https://media.istockphoto.com/id/609072850/photo/shes-bringing-some-of-her-bright-ideas-to-the-front.jpg?s=612x612&w=0&k=20&c=w3ITNv_rwk8ET0H272kCrAUf2kc9kRmen3mvbmDUGqo="
                                    alt="Skilled Workforce Access"
                                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                                    <Users className="w-7 h-7 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                                Skilled Workforce Access
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Gain access to a pool of highly trained professionals ready to
                                support your business with minimal overhead.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-gray-800">
                                    <CheckCircle
                                        className="text-green-500 mr-2 flex-shrink-0"
                                        size={20}
                                    />
                                    Vetted and certified specialists
                                </li>
                                <li className="flex items-center text-gray-800">
                                    <CheckCircle
                                        className="text-green-500 mr-2 flex-shrink-0"
                                        size={20}
                                    />
                                    Scalable team structure
                                </li>
                            </ul>
                        </div>

                        {/* Card 2 */}
                        <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
                            <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                                <img
                                    src="https://media.istockphoto.com/id/2149600154/photo/cost-reduction-business-finance-concept-businessman-with-virtual-screen-of-cost-reduction.jpg?s=612x612&w=0&k=20&c=1OPm-IVkAmluxq2XwsV4dtRs79WxJIXdx5Adac4r1kE="
                                    alt="Cost Efficiency"
                                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                                    <Wallet className="w-7 h-7 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                                Cost Efficiency
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Reduce your operational expenses by leveraging flexible and
                                affordable outsourcing models tailored to your budget.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-gray-800">
                                    <CheckCircle
                                        className="text-green-500 mr-2 flex-shrink-0"
                                        size={20}
                                    />
                                    Lower infrastructure costs
                                </li>
                                <li className="flex items-center text-gray-800">
                                    <CheckCircle
                                        className="text-green-500 mr-2 flex-shrink-0"
                                        size={20}
                                    />
                                    Pay-as-you-grow flexibility
                                </li>
                            </ul>
                        </div>

                        {/* Card 3 */}
                        <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
                            <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                                <img
                                    src="https://media.istockphoto.com/id/537347127/photo/support-and-help-concept.jpg?s=612x612&w=0&k=20&c=AwP5WzjzFWlP5DxW40oRSMBFN-ymWRe24uJJQm0G-kc="
                                    alt="End-to-End Support"
                                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                                    <Settings className="w-7 h-7 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                                End-to-End Support
                            </h3>
                            <p className="text-gray-500 mb-4">
                                From project initiation to ongoing management, our team ensures
                                seamless communication and task execution.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-gray-800">
                                    <CheckCircle
                                        className="text-green-500 mr-2 flex-shrink-0"
                                        size={20}
                                    />
                                    24/7 customer coordination
                                </li>
                                <li className="flex items-center text-gray-800">
                                    <CheckCircle
                                        className="text-green-500 mr-2 flex-shrink-0"
                                        size={20}
                                    />
                                    Project tracking & reporting
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-4xl font-bold text-center mb-12 text-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Outsourcing Services
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Card 1 */}
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="mb-6 h-52 border-2 border-green-800 rounded-xl overflow-hidden">
                                <img
                                    src="https://media.istockphoto.com/id/182354447/photo/call-center-employees-using-headsets-customer-service.jpg?s=612x612&w=0&k=20&c=4as5SY-kUsvlYrpcEwjuUt2osOfNl45M2f3ye14Faqc="
                                    alt="Customer Support Outsourcing"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <motion.div
                                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <Headphones size={24} />
                            </motion.div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                                <CheckCircle size={22} className="text-green-600 mr-2" />
                                Customer Support Outsourcing
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Deliver exceptional customer experiences with 24/7 multilingual
                                support tailored to your brand.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Live chat, phone, and email support",
                                    "Trained representatives for multiple industries",
                                    "Performance monitoring and reporting",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start text-gray-800">
                                        <Check
                                            size={18}
                                            className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="mb-6 h-52 border-2 border-green-800 rounded-xl overflow-hidden">
                                <img
                                    src="https://media.istockphoto.com/id/949087708/photo/business-people-working-in-open-plan-office.jpg?s=612x612&w=0&k=20&c=E00IsnJeiMNELghigI3BnNR5Gh8dw9dNOsZeHnfYBgw="
                                    alt="Back Office Operations"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <motion.div
                                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <Layers size={24} />
                            </motion.div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                                <CheckCircle size={22} className="text-green-600 mr-2" />
                                Back Office Operations
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Streamline data-heavy and administrative tasks through our
                                efficient, secure back office services.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Data entry and processing",
                                    "Order and inventory management",
                                    "Billing, payroll, and HR support",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start text-gray-800">
                                        <Check
                                            size={18}
                                            className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="mb-6 h-52 border-2 border-green-800 rounded-xl overflow-hidden">
                                <img
                                    src="https://media.istockphoto.com/id/1323680869/photo/business-people-or-accountants-are-analyzing-graphs-on-finance-investment-graph-chart.jpg?s=612x612&w=0&k=20&c=4qNwUqUZsyBBFjwYHPwFO-vAO5mi1PL1ECbPO6BkCmE="
                                    alt="Accounting & Bookkeeping"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <motion.div
                                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <FileText size={24} />
                            </motion.div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                                <CheckCircle size={22} className="text-green-600 mr-2" />
                                Accounting & Bookkeeping
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Maintain financial transparency and compliance with expert
                                bookkeeping and real-time financial tracking.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Ledger and tax documentation",
                                    "Bank reconciliation and audits",
                                    "Weekly and monthly reporting",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start text-gray-800">
                                        <Check
                                            size={18}
                                            className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Card 4 */}
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="mb-6 h-52 border-2 border-green-800 rounded-xl overflow-hidden">
                                <img
                                    src="https://media.istockphoto.com/id/1515913422/photo/a-data-analyst-using-technology-ai-for-working-tool-for-data-analysis-chatbot-chat-with-ai.jpg?s=612x612&w=0&k=20&c=oOKLdZJpcsrUbNrnGVf8TwoIdYud4mWoBkx1A3PdXI0="
                                    alt="IT & Development Support"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <motion.div
                                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <MonitorSmartphone size={24} />
                            </motion.div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                                <CheckCircle size={22} className="text-green-600 mr-2" />
                                IT & Development Support
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Outsource technical development or support tasks for your
                                digital products and services with confidence.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Custom software development",
                                    "Website and mobile app support",
                                    "Tech troubleshooting & maintenance",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start text-gray-800">
                                        <Check
                                            size={18}
                                            className="text-green-600 mr-2 mt-1 flex-shrink-0"
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16 bg-gray-30">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl text-gray-800 font-bold text-center mb-12">
                        Our Service Packages
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Basic Package */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:border-2 border-green-700 hover:scale-105 hover:shadow-xl">
                            <div className="p-6 bg-green-50">
                                <h3 className="text-xl font-bold text-green-500 mb-2">
                                    Starter Package
                                </h3>
                                <div className="text-gray-600 mb-4">
                                    Essential outsourcing support
                                </div>
                                <div className="text-3xl font-bold text-gray-800">
                                    ₹2,999
                                    <span className="text-sm font-normal text-gray-500">
                                        {" "}
                                        /month
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-3">
                                    <li className="flex items-center text-gray-800">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Dedicated virtual assistant</span>
                                    </li>
                                    <li className="flex items-center text-gray-800">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Email & calendar management</span>
                                    </li>
                                    <li className="flex items-center text-gray-800">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Daily task updates</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                                >
                                    Select Package
                                </button>
                            </div>
                        </div>

                        {/* Standard Package */}
                        <div className="bg-white rounded-xl shadow-lg transform md:scale-105 overflow-hidden border-2 border-green-300 transition duration-300 hover:border-green-700 hover:scale-110 hover:shadow-xl relative">
                            <div className="absolute top-0 w-full text-center">
                                <div className="bg-green-500 text-white px-4 py-1 text-sm font-medium inline-block rounded-b-lg">
                                    Most Popular
                                </div>
                            </div>
                            <div className="p-6 bg-green-50 pt-10">
                                <h3 className="text-xl font-bold text-green-500 mb-2">
                                    Growth Package
                                </h3>
                                <div className="text-gray-600 mb-4">
                                    Full-process outsourcing support
                                </div>
                                <div className="text-3xl font-bold text-gray-800">
                                    ₹6,999
                                    <span className="text-sm font-normal text-gray-500">
                                        {" "}
                                        /month
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-3">
                                    <li className="flex items-center text-gray-800">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>All Starter Package features</span>
                                    </li>
                                    <li className="flex items-center text-gray-800">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Dedicated project manager</span>
                                    </li>
                                    <li className="flex items-center text-gray-800">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Weekly performance reports</span>
                                    </li>
                                    <li className="flex items-center text-gray-800">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Up to 3 active tasks daily</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                                >
                                    Select Package
                                </button>
                            </div>
                        </div>

                        {/* Premium Package */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:border-2 border-green-700 hover:scale-105 hover:shadow-xl">
                            <div className="p-6 bg-green-50">
                                <h3 className="text-xl font-bold text-green-500 mb-2">
                                    Enterprise Package
                                </h3>
                                <div className="text-gray-600 mb-4">
                                    Advanced outsourcing & priority access
                                </div>
                                <div className="text-3xl font-bold text-gray-800">
                                    ₹12,999
                                    <span className="text-sm font-normal text-gray-500">
                                        {" "}
                                        /month
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-3">
                                    <li className="flex items-center text-gray-800">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>All Growth Package features</span>
                                    </li>
                                    <li className="flex items-center text-gray-800">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Unlimited daily tasks</span>
                                    </li>
                                    <li className="flex items-center text-gray-800">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>24/7 support & escalation</span>
                                    </li>
                                    <li className="flex items-center text-gray-800">
                                        <CheckCircle size={18} className="text-green-500 mr-3" />
                                        <span>Custom onboarding & automation</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                                >
                                    Select Package
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-4xl font-bold text-center mb-4 text-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        How Our Outsourcing Service Works
                    </motion.h2>

                    <motion.p
                        className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Our seamless outsourcing process is designed to help you delegate
                        tasks effectively and scale faster.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
                        {[
                            {
                                title: "Define Requirements",
                                desc: "Share your business goals, tasks to delegate, and any process documentation or priorities.",
                                img: "https://img.freepik.com/free-photo/strategic-planning-concept-businessman-drawing-flowchart_53876-150646.jpg", // Replace with another if needed
                            },
                            {
                                title: "Get a Custom Plan",
                                desc: "Our experts will design a custom outsourcing strategy and workflow suited to your operations.",
                                img: "https://img.freepik.com/premium-photo/businessman-using-project-planning-tools-strategy-analysis_31965-53198.jpg",
                            },
                            {
                                title: "Team Allocation & Kickoff",
                                desc: "We assign trained professionals to your tasks and begin executing processes with quality checks.",
                                img: "https://media.istockphoto.com/id/2193065392/photo/young-business-professionals-collaborating-in-a-modern-meeting-room.jpg?s=612x612&w=0&k=20&c=IlJNJq_8rapIdkKqDcvizsmpuICA9RPBQytadV7aSVc=",
                            },
                            {
                                title: "Ongoing Management",
                                desc: "Track progress, get reports, and communicate with our team through your preferred tools daily.",
                                img: "https://img.freepik.com/free-photo/business-partner-working-late-night-office_1098-18476.jpg",
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg text-center border-t-4 border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                                        <img
                                            src={step.img}
                                            alt={`Step ${index + 1}`}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                        />
                                    </div>
                                </div>

                                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                                    {index + 1}
                                </div>

                                <h3 className="font-semibold text-2xl mb-3 text-gray-800">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-base">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-6xl mx-auto flex flex-col gap-8">
                        {[
                            {
                                q: "What types of tasks can I outsource?",
                                a: "You can outsource administrative tasks, customer support, social media management, data entry, lead generation, technical support, and more. Our services are tailored based on your specific business needs.",
                            },
                            {
                                q: "How do you ensure quality and confidentiality?",
                                a: "We follow strict quality control measures, regular audits, and performance reviews. Confidentiality is maintained through NDAs, secure tools, and data access protocols to protect your information.",
                            },
                            {
                                q: "Can I scale my outsourcing team as I grow?",
                                a: "Yes, our services are flexible and scalable. You can start small and expand your remote team or services based on your business growth and seasonal requirements.",
                            },
                            {
                                q: "Do I get to choose the professionals working on my tasks?",
                                a: "Absolutely. We offer curated profiles and conduct joint interviews to ensure the selected team aligns with your goals, tools, time zone, and preferred communication style.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`flex flex-col md:flex-row items-center md:items-start group ${i % 2 === 0 ? "" : "md:flex-row-reverse"
                                    }`}
                            >
                                <div className="md:w-1/5 w-full flex justify-center mb-4 md:mb-0">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                                        <span className="text-white text-3xl font-bold">
                                            {i + 1}
                                        </span>
                                    </div>
                                </div>
                                <div className="md:w-4/5 w-full">
                                    <div
                                        className={`bg-white px-14 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${i % 2 === 0
                                                ? "border-l-8 border-green-500"
                                                : "border-r-8 border-green-500"
                                            }`}
                                    >
                                        <h3 className="text-2xl font-bold mb-3 flex items-center text-gray-800">
                                            <span className="text-gray-500 mr-3">
                                                <svg
                                                    className="w-8 h-8"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M13 16h-1v-4h-1m1-4h.01M12 18h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </span>
                                            {item.q}
                                        </h3>
                                        <p className="text-gray-600 text-lg pl-12">{item.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-gray-30">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-r from-green-800 to-black rounded-2xl p-8 md:p-12 shadow-lg max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            {/* Text Section */}
                            <div className="md:w-2/3 mb-8 md:mb-0">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    Ready to scale your business effortlessly?
                                </h2>
                                <p className="text-green-100 text-lg mb-0">
                                    Get in touch with our experts today and discover how
                                    outsourcing can streamline your operations and boost
                                    productivity.
                                </p>
                            </div>

                            {/* Buttons Section */}
                            <div className="md:w-2/3 flex flex-col md:items-end gap-4">
                                <a
                                    href="tel:+918008330905"
                                    className="px-6 py-3 text-lg bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-md text-center"
                                >
                                    <Phone className="w-6 h-6 mr-2 inline" /> Call Now: +91 8008
                                    330 905
                                </a>
                                <button
                                    onClick={handleBookNow}
                                    className="px-6 py-3 text-lg bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 border border-white border-opacity-25 transition-colors shadow-md"
                                >
                                    <MapPin className="w-6 h-6 mr-2 inline" /> Book Free
                                    Consultation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HouseRental;
