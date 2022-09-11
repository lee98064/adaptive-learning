// ---ModalBox---
function modalBox(title, text, button, bCloseBtn = true) {
  let sCloseBtn = bCloseBtn ? '<div class="trigger closeModalBox"><i class="fas fa-times"></i></div>' : '';
  $(".ModalBox").css('display', 'flex');
  $(".ModalBox").html('');
  $(".ModalBox").append(` <div class="ModalBoxContent">
                                <div class="ModalBoxDetail">
                                    <div class="ModalBoxDetailTitle">${title}</div>
                                    <div class="ModalBoxDetailText">${text}</div>
                                    ${sCloseBtn}
                                    <div class="ModalBoxDetailButton"></div>
                                </div>
                            </div>`);
  for (let i in button) {
    $(".ModalBoxDetailButton").append(` <button id="${button[i]["buttonId"]}" class="${button[i]["buttonClass"]} closeModalBox ModalBoxButton">
                                                ${button[i]["buttonText"]}
                                            </button>`);
  }

  // 按 X 關掉
  $(".closeModalBox").click(function() {
    $(".ModalBox").hide();
  });

  // 20210914: Hugh: 此功能暫時不使用
  // $('.ModalBox').off('click');
  // $('.ModalBox').on('click', function() {
  //     if ('ModalBox' === event.target.className) {
  //         $(".ModalBox").hide();
  //     }
  // });
}
// ---ModalBox End---


// ---ModalBoxBig---
function modalBoxBig(titleBig, sHtml, buttonBig, bCloseBtn = true) {
  let sCloseBtn = bCloseBtn ? '<div class="trigger closeModalBoxBig"><i class="fas fa-times"></i></div>' : '';

  $(".ModalBoxBig").css('display', 'flex');
  $(".ModalBoxBig").html('');
  $(".ModalBoxBig").append(` <div class="ModalBoxContent">
                                <div class="ModalBoxDetail">
                                    <div class="ModalBoxDetailTitle">${titleBig}</div>
                                    <div class="ModalBoxDetailText">${sHtml}</div>
                                    ${sCloseBtn}
                                    <div class="ModalBoxDetailBigButton"></div>
                                </div>
                            </div>`);
  for (let i in buttonBig) {
    $(".ModalBoxDetailBigButton").append(` <button id="${buttonBig[i]["buttonId"]}" class="${buttonBig[i]["buttonClass"]} ModalBoxButton">
                                                ${buttonBig[i]["buttonText"]}
                                            </button>`);
  }

  // 按 X 關掉
  $(".closeModalBoxBig").click(function() {
    $(".ModalBoxBig").hide();
  });

  // 20210914: Hugh: 此功能暫時不使用
  // $('.ModalBoxBig').off('click');
  // $('.ModalBoxBig').on('click', function() {
  //     if ('ModalBoxBig' === event.target.className) {
  //         $(".ModalBoxBig").hide();
  //     }
  // });
}
// ---ModalBoxBig End---


