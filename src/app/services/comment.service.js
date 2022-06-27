import httpServise from "./http.services";

const commentEndpoint = "comment/";

const commentService = {
  createComment: async (payload) => {
    const { data } = await httpServise.put(
      commentEndpoint + payload._id,
      payload
    );
    return data;
  },
  getComments: async (pageId) => {
    const { data } = await httpServise.get(commentEndpoint, {
      params: {
        orderBy: '"pageId"',
        equalTo: `"${pageId}"`
      }
    });
    return data;
  },
  removeComment: async (commentId) => {
    const { data } = await httpServise.delete(commentEndpoint + commentId);
    return data;
  }
};
export default commentService;
