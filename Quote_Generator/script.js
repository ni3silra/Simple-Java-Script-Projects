const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('id-quote-author');
const twitterButton = document.getElementById('twitter');
const newQuoteButtton = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const previousQuoteButton = document.getElementById('get-previous-quote');

const apiUrl = 'https://type.fit/api/quotes';
var apiResponse = null;
var lastAuthor ='';
var lastText ='';

// Show Loading
function showLodingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Data from API
async function getDataFromAPI() {
    showLodingSpinner();
    try {
        const response = await fetch(apiUrl);
        apiResponse= await response.json();
    }catch (error){ 
        apiResponse = {author : 'Unable to Fetch' ,
                         text :'Please Retry , Unable to Fetch' };
    }
    getQuote();
    previousQuoteButton.disabled= true;
    removeLoadingSpinner();
}

// Get Quote From API
function getQuote() {
        showLodingSpinner();

        lastAuthor = authorText.innerText ;
        lastText =  quoteText.innerText;

        var randomNumber = Math.floor(Math.random()*apiResponse.length);  
        var author = apiResponse[randomNumber].author;
        var text = apiResponse[randomNumber].text;
        if(author === null){
            author = 'Uknown';
        } else {
            authorText.innerText = author;
        }
        if (text.length > 70){
            quoteText.classList.add('long-quote');
        }else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = text;
        removeLoadingSpinner();
        previousQuoteButton.disabled= false;
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(twitterUrl, '_blank');
}

// Get Previous More Quote 
function getPreviousQuote(){
   
    authorText.innerText = lastAuthor;
    if (lastText.length > 70){
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = lastText;
    previousQuoteButton.disabled= true;
}

// Event listners
newQuoteButtton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);
previousQuoteButton.addEventListener('click',getPreviousQuote);

// onLoad
getDataFromAPI();

