var sTokenDataValue =
  "ZDgyYzhkMTYxOWFkODE3NmQ2NjU0NTNjZmIyZTU1ZjBFZFVBZExZVG8wT250ek9qYzZJblZ6WlhKZmFXUWlPM002TVRRNklqRTVNREEwTVMxek1Ea3hNREF4SWp0ek9qZzZJbUpsYUdGMmFXOXlJanR6T2pFNE9pSm5ZVzFsWDJKaGMyVmZiR1ZoY201cGJtY2lPM002T0RvaVkyeHBaVzUwYVdRaU8zTTZNekk2SWpkaFVEUlhSR3R5T0hsM1ZHaFFOMEYyZURKQ01saEVZVTVHT1V0V1RVUmFJanR6T2pFeU9pSmpiR2xsYm5SelpXTnlaWFFpTzNNNk5qUTZJblkxZUdoRU5ITlRUVkZDVUVkM1ZUTjZlbEJtU3pWNlNHaGFRbEZvZVZwbFpGQldaMGhyUzFSQmVHMWpORmRSUzJKa2MzSjVZMVpIVm5SYWJrZEdlVmdpTzMwPUVkVUFkTDM4RkYwNEE3ODcxMkFDMDkyMDU5MjIyMjY4MUIyNkEy";
var proxy = "https://proxy.leetools.eu.org";
var targetUrl = "https://adaptive-learning.ntcu.edu.tw";
var _12About = {};

$(document).ready(async function () {
  $(document).on("click", ".scienceLiteracy-history-row-title", function () {
    $(this).siblings(".scienceLiteracy-history-row-data").slideToggle("slow");
    $(this).toggleClass("active");
  });

  _12About = await get12About();
});

function get12About() {
  return $.get("../data/12about.json", (data, status) => {}, "JSON");
}

// 取得Access Token
function getAccessToken() {
  return $.ajax({
    type: "POST",
    url: `${proxy}/aialtest/ADLAPI/v2/token`,
    data: {
      data: sTokenDataValue,
    },
    headers: {
      "Target-URL": targetUrl,
    },
    dataType: "JSON",
  })
    .done(function (result) {
      // console.log(result);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // console.log(jqXHR, textStatus, errorThrown);
    })
    .always(function () {});
}

async function getData(sFuncName) {
  var vRtn = [];

  const oAccessTokenResult = await getAccessToken();
  if ("OK" === oAccessTokenResult["status"]) {
    var oParm = [];
    oParm["accesstoken"] = oAccessTokenResult["accesstoken"];

    switch (sFuncName) {
      case "getProperty_CoreLiteracy":
        vRtn = await getProperty_CoreLiteracy(oParm);
        break;
    }
  }

  return vRtn;
}
