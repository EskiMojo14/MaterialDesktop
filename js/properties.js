function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

window.wallpaperPropertyListener = {
  applyUserProperties: function(properties) {

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
    
    // Read scheme color
    if (properties.schemecolor) {
      var schemeColor = properties.schemecolor.value.split(' ');
      schemeColor = schemeColor.map(function(c) {
        return Math.ceil(c * 255);
      });
      contrast(schemeColor, 'primary');
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
      var body = document.querySelector('body');
      if (mdcThemeTone(Number(backgroundColor[0]),Number(backgroundColor[1]),Number(backgroundColor[2])) == 'dark') {
        body.classList.add('theme-dark');
      } else {
        body.classList.remove('theme-dark');
      }
    }
    
    // Read title
    if(properties.title) {
      document.getElementById('title').innerHTML = properties.title.value;
    } 
    
    if(properties.background) {
      if(typeof properties.background.value !== 'undefined') {
        if (properties.background.value !== '') {
          var background = 'url(file:///' + properties.background.value + ')';
        } else {
          var background = 'url("https://source.unsplash.com/collection/389237")';
        }
        var css = ":root { \n  --bg: " + background + "; \n}";
        createStyle(css, 'background-image');
      }
     // if (properties.autocolor.value === true) {
        var vibrant = new Vibrant(properties.background.value !== '' ? properties.background.value : 'https://source.unsplash.com/collection/389237');
        vibrant.getPalette().then((swatches) => {
          for (var swatch in swatches) {
            if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
              if (swatch == "Vibrant") {
                console.log("Vibrant: ", swatches[swatch].getHex());
                color = swatches[swatch].getHex();
                rgbColor = [hexToR(color), hexToG(color), hexToB(color)];
                contrast(rgbColor, 'primary');
              } else if (swatch == "Muted") {
                console.log("Muted: ", swatches[swatch].getHex());
              } else if (swatch == "DarkVibrant") {
                console.log("DarkVibrant: ", swatches[swatch].getHex());
              } else if (swatch == "DarkMuted") {
                console.log("DarkMuted: ", swatches[swatch].getHex());
              } else if (swatch == "LightVibrant") {
                console.log("LightVibrant: ", swatches[swatch].getHex());
                color = swatches[swatch].getHex();
                rgbColor = [hexToR(color), hexToG(color), hexToB(color)];
                contrast(rgbColor, 'secondary');
              }
            }
          }
        });
      // }
    }
  }
};

function newBackground() {
  var background = 'url("https://source.unsplash.com/collection/389237")';
  var css = ":root { \n  --bg: " + background + "; \n}";
  createStyle(css, 'background-image');
  var vibrant = new Vibrant('https://source.unsplash.com/collection/389237');
  vibrant.getPalette().then((swatches) => {
    for (var swatch in swatches) {
      if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
        if (swatch == "Vibrant") {
          console.log("Vibrant: ", swatches[swatch].getHex());
          color = swatches[swatch].getHex();
          rgbColor = [hexToR(color), hexToG(color), hexToB(color)];
          contrast(rgbColor, 'primary');
        } else if (swatch == "Muted") {
          console.log("Muted: ", swatches[swatch].getHex());
        } else if (swatch == "DarkVibrant") {
          console.log("DarkVibrant: ", swatches[swatch].getHex());
        } else if (swatch == "DarkMuted") {
          console.log("DarkMuted: ", swatches[swatch].getHex());
        } else if (swatch == "LightVibrant") {
          console.log("LightVibrant: ", swatches[swatch].getHex());
          color = swatches[swatch].getHex();
          rgbColor = [hexToR(color), hexToG(color), hexToB(color)];
          contrast(rgbColor, 'secondary');
        }
      }
    }
  });
}