import { DOMAIN } from "@/utils/constants";
import { Comment } from "@prisma/client";
import axios from "axios";
export async function getAllComments(
  token: string | undefined
): Promise<Comment[]> {
  const response = await axios.get(`${DOMAIN}/api/comments`, {
    headers: { Cookie: `token=${token}` },
  });

  return await response.data;
}
