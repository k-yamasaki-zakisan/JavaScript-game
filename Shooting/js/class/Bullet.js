class Bullet extends createjs.Shape {
    //getter
    getX() { return this.x; }
    getY() { return this.y; }

    constructor(x, y, level) {
        super();

        this.x = x;
        this.y = y;

        this.level = level;

        this.graphics.beginFill("white").drawCircle(0, 0, 3);
    }

    move() {
        this.y -= 10 + this.level;
    }
}