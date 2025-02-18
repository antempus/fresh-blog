import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "./NewPost.css";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

const NewPost = () => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const history = useHistory();

  async function handleSubmit() {
    // save state to database and redirect
    await fetch("/api/post", {
      method: "post",
      body: JSON.stringify({ title, body }),
    });

    history.push("/");
  }

  return (
    <div className="section">
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            name="title"
            type="text"
            placeholder="Post Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Post</label>
        <div className="editor">
          <MdEditor
            onChange={(e) => setBody(e.html)}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
          ></MdEditor>
        </div>
      </div>
      <button
        className="button is-primary is-pulled-right"
        onClick={handleSubmit}
      >
        Publish
      </button>
    </div>
  );
};

export default NewPost;
