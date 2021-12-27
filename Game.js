//import {player1, player2} from "./players.js";
import {createElement, Player} from "./players.js";

const $arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');
const chat = document.querySelector('.chat');
const HIT = {
    head: 100,
    body: 100,
    foot: 100,
}
const ATTACK = ['head', 'body', 'foot'];
const LOGS = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};
const date = new Date();
const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`


let player1;
let player2;

export class Game {
    getPlayers = async () => {
        return fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
    }
    start = async (props) => {
        const players = await this.getPlayers();
        const p1 = players[getRandom(players.length)];
        const p2 = players[getRandom(players.length)];
        player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas',

        });
        player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas',

        });

        player1.createPlayer();
        player2.createPlayer();
    }
}

const getRandom = num => {
    const length = num - 1;
    return Math.ceil(Math.random() * length)
}
const generateLogs = (type, player1, player2, damage, hp) => {
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
            el = `<p>${time} - ${text} - ${damage} [${hp}/100]</p>`
            break;
        case 'defence':
            text = LOGS['defence'][getRandom(LOGS.defence.length)]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
            el = `<p>${time} - ${text} - [${hp}/100]</p>`
            break;
        case 'draw':
            text = LOGS['draw']
            el = `<p>${time} - ${text}</p>`;
            break;
    }
    return chat.insertAdjacentHTML('afterbegin', el)
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
    const $reloadWrap = this.createElement('div', 'reloadWrap');
    const $restartButton = this.createElement('button', 'button')
    $restartButton.innerText = 'Restart';
    $reloadWrap.appendChild($restartButton)
    $arenas.appendChild($reloadWrap)
    $restartButton.addEventListener('click', function () {
        window.location.reload()
    })
}
const showResult = () => {
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
/*
    getPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        return body;
    }
    $arenas = document.querySelector('.arenas')
    formFight = document.querySelector('.control')
    chat = document.querySelector('.chat')
    date = new Date();
    time = `${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`
    playerWins = name => {
        const $loseTitle = this.createElement('div', 'loseTitle');
        if (name) {
            $loseTitle.innerText = name + ' wins';
        } else {
            $loseTitle.innerText = 'Draw';
        }
        return $loseTitle
    }

    HIT = {
        head: 100,
        body: 100,
        foot: 100,
    }
    ATTACK = ['head', 'body', 'foot'];
    LOGS = {
        start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
        end: [
            'Результат удара [playerWins]: [playerLose] - труп',
            '[playerLose] погиб от удара бойца [playerWins]',
            'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
        ],
        hit: [
            '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
            '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
            '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
            '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
            '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
            '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
            '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
            '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
            '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
            '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
            '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
            '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
            '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
            '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
            '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
            '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
            '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
            '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
        ],
        defence: [
            '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
            '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
            '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
            '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
            '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
            '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
            '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
            '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
        ],
        draw: 'Ничья - это тоже победа!'
    };
    generateLogs = (type, player1, player2, damage, hp) => {
        let text = '';
        let el = '';
        switch (type) {
            case 'start':
                text = this.LOGS['start']
                    .replace('[time]', this.time)
                    .replace('[player1]', player1.name)
                    .replace('[player2]', player2.name);
                el = `<p>${text}</p>`;
                break;
            case 'end':
                text = this.LOGS['end'][this.getRandom(this.LOGS.end.length)]
                    .replace('[time]', this.time)
                    .replace('[playerWins]', player1.name)
                    .replace('[playerLose]', player2.name);
                el = `<p>${this.time} - ${text}</p>`;
                break;
            case 'hit':
                text = this.LOGS['hit'][this.getRandom(this.LOGS.hit.length)]
                    .replace('[playerKick]', player1.name)
                    .replace('[playerDefence]', player2.name);
                el = `<p>${this.time} - ${text} - ${damage} [${hp}/100]</p>`
                break;
            case 'defence':
                text = this.LOGS['defence'][this.getRandom(this.LOGS.defence.length)]
                    .replace('[playerKick]', player1.name)
                    .replace('[playerDefence]', player2.name);
                el = `<p>${this.time} - ${text} - [${hp}/100]</p>`
                break;
            case 'draw':
                text = this.LOGS['draw']
                el = `<p>${this.time} - ${text}</p>`;
                break;
        }
        return this.chat.insertAdjacentHTML('afterbegin', el)
    }
    getRandom = num => {
        const length = num - 1;
        return Math.ceil(Math.random() * length)
    }

    createReloadButton = () => {
        const $reloadWrap = this.createElement('div', 'reloadWrap');
        const $restartButton = this.createElement('button', 'button')
        $restartButton.innerText = 'Restart';
        $reloadWrap.appendChild($restartButton)
        this.$arenas.appendChild($reloadWrap)
        $restartButton.addEventListener('click', function () {
            window.location.reload()
        })
    }
    showResult = () => {
        if (player1.hp === 0 || player2.hp === 0) {
            this.createReloadButton()
        }
        if (player1.hp === 0 && player1.hp < player2.hp) {
            this.$arenas.appendChild(this.playerWins(player2.name));
            this.generateLogs('end', player2, player1);
        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            this.$arenas.appendChild(this.playerWins(player1.name));
            this.generateLogs('end', player1, player2);
        } else if (player1.hp === 0 && player2.hp === 0) {
            this.$arenas.appendChild(this.playerWins());
            this.generateLogs('draw');
        }
    }

    start = async (props) => {
        const players = await this.getPlayers();
        const p1 = players[this.getRandom(players.length)];
        const p2 = players[this.getRandom(players.length)];
        player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas',
        });
        player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas',
        })

        player1.createPlayer(player1);
        player2.createPlayer(player2);
        const createElement = (tag, className) => {
            const $tag = document.createElement(tag);
            if (className) {
                $tag.classList.add(className);
            }
            return $tag
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

        this.generateLogs('start', player1, player2);
        this.formFight.addEventListener('submit', function (e) {
            e.preventDefault();
            const enemyAttack = () => {
                const hit = this.ATTACK[this.getRandom(this.ATTACK.length)];
                const defence = this.ATTACK[this.getRandom(this.ATTACK.length)];
                return {
                    value: this.getRandom(this.HIT[hit]),
                    hit,
                    defence,
                }
            }
            const playerAttack = () => {
                const attack = {};

                for (let item of this.formFight) {
                    if (item.checked && item.name === 'hit') {
                        attack.value = this.getRandom(this.HIT[item.value])
                        attack.hit = item.value;
                    }
                    if (item.checked && item.name === 'defence') {
                        attack.defence = item.value
                    }
                    item.checked = false
                }
                return attack
            }
            const enemy = enemyAttack();
            const player = playerAttack();
            const {hp: hp1} = player1
            const {hp: hp2} = player2
            if (player.defence !== enemy.hit) {
                player1.changeHP(enemy.value);
                player1.renderHP();
                props.generateLogs('hit', player2, player1, enemy.value, hp1);
            }
            if (enemy.defence !== player.hit) {
                player2.changeHP(player.value)
                player2.renderHP()
                props.generateLogs('hit', player1, player2, player.value, hp2);
            }
            props.generateLogs('defence', player1, player2, player.value, hp2);
            props.generateLogs('defence', player2, player1, enemy.value, hp1);
            props.showResult();
        });
        this.$arenas.appendChild(createPlayer(player1));
        this.$arenas.appendChild(createPlayer(player2));
    }*/