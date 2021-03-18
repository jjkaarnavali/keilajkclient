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



export default class StatisticsController {

    constructor(model, viewContainer) {
        this.viewContainer = viewContainer;
        this.model = model;
        this.isRunning = false;
        this.scoreBoard = {};
        
    }

    

    run(){
        this.isRunning = true;
        this.viewContainer.innerHTML = 'stats';
        console.log(this.scoreBoard);
        
        



        
        let userName = findGetParameter('userName');
        
        let score = findGetParameter('score');
        console.log(userName);
        console.log(score);
        
        if (userName !== null && score !== null) {
            this.scoreBoard[userName] = score;

            /*scoreBoard += {
                userName: score
            };*/
            //this.scoreBoard.userName = score;
            
            console.log(this.scoreBoard);
        }
        

        if (this.scoreBoard[0] !== '') {
            this.viewContainer.innerHTML = '';
            for(var key in this.scoreBoard) {
                var value = this.scoreBoard[key];
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
        this.isRunning = false;
    }
    resizeUi(){
        if (this.isRunning){
            console.log(window.innerWidth, window.innerHeight);
            // redraw
        }
    }
}
