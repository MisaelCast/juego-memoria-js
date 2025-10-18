// ============================================
// 🎮 JUEGO DE MEMORIA - PRÁCTICA DE JAVASCRIPT
// ============================================

// PASO 1: DECLARAR VARIABLES GLOBALES
// ============================================

// 1.1 Array con 8 emojis diferentes para las cartas
const emojis = ["🐶", "🔥", "💣", "🎈", "🍦", "☁️", "⚔️", "🍄"];

// 1.2 Variables de estado del juego
let cards = []; // Array que contendrá todas las cartas (duplicadas y mezcladas)
let flippedCards = []; // Array para las cartas volteadas (máximo 2)
let matchedPairs = 0; // Contador de pares encontrados
let moves = 0; // Contador de movimientos
let canFlip = true; // Bandera para controlar si se pueden voltear cartas

// PASO 2: FUNCIÓN PRINCIPAL - INICIALIZAR EL JUEGO
// ============================================
function initGame() {
  // TODO: 2.1 Crear el contenedor principal (#game-container)
  // Usa: document.createElement('div')
  // Asigna el id 'game-container'
  // Agrega el contenedor al body
  /* TU CÓDIGO AQUÍ */
  const gameContainer = document.createElement("div");
  gameContainer.id = "game-container";
  document.body.appendChild(gameContainer);

  // TODO: 2.2 Llamar a las funciones para crear cada parte
  createHeader(gameContainer);
  createGameBoard(gameContainer);
  createButtons(gameContainer);
  createModal();
  // TODO: 2.3 Iniciar el juego
  startNewGame();
}

// PASO 3: CREAR EL HEADER CON TÍTULO Y ESTADÍSTICAS
// ============================================
function createHeader(container) {
  // TODO: 3.1 Crear div con clase 'game-header'
  /* TU CÓDIGO AQUÍ */

  const header = document.createElement("div");
  header.className = "game-header";

  // TODO: 3.2 Crear h1 con el título '🧠 Juego de Memoria'
  /* TU CÓDIGO AQUÍ */
  const titulo = document.createElement("h1");
  titulo.textContent = "🧠 Juego de Memoria";
  header.appendChild(titulo);

  // TODO: 3.3 Crear div de estadísticas con clase 'stats'
  // Debe contener dos stat-item:
  // - Movimientos: <span id="moves">0</span>
  // - Pares: <span id="pairs">0/8</span>
  // Usa innerHTML o crea elementos individualmente
  /* TU CÓDIGO AQUÍ */
  const stats = document.createElement("div");
  stats.className = "stats";
  stats.innerHTML = `
        <div class="stat-item">Movimientos: <span id="moves">0</span></div>
        <div class="stat-item">Pares: <span id="pairs">0/8</span></div>
        `;

  // TODO: 3.4 Agregar todo al header y el header al container
  /* TU CÓDIGO AQUÍ */
  header.appendChild(stats);
  container.appendChild(header);
}

// PASO 4: CREAR EL TABLERO DE JUEGO
// ============================================
function createGameBoard(container) {
  // TODO: 4.1 Crear div con clase 'game-board' e id 'game-board'
  /* TU CÓDIGO AQUÍ */
  const gameBoard = document.createElement("div");
  gameBoard.className = "game-board";
  gameBoard.id = "game-board";

  // TODO: 4.2 Agregar el tablero al container
  /* TU CÓDIGO AQUÍ */
  container.appendChild(gameBoard);
}

// PASO 5: CREAR BOTONES DE CONTROL
// ============================================
function createButtons(container) {
  // TODO: 5.1 Crear div con clase 'buttons'
  /* TU CÓDIGO AQUÍ */
  const buttons = document.createElement("div");
  buttons.className = "buttons";

  // TODO: 5.2 Crear botón de reiniciar
  // Texto: '🔄 Reiniciar'
  // onclick: debe llamar a startNewGame()
  /* TU CÓDIGO AQUÍ */
  const reinicioBoton = document.createElement("button");
  reinicioBoton.innerHTML = "🔄 Reiniciar";
  reinicioBoton.onclick = startNewGame;
  // TODO: 5.3 Agregar botón al div y el div al container
  /* TU CÓDIGO AQUÍ */
  buttons.appendChild(reinicioBoton);
  container.appendChild(buttons);
}

