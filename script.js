$(document).ready(function () {
// recuper il valore dei tasti premuti e li inserisce nel messaggio utente.
var target = $("#chat-utente");
target.keyup(function () {
  var input = $(this);
  var txt = $(".template .messaggio-utente .testo-utente").text(input.val());
})

// clona il box messaggio, appende il messaggio,  resetta l'input della chat aggiunge l'ora e fa partire la risposta automatica.
$(".fa-paper-plane").click(function () {
  var messaggioUtente = $(".template .box-messaggio-utente").clone();
  $(".chat-active").append(messaggioUtente);
  $("#chat-utente").val("");
  $(".ora-utente").text("");
  $(".ora-utente").append(getActualTime);
  $(".ora-interlocutore").text("");
  $(".ora-interlocutore").append(getActualTime);
  setTimeout(rispostaAutomaticaSms, 1000);
});

function rispostaAutomaticaSms() {
  var txt = $(".template .messaggio-interlocutore .testo-interlocutore").text("ok");
  var messaggioInterlocutore = $(".template .box-messaggio-interlocutore").clone();
  $(".chat-active").append(messaggioInterlocutore);
}

// funzioni per la ricerca contatti
addSearchListener();

// prende nota del keyup e lo rimanda a sendkeyup
function addSearchListener() {
  var target = $("#searchbar");
  target.keyup(sendKeyup)
}
// riporta il valore nella funzione seguente
function sendKeyup(event) {
  var input = $(this);
  var txt = input.val();
  searchContactName(txt);
}
// ricerca i contatti tramite un ciclo for che esclude i nomi che non presentano le lettere selezionate nel nome.
function searchContactName(txt) {
  var container = $(".box-contatto");
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

// appende il contatto attivo nella parte alta dell header
function selectContact() {
  var target = $(".box-contatto")
  target.click(function () {
    var contact = $(this).clone();
    $(".wrap-contatto-attivo .box-contatto").remove();
    $(".wrap-contatto-attivo").append(contact);
  })
}

// genera un data id per tutti i contatti
function giveDataIdToContact() {
  var target = $(".sezione-contatti .box-contatto");
  target.each(function () {
    $(this).attr("data-id", ($(this).index()));
  })
}

// crea una chat per ogni contatto e gli associa un data id
function giveDataIdToChat() {
var chat = $(".chat");
var contatti = $(".sezione-contatti .box-contatto");
contatti.each(function () {
  chat.clone().prependTo("#chat-screen").attr("data-id",($(this).index())).hide();
})
}

// al click nascondi tutte le chat e mostra la chat con il medesimo id del contatto.
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

// per far partire le funzioni anche sui nuovi elementi del dom
$(document).on("mouseenter", ".box-messaggio", function () {
  dropdownMenuTendina();
  deleteMessage();
});


// apre il menù a tendina sul click della freccina
function dropdownMenuTendina() {
var target = $(".fa-chevron-down");
target.click(function () {
  $(this).siblings(".chat-dropdown").toggle();
  console.log("ok");
})
}
// al click su delete, rimuove il box messaggio
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
