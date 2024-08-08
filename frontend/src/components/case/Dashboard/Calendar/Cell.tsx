
export default function Cell({ day }) {

    const selection = () => {
    console.log("selected: ", day)
  }

    return (
        <>
        <div className="cell" onClick={selection} >
            {day !== null ? day : ""}
          </div>
        </>
    )
}