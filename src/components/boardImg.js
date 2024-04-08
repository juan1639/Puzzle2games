import { Settings } from "../scenes/settings.js";

export class BoardImg
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

        this.boardimg = this.relatedScene.add.image(paddingX - 4, paddingY -4, 'board');
        this.boardimg.setDepth(Settings.depth.fondo).setOrigin(0, 0);

        // Puzzle Numbers --> 150 x 3 = 450px ----> setScale(1)
        // Puzzle Jewels ---> 100 x 400 = 400px --> setScale(400 / 450)
        if (Settings.array_numbers.length === 3)
        {
            this.boardimg.setScale(1);
        }
        else
        {
            this.boardimg.setScale(0.89);
        }

        console.log(this.boardimg);
    }

    get()
    {
        return this.boardimg;
    }
}
