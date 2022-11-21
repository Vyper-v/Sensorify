const $ = (e) => document.querySelector(e);

const ctx = $("#myChart");
const buttonStart = $("#start");
const buttonStop = $("#stop");
const buttonSave = $("#save");
const buttonReset = $("#reset");
const tbody = $("tbody");
const thead = $("thead");

class CSV {
  static parse(text) {
    const rows = text.trim().split("\n");
    const len = rows.length;
    return {
      headers:
        text.length == 0
          ? []
          : len == 1
          ? text.replace("\n", "").split(",")
          : len > 1
          ? rows.shift().split(",")
          : text.split(","),
      rows: len > 1 ? rows.map((v) => v.split(",")) : [],
    };
  }

  static stringify({ headers, rows }) {
    return (
      headers.join(",") +
      "\n" +
      rows.map((row) => row.join(",")).join("\n") +
      "\n"
    );
  }
}

if (localStorage.getItem("accelerometer" === null)) {
  localStorage.setItem("accelerometer", "X,Y,Z,timestamp\n");
}

function getAccelerationData() {
  return CSV.parse(
    localStorage.getItem("accelerometer") || "X,Y,Z,timestamp\n"
  );
}
function addAccelerationData(data) {
  const actualData = getAccelerationData();
  actualData.rows.push(data);
  localStorage.setItem("accelerometer", CSV.stringify(actualData));
}

function addrow(...args) {
  const tr = document.createElement("tr");
  for (const arg of args) {
    const td = document.createElement("td");
    td.textContent = arg;
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}

function addHeaders(...args) {
  const tr = document.createElement("tr");
  for (const arg of args) {
    const td = document.createElement("th");
    td.textContent = arg;
    tr.appendChild(td);
  }
  thead.appendChild(tr);
}
