import { FaSpinner } from "react-icons/fa"; // Example: using React Icons

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <FaSpinner className="animate-spin text-blue-500" size={24} />
      <span className="text-sm ml-2">Please wait</span>
    </div>
  );
};

export default Loader;
