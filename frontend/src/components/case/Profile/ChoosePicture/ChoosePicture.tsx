import { useEffect, ChangeEvent } from "react";

export default function ChoosePicture({ userData, setUserData, setImage }) {
    useEffect(() => {
        //Get profile picture from url
        if (userData.profilePic !== '') {
          setImage(userData.profilePic);
        }
      }, [userData]);
    
      const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
          const reader = new FileReader();

          //Convert file to a Data URL. Triggers reader.onloadend after it's done
          reader.readAsDataURL(file);

          reader.onloadend = () => {
            const imageUrl = reader.result as string;
            setImage(imageUrl);
            setUserData((prevUserData) => ({
              ...prevUserData,
              profilePic: imageUrl,
            }));
          }      
        }
      }

    return (
        <input style={{ paddingLeft: "15%" }} type="file" accept="image/*" onChange={handleFileChange} />
    )
}