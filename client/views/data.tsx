import { RouteProps } from "../../types";
import { ListItem } from "../components/ListItem";
import "./data.client.ts";

export const path = "/data";
export const ssr = true;

export const head = (
  <>
    <title>Using Data</title>
  </>
);

export default async function ({ app, req, reply }: RouteProps) {
  // Just to demonstrate an asynchronous request
  const data = await new Promise((resolve) => {
    // Prepopulated in server.js
    resolve(app.db.todoList);
  });
  return (
    <>
      <h2>Todo List — Using Data</h2>
      <ul class="list">
        {data.map((item, i) => {
          return <ListItem>{item}</ListItem>;
        })}
      </ul>
      <form
        action="/list/add"
        method="post"
        hx-boost="true"
        hx-replace-url="false"
        hx-swap="beforeend scroll:bottom"
        hx-target=".list"
        {...{ "hx-on::after-request": "this.reset()" }}
      >
        <input name="inputValue" />
        <button id="add-button">Add</button>
      </form>
      <p>
        <a href="/">Go back to the index</a>
      </p>
    </>
  );
}
