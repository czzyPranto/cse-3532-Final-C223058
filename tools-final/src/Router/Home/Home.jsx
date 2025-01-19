import React, { useState, useEffect } from 'react';
import './Home.css';
const Home = () => {
  // Tab names array
  const tabNames = ['All', 'Music', 'Comedy', 'Drawing'];

  // State to track the active tab
  const [activeTab, setActiveTab] = useState('All');

  // State for the fetched data
  const [videos, setVideos] = useState([]);

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
        const data = await response.json();
        if (data.status) {
          setVideos(data.data); // Set the fetched data
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter the videos based on the active tab
  const filteredVideos = activeTab === 'All'
    ? videos
    : videos.filter((video) => {
      // Match based on category_id
      if (activeTab === 'Music') {
        return video.category_id === '1001';
      } else if (activeTab === 'Comedy') {
        return video.category_id === '1003';
      } else if (activeTab === 'Drawing') {
        return video.category_id === '1005';
      }
      return false;
    });

  return (
    <div>
      {/* Navbar */}
      <div className="navbar bg-base-100 space-y-5">
        <div className=" logo navbar-start">
          <img src="./assets/Logo.png" alt="Logo" className=" h-10 ml-10" />
        </div>
        <div className="navbar-center">
          <button className="btn bg-gray-300">Sort by View</button>
        </div>
        <div className="navbar-end">
          <button className="btn btn-error text-white mr-10 w-20 h-11">Blog</button>
        </div>
      </div>

      <div>
        <hr class="border-t-2 border-[#171717] m-10" />
      </div>


      {/* Main Content */}
      <div className="container mx-auto px-16 mt-16">
        {/* Tabs */}
        <div role="tablist" className="tabs tabs-boxed">
          {tabNames.map((tabName, index) => (
            <a
              key={index}
              role="tab"
              className={`tab ${activeTab === tabName ? 'bg-red-600 text-white' : ''}`}
              onClick={() => setActiveTab(tabName)}
            >
              {tabName}
            </a>
          ))}
        </div>

        {/* Video Grid */}
        <div className="mt-8">
          <div className="grid grid-cols-4 gap-5">
            {filteredVideos.map((video, index) => (
              <div key={index} className="card card-compact bg-base-100 w-auto shadow-xl">
                <figure>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="object-cover h-36"
                  />
                </figure>
                <div className="card-body">
                  {/* Avatar and Title */}
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={video.authors[0]?.profile_picture || "https://i.pravatar.cc/150?img=3"}
                      alt="Avatar"
                    />
                    <div>
                      <h3 className="font-semibold">{video.title || 'Unknown Author'}</h3>
                    </div>
                  </div>

                  {/* Author Name and Verified Icon */}
                  <div className="mt-2 text-sm text-gray-500">
                    <span>{video.authors[0]?.profile_name}</span>
                    {video.authors[0]?.verified && (
                      <span className="text-blue-600 text-xl">&#x2714;</span>
                    )}
                  </div>

                  {/* Views */}
                  <div className="mt-1 text-xs text-gray-400">
                    <span>{video.others.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
