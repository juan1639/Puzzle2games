
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
    static hi = 7000;
    static txtScore = ' Score: ';

    static pausas =
    {
        revivir: 4000,
        invisible: 3000,
        showBonus: 3500,
        nivelSuperado: {
            superado: false,
            duracion: 3200
        },
        duracionExplosion: {
            jugador: 1000,
            enemigo: 400
        }
    };

    static depth = {
        fondo: 0,
        bloques: 100,
        efectos: 200,
        marcadores: 300,
        textos: 400,
    };

    static array_numbers =
    [
        [1, 2, 3],
        [4, 5, 6],
        [8, 7, 0],
    ];

    // --- Getters ---
    static getTxtScore()
    {
        return Settings.txtScore;
    }

    static isNivelSuperado()
    {
        return Settings.pausas.nivelSuperado.superado;
    }

    static getPausaNivelSuperado()
    {
        return Settings.pausas.nivelSuperado.duracion;
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

    // --- Setters ---
    static setNivelSuperado(bool)
    {
        Settings.pausas.nivelSuperado.superado = bool;
    }

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
}
