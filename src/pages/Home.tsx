import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Select from "react-select";
import CountryCard from "../components/CountryCard";

const LIST_CONTINENTS = gql`
  {
    continents {
      code
      name
    }
  }
`;

const LIST_CONTINENT_COUNTRIES = (continentCode: string) => {
  return gql`
    {
      continent(code: "${continentCode}") {
        code
        name
        countries {
          name
          code
          emoji
        }
      }
    }
  `;
};

const Home = () => {
  const [continent, setContinent] = useState("EU");
  const [continentsList, setContinents] = useState([]);
  const [search, setSearch] = useState("");

  const {
    data: continents,
    loading: continentLoading,
    error: continentError,
  } = useQuery(LIST_CONTINENTS);
  const { data, loading, error } = useQuery(
    LIST_CONTINENT_COUNTRIES(continent)
  );

  useEffect(() => {
    if (continentLoading || continentError) return;
    setContinents(
      continents.continents.map((el: any) => {
        return { value: el.code, label: el.name };
      })
    );
  }, [continents, continentLoading, continentError]);

  const handleContinent = (event: any) => {
    setContinent(event.value);
  };

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  return (
    <div className="container ">
      <h1 className="text-4xl text-center text-sky-900">Country listings</h1>
      <div className="flex mt-4">
        <Select
          options={continentsList}
          placeholder="Select an continent"
          onChange={handleContinent}
          defaultValue={continentsList.find(
            (el: any) => el.value === continent
          )}
          className="m-2  w-1/5 h-10"
        />
        <input
          type="search"
          className=" rounded border-2 p-3 m-2 w-4/5 h-10 dark:bg-slate-900 dark:border-black dark:text-slate-400"
          placeholder="Find country"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <hr className="m-4" />
      {data.continent.countries
        .filter((el: any) =>
          el.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((el: any) => (
          <CountryCard
            key={el.code}
            name={el.name}
            emoji={el.emoji}
            code={el.code}
          />
        ))}
    </div>
  );
};

export default Home;
