import { getArticles } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/article/ArticleItem";
import Pagination from "@/components/article/Pagination";
import SearchArticleInput from "@/components/article/SearchArticleInput";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";
import { Article } from "@prisma/client";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Articles",
  description: "Cloude Hosting Project",
};
interface ArticlePageProps {
  searchParams: { pageNumber: string };
}

const ArticlePage = async ({ searchParams }: ArticlePageProps) => {
  const { pageNumber } = searchParams;
  // const count: number = await getArticlesCount();
  const count: number = await prisma.article.count();

  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  const articles: Article[] = await getArticles(pageNumber);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      <div className="flex items-center justify-center gap-2 flex-wrap my-5">
        {articles.map((article: Article) => (
          <ArticleItem article={article} key={article.id} />
        ))}
      </div>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        route="/article?pageNumber="
        pages={pages}
      />
    </section>
  );
};

export default ArticlePage;
