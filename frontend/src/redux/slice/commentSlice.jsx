
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

export const createNewComment = createAsyncThunk('createcomment', async ( formData , { rejectWithValue }) => {
    try {
        const response = await services.createnewcomment( formData );
        return response
    } catch (error) {
        const message = error.response?.data?.message || "New comment failed";
        return rejectWithValue(message);
    }
});

export const addReplyComment = createAsyncThunk('addReplyComment', async (formData, { rejectWithValue }) => {
    try {
        const response = await services.addreplycomment(formData);
        return response
    } catch (error) {
        const message = error.response?.data?.message || "Reply comment failed";
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

export const updateComments = createAsyncThunk('updateComment', async ({ commentId,formData }, { rejectWithValue }) => {
    try {
        const response = await services.updatecomment({ commentId ,formData});
        return response
    } catch (error) {
        const message = error.response?.data?.message || "update comment failed";
        return rejectWithValue(message);
    }
});


export const deleteComments = createAsyncThunk('deleteComments', async ({ commentId }, { rejectWithValue }) => {
    try {
        const response = await services.deletecomment({ commentId});
        return response
    } catch (error) {
        const message = error.response?.data?.message || "delete comment failed";
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
        builder.addCase(updateComments.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(updateComments.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        })
        builder.addCase(updateComments.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;

        })
        builder.addCase(deleteComments.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(deleteComments.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        })
        builder.addCase(deleteComments.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;

        })
    }
})
export const { clearMessages } = commetSlice.actions;
export default commetSlice.reducer;
