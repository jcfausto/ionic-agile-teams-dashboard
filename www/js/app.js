(function () {

    "use strict";

    document.addEventListener("deviceready", function () {
        FastClick.attach(document.body);
        StatusBar.overlaysWebView(false);
    }, false);


    // Show/hide menu toggle
    $('#btn-menu').click(function () {
        if ($('#container').hasClass('offset')) {
            $('#container').removeClass('offset');
        } else {
            $('#container').addClass('offset');
        }
        return false;
    });

    // Basic view routing
    $(window).on('hashchange', route);

    function route() {
        var hash = window.location.hash;
        if (hash === "#dashboard/franca") {
            dashboard.render("franca");
        } else if (hash === "#dashboard/aguia") {
            dashboard.render("aguia");
        } else if (hash === "#dashboard/geinfo") {
            dashboard.render("geinfo");
        }
    }

    dashboard.render("None");

}());