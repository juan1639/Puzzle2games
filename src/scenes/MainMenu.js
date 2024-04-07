import { Scene } from 'phaser';
import { Textos } from '../components/textos.js';
import { play_sonidos, particulas } from '../functions/functions.js';
import { BotonNuevaPartida } from '../components/boton-nuevapartida.js';
import { Settings } from './settings.js';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    init()
    {
        Settings.setAudioMusic(this.sound.add('music-puzzle-game'));
        Settings.setAudioFireWorks(this.sound.add('fireworks'));
        
        this.botoninicio = new BotonNuevaPartida(this, {
            left: Math.floor(this.sys.game.config.width / 2),
            top: Math.floor(this.sys.game.config.height / 1.3),
            id: 'boton-nueva-partida',
            scX: 0.7, scY: 0.7, angle: 1, originX: 0.5, originY: 0.5,
            texto: ' New Game ', nextScene: 'PreGame'
        });

        this.txt = new Textos(this, {
            x: Math.floor(this.sys.game.config.width / 2),
            y: 0,
            txt: ' Puzzle \n     2 \n games ',
            size: 100, color: '#ffa', style: 'bold',
            stroke: '#f51', sizeStroke: 16,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0.5, 0.5],
            elastic: Math.floor(this.sys.game.config.height / 3), dura: 3000
        });
    }

    preload() {}

    create ()
    {
        const aparecerBoton = 1800; // 1800

        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        this.add.image(0, 0, 'fondo').setOrigin(0, 0);

        particulas(
            width / 2, height / 2, 'particula1',
            {min: 120, max: 220},
            {min: 2400, max: 2800},
            {start: 1.5, end: 0},
            0x11eeaa,
            // new Phaser.Display.Color(Phaser.Math.Between(100, 150), Phaser.Math.Between(100, 255), 0).color,
            true, null, false, this
        );

        this.txt.create();

        /* const basedOn = this.add.text(
            Math.floor(this.sys.game.config.width / 4),
            Math.floor(this.sys.game.config.height / 1.04),
            'Based on ...',
            {fontSize: '16px', color: '#ff1', align: 'justify', fontFamily: 'Arial'}
        ); */

        const timeline = this.add.timeline([
            {
                at: aparecerBoton,
                run: () =>
                {
                    this.botoninicio.create();
                }
            }
        ]);

        timeline.play();

        play_sonidos(Settings.getAudio().music, true, 0.6);
        
        console.log(this.txt);
    }  
}
