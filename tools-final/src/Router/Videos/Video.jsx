import React, { useEffect, useState } from "react";

const VideoCategories = () => {
  const [categories, setCategories] = useState([]); // State to store categories
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.status) {
          setCategories(result.data); // Update state with fetched data
        } else {
          throw new Error(result.message || "Failed to fetch categories");
        }
      } catch (err) {
        setError(err.message); // Update error state
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading message
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error message
  }

  return (
    <div>
      <h1>Video Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.category_id}>
            {category.category_id} - {category.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoCategories;
