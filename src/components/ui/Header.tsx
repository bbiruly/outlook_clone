import React, { useEffect } from "react";
import CustomFilter from "../global/custom-filter/CustomFilter";
import Button from "../global/button/Button";
import { useData } from "../../context/ContextApi";
import { getDataByPagination } from "../../services/getDataBypage";
import { Email } from "../../types/types";



const Header = () => {
  const { inbox, setInbox, setIsLoading} = useData();
  const [activeButton, setActiveButton] = React.useState<string>("");

  // Helper functions for local storage
  const getFromLocalStorage = (key: string): Email[] => {
    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return [];
    }
  };

  const fetchUnreadEmails = (): Email[] => {
    const readEmails = getFromLocalStorage("markAsRead");
    return inbox.filter(
      (email) =>
        !readEmails.some(
          (readEmail: { id: string }) => readEmail.id === email.id
        )
    );
  };

  useEffect(() => {
    const fetchDataFromLocalstorage = async (filter: string) => {
      try {
        switch (filter) {
          case "Read":
            setInbox(getFromLocalStorage("markAsRead"));
            break;

          case "Favorites":
            setInbox(getFromLocalStorage("markAsFavorite"));
            break;
          default: {
            setIsLoading(true)
            const unreadEmails = fetchUnreadEmails();
            if (unreadEmails.length > 0) {
              setInbox(unreadEmails);
              setIsLoading(false)
            } else {
              const response = await getDataByPagination(1);
              setInbox(response);
              setIsLoading(false)
            }
            break;
          }
        }
      } catch (error) {
        console.error("Something went wrong while fetching data:", error);
      }
    };

    fetchDataFromLocalstorage(activeButton);
  }, [activeButton, setInbox]);

  const handleOnFilter = (filter: string) => {
    setActiveButton(filter);
  };

  return (
    <div className="bg-background">
      <CustomFilter>
        <p>Filter by: </p>
        <Button
          isClicked={activeButton === "Unread"}
          onClick={() => handleOnFilter("Unread")}
        >
          Unread
        </Button>
        <Button
          isClicked={activeButton === "Read"}
          onClick={() => handleOnFilter("Read")}
        >
          Read
        </Button>
        <Button
          isClicked={activeButton === "Favorites"}
          onClick={() => handleOnFilter("Favorites")}
        >
          Favorites
        </Button>
      </CustomFilter>
    </div>
  );
};

export default Header;
