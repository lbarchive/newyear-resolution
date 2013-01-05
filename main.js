function message(text) {
  $('#message').text(text).show();
  resize();
}

function show(text, hash) {
  location.hash = hash;
  $('#resolution-text').attr('href', location.href).text(text);
  $('#resolution-share').attr('href', 'http://as.yjl.im/#url=' + encodeURI(location.href));
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
  show(selected.resolutions[idx], selected.hashes[idx]);
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
    var $box = $('<label id="label-' + id + '"><input id="cat-' + id + '" type="checkbox" class="category" checked="checked"/><span class="webicon">' + cat.webicon + '</span> <span>' + cat.title + '</span></label>');
    $box.css('color', cat.color)
        .css('font-weight', 'bold');
    $box
      .children('input')
        .css('display', 'none')
        .change(function (evt) {
          $(this).parent().css('opacity', (this.checked) ? 1.0 : 0.25);
        });
    $box.appendTo($('#categories'));
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
      show(category.resolutions[idx], category.hashes[idx]);
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
  var $w = $(window);
  var $h = $('html');
  var $t = $('#resbox');

  var h = $w.height() - ($h.outerHeight() - $t.outerHeight());
  $t.outerHeight(h);

  // resize text and reposition
  var $box = $('#resbox').textfill({
    innerTag: 'a',
    maxFontPixels: 0
  });
  $a = $box.children('a');
  var margin = $box.innerHeight() - $a.outerHeight();
  $a.css('margin-top', margin / 2);
}

$(init);
