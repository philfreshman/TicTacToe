import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import { Button, Popconfirm } from 'antd';
import axios from 'axios';
import moment from 'moment';






type SquareValue = 'X' | 'O' | null;

interface SquareProps {
    onClick(): void;
    value: SquareValue;
}

const Square: React.FC<SquareProps> = props => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
};


interface BoardProps {
    onClick(i: number): void;
    squares: SquareValue[];
}

const Board: React.FC<BoardProps> = props => {

    const renderSquare = (i: number): ReactNode => {
        return (
            <Square
            value={props.squares[i]}
            onClick={() => props.onClick(i)}
            />
        );
    };


    return (
    <div>
        <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
            </div>
        <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        </div>
        <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
        </div>
    </div>
    );
};


interface Winners{
    winner: SquareValue;
    round: number;
    time: number;
}





const Game: React.FC = () => {


    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [gameRound, setGameRound] = useState<number>(1);
    const [gameWinner, setGameWinner] = useState<SquareValue>(null);
    const [winnerList, setWinnerList] = useState<Winners[]>([
    ]);
    const [history, setHistory] = useState<{squares: SquareValue[]} []>([
        {
            squares: Array(9).fill(null)
        }
    ]);

    // preloading data from DB
    axios.get<Winners[]>("http://localhost:1234/api/winners")
    .then((response)=>{
        setWinnerList(response.data)
    });


    const initNewRound = (): void => {
        axios.post<Winners>("http://localhost:1234/api/winners",{
            winner: gameWinner,
            round: gameRound,
            time: new Date().getTime()
        });

        axios.get<Winners[]>("http://localhost:1234/api/winners")
        .then((response)=>{
            setWinnerList(response.data)
        });

        setXIsNext(true);
        setStepNumber(0);
        setGameRound(gameRound+1);
        setHistory([
            {
                squares: Array(9).fill(null)
            }
        ]);
    }


    
    const handleClick = (i: number): void => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? "X" : "O";
        setHistory(newHistory.concat([
            {
            squares: squares
            }
        ]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
        setGameWinner(calculateWinner(squares));
    };

    const jumpTo = (step: number): void => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0)
    };


    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
            <Button type="default" onClick={() => jumpTo(move)}>{desc}</Button >
            {/* <button onClick={() => jumpTo(move)}>{desc}</button> */}
            </li>
        );
    });


    const list = winnerList.map((current, index)=>{
        // let winDate = new Date(current.time);
        // let winDate = moment.unix(current.time).format(""MM / DD / YYYY"");
        // let unix = current.time;
        var dateString = moment(current.time).format(" HH:mm -  D/M/Y");  


        return (
            <li key={index}>
                <Button type="default">{current.winner} = {dateString}</Button >
                {/* <button>{current.winner} = {dateString}</button> */}
            </li>
        )
    });


    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }


    function calculateWinner(squares: SquareValue[]): SquareValue {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };


    function cancel():void {
    return;
        }


    return (
        
        <div className="game">
        <h1>TicTacToe Game</h1>

            <div className="game-board">
            <Board
                squares={current.squares}
                onClick={i => handleClick(i)}
            />
            </div>

            <Popconfirm
                title="Are you sure?"
                onConfirm={() => initNewRound()}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
            <Button type="default">Start new game</Button >
            </Popconfirm>

            {/* <Button type="default" onClick={() => initNewRound()}> New game ?</Button > */}
            

            
            <div className="game-records">

                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <div className="game-info" id="right">
                    <div>Winner list:</div>
                    <ol>{list}</ol>
                </div>

            </div>

        </div>
    );
};

ReactDOM.render(<Game />, document.getElementById("root"));