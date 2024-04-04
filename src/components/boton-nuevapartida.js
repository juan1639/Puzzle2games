import { Settings } from "../scenes/settings";
import { Textos } from "./textos";

export class BotonNuevaPartida
{
  constructor(scene)
  {
    this.relatedScene = scene;
  }

  create(siguienteScene, gameover)
  {
    // this.sonidoMenuSelect = this.relatedScene.sound.add('moneda-mario');

    const ancho = this.relatedScene.sys.game.config.width;
    const alto = this.relatedScene.sys.game.config.height;
    const botonCondicional = 'boton-nueva-partida';
    
    this.boton = this.relatedScene.add.sprite(Math.floor(ancho / 2), Math.floor(alto / 1.3), botonCondicional).setInteractive();
    this.boton.setScale(0.6).setAngle(1).setDepth(30);

    this.boton.on('pointerover', () => {
      // this.boton.setFrame(1);
      this.boton.setScale(0.7);
    });

    this.boton.on('pointerout', () => {
      // this.boton.setFrame(0);
      this.boton.setScale(0.6);
    });

    this.boton.on('pointerdown', (e) => {

      // play_sonidos(this.sonidoMenuSelect, false, 0.9);
      this.relatedScene.scene.start(siguienteScene);
      console.log(e);
    });

    this.relatedScene.tweens.add(
    {
      targets: this.boton,
      angle: 359,
      ease: 'Elastic',
      yoyo: true,
      hold: 2000,
      duration: 3000,
      repeat: -1
    });
  }

  get()
  {
    return this.boton;
  }
}

// ==================================================================================
export class BotonFullScreen
{
  constructor(scene, args)
  {
    this.relatedScene = scene;
    this.args = args;
  }

  create()
  {
    const {x, y, id, scX, scY, ang} = this.args;

    this.boton = this.relatedScene.add.image(x, y, id).setInteractive();
    this.boton.setScale(scX, scY);
    this.boton.setAngle(ang).setFrame(0).setDepth(50);
    this.boton.setX(x).setY(y + Math.floor(this.boton.height / 2));

    this.boton.on('pointerover', () =>
    {
      // this.boton.setFrame(1);
      this.boton.setScale(scX + 0.1, scY + 0.1);
    });
    
    this.boton.on('pointerout', () =>
    {
      // this.boton.setFrame(0);
      this.boton.setScale(scX, scY);
    });

    this.boton.on('pointerdown', () =>
    {
      if (!this.relatedScene.scale.isFullscreen)
      {
        this.relatedScene.scale.startFullscreen();

      } else
      {
        this.relatedScene.scale.stopFullscreen();
      }
    });
  }
}

// =============================================================================
export class ElegirJuego
{
  constructor(scene, args)
  {
    this.relatedScene = scene;
    this.args = args;
  }

  create()
  {
    const {left, top, scale, texto, id} = this.args;

    this.chooseGame = this.relatedScene.add.sprite(left, top, 'boton-nueva-partida').setInteractive();
    this.chooseGame.setOrigin(0.5, 0.5).setScale(scale).setDepth(Settings.depth.textos);
    this.chooseGame.setData('id', id);

    this.txt = new Textos(this.relatedScene, {
      x: left,
      y: top,
      txt: texto,
      size: 45, color: '#ffa', style: 'bold',
      stroke: '#f71', sizeStroke: 16,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
      bool1: false, bool2: true, origin: [0.5, 0.5],
      elastic: false, dura: 0
    });

    this.txt.create();

    this.chooseGame.on('pointerover', () =>
    {
      this.txt.get().setScale(scale + 0.1);
      this.chooseGame.setScale(scale + 0.1);
    });
    
    this.chooseGame.on('pointerout', () =>
    {
      this.txt.get().setScale(scale);
      this.chooseGame.setScale(scale);
    });

    this.chooseGame.on('pointerdown', (e) =>
    {
      // play_sonidos(this.sonidoMenuSelect, false, 0.9);
      console.log('choose game');
      this.relatedScene.scene.start('Game');
    });
  }

  get()
  {
    return this.chooseGame;
  }
}