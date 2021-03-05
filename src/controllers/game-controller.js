function animate(rowIndex, content, colCount){
    setTimeout(() => {
        
        let colIn = 20;
        let pathWidth = 5;
        let rowCount = 20;

        let viewPortHeight = window.innerHeight - 21;
        let rowHeight = viewPortHeight / 20;
        let colWidth = window.innerWidth / colCount;

        let pathPosition = Number(content.lastElementChild.lastElementChild.dataset.pathPosition);
        console.log(content.lastElementChild.lastElementChild);
        let pathChange = Math.random() * (pathWidth - 3);
        pathChange = Math.ceil((Math.random() * 2 - 1.5)) * pathChange;
        if(pathPosition + pathChange + pathWidth >= rowCount || pathPosition + pathChange < 1){
            pathPosition = pathPosition;
        }else{
            pathPosition = pathPosition + pathChange;
        }
        
        

        for (let index = 0; index < rowCount; index++) {
            let c = content.getElementsByClassName('row-' + index)[0];
            
            c.firstElementChild.remove();
            

            let colElem = document.createElement('div');
            colElem.classList.add('id-row-' + index +'-col-' + colIn);
            
            
            

            if(index < pathPosition || index >= pathPosition + pathWidth){
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
        if(rowIndex < 200) animate(rowIndex, content, colCount);
    }, 100);
}

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
        let rowIndex = 100;
        animate(rowIndex, this.viewContainer.firstElementChild, this.model.colCount);
        /*let rowIndex = 20;

        
            let viewPortHeight = window.innerHeight - 21;
            let rowHeight = viewPortHeight / 20;
            let colWidth = window.innerWidth / this.model.colCount;
            let pathPosition = this.viewContainer.firstElementChild.lastElementChild.lastElementChild.dataset.pathPosition;
            setTimeout(() => {
                while (rowIndex < 50) {
                
                let colIn = 20;
        
                
                
                let pathChange = Math.random() * (5 - 3);
                pathChange = Math.ceil((Math.random() * 2 - 1.5)) * pathChange;
                console.log(pathPosition);
                if(pathPosition + pathChange + 5 >= 20 || pathPosition + pathChange < 1){
                    pathPosition = pathPosition;
                }else{
                    pathPosition = pathPosition + pathChange;
                }
                
                
        
                for (let index = 0; index < 20; index++) {
                    let c = this.viewContainer.firstElementChild.getElementsByClassName('row-' + index)[0];
        
                    
                    if(c.firstElementChild !== null){
                        c.firstElementChild.remove();
                    }
                    
                    
        
                    let colElem = document.createElement('div');
                    colElem.classList.add('id-row-' + index +'-col-' + colIn);
                    
                    
                    
        
                    if(index < pathPosition || index >= pathPosition + 5){
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
            }
        
            }, 100);*/
            
        

        

        
        
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

        let viewPortHeight = window.innerHeight - 21; // don't count the space under controlview
        console.log(viewPortHeight);
        let rowHeight = viewPortHeight / 20;
        let colWidth = window.innerWidth / this.model.colCount;
        let rowId = 0;

        gameBrain.getGameBoard().forEach(rowData => {
            let rowElem = document.createElement('div');
            
            rowElem.classList.add('row-' + rowId);
            rowElem.style.minHeight = rowHeight + 'px';
            rowElem.style.maxHeight = rowHeight + 'px';
            rowId++;
            let colIndex = 0;

            

            rowData.forEach(colData => {
                let colElem = document.createElement('div');
                
                colElem.classList.add('id-row-' + rowId +'-col-' + colIndex);
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
                colElem.dataset.pathPosition = 5;
                colIndex++;
                rowElem.append(colElem);

            });
            content.append(rowElem);
        });

        console.log('content', content);
        return content;
    }


}
