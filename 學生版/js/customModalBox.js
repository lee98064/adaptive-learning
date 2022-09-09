$(document).ready(function () {
  $(document).on("click", ".CustomModalBox-close", function () {
    let modalBox = $(".CustomModalBox");
    modalBox.hide();
  });
});

function customModalBox(title = null, content, footer = null) {
  let modalBox = $(".CustomModalBox");

  if (title != null) {
    $(".CustomModalBox-title", modalBox).html(title);
  }

  $(".CustomModalBox-content", modalBox).html(content);

  if (footer != null) {
    $(".CustomModalBox-footer", modalBox).html(footer);
  }
  modalBox.show();
}
