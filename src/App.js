import React from "react";
import FormikForm from "./components/forms/FormikForm";
import PostList from "./components/PostList";
import "./App.css";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <h1>Create and View Posts</h1>
          <FormikForm />
          <PostList />
        </header>
      </div>
  );
}

export default App;
