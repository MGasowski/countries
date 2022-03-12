import { Link } from "react-router-dom";

interface Props {
  name: string;
  code: string;
  emoji: string;
}

const CountryCard = (props: Props): JSX.Element => {
  return (
    <Link to={`/${props.code}`}>
      <div className="flex p-4 shadow m-2 justify-between hover:shadow-lg hover:scale-105 rounded dark:bg-slate-800 dark:text-slate-100 transition ease-in-out ">
        <div className="flex">
          <span className="mx-2">{props.emoji} </span>
          <span className="mx-2">{props.code} </span>
        </div>
        <p className="h1 ">{props.name}</p>
        <span></span>
      </div>
    </Link>
  );
};

export default CountryCard;
