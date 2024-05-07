'use client'
import { useState, useEffect } from "react"

import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt-layout">
      {/* Iterates through the prompts in the data prop and renders the promptcard component for each post. */}
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {

  }

  useEffect (() => {
    const fetchPosts = async() => {
      //Gets all prompts from the database
      const response = await fetch('/api/prompt');
      //Converts the response to JSON
      const data = await response.json();
      //Sets the posts state to the data from the database
      setPosts(data);
    }
    //Calls the fetchPosts function when the component mounts
    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
      //Passes the posts state to the PromptCardList component
      data={posts}
      handleTagClick={() => {}}
      
    />
    </section>
  )
}

export default Feed