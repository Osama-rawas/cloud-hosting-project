"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteCommentBtnProps {
  commentId: number;
}
const DeleteCommentBtn = ({ commentId }: DeleteCommentBtnProps) => {
  const router = useRouter();
  const deleteCommentHandler = async () => {
    try {
      if (confirm("tyou want to delete this comment,are you sure?")) {
        await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
        router.refresh();
        toast.success("comment deleted");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <div
      className="bg-red-600 text-white rounded-lg py-1 px-2 inline-block cursor-pointer hover:bg-red-800 transition"
      onClick={deleteCommentHandler}
    >
      Delete
    </div>
  );
};

export default DeleteCommentBtn;
