function updateChart(x, y, z, now, datasets) {
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
  // myChart.update();
}

function updateAccStore(event, startmotion) {
  const { x: ax, y: ay, z: az } = event.acceleration;
  const { x: agx, y: agy, z: agz } = event.accelerationIncludingGravity;
  const { alpha, beta, gamma } = event.rotationRate;
  console.log(event.interval);
  const current_t = Date.now();
  const delta_t = (current_t - startmotion) / 1000; // la diferencia de tiempo en segundos
  const vx = ax * delta_t;
  const vy = ay * delta_t;
  const vz = az * delta_t;

  const x = vx * delta_t + 0.5 * agx * delta_t * delta_t;
  const y = vy * delta_t + 0.5 * agy * delta_t * delta_t;
  const z = vz * delta_t + 0.5 * agz * delta_t * delta_t;

  addAccelerationData([
    ax,
    ay,
    az,
    agx,
    agy,
    agz,
    alpha,
    beta,
    gamma,
    vx,
    vy,
    vz,
    x,
    y,
    z,
    delta_t,
  ]); // guardo datos en localstorage (csv)
  updateChart(ax, ay, az, current_t, myChart.data.datasets); // actualizar grafico
  myChart.update("quiet");
}

function saveCSV(filename, data) {
  const blob = new Blob([data], { type: "text/csv" });

  const a = window.document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

let handleDeviceMotion = null;

if (window.DeviceMotionEvent) {
  buttonStart.addEventListener("click", (e) => {
    const startmotion = Date.now();
    if (!handleDeviceMotion) {
      handleDeviceMotion = (e) => updateAccStore(e, startmotion);
    }

    window.addEventListener("devicemotion", handleDeviceMotion);
  });
  buttonStop.addEventListener("click", (e) => {
    if (handleDeviceMotion !== null) {
      window.removeEventListener("devicemotion", handleDeviceMotion);
    }
  });

  buttonSave.addEventListener("click", (e) => {
    const actualData = getAccelerationData();
    const csv = CSV.stringify(actualData);
    saveCSV("data.csv", csv);
  });

  buttonReset.addEventListener("click", (e) => {
    localStorage.setItem("accelerometer", csv_headers);
  });
}
