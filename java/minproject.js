let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('#reset-btn');
let msg = document.querySelector('.msg-container');

let turn = true;
let count=0;
const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(turn===true){
            box.innerText = "O";
            box.classList.add('glowO');
            turn = false;
        }
        else{
            box.innerText = "X";
            box.classList.add('glowX');
            turn = true;
        }

         box.disabled = true;
         count++;

         let isWinner = checkWinner();

         if(count === 9 && !isWinner){
            gameDrap();
         }

        });

});

const checkWinner =() =>{

    for(let logic of winPattern){
        let pos1val = boxes[logic[0]].innerText;
        let pos2val = boxes[logic[1]].innerText;
        let pos3val = boxes[logic[2]].innerText;

       if(pos1val !="" && pos2val !="" && pos3val !=""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                return  true;
            }


       }

    }
};


const showWinner =(winner) =>{

    msg.innerText=`Congratutaltion, The winner is ${winner}`;
    msg.classList.remove('hide');
    disableboxes();
} 

const gameDrap = () =>{
    msg.innerText=`Game is DraW`;
   msg.classList.remove('hide');
    disableboxes();
}

const disableboxes =() =>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enablebox = () =>{
     for(let box of boxes){
        box.innerText="";
        box.disabled=false;
     }
} 

const resetGame =()=>{
 
        turn =true;
        count=0;
        msg.classList.add('hide');
        enablebox();
    }

    resetbtn.addEventListener('click', resetGame);