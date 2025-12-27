import Card from "./Card.jsx";


const CardList = ( {cards, onIncreseLikes} ) => {
    const getCardList = (cards) => {
        return cards.map((card) => {
            return(
                <Card
                    key={card.cardId}
                    id={card.cardId}
                    message={card.message}
                    likesCount={card.likesCount}
                    onIncreseLikes={onIncreseLikes}
                />
                
            )
        })
    }
    return <ul>{getCardList(cards)}</ul>
};

export default CardList;