(function () {

    "use strict";

    var dev_host = "http://localhost:8001"
    var prod_host = "https://thawing-thicket-85466.herokuapp.com"

    var teams_url = prod_host+"/api/users/1/organizations/";
    var org_info_url = prod_host+"/api/users/1/organizations/"; 
    var organizations_url = prod_host+"/api/users/";

    angular.module('kpisdashboard', ['ionic'])


    //afactory to consume the api and return data to controllers.
    //http://code.ciphertrick.com/2015/04/29/ajax-requests-with-angularjs/
    .factory('api',['$http',function($http){
        return {
            getOrganizations : function(user_id){
                return  $http.get(organizations_url+user_id+'/organizations/').then(function(response){ //wrap it inside another promise using then
                            return response.data;  //only return teams
                        });
            },

            getTeams : function(organization_id){
                return  $http.get(teams_url+organization_id+'/teams').then(function(response){ //wrap it inside another promise using then
                            return response.data;  //only return teams
                        });
            },

            getOrgInfo : function(organization_id) {
                return  $http.get(org_info_url+organization_id).then(function(response){ //wrap it inside another promise using then
                            return response.data;  //only return organization info
                        });                
            }
        }
    }])

    .controller('dashboardCtrl', ['api', '$scope', '$ionicPopup', function(api, $scope, $ionicPopup){
            api.getOrganizations().then(function(response){
                $scope.organizations = response;
            });

            //api.getOrgInfo().then(function(response){
            //    $scope.organization = response;
            //});            

            $scope.changeOrganization = function(){
                $ionicPopup.prompt({
                    title: "Escolher organização:",
                    inputPlaceholder: "Org ID",
                    okText: "Mudar"
                }).then(function(res){
                    if (res) {
                        api.getTeams(res).then(function(response){
                            $scope.teams = response;
                        });

                        api.getOrgInfo(res).then(function(response){
                            $scope.organization = response;
                        });
                    } 
                })
            };

            function render_dashboard(team) {
                console.log(team);

                var kpis = team.kpis;

                var html = '<div class="row">';

                var idx = 0;

                $.map(kpis, function(kpi) {
                    console.log(kpi);

                    var current_value = kpi.values[0].value;
                    
                    var lower_limit = 0;
                    var upper_limit = 0;                    

                    if (kpi.limits.length > 0) {
                        lower_limit = kpi.limits[0].lower_limit; 
                        upper_limit = kpi.limits[0].upper_limit;
                    };


                    idx += 1;                    

                    html += '<div class="quadrant"><div class="analysis-block-md ';

                    if (current_value <= lower_limit) {
                        html += 'green';
                    } else if (current_value >= upper_limit) {
                        html += 'red';
                    } else {
                        html += 'yellow';
                    }

                    html += '" id="kpi'+kpi.id+'" ><div class="stat-title">'+
                    '<h4>'+kpi.name+'</h4></div><div class="stat-value" id="count-errors">'+current_value+'</div></div></div>';

                    if ((idx > 1) && ((idx % 2) == 0)) { 
                        html += '</div><div class="row">';
                    };                        

                });

                html += '</div>';


                /*'<div class="quadrant">'+
                    '<div class="analysis-block-md" id="q-error-count"><div class="stat-title"><h4>Número de Erros</h4></div>'+
                    '<div class="stat-value" id="count-errors">'+team.id+'</div></div></div>'+
                    '<div class="quadrant"><div class="analysis-block-md" id="q-process">'+
                    '<div class="stat-title"><h4>Processo</h4></div>'+
                    '<div class="stat-value" id="process-value">'+team.id+'</div></div></div></div>'+
                    '<div class="row"><div class="quadrant">'+
                    '<div class="analysis-block-md" id="q-code-quality"><div class="stat-title"><h4>Qualidade de Código</h4></div>'+
                    '<div class="stat-value" id="code-quality-count">'+team.id+'</div></div></div><div class="quadrant">'+
                    '<div class="analysis-block-md" id="q-productivity"><div class="stat-title"><h4>Produtividade</h4></div>'+
                    '<div class="stat-value" id="productivity-count">'+team.id+'</div></div></div></div>';*/

                 $("#content").html(html);
            }

            // Basic view routing
            $(window).on('hashchange', route);            

            function route() {                                
                var hash = window.location.hash;

                //console.log("route changed to " + hash);

                var team_id = location.hash.substr(1).split('/')[2];

                //console.log($scope.teams[team_id-1]);                

                $.map($scope.teams, function(obj) {
                    if (obj.id == team_id)
                        $scope.selected_team = obj;
                });

                render_dashboard($scope.selected_team);

                //if (hash === "#/dashboard/1") {
                //    dashboard.render("1");
                //} else if (hash === "#/dashboard/2") {
                //    dashboard.render("2");
                //} else if (hash === "#/dashboard/3") {
                //    dashboard.render("3");
                //}
            }

            //dashboard.render("None"); 

    }]);        

    $( document ).ready(function() {

        /*
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
        }); */

        /*
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
        }); */

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

    /* Basic view routing
    $(window).on('hashchange', route);

    function route() {
        console.log("route changed to " + window.location.hash);
        console.log($scope.teams);

        var hash = window.location.hash;
        if (hash === "#/dashboard/1") {
            dashboard.render("1");
        } else if (hash === "#/dashboard/2") {
            dashboard.render("2");
        } else if (hash === "#/dashboard/3") {
            dashboard.render("3");
        }
    }

    dashboard.render("None"); */

}());