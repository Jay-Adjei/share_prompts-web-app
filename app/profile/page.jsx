'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/profile";

const MyProfile = () => {
    const [posts, setPosts] = useState([]);
    // Gets the session(user data) from the useSession hook
    const {data: session} = useSession();

    const handleEdit = () => {

    }
    const handleDelete = async() => {

    }

    useEffect (() => {
        const fetchPosts = async() => {
          //Gets all prompts from the database
          const response = await fetch('/api/users/${session?.user.id}/posts');
          //Converts the response to JSON
          const data = await response.json();
          //Sets the posts state to the data from the database
          setPosts(data);
        }
        //Calls the fetchPosts function when the component mounts
        if (session?.user.id) fetchPosts();
      }, [])

  return (
    <Profile 
    name='My'
    desc='Welcome to your personalized profile page.'
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default MyProfile