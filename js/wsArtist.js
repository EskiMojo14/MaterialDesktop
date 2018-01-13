
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDArtist";
    wsArtist = new WebSocket(url);
    wsArtist.onopen = onOpen;
    wsArtist.onclose = onClose;
    wsArtist.onmessage = onMessage;
    wsArtist.onerror = onError;

document.getElementById('artist-status').innerHTML = "Opening";
  } catch (error) {
    //document.getElementById('content').innerHTML += "\nError:" + error;
  }
}

var onOpen = function() {
  document.getElementById("artist-status").innerHTML = "Yes"
  document.getElementById("artist-info").innerHTML = event.data
  connected = true;
  clearTimeout(reconnect);
};

var onClose = function() {
  document.getElementById("artist-status").innerHTML = "No"
  document.getElementById("artist-info").innerHTML = "N/A"
  connected = false;
  reconnect = setTimeout(function() {
    open();
  }, 5000);
};

var onMessage = function(event) {
  document.getElementById("artist").innerHTML = event.data;
  document.getElementById("artist-info").innerHTML = event.data
};

var onError = function(event) {
  if (typeof event.data != 'undefined') {
    //document.getElementById('content').innerHTML += "\nWebsocket Error:" + event.data;
  }
};

open();
