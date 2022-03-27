import { FC } from "react";
import { AuthProvider } from "./authContext";

export const AppProvider: FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
