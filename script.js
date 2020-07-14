$(document).ready(function () {

var target = $("#chat-utente");
target.keyup(function () {
  var input = $(this);
  var txt = $(".template .messaggio-utente .testo-utente").text(input.val());
})

$(".fa-paper-plane").click(function () {
  var messaggioUtente = $(".template .box-messaggio-utente").clone();
  $(".chat").append(messaggioUtente);
  $("#chat-utente").val("");
  setTimeout(rispostaAutomaticaSms, 1000);
});

function rispostaAutomaticaSms() {
  var txt = $(".template .messaggio-interlocutore p").text("ok");
  var messaggioInterlocutore = $(".template .box-messaggio-interlocutore").clone();
  $(".chat").append(messaggioInterlocutore);
}

addSearchListener();

function addSearchListener() {
  var target = $("#searchbar");
  target.keyup(sendKeyup);
}

function sendKeyup(event) {
  var input = $(this);
  var txt = input.val();
  searchContactName(txt);
}

function searchContactName(txt) {
  var container = $(".box-contatto");
  console.log(container);
  for (var i = 0; i < container.length; i++) {
    if ($(container[i]).find(".title").html().includes(txt) == false)  {
      $(container[i]).hide();
    } else {
      $(container[i]).show();
    }
  }
}

// time function
function getActualTime() {
  var date = new Date();
  return date.getHours() + ":" + date.getMinutes();
}

});

//  codice visto in classe con Giovanni

// function addSendListener() {
// var target = $("new-meessage-input"),
// target.keyup(sendKeyup);
// }

// function sendKeyup(event) {
  // var key = event.which;
  // acquisisco il valore scritto nella stringa al press di invio(tasto 13)
  // if (key === 13) {
  //    var input = $(this);
  //    var txt = input.val();
  //    // resetto l'input
  //    input.val("");
    // sendMessage(txt);
  // }
// }

// function sendMessage(txt) {
//   var template = $(".template .box-messaggio-utente"").clone();
//   var target = $("messaggio");
//   template.find("#message-text").text(txt);
//    template.find(#message-time).text(getActualTime());
//   target.append(template);
// }
