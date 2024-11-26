"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
interface DeleteArticleBtbProps {
  articleId: number;
}
const DeleteArticleBtb = ({ articleId }: DeleteArticleBtbProps) => {
  const router = useRouter();
  const deleteArticleHandler = async () => {
    try {
      if (confirm("you want delete this article,are you sure")) {
        await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
        router.refresh();
        toast.success("Aricle deleted");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <div
      className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition"
      onClick={deleteArticleHandler}
    >
      Delete
    </div>
  );
};

export default DeleteArticleBtb;
