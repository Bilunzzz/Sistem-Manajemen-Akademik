import { createContext, useContext, useState } from "react";

const AuthStateContext = createContext({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, _setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const setUser = (newUser) => {
    _setUser((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(newUser)) return prev;
      return newUser;
    });

    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthStateContext.Provider value={{ user, setUser }}>
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuthStateContext = () => useContext(AuthStateContext);
