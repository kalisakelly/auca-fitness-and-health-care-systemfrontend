import  { useState } from 'react';

// eslint-disable-next-line react/prop-types
const PostForm = ({ addPost }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (author.trim() !== '' && content.trim() !== '') {
  //     const newPost = {
  //       id: Date.now(),
  //       author,
  //       content,
  //       comments: [],
  //     };
  //     addPost(newPost);
  //     setAuthor('');
  //     setContent('');
  //   }
  // };

  return (
    // <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-4">
    //   <input 
    //     type="text" 
    //     value={author} 
    //     onChange={(e) => setAuthor(e.target.value)} 
    //     placeholder="Your name" 
    //     className="border p-2 rounded w-full mb-2"
    //   />
    //   <textarea 
    //     value={content} 
    //     onChange={(e) => setContent(e.target.value)} 
    //     placeholder="What's on your mind?" 
    //     className="border p-2 rounded w-full mb-2"
    //   />
    //   <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Post</button>
    // </form>

    <form className="p-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Search Users" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <textarea 
              placeholder="What's rippling in your mind?" 
              className="w-full p-2 border border-gray-300 rounded-md h-24"
            ></textarea>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Post</button>
          </div>
        </div>
        
      </div>
    </form>

  );
}

export default PostForm;
