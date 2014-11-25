// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require jquery.mobile
//= require turbolinks
//= require jquery.beforeafter
//= require_tree .



/*
// direct event
  $('.touchme').on('tap', function() {
    console.log('direct');
    alert("touch");
  });
*/
  // delegated event
/*
$('body').on('tap', '.touchme', function() {
    console.log('delegated');
    alert("tap");
  });
*/
    // remove 300ms
    $('body').on('tap', 'a', function(e) {
    window.location = $(this).attr('href');
    e.preventDefault();
});

  $(document).on( "swiperight", function(e) {
//          alert("openLeft called for flick");
          openLeft();
});

  $(document).on( "swipeleft", function(e) {
      console.log("onflick: right ");
          openRight();
});




function getStyleRuleValue(style, selector, sheetparam) {
    var sheets = typeof sheetparam !== 'undefined' ? [sheetparam] : document.styleSheets;
    for (var i = 0, l = sheets.length; i < l; i++) {
        var sheet = sheets[i];
        if( !sheet.cssRules ) { continue; }
        for (var j = 0, k = sheet.cssRules.length; j < k; j++) {
            var rule = sheet.cssRules[j];
            if (rule.selectorText && rule.selectorText.split(',').indexOf(selector) !== -1) {
                return rule.style[style];
            }
        }
    }
    return null;
}




$(function () {
        Highcharts.getOptions().plotOptions.bar.colors = (function () {
        var colors = [],
            base = Highcharts.getOptions().colors[0],
            i;

        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());


    $('#dayo_graph').highcharts({
        chart: {
            type: 'bar',
            spacing: [0, 0, 0, 0],
            backgroundColor: 'rgba(0, 0, 0, 0)'

        },
                        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
                title: {
            text: null,
                },
        legend: {
            enabled: false
        },
        yAxis: {
            tickPosition: "inside",
            tickInterval: .1,
            tickLength: 2,
            max: 1,
            title: {
            text: null
        },
            labels: {
                enabled: false
            }
        },
        xAxis: {
                               tickLength: 0,
            labels: {
                enabled: false
            }
        },
        plotOptions: {
                               bar: {
                               pointWidth: 25,
                                           colorByPoint: true,
                               colors: this.colors

                               },
            series: {
                stacking: 'normal',
                            dataLabels: {
                                color: 'white',
                    enabled: true,
                    useHTML: true,
                               y: 0,

                    formatter: function () {
    var num = this.percentage;
        return '<div style="top: 0">' + num + "% " + this.series.name + '</div>';
                    }

                }
            }

        },
        series: [{
            name: 'Javascript',
            data: [.5]
        }, {
            name: 'Rails',
            data: [.2]
        }, {
            name: 'Python',
            data: [.3]
        }]
    });
});




