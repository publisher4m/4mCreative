//select box 클릭 시 이벤트
var selEvent = {
    init:function(){
        var selectType0 = $(".selectBox00>select");
        var selectType1 = $(".selectBox>select");

        selectChange(selectType0);
        selectChange(selectType1);

        function selectChange(type){
            type.change(function(){
                var select_name = $(this).children("option:selected").text();
                $(this).siblings("label").text(select_name);
            });
        };
    }
};

//inputbox
var inEvent = {
    init:function(){
        var placeholderTarget = $('input[type="text"], input[type="password"], input[type="mail"], textarea');

        placeholderTarget.on('focus', function(){
            $(this).siblings('label').fadeOut();
        });

        placeholderTarget.on('focusout', function(){
            if($(this).val() === ''){
                $(this).siblings('label').fadeIn();
            }
        });
    }
};

//data ajax
var ajaxManager = {
    getData:function(refUrl,callback){
        $.ajax({
            type:"GET",
            url:refUrl,
            dataType:"json",
            success:callback,
            error:function(e){
//                alert("Get Ajax Error :: "+e.reponseText);
            }
        });
    }
};

//gnb event
var gnbEvent = {
    scrollTime:300,
    logoTime:250,
    curIdx:0,
    init:function(){
        this.targetScroll();
        this.scrollEvent();
    },
    setDevice:function(){
        var _ = this;
        var windowWidth = $(window).width();
        if(windowWidth < 769){
//            $(".main_area").addClass("blind");
            $(".main_area").css("opacity",0);
            $(".main_area").css("height",0);
            $("#works").addClass("blind");
            $("#about").addClass("blind");
            $("#contact").addClass("blind");

            $(".header .gnb .gMenu ul li").each(function(){
                if($(this).hasClass("active") == true){
                    _.curIdx = $(this).index();
                }
                switch(_.curIdx){
                    case 0:
//                        $(".main_area").removeClass("blind");
                        $(".main_area").css("opacity",1);
                        $(".main_area").css("height","auto");
                        break;
                    case 1:
                        $("#works").removeClass("blind");
                        break;
                    case 2:
                        $("#about").removeClass("blind");
                        break;
                    case 3:
                        $("#contact").removeClass("blind");
                        break;
                }
            });
        }else{
           $(".main_area").removeClass("blind");
            $(".main_area").css("opacity",1);
            $(".main_area").css("height","auto");
            $("#works").removeClass("blind");
            $("#about").removeClass("blind");
            $("#contact").removeClass("blind");
        }
    },
    targetScroll:function(){
        var THIS = this;
        $(".header .gnb .gMenu ul li a").on("click",function(){
            var _ = this;
            var windowWidth = $(window).width();
            var curIdx = $(this).parent().index();
            if(windowWidth < 769){
                $(".header .gnb .gMenu ul li").removeClass("active");
                $(this).parent().addClass("active");

                $(".main_area").addClass("blind");
                $("#works").addClass("blind");
                $("#about").addClass("blind");
                $("#contact").addClass("blind");

                switch(curIdx){
                    case 0:
                       $(".main_area").removeClass("blind");
                        break;
                    case 1:
                        $("#works").removeClass("blind");
                        break;
                    case 2:
                        $("#about").removeClass("blind");
                        break;
                    case 3:
                        $("#contact").removeClass("blind");
                        mapOffice.init();
                        break;
                }
                $("html, body").animate({ scrollTop:0 }, 0);
            }else{
              $(".header .gnb .gMenu ul li").removeClass("active");
                if(curIdx == 0){
                    $("html, body").animate({ scrollTop:0 }, THIS.scrollTime);
                    $(".header .gnb .gMenu ul li").eq(0).addClass("active");
                    return false;
                }
                var curTarget = $(this).attr("alt");
                var scrollPosition = $("#"+curTarget).offset().top;
                $("html, body").animate({ scrollTop: scrollPosition }, THIS.scrollTime, function(){
                    $(_).parent().addClass("active");
                });
            }
            // gnbEvent.setDevice();
        });
    },
    scrollEvent:function(){
        var _ = this;
        //logo change
        $(window).scroll(function(){
            var sBeforeSrc = "images/logo/logo_pc.png";
            var sAfterSrc = "images/logo/logo_s.png";
            var curTop = $(window).scrollTop();
            var scrollLogo = $(".header").innerHeight();
            var windowWidth = $(window).width();

            if(curTop > scrollLogo){
                $(".header").css("border-bottom","1px solid #e5e5e5");
                $(".header h1 img").attr("src",sAfterSrc);
                $(".header h1 img").stop().animate({ width:55 }, _.logoTime);
                $(".header").stop().animate({ padding:"1rem 0 .5rem 0" }, _.logoTime);

                if(windowWidth < 769){
                    $(".header").css("border-bottom","1px solid #e6e6e6");
                    $(".header h1").css("position","absolute");
                    $(".header h1").css("left","1rem");
                    $(".header .gnb .gMenu").stop().animate({ top:"-.7rem", paddingLeft:"40%" }, _.logoTime);
                    if(windowWidth < 415){
                        $(".header .gnb .gMenu").stop().animate({ top:"-.7rem", paddingLeft:"20%" }, _.logoTime);
                        $(".header h1").css("top","10%");
                    }else{
                        $(".header h1").css("top",".5rem");
                    }
                }else{
                    $(".header .gnb .gMenu").stop().animate({ marginTop:"1rem" }, _.logoTime);
                }

            }else if(curTop < scrollLogo){
                $(".header").css("border-bottom",0);
                $(".header").stop().animate({ padding:"2rem 0 1.75rem 0" }, _.logoTime);
                $(".header h1 img").attr("src",sBeforeSrc);

                $(".header h1").css("position","relative");
                $(".header h1").css("top","0");
                $(".header h1").css("left","0");

                if(windowWidth < 769){
                    $(".header h1 img").stop().animate({ width:"5.75rem" }, _.logoTime);
                }else{
                    $(".header .gnb .gMenu").stop().animate({ marginTop:"1.25rem" }, _.logoTime);
                    $(".header h1 img").stop().animate({ width:115 }, _.logoTime);
                }
                $(".header .gnb .gMenu").stop().animate({ top:0, paddingLeft:0 }, 0);
            }
        });
    }
};

