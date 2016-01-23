var dashboard = (function () {

    "use strict";

    // Currently selected dashboard values
    var chart1,
        chart2,
        chart3, 
        chart4;

    /* Render the dashboard */

    // <div class="quadrant aqua pull-left"></div><div class="quadrant blue pull-right" ></div><div class="quadrant green pull-left bottom"></div><div class="quadrant tan pull-right bottom"></div>

    function getCurrentValueForTeam(team, indicator) {
        if (team === "1") {
            if (indicator === "errornumber"){
                return results["20161"][0].errornumber
            } else if (indicator === "process") {
                return results["20161"][0].process
            } else if (indicator === "codequality") {
                return results["20161"][0].codequality
            } else if (indicator === "productivity") {
                return results["20161"][0].productivity
            }            
        } else if (team === "2") {
            if (indicator === "errornumber"){
                return results["20161"][1].errornumber
            } else if (indicator === "process") {
                return results["20161"][1].process
            } else if (indicator === "codequality") {
                return results["20161"][1].codequality
            } else if (indicator === "productivity") {
                return results["20161"][1].productivity
            }
        } else if (team === "3") {
            if (indicator === "errornumber"){
                return results["20161"][2].errornumber
            } else if (indicator === "process") {
                return results["20161"][2].process
            } else if (indicator === "codequality") {
                return results["20161"][2].codequality
            } else if (indicator === "productivity") {
                return results["20161"][2].productivity
            }
        } else if (team === "None") {
            return 0;
        }
    }


    function updateErrorsNumber(team) {
        var current_value = getCurrentValueForTeam(team, "errornumber");
        var threshold = 10;

        $('#count-errors').html(current_value);
        $('#q-error-count').toggleClass("red", current_value < threshold);
        $('#q-error-count').toggleClass("green", current_value > threshold);
        $('#q-error-count').toggleClass("yellow", current_value === threshold);
    }


    function updateProcess(team) {
        var current_value = getCurrentValueForTeam(team, "process");
        var threshold = 10;        

        $('#process-value').html(current_value);
        $('#q-process').toggleClass("red", current_value < threshold);
        $('#q-process').toggleClass("green", current_value > threshold);
        $('#q-process').toggleClass("yellow", current_value === threshold);        
    }    



    function updateCodeQuality(team) {        
        var current_value = getCurrentValueForTeam(team, "codequality");
        var threshold = 10;      

        $('#code-quality-count').html(current_value);
        $('#q-code-quality').toggleClass("red", current_value < threshold);
        $('#q-code-quality').toggleClass("green", current_value > threshold);
        $('#q-code-quality').toggleClass("yellow", current_value === threshold);
    }    


    function updateProductivity(team) {
        var current_value = getCurrentValueForTeam(team, "productivity");
        var threshold = 10;

        $('#productivity-count').html(current_value);
        $('#q-productivity').toggleClass("red", current_value < threshold);
        $('#q-productivity').toggleClass("green", current_value > threshold);
        $('#q-productivity').toggleClass("yellow", current_value === threshold);
    }    

    function render(team) {

        var html = '<div class="row"><div class="quadrant">'+
        '<div class="analysis-block-md" id="q-error-count"><div class="stat-title"><h4>Número de Erros</h4></div>'+
        '<div class="stat-value" id="count-errors">17</div></div></div>'+
        '<div class="quadrant"><div class="analysis-block-md" id="q-process">'+
        '<div class="stat-title"><h4>Processo</h4></div>'+
        '<div class="stat-value" id="process-value">17</div></div></div></div>'+
        '<div class="row"><div class="quadrant">'+
        '<div class="analysis-block-md" id="q-code-quality"><div class="stat-title"><h4>Qualidade de Código</h4></div>'+
        '<div class="stat-value" id="code-quality-count">17</div></div></div><div class="quadrant">'+
        '<div class="analysis-block-md" id="q-productivity"><div class="stat-title"><h4>Produtividade</h4></div>'+
        '<div class="stat-value" id="productivity-count">17</div></div></div></div>';

        $("#content").html(html);

        chart1 = updateErrorsNumber(team);
        chart2 = updateProcess(team);
        chart3 = updateCodeQuality(team);
        chart4 = updateProductivity(team);
    }

    return {
        render: render
    }

}());