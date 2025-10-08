import { useState } from "react";

function findWinner(arr) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        if (arr[a] && arr[a] === arr[b] && arr[b] === arr[c]) {
            return arr[a];
        }
    }

    return "";
}

function Cell({ value, handleBoard }) {
    return (
        <div className="p-1">
            <button className="flex items-center justify-center h-10 w-10" onClick={handleBoard}>{value}</button>
        </div>
    );
}

function Board({ currentMove, board, handleSuperBoard }) {
    function handleBoard(idx) {
        return () => {
            if (board[idx] !== "") return;
            const value = currentMove % 2 === 0 ? "X" : "O"; 
            const newBoard = [...board.slice(0, idx), value , ...board.slice(idx + 1)];
            handleSuperBoard(newBoard);
        }
    }

    return (
        <div className="divide-black divide-y flex flex-col p-2">
            <div className="divide-black divide-x flex">
                <Cell value={board[0]} handleBoard={handleBoard(0)} />
                <Cell value={board[1]} handleBoard={handleBoard(1)} />
                <Cell value={board[2]} handleBoard={handleBoard(2)} />
            </div>
            <div className="divide-black divide-x flex">
                <Cell value={board[3]} handleBoard={handleBoard(3)} />
                <Cell value={board[4]} handleBoard={handleBoard(4)} />
                <Cell value={board[5]} handleBoard={handleBoard(5)} />
            </div>
            <div className="divide-black divide-x flex">
                <Cell value={board[6]} handleBoard={handleBoard(6)} />
                <Cell value={board[7]} handleBoard={handleBoard(7)} />
                <Cell value={board[8]} handleBoard={handleBoard(8)} />
            </div>
        </div>
    );
}

function SuperBoard({ currentMove, superBoard, handleGame }) {
    function handleSuperBoard(idx) {
        return (newBoard) => {
            const newSuperBoard = [...superBoard.slice(0, idx), newBoard, ...superBoard.slice(idx + 1)];
            handleGame(newSuperBoard);
        }
    }

    return (
        <div className="divide-black divide-y flex flex-col p-4">
            <div className="divide-black divide-x flex">
                <Board currentMove={currentMove} board={superBoard[0]} handleSuperBoard={handleSuperBoard(0)} />
                <Board currentMove={currentMove} board={superBoard[1]} handleSuperBoard={handleSuperBoard(1)} />
                <Board currentMove={currentMove} board={superBoard[2]} handleSuperBoard={handleSuperBoard(2)} />
            </div>
            <div className="divide-black divide-x flex">
                <Board currentMove={currentMove} board={superBoard[3]} handleSuperBoard={handleSuperBoard(3)} />
                <Board currentMove={currentMove} board={superBoard[4]} handleSuperBoard={handleSuperBoard(4)} />
                <Board currentMove={currentMove} board={superBoard[5]} handleSuperBoard={handleSuperBoard(5)} />
            </div>
            <div className="divide-black divide-x flex">
                <Board currentMove={currentMove} board={superBoard[6]} handleSuperBoard={handleSuperBoard(6)} />
                <Board currentMove={currentMove} board={superBoard[7]} handleSuperBoard={handleSuperBoard(7)} />
                <Board currentMove={currentMove} board={superBoard[8]} handleSuperBoard={handleSuperBoard(8)} />
            </div>
        </div>
    );
}

function OverviewBoard({ superBoard }) {
    return (
        <div className="divide-black divide-y flex flex-col p-2">
            <div className="divide-black divide-x flex">
                <Cell value={findWinner(superBoard[0])} handleBoard={() => {}} />
                <Cell value={findWinner(superBoard[1])} handleBoard={() => {}} />
                <Cell value={findWinner(superBoard[2])} handleBoard={() => {}} />
            </div>
            <div className="divide-black divide-x flex">
                <Cell value={findWinner(superBoard[3])} handleBoard={() => {}} />
                <Cell value={findWinner(superBoard[4])} handleBoard={() => {}} />
                <Cell value={findWinner(superBoard[5])} handleBoard={() => {}} />
            </div>
            <div className="divide-black divide-x flex">
                <Cell value={findWinner(superBoard[6])} handleBoard={() => {}} />
                <Cell value={findWinner(superBoard[7])} handleBoard={() => {}} />
                <Cell value={findWinner(superBoard[8])} handleBoard={() => {}} />
            </div>
        </div>
    );
}

function Game() {
    const [currentMove, setCurrentMove] = useState(0);
    const [superBoard, setSuperBoard] = useState(Array.from({ length: 9 }, () => Array(9).fill("")));
    const [history, setHistory] = useState([superBoard]);
    const [winner, setWinner] = useState("");

    function handleGame(newSuperBoard) {
        if (winner !== "") return;
        setCurrentMove(currentMove + 1);
        setSuperBoard(newSuperBoard);
        setHistory([...history.slice(0, currentMove + 1), newSuperBoard]);
        setWinner(findWinner(newSuperBoard.map((board) => findWinner(board))));
    }

    return (
        <div className="flex max-md:flex-col items-center justify-center w-full h-full">
            <SuperBoard currentMove={currentMove} superBoard={superBoard} handleGame={handleGame} />
            <div className="flex flex-col items-center justify-center w-1/2 h-full">
                <OverviewBoard superBoard={superBoard} />
                <div className="h-12 flex flex-col items-center justify-center">
                    <span>Winner: {winner}</span>
                    {!winner && <span>Current Move: {(currentMove) % 2 === 0 ? "X" : "O"}</span>}
                </div>
                <div className="h-10">
                    {winner && <button onClick={() => {
                        const newSuperBoard = Array.from({ length: 9 }, () => Array(9).fill(""));
                        setCurrentMove(0);
                        setSuperBoard(newSuperBoard);
                        setHistory([newSuperBoard]);
                        setWinner("");
                    }}>Reset</button>}
                </div>
                <div className="w-full">
                    History
                    <ol className="list-decimal list-inside h-40 overflow-auto">
                        {history.map((superBoard, idx) => {
                            return (
                                <li key={idx}>
                                    <button onClick={() => {
                                        setCurrentMove(idx);
                                        setSuperBoard(superBoard);
                                    }}>
                                        Jump to Move {idx}
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default function GameContainer() {
    return (
        <div className="w-screen flex flex-col gap-8 items-center">
            <h1>Super Tic-tac-toe</h1>
            <Game />
        </div>
    );
}
