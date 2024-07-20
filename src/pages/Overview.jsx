import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar } from "@material-tailwind/react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import Spinner from '../components/Spinner';
import HeaderBlock from '../components/Headerblock';
import workoutImage from '../assets/workout.jpg';
import StatisticCard from '../components/StatisticCard';
import { Button } from 'flowbite-react';
import {jwtDecode} from 'jwt-decode';

const Overview = () => {
    const [data, setData] = useState({
        statistics: [],
        goalProgress: {},
        schedule: [],
        weekPlan: {},
        posts: [],
        mySchedules: []
    });
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasSchedule, setHasSchedule] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                let userId;
                if (token) {
                    const decodedToken = jwtDecode(token);
                    userId = decodedToken.id;
                    setIsAuthenticated(true);
                }

                const [postsRes, myScheduleRes] = await Promise.all([
                    axios.get('http://localhost:3001/blog', {
                        params: {
                            limit: 2,
                            sort: 'desc',
                        },
                    }),
                    isAuthenticated
                        ? axios.get(`http://localhost:3001/schedules`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        : Promise.resolve({ data: [] })
                ]);

                const posts = postsRes.data.blogs || [];
                const mySchedules = isAuthenticated ? myScheduleRes.data : [];

                setData(prevData => ({
                    ...prevData,
                    posts,
                    mySchedules
                }));
                setHasSchedule(mySchedules.length > 0);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }

        fetchData();
    }, [isAuthenticated]);

    const renderAvatar = (username) => {
        const initials = username
            ? username[0].toUpperCase()
            : String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
        return (
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
                {initials}
            </div>
        );
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <Spinner loading={loading} />
        </div>
    }

    return (
        <>
            <div className="container mx-auto p-4">
                {/* Header Section */}
                <HeaderBlock
                    title="Fitness and Health Care System"
                    description={`Set his rule is land midst likeness they're replenish that have creepeth our is sea. Dominion
                         fly dry darkness it likeness two greater fill, god. Hath signs god. Under green fruitful meat 
                         night second saw god us. It bring third may moving, winged. Multiply that fifth forth creepeth open upon.
                        Seasons without is upon own image creature living sea. One whales were. Let void of divided. Whales herb don't all.
                        For brought yielding. Set tree together kind him after be subdue image creature midst night one stars fruitful moved.
                         From you also itself creature midst fifth him, of image his.`}
                    image={workoutImage}
                />

                {/* Main Grid Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2">
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {data.statistics.map((stat, index) => (
                                <StatisticCard key={index} title={stat.title} value={stat.value} />
                            ))}
                        </div>

                        {/* Goal Progress */}
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4">{data.goalProgress.title}</h2>
                            <div className="flex justify-between items-center mb-4">
                                <p>Timeframe: {data.goalProgress.timeframe}</p>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                        <option>Weekly</option>
                                        <option>Monthly</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                {/* Replace with actual chart */}
                                <div className="h-32 bg-gray-200 rounded-lg">Chart goes here</div>
                            </div>
                        </div>

                        {/* Posts */}
                        {data.posts.map((post, index) => (
                            <div key={index} className="bg-white rounded-lg shadow p-6 mb-6">
                                <div className="flex items-center mb-4">
                                    {renderAvatar(post.createdby?.name)}
                                    <div className="ml-4">
                                        <h3 className="text-lg font-bold">{post.createdby?.name}</h3>
                                        <p className="text-gray-600">{new Date(post.createdat).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                                <p className="mb-4">{post.body.slice(0, 100)}...</p>
                                <div className="flex justify-between items-center">
                                    <div className="mt-2 text-gray-500 flex space-x-4">
                                        <div className='flex items-center space-x-1'>
                                            <FaRegHeart />
                                            <span>{post.views || 0} views</span>
                                        </div>
                                        <div className='flex items-center space-x-1'>
                                            <FaRegComment />
                                            <span>{post.likes || 0} likes</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/blog/${post.id}`)}
                                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1">
                        {/* My Schedule */}
                        {isAuthenticated && (
                            <div className="bg-white rounded-lg shadow p-6 mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold">Weekly schedule</h2>
                                    <a href="/MySchedule" className="text-orange-500 hover:text-orange-700">
                                        <Button>Add New</Button>
                                    </a>
                                </div>
                                {hasSchedule ? (
                                    <ul>
                                        {data.mySchedules.map((event, index) => (
                                            <li key={index} className="flex justify-between items-center mb-4">
                                                <div>
                                                    <h3 className="font-bold">{event.date}</h3>
                                                    <p>{event.activity}</p>
                                                    <p>{event.Details}</p> {/* Add description here */}
                                                </div>
                                                <span className="bg-yellow-500 text-white rounded-full px-4 py-2">{event.time}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No schedule available.</p>
                                )}
                            </div>
                        )}

                        {/* Week Plan */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold mb-4">{data.weekPlan.title}</h2>
                                <a className="text-orange-500 hover:text-orange-700">
                                    View All &gt;
                                </a>
                            </div>
                            {data.weekPlan.meals?.map((meal, index) => (
                                <ul key={index}>
                                    <li className="flex justify-between items-center mb-4">
                                        <div>
                                            <h3 className="font-bold">{meal.day}</h3>
                                            <p>{meal.menu}</p>
                                        </div>
                                        <span className="bg-orange-500 text-white rounded-full px-4 py-2">{meal.time}</span>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Overview;
