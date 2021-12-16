const $arenas = document.querySelector('.arenas')
//const form = document.querySelector('.form')
//const $randomButton = document.querySelector('.button')
//const $restartButton = document.querySelector('.button')

const formFight = document.querySelector('.control')
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword', 'Gun', 'Fan'],
    attack,
    changeHP,
    elHP,
    renderHP,
};

const player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Sword', 'Gun', 'Fan'],
    attack,
    changeHP,
    elHP,
    renderHP,
}

function attack() {
    console.log(player1.name + ' Fight...')
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag
}

function createPlayer(playerObj) {
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

function getRandom(num) {
    return Math.ceil(Math.random() * num)
}

function changeHP(damage) {
    this.hp -= damage
    if (this.hp < 0) {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life')
}

function renderHP() {
    return this.elHP().style.width = this.hp + '%'
}

function playerWins(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText = 'Draw';
    }
    return $loseTitle
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $restartButton = createElement('button', 'button')
    $restartButton.innerText = 'Restart';
    $reloadWrap.appendChild($restartButton)
    $arenas.appendChild($reloadWrap)
    $restartButton.addEventListener('click', function () {
        window.location.reload()
    })
}

/*$randomButton.innerText = "Random"
$randomButton.addEventListener('click', function () {
    player1.changeHP(getRandom(20))
    player2.changeHP(getRandom(20))

    player1.renderHP();
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.style.display = 'none';
        createReloadButton()
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name))
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name))
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins())
    }
})*/

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const attack = {};

    for (let item of formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value])
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value
        }
        item.checked = false
    }

    function enemyDamage(){
        if (attack.defence === enemy.hit) {
            return 0
        } else {
            return enemy.value
        }
    }
    function attackDamage(){
        if (enemy.defence === attack.hit) {
            return 0
        } else {
            return attack.value
        }
    }
    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton()
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name))
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name))
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins())
    }

    player1.changeHP(enemyDamage())
    player2.changeHP(attackDamage())

    player1.renderHP();
    player2.renderHP();

    /*console.log('a', attack)
    console.log('e', enemy)
    console.log('1', player1)
    console.log('2', player2)*/
})