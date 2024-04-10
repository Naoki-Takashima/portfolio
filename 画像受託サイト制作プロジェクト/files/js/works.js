$(function(){
	//memberを自動でスクロールさせる
	var $memberItem = $('.memberList li'),
		memberItemLen = $memberItem.length;
		windowWidth = $(window).outerWidth();
		numDisplay = 3;
	if (memberItemLen > numDisplay) {
		var $memberList = $memberItem.parent(),
			$memberListParent = $memberList.parent(),
			memberItemWidth = $memberItem.outerWidth(),
			slideDuration = (4 * memberItemLen) + 's';
		$memberList.css('animation-duration', slideDuration).clone().appendTo($memberListParent);
		$memberListParent.css('justify-content', 'flex-start').addClass('slideList');
	}
	//フッターフローティング要素がある時の調整
	var $footerFixed = $('.footerFixed');
	if($footerFixed[0]){
		var $contWrap = $('.contWrap'),
			footerFixedH = $footerFixed.outerHeight() + 20;
		$contWrap.css('padding-bottom', footerFixedH);
		$('#pageTop').css('bottom', footerFixedH);
	}
});

$(function(){
	var allImg = [];
	$.ajax({ // json読み込み開始
		type: 'GET',
		url: '../files/js/works_imgData.json',
		dataType: 'json'
	})
	.then(
		function(json) { // jsonの読み込みに成功した時
			var dataStringify = JSON.stringify(json),
				dataJson = JSON.parse(dataStringify);
			$.each(dataJson, function(i) {
				allImg.push(dataJson[i]);
			});
			worksListProcess();
			modalProcess();

		},
		function() { //jsonの読み込みに失敗した時
			console.log('json読み込み失敗');
		}
	);
	function worksListProcess() {
		var worksListHtml = '';
		$.each(allImg, function(i) {
			var groupId = allImg[i].groupId,
				fileName = allImg[i].data[0].fileName,
				coverImgUrl = '../files/images/img/works/' + groupId + '/' + fileName;
			worksListHtml +=`<li class="js-content" data-group-id="${groupId}" data-slide-index="01"><div class="imgWrap"><img src="${coverImgUrl}" alt="works"></div></li>
`;
		});
		$('#worksList').append(worksListHtml);
		$('#worksList li:last-child img').on('load error', function() {
			$('#worksList').css('opacity', '1');
		});
	}
	function modalProcess() {
		const openModalBtns = document.getElementById('worksList').querySelectorAll('.js-content');
		openModalBtns.forEach((openModalBtn) => {
			openModalBtn.addEventListener('click', (e) => {
				const groupId = e.target.closest('li').dataset.groupId;
				if(prevGroupId !== groupId) {
					createModalSlides(groupId);
				}
			});
		 });
		
		var prevGroupId = '';
		function createModalSlides(groupId) {
			var $swiperWrapper = $('#worksModal .swiper-wrapper');
			if (prevGroupId === '') {
				$('#worksModal').addClass('is-active');
			} else {
				$swiperWrapper.empty();
			}
			var currentGroup = allImg.find(function(obj) {
				return obj.groupId === groupId;
			}),
				currentGroupData = currentGroup.data,
				slideHtml = '';
			$.each(currentGroupData, function(i){
				var imgUrl = '../files/images/img/works/' + groupId + '/' + currentGroupData[i].fileName,
					media = currentGroup.media,
					client = currentGroup.client;
				slideHtml+= `<div class="swiper-slide modalSlide">
				<div class="imgWrap"><img src="${imgUrl}" alt="works"></div>
				<p><span class="client">${client}</span><span class="media">${media}</span></p>
				</div>`
			});
			$swiperWrapper.append(slideHtml);
			slideModal('worksModal', 'worksList', '.swiper.st');
			prevGroupId = groupId;
		}
	}
});

$(function(){
	//pageTopボタン
	var topBtn = $('#pageTop');	
		// topBtn.hide();
	//スクロールしてトップ
	topBtn.on('click', function() {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		return false;
	});
	//スクロールが100に達したらボタン表示
	$(window).scroll(function () {
		if($(this).scrollTop() > 100) {
			topBtn.fadeIn();
		} else {
			topBtn.fadeOut();
		}
	});
});