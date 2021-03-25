// first function taken from https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}


let scoreBo = [];


export default class StatisticsController {

    constructor(model, viewContainer) {
        this.viewContainer = viewContainer;
        this.model = model;
        this.isRunning = false;
        this.scoreBoard = {};
        
        
    }

    

    

    run(){
        this.isRunning = true;
        this.viewContainer.innerHTML = 'LEADERBOARD <br>';
        console.log(this.scoreBoard);
        
        



        
        let userName = findGetParameter('userName');
        
        let score = findGetParameter('score');

        let scoreBoar = findGetParameter('scoreboard');
        console.log(userName);
        console.log(score);
        console.log(scoreBoar);
        scoreBoar = JSON.parse(scoreBoar);
        console.log(scoreBoar);
        for (let index = 0; index < scoreBoar.length; index++) {
            this.model.addToScoreBoard(scoreBoar[index]);
        }
        
        
        if (userName !== null && score !== null) {
            let nScore = this.model.getScore(userName, score);
            this.scoreBoard[userName] = score;
            scoreBo.push(nScore);
            this.model.addToScoreBoard(nScore);
            let test = this.model.scoreBoard;

            console.log(test);
            
            


            /*scoreBoard += {
                userName: score
            };*/
            //this.scoreBoard.userName = score;
            
            console.log(this.scoreBoard);
            console.log(scoreBo);
        }
        let listOfScores = this.model.scoreBoard;
        listOfScores.sort(function(a, b){
            return b.score - a.score;
        })

        let position = 1;

        listOfScores.forEach(element => {
            this.viewContainer.innerHTML += position + ". user: " + element.name + " score: " + element.score + '<br>';
            position++;
        });
        

        /*if (this.scoreBoard[0] !== '') {
            this.viewContainer.innerHTML = '';
            for(var key in this.scoreBoard) {
                var value = this.scoreBoard[key];
                this.viewContainer.innerHTML += "user: " + key + " score: " + value;
                
              }
        }*/
        //let scoreB = document.createElement('div');

        //scoreB.id = 'scoreB';
        //scoreB.value = this.scoreBoard;
        

        
          



        /*function formSubmitHandler(e){
            console.log(e);
            //e.preventDefault();
        }
        
        let form = document.querySelector('#formid');
        
        form.addEventListener('submit', formSubmitHandler);*/
        

    }

    stop(){
        this.isRunning = false;
    }
    resizeUi(){
        if (this.isRunning){
            console.log(window.innerWidth, window.innerHeight);
            // redraw
        }
    }
}
