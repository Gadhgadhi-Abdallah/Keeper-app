import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000/items";

export const getItems = createAsyncThunk("item/getItems", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await axios.get(baseURL);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const postItems = createAsyncThunk("item/postItems", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.post(baseURL, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteItems = createAsyncThunk("item/deleteItems", async (id, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;

  dispatch(setCurrentID(id));
  try {
    await axios.delete(`${baseURL}/${id}`);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const itemSlice = createSlice({
  name: "item",
  initialState: { value: [], isLoding: false, currentID: null },

  reducers: {
    setCurrentID: (state, action) => {
      state.currentID = action.payload;
    },
  },

  extraReducers: {
    [getItems.pending]: (state, action) => {
      state.isLoding = true;
    },
    [getItems.fulfilled]: (state, action) => {
      state.isLoding = false;
      state.value = action.payload;
    },

    [postItems.fulfilled]: (state, action) => {
      state.value.push(action.payload);
    },

    [deleteItems.fulfilled]: (state, action) => {
      state.value = state.value.filter((item) => item._id !== state.currentID);
      state.currentID = null;
    },
  },
});

export const { setCurrentID } = itemSlice.actions;
export default itemSlice.reducer;
