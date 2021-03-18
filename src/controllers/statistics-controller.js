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
let scoreBoard = {
    kutt: '3'
};
export default class StatisticsController {

    constructor(model, viewContainer) {
        this.viewContainer = viewContainer;
        this.model = model;
        this.isRunning = false;
        
    }

    

    run(){
        this.isRunning = true;
        this.viewContainer.innerHTML = 'stats';
        scoreBoard.kutt2 = '4';
        



        
        let userName = findGetParameter('userName');
        console.log(userName);
        let score = findGetParameter('score');
        console.log(score);
        if (userName !== null && score !== null) {
            scoreBoard[userName] = score;
            console.log(scoreBoard);
        }
        

        if (scoreBoard[0] != '') {
            this.viewContainer.innerHTML = '';
            for(var key in scoreBoard) {
                var value = scoreBoard[key];
                this.viewContainer.innerHTML += "user: " + key + " score: " + value;
                
              }
        }

        
          



        /*function formSubmitHandler(e){
            console.log(e);
            //e.preventDefault();
        }
        
        let form = document.querySelector('#formid');
        
        form.addEventListener('submit', formSubmitHandler);*/
        

    }

    stop(){
        this.isRunning = true;
    }
    resizeUi(){
        if (this.isRunning){
            console.log(window.innerWidth, window.innerHeight);
            // redraw
        }
    }
}
