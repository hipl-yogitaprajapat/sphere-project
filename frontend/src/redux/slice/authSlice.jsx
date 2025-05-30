import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as services from '../../request/auth'

const initialState = {
    message: "",
    user: [],
    loading: false,
    error: null,
    success: null,
    token: null,
    profile:null,
}

// const url = import.meta.env.VITE_APP_API_URL;

export const SignupUser = createAsyncThunk('signup', async (registerInfo,{ rejectWithValue }) => {
      try {
    const response = await services.signup(registerInfo);
       return response    
  } catch (error) {
    const message = error.response?.data?.message || "Signup failed";
      return rejectWithValue(message);
  }
});

export const LoginUser = createAsyncThunk('login', async (loginInfo,{ rejectWithValue }) => {
      try {
    const response = await services.login(loginInfo);
       return response    
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
      return rejectWithValue(message);
  }
});

export const LogoutUser = createAsyncThunk('logout', async (_,{ rejectWithValue }) => {
      try {
    const response = await services.logout();
       return response    
  } catch (error) {
    const message = error.response?.data?.message || "Logout failed";
      return rejectWithValue(message);
  }
});

export const ForgetPasswordUser = createAsyncThunk('forgetpassword', async (email,{ rejectWithValue }) => {
      try {
    const response = await services.forgetpassword(email);
       return response        
  } catch (error) {
    const message = error.response?.data?.message || "Forget password failed";
    console.log(message,"message");
      return rejectWithValue(message);
  }
});

export const ResetPasswordUser = createAsyncThunk('resetpassword', async ({ input, id, token },{ rejectWithValue }) => {
      try {
    const response = await services.resetpassword({ input, id, token });
       return response        
  } catch (error) {
    const message = error.response?.data?.message || "Reset password failed";
    console.log(message,"message");
      return rejectWithValue(message);
  }
});

export const googleAuth = createAsyncThunk('googleAuth', async (code,{ rejectWithValue }) => {
      try {
    const response = await services.googlelogin(code);
       return response        
  } catch (error) {
    const message = error.response?.data?.message || "Google Login failed";
    console.log(message,"message");
      return rejectWithValue(message);
  }
});

export const UpdateUserProfile = createAsyncThunk('updateprofile', async (formData,{ rejectWithValue }) => {
      try {
    const response = await services.updateprofile(formData);
       return response  
  } catch (error) {
    const message = error.response?.data?.message || "Update User Profile failed";
      return rejectWithValue(message);
  }
});

export const viewProfile = createAsyncThunk('viewprofile', async (_,{ rejectWithValue }) => {
      try {
    const response = await services.viewprofile();
       return response  
  } catch (error) {
    const message = error.response?.data?.message || "View User Profile failed";
      return rejectWithValue(message);
  }
});

const authSlice = createSlice({
    name: "auth",
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
        builder.addCase(SignupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(SignupUser.fulfilled, (state, action) => {            
            state.loading = false;
            state.success = true;
            state.user = action.payload;
            state.message = action.payload.message;
        })
        builder.addCase(SignupUser.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;
        })
        builder.addCase(LoginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {            
            state.loading = false;
            state.success = true;
            state.user = action.payload;
            state.message = action.payload.message;
            state.name = action.payload.name;
            state.token = action.payload.jwtToken;
            localStorage.setItem('token', action.payload.jwtToken);
            localStorage.setItem('loggedInUser', action.payload.name);
            localStorage.setItem('role', action.payload.role);
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;

        })
        builder.addCase(LogoutUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(LogoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.user = action.payload;
            state.message = action.payload.message;
            state.name = action.payload.name;
            state.token = action.payload.jwtToken;
            localStorage.removeItem("token");
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("role");
        })
        builder.addCase(LogoutUser.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;

        })
        builder.addCase(ForgetPasswordUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;

        })
        builder.addCase(ForgetPasswordUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        })
        builder.addCase(ForgetPasswordUser.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;
            state.success = false;
        })
        builder.addCase(ResetPasswordUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;

        })
        builder.addCase(ResetPasswordUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        })
        builder.addCase(ResetPasswordUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });
        builder.addCase(googleAuth.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;

        })
        builder.addCase(googleAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.name = action.payload.name;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('loggedInUser', action.payload.user.firstName);
            localStorage.setItem('role', action.payload.user.role);
        })
        builder.addCase(googleAuth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });
           builder.addCase(UpdateUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(UpdateUserProfile.fulfilled, (state, action) => {            
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        })
        builder.addCase(UpdateUserProfile.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;

        })
            builder.addCase(viewProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(viewProfile.fulfilled, (state, action) => {            
            state.loading = false;
            state.success = true;
            state.profile = action.payload;
            state.message = action.payload.message;
        })
        builder.addCase(viewProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload;
        })
    }
})

export const { clearMessages } = authSlice.actions;
export default authSlice.reducer;



