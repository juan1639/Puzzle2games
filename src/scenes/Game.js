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
import { set_txtHowToPlay, play_sonidos, format_time } from '../functions/functions.js';
import { BotonFullScreen, BotonEsc } from '../components/boton-nuevapartida.js';

export class Game extends Scene
{
  constructor()
  {
    super('Game');
  }

  init()
  {
    this.set_sonidos();

    Settings.setGameOver(false);
    Settings.setPuntos(0);

    Settings.tileXY =
    {
      x: 150,
      y: 150
    };

    Settings.array_numbers =
    [
      [Settings.empty, Settings.empty, Settings.empty],
      [Settings.empty, Settings.empty, Settings.empty],
      [Settings.empty, Settings.empty, Settings.empty]
    ];

    this.set_initPause(3500);

    this.boardimg = new BoardImg(this);
    this.board = new Board(this, false);

    this.instanciar_marcadores();
    set_txtHowToPlay(this, ' Try to order the numbers \n from least to greatest. \n   1   2   3 \n   4   5   6 \n   7   8');
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

    this.boardimg.create();
    this.board.create();
    
    this.marcadorPtos.create();
    this.marcadorHi.create();
    this.botonfullscreen.create();
    this.botonesc.create();
    this.botonmusic.create();
    this.botonhowtoplay.create();
  }

  update()
  {
    if (!this.check_puzzleDone())
    {
      this.board.update();
    }
    else
    {
      console.log('puzzle Done!');

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
  }

  check_puzzleDone()
  {
    return this.board.puzzle_done.length === Settings.array_numbers.length * Settings.array_numbers[0].length - 1;
  }

  set_initPause(tiempo)
  {
    play_sonidos(this.sonido_getReady, false, 0.9);

    Settings.pausas.inicial = tiempo;
    Settings.pausas.inicialBool = true;

    this.txtpreparado = new Textos(this, {
      x: Math.floor(this.sys.game.config.width / 2),
      y: 0,
      txt: ' Ready! ',
      size: 100, color: '#ffa', style: 'bold',
      stroke: '#4f1', sizeStroke: 16,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
      bool1: false, bool2: true, origin: [0.5, 0.5],
      elastic: Math.floor(this.sys.game.config.height / 2), dura: 3000
    });
    
    this.txtpreparado.create();
    this.txtpreparado.get().setDepth(Settings.depth.textos);

    this.timeline = this.add.timeline([
      {
        at: Settings.pausas.inicial - 200,
        run: () =>
        {
          play_sonidos(this.sonido_gooo, false, 0.9);
        }
      },
      {
        at: Settings.pausas.inicial,
        run: () =>
        {
          Settings.pausas.inicialBool = false;
          this.txtpreparado.get().setVisible(false);
          play_sonidos(Settings.getAudio().music, true, 0.6);
          this.set_clock();
          this.set_txtGo();
        }
      }
    ]);

    this.timeline.play();
    console.log(this.txtpreparado);
  }

  set_txtGo()
  {
    const txtgo = new Textos(this, {
      x: Math.floor(this.sys.game.config.width / 2),
      y: Math.floor(this.sys.game.config.height / 2),
      txt: ' Go! ',
      size: 110, color: '#ffa', style: 'bold',
      stroke: '#4f1', sizeStroke: 16,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
      bool1: false, bool2: true, origin: [0.5, 0.5],
      elastic: false, dura: 0
    });
    
    txtgo.create();
    txtgo.get().setDepth(Settings.depth.textos);

    this.tweens.add({
      targets: txtgo.get(), alpha: 0, duration: 2200
    });
  }

  set_clock()
  {
    this.playerClock = this.add.timeline([
      {
        at: 1000,
        run: () =>
        {
          // console.log('sg');
          const playerTime = Settings.getPuntos();
          const hiTime = Settings.getRecord();

          Settings.setPuntos(playerTime + 1);
          this.marcadorPtos.update(Settings.getTxtTime(), format_time(playerTime));

          this.marcadorHi.update(' Hi: ', format_time(hiTime));
        }
      }
    ]);

    this.playerClock.repeat(-1).play();
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
      x: 30, y: marcadoresPosY, size: 40, txt: `${Settings.getTxtTime()}00:00`,
      color: '#ee4', strokeColor: '#f0bb10', id: 0, resuelto: false
    });

    this.marcadorHi = new Marcador(this, {
      x: Math.floor(ancho / 2.2), y: marcadoresPosY, size: 40, txt: ` Hi: ${format_time(Settings.getRecord())}`,
      color: '#ee9', strokeColor: '#f0bb10',id: 2
    });

    this.botonfullscreen = new BotonFullScreen(this, {
      x: Math.floor(ancho / 1.1), y: marcadoresPosY, id: 'boton-fullscreen', scX: 1.2, scY: 0.8, ang: 0
    });

    this.botonesc = new BotonEsc(this, {
      left: Math.floor(ancho / 1.1), top: Math.floor(alto / 6), id: 'ui-1',
      scX: 0.5, scY: 0.5, angle: 0, originX: 0.5, originY: 0.5, texto: ' Esc ', nextScene: 'PreGame'
    });

    this.botonmusic = new BotonEsc(this, {
      left: Math.floor(ancho / 1.1), top: Math.floor(alto / 3.6), id: 'ui-1',
      scX: 0.5, scY: 0.5, angle: 0, originX: 0.5, originY: 0.5, texto: ' Music ', nextScene: ''
    });

    this.botonhowtoplay = new BotonEsc(this, {
      left: Math.floor(ancho / 1.1), top: Math.floor(alto / 2.6), id: 'ui-1',
      scX: 0.5, scY: 0.5, angle: 0, originX: 0.5, originY: 0.5, texto: ' ? ', nextScene: ''
    });
  }

  set_sonidos()
  {
    this.sonido_jump = this.sound.add('jump');
    this.sonido_monedaMario = this.sound.add('moneda-mario');
    this.sonido_getReady = this.sound.add('get-ready');
    this.sonido_gooo = this.sound.add('gooo');
  }
}
