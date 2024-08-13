export default function CommentCard({ comment }) {
  return (
    <>
      <p>{comment.date}</p>
      <p>{comment.username}</p>
      <p>{comment.content}</p>
    </>
  );
}
