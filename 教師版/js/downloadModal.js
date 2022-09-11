$(document).ready(function () {
  // 全選動作
  $(document).on("click", ".filterBox-group label", function () {
    var checkBox = $(this).siblings("input[type='checkbox']");
    checkBox.prop("checked", !checkBox.prop("checked"));

    // 如果是全選要打勾全部
    if (checkBox.val() == "selectAll") {
      $(this)
        .parents(".filterBox-checkBox-selectAll")
        .siblings(".filterBox-checkBox-group-list")
        .children(".filterBox-checkBox-group")
        .each(function (index, element) {
          if ($(this).css("display") === "none") {
            return;
          }

          $(this)
            .children("input[type='checkbox']")
            .prop("checked", checkBox.prop("checked"));
        });
    }
  });

  // 搜尋題目
  $(document).on("click", "#filterBox-button", function () {
    var keyword = $("#filterBox-input").val();
    $("#history_download_item_filter .filterBox-checkBox-group").each(function (
      index,
      element
    ) {
      if (keyword === "") {
        $(this).show();
        return;
      }

      var labelText = $(this, "label").text();
      if (labelText.search(keyword) == -1) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });

  // 開始下載
  $(document).on("click", "#start_download", function () {
    $.LoadingOverlay("show");
    initProperty();
    $.LoadingOverlay("hide");
  });
});

async function initProperty() {
  data = {
    showhistory: 0,
  };

  id = 0;
  $(
    "#history_download_item_filter > .filterBox-checkBox-group > input[type='checkbox']"
  ).each(function (index, element) {
    if ($(this).prop("checked")) {
      data[`itemid[${id}]`] = $(this).val();
      id += 1;
    }
  });

  id = 0;
  $(
    "#history_download_column_filter > .filterBox-checkBox-group > input[type='checkbox']"
  ).each(function (index, element) {
    if ($(this).prop("checked") && $(this).val() == "item_history") {
      data["showhistory"] = 1;
    } else if ($(this).prop("checked")) {
      data[`field[${id}]`] = $(this).val();
      id += 1;
    }
  });

  // data = {
  //   showhistory: 1,
  //   "itemid[0]": "UWpNPQ",
  //   "itemid[1]": "WUROPQ",
  //   "field[0]": "item_name",
  // };

  // 初始化學習紀錄輸出Excel;
  let getScienceLiteracyExport = await getData(
    "getData_ScienceLiteracyExport",
    data
  );
  if ("success" === getScienceLiteracyExport["status"]) {
    downloadScienceLiteracyExcel(getScienceLiteracyExport["data"]);
  } else {
    const ModalBoxButton = [
      {
        buttonText: "OK",
        buttonId: "",
        buttonClass: "btn07 closeModalBoxBig",
      },
    ];
    modalBoxBig(
      "錯誤",
      "取得資料失敗！！<br>請確認是否有勾選選項!",
      ModalBoxButton
    );
  }
}

function downloadScienceLiteracyExcel(excelData) {
  // 建立excel
  var oWorkbook = XLSX.utils.book_new();

  var oSheet = XLSX.utils.json_to_sheet(excelData, {
    skipHeader: true,
  });

  oSheet["!merges"] = [
    {
      s: { r: 0, c: 0 },
      e: { r: 0, c: 6 },
    },
    {
      s: { r: 1, c: 0 },
      e: { r: 1, c: 6 },
    },
  ];

  // 將工作表塞入excel
  XLSX.utils.book_append_sheet(oWorkbook, oSheet, "sheet_name_1");

  // 產出excel
  XLSX.writeFile(oWorkbook, "workbook_name.xlsx");
}
