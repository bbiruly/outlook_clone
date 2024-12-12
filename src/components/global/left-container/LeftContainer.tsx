import { useState } from "react";
import CustomCard from "../custom-card/CustomCard";
import { markAsRead } from "../../../services/localStorage";
import { Email } from "../../../types/types";
import Loader from "../loader/Loader";

type Props = {
  emails: Email[];
  onClick: (id: string) => void;
  id:string;
  index:string;
  isClicked: boolean;
};



const LeftContainer = ({ emails, onClick, isClicked, id, index }: Props) => {
  const [idbyClick, setIdByClick] =  useState<string>('')
  const handleOnEmail = (id: string, msg:Email) => {
    onClick(id);
    setIdByClick(id)
    //mark as a Read and store it on local storage 
    markAsRead(msg)
  };

  return (
    <section className="overflow-y-auto h-screen">
      {emails.length > 0 ? (
        emails.map((msg: Email) => (
          <CustomCard
            key={msg.id}
            avatarChar={msg.from.name}
            from={msg.from.email}
            subject={msg.subject}
            description={msg.short_description}
            dateAndTime={msg.date}
            onClick={() => handleOnEmail(msg.id, msg)}
            id={msg.id || idbyClick}
            index={id || index}
            isCliked={isClicked}
          />
        ))
      ) :(<Loader/>)
      }
      
    </section>
  );
};

export default LeftContainer;
