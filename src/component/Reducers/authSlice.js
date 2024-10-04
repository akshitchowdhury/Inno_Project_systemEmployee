import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';

// Initial state for authentication
const initialState = {
    user: null, // Stores the logged-in user data
    error: null, // Stores any error messages
    loading: false, // Tracks loading state for async operations
    users: [], // All users fetched from backend
};

// Async thunk to fetch users from backend
export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
    const response = await fetch('/users', { method: 'GET' });
    const data = await response.json();
    return data;
});

// Async thunk to handle login functionality
export const loggedInUser = createAsyncThunk(
    'auth/loggedInUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch('/users/login', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Sending email and password in request body
            });

            // Handle errors during login
            if (!response.ok) {
                throw new Error('Invalid credentials'); // Reject if credentials are incorrect
            }

            const data = await response.json(); // Assuming backend returns the user data

            alert(`Logged in successfully, user: ${email}`);

            return data; // Return the user data after successful login
        } catch (error) {
            return rejectWithValue(error.message); // Pass error message to state
        }
    }
);

// Async thunk to handle logout functionality
// export const loggedOutUser = createAsyncThunk(
//     'auth/loggedOutUser',
//     async ({ id }, { rejectWithValue }) => {
//         try {
//             const response = await fetch('/users/logout', {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ id, isLoggedIn: false }), // Passing user ID and setting isLoggedIn to false
//             });

//             if (!response.ok) {
//                 throw new Error('Error logging out');
//             }

//             const data = await response.json(); // Response from server after logging out
//             alert('Logged out successfully');

//             return data; // Return updated user data with isLoggedIn set to false
//         } catch (error) {
//             return rejectWithValue(error.message); // Pass error message to state
//         }
//     }
// );


export const loggedOutUser = createAsyncThunk(
    'auth/loggedOutUser',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage

            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch('/users/logout', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Send token in Authorization header
                },
            });

            if (!response.ok) {
                throw new Error('Error logging out');
            }

            const data = await response.json(); // Response from server after logging out

            // Remove token from localStorage after logout
            localStorage.removeItem('token');

            alert('Logged out successfully');

            return data; // Return the response after successful logout
        } catch (error) {
            return rejectWithValue(error.message); // Pass error message to state
        }
    }
);


export const checkLoggedIn = createAsyncThunk(
    'users/checkLoggedIn',
    async (_, { rejectWithValue }) => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        return rejectWithValue('No token found');
      }
  
      try {
        const response = await fetch('/users/validate-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Send token for validation
          },
        });
  
        if (!response.ok) {
          throw new Error('Invalid or expired token');
        }
  
        const data = await response.json();
        return data; // Return user data if token is valid
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

// Creating the auth slice with reducers for login/logout
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}, // Place for additional reducer actions if needed
    extraReducers: (builder) => {
        builder
            // Handle fetchUsers
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle login logic
            .addCase(loggedInUser.pending, (state) => {
                state.loading = true; // Set loading to true when logging in
            })
            .addCase(loggedInUser.fulfilled, (state, action) => {
                state.loading = false; // Stop loading after login

                const loggedUser = action.payload.user; // Backend returns full user object
                if (loggedUser) {
                    state.user = loggedUser;
                    state.user.isLoggedIn = true; // Set user as logged in
                }
            })
            .addCase(loggedInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Store error message in case of failure
            })


                //JWT validation

                .addCase(checkLoggedIn.fulfilled, (state, action) => {
                    state.user = action.payload.user; // Update the user state with verified data
                    state.user.isLoggedIn = true; // Set logged-in status to true
                  })
                  .addCase(checkLoggedIn.rejected, (state, action) => {
                    state.user = null; // Reset user state if token is invalid
                    state.error = action.payload;
                  })


            // Handle logout logic
            .addCase(loggedOutUser.pending, (state) => {
                state.loading = true; // Set loading to true during logout
            })
            .addCase(loggedOutUser.fulfilled, (state, action) => {
                state.loading = false; // Stop loading after logout

                const loggedUser = state.users.find(
                    (user) => user.id === action.payload.id
                );

                if (loggedUser) {
                    state.user = loggedUser;
                    state.user.isLoggedIn = false; // Set isLoggedIn to false after successful logout
                }
            })
            .addCase(loggedOutUser.rejected, (state, action) => {
                state.loading = false; // Stop loading after failure
                state.error = action.payload; // Store error message in case of failure
            });
    },
});

// Setting up the store with the auth reducer
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export default store;
