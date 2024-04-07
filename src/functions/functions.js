import { Settings } from "../scenes/settings.js";
import { Textos } from "../components/textos.js";

function showBonus(scene, enemigo)
{
  Settings.showBonus = new Textos(scene, {
    x: enemigo.x,
    y: enemigo.y + 25,
    txt: enemigo.getData('puntos').toString(),
    size: 55, color: '#ffa', style: 'bold',
    stroke: '#f21', sizeStroke: 16,
    shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
    bool1: false, bool2: true, origin: [0.5, 0.5],
    elastic: false, dura: 0
  });
  
  Settings.showBonus.create();
  Settings.showBonus.get().setScale(1.2).setAlpha(1);

  scene.tweens.add(
  {
    targets: Settings.showBonus.get(),
    alpha: 0,
    scale: 0,
    duration: Settings.pausas.showBonus
  });
}

function particulas(x, y, particula, vel, span, size, color, unlimited, sprite, bool, scene)
{
    const partis = scene.add.particles(x, y, particula, {
      speed: vel,
      lifespan: span,
      scale: size,
      tint: color,
      // gravityY: 200
      blendMode: 'ADD'
    });
    
    if (!unlimited) scene.time.delayedCall(Settings.pausas.inicial, () => partis.stop());
    if (bool) partis.startFollow(sprite);
}

function format_time(timeToFormat)
{
  let formated = timeToFormat.toString();
  let minute = 0;
  let second = 0;

  if (timeToFormat < 10)
  {
    return `00:0${formated}`;
  }

  if (timeToFormat > 59)
  {
    minute = Math.floor(timeToFormat / 60);
    second = timeToFormat - minute * 60;

    if (second < 10)
    {
      if (minute < 10)
      {
        return `0${minute}:0${second.toString()}`;
      }
      else
      {
        return `${minute}:0${second.toString()}`;
      }
    }
    else
    {
      if (minute < 10)
      {
        return `0${minute}:${second.toString()}`;
      }
      else
      {
        return `${minute}:${second.toString()}`;
      }
    }
  }

  return `00:${formated}`;
}

function play_sonidos(id, loop, volumen)
{
  id.volume = volumen;
  id.loop = loop;
  id.play();
}

export {
  particulas,
  format_time,
  play_sonidos
};
