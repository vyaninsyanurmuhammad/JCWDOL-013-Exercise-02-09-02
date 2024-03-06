import { Post, User } from "./../../models/types/TwitterProps";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addPostThunk,
  deletePostThunk,
  getPostsThunk,
  getProfileThunk,
  updatePostThunk,
} from "./app-thunk";

interface IInitialState {
  posts: Post[];
  editDialogState: IDialogState;
  profileState: IProfileState;
}

interface IDialogState {
  id: string;
  isOpen: boolean;
}
interface IProfileState {
  user?: User;
  posts?: Post[];
}

const initialState: IInitialState = {
  posts: [],
  editDialogState: {
    id: "",
    isOpen: false,
  },
  profileState: {
    user: undefined,
    posts: undefined,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOpenEditDialog: (state, action: PayloadAction<IDialogState>) => {
      state.editDialogState.id = action.payload.id;
      state.editDialogState.isOpen = action.payload.isOpen;
    },
  },
  extraReducers(builder) {
    builder.addCase(addPostThunk.fulfilled, (state, action) => {
      state.posts = [...state.posts, action.payload].sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
    });

    builder.addCase(deletePostThunk.fulfilled, (state, action) => {
      state.posts = [
        ...state.posts.filter((data) => data.id !== action.payload),
      ];
    });

    builder.addCase(updatePostThunk.fulfilled, (state, action) => {
      state.posts = [
        ...state.posts.map((data) =>
          data.id === action.payload.id ? action.payload : data
        ),
      ];
    });

    builder.addCase(getPostsThunk.fulfilled, (state, action) => {
      state.posts = [...action.payload];
    });

    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
      state.profileState.user = action.payload?.user;
      state.profileState.posts = action.payload?.posts;
    });
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
