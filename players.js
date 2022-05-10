class Player {
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

export const player1 = new Player({
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword', 'Gun', 'Fan'],
})
export const player2 = new Player({
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Sword', 'Gun', 'Fan'],
})