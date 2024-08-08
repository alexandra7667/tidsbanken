
function UserAvatar() {

    const goToProfile = () => {
        //@TODO navigate
    }

    return (
        <div style={circleStyle} onClick={goToProfile}>
            <p style={textStyle}>AH</p>
        </div>
    );
}
const circleStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: 'blue',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    
};

const textStyle = {
    color: 'white',
    margin: 0,
};

export default UserAvatar;