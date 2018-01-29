
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDDiscordControl";
    wsMDDiscordControl = new WebSocket(url);
    wsMDDiscordControl.onopen = onOpen;
    wsMDDiscordControl.onclose = onClose;
    wsMDDiscordControl.onmessage = onMessage;
    wsMDDiscordControl.onerror = onError;
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

function MDDiscordControl(stringToSend) {
  if (connected) {
    wsMDDiscordControl.send(stringToSend);
    location.reload(true);
  }
}
open();