"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Dispatch, SetStateAction, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
interface UpdateCommentModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  comment: string;
  commentId: number;
}

const UpdateCommentModal = ({
  setShowModal,
  comment,
  commentId,
}: UpdateCommentModalProps) => {
  const router = useRouter();
  const [updatedComment, setUpdatedComment] = useState(comment);
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedComment === "") return toast.info("Please write Something");
    try {
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, {
        text: updatedComment,
      });
      router.refresh();
      setShowModal(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response.data.message);
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="w-11/12 lg:w-2/4 bg-white rounded-lg p-3">
        <div className="flex justify-between items-start my-3">
          <p>Update Comment</p>
          <IoMdCloseCircleOutline
            className="text-2xl text-red-500 cursor-pointer "
            onClick={() => setShowModal(false)}
          />
        </div>

        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            placeholder="edit comment"
            className="text-xl rounded-lg py-2 px-4 w-full bg-white mb-2 border-2"
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-700 w-full text-white mt-2 p-1 text-xl rounded-lg  hover:bg-green-900 transition"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModal;
