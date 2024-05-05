import { useState } from 'react';

const Dropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={toggleDropdown}
      >
        Dropdown Menu
        <svg className="-mr-1 ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.293l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414-1.414L10 12.586l-3.293-3.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-50 top-0 left-0 w-full bg-white rounded-md shadow-sm py-4 dark:bg-gray-800">
          {items.map((item) => (
            <a key={item.key} href={item.href} className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200">
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
