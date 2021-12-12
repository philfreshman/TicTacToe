import React, { ReactNode } from 'react';
import { SquareValue, Square} from './square';


export interface BoardProps {
    onClick(i: number): void;
    squares: SquareValue[];
}

export const Board: React.FC<BoardProps> = props => {

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