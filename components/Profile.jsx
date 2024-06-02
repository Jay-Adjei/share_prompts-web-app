import PromptCard from "./PromptCard";
import { useState, useEffect } from "react";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {

  const PromptCardList = ({data, handleTagClick})=> {
    return (
      <div className='mt-10 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
          handleTagClick={handleTagClick}
        />
      ))}
      </div>
    )
  }

  const [searchedResult, setSearchedResult] = useState([])
  const [searchTimeOut, setSearchTimeOut] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([])

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

  const filterPosts =(searchtext) => {
    const searchPattern = new RegExp(searchtext, 'i')
    return data.filter((item) => searchPattern.test(item.creator.username) ||
    searchPattern.test(item.prompt) || searchPattern.test(item.tag))
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut)
    setSearchText(e.target.value)

    setSearchTimeOut(setTimeout(() => {
      const searchResult = filterPosts(e.target.value)
      setSearchedResult(searchResult)
    }),700)
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const tagResult = filterPosts(tag);
    setSearchedResult(tagResult);
  }

  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <form className="relative w-[50%] h-20 flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
    <PromptCardList data={searchedResult} handleTagClick={handleTagClick} />
) : (
    <PromptCardList data={data} handleTagClick={handleTagClick} />
)}

      
    </section>
  );
};

export default Profile;