let players = 5;
let spies = 1;
let roles = [];
let currentPlayer = 0;
let flipped = false;
let usedWords = [];

const words = [
  "Šuma", "More", "Planina", "Reka", "Pustinja", "Mesec", "Sunce", "Zvezda",
  "Okean", "Pećina", "Vodopad", "Sneg", "Džungla", "Glečer", "Zaliv",
  "Pariz", "Njujork", "Tokio", "Rim", "Berlin", "Fotoaparat", "Sok",
  "Telefon", "Laptop", "Automobil", "Avion", "Knjiga", "Naočare", "Televizor", 
  "Doktor", "Pilot", "Glumac", "Profesor", "Fudbaler", "Policajac",
  "Dart Vejder", "Betmen", "Hari Poter", "Spajdermen", "Gitara", "Zamak",
  "Lav", "Tigar", "Ajkula", "Orao", "Vuk", "Bajka", "Crtež", "Biblioteka", 
  "Pizza", "Hamburger", "Sarma", "Čokolada", "Sladoled", "Trotinet",
  "Oblak", "Magla", "Vetar", "Grom", "Munja", "Duga", "Kometa", "Zemljotres", 
  "Vulkan", "Jezero", "Livada", "Lednik", "Zaliv", "Toranj", "Sat", 
  "Most", "Tunel", "Aerodrom", "Stadion", "Pozorište", "Muzej", 
  "Bolnica", "Fabrika", "Luka", "Metro", "Tržni centar", "Katedrala",  
  "Kišobran", "Kofer", "Ranac", "Sveća", "Ogledalo", "Ključ", "Novčanik", 
  "Klavir", "Bubanj", "Mikrofon", "Kamera", "Šešir", "Rukavice", "Ćebe",
  "Internet", "Robot", "Dron", "Satelit", "Tastatura", "Miš", "Punjač",
  "Novinar", "Vatrogasac", "Sudija", "Kuvar", "Frizer", "Arhitekta", "Programer", 
  "Vozač", "Pekar", "Fotograf", "Odbojka", "Rukomet", "Bejzbol", "Hleb",
  "Košarka", "Tenis", "Plivanje", "Boks", "Skijanje", "Maraton", "Biciklizam", 
  "Palačinka", "Sendvič", "Supa", "Torta", "Kafa", "Čaj", "Voda", "Mleko", 
  "Medved", "Zebra", "Žirafa", "Pingvin", "Papagaj", "Soko", "Kornjača", "Zmija",
  "Motor", "Traktor", "Helikopter", "Raketa", "Podmornica", "Voz", "Kamion", 
  "Jakna", "Majica", "Pantalone", "Haljina", "Patike", "Čizme", "Kaiš", "Kravata",
  "Film", "Serija", "Pesma", "Album", "Koncert", "Festival", "Strip", "Roman", 
  "Tabla", "Sveska", "Olovka", "Hemijska", "Učionica", "Diploma", "Ispit",
  "Proleće", "Leto", "Jesen", "Zima", "Ponedeljak", "Subota", "Nedelja",
  "Rođendan", "Venčanje", "Takmičenje", "Parada", "Karneval", "Kompjuter",
  "Baterija", "Lanac", "Peškir", "Saputnik", "Mapa", "Pasoš", "Kalendar", 
  "Kovčeg", "Fontana", "Stepenice", "Kapija", "Čamac", "Balon", "Svetionik", 
  "Karton", "Plakat", "Zastava", "Pečat", "Sir",  "Med", "Džem", "Kamp",
  "Novak Đoković", "Nikola Tesla", "Nikola Jokić", "Emir Kusturica", "Milena Dravić",
  "Lionel Messi", "Michael Jordan", "Albert Einstein", "Bill Gates",
  "Ivo Andrić", "Vlade Divac", "Ana Ivanović", "Željko Joksimović", "Zdravko Čolić",
  "Nataša Bekvalac", "Đorđe Balašević", "Svetlana Bojković", "Bora Đorđević",
  "Miloš Biković", "Marija Šerifović", "Dušan Tadić", "Ivana Španović", "Mihajlo Pupin",
  "Cristiano Ronaldo", "LeBron James", "Tom Cruise", "Leonardo DiCaprio",
  "Angelina Jolie", "Elon Musk", "Mark Zuckerberg", "Oprah Winfrey", "Brad Pitt"
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
