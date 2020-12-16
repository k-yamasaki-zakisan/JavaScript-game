window.addEventListener("load", init);
function init() {
    let stage = new createjs.Stage("myCanvas");

    let enemyList = [];
    let bulletList = [];
    let count = 0;
    let scoreNum = 0;
    const STAGE_W = 540;
    const STAGE_H = 960;

    let bg = new createjs.Shape();
    bg.graphics.beginFill("black").drawRect(0, 0, STAGE_W, STAGE_H);
    stage.addChild(bg);

    // 自機を作成
    let player = new Player();
    stage.addChild(player);

    //  スコア欄を作成
    let scoreBoard = new createjs.Text("", "20px sans-serif", "white");
    scoreBoard.text = "Score:" + String(0);
    stage.addChild(scoreBoard);

    // レベル欄の作成
    let levelBoard = new createjs.Text("", "20px sans-serif", "white");
    levelBoard.text = "level:" + String(1);
    levelBoard.x = 150;
    levelBoard.y = 0;
    stage.addChild(levelBoard);

    // マウス座標欄を作成
    let mouseBoard = new createjs.Text("", "10px sans-serif", "white");
    mouseBoard.x = 0;
    mouseBoard.y = 30;
    stage.addChild(mouseBoard);

    // タッチ操作も可能にする(iOS,Android向け)
    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage);
    }

    // マウスイベントの登録
    stage.addEventListener("click", handleClick);

    // tickイベント
    createjs.Ticker.framerate = 60; // setFPSは非推奨
    createjs.Ticker.addEventListener("tick", handleTick);

    // クリックした時の処理
    function handleClick(event) {
        // レベル増加に合わせて弾数増加
        for (let i = 0; i < player.level; i++) {
            let bullet = new Bullet(player.x, player.y, player.level);
            stage.addChild(bullet);
            bulletList.push(bullet);

            if (player.level > 1) {
                let bullet = new Bullet(player.x + i * 10, player.y, player.level);
                stage.addChild(bullet);
                bulletList.push(bullet);
            }

            if (player.level > 1) {
                let bullet = new Bullet(player.x - i * 10, player.y, player.level);
                stage.addChild(bullet);
                bulletList.push(bullet);
            }
        }
    }

    // tick イベント
    function handleTick() {
        // 自機をマウス座標まで移動させる(減速で移動)
        player.move(stage);

        // フレーム番号を更新(インクリメント)
        count = count + 1;

        // 60フレームに1回、敵を生成
        if (count % 60 == 0) {
            // 敵を生成
            let enemy = new Enemy(STAGE_W, 50);
            stage.addChild(enemy);
            enemyList.push(enemy);
        }

        // 発射弾の移動処理
        for (var i = 0; i < bulletList.length; i++) {

            bulletList[i].move();

            // 画面端まで移動したら
            if (bulletList[i].x > STAGE_W || bulletList[i].y > STAGE_H) {
                stage.removeChild(bulletList[i]); // 画面から削除
                bulletList.splice(i, 1); // 配列から削除
            }
        }

        // 敵の移動処理
        for (var i = 0; i < enemyList.length; i++) {

            // 敵機の移動
            enemyList[i].move();

            // 画面端まで移動したら
            if (enemyList[i].x < 0 || enemyList[i].y > STAGE_H) {
                showGameOver(); // ゲームオーバー処理へ
            }
        }

        // 発射弾と敵の当たり判定
        for (let j = 0; j < enemyList.length; j++) {
            for (let i = 0; i < bulletList.length; i++) {
                let bullet = bulletList[i];
                let enemy = enemyList[j];

                //当たり判定を行う
                if (enemy.collideWith(bullet) === true) {
                    // 弾の削除
                    stage.removeChild(bullet);
                    bulletList.splice(i, 1);

                    // 敵を削除する
                    stage.removeChild(bullet);
                    bulletList.splice(j, 1);

                    // スコアの更新
                    scoreNum += 100;
                    player.addExp(100);

                    // スコアの更新
                    if (scoreNum >= 3000) {
                        showGameClear();
                    }

                    break;
                }
            }
        }

        // 各テキストの更新
        scoreBoard.text = "Score:" + String(scoreNum);
        levelBoard.text = "Level:" + String(player.getLevel()) + "  Exp:" + String(player.getExp());
        mouseBoard.text = "Mouse X:" + String(stage.mouseX) + " Y:" + String(stage.mouseY);

        // ステージの更新
        stage.update();
    }

    // ゲームオーバー
    function showGameOver() {
        alert(`ゲームオーバー！ あなたのスコアは${scoreNum}でした。`);

        // 各種イベントをまとめて解除
        createjs.Ticker.removeAllEventListeners();
        stage.removeAllEventListeners();
    }

    // ステージクリア
    function showGameClear() {
        alert(`${scoreNum}点達成！　ゲームクリア！`);

        // 各種イベントをまとめて解除
        createjs.Ticker.removeAllEventListeners();
        stage.removeAllEventListeners();
    }
}