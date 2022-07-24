const $ = (e) => document.querySelector(e);

const ctx = $("#myChart");
const buttonStart = $("#start");
const buttonStop = $("#stop");
const buttonSave = $("#save");
const buttonReset = $("#reset");
const tbody = $("tbody");
const thead = $("thead");

const CSV = {
  parse: (text) => {
    const rows = text.trim().split("\n");

    if (text.length === 0) {
      return {
        headers: [],
        rows: [],
      };
    }
    if (rows.length === 1) {
      return {
        headers: text.replace("\n", "").split(","),
        rows: [],
      };
    }
    if (rows.length > 1) {
      const headers = rows.shift().split(",");
      return { headers, rows: rows.map((v) => v.split(",")) };
    }
    return {
      headers: text.split(","),
      rows: [],
    };
  },
  stringify: ({ headers, rows }) => {
    return (
      headers.join(",") +
      "\n" +
      rows.map((row) => row.join(",")).join("\n") +
      "\n"
    );
  },
};

if (localStorage.getItem("accelerometer" === null)) {
  localStorage.setItem("accelerometer", "X,Y,Z,timestamp\n");
}

function getAccelerationData() {
  return CSV.parse(localStorage.getItem("accelerometer") || "X,Y,Z,timestamp\n");
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
