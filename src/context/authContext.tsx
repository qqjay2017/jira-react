import React, { FC, useContext, useState } from "react";
import { UserModel } from "types";

// eslint-disable-next-line
type AuthContextValue =
  | undefined
  | {
      user: UserModel;
      setUser: (user: UserModel) => void;
      login: (token: string) => void;
    };

const AuthContext = React.createContext<AuthContextValue>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserModel>({
    id: 0,
    name: "",
    token: "",
  });

  const login = (token: string) => {
    console.log(token, "token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {};
  }
  return context;
};
