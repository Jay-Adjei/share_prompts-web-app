import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete}) => {
  const [copied, setCopied] = useState(''); //State to check if the prompt is copied
  const { data: session } = useSession(); //Session data
  const router = useRouter(); //Router to navigate to different pages

  const pathName = usePathname(); //Pathname of the current page

//Handles the copy of the prompt
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link 
        className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
        href= {
          session?.user.id === post.creator._id ?(
            '/profile'
          ):(
            `/profile/${post.creator._id}?name=${post.creator.username}`
          )
        }>
          <Image 
          src={post.creator.image}
          alt="User_image"
          width={40}
          height={40}
          className="rounded-full object-contain"
        />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </Link>
          {/*Copy button */}
        <div className="copy_btn" onClick={() => {handleCopy()}}>
          {/* checks is the prompt copied is equal to the prompt intended to copy and renders an image based on that */}
          <Image src={copied === post.prompt?
            'assets/icons/tick.svg'
            : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.prompt}
        </p>
      <p className="font-inter text-sm blue_gradient cursor-pointer"
      onClick={() => handleTagClick && handleTagClick(post.tag)}> {/*If tag exists then we will be able to click and show all relevant/similar tags */}
        #{post.tag}
      </p>

        {/* checks if the user is the creator of the post and the pathname is profile then renders the following */}
        {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-1 flex-end gap-4 border-t border-gray-100 pt-1'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default PromptCard