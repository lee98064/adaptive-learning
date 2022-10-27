// 篩選器JS

$(document).ready(async function () {
  // 當學期切換時
  $(document).on("click", "#semester-selector li", function () {
    let semester = $(this).data("value");
    setClassType("", semester);
  });

  // 當學期切換時(雷達)
  $(document).on("click", "#radar-semester-selector li", function () {
    let semester = $(this).data("value");
    setClassType("radar-", semester);
  });

  // 當班級類型切換時
  $(document).on("click", "#classtype-selector li", function () {
    let semester = $("#semester-selector .valueShow").data("value");
    let classtype = $(this).data("value");
    setClass("", semester, classtype);
  });

  // 當班級類型切換時(雷達)
  $(document).on("click", "#radar-classtype-selector li", function () {
    let semester = $("#radar-semester-selector .valueShow").data("value");
    let classtype = $(this).data("value");
    setClass("radar-", semester, classtype);
  });

  // 當班級切換時
  $(document).on("click", "#class-selector li", function () {
    let semester = $("#semester-selector .valueShow").data("value");
    let classtype = $("#classtype-selector .valueShow").data("value");
    let class_sn = $(this).data("value");
    setStudent("", semester, classtype, class_sn);
  });

  // 當班級切換時(雷達)
  $(document).on("click", "#radar-class-selector li", function () {
    let semester = $("#radar-semester-selector .valueShow").data("value");
    let classtype = $("#radar-classtype-selector .valueShow").data("value");
    let class_sn = $(this).data("value");
    setStudent("radar-", semester, classtype, class_sn);
  });
});

function setClassType(prefix = "", semester) {
  // 清除子項目選擇
  $(`#${prefix}classtype-selector > ul`).html("");
  $(`#${prefix}classtype-selector > .valueShow`).html("請選擇");
  $(`#${prefix}classtype-selector > .valueShow`).data("value", "");
  $(`#${prefix}class-selector > ul`).html("");
  $(`#${prefix}class-selector > .valueShow`).html("請選擇");
  $(`#${prefix}class-selector > .valueShow`).data("value", "");
  $(`#${prefix}student-selector > ul`).html("");
  $(`#${prefix}student-selector > .valueShow`).html("請選擇");
  $(`#${prefix}student-selector > .valueShow`).data("value", "");
  Object.entries(
    semester_and_class_data["class"]["option_class_type"][semester]
  )?.forEach((ele) => {
    const [key, value] = ele;
    let html = `<li data-value="${key}">${value}</li>`;
    $(`#${prefix}classtype-selector > ul`).append(html);
  });
}

function setClass(prefix = "", semester, classtype) {
  // 清除子項目選擇
  $(`#${prefix}class-selector > ul`).html("");
  $(`#${prefix}class-selector > .valueShow`).html("請選擇");
  $(`#${prefix}class-selector > .valueShow`).data("value", "");
  $(`#${prefix}student-selector > ul`).html("");
  $(`#${prefix}student-selector > .valueShow`).html("請選擇");
  $(`#${prefix}student-selector > .valueShow`).data("value", "");
  semester_and_class_data["class"]["option_class_name"][semester][
    classtype
  ]?.forEach((ele) => {
    const { class_sn, class_name } = ele;
    let html = `<li data-value="${class_sn}">${class_name}</li>`;
    $(`#${prefix}class-selector > ul`).append(html);
  });
}

async function setStudent(prefix = "", semester, classtype, class_sn) {
  // 清除子項目選擇
  $(`#${prefix}student-selector > ul`).html("");
  $(`#${prefix}student-selector > .valueShow`).html("請選擇");
  $(`#${prefix}student-selector > .valueShow`).data("value", "");
  $.LoadingOverlay("show");
  // 抓取學生清單
  let getStudentOption = await getData("getOption_Student", {
    seme: semester,
    classtype: classtype,
    class_sn: class_sn,
  });
  if ("success" === getStudentOption["status"]) {
    $(`#${prefix}student-selector > ul`).html("");
    $(`#${prefix}student-selector > .valueShow`).html("請選擇");
    $(`#${prefix}student-selector > .valueShow`).data("value", "");
    getStudentOption["data"].forEach((ele) => {
      $(`#${prefix}student-selector > ul`).append(
        `<li data-value="${ele.user_id}">${ele["uname"]}</li>`
      );
    });
  }
  $.LoadingOverlay("hide");
}
