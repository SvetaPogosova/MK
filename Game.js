import {createElement, enemyAttack, Player, playerAttack} from "./players.js";
import {getRandom} from "./utils.js";
import {LOGS, time} from "./constants.js";

export const formFight = document.querySelector('.control');

let player1;
let player2;

class Game {
    constructor() {
        this.$arenas = document.querySelector('.arenas');
        this.chat = document.querySelector('.chat');
    }

    getEnemyPlayer = async () => {
        return fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
    }

    start = async () => {
        const enemy = await this.getEnemyPlayer();
        const player = JSON.parse(localStorage.getItem('player1'));

        player1 = new Player({
            ...player,
            player: 1,
            rootSelector: 'arenas',
        });
        player2 = new Player({
            ...enemy,
            player: 2,
            rootSelector: 'arenas',
        });
        const generateLogs = (type, player1, player2, damage) => {
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
                    el = `<p>${time} - ⚔️ ${text} - ${damage} [${player2.hp}/100]</p>`
                    break;
                case 'defence':
                    text = LOGS['defence'][getRandom(LOGS.defence.length)]
                        .replace('[playerKick]', player1.name)
                        .replace('[playerDefence]', player2.name);
                    el = `<p>${time} - 🛡 ${text} - [${player2.hp}/100]</p>`
                    break;
                case 'draw':
                    text = LOGS['draw']
                    el = `<p>${time} - ${text}</p>`;
                    break;
            }
            return this.chat.insertAdjacentHTML('afterbegin', el)
        }

        const playerWins = name => {
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
            this.$arenas.appendChild($reloadWrap)
            $restartButton.addEventListener('click', function () {
                window.location.pathname = 'MK/index.html'
            })
        }
        const createPlayer = ({player, name, hp, img}) => {
            const $player = createElement('div', `player${player}`)
            const $progressbar = createElement('div', 'progressbar');
            const $life = createElement('div', 'life');
            const $name = createElement('div', 'name');
            const $character = createElement('div', 'character');
            const image = createElement('img');

            $name.innerText = name;
            $life.style.width = hp + '%';
            image.src = img;

            $progressbar.appendChild($life);
            $progressbar.appendChild($name);
            $character.appendChild(image);
            $player.appendChild($progressbar);
            $player.appendChild($character);
            return $player
        }
        const showResult = () => {
            if (player1.hp === 0 || player2.hp === 0) {
                createReloadButton()
            }
            if (player1.hp === 0 && player1.hp < player2.hp) {
                this.$arenas.appendChild(playerWins(player2.name));
                generateLogs('end', player2, player1);
            } else if (player2.hp === 0 && player2.hp < player1.hp) {
                this.$arenas.appendChild(playerWins(player1.name));
                generateLogs('end', player1, player2);
            } else if (player1.hp === 0 && player2.hp === 0) {
                this.$arenas.appendChild(playerWins());
                generateLogs('draw');
            }
        }

        createPlayer(player1);
        createPlayer(player2);

        this.$arenas.appendChild(createPlayer(player1));
        this.$arenas.appendChild(createPlayer(player2));
        generateLogs('start', player1, player2)

        formFight.addEventListener('submit', function (e) {
            e.preventDefault();
            const enemy = enemyAttack();
            const player = playerAttack();
            if (player.defence !== enemy.hit) {
                player1.changeHP(enemy.value);
                player1.renderHP();
                generateLogs('hit', player2, player1, enemy.value);
            }
            if (enemy.defence !== player.hit) {
                player2.changeHP(player.value)
                player2.renderHP()
                generateLogs('hit', player1, player2, player.value,);
            }
            generateLogs('defence', player1, player2, player.value,);
            generateLogs('defence', player2, player1, enemy.value,);
            showResult();
        })
    }
}

export default Game