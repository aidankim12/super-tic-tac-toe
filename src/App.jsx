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

        if (arr[a] !== "" && (arr[a] === arr[b] && arr[b] === arr[c] && arr[c] === arr[a])) {
            return arr[a];
        }
    }

    return "";
}

function Cell({xIsNext, handleBoard}) {
    const [value, setValue] = useState(null);

    function handleClick() {
        const newValue = xIsNext ? "X" : "O";
        setValue(newValue);

        handleBoard(newValue);
    }

    return (
        <div className="p-1">
            <button className="flex items-center justify-center h-10 w-10" onClick={handleClick} disabled={value === null ? false : true}>{value}</button>
        </div>
    );
}

function Board({xIsNext, handleSuperBoard}) {
    const [board, setBoard] = useState(Array(9).fill(""));

    function handleBoard(idx) {
        return (value) => {
            const newBoard = [...board.slice(0, idx), value, ...board.slice(idx + 1)];
            setBoard(newBoard);

            const winner = findWinner(newBoard);
            handleSuperBoard(winner);
        }
    }

    return (
        <div className="divide-black divide-y flex flex-col p-2">
            <div className="divide-black divide-x flex">
                <Cell xIsNext={xIsNext} handleBoard={handleBoard(0)} />
                <Cell xIsNext={xIsNext} handleBoard={handleBoard(1)} />
                <Cell xIsNext={xIsNext} handleBoard={handleBoard(2)} />
            </div>
            <div className="divide-black divide-x flex">
                <Cell xIsNext={xIsNext} handleBoard={handleBoard(3)} />
                <Cell xIsNext={xIsNext} handleBoard={handleBoard(4)} />
                <Cell xIsNext={xIsNext} handleBoard={handleBoard(5)} />
            </div>
            <div className="divide-black divide-x flex">
                <Cell xIsNext={xIsNext} handleBoard={handleBoard(6)} />
                <Cell xIsNext={xIsNext} handleBoard={handleBoard(7)} />
                <Cell xIsNext={xIsNext} handleBoard={handleBoard(8)} />
            </div>
        </div>
    );
}

function SuperBoard({handleGame}) {
    const [xIsNext, setXIsNext] = useState(true);
    const [superBoard, setSuperBoard] = useState(Array(9).fill(""));

    function handleSuperBoard(idx) {
        return (value) => {
            const newSuperBoard = [...superBoard.slice(0, idx), value, ...superBoard.slice(idx + 1)];
            setSuperBoard(newSuperBoard);

            const winner = findWinner(newSuperBoard);
            handleGame(winner);

            setXIsNext(!xIsNext);
        }
    }

    return (
        <div className="divide-black divide-y flex flex-col p-4">
            <div className="divide-black divide-x flex">
                <Board xIsNext={xIsNext} handleSuperBoard={handleSuperBoard(0)} />
                <Board xIsNext={xIsNext} handleSuperBoard={handleSuperBoard(1)} />
                <Board xIsNext={xIsNext} handleSuperBoard={handleSuperBoard(2)} />
            </div>
            <div className="divide-black divide-x flex">
                <Board xIsNext={xIsNext} handleSuperBoard={handleSuperBoard(3)} />
                <Board xIsNext={xIsNext} handleSuperBoard={handleSuperBoard(4)} />
                <Board xIsNext={xIsNext} handleSuperBoard={handleSuperBoard(5)} />
            </div>
            <div className="divide-black divide-x flex">
                <Board xIsNext={xIsNext} handleSuperBoard={handleSuperBoard(6)} />
                <Board xIsNext={xIsNext} handleSuperBoard={handleSuperBoard(7)} />
                <Board xIsNext={xIsNext} handleSuperBoard={handleSuperBoard(8)} />
            </div>
        </div>
    );
}

export default function Game() {
    const [winner, setWinner] = useState("");

    function handleGame(value) {
        setWinner(value);
    }

    return (
        <>
            <SuperBoard handleGame={handleGame} />
            <div>
                Winner: {winner}
            </div>
        </>
    );
}
