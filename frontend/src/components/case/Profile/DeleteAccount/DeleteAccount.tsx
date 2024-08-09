import { Button } from "react-bootstrap";
import deleteAccountRequest from "./DeleteAccountRequest";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount() {
    const navigate = useNavigate();

    const deleteAccount = () => {
        console.log("Deleting account");
        deleteAccountRequest(navigate);
    }

    return (
        <Button onClick={deleteAccount} className="mt-custom" variant="outline-danger">Delete account</Button>
    )
}