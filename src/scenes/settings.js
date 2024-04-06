
export class Settings
{
    static screen = {
        width: 1024,
        height: 768,
    };

    static tileXY =
    {
        x: 150,
        y: 150
    };

    static gameOver = false;

    static puntos = 0;
    static nivel = 1;
    static hi = 59;
    static txtScore = ' Score: ';
    static txtTime = ' Time: ';

    static pausas =
    {
        inicial: 4000,
        showBonus: 3500,
        nivelSuperado: 7000
    };

    static depth = {
        fondo: 0,
        bloques: 100,
        efectos: 200,
        ui: 250,
        marcadores: 300,
        textos: 400,
    };

    static empty = 8;

    static array_numbers =
    [
        [Settings.empty, Settings.empty, Settings.empty],
        [Settings.empty, Settings.empty, Settings.empty],
        [Settings.empty, Settings.empty, Settings.empty]
    ];

    static animations =
    {
        vel: 100
    };

    // --- Getters ---
    static getTxtScore()
    {
        return Settings.txtScore;
    }

    static getTxtTime()
    {
        return Settings.txtTime;
    }
    
    static isGameOver()
    {
        return Settings.gameOver;
    }

    static getPuntos()
    {
        return Settings.puntos;
    }

    static getNivel()
    {
        return Settings.nivel;
    }

    static getRecord()
    {
        return Settings.hi;
    }

    static getAnimations()
    {
        return Settings.animations;
    }

    // --- Setters ---
    static setGameOver(bool)
    {
        Settings.gameOver = bool;
    }

    static setPuntos(ptos)
    {
        Settings.puntos = ptos;
    }

    static setNivel(level)
    {
        Settings.nivel = level;
    }

    static setRecord(hiScore)
    {
        Settings.hi = hiScore;
    }

    static setAnimationsVel(vel)
    {
        Settings.animations.vel = vel;
    }
}
