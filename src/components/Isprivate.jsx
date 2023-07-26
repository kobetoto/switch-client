import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

//function pour rendre "privée" une route (<IsPrivate><IsPrivate/>)
function IsPrivate({ children }) {
  //IsPrivate({ children }) ==> destructuring de l'objet props   ===  const children = props.children

  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // spinner
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
    // si isLoggedIn est false alors redirect
    return <Navigate to="/login" />;
  } else {
    // si isLoggedIn est true alors on rend le "children"
    return children;
  }
}

export default IsPrivate;
