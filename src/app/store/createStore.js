import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./comments";
import professionsReducer from "./professions";
import qualitiesReducer from "./qualities";
import usersReducer from "./users";

const rootReeducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionsReducer,
  users: usersReducer,
  comments: commentsReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReeducer
  });
}
