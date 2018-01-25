
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDCondensed";
    ws = new WebSocket(url);
    ws.onopen = onOpen;
    ws.onclose = onClose;
    ws.onmessage = onMessage;
    ws.onerror = onError;

    document.getElementById('condensed-status').innerHTML = "Opening";
  } catch (error) {
    //document.getElementById('content').innerHTML += "\nError:" + error;
  }
}

var onOpen = function() {
  document.getElementById("condensed-status").innerHTML = "Yes"
  connected = true;
  clearTimeout(reconnect);
};

var onClose = function() {
  document.getElementById("condensed-status").innerHTML = "No"
  document.getElementById("condensed-info").innerHTML = "N/A"
  connected = false;
  reconnect = setTimeout(function() {
    open();
  }, 5000);
};

var onMessage = function(event) {
  var re = /(.*) \| (.*) \| (.*) \| (.*) \| (.*) \| (.*)/
  
  if ( document.getElementById("player-info").innerHTML != event.data.replace(re, '$1') ) {
    document.getElementById("player-info").innerHTML = event.data.replace(re, '$1');
    document.getElementById(event.data.replace(re, '$1').toLowerCase()).classList.add("mdc-list-item--activated");
  }
  
  if ( document.getElementById("playpause-info").innerHTML != event.data.replace(re, '$2') ) {
    document.getElementById("playpause").innerHTML = event.data.replace(re, '$2');
    document.getElementById("playpause-info").innerHTML = event.data.replace(re, '$2');
  }
  
  if ( document.getElementById("progress-info").innerHTML != event.data.replace(re, '$3') ) {
    
    var determinate = document.querySelector('.mdc-linear-progress');
    var linearProgress = mdc.linearProgress.MDCLinearProgress.attachTo(determinate);
    linearProgress.progress = event.data.replace(re, '$3') / 100;
    
    document.getElementById("progress-info").innerHTML = event.data.replace(re, '$3');
  }
  
  if ( document.getElementById("track-info").innerHTML != event.data.replace(re, '$4') ) {
    document.getElementById("track").innerHTML = event.data.replace(re, '$4');
    document.getElementById("track-info").innerHTML = event.data.replace(re, '$4');
  }
  
  
  document.getElementById("artist").innerHTML = event.data.replace(re, '$5');
  document.getElementById("artist-info").innerHTML = event.data.replace(re, '$5');
  
  
  document.getElementById("discord-info").innerHTML = event.data.replace(re, '$6')
  var discordCheckbox = document.getElementById("discordrp");
  if (event.data.replace(re, '$6') == 1) {
    discordCheckbox.checked = true;
  } else {
    discordCheckbox.checked = false;
  }
};

var onError = function(event) {
  if (typeof event.data != 'undefined') {
    //document.getElementById('content').innerHTML += "\nWebsocket Error:" + event.data;
  }
};

function sendMessage(stringToSend) {
  if (connected) {
    ws.send(stringToSend);
    location.reload(true);
  }
}

open();
