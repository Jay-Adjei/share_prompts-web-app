"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({params}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get('name')

  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params?.id]);

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
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s profile page. Here you can view all the prompts created by ${userName}.`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;