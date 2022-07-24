function updateChart(event, now, datasets) {
  const x = event.accelerationIncludingGravity.x;
  const y = event.accelerationIncludingGravity.y;
  const z = event.accelerationIncludingGravity.z;

  datasets[0].data.push({
    x: now,
    y: x,
  });
  datasets[1].data.push({
    x: now,
    y: y,
  });
  datasets[2].data.push({
    x: now,
    y: z,
  });
  chart.update();
}

const updateChartHandler = (e) => {
  // const localStorageContainer = $("#localStorage");
  const now = Date.now();
  updateChart(e, now, myChart.data.datasets);
  myChart.update("quiet");
  // localStorageContainer.textContent = JSON.stringify(getAccelerationData());

  // localStorageContainer.textContent = err;
};

const updateAccStore = (event) => {
  addAccelerationData([
    event.accelerationIncludingGravity.x,
    event.accelerationIncludingGravity.y,
    event.accelerationIncludingGravity.z,
    Date.now() / 1000.0,
  ]);
};

window.addEventListener("devicemotion", updateChartHandler);

buttonStart.addEventListener("click", (e) => {
  window.addEventListener("devicemotion", updateAccStore);
});

buttonStop.addEventListener("click", (e) => {
  // clearInterval(time);
  window.removeEventListener("devicemotion", updateAccStore);
});

function saveCSV(filename, data) {
  const blob = new Blob([data], { type: "text/csv" });
  
    const a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


buttonSave.addEventListener("click", (e) => {
  const actualData = getAccelerationData();
  const csv = CSV.stringify(actualData);
  saveCSV("accelerometer.csv", csv);
});

buttonReset.addEventListener("click", (e) => {
  localStorage.setItem("accelerometer", "X,Y,Z,timestamp\n");
});
