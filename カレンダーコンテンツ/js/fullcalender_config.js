//日本語化
  FullCalendar.globalLocales.push(function () {
		'use strict';

		var ja = {
			code: 'ja',
			buttonText: {
				prev: '前の月',
				next: '次の月',
				today: '今月',
				month: '月',
				week: '週',
				day: '日',
				list: 'リスト',
			},
			weekText: '週',
			allDayText: '終日',
			moreLinkText: function(n) {
				return '他 ' + n + ' 件'
			},
			noEventsText: '表示する予定はありません',
		};
		return ja;
	}());

//カレンダー初期設定
  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
		//今日の時刻を取得
		var today = new Date();
		var startMonth = new Date(today.getFullYear(), (today.getMonth()));
		var nextMonth_lastDate = new Date(today.getFullYear(), (today.getMonth()+2), 1 );

    var calendar = new FullCalendar.Calendar(calendarEl, {

      headerToolbar: {
        left: 'prev',
        center: 'title',
        right: 'next'
      },

      locale: 'ja',
      displayEventTime: false,
      firstDay: 1,    // 月曜始まり
      height: "auto", // 高さは自動
			fixedWeekCount: false,// 週間表示を自動調整
      googleCalendarApiKey: 'AIzaSyD_ASfF4lfHzaY6ukH1H1MQaaYaSqxTANc',

			eventSources: [
        {
					//イベント
					googleCalendarId: 'c_v0s77mhjis52q65evqqttomfo8@group.calendar.google.com',
					className: 'calendar_event'
        },
				{
					//イベント2
					googleCalendarId: 'c_6a3ilv8oeh5p2qqdj04ie2idec@group.calendar.google.com',
					className: 'calendar_event2'
        },
				{
						//アイテム
						googleCalendarId: 'c_0t82g61a6p1jnaphslbfc88p8o@group.calendar.google.com',
						className: 'calendar_item'
				},
				{
						//アイテム2
						googleCalendarId: 'c_9u09jo910l050nfdq5pt1r3rmk@group.calendar.google.com',
						className: 'calendar_item2'
				},
				{
						//セール
						googleCalendarId: 'c_hivvatn7h267qir9dthcsfv8ro@group.calendar.google.com',
						className: 'calendar_sale'
				},
				{
						//セール2
						googleCalendarId: 'c_tcavcr0fj3m3ep6jb2eqaj5ekg@group.calendar.google.com',
						className: 'calendar_sale2'
				},
				{
						//スペシャル
						googleCalendarId: 'c_cvr1l88r50g0a2pui9qldvr8f0@group.calendar.google.com',
						className: 'calendar_special'
				},
				{
					//祝日
          googleCalendarId: 'ja.japanese#holiday@group.v.calendar.google.com',
          className: 'calendar_holiday'
        }
        ],

			//表示期間制御(今月から来月まで)
			initialView: 'dayGridMonth',
			validRange: function() {
				return {
					start: startMonth,
					end: nextMonth_lastDate
				};
			},

			//イベントクリック
      eventClick: function(arg) {
        arg.jsEvent.preventDefault();
				clickLink(arg);
      },

			//イベント取得
      eventDidMount: function(e) {
				addEvent(e);
				//祝日にクラス名付与
				if ( e.el.classList.contains('calendar_holiday') ) {
					e.el.closest('.fc-daygrid-day').classList.add('is_holiday');
				}
      },

			//デフォルト’日’を非表示
      dayCellContent: function(e) {
        e.dayNumberText = e.dayNumberText.replace('日', '');
      },

			//ローディング
      loading: function(bool) {
        document.getElementById('loading').style.display =
          bool ? 'block' : 'none';
      }

    });
    calendar.render();
  });

	//クリック
	function clickLink(arg){
		var publicId = arg.event._def.publicId
		var aLink = '#' + publicId;
		location.replace(aLink);
	}


	//イベント表示
	function addEvent(e){
		var today = new Date();
		var title = e.event._def.title;
		var location = e.event._def.extendedProps.location;
		var dis = e.event._def.extendedProps.description;
		var date = e.event.start;
		var endDate = e.event.end;
		var year = date.getFullYear();
		var month = date.getMonth() +1;
		var day = date.getDate();
		var cName = e.el.classList;
		var addName ="";
		var id = e.event._def.publicId;
		var isStart = e.isStart;

		$.each(cName, function(i, v){
			if(v.indexOf('calendar_') != -1){
				addName = v
			}
		})

		var year_t = year.toString().padStart(2, '0');
		var month_t = month.toString().padStart(2, '0');
		var day_t = day.toString().padStart(2, '0');
		var data_GA = year_t + month_t + day_t + '_' + addName;

		if(dis == undefined){
			dis = 'coming soon'
		}

		if (location !== undefined && today <= endDate && isStart) {
			var html = '<li id ="' + id + '" class="topi ' + addName + '"><a href="'+ location + '" data-ga="' + data_GA + '"><time class="time" data="' + date + '">' + year + '/' + month + '/' + day + `</time><p class="title">` + title + '</p><p class="dis">' + dis + '</p></a></li>'
			$('.topicsList').append(html);
		}else if(location == undefined && today <= endDate && isStart && addName != 'calendar_holiday'){
			var html = '<li id ="' + id + '" class="topi ' + addName + '"><a class="disabled"><time class="time" data="' + date + '">' + year + '/' + month + '/' + day + `</time><p class="title">` + title + '</p><p class="dis">' + dis + '</p></a></li>'
			$('.topicsList').append(html);
		}

	}

	//ページャー切り替え
	$(window).on('load',function(){
		var button = $('.fc-header-toolbar').find('button');
		button.on("click", function () {
			if($(this).prop('disabled')){
				$('.topicsList').find('li').remove();
			}
		});
	});