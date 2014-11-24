# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

getStyleRuleValueX = (style, selector, sheetparam) ->
  sheets = (if typeof sheetparam isnt "undefined" then [sheetparam] else document.styleSheets)
  i = 0
  l = sheets.length

  while i < l
    sheet = sheets[i]
    continue unless sheet.cssRules
    j = 0
    k = sheet.cssRules.length

    while j < k
      rule = sheet.cssRules[j]
      return rule.style[style]  if rule.selectorText and rule.selectorText.split(",").indexOf(selector) isnt -1
      j++
    i++


$ ->
  $("#beforeafter").beforeAfter()


#$("body").on "tap", "a", (e) ->
#  window.location = $(this).attr("href")
#  e.preventDefault()
#
#$("body").on "flick", (e) ->
#  if "horizontal" is e.orientation
#    if 1 is e.direction
#      console.log "onflick: left "
#      openLeft()
#    else
#      console.log "onflick: right "
#      openRight()
#  null
##
