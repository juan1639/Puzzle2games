import { Settings } from "../scenes/settings";
import { Textos } from "./textos";
import { play_sonidos } from '../functions/functions.js';

export class BotonNuevaPartida
{
  constructor(scene, args)
  {
    this.relatedScene = scene;
    this.args = args;
  }

  create()
  {
    const sonido_switch = this.relatedScene.sound.add('moneda-mario');

    const {left, top, id, scX, scY, angle, originX, originY, texto, nextScene} = this.args;

    this.boton = this.relatedScene.add.sprite(left, top, id).setInteractive();
    this.boton.setScale(scX, scY).setAngle(1).setDepth(Settings.depth.botones);

    this.txt = new Textos(this.relatedScene, {
      x: left,
      y: top,
      txt: texto,
      size: 30, color: '#ff1', style: 'bold',
      stroke: '#1bd', sizeStroke: 16,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
      bool1: false, bool2: true, origin: [0.5, 0.5],
      elastic: false, dura: 0
    });

    this.txt.create();
    this.txt.get().setDepth(Settings.depth.textos).setAlpha(1).setScale(1);

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

    this.boton.on('pointerdown', (e) =>
    {
      // console.log(e);
      if (Settings.getAudio().fireWorks) Settings.getAudio().fireWorks.volume = 0;
      play_sonidos(sonido_switch, false, 0.7);

      this.relatedScene.scene.start(nextScene);
    });

    this.relatedScene.tweens.add(
    {
      targets: [this.boton, this.txt.get()],
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
    this.boton.setAngle(ang).setFrame(0).setDepth(Settings.depth.botones);
    this.boton.setX(x).setY(y);

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
    const sonido_switch = this.relatedScene.sound.add('moneda-mario');

    const {left, top, img, scale, texto, id} = this.args;

    this.chooseGame = this.relatedScene.add.sprite(left, top, img).setInteractive();
    this.chooseGame.setOrigin(0.5, 0.5).setScale(scale).setDepth(Settings.depth.botones);
    this.chooseGame.setData('id', id);

    this.txt = new Textos(this.relatedScene, {
      x: left,
      y: Math.floor(top * 1.7),
      txt: texto,
      size: 45, color: '#ffa', style: 'bold',
      stroke: id, sizeStroke: 16,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
      bool1: false, bool2: true, origin: [0.5, 0.5],
      elastic: false, dura: 0
    });

    this.txt.create();
    this.escalaTxt = scale * 3;
    this.txt.get().setScale(this.escalaTxt);

    this.relatedScene.tweens.add(
    {
      targets: this.txt.get(), scale: 1.1, yoyo: true, duration: 1400, repeat: -1
    });

    this.chooseGame.on('pointerover', () =>
    {
      this.txt.get().setScale(this.escalaTxt + 0.1);
      this.chooseGame.setScale(scale + 0.1);
    });
    
    this.chooseGame.on('pointerout', () =>
    {
      this.txt.get().setScale(this.escalaTxt);
      this.chooseGame.setScale(scale);
    });

    this.chooseGame.on('pointerdown', (e) =>
    {
      console.log('choose game');
      play_sonidos(sonido_switch, false, 0.7);
      this.relatedScene.scene.start('Game');
    });
  }

  get()
  {
    return this.chooseGame;
  }
}

// ==================================================================
export class BotonEsc
{
  constructor(scene, args)
  {
    this.relatedScene = scene;
    this.args = args;
  }

  create()
  {
    const sonido_abucheos = this.relatedScene.sound.add('abucheos');

    const {left, top, id, scX, scY, angle, originX, originY, texto, nextScene} = this.args;

    this.boton = this.relatedScene.add.sprite(left, top, id).setInteractive();
    this.boton.setOrigin(originX, originY).setScale(scX, scY).setAngle(angle).setDepth(Settings.depth.botones);

    this.txt = new Textos(this.relatedScene, {
      x: left,
      y: top,
      txt: texto,
      size: 25, color: '#fb1', style: 'bold',
      stroke: '#f61', sizeStroke: 8,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
      bool1: false, bool2: true, origin: [0.5, 0.5],
      elastic: false, dura: 0
    });

    this.txt.create();
    this.txt.get().setDepth(Settings.depth.botones).setAlpha(1).setScale(1);

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

    this.boton.on('pointerdown', (e) =>
    {
      // console.log(e);
      if (texto === ' Esc ')
      {
        if (Settings.getAudio().music) Settings.getAudio().music.volume = 0;
        play_sonidos(sonido_abucheos, false, 0.8);
      }

      if (texto.slice(1, 6) === 'Music')
      {
        if (Settings.getAudio().music.volume > 0)
        {
          Settings.getAudio().music.volume = 0;
          this.txt.get().setAlpha(0.3);
        }
        else
        {
          Settings.getAudio().music.volume = 0.6;
          this.txt.get().setAlpha(1);
        }
      }
      
      if (texto.includes('?'))
      {
        if (!this.relatedScene.bg.visible)
        {
          this.relatedScene.bg.setVisible(true);
          this.relatedScene.txthowtoplay.get().setVisible(true);
        }
        else
        {
          this.relatedScene.bg.setVisible(false);
          this.relatedScene.txthowtoplay.get().setVisible(false);
        }
      }

      if (nextScene !== '') this.relatedScene.scene.start(nextScene);
    });
  }

  get()
  {
    return this.boton;
  }
}
