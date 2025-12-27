
const Card = ({ id, message, likesCount, onIncreseLikes }) => {
  return (
    <section>
      <div>
        {message}
      </div>
      <button onClick={() => onIncreseLikes(id)}>
        ❤️ {likesCount}
      </button>
    </section>
  )
};

export default Card;