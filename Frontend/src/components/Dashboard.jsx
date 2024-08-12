import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(0);
    const [link, setLink] = useState('');
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchBanner = async () => {
            const response = await axios.get('http://localhost:5000/api/banner');
            setDescription(response.data.description);
            setTimer(response.data.timer);
            setLink(response.data.link);
            setIsVisible(response.data.isVisible);
        };

        fetchBanner();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/banner', {
            description, timer, link, isVisible
        });
        alert('Banner updated successfully!');
    };

    return (
        <div className="dashboard">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Banner Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Banner Timer (seconds):</label>
                    <input type="number" value={timer} onChange={(e) => setTimer(e.target.value)} />
                </div>
                <div>
                    <label>Banner Link:</label>
                    <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
                </div>
                <div>
                    <label>Banner Visibility:</label>
                    <input type="checkbox" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} />
                </div>
                <button type="submit">Update Banner</button>
            </form>
        </div>
    );
};

export default Dashboard;
