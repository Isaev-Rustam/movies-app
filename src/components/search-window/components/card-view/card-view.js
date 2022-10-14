import { format } from 'date-fns';

import { stringLength } from '../../../../methods/methods';
import Card from '../card';

function CardView({ movies }) {
  console.log(movies);
  return movies.map((movie) => {
    const {
      id,
      title,
      overview,
      vote_average: voteAverage,
      poster_path: posterPath,
      release_date: releaseDate,
    } = movie;
    return (
      <Card key={id}>
        <Card.Image img={posterPath} alt="movie picture" />
        <Card.Content>
          <Card.Header>
            <Card.Title>{title}</Card.Title>
            <Card.Rating>{voteAverage}</Card.Rating>
            <Card.ReleaseDate>{releaseDate ? format(new Date(releaseDate), 'MMMM d yyyy') : 'Sorry'}</Card.ReleaseDate>
            <Card.Btns>
              <button type="button" className="card__btn">
                Action
              </button>
              <button type="button" className="card__btn">
                Drama
              </button>
            </Card.Btns>
          </Card.Header>
          <Card.Text>{stringLength(overview, 200)}</Card.Text>
          <Card.RateItem count={10} />
        </Card.Content>
      </Card>
    );
  });
}

export default CardView;
