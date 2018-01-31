window.wallpaperPropertyListener = {
  applyUserProperties: function(properties) {

    // Read scheme color
    if (properties.schemecolor) {
      var schemeColor = properties.schemecolor.value.split(' ');
      schemeColor = schemeColor.map(function(c) {
        return Math.ceil(c * 255);
      });
      contrast(schemeColor, 'primary');
    }

    // Read taskbar height combo
    if (properties.taskbarheight) {
      document.documentElement.style.setProperty(`--taskbar-height`, properties.taskbarheight.value);
    }

    // Read taskbar colour combo
    if (properties.taskbarcolor) {
      var taskbar = document.querySelector('.taskbar');

      function setTaskbarColor(bgClass) {
        taskbar.className = 'taskbar ' + bgClass;
      };

      if (properties.taskbarcolor.value == 'background') {
        var bgClass = 'mdc-theme--background';
        taskbar.style = 'box-shadow: none;';
      } else {
        var bgClass = 'mdc-theme--' + properties.taskbarcolor.value + '-bg'
        taskbar.style = '';
      };

      setTaskbarColor(bgClass);
    }

    // Read secondary color
    if (properties.secondarycolor) {
      var secondaryColor = properties.secondarycolor.value.split(' ');
      secondaryColor = secondaryColor.map(function(c) {
        return Math.ceil(c * 255);
      });
      contrast(secondaryColor, 'secondary');
    }

    // Read background color
    if (properties.backgroundcolor) {
      var backgroundColor = properties.backgroundcolor.value.split(' ');
      backgroundColor = backgroundColor.map(function(c) {
        return Math.ceil(c * 255);
      });
      contrast(backgroundColor, 'background');
    }
  }
};