/*
 * IE Alert! jQuery plugin
 * version 1
 */
(function (jQuery) {

    if (jQuery.browser) return;

    jQuery.browser = {};
    jQuery.browser.mozilla = false;
    jQuery.browser.webkit = false;
    jQuery.browser.opera = false;
    jQuery.browser.msie = false;

    var nAgt = navigator.userAgent;
    jQuery.browser.name = navigator.appName;
    jQuery.browser.fullVersion = '' + parseFloat(navigator.appVersion);
    jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera, the true version is after "Opera" or after "Version" 
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        jQuery.browser.opera = true;
        jQuery.browser.name = "Opera";
        jQuery.browser.fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
    }
        // In MSIE, the true version is after "MSIE" in userAgent 
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        jQuery.browser.msie = true;
        jQuery.browser.name = "Microsoft Internet Explorer";
        jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
    }
        // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        jQuery.browser.webkit = true;
        jQuery.browser.name = "Chrome";
        jQuery.browser.fullVersion = nAgt.substring(verOffset + 7);
    }
        // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        jQuery.browser.webkit = true;
        jQuery.browser.name = "Safari";
        jQuery.browser.fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
    }
        // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        jQuery.browser.mozilla = true;
        jQuery.browser.name = "Firefox";
        jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
    }
        // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
    (verOffset = nAgt.lastIndexOf('/'))) {
        jQuery.browser.name = nAgt.substring(nameOffset, verOffset);
        jQuery.browser.fullVersion = nAgt.substring(verOffset + 1);
        if (jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase()) {
            jQuery.browser.name = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present 
    if ((ix = jQuery.browser.fullVersion.indexOf(";")) != -1)
        jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix);
    if ((ix = jQuery.browser.fullVersion.indexOf(" ")) != -1)
        jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix);

    jQuery.browser.majorVersion = parseInt('' + jQuery.browser.fullVersion, 10);
    if (isNaN(jQuery.browser.majorVersion)) {
        jQuery.browser.fullVersion = '' + parseFloat(navigator.appVersion);
        jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
    }
    jQuery.browser.version = jQuery.browser.majorVersion;
})(jQuery);

(function ($) {
    $("body").on("click", "#goon", function () {
        $("#ie-alert-overlay").hide();
        $("#ie-alert-panel").hide();
    });
    function initialize($obj, support, title, text) {

        var panel = "<span>" + title + "</span>"
				  + "<p> " + text + "</p>"
			      + "<div class='browser'>"
			      + "<ul>"
			      + "<li><a class='chrome' href='https://www.google.com/chrome/' target='_blank'></a></li>"
			      + "<li><a class='firefox' href='http://www.mozilla.org/en-US/firefox/new/' target='_blank'></a></li>"
			      + "<li><a class='ie9' href='http://windows.microsoft.com/en-US/internet-explorer/downloads/ie/' target='_blank'></a></li>"
			      + "<li><a class='safari' href='http://www.apple.com/safari/download/' target='_blank'></a></li>"
			      + "<li><a class='opera' href='http://www.opera.com/download/' target='_blank'></a></li>"
			      + "<ul>"
			      + "</div>";

        var overlay = $("<div id='ie-alert-overlay'></div>");
        var iepanel = $("<div id='ie-alert-panel'>" + panel + "</div>");

        var docHeight = $(document).height();

        overlay.css("height", docHeight + "px");





        if (support === "ie8") { 			// shows the alert msg in IE8, IE7, IE6

            if ($.browser.msie && parseInt($.browser.version, 10) < 9) {

                $obj.prepend(iepanel);
                $obj.prepend(overlay);

            }

            if ($.browser.msie && parseInt($.browser.version, 10) === 6) {


                $("#ie-alert-panel").css("background-position", "-626px -116px");
                $obj.css("margin", "0");

            }


        } else if (support === "ie7") { 	// shows the alert msg in IE7, IE6

            if ($.browser.msie && parseInt($.browser.version, 10) < 8) {

                $obj.prepend(iepanel);
                $obj.prepend(overlay);
            }

            if ($.browser.msie && parseInt($.browser.version, 10) === 6) {

                $("#ie-alert-panel").css("background-position", "-626px -116px");
                $obj.css("margin", "0");

            }

        } else if (support === "ie6") { 	// shows the alert msg only in IE6

            if ($.browser.msie && parseInt($.browser.version, 10) < 7) {

                $obj.prepend(iepanel);
                $obj.prepend(overlay);

                $("#ie-alert-panel").css("background-position", "-626px -116px");
                $obj.css("margin", "0");

            }
        }

    }; //end initialize function


    $.fn.iealert = function (options) {
        var defaults = {
            support: "ie7",  // ie8 (ie6,ie7,ie8), ie7 (ie6,ie7), ie6 (ie6)
            title: "<br/><br/>\u81f4\u4eb2\u7231\u7684\u7528\u6237\uff1a", // title text
            text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u60a8\u7684\u6d4f\u89c8\u5668\u592a\u53e4\u8463\u5566\uff0c\u8fd9\u5c06\u76f4\u63a5\u5f71\u54cd\u60a8\u7684\u6d4f\u89c8\u4f53\u9a8c\uff01\u7531\u4e8e\u60a8\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u5e76\u4e0d\u80fd\u652f\u6301\u6700\u65b0\u7684\u6280\u672f\uff0c\u6240\u4ee5\u8fd9\u91cc\u4e3a\u60a8\u7cbe\u5fc3\u51c6\u5907\u4e86\u51e0\u6b3e\u9ad8\u5927\u4e0a\u7684\u6d4f\u89c8\u5668\u4f9b\u60a8\u9009\u62e9\uff0c\u70b9\u51fb\u5c31\u80fd\u4e0b\u8f7d\u54e6\uff01\u795d\u6211\u4eec\u5408\u4f5c\u6109\u5feb\uff01<br /><br />"
        };


        var option = $.extend(defaults, options);




        return this.each(function () {
            if ($.browser.msie) {
                var $this = $(this);
                initialize($this, option.support, option.title, option.text);
            } //if ie	
        });

    };
})(jQuery);
