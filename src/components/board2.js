import { Settings } from "../scenes/settings.js";
import { play_sonidos } from "../functions/functions.js";

export class Board
{
    constructor(scene, resolve)
    {
        this.relatedScene = scene;
        this.resolve = resolve;
    }

    create()
    {
        this.paddingX = Math.floor(
            this.relatedScene.sys.game.config.width / 2 - (Settings.tileXY.x * Settings.array_numbers[0].length) / 2
        );

        this.paddingY = Math.floor(
            this.relatedScene.sys.game.config.height / 2 - (Settings.tileXY.y * Settings.array_numbers.length) / 2
        );

        this.lenArrayNumbers = Settings.array_numbers.length * Settings.array_numbers[0].length;
        this.drawNumbers = [];

        if (!this.resolve)
        {
            this.set_draw();
        }
        else
        {
            this.drawNumbers = [0, 1, 2, 3, 4, 5, 6, 7];
        }

        this.puzzle_done = false;

        this.board = this.relatedScene.physics.add.group(
        {
            key: 'tiles-jewels',
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
            x: this.paddingX,
            y: this.paddingY
        });
        
        if (!this.resolve)
        {
            this.board.children.iterate((numero, index) =>
            {
                numero.setInteractive();

                numero.on('pointerdown', () =>
                {
                    console.log('click' + numero.x + numero.y);
                    this.clickHandler(numero);
                });
            });
        }

        this.sound_jump = this.relatedScene.sonido_jump;

        console.log(this.board);
    }

    update()
    {
        this.puzzle_done = this.check_puzzleDone();
        // console.log(this.puzzle_done);
    }

    clickHandler(numero)
    {
        if (Settings.pausas.inicialBool) return;
        
        const [y, x] = this.get_matrixIndex(numero.y, numero.x);
        this.check_neighbours(y, x, numero);
    }

    check_neighbours(y, x, numero)
    {
        // console.log(Settings.empty);

        if (y < Settings.array_numbers.length - 1 && Settings.array_numbers[y + 1][x] === Settings.empty)
        {
            this.swapEmpty(y, x, 1, 0, numero);
            return;
        }
        
        if (y > 0 && Settings.array_numbers[y - 1][x] === Settings.empty)
        {
            this.swapEmpty(y, x, -1, 0, numero);
            return;
        }
        
        if (x < Settings.array_numbers[0].length - 1 && Settings.array_numbers[y][x + 1] === Settings.empty)
        {
            this.swapEmpty(y, x, 0, 1, numero);
            return;
        }
        
        if (x > 0 && Settings.array_numbers[y][x - 1] === Settings.empty)
        {
            this.swapEmpty(y, x, 0, -1, numero);
            return;
        }
    }

    swapEmpty(y, x, offSetY, offSetX, numero)
    {
        Settings.array_numbers[y + offSetY][x + offSetX] = Settings.array_numbers[y][x];
        Settings.array_numbers[y][x] = Settings.empty;
        console.log(Settings.array_numbers);

        this.relatedScene.tweens.add({
            targets: numero,
            x: numero.x + (offSetX * Settings.tileXY.x),
            y: numero.y + (offSetY * Settings.tileXY.y),
            duration: Settings.animations.vel
        });

        play_sonidos(this.sound_jump, false, 0.7);
    }

    get_matrixIndex(coorY, coorX)
    {
        return [
            (coorY - this.paddingY) / Settings.tileXY.y,
            (coorX - this.paddingX) / Settings.tileXY.x
        ];
    }

    /* get_matrixIndex(index)
    {
        const y = Math.floor(index / Settings.array_numbers[0].length);
        const x = index - y * Settings.array_numbers[0].length;

        return [y, x];
    } */

    set_draw()
    {
        const array_jewels = [
            'diamond_0000', 'diamond_0000', 'diamond_0000', 'diamond_0000',            
            'prism_0000', 'prism_0000', 'prism_0000', 'prism_0000',            
            'ruby_0000', 'ruby_0000', 'ruby_0000', 'ruby_0000',            
            'square_0000', 'square_0000', 'square_0000'            
        ];

        const drawNumbers2 = [];

        for (let i = 0; i < Settings.array_numbers.length; i ++)
        {
            for (let ii = 0; ii < Settings.array_numbers[0].length; ii ++)
            {
                if (ii === Settings.array_numbers[0].length - 1 && i === Settings.array_numbers.length - 1) continue;

                let rnd;

                do {
                    rnd = Phaser.Math.Between(0, this.lenArrayNumbers - 2);
                } while (drawNumbers2.includes(rnd));

                const jewel = array_jewels[rnd];

                Settings.array_numbers[i][ii] = jewel;
                this.drawNumbers.push(jewel);
                drawNumbers2.push(rnd);
            }
        }
        console.log(Settings.array_numbers);
    }

    check_puzzleDone()
    {
        const winnerCombos = [
            // Horizontal
            [[0, 0], [0, 1], [0, 2], [0, 3]],
            [[1, 0], [1, 1], [1, 2], [1, 3]],
            [[2, 0], [2, 1], [2, 2], [2, 3]],
            [[3, 0], [3, 1], [3, 2], [3, 3]],
            // Vertical
            [[0, 0], [1, 0], [2, 0], [3, 0]],
            [[0, 1], [1, 1], [2, 1], [3, 1]],
            [[0, 2], [1, 2], [2, 2], [3, 2]],
            [[0, 3], [1, 3], [2, 3], [3, 3]],
            // Center
            [[1, 1], [1, 2], [2, 1], [2, 2]]
        ];

        const jewelTarget = this.relatedScene.strJewels[this.relatedScene.target] + '0000';
        const check = 1;
        const zoneToCheck = winnerCombos[check];

        if (Settings.array_numbers[zoneToCheck[0][0]][zoneToCheck[0][1]] === jewelTarget &&
            Settings.array_numbers[zoneToCheck[1][0]][zoneToCheck[1][1]] === jewelTarget &&
            Settings.array_numbers[zoneToCheck[2][0]][zoneToCheck[2][1]] === jewelTarget &&
            Settings.array_numbers[zoneToCheck[3][0]][zoneToCheck[3][1]] === jewelTarget
        ){
            return true;
        }

        return false;
    }

    get()
    {
        return this.board;
    }
}
