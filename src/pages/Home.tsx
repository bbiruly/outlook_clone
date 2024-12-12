import CustomCard from "../components/global/custom-card/CustomCard";
import Pagination from "../components/global/pagination/Pagination";
import { markAsRead } from "../services/localStorage";
import { useData } from "../context/ContextApi";
import { Email } from "../types/types";



const Home = () => {
  const {inbox, currentPage, setCurrentPage} = useData()

  // wip: implement and push the details to array 
  const handleOnEmail = ( msg: Email) => {
    // store data in local storage 
    markAsRead(msg)
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="bg-background h-screen">
      {/* Listing all emails */}
      <section className="p-4">
        {inbox.length > 0 ? (
          inbox.map((msg: Email) => (
            <CustomCard
              key={msg.id}
              avatarChar={msg.from.name}
              from={msg.from.email}
              subject={msg.subject}
              description={msg.short_description}
              dateAndTime={msg.date}
              onClick={() => handleOnEmail(msg)}
              id={msg.id}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 flex justify-center h-[500px] items-center">
          <p className="border border-border px-20 py-4 bg-white rounded-lg">🥹 Opps! Email not found</p>
        </div>
        )}
      </section>
      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={2}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default Home;
