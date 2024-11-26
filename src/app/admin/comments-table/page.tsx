import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Comment } from "@prisma/client";

import { getAllComments } from "@/apiCalls/adminApiCall";
import DeleteCommentBtn from "./DeleteCommentBtn";
const AdminCommentsTable = async () => {
  const token = cookies().get("token")?.value;
  if (!token) {
    redirect("/");
  }
  const userPayload = verifyTokenForPage(token);
  if (userPayload?.isAdmin === false) {
    redirect("/");
  }

  const comments: Comment[] = await getAllComments(token);

  return (
    <section className="p-5 ">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Comments</h1>
      <table className="table w-full text-left ">
        <thead className="border-y-2 border-gray-500 text-xl">
          <tr>
            <th className="p-2">Comment</th>
            <th className="p-2 hidden lg:inline-block">Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment: Comment) => (
            <tr key={comment.id} className="border-y border-gray-300">
              <td className="p-3 text-gray-700">{comment.text}</td>
              <td className="text-gray-700 p-3  font-normal  hidden lg:inline-block">
                {new Date(comment.createdAt).toDateString()}
              </td>
              <td>
                <DeleteCommentBtn commentId={comment.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminCommentsTable;
