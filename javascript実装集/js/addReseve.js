// -------------------------
//トップページ 先行予約会追加
// -------------------------
$(function () {

  //cookieからタイプを取得
  // function getCookieObject() {
  //   let cookieObj = {};
  //   if (document.cookie !== '') {
  //     const cookies = document.cookie.split('; ');
  //     for (var i = 0; i < cookies.length; i++) {
  //       const cookie = cookies[i].split('=');
  //       const key = cookie[0];
  //       const value = decodeURIComponent(cookie[1]);
  //       cookieObj[key] = value;
  //     }
  //   }
  //   return cookieObj;
  // }
  // cookieObj = getCookieObject();
  // const type = cookieObj.tp;
  // if(type == 3)return;

  const type = 1;


  //バナーデータ生成
  function createBnrData(bnrCode, tp, m, hk) {
    return bnrCode.map(bnr => ({
      image: `https://img08.magaseek.com/images/mg/contents/PREORDER/bn_pre${m}${bnr}.jpg`,
      link: `https://www.magaseek.com/shop/list/tr_s-sh_${bnr}-pt_0-tp_${tp}-sk_0-dn_51-hk_${hk}-cp_0-dc_120-zk_1`
    }));
  }
  //特集バナー（レディス）
  const bnrCode = ["ALFTTV","ARUAPR","ARUJGT","ARUMSR","ARUTUR","JUNAER","JUNROP","JUNRPC","JUNSAR","JUNVIS","NANUNI","SEIJIL","SEINBS","SEIPBD","SEIPKD","VICQCT","LTRLTR","ALFURS"];
  const bnrData = createBnrData(bnrCode, 1, '', 1);
  //特集バナー（メンズ）
  const bnrCode_M = ["JUNAER","NANUNI","PMJPNL","RKMRKM"];
  const bnrData_M = createBnrData(bnrCode_M, 0, 'm', 9);


  //ショップデータ生成
  function createShopData(shopCode, tp, hk) {
    return shopCode.map(shop => ({
      image: `https://img08.magaseek.com/images/mg/logo/lo_${shop}.jpg`,
      link: `https://www.magaseek.com/shop/top/tr_s-sh_${shop}-pt_0-tp_${tp}-sk_0-dn_51-hk_${hk}-cp_0-dc_120-zk_1`
    }));
  }
  //イチ押しショップ（レディース）
  const shopCode = ["ALFTTV","ARUAPR","ARUJGT","ARUMSR","ARUTUR","JUNAER","JUNROP","JUNRPC","JUNSAR","JUNVIS","NANUNI","SEIJIL","SEINBS","SEIPBD","SEIPKD","VICQCT","LTRLTR","ALFURS"];
  const shopData = createShopData(shopCode, 1, 1);
  //イチ押しショップ（メンズ）
  const shopCode_M = ["FABLAC","TOYSYT","THSFPL","TKQSTD","ASSASS","ANSANL","THFTHF","DSNLCG","PBISVT","ADMGBL","DSNDSN","DSNMSW","LVSMLV"];
  const shopData_M = createShopData(shopCode_M, 0, 9);


  //タイプ別設定
  const typeConfig = {
    //メンズ
    0: {
      bnrData: bnrData_M,
      shopData: shopData_M,
      ajaxURL: `/item/list/tr_i-msh_JUNAER-msh_NANUNI-msh_ARUJGT-msh_ARUMSR-pt_0-tp_0-sk_1-dn_10-hk_9-cp_0-dc_120-zk_1`,
      allLinkURL: `/item/list/tr_i-msh_JUNAER-msh_NANUNI-msh_ARUJGT-msh_ARUMSR-pt_0-tp_0-sk_1-dn_51-hk_9-cp_0-dc_120-zk_1`,
      shopAllURL: `/item/list/tr_i-msh_JUNAER-msh_NANUNI-msh_ARUJGT-msh_ARUMSR-pt_0-tp_0-sk_1-dn_51-hk_9-cp_0-dc_120-zk_1`,
      headText: `NEW ARRIVAL`,
      subText: `人気ショップの新作`,
      allLinkText: `新作アイテム一覧`,
      BnrAreaText: `新作アイテム：特集`,
      shopAreaText: `新作アイテム：イチ押しショップ`,
      shopAllText: `イチ押しショップの新作アイテムを見る`,
      paramType: `M`
    },
    //レディス
    1: {
      bnrData: bnrData,
      shopData: shopData,
      ajaxURL: `/item/list/tr_i-msh_ALFTTV-msh_ARUAPR-msh_ARUJGT-msh_ARUMSR-msh_ARUTUR-msh_DOTANK-msh_JUNAER-msh_JUNROP-msh_JUNRPC-msh_JUNSAR-msh_JUNVIS-msh_NANUNI-msh_SEIJIL-msh_SEINBS-msh_SEIPBD-msh_SEIPKD-msh_VICQCT-msh_LTRLTR-pt_0-tp_1-sk_1-dn_10-hk_1-cp_0-dc_120-zk_1`,
      allLinkURL: `/item/list/tr_i-msh_ALFTTV-msh_ARUAPR-msh_ARUJGT-msh_ARUMSR-msh_ARUTUR-msh_DOTANK-msh_JUNAER-msh_JUNROP-msh_JUNRPC-msh_JUNSAR-msh_JUNVIS-msh_NANUNI-msh_SEIJIL-msh_SEINBS-msh_SEIPBD-msh_SEIPKD-msh_VICQCT-msh_LTRLTR-pt_0-tp_1-sk_1-dn_51-hk_1-cp_0-dc_120-zk_1`,
      shopAllURL: `/item/list/tr_i-msh_ALFTTV-msh_ARUAPR-msh_ARUJGT-msh_ARUMSR-msh_ARUTUR-msh_DOTANK-msh_JUNAER-msh_JUNROP-msh_JUNRPC-msh_JUNSAR-msh_JUNVIS-msh_NANUNI-msh_SEIJIL-msh_SEINBS-msh_SEIPBD-msh_SEIPKD-msh_VICQCT-msh_LTRLTR-pt_0-tp_1-sk_1-dn_51-hk_1-cp_0-dc_120-zk_1`,
      headText: `PRE ORDER`,
      subText: `人気ショップの先行予約会`,
      allLinkText: `先行予約アイテム一覧`,
      BnrAreaText: `先行予約会：特集`,
      shopAreaText: `先行予約会：イチ押しショップ`,
      shopAllText: `イチ押しショップの先行予約アイテムを見る`,
      paramType: `W`
    }
  };


  //ランダムでバナー追加
  function randomDisplay(dataArray, addArea, pid, num){
    let randomImages = [];
    while (randomImages.length < num) {
      const randomIndex = Math.floor(Math.random() * dataArray.length);
      const randomImage = dataArray[randomIndex].image;
      if (!randomImages.includes(randomImage)) {
        randomImages.push(randomImage);
      }
    }
    randomImages.forEach(function(image) {
      const imageInfo = dataArray.find(function(item) {
        return item.image === image;
      });
      const imgElement = $("<img>").attr("src", imageInfo.image);
      const linkElement = $("<a>").attr("href", imageInfo.link + "?pid="+ pid).attr("data-ga", pid).append(imgElement);
      const listItem = $("<li>").append(linkElement);
      $(addArea).append(listItem);
    });
  }


  //タイプ別に出し分け
  if (typeConfig.hasOwnProperty(type)) {
    const config = typeConfig[type];

    // 予約エリアのHTMLテンプレート
    const reserveHTML = `
      <div class="itemlistCont underline" id="addReserve">
        <h2 class="h2Font">${config.headText}<span>${config.subText}</span></h2>
        <!-- イチ押しショップ -->
        <div class="reserve-shop-area" id="reserveShopArea">
          <div class="wrap">
            <div class="hisHead">
              <div class="head">
                <p>${config.shopAreaText}</p>
              </div>
            </div>
            <ul class="reserve-shopList" id="reserveShopList"></ul>
            <div class="allBtn"><a href="${config.shopAllURL}?pid=reserveShopMore_${config.paramType}" class="btn" data-ga="reserveShopMore_${config.paramType}">${config.shopAllText}</a></div>
          </div>
        </div>
        <!-- /イチ押しショップ -->
        <!-- 特集エリア -->
        <div class="reserve-bnr-area" id="reserveBnrArea">
          <div class="wrap">
            <div class="hisHead">
              <div class="head">
                <p>${config.BnrAreaText}</p>
              </div>
            </div>
            <ul class="reserve-bnrList ${config.paramType}" id="reserveBnrList"></ul>
          </div>
        </div>
        <!-- /特集エリア -->
        <!-- アイテムエリア -->
        <div class="reserve-item-area">
          <div class="photo-box-gallery" id="reserve_add" data-shift="300">
            <div class="wrapp">
              <div class="hisHead">
                <div class="head">
                  <p>ほぼ毎日更新！最旬アイテム</p>
                </div>
              </div>
              <div class="product-list-holder more-list">
                <ul class="product-list product-list-lazy productList">
                  <li class="product-item">
                    <div class="moreBtn">
                      <a href="${config.ajaxURL}?pid=reserveItemMore_${config.paramType}" data-ga="reserveItemMore_${config.paramType}">もっと見る</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- /アイテムエリア -->
      </div>`;

    //HTML挿入
    $('#reserve').append(reserveHTML);
    var ajaxURL = config.ajaxURL;
    var paramType = config.paramType;
    const bnrNum = (type == 1) ? 6 : 4;
    randomDisplay(config.bnrData, '#reserveBnrList', `reserveBnr_${paramType}`, bnrNum);
    randomDisplay(config.shopData, '#reserveShopList', `reserveShop_${paramType}`, 10);

    // 予約のメリットLP導線追加
    if(type == 1){
      const addObiBnr = `https://img08.magaseek.com/images/mg/update/230726/bn_ADDORDER_TOP_sp.jpg`
      const addObiHTML = `
      <div class="headerBanner middle reserve">
        <div class="banner" style="background: url(&quot;${addObiBnr}&quot;) left top / contain repeat; display: block;">
          <a href="/static/cont/id_ADDORDER?pid=reserveADDORDER" data-ga="reserveADDORDER">
            <img src="${addObiBnr}" alt="予約のメリット">
          </a>
        </div>
      </div>`
      $('.reserve-item-area').after(addObiHTML);
    }
  }


  //Ajax
  $.ajax({
    url:`//${location.host}${ajaxURL}`,
    type:'GET',
    dataType:'html',
  })
  .then(
    function (data) {
      const listHolder = $(data).find('.product-list-holder');
      let addHTML = '';
      if(listHolder.length > 0) {
        const item = listHolder.find('.product-item');
        let allCode = [];
        for(let i = 0; i < item.length; i++){
          if (!$(item[i]).find('.prIcon').length) {
            let thisCode = $(item[i]).find('.list-check-holder').data('mgprdinfo').split(',');
            thisCode = thisCode[0];
            if (allCode.indexOf(thisCode) === -1 && allCode.length < 24) {
              $(item[i]).find('img').attr('src', $(item[i]).find('img').attr('data-original'));

              var $item = $(item[i]).find('.inner a');
              var pid = `?pid=reserveItem_${paramType}`
              var data_ga = `reserveItem_${paramType}`
              if($item.attr('href').match('/product/detail')){
                $($item[0]).attr('href', $item.attr('href') + pid);
                $($item[0]).attr('data-ga', data_ga);
              }

              addHTML += $(item[i]).prop('outerHTML');
              allCode.push(thisCode);
            }
          }
        }
        const list = $('#reserve_add').find('.product-list');
        if (allCode.length >= 24) {
          list.prepend(addHTML);
        }
      }
    },
    function () {
      $('.reserve-item-area').hide();
      return false;
    }
  );
});