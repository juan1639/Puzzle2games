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

        this.boardimg = this.relatedScene.add.image(paddingX - 4, paddingY - 4, 'board');
        this.boardimg.setDepth(Settings.depth.fondo).setOrigin(0, 0);

        // Puzzle Numbers --> 150px x 3 = 450px ----> setScale(1)
        // Puzzle Jewels ---> 100px x 4 = 400px ----> setScale(400 / 450)
        if (Settings.array_numbers.length === 3)
        {
            this.boardimg.setScale(1);
        }
        else
        {
            this.boardimg.setScale(0.89);
        }

        this.draw_rectangles(paddingX, paddingY);

        console.log(this.boardimg);
    }

    draw_rectangles(paddingX, paddingY)
    {
        let rectangles = [];

        for (let i = 0; i < Settings.array_numbers.length; i ++)
        {
            for (let ii = 0; ii < Settings.array_numbers[0].length; ii ++)
            {
                rectangles.push(this.relatedScene.add.rectangle(
                    paddingX + (Settings.tileXY.x * ii),
                    paddingY + (Settings.tileXY.y * i),
                    Settings.tileXY.x - 2, Settings.tileXY.y - 2, 0x756500
                ));
            }
        }

        rectangles.forEach(rect =>
        {
            rect.setOrigin(0, 0);
        });
    }

    get()
    {
        return this.boardimg;
    }
}
