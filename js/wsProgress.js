
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDProgress";
    wsProgress = new WebSocket(url);
    wsProgress.onopen = onOpen;
    wsProgress.onclose = onClose;
    wsProgress.onmessage = onMessage;
    wsProgress.onerror = onError;

  } catch (error) {
    //document.getElementById('content').innerHTML += "\nError:" + error;
  }
}

var onOpen = function() {
  connected = true;
  clearTimeout(reconnect);
};

var onClose = function() {
  document.getElementById("progress-info").innerHTML = "N/A"
  connected = false;
  reconnect = setTimeout(function() {
    open();
  }, 5000);
};

var onMessage = function(event) {
  var determinate = document.querySelector('.mdc-linear-progress');
  var linearProgress = mdc.linearProgress.MDCLinearProgress.attachTo(determinate);
  linearProgress.progress = event.data / 100;
  document.getElementById("progress-info").innerHTML = event.data
};

var onError = function(event) {
  if (typeof event.data != 'undefined') {
    //document.getElementById('content').innerHTML += "\nWebsocket Error:" + event.data;
  }
};

open();
