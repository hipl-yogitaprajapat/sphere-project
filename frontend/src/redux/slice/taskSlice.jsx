
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as services from '../../request/task'

const initialState = {
    message: "",
    loading: false,
    error: null,
    success: null,
    token: null,
    task: []
}


export const createNewTask = createAsyncThunk('newTask', async (formData, { rejectWithValue }) => {
    try {
        const response = await services.addnewtask(formData);
        return response

    } catch (error) {
        const message = error.response?.data?.message || "New Task failed";
        return rejectWithValue(message);
    }
});

export const viewUsersByRole = createAsyncThunk('viewuserbyrole', async (designation, { rejectWithValue }) => {
    try {
        const response = await services.viewuserbyrole(designation);
        return response
    } catch (error) {
        const message = error.response?.data?.message || "Users view by role failed";
        return rejectWithValue(message);
    }
});


export const viewTaskDetails = createAsyncThunk('viewtaskdetails', async (_, { rejectWithValue }) => {
    try {
        const response = await services.viewtask();
        return response

    } catch (error) {
        const message = error.response?.data?.message || "View User Projects failed";
        return rejectWithValue(message);
    }
});

export const deleteTask = createAsyncThunk('deletetask', async ({id},{ rejectWithValue }) => {
      try {
    const response = await services.deletetask({id});
       return response 
    
  } catch (error) {
    const message = error.response?.data?.message || "Edit User Projects failed";
      return rejectWithValue(message);
  }
});


const taskSlice = createSlice({
    name: "task",
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
        builder.addCase(createNewTask.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(createNewTask.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.task = action.payload;
            state.message = action.payload.message;
        })
        builder.addCase(createNewTask.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;
        })
        builder.addCase(viewUsersByRole.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(viewUsersByRole.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.task = action.payload.data;
            state.message = action.payload.message;
        })
        builder.addCase(viewUsersByRole.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload;
        })
        builder.addCase(viewTaskDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(viewTaskDetails.fulfilled, (state, action) => {            
            state.loading = false;
            state.success = true;
            state.task = action.payload.tasks;
            state.message = action.payload.message;
        })
        builder.addCase(viewTaskDetails.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload;
        })
    }
})
export const { clearMessages } = taskSlice.actions;
export default taskSlice.reducer;
