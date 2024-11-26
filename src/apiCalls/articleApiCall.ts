import { DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/types";
import { Article } from "@prisma/client";
import axios from "axios";

// --------------get articles based on pagenumber
export async function getArticles(
  pageNumber: string | undefined
): Promise<Article[]> {
  const response = await axios
    .get(`${DOMAIN}/api/articles`, {
      params: { pageNumber: pageNumber },
    })
    .catch(() => {
      throw new Error("Failed to fetch Articles");
    });

  return response.data;
}
// ----------------get count page article
export async function getArticlesCount(): Promise<number> {
  try {
    const response = await axios.get(`${DOMAIN}/api/articles/count`);
    const { articlesCount } = response.data;

    return articlesCount;
  } catch (error) {
    console.error("Error fetching count articles:", error);

    throw new Error("failed to get count articles");
  }
}
// --------------get articles based on text search
export async function getArticlesBySearch(
  searchText: string
): Promise<Article[]> {
  const response = await axios
    .get(`${DOMAIN}/api/articles/search`, {
      params: { searchText: searchText },
    })
    .catch(() => {
      throw new Error("Failed to fetch Articles");
    });

  return response.data;
}
// -----------get single article by id------------
export const getSingleArticle = async (
  articleId: string
): Promise<SingleArticle> => {
  try {
    const response = await axios.get(`${DOMAIN}/api/articles/${articleId}`);

    return response.data as SingleArticle;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw new Error("Failed to fetch Single Article");
  }
};
