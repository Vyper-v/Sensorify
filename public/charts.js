Chart.register(ChartStreaming);

const config = {
  type: "line",

  data: {
    datasets: [
      {
        label: "X",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
        pointRadius: 1,
        data: [],
      },
      {
        label: "Y",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
        pointRadius: 1,
        data: [],
      },

      {
        label: "Z",
        backgroundColor: "rgba(144, 213, 117, 0.5)",
        borderColor: "rgb(144, 213, 117)",
        borderWidth: 1,
        pointRadius: 1,
        data: [],
      },
    ],
  },
  options: {
    plugins: {
      // Change options for ALL axes of THIS CHART
      streaming: {
        duration: 10000,
        frameRate: 60,
        refresh: 1000,
        delay: 1000,
      },
    },
    scales: {
      x: {
        type: "realtime",
      },
    },
  },
};

const myChart = new Chart(ctx, config);
