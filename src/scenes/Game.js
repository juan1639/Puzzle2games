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

import {
  // overlapJugadorFantasmas,
  colliderJugadorBloques,
  play_sonidos
} from '../functions/functions.js';

export class Game extends Scene
{
  constructor()
  {
    super('Game');
  }

  init()
  {
    Settings.setGameOver(false);

    this.set_pausaInicial(4300);

    this.boardimg = new BoardImg(this);
    this.board = new Board(this);

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

    // this.set_sonidos();

    this.boardimg.create();
    this.board.create();
    
    this.marcadorPtos.create();
    this.marcadorNivel.create();
    this.marcadorHi.create();
    this.botonfullscreen.create();

    this.set_colliders();
  }

  update()
  {

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

  texto_enhorabuena()
  {
    this.txtcongrats = new Textos(this, {
      x: this.jugador.get().x, y: 0,
      txt: ' Congratulations! ',
      size: 70, color: '#ffa', style: 'bold',
      stroke: '#5f1', sizeStroke: 16,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
      bool1: false, bool2: true, origin: [0.5, 0.5],
      elastic: this.jugador.get().y - Settings.tileXY.y, dura: 3000
    });
    
    this.txtcongrats.create();
    this.txtcongrats.get().setDepth(Settings.getDepth().textos);
  }

  set_colliders()
  {
    // Overlap Jugador-Fantasmas
    // this.physics.add.overlap(this.jugador.get(), this.fantasmas.get(), overlapJugadorFantasmas, exceptoNotVisible, this);
    
    // Collide Jugador-Bloques
  }

  instanciar_marcadores()
  {
    const ancho = this.sys.game.config.width;
    const alto = this.sys.game.config.height;

    const marcadoresPosY = -99;

    this.marcadorPtos = new Marcador(this, {
      x: 10, y: marcadoresPosY, size: 40, txt: Settings.getTxtScore(), color: '#fff', strokeColor: '#af1', id: 0
    });

    this.marcadorNivel = new Marcador(this, {
      x: Math.floor(ancho / 2), y: marcadoresPosY, size: 40, txt: ' Level: ', color: '#ff5', strokeColor: '#16d', id: 1
    });

    this.marcadorHi = new Marcador(this, {
      x: Math.floor(ancho / 1.2), y: marcadoresPosY, size: 40, txt: ' Record: ', color: '#fff', strokeColor: '#af1',id: 2
    });

    this.botonfullscreen = new BotonFullScreen(this, {
      x: Math.floor(ancho * 1.5), y: marcadoresPosY + 7, id: 'boton-fullscreen', scX: 1.2, scY: 0.8, ang: 0
    });
  }

  set_sonidos()
  {
    this.sonido_preparado = this.sound.add('sonidoPacmanInicioNivel');
    play_sonidos(this.sonido_preparado, false, 0.8);

    this.sonido_waka = this.sound.add('sonidoWakaWaka');
    this.sonido_jugadorDies = this.sound.add('sonidoPacmanDies');
    this.sonido_eatingGhost = this.sound.add('sonidoPacmanEatingGhost');
    this.sonido_eatingCherry = this.sound.add('sonidoPacmanEatingCherry');
    this.sonido_fantasmasScary = this.sound.add('sonidoPacmanAzules');
    this.sonido_sirena = this.sound.add('sonidoPacmanSirena');
  }
}
