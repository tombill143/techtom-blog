// BlogPost.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to access route params
import supabase from './SupabaseClient'; // Import the Supabase client

const BlogPost = () => {
  const { id } = useParams();  // Get the id from the URL params
  const [blog, setBlog] = useState(null); // State to hold the individual blog data
  const [isPending, setIsPending] = useState(true);  // State for loading status
  const [error, setError] = useState(null);  // State for error handling

  useEffect(() => {
    // Fetch the individual blog from Supabase
    const fetchBlog = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')  // Your Supabase table name
          .select('*')  // Select all columns
          .eq('id', id)  // Filter by the blog id
          .single();  // We expect a single blog result

        if (error) {
          throw new Error(error.message);  // Handle any errors
        }

        setBlog(data);  // Set the individual blog data
        setIsPending(false);  // Set loading to false
      } catch (error) {
        setError(error.message);  // Handle errors
        setIsPending(false);  // Set loading to false
      }
    };

    fetchBlog();  // Call the fetch function
  }, [id]);  // Re-run the effect if the id changes

  if (isPending) {
    return <div>Loading...</div>;  // Display loading message
  }

  if (error) {
    return <div>Error: {error}</div>;  // Display error message
  }

  // Render the individual blog
  return (
    <div className="blog-post">
      <h1>{blog.title}</h1>
      <p>{blog.body}</p>
      <p><strong>Author: {blog.author}</strong></p>
    </div>
  );
};

export default BlogPost;
