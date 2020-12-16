class Player extends createjs.Shape {
    //getter
    getX() { return this.x; } // X位置を返す。
    getY() { return this.y; } // Y位置を返す。
    getLevel() { return this.level }
    getExp() { return this.exp }

    constructor() {
        super();

        this.x = 0;
        this.y = 0;

        this.exp = 0;
        this.level = 1;

        this.graphics.beginFill("white").moveTo(0, -10).lineTo(-5, 0).lineTo(5, 0).closePath();
    }

    move(stage) {
        this.x += (stage.mouseX - this.x) * 0.1;
        this.y += (stage.mouseY - this.y) * 0.1;
    }

    addExp(exp) {
        this.exp = this.exp + exp;
        this.level = Math.ceil(this.exp / 500);
    }
}