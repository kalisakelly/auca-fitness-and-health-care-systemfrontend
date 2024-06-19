/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { Avatar } from "@material-tailwind/react";

const Post = ({ post, addComment }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      addComment(post.id, comment);
      setComment('');
    }
  };

  function CommentIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
    </svg> 
    )
}


  return (
    // <div className="bg-white p-4 rounded-lg shadow mb-4">
    //   <h2 className="text-xl font-bold">{post.author}</h2>
    //   <p className="mt-2">{post.content}</p>
    //   <form onSubmit={handleCommentSubmit} className="mt-4">
    //     <input 
    //       type="text" 
    //       value={comment} 
    //       onChange={(e) => setComment(e.target.value)} 
    //       placeholder="Add a comment..." 
    //       className="border p-2 rounded w-full"
    //     />
    //     <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Post</button>
    //   </form>
    //   <div className="mt-4">
    //     {post.comments.map((comment, index) => (
    //       <p key={index} className="bg-gray-100 p-2 rounded mt-2">{comment}</p>
    //     ))}
    //   </div>
    // </div>

    <div className="p-2">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Feed</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md shadow-md">
              <div className='flex items-start space-x-2'>
                <div className=''>
                  <Avatar 
                    variant="circular"
                    alt="tania andrew"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    className='w-10 h-10'
                  />
                </div>
                <div className='flex-1'>
                  <h3 className="font-semibold">Admin <span className="text-gray-500">@admin • 6mo</span></h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                     ...</p>
                  <div className="mt-2 text-gray-500 flex space-x-4">
                    <div className='flex items-center space-x-1'>
                      <FaRegHeart /> 
                      <span> 0 </span> 
                    </div>
                    <div className='flex items-center space-x-1'>
                      <FaRegComment /> 
                      <span> 0 </span> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="font-semibold">Rush Kahepa <span className="text-gray-500">@leconquerer • 1mo</span></h3>
              <p>Lorem ipsum</p>
              <div className="mt-2 text-gray-500 flex space-x-4">
              <div className='flex items-center space-x-1'>
                  <FaRegHeart /> 
                  <span> 0 </span> 
                </div>
                <div className='flex items-center space-x-1'>
                  <FaRegComment /> 
                  <span> 0 </span> 
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="font-semibold">kalisa kelly <span className="text-gray-500">@kalisakelly • 6d</span></h3>
              <p>dolor sit amet</p>
              <div className="mt-2 text-gray-500 flex space-x-4">
                <div className='flex items-center space-x-1'>
                  <FaRegHeart /> 
                  <span> 0 </span> 
                </div>
                <div className='flex items-center space-x-1'>
                  <FaRegComment /> 
                  <span> 0 </span> 
                </div>
              </div>
            </div>
          </div>
      </div>  
    </div>
  );
}

export default Post;
