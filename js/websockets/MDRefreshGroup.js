
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDRefreshGroup";
    wsMDRefreshGroup = new WebSocket(url);
    wsMDRefreshGroup.onopen = onOpen;
    wsMDRefreshGroup.onclose = onClose;
    wsMDRefreshGroup.onmessage = onMessage;
    wsMDRefreshGroup.onerror = onError;
  } catch (error) {
    //document.getElementById('content').innerHTML += "\nError:" + error;
  }
}

var onOpen = function() {
  connected = true;
  clearTimeout(reconnect);
};

var onClose = function() {
  document.getElementById("discord-info").innerHTML = "N/A"
  document.getElementById("player-info").innerHTML = "N/A"
  connected = false;
  reconnect = setTimeout(function() {
    open();
  }, 5000);
};

var onMessage = function(event) {
  var selectRegex = /(.*) \| (.*)/
  var discordCheckbox = document.getElementById("discordrp");
  if (event.data.replace(selectRegex, '$1') == 1) {
    discordCheckbox.checked = true;
  } else {
    discordCheckbox.checked = false;
  }
  document.getElementById("discord-info").innerHTML = event.data.replace(selectRegex, '$1');
  var playerRadio = document.getElementById("player-radio-" + event.data.replace(selectRegex, '$2').toLowerCase());
  playerRadio.checked = true;
  document.getElementById("player-info").innerHTML = event.data.replace(selectRegex, '$2');
};

var onError = function(event) {
  if (typeof event.data != 'undefined') {
    //document.getElementById('content').innerHTML += "\nWebsocket Error:" + event.data;
  }
};

open();
