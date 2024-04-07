import { Settings } from './settings.js';
import { BoardImg } from '../components/boardImg.js';
import { Board } from '../components/board.js';
import { Textos } from '../components/textos.js';
import { BotonNuevaPartida } from "../components/boton-nuevapartida.js";
import { particulas, play_sonidos } from '../functions/functions.js';

export class Congratulations extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'Congratulations' });
  }

  init()
  {
    Settings.array_numbers =
    [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    this.boardimg = new BoardImg(this);
    this.board = new Board(this, false);

    // this.instanciar_marcadores();
    this.botoninicio = new BotonNuevaPartida(this);
  }

  create()
  {
    this.set_sonidos();

    this.add.image(0, 0, 'fondo').setOrigin(0, 0);

    // this.ui.forEach(uix => uix.setVisible(true).setDepth(Settings.depth.ui));

    this.boardimg.create();
    this.board.create();
    
    // this.marcadorPtos.create();
    // this.marcadorHi.create();
    // this.botonfullscreen.create();

    const aparecerBoton = 5000;

    this.txt = new Textos(this, {
      x: Math.floor(this.sys.game.config.width / 2),
      y: Math.floor(this.sys.game.config.height / 2.1),
      txt: ' Congratulations! ',
      size: 100, color: '#ffa', style: 'bold',
      stroke: '#f91', sizeStroke: 16,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
      bool1: false, bool2: true, origin: [0.5, 0.5],
      elastic: false, dura: 0
    });

    this.txt.create();
    this.txt.get().setDepth(Settings.depth.textos).setAlpha(1).setScale(0.1);

    this.tweens.add(
    {
      targets: this.txt.get(),
      scale: 1,
      duration: 2000
    });

    particulas(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      'particula1',
      {min: 90, max: 320},
      {min: 5500, max: 6000},
      {start: 0, end: 1},
      0xffcc11,
      true, null, false, this
    );

    const timeline = this.add.timeline([
      {
        at: Math.floor(aparecerBoton / 2),
        run: () =>
        {
          play_sonidos(this.sonido_fireworks, false, 0.9);
        }
      },
      {
        at: aparecerBoton,
        run: () =>
        {
          this.botoninicio.create('PreGame');
        }
      }
    ]);
    
    timeline.play();

    play_sonidos(this.sonido_aplausos, false, 0.9);

    console.log(this.txt);
  }

  update() {}

  set_sonidos()
  {
    this.sonido_aplausos = this.sound.add('aplausos');
    this.sonido_fireworks = this.sound.add('fireworks');
  }
}
