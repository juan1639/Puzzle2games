import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { Game2 } from './scenes/Game2';
import { PreGame } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { Congratulations } from './scenes/congratulations';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#857511',
    physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        Game2,
        PreGame,
        Congratulations
    ]
};

export default new Phaser.Game(config);
