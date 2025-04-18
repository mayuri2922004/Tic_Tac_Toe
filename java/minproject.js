let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('#reset-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turn = true;
let count = 0;

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

const checkWinner = () => {
    for (let logic of winPattern) {
        let pos1val = boxes[logic[0]].innerText;
        let pos2val = boxes[logic[1]].innerText;
        let pos3val = boxes[logic[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true;
            }
        }
    }
    return false;
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! The winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
};

const gameDraw = () => {
    msg.innerText = `Game is a Draw`;
    msgContainer.classList.remove('hide');
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.classList.add('disabled');
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove('disabled', 'glowO', 'glowX');
    });
};

const resetGame = () => {
    turn = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add('hide');
};

// Game logic
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.classList.contains('disabled')) return;

        if (turn) {
            box.innerText = "O";
            box.classList.add('glowO');
        } else {
            box.innerText = "X";
            box.classList.add('glowX');
        }

        box.classList.add('disabled');
        turn = !turn;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

resetbtn.addEventListener('click', resetGame);
