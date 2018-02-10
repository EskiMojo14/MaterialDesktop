
var reconnect;

function open() {
  try {
    var url = "ws://127.0.0.1:58932/MDProgressGroup";
    wsMDProgressGroup = new WebSocket(url);
    wsMDProgressGroup.onopen = onOpen;
    wsMDProgressGroup.onclose = onClose;
    wsMDProgressGroup.onmessage = onMessage;
    wsMDProgressGroup.onerror = onError;
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
  document.getElementById("position-info").innerHTML = "N/A"
  connected = false;
  reconnect = setTimeout(function() {
    open();
  }, 5000);
};

var onMessage = function(event) {
  var dataArray = event.data.split(' | ');
  var determinate = document.querySelector('.mdc-linear-progress');
  var linearProgress = mdc.linearProgress.MDCLinearProgress.attachTo(determinate);
  linearProgress.progress = dataArray[0] / 100;
  document.getElementById("progress-info").innerHTML = dataArray[0];
  document.getElementById("position").innerHTML = dataArray[1];
  document.getElementById("position-info").innerHTML = dataArray[1];
};

var onError = function(event) {
  if (typeof event.data != 'undefined') {
    //document.getElementById('content').innerHTML += "\nWebsocket Error:" + event.data;
  }
};

open();
