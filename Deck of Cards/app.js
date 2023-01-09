const baseURL = 'https://deckofcardsapi.com/api'
let deckID;

////////////// 1 
// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
//Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).



//Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
async function shuffleDeck() {
    let url = `${baseURL}/deck/new/shuffle/`
    let deck = await axios.get(url);
    deckID = deck.data.deck_id;
    return drawCard(deckID);
}

async function drawCard(deckID) {
    let url = `${baseURL}/deck/${deckID}/draw/`
    let card = await axios.get(url);
    console.log(`You drew: ${card.data.cards[0].value} of ${card.data.cards[0].suit}`)
}

async function drawTwoCards(deckID) {
    let url = `${baseURL}/deck/${deckID}/draw/`

    let card1 = await axios.get(url);
    let card2 = await axios.get(url);


    console.log(`You drew: ${card1.data.cards[0].value} of ${card1.data.cards[0].suit} AND ${card2.data.cards[0].value} of ${card2.data.cards[0].suit}`)
}

shuffleDeck();

//Once you have both cards, console.log the values and suits of both cards.

//Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.