//visual slide event
var swiperEvent = {
    visualTitle:["2020년 2월<br/>포엠크리에이티브 13주년","2019년 웹어워드, 스마트 앱 어워드<br/>분야별 다수 수상!","에코어워드 웹인증, 웹접근성분야<br/>2년 연속 대상!"],
    visualNotice:[
        "여러분의 성원과 관심 속에 13주년이 되었습니다.<br/>앞으로 더 발전하는 포엠크리에이티브가 되도록 하겠습니다.",
        "LG화학 글로벌 이노베이션 센터 글로벌서비스분야 대상<br/>맥도날드 글로벌 빅맥 원정대 제품브랜드분야 최우수상<br/>LG화학 유디 건강/의료분야 대상 (APP)<br/>2019년 포엠 크리에이티브는 위와 같은 상을 수상하였습니다.",
        "웹 접근성분야 최우수상 (IECO.2016)<br/>모바일 접근성분야 대상 (IECO.2016)<br/>웹 접근성분야 대상 (IECO.2015)"],
    slideIdx:0,
    init:function(){
        var _ = this;
        var mySwiper = new Swiper("#product_visual",{
            slidesPerView:1,
            slidesPerGroup:1,
			/* centeredSlides: true, */
			spaceBetween: 30,
            autoplay:5000,
            loop: true,
            prevButton: "#fPrev",
            nextButton: "#fNext",
            onSlideChangeStart:function(swiper){
                var curIdx = swiper.activeIndex-1;
                if(curIdx > 2){
                    curIdx = 0;
                }else if(curIdx < 0){
                    curIdx = _.visualTitle.length-1;
                }
                _.slideIdx = curIdx;
                _.noticeEvent(curIdx);
            }
	         });

        $("#fPrev").on("click",function(){
            mySwiper.swipePrev();
            _.noticeEvent(_.slideIdx);
        });
        $("#fNext").on("click",function(){
            mySwiper.swipeNext();
            _.noticeEvent(_.slideIdx);
        });
        this.arrowHover();

        // $(window).resize(function(){
        //   var winWidth = $(window).width();
        //   if(winWidth <= 414){
        //     $("#product_visual .swiper-slide img").addClass("blind");
        //     $("#product_visual .swiper-slide img").eq(1).removeClass("blind");
        //   }else if(winWidth > 414){
        //     $("#product_visual .swiper-slide img").addClass("blind");
        //     $("#product_visual .swiper-slide img").eq(0).removeClass("blind");
        //   }
        // });
        //
        // $(function(){
        //   var winWidth = $(window).width();
        //   if(winWidth <= 414){
        //     $("#product_visual .swiper-slide img").addClass("blind");
        //     $("#product_visual .swiper-slide img").eq(1).removeClass("blind");
        //   }else if(winWidth > 414){
        //     $("#product_visual .swiper-slide img").addClass("blind");
        //     $("#product_visual .swiper-slide img").eq(0).removeClass("blind");
        //   }
        // });
    },
    aboutInit:function(){
        var _ = this;
        var mySwiper = new Swiper("#award_visual",{
            slidesPerView:1,
            slidesPerGroup:1,
            autoplay:5000,
            loop: true,
            prevButton: "#fPrev02",
            nextButton: "#fNext02"
       });

        $("#fPrev02").on("click",function(){
            mySwiper.swipePrev();
            _.noticeEvent(_.slideIdx);
        });
        $("#fNext02").on("click",function(){
            mySwiper.swipeNext();
            _.noticeEvent(_.slideIdx);
        });

        this.arrowHover();

        $(window).resize(function(){
          var winWidth = $(window).width();
          if(winWidth <= 414){
            $(".award_visual_box .swiper-slide").each(function(){
              $(this).find("img").eq(0).addClass("blind");
              $(this).find("img").eq(1).removeClass("blind");
            });
          }else if(winWidth > 414){
            $(".award_visual_box .swiper-slide").each(function(){
              $(this).find("img").eq(0).removeClass("blind");
              $(this).find("img").eq(1).addClass("blind");
            });
          }
        });

        $(function(){
          var winWidth = $(window).width();
          if(winWidth <= 414){
            $(".award_visual_box .swiper-slide").each(function(){
              $(this).find("img").eq(0).addClass("blind");
              $(this).find("img").eq(1).removeClass("blind");
            });
          }else if(winWidth > 414){
            $(".award_visual_box .swiper-slide").each(function(){
              $(this).find("img").eq(0).removeClass("blind");
              $(this).find("img").eq(1).addClass("blind");
            });
          }
        });


    },
    arrowHover:function(){
        $(".arrow").hover(function(){
            $(this).find("img").eq(1).stop().animate({ opacity:1 },300);
        },function(){
            $(this).find("img").eq(1).stop().animate({ opacity:0 },300);
        });
    },
    noticeEvent:function(idx){
        var _ = this;
        $(".visual_notice .notice .event_box").stop().animate({ opacity:0, marginLeft:-100 },500,function(){
            $(this).find("p").eq(0).html(_.visualTitle[idx]);
            $(this).find("p").eq(1).html(_.visualNotice[idx]);
            $(this).stop().animate({ opacity:0, marginLeft:100 },0,function(){
                $(this).stop().animate({ opacity:1, marginLeft:0 }, 500);
            });
        });
        $(".slide_navigation ul li").removeClass("active");
        $(".slide_navigation ul li").eq(idx).addClass("active");
    }
};

