const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword', 'Gun', 'Fan'],
    attack: function () {
        console.log(player1.name + ' Fight...')
    }
};

const player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Sword', 'Gun', 'Fan'],
    attack: function () {
        console.log(player2.name + ' Fight...')
    }
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

function changeHP (player) {
    const $playerLife = document.querySelector('.player'+ player.player +' .life')
    player.hp -= Math.ceil(Math.random() * 20);
    $playerLife.style.width = player.hp + '%'

    if (player.hp <= 0) {
        function lose () {
            $arenas.appendChild(playerLose(player.name))
            $randomButton.disabled = true
        }
        return lose()
    }

    console.log(player.name, player.hp)
}

function playerLose(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' lose';
    return $loseTitle
}

$randomButton.addEventListener('click', function (){
    changeHP(player2);
    changeHP(player1);
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2))