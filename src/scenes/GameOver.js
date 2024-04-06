import { Scene } from 'phaser';
import { Settings } from './settings.js';
import { Textos } from '../components/textos.js';
import { ElegirJuego } from '../components/boton-nuevapartida';

export class PreGame extends Scene
{
    constructor ()
    {
        super('PreGame');
    }

    init()
    {
        Settings.setPuntos(0);
        Settings.setNivel(1);
        Settings.setGameOver(false);

        const ancho = this.sys.game.config.width;
        const alto = this.sys.game.config.height;
        
        this.choosegame = [];

        this.choosegame.push(new ElegirJuego(this, {
            left: Math.floor(ancho / 2 - ancho / 4),
            top: Math.floor(alto / 2.1),
            img: 'img-menu-numbers',
            scale: 0.3, texto: '   Puzzle \n Numbers ', id: 'teclado'
        }));

        this.choosegame.push(new ElegirJuego(this, {
            left: Math.floor(ancho / 2 + ancho / 4),
            top: Math.floor(alto / 2.1),
            img: 'img-menu-jewels',
            scale: 0.3, texto: ' Puzzle \n Jewels ', id: 'mobile'
        }));

        this.txt = new Textos(this, {
            x: Math.floor(ancho / 2),
            y: -200,
            txt: '         Choose your \n challenge Puzzle-game ',
            size: 64, color: '#ffa', style: 'bold',
            stroke: '#f41', sizeStroke: 16,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0.5, 0.5],
            elastic: false, dura: 0
        });
    }

    create ()
    {
        this.add.image(0, 0, 'fondo').setDepth(Settings.depth.fondo).setOrigin(0, 0);

        this.choosegame.forEach(chooseg => chooseg.create());
        this.txt.create();

        this.tweens.add({
            targets: this.txt.get(),
            y: Math.floor(this.sys.game.config.height / 8),
            duration: 1000
        });
    }

    get()
    {
        return this.txt;
    }
}
