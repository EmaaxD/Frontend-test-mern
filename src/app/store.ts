import { configureStore } from "@reduxjs/toolkit";

import clientSlice from "src/features/clients/clientSlice";

export const store = configureStore({
  reducer: {
    clients: clientSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
