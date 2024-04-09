import { Settings } from './settings.js';
import { BoardImg } from '../components/boardImg.js';
import { Board } from '../components/board.js';
import { Marcador } from '../components/marcador.js';
import { Textos } from '../components/textos.js';
import { BotonNuevaPartida, BotonFullScreen } from "../components/boton-nuevapartida.js";
import { particulas, format_time, play_sonidos } from '../functions/functions.js';

export class Congratulations extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'Congratulations' });
  }

  init()
  {
    this.boardimg = new BoardImg(this);
    this.board = new Board(this, true);

    this.instanciar_marcadores();

    this.botoninicio = new BotonNuevaPartida(this, {
      left: Math.floor(this.sys.game.config.width / 2),
      top: Math.floor(this.sys.game.config.height / 1.3),
      id: 'boton-nueva-partida',
      scX: 0.7, scY: 0.7, angle: 1, originX: 0.5, originY: 0.5,
      texto: ' Continue ', nextScene: 'PreGame'
    });
  }

  create()
  {
    this.set_sonidos();

    this.add.image(0, 0, 'fondo').setOrigin(0, 0);

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

    this.ui.forEach(uix => uix.setVisible(true).setDepth(Settings.depth.ui));

    this.boardimg.create();
    this.board.create();
    
    this.marcadorPtos.create();
    this.marcadorHi.create();
    this.botonfullscreen.create();

    const aparecerBoton = 6000;

    this.txt = new Textos(this, {
      x: Math.floor(this.sys.game.config.width / 2),
      y: Math.floor(this.sys.game.config.height / 2.3),
      txt: ' Congratulations! ',
      size: 100, color: '#ffa', style: 'bold',
      stroke: '#f71', sizeStroke: 16,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
      bool1: false, bool2: true, origin: [0.5, 0.5],
      elastic: false, dura: 0
    });

    this.txt.create();
    this.txt.get().setDepth(Settings.depth.textos).setAlpha(1).setScale(0.1);

    this.tweens.add(
    {
      targets: this.txt.get(), scale: 1, duration: 2500
    });

    const timeline = this.add.timeline([
      {
        at: Math.floor(aparecerBoton / 2),
        run: () =>
        {
          play_sonidos(Settings.getAudio().fireWorks, false, 0.9);
        }
      },
      {
        at: aparecerBoton,
        run: () =>
        {
          this.botoninicio.create();
        }
      }
    ]);
    
    timeline.play();

    const playerTime = Settings.getPuntos();
    const hiTime = Settings.getRecord();

    this.marcadorPtos.update(Settings.getTxtTime(), format_time(playerTime));
    this.marcadorHi.update(' Hi: ', format_time(hiTime));

    this.check_newRecord(playerTime, hiTime);

    play_sonidos(this.sonido_aplausos, false, 0.9);

    console.log(this.txt);
  }

  update() {}

  check_newRecord(playerTime, hiTime)
  {
    if (playerTime <= hiTime)
    {
      console.log('new record!');
      Settings.setRecord(playerTime);

      const timeline = this.add.timeline([
        {
          at: 2500,
          run: () =>
          {
            this.txt = new Textos(this, {
              x: Math.floor(this.sys.game.config.width / 2),
              y: Math.floor(this.sys.game.config.height / 4),
              txt: ' You set a New Record! ',
              size: 70, color: '#ffa', style: 'bold',
              stroke: '#f11', sizeStroke: 16,
              shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
              bool1: false, bool2: true, origin: [0.5, 0.5],
              elastic: false, dura: 0
            });
        
            this.txt.create();
            this.txt.get().setDepth(Settings.depth.textos).setAlpha(1).setScale(1);

            this.tweens.add(
            {
              targets: this.txt.get(),
              angle: 359,
              ease: 'Elastic',
              yoyo: true,
              hold: 2000,
              duration: 3000,
              repeat: -1
            });
          }
        }
      ]);

      timeline.play();
    }
  }

  instanciar_marcadores()
  {
    const ancho = this.sys.game.config.width;
    const alto = this.sys.game.config.height;

    this.ui = [null, null];

    this.ui[0] = this.add.image(0, 0, 'ui-1').setScale(1.4, 1).setOrigin(0, 0).setVisible(false);

    this.ui[1] = this.add.image(Math.floor(this.sys.game.config.width / 2.4),
      0, 'ui-1').setScale(1.4, 1).setOrigin(0, 0).setVisible(false);

    const marcadoresPosY = Math.floor(this.ui[0].height / 2);

    this.marcadorPtos = new Marcador(this, {
      x: 30, y: marcadoresPosY, size: 40, txt: Settings.getTxtTime(),
      color: '#ee4', strokeColor: '#f0bb10', id: 0, resuelto: true
    });

    this.marcadorHi = new Marcador(this, {
      x: Math.floor(ancho / 2.2), y: marcadoresPosY, size: 40, txt: ' Record: ', color: '#ee9', strokeColor: '#f0bb10',id: 2
    });

    this.botonfullscreen = new BotonFullScreen(this, {
      x: Math.floor(ancho / 1.1), y: marcadoresPosY, id: 'boton-fullscreen', scX: 1.2, scY: 0.8, ang: 0
    });
  }

  set_sonidos()
  {
    this.sonido_aplausos = this.sound.add('aplausos');
  }
}
