
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDSongGroup";
    wsMDSongGroup = new WebSocket(url);
    wsMDSongGroup.onopen = onOpen;
    wsMDSongGroup.onclose = onClose;
    wsMDSongGroup.onmessage = onMessage;
    wsMDSongGroup.onerror = onError;
  } catch (error) {
    //document.getElementById('content').innerHTML += "\nError:" + error;
  }
}

var onOpen = function() {
  connected = true;
  clearTimeout(reconnect);
};

var onClose = function() {
  document.getElementById("track-info").innerHTML = "N/A"
  document.getElementById("artist-info").innerHTML = "N/A"
  document.getElementById("duration-info").innerHTML = "N/A"
  document.getElementById("cover-info").innerHTML = "N/A"
  connected = false;
  reconnect = setTimeout(function() {
    open();
  }, 5000);
};

var onMessage = function(event) {
  var selectRegex = /(.*) \| (.*) \| (.*) \| (.*)/
  document.getElementById("track").innerHTML = event.data.replace(selectRegex, '$1');
  document.getElementById("track-info").innerHTML = event.data.replace(selectRegex, '$1');
  document.getElementById("artist").innerHTML = event.data.replace(selectRegex, '$2');
  document.getElementById("artist-info").innerHTML = event.data.replace(selectRegex, '$2');
  document.getElementById("duration").innerHTML = event.data.replace(selectRegex, '$3');
  document.getElementById("duration-info").innerHTML = event.data.replace(selectRegex, '$3');
  if (event.data.replace(selectRegex, '$4')) {
    document.getElementById("cover").src = event.data.replace(selectRegex, '$4');
    document.getElementById("cover-info").innerHTML = event.data.replace(selectRegex, '$4');
  };
};

var onError = function(event) {
  if (typeof event.data != 'undefined') {
    //document.getElementById('content').innerHTML += "\nWebsocket Error:" + event.data;
  }
};

open();
