// Each item in the list should navigate to a more detailed view of that particular request.
import { useNavigate } from "react-router-dom";

export default function RequestItem({ request }) {
    const navigate = useNavigate();
    
    const goToRequestView = () => {
        //navigate
    }

    return (
        <>
        <p>request item details</p>
        </>
    )
}