//footer event
var footEvent = {
    eventTime:300,
    scrollTime:300,
    init:function(){
        this.btnEvent();
        this.naviEvent();
    },
    btnEvent:function(){
        var _ = this;
        var _ = this;
        var filter = "win16|win32|win64|mac|macintel";
        if(navigator.platform){
            if(filter.indexOf(navigator.platform.toLowerCase()) < 0){}
            else{
                //pc
                $(".footer .btn_img_event").hover(function(){
                    $(this).find("a img").eq(1).stop().animate({ opacity:1 }, _.eventTime);
                },function(){
                    $(this).find("a img").eq(1).stop().animate({ opacity:0 }, _.eventTime);
                });
            }
        }

        $(".footer .btn_txt_event").hover(function(){
            $(this).find("a").stop().animate({ backgroundColor:"#fff", color:"#000" }, _.eventTime);
        },function(){
            $(this).find("a").stop().animate({ backgroundColor:"#333637", color:"#636363" }, _.eventTime);
        });

        $(".footer .btn_re_event").hover(function(){
            $(this).find("a").stop().animate({ backgroundColor:"#000", color:"#fff" }, _.eventTime);
        },function(){
            $(this).find("a").stop().animate({ backgroundColor:"#333637", color:"#636363" }, _.eventTime);
        });

        $(".footer .summary .moveTop").on("click",function(){
            $("html, body").stop().animate({ scrollTop:0 }, _.eventTime);
        });

        $(".contactBox .btn_re_event").hover(function(){
            $(this).find("a").stop().animate({ backgroundColor:"#fff", color:"#172556" }, _.eventTime);
        },function(){
            $(this).find("a").stop().animate({ backgroundColor:"#172556", color:"#fff" }, _.eventTime);
        });

        $(".popup_wrap .btn_re_event").hover(function(){
            $(this).find("a").stop().animate({ backgroundColor:"#fff", color:"#000" }, _.eventTime);
        },function(){
            $(this).find("a").stop().animate({ backgroundColor:"#000", color:"#fff" }, _.eventTime);
        });
    },
    naviEvent:function(){
        var THIS = this;
        $(".footer .summary ul li .notice_box ul li a").on("click",function(){
            var _ = this;
            var curIdx = $(this).parent().index();
            if(curIdx == 0){
                $("html, body").animate({ scrollTop:0 }, THIS.scrollTime);
                return false;
            }
            var curTarget = $(this).attr("alt");
            var scrollPosition = $("#"+curTarget).offset().top;
            $("html, body").animate({ scrollTop: scrollPosition }, THIS.scrollTime, function(){
                $(".header .gnb .gMenu ul li").removeClass("active");
                $(_).parent().addClass("active");
            });
        });
    }
};

