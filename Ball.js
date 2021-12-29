const INITIAL_VELOCITY = .055;
const VELOCITY_INCREASE = .000000001;

export default class Ball {
    constructor(ballElm) {
        this.ballElm = ballElm;
        this.reset();
    }

    get x() {
        // dapatkan variabel --x pada style.css class ball
        return parseFloat(getComputedStyle(this.ballElm).getPropertyValue('--x'))
    }

    set x(value) {
        // mengubah nilai --x
        this.ballElm.style.setProperty('--x', value)
    }

    get y() {
        // dapatkan variabel --y pada style.css class ball
        return parseFloat(getComputedStyle(this.ballElm).getPropertyValue('--y'))
    }

    set y(value) {
        // mengubah nilai --y
        this.ballElm.style.setProperty('--y', value)
    }

    reset() {
        // mereset posisi x dan y yang di style.css class ball
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 }
        while (
            Math.abs(this.direction.x) <= .2
            || Math.abs(this.direction.x >= .9)
        ) {
            const heading = randomNumberBetween(0, 2 * Math.PI)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }

        this.velocity = INITIAL_VELOCITY;
    }

    rect() {
        return this.ballElm.getBoundingClientRect()
    }

    update(delta, paddleRects) {
        // mengupdate posisi x dan y
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;

        // mengatur kecepatan bola
        // this.velocity += VELOCITY_INCREASE * delta;

        const rect = this.rect()
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1;
        }
        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1;
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function isCollision(rect1, rect2) {
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    )
}