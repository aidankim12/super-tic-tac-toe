function Cell() {
    return (
        <div className="p-1">
            <button className="flex items-center justify-center h-10 w-10"></button>
        </div>
    );
}

function Board() {
    return (
        <div className="divide-black divide-y flex flex-col p-2">
            <div className="divide-black divide-x flex">
                <Cell />
                <Cell />
                <Cell />
            </div>
            <div className="divide-black divide-x flex">
                <Cell />
                <Cell />
                <Cell />
            </div>
            <div className="divide-black divide-x flex">
                <Cell />
                <Cell />
                <Cell />
            </div>
        </div>
    );
}

export default function SuperBoard() {
    return (
        <div className="divide-black divide-y flex flex-col p-4">
            <div className="divide-black divide-x flex">
                <Board />
                <Board />
                <Board />
            </div>
            <div className="divide-black divide-x flex">
                <Board />
                <Board />
                <Board />
            </div>
            <div className="divide-black divide-x flex">
                <Board />
                <Board />
                <Board />
            </div>
        </div>
    );
}