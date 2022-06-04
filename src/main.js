import CSV from "./CSV";
import App from "./App";
import "./index.css";

import hamburguer from "./hamburguer";

const app = new App("#app");

const csv = new CSV(["position", "velocity", "acceleration"]);

hamburguer(app);

app.put(
  "thead",
  `<tr>${csv.headers.map((h) => `<th>${h}</th>`).join("")}</tr>`
);

const a = app.add("a", "Download");

const handleClick = () => {
  csv.addRow([Math.random(), Math.random(), Math.random()]);

  const csvHtml = `${csv.rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("")}`;

  app.put("tbody", csvHtml);
  csv.toFile(a, "test.csv");
};

app.add("button", "add row", {
  onclick: handleClick,
});
