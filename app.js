var game;
var usernameGlobal;
var passGlobal;

//log in-Create Acount-hide&show
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
//HIDE&SHOW
function hideShow() {
  ranking();
  var changeBody = document.getElementById("body");
  var x = document.getElementById("container");
  var y = document.getElementById("posLog");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
    changeBody.className = changeBody.className.replace(
      /\bbody-posLog\b/g,
      "body-login"
    );
  } else {
    y.style.display = "block";
    x.style.display = "none";
    changeBody.className = changeBody.className.replace(
      /\bbody-login\b/g,
      "body-posLog"
    );
  }
  return 0;
}

//NAVEGATION
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    //Toggle Nav
    nav.classList.toggle("nav-active");

    //Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
          0.3}s`;
      }
    });
    //Burger Animation
    burger.classList.toggle("toggle");
  });
};

navSlide();

//LOGIN
function validate() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (username != "" && password != "") {
    register(username, password);
  } else {
    alert("insira um Username e uma Password");
  }
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  return false;
}

//SIGNUP
function signUp() {
  var username = document.getElementById("usernameRegister").value;
  var password = document.getElementById("passwordRegister").value;
  if (username != "" && password != "") {
    register(username, password);
  } else {
    alert("insira um Username e uma Password");
  }
  document.getElementById("usernameRegister").value = "";
  document.getElementById("passwordRegister").value = "";
  return false;
}

//CLICK BUTTON ON ENTER
// Get the input field
var input = document.getElementById("password");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submit").click();
  }
});
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submit1").click();
  }
});

//RESIZE HEADER
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    document.getElementById("nav").style.height = "50px";
    document.getElementsByClassName("logo-image-posLogIn")[0].style.width =
      "40px";
    document.getElementsByClassName("logo")[0].style.top = "12px";
    document.getElementsByClassName("logo")[0].style.left = "0px";
    document.getElementsByClassName("logo")[0].style.fontSize = "16px";
    document.getElementsByTagName("figcaption")[0].style.opacity = "0";
    document.getElementsByClassName("nav-links")[0].style.top = "51px";
  } else {
    document.getElementById("nav").style.height = "70px";
    document.getElementsByClassName("logo-image-posLogIn")[0].style.width =
      "55px";
    document.getElementsByClassName("logo")[0].style.top = "15px";
    document.getElementsByClassName("logo")[0].style.left = "100px";
    document.getElementsByClassName("logo")[0].style.fontSize = "22px";
    document.getElementsByTagName("figcaption")[0].style.opacity = "1";
    document.getElementsByClassName("nav-links")[0].style.top = "71px";
  }
}

//JOGO

var nWinsVsComputador, nLosesVsComputador, nWinsVsPlayer, nLosesVsPlayer;
var esq = [0, 1, 2, 3, 4, 5, 6];
var dir = [0, 1, 2, 3, 4, 5, 6];
var deck = new Array();
var players1 = new Array();
var players2 = new Array();
var played = new Array();
var playedEsq, playedDir;
var introScreen = document.getElementById("intro");
var cpuScreen = document.getElementById("cpudificuldade");
var computerHand = document.getElementById("computerHand");
var match = document.getElementById("match");
var playerHand = document.getElementById("playerHand");
var posicaoEsq = 40;
var posicaoDir = 43;
var posicaoTop = 32;
var posicaoBot = 58;
var turno;
var nDominos = [0, 0, 0, 0, 0, 0, 0];
var dificuldade;

function createDeck() {
  for (var x = 6; x >= 0; x--) {
    for (var y = x; y >= 0; y--) {
      var domino = {
        Esq: esq[x],
        Dir: dir[y],
        Img: "images/" + x + y + ".png"
      };
      deck.push(domino);
    }
  }
}

function shuffle() {
  for (var i = 0; i < 10000; i++) {
    var location1 = Math.floor(Math.random() * deck.length);
    var location2 = Math.floor(Math.random() * deck.length);
    var tmp = deck[location1];
    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}

function hand() {
  for (var i = 0; i < 7; i++) {
    players1.push(deck.pop());
    players2.push(deck.pop());
  }
}

function firstTurn() {
  var max1 = -1;
  var max2 = -1;
  var domino1, domino2;
  for (var i = 0; i < players1.length; i++) {
    if (players1[i].Dir == players1[i].Esq && max1 < players1[i].Dir) {
      max1 = players1[i].Dir;
      domino1 = i;
    }
    if (players2[i].Dir == players2[i].Esq && max2 < players2[i].Dir) {
      max2 = players2[i].Dir;
      domino2 = i;
    }
  }
  if (max1 == -1 && max2 == -1) {
    for (var i = 0; i < players1.length; i++) {
      if (max1 < players1[i].Dir * 10 + players1[i].Esq) {
        max1 = players1[i].Dir * 10 + players1[i].Esq;
        domino1 = i;
      }
      if (max2 < players2[i].Dir * 10 + players2[i].Esq) {
        max2 = players2[i].Dir * 10 + players2[i].Esq;
        domino2 = i;
      }
    }
  }
  if (max1 < max2) {
    alert("Começa o Computador!");
    var x = document.createElement("img");
    x.setAttribute("src", players2[domino2].Img);
    played.push(players2[domino2]);
    players2.splice(domino2, 1);
    turno = 2;
  } else {
    alert("Começa o Jogador!");
    var x = document.createElement("img");
    x.setAttribute("src", players1[domino1].Img);
    played.push(players1[domino1]);
    players1.splice(domino1, 1);
    turno = 1;
  }
  x.className += "double";
  playedEsq = played[0].Esq;
  playedDir = played[0].Dir;
  nDominos[played[0].Esq] = nDominos[played[0].Esq] + 1;
  nDominos[played[0].Dir] = nDominos[played[0].Dir] + 1;
  match.appendChild(x);
  posicaoDir = posicaoDir + 6;
  posicaoEsq = posicaoEsq + 1;
  if (turno == 1) {
    turno = 2;
  } else {
    turno = 1;
    if (verificaplayer() == false) {
      var deckVazio = 1;
      var aux = 40;
      while (
        players1[players1.length - 1].Esq != playedEsq &&
        players1[players1.length - 1].Esq != playedDir &&
        players1[players1.length - 1].Dir != playedEsq &&
        players1[players1.length - 1].Dir != playedDir
      ) {
        if (deck.length == 0) {
          deckVazio = 0;
          break;
        }
        players1.push(deck.pop());
      }
      alert("Foste buscar!");
      if (deckVazio == 0) {
        if (nDominos[playedEsq] == 8 && nDominos[playedDir] == 8) {
          var ganhou = nPontos();
          if (ganhou == 1) {
            var novojogo = confirm(
              "O Jogador ganhou! Deseja começar um novo jogo?"
            );
            nWinsVsComputador = nWinsVsComputador + 1;
            if (novojogo) {
              resetBoard();
              startGame(dificuldade);
              return 0;
            } else {
              resetBoard();
              introScreen.style.display = "flex";
              computerHand.style.display = "none";
              buttonArea.style.display = "none";
              playerHand.style.display = "none";
              match.style.display = "none";
              return 0;
            }
          } else {
            var novojogo = confirm(
              "O Computador ganhou! Deseja começar um novo jogo?"
            );
            nLosesVsComputador = nLosesVsComputador + 1;
            if (novojogo) {
              resetBoard();
              startGame(dificuldade);
              return 0;
            } else {
              resetBoard();
              introScreen.style.display = "flex";
              computerHand.style.display = "none";
              buttonArea.style.display = "none";
              playerHand.style.display = "none";
              match.style.display = "none";
              return 0;
            }
          }
        }
        turno = 2;
      }
    }
  }
}

function startGame(x) {
  dificuldade = x;
  introScreen.style.display = "none";
  cpuScreen.style.display = "none";
  computerHand.style.display = "block";
  buttonArea.style.display = "block";
  playerHand.style.display = "block";
  match.style.display = "block";
  createDeck();
  shuffle();
  hand();
  firstTurn();
  console.log("mao do jogador: " + players1.length);
  console.log(players1);
  console.log("mao do computador: " + players2.length);
  console.log(players2);
  console.log("deck : " + deck.length);
  console.log(deck);
  var aux = 40;
  for (var i = 0; i < players2.length; i++) {
    var x = document.createElement("img");
    x.setAttribute("src", "images/00.png");
    x.style.left = aux + "%";
    aux = aux + 3;
    computerHand.appendChild(x);
  }
  aux = 40;
  for (var i = 0; i < players1.length; i++) {
    var x = document.createElement("img");
    x.setAttribute("src", players1[i].Img);
    x.setAttribute("onclick", "play(players1," + i + ")");
    x.style.left = aux + "%";
    aux = aux + 3;
    playerHand.appendChild(x);
  }
  console.log(computerHand);
  console.log(playerHand);
  if (turno == 2) {
    if (dificuldade == 1) {
      computerplaylv1();
    } else if (dificuldade == 2) {
      computerplaylv2();
    } else if (dificuldade == 3) {
      computerplaylv3();
    }
  }
}

function play(player, domino) {
  var joga = 0;
  var choice;
  nDominos[player[domino].Esq] = nDominos[player[domino].Esq] + 1;
  nDominos[player[domino].Dir] = nDominos[player[domino].Dir] + 1;
  if (
    player == players1 &&
    player[domino].Esq == playedEsq &&
    player[domino].Dir == playedDir
  ) {
    var choice = confirm("Jogar na esquerda?");
    if (choice) {
      if (posicaoEsq < 10 && posicaoTop < 0) {
        posicaoEsq = posicaoEsq + 8.1;
      }
      //escrever em cima para a direita
      if (posicaoTop < 0) {
        played.push(player[domino]);
        playedEsq = player[domino].Dir;
        player.splice(domino, 1);
        var x = document.createElement("img");
        x.setAttribute("src", played[played.length - 1].Img);
        if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
          x.className += "double";
          posicaoEsq = posicaoEsq - 1.25;
          x.style.top = posicaoTop + 13 + "%";
          x.style.left = posicaoEsq + "%";
          posicaoEsq = posicaoEsq + 4.0;
        } else {
          x.style.top = posicaoTop + 13 + "%";
          x.style.left = posicaoEsq + "%";
          posicaoEsq = posicaoEsq + 5.25;
        }
        match.appendChild(x);
        joga = 1;
      }
      //escrever para cima
      else if (posicaoEsq < 10) {
        if (
          posicaoTop == 32 &&
          played[played.length - 1].Dir == played[played.length - 1].Esq
        ) {
          posicaoBot.Top = posicaoTop - 5;
        }
        played.push(player[domino]);
        playedEsq = player[domino].Esq;
        player.splice(domino, 1);
        var x = document.createElement("img");
        x.setAttribute("src", played[played.length - 1].Img);
        if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
          x.className += "double";
          posicaoEsq = posicaoEsq + 4;
          x.style.left = posicaoEsq + "%";
          x.style.top = posicaoTop + "%";
          posicaoTop = posicaoTop - 17;
          posicaoEsq = posicaoEsq - 4;
        } else {
          x.className += "double";
          posicaoEsq = posicaoEsq + 4;
          x.style.left = posicaoEsq + "%";
          x.style.top = posicaoTop + "%";
          posicaoTop = posicaoTop - 17;
          posicaoEsq = posicaoEsq - 4;
        }
        match.appendChild(x);
        joga = 1;
      } else {
        played.push(player[domino]);
        playedEsq = player[domino].Dir;
        player.splice(domino, 1);
        var x = document.createElement("img");
        x.setAttribute("src", played[played.length - 1].Img);
        if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
          x.className += "double";
          posicaoEsq = posicaoEsq + 1.25;
          x.style.left = posicaoEsq + "%";
          posicaoEsq = posicaoEsq - 4.0;
        } else {
          x.className += "reversed";
          x.style.left = posicaoEsq + "%";
          posicaoEsq = posicaoEsq - 5.25;
        }
        match.appendChild(x);
        joga = 1;
      }
    } else {
      if (posicaoDir > 80 && posicaoBot > 90) {
        posicaoDir = posicaoDir - 8.1;
      }
      // escrever em baixo para a esquerda
      if (posicaoBot > 90) {
        played.push(player[domino]);
        playedDir = player[domino].Esq;
        player.splice(domino, 1);
        var x = document.createElement("img");
        x.setAttribute("src", played[played.length - 1].Img);
        if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
          x.className += "double";
          posicaoDir = posicaoDir + 1.25;
          x.style.top = posicaoBot - 13 + "%";
          x.style.left = posicaoDir + "%";
          posicaoDir = posicaoDir - 4;
        } else {
          x.style.top = posicaoBot - 13 + "%";
          x.style.left = posicaoDir + "%";
          posicaoDir = posicaoDir - 5.25;
        }
        match.appendChild(x);
        joga = 1;
      }
      //escrever para baixo
      else if (posicaoDir > 80) {
        if (
          posicaoBot == 58 &&
          played[played.length - 1].Dir == played[played.length - 1].Esq
        ) {
          posicaoBot.Bot = posicaoBot + 5;
        }
        played.push(player[domino]);
        playedDir = player[domino].Esq;
        player.splice(domino, 1);
        var x = document.createElement("img");
        x.setAttribute("src", played[played.length - 1].Img);
        if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
          x.className += "double";
          posicaoDir = posicaoDir - 4;
          x.style.left = posicaoDir + "%";
          x.style.top = posicaoBot + "%";
          posicaoBot = posicaoBot + 17;
          posicaoDir = posicaoDir + 4;
        } else {
          x.className += "double";
          posicaoDir = posicaoDir - 4;
          x.style.left = posicaoDir + "%";
          x.style.top = posicaoBot + "%";
          posicaoBot = posicaoBot + 17;
          posicaoDir = posicaoDir + 4;
        }
        match.appendChild(x);
        joga = 1;
      } else {
        played.push(player[domino]);
        playedDir = player[domino].Esq;
        player.splice(domino, 1);
        var x = document.createElement("img");
        x.setAttribute("src", played[played.length - 1].Img);
        if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
          x.className += "double";
          posicaoDir = posicaoDir - 1.25;
          x.style.left = posicaoDir + "%";
          posicaoDir = posicaoDir + 4;
        } else {
          x.className += "reversed";
          x.style.left = posicaoDir + "%";
          posicaoDir = posicaoDir + 5.25;
        }
        match.appendChild(x);
        joga = 1;
      }
    }
  } else if (
    player == players1 &&
    player[domino].Esq == playedDir &&
    player[domino].Dir == playedEsq
  ) {
    var choice = confirm("Jogar na esquerda?");
    if (choice) {
      if (posicaoEsq < 10 && posicaoTop < 0) {
        posicaoEsq = posicaoEsq + 8.1;
      }
      //escrever em cima para a direita
      if (posicaoTop < 0) {
        played.push(player[domino]);
        playedEsq = player[domino].Esq;
        player.splice(domino, 1);
        var x = document.createElement("img");
        x.setAttribute("src", played[played.length - 1].Img);
        if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
          x.className += "double";
          posicaoEsq = posicaoEsq - 1.25;
          x.style.top = posicaoTop + 13 + "%";
          x.style.left = posicaoEsq + "%";
          posicaoEsq = posicaoEsq + 4.0;
        } else {
          x.className += "reversed";
          x.style.top = posicaoTop + 13 + "%";
          x.style.left = posicaoEsq + "%";
          posicaoEsq = posicaoEsq + 5.25;
        }
        match.appendChild(x);
        joga = 1;
      }
      //escrever para cima
      else if (posicaoEsq < 10) {
        if (
          posicaoTop == 32 &&
          played[played.length - 1].Dir == played[played.length - 1].Esq
        ) {
          posicaoBot.Top = posicaoTop - 5;
        }
        played.push(player[domino]);
        playedEsq = player[domino].Esq;
        player.splice(domino, 1);
        var x = document.createElement("img");
        x.setAttribute("src", played[played.length - 1].Img);
        if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
          x.className += "double";
          posicaoEsq = posicaoEsq + 4;
          x.style.left = posicaoEsq + "%";
          x.style.top = posicaoTop + "%";
          posicaoTop = posicaoTop - 17;
          posicaoEsq = posicaoEsq - 4;
        } else {
          x.className += "reversedDouble";
          posicaoEsq = posicaoEsq + 4;
          x.style.left = posicaoEsq + "%";
          x.style.top = posicaoTop + "%";
          posicaoTop = posicaoTop - 17;
          posicaoEsq = posicaoEsq - 4;
        }
        match.appendChild(x);
        joga = 1;
      } else {
        played.push(player[domino]);
        playedEsq = player[domino].Esq;
        player.splice(domino, 1);
        var x = document.createElement("img");
        x.setAttribute("src", played[played.length - 1].Img);
        if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
          x.className += "double";
          posicaoEsq = posicaoEsq + 1.25;
          x.style.left = posicaoEsq + "%";
          posicaoEsq = posicaoEsq - 4.0;
        } else {
          x.style.left = posicaoEsq + "%";
          posicaoEsq = posicaoEsq - 5.25;
        }
        match.appendChild(x);
        joga = 1;
      }
    } else {
      if (posicaoDir > 80 && posicaoBot > 90) {
        posicaoDir = posicaoDir - 8.1;
      }
      // escrever em baixo para a esquerda
      if (posicaoBot > 90) {
        played.push(player[domino]);
        playedDir = player[domino].Dir;
        player.splice(domino, 1);
        var x = document.createElement("img");
        x.setAttribute("src", played[played.length - 1].Img);
        if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
          x.className += "double";
          posicaoDir = posicaoDir + 1.25;
          x.style.top = posicaoBot - 13 + "%";
          x.style.left = posicaoDir + "%";
          posicaoDir = posicaoDir - 4;
        } else {
          x.className += "reversed";
          x.style.top = posicaoBot - 13 + "%";
          x.style.left = posicaoDir + "%";
          posicaoDir = posicaoDir - 5.25;
        }
        match.appendChild(x);
        joga = 1;
      }
      //escrever para baixo
      else if (posicaoDir > 80) {
        if (
          posicaoBot == 58 &&
          played[played.length - 1].Dir == played[played.length - 1].Esq
        ) {
          posicaoBot.Bot = posicaoBot + 5;
        }
        played.push(player[domino]);
        playedDir = player[domino].Esq;
        player.splice(domino, 1);
        var x = document.createElement("img");
        x.setAttribute("src", played[played.length - 1].Img);
        if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
          x.className += "double";
          posicaoDir = posicaoDir - 4;
          x.style.left = posicaoDir + "%";
          x.style.top = posicaoBot + "%";
          posicaoBot = posicaoBot + 17;
          posicaoDir = posicaoDir + 4;
        } else {
          x.className += "reverseDouble";
          posicaoDir = posicaoDir - 4;
          x.style.left = posicaoDir + "%";
          x.style.top = posicaoBot + "%";
          posicaoBot = posicaoBot + 17;
          posicaoDir = posicaoDir + 4;
        }
        match.appendChild(x);
        joga = 1;
      } else {
        played.push(player[domino]);
        playedDir = player[domino].Dir;
        player.splice(domino, 1);
        var x = document.createElement("img");
        x.setAttribute("src", played[played.length - 1].Img);
        if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
          x.className += "double";
          posicaoDir = posicaoDir - 1.25;
          x.style.left = posicaoDir + "%";
          posicaoDir = posicaoDir + 4;
        } else {
          x.style.left = posicaoDir + "%";
          posicaoDir = posicaoDir + 5.25;
        }
        match.appendChild(x);
        joga = 1;
      }
    }
  } else if (player[domino].Dir == playedEsq) {
    if (posicaoEsq < 10 && posicaoTop < 0) {
      posicaoEsq = posicaoEsq + 8.1;
    }
    //escrever em cima para a direita
    if (posicaoTop < 0) {
      played.push(player[domino]);
      playedEsq = player[domino].Esq;
      player.splice(domino, 1);
      var x = document.createElement("img");
      x.setAttribute("src", played[played.length - 1].Img);
      if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
        x.className += "double";
        posicaoEsq = posicaoEsq - 1.25;
        x.style.top = posicaoTop + 13 + "%";
        x.style.left = posicaoEsq + "%";
        posicaoEsq = posicaoEsq + 4.0;
      } else {
        x.className += "reversed";
        x.style.top = posicaoTop + 13 + "%";
        x.style.left = posicaoEsq + "%";
        posicaoEsq = posicaoEsq + 5.25;
      }
      match.appendChild(x);
      joga = 1;
    }
    //escrever para cima
    else if (posicaoEsq < 10) {
      if (
        posicaoTop == 32 &&
        played[played.length - 1].Dir == played[played.length - 1].Esq
      ) {
        posicaoBot.Top = posicaoTop - 5;
      }
      played.push(player[domino]);
      playedEsq = player[domino].Esq;
      player.splice(domino, 1);
      var x = document.createElement("img");
      x.setAttribute("src", played[played.length - 1].Img);
      if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
        x.className += "double";
        posicaoEsq = posicaoEsq + 4;
        x.style.left = posicaoEsq + "%";
        x.style.top = posicaoTop + "%";
        posicaoTop = posicaoTop - 17;
        posicaoEsq = posicaoEsq - 4;
      } else {
        x.className += "reversedDouble";
        posicaoEsq = posicaoEsq + 4;
        x.style.left = posicaoEsq + "%";
        x.style.top = posicaoTop + "%";
        posicaoTop = posicaoTop - 17;
        posicaoEsq = posicaoEsq - 4;
      }
      match.appendChild(x);
      joga = 1;
    } else {
      played.push(player[domino]);
      playedEsq = player[domino].Esq;
      player.splice(domino, 1);
      var x = document.createElement("img");
      x.setAttribute("src", played[played.length - 1].Img);
      if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
        x.className += "double";
        posicaoEsq = posicaoEsq + 1.25;
        x.style.left = posicaoEsq + "%";
        posicaoEsq = posicaoEsq - 4.0;
      } else {
        x.style.left = posicaoEsq + "%";
        posicaoEsq = posicaoEsq - 5.25;
      }
      match.appendChild(x);
      joga = 1;
    }
  } else if (player[domino].Dir == playedDir) {
    if (posicaoDir > 80 && posicaoBot > 90) {
      posicaoDir = posicaoDir - 8.1;
    }
    //escrever em baixo para a esquerda
    if (posicaoBot > 90) {
      played.push(player[domino]);
      playedDir = player[domino].Esq;
      player.splice(domino, 1);
      var x = document.createElement("img");
      x.setAttribute("src", played[played.length - 1].Img);
      if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
        x.className += "double";
        posicaoDir = posicaoDir + 1.25;
        x.style.top = posicaoBot - 13 + "%";
        x.style.left = posicaoDir + "%";
        posicaoDir = posicaoDir - 4;
      } else {
        x.style.top = posicaoBot - 13 + "%";
        x.style.left = posicaoDir + "%";
        posicaoDir = posicaoDir - 5.25;
      }
      match.appendChild(x);
      joga = 1;
    }
    //escrever para baixo
    else if (posicaoDir > 80) {
      if (
        posicaoBot == 58 &&
        played[played.length - 1].Dir == played[played.length - 1].Esq
      ) {
        posicaoBot.Bot = posicaoBot + 5;
      }
      played.push(player[domino]);
      playedDir = player[domino].Esq;
      player.splice(domino, 1);
      var x = document.createElement("img");
      x.setAttribute("src", played[played.length - 1].Img);
      if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
        x.className += "double";
        posicaoDir = posicaoDir - 4;
        x.style.left = posicaoDir + "%";
        x.style.top = posicaoBot + "%";
        posicaoBot = posicaoBot + 17;
        posicaoDir = posicaoDir + 4;
      } else {
        x.className += "double";
        posicaoDir = posicaoDir - 4;
        x.style.left = posicaoDir + "%";
        x.style.top = posicaoBot + "%";
        posicaoBot = posicaoBot + 17;
        posicaoDir = posicaoDir + 4;
      }
      match.appendChild(x);
      joga = 1;
    } else {
      played.push(player[domino]);
      playedDir = player[domino].Esq;
      player.splice(domino, 1);
      var x = document.createElement("img");
      x.setAttribute("src", played[played.length - 1].Img);
      if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
        x.className += "double";
        posicaoDir = posicaoDir - 1.25;
        x.style.left = posicaoDir + "%";
        posicaoDir = posicaoDir + 4;
      } else {
        x.className += "reversed";
        x.style.left = posicaoDir + "%";
        posicaoDir = posicaoDir + 5.25;
      }
      match.appendChild(x);
      joga = 1;
    }
  } else if (player[domino].Esq == playedDir) {
    if (posicaoDir > 80 && posicaoBot > 90) {
      posicaoDir = posicaoDir - 8.1;
    }
    //escrever em baixo para a esquerda
    if (posicaoBot > 90) {
      played.push(player[domino]);
      playedDir = player[domino].Dir;
      player.splice(domino, 1);
      var x = document.createElement("img");
      x.setAttribute("src", played[played.length - 1].Img);
      if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
        x.className += "double";
        posicaoDir = posicaoDir + 1.25;
        x.style.top = posicaoBot - 13 + "%";
        x.style.left = posicaoDir + "%";
        posicaoDir = posicaoDir - 4;
      } else {
        x.className += "reversed";
        x.style.top = posicaoBot - 13 + "%";
        x.style.left = posicaoDir + "%";
        posicaoDir = posicaoDir - 5.25;
      }
      match.appendChild(x);
      joga = 1;
    }
    //escrever para baixo
    else if (posicaoDir > 80) {
      if (
        posicaoBot == 58 &&
        played[played.length - 1].Dir == played[played.length - 1].Esq
      ) {
        posicaoBot.Bot = posicaoBot + 5;
      }
      played.push(player[domino]);
      playedDir = player[domino].Dir;
      player.splice(domino, 1);
      var x = document.createElement("img");
      x.setAttribute("src", played[played.length - 1].Img);
      if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
        x.className += "double";
        posicaoDir = posicaoDir - 4;
        x.style.left = posicaoDir + "%";
        x.style.top = posicaoBot + "%";
        posicaoBot = posicaoBot + 17;
        posicaoDir = posicaoDir + 4;
      } else {
        x.className += "reversedDouble";
        posicaoDir = posicaoDir - 4;
        x.style.left = posicaoDir + "%";
        x.style.top = posicaoBot + "%";
        posicaoBot = posicaoBot + 17;
        posicaoDir = posicaoDir + 4;
      }
      match.appendChild(x);
      joga = 1;
    } else {
      played.push(player[domino]);
      playedDir = player[domino].Dir;
      player.splice(domino, 1);
      var x = document.createElement("img");
      x.setAttribute("src", played[played.length - 1].Img);
      if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
        x.className += "double";
        posicaoDir = posicaoDir - 1.25;
        x.style.left = posicaoDir + "%";
        posicaoDir = posicaoDir + 4;
      } else {
        x.style.left = posicaoDir + "%";
        posicaoDir = posicaoDir + 5.25;
      }
      match.appendChild(x);
      joga = 1;
    }
  } else if (player[domino].Esq == playedEsq) {
    if (posicaoEsq < 10 && posicaoTop < 0) {
      posicaoEsq = posicaoEsq + 8.1;
    }
    //escrever em cima para a direita
    if (posicaoTop < 0) {
      played.push(player[domino]);
      playedEsq = player[domino].Dir;
      player.splice(domino, 1);
      var x = document.createElement("img");
      x.setAttribute("src", played[played.length - 1].Img);
      if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
        x.className += "double";
        posicaoEsq = posicaoEsq - 1.25;
        x.style.top = posicaoTop + 13 + "%";
        x.style.left = posicaoEsq + "%";
        posicaoEsq = posicaoEsq + 4.0;
      } else {
        x.style.top = posicaoTop + 13 + "%";
        x.style.left = posicaoEsq + "%";
        posicaoEsq = posicaoEsq + 5.25;
      }
      match.appendChild(x);
      joga = 1;
    }
    //escrever para cima
    else if (posicaoEsq < 10) {
      if (
        posicaoTop == 32 &&
        played[played.length - 1].Dir == played[played.length - 1].Esq
      ) {
        posicaoBot.Top = posicaoTop - 5;
      }
      played.push(player[domino]);
      playedEsq = player[domino].Dir;
      player.splice(domino, 1);
      var x = document.createElement("img");
      x.setAttribute("src", played[played.length - 1].Img);
      if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
        x.className += "reversed";
        posicaoEsq = posicaoEsq + 4;
        x.style.left = posicaoEsq + "%";
        x.style.top = posicaoTop + "%";
        posicaoTop = posicaoTop - 17;
        posicaoEsq = posicaoEsq - 4;
      } else {
        x.className += "double";
        posicaoEsq = posicaoEsq + 4;
        x.style.left = posicaoEsq + "%";
        x.style.top = posicaoTop + "%";
        posicaoTop = posicaoTop - 17;
        posicaoEsq = posicaoEsq - 4;
      }
      match.appendChild(x);
      joga = 1;
    } else {
      played.push(player[domino]);
      playedEsq = player[domino].Dir;
      player.splice(domino, 1);
      var x = document.createElement("img");
      x.setAttribute("src", played[played.length - 1].Img);
      if (played[played.length - 1].Esq == played[played.length - 1].Dir) {
        x.className += "double";
        posicaoEsq = posicaoEsq + 1.25;
        x.style.left = posicaoEsq + "%";
        posicaoEsq = posicaoEsq - 4.0;
      } else {
        x.className += "reversed";
        x.style.left = posicaoEsq + "%";
        posicaoEsq = posicaoEsq - 5.25;
      }
      match.appendChild(x);
      joga = 1;
    }
  }
  if (joga == 1) {
    console.log(posicaoEsq, posicaoDir, posicaoBot, posicaoTop);
    if (players1.length == 0) {
      var elem = document.querySelector(".playerHand");
      elem.removeChild(elem.childNodes[0]);
      var novojogo = confirm("O Jogador ganhou! Deseja começar um novo jogo?");
      nWinsVsComputador = nWinsVsComputador + 1;
      if (novojogo) {
        resetBoard();
        startGame(dificuldade);
        return 0;
      } else {
        resetBoard();
        introScreen.style.display = "flex";
        computerHand.style.display = "none";
        buttonArea.style.display = "none";
        playerHand.style.display = "none";
        match.style.display = "none";
        return 0;
      }
    }
    if (players2.length == 0) {
      var elem = document.querySelector(".computerHand");
      elem.removeChild(elem.childNodes[0]);
      var novojogo = confirm(
        "O Computador ganhou! Deseja começar um novo jogo?"
      );
      nLosesVsComputador = nLosesVsComputador + 1;
      if (novojogo) {
        resetBoard();
        startGame(dificuldade);
        return 0;
      } else {
        resetBoard();
        introScreen.style.display = "flex";
        computerHand.style.display = "none";
        buttonArea.style.display = "none";
        playerHand.style.display = "none";
        match.style.display = "none";
        return 0;
      }
    }
    if (turno == 2) {
      turno = 1;
      if (verificaplayer() == false) {
        var deckVazio = 1;
        var aux = 40;
        while (
          players1[players1.length - 1].Esq != playedEsq &&
          players1[players1.length - 1].Esq != playedDir &&
          players1[players1.length - 1].Dir != playedEsq &&
          players1[players1.length - 1].Dir != playedDir
        ) {
          if (deck.length == 0) {
            deckVazio = 0;
            break;
          }
          players1.push(deck.pop());
          var aux = 40;
          var x = document.createElement("img");
          x.setAttribute("src", players1[players1.length - 1].Img);
          x.setAttribute(
            "onclick",
            "play(players1," + (players1.length - 1) + ")"
          );
          x.style.left = aux + "%";
          playerHand.appendChild(x);
        }
        alert("Foste buscar!");
        if (deckVazio == 0) {
          if (nDominos[playedEsq] == 8 && nDominos[playedDir] == 8) {
            var ganhou = nPontos();
            if (ganhou == 1) {
              var novojogo = confirm(
                "O Jogador ganhou! Deseja começar um novo jogo?"
              );
              nWinsVsComputador = nWinsVsComputador + 1;
              if (novojogo) {
                resetBoard();
                startGame(dificuldade);
                return 0;
              } else {
                resetBoard();
                introScreen.style.display = "flex";
                computerHand.style.display = "none";
                buttonArea.style.display = "none";
                playerHand.style.display = "none";
                match.style.display = "none";
                return 0;
              }
            } else {
              var novojogo = confirm(
                "O Computador ganhou! Deseja começar um novo jogo?"
              );
              nLosesVsComputador = nLosesVsComputador + 1;
              if (novojogo) {
                resetBoard();
                startGame(dificuldade);
                return 0;
              } else {
                resetBoard();
                introScreen.style.display = "flex";
                computerHand.style.display = "none";
                buttonArea.style.display = "none";
                playerHand.style.display = "none";
                match.style.display = "none";
                return 0;
              }
            }
          }
          turno = 2;
        }
      }
    } else {
      turno = 2;
    }
    if (turno == 2) {
      if (dificuldade == 1) {
        computerplaylv1();
      } else if (dificuldade == 2) {
        computerplaylv2();
      } else if (dificuldade == 3) {
        computerplaylv3();
      }
    }
    if (player == players1) {
      drawPlayer();
    }
    if (player == players2) {
      drawComputer();
    }
  }
}

function drawPlayer() {
  var elem = document.querySelector(".playerHand");
  for (var i = 0; i <= players1.length; i++) {
    elem.removeChild(elem.childNodes[0]);
  }
  var aux = 40;
  for (var i = 0; i < players1.length; i++) {
    var x = document.createElement("img");
    x.setAttribute("src", players1[i].Img);
    x.setAttribute("onclick", "play(players1," + i + ")");
    x.style.left = aux + "%";
    aux = aux + 3;
    playerHand.appendChild(x);
  }
}

function drawComputer() {
  var elem = document.querySelector(".computerHand");
  for (var i = 0; i <= players2.length; i++) {
    elem.removeChild(elem.childNodes[0]);
  }
  var aux = 40;
  for (var i = 0; i < players2.length; i++) {
    var x = document.createElement("img");
    x.setAttribute("src", "images/00.png");
    x.style.left = aux + "%";
    aux = aux + 3;
    computerHand.appendChild(x);
  }
}
//joga computador lvl Easy;
function computerplaylv1() {
  var domino = -1;
  for (var i = 0; i < players2.length; i++) {
    if (players2[i].Esq == playedEsq || players2[i].Esq == playedDir) {
      domino = i;
      break;
    } else if (players2[i].Dir == playedEsq || players2[i].Dir == playedDir) {
      domino = i;
      break;
    }
  }
  //buscar ao baralho
  if (domino == -1) {
    var deckVazio = 1;
    var aux = 40;
    while (
      players2[players2.length - 1].Esq != playedEsq &&
      players2[players2.length - 1].Esq != playedDir &&
      players2[players2.length - 1].Dir != playedEsq &&
      players2[players2.length - 1].Dir != playedDir
    ) {
      if (deck.length == 0) {
        deckVazio = 0;
        break;
      }
      players2.push(deck.pop());
      var x = document.createElement("img");
      x.setAttribute("src", "images/00.png");
      x.style.left = aux + "%";
      computerHand.appendChild(x);
    }
    alert("O Computador foi buscar!");
    if (deckVazio == 1) {
      domino = players2.length - 1;
    } else {
      if (nDominos[playedEsq] == 8 && nDominos[playedDir] == 8) {
        var ganhou = nPontos();
        if (ganhou == 1) {
          var novojogo = confirm(
            "O Jogador ganhou! Deseja começar um novo jogo?"
          );
          nWinsVsComputador = nWinsVsComputador + 1;
          if (novojogo) {
            resetBoard();
            startGame(dificuldade);
            return 0;
          } else {
            resetBoard();
            introScreen.style.display = "flex";
            computerHand.style.display = "none";
            buttonArea.style.display = "none";
            playerHand.style.display = "none";
            match.style.display = "none";
            return 0;
          }
        } else {
          var novojogo = confirm(
            "O Computador ganhou! Deseja começar um novo jogo?"
          );
          nLosesVsComputador = nLosesVsComputador + 1;
          if (novojogo) {
            resetBoard();
            startGame(dificuldade);
            return 0;
          } else {
            resetBoard();
            introScreen.style.display = "flex";
            computerHand.style.display = "none";
            buttonArea.style.display = "none";
            playerHand.style.display = "none";
            match.style.display = "none";
            return 0;
          }
        }
      }
    }
  }
  play(players2, domino);
}

function resetBoard() {
  for (var i = 0; i < players1.length; i++) {
    playerHand.removeChild(playerHand.childNodes[0]);
  }
  while (players1.length > 0) {
    players1.pop();
  }
  for (var i = 0; i < players2.length; i++) {
    computerHand.removeChild(computerHand.childNodes[0]);
  }
  while (players2.length > 0) {
    players2.pop();
  }
  for (var i = 0; i < played.length; i++) {
    match.removeChild(match.childNodes[0]);
  }
  while (played.length > 0) {
    played.pop();
  }
  while (deck.length > 0) {
    deck.pop();
  }
  posicaoEsq = 40;
  posicaoDir = 43;
  posicaoTop = 32;
  posicaoBot = 58;
  nDominos = [0, 0, 0, 0, 0, 0, 0];
}
/*joga a peça que foi mais vezes jogada exemplo:
 as peça 1-3 e 1-5 em que tenham aparecido 6 vezes o 3 e 2 vezes o 5
  e temos de jogar o 1 o computador escolhe jogar a peça 1-3 pois a probabilidade de o jogador ter 3 e baixa;*/

function computerplaylv3() {
  var domino = -1;
  var peçasjogadas = -1;
  for (var i = 0; i < players2.length; i++) {
    if (players2[i].Esq == playedEsq || players2[i].Esq == playedDir) {
      if (peçasjogadas < nDominos[players2[i].Dir]) {
        peçasjogadas = nDominos[players2[i].Dir];
        domino = i;
      }
    } else if (players2[i].Dir == playedEsq || players2[i].Dir == playedDir) {
      if (peçasjogadas < nDominos[players2[i].Esq]) {
        peçasjogadas = nDominos[players2[i].Esq];
        domino = i;
      }
    }
  }
  //buscar ao baralho
  if (domino == -1) {
    var deckVazio = 1;
    var aux = 40;
    while (
      players2[players2.length - 1].Esq != playedEsq &&
      players2[players2.length - 1].Esq != playedDir &&
      players2[players2.length - 1].Dir != playedEsq &&
      players2[players2.length - 1].Dir != playedDir
    ) {
      if (deck.length == 0) {
        deckVazio = 0;
        break;
      }
      players2.push(deck.pop());
      var x = document.createElement("img");
      x.setAttribute("src", "images/00.png");
      x.style.left = aux + "%";
      computerHand.appendChild(x);
    }
    alert("O Computador foi buscar!");
    if (deckVazio == 1) {
      domino = players2.length - 1;
    } else {
      if (nDominos[playedEsq] == 8 && nDominos[playedDir] == 8) {
        var ganhou = nPontos();
        if (ganhou == 1) {
          var novojogo = confirm(
            "O Jogador ganhou! Deseja começar um novo jogo?"
          );
          nWinsVsComputador = nWinsVsComputador + 1;
          if (novojogo) {
            resetBoard();
            startGame(dificuldade);
            return 0;
          } else {
            resetBoard();
            introScreen.style.display = "flex";
            computerHand.style.display = "none";
            buttonArea.style.display = "none";
            playerHand.style.display = "none";
            match.style.display = "none";
            return 0;
          }
        } else {
          var novojogo = confirm(
            "O Computador ganhou! Deseja começar um novo jogo?"
          );
          nLosesVsComputador = nLosesVsComputador + 1;
          if (novojogo) {
            resetBoard();
            startGame(dificuldade);
            return 0;
          } else {
            resetBoard();
            introScreen.style.display = "flex";
            computerHand.style.display = "none";
            buttonArea.style.display = "none";
            playerHand.style.display = "none";
            match.style.display = "none";
            return 0;
          }
        }
      }
    }
  }
  play(players2, domino);
}

function computerplaylv2() {
  var nRand = Math.floor(Math.random() * 2) + 1;
  if (nRand == 1) {
    computerplaylv1();
  } else {
    computerplaylv3();
  }
}

function verificaplayer() {
  for (var i = 0; i < players1.length; i++) {
    if (players1[i].Esq == playedEsq || players1[i].Esq == playedDir) {
      return true;
    } else if (players1[i].Dir == playedEsq || players1[i].Dir == playedDir) {
      return true;
    }
  }
  return false;
}

function nPontos() {
  var pontosP1 = 0;
  var pontosP2 = 0;
  for (var i = 0; i < players1.length; i++) {
    pontosP1 = pontosP1 + players1[i].Dir + players1[i].Esq;
  }
  for (var i = 0; i < players2.length; i++) {
    pontosP2 = pontosP2 + players2[i].Dir + players2[i].Esq;
  }
  if (pontosP1 < pontosP2) {
    return 1;
  } else {
    return 2;
  }
}

function inicializarClassificacao() {
  nWinsVsComputador = 0;
  nLosesVsComputador = 0;
  nWinsVsPlayer = 0;
  nLosesVsPlayer = 0;
  return 0;
}

function escreveClassificacao() {
  var aux = document.getElementById("tabelaClassificacao");
  var row = aux.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell1.innerHTML = "admin";
  cell2.innerHTML = nWinsVsComputador;
  cell3.innerHTML = nLosesVsComputador;
  cell4.innerHTML = nWinsVsPlayer;
  cell5.innerHTML = nLosesVsPlayer;
  return 0;
}
function DeleteClassificacao() {
  document.getElementById("tabelaClassificacao").deleteRow(1);
  return 0;
}

function RescreveClassificacao() {
  DeleteClassificacao();
  var aux = document.getElementById("tabelaClassificacao");
  var row = aux.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell1.innerHTML = "admin";
  cell2.innerHTML = nWinsVsComputador;
  cell3.innerHTML = nLosesVsComputador;
  cell4.innerHTML = nWinsVsPlayer;
  cell5.innerHTML = nLosesVsPlayer;
  return 0;
}

function desistir() {
  var choice = confirm("Tem a certeza que quer desistir?");
  if (choice) {
    nLosesVsComputador = nLosesVsComputador + 1;
    resetBoard();
    introScreen.style.display = "flex";
    computerHand.style.display = "none";
    buttonArea.style.display = "none";
    playerHand.style.display = "none";
    match.style.display = "none";
  }
  return 0;
}

function menuSwitch() {
  introScreen.style.display = "none";
  cpuScreen.style.display = "flex";
  return 0;
}

//------------------------------------------------------------------------------------------------

function ranking() {
  fetch("http://twserver.alunos.dcc.fc.up.pt:8139/ranking", {
    method: "POST",
    body: JSON.stringify({})
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      for (var i = 0; i < 10; i++) {
        var aux = document.getElementById("tabelaClassificacao");
        var row = aux.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = data[i].nick;
        cell2.innerHTML = data[i].victories;
        cell3.innerHTML = data[i].games;
      }
      return 0;
    });
}

function register(username, password) {
  fetch("http://twserver.alunos.dcc.fc.up.pt:8139/register", {
    method: "POST",
    body: JSON.stringify({ nick: username, pass: password })
  }).then(function(response) {
    if (response.status == 200) {
      usernameGlobal = username;
      passGlobal = password;
      hideShow();
    } else {
      alert("Erro " + response.status + " " + response.statusText);
    }
  });
  return 0;
}

function join() {
  fetch("http://twserver.alunos.dcc.fc.up.pt:8008/join", {
    method: "POST",
    body: JSON.stringify({
      group: 20170430676123123123670,
      nick: usernameGlobal,
      pass: passGlobal
    })
  })
    .then(function(response) {
      if (response.status == 200) {
        return response.json();
      } else {
        alert("Erro " + response.status + " " + response.statusText);
      }
    })
    .then(function(data) {
      game = data.game;
      console.log(data);
      for (var i = 0; i < 7; i++) {
        var domino = {
          Esq: esq[data.hand[i][0]],
          Dir: dir[data.hand[i][1]],
          Img: "images/" + data.hand[i][0] + data.hand[i][1] + ".png"
        };
        players1.push(domino);
      }
      startGameVsPlayer();
      console.log(players1);
      console.log(players1[0]);
      console.log(players1[5][1]);
      update();
    });
}

function leave() {
  fetch("http://twserver.alunos.dcc.fc.up.pt:8008/leave", {
    method: "POST",
    body: JSON.stringify({
      nick: usernameGlobal,
      pass: passGlobal,
      game: game
    })
  }).then(function(response) {
    if (response.status == 200) {
      resetBoard();
      introScreen.style.display = "flex";
      computerHand.style.display = "none";
      buttonArea.style.display = "none";
      playerHand.style.display = "none";
      match.style.display = "none";
      return 0;
    } else {
      alert("Erro " + response.status + " " + response.statusText);
    }
  });
}

function update() {
  var source = new EventSource(
    "http://twserver.alunos.dcc.fc.up.pt:8008/update?nick=" +
      usernameGlobal +
      "&game=" +
      game
  );
  sourse.onmessage = function(event) {
    console.log(event.data);
  };
  source.close();
}

function startGameVsPlayer() {
  introScreen.style.display = "none";
  cpuScreen.style.display = "none";
  computerHand.style.display = "block";
  buttonArea.style.display = "block";
  playerHand.style.display = "block";
  match.style.display = "block";
  var aux = 40;
  for (var i = 0; i < players1.length; i++) {
    var x = document.createElement("img");
    x.setAttribute("src", players1[i].Img);
    x.setAttribute("onclick", "play(players1," + i + ")");
    x.style.left = aux + "%";
    aux = aux + 3;
    playerHand.appendChild(x);
  }
}
