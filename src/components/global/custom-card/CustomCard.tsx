import moment from "moment";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import { useData } from "../../../context/ContextApi";
import { markAsFavorite } from "../../../services/localStorage";

type Props = {
  isCliked?: boolean;
  onClick: () => void;
  avatarChar: string;
  from: string;
  subject: string;
  description: string;
  dateAndTime: string;
  id: string;
  className?: string;
  index?:string
};

const CustomCard = ({
  avatarChar,
  from,
  subject,
  description,
  dateAndTime,
  isCliked,
  onClick,
  id,
  index,
  
}: Props) => {
  const {inbox} = useData()
  //fetch path from url
  const path = window.location.pathname;

  // handle on fav
  const handleOnFavorite = (id:string) => {
    const filteredEmail =  inbox.find((email)=>(email.id === id))
    //save it local storage
    if(filteredEmail){
      markAsFavorite(filteredEmail)
    }
  };



  return (
    <Link to={"/details"} state={{id, index, isCliked}} className="cursor-pointer">
      <div
        onClick={onClick}
        className={`p-6 m-5 border rounded-lg flex cursor-pointer transition-all duration-300  ${
          isCliked && (id === index)? "bg-read-bg " : "bg-white"
        }`}
      >
        <div className="bg-accent text-white p-4 rounded-full flex items-center justify-center w-12 h-12">
          <span className="text-3xl uppercase">{avatarChar.charAt(0)}</span>
        </div>
        <div className="flex flex-col justify-start items-start gap-y-3 ml-4">
          <p className="text-sm text-text">
            From: <span className="font-semibold">{from}</span>
          </p>
          <p className="text-sm text-text">
            Subject: <span className="font-semibold">{subject}</span>
          </p>
          <div className={`${path === '/details' ? "w-64" : "w-full"}`}>
            <p className="text-sm w-auto text-text truncate">{description}</p>
          </div>

          <div className="flex gap-x-3 items-center">
            <p className="text-xs text-text">
              {moment(dateAndTime).format("DD-MM-YYYY hh:mma")}
            </p>
            {(isCliked && (id === index)) && (
              <Button
                onClick={() => handleOnFavorite(id)}
                className="text-sm text-accent"
              >
                Favorite
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CustomCard;
