"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
const AddArticleForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const formSubmitHnadler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("title is reqiure");
    if (description === "") return toast.error("description is reqiure");
    try {
      await axios.post(`${DOMAIN}/api/articles`, {
        title: title,
        description: description,
      });
      setTitle("");
      setDescription("");
      toast.success("New Article Added");
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data.message);
      console.log(error);
    }
  };
  return (
    <div>
      <form className="flex flex-col" onSubmit={formSubmitHnadler}>
        <input
          type="text"
          placeholder="Enter Article Title"
          className="mb-4 border rounded px-4 py-2 text-xl outline-none"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          className="mb-4 p-2 lg:text-xl rounded resize-none"
          rows={5}
          placeholder="Enter Article Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="text-xl text-white bg-blue-400 p-2 rounded-lg font-bold hover:bg-blue-500"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddArticleForm;
