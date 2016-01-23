
(function () {

    "use strict";

    $( document ).ready(function() {

        var service_url = "https://thawing-thicket-85466.herokuapp.com/api/users/1/organizations/1/teams/";

        var organization_url = "https://thawing-thicket-85466.herokuapp.com/api/users/1/organizations/1/"; 

        $.ajax({
            url: organization_url,

            type: 'GET',

            crossDomain: true,

            // Tell jQuery we're expecting JSONP
            dataType: "json",
         
            // Work with the response
            success: function( response ) {
                var org_name = "";

                $('#header>#h-title').html(response.name);

            },
            error: function( xhr, status, errorThrown ) {
                console.log( "Sorry, there was a problem!" );
                console.log( "Error: " + errorThrown );
                console.log( "Status: " + status );
                console.dir( xhr );
            },
 
            complete: function( xhr, status ) {
                //console.log( "The request is complete!" );
            }
        });


        $.ajax({
            url: service_url,

            type: 'GET',

            crossDomain: true,

            // Tell jQuery we're expecting JSONP
            dataType: "json",
         
            // Work with the response
            success: function( response ) {
                var team_list = "";

                // Log each key in the response data
                $.each( response, function( id, team ) {
                    team_list += '<li class="list-item"><a class="item-content" href="#dashboard/'+team.id+'"><i class="ion-stats-bars"></i><h3>' + team.name + '</h3><p>Equipe ' + team.name + '</p></a></li>';
                    //console.log( id + " : " + team.name );
                });

                $('#left-nav>.list').html(team_list);

                //console.log(team_list);
            },
            error: function( xhr, status, errorThrown ) {
                console.log( "Sorry, there was a problem!" );
                console.log( "Error: " + errorThrown );
                console.log( "Status: " + status );
                console.dir( xhr );
            },
 
            complete: function( xhr, status ) {
                //console.log( "The request is complete!" );
            }
        });

    });

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
        if (hash === "#dashboard/1") {
            dashboard.render("1");
        } else if (hash === "#dashboard/2") {
            dashboard.render("2");
        } else if (hash === "#dashboard/3") {
            dashboard.render("3");
        }
    }

    dashboard.render("None");

}());