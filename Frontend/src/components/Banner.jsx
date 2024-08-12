import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Banner = () => {
    const [bannerData, setBannerData] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const fetchBanner = async () => {
            const response = await axios.get('http://localhost:5000/api/banner');
            setBannerData(response.data);
            setTimeLeft(response.data.timer);
        };

        fetchBanner();
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    if (!bannerData.isVisible || timeLeft <= 0) return null;

    return (
        <div className="banner">
            <p>{bannerData.description}</p>
            <a href={bannerData.link} target="_blank" rel="noopener noreferrer">Learn More</a>
            <p>Time left: {timeLeft} seconds</p>
        </div>
    );
};

export default Banner;