// PASO 6: CREAR MODAL DE VICTORIA
// ============================================
function createModal() {
  // TODO: 6.1 Crear div con clase 'modal' e id 'victory-modal'
  /* TU CÓDIGO AQUÍ */
  const modal = document.createElement("div");
  modal.className = 'modal';
  modal.id = "victory-modal";

  // TODO: 6.2 Crear div con clase 'modal-content'
  // Debe contener:
  // - h2 con '🎉 ¡Felicidades!'
  // - p con 'Has completado el juego'
  // - p con id 'final-moves' (vacío por ahora)
  // - Dos botones: uno para cerrar y otro para jugar de nuevo
  /* TU CÓDIGO AQUÍ */
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.innerHTML = `
        <h2>🎉 ¡Felicidades!</h2>
        <p>Has completado el juego</p>
        <p id="final-moves"></p>
        <button id="close-modal">Cerrar</button>
        <button id="play-again">Jugar de nuevo</button>
        `;

  // TODO: 6.3 Agregar modal-content al modal
  // TODO: 6.4 Agregar modal al body
  /* TU CÓDIGO AQUÍ */
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  // TODO: 6.5 Agregar funcionalidad a los botones
  // - Cerrar modal
  // - Jugar de nuevo (cerrar modal y reiniciar juego)
  /* TU CÓDIGO AQUÍ */
  // Obtener los botones
  const closeModalBtn = document.getElementById('close-modal');
  const playAgainBtn = document.getElementById('play-again');

  //eventos 
  closeModalBtn.addEventListener('click', closeModal);
  
  playAgainBtn.addEventListener('click', () => {
    closeModal();
    startNewGame();
  });
}

// PASO 7: INICIAR NUEVO JUEGO
// ============================================
function startNewGame() {
  // TODO: 7.1 Resetear todas las variables a su estado inicial
  moves = 0;
  matchedPairs = 0;
  flippedCards = [];
  canFlip = true;
  // TODO: 7.2 Actualizar las estadísticas en pantalla
  updateStats();
  // TODO: 7.3 Crear el array de cartas
  cards = createCards();
  // TODO: 7.4 Mezclar las cartas
  shuffleCards(cards);
  // TODO: 7.5 Renderizar el tablero
  renderBoard();
}

// PASO 8: CREAR ARRAY DE CARTAS
// ============================================
function createCards() {
  // TODO: 8.1 Duplicar el array de emojis para crear pares
  // Pista: usa spread operator [...emojis, ...emojis]
  /* TU CÓDIGO AQUÍ */
  const paresEmojis = [...emojis, ...emojis];
  // TODO: 8.2 Crear un array de objetos carta
  // Cada carta debe tener: { id, emoji, flipped: false, matched: false
  // Usa .map() para crear el array
  /* TU CÓDIGO AQUÍ */
  const cartas = paresEmojis.map((emoji, index) => ({
    id: index,
    emoji: emoji,
    flipped: false,
    matched: false,
  }));
  return /* TU CÓDIGO AQUÍ */ cartas;
}

