import Link from "next/link";
import React from "react";
import { Article } from "@prisma/client";
interface ArticleItemProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <div
      key={article.id}
      className="p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 hover:bg-slate-200  w-full md:w-2/5 lg:w-1/4 "
    >
      <h3 className="text-lg font-bold text-gray-900 line-clamp-1 hover:line-clamp-none">
        {article.title}
      </h3>
      <p className="my-2 text-xl text-gray-700 p-1 line-clamp-2">
        {article.description}
      </p>
      <Link
        className="text-xl bg-purple-700 hover:bg-purple-800 w-full block text-center p-1 text-white rounded-sm"
        href={`article/${article.id}`}
      >
        Read more
      </Link>
    </div>
  );
};

export default ArticleItem;
