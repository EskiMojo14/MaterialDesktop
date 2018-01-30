
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDStatus";
    wsMDStatus = new WebSocket(url);
    wsMDStatus.onopen = onOpen;
    wsMDStatus.onclose = onClose;
    wsMDStatus.onmessage = onMessage;
    wsMDStatus.onerror = onError;
  } catch (error) {
    //document.getElementById('content').innerHTML += "\nError:" + error;
  }
}

var onOpen = function() {
  connected = true;
  clearTimeout(reconnect);
};

var onClose = function() {
  document.getElementById("status-info").innerHTML = "N/A"
  connected = false;
  reconnect = setTimeout(function() {
    open();
  }, 5000);
};

var onMessage = function(event) {
  if (event.data == 1) {
    document.getElementById("status").innerHTML = 'pause';
  } else {
    document.getElementById("status").innerHTML = 'play_arrow';
  }
  document.getElementById("status-info").innerHTML = event.data;
};

var onError = function(event) {
  if (typeof event.data != 'undefined') {
    //document.getElementById('content').innerHTML += "\nWebsocket Error:" + event.data;
  }
};

open();
