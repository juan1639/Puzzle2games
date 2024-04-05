import { Settings } from "../scenes/settings.js";

export class Board
{
    constructor(scene)
    {
        this.relatedScene = scene;
    }

    create()
    {
        const paddingX = Math.floor(
            this.relatedScene.sys.game.config.width / 2 - (Settings.tileXY.x * Settings.array_numbers[0].length) / 2
        );

        const paddingY = Math.floor(
            this.relatedScene.sys.game.config.height / 2 - (Settings.tileXY.y * Settings.array_numbers.length) / 2
        );

        this.board = this.relatedScene.physics.add.group(
        {
            key: 'tiles-numbers',
            frame: [0, 1, 2, 3, 4, 5, 6, 7],
            // repeat: Settings.array_numbers.length * Settings.array_numbers[0].length - 1
        });

        Phaser.Actions.SetScale(this.board.getChildren(),
            Settings.tileXY.x / this.board.getChildren()[0].width,
            Settings.tileXY.y / this.board.getChildren()[0].height
        );

        Phaser.Actions.SetOrigin(this.board.getChildren(), 0, 0);

        Phaser.Actions.GridAlign(this.board.getChildren(), {
            width: Settings.array_numbers[0].length,
            height: Settings.array_numbers.length,
            cellWidth: Settings.tileXY.x,
            cellHeight: Settings.tileXY.y,
            x: paddingX,
            y: paddingY
        });

        console.log(this.board);
    }

    update() {}

    get()
    {
        return this.board;
    }
}