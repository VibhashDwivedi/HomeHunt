import React, { useState, useEffect } from 'react';

const SellerHouses = () => {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        fetchHouses();
    }, []);

    const fetchHouses = async () => {
        // Get the current seller's ID from the session
        const sellerId = sessionStorage.getItem('sellerId');

        const res = await fetch(`http://localhost:5000/house/seller/${sellerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            const data = await res.json();
            setHouses(data);
        }
    }

    return (
        <div>
            <h1>Your Houses</h1>
            {houses.map((house, index) => (
                <div key={index}>
                    <h2>{house.place}</h2>
                    <p>{house.area}</p>
                    <p>{house.houseNo}</p>
                    <p>{house.bedrooms}</p>
                    <p>{house.bathrooms}</p>
                    <p>{house.hospitalNearby}</p>
                    <p>{house.rent}</p>
                    <img src={house.image} alt="House" />
                </div>
            ))}
        </div>
    );
}

export default SellerHouses;