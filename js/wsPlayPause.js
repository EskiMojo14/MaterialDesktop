
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDPlayPause";
    wsPlayPause = new WebSocket(url);
    wsPlayPause.onopen = onOpen;
    wsPlayPause.onclose = onClose;
    wsPlayPause.onmessage = onMessage;
    wsPlayPause.onerror = onError;

document.getElementById('playpause-status').innerHTML = "Opening";
  } catch (error) {
    //document.getElementById('content').innerHTML += "\nError:" + error;
  }
}

var onOpen = function() {
  document.getElementById("playpause-status").innerHTML = "Yes"
  document.getElementById("playpause-info").innerHTML = event.data
  connected = true;
  clearTimeout(reconnect);
};

var onClose = function() {
  document.getElementById("playpause-status").innerHTML = "No"
  document.getElementById("playpause-info").innerHTML = "N/A"
  connected = false;
  reconnect = setTimeout(function() {
    open();
  }, 5000);
};

var onMessage = function(event) {
  document.getElementById("playpause").innerHTML = event.data;
  document.getElementById("playpause-info").innerHTML = event.data
};

var onError = function(event) {
  if (typeof event.data != 'undefined') {
    //document.getElementById('content').innerHTML += "\nWebsocket Error:" + event.data;
  }
};

function sendMessage(stringToSend) {
  if (connected) {
    wsPlayPause.send(stringToSend);
  }
}
open();
