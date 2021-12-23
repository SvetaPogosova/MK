import {player1, player2} from "./players.js";
import {LOGS} from "./playersMove.js";
import {$arenas, createElement} from "./main.js";
import {getRandom} from "./playersMove.js";

const chat = document.querySelector('.chat')
const date = new Date();
const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

export const showResult = () => {
    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton()
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs('draw');
    }
}

const playerWins = (name) => {
    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText = 'Draw';
    }
    return $loseTitle
}

const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $restartButton = createElement('button', 'button')
    $restartButton.innerText = 'Restart';
    $reloadWrap.appendChild($restartButton)
    $arenas.appendChild($reloadWrap)
    $restartButton.addEventListener('click', function () {
        window.location.reload()
    })
}

export const generateLogs = (type, player1, player2, damage, hp) => {
    let text = '';
    let el = '';
    switch (type) {
        case 'start':
            text = LOGS['start']
                .replace('[time]', time)
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name);
            el = `<p>${text}</p>`;
            break;
        case 'end':
            text = LOGS['end'][getRandom(LOGS.end.length)]
                .replace('[time]', time)
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name);
            el = `<p>${time} - ${text}</p>`;
            break;
        case 'hit':
            text = LOGS['hit'][getRandom(LOGS.hit.length)]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
            el = `<p>${time} - ${text} - ${damage} HIT ${player1.name} [${hp}/100]</p>`
            break;
        case 'defence':
            text = LOGS['defence'][getRandom(LOGS.defence.length)]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
            el = `<p>${time} - ${text} - DEF ${player2.name} [${hp}/100]</p>`
            break;
        case 'draw':
            text = LOGS['draw']
            el = `<p>${time} - ${text}</p>`;
            break;
    }
    return chat.insertAdjacentHTML('afterbegin', el)
}
