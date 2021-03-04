export default class GameController {

    constructor(model, viewContainer) {
        this.viewContainer = viewContainer;
        this.model = model;
        this.isRunning = false;
    }
    
    run() {
        this.isRunning = true;
        // draw the initial game board, start the game
        this.viewContainer.innerHTML = '';
        console.log(this);

        this.viewContainer.append(this.getBoardHtml(this.model));
        // start countdown

        // start game-loop
    }

    stop(){
        this.isRunning = false;
    }

    resizeUi(){
        if (this.isRunning){
            // redraw
            this.viewContainer.innerHTML = '';
            this.viewContainer.append(this.getBoardHtml(this.model));
        }
    }

    getBoardHtml(gameBrain) {
        let content = document.createElement('div');
        content.id = "gameboard";

        let viewPortHeight = window.innerHeight;
        let rowHeight = viewPortHeight / 20;
        let colWidth = window.innerWidth / this.model.colCount;

        gameBrain.getGameBoard().forEach(rowData => {
            let rowElem = document.createElement('div');
            rowElem.style.minHeight = rowHeight + 'px';
            rowElem.style.maxHeight = rowHeight + 'px';

            

            rowData.forEach(colData => {
                let colElem = document.createElement('div');
                if (colData === gameBrain.gameCellNotPath()) {
                    colElem.style.backgroundColor = '#42FF33';
                } else if (colData === gameBrain.gameCellNotPath()) {
                    colElem.style.backgroundColor = '#42FF33';
                } else {
                    colElem.style.backgroundColor = '#FFFFFF';
                }

                colElem.style.minWidth = colWidth + 'px';
                colElem.style.display = 'inline-block';
                colElem.style.minHeight = rowHeight + 'px';
                rowElem.append(colElem);

            });
            content.append(rowElem);
        });

        console.log('content', content);
        return content;
    }


}
