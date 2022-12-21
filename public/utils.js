const $ = (e) => document.querySelector(e);

const ctx = $("#myChart");
const buttonStart = $("#start");
const buttonStop = $("#stop");
const buttonSave = $("#save");
const buttonReset = $("#reset");
const tbody = $("tbody");
const thead = $("thead");
const csv_separator = ",";
const csv_headers = [
  "acceleracion_x(m/s^2)",
  "acceleracion_y(m/s^2)",
  "acceleracion_z(m/s^2)",
  "acceleracion_gx(m/s^2)",
  "acceleracion_gy(m/s^2)",
  "acceleracion_gz(m/s^2)",
  "alpha_z(°/s)",
  "beta_x(°/s)",
  "gamma_y(°/s)",
  "velocidad_x(m/s)",
  "velocidad_y(m/s)",
  "velocidad_z(m/s)",
  "x(m)",
  "y(m)",
  "z(m)",
  "tiempo(s)\n",
].join(csv_separator);

class CSV {
  static parse(text) {
    const rows = text.trim().split("\n");
    const len = rows.length;
    return {
      headers:
        text.length == 0
          ? []
          : len == 1
          ? text.replace("\n", "").split(csv_separator)
          : len > 1
          ? rows.shift().split(csv_separator)
          : text.split(csv_separator),
      rows: len > 1 ? rows.map((v) => v.split(csv_separator)) : [],
    };
  }

  static stringify({ headers, rows }) {
    return (
      headers.join(csv_separator) +
      "\n" +
      rows.map((row) => row.join(csv_separator)).join("\n") +
      "\n"
    );
  }
}

if (localStorage.getItem("accelerometer" === null)) {
  localStorage.setItem("accelerometer", csv_headers);
}

function getAccelerationData() {
  return CSV.parse(localStorage.getItem("accelerometer") || csv_headers);
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
