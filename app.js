let currentCardIndex = 0;
let cards = [];
let greetCount = 0;

// Shuffle cards function
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Load cards from JSON file
function loadCards() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            cards = data.cards;
            shuffleCards(cards);
            displayCard();
            updateStatus();
        })
        .catch(error => console.error('Error loading cards:', error));
}

// Display the current card
function displayCard() {
    if (currentCardIndex < cards.length) {
        document.getElementById('question').innerText = cards[currentCardIndex].question;
        document.getElementById('answer').innerText = cards[currentCardIndex].answer;
        document.getElementById('answer').style.display = 'none';
    } else {
        document.getElementById('card').innerHTML = "<p>No more cards!</p>";
    }
    updateStatus();
}

// Update the status of remaining questions
function updateStatus() {
    let remaining = cards.length - currentCardIndex;
    document.getElementById('status').innerText = `Remaining questions: ${remaining}`;
}

// Event listeners for buttons
document.getElementById('next').addEventListener('click', () => {
    if (currentCardIndex < cards.length) {
        currentCardIndex++;
        displayCard();
    }
});

document.getElementById('toggle').addEventListener('click', () => {
    let answerDiv = document.getElementById('answer');
    answerDiv.style.display = answerDiv.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('greet').addEventListener('click', () => {
    greetCount++;
    document.getElementById('greetCount').innerText = `Screwed count: ${greetCount}`;
});

// Load cards when the window is loaded
window.onload = loadCards;
