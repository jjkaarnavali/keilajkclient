class GameScore {
    name: string;
    score: number;
    constructor() {
        this.name = '';
        this.score = 0;
    }
}



export const gameCellPath = 0;
export const gameCellNotPath = -1;

export default class GameBrain {
    rowCount: number;
    colCount: number;
    scoreBoard: number[];
    board: number[][];


    constructor(rowCount = 20, colCount = 20) {
        this.rowCount = rowCount;
        this.colCount = colCount;

        this.scoreBoard = []; // of GameScore
        this.board = [];

        this.intializeBoard();
    }

    getScore(name: string, score: number){
        let nScore = new GameScore;
        nScore.name = name;
        nScore.score = score;
        return nScore;
    }

    addToScoreBoard(score: number){
        this.scoreBoard.push(score);
    }

    getScoreBoard(){
        return this.scoreBoard;
    }


    

    createGameRow(pathPosition: number, pathWidth: number, rowId: number) {
        let res = [];
        for (let index = 0; index < this.colCount; index++) {
            switch (true) {
                case rowId >= pathPosition + pathWidth:
                    res.push(gameCellNotPath);
                    break;
                case rowId < pathPosition:
                    res.push(gameCellNotPath);
                    break;
                default:
                    res.push(gameCellPath);
                    break;
            }

            /*
            if (index < pathPosition) {
                res.push(gameCellLeft);
            } else if (index >= pathPosition + pathWidth) {
                res.push(gameCellRight);
            } else {
                res.push(gameCellPath);
            }
            */
        }



        return res;
    }


    intializeBoard() {
        for (let index = 0; index < this.rowCount; index++) {
            this.board.push(this.createGameRow(5, 5, index));
        }
    }

    getGameBoard() {
        return this.board;
    }

    

    

    gameCellPath() { return gameCellPath; }
    gameCellNotPath() { return gameCellNotPath; }

    
}
