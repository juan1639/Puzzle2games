
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
    static hi = 151;
    static txtScore = ' Score: ';
    static txtTime = ' Time: ';

    static timeLimits =
    [
        60, 60, 45, 30, 25, 20, 15, 12, 10, 8, 5, 4, 3
    ];

    static pausas =
    {
        inicial: 4000,
        inicialBool: true,
        showBonus: 3500,
        nivelSuperado: 7000
    };

    static depth = {
        fondo: 0,
        bloques: 100,
        efectos: 200,
        ui: 250,
        marcadores: 300,
        botones: 400,
        textos: 500,
        howtoplay: 600
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

    static audio =
    {
        music: null,
        fireWorks: null
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

    static getTimeLimits()
    {
        return Settings.timeLimits;
    }

    static getAnimations()
    {
        return Settings.animations;
    }

    static getAudio()
    {
        return Settings.audio;
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

    static setAudioMusic(musica)
    {
        Settings.audio.music = musica;
    }

    static setAudioFireWorks(fw)
    {
        Settings.audio.fireWorks = fw;
    }
}
