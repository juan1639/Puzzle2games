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

        this.lenArrayNumbers = Settings.array_numbers.length * Settings.array_numbers[0].length;
        this.drawNumbers = [];
        this.set_draw();

        this.board = this.relatedScene.physics.add.group(
        {
            key: 'tiles-numbers',
            // frame: [0, 7, 2, 3, 4, 5, 6, 1],
            frame: this.drawNumbers,
            // repeat: this.lenArrayNumbers - 1
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

        this.board.children.iterate((numero, index) =>
        {
            numero.setInteractive();

            numero.on('pointerdown', () =>
            {
                console.log('click' + index);
                this.clickHandler(numero, index);
            });
        });

        console.log(this.board);
    }

    update()
    {
    }

    clickHandler(numero, index)
    {
        
    }

    set_draw()
    {
        for (let i = 0; i < Settings.array_numbers.length; i ++)
        {
            for (let ii = 0; ii < Settings.array_numbers[0].length; ii ++)
            {
                if (ii === Settings.array_numbers[0].length - 1 && i === Settings.array_numbers.length - 1) continue;

                let rnd;

                do {
                    rnd = Phaser.Math.Between(0, this.lenArrayNumbers - 2);
                } while (this.drawNumbers.includes(rnd));

                Settings.array_numbers[i][ii] = rnd;
                this.drawNumbers.push(rnd);
            }
        }
        console.log(Settings.array_numbers);
    }

    get()
    {
        return this.board;
    }
}