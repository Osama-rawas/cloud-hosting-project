"use client";
import { CommentsWithUser } from "@/utils/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCommentModal from "../article/UpdateCommentModal";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
interface CommentProps {
  comment: CommentsWithUser;
  userId: number | undefined;
}
const CommentItem = ({ comment, userId }: CommentProps) => {
  const [showModal, setShowModal] = useState(false);
  const route = useRouter();
  const commentDeleteHandler = async () => {
    try {
      if (confirm("you want to delete this comment ,Are you sure?")) {
        axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
        route.refresh();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data.message);
      console.log(error);
    }
  };
  return (
    <div className="mb-5  rounded-lg bg-gray-200 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-700 uppercase px-3 pt-2">
          {comment.user.userName}
        </strong>
        <span className="bg-yellow-400 px-1 rounded-lg text-white">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>
      <p className="text-gray-800 mb-2 px-5">{comment.text}</p>
      {userId && comment.userID === userId ? (
        <div className="flex justify-end items-center p-2">
          <FaEdit
            className="text-green-600    cursor-pointer me-3"
            onClick={() => setShowModal(true)}
          />
          <FaTrash
            className="text-red-600   cursor-pointer "
            onClick={commentDeleteHandler}
          />
        </div>
      ) : (
        <></>
      )}
      {showModal && (
        <UpdateCommentModal
          setShowModal={setShowModal}
          comment={comment.text}
          commentId={comment.id}
        />
      )}
    </div>
  );
};

export default CommentItem;
