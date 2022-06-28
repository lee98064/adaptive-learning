$(document).ready(function() {
	// 篩選資料
	$('.selector ul').hide();

	$(document).on('click', '.filterBar > i', function() {
		$('.filterBar .filterCondition').addClass('positionAbsolute');
		$(this).hide();
	});

	$(document).on('click', 'body', function() {
		$('.selector').children().not('span').hide();
		$('.selector').removeClass('listView')
	});

	$(document).on('click', '.selector', function(event) {
		event.stopPropagation();
	});

	$(document).on('click', '.selector .valueShow', function() {
		if (!$(this).parent().hasClass('unableSelector')) {
			$('.selector').children().not('span').hide();

			if (!$(this).parent().hasClass('listView')) {
				$('.selector').removeClass('listView')
				$('.filterBar .selector').removeClass('listView')
				$(this).parent().addClass('listView');
				$(this).siblings('ul').show();
			} else {
				$(this).parent().removeClass('listView');
			}
		}
	});

	$(document).on('click', '.listView li', function() {
		$(this).parent().siblings('.valueShow').text($(this).text());
		$(this).parent().siblings('.valueShow').data('value', $(this).data('value'));
		$(this).parent().hide();
		$('.selector').removeClass('listView')
	});

	$(document).on('click', '.filterBar .filterCancel', function() {
		$('.filterBar .filterCondition').removeClass('positionAbsolute');
		$('.filterBar > i').show();
	});
	// 篩選資料End

	// 分頁頁碼切換
	$(document).on('click', '.paginationWrap li', function() {
		var newPage = 1;
		switch ($(this).attr('class')) {
			case 'prevPage':
				newPage = parseInt($('.paginationWrap li.active').text()) - 1;
				break;
			case 'nextPage':
				newPage = parseInt($('.paginationWrap li.active').text()) + 1;
				break;
			case 'prevMore':
				newPage = parseInt($('.paginationWrap li.active').text()) - 4;
				break;
			case 'nextMore':
				newPage = parseInt($('.paginationWrap li.active').text()) + 4;
				break;
			default:
				newPage = parseInt($(this).text());
		}
		var totalPage = parseInt($('.paginationWrap li:not(.nextPage)').last().text());
		var pageContent = getPagination(newPage, totalPage);
		$(this).parentsUntil('div').empty().append(pageContent);
	});

	// 頁籤切換
	$('.pageTab .pageTabContent > div:not(:first-child)').hide();
	$(document).on('click', '.pageTab .pageTabList li', function() {
		if (!$(this).hasClass('unableTab')) {
			$('.pageTab .pageTabList li').removeClass('actTab');
			$(this).addClass('actTab');
			$('.pageTab .pageTabContent > div').hide();
			$(`.pageTab .pageTabContent > div[id=${$(this).data('page')}]`).show();
		}
	});
	// 頁籤切換End

	// 顯示切換
	// $(document).on('click', '.displaySwitch .displaySwitchTitle span.switchSpan i', function() {
	$(document).on('click', '.displaySwitch span.switchSpan i', function() {
		$(this).siblings('i').removeClass('actIcon');
		$(this).addClass('actIcon');

		if ($(this).hasClass('fa-th-large')) {
			$('.displaySwitch .displaySwitchContent').addClass('column4');
			$('.displaySwitch .displaySwitchContent').removeClass('flexWrap column1');
		} else {
			$('.displaySwitch .displaySwitchContent').removeClass('column4');
			$('.displaySwitch .displaySwitchContent').addClass('flexWrap column1');
		}
	});
	// 顯示切換End

	// 步驟式
	$('.stepTab .stepTabContent > div:not(:first-child)').hide();
	$(document).on('click', '.stepTab .stepTabList li', function() {
		if (!$(this).hasClass('unableStep')) {
			$('.stepTab .stepTabList li').removeClass('actStep');
			$(this).addClass('actStep');
			$('.stepTab .stepTabContent > div').hide();
			$(`.stepTab .stepTabContent > div[id=${$(this).data('step')}]`).show();
		}
	});
	// 步驟式End



	$('.toolTip').on('click', function (e) {
		//判斷點擊課程列表後展示清單，但點上方menu不關閉清單
		if (!($(e.target).parents().hasClass("clearfix")) && !($(e.target).parents().hasClass("item"))) {
			if ($('.toolTip').children('.toolTipText').css('opacity') == '0') {
				$('.toolTip').children('.toolTipText').css({
					'visibility': 'visible',
					'opacity': '1'
				});
			} else if ($('.toolTip').children('.toolTipText').css('opacity') == '1' && !$('.toolTip').children('.toolTipText').hasClass('filterColumn')) {
				$('.toolTip').children('.toolTipText').css({
					'visibility': 'hidden',
					'opacity': '0'
				});
			}
		}else{
			var $target = $(e.target);
			if ($target.is("dt") && $target.hasClass("zooms")){
				// if ($target.is("dt") && $target.parents().is("tvedbList")){
				// console.log('130');
				// console.log($target.next("dd"));
				$target.next("dd").toggle();
				// $target.dd.style.visibility = "visible "; 
                                $target.children("i").toggleClass("fa-caret-down").toggleClass("fa-caret-up");
			}
			if ($target.is("i")){
                                $target.parent().click();
			}
			console.log(e.target);
			// window.location.hash = "spical";

			// console.log($(e.target).attr('href'));
			// scrollToElement($(e.target).attr('href'), 2000);


			
			var vItem_id = $(e.target)[0].id;
			// console.log(vItem_id);
			// window.location.hash = "";
			// window.location.hash = vItem_id;
			// $('.course-main ').scrollTop($('#' + vItem_id).offset().top - ($('.header.clearfix')[0].clientHeight + $('header').height()));
			// $('.course-main > .container ').scrollTop($('#' + vItem_id).offset().top );
			// $('.course-main > .container').animate({ scrollTop: $('#' + vItem_id).offset().top }, 800);
			console.log($('.header.clearfix')[0].clientHeight + "_" + $('header').height() + "_" + $('.container').outerHeight(true) + "_" + $('.container').outerHeight());
			// $('.course-main').animate({ scrollTop: $(vItem_id).offset().top - ($('.header.clearfix')[0].clientHeight + $('header').height() + $('.container').outerHeight(true) - $('.container').outerHeight()) }, 200);
                        
                        $('.course-main').animate({ scrollTop: $(vItem_id).offset().top - $('.course-main').offset().top + $('.course-main').scrollTop() }, 200, function() {
                       setTimeout(function(){
                         $("li.active").removeClass("active");
                         $("." + $(vItem_id).attr('id')).addClass("active");
                       }, 20);
                    });
                       

			// $('.course-main > .container').animate({ scrollTop: $('#' + vItem_id+'List').offset().top }, 800);

			// window.location.hash="";
			// window.location.hash="spical"; 
			// var t = window.location.hash;
			// window.location.hash = t;
		}
	});

	// 提示訊息框
	// $(document).on('click', '.toolTip', function() {
	// 	$('.toolTipText').css({
	// 		'visibility': 'hidden',
	// 		'opacity': '0'
	// 	});
	// 	console.log($(this));
	// 	if ($(this).children('.toolTipText').css('opacity') == '0') {
	// 		$(this).children('.toolTipText').css({
	// 			'visibility': 'visible',
	// 			'opacity': '1'
	// 		});
	// 	} else if ($(this).children('.toolTipText').css('opacity') == '1' && !$(this).children('.toolTipText').hasClass('filterColumn')) {
	// 		$(this).children('.toolTipText').css({
	// 			'visibility': 'hidden',
	// 			'opacity': '0'
	// 		});
	// 	}
	// });

	// 提示訊息框Hover
	$(document).on('mouseover', '.toolTipHover', function() {
		$('.toolTipText').css({
			'visibility': 'hidden',
			'opacity': '0'
		});
		$(this).children('.toolTipText').css({
			'visibility': 'visible',
			'opacity': '1'
		});
	});
	$(document).on('mouseout', '.toolTipHover', function() {
		$(this).children('.toolTipText').css({
			'visibility': 'hidden',
			'opacity': '0'
		});
	});
});

