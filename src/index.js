console.log("FlappyBird");


function animate(rowIndex){
    setTimeout(() => {
        
        let colIn = COL_COUNT;

        let pathPosition = Number(content.lastElementChild.lastElementChild.dataset.pathPosition);
        console.log(content.lastElementChild.lastElementChild);
        let pathChange = Math.random() * (PATH_WIDTH - 3);
        pathChange = Math.ceil((Math.random() * 2 - 1.5)) * pathChange;
        pathPosition = pathPosition + pathChange;
        

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