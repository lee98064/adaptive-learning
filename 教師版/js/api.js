// 取得Access Token
function getAccessToken() {
  return $.ajax({
    type: "POST",
    url: `${proxy}/aialtest/ADLAPI/v2/token`,
    data: {
      data: sTokenDataValue,
    },
    dataType: "JSON",
  });
}

//取得12面相解說文字
function get12About() {
  return $.get("../data/12about.json", (data, status) => {}, "JSON");
}

// 取得探究學習解說文字
function getSO4BJ() {
  return $.get("../data/SO4BJ.json", (data, status) => {}, "JSON");
}

// 取得學年與班級選項
async function getOption_SemesterAndClass(oParm) {
  return $.ajax({
    type: "POST",
    url: `${proxy}/aialtest/ADLAPI/science_literacy/report`,
    data: {
      accesstoken: oParm["accesstoken"],
      property_classdata: 1,
    },
    dataType: "JSON",
  });
}
// 取得學生選項
async function getOption_Student(oParm, data) {
  return $.ajax({
    type: "POST",
    url: `${proxy}/aialtest/ADLAPI/science_literacy/report`,
    data: {
      accesstoken: oParm["accesstoken"],
      property_studentdata: 1,
      ...data,
    },
    dataType: "JSON",
  });
}

// 取得核心素養選項
async function getOption_CoreLiteracy(oParm) {
  return $.ajax({
    type: "POST",
    url: `${proxy}/aialtest/ADLAPI/science_literacy/report`,
    data: {
      accesstoken: oParm["accesstoken"],
      property_coreliteracy: 1,
    },
    dataType: "JSON",
  });
}

// 取得探究學習內容
async function getOption_ExploreLearning(oParm) {
  return $.ajax({
    type: "POST",
    url: `${proxy}/aialtest/ADLAPI/science_literacy/report`,
    data: {
      accesstoken: oParm["accesstoken"],
      property_explorelearning: 1,
    },
    dataType: "JSON",
  });
}

// 取得學習紀錄
async function getData_ScienceLiteracy(oParm, data) {
  return $.ajax({
    type: "POST",
    url: `${proxy}/aialtest/ADLAPI/science_literacy/report`,
    dataType: "JSON",
    data: {
      accesstoken: oParm["accesstoken"],
      getscienceliteracy: 1,
      ...data,
    },
  });
}

// 取得學習紀錄輸出Excel
async function getData_ScienceLiteracyExport(oParm, data) {
  return $.ajax({
    type: "POST",
    url: `${proxy}/aialtest/ADLAPI/science_literacy/report`,
    dataType: "JSON",
    data: {
      accesstoken: oParm["accesstoken"],
      getscienceliteracyexport: 1,
      ...data,
    },
  });
}

// 取得雷達圖
function getStatistics_ScienceLiteracy(oParm, data) {
  return $.ajax({
    type: "POST",
    url: `${proxy}/aialtest/ADLAPI/science_literacy/report`,
    dataType: "JSON",
    data: {
      accesstoken: oParm["accesstoken"],
      getscienceliteracystatistics: 1,
      ...data,
    },
  });
}
