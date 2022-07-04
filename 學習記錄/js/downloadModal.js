$(document).ready(function () {
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
          $(this)
            .children("input[type='checkbox']")
            .prop("checked", checkBox.prop("checked"));
        });
    }
  });
});
