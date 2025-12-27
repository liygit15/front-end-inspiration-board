import Board from "./Board.jsx";


const BoardList = ( {boards, onSelectBoard} ) => {
    const getBoardList = (boards) => {
        return boards.map((board) => {
            return(
                <Board
                    key={board.boardId}
                    id={board.boardId}
                    title={board.title}
                    owner={board.owner}
                    onSelect={onSelectBoard}
                />

            )
        })
    }
    return <ul>{getBoardList(boards)}</ul>
};

export default BoardList;