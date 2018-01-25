
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDTrack";
    wsTrack = new WebSocket(url);
    wsTrack.onopen = onOpen;
    wsTrack.onclose = onClose;
    wsTrack.onmessage = onMessage;
    wsTrack.onerror = onError;

  } catch (error) {
    //document.getElementById('content').innerHTML += "\nError:" + error;
  }
}

var onOpen = function() {
  connected = true;
  clearTimeout(reconnect);
};

var onClose = function() {
  document.getElementById("track-info").innerHTML = "N/A"
  connected = false;
  reconnect = setTimeout(function() {
    open();
  }, 5000);
};

var onMessage = function(event) {
  document.getElementById("track").innerHTML = event.data;
  document.getElementById("track-info").innerHTML = event.data
};

var onError = function(event) {
  if (typeof event.data != 'undefined') {
    //document.getElementById('content').innerHTML += "\nWebsocket Error:" + event.data;
  }
};

open();
