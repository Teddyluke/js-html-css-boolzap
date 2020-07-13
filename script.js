$(document).ready(function () {

var target = $("#chat-utente");
target.keyup(function () {
  var input = $(this);
  var txt = $(".template p").text(input.val());
  console.log("txt", txt);
})

$(".fa-paper-plane").click(function () {
  var messaggioUtente = $(".template .box-messaggio-utente").clone();
  $(".chat").append(messaggioUtente);
  $("#chat-utente").val("");
});
});
