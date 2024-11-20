import React, { useEffect, useState } from 'react';
import BlogList from "./BlogList";
import supabase from './SupabaseClient'; // Import the Supabase client

const Home = () => {
    const [blogs, setBlogs] = useState([]);  // State to hold blog data
    const [isPending, setIsPending] = useState(true);  // State for loading status
    const [error, setError] = useState(null);  // State for error handling

    useEffect(() => {
        // Fetch blogs from Supabase
        const fetchBlogs = async () => {
            try {
                const { data, error } = await supabase
                    .from('blogs')  // Make sure this is your table name in Supabase
                    .select('*');  // Select all columns from the blogs table

                if (error) {
                    throw new Error(error.message);  // Handle any error
                }

                setBlogs(data);  // Set the blogs state with fetched data
                setIsPending(false);  // Set loading to false
            } catch (error) {
                setError(error);  // Handle errors
                setIsPending(false);  // Set loading to false
            }
        };

        fetchBlogs();  // Call the fetch function

    }, []);  // Empty dependency array means this runs once after the initial render

    return (
        <div className="home">
            {error && <div>{error.message}</div>}  {/* Display error if any */}
            {isPending && <div>Loading...</div>}  {/* Display loading message */}
            {blogs && <BlogList blogs={blogs} title="All Blogs" />}  {/* Display the blogs */}
        </div>
    );
};

export default Home;
