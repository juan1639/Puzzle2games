// ============================================================
//      Puzzle 2 games  -  Phaser  |  By Juan Eguia
//   
//      https://juan1639.github.io/Puzzle2games
// 
// ------------------------------------------------------------
import { Scene } from 'phaser';
import { Board } from '../components/board.js';
import { BoardImg } from '../components/boardImg.js';
import { Textos } from '../components/textos.js';
import { Marcador } from './../components/marcador.js';
import { Settings } from './settings.js';
import { BotonFullScreen, BotonNuevaPartida } from '../components/boton-nuevapartida.js';
import { play_sonidos } from '../functions/functions.js';

export class Game extends Scene
{
  constructor()
  {
    super('Game');
  }

  init()
  {
    play_sonidos(Settings.getAudio().music, true, 0.6);

    Settings.setGameOver(false);

    Settings.array_numbers =
    [
      [Settings.empty, Settings.empty, Settings.empty],
      [Settings.empty, Settings.empty, Settings.empty],
      [Settings.empty, Settings.empty, Settings.empty]
    ];

    this.set_pausaInicial(4300);

    this.boardimg = new BoardImg(this);
    this.board = new Board(this, false);

    this.instanciar_marcadores();
    this.botonrejugar = new BotonNuevaPartida(this);
  }

  preload() {}

  create()
  {
    // this.add.image(0, 0, 'fondo').setScale(1.48, 1.68).setDepth(Settings.depth.fondo).setOrigin(0, 0);
    this.imgFondo = this.add.image(0, 0, 'fondo1').setDepth(Settings.depth.fondo).setOrigin(0, 0);
    this.imgFondo.setScale(
      this.sys.game.config.width / this.imgFondo.width,
      this.sys.game.config.height / this.imgFondo.height
    );

    // console.log(this.imgFondo.width, this.imgFondo.height);
    // console.log(this.sys.game.config.width, this.sys.game.config.height);

    this.ui.forEach(uix => uix.setVisible(true).setDepth(Settings.depth.ui));

    this.set_sonidos();

    this.boardimg.create();
    this.board.create();
    
    this.marcadorPtos.create();
    this.marcadorHi.create();
    this.botonfullscreen.create();
  }

  update()
  {
    if (!this.check_puzzleDone())
    {
      this.board.update();
    }
    else
    {
      console.log('hecho');

      const timeline = this.add.timeline([
        {
          at: 110,
          run: () =>
          {
            if (Settings.getAudio().music) Settings.getAudio().music.pause();
            this.scene.start('Congratulations');
          }
        }
      ]);
      
      timeline.play();
    }

    // console.log(this.check_puzzleDone());
  }

  check_puzzleDone()
  {
    return this.board.puzzle_done.length === Settings.array_numbers.length * Settings.array_numbers[0].length - 3;
  }

  set_pausaInicial(tiempo)
  {
    this.pausa_inicial = {
      duracion: tiempo,
      activa: false
    };

    return;

    this.txtpreparado = new Textos(this, {
      x: 400,
      y: 0,
      txt: ' Ready! ',
      size: 78, color: '#ffa', style: 'bold',
      stroke: '#ea1', sizeStroke: 16,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
      bool1: false, bool2: true, origin: [0.5, 0],
      elastic: (Settings.pacman.iniY + 1) * Settings.tileXY.y, dura: 3000
    });
    
    this.txtpreparado.create();
    this.txtpreparado.get().setDepth(Settings.getDepth().textos);

    this.timeline = this.add.timeline([
      {
        at: this.pausa_inicial.duracion,
        run: () => {
          this.pausa_inicial.activa = false,
          this.txtpreparado.get().setVisible(false);
        }
      }
    ]);

    this.timeline.play();
    console.log(this.txtpreparado);
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
      x: 30, y: marcadoresPosY, size: 40, txt: Settings.getTxtTime(), color: '#eee', strokeColor: '#f0bb10', id: 0
    });

    this.marcadorHi = new Marcador(this, {
      x: Math.floor(ancho / 2.2), y: marcadoresPosY, size: 40, txt: ' Record: ', color: '#eee', strokeColor: '#f0bb10',id: 2
    });

    this.botonfullscreen = new BotonFullScreen(this, {
      x: Math.floor(ancho / 1.1), y: marcadoresPosY, id: 'boton-fullscreen', scX: 1.2, scY: 0.8, ang: 0
    });
  }

  set_sonidos()
  {
    this.sonido_jump = this.sound.add('jump');
    this.sonido_monedaMario = this.sound.add('moneda-mario');
  }
}
