var temp = 5;
var csshelper = (function() {
//var csshelper = {

  var getStyleRuleValue = function(style, selector, sheetparam) {
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
  };

})();

//alert("temp is " + temp);
//alert("loading csshelper, it is:" + csshelper);
//alert(csshelper);

///*
//getStyleRuleValueX = (style, selector, sheetparam) ->
//  sheets = (if typeof sheetparam isnt "undefined" then [sheetparam] else document.styleSheets)
//  i = 0
//  l = sheets.length
//
//  while i < l
//    sheet = sheets[i]
//    continue unless sheet.cssRules
//    j = 0
//    k = sheet.cssRules.length
//
//    while j < k
//      rule = sheet.cssRules[j]
//      return rule.style[style]  if rule.selectorText and rule.selectorText.split(",").indexOf(selector) isnt -1
//      j++
//    i++
//*/
