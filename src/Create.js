import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import supabase from './SupabaseClient'; // Import Supabase client

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Tom');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create blog object to send to Supabase
    const blog = { title, body, author };

    setIsPending(true);
    setError(null); // Reset error state before submission

    try {
      // Insert blog post into Supabase
      const { error } = await supabase
        .from('blogs') // Ensure 'blogs' is your correct table name in Supabase
        .insert([blog]);

      if (error) throw error; // Throw error if insertion fails

      // Redirect to home page after successful post creation
      history.push('/');
    } catch (error) {
      setError(error.message); // Set error message if insertion fails
    } finally {
      setIsPending(false); // Set loading state to false after submission
    }
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="Tom">Tom</option>
          <option value="Maja">Maja</option>
        </select>

        {/* Show error message if there is one */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Show pending state */}
        {!isPending && <button type="submit">Add Blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
};

export default Create;
