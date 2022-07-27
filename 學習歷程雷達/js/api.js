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
