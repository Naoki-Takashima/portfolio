$(function () {
	//cookieからタイプを取得
	// function getCookieObject() {
	// 	let cookieObj = {};
	// 	if (document.cookie !== '') {
	// 		const cookies = document.cookie.split('; ');
	// 		for (var i = 0; i < cookies.length; i++) {
	// 			const cookie = cookies[i].split('=');
	// 			const key = cookie[0];
	// 			const value = decodeURIComponent(cookie[1]);
	// 			cookieObj[key] = value;
	// 		}
	// 	}
	// 	return cookieObj;
	// }
	// cookieObj = getCookieObject();
	// const type = cookieObj.tp;
	// if(type == 0)return;
	if (navigator.userAgent.indexOf('magaseek_android_app_2017') != -1 ) {
		$('#swipe_navigation_tab').addClass('android');
	}
	var tabs = $('.swipe-navigation-tab-item');
	var defaultTab = $('.swipe-navigation-tab-item[data-tab-id="rankAll"]');
	tabs.on('click', function() {
		var tab = $(this);
		if (tab.hasClass('active')) {
			return;
		}
		tabs.removeClass('active');
		tab.addClass('active');
		var tabId = tab.attr('data-tab-id');
		var data_ga = tab.attr('data-param');
		var apiUrl = getApiUrl(tabId);
		$('#rankWrap').empty();
		// APIから情報を取得して表示する処理
		$.ajax({
			type: 'GET',
			url: apiUrl,
			cache: false,
			dataType: 'jsonp',
			crossDomain: true,
			timeout: 1000,
		})
		.then(function(data) {
			// 取得した情報を表示する処理
			displayData(data, data_ga);
			const activeTab = document.querySelector('.swipe-navigation-tab-item.active');
			const leftBound = activeTab.offsetLeft;
			const container = document.querySelector('.swipe-navigation-tab-list');
			function scrollToPosition(position, duration) {
				const start = container.scrollLeft;
				const change = position - start;
				const increment = 20;
				let currentTime = 0;
				function animateScroll() {
					currentTime += increment;
					const val = easeInOutQuad(currentTime, start, change, duration);
					container.scrollLeft = val;
					if (currentTime < duration) {
						requestAnimationFrame(animateScroll);
					}
				}
				animateScroll();
			}
			// イージング関数
			function easeInOutQuad(t, b, c, d) {
				t /= d / 2;
				if (t < 1) return (c / 2) * t * t + b;
				t--;
				return (-c / 2) * (t * (t - 2) - 1) + b;
			}
			// 任意の位置にスクロールする例（アニメーション効果を追加）
			scrollToPosition(leftBound - 15, 200); // 位置: leftBound - 15, アニメーションの期間: 1000ミリ秒
		},
		function () {
			$('#rankWrap').append('<p class="error">ランキングの取得に失敗しました。通信環境の良い場所で再度お試しください。</p>')
			return false;
		}
		);
	});
	if (tabs.filter('.active').length === 0) {
		defaultTab.trigger('click');
	}
	// 初期タブの情報を取得して表示する
	tabs.first().trigger('click');
	// 各タブに対応するAPIのURLを取得する関数
	function getApiUrl(tabId) {
		switch(tabId){
			case "rankAll": return 'https://magaseek.snva.jp/api/recommend/rule/?k=57PdXdhMMXFAg&tmpl=55&lang_type=jsonp&output_type=2&format_type=2';
			case "rankTops": return 'https://magaseek.snva.jp/api/recommend/rule/?k=57PdXdhMMXFAg&tmpl=59&lang_type=jsonp&output_type=2&format_type=2';
			case "rankOnepi": return 'https://magaseek.snva.jp/api/recommend/rule/?k=57PdXdhMMXFAg&tmpl=58&lang_type=jsonp&output_type=2&format_type=2';
			case "rankOuter": return 'https://magaseek.snva.jp/api/recommend/rule/?k=57PdXdhMMXFAg&tmpl=60&lang_type=jsonp&output_type=2&format_type=2';
			case "rankSkirt": return 'https://magaseek.snva.jp/api/recommend/rule/?k=57PdXdhMMXFAg&tmpl=61&lang_type=jsonp&output_type=2&format_type=2';
			case "rankPants": return 'https://magaseek.snva.jp/api/recommend/rule/?k=57PdXdhMMXFAg&tmpl=62&lang_type=jsonp&output_type=2&format_type=2';
			case "rankShoes": return 'https://magaseek.snva.jp/api/recommend/rule/?k=57PdXdhMMXFAg&tmpl=63&lang_type=jsonp&output_type=2&format_type=2';
			case "rankBag": return 'https://magaseek.snva.jp/api/recommend/rule/?k=57PdXdhMMXFAg&tmpl=64&lang_type=jsonp&output_type=2&format_type=2';
		}
	}
	// 取得したデータを表示する処理
	function displayData(data, data_ga) {
		var productList ='<div id = "rankWBox" class="product-list-holder more-list"><ul id="rankList" class="product-list product-list-lazy productList"></ul></div>';
		$('#rankWrap').append(productList);
		var itemList = data.items;
		for(var i = 0; i < itemList.length; i++){
			var url = itemList[i].url;
			url = url.replace('https://www.magaseek.com', '');
			var img = itemList[i].img_url;
			var match = img.match(/(...)(?=\.jpg)/);
			var colorCode = match[0];
			var name = itemList[i].name;
			var price = Number(itemList[i].price);
			var prev_price = Number(itemList[i].prev_price);
			var pricedown = (prev_price > price) ? 'special-' : '';
			var content = itemList[i].content;
			var rankNum = i + 1;
			var itemCode = itemList[i].item_code.replace('P_','')
			var viewNum = 9;
			var HTML ='<li class="product-item">';
					HTML += '<div class="inner">',
					HTML += '<a href="'+ url + '" data-ga="' + data_ga + '">',
					HTML += '<figure class="product-pic">',
					HTML += '<img src="'+ img +'?sr.dw=214" data-original="'+ img +'?sr.dw=214" alt="'+ content +'">',
					HTML += '<span class="rank-num rank'+ rankNum +'">'+ rankNum +'</span>',
					HTML += '</figure>',
					HTML += '</a>',
					HTML += '<div class="product-info">',
					HTML += '<p class="brand">'+ name +'</p>',
					HTML += '<ul>',
					HTML += '<li class="'+ pricedown +'price">¥'+ price.toLocaleString() +'</li>',
					HTML += '</ul>',
					HTML += '</div>',
					HTML += '</div>',
					HTML += '</li>';
			$('#rankWrap').find('.productList').append(HTML);
		}
		var $this = $('#rankWrap');
		var item = $this.find('#rankList .product-item');
		var num = viewNum - 1;
		if (item.length > viewNum) {
			$('.product-item' + ':gt(' + num + ')', $this).wrapAll('<div class="moreList">');
			$this.find('.moreList').after('<div class="moreBtn" data-open-text="' + 'MORE' + '" data-close-text="CLOSE">' + 'MORE' + '</div>');
		}
	}
	//ランキングアコーディオン
	$(document).on('click', '#rankWrap .moreBtn', function(){
    var currentPosition = $(window).scrollTop();
	  var contentHeight = $(this).prev('.moreList').outerHeight();
		if ($(this).hasClass('active')) {
			$(this).prev('.moreList').slideUp();
			$(this).removeClass('active').text($(this).data('open-text'));
      $('html, body').animate({
          scrollTop: currentPosition - contentHeight
      }, 400);
		} else {
			$(this).prev('.moreList').slideDown();
			$(this).addClass('active').text($(this).data('close-text'));
		}
	});
});