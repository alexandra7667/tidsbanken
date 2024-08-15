import { Dispatch, SetStateAction } from "react";
import { backendUrl } from "../../../../assets/strings/backendUrl";
import Comment from "../../Interfaces/Comment";

export default async function postComment(
  newComment: {userId: string; requestId: string; comment: string},
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
) {
  // const token = localStorage.getItem('token'):
  // const headers = {
  //   "Content-Type": "application/json",
  //    "Authorization": `Bearer: ${token}`
  // };
  // const fetchResponse = await fetch(`${backendUrl}/request/${request_id}/comment`, {
  //   method: "PATCH",
  //   headers: headers,
  //   body: JSON.stringify(newComment),
  // });
  // if (!fetchResponse.ok) {
  //   console.log("Failed to create new comment");
  // Create alert
  // }
  // else {
  //   const response = await fetchResponse.json();
  // Create toast
  //   setComments((prevComments) => [
  //   ...prevComments,
  //   response.data
  // ]);
  // }
}
