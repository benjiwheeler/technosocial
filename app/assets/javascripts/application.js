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
//= require_tree .


$(document).ready(function(){
  $('#beforeafter').beforeAfter();

  });


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



$('body').on('flick', function(e) {
    if ('horizontal' == e.orientation) {
        if (1 == e.direction) {
      console.log("onflick: left ");
//          alert("openLeft called for flick");
          openLeft();
        }
        else {
      console.log("onflick: right ");
          openRight();
        }
    }
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





