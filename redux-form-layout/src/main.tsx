import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import Counter from "./features/counter/Counter.tsx";
import PostsList from "./features/posts/PostsList.tsx";
import AddFormPost from "./features/posts/AddFormPost.tsx";
import { fetchUsers } from "./features/users/usersSlice.ts";

store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Counter />
    </Provider>
  </React.StrictMode>
);
