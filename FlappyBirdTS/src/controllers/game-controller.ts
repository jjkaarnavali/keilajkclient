import GameBrain from "../model/gamebrain";
import gamebrain from "../model/gamebrain";

function animate(rowIndex: number, content: any, colCount: number, scoreB: any){
    setTimeout(() => {
        
        let colIn = 20;
        let pathWidth = 5;
        let rowCount = 20;

        let viewPortHeight = window.innerHeight - 21;
        let rowHeight = viewPortHeight / 20;
        let colWidth = window.innerWidth / colCount;

        

        
        let birdPosition = Math.round(rowCount / 2) - 2;

        if (content.lastElementChild.lastElementChild.dataset.birdPosition !== undefined) {
            birdPosition = Number(content.lastElementChild.lastElementChild.dataset.birdPosition);
        }

        

        let pathPosition = Number(content.lastElementChild.lastElementChild.dataset.pathPosition);

        

        //console.log(content.lastElementChild.lastElementChild);
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

            colElem.dataset.pathPosition = String(pathPosition);
            colElem.dataset.birdPosition = String(birdPosition);
            colElem.style.minWidth = colWidth + 'px';
            colElem.style.display = 'inline-block';
            colElem.style.minHeight = rowHeight + 'px';
            

            colIn++;

            c.append(colElem);
            
            
        }
        

        

        let birdElem = content.getElementsByClassName('row-' + birdPosition)[0].firstElementChild;
        
     
        
        birdElem.style.backgroundColor = '#000';
       


        function handleKey(e: { type: string; key: any; } | undefined){
            if (e !== undefined) {
                if (e.type !== 'keyup') return;
                
                
        
                switch (e.key) {
                    case 'ArrowDown':
                        birdPosition = birdPosition + 1;
                        break;
                    case 'ArrowUp':
                        birdPosition = birdPosition - 1;
                        break;
                }
                birdElem.style.backgroundColor = '#FFFFFF';
                birdElem = content.getElementsByClassName('row-' + birdPosition)[0].firstElementChild;
                birdElem.style.backgroundColor = '#000000';
                content.lastElementChild.lastElementChild.dataset.birdPosition = birdPosition;


                
            }
            
        }
        
        document.addEventListener('keyup', handleKey);
        

        
        if (content.getElementsByClassName('row-' + birdPosition)[0].children[1].style.backgroundColor !== 'rgb(255, 255, 255)') {
            let finalScore = rowIndex;
            rowIndex = 201;
            //console.log(finalScore);
            content.innerHTML = finalScore;
            
            let form = (<HTMLFormElement>document.createElement('FORM'));
            form.name = 'submitScore';
            form.id = 'formid';
            form.method = 'GET';
            
            
            let stuff = (<HTMLInputElement>document.createElement('INPUT'));
            stuff.type = 'TEXT';
            stuff.name = 'userName';
            stuff.id = 'userName';
            stuff.value = '';
            stuff.placeholder = 'username';
            
            let hiddenScore = (<HTMLInputElement>document.createElement('INPUT'));
            hiddenScore.type = 'HIDDEN';
            hiddenScore.name = 'score';
            hiddenScore.value = String(finalScore);
            
            let hiddenScoreBoard = (<HTMLInputElement>document.createElement('INPUT'));
            hiddenScoreBoard.type = 'HIDDEN';
            hiddenScoreBoard.name = 'scoreboard';
            hiddenScoreBoard.value = JSON.stringify(scoreB);
            console.log(scoreB);
            
            let submitButton = (<HTMLInputElement>document.createElement('BUTTON'));
            submitButton.type = 'SUBMIT';
            submitButton.name = 'submit';
            submitButton.value = 'SUBMIT';
            submitButton.id = 'submit';
            submitButton.innerText = 'submit';
            //stuff.hidden = finalScore;
            form.appendChild(stuff);
            form.appendChild(hiddenScore);
            form.appendChild(hiddenScoreBoard);
            form.appendChild(submitButton);
            
            content.appendChild(form);

            let scoreBoard = scoreB;
            scoreBoard.push(finalScore);
            console.log(scoreBoard);
            //form.submit();
            
            
        }
        //console.log(content.getElementsByClassName('row-' + birdPosition)[0].children[1].style.backgroundColor);
        

        rowIndex++;
        
        //console.log(birdPosition);
        if(rowIndex < 200) animate(rowIndex, content, colCount, scoreB);
        
    }, 100);

    
}




export default class GameController {
    viewContainer: HTMLDivElement;
    model: gamebrain;
    isRunning: boolean;

    constructor(model: gamebrain, viewContainer: HTMLDivElement) {
        this.viewContainer = viewContainer;
        this.model = model;
        this.isRunning = false;
    }
    
    
    run() {
        this.isRunning = true;
        // draw the initial game board, start the game
        this.viewContainer.innerHTML = '';
        //console.log(this);

        this.viewContainer.append(this.getBoardHtml(this.model));

        let birdPosition = Math.round(20 / 2) - 2;
        
        let birdElem = this.viewContainer.firstElementChild!.getElementsByClassName('row-' + birdPosition)[0].firstElementChild as HTMLDivElement;
        birdElem!.style.backgroundColor = '#000000';
        // start countdown

        
        
    

        
        
        
        let timeleft = 3;
        let downloadTimer = setInterval(function(){
        let original = document.getElementById("view-container")!.firstElementChild!.firstElementChild!.firstElementChild!.innerHTML;
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            
            document.getElementById("view-container")!.firstElementChild!.getElementsByClassName('row-7')[0]!.childNodes[10].textContent = original;      
            //console.log(document.getElementById("view-container").firstElementChild.getElementsByClassName('row-0')[0].childNodes[5]);
                
        } else {
            //console.log(document.getElementById("view-container").firstElementChild.getElementsByClassName('row-0')[0].childNodes[5]);
            document.getElementById("view-container")!.firstElementChild!.getElementsByClassName('row-7')[0]!.childNodes[10]!.textContent = String(timeleft);      
        }
        timeleft -= 1;
        
        }, 900);
        
        
       

        // start game-loop
        let first = this.viewContainer.firstElementChild;
        let count = this.model.colCount;
        let scoreBoard = this.model.scoreBoard
        
        
        setTimeout(function() {
            let rowIndex = 0;
            
            
    
            

            animate(rowIndex, first, count, scoreBoard);
            
            
            
            
        }, 3500);
        


        
        
        
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

    getBoardHtml(gameBrain: GameBrain) {
        let content = document.createElement('div');
        content.id = "gameboard";

        let viewPortHeight = window.innerHeight - 21; // don't count the space under controlview
        //console.log(viewPortHeight);
        let rowHeight = viewPortHeight / 20;
        let colWidth = window.innerWidth / this.model.colCount;
        let rowId = 0;

        gameBrain.getGameBoard().forEach((rowData: any[]) => {
            let rowElem = document.createElement('div');
            
            rowElem.classList.add('row-' + rowId);
            rowElem.style.minHeight = rowHeight + 'px';
            rowElem.style.maxHeight = rowHeight + 'px';
            rowId++;
            let colIndex = 0;

            

            rowData.forEach((colData: any) => {
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
                colElem.dataset.pathPosition = "5";
                colElem.dataset.birdPosition = "8";
                colIndex++;
                rowElem.append(colElem);

            });
            content.append(rowElem);
        });

        //console.log('content', content);
        return content;
    }
    getGameScore(gameBrain: GameBrain){
        let scoreForm = document.createElement('form');

    }


    
}


