# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/



String.prototype.format = ->
  args = arguments
  return this.replace /{(\d+)}/g, (match, number) ->
    return if typeof args[number] isnt 'undefined' then args[number] else match


color_from_goodness = (goodness = .5) ->
  # turn temperature into separate color values for
  # red, green, and blue. idea is when temperature is
  # 0, color is light blue. when temperature is 1.0,
  # color is bright red.
  redness = Math.floor(Math.min(275 - 150 * goodness, 200));
  greenness = Math.floor(105 + 150 * goodness);
  blueness = Math.floor(50 + 130 * goodness);
  color = sprintf("#%02X%02X%02X", redness, greenness, blueness);
  #alert(" goodness: " + goodness + " color: " + color);
  color



$ ->
  $("#beforeafter").beforeAfter()
  list_items = $("#proficiency-before-list").find("li")
  list_items.sort (a,b) ->
    an = parseInt(a.getAttribute('data-years'))
    bn = parseInt(b.getAttribute('data-years'))
    return -1 if an > bn 
    return 1 if an < bn 
    return 0

  list_items.detach()
  list_items.appendTo($("#proficiency-before-list"))

  list_items.each (index) ->
    prof_item_el = $(this)
    num_years = parseInt(prof_item_el.data('years'))
    like_amount = prof_item_el.data('like')
    mfizz_icon_code = prof_item_el.data('mfizz')
    fa_icon_code = prof_item_el.data('fa')
    lang_name = prof_item_el.data('name')
    [1..num_years].forEach ->
      if mfizz_icon_code?
        prof_item_el.append('<i class="icon-' + mfizz_icon_code + '"></i>')
      else if fa_icon_code?
        prof_item_el.append('<i class="fa fa-' + fa_icon_code + '"></i>')
    prof_item_el.append('<span class="proficiency-before-name">(' + lang_name + ')</span>')
    prof_item_el.css({'color': color_from_goodness(like_amount)})



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
