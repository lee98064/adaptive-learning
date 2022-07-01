// Simple JavaScript Templating
// John Resig - https://johnresig.com/ - MIT Licensed
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
  //   let formatted_date = date.getFullYear() + "-";

  //   if (date.getMonth() + 1 < 10) {
  //     formatted_date += "0" + (date.getMonth() + 1) + "-";
  //   } else {
  //     formatted_date += date.getMonth() + 1 + "-";
  //   }

  //   formatted_date += date.getDate();

  //   formatted_date += `  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

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
