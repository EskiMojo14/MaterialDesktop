
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDDiscord";
    wsDiscord = new WebSocket(url);
    wsDiscord.onopen = onOpen;
    wsDiscord.onclose = onClose;
    wsDiscord.onmessage = onMessage;
    wsDiscord.onerror = onError;

    document.getElementById('discord-status').innerHTML = "Opening";
    
  } catch (error) {
    //document.getElementById('content').innerHTML += "\nError:" + error;
  }
}

var onOpen = function() {
  document.getElementById("discord-status").innerHTML = "Yes"
  connected = true;
  clearTimeout(reconnect);
};

var onClose = function() {
  document.getElementById("discord-status").innerHTML = "No"
  document.getElementById("discord-info").innerHTML = "N/A"
  connected = false;
  reconnect = setTimeout(function() {
    open();
  }, 5000);
};

var onMessage = function(event) {
  document.getElementById("discord-info").innerHTML = event.data
  var discordCheckbox = document.getElementById("discordrp")
  if (event.data == 1) {
    discordCheckbox.checked = true;
  } else {
    discordCheckbox.checked = false;
  }
};

var onError = function(event) {
  if (typeof event.data != 'undefined') {
    //document.getElementById('content').innerHTML += "\nWebsocket Error:" + event.data;
  }
};

function sendMessageDiscord(stringToSend) {
  if (connected) {
    wsDiscord.send(stringToSend);
    location.reload(true);
  }
}

open();