function getActivePage(clickItem = '') {
	if (clickItem == '') {
		return $('.paginationWrap li.active').eq(0).data('pagenum');
	} else {
		if ($(clickItem).attr('class')) {
			switch ($(clickItem).attr('class')) {
				case 'prevPage':
					return parseInt($('.paginationWrap li.active').text()) - 1;
					break;
				case 'nextPage':
					return parseInt($('.paginationWrap li.active').text()) + 1;
					break;
				case 'prevMore':
					return parseInt($('.paginationWrap li.active').text()) - 4;
					break;
				case 'nextMore':
					return parseInt($('.paginationWrap li.active').text()) + 4;
					break;
				default:
					return parseInt($(clickItem).data('pagenum'));
			}
		} else {
			return parseInt($(clickItem).data('pagenum'));
		}
	}
}

function getPagination(activePage, totalPage) {
	activePage = parseInt(activePage);
	var str = `<li class="active" data-pagenum="${activePage}">${activePage}</li>`;

	for (var i = 1; i <= 3; i++) {
		if ((activePage - i) > 1) {
			str = `<li data-pagenum="${activePage - i}">${activePage - i}</li>` + str;
		}
		if ((activePage + i) < totalPage) {
			str = str + `<li data-pagenum="${activePage + i}">${activePage + i}</li>`;
		}
	}

	if ((activePage - 3) > 1) {
		str = '<li class="prevMore">...</li>' + str;
	}

	if (activePage > 1) {
		str = '<li class="prevPage">上一頁</li><li data-pagenum="1">1</li> ' + str;
	}

	if ((activePage + 3) < totalPage) {
		str = str + '<li class="nextMore">...</li>';
	}

	if (activePage < totalPage) {
		str = str + `<li data-pagenum="${totalPage}">${totalPage}</li><li class="nextPage">下一頁</li>`;
	}

	return str;
}
// 分頁頁碼切換End
