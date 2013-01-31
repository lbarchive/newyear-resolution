var _resolutions = {};

// love
_resolutions.love = [
];

// health 
_resolutions.health = [
  "exercise thirty minutes every day"
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
  "read a book every week"
];

// do good
_resolutions.do_good = [
  "contribute to open source projects every week"
];

// other
_resolutions.other = [
  "improve New Year's Resolution Generator",
  "start a Photo 365 project"
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
