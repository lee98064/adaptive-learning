var sTokenDataValue =
  "YzE2YTUzMjBmYTQ3NTUzMGQ5NTgzYzM0ZmQzNTZlZjVFZFVBZExZVG8wT250ek9qYzZJblZ6WlhKZmFXUWlPM002TVRRNklqRTVNREEwTVMxek1Ea3dNekF4SWp0ek9qZzZJbUpsYUdGMmFXOXlJanR6T2pFMU9pSmphR2x1WlhObFgzSmxZV1JwYm1jaU8zTTZPRG9pWTJ4cFpXNTBhV1FpTzNNNk16STZJalp1Y0hOYVVUUkxZbWh1VkRaUlZsZGhZa1JuVVdGaU9FdEdRMFE1WVdjMklqdHpPakV5T2lKamJHbGxiblJ6WldOeVpYUWlPM002TmpRNklsaHRiV05FUWxKNWNFVjNRbkJZY1UxTlpGbElXVGc0TW1obFoxaExhM05vVUhoU1YyNTJOMW95UkdOYVZVMVNPRGhJT1hWNVZsZHRjbGwzVm5VeWVIUWlPMzA9RWRVQWRMRjdCMUVDRjM5NzkxNDkzRUZGOTUzMEY0NDA5NjRGNTY==F7B1ECF39791493EFF9530F440964F56==";
var proxy = "https://proxy.leetools.eu.org";

var topic = {};
var chart_data = {};

$(document).ready(async function () {
  $.LoadingOverlay("show");

  $(document).on("click", ".contant-collapse", function () {
    $(this).toggleClass("active");
    $(this).siblings(".contant-custom").slideToggle("slow");
  });

  $(document).on("click", ".scienceLiteracy-history-row-title", function () {
    $(this).siblings(".scienceLiteracy-history-row-data").slideToggle("slow");
    $(this).parent(".scienceLiteracy-history-row").toggleClass("active");
  });

  // 當按下搜尋按鈕
  $(document).on("click", ".search-btn", async function () {
    $.LoadingOverlay("show");
    topic = {};
    let getScienceLiteracyData = await getData("getData_ScienceLiteracy", {
      coreliteracy: $("#coreliteracy-selector > .valueShow").data("value"),
      explorelearning: $("#explorelearning-selector > .valueShow").data(
        "value"
      ),
      searchtext: $("#searchtext").val(),
    });

    if (!getScienceLiteracyData["status"] === "OK") {
      alert("發生異常!");
      return;
    }

    // 將彈出窗口的題目圖片抓出來
    getScienceLiteracyData["data"].forEach((item) => {
      const { item_name, item_show_num, questions_img, solution_img } = item;
      topic[item["item_li_sn"]] = {
        item_name,
        item_show_num,
        questions_img,
        solution_img,
      };
    });

    $("#scienceLiteracy-history-row").html(
      tmpl("scienceLiteracy_history_row_template", {
        data: getScienceLiteracyData["data"],
      })
    );
    $.LoadingOverlay("hide");
  });

  // 當按下查看題目與解答
  $(document).on("click", "[data-item-li-sn]", function () {
    let itemSn = $(this).data("item-li-sn");
    let itmeIndex = $(this).data("item-li-index");
    const buttonBig = [];
    modalBoxBig(
      tmpl("scienceLiteracy_history_topic_modal_title_template", {
        topicName: topic[itemSn]["item_name"],
        topicNum: itmeIndex + 1,
      }),
      tmpl("scienceLiteracy_history_topic_modal_template", {
        data: topic[itemSn],
        itemIndex: itmeIndex,
      }),
      buttonBig,
      true
    );
  });

  // 當按下下載學習紀錄
  $(document).on("click", "#download_history", async function () {
    $.LoadingOverlay("show");
    let getScienceLiteracyData = await getData("getData_ScienceLiteracy");
    const buttonBig = [
      {
        buttonText: "下載學習紀錄",
        buttonId: "start_download",
        buttonClass: "btn07 ModalBoxButton",
      },
    ];
    modalBoxBig(
      "教育部因才網",
      tmpl("scienceLiteracy_history_download_modal_template", {
        data: {
          scienceLiteracyData: getScienceLiteracyData["data"],
        },
      }),
      buttonBig,
      true
    );
    $.LoadingOverlay("hide");
  });

  // 查看過往紀錄
  $(document).on("click", ".row-data-more", function () {
    $.LoadingOverlay("show");
    $(this).toggleClass("distinctBtn");
    $(this).toggleClass("defaultBtn");
    $(this).toggleClass("show");
    $(this).children("i").toggleClass("fa-eye");
    $(this).children("i").toggleClass("fa-eye-slash");
    $(this).siblings(".row-data-table").toggleClass("show-history");
    $.LoadingOverlay("hide");
  });

  // 查看已作答未作答題目
  $(document).on("click", "[data-is-answer]", function () {
    let isAnswer = $(this).data("is-answer");
    let category = $(this).data("category");

    customModalBox(
      "教育部因才網",
      tmpl("scienceLiteracy_topic_status_modal_template", {
        data: {},
      })
    );
  });

  // 初始化核心素養選項
  let getCoreLiteracyOption = await getData("getOption_CoreLiteracy");
  if ("success" === getCoreLiteracyOption["status"]) {
    getCoreLiteracyOption["data"].forEach((ele) => {
      $("#coreliteracy-selector > ul").append(
        `<li data-value="${ele.value}">${ele["text"]}</li>`
      );
    });
  }

  // 初始化探究學習內容
  let getExploreLearningOption = await getData("getOption_ExploreLearning");
  if ("success" === getExploreLearningOption["status"]) {
    getExploreLearningOption["data"].forEach((ele) => {
      $("#explorelearning-selector > ul").append(
        `<li data-value="${ele.value}">${ele["text"]}</li>`
      );
    });
  }

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
      case "getOption_CoreLiteracy":
        vRtn = await getOption_CoreLiteracy(oParm);
        break;
      case "getOption_ExploreLearning":
        vRtn = await getOption_ExploreLearning(oParm);
        break;
      case "getData_ScienceLiteracy":
        vRtn = await getData_ScienceLiteracy(oParm, data);
        break;
      case "getData_ScienceLiteracyExport":
        vRtn = await getData_ScienceLiteracyExport(oParm, data);
        break;
      case "getStatistics_ScienceLiteracy":
        vRtn = await getStatistics_ScienceLiteracy(oParm, data);
        break;
    }
  }
  return vRtn;
}
