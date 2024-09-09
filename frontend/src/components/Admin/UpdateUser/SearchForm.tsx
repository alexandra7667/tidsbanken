import { ChangeEvent } from "react";
import { Form, Button } from "react-bootstrap";

export default function SearchForm({ userData, setUserData, searchUser }) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={searchUser}>
          <Form.Control
            type="text"
            placeholder="Search user by id"
            name="userId"
            value={userData.userId}
            onChange={handleChange}
          />

          <Button className="mt-2 mb-4" type="submit">Search</Button>
    </Form>
  );
}
