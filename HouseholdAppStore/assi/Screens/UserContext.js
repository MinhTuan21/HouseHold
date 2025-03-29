import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "Minh Tuấn",
    address: "Thôn Thanh Chiêm2, Điện Phương, Quảng Nam",
    avatar: "https://i.pravatar.cc/100",
    birthdate: new Date(),
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
