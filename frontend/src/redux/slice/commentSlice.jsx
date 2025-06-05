
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as services from '../../request/comment'
import { insertReply } from "../../utils/nestedComments";

const initialState = {
    message: "",
    loading: false,
    error: null,
    success: null,
    comments: []
}

export const createNewComment = createAsyncThunk('createcomment', async ({ taskId, text}, { rejectWithValue }) => {
    try {
        const response = await services.createnewcomment({ taskId, text});
        return response
    } catch (error) {
        const message = error.response?.data?.message || "New comment failed";
        return rejectWithValue(message);
    }
});

export const addReplyComment = createAsyncThunk('addReplyComment', async ({ taskId, text,parentId}, { rejectWithValue }) => {
    try {
        const response = await services.addreplycomment({ taskId, text,parentId});
        return response
    } catch (error) {
        const message = error.response?.data?.message || "New comment failed";
        return rejectWithValue(message);
    }
});

export const fetchComments = createAsyncThunk('fetchcomments', async ({ id }, { rejectWithValue }) => {
    try {
        const response = await services.viewcomment({ id });
        return response
    } catch (error) {
        const message = error.response?.data?.message || "View User comments failed";
        return rejectWithValue(message);
    }
});

const commetSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.success = null;
            state.message = "";
            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createNewComment.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(createNewComment.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.comments.unshift(action.payload.comment); 
            state.message = action.payload.message;
        })
        builder.addCase(createNewComment.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;
        })
          builder.addCase(addReplyComment.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(addReplyComment.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
             const newReply = action.payload.comment;
             const parentId = newReply.parent; 
             insertReply(state.comments, parentId, newReply); 
        })
        builder.addCase(addReplyComment.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;
        })
        builder.addCase(fetchComments.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.comments = action.payload.comments;
            state.message = action.payload.message;
        })
        builder.addCase(fetchComments.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload;
        })
    }
})
export const { clearMessages } = commetSlice.actions;
export default commetSlice.reducer;
