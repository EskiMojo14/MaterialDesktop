
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDControls";
    wsControls = new WebSocket(url);
    wsControls.onopen = onOpen;
    wsControls.onclose = onClose;
    wsControls.onmessage = onMessage;
    wsControls.onerror = onError;

    document.getElementById('controls-status').innerHTML += "Opening";
  } catch (error) {
    //document.getElementById('content').innerHTML += "\nError:" + error;
  }
}

var onOpen = function() {
  document.getElementById("controls-status").innerHTML = "Yes"
  connected = true;
  clearTimeout(reconnect);
};

var onClose = function() {
  document.getElementById("controls-status").innerHTML = "No"
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

function sendMessageControl(stringToSend) {
  if (connected) {
    wsControls.send(stringToSend);
  }
  document.getElementById("controls-info").innerHTML = stringToSend
}
open();