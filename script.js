class Game {
    constructor(){
        this.state = [
            'black', 'black', 'black', 'black', 'none', 'white', 'white', 'white'
        ];
    }
    getColor(i){
        return this.state[i];
    }
    replaceColor(i, j){
        let buffer = this.state[i];
        this.state[i] = this.state[j];
        this.state[j] = buffer;
    }
    isGameOver(){
        if( this.state[0] === 'white' && this.state[1] === 'white' && this.state[2] === 'white' && this.state[3] === 'none')
        return true;
    }
};

document.addEventListener("DOMContentLoaded", start);

function start(){
    let game = new Game();
    document.getElementById("start").classList.remove("hidden");
    document.getElementById("start").onclick = hideRules;
    document.getElementById("reload").onclick = reload;
    document.getElementById("gameOver").onclick = reload;
    let rules;
    let gameContainer;
    let spheres= document.getElementsByClassName("game-field__sphere");
    let gamePlay = document.getElementById('gamePlay');            
    let win = document.getElementById('win');
    let winAnimation = document.getElementById('gameOver');
    
    function hideRules(){
        rules = document.getElementById('start');
        gameContainer = document.getElementById('game');
        rules.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        gamePlay.play();
        synchronizeColor();
    }

    function reload(){
        location.reload();
    }

    [].forEach.call( spheres, function(elem, i) {    
        elem.onclick = function (){
            switch(game.getColor(i)){
                case 'black':
                    if (i === 7){
                        break;
                    }
                    if (game.getColor(i+1) === 'none'){
                        game.replaceColor(i, i+1);
                        synchronizeColor();
                        break;
                    }
                    if (game.getColor(i+2) === 'none'){
                        game.replaceColor(i, i+2);
                        synchronizeColor();
                        break;
                    }
                    break;
                case 'white':
                    if (i === 0){
                        break;
                    }
                    if (game.getColor(i-1) === 'none'){
                        game.replaceColor(i, i-1);
                        synchronizeColor();
                        break;
                    }
                    if (game.getColor(i-2) === 'none'){
                        game.replaceColor(i, i-2);
                        synchronizeColor();
                        break;
                    }
                default:
                    break;
            }
        }     
    });

    function synchronizeColor(){
        for(i=0; i<8; i++ ){
            switch (game.getColor(i)){
                case 'white':
                    spheres[i].style.backgroundColor = "#FFFFFF";
                    break;
                case 'black':
                    spheres[i].style.backgroundColor = "#000000";
                    break;
                case 'none':
                    spheres[i].style.backgroundColor = "rgba(0, 0, 0, .1)";
                    break;
                default:
                    break;
            }
        }
        setTimeout(isOver, 1000);
    }

    function isOver(){
        if( game.isGameOver()){
            gamePlay.pause();           
            win.play();
            spheres[3].style.backgroundColor = "#FFFFFF";
            setTimeout(gameOver, 3000);
        }
    }

    function gameOver(){        
        gameContainer.classList.add("hidden");
        winAnimation.classList.remove("hidden");
    }        
}