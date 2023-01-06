const baseURL = 'http://numbersapi.com';
const $numForm = $('form');
const $factArea = $('section');
const $numRequestBtn = $('#add-number')
const $numRequestsList = $('#number-requests')
const $getFactsBtn = $('#get-facts')

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
