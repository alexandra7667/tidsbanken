
export default function Picture( {image} ) {

  return (
    <div>
      {image && <img src={image as string} style={{ width: '100px' }} />}
    </div>
  );
}
