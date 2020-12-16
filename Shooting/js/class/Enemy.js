class Enemy extends createjs.Shape {
    // getter
    getX() { return this.x; }   // X位置を返す。
    getY() { return this.y; }   // Y位置を返す。

    constructor(stageW, stageH) {
        super();

        this.x = 0;
        this.y = 0;

        this.graphics.beginFill("red").moveTo(10, -5).lineTo(10, 5).lineTo(5, 5).lineTo(5, 10)
            .lineTo(-5, 10).lineTo(-5, 5).lineTo(-10, 5).lineTo(-10, -5).closePath();

        this.x = stageW * Math.random();
        this.y = stageH;
    }

    move() {
        this.y += 1;
    }

    collideWith(bullet) {
        let pt = bullet.localToLocal(0, 0, this);

        return this.hitTest(pt.x, pt.y);
    }
}