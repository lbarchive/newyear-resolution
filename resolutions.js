var _resolutions = {};

// love
_resolutions.love = [
];

// health 
_resolutions.health = [
];

// career
_resolutions.career = [
];

// finance
_resolutions.finance = [
];

// family
_resolutions.family = [
];

// education
_resolutions.education = [
];

// do good
_resolutions.do_good = [
];

// other
_resolutions.other = [
  "improve New Year's Resolution Generator"
];

// ========================================

var resolutions = {
  love: {
    title: 'Love',
    color: 'red',
    webicon: ''
  },
  health: {
    title: 'Health',
    color: 'green',
    webicon: ''
  },
  career: {
    title: 'Career',
    color: 'blue',
    webicon: ''
  },
  finance: {
    title: 'Finance',
    color: 'gold',
    webicon: ''
  },
  family: {
    title: 'Family',
    color: 'maroon',
    webicon: ''
  },
  education: {
    title: 'Education',
    color: 'teal',
    webicon: ''
  },
  do_good: {
    title: 'Do Good',
    color: 'olive',
    webicon: ''
  },
  other: {
    title: 'Other',
    color: 'navy',
    webicon: ''
  }
};

// ========================================

$.each(resolutions, function (id, cat) {
  cat.hashes = $.map(_resolutions[id], function (line, idx) {
    return murmurhash3_32_gc(line.toUpperCase()).toString(16);
  });
  cat.resolutions = $.map(_resolutions[id], function (line, idx) {
    return line.toUpperCase();
  });
  cat.count = _resolutions[id].length;
});
