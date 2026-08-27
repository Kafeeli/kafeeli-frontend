import CurrentUserContext from "./currentUserContext";
import { getStoredUser } from "../utils/session";

export default function CurrentUserProvider({ user, children }) {
  return (
    <CurrentUserContext.Provider value={user || getStoredUser()}>
      {children}
    </CurrentUserContext.Provider>
  );
}
