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

        console.log(this.boardimg);
    }

    get()
    {
        return this.boardimg;
    }
}
