import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Define an async action to fetch posts from the API
export const fetchPosts = createAsyncThunk(
    "form/fetchPosts",
    async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        return await response.json(); // Returns the fetched posts
    }
);




// Define an async action to save a post to the API
export const savePostToAPI = createAsyncThunk(
    "form/savePostToAPI",
    async (postData, { rejectWithValue }) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error("Failed to save post");
            }

            return await response.json(); // Return the saved post
        } catch (error) {
            return rejectWithValue(error.message); // Reject with error message
        }
    }
);


// Define an async action to update a post on the API
export const updatePostToAPI = createAsyncThunk(
    "form/updatePostToAPI",
    async (postData, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error("Failed to update post");
            }

            return await response.json(); // Return the updated post
        } catch (error) {
            return rejectWithValue(error.message); // Reject with error message
        }
    }
);


// Define an async action to delete a post from the API
export const deletePostFromAPI = createAsyncThunk(
    "form/deletePostFromAPI",
    async (postId, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete post");
            }

            return postId; // Return the ID of the deleted post
        } catch (error) {
            return rejectWithValue(error.message); // Reject with error message
        }
    }
);


const initialState = {
    posts: [],
    status: "idle", // Track loading state
    error: null, // Track errors
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {


        // Local edit action
        editPost: (state, action) => {
            const index = state.posts.findIndex((post) => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload; // Replace the edited post with the updated one
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(savePostToAPI.pending, (state) => {
                state.status = "loading"; // Set status to loading when the request is pending
            })
            .addCase(savePostToAPI.fulfilled, (state, action) => {
                state.status = "succeeded"; // Set status to succeeded once data is saved
                // Add the saved post to the state directly
                state.posts.push(action.payload); // Add the saved post to the posts state
            })
            .addCase(savePostToAPI.rejected, (state, action) => {
                state.status = "failed"; // Set status to failed if there was an error
                state.error = action.payload; // Store error message
            })
            .addCase(updatePostToAPI.pending, (state) => {
                state.status = "loading"; // Set status to loading when update is pending
            })
            .addCase(updatePostToAPI.fulfilled, (state, action) => {
                state.status = "succeeded"; // Set status to succeeded after update
                // Local state is updated by the editPost reducer
                // No need to push the updated post to the state here
            })
            .addCase(updatePostToAPI.rejected, (state, action) => {
                state.status = "failed"; // Set status to failed if there was an error
                state.error = action.payload; // Store error message
            })
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading"; // Set status to loading when request is pending
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded"; // Set status to succeeded once data is fetched
                state.posts = action.payload; // Store fetched posts in the state
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed"; // Set status to failed if there was an error
                state.error = action.payload; // Store error message
            })
            // Handle the delete post action
            .addCase(deletePostFromAPI.pending, (state) => {
                state.status = "loading"; // Set status to loading when delete request is pending
            })
            .addCase(deletePostFromAPI.fulfilled, (state, action) => {
                state.status = "succeeded"; // Set status to succeeded after post is deleted
                // Remove the post from the Redux store after successful deletion
                state.posts = state.posts.filter((post) => post.id !== action.payload);
            })
            .addCase(deletePostFromAPI.rejected, (state, action) => {
                state.status = "failed"; // Set status to failed if there was an error
                state.error = action.payload; // Store error message
            });
    },
});

export const { editPost } = formSlice.actions;
export default formSlice.reducer;
