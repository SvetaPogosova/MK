const player1 = {
    name: 'SCORPION',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword', 'Gun', 'Fan'],
    attack: function () {
        console.log(player1.name + ' Fight...')}
};

const player2 = {
    name: 'SUB-ZERO',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Sword', 'Gun', 'Fan'],
    attack: function () {
        console.log(player2.name + ' Fight...')}
}

function createPlayer (player, character) {
    const divPlayer = document.createElement('div')
    divPlayer.classList.add('player');

    const divProgressbar = document.createElement('div');
    divProgressbar.classList.add('progressbar');

    const divLife = document.createElement('div');
    divLife.classList.add('life');
    divLife.style.width = character.hp + '%';

    const divName = document.createElement('div');
    divName.classList.add('name');
    divName.innerText= character.name;

    const divCharacter = document.createElement('div');
    divCharacter.classList.add('character');

    const image = document.createElement('img');
    image.src = character.img;

    divProgressbar.appendChild(divLife);
    divProgressbar.appendChild(divName);
    divCharacter.appendChild(image);
    divPlayer.appendChild(divProgressbar);
    divPlayer.appendChild(divCharacter);


    const arenas = document.querySelector('.arenas').appendChild(divPlayer)
}

createPlayer('player1', player1);
createPlayer('player2', player2);