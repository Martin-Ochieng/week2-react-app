import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchPosts, deletePostFromAPI, updatePostToAPI, editPost} from "../redux/slices/formSlice";

const PostList = () => {
    const dispatch = useDispatch();
    const { posts, status, error } = useSelector((state) => state.form);

    const [editMode, setEditMode] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPosts());
        }
    }, [dispatch, status]);

    const handleDelete = (id) => {

        dispatch(deletePostFromAPI(id))
            .then(() => {
                alert("Post Deleted successfully!");
            })
            .catch((error) => {
                console.error("Failed to delete the post:", error);
                alert("Failed to delete the post.");
            });

    };

    const handleEdit = (post) => {
        setEditMode(true);
        setCurrentPost(post);
    };

    const handleSaveEdit = () => {
        if (currentPost) {
            dispatch(updatePostToAPI(currentPost))
                .then(() => {
                    alert("Post Edited successfully!");
                })
                .catch((error) => {
                    console.error("Failed to edit the post:", error);
                    alert("Failed to edit the post.");
                });

            dispatch(editPost(currentPost)); // Update the post in the Redux state locally
            setEditMode(false);
            setCurrentPost(null);
        }
    };

    const handleChange = (e) => {
        setCurrentPost({ ...currentPost, [e.target.name]: e.target.value });
    };

    if (status === "loading") {
        return <div>Loading posts...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Posts</h2>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            {editMode && currentPost.id === post.id ? (
                                <div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={currentPost.title}
                                        onChange={handleChange}
                                    />
                                    <textarea
                                        name="body"
                                        value={currentPost.body}
                                        onChange={handleChange}
                                    />
                                    <button onClick={handleSaveEdit}>Save</button>
                                    <button onClick={() => setEditMode(false)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <strong>{post.title}</strong>
                                    <p>{post.body}</p>
                                    <small>User ID: {post.userId}</small>
                                    <br />
                                    <button onClick={() => handleEdit(post)}>Edit</button>
                                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PostList;