//file
var fsUpload = {
    init:function(){
        var fileTarget = $('.filebox .upload-hidden');
        fileTarget.on('change', function(){
            if(window.FileReader){
                var filename = $(this)[0].files[0].name;
            } else {
                var filename = $(this).val().split('/').pop().split('\\').pop();
            }
            $(this).siblings('.upload-name').val(filename);
        });
    }
};

/* contact event */
var contactEvent = {
    init:function(){

    },
    requestInit:function(){
        $(".pop_cont.popRequest input").val("");
        $(".pop_cont.popRequest textarea").val("");
        $(".upload-name").val("파일 업로드");
        $(".pop_cont.popRequest input, .pop_cont.popRequest textarea").blur();
    },
    recruitinit:function(){
        $(".pop_cont.popRecruit input").val("");
        $(".pop_cont.popRecruit textarea").val("");
        $(".upload-name").val("파일 업로드");
        $(".pop_cont.popRecruit input, .pop_cont.popRecruit textarea").blur();
    }
};

//layer popup
var layerPop = {
    init:function(){

    },
    //팝업 출력
    popOpen:function(curPop){
        $("."+curPop).parents(".popup_wrap").removeClass("popup_hide");
        window.rememberT = $(window).scrollTop();
        $('html').addClass('fixed').css('top', -window.rememberT);
        switch(curPop){
            case "popRequest":
                contactEvent.requestInit();
                break;
            case "popRecruit":
                contactEvent.recruitinit();
                break;
        }
    },
    //팝업 닫기
    popClose:function(curPop){
        $(curPop).parents(".popup_wrap").addClass("popup_hide");
        $('html').removeClass('fixed').css('top', window.rememberT);
        $(window).scrollTop(window.rememberT);
    }
};

//kakao map
var mapOffice = {
    // latlng:[37.4769460, 127.0381350],
    latlng:[37.47667824826565, 127.03814909935119],
    init:function(){
        this.setMap();
    },
    setMap:function(){
      //좌표 검색
      //카카오 맵은 좌표가 안떠서 아래코드 주석해제 후 콘솔로그에서 좌표 확인
      // var geocoder = new kakao.maps.services.Geocoder();
      // geocoder.addressSearch('서울시 서초구 양재천로19길 28 소닉밸류빌딩', function(result, status) {
      //   console.log(result[0].x);
      //   console.log(result[0].y);
      // });


        $("#map_office").html(" ");
        var mapContainer = document.getElementById("map_office"), // 지도를 표시할 div
        mapOption = {
            center: new daum.maps.LatLng(this.latlng[0], this.latlng[1]), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        var map = new daum.maps.Map(mapContainer, mapOption);

        // 마커가 표시될 위치입니다
        var markerPosition  = new daum.maps.LatLng(this.latlng[0], this.latlng[1]);

        // 마커를 생성합니다
        var marker = new daum.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    }
};

//공통된 년도 없애기
var sameWord = {
  init:function(){
    $(".workBox .works_list .list_view ul li a .data_box p.notice").each(function(){
      //변수 추가
      var yearIs18 = $(this).text().indexOf("2018");
      var yearIs19 = $(this).text().indexOf("2019");
      var yearIs20 = $(this).text().indexOf("2020");

      if(yearIs18 > -1 || yearIs19 > -1 || yearIs20 > -1){
        $(this).parent().find(".period").addClass("blind");
      }

    });
  }
};
