"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface AddCommentProps {
  articleId: number;
}
const AddCommentForm = ({ articleId }: AddCommentProps) => {
  const [comment, setComment] = useState("");
  const router = useRouter();
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment === "") return toast.info("Please write Something");
    try {
      await axios.post(`${DOMAIN}/api/comments`, {
        articleId: articleId,
        text: comment,
      });
      setComment("");
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response.data.message);
    }
  };
  return (
    <div>
      <form className="my-5   " onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder="Add a comment..."
          className="rounded-lg text-xl p-2 w-full bg-white focus:shadow-md"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg  hover:bg-green-900 transition "
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
