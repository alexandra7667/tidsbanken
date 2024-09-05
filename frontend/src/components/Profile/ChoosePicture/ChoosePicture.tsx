import { ChangeEvent, useContext } from "react";
import { UserContext } from "../../../App.tsx";

export default function ChoosePicture() {
  const { setUser } = useContext(UserContext);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      //Convert file to a Data URL. Triggers reader.onloadend after it's done
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setUser((prevUser) => ({
          ...prevUser!, //! guarantees user is not null
          profilePic: imageUrl
        }));
        //@Todo Update in database
      };
    }
  };

  return (
    <input
      style={{ paddingLeft: "15%" }}
      type="file"
      accept="image/*"
      onChange={handleFileChange}
    />
  );
}
