const chart_default_innerdata = {
  answered: 0,
  notanswer: 0,
  correct: 0,
  correct_rate: "0",
  wrong: 0,
  answeredtoless: true,
  answeredlist: [],
  notanswerlist: [],
};

const chart_default_data = {
  A: { ...chart_default_innerdata },
  A1: { ...chart_default_innerdata },
  A2: { ...chart_default_innerdata },
  A3: { ...chart_default_innerdata },
  B: { ...chart_default_innerdata },
  B1: { ...chart_default_innerdata },
  B2: { ...chart_default_innerdata },
  B3: { ...chart_default_innerdata },
  C: { ...chart_default_innerdata },
  C1: { ...chart_default_innerdata },
  C2: { ...chart_default_innerdata },
  C3: { ...chart_default_innerdata },
  "NA-A": { ...chart_default_innerdata },
  "NA-B": { ...chart_default_innerdata },
  "NA-C": { ...chart_default_innerdata },
  "NA-D": { ...chart_default_innerdata },
};

const chart_datasets = {
  三大核心面向雷達圖: {
    labels: ["自主行動", "社會參與", "溝通互動"],
    datasets: [
      {
        label: "三大核心面向",
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
        label: "自主行動",
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
        label: "溝通互動",
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
        label: "社會參與",
        data: [0, 0, 0],
        backgroundColor: "rgba(255, 177, 193, 0.5)",
        borderColor: "rgba(251, 116, 144,0.8)",
        borderWidth: 5,
        fill: true,
      },
    ],
  },
  探究學習內容雷達圖: {
    labels: ["發現問題", "規劃與研究", "論證與建模", "表達與分享"],
    datasets: [
      {
        label: "探究學習內容",
        data: [0, 0, 0, 0],
        backgroundColor: "rgba(255, 177, 193, 0.5)",
        borderColor: "rgba(251, 116, 144,0.8)",
        borderWidth: 5,
        fill: true,
      },
    ],
  },
};

const chart_default_options = {
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
  tooltips: {
    enabled: true,
    callbacks: {
      label: (tooltipItem, data) =>
        data.labels[tooltipItem.index] +
        ": " +
        data.datasets[0].data[tooltipItem.index],
    },
  },
  maintainAspectRatio: false,
};

const chart_options = {
  三大核心面向雷達圖: { ...chart_default_options },
  A: { ...chart_default_options },
  B: { ...chart_default_options },
  C: { ...chart_default_options },
  探究學習內容雷達圖: { ...chart_default_options },
};

const chart_default_options_768up = {
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
  tooltips: {
    enabled: true,
    callbacks: {
      label: (tooltipItem, data) =>
        data.labels[tooltipItem.index] +
        ": " +
        data.datasets[0].data[tooltipItem.index],
    },
  },
  maintainAspectRatio: false,
};

const chart_options_768up = {
  三大核心面向雷達圖: {
    ...chart_default_options_768up,
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
  },
  A: { ...chart_default_options_768up },
  B: { ...chart_default_options_768up },
  C: { ...chart_default_options_768up },
  探究學習內容雷達圖: {
    ...chart_default_options_768up,
    scale: {
      ticks: {
        display: true,
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
  },
};
