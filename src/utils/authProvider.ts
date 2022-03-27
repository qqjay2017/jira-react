import { UserModel } from "types";

const localStorageKey = "__auth_provider_token__";

export const getToken = () => localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: UserModel }) => {
  localStorage.setItem(localStorageKey, user.token);
};

export const removeToken = () =>
  window.localStorage.removeItem(localStorageKey);
