(()=>{"use strict";var e=function(){this.name="",this.score=0};const t=function(){function t(e,t){void 0===e&&(e=20),void 0===t&&(t=20),this.rowCount=e,this.colCount=t,this.scoreBoard=[],this.board=[],this.intializeBoard()}return t.prototype.getScore=function(t,n){var o=new e;return o.name=t,o.score=n,o},t.prototype.addToScoreBoard=function(e){this.scoreBoard.push(e)},t.prototype.getScoreBoard=function(){return this.scoreBoard},t.prototype.createGameRow=function(e,t,n){for(var o=[],i=0;i<this.colCount;i++)switch(!0){case n>=e+t:case n<e:o.push(-1);break;default:o.push(0)}return o},t.prototype.intializeBoard=function(){for(var e=0;e<this.rowCount;e++)this.board.push(this.createGameRow(5,5,e))},t.prototype.getGameBoard=function(){return this.board},t.prototype.gameCellPath=function(){return 0},t.prototype.gameCellNotPath=function(){return-1},t}();function n(e,t,o,i){setTimeout((function(){var r=20,a=(window.innerHeight-21)/20,s=window.innerWidth/o,d=Math.round(10)-2;void 0!==t.lastElementChild.lastElementChild.dataset.birdPosition&&(d=Number(t.lastElementChild.lastElementChild.dataset.birdPosition));var l=Number(t.lastElementChild.lastElementChild.dataset.pathPosition),c=2*Math.random();l+(c=Math.ceil(2*Math.random()-1.5)*c)+5>=20||l+c<1?l=l:l+=c;for(var u=0;u<20;u++){var m=t.getElementsByClassName("row-"+u)[0];m.firstElementChild.remove();var h=document.createElement("div");h.classList.add("id-row-"+u+"-col-"+r),h.style.backgroundColor=u<l||u>=l+5?"#42FF33":"#FFFFFF",h.dataset.pathPosition=String(l),h.dataset.birdPosition=String(d),h.style.minWidth=s+"px",h.style.display="inline-block",h.style.minHeight=a+"px",r++,m.append(h)}var p=t.getElementsByClassName("row-"+d)[0].firstElementChild;if(p.style.backgroundColor="#000",document.addEventListener("keyup",(function(e){if(void 0!==e){if("keyup"!==e.type)return;switch(e.key){case"ArrowDown":d+=1;break;case"ArrowUp":d-=1}p.style.backgroundColor="#FFFFFF",(p=t.getElementsByClassName("row-"+d)[0].firstElementChild).style.backgroundColor="#000000",t.lastElementChild.lastElementChild.dataset.birdPosition=d}})),"rgb(255, 255, 255)"!==t.getElementsByClassName("row-"+d)[0].children[1].style.backgroundColor){var v=e;e=201,t.innerHTML=v;var g=document.createElement("FORM");g.name="submitScore",g.id="formid",g.method="GET";var f=document.createElement("INPUT");f.type="TEXT",f.name="userName",f.id="userName",f.value="",f.placeholder="username";var C=document.createElement("INPUT");C.type="HIDDEN",C.name="score",C.value=String(v);var E=document.createElement("INPUT");E.type="HIDDEN",E.name="scoreboard",E.value=JSON.stringify(i),console.log(i);var y=document.createElement("BUTTON");y.type="SUBMIT",y.name="submit",y.value="SUBMIT",y.id="submit",y.innerText="submit",g.appendChild(f),g.appendChild(C),g.appendChild(E),g.appendChild(y),t.appendChild(g);var w=i;w.push(v),console.log(w)}++e<200&&n(e,t,o,i)}),100)}const o=function(){function e(e,t){this.viewContainer=t,this.model=e,this.isRunning=!1}return e.prototype.run=function(){this.isRunning=!0,this.viewContainer.innerHTML="",this.viewContainer.append(this.getBoardHtml(this.model));var e=Math.round(10)-2;this.viewContainer.firstElementChild.getElementsByClassName("row-"+e)[0].firstElementChild.style.backgroundColor="#000000";var t=3,o=setInterval((function(){var e=document.getElementById("view-container").firstElementChild.firstElementChild.firstElementChild.innerHTML;t<=0?(clearInterval(o),document.getElementById("view-container").firstElementChild.getElementsByClassName("row-7")[0].childNodes[10].textContent=e):document.getElementById("view-container").firstElementChild.getElementsByClassName("row-7")[0].childNodes[10].textContent=String(t),t-=1}),900),i=this.viewContainer.firstElementChild,r=this.model.colCount,a=this.model.scoreBoard;setTimeout((function(){n(0,i,r,a)}),3500)},e.prototype.stop=function(){this.isRunning=!1},e.prototype.resizeUi=function(){this.isRunning&&(this.viewContainer.innerHTML="",this.viewContainer.append(this.getBoardHtml(this.model)))},e.prototype.getBoardHtml=function(e){var t=document.createElement("div");t.id="gameboard";var n=(window.innerHeight-21)/20,o=window.innerWidth/this.model.colCount,i=0;return e.getGameBoard().forEach((function(r){var a=document.createElement("div");a.classList.add("row-"+i),a.style.minHeight=n+"px",a.style.maxHeight=n+"px",i++;var s=0;r.forEach((function(t){var r=document.createElement("div");r.classList.add("id-row-"+i+"-col-"+s),t===e.gameCellNotPath()||t===e.gameCellNotPath()?r.style.backgroundColor="#42FF33":r.style.backgroundColor="#FFFFFF",r.style.minWidth=o+"px",r.style.display="inline-block",r.style.minHeight=n+"px",r.dataset.pathPosition="5",r.dataset.birdPosition="8",s++,a.append(r)})),t.append(a)})),t},e.prototype.getGameScore=function(e){document.createElement("form")},e}();function i(e){var t=null,n=[];return location.search.substr(1).split("&").forEach((function(o){(n=o.split("="))[0]===e&&(t=decodeURIComponent(n[1]))})),t}var r=[];const a=function(){function e(e,t){this.viewContainer=t,this.model=e,this.isRunning=!1,this.scoreBoard={}}return e.prototype.run=function(){var e=this;this.isRunning=!0,this.viewContainer.innerHTML="LEADERBOARD <br>",console.log(this.scoreBoard);var t=i("userName"),n=i("score"),o="";o=i("scoreboard"),o=JSON.parse(o),console.log(o);for(var a=0;a<o.length;a++)this.model.addToScoreBoard(o[a]);if(null!==t&&null!==n){var s=this.model.getScore(t,n);this.scoreBoard[t]=n,r.push(s),this.model.addToScoreBoard(s);var d=this.model.scoreBoard;console.log(d),console.log(this.scoreBoard),console.log(r)}var l=this.model.scoreBoard;l.sort((function(e,t){return t.score-e.score}));var c=1;l.forEach((function(t){e.viewContainer.innerHTML+=c+". user: "+t.name+" score: "+t.score+"<br>",c++}))},e.prototype.stop=function(){this.isRunning=!1},e.prototype.resizeUi=function(){this.isRunning&&console.log(window.innerWidth,window.innerHeight)},e}();var s,d=new t,l=function(){var e=document.createElement("div");e.id="view-container",e.innerText="CONTAINER";var t=document.createElement("HIDDEN");return t.id="scoreB",e.append(t),e}(),c=new o(d,l),u=new a(d,l),m=((s=document.createElement("div")).id="main",s);document.body.append(m);var h=function(e){var t=document.createElement("div");t.id="control";var n=document.createElement("button");n.id="statistics",n.innerText="Statistics";var o=document.createElement("button");return o.id="game",o.innerText="Game",t.append(n),t.append(o),n.addEventListener("click",e),o.addEventListener("click",e),t}((function(e){switch(console.log(e),e.target.id){case"game":u.stop(),c.run();break;case"statistics":c.stop(),u.run()}}));m.append(h),m.append(l),u.run(),window.addEventListener("resize",(function(){c.resizeUi(),u.resizeUi()}))})();