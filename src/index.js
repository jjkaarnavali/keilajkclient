import mainView from './views/mainview.js';
import controlView from './views/controlview.js';
import gameView from './views/gameview.js';

import GameBrain from './model/gamebrain.js';
import GameController from './controllers/game-controller.js';
import StatisticsController from './controllers/statistics-controller.js';


let brain = new GameBrain();
let game_view = gameView();
let gameController = new GameController(brain, game_view);
let statisticsController = new StatisticsController(brain, game_view);

let view = mainView();
document.body.append(view);
let ctrl_view = controlView(gameControlClick);
view.append(ctrl_view);
view.append(game_view);

function gameControlClick(e) {
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


/*
console.log("FlappyBird");


function animate(rowIndex){
    setTimeout(() => {
        
        let colIn = COL_COUNT;

        let pathPosition = Number(content.lastElementChild.lastElementChild.dataset.pathPosition);
        //console.log(content.lastElementChild.lastElementChild);
        let pathChange = Math.random() * (PATH_WIDTH - 3);
        pathChange = Math.ceil((Math.random() * 2 - 1.5)) * pathChange;
        if(pathPosition + pathChange + PATH_WIDTH >= ROW_COUNT || pathPosition + pathChange < 1){
            pathPosition = pathPosition;
        }else{
            pathPosition = pathPosition + pathChange;
        }
        
        

        for (let index = 0; index < ROW_COUNT; index++) {
            let c = content.getElementsByClassName('row-' + index)[0];
            
            c.firstElementChild.remove();
            

            let colElem = document.createElement('div');
            colElem.classList.add('id-row-' + index +'-col-' + colIn);
            
            
            

            if(index < pathPosition || index >= pathPosition + PATH_WIDTH){
                colElem.style.backgroundColor = '#42FF33';
        
            }else{
                colElem.style.backgroundColor = '#FFFFFF';
            }

            colElem.dataset.pathPosition = pathPosition;
            colElem.style.minWidth = colWidth + 'px';
            colElem.style.display = 'inline-block';
            colElem.style.minHeight = rowHeight + 'px';
            

            colIn++;

            c.append(colElem);
            
            
        }
        
        rowIndex++;
        if(rowIndex < 200) animate(rowIndex);
    }, 100);
}

function createRow(rowHeight, rowId, pathPosition){
    let rowElem = document.createElement('div');
    rowElem.classList.add('row-' + rowId);
    
    rowElem.style.minHeight = rowHeight + 'px';
    rowElem.style.maxHeight = rowHeight + 'px';


    for (let colIndex = 0; colIndex < COL_COUNT; colIndex++) {
        let colElem = document.createElement('div');
        colElem.classList.add('id-row-' + rowId +'-col-' + colIndex);


        if(rowId < pathPosition || rowId >= pathPosition + PATH_WIDTH){
            colElem.style.backgroundColor = '#42FF33';
    
        }else{
            colElem.style.backgroundColor = '#FFFFFF';
        }
        
        colElem.dataset.pathPosition = pathPosition;

        colElem.style.minWidth = colWidth + 'px';
        colElem.style.display = 'inline-block';
        colElem.style.minHeight = rowHeight + 'px';
        rowElem.append(colElem);
        
    }

    return rowElem;
}

const ROW_COUNT = 20;
const COL_COUNT = 20;

const PATH_WIDTH = 5; // in matrix squares

let viewPortHeight = window.innerHeight;
let rowHeight = viewPortHeight / ROW_COUNT;

let viewPortWidth = window.innerWidth;
let colWidth = viewPortWidth / COL_COUNT;

let content = document.createElement('div');

for (let index = 0; index < ROW_COUNT; index++) {
    
let pathPosition = 7;

    let rowElem = createRow(rowHeight, index, pathPosition);
    
    content.append(rowElem);

}

document.body.append(content);



let rowIndex = 100;
animate(rowIndex);
*/