// ---下拉多選---
function pluralSelected(options, optionSelected, inputdata) {
  // 新增下拉資料
  // for (let i in inputdata) {
  // 	var inputText = inputdata[i]["text"];
  // 	inputText = inputText.toLowerCase();
  // 	$(options).append(`<li class="wrap" data-index="${inputText}"><label><input type="checkbox" id="${inputdata[i]["id"]}" />${inputdata[i]["text"]}</label></li>`);
  // };
  for (let i in inputdata) {
    var inputText = inputdata[i]["text"];
    inputText = inputText.toLowerCase();
    if (inputdata[i]["className"]) {
      var className = inputdata[i]["className"];
    } else {
      var className = '';
    }
    if (inputdata[i]["type"] && inputdata[i]["type"] == 'textonly') {
      $(options).append(`<li class="wrap ${className}" data-index="${inputText}"><label>${inputdata[i]["text"]}</label></li>`);
    } else if (inputdata[i]["type"] && inputdata[i]["type"] == 'withspan') {
      $(options).append(`<li class="wrap ${className}" data-index="${inputText}"><input type="checkbox" id="${inputdata[i]["id"]}" /><label for="${inputdata[i]["id"]}">${inputdata[i]["text"]}<span>${inputdata[i]["spantext"]}</span></label></li>`);
    } else {
      $(options).append(`<li class="wrap ${className}" data-index="${inputText}"><input type="checkbox" id="${inputdata[i]["id"]}" /><label for="${inputdata[i]["id"]}">${inputdata[i]["text"]}</label></li>`);
    }
  };

  $(options).hide();
  $(optionSelected).click(function() {
    if ($(options).is(":hidden")) {
      $(options).show();
    }
  });
  $(document).click(function() {
    if ($(options).is(":visible")) {
      $(options).hide();
    }
  });

  $(optionSelected).click(function(e) {
    e.stopPropagation();
  });
  $(options).click(function(e) {
    e.stopPropagation();
  });

  $(options + " > li > input[type=checkbox]").change(function() {
    $(optionSelected).children("#placeholder").remove();
    id = this.id;
    item = $('#' + id).parent().text()
    if (this.checked) { //勾選
      $('#' + id).closest("li").css("background-color", "#BDDCB8");
      $(optionSelected).children("#deleteAll").before(`<span class="tag" id="tag_${id}" onclick="deleteTag('${id}','${options}', '${optionSelected}')">${item}<i class="fas fa-times"></i></span>`);
    } else { //未勾選
      $('#' + id).closest("li").css("background-color", "#FFF");
      $('#tag_' + id).remove();
    }
    setOptionSelected(options, optionSelected);
  });
}

// 下拉多選 - 競賽專區
function pluralSelectedContest(options, optionSelected, inputdata) {
  // 新增下拉資料
  for (let i in inputdata) {
    var inputText = inputdata[i]["text"];
    inputText = inputText.toLowerCase();
    if (inputdata[i]["className"]) {
      var className = inputdata[i]["className"];
    } else {
      var className = '';
    }
    if (inputdata[i]["type"] && inputdata[i]["type"] == 'textonly') {
      $(options).append(`<li class="wrap ${className}" data-index="${inputText}"><label>${inputdata[i]["text"]}</label></li>`);
    } else if (inputdata[i]["type"] && inputdata[i]["type"] == 'withspan') {
      $(options).append(`<li class="wrap ${className}" data-index="${inputText}"><label><input type="checkbox" id="${inputdata[i]["id"]}" />${inputdata[i]["text"]}<span>${inputdata[i]["spantext"]}</span></label></li>`);
    } else {
      $(options).append(`<li class="wrap ${className}" data-index="${inputText}"><label><input type="checkbox" id="${inputdata[i]["id"]}" />${inputdata[i]["text"]}</label></li>`);
    }
  };

  $(options).hide();
  $(optionSelected).click(function() {
    if ($(options).is(":hidden")) {
      $(options).show();
    }
  });
  $(document).click(function() {
    if ($(options).is(":visible")) {
      $(options).hide();
    }
  });

  $(optionSelected).click(function(e) {
    e.stopPropagation();
  });
  $(options).click(function(e) {
    e.stopPropagation();
  });

  $(options + " > li > label > input[type=checkbox]").change(function() {
    $(optionSelected).children("#placeholder").remove();
    id = this.id;
    item = $('#' + id).parent().text()
    if ($('#' + id).parent().has('span').length > 0) {
      item = $('#' + id).parent().parent().data('index');
    }
    if (this.checked) { //勾選
      $(options + ' #' + id).closest("li").css("background-color", "#BDDCB8");

      $(optionSelected).children("#deleteAll").before(`<span class="tag" id="tag_${id}" onclick="deleteTag('${id}','${options}', '${optionSelected}')">${item}<i class="las la-times"></i></span>`);
    } else { //未勾選
      $(options + ' #' + id).closest("li").css("background-color", "#FFF");
      $(optionSelected + ' #tag_' + id).remove();
    }
    setOptionSelected(options, optionSelected);
  });
}

function deleteAllTag(options, optionSelected) {
  $(optionSelected + " span").remove();
  $(options + "> li > label > input[type=checkbox]:checked").click();
  // $(options + "> li > label > input[type=checkbox]").prop("checked", false);
  // $(options + " > li ").css("background-color", "#FFF");
  // setOptionSelected(options, optionSelected, 1);
}

function setOptionSelected(options, optionSelected) {
  if ($(optionSelected).children().length === 1) {
    $(optionSelected).append('<span id="placeholder">請選擇</span>');
    $(optionSelected).css({
      "background-image": "url('../images/product-select.png')",
      "padding-right": "27px",
      "background-repeat": "no-repeat",
      "background-position": "98% 55%"
    });
    $(`${optionSelected} #deleteAll`).empty();
  } else {
    $(optionSelected).css({
      "background": "none",
      "padding-right": "5px"
    });
    if ($(optionSelected).children("#deleteAll").children().length === 0) {
      $(optionSelected).children("#deleteAll").append(`<span class="spanNote" onclick="deleteAllTag('${options}', '${optionSelected}')"><i class="fas fa-trash-alt"></i><span>刪除全部</span></span>`);
    }
  }
}

function deleteTag(id, options, optionSelected) {
  $('#tag_' + id).remove();
  $('#' + id).click();
  // $('#' + id).prop("checked", false);
  // $('#' + id).closest("li").css("background-color", "#FFF");
  setOptionSelected(options, optionSelected);
}
// ---下拉多選 End---


// ---繪畫板---
function drawPad(bgImage = '', bCloseBtn = true, canUseCapture = false) {
  drawPadHtml(bCloseBtn, canUseCapture);
  var canvas = document.getElementById('adlCanvas');
  var context = canvas.getContext('2d');
  var drawing = false;
  var queue = [];
  var start = [];
  var tool = $C(context);
  var lineWidthText;
  var isMobile = false;

  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }

  // 載入時清除(空白或截圖)
  backgroundImage.src = (bgImage != '') ? bgImage.src : '';
  if (bgImage != '') {
    $(function() {
      tool.drawType = 'clear';
      tool.do(clear);
      tool.drawType = 'freestyle';
    });
  } else {
    tool.drawType = 'fillColor';
    tool.do(fillColor);
    tool.drawType = 'freestyle';
  }

  // drawing tool setup
  if (tool.lineWidth < 10) {
    lineWidthText = '0' + tool.lineWidth;
  } else {
    lineWidthText = tool.lineWidth;
  }
  $('.linewidthNote').html(lineWidthText + 'px');
  tool.on('drawType', function(v) {
    if (v === 'drawText') {
      $('.toolsFont').css('display', 'flex');
      tool.fontSize = $('#fontsize').val() + 'px';
      $('.fontsizeNote').html(tool.fontSize);
    } else {
      $('.toolsFont').hide();
    }
    $('.toolsButton button').removeClass('beChosen');
    $('#' + v).addClass('beChosen');
  });
  tool.lineCap = 'round';
  tool.lineJoin = 'round';
  tool.lineWidth = 1;

  // color picker setup
  $('#colorPick').colorPicker({
    pickerDefault: 'ffffff',
    onColorChange: function(id, val) {
      tool.fillStyle = val;
      tool.strokeStyle = val;
    }
  });

  // keyin setup
  tool.on('fillStyle', function(val) {
    $('#keyin').css('color', val);
  });
  tool.on('font', function(val) {
    $('#keyin').css('font', val);
  });
  $('#keyin').bind('keypress', function(e) {
    if (e.which == '13') {
      tool.do($(this).val(), start[0], start[1]);
      start = [];
      drawing = false;
      $(this).css('display', 'none');
      $(this).val('');
      addHistory();
    }
  });

  // mouse
  canvas.addEventListener('mousedown', drawingStart);
  canvas.addEventListener('mousemove', drawingMove);
  canvas.addEventListener('mouseup', drawingEnd);
  canvas.addEventListener('mouseleave', drawingLeave);
  // touch
  canvas.addEventListener('touchstart', drawingStart);
  canvas.addEventListener('touchmove', drawingMove);
  canvas.addEventListener('touchend', drawingEnd);
  canvas.addEventListener('touchcancel', drawingLeave);

  //drawing dom event
  function drawingStart(e) {
    e.preventDefault();
    drawImage.src = canvas.toDataURL('image/png');
    if (!drawing && tool.drawType === 'drawText') {
      e.stopPropagation();
      var offset = $('#adlCanvas').offset();
      tool.ctx.textBaseline = 'middle';
      if (isMobile) {
        $('#keyin').css('left', e.changedTouches[0].pageX - offset.left + 22 + 'px');
        $('#keyin').css('top', e.changedTouches[0].pageY - offset.top - $('#keyin').innerHeight() / 2 + 55 + 'px');
      } else {
        $('#keyin').css('left', e.offsetX + 22 + 'px');
        $('#keyin').css('top', e.offsetY - $('#keyin').innerHeight() / 2 + 55 + 'px');
      }
      $('#keyin').show();
      $('#keyin').focus();
      drawing = true;
      if (isMobile) {
        start = [e.changedTouches[0].pageX - offset.left, e.changedTouches[0].pageY - offset.top];
      } else {
        start = [e.pageX - offset.left, e.pageY - offset.top];
      }
    }
    if (tool.drawType !== 'drawText') {
      $('#keyin').hide();
    }
    if (!drawing && tool.drawType !== 'drawText') {

      $(this).data('cursor', $(this).css('cursor'));
      $(this).css('cursor', 'pointer');
      drawing = true;
      if (tool.drawType == 'strokeRect' ||
        tool.drawType == 'fillRect' ||
        tool.drawType == 'strokeCircle' ||
        tool.drawType == 'fillCircle' ||
        tool.drawType == 'strokeEclipse' ||
        tool.drawType == 'fillEclipse' ||
        tool.drawType == 'straightLine' ||
        tool.drawType == 'clear' ||
        tool.drawType == 'undo' ||
        tool.drawType == 'redo') {
        tool.pushCanvas();
      }
      var offset = $(e.currentTarget).offset()
      if (isMobile) {
        var x = e.changedTouches[0].pageX - offset.left;
        var y = e.changedTouches[0].pageY - offset.top;
      } else {
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;
      }

      tool.do(x, y, x, y);
      queue.push([x, y]);
    }
  }

  function drawingMove(e) {
    e.preventDefault();
    if (drawing && tool.drawType !== 'drawText') {
      var old = queue.shift();
      if (tool.drawType == 'strokeRect' ||
        tool.drawType == 'fillRect' ||
        tool.drawType == 'strokeCircle' ||
        tool.drawType == 'fillCircle' ||
        tool.drawType == 'strokeEclipse' ||
        tool.drawType == 'fillEclipse' ||
        tool.drawType == 'straightLine' ||
        tool.drawType == 'clear' ||
        tool.drawType == 'undo' ||
        tool.drawType == 'redo') {
        tool.restoreCanvas();
        queue.push(old);
      }
      var offset = $(e.currentTarget).offset();
      if (isMobile) {
        var x = e.changedTouches[0].pageX - offset.left;
        var y = e.changedTouches[0].pageY - offset.top;
      } else {
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;
      }
      tool.do(old[0], old[1], x, y);
      if (tool.drawType == 'freestyle' ||
        tool.drawType == 'eraser') {
        queue.push([x, y]);
      }
    }
  }

  function drawingEnd(e) {
    if (drawing && tool.drawType === 'drawText') {
      drawing = false;
    }
    if (drawing && tool.drawType !== 'drawText') {
      $(this).css('cursor', $(this).data('cursor'));
      tool.dropCanvas();
      var old = queue.shift();
      var offset = $(e.currentTarget).offset();
      if (isMobile) {
        var x = e.changedTouches[0].pageX - offset.left;
        var y = e.changedTouches[0].pageY - offset.top;
      } else {
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;
      }
      tool.do(old[0], old[1], x, y);
      drawing = false;
    }
    if (tool.drawType !== 'undo' && tool.drawType !== 'redo' && tool.drawType !== 'drawText') {
      addHistory();
    }
  }

  function drawingLeave(e) {
    if (drawing && tool.drawType !== 'drawText') {
      $(this).css('cursor', $(this).data('cursor'));
      tool.dropCanvas();
      var old = queue.shift();
      var offset = $(e.currentTarget).offset();
      if (isMobile) {
        var x = e.changedTouches[0].pageX - offset.left;
        var y = e.changedTouches[0].pageY - offset.top;
      } else {
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;
      }
      tool.do(old[0], old[1], x, y);
      drawing = false;
    }
  }


  // tool panel event
  $('#linewidth').bind('change', function() {
    tool.lineWidth = $(this).val();
    if (tool.lineWidth < 10) {
      lineWidthText = '0' + tool.lineWidth;
    } else {
      lineWidthText = tool.lineWidth;
    }
    $('.linewidthNote').html(lineWidthText + 'px');
  });
  $('#freestyle').bind('click', function() {
    tool.drawType = 'freestyle';
  });
  $('#strokeRect').bind('click', function() {
    tool.drawType = 'strokeRect';
  });
  $('#fillRect').bind('click', function() {
    tool.drawType = 'fillRect';
  });
  $('#strokeCircle').bind('click', function() {
    tool.drawType = 'strokeCircle';
  });
  $('#fillCircle').bind('click', function() {
    tool.drawType = 'fillCircle';
  });
  // $('#strokeEclipse').bind('click', function() {
  //     tool.drawType = 'strokeEclipse';
  // });
  // $('#fillEclipse').bind('click', function() {
  //     tool.drawType = 'fillEclipse';
  // });
  $('#drawText').bind('click', function() {
    tool.drawType = 'drawText';
  });
  $('#fontface').bind('change', function() {
    tool.fontFace = $(this).val();
  });
  $('#fontsize').bind('change', function() {
    tool.fontSize = $(this).val() + 'px';
    $('.fontsizeNote').html(tool.fontSize);
  });
  $('#fontweight').bind('change', function() {
    tool.fontWeight = $(this).val();
  });
  $('#fontstyle').bind('change', function() {
    tool.fontStyle = $(this).val();
  });
  $('#eraser').bind('click', function() {
    tool.drawType = 'eraser';
  });
  $('#straightLine').bind('click', function() {
    tool.drawType = 'straightLine';
  });
  $('#clear').bind('click', function() {
    tool.drawType = 'clear';
    tool.do(clear);
  });
  $('#undo').bind('click', function() {
    tool.drawType = 'undo';
    tool.do(undo);
  });
  $('#redo').bind('click', function() {
    tool.drawType = 'redo';
    tool.do(redo);

  });
  $('#save').bind('click', function() {
    tool.drawType = 'save';
    let dataUrl = canvas.toDataURL('image/png');
    saveDrawPadUrl(dataUrl);
    tool.drawType = 'freestyle';
  });

  // 記錄歷史(操作)
  function addHistory() {
    let dataUrl = canvas.toDataURL('image/png');
    let length = historyUrls.length;
    historyUrlsIndex = historyUrls.length - 1;
    if (dataUrl === historyUrls[historyUrlsIndex]) {

    } else {
      historyUrls.push(dataUrl);
      if (length > 10) {
        historyUrls = historyUrls.slice(-10, length);
      }
    }
  }
}

function saveDrawPadUrl(dataUrl) {
}

function drawPadHtml(bCloseBtn) {
  let video = document.getElementById('examVideo_html5_api');
  
  if (canUseCapture) {
    windowW = window.innerWidth * 0.8;
    windowH = (video.videoHeight * window.innerWidth)/video.videoWidth * 0.8;
    if((window.innerHeight - 200) < windowH){
      windowW = (window.innerWidth - 200) * 0.6;
      windowH = (video.videoHeight * (window.innerWidth - 200)) / video.videoWidth * 0.6;
    }
  } else {
    windowW = window.innerWidth * 0.9;
    windowH = window.innerHeight * 0.72;
  }
  $(".ModalBox").css('display', 'flex');
  let sCloseBtn = bCloseBtn ? '<div class="trigger closeModalBox"><i class="fas fa-times"></i></div>' : '';
  // 暫不加入橢圓形，有需要請加入下方toolsButton內
  // <button id='strokeEclipse'><i class="far fa-stop-circle"></i></button>
  // <button id='fillEclipse'><i class="fas fa-stop-circle"></i></button>
  $(".ModalBox").html(`   <div class='panel class-list4'>
								${sCloseBtn}
                                <canvas id="adlCanvas" width='${windowW}' height='${windowH}'></canvas>
                                <div class='tools' id='tools'>
                                    <div class="toolsColorAndWidth displayFlex-drawPad">
                                        <div class="toolsColor">
                                            <div><input type='text' id='colorPick' name='colorPick' value='#000000'></div>
                                        </div>
                                        <div class="toolsWidth displayFlex-drawPad">
                                            <p>大小:</p>
                                            <input type="range" min="1" max="20" value="1" id="linewidth">
                                            <p class="linewidthNote"></p>
                                        </div>
                                    </div>
                                    <div class="toolsButton displayFlex-drawPad">
                                        <button id="freestyle" class="beChosen"><i class="fas fa-pencil-alt"></i></button>
                                        <button id='straightLine'><i class="fas fa-slash"></i></button>
                                        <button id='strokeRect'><i class="far fa-square"></i></button>
                                        <button id='fillRect'><i class="fas fa-square"></i></button>
                                        <button id='strokeCircle'><i class="far fa-circle"></i></button>
                                        <button id='fillCircle'><i class="fas fa-circle"></i></button>
                                        <button id='drawText'><i class="fas fa-font"></i></button>
                                        <button id='eraser'><i class="fas fa-eraser"></i></button>
                                        <button id='undo'><i class="fas fa-reply"></i></button>
                                        <button id='redo'><i class="fas fa-share"></i></button>
                                        <button id='clear'><i class="fas fa-trash-alt"></i></button>
                                        <button id='save'><i class="far fa-save"></i>儲存</button>
                                    </div>
                                    <div class="toolsFont displayFlex-drawPad">
                                        <label for='fontface'>字體: </label>
                                        <select id='fontface'>
                                            <option value='sans-serif'>sans-serif</option>
                                            <option value='serif'>serif</option>
                                            <option value='cursive'>cursive</option>
                                            <option value='fantasy'>fantasy</option>
                                            <option value='monospace'>monospace</option>
                                        </select>
                                        <label>文字大小: </label>
                                        <input type="range" min="36" max="84" value="36" id="fontsize">
                                        <p class="fontsizeNote"></p>
                                        <label>粗體: </label>
                                        <select id='fontweight'>
                                            <option value='400'>一般</option>
                                            <option value='700'>粗體</option>
                                        </select>
                                        <label>斜體: </label>
                                        <select id='fontstyle'>
                                            <option value='normal'>一般</option>
                                            <option value='italic'>斜體</option>
                                        </select>
                                    </div>
                                    <input type='text' id='keyin' size='20'>
                                </div>
    `);
  // 按 X 關掉
  $(".closeModalBox").click(function() {
    const title = '<i class="fas fa-exclamation-triangle warningIcon"></i>';
    const sHtml = '是否放棄此次截圖紀錄?';
    const buttonBig = [{
      buttonText: "確認不紀錄",
      buttonClass: "closeDrawPad btn07 closeModalBoxBig"
    }, {
      buttonText: "取消並繼續",
      buttonClass: "btnCancel closeModalBoxBig"
    }];
    modalBoxBig(title, sHtml, buttonBig, false);

    // $('.ModalBoxBig').css('z-index', '101');
    // 影片進度條index1001
    $('.ModalBoxBig').css('z-index', '1003');

    $('.closeDrawPad').click(function() {
      closeDrawPad();
    })
  });
}

function closeDrawPad() {
  $(".ModalBox").hide();
  historyUrls = [];
}
// ---繪畫板 End---


// ---影片截圖---
function captureImage(videoId = 'examVideo_html5_api', canUseCapture) {
  let video = document.getElementById(videoId);
  let canvas = document.createElement("canvas");
  let img = document.createElement("img");
  let ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  img.crossOrigin = "anonymous";
  img.src = ctx.canvas.toDataURL('data:image/jpeg', 0.5);
  drawPad(img, canUseCapture);
  video.pause();
}
// ---影片截圖 End---

// ---div截圖--- div需先存承svg
// function 10Div(divId) {
//     let imageDiv = document.getElementById(divId);
//     let canvas = document.createElement("canvas");
//     let img = document.createElement("img");
//     let ctx = canvas.getContext("2d");
//     canvas.width = imageDiv.clientWidth;
//     canvas.height = imageDiv.clientHeight;
//     ctx.drawImage(imageDiv, 0, 0, canvas.width, canvas.height);
//     img.src = canvas.toDataURL();
//     drawPad(img);
// }
// ---div截圖 End---