const baseURL = 'http://numbersapi.com';
const $factArea = $('section');
const $numRequestBtn = $('#add-number')
const $numRequestsList = $('#number-requests')
const $getFactsBtn = $('#get-facts')

const $favNumFactsBtn = $('#fav-num-facts')
const $favNum = $('#fav-num').val()

async function getFavoriteNumberFact(num) {
    let url = `${baseURL}/${num}?json`
    let fact = await axios.get(url);
    console.log(fact.data.text)
}

getFavoriteNumberFact(13);


async function getMultipleFavoriteNumberFacts(nums) {
    let numEndpoints = [];

    for (let num of nums) {
        numEndpoints.push(`${baseURL}/${num}?json`);
    }
    let facts = await Promise.all(numEndpoints.map(url => axios.get(url)));

    for (let fact of facts) {
        console.log(fact)
        $factArea.append(`<p>${fact.data.text}</p>`)    
    }
}

let numberRequests = [];

$numRequestBtn.click(function(e) {
    e.preventDefault();
    let num = $('#num').val()
    console.log(num)

    //add to list of numbers
    numberRequests.push(num)
    $numRequestsList.append(`<li>${num}</li>`)
})

$getFactsBtn.click(async function() {
    let numEndpoints = [];

    console.log('in get facts anon fn')
    for (let num of numberRequests) {
        numEndpoints.push(`${baseURL}/${num}?json`)
    }

    let facts = await Promise.all(numEndpoints.map(url => axios.get(url)));

    for (let fact of facts) {
        console.log(fact);
        $factArea.append(`<p>${fact.data.text}</p>`)    
    }
})


//////////////// 3
//get 4 facts on your favorite number

async function getFourFavNumFacts(num) {

    let url = `${baseURL}/${num}?json`;

    let fact1Promise = await axios.get(url);
    let fact2Promise = await axios.get(url);
    let fact3Promise = await axios.get(url);
    let fact4Promise = await axios.get(url);

    let f1 = await fact1Promise; //waiting here!
    let f2 = await fact2Promise;
    let f3 = await fact3Promise;
    let f4 = await fact4Promise;

    $factArea.append(`
        <li>${f1.data.text}</li>
        <li>${f2.data.text}</li>
        <li>${f3.data.text}</li>
        <li>${f4.data.text}</li>
    `);
}

$favNumFactsBtn.click(function(e) {
    e.preventDefault()
    let num = $('#fav-num').val();

    if (typeof Number(num) == 'number') getFourFavNumFacts(num);
    
});