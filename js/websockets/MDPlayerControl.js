
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDPlayerControl";
    wsMDPlayerControl = new WebSocket(url);
    wsMDPlayerControl.onopen = onOpen;
    wsMDPlayerControl.onclose = onClose;
    wsMDPlayerControl.onmessage = onMessage;
    wsMDPlayerControl.onerror = onError;
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

function MDPlayerControl(stringToSend) {
  if (connected) {
    wsMDPlayerControl.send(stringToSend);
  }
}
open();