import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { BsCurrencyExchange } from "react-icons/bs";

const GET_COUNTRY = (code: string | undefined) => gql`
  {
    country(code: "${code}") {
      code
      name
      native
      phone
      continent {
        name
      }
      capital
      currency
      languages {
        name
      }
      emoji
    }
  }
`;

const Country = (props: any) => {
  const { code } = useParams();
  const { data, loading, error } = useQuery(GET_COUNTRY(code));

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }
  return (
    <>
      <div
        className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20 border h-min"
        style={{ minWidth: 400 }}
      >
        <div className="text-2xl p-2 -ml-8 -mt-4 w-min">
          <Link to="/">
            <AiOutlineArrowLeft />
          </Link>
        </div>

        <div className="flex justify-center md:justify-end -mt-20">
          <span className="w-20 h-20 object-cover text-8xl">
            {data.country.emoji}
          </span>
        </div>
        <div>
          <h2 className="text-gray-800 text-3xl font-semibold">
            {data.country.name}
            <span className="text-xl"> ({data.country.code})</span>
          </h2>
          <p className="mt-2 text-gray-600 flex items-center">
            <FaCity className=" mx-2 text-4xl text-blue-600" />
            Capital city - {data.country.capital}
          </p>
          <p className="mt-2 text-gray-600 flex items-center">
            <BiWorld className=" mx-2 text-4xl text-green-600" /> Continent -{" "}
            {data.country.continent.name}
          </p>
          <p className="mt-2 text-gray-600 flex items-center">
            <BsCurrencyExchange className=" mx-2 text-4xl text-amber-400" />
            Currency - {data.country.currency}
          </p>
        </div>
        <div className="flex justify-end mt-4">
          {data.country.languages.map((language: any) => (
            <p
              key={language.name}
              className="text-xl mx-2 font-medium text-indigo-500"
            >
              {language.name}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Country;
