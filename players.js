export class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
    }

    changeHP = (damage) => {
        this.hp -= damage
        if (this.hp < 0) {
            this.hp = 0;
        }
    }

    elHP = () => {
        return document.querySelector(`.player${this.player} .life`)
    }

    renderHP = () => {
        this.elHP().style.width = this.hp + '%'
    }
    createPlayer
}

/*
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
*/

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag
};
