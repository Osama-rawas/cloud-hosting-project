import { getSingleArticle } from "@/apiCalls/articleApiCall";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Article } from "@prisma/client";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import EditArticleForm from "./EditArticleForm";
interface EditArticlePageProps {
  params: { id: string };
}
const EditArticlePage = async ({ params: { id } }: EditArticlePageProps) => {
  const token = cookies().get("token")?.value;
  if (!token) {
    redirect("/");
  }
  const userPayload = verifyTokenForPage(token);
  if (userPayload?.isAdmin === false) {
    redirect("/");
  }
  const article: Article = await getSingleArticle(id);
  return (
    <section className="fix-height flex  items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 w-full rounded">
        <h2 className="text-2xl text-green-700 font-semibold mb-4">
          Edit Article
        </h2>
        <EditArticleForm article={article} />
      </div>
    </section>
  );
};

export default EditArticlePage;
