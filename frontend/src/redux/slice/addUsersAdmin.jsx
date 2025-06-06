
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as services from '../../request/admin'

const initialState = {
    message: "",
    loading: false,
    error: null,
    success: null,
    token: null,
    projects:[]
}
export const addAdminUsers = createAsyncThunk('addUser', async (clientInfo,{ rejectWithValue }) => {
      try {
    const response = await services.addadminuser(clientInfo);
       return response  
      
  } catch (error) {
    const message = error.response?.data?.message || "Add user failed";
      return rejectWithValue(message);
  }
});

export const createNewProject = createAsyncThunk('newProject', async (newProject,{ rejectWithValue }) => {
      try {
    const response = await services.addnewproject(newProject);
       return response  
      
  } catch (error) {
    const message = error.response?.data?.message || "Create new project failed";
      return rejectWithValue(message);
  }
});

export const viewProjects = createAsyncThunk('viewprojects', async (_,{ rejectWithValue }) => {
      try {
    const response = await services.viewprojects();
       return response 
  } catch (error) {
    const message = error.response?.data?.message || "View User Projects failed";
      return rejectWithValue(message);
  }
});

export const editProject = createAsyncThunk('editproject', async ({id,editProjectInfo},{ rejectWithValue }) => {
      try {
    const response = await services.editproject({id,editProjectInfo});
       return response 
    
  } catch (error) {
    const message = error.response?.data?.message || "Edit User Project failed";
      return rejectWithValue(message);
  }
});

export const deleteProject = createAsyncThunk('deleteproject', async ({id},{ rejectWithValue }) => {
      try {
    const response = await services.deleteproject({id});
       return response 
    
  } catch (error) {
    const message = error.response?.data?.message || "Delete User Project failed";
      return rejectWithValue(message);
  }
});

const adimnUserSlice = createSlice({
    name: "admin",
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
        builder.addCase(addAdminUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(addAdminUsers.fulfilled, (state, action) => {            
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        })
        builder.addCase(addAdminUsers.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;
        })
        builder.addCase(createNewProject.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(createNewProject.fulfilled, (state, action) => {            
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        })
        builder.addCase(createNewProject.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;
        })
        builder.addCase(viewProjects.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                    state.success = null;
        
        })
        builder.addCase(viewProjects.fulfilled, (state, action) => {   
                    state.loading = false;
                    state.success = true;
                    state.projects = action.payload.data;
                    state.message = action.payload.message;
        })
        builder.addCase(viewProjects.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload;
        })
        builder.addCase(editProject.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(editProject.fulfilled, (state, action) => {                        
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        })
        builder.addCase(editProject.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;
        })
        builder.addCase(deleteProject.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(deleteProject.fulfilled, (state, action) => {                        
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        })
        builder.addCase(deleteProject.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;
        })
    }
})
export const { clearMessages } = adimnUserSlice.actions;
export default adimnUserSlice.reducer;
