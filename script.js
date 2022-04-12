const cards = [2,3,4,5,6,7,8,9,10,11];
const dealButton = document.getElementById('deal');
const hitButton = document.getElementById('hit');
const standButton = document.getElementById('stand');
const doubleButton = document.getElementById('double-down');
const splitButton = document.getElementById('split');
const message = document.getElementById('message');

const strategyMapNormal = function () {
    const newMap = new Map();

    newMap.set(20, ['Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand']);
    newMap.set(19, ['Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand']);
    newMap.set(18, ['Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand']);
    newMap.set(17, ['Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand']);
    newMap.set(16, ['Stand','Stand','Stand','Stand','Stand','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(15, ['Stand','Stand','Stand','Stand','Stand','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(14, ['Stand','Stand','Stand','Stand','Stand','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(13, ['Stand','Stand','Stand','Stand','Stand','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(12, ['Hit','Hit','Stand','Stand','Stand','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(11, ['Double','Double','Double','Double','Double','Double','Double','Double','Double','Hit']);
    newMap.set(10, ['Double','Double','Double','Double','Double','Double','Double','Double','Hit','Hit']);
    newMap.set(9, ['Hit','Double','Double','Double','Double','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(8, ['Hit','Hit','Hit','Hit','Hit','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(7, ['Hit','Hit','Hit','Hit','Hit','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(6, ['Hit','Hit','Hit','Hit','Hit','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(5, ['Hit','Hit','Hit','Hit','Hit','Hit','Hit','Hit','Hit','Hit']);

    return newMap;
}();

const strategyMapSoft = function () {
    const newMap = new Map();

    newMap.set(10, ['Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand']);
    newMap.set(9, ['Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand']);
    newMap.set(8, ['Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand']);
    newMap.set(7, ['Stand','Double','Double','Double','Double','Stand','Stand','Hit','Hit','Hit']);
    newMap.set(6, ['Hit','Double','Double','Double','Double','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(5, ['Hit','Ht','Double','Double','Double','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(4, ['Hit','Ht','Double','Double','Double','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(3, ['Hit','Ht','Hit','Double','Double','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(2, ['Hit','Ht','Hit','Double','Double','Hit','Hit','Hit','Hit','Hit']);

    return newMap;
}();

const strategyMapDoubles = function() {
    const newMap = new Map();

    newMap.set(11, ['Split','Split','Split','Split','Split','Split','Split','Split','Split','Split']);
    newMap.set(10, ['Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand','Stand']);
    newMap.set(9, ['Split','Split','Split','Split','Split','Stand','Split','Split','Stand','Stand']);
    newMap.set(8, ['Split','Split','Split','Split','Split','Split','Split','Split','Split','Split']);
    newMap.set(7, ['Split','Split','Split','Split','Split','Split','Hit','Hit','Hit','Hit']);
    newMap.set(6, ['Split','Split','Split','Split','Split','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(5, ['Double','Double','Double','Double','Double','Double','Double','Double','Hit','Hit']);
    newMap.set(4, ['Hit','Hit','Hit','Split','Split','Hit','Hit','Hit','Hit','Hit']);
    newMap.set(3, ['Split','Split','Split','Split','Split','Split','Hit','Hit','Hit','Hit']);
    newMap.set(2, ['Split','Split','Split','Split','Split','Split','Hit','Hit','Hit','Hit']);

    return newMap;
}();

function getHand() {
    const firstCard = cards[Math.floor(Math.random() * cards.length)];
    const secondCard = cards[Math.floor(Math.random() * cards.length)];
    const hand = [firstCard, secondCard];
    return hand;
}

function getDealerHand() {
    return cards[Math.floor(Math.random() * cards.length)];
}

function getStrategyMap(playerHand) {
    if (playerHand[0] == playerHand[1] ) {
        strategy = strategyMapDoubles;
    } else if (playerHand[0] == 11 || playerHand[1] == 11) {
        strategy = strategyMapSoft;
    } else {
        strategy = strategyMapNormal;
    }
    return strategy;
}

function getSolution(playerHand, dealerUpCard) {
    const strategyMap = getStrategyMap(playerHand);
    const handTotal = playerHand[0] + playerHand[1];
    var solution;

    if (isDouble(playerHand)) {
        solution = strategyMap.get(playerHand[0])[dealerUpCard - 2];
    } else if (containsAce(playerHand)) {
        var offCard = getAceOffCard(playerHand);
        solution = strategyMap.get(offCard)[dealerUpCard - 2];
    } else {
        solution = strategyMap.get(handTotal)[dealerUpCard - 2];
    }

    return solution;
}

function containsAce(playerHand) {
    if (playerHand.includes(11)) {
        return true;
    } else {
        return false;
    }
}

function isDouble(playerHand) {
    if (playerHand[0] == playerHand[1]) {
        return true;
    } else {
        return false;
    }
}

function getAceOffCard(playerHand) {
    var offCard;
    playerHand.forEach(card => {
        if (card != 11) {
            offCard = card;
        }
    });
    return offCard;
}

function ifAceReplace(card) {
    if (card == 11) {
        card = 'A';
    }   else {
        return card;
    }
    return card;
}

function displayDealerHand(dealerHand) {
    document.getElementById('dealer-hand').innerHTML = ifAceReplace(dealerHand);
    console.log('Dealer Hand');
    console.log(dealerHand);
}

function displayPlayerHand(playerHand) {
    document.getElementById('player-hand-one').innerHTML = ifAceReplace(playerHand[0]);
    document.getElementById('player-hand-two').innerHTML = ifAceReplace(playerHand[1]);
    console.log('Player Hand');
    console.log(playerHand[0] + ', ' + playerHand[1]);
}

function checkResponse(response, solution) {
    var message;

    if (response == solution) {
        message = 'Correct!'
    } else {
        message = 'Wrong,' + ' you should ' + '"' + solution + '"' + ' at this scenario'
    }

    return message;
}

function interactionAnimation() {
    const panels = document.querySelectorAll('.interaction-container');

    panels.forEach(panel => {
        panel.addEventListener('click', () => {
            removeActiveClasses();
            panel.classList.add('inactive');
        });
    });

    function removeActiveClasses() {
        panels.forEach(panel => {
            panel.classList.remove('inactive');
        });
    }
}

function disableDealButton() {
    dealButton.disabled = true; 
}

function disableResponseButtons() {
    hitButton.disabled = true; 
    standButton.disabled = true; 
    doubleButton.disabled = true; 
    splitButton.disabled = true; 
}

function enableDealButton() {
    dealButton.disabled = false;
}

function enableResponseButtons() {
    hitButton.disabled = false; 
    standButton.disabled = false; 
    doubleButton.disabled = false; 
    splitButton.disabled = false; 
}

function dealButtonMessage() {
    message.innerHTML = 'Choose to Hit, Stand, Double Down, or Split'
}

const runGame = () => {  
    var playerHand;
    var dealerHand;
    var solution;
    


    interactionAnimation();
    disableResponseButtons();

    dealButton.addEventListener('click', function() {
        console.log('Deal!');
        dealButtonMessage();

        playerHand = getHand();
        dealerHand = getDealerHand();
        solution = getSolution(playerHand,dealerHand);

        displayDealerHand(dealerHand);
        displayPlayerHand(playerHand);

        console.log('Solution');
        console.log(solution);

        disableDealButton();
        enableResponseButtons();
    });

    hitButton.addEventListener('click', function() {
        console.log('Hit Pressed')
        const response = 'Hit';
        message.innerHTML = checkResponse(response, solution);
        console.log(message);
        disableResponseButtons();
        enableDealButton();
    });

    standButton.addEventListener('click', function() {
        console.log('Stand Pressed');
        const response = 'Stand';
        message.innerHTML = checkResponse(response, solution);
        console.log(message);
        disableResponseButtons();
        enableDealButton();
    });

    doubleButton.addEventListener('click', function() {
        console.log('Double Down Pressed');
        const response = 'Double';
        message.innerHTML = checkResponse(response, solution);
        console.log(message);
        disableResponseButtons();
        enableDealButton();
    });

    splitButton.addEventListener('click', function() {
        console.log('Split Pressed');
        const response = 'Split';
        message.innerHTML = checkResponse(response, solution);
        console.log(message);
        disableResponseButtons();
        enableDealButton();
    });

}

runGame();