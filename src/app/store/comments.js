import { createAction, createSlice, nanoid } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceved: (state, actions) => {
      state.entities = actions.payload;
      state.isLoading = false;
    },
    commentsRequestFieled: (state, actions) => {
      state.error = actions.payload;
      state.isLoading = false;
    },
    commentsCreated: (state, actions) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(actions.payload);
    },
    removeComment: (state, actions) => {
      state.entities = state.entities.filter((c) => c._id !== actions.payload);
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceved,
  commentsRequestFieled,
  commentsCreated,
  removeComment
} = actions;

const commentsCreateRequested = createAction(
  "comments/commentsCreateRequested"
);
const createCommentsFailed = createAction("comments/createCommentsFailed");
const removeCommentRequested = createAction("comments/removeCommentRequested");
const removeCommentFailed = createAction("comments/removeCommentFailed");

export const loadingCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceved(content));
  } catch (error) {
    dispatch(commentsRequestFieled(error.message));
  }
};

export const createComment =
  ({ content, currentUserId, userId }) =>
  async (dispatch) => {
    dispatch(commentsCreateRequested());
    const comment = {
      content: content,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId
    };
    try {
      const { content } = await commentService.createComment(comment);
      dispatch(commentsCreated(content));
    } catch (error) {
      dispatch(createCommentsFailed(error.message));
    }
  };

export const deleteComment = (id) => async (dispatch) => {
  dispatch(removeCommentRequested());
  try {
    const { content } = await commentService.removeComment(id);
    if (content === null) {
      dispatch(removeComment(id));
    }
  } catch (error) {
    dispatch(removeCommentFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
