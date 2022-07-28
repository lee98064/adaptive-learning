var sTokenDataValue =
  "YzE2YTUzMjBmYTQ3NTUzMGQ5NTgzYzM0ZmQzNTZlZjVFZFVBZExZVG8wT250ek9qYzZJblZ6WlhKZmFXUWlPM002TVRRNklqRTVNREEwTVMxek1Ea3dNekF4SWp0ek9qZzZJbUpsYUdGMmFXOXlJanR6T2pFMU9pSmphR2x1WlhObFgzSmxZV1JwYm1jaU8zTTZPRG9pWTJ4cFpXNTBhV1FpTzNNNk16STZJalp1Y0hOYVVUUkxZbWh1VkRaUlZsZGhZa1JuVVdGaU9FdEdRMFE1WVdjMklqdHpPakV5T2lKamJHbGxiblJ6WldOeVpYUWlPM002TmpRNklsaHRiV05FUWxKNWNFVjNRbkJZY1UxTlpGbElXVGc0TW1obFoxaExhM05vVUhoU1YyNTJOMW95UkdOYVZVMVNPRGhJT1hWNVZsZHRjbGwzVm5VeWVIUWlPMzA9RWRVQWRMRjdCMUVDRjM5NzkxNDkzRUZGOTUzMEY0NDA5NjRGNTY==F7B1ECF39791493EFF9530F440964F56==";
var proxy = "https://proxy.leetools.eu.org";

var chart_list = [];

const chart_datasets = [
  {
    labels: ["自主行動", "社會參與", "溝工互動"],
    datasets: [
      {
        label: "三大核心面向",
        data: [5, 5, 5],
        backgroundColor: "rgba(255, 177, 193, 0.5)",
        borderColor: "rgba(251, 116, 144,0.8)",
        borderWidth: 5,
        fill: true,
      },
    ],
  },
  {
    labels: ["A1", "A2", "A3"],
    datasets: [
      {
        label: "自主行動",
        data: [84, 30, 70],
        backgroundColor: "rgba(255, 177, 193, 0.5)",
        borderColor: "rgba(251, 116, 144,0.8)",
        borderWidth: 5,
        fill: true,
      },
    ],
  },
  {
    labels: ["符號運用與溝通表達", "科技資訊與媒體素養", "藝術涵養與美感素養"],
    datasets: [
      {
        label: "溝通互動",
        data: [0, 7, 3],
        backgroundColor: "rgba(255, 177, 193, 0.5)",
        borderColor: "rgba(251, 116, 144,0.8)",
        borderWidth: 5,
        fill: true,
      },
    ],
  },
  {
    labels: ["道德實踐與公民意識", "人際關係與團隊合作", "多元文化與國際理解"],
    datasets: [
      {
        label: "社會參與",
        data: [6, 7, 8],
        backgroundColor: "rgba(255, 177, 193, 0.5)",
        borderColor: "rgba(251, 116, 144,0.8)",
        borderWidth: 5,
        fill: true,
      },
    ],
  },
  {
    labels: ["發現問題", "規劃與研究", "論證與建模", "表達與分享"],
    datasets: [
      {
        label: "社會參與",
        data: [8, 7, 3, 8],
        backgroundColor: "rgba(255, 177, 193, 0.5)",
        borderColor: "rgba(251, 116, 144,0.8)",
        borderWidth: 5,
        fill: true,
      },
    ],
  },
];

$(document).ready(async function () {
  // $.LoadingOverlay("show");
  // $.LoadingOverlay("hide");
  let getScienceLiteracyData = await getData("getStatistics_ScienceLiteracy");
  $("#scienceLiteracyStatistics_container").html(
    tmpl("scienceLiteracyStatistics_template", {
      data: {
        total_answered: getScienceLiteracyData["total_answered"],
        total_notanswer: getScienceLiteracyData["total_notanswer"],
        chtclass: getScienceLiteracyData["chtclass"],
        name: getScienceLiteracyData["name"],
        scienceLiteracyData: {
          ...chart_data,
          ...getScienceLiteracyData["data"],
        },
      },
    })
  );

  $(".more").click(function (e) {
    $(this).siblings(".more-info").slideToggle("slow");
    $(this).children("i").toggleClass("active");
  });

  $("[data-chart]").each(function (index, element) {
    let temp = new Chart($(this), {
      type: "radar",
      data: chart_datasets[index],
      options: chart_options[index],
    });
    chart_list.push(temp);
  });
});

async function getData(sFuncName, data = {}) {
  var vRtn = [];

  const oAccessTokenResult = await getAccessToken();
  if ("OK" === oAccessTokenResult["status"]) {
    var oParm = [];
    oParm["accesstoken"] = oAccessTokenResult["accesstoken"];

    switch (sFuncName) {
      case "getStatistics_ScienceLiteracy":
        vRtn = await getStatistics_ScienceLiteracy(oParm, data);
        break;
    }
  }
  return vRtn;
}
