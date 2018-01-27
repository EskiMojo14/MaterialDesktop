
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDPlayer";
    wsPlayer = new WebSocket(url);
    wsPlayer.onopen = onOpen;
    wsPlayer.onclose = onClose;
    wsPlayer.onmessage = onMessage;
    wsPlayer.onerror = onError;
  } catch (error) {
    //document.getElementById('content').innerHTML += "\nError:" + error;
  }
}

var onOpen = function() {
  connected = true;
  clearTimeout(reconnect);
};

var onClose = function() {
  document.getElementById("player-info").innerHTML = "N/A";
  connected = false;
  reconnect = setTimeout(function() {
    open();
  }, 5000);
};

var onMessage = function(event) {
  document.getElementById("player-info").innerHTML = event.data;
  var playerRadio = document.getElementById("player-radio-" + event.data.toLowerCase());
  playerRadio.checked = true;
};

var onError = function(event) {
  if (typeof event.data != 'undefined') {
    //document.getElementById('content').innerHTML += "\nWebsocket Error:" + event.data;
  }
};

function sendMessagePlayer(stringToSend) {
  if (connected) {
    wsPlayer.send(stringToSend);
    location.reload(true);
  }
}

open();