// PASO 9: MEZCLAR CARTAS (Algoritmo de Fisher-Yates)
// ============================================
function shuffleCards(array) {
  // TODO: 9.1 Implementar el algoritmo de Fisher-Yates
  // for (let i = array.length - 1; i > 0; i--) {
  // const j = Math.floor(Math.random() * (i + 1));
  // [array[i], array[j]] = [array[j], array[i]];
  // }
  /* TU CÓDIGO AQUÍ */
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// PASO 10: RENDERIZAR EL TABLERO
// ============================================
function renderBoard() {
  // TODO: 10.1 Obtener el elemento del tablero
  ///mi tablero
  const board = document.getElementById("game-board");
  // TODO: 10.2 Limpiar el tablero (innerHTML = '')
  /* TU CÓDIGO AQUÍ limpiando-->>*/
  board.innerHTML = "";
  // TODO: 10.3 Para cada carta en el array cards:
  // - Crear div con clase 'card'
  // - Agregar atributo data-id con el id de la carta
  // - Crear el contenido de la carta (emoji oculto)
  // - Agregar event listener de click que llame a flipCard(card.id)
  // - Agregar la carta al tablero
  cards.forEach((card) => {
    /* TU CÓDIGO AQUÍ */
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.setAttribute("data-id", card.id);
    // Mostrar el emoji solo si la carta está volteada o emparejada
    if (card.flipped || card.matched) {
      cardElement.classList.add("flipped"); //agrega clase flipped
      cardElement.textContent = card.emoji;
    } else {
      cardElement.textContent = ""; // vacía por defecto!!
    }
    cardElement.addEventListener("click", () => flipCard(card.id));//voltea solo esta carta
    board.appendChild(cardElement);//agrega al tablero cada carta
  });
}

// PASO 11: VOLTEAR UNA CARTA
// ============================================
function flipCard(cardId) {
  // TODO: 11.1 VALIDACIONES (return si alguna es verdadera)
  // - Si canFlip es false
  // - Si ya hay 2 cartas volteadas
  // - Si la carta ya está volteada o emparejada
  /* TU CÓDIGO AQUÍ */
  if (canFlip === false) return;
  if (flippedCards.length === 2) return;

  const card = cards.find((carta) => carta.id === cardId);//busca la carta que coincide con el id

  if (card.flipped || card.matched) return;

  // TODO: 11.2 Buscar la carta en el array
  // TODO: 11.3 Voltear la carta
  // - Cambiar card.flipped a true
  // - Agregar la carta al array flippedCards
  // - Agregar clase 'flipped' al elemento HTML
  /* TU CÓDIGO AQUÍ */
  card.flipped = true; //cambia el estado 
  flippedCards.push(card); 
  renderBoard(); //volvemos a renderizar el tablero para que se vea el cambio

  // TODO: 11.4 Si hay 2 cartas volteadas:
  // - Incrementar moves
  // - Actualizar estadísticas
  // - Llamar a checkMatch()
  /* TU CÓDIGO AQUÍ */
  if (flippedCards.length === 2) {
    moves++;
    updateStats();
    checkMatch();
  }
}

// PASO 12: VERIFICAR SI HAY COINCIDENCIA
// ============================================
function checkMatch() {
  canFlip = false;
  const [card1, card2] = flippedCards;
  // TODO: 12.1 Si los emojis coinciden:
  if (card1.emoji === card2.emoji) {
    // Esperar 500ms y luego:

    // - Marcar ambas cartas como matched
    // - Incrementar matchedPairs
    // - Agregar clase 'matched' a ambos elementos HTML
    // - Limpiar flippedCards
    // - Actualizar stats
    // - Permitir voltear de nuevo (canFlip = true)
    // - Si matchedPairs === emojis.length, mostrar victoria
    /* TU CÓDIGO AQUÍ */
    setTimeout(() => {
      card1.matched = true;
      card2.matched = true;
      matchedPairs++;
      flippedCards = [];//limpia
      updateStats();
      renderBoard();//para que se vea el cambio
      canFlip = true;
      if (matchedPairs === emojis.length) {
        showVictory();
      }
    }, 500);
  } else {
    // TODO: 12.2 Si NO coinciden:
    // Esperar 1000ms y luego:
    // - Cambiar flipped a false en ambas cartas
    // - Remover clase 'flipped' de ambos elementos HTML
    // - Limpiar flippedCards
    // - Permitir voltear de nuevo
    /* TU CÓDIGO AQUÍ */
    setTimeout(() => {
      card1.flipped = false;
      card2.flipped = false; 
      renderBoard(); 
      flippedCards = [];
      canFlip = true;
    }, 1000); //espera 1 segundo
  }
}

// PASO 13: ACTUALIZAR ESTADÍSTICAS
// ============================================
function updateStats() {
  // TODO: 13.1 Actualizar el texto de #moves con el valor de moves
  /* TU CÓDIGO AQUÍ */

  document.getElementById("moves").textContent = moves;

  // TODO: 13.2 Actualizar el texto de #pairs con matchedPairs / emojis.length;
  /* TU CÓDIGO AQUÍ */
  const pairsElement = document.getElementById("pairs");
  pairsElement.textContent = `${matchedPairs} / ${emojis.length}`;
}

// PASO 14: MOSTRAR MODAL DE VICTORIA
// ============================================
function showVictory() {
  // TODO: 14.1 Obtener el modal
  const modal = document.getElementById("victory-modal");
  // TODO: 14.2 Actualizar el texto de #final-moves
  // Debe mostrar: 'Lo completaste en X movimientos'
  /* TU CÓDIGO AQUÍ */
  const finalMovi = document.getElementById("final-moves");
  finalMovi.textContent = `Lo completaste en ${moves} movimientos`;

  // TODO: 14.3 Agregar clase 'show' al modal
  /* TU CÓDIGO AQUÍ */

  modal.classList.add("show");
}

// PASO 15: CERRAR MODAL
// ============================================
function closeModal() {
  // TODO: 15.1 Obtener el modal y remover la clase 'show'
  /* TU CÓDIGO AQUÍ */
  const modal = document.getElementById("victory-modal");
  modal.classList.remove("show");
  }

  // PASO 16: INICIAR EL JUEGO AL CARGAR LA PÁGINA
// ============================================
// TODO: 16.1 Verificar si el DOM está listo
// Si document.readyState === 'loading', usar addEventListener
// Si no, llamar directamente a initGame()
/* TU CÓDIGO AQUÍ */

if(document.readyState === 'loading'){
  document.addEventListener("DOMContentLoaded", initGame);
}else{
  initGame();
}