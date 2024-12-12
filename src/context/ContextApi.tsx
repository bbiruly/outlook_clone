import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getDataByPagination } from "../services/getDataBypage";

// Define the shape of the data and context
interface DataContextType {
  inbox: Email[];
  setInbox: React.Dispatch<React.SetStateAction<Email[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading:React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value of `undefined`
const DataContext = createContext<DataContextType | undefined>(undefined);

// DataProvider component
interface DataProviderProps {
  children: ReactNode;
}

// Email type definition
type Email = {
  id: string;
  from: {
    name: string;
    email: string;
  };
  subject: string;
  short_description: string;
  date: string;
};

export function DataProvider({ children }: DataProviderProps) {
  const [inbox, setInbox] = useState<Email[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Fetch initial inbox data or paginated data
  useEffect(() => {
    const fetchInbox = async () => {
      setIsLoading(true);
      try {
        let response: Email[];
        if (currentPage) {
          response = await getDataByPagination(currentPage);
          setInbox(response);
        }
      } catch (error) {
        console.error("Error fetching inbox data:", error);
      }finally{
        setIsLoading(false);
      }
    };

    fetchInbox();
  }, [currentPage]);

  return (
    <DataContext.Provider
      value={{ inbox, setInbox, currentPage, setCurrentPage, isLoading, setIsLoading }}
    >
      {children}
    </DataContext.Provider>
  );
}

// Custom hook to use the DataContext
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
