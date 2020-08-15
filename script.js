
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter-button');
const newQuoteBtn = document.getElementById('new-quote-button');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuoteFromApi() {
    showLoadingSpinner()
    // Own proxy across Heroku
    const proxyUrl = 'https://sleepy-oasis-90054.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If author is blank, add 'Unknown'
        data.quoteAuthor === '' ? authorText.innerText = 'Unknown' : authorText.innerText = data.quoteAuthor
        // Reduce font size for long quote
        data.quoteText.length > 50 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote')
        quoteText.innerText = data.quoteText
        removeLoadingSpinner()
    } catch (error) {
        getQuoteFromApi()
    }
}

function tweetQuoteFromApi() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuoteFromApi);
twitterButton.addEventListener('click', tweetQuoteFromApi);

// On Load
getQuoteFromApi()