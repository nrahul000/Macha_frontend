import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/admin/restaurants`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setRestaurants(res.data.restaurants || []);
            } catch {
                setRestaurants([]);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    // Helper to format address object
    const formatAddress = (address) => {
        if (!address) return '';
        if (typeof address === 'string') return address;
        // If address is an object
        return [address.street, address.city, address.state, address.pincode]
            .filter(Boolean)
            .join(', ');
    };

    // Helper to format owner object
    const formatOwner = (owner) => {
        if (!owner) return '';
        if (typeof owner === 'string') return owner;
        // If owner is an object
        return [owner.name, owner.email, owner.phone].filter(Boolean).join(' | ');
    };

    return (
        <div>
            <h1 className="text-2xl text-black font-bold mb-4">Restaurants</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                    <table className="min-w-full text-black bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Address</th>
                            <th className="py-2 px-4">Owner Name</th>
                            <th className="py-2 px-4">Owner Email</th>
                            <th className="py-2 px-4">Owner Phone</th>

                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map(r => (
                            <tr key={r._id}>
                                <td className="py-2 px-4">{r.name}</td>
                                <td className="py-2 px-4">{formatAddress(r.address)}</td>
                                <td className="py-2 px-4">{r.owner?.name || ''}</td>
                                <td className="py-2 px-4">{r.owner?.email || ''}</td>
                                <td className="py-2 px-4">{r.owner?.phone || ''}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminRestaurants;