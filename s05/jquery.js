$(document).ready(function () {
  console.log("element");
  $("#req_get").on('click', function () {
    $.ajax({
      url: 'http://localhost/seance5/index.php?variable=valeur',
      type: 'GET',
      dataType: 'json',
      success: function (result) {
        $("body").append("<h1>" + result["result"] + "</h1>");
      },
      error: function (result, statut, erreur) {
        // do nothing
      }
    });
  });
  $("#req_post").on('click', function () {
    var $txt = $('#post_txt');
    console.log($txt.val());
    $.ajax({
      url: 'http://localhost/seance5/index2.php',
      type: 'POST',
      dataType: 'JSON',
      data: {variable: $txt.val()},
      success: function (result) {
        $("body").append("<h1>" + result["result"] + "</h1>");
      },
      error: function (result, status, error) {
        // do nothing
      }
    });
  })
});
