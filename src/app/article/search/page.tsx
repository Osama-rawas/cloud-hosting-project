import { getArticlesBySearch } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/article/ArticleItem";
import SearchArticleInput from "@/components/article/SearchArticleInput";
import { Article } from "@prisma/client";

interface SearchArticlePageProps {
  searchParams: { searchText: string };
}
const SearchArticlePage = async ({
  searchParams: { searchText },
}: SearchArticlePageProps) => {
  const articles = await getArticlesBySearch(searchText);

  return (
    <section className="fix-height container m-auto px-5">
      <SearchArticleInput />
      <h1 className="text-xl font-bold mt-5 ml-10">
        Articles based on
        <span className="ms-1 text-green-700 font-bold"> {searchText}</span>
      </h1>
      {articles.length > 0 ? (
        <div className="flex items-center justify-center gap-2 flex-wrap my-5">
          {articles.map((article: Article) => (
            <ArticleItem article={article} key={article.id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-red-500 mt-10 text-2xl">
          No articles found
        </p>
      )}
    </section>
  );
};

export default SearchArticlePage;
