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
    color: '#e00',
    backgroundColor: 'pink',
    webicon: ''
  },
  health: {
    title: 'Health',
    color: 'green',
    backgroundColor: 'lightgreen',
    webicon: ''
  },
  career: {
    title: 'Career',
    color: 'blue',
    backgroundColor: 'lightblue',
    webicon: ''
  },
  finance: {
    title: 'Finance',
    color: '#dd0',
    backgroundColor: '#b33b00',
    webicon: ''
  },
  family: {
    title: 'Family',
    color: 'maroon',
    backgroundColor: '#c60',
    webicon: ''
  },
  education: {
    title: 'Education',
    color: 'teal',
    backgroundColor: '#0cc',
    webicon: ''
  },
  do_good: {
    title: 'Do Good',
    color: 'olive',
    backgroundColor: '#cc0',
    webicon: ''
  },
  other: {
    title: 'Other',
    color: '#000080',
    backgroundColor: '#66d',
    webicon: ''
  }
};

// ========================================

$.each(resolutions, function (id, cat) {
  cat.hashes = $.map(_resolutions[id], function (line, idx) {
    return murmurhash3_32_gc(line.toUpperCase()).toString(16);
  });
  cat.resolutions = $.map(_resolutions[id], function (line, idx) {
    return line;
  });
  cat.count = _resolutions[id].length;
});
