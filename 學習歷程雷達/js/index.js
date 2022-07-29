var sTokenDataValue =
  "YzE2YTUzMjBmYTQ3NTUzMGQ5NTgzYzM0ZmQzNTZlZjVFZFVBZExZVG8wT250ek9qYzZJblZ6WlhKZmFXUWlPM002TVRRNklqRTVNREEwTVMxek1Ea3dNekF4SWp0ek9qZzZJbUpsYUdGMmFXOXlJanR6T2pFMU9pSmphR2x1WlhObFgzSmxZV1JwYm1jaU8zTTZPRG9pWTJ4cFpXNTBhV1FpTzNNNk16STZJalp1Y0hOYVVUUkxZbWh1VkRaUlZsZGhZa1JuVVdGaU9FdEdRMFE1WVdjMklqdHpPakV5T2lKamJHbGxiblJ6WldOeVpYUWlPM002TmpRNklsaHRiV05FUWxKNWNFVjNRbkJZY1UxTlpGbElXVGc0TW1obFoxaExhM05vVUhoU1YyNTJOMW95UkdOYVZVMVNPRGhJT1hWNVZsZHRjbGwzVm5VeWVIUWlPMzA9RWRVQWRMRjdCMUVDRjM5NzkxNDkzRUZGOTUzMEY0NDA5NjRGNTY==F7B1ECF39791493EFF9530F440964F56==";
var proxy = "https://proxy.leetools.eu.org";

var chart_data = {};

$(document).ready(async function () {
  $.LoadingOverlay("show");
  // $.LoadingOverlay("hide");
  let getScienceLiteracyData = await getData("getStatistics_ScienceLiteracy");

  chart_data = {
    ...chart_default_data,
    ...getScienceLiteracyData["data"],
  };

  $("#scienceLiteracyStatistics_container").html(
    tmpl("scienceLiteracyStatistics_template", {
      data: {
        total_answered: getScienceLiteracyData["total_answered"],
        total_notanswer: getScienceLiteracyData["total_notanswer"],
        chtclass: getScienceLiteracyData["chtclass"],
        name: getScienceLiteracyData["name"],
        scienceLiteracyData: chart_data,
      },
    })
  );

  drawRadarChart();

  $(window, document).resize(function () {
    drawRadarChart();
  });

  $(".more").click(function (e) {
    $(this).siblings(".more-info").slideToggle("slow");
    $(this).children("i").toggleClass("active");
  });

  $.LoadingOverlay("hide");
});

function drawRadarChart() {
  $("[data-chart]").each(function (index, element) {
    // 防止圖表變形
    $(this).attr("style", "");
    $(this).attr("heigth", "");
    $(this).attr("width", "");

    // 取得圖表名稱與資料
    var chartName = $(this).data("chart");
    var chartData = $(this).data("chartdata");

    // 取得圖表設定
    var options = chart_options_768up[chartName];
    if ($(window).width() < 768) {
      options = chart_options[chartName];
    }

    new Chart($(this), {
      type: "radar",
      data: getRadarData(chartName, chartData),
      options: options,
    });
  });
}

function getRadarData(chartName, chartDataKey) {
  chartDataKey = chartDataKey.split(",");

  let data = [];
  chartDataKey.forEach((key) => {
    data.push(correctRateToNumber(chart_data[key].correct_rate));
  });

  let chartDataset = chart_datasets[chartName];
  chartDataset["datasets"][0]["data"] = data;
  return chartDataset;
}

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
