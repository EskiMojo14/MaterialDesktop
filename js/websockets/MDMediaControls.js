
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDMediaControls";
    wsMDMediaControls = new WebSocket(url);
    wsMDMediaControls.onopen = onOpen;
    wsMDMediaControls.onclose = onClose;
    wsMDMediaControls.onmessage = onMessage;
    wsMDMediaControls.onerror = onError;
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

var onError = function(event) {
  if (typeof event.data != 'undefined') {
    //document.getElementById('content').innerHTML += "\nWebsocket Error:" + event.data;
  }
};

function MDMediaControls(stringToSend) {
  if (connected) {
    wsMDMediaControls.send(stringToSend);
  }
}
open();