import { Button } from "react-bootstrap";
import deleteThisAccount from "./Delete";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App.tsx";
import { useContext } from "react";

export default function DeleteAccount() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function deleteAndLogoutUser() {
    const loggedOut = await deleteThisAccount(navigate, user!.id);
    if(loggedOut) {
      setUser(null);
      localStorage.clear();
      navigate("/");
    }
  }

  return (
    <div style={{ marginTop: "60%" }}>
      <Button onClick={deleteAndLogoutUser} variant="outline-danger">
        Delete account
      </Button>
    </div>
  );
}
