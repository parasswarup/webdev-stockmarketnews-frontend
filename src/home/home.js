import React, {useEffect, useState} from 'react';
import {Link, Route} from "react-router-dom";
import {profileThunk} from "../thunks/auth-thunks";
import {useDispatch} from "react-redux";
import {setSidebar} from "../reducers/sidebar-reducer";
import {Routes} from "react-router";
import View from "../view/view";


function Home() {
    const [latestData, setLatestData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(profileThunk());
        dispatch(setSidebar({component:"none",newsid:"ddd"}));
    }, []);

    const fetchData = async () => {
        try {
            const latestData = await fetch('/api/latestData');
            const userData = await fetch('/api/userData');
            setLatestData(latestData);
            setUserData(userData);
            setIsLoggedIn(true); // assuming user data is only returned when logged in
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    return (
        <div className="container home-page">
            <h1 className="text-center">Welcome to my website</h1>
            {isLoggedIn ? (
                <div className="user-content">
                    <h2>Your latest activity</h2>
                    {userData.length > 0 ? (
                        <ul className="list-group">
                            {userData.map((data) => (
                                <li key={data.id} className="list-group-item">
                                    <Link to={`/posts/${data.id}`}>{data.title}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No activity to show</p>
                    )}
                </div>
            ) : (
                <div className="generic-content">
                    <h2>Latest content</h2>
                    {latestData.length > 0 ? (
                        <ul className="list-group">
                            {latestData.map((data) => (
                                <li key={data.id} className="list-group-item">
                                    <Link to={`/posts/${data.id}`}>{data.title}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No content to show</p>
                    )}
                </div>
            )}

        </div>
    );
}

export default Home;
