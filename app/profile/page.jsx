"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    //Navigate to the update prompt page with the id of the post (adds a query parameter named id to the URL)
    router.push(`/update-prompt?id=${post._id}`)
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if(hasConfirmed){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method: 'DELETE',
  
        } )
          //if the current element's(p) _id is different from the one being deleted(post.id), include it in the new filteredPosts array , otherwise exclude it.
        const filteredPosts = posts.filter((item) => item._id !== post._id);

        setPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;