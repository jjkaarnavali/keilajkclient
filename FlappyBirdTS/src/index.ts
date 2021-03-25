import mainView from './views/mainview.ts';
import controlView from './views/controlview.ts';
import gameView from './views/gameview.ts';

import GameBrain from './model/gamebrain.ts';
import GameController from './controllers/game-controller.ts';
import StatisticsController from './controllers/statistics-controller.ts';


let brain = new GameBrain();
let game_view = gameView();
let gameController = new GameController(brain, game_view);

let statisticsController = new StatisticsController(brain, game_view);

let view = mainView();
document.body.append(view);
let ctrl_view = controlView(gameControlClick);

view.append(ctrl_view);
view.append(game_view);

function gameControlClick(e: any) {
    console.log(e);
    let v;
    switch (e.target.id) {
        case 'game':
            statisticsController.stop();
            gameController.run();
            break;
        case 'statistics':
            gameController.stop();
            statisticsController.run();
            break;

        default:
            break;
    }
}



statisticsController.run();


window.addEventListener('resize', () => {
    gameController.resizeUi();
    statisticsController.resizeUi();
});

