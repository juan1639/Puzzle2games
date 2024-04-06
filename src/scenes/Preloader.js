import { Scene } from 'phaser';
import { Textos } from '../components/textos.js';

export class Preloader extends Scene
{
    constructor()
    {
        super('Preloader');
    }

    init()
    {
        const widthScreen = this.sys.game.config.width;
        const heightScreen = this.sys.game.config.height;

        this.load.image('fondo', 'assets/img/bg.png');
        this.add.image(0, 0, 'fondo').setOrigin(0, 0);

        this.txt = new Textos(this, {
            x: Math.floor(widthScreen / 2),
            y: Math.floor(heightScreen / 3.5),
            txt: ' Loading...',
            size: 55, color: '#ffa', style: 'bold',
            stroke: '#f91', sizeStroke: 16,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0.5, 0.5],
            elastic: false, dura: 0
        });

        this.txt.create();

        this.add.rectangle(
            Math.floor(widthScreen / 2), Math.floor(heightScreen / 2),
            Math.floor(widthScreen / 1.5), Math.floor(heightScreen / 12)
        ).setStrokeStyle(1, 0xffee88);

        const bar = this.add.rectangle(
            Math.floor(widthScreen / 2) - Math.floor(widthScreen / 3) + 4,
            Math.floor(heightScreen / 2),
            4,
            Math.floor(heightScreen / 14),
            0xff9911
        );

        this.load.on('progress', (progress) => {
            bar.width = (Math.floor(widthScreen / 1.52) * progress);
        });
    } 
    
    preload()
    {
        this.load.setPath('assets');

        this.load.image('fondo', './img/bg.png');

        for (let i = 1; i < 4; i ++)
        {
            this.load.image(`fondo${i}`, `./img/fondo-mosaico${i}.jpg`);
        }

        this.load.image('ui-1', './img/ui-1.png');

        this.load.image('img-menu-numbers', './img/img-puzzle-numbers.png');
        this.load.image('img-menu-jewels', './img/img-puzzle-numbers.png');

        this.load.image('boton-nueva-partida', './img/boton-start.png');
        this.load.spritesheet('boton-fullscreen', './img/boton-fullscreen.png', {frameWidth: 64, frameHeight: 64});

        this.load.image('particula-tint', './img/particula-tint.png');

        this.load.image('tile-blue', './img/tile-blue.png');
        this.load.image('board', './img/board-puzzle.png');
        this.load.spritesheet('tiles-numbers', './img/ssheet-puzzle-numbers.png', {frameWidth: 150, frameHeight: 150});
        
        //  Archivos de audio
        // this.load.audio('gameover-retro', './game-over-arcade-retro.mp3');
    }

    create()
    {
        this.scene.start('MainMenu');
    }
}
