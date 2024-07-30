import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState(''); // State to check if the prompt is copied
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [modalContent, setModalContent] = useState(''); // State to store modal content
  const [isLoading, setIsLoading] = useState(false); // State to indicate loading
  const { data: session } = useSession(); // Session data
  const pathName = usePathname(); // Pathname of the current page

  // Handles the copy of the prompt
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  };

  const handleSendToGemini = async () => {
    setIsLoading(true); // Start loading
    try {
      // Send the prompt to Gemini
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: post.prompt }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Parsed response:', data);

      // Set the modal content and open the modal
      setModalContent(data.message);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to copy the response to the clipboard
  const handleCopyResponse = () => {
    navigator.clipboard.writeText(modalContent);
    alert('Response copied to clipboard!');
  };

  return (
    <div>
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
          <Link 
            className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
            href={
              session?.user.id === post.creator._id
                ? '/profile'
                : `/profile/${post.creator._id}?name=${post.creator.username}`
            }
          >
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
          {/* Copy button */}
          <div className="copy_btn" onClick={handleCopy} >
            <Image 
              src={copied === post.prompt ? 'assets/icons/tick.svg' : '/assets/icons/copy.svg'}
              width={12}
              height={12}
            />
          </div>
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">
          {post.prompt}
        </p>
        <div className='flex flex-row justify-between'>
          <p className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClick && handleTagClick(post.tag)}
          >
            #{post.tag}
          </p>
          {/* Send to Gemini button */}
          <div className="send_btn" onClick={handleSendToGemini}>
            <Image 
              src='/assets/images/gemini_logo.png'
              width={27}
              height={27}
            />
          </div>
        </div>

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

      {/* Modal */}
      {isModalOpen && (
        <div className="modal_overlay">
          <div className="modal_content">
            <h2 className="font-bold mb-1 text-lg">Gemini Response</h2>
            <div className="modal_body">
              <ReactMarkdown>{modalContent}</ReactMarkdown>
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={handleCopyResponse} className="copy_res_btn">Copy Response</button>
              <button onClick={closeModal} className="close_btn">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="loading_overlay">
          <div className="loading_spinner"></div>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
