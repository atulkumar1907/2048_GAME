var board;
var score = 0;
var rows = 4;
var cols = 4;

window.onload = function(){
    setGame();
}

function setGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for(let r=0; r<rows; r++){
        for(let c=0; c<cols; c++){
            let tile = document.createElement("div");
            tile.id = `${r.toString()}-${c.toString()}`;
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById('board').append(tile);
            console.log(tile)
        }
    }
    setTwo();
    setTwo();
}
function hasEmptyTile(){
    for(let r=0; r<rows; r++){
        for (let c=0; c<cols; c++){
            if(board[r][c]==0){
                return true;
            }
        }
    }
}

function setTwo(){

    if(!hasEmptyTile()){
        return;
    }
    let found = false;
    while(!found){
        let r = Math.floor(Math.random()* rows);
        let c = Math.floor(Math.random()* cols);

        if(board[r][c]==0){
            board[r][c] = 2;
            let tile = document.getElementById( `${r.toString()}-${c.toString()}`)
            // tile.innerText = "2";
            // tile.classList.add('x2');
            found = true;
        }
    }
}

document.addEventListener('keyup', (e)=>{
    if(e.code =='ArrowLeft'){
        console.log(e.code);
        slideLeft();
        setTwo()
    }
    else if(e.code == "ArrowRight"){
        slideRight();
        setTwo()
    }
    else if(e.code =='ArrowUp'){
        slideUp();
        setTwo()
    }
    else{
        slideDown();
        setTwo()
    }
    document.getElementById("score").innerText = score;
})

function updateTile(tile, num){
    tile.innertext = "";
    tile.classList.value= "";
    tile.classList.add("tile");
    tile.classList.add("slide");

    if(num>0){
        if(num<=4096){
            tile.classList.add(`x${num}`);
        }else{
            tile.classList.add('x8192');
        }
        tile.innerText = `${num}`;
    }else{
        tile.innerText = ""
    }
}

const slide = (row)=>{
    row = fileterZero(row);

    for(let i =0; i<row.length-1; i++){
        if(row[i]==row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }

    row =  fileterZero(row);

    while(row.length < cols){
        row.push("0");
    }
    console.log(row)
    return row;
}

function fileterZero(row){
    return row.filter(num => num!=0)
}

function slideLeft(){
    for(let r=0; r<rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c=0; c<cols; c++){
            let tile = document.getElementById((r.toString()+"-"+c.toString()));
            console.log(tile)
            num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight(){
    for(let r=0; r<rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for(let c=0; c<cols; c++){
            let tile = document.getElementById((r.toString()+"-"+c.toString()));
            console.log(tile)
            num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp(){
    for(let c=0; c<cols; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];

        for(let r=0; r<rows; r++){
            let tile = document.getElementById((r.toString()+"-"+c.toString()));
            console.log(tile)
            num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown(){
    for(let c=0; c<cols; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for(let r=0; r<rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById((r.toString()+"-"+c.toString()));
            console.log(tile)
            num = board[r][c];
            updateTile(tile, num);
        }
    }
}

