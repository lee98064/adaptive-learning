const chart_default_data = {
  A: {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  A1: {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  A2: {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  A3: {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  B: {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  B1: {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  B2: {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  B3: {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  C: {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  C1: {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  C2: {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  C3: {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  "NA-A": {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  "NA-B": {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  "NA-C": {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
  "NA-D": {
    answered: 0,
    notanswer: 0,
    correct: 0,
    correct_rate: "0",
    wrong: 0,
    answeredtoless: true,
  },
};

const chart_datasets = {
  ???????????????????????????: {
    labels: ["????????????", "????????????", "????????????"],
    datasets: [
      {
        label: "??????????????????",
        data: [0, 0, 0],
        backgroundColor: "rgba(255, 177, 193, 0.5)",
        borderColor: "rgba(251, 116, 144,0.8)",
        borderWidth: 5,
        fill: true,
      },
    ],
  },
  A: {
    labels: ["A1", "A2", "A3"],
    datasets: [
      {
        label: "????????????",
        data: [0, 0, 0],
        backgroundColor: "rgba(255, 177, 193, 0.5)",
        borderColor: "rgba(251, 116, 144,0.8)",
        borderWidth: 5,
        fill: true,
      },
    ],
  },
  B: {
    labels: ["B1", "B2", "B3"],
    datasets: [
      {
        label: "????????????",
        data: [0, 0, 0],
        backgroundColor: "rgba(255, 177, 193, 0.5)",
        borderColor: "rgba(251, 116, 144,0.8)",
        borderWidth: 5,
        fill: true,
      },
    ],
  },
  C: {
    labels: ["C1", "C2", "C3"],
    datasets: [
      {
        label: "????????????",
        data: [0, 0, 0],
        backgroundColor: "rgba(255, 177, 193, 0.5)",
        borderColor: "rgba(251, 116, 144,0.8)",
        borderWidth: 5,
        fill: true,
      },
    ],
  },
  ???????????????????????????: {
    labels: ["????????????", "???????????????", "???????????????", "???????????????"],
    datasets: [
      {
        label: "??????????????????",
        data: [0, 0, 0, 0],
        backgroundColor: "rgba(255, 177, 193, 0.5)",
        borderColor: "rgba(251, 116, 144,0.8)",
        borderWidth: 5,
        fill: true,
      },
    ],
  },
};

const chart_options = {
  ???????????????????????????: {
    legend: {
      display: false,
    },
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 10,
        fontSize: 12,
        max: 100,
        min: 0,
        stepSize: 10,
      },
      pointLabels: {
        fontSize: 12,
      },
    },
    maintainAspectRatio: false,
  },
  A: {
    legend: {
      display: false,
    },
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 10,
        fontSize: 12,
        max: 100,
        min: 0,
        stepSize: 10,
      },
      pointLabels: {
        fontSize: 12,
      },
    },
    maintainAspectRatio: false,
  },
  B: {
    legend: {
      display: false,
    },
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 10,
        fontSize: 12,
        max: 100,
        min: 0,
        stepSize: 10,
      },
      pointLabels: {
        fontSize: 12,
      },
    },
    maintainAspectRatio: false,
  },
  C: {
    legend: {
      display: false,
    },
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 10,
        fontSize: 12,
        max: 100,
        min: 0,
        stepSize: 10,
      },
      pointLabels: {
        fontSize: 12,
      },
    },
    maintainAspectRatio: false,
  },
  ???????????????????????????: {
    legend: {
      display: false,
    },
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 10,
        fontSize: 12,
        max: 100,
        min: 0,
        stepSize: 10,
      },
      pointLabels: {
        fontSize: 12,
      },
    },
    maintainAspectRatio: false,
  },
};

const chart_options_768up = {
  ???????????????????????????: {
    legend: {
      display: false,
    },
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 10,
        fontSize: 15,
        max: 100,
        min: 0,
        stepSize: 10,
      },
      pointLabels: {
        fontSize: 19,
      },
    },
    maintainAspectRatio: false,
  },
  A: {
    legend: {
      display: false,
    },
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 10,
        fontSize: 13,
        max: 100,
        min: 0,
        stepSize: 10,
      },
      pointLabels: {
        fontSize: 19,
      },
    },
    maintainAspectRatio: false,
  },
  B: {
    legend: {
      display: false,
    },
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 10,
        fontSize: 13,
        max: 100,
        min: 0,
        stepSize: 10,
      },
      pointLabels: {
        fontSize: 19,
      },
    },
    maintainAspectRatio: false,
  },
  C: {
    legend: {
      display: false,
    },
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 10,
        fontSize: 13,
        max: 100,
        min: 0,
        stepSize: 10,
      },
      pointLabels: {
        fontSize: 19,
      },
    },
    maintainAspectRatio: false,
  },
  ???????????????????????????: {
    legend: {
      display: false,
    },
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 10,
        fontSize: 15,
        max: 100,
        min: 0,
        stepSize: 10,
      },
      pointLabels: {
        fontSize: 19,
      },
    },
    maintainAspectRatio: false,
  },
};
