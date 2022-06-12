import CSV from "./CSV";
import App from "./App";
import "./index.css";

import hamburguer from "./hamburguer";

const app = new App("#app");
const acc = new Accelerometer({frequency: 60});
acc.start();
const csv = new CSV(["X", "Y", "Z"]);

app.add("table",
`<thead><tr>${csv.headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
<tbody></tbody>`, 
{ className: ["table"], id: "table" });



const handleClick = () => {
  
  const rows = [acc.x, acc.y, acc.z];
  csv.addRow(rows);

  const csvHtml = 
  `${rows.map((c) => `<td>${c}</td>`).join("")}`;

  app.appendToChild("tbody","tr", csvHtml);

  localStorage.setItem("accelerometer",JSON.stringify(csv.rows))
};

app.add("button", "Get components", {
  onclick: handleClick,
  className:["button","~info","@high","mt-8"]
});
