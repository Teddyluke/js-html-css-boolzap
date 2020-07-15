$(document).ready(function () {

var target = $("#chat-utente");
target.keyup(function () {
  var input = $(this);
  var txt = $(".template .messaggio-utente .testo-utente").text(input.val());
})

$(".fa-paper-plane").click(function () {
  var messaggioUtente = $(".template .box-messaggio-utente").clone();
  $(".chat-active").append(messaggioUtente);
  $("#chat-utente").val("");
  setTimeout(rispostaAutomaticaSms, 1000);
});

function rispostaAutomaticaSms() {
  var txt = $(".template .messaggio-interlocutore p").text("ok");
  var messaggioInterlocutore = $(".template .box-messaggio-interlocutore").clone();
  $(".chat-active").append(messaggioInterlocutore);
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
    if ($(container[i]).find(".title").html().toLowerCase().includes(txt) == false)  {
      $(container[i]).hide();
    } else {
      $(container[i]).show();
    }
  }
}

// associazione lista contatti a chat
selectContact();
giveDataIdToContact();
giveDataIdToChat();
summonChat();

function selectContact() {
  var target = $(".box-contatto")
  target.click(function () {
    var contact = $(this).clone();
    $(".wrap-contatto-attivo .box-contatto").remove();
    $(".wrap-contatto-attivo").append(contact);
  })
}

function giveDataIdToContact() {
  var target = $(".sezione-contatti .box-contatto");
  target.each(function () {
    $(this).attr("data-id", ($(this).index()));
  })
}

function giveDataIdToChat() {
var target = $(".chat");
var target2 = $(".sezione-contatti .box-contatto");
target2.each(function () {
  target.clone().prependTo("#chat-screen").attr("data-id",($(this).index())).hide();
})
}

function summonChat() {
var contacts = $(".sezione-contatti .box-contatto");
var chats = $(".chat")
contacts.click(function () {
  $(".chat").hide();
  var id = $(this).data("id");
  $(".chat").removeClass("chat-active");
  $('.chat[data-id="'+ id +'"]').show().addClass("chat-active");
})
}

//  chat dropdown

dropdownMenuTendina();
deleteMessage();

function dropdownMenuTendina() {
var target = $(".fa-chevron-down");
target.click(function () {
  $(this).next().toggle();
})
}

function deleteMessage() {
  var target = $(".delete-message")
  target.click(function () {
    $(this).parents(".box-messaggio").remove();
  })
}

// time function
function getActualTime() {
  var date = new Date();
  return date.getHours() + ":" + date.getMinutes();
}

});

// FLUSSO DI PENSIERO X MILESTONE 3

// click su contatto. va aggiunto un data-id ad ogni contatto e alla conversazione ad esso associata. dopo di che al click sul contatto dovrà apparire la conversazione corrispondente.
