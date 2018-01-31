// from http://www.w3.org/TR/WCAG20/#relativeluminancedef
function mdcThemeLuminance(R8bit, G8bit, B8bit) {

    var RsRGB = R8bit/255;
    var GsRGB = G8bit/255;
    var BsRGB = B8bit/255;

    var R = (RsRGB <= 0.03928) ? RsRGB/12.92 : Math.pow((RsRGB+0.055)/1.055, 2.4);
    var G = (GsRGB <= 0.03928) ? GsRGB/12.92 : Math.pow((GsRGB+0.055)/1.055, 2.4);
    var B = (BsRGB <= 0.03928) ? BsRGB/12.92 : Math.pow((BsRGB+0.055)/1.055, 2.4);

    // For the sRGB colorspace, the relative luminance of a color is defined as: 
    var L = 0.2126 * R + 0.7152 * G + 0.0722 * B;

    return L;
}

function mdcThemeContrast(a, b) {
    var l1 = Math.max(a, b),
        l2 = Math.min(a, b);
    return (l1 + 0.05) / (l2 + 0.05);
}

var white = mdcThemeLuminance(255,255,255)
var black = mdcThemeLuminance(0,0,0)

function contrastWhite(r, g, b) {
  return mdcThemeContrast(white, mdcThemeLuminance(r,g,b));
}

function contrastBlack(r, g, b) {
  return mdcThemeContrast(black, mdcThemeLuminance(r,g,b));
}

function mdcThemeTone(r, g, b) {
  if (contrastWhite(r, g, b) > 3.1 && contrastWhite(r, g, b) > contrastBlack(r, g, b)) {
    return 'dark';
  } else {
    return 'light';
  }
}

function mdcContrastTone(r, g, b) {
  return (mdcThemeTone(r, g, b) == 'dark' ? 'light' : 'dark');
}

function createStyle(css, id) {
  var head = document.head;
    
  if (document.getElementById(id)) {
    var style = document.getElementById(id);
  } else {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = id;
  }
  
  style.innerHTML = css;
  
  head.appendChild(style);
};

function contrast(object, theme) {
  var colourRegex = /\[(.*),(.*),(.*)\]/;
  var r = Number(JSON.stringify(object).replace(colourRegex, '$1'));
  var g = Number(JSON.stringify(object).replace(colourRegex, '$2'));
  var b = Number(JSON.stringify(object).replace(colourRegex, '$3'));
  
  var foreground = mdcContrastTone(r, g, b);
  
  if (foreground == 'light') { 
    var css = ':root { --mdc-theme-' + theme + ': rgb(' + object + '); --mdc-theme-text-primary-on-' + theme + ': white; --mdc-theme-text-secondary-on-' + theme + ': rgba(255,255,255,0.75); --mdc-theme-text-hint-on-' + theme + ': rgba(255,255,255,0.5); --mdc-theme-text-disabled-on-' + theme + ': rgba(255,255,255,0.5); --mdc-theme-text-icon-on-' + theme + ': rgba(255,255,255,0.5); --mdc-theme-divider-on-' + theme + ': rgba(255,255,255,0.12); }';
    createStyle(css, theme);
  } else {
    var css = ':root { --mdc-theme-' + theme + ': rgb(' + object + '); --mdc-theme-text-primary-on-' + theme + ': rgba(0, 0, 0, 0.87); --mdc-theme-text-secondary-on-' + theme + ': rgba(0, 0, 0, 0.54); --mdc-theme-text-hint-on-' + theme + ': rgba(0, 0, 0, 0.38); --mdc-theme-text-disabled-on-' + theme + ': rgba(0, 0, 0, 0.38); --mdc-theme-text-icon-on-' + theme + ': rgba(0, 0, 0, 0.38); --mdc-theme-divider-on-' + theme + ': rgba(0,0,0,0.12); }';
    createStyle(css, theme);
  }
}