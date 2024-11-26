"use client";

import { DOMAIN } from "@/utils/constants";
import { Article } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
interface EditArticleFormProps {
  article: Article;
}
const EditArticleForm = ({ article }: EditArticleFormProps) => {
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);
  const router = useRouter();
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("title is reqiure");
    if (description === "") return toast.error("description is reqiure");
    try {
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, {
        title: title,
        description: description,
      });

      toast.success(" Article updated");
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data.message);
      console.log(error);
    }
  };
  return (
    <div>
      <form className="flex flex-col" onSubmit={formSubmitHandler}>
        <input
          type="text"
          className="mb-4 border rounded px-4 py-2 text-xl outline-none"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          className="mb-4 p-2 lg:text-xl rounded resize-none"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="text-xl text-white bg-green-700 p-2 rounded-lg font-bold hover:bg-green-800"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditArticleForm;
