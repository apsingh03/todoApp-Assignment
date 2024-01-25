import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { data: [], isLoading: false, isError: false };

export const getImageByIdAsync = createAsyncThunk(
  "image/getImageById",

  async ({ id }) => {
    const response = await axios.get(
      `https://pixabay.com/api/?key=41909199-7a39a7a3a69f000bfab5c8248&id=${id}`
    );
    // console.log(response.data)
    return response.data;
  }
);

const dataByIdSlice = createSlice({
  name: "getImageBySlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getImageByIdAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getImageByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // alert(action.payload.msg);
        state.data = action.payload;
      })

      .addCase(getImageByIdAsync.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default dataByIdSlice.reducer;
