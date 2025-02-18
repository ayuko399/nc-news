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

export const getArticle = (article_id) => {
  return newsApi
    .get(`/articles/${article_id}`)
    .then((reponse) => reponse.data)
    .catch((error) => {
      console.error("Error fetching article", error);
      throw error;
    });
};
