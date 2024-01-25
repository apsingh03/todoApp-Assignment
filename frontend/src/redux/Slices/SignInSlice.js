import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "./Urls";

// First, create the thunk
export const SignInAsync = createAsyncThunk(
  "users/signup",
  async ({ email, password }) => {
    try {
      //  console.log( "11 - " + backendUrl.login )
      const response = await axios.post(backendUrl.login, {
        email: email,
        password: password,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  loggedAdminInfo: {
    user:
      localStorage.getItem("userLogged") !== null
        ? JSON.parse(localStorage.getItem("userLogged"))
        : "",
  },
};

const signInSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(SignInAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(SignInAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        // console.log( "payload - " + action.payload);

        try {
          if (action.payload.msg === "SignIn Successfull") {
            // alert(action.payload.msg)

            const { email, name, id } = action.payload.data[0];

            let user = {
              id: id,
              email: email,
              name: name,
            };

            const convert = JSON.stringify(user);
            localStorage.setItem("userLogged", convert);

            window.location.replace("/");
          }
        } catch (error) {}
      })

      .addCase(SignInAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default signInSlice.reducer;
