import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function Child({ value }) {
  return (
    <>
      <button
        onClick={() => {
          value("A cold zobo");
        }}
      >
        Change
      </button>
    </>
  );
}

function App() {
  const tags = [
    "html",
    "html5",
    "css3",
    "css",
    "javascript",
    "scss",
    "react",
    "vue",
    "svelte",
    "angular",
    "node",
    "express",
    "mongodb",
    "mysql",
    "sql",
    "c",
    "c++",
    "c#",
  ];
  const [tag, setTag] = useState("");
  const [resultTags, setResultTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("This is a zobo");

  function findTags() {
    const searchResult = tags.filter((t) => t.includes(tag));
    setResultTags(searchResult);
    console.log(searchResult);
    console.log(tag);
  }

  function getUser() {
    setLoading(true);
    axios.get("https://randomuser.me/api").then((res) => {
      const user = res.data.results[0];
      setUsers([...users, user]);
      setLoading(false);
    });
  }
  return (
    <div>
      <h1>Tags</h1>
      <input
        type="text"
        placeholder="Search tags"
        onChange={(e) => {
          findTags();
          setTag(e.target.value.toLocaleLowerCase());
        }}
        autoFocus={true}
      />
      <div className="tags">
        {tag === "" ? (
          <></>
        ) : resultTags.length === 0 ? (
          <p>No tags found</p>
        ) : (
          resultTags.map((tag) => (
            <button
              className="tag"
              key={tags.indexOf(tag)}
              onClick={() => {
                if (!selectedTags.includes(tag)) {
                  setSelectedTags([...selectedTags, tag]);
                }
              }}
            >
              {tag}
            </button>
          ))
        )}
      </div>
      <div className="selected-tags">
        {selectedTags.length < 1
          ? "No tags selected"
          : selectedTags.map((tag) => (
              <div className="tag-s" key={tags.indexOf(tag)}>
                {tag}
                <small
                  onClick={() => {
                    setSelectedTags(selectedTags.filter((t) => t !== tag));
                  }}
                >
                  x
                </small>
              </div>
            ))}
      </div>
      <button
        onClick={() => {
          getUser();
        }}
        className="add"
      >
        Add user
      </button>
      <div className="users">
        {users.length < 1
          ? "No users"
          : users.map((user) => (
              <div key={user.login.uuid} className="user">
                <img src={user.picture.thumbnail} alt="" />
                <p>
                  {user.name.first} {user.name.last}
                </p>
                <button
                  onClick={() => {
                    setUsers(
                      users.filter((u) => u.login.uuid !== user.login.uuid)
                    );
                  }}
                >
                  delete
                </button>
              </div>
            ))}
        {loading ? (
          <img
            src="https://cutewallpaper.org/21/loading-gif-transparent-background/Tag-For-Loading-Bar-Gif-Transparent-Loading-Gif-.gif"
            alt=""
            width={40}
          />
        ) : (
          <></>
        )}
      </div>
      <p>{text}</p>
      <Child value={setText} />
    </div>
  );
}

export default App;
