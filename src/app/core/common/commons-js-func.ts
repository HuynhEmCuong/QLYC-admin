declare var jQuery:any;
declare let $:any;

export function initFixJQuery() {
  $(function () {
    "use strict";
    $(function () {
        $(".preloader").fadeOut();
    });
    jQuery(document).on('click', '.mega-dropdown', function (e) {
        e.stopPropagation()
    });
    // ==============================================================
    // This is for the top header part and sidebar part
    // ==============================================================
    var set = function () {
            var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            var topOffset = 59;
            if (width < 1170) {
                $("body").addClass("mini-sidebar");
                $('.navbar-brand span').hide();
                $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
                $(".sidebartoggler i").addClass("ti-menu");
            }
            else {
                $("body").removeClass("mini-sidebar");
                $('.navbar-brand span').show();
                //$(".sidebartoggler i").removeClass("ti-menu");
            }

            var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $(".page-wrapper").css("min-height", (height) + "px");
            }

    };
    $(window).ready(set);
    $(window).on("resize", set);
    // ==============================================================
    // Theme options
    // ==============================================================
    $(".sidebartoggler").on('click', function () {
        if ($("body").hasClass("mini-sidebar")) {
            $("body").trigger("resize");
            $(".scroll-sidebar, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible");
            $("body").removeClass("mini-sidebar");
            $('.navbar-brand span').show();
            $(".logo-mini").attr('style','display:none !important');
        }
        else {
            $("body").trigger("resize");
            $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
            $("body").addClass("mini-sidebar");
            $('.navbar-brand span').hide();

            $(".logo-mini").attr('style','display:block !important');
        }
    });
    // topbar stickey on scroll



    // this is for close icon when navigation open in mobile view
    $(".nav-toggler").click(function () {
        $("body").toggleClass("show-sidebar");
        $(".nav-toggler i").toggleClass("ti-menu");
        $(".nav-toggler i").addClass("ti-close");
    });
    $(".sidebartoggler").on('click', function () {
        //$(".sidebartoggler i").toggleClass("ti-menu");
    });
    $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
        $(".app-search").toggle(200);
    });
    // ==============================================================
    // Right sidebar options
    // ==============================================================
    $(".right-side-toggle").click(function () {
        $(".right-sidebar").slideDown(50);
        $(".right-sidebar").toggleClass("shw-rside");
    });
    // ==============================================================
    // Sidebarmenu
    // ==============================================================
    $(function () {
        $('#sidebarnav').metisMenu({

        });
    });
    // ==============================================================
    // Auto select left navbar
    // ==============================================================
    $(function () {
        var url = window.location;
        var element = $('ul#sidebarnav li').filter(function () {
            return this.href == url;
        }).addClass('active').parent().addClass('active');
        while (true) {
            if (element.is('li')) {
                element = element.parent().addClass('in').parent().addClass('active');

            }
            else {
                break;
            }
        }

    });
    /*$('ul#sidebarnav').on('click', 'li', function() {
        $('ul#sidebarnav li.active').removeClass('active');
        $(this).addClass('active');
    });*/
    // ==============================================================
    //tooltip
    // ==============================================================
    $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    // ==============================================================
    //Popover
    // ==============================================================
    $(function () {
            $('[data-toggle="popover"]').popover()
        })

    // ==============================================================
    // Slimscrollbars
    // ==============================================================
    $('.scroll-sidebar').slimScroll({
        position: 'left'
        , size: "5px"
        , height: '100%'
        , color: '#dcdcdc'
     });
    $('.message-center').slimScroll({
        position: 'right'
        , size: "5px"

        , color: '#dcdcdc'
     });


    $('.aboutscroll').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '80'
        , color: '#dcdcdc'
     });
    $('.message-scroll').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '570'
        , color: '#dcdcdc'
     });
    $('.chat-box').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '470'
        , color: '#dcdcdc'
     });

    $('.slimscrollright').slimScroll({
        height: '100%'
        , position: 'right'
        , size: "5px"
        , color: '#dcdcdc'
     });

    // ==============================================================
    // Resize all elements
    // ==============================================================
    $("body").trigger("resize");
    // ==============================================================
    // To do list
    // ==============================================================
    $(".list-task li label").click(function () {
        $(this).toggleClass("task-done");
    });

    // ==============================================================
    // Login and Recover Password
    // ==============================================================
    $('#to-recover').on("click", function () {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
    });

    // ==============================================================
    // Collapsable cards
    // ==============================================================
        $('a[data-action="collapse"]').on('click',function(e){
            e.preventDefault();
            $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ti-minus ti-plus');
            $(this).closest('.card').children('.card-body').collapse('toggle');

        });
        // Toggle fullscreen
        $('a[data-action="expand"]').on('click',function(e){
            e.preventDefault();
            $(this).closest('.card').find('[data-action="expand"] i').toggleClass('mdi-arrow-expand mdi-arrow-compress');
            $(this).closest('.card').toggleClass('card-fullscreen');
        });

        // Close Card
        $('a[data-action="close"]').on('click',function(){
            $(this).closest('.card').removeClass().slideUp('fast');
        });
    // ==============================================================
    // This is for the sparkline charts which is coming in the bradcrumb section
    // ==============================================================
    $('#monthchart').sparkline([5, 6, 2, 9, 4, 7, 10, 12], {
            type: 'bar',
            height: '35',
            barWidth: '4',
            resize: true,
            barSpacing: '4',
            barColor: '#1e88e5'
        });
    $('#lastmonthchart').sparkline([5, 6, 2, 9, 4, 7, 10, 12], {
            type: 'bar',
            height: '35',
            barWidth: '4',
            resize: true,
            barSpacing: '4',
            barColor: '#7460ee'
        });
    var sparkResize;



    $(window).resize(function(e) {
        let widthNavbar =$('.navbar-header').width();
        if(widthNavbar> 60){
            $(".logo-mini").attr('style','display:none !important');
        }
        else{
            $(".logo-mini").attr('style','display:block !important');
        }
      });

      // Theme color settings
      function store(name, val) {
        if (typeof (Storage) !== "undefined") {
          localStorage.setItem(name, val);
        } else {
          window.alert('Please use a modern browser to properly view this template!');
        }
      }
     $("*[data-theme]").click(function(e){
          e.preventDefault();
            var currentStyle = $(this).attr('data-theme');
            store('theme', currentStyle);
            $('#theme').attr({href: 'assets/css/colors/'+currentStyle+'.css'})
        });

        var currentTheme:any = get('theme');
        if(currentTheme)
        {
          $('#theme').attr({href: 'assets/css/colors/'+currentTheme+'.css'});
        }
        // color selector
        $('#themecolors').on('click', 'a', function(){
            $('#themecolors li a').removeClass('working');
            $(this).addClass('working')
          });

   function get(name) {

    }

    $("*[data-theme]").click(function(e){
      e.preventDefault();
        var currentStyle = $(this).attr('data-theme');
        store('theme', currentStyle);
        $('#theme').attr({href: 'assets/css/colors/'+currentStyle+'.css'})
    });

    var currentTheme:any = get('theme');
    if(currentTheme)
    {
      $('#theme').attr({href: 'assets/css/colors/'+currentTheme+'.css'});
    }
    // color selector
$('#themecolors').on('click', 'a', function(){
        $('#themecolors li a').removeClass('working');
        $(this).addClass('working')
      });

});
}

export function IsEditRowDxGrid(){
  let el = $(".dx-datagrid-content .dx-command-edit").find("a");
  if(el.hasClass('dx-link-save')){
    el.each(function(index,element){
      if( $(element).hasClass("dx-link-save")){
        $(element).closest("td").find("a.dx-icon-trash").hide();
        return false;
      }

    })
    $(".nav-tabs li").each(function(){
      $(this).addClass("disabledTab")
    })

    $(".btn-save").attr("disabled","disabled");
    $(".dx-datagrid-toolbar-button").addClass("disabledTab")
    $(".btn-disabled").addClass("disabledTab")
    return true;
  }
  else{
    $(".nav-tabs li").each(function(){
      $(this).removeClass("disabledTab");
    })

    $(".btn-save").removeAttr("disabled");
    $(".dx-datagrid-toolbar-button").removeClass("disabledTab");
    $(".btn-disabled").removeClass("disabledTab")
    return false;
  }
}
