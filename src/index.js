console.log("FlappyBird");

const ROW_COUNT = 20;
const COL_COUNT = 20;

let viewPortHeight = window.innerHeight;
let rowHeight = viewPortHeight / ROW_COUNT;

let viewPortWidth = window.innerWidth;
let colWidth = viewPortWidth / COL_COUNT;

let content = document.createElement('div');

for (let index = 0; index < ROW_COUNT; index++) {
    
    let rowElem = document.createElement('div');
    rowElem.classList.add('row-' + index);
    
    rowElem.style.minHeight = rowHeight + 'px';

    for (let colIndex = 0; colIndex < COL_COUNT; colIndex++) {
        let colElem = document.createElement('div');
        colElem.classList.add('id-row-' +index+'-col-' + colIndex);
        colElem.style.backgroundColor = '#' + 
            (Math.floor(Math.random() * 255)).toString(16) + 
            (Math.floor(Math.random() * 255)).toString(16) + 
            (Math.floor(Math.random() * 255)).toString(16);
        colElem.style.minWidth = colWidth + 'px';
        colElem.style.display = 'inline-block';
        colElem.style.minHeight = rowHeight + 'px';
        colElem.innerText = 'X';
        rowElem.append(colElem);
        
    }

    content.append(rowElem);

}

document.body.append(content);