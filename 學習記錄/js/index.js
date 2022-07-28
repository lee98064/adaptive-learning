var sTokenDataValue =
  "YzE2YTUzMjBmYTQ3NTUzMGQ5NTgzYzM0ZmQzNTZlZjVFZFVBZExZVG8wT250ek9qYzZJblZ6WlhKZmFXUWlPM002TVRRNklqRTVNREEwTVMxek1Ea3dNekF4SWp0ek9qZzZJbUpsYUdGMmFXOXlJanR6T2pFMU9pSmphR2x1WlhObFgzSmxZV1JwYm1jaU8zTTZPRG9pWTJ4cFpXNTBhV1FpTzNNNk16STZJalp1Y0hOYVVUUkxZbWh1VkRaUlZsZGhZa1JuVVdGaU9FdEdRMFE1WVdjMklqdHpPakV5T2lKamJHbGxiblJ6WldOeVpYUWlPM002TmpRNklsaHRiV05FUWxKNWNFVjNRbkJZY1UxTlpGbElXVGc0TW1obFoxaExhM05vVUhoU1YyNTJOMW95UkdOYVZVMVNPRGhJT1hWNVZsZHRjbGwzVm5VeWVIUWlPMzA9RWRVQWRMRjdCMUVDRjM5NzkxNDkzRUZGOTUzMEY0NDA5NjRGNTY==F7B1ECF39791493EFF9530F440964F56==";
var proxy = "https://proxy.leetools.eu.org";

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
    let getScienceLiteracyData = await getData("getData_ScienceLiteracy", {
      coreliteracy: $("#coreliteracy-selector > .valueShow").data("value"),
      explorelearning: $("#explorelearning-selector > .valueShow").data(
        "value"
      ),
      searchtext: $("#searchtext").val(),
    });
    $("#scienceLiteracy-history-row").html(
      tmpl("scienceLiteracy_history_row_template", {
        data: getScienceLiteracyData["data"],
      })
    );
    $.LoadingOverlay("hide");
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

  $.LoadingOverlay("hide");
});

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
    }
  }
  return vRtn;
}
