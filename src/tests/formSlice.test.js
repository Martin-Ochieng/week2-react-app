import formReducer, {
    savePostToAPI,
    fetchPosts,
    updatePostToAPI,
    deletePostFromAPI,
    editPost
} from '../redux/slices/formSlice';

describe('formSlice reducers', () => {
    const initialState = {
        posts: [],
        status: 'idle',
        error: null
    };

    // Test the savePost reducer
    it('should handle savePostToAPI fulfilled', () => {
        const post = { id: 1, title: 'Test Post', body: 'This is a test post', userId: 1 };
        const action = {
            type: savePostToAPI.fulfilled.type,
            payload: post
        };
        const state = formReducer(initialState, action);

        expect(state.posts).toEqual([post]);
        expect(state.status).toBe('succeeded');
    });

    // Test the deletePost reducer
    it('should handle deletePostFromAPI fulfilled', () => {
        const initialStateWithPosts = {
            posts: [
                { id: 1, title: 'Test Post 1', body: 'This is test post 1', userId: 1 },
                { id: 2, title: 'Test Post 2', body: 'This is test post 2', userId: 2 },
            ],
            status: 'idle',
            error: null,
        };

        const action = {
            type: deletePostFromAPI.fulfilled.type,
            payload: 1 // Post ID to delete
        };
        const state = formReducer(initialStateWithPosts, action);

        expect(state.posts).toEqual([
            { id: 2, title: 'Test Post 2', body: 'This is test post 2', userId: 2 }
        ]);
        expect(state.status).toBe('succeeded');
    });

    // Test the editPost reducer (local action)
    it('should handle editPost', () => {
        const initialStateWithPosts = {
            posts: [
                { id: 1, title: 'Test Post 1', body: 'This is test post 1', userId: 1 },
                { id: 2, title: 'Test Post 2', body: 'This is test post 2', userId: 2 }
            ],
            status: 'idle',
            error: null
        };

        const updatedPost = { id: 1, title: 'Updated Test Post', body: 'Updated body', userId: 1 };
        const action = editPost(updatedPost);

        const state = formReducer(initialStateWithPosts, action);

        expect(state.posts).toEqual([
            updatedPost,
            { id: 2, title: 'Test Post 2', body: 'This is test post 2', userId: 2 }
        ]);
    });

    // Test the fetchPosts async action (fulfilled)
    it('should handle fetchPosts fulfilled', () => {
        const posts = [
            { id: 1, title: 'Test Post', body: 'This is a test post', userId: 1 }
        ];
        const action = {
            type: fetchPosts.fulfilled.type,
            payload: posts
        };
        const state = formReducer(initialState, action);

        expect(state.posts).toEqual(posts);
        expect(state.status).toBe('succeeded');
    });

    // Test the updatePostToAPI async action (fulfilled)
    it('should handle updatePostToAPI fulfilled', () => {
        const updatedPost = { id: 1, title: 'Updated Post', body: 'Updated content', userId: 1 };
        const action = {
            type: updatePostToAPI.fulfilled.type,
            payload: updatedPost
        };

        const initialStateWithPosts = {
            posts: [{ id: 1, title: 'Test Post', body: 'This is test post 1', userId: 1 }],
            status: 'idle',
            error: null
        };

        const state = formReducer(initialStateWithPosts, action);
        expect(state.status).toBe('succeeded');
    });

    // Test the savePostToAPI rejected (error handling)
    it('should handle savePostToAPI rejected', () => {
        const action = {
            type: savePostToAPI.rejected.type,
            payload: 'Failed to save post'
        };
        const state = formReducer(initialState, action);

        expect(state.error).toBe('Failed to save post');
        expect(state.status).toBe('failed');
    });

    // Test the deletePostFromAPI rejected (error handling)
    it('should handle deletePostFromAPI rejected', () => {
        const action = {
            type: deletePostFromAPI.rejected.type,
            payload: 'Failed to delete post'
        };
        const state = formReducer(initialState, action);

        expect(state.error).toBe('Failed to delete post');
        expect(state.status).toBe('failed');
    });
});
