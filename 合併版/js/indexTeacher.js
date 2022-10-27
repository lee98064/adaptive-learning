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
    $(this)
      .siblings(".scienceLiteracy-history-row-data")
      .slideToggle("slow", () => {
        $(this).parent(".scienceLiteracy-history-row").toggleClass("active");
        // 隱藏展開的過往歷史
        $(this)
          .siblings(".scienceLiteracy-history-row-data")
          .find(".row-data-more")
          .removeClass("distinctBtn show")
          .addClass("defaultBtn");
        $(this)
          .siblings(".scienceLiteracy-history-row-data")
          .find(".row-data-more > i")
          .removeClass("fa-eye-slash")
          .addClass("fa-eye");
        $(this)
          .siblings(".scienceLiteracy-history-row-data")
          .find(".row-data-table")
          .removeClass("show-history");
      });
  });

  // 當按下搜尋按鈕
  $(document).on("click", "#search", async function () {
    if ($("#student-selector .valueShow").data("value") === "") {
      const ModalBoxButton = [
        {
          buttonText: "OK",
          buttonId: "",
          buttonClass: "btn07 closeModalBoxBig",
        },
      ];
      modalBoxBig("錯誤", "請確認所有篩選條件皆有選取!", ModalBoxButton);
      return;
    }

    $.LoadingOverlay("show");
    topic = {};
    let getScienceLiteracyData = await getData("getData_ScienceLiteracy", {
      seme: $("#semester-selector > .valueShow").data("value"),
      classtype: $("#classtype-selector > .valueShow").data("value"),
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

  // 雷達圖查詢
  $(document).on("click", "#radar-search", async function () {
    if ($("#radar-student-selector .valueShow").data("value") === "") {
      const ModalBoxButton = [
        {
          buttonText: "OK",
          buttonId: "",
          buttonClass: "btn07 closeModalBoxBig",
        },
      ];
      modalBoxBig("錯誤", "請確認所有篩選條件皆有選取!", ModalBoxButton);
      return;
    }
    $.LoadingOverlay("show");
    let getScienceLiteracyData = await getData(
      "getStatistics_ScienceLiteracy",
      {
        seme: $("#radar-semester-selector .valueShow").data("value"),
        class_sn: $("#radar-class-selector .valueShow").data("value"),
        classtype: $("#radar-classtype-selector .valueShow").data("value"),
        stuid: $("#radar-student-selector .valueShow").data("value"),
      }
    );
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

    if (isAnswer) {
      questions = chart_data[category].answeredlist;
    } else {
      questions = chart_data[category].notanswerlist;
    }

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
          questions,
        },
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

  // 初始化學期選項
  let getSemesterAndClassOption = await getData("getOption_SemesterAndClass");
  if ("success" === getSemesterAndClassOption["status"]) {
    semester_and_class_data = getSemesterAndClassOption["data"];
    Object.entries(
      semester_and_class_data["class"]["option_seme_name"]
    ).forEach((ele) => {
      const [key, value] = ele;
      let html = `<li data-value="${key}">${value}</li>`;
      $("#semester-selector > ul").append(html);
      $("#radar-semester-selector > ul").append(html);
    });
  }

  $(document).on("click", ".more", function () {
    $(this).siblings(".more-info").slideToggle("slow");
    $(this).children("i").toggleClass("active");
  });

  // 當按下下載學習紀錄
  $(document).on("click", "#download_history", async function () {
    $.LoadingOverlay("show");
    let getScienceLiteracyData = await getData("getData_ScienceLiteracy");
    customModalBox(
      "教育部因才網",
      tmpl("scienceLiteracy_history_download_modal_template", {
        data: {
          semesterAndClassData: semester_and_class_data,
          scienceLiteracyData: getScienceLiteracyData["data"],
        },
      }),
      `<button type="button" class="btn07 ModalBoxButton" id="start_download">下載學習紀錄</button>`
    );
    $.LoadingOverlay("hide");
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
