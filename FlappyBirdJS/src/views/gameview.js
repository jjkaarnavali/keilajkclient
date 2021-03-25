export default function gameView() {
    let content = document.createElement('div');
    content.id = "view-container";

    content.innerText = 'CONTAINER';

    let scoreB = document.createElement('HIDDEN');
    scoreB.id = "scoreB";
    content.append(scoreB);

    return content;
}
