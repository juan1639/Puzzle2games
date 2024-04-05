import { Scene } from 'phaser';
import { Settings } from './settings.js';
import { ElegirJuego, BotonNuevaPartida } from '../components/boton-nuevapartida';

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
        Settings.setNivelSuperado(false);

        const ancho = this.sys.game.config.width;
        const alto = this.sys.game.config.height;
        
        this.choosegame = [];

        this.choosegame.push(new ElegirJuego(this, {
            left: Math.floor(ancho / 2 - ancho / 4),
            top: Math.floor(alto / 2),
            scale: 1, texto: ' Puzzle Numbers ', id: 'teclado'
        }));

        this.choosegame.push(new ElegirJuego(this, {
            left: Math.floor(ancho / 2 + ancho / 4),
            top: Math.floor(alto / 2),
            scale: 1, texto: ' Puzzle Jewels ', id: 'mobile'
        }));
    }

    create ()
    {
        this.add.image(0, 0, 'fondo').setDepth(Settings.depth.fondo).setOrigin(0, 0);
        
        this.choosegame.forEach(chooseg => chooseg.create());
    }
}
