/*
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDCover";
    wsCover = new WebSocket(url);
    wsCover.onopen = onOpen;
    wsCover.onclose = onClose;
    wsCover.onmessage = onMessage;
    wsCover.onerror = onError;

  } catch (error) {
    //document.getElementById('content').innerHTML += "\nError:" + error;
  }
}

var onOpen = function() {
  connected = true;
  clearTimeout(reconnect);
};

var onClose = function() {
  connected = false;
  reconnect = setTimeout(function() {
    open();
  }, 5000);
};

var onMessage = function(event) {
  document.getElementById("cover").setAttribute("src", event.data)
  document.getElementById("cover-info").innerHTML = event.data
};

var onError = function(event) {
  if (typeof event.data != 'undefined') {
    //document.getElementById('content').innerHTML += "\nWebsocket Error:" + event.data;
  }
};
open();
*/