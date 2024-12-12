type Props = {
    children: React.ReactNode;
    isClicked?: boolean;
    onClick: () => void;
    className?: string;
  };
  // 
  const Button = ({ className, children, onClick, isClicked }: Props) => {
    return (
      <button
        className={`${className} px-3 py-0.5 ${isClicked ? "bg-filter-btn rounded-full border-2 border-border " : "bg-transparent border-none"}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  