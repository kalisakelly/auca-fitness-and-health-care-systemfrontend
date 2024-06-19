import  { useState } from 'react';
import Post from '../components/Posts';
import PostForm from '../components/PostForm';

const PostPage = () => {


  return (
    <div className="container mx-auto p-4">
      <PostForm />
      <div className="mt-4">
          <Post />
      </div>
    </div>
  );
}

export default PostPage;
