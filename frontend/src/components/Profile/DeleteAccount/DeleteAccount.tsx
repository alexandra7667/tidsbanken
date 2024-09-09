import { Button } from "react-bootstrap";
import deleteThisAccount from "./Delete";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App.tsx";
import { useContext } from "react";
import { ErrorContext } from "../../Main/Main.tsx";
import fetchData from "../../../functions/fetchData.ts";

export default function DeleteAccount() {
  const { user, setUser } = useContext(UserContext);
  const { setErrorMessage } = useContext(ErrorContext);
  const navigate = useNavigate();

  async function deleteAndLogoutUser() {
    // const response = await deleteThisAccount(user!.id);
    const response = await fetchData(
      `user/${user!.id}`,
      "DELETE",
      null,
      "Failed to delete account."
    );
    if (response.status === "error") {
      if (response.message) setErrorMessage(response.message);
    } else {
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
