export default function CommentCard({ comment }) {
  return (
    <>
    <div style={{ border: "1px solid #ccc", borderRadius: "5px" }}>
      <p>User id: {comment.userId}</p>
      <p>Created at: {comment.createdAt}</p>
      <p>Message: {comment.content}</p>
      </div>
    </>
  );
}