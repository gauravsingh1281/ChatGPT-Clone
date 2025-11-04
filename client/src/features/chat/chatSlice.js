import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createChat } from "./chatApi";
export const chat = createAsyncThunk("chat", async (data, { rejectWithValue }) => {
    try {
        return await createChat(data);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || "Error while creating chat.")
    }
})


const chatSlice = createSlice({
    name: "chat",
    initialState: {
        loading: false,
        chat: null,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // chat
            .addCase(chat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(chat.fulfilled, (state, action) => {
                state.loading = false;
                state.chat = action.payload.chat;
                state.error = null;
            })
            .addCase(chat.rejected, (state, action) => {
                state.loading = false;
                state.chat = null;
                state.error = action.payload;
            })
    }
});


export const { clearError } = chatSlice.actions;
export default chatSlice.reducer;