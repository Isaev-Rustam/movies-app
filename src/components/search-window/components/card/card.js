import './card.css';
import { Rate } from 'antd';

function Card({ children }) {
  return <div className="card">{children}</div>;
}

export default Card;

Card.Image = function CardImage({ imageURl, alt }) {
  return (
    <div className="card__img-box">
      <img className="card__img" src={imageURl} alt={alt} />
    </div>
  );
};

Card.Content = function CardContent({ children }) {
  return <div className="card__content">{children}</div>;
};

Card.Header = function CardHeader({ children }) {
  return <div className="card__header">{children}</div>;
};

Card.Title = function CardTitle({ children }) {
  return <h2 className="card__title">{children}</h2>;
};

Card.Rating = function CardRating({ children }) {
  return (
    <div className="card__rating">
      <span>{children}</span>
    </div>
  );
};

Card.ReleaseDate = function CardReleaseDate({ children }) {
  return <p className="release__date">{children}</p>;
};

Card.Btns = function CardBtns({ children }) {
  return <div className="card__btns">{children}</div>;
};

Card.RateItem = function CardRateItem({ count }) {
  return (
    <div className="card__rate">
      <Rate count={count} allowHalf defaultValue={2.5} />
    </div>
  );
};

Card.Text = function CardText({ children }) {
  return <p className="card__text">{children}</p>;
};
