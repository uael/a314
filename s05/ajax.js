var xhr = null;

function initXhr() {
  xhr = new XMLHttpRequest();
}
initXhr();

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200)
    maCallback(xhr.responseText);
};

function maCallback(response) {
  console.log(eval('(' + response + ')')["resultat"]);
  var h1 = document.createElement('h1');
  var text = document.createTextNode(eval('(' + response + ')')["resultat"]);
  h1.appendChild(text);
  document.body.appendChild(h1);
}

function onLoaded() {
  document.getElementById("req_get").addEventListener('click', sendReq1);
  document.getElementById("req_post").addEventListener('click', sendReq2);
}


function sendReq1() {
  console.log("text");
  xhr.open("get", "http://localhost/seance5/index.php?variable=valeur", true);
  xhr.send(null);
}

function sendReq2() {
  xhr.open("post", "http://localhost/seance5/index2.php", true);
  xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
  xhr.send("variable=" + document.getElementById("post_txt").value);
}
