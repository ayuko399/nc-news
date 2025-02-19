import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-mojb.onrender.com/api",
});

export const getArticles = (params) => {
  console.log("Fetching articles with params:", params);
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
      console.error("Error updating votes:", error);
      throw error;
    });
};

export const getCommentsByArticleId = (article_id) => {
  return newsApi
    .get(`/articles/${article_id}/comments`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating votes:", error);
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

export const postComment = (article_id, { body }) => {
  return newsApi
    .post(`/articles/${article_id}/comments`, {
      username: "tickle122",
      body: body,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("error posting comment", error);
      throw error;
    });
};

export const deleteComment = (comment_id) => {
  console.log("URL being called:", `/comments/${comment_id}`);
  return newsApi
    .delete(`/comments/${comment_id}`)
    .then((response) => {
      console.log("Delete response:", response);
      return response.data;
    })
    .catch((error) => {
      console.error("error deleting comment", error);
      throw error;
    });
};

export const getTopics = () => {
  return newsApi
    .get("/topics")
    .then((response) => {
      console.log("getTopics response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("error fetching topics:", error);
      throw error;
    });
};
