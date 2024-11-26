import { getSingleArticle } from "@/apiCalls/articleApiCall";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { SingleArticle } from "@/utils/types";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";

interface SingalArticlePageProps {
  params: { id: string };
}

const SingalArticlePage = async ({ params }: SingalArticlePageProps) => {
  const article: SingleArticle = await getSingleArticle(params.id);

  const token = cookies().get("token")?.value || "";
  const userPayload = verifyTokenForPage(token);

  return (
    <section className=" container m-auto w-full px-5 pt-8 md:w-3/4">
      <div className="bg-white p-7 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">
          {article.title}
        </h1>
        <div className="text-gray-400">
          {new Date(article.createdAt).toDateString()}
        </div>
        <p>{article.description}</p>
      </div>
      <div className="mt-7">
        {userPayload ? (
          <AddCommentForm articleId={article.id} />
        ) : (
          <p className="text-blue-600 md:text-xl">
            to write a comment tou should log in first
          </p>
        )}
      </div>

      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>
      {article.comments.map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            comment={comment}
            userId={userPayload?.id}
          />
        );
      })}
    </section>
  );
};

export default SingalArticlePage;
