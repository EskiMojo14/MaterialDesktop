
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
  var dataArray = event.data.split(' | ');
  document.getElementById("track").innerHTML = dataArray[0];
  document.getElementById("track-info").innerHTML = dataArray[0];
  document.getElementById("artist").innerHTML = dataArray[1];
  document.getElementById("artist-info").innerHTML = dataArray[1];
  document.getElementById("duration").innerHTML = dataArray[2];
  document.getElementById("duration-info").innerHTML = dataArray[2];
  if (dataArray[3] != '') {
    document.getElementById("cover").style.visibility = 'visible';
    document.getElementById("cover").src =  dataArray[3] + '?random=' + new Date().getTime();
    document.getElementById("cover-info").innerHTML = dataArray[3];
  } else {
    document.getElementById("cover").style.visibility = 'hidden';
    document.getElementById("cover-info").innerHTML = 'N/A';
  }
};

var onError = function(event) {
  if (typeof event.data != 'undefined') {
    //document.getElementById('content').innerHTML += "\nWebsocket Error:" + event.data;
  }
};

open();
