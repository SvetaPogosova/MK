const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')
const $restartButton = document.querySelector('.button')

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword', 'Gun', 'Fan'],
    attack: function () {
        console.log(player1.name + ' Fight...')
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
};

const player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Sword', 'Gun', 'Fan'],
    attack: function () {
        console.log(player2.name + ' Fight...')
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
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

/*
function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life')
    player.hp -= Math.ceil(Math.random() * 20);

    if (player.hp <= 0) {
        player.hp = 0;
    }
    $playerLife.style.width = player.hp + '%'
}
*/
function getRandom(num) {
    return Math.ceil(Math.random() * num)
}

function changeHP(num) {
    this.hp -= num
    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector('.player' + this.player + '.life')
}

function renderHP() {
    const $playerLife = document.querySelector('.player' + this.player + ' .life')
    $playerLife.style.width = this.hp + '%'
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

$randomButton.innerText = "Random"
$randomButton.addEventListener('click', function () {
    player1.changeHP(getRandom(20))
    player2.changeHP(getRandom(20))

    player1.renderHP();
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        //$randomButton.disabled = true;
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
})



$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));