import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { savePostToAPI } from "../../redux/slices/formSlice"; // Import both actions

const FormikForm = () => {
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        userId: Yup.number()
            .required("User ID is required")
            .positive("User ID must be a positive number")
            .integer("User ID must be an integer"),
        title: Yup.string()
            .required("Title is required")
            .min(5, "Title must be at least 5 characters"),
        body: Yup.string()
            .required("Body is required")
            .min(20, "Body must be at least 20 characters"),
    });

    return (
        <Formik
            initialValues={{ userId: "", title: "", body: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                const newPost = { ...values, id: Date.now() }; // Generate a unique ID for local state


                // Then, dispatch savePostToAPI to save the post to the backend
                dispatch(savePostToAPI(newPost))
                    .then(() => {
                        alert("Post saved successfully!");
                    })
                    .catch((error) => {
                        console.error("Failed to save the post:", error);
                        alert("Failed to save the post.");
                    });

                resetForm(); // Reset the form after submission
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="userId">User ID:</label>
                        <Field id="userId" name="userId" type="number" placeholder="Enter user ID" />
                        <ErrorMessage name="userId" component="div" className="error" />
                    </div>

                    <div>
                        <label htmlFor="title">Title:</label>
                        <Field id="title" name="title" placeholder="Enter title" />
                        <ErrorMessage name="title" component="div" className="error" />
                    </div>

                    <div>
                        <label htmlFor="body">Body:</label>
                        <Field id="body" name="body" placeholder="Enter post body" />
                        <ErrorMessage name="body" component="div" className="error" />
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        Submit Post
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default FormikForm;
