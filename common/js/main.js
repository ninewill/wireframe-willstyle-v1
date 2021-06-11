$(function () {
  const $window = $(window);
  const $html = $("html");
  const $menu = $("#menu");
  const $content = $("#content");
  const languageType = $html.attr("lang");

  let screenWidth = $window.outerWidth();
  let screenHeight = $window.outerHeight();
  let scrollTop = $window.scrollTop();


  $('img.lazyload').attr('src', 'common/images/_loading.gif');

    /*
   * ==========================================================================
   * 日夜間切換按鈕
   * ==========================================================================
   */
    $("#switch").click(function () {
      let htmlClasses = document.querySelector("html").classList;
  
      if (localStorage.theme === "dark") {
        htmlClasses.remove("dark");
        localStorage.removeItem("theme");
      } else {
        htmlClasses.add("dark");
        localStorage.theme = "dark";
      }
    });

  /*
   * ==========================================================================
   * 把語言選擇連結複製到 MENU 選單
   * ==========================================================================
   */

  function cloneOtherLink() {
    let $container = $menu.children("ul");

    // 複製語言選擇連結
    let $language = $(".language-btn");

    $language.each(function () {
      let dom = $(this).clone();
      $container.append(dom);
    });

    $container.find(".language-btn").wrap('<li class="bring-item"></li>');
  }

  cloneOtherLink();

  /*
   * ==========================================================================
   * 手機版 MENU 選單開啟/收合
   * ==========================================================================
   */

  // const $menuSwotchBtn = $(".menu-mobile-btn");

  // function ctrlMenu(width) {
  //   if (width <= 1024) {
  //     if ($menuSwotchBtn.hasClass("is-open")) {
  //       $menu.stop(true, true).slideDown();
  //     } else {
  //       $menu.stop(true, true).slideUp();
  //     }
  //   } else {
  //     $menu.attr("style", "");
  //   }
  // }

  // $menuSwotchBtn.on("click", function () {
  //   $(this).toggleClass("is-open");
  //   ctrlMenu(screenWidth);
  // });

  // ctrlMenu(screenWidth);

  /*
   * ==========================================================================
   * MENU 區塊的滾動定位
   * ==========================================================================
   */

  function fixedHeader(width, value) {
    let fixedValue = screenHeight - $menu.innerHeight();

    if (width > 1024) {
      if (value > fixedValue) {
        if ($menu.hasClass("is-fixed") === false) {
          $menu.addClass("is-fixed");
        }
      } else {
        if ($menu.hasClass("is-fixed")) {
          $menu.removeClass("is-fixed");
        }
      }
    } else {
      $menu.removeClass("is-fixed");
    }
  }

  /*
   * ==========================================================================
   * 單頁式網站的按鈕連結功能
   * ==========================================================================
   */

  let $anchorBtn = $(".anchor-btn");

  function setAnchorBtn() {
    if ($anchorBtn.length) {
      $anchorBtn.on("click", function () {
        let $this = $(this);
        let targetName = $this.attr("href");
        let $target = $(targetName.slice(targetName.indexOf("#")));
        let padding = 0;

        if (screenWidth > 1024) {
          padding = $menu.innerHeight();
        } else {
          padding = 50;
          $menuSwotchBtn.removeClass("is-open");
          // ctrlMenu(screenWidth);
        }

        let scrollValue = $target.offset().top - padding;

        $("html, body").animate(
          {
            scrollTop: scrollValue,
          },
          800,
          function () {
            $target.trigger("focus");
          }
        );

        return false;
      });
    }
  }

  setAnchorBtn();

  /*
   * ==========================================================================
   * 單頁式網站的滾動選單切換 current 功能
   * ==========================================================================
   */

  const openAnchorScroll = $menu.hasClass("anchor-scroll");

  function setAnchorScroll(scrollTop) {
    if (openAnchorScroll) {
      $(".section").each(function () {
        let $this = $(this);

        if (scrollTop >= $this.offset().top - $menu.innerHeight()) {
          let id = $this.attr("id");
          $(".anchor-btn").removeClass("current");
          $(`.anchor-btn[href="#${id}"]`).addClass("current");
        }

        if (scrollTop >= $(document).innerHeight() - $window.innerHeight()) {
          $(".anchor-btn").removeClass("current");
          $(".anchor-btn").last().addClass("current");
        }
      });
    }
  }

  setAnchorScroll(scrollTop);

  /*
   * ==========================================================================
   * 分享按鈕
   * ==========================================================================
   */

  const $share = $(".share");
  const $shareBtn = $share.find(".share-btn");

  function ctrlShareList() {
    let $shareList = $share.find(".share-list");
    if ($shareBtn.hasClass("is-open") === true) {
      $shareList.stop(true, true).fadeIn();
    } else {
      $shareList.stop(true, true).fadeOut();
    }
  }

  $share
    .on("mouseenter", function () {
      $shareBtn.addClass("is-open");
      ctrlShareList();
    })
    .on("mouseleave", function () {
      $shareBtn.removeClass("is-open");
      ctrlShareList();
    });

  $shareBtn.on("focus", function () {
    $shareBtn.addClass("is-open");
    ctrlShareList();
  });

  $(".share-list > li a")
    .last()
    .on("blur", function () {
      $shareBtn.removeClass("is-open");
      ctrlShareList();
    });

  ctrlShareList();

  /*
   * ==========================================================================
   * TOP 按鈕
   * ==========================================================================
   */

  const $floatBtn = $(".floatbtn");
  const $topBtn = $floatBtn.find(".top-btn");

  $topBtn.on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      800,
      function () {
        // $('#u').trigger('focus');
        $(".firstGoTo-btn").trigger("focus");
      }
    );
    return false;
  });

  function topButtonShower(value) {
    if (!$floatBtn.is(":animated")) {
      if (value > 1) {
        $floatBtn.stop(true, true).fadeIn();
      } else {
        $floatBtn.stop(true, true).fadeOut();
      }
    }
  }

  topButtonShower(scrollTop);

  /*
   * ==========================================================================
   * 內頁的字級縮放
   * ==========================================================================
   */

  let fontsize = {
    plusBtn: $(".fontsize-btn-plus"),
    decBtn: $(".fontsize-btn-dec"),
    value: 2,
    size: ["1.125", "1.2", "1.25", "1.3", "1.35", "1.4"],
  };

  function ctrlFontsize(width) {
    if (fontsize.value <= 0) {
      fontsize.value = 0;
    }

    if (fontsize.value > fontsize.size.length - 1) {
      fontsize.value = fontsize.size.length - 1;
    }

    if (width > 1024) {
      $content.css({
        fontSize: `${fontsize.size[fontsize.value]}rem`,
      });
    } else {
      $content.attr("style", "");
      fontsize.value = 2;
    }
  }

  fontsize.plusBtn.on("click", function () {
    fontsize.value = fontsize.value + 1;
    ctrlFontsize(screenWidth);
  });

  fontsize.decBtn.on("click", function () {
    fontsize.value = fontsize.value - 1;
    ctrlFontsize(screenWidth);
  });

  ctrlFontsize(screenWidth);

  /*
   * ==========================================================================
   * NavBar SVG樣式
   * ==========================================================================
   */

  $(".features .option-btn.share-btn").append(`
    <svg xmlns="http://www.w3.org/2000/svg" width="20.573" height="20.573" viewBox="0 0 20.573 20.573">
      <g id="icon-share" opacity="0.57">
        <path id="share_4_" data-name="share (4)"
          d="M16.555,12.537a4.013,4.013,0,0,0-3.149,1.525L7.9,11.319a4.022,4.022,0,0,0,0-2.065l5.5-2.743a4,4,0,1,0-.727-1.433L7.185,7.815a4.018,4.018,0,1,0,0,4.942L12.679,15.5a4.018,4.018,0,1,0,3.876-2.959Zm0-10.929a2.411,2.411,0,1,1-2.411,2.411A2.414,2.414,0,0,1,16.555,1.607ZM4.018,12.7a2.411,2.411,0,1,1,2.411-2.411A2.414,2.414,0,0,1,4.018,12.7Zm12.537,6.268a2.411,2.411,0,1,1,2.411-2.411A2.414,2.414,0,0,1,16.555,18.966Zm0,0"
          transform="translate(0 0)" fill="#444" />
      </g>
    </svg>
  `);

  $(".features .option-btn.print-btn").append(`
    <svg xmlns="http://www.w3.org/2000/svg" width="25.31" height="25.534" viewBox="0 0 25.31 25.534">
      <g id="icon-pirnt" opacity="0.66">
        <g id="printer" transform="translate(0)">
          <path id="Path_594" data-name="Path 594" d="M33.71,17.916V8.593a2.281,2.281,0,0,0-2.3-2.25h-2.5V1.594A1.517,1.517,0,0,0,27.375.1H14.725a1.513,1.513,0,0,0-1.531,1.49V6.343H10.7A2.274,2.274,0,0,0,8.4,8.588v9.328a2.281,2.281,0,0,0,2.3,2.25H13.2v3.974a1.517,1.517,0,0,0,1.531,1.495H27.38a1.517,1.517,0,0,0,1.531-1.495V20.165h2.494A2.271,2.271,0,0,0,33.71,17.916ZM14.51,1.589a.225.225,0,0,1,.225-.22H27.38a.225.225,0,0,1,.225.22V6.343H14.51ZM27.6,24.139a.225.225,0,0,1-.225.22H14.73a.225.225,0,0,1-.225-.22V13.891h13.09V24.139Zm.656-11.522h-14.4a.646.646,0,0,0-.656.64V18.89H10.7a.991.991,0,0,1-1-.975V8.593a.991.991,0,0,1,1-.975H31.4a.991.991,0,0,1,1,.975v9.328a.991.991,0,0,1-1,.975H28.906V13.257A.638.638,0,0,0,28.255,12.617Z" transform="translate(-8.4 -0.099)" fill="#444"/>
          <path id="Path_595" data-name="Path 595" d="M70.995,187.851a.631.631,0,0,0-.195.455.649.649,0,0,0,.195.455.663.663,0,0,0,.466.19.681.681,0,0,0,.466-.19.64.64,0,0,0,.195-.455.649.649,0,0,0-.195-.455A.7.7,0,0,0,70.995,187.851Z" transform="translate(-67.604 -178.298)" fill="#444"/>
          <path id="Path_596" data-name="Path 596" d="M178.281,368h-7.426a.64.64,0,1,0,0,1.28h7.416a.646.646,0,0,0,.656-.64A.637.637,0,0,0,178.281,368Z" transform="translate(-161.914 -349.609)" fill="#444"/>
          <path id="Path_597" data-name="Path 597" d="M178.281,425.9h-7.426a.64.64,0,1,0,0,1.28h7.416a.64.64,0,1,0,.01-1.28Z" transform="translate(-161.914 -404.615)" fill="#444"/>
          <path id="Path_598" data-name="Path 598" d="M178.281,310h-7.426a.64.64,0,1,0,0,1.28h7.416a.64.64,0,1,0,.01-1.28Z" transform="translate(-161.914 -294.508)" fill="#444"/>
        </g>
      </g>
    </svg>
    `);

  $(".fontsize-btn-plus").append(`
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="-25 -25 100 100">
        <path class="plus-p" fill="#444"
          d="M52.5 24.961v2.117a2.115 2.115 0 0 1-2.117 2.118h-4.236v4.235a2.114 2.114 0 0 1-2.118 2.117h-2.116a2.114 2.114 0 0 1-2.117-2.117v-4.235H35.56a2.116 2.116 0 0 1-2.118-2.118v-2.117c0-1.172.947-2.116 2.118-2.116h4.235v-4.237c0-1.172.947-2.116 2.117-2.116h2.116c1.173 0 2.118.946 2.118 2.116v4.237h4.236a2.112 2.112 0 0 1 2.118 2.116zM31.145 42.62c.111.453.129.803.057 1.025-.079.224-.318.344-.729.344h-6.945c-.634 0-1.066-.146-1.291-.428-.225-.288-.43-.738-.615-1.34l-1.798-6.67H8.491L6.618 42.39c-.189.607-.429 1.03-.729 1.256-.3.224-.709.344-1.233.344h-6.215c-.412 0-.692-.084-.839-.258-.152-.17-.134-.578.055-1.228L8.467 7.67c.187-.531.41-.942.672-1.231.258-.282.762-.428 1.513-.428h7.057c.784 0 1.295.157 1.54.461.242.304.456.723.643 1.254L31.145 42.62zM18.113 29.198l-3.771-13.989h-.278l-3.833 13.989h7.882z" />
      </svg>
    `);

  $(".fontsize-btn-dec").append(`
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="-25 -25 100 100">
        <path class="dec-d" fill="#444"
          d="M52.5 24.962v2.119a2.114 2.114 0 0 1-2.118 2.117H35.556a2.116 2.116 0 0 1-2.118-2.117v-2.119c0-1.172.947-2.118 2.118-2.118h14.826c1.173 0 2.118.946 2.118 2.118zM31.145 42.621c.111.453.13.8.058 1.023-.077.224-.318.343-.728.343h-6.946c-.635 0-1.064-.146-1.291-.428-.224-.288-.429-.738-.615-1.34l-1.798-6.67H8.49l-1.875 6.838c-.188.608-.43 1.031-.729 1.257-.297.224-.709.343-1.232.343H-1.56c-.411 0-.691-.086-.838-.258-.152-.17-.134-.577.056-1.226L8.465 7.67c.185-.532.41-.941.671-1.23.259-.282.765-.428 1.514-.428h7.057c.783 0 1.297.156 1.539.459.241.304.456.722.644 1.254l11.255 34.896zM18.114 29.198L14.341 15.21h-.278L10.23 29.198h7.884z" />
      </svg>
    `);

  $(".download-icon").append(`
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="34.825" viewBox="0 0 30 34.825">
      <g id="icon-download" transform="translate(1.88 0.001)">
        <path id="Path_12168" data-name="Path 12168" d="M20.692.231,20.685.224A.69.69,0,0,0,20.17,0H10.013a3.66,3.66,0,0,0-3.571,3.74V5.3H1.692A3.659,3.659,0,0,0-1.88,9.043V31.085a3.659,3.659,0,0,0,3.571,3.74H16.227a3.66,3.66,0,0,0,3.571-3.74V29.522h4.75a3.659,3.659,0,0,0,3.571-3.74V8.309a.791.791,0,0,0-.207-.531Zm.193,2.319,4.807,5.026H23.027a2.2,2.2,0,0,1-2.143-2.244ZM16.227,33.329H1.692A2.2,2.2,0,0,1-.451,31.085V9.043A2.2,2.2,0,0,1,1.692,6.8H6.906a.72.72,0,0,0,.5,0h3.736v3.837a3.659,3.659,0,0,0,3.571,3.74h3.664v16.71a2.208,2.208,0,0,1-2.15,2.244Zm1.15-20.45H14.713a2.2,2.2,0,0,1-2.143-2.244V7.853Zm7.172,15.146H19.8V13.612a.79.79,0,0,0-.207-.531L12.377,5.534l-.007-.007a.69.69,0,0,0-.514-.224H7.87V3.739A2.2,2.2,0,0,1,10.013,1.5h9.45V5.332a3.659,3.659,0,0,0,3.571,3.74h3.657v16.71a2.2,2.2,0,0,1-2.143,2.244Zm0,0" transform="translate(0 0)" fill="#ab8f4e"/>
        <path id="Path_12169" data-name="Path 12169" d="M62.033,292.25H69.61a.748.748,0,1,0,0-1.5H62.033a.748.748,0,1,0,0,1.5Zm0,0" transform="translate(-59.38 -273.334)" fill="#ab8f4e"/>
        <path id="Path_12170" data-name="Path 12170" d="M75.669,379.262H62.034a.748.748,0,0,0,0,1.5H75.669a.748.748,0,0,0,0-1.5Zm0,0" transform="translate(-59.381 -356.539)" fill="#ab8f4e"/>
        <path id="Path_12171" data-name="Path 12171" d="M75.669,467.77H62.034a.748.748,0,1,0,0,1.5H75.669a.748.748,0,1,0,0-1.5Zm0,0" transform="translate(-59.381 -439.744)" fill="#ab8f4e"/>
        <path id="Path_12172" data-name="Path 12172" d="M399.26,290.754h-2.281a.748.748,0,0,0,0,1.5h2.281a.748.748,0,1,0,0-1.5Zm0,0" transform="translate(-375.672 -273.334)" fill="#ab8f4e"/>
        <path id="Path_12173" data-name="Path 12173" d="M399.26,379.262h-2.281a.748.748,0,0,0,0,1.5h2.281a.748.748,0,1,0,0-1.5Zm0,0" transform="translate(-375.672 -356.539)" fill="#ab8f4e"/>
      </g>
    </svg>
  `);

  /*
   * ==========================================================================
   * 相簿（鍵盤操作相簿說明）
   * ==========================================================================
   */

  function ctrlAlbumInstruction(btn) {
    if (btn.hasClass("is-open")) {
      btn.next(".instruction-menu").stop(true, true).slideDown();
    } else {
      btn.next(".instruction-menu").stop(true, true).slideUp();
    }
  }

  $(".instruction-keypress .instruction-btn").on("click", function () {
    let $this = $(this);
    $this.toggleClass("is-open");
    ctrlAlbumInstruction($this);
  });

  /*
   * ==========================================================================
   * 相簿（Light Gallery）
   * ==========================================================================
   */

  let $albumList = $(".album-list");

  $albumList.each(function (index) {
    $(this).attr("data-index", index);
  });

  function checkAlbumHash() {
    let hash = window.location.hash.substr(1);
    if (hash.indexOf("lg") > -1) {
      let andIndex = hash.indexOf("&");
      let str = hash.substring(0, andIndex);
      let val = str.substring(str.indexOf("lg") + 3, andIndex);

      $(`.album-list[data-index="${val}"]`)
        .find(".lazyload")
        .each(function () {
          let $image = $(this);
          let src = $image.data("src");
          $image.attr("src", src);
        });
    }
  }

  function setAlbum() {
    if ($albumList.children("li").length) {
      $albumList.each(function () {
        let $album = $(this);
        let index = $album.data("index");

        $album.find(".album-item").attr("tabindex", "-1");

        $album.lightGallery({
          download: false,
          actualSize: false,
          fullScreen: false,
          galleryId: index,
        });

        $album.on("onBeforeOpen.lg", function (e) {
          $(this)
            .find(".lazyload")
            .each(function () {
              let $image = $(this);
              let src = $image.data("src");
              $image.attr("src", src);
            });
        });

        $album.on("onAfterOpen.lg", function (e) {
          let language = {
            zoomIn: "放大",
            zoomOut: "縮小",
            close: "關閉（ESC）",
            prev: "上一張",
            next: "下一張",
          };

          if (languageType === "en") {
            language.zoomIn = "Zoom In";
            language.zoomOut = "Zoom Out";
            language.close = "Close (ESC)";
            language.prev = "Previous";
            language.next = "Next";
          }

          if (languageType === "ja") {
            language.zoomIn = "ズームイン";
            language.zoomOut = "ズームアウトする";
            language.close = "閉じる（ESC）";
            language.prev = "前のページ";
            language.next = "次のページ";
          }

          $("#lg-zoom-in").attr("title", language.zoomIn);
          $("#lg-zoom-out").attr("title", language.zoomOut);
          $(".lg-close").attr("title", language.close);
          $(".lg-next").attr("title", language.next);
          $(".lg-prev").attr("title", language.prev);
        });
      });
    }
  }

  checkAlbumHash();
  setAlbum();

  $(".exhibit-image").each(function () {
    let $this = $(this);
    if ($this.children(".album-list").length) {
      $this.addClass("has-icon");
      $this.children(".album-preview").attr("tabindex", "0");
    }
  });

  $(".album-preview").on("click", function () {
    let $this = $(this);
    let $album = $this.siblings(".album-list");
    let index = $album.children("li").length;
    $album
      .children("li")
      .eq(index - 1)
      .trigger("click");
  });

  /*
   * ==========================================================================
   * 表格（Footable）
   * ==========================================================================
   */

  function setFootable() {
    let $footable = $(".footable");
    if ($footable.length) {
      $footable.footable({
        calculateWidthOverride: function () {
          return {
            width: $window.width(),
          };
        },
      });
    }
  }

  setFootable();

  /*
   * ==========================================================================
   * 表格（Swipetable，手機版有左右滾動條的那種）
   * ==========================================================================
   */

  const $swipeTable = $(".swipeTable");

  function ctrlSwipeTableNotice(width) {
    if ($swipeTable && width <= 1024) {
      $swipeTable.each(function () {
        let $table = $(this);
        let $innerWrap = $table.parent(".swipeTable__innerwrap");
        let $notice = $innerWrap.siblings(".swipeTable__notice");

        if ($table.width() > $innerWrap.width()) {
          $notice.addClass("is-open");
        } else {
          $notice.removeClass("is-open");
        }
      });
    }
  }

  function setSwipeTable() {
    $swipeTable.each(function () {
      let $table = $(this);
      let notice = $table.data("notice");
      $table.wrap(
        `<div class="swipeTable__outerwrap"><div class="swipeTable__innerwrap"></div></div>`
      );
      $table
        .parent(".swipeTable__innerwrap")
        .before(`<p class="swipeTable__notice">${notice}</p>`);
    });
  }

  setSwipeTable();

  /*
   * ==========================================================================
   * 輪播
   * ==========================================================================
   */

  let carousel = {
    className: ".carousel",
    collection: [],
  };

  const $carousel = $(carousel.className);

  function setCarousel() {
    $carousel.each(function (index) {
      let $this = $(this);
      let nameArray = [];

      $this.addClass(`carousel-${index + 1}`);

      function setBulletTitle(swiperIndex) {
        $(`.carousel-${swiperIndex}`)
          .find(".swiper-pagination-bullet")
          .each(function () {
            let $this = $(this);
            let bulletIndex = $this.index();
            let titleText = `移動至 ${nameArray[bulletIndex]}`;

            if (languageType === "en") {
              titleText = `Go To "${nameArray[bulletIndex]}"`;
            }

            if (languageType === "ja") {
              titleText = `${nameArray[bulletIndex]} に移動`;
            }

            $this.attr({
              "aria-label": titleText,
              title: titleText,
            });
          });
      }

      let swiper = new Swiper(`.carousel-${index + 1}`, {
        slidesPerView: 1,
        spaceBetween: 30,
        autoHeight: true,
        loop: false,
        navigation: {
          nextEl: ".carousel-btn-next",
          prevEl: ".carousel-btn-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        keyboard: {
          enabled: true,
        },
        on: {
          init: function () {
            $(`.carousel-${index + 1} .swiper-slide`).each(function () {
              nameArray.push($(this).find(".exhibit-title").text());
            });
          },
          slideChangeTransitionEnd: function () {
            $(`.carousel-${index + 1}`)
              .find(".swiper-slide a")
              .attr("tabindex", "-1");
            $(`.carousel-${index + 1}`)
              .find(".swiper-slide-active a, .swiper-slide-next a")
              .attr("tabindex", "");
          },
          slideChange: function () {
            setBulletTitle(index + 1);
          },
        },
      });

      setBulletTitle(index + 1);

      carousel.collection.push(swiper);
    });
  }

  function ctrlCarousel(width) {
    if ($carousel.length) {
      if (width > 1024) {
        if ($carousel.hasClass("swiper-container-initialized") === false) {
          setCarousel();
        }
      } else {
        if ($carousel.hasClass("swiper-container-initialized")) {
          if (carousel.collection.length) {
            carousel.collection.forEach(function (element, index) {
              $(`${carousel.className}-${index + 1}`).removeClass(
                `${carousel.className}-${index + 1}`
              );
              element.destroy();
            });
            carousel.collection.length = 0;
          }
        }
      }
    }
  }

  ctrlCarousel(screenWidth);

  /*
   * ==========================================================================
   * 無障礙跳過此子選單列按鈕
   * ==========================================================================
   */

  $(".skiptoolbar").on("click", function () {
    let $anchor = $("#content-anchor");
    let value = $anchor.offset().top - $menu.innerHeight();

    $("html, body").animate(
      {
        scrollTop: value,
      },
      800,
      function () {
        $anchor.trigger("focus");
      }
    );
  });

  /*
   * ==========================================================================
   * 分離 click 事件和 focus 事件
   * ==========================================================================
   */

  $("a, button").on("mousedown", function (e) {
    e.preventDefault();
  });

  /*
   * ==========================================================================
   * Debounce
   * ==========================================================================
   */

  function debounce(fn, delay) {
    let timer;
    return function () {
      let context = this;
      let args = arguments;

      clearTimeout(timer);

      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

  /*
   * ==========================================================================
   * 下拉選單 Dropdown
   * ==========================================================================
   */

  function ctrlDropdownList() {
    $(".dropdown").each(function () {
      let $this = $(this);
      if ($this.hasClass("is-open") === true) {
        $this.children(".dropdown-list").stop(true, true).slideDown();
      } else {
        $this.children(".dropdown-list").stop(true, true).slideUp();
      }
    });
  }

  $(".dropdown-btn").on("click", function () {
    let $this = $(this);
    $this.parent(".dropdown").toggleClass("is-open");
    ctrlDropdownList();
  });

  $(".dropdown-list > a:last-child").on("blur", function () {
    $(this).parents(".dropdown").removeClass("is-open");
    ctrlDropdownList();
  });

  ctrlDropdownList();


  /*
   * ==========================================================================
   * 文字過濾搜尋 txt filter search
   * ==========================================================================
   */

  function txtSearch() {
    //移除b標簽，防止二次搜索BUG
    $(".changestyle").each(function () {
      var xxx = $(this).html();
      $(this).replaceWith(xxx);
    });
    //整個文章的div
    var str = $("#postMain").html();
    //文字輸入框
    var txt = $("#txtSearch").val();
    //不為空
    if ($.trim(txt) != "") {
      //定義b標簽樣式黃底粗字
      var re = "<b class='changestyle'>" + txt + "</b>";
      //替換搜索相關的所有內容
      var nn = str.replace(new RegExp(txt, "gm"), re);
      //賦值
      // document.getElementById("postMain").innerHTML=nn;
      $("#postMain").html(nn);
      //顯示搜索內容相關的div
      $(".card")
        .hide()
        .filter(":contains('" + txt + "')")
        .show();
    } else {
      $(".card").show();
    }
  }

  /*
   * ==========================================================================
   * MENU 設計
   * ==========================================================================
   */

  var menuBox = $(".menu-box");
  var menuContent = $(".menu-content ul li");
  var menuGuid = $(".guid-area");
  var menuWrap = $(".menu-mobile-btn");
  var open = false;
  var tl = new TimelineMax();
  tl.pause();
  tl.fromTo(
    menuBox,
    0.5,
    {
      x: -2000,
    },
    { x: 0, ease: Power4.easeInOut }
  );

  tl.staggerFrom(menuContent, 0.2, { autoAlpha: 0, y: -15 });
  tl.staggerFrom(menuGuid, 0.4, { autoAlpha: 0, y: -15 });

  menuWrap.on("click", () => {
    if (open === false) {
      tl.play();
      $("body,html").addClass("add");
    }
    if (open === true) {
      tl.reverse();
      $("body,html").removeClass("add");
    }
    open = !open;
  });

  $(".searchButton").keydown(function (event) {
    if (event.keyCode == 13) {
      checkOut();
    }
  });

  //////////////////////////////////
  // 收合 & 展開
  //////////////////////////////////

  $(".acnav-all").on("click", function () {
    $(this).toggleClass("selt");
    if ($(this).hasClass("selt")) {
      $(".animate-btn").text("全部收合");
    } else {
      $(".animate-btn").text("全部展開");
    }
  });

  //////////////////////////////////
  // 點擊展開more
  //////////////////////////////////

  $(".more-filter-btn").on("click", function () {
    $(".more-filter").toggle();
  });

  // ==========================================================================
  //  收合bar accordion nav
  // ==========================================================================

  $(".acnav-all").click(function () {
    var label = $(".acnav__label");
    var parent = label.parent(".has-children");
    var list = label.siblings(".acnav__list");

    if (parent.hasClass("is-open")) {
      list.slideUp("fast");
      list.css("display", "flex");
      parent.removeClass("is-open");
    } else {
      list.slideDown("fast");
      list.css("display", "flex");
      parent.addClass("is-open");
    }
  });

  $(".acnav__label").click(function () {
    var label = $(this);
    var parent = label.parent(".has-children");
    var list = label.siblings(".acnav__list");

    if (parent.hasClass("is-open")) {
      list.slideUp("fast");
      list.css("display", "flex");
      parent.removeClass("is-open");
    } else {
      list.slideDown("fast");
      list.css("display", "flex");
      parent.addClass("is-open");
    }
  });

  //Mobile
  $(".acnav__label-m").click(function () {
    var label = $(this);
    var parent = label.parent(".has-children");
    var list = label.siblings(".acnav__list");

    if (parent.hasClass("is-open")) {
      list.slideUp("fast");
      parent.removeClass("is-open");
    } else {
      list.slideDown("fast");
      parent.addClass("is-open");
    }
  });

  /*
   * ==========================================================================
   * 瀏覽器 Resize 事件
   * ==========================================================================
   */

  $window
    .on(
      "resize",
      debounce(function () {
        screenWidth = $window.outerWidth();
        // ctrlMenu(screenWidth);
        fixedHeader(screenWidth, scrollTop);
        ctrlFontsize(screenWidth);
        ctrlCarousel(screenWidth);
      }, 400)
    )
    .trigger("resize");

  /*
   * ==========================================================================
   * 瀏覽器 Scroll 事件
   * ==========================================================================
   */

  $window.on("scroll", function () {
    scrollTop = $window.scrollTop();
    fixedHeader(screenWidth, scrollTop);
    topButtonShower(scrollTop);
    setAnchorScroll(scrollTop);
    ctrlSwipeTableNotice(screenWidth);
  });

  /*
   * ==========================================================================
   * 瀏覽器 Load 事件
   * ==========================================================================
   */

  $window.on("load", function () {
    fixedHeader(screenWidth, scrollTop);
  });

  // ==========================================================================

  /*
   * ==========================================================================
   * 瀏覽器 custom Scroll plugin
   * ==========================================================================
   */
  $(".research__list-scroll").mCustomScrollbar({
    axis: "y", // horizontal scrollbar
    theme: "dark-2", //theme
  });
});
