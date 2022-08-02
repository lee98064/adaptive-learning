(function () {
  var cache = {};

  this.tmpl = function tmpl(str, data) {
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str)
      ? (cache[str] =
          cache[str] || tmpl(document.getElementById(str).innerHTML))
      : // Generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function(
          "obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +
            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +
            // Convert the template into pure JavaScript
            str
              .replace(/[\r\t\n]/g, " ")
              .split("<%")
              .join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t")
              .join("');")
              .split("%>")
              .join("p.push('")
              .split("\r")
              .join("\\'") +
            "');}return p.join('');"
        );

    // Provide some basic currying to the user
    return data ? fn(data) : fn;
  };
})();

function formatDate(dateInt) {
  let date = new Date(dateInt);
  return date.format("yyyy-MM-dd hh:mm:ss");
}

function get12AboutStr(core_code) {
  data = core_code.split("_");

  str = "";
  data.forEach((ele) => {
    if (ele != "" && ele != null) {
      str += ele + _12About[ele].title + "、";
    }
  });

  if (str.length > 1) str = str.substring(0, str.length - 1) + "。";

  if (str == "") str = "此題尚未提供核心素養。";

  return str;
}

function get12AboutDesc(key) {
  return _12About[key]["desc"];
}

function getSO4BJStr(learning_content) {
  data = learning_content.split("_");

  str = "";
  data.forEach((ele) => {
    if (ele != "" && ele != null) {
      str += _SO4BJ[ele].title + "、";
    }
  });

  if (str.length > 1) str = str.substring(0, str.length - 1) + "。";

  if (str == "") str = "此題尚未提供探究學習內容。";

  return str;
}

function getSO4BJDesc(key) {
  return _SO4BJ[key]["desc"];
}

function formatTime2HMSMs(time) {
  const millisecond = parseInt(time % 1000);
  let second = 0;
  let totalMinute = 0;
  let minute = 0;
  let hour = 0;
  let result = "";
  const totalSecond = parseInt(time / 1000); // 3671
  if (totalSecond > 59) {
    second = parseInt(totalSecond % 60); // 11
    totalMinute = parseInt(totalSecond / 60); // 61
  } else {
    second = totalSecond;
  }
  if (totalMinute > 59) {
    minute = parseInt(totalMinute % 60); // 1
    hour = parseInt(totalMinute / 60); // 1
  } else {
    minute = totalMinute;
  }

  if (minute < 10) {
    result += "0" + minute;
  } else {
    result += "分" + minute;
  }
  if (second < 10) {
    result += "分0" + second + "秒";
  } else {
    result += "分" + second + "秒";
  }

  return result;
}

function correctRateToNumber(correct_rate) {
  return parseFloat(correct_rate) * 100.0;
}
