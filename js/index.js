const suit = 'hearts';
const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
const cardsWrapper = document.querySelector('.cards-wrapper');

const buttons = ['shuffle', 'magic', 'show'];

// For each dataObject, create a new card and append it to the DOM
function createCardEls(cards) {
  cardsWrapper.innerHTML = '';
  cards.forEach((card, i) => {
    const positionFromLeft = i * 25;
    const cardElement = document.createElement('div');
    cardElement.setAttribute('data-value', card.value);
    cardElement.setAttribute('data-suit', card.suit);
    cardElement.classList.add('card', `${card.suit}-${card.value}`);
    cardElement.style.left = `${positionFromLeft}px`;
    cardsWrapper.append(cardElement);
  });
}

function createCardsData() {
  const cards = [];
  // Create an array with objects containing the value and the suit of each card
  suits.forEach(suit => {
    for (let i = 1; i <= 13; i += 1) {
      const cardObject = {
        value: i,
        suit,
      };
      cards.push(cardObject);
    }
  });
  // console.log('initial card data:', cards);
  createCardEls(cards);
}

function gatherCards(deck) {
  show();
  deck.forEach(card => {
    card.style.left = '0px';
    console.log('you have gathered the cards');
  });
  return;
}

function shuffle() {
  // shuffle the cards
  const shuffleDeck = function(deck) {
    let count = deck.length;
    while (count) {
      deck.push(deck.splice(Math.floor(Math.random() * count), 1)[0]);
      count -= 1;
    }
    return deck;
  };

  const currentDeck = Array.from(document.querySelectorAll('.card'));
  gatherCards(currentDeck);
  const shuffledDeckDivs = shuffleDeck(currentDeck);

  function updatePage() {
    shuffledDeckDivs.forEach(function(card, i) {
      const positionFromLeft = i * 25;
      card.style.left = `${positionFromLeft}px`;
      card.style.zIndex = i;
    });
    show();
  }
  setTimeout(updatePage, 1000);
}

function magic() {
  // sort the cards
  const currentDeck = Array.from(document.querySelectorAll('.card'));
  gatherCards(currentDeck);

  function updatePage() {
    currentDeck.forEach((card, i) => {
      const positionFromLeft = i * 25;
      card.style.left = `${positionFromLeft}px`;
      card.style.zIndex = '';
    });
    show();
  }
  setTimeout(updatePage, 1000);
}

function show() {
  cardsWrapper.classList.toggle('hidden');
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  // Your Code
  // create shuffle button
  const btnWrapper = document.getElementById('button-wrapper');
  btnWrapper.querySelector('button').remove();

  buttons.forEach(btn => {
    const btnEl = document.createElement('button');
    btnEl.innerHTML = `${btn}`;
    // btnEl.setAttribute('data-function', btn);
    btnEl.type = 'button';
    btnEl.classList.add('btn', 'btn-lg', 'btn-secondary', 'mx-2');
    btnWrapper.append(btnEl);
    const fn = eval(btn);
    btnEl.addEventListener('click', fn);
  });
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCardsData();
}

document.getElementById('start-game').addEventListener('click', startGame);
