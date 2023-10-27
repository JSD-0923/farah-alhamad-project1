import Card from "../card/Card";
import { Link } from "react-router-dom";

export const CardsSection = (props) => {
  return (
    <>
      {props.cardsData.map((cardData, id) => (
        <Link to={`/details-page/${cardData.id}`} className="card" key={id}>
          <Card cardData={cardData} key={id} />
        </Link>
      ))}
    </>
  );
};
