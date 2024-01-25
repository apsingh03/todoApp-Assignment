import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const getToDoAsync = createAsyncThunk(
  "todo/gettodo",

  async () => {
    // console.log("-- get request " )

    try {
      const response = await axios.get(
        "https://datavalidation.pythonanywhere.com/todolist/add/"
      );
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addToDoAsync = createAsyncThunk(
  "todo/addtodo",

  async ({ name, priority }) => {
    // console.log("--> "  + name , priority)

    try {
      const response = await axios.post(
        "https://datavalidation.pythonanywhere.com/todolist/add/",
        {
          name: name,
          priority: priority,
        }
      );
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteToDoAsync = createAsyncThunk(
  "todo/deletetodo",

  async ({ id }) => {
    // console.log("--> "  + id );

    try {
      const response = await axios.delete(
        `https://datavalidation.pythonanywhere.com/todolist/delete/${id}/`
      );
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const todoApiSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    sortByIdASC(state, action) {
      console.log("sort by ASc ");
      let idData = state.data.data.sort((a, b) => {
        return a.id - b.id;
      });

      // console.log("sort by id" , idData)

      state.data.data = idData;
    },

    sortByIdDES(state, action) {
      console.log("sort by DES ");
      let idData = state.data.data.sort((a, b) => {
        return b.id - a.id;
      });

      state.data.data = idData;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getToDoAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getToDoAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log ("-> " , action.payload.hits)
        state.data = action.payload;
      })

      .addCase(getToDoAsync.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })

      .addCase(addToDoAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(addToDoAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log ("-> " , action.payload.postData);
        // alert(action.payload.msg);
        state.data.data.push(action.payload.postData);
      })

      .addCase(addToDoAsync.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })

      .addCase(deleteToDoAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteToDoAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        const { id } = action.meta.arg;

        const index = state.data.data.findIndex((data) => {
          return data.id === id;
        });

        state.data.data.splice(index, 1);
      })

      .addCase(deleteToDoAsync.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });

    //
  },
});

export const { sortByIdASC, sortByIdDES } = todoApiSlice.actions;
export default todoApiSlice.reducer;
