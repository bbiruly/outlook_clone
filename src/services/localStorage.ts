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

export const markAsRead = (msg:Email)=>{
     // Retrieve the current `markAsRead` array from localStorage
     const storedData = JSON.parse(localStorage.getItem("markAsRead") || "[]");
  
     // Check if the email already exists in the array
     const isAlreadyRead = storedData.some((email: Email) => email.id === msg.id);
   
     if (!isAlreadyRead) {
       // Add the new email
       const updatedData = [...storedData, msg];
       localStorage.setItem("markAsRead", JSON.stringify(updatedData));
   
       console.log("Updated markAsRead:", updatedData.length);
     }
}

// mark as a favorites 

export const markAsFavorite = (msg:Email)=>{
    // Retrieve the current `markAsRead` array from localStorage
    const storedData = JSON.parse(localStorage.getItem("markAsFavorite") || "[]");
 
    // Check if the email already exists in the array
    const isAlreadyRead = storedData.some((email: Email) => email.id === msg.id);
  
    if (!isAlreadyRead) {
      // Add the new email
      const updatedData = [...storedData, msg];
      localStorage.setItem("markAsFavorite", JSON.stringify(updatedData));
  
      console.log("Updated markAsFavorite:", updatedData.length);
    }
}