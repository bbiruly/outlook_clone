import moment from "moment";
import { markAsFavorite, markAsRead } from "../../services/localStorage";
import { Email } from "../../types/types";

type Props = {
  data: Email;
  children: React.ReactNode;
};





const EmailBody = ({ data, children }: Props) => {

    const handleOnFavorite = (data:Email) => {
        //add as favorite 
        markAsFavorite(data)
        markAsRead(data)
      };
    
  return (
    <div className="mb-10 p-10 m-5 border rounded-lg flex flex-col transition-all duration-300 bg-white shadow-lg">
      {/* Header Section */}
      <div className="flex mr-16 justify-between items-start gap-4">
        {/* Sender Information */}
        <div className="flex items-center gap-4">
          {/* Initial Avatar */}
          <div className="bg-accent text-white flex items-center justify-center w-14 h-14 rounded-full">
            <span className="text-xl font-bold uppercase">
              {data.from?.name.charAt(0)}
            </span>
          </div>
          {/* Subject and Date */}
          <div className="">
            <p className="text-lg font-semibold text-gray-800">
              {data.subject}
            </p>
            <p className="text-sm text-gray-500">
              {moment(data.date).format("DD-MM-YYYY hh:mma")}
            </p>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={()=>handleOnFavorite(data)}
          className="text-sm bg-accent text-white  px-3 py-1 rounded-full"
        >
          Mark as favorite
        </button>
      </div>

      {/* Body Section */}
      <div className="mt-6 px-16 pt-4 text-gray-700 text-justify">{children}</div>
    </div>
  );
};

export default EmailBody;
