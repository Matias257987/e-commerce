// import axios from "axios";
// import { useCallback } from "react";
import { useState } from "react";
import Input from "./components/Input";

const Form = () => {
  // const console = useCallback(async () => {
  //     try {

  //     } catch (error) {
  //         console.log("Error");
  //     }
  // }, [])
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <Input
        label="title"
        onChange={(e: any) => setTitle(e.target.value)}
        id="title"
        value={title}
      />
      <Input
        label="description"
        onChange={(e: any) => setDescription(e.target.value)}
        id="description"
        value={description}
      />
    </div>
  );
};

export default Form;
