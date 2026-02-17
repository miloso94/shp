let players = 5;
let spies = 1;
let roles = [];
let currentPlayer = 0;
let flipped = false;
let usedWords = [];

const words = [

  // Priroda
  "Šuma", "More", "Planina", "Reka", "Pustinja", "Mesec", "Sunce", "Zvezda",
  "Okean", "Pećina", "Vodopad", "Oluja", "Sneg", "Džungla", "Glečer",

  // Gradovi / mesta
  "Pariz", "Beograd", "Njujork", "Tokio", "Rim", "London", "Berlin",

  // Predmeti
  "Telefon", "Laptop", "Automobil", "Avion", "Brod", "Knjiga",
  "Naočare", "Televizor", "Sat", "Fotoaparat",

  // Zanimanja
  "Doktor", "Pilot", "Glumac", "Profesor", "Fudbaler", "Policajac",

  // Likovi iz filmova / knjiga
  "Dart Vejder",
  "Betmen",
  "Hari Poter",
  "Spajdermen",

  // Životinje
  "Lav", "Tigar", "Ajkula", "Delfin", "Orao", "Vuk",

  // Hrana
  "Pizza", "Hamburger", "Sarma", "Čokolada", "Sladoled"
];


function changePlayers(val) {
  players += val;
  if (players < 3) players = 3;
  if (players > 20) players = 20;
  document.getElementById("players").innerText = players;

  if (spies >= players) {
    spies = players - 1;
    document.getElementById("spies").innerText = spies;
  }
}

function changeSpies(val) {
  spies += val;
  if (spies < 1) spies = 1;
  if (spies >= players) spies = players - 1;
  document.getElementById("spies").innerText = spies;
}

function startGame() {
  generateRoles();
  currentPlayer = 0;
  flipped = false;

  document.getElementById("setupScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  document.getElementById("restartBtn").classList.add("hidden");
  document.getElementById("card").style.display = "block";

  updateTurnText();
}

function generateRoles() {

  let availableWords = words.filter(word => !usedWords.includes(word));

  if (availableWords.length === 0) {
    usedWords = [];
    availableWords = words;
  }

  let word = availableWords[Math.floor(Math.random() * availableWords.length)];

  usedWords.push(word);

  roles = Array(players).fill(word);

  let count = 0;
  while (count < spies) {
    let index = Math.floor(Math.random() * players);
    if (roles[index] !== "SPY") {
      roles[index] = "SPY";
      count++;
    }
  }
}


function flipCard() {
  const card = document.getElementById("card");
  const cardText = document.getElementById("cardText");
  const overlay = document.getElementById("overlay");
  const turnText = document.getElementById("turnText");

  if (!flipped) {

    cardText.innerText =
      roles[currentPlayer] === "SPY"
        ? "🕵️ TI SI ŠPIJUN!"
        : roles[currentPlayer];

    card.classList.add("flipped");
    overlay.classList.add("active");
    flipped = true;

  } else {

    card.classList.remove("flipped");
    overlay.classList.remove("active");
    flipped = false;

    turnText.style.opacity = 0;

    setTimeout(() => {
      currentPlayer++;

      if (currentPlayer >= players) {
        turnText.innerText =
          "Svi su videli kartice! Diskusija može da počne.";
        document.getElementById("card").style.display = "none";
        document.getElementById("restartBtn").classList.remove("hidden");
      } else {
        updateTurnText();
      }

      turnText.style.opacity = 1;

    }, 300);
  }
}


function updateTurnText() {
  document.getElementById("turnText").innerText =
    "Na redu je igrač " + (currentPlayer + 1);
}

function resetGame() {
  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("setupScreen").classList.remove("hidden");
}
