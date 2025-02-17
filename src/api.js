import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-mojb.onrender.com/api",
});

export const getArticles = (params) => {
  return newsApi
    .get("/articles", { params })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching articles:", error);
      throw error;
    });
};

export const patchArticleVotes = (article_id, inc_votes) => {
  return newsApi
    .patch(`/articles/${article_id}`, { inc_votes: inc_votes })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating votes:", error);
      throw error;
    });
};
