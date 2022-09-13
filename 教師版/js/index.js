var sTokenDataValue =
  "M2M1OWRjMDQ4ZTg4NTAyNDNiZTgwNzlhNWM3NGQwNzlFZFVBZExZVG8wT250ek9qYzZJblZ6WlhKZmFXUWlPM002TVRNNklqRTVNREEwTVMxMGREQTVNREVpTzNNNk9Eb2lZbVZvWVhacGIzSWlPM002TVRVNkltTm9hVzVsYzJWZmNtVmhaR2x1WnlJN2N6bzRPaUpqYkdsbGJuUnBaQ0k3Y3pvek1qb2lObTV3YzFwUk5FdGlhRzVVTmxGV1YyRmlSR2RSWVdJNFMwWkRSRGxoWnpZaU8zTTZNVEk2SW1Oc2FXVnVkSE5sWTNKbGRDSTdjem8yTkRvaVdHMXRZMFJDVW5sd1JYZENjRmh4VFUxa1dVaFpPRGd5YUdWbldFdHJjMmhRZUZKWGJuWTNXakpFWTFwVlRWSTRPRWc1ZFhsV1YyMXlXWGRXZFRKNGRDSTdmUT09RWRVQWRMNDA3RUM5NUJBRDBENzQyQkI3NEY0RjU2M0I1NjY2OEM==407EC95BAD0D742BB74F4F563B56668C==";
var proxy = "https://proxy.leetools.eu.org";

var topic = {};
var chart_data = {};
var semester_and_class_data = {};

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
      seme: $("#semester-selector > .valueShow").data("value"),
      classtype: "normal_class",
      class_sn: $("#class-selector > .valueShow").data("value"),
      stuid: $("#student-selector > .valueShow").data("value"),
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

    if (category.substring(0, 2) == "NA") {
      category = _SO4BJ[category]["title"];
    } else {
      category = category + _12About[category]["title"];
    }

    customModalBox(
      "教育部因才網",
      tmpl("scienceLiteracy_topic_status_modal_template", {
        data: {
          category,
          isAnswer,
        },
      })
    );
  });

  // 初始化學期選項
  let getSemesterAndClassOption = await getData("getOption_SemesterAndClass");
  semester_and_class_data = getSemesterAndClassOption;
  if ("success" === getSemesterAndClassOption["status"]) {
    Object.entries(
      getSemesterAndClassOption["data"]["class"]["option_seme_name"]
    ).forEach((ele) => {
      const [key, value] = ele;
      let html = `<li data-value="${key}">${value}</li>`;
      $("#semester-selector > ul").append(html);
      $("#radar-semester-selector > ul").append(html);
    });
    $("#semester-selector  > .valueShow")
      .data("value", "sad")
      .trigger("changeData");
  }

  // 當選擇學年度時抓取班級（學習紀錄）
  $(document).on("click", "#semester-selector li", function () {
    $.LoadingOverlay("show");
    let semester = $(this).data("value");
    $("#class-selector > ul").html("");
    $("#class-selector > ul").html("");
    $("#class-selector > .valueShow").html("請選擇");
    $("#class-selector > .valueShow").data("value", "");
    $("#student-selector > ul").html("");
    $("#student-selector > .valueShow").html("請選擇");
    $("#student-selector > .valueShow").data("value", "");
    semester_and_class_data["data"]["class"]["option_class_name"][semester][
      "normal_class"
    ]?.forEach((ele) => {
      const { class_sn, class_name } = ele;
      let html = `<li data-value="${class_sn}">${class_name}</li>`;
      $("#class-selector > ul").append(html);
    });
    $.LoadingOverlay("hide");
  });

  // 當選擇班級時抓取學生列表（學習紀錄）
  $(document).on("click", "#class-selector li", async function () {
    $.LoadingOverlay("show");
    // 抓取學生清單
    let getStudentOption = await getData("getOption_Student", {
      seme: $("#semester-selector > .valueShow").data("value"),
      classtype: "normal_class",
      class_sn: $(this).data("value"),
    });
    if ("success" === getStudentOption["status"]) {
      $("#student-selector > ul").html("");
      $("#student-selector > .valueShow").html("請選擇");
      $("#student-selector > .valueShow").data("value", "");
      getStudentOption["data"].forEach((ele) => {
        $("#student-selector > ul").append(
          `<li data-value="${ele.user_id}">${ele["uname"]}</li>`
        );
      });
    }
    $.LoadingOverlay("hide");
  });

  // 當選擇學年度時（雷達圖）
  $(document).on("click", "#radar-semester-selector li", function () {
    alert($(this).data("value"));
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

  // let getScienceLiteracyData = await getData("getStatistics_ScienceLiteracy");

  // chart_data = {
  //   ...chart_default_data,
  //   ...getScienceLiteracyData["data"],
  // };

  // $("#scienceLiteracyStatistics_container").html(
  //   tmpl("scienceLiteracyStatistics_template", {
  //     data: {
  //       total_answered: getScienceLiteracyData["total_answered"],
  //       total_notanswer: getScienceLiteracyData["total_notanswer"],
  //       chtclass: getScienceLiteracyData["chtclass"],
  //       name: getScienceLiteracyData["name"],
  //       scienceLiteracyData: chart_data,
  //     },
  //   })
  // );

  // drawRadarChart();

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
      case "getOption_SemesterAndClass":
        vRtn = await getOption_SemesterAndClass(oParm);
        break;
      case "getOption_Student":
        vRtn = await getOption_Student(oParm, data);
        break;
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
