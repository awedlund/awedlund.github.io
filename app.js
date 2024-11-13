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
    if (currentCardIndex < cards.length && currentCardIndex >= 0) {
        const questionEl = document.getElementById('question');
        const answerEl = document.getElementById('answer');
        
        questionEl.innerText = cards[currentCardIndex].question;
        answerEl.innerText = cards[currentCardIndex].answer;
        answerEl.classList.remove('visible');
    } else {
        document.getElementById('card').innerHTML = "<p>No more cards!</p>";
    }
    updateStatus();
    updateButtonStates();
}

// Update button states based on current index
function updateButtonStates() {
    document.getElementById('prev').disabled = currentCardIndex <= 0;
    document.getElementById('next').disabled = currentCardIndex >= cards.length - 1;
}

// Update the status of remaining questions
function updateStatus() {
    let remaining = cards.length - currentCardIndex - 1;
    document.getElementById('status').innerText = `Remaining questions: ${remaining}`;
}

function triggerHurtEffect() {
    document.body.classList.add('hurt');
    setTimeout(() => {
        document.body.classList.remove('hurt');
    }, 200);
}

// Event listeners for buttons
document.getElementById('prev').addEventListener('click', () => {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        displayCard();
    }
});

document.getElementById('next').addEventListener('click', () => {
    if (currentCardIndex < cards.length - 1) {
        currentCardIndex++;
        displayCard();
    }
});

document.getElementById('toggle').addEventListener('click', () => {
    const answerEl = document.getElementById('answer');
    answerEl.classList.toggle('visible');
});

document.getElementById('greet').addEventListener('click', () => {
    greetCount++;
    document.getElementById('greetCount').innerText = `Screwed count: ${greetCount}`;
    document.getElementById('card').style.animation = 'glitch 0.3s ease';
    setTimeout(() => document.getElementById('card').style.animation = '', 300);
    triggerHurtEffect();
});

// Easter egg: Double click on card container triggers glitch effect
document.getElementById('card').addEventListener('dblclick', () => {
    document.getElementById('greet').click();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentCardIndex > 0) {
                currentCardIndex--;
                displayCard();
            }
            break;
        case 'ArrowRight':
            if (currentCardIndex < cards.length - 1) {
                currentCardIndex++;
                displayCard();
            }
            break;
        case ' ':
            document.getElementById('toggle').click();
            break;
    }
});

// Load cards when the window is loaded
window.onload = loadCards;