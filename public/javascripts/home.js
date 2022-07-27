(function() {
  var algorithmic_color_from_goodness, color_from_goodness, goodness_colors;

  String.prototype.format = function() {
    var args;
    args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      if (typeof args[number] !== 'undefined') {
        return args[number];
      } else {
        return match;
      }
    });
  };

  goodness_colors = ["#DD3F3F", "#E87341", "#EE8E43", "#F9C245", "#FFDC46", "#F3E637", "#E7EF27", "#B2F559", "#7DFA8B", "#68FF97"];

  color_from_goodness = function(goodness) {
    if (goodness == null) {
      goodness = .5;
    }
    goodness = goodness * 10 - 1;
    return goodness_colors[goodness];
  };

  // turn temperature into separate color values for
  // red, green, and blue. idea is when temperature is
  // 0, color is light blue. when temperature is 1.0,
  // color is bright red.
  algorithmic_color_from_goodness = function(goodness) {
    var blueness, color, greenness, redness;
    if (goodness == null) {
      goodness = .5;
    }
    redness = Math.floor(Math.min(275 - 150 * goodness, 200));
    greenness = Math.floor(105 + 150 * goodness);
    blueness = Math.floor(50 + 130 * goodness);
    color = sprintf("#%02X%02X%02X", redness, greenness, blueness);
    return color;
  };

  $(function() {
    var list_items;
    $("#beforeafter").beforeAfter();
    list_items = $("#proficiency-before-list").find("li");
    list_items.sort(function(a, b) {
      var an, bn;
      an = parseInt(a.getAttribute('data-years'));
      bn = parseInt(b.getAttribute('data-years'));
      if (an > bn) {
        return -1;
      }
      if (an < bn) {
        return 1;
      }
      return 0;
    });
    list_items.detach();
    list_items.appendTo($("#proficiency-before-list"));
    return list_items.each(function(index) {
      var fa_icon_code, lang_name, like_amount, mfizz_icon_code, num_years, prof_item_el, _i, _results;
      prof_item_el = $(this);
      num_years = parseInt(prof_item_el.data('years'));
      like_amount = prof_item_el.data('like');
      mfizz_icon_code = prof_item_el.data('mfizz');
      fa_icon_code = prof_item_el.data('fa');
      lang_name = prof_item_el.data('name');
      (function() {
        _results = [];
        for (var _i = 1; 1 <= num_years ? _i <= num_years : _i >= num_years; 1 <= num_years ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).forEach(function() {
        if (mfizz_icon_code != null) {
          return prof_item_el.append('<i className="icon-' + mfizz_icon_code + '"></i>');
        } else if (fa_icon_code != null) {
          return prof_item_el.append('<i className="fa fa-' + fa_icon_code + '"></i>');
        }
      });
      prof_item_el.append('<span className="proficiency-before-name">(' + lang_name + ')</span>');
      return prof_item_el.css({
        'color': color_from_goodness(like_amount)
      });
    });
  });

}).call(this);
