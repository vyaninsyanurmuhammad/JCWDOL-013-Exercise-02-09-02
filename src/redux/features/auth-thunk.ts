import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../models/types/TwitterProps";
import { IUser } from "../../models/interfaces/IUser";

export const signInThunk = createAsyncThunk(
  "auth/signIn",
  async (user: IUser) => {
    const res = await fetch(`http://localhost:3001/users/${user.username}`);

    if (res.status === 200) {
      const data: User = await res.json();

      if (data.password !== user.password) return;

      return data;
    }
    
    return undefined;
  }
);

export const signUpThunk = createAsyncThunk(
  "auth/signUp",
  async (user: User) => {
    await fetch("http://localhost:3001/users", {
      method: "POST",
      body: JSON.stringify(user),
    });

    return user;
  }
);
