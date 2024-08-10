import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import HeaderBlock from '../components/Headerblock';
import workoutImage from '../assets/workout.jpg';
import StatisticCard from '../components/StatisticCard';
import { Button } from 'flowbite-react';
import {jwtDecode} from 'jwt-decode'; 
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Overview = () => {
    const [data, setData] = useState({
        statistics: [],
        goalProgress: {},
        schedule: [],
        weekPlan: {},
        posts: [],
        mySchedules: [],
        userDetails: {},
        recommendations: {}
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

                const [postsRes, myScheduleRes, userDetailsRes, recommendationsRes] = await Promise.all([
                    axios.get('http://localhost:3001/blog', {
                        params: {
                            limit: 2,
                            sort: 'desc',
                        },
                    }),
                    isAuthenticated
                        ? axios.get('http://localhost:3001/schedules', {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        : Promise.resolve({ data: [] }),
                    isAuthenticated
                        ? axios.get(`http://localhost:3001/userdetails/user/test`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        : Promise.resolve({ data: {} }),
                    isAuthenticated
                        ? axios.get(`http://localhost:3001/userdetails/${userId}/recommendations`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).catch(error => {
                            if (error.response && error.response.status === 404) {
                                return { data: {} };
                            }
                            throw error;
                        })
                        : Promise.resolve({ data: {} })
                ]);

                const posts = postsRes.data.blogs || [];
                const mySchedules = isAuthenticated ? myScheduleRes.data : [];
                const userDetails = isAuthenticated ? userDetailsRes.data : {};
                const recommendations = isAuthenticated ? recommendationsRes.data : {};

                setData(prevData => ({
                    ...prevData,
                    posts,
                    mySchedules,
                    userDetails,
                    recommendations
                }));
                setHasSchedule(mySchedules.length > 0);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

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

    // Dummy data for chart
    const chartData = {
        labels: ['Workouts Completed', 'Calories Burned', 'Active Days', 'Steps Taken'],
        datasets: [
            {
                label: 'User Statistics',
                data: [45, 1200, 15, 30000], // Example values
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'User Statistics',
            },
        },
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner loading={loading} />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {data.statistics.map((stat, index) => (
                            <StatisticCard key={index} title={stat.title} value={stat.value} />
                        ))}
                    </div>

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
                            {/* Chart */}
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>

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
                            <div className="mb-4" dangerouslySetInnerHTML={{ __html: post.body.slice(0, 100) + '...' }} />
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

                <div className="lg:col-span-1">
                    {isAuthenticated && (
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Weekly Schedule</h2>
                                <a href="/home/MySchedule" className="text-blue-500">View Schedule</a>
                            </div>
                            <p>Your schedule</p>
                            {hasSchedule && (
                                <ul>
                                    {data.mySchedules.map((schedule, index) => (
                                        <li key={index}>{schedule.date}: {schedule.details}</li>
                                    ))}
                                </ul>
                            )}
                            {!hasSchedule && (
                                <div className="text-center py-6">
                                    <p className="text-gray-500">No schedule for this week.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Recommendations */}
                    {isAuthenticated && data.recommendations && (
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <h2 className="text-xl font-bold">Recommendations</h2>
                            <p className="mb-4">
                                <strong>Nutrition:</strong> {data.recommendations.nutritionRecommendation}
                            </p>
                            <p>
                                <strong>Exercise:</strong> {data.recommendations.exerciseRecommendation}
                            </p>
                        </div>
                    )}

                    {/* User Details */}
                    {isAuthenticated && data.userDetails && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold">User Details</h2>
                            <p>Name: {data.userDetails.name}</p>
                            <p>Age: {data.userDetails.age}</p>
                            <p>Height: {data.userDetails.height} cm</p>
                            <p>Mass: {data.userDetails.mass} kg</p>
                            <p>BMI: {data.userDetails.BMI}</p>
                            <p>Health Status: {data.userDetails.healthstatus}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Overview;
