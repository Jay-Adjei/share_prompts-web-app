'use client'
import { useState, useEffect } from "react"

import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
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
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [posts, setPosts] = useState([]);

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

  const filterPosts = (searchtext) => {
    const searchPattern = new RegExp(searchtext, 'i');
    return posts.filter(
      (item) => 
        searchPattern.test(item.creator.username) ||
        searchPattern.test(item.tag) ||
        searchPattern.test(item.prompt)
    )
  }

  const handleSearchChange = (e) => {
    //clear any lingering timeout before setting a new one
    clearTimeout(searchTimeOut);
    //set the search text to the value of the user input
    setSearchText(e.target.value);

    //set a new timeout to search for the text after 700ms
    setSearchTimeOut(
      //call the filterPosts function with the search text
    setTimeout(() => {
      //filter the posts based on the search text
      const searchResult = filterPosts(e.target.value);
      //set the searched results state to the search result
      setSearchedResults(searchResult);
    }), 1000)

  }
  const  handleTagClick = (tag) => {
    //set the search text to the tag in turn changing the value of the search input to the tag clicked
    setSearchText(tag);

    //filter the posts based on the tag clicked
    const tagResult = filterPosts(tag);
    //set the searchedResult state to the tagResult
    setSearchedResults(tagResult);
  }


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

      {/* Condition to check if the user has typed in anything 
      in the search bar and render the PromptCardList component 
      with the searchedResults state */}
      {
        searchText? (
          <PromptCardList
          //Passes the searchedResults state to the PromptCardList component
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
          
        ) : (
          <PromptCardList
          //Passes the posts state to the PromptCardList component
          data={posts}
          handleTagClick={handleTagClick}
        />
        )
      }

    </section>
  )
}

export default Feed