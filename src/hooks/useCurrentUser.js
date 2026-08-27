import { useContext } from "react";
import CurrentUserContext from "../context/currentUserContext";
import { getStoredUser } from "../utils/session";

export default function useCurrentUser() {
  return useContext(CurrentUserContext) || getStoredUser();
}
