function message(text) {
  $('#message').text(text).show();
  resize();
}

function show(category, idx) {
  var text = category.resolutions[idx];
  var hash = category.hashes[idx];
  location.hash = hash;
  $('#resolution-text')
    .attr('href', location.href).text(text)
    .css('color', category.color);
  $('#resolution-share').attr('href', 'http://as.yjl.im/#url=' + encodeURI(location.href));

  var $dummy = $('<span/>').css('background-color', category.backgroundColor);
  var c = $dummy.css('background-color').replace('rgb', 'rgba').replace(')', ', 0.5');
  $('body').css('background-color', c);

  resize();
}

function next() {
  // clear the previous message
  $('#message').text('').hide();

  var total = 0
  // filter out categories have resolutions and are enabled by checkbox
  var cats = $.map(resolutions, function (cat, id) {
    if (cat.count > 0 && $('#cat-' + id + ':checked').length == 1) {
      total += cat.count;
      return cat;
    }
  });

  if (total == 0) {
    message('No resolution to show');
    return;
  }

  var r = Math.floor(Math.random() * total);
  var selected = null;
  $.each(cats, function (idx, cat) {
    r -= cat.count;
    if (r < 0) {
      selected = cat;
      return false;
    }
  });

  var idx = Math.floor(Math.random() * selected.count);
  show(selected, idx);
}

function find_by_hash(hash) {
  var category = null;
  var idx = null;
  hash = hash.replace('#', '');
  $.each(resolutions, function(id, cat) {
    var _idx = cat.hashes.indexOf(hash);
    if (_idx != -1) {
      category = cat;
      idx = _idx;
      return false;
    }
  });
  return [category, idx]
}

function init() {
  // Updating the year, showing current year, or next year if it's last month
  // of a year.
  var d = new Date();
  var year = d.getFullYear() + (d.getMonth() == 11 ? 1 : 0);
  $('#year').text(year);

  // Generating category list
  $.each(resolutions, function (id, cat) {
    var $box = $('<label id="label-' + id + '"><input id="cat-' + id + '" type="checkbox" class="category" checked="checked"/><span>' + cat.title + '</span></label>');
    if (cat.webicon != '') {
      $box.children('span:last-child').addClass('icon-' + cat.webicon);
    }
    var $dummy = $('<span/>').css('background-color', cat.backgroundColor);
    var c = $dummy.css('background-color').replace('rgb', 'rgba').replace(')', ', 0.5');

    $box
      .css({
        'color': cat.color,
        'backgroundColor': c,
        'font-weight': 'bold'
      })
      .attr('title', cat.resolutions.length + ' resolutions in ' + cat.title)
      .children('input')
        .change(function (evt) {
          $(this).parent().css('opacity', (this.checked) ? 1.0 : 0.25);
        })
      .end()
      .appendTo($('#categories'));
  });

  // Updating total resolutions count
  var total = 0;
  $.each(resolutions, function (id, cat) {
    total += cat.count;
  });
  $('#total-resolutions').text(total);

  // Updating total contributions count when not on localhost
  if (location.href.indexOf('localhost') == -1) {
    var API = 'https://api.github.com/repos/livibetter/newyear-resolution/contributors';
    $.getJSON(API + '?callback=?', function (data) {
      $('#total-contributors').text(data.data.length);
    });
  }

  $(window).resize(resize);

  // Has hash in URL?
  if (location.hash) {
    var result = find_by_hash(location.hash);
    var category = result[0];
    var idx = result[1];
    if (category) {
      show(category, idx);
    } else {
      next();
      message('Oh, no... Resolution Monster has eaten that resolution! But we have another one for you!');
    }
    return;
  }

  // Show initial resolution
  next();
}

// resize #resolution-text to fill up the window
function resize() {
  var $t = $('#resbox');
  var $a = $t.children('a');
  var $p = $('.prefix')
  var h = $('.wrapper.bottom').offset().top - $p.offset().top - $p.height();
  $t.height(h);
  $t.width($(window).width() - 20);

  $a.css('margin-top', 0);
  $t.textfill({
    innerTag: 'a',
    maxFontPixels: 0
  });
  $a.css('margin-top', (h - $a.outerHeight()) / 2);
}

$(init);
