var sTokenDataValue =
  "ZTM2OTg1M2RmNzY2ZmE0NGUxZWQwZmY2MTNmNTYzYmRFZFVBZExZVG8wT250ek9qYzZJblZ6WlhKZmFXUWlPM002TVRNNklqRTVNREEwTVMxMGREQTVNRE1pTzNNNk9Eb2lZbVZvWVhacGIzSWlPM002TVRVNkltTm9hVzVsYzJWZmNtVmhaR2x1WnlJN2N6bzRPaUpqYkdsbGJuUnBaQ0k3Y3pvek1qb2lObTV3YzFwUk5FdGlhRzVVTmxGV1YyRmlSR2RSWVdJNFMwWkRSRGxoWnpZaU8zTTZNVEk2SW1Oc2FXVnVkSE5sWTNKbGRDSTdjem8yTkRvaVdHMXRZMFJDVW5sd1JYZENjRmh4VFUxa1dVaFpPRGd5YUdWbldFdHJjMmhRZUZKWGJuWTNXakpFWTFwVlRWSTRPRWc1ZFhsV1YyMXlXWGRXZFRKNGRDSTdmUT09RWRVQWRMQTBGOUI1OTVCMzVFMTI2N0Y5NkQ3NDNBQjRFNjk1MzY==A0F9B595B35E1267F96D743AB4E69536==";
var proxy = "https://proxy.leetools.eu.org";
var _12About = {};

$(document).ready(async function () {
  $.LoadingOverlay("show");

  // 取得12面相解說文字
  _12About = await get12About();
  _SO4BJ = await getSO4BJ();

  $(document).on("click", ".scienceLiteracy-history-row-title", function () {
    $(this).siblings(".scienceLiteracy-history-row-data").slideToggle("slow");
    $(this).parent(".scienceLiteracy-history-row").toggleClass("active");
  });

  // 當按下搜尋按鈕
  $(document).on("click", ".search-btn", async function () {
    $.LoadingOverlay("show");
    let getScienceLiteracyData = await getData("getData_ScienceLiteracy");
    $("#scienceLiteracy-history-row").html(
      tmpl("scienceLiteracy_history_row_template", {
        data: getScienceLiteracyData["data"],
      })
    );
    $.LoadingOverlay("hide");
  });

  // 當按下下載學習紀錄
  $(document).on("click", "#download_history", function () {
    const buttonBig = [
      {
        buttonText: "下載學習紀錄",
        buttonId: "start_download",
        buttonClass: "btn07 ModalBoxButton",
      },
    ];
    modalBoxBig(
      "教育部因才網",
      '<h1 style="width: 100%">sdffsf</h1>',
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

async function getData(sFuncName) {
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
        vRtn = await getData_ScienceLiteracy(oParm);
        break;
    }
  }
  return vRtn;
}
