import {getRandom} from "./utils.js";
import {formFight} from "./Game.js";
import {ATTACK, HIT} from "./constants.js";

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
}

export const enemyAttack = () => {
    const hit = ATTACK[getRandom(ATTACK.length)];
    const defence = ATTACK[getRandom(ATTACK.length)];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}
export const playerAttack = () => {
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
    return attack
}
export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag
};