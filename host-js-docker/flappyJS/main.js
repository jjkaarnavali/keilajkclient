(()=>{"use strict";class e{constructor(){this.name="",this.score=0}}function t(e,n,i,o){setTimeout((()=>{let s=20,r=(window.innerHeight-21)/20,l=window.innerWidth/i,a=Math.round(10)-2;void 0!==n.lastElementChild.lastElementChild.dataset.birdPosition&&(a=Number(n.lastElementChild.lastElementChild.dataset.birdPosition));let d=Number(n.lastElementChild.lastElementChild.dataset.pathPosition),c=2*Math.random();c=Math.ceil(2*Math.random()-1.5)*c,d+c+5>=20||d+c<1?d=d:d+=c;for(let e=0;e<20;e++){let t=n.getElementsByClassName("row-"+e)[0];t.firstElementChild.remove();let i=document.createElement("div");i.classList.add("id-row-"+e+"-col-"+s),i.style.backgroundColor=e<d||e>=d+5?"#42FF33":"#FFFFFF",i.dataset.pathPosition=d,i.dataset.birdPosition=a,i.style.minWidth=l+"px",i.style.display="inline-block",i.style.minHeight=r+"px",s++,t.append(i)}let m=n.getElementsByClassName("row-"+a)[0].firstElementChild;if(m.style.backgroundColor="#000",document.addEventListener("keyup",(function(e){if(void 0!==e){if("keyup"!==e.type)return;switch(e.key){case"ArrowDown":a+=1;break;case"ArrowUp":a-=1}m.style.backgroundColor="#FFFFFF",m=n.getElementsByClassName("row-"+a)[0].firstElementChild,m.style.backgroundColor="#000000",n.lastElementChild.lastElementChild.dataset.birdPosition=a}})),"rgb(255, 255, 255)"!==n.getElementsByClassName("row-"+a)[0].children[1].style.backgroundColor){let t=e;e=201,n.innerHTML=t;let i=document.createElement("FORM");i.name="submitScore",i.id="formid",i.method="GET";let s=document.createElement("INPUT");s.type="TEXT",s.name="userName",s.id="userName",s.value="",s.placeholder="username";let r=document.createElement("INPUT");r.type="HIDDEN",r.name="score",r.value=t;let l=document.createElement("INPUT");l.type="HIDDEN",l.name="scoreboard",l.value=JSON.stringify(o),console.log(o);let a=document.createElement("BUTTON");a.type="SUBMIT",a.name="submit",a.value="SUBMIT",a.id="submit",a.innerText="submit",i.appendChild(s),i.appendChild(r),i.appendChild(l),i.appendChild(a),n.appendChild(i);let d=o;d.push(t),console.log(d)}++e<200&&t(e,n,i,o)}),100)}function n(e){var t=null,n=[];return location.search.substr(1).split("&").forEach((function(i){(n=i.split("="))[0]===e&&(t=decodeURIComponent(n[1]))})),t}let i=[],o=new class{constructor(e=20,t=20){this.rowCount=e,this.colCount=t,this.scoreBoard=[],this.board=[],this.intializeBoard()}getScore(t,n){let i=new e;return i.name=t,i.score=n,i}addToScoreBoard(e){this.scoreBoard.push(e)}getScoreBoard(){return this.scoreBoard}createGameRow(e,t,n){let i=[];for(let o=0;o<this.colCount;o++)switch(!0){case n>=e+t:case n<e:i.push(-1);break;default:i.push(0)}return i}intializeBoard(){for(let e=0;e<this.rowCount;e++)this.board.push(this.createGameRow(5,5,e))}getGameBoard(){return this.board}gameCellPath(){return 0}gameCellNotPath(){return-1}},s=function(){let e=document.createElement("div");e.id="view-container",e.innerText="CONTAINER";let t=document.createElement("HIDDEN");return t.id="scoreB",e.append(t),e}(),r=new class{constructor(e,t){this.viewContainer=t,this.model=e,this.isRunning=!1}run(){this.isRunning=!0,this.viewContainer.innerHTML="",this.viewContainer.append(this.getBoardHtml(this.model));let e=Math.round(10)-2;this.viewContainer.firstElementChild.getElementsByClassName("row-"+e)[0].firstElementChild.style.backgroundColor="#000000";let n=3,i=setInterval((function(){let e=document.getElementById("view-container").firstElementChild.firstElementChild.firstElementChild.innerHTML;n<=0?(clearInterval(i),document.getElementById("view-container").firstElementChild.getElementsByClassName("row-7")[0].childNodes[10].innerHTML=e):document.getElementById("view-container").firstElementChild.getElementsByClassName("row-7")[0].childNodes[10].innerHTML=n,n-=1}),900),o=this.viewContainer.firstElementChild,s=this.model.colCount,r=this.model.scoreBoard;setTimeout((function(){t(0,o,s,r)}),3500)}stop(){this.isRunning=!1}resizeUi(){this.isRunning&&(this.viewContainer.innerHTML="",this.viewContainer.append(this.getBoardHtml(this.model)))}getBoardHtml(e){let t=document.createElement("div");t.id="gameboard";let n=(window.innerHeight-21)/20,i=window.innerWidth/this.model.colCount,o=0;return e.getGameBoard().forEach((s=>{let r=document.createElement("div");r.classList.add("row-"+o),r.style.minHeight=n+"px",r.style.maxHeight=n+"px",o++;let l=0;s.forEach((t=>{let s=document.createElement("div");s.classList.add("id-row-"+o+"-col-"+l),t===e.gameCellNotPath()||t===e.gameCellNotPath()?s.style.backgroundColor="#42FF33":s.style.backgroundColor="#FFFFFF",s.style.minWidth=i+"px",s.style.display="inline-block",s.style.minHeight=n+"px",s.dataset.pathPosition=5,s.dataset.birdPosition=8,l++,r.append(s)})),t.append(r)})),t}getGameScore(e){document.createElement("form")}}(o,s),l=new class{constructor(e,t){this.viewContainer=t,this.model=e,this.isRunning=!1,this.scoreBoard={}}run(){this.isRunning=!0,this.viewContainer.innerHTML="LEADERBOARD <br>",console.log(this.scoreBoard);let e=n("userName"),t=n("score"),o=n("scoreboard");console.log(e),console.log(t),console.log(o),o=JSON.parse(o),console.log(o);for(let e=0;e<o.length;e++)this.model.addToScoreBoard(o[e]);if(null!==e&&null!==t){let n=this.model.getScore(e,t);this.scoreBoard[e]=t,i.push(n),this.model.addToScoreBoard(n);let o=this.model.scoreBoard;console.log(o),console.log(this.scoreBoard),console.log(i)}let s=this.model.scoreBoard;s.sort((function(e,t){return t.score-e.score}));let r=1;s.forEach((e=>{this.viewContainer.innerHTML+=r+". user: "+e.name+" score: "+e.score+"<br>",r++}))}stop(){this.isRunning=!1}resizeUi(){this.isRunning&&console.log(window.innerWidth,window.innerHeight)}}(o,s),a=function(){let e=document.createElement("div");return e.id="main",e}();document.body.append(a);let d=function(e){let t=document.createElement("div");t.id="control";let n=document.createElement("button");n.id="statistics",n.innerText="Statistics";let i=document.createElement("button");return i.id="game",i.innerText="Game",t.append(n),t.append(i),n.addEventListener("click",e),i.addEventListener("click",e),t}((function(e){switch(console.log(e),e.target.id){case"game":l.stop(),r.run();break;case"statistics":r.stop(),l.run()}}));a.append(d),a.append(s),l.run(),window.addEventListener("resize",(()=>{r.resizeUi(),l.resizeUi()}))})();