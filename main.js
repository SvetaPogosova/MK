import {generateLogs, showResult} from "./result.js";
import {player1, player2} from "./players.js";
import {enemyAttack, playerAttack} from "./playersMove.js";

export const $arenas = document.querySelector('.arenas')
export const formFight = document.querySelector('.control')

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag
}

const createPlayer = (playerObj) => {
    const $player = createElement('div', 'player' + playerObj.player)
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const image = createElement('img');

    $name.innerText = playerObj.name;
    $life.style.width = playerObj.hp + '%';
    image.src = playerObj.img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild(image);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    return $player
}

generateLogs('start', player1, player2);
formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();
    const {hp: hp1} = player1
    const {hp: hp2} = player2
    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value, hp1);
    }
    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value)
        player2.renderHP()
        generateLogs('hit', player1, player2, player.value, hp2);
    }
    generateLogs('defence', player1, player2, player.value, hp2);
    generateLogs('defence', player2, player1, enemy.value, hp1);
    showResult();
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));