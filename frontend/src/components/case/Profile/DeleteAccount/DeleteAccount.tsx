import { Button } from "react-bootstrap";
import deleteAccountRequest from "./DeleteAccount";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount() {
  const navigate = useNavigate();

  const deleteAccount = () => {
    console.log("Deleting account");
    deleteAccountRequest(navigate);
  };

  return (
    <div style={{ marginTop: "60%" }}>
      <Button onClick={deleteAccount} variant="outline-danger">
        Delete account
      </Button>
    </div>
  );
}
