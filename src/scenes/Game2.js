// ============================================================
//      Puzzle 2 games  -  Phaser  |  By Juan Eguia
//   
//      https://juan1639.github.io/Puzzle2games
// 
// ------------------------------------------------------------
import { Scene } from 'phaser';
import { Board } from '../components/board2.js';
import { BoardImg } from '../components/boardImg.js';
import { Textos } from '../components/textos.js';
import { Marcador } from './../components/marcador.js';
import { Settings } from './settings.js';
import { play_sonidos, format_time } from '../functions/functions.js';
import { BotonFullScreen, BotonEsc } from '../components/boton-nuevapartida.js';

export class Game2 extends Scene
{
  constructor()
  {
    super('Game2');
  }

  init()
  {
    this.set_sonidos();

    Settings.setGameOver(false);
    Settings.setPuntos(Settings.getTimeLimits()[Settings.getNivel()]);

    Settings.tileXY =
    {
        x: 100,
        y: 100
    };

    Settings.array_numbers =
    [
      [Settings.empty, Settings.empty, Settings.empty, Settings.empty],
      [Settings.empty, Settings.empty, Settings.empty, Settings.empty],
      [Settings.empty, Settings.empty, Settings.empty, Settings.empty],
      [Settings.empty, Settings.empty, Settings.empty, Settings.empty]
    ];

    this.set_initPause(3500);

    this.boardimg = new BoardImg(this);
    this.board = new Board(this, false);

    this.instanciar_marcadores();
    this.set_txtHowToPlay();
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
            this.scene.start('Congratulations2');
          }
        }
      ]);
      
      timeline.play();
    }

    if (Settings.getPuntos() <= 0)
    {
        console.log('time up!');
    }
  }

  check_puzzleDone()
  {
    return this.board.puzzle_done;
  }

  set_initPause(tiempo)
  {
    play_sonidos(this.sonido_clickRepeat, false, 0.8);

    this.animaSorteo = this.add.sprite(
        Math.floor(this.sys.game.config.width / 7),
        Math.floor(this.sys.game.config.height / 1.5)
    );
    this.animaSorteo.setDepth(Settings.depth.efectos);

    this.anims.create({
        key: 'anima-sorteo',
        frames: this.anims.generateFrameNumbers('jewels-ssheet', { frames: [0, 1, 2, 4]}),
        frameRate: 5,
        repeat: 5
    });

    this.animaSorteo.play('anima-sorteo', true);

    this.target = Phaser.Math.Between(0, 2);
    const strJewels = ['diamond_', 'prism_', 'ruby_'];

    this.anims.create({
        key: 'set-sorteo',
        frames: this.anims.generateFrameNames('tiles-jewels', { prefix: strJewels[this.target], end: 15, zeroPad: 4 }),
        frameRate: 20,
        repeat: -1
    });

    Settings.pausas.inicial = tiempo;
    Settings.pausas.inicialBool = true;

    this.txtLevel = new Textos(this, {
        x: Math.floor(this.sys.game.config.width / 2),
        y: 0,
        txt: ` Level: ${Settings.getNivel()}`,
        size: 100, color: '#ffa', style: 'bold',
        stroke: '#4f1', sizeStroke: 16,
        shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
        bool1: false, bool2: true, origin: [0.5, 0.5],
        elastic: Math.floor(this.sys.game.config.height / 2), dura: 3000
    });
    
    this.txtLevel.create();
    this.txtLevel.get().setDepth(Settings.depth.textos);

    this.timeline = this.add.timeline([
        {
            at: Settings.pausas.inicial - 300,
            run: () =>
            {
                play_sonidos(this.sonido_gooo, false, 0.9);
                this.sonido_clickRepeat.volume = 0;
                this.animaSorteo.play('set-sorteo', true);
            }
        },
        {
            at: Settings.pausas.inicial,
            run: () =>
            {
                Settings.pausas.inicialBool = false;
                this.txtLevel.get().setVisible(false);
                play_sonidos(Settings.getAudio().music, true, 0.6);
                this.set_clock();
                this.set_txtGo();
            }
        }
    ]);

    this.timeline.play();
    console.log(this.txtLevel);
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
          const hiLevel = Settings.getRecord2();

          Settings.setPuntos(playerTime - 1);
          this.marcadorPtos.update(Settings.getTxtTime(), format_time(playerTime));

          this.marcadorHi.update(' Hi: Level ', hiLevel);
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
      x: 30, y: marcadoresPosY, size: 40, txt: Settings.getTxtTime(),
      color: '#eee', strokeColor: '#f0bb10', id: 0, resuelto: false
    });

    this.marcadorHi = new Marcador(this, {
      x: Math.floor(ancho / 2.2), y: marcadoresPosY, size: 40, txt: ' Hi: ', color: '#eee', strokeColor: '#f0bb10',id: 2
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

  set_txtHowToPlay()
  {
    this.bg = this.add.rectangle(
      Math.floor(this.sys.game.config.width / 2),
      Math.floor(this.sys.game.config.height / 2),
      Math.floor(this.sys.game.config.width / 1.4),
      Math.floor(this.sys.game.config.height / 1.4),
      0x777777
    );

    this.bg.setDepth(Settings.depth.howtoplay).setStrokeStyle(2, 0xaaaaaa).setVisible(false);

    this.txthowtoplay = new Textos(this, {
      x: Math.floor(this.sys.game.config.width / 2),
      y: Math.floor(this.sys.game.config.height / 2),
      txt: ' Try to place the gems \n in the selected area \n before time runs out.',
      size: 40, color: '#ffa', style: 'bold',
      stroke: '#18a', sizeStroke: 16,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
      bool1: false, bool2: true, origin: [0.5, 0.5],
      elastic: false, dura: 0
    });
    
    this.txthowtoplay.create();
    this.txthowtoplay.get().setDepth(Settings.depth.howtoplay).setVisible(false);
  }

  set_sonidos()
  {
    this.sonido_jump = this.sound.add('jump');
    this.sonido_monedaMario = this.sound.add('moneda-mario');
    this.sonido_clickRepeat = this.sound.add('click-repeat');
    this.sonido_gooo = this.sound.add('gooo');
  }
}
