import React, { useState, useEffect } from "react";
import axios from "axios";

export const Card = ({ sprites, name, weight, order, onView, view, species, stats, types, onBack }) => {
  const colors = ["blue", "red", "orange", "purple", "green", "rose", "yellow", "sky", "amber", "lime", "fuchsia"];

  return (
    <>
      {view === name ? (
        <article className={`mx-12 my-12 border rounded w-72 h-96 overflow-auto  text-center bg-${colors[Math.floor(Math.random() * colors.length)]}-100`}>
          <div className="text-justify px-4">
            <p className="text-xs pt-3">
              Species:{" "}
              <a href={species.url} target="_black" className="font-bold text-blue-500 capitalize">
                {species.name}
              </a>
            </p>

            <p className="text-sm py-2 font-bold text-center ">Stat</p>
            <table className="w-full table-auto">
              <tr className="bg-teal-200 text-center">
                <th className="text-xs">Base</th>
                <th className="text-xs">Effort</th>
                <th className="text-xs">Name</th>
              </tr>
              {stats.map((st, idx) => (
                <tr className="even:bg-gray-300 text-center odd:bg-white" key={idx}>
                  <td className="divide-y-2 text-xs divide-gray-300">{st.base_stat}</td>
                  <td className="divide-y-2 text-xs divide-gray-300">{st.effort}</td>
                  <td className="divide-y-2 text-xs divide-gray-300">{st.stat.name}</td>
                </tr>
              ))}
            </table>

            <p className="text-sm py-2 font-bold text-center">
              Types
            </p>
            <table className="w-full table-auto">
              <tr className="bg-teal-200 text-center">
                <th className="text-xs">Slot</th>
                <th className="text-xs">Type</th>
              </tr>
              {types.map((type, idx) => (
                <tr className="even:bg-gray-300 text-center odd:bg-white" key={idx}>
                  <td className="divide-y-2 text-xs divide-gray-300">{type.slot}</td>
                  <td className="divide-y-2 text-xs divide-gray-300">{type.type.name}</td>
                </tr>
              ))}
            </table>
            <button onClick={onBack} className="text-blue-500 hover:text-blue-900 my-3 text-xs">
              Back
            </button>
          </div>
        </article>
      ) : (
        <article className="mx-12 my-12 border rounded w-72 h-96 text-center ">
          <div className={`bg-${colors[Math.floor(Math.random() * colors.length)]}-100`}>
            <img src={sprites.other.dream_world.front_default} alt="here" className="mx-auto py-3 h-52" />
          </div>
          <div className="text-justify px-4">
            <p className="text-xs pt-3">
              Order: <span className="font-bold">{order}</span>
            </p>

            <h2 className="text-sm pt-3 ">
              Name: <span className="font-bold capitalize">{name}</span>
            </h2>

            <p className="text-sm pt-3 ">
              Weight: <span className="font-bold capitalize">{weight}</span>
            </p>
            <button onClick={onView} className="text-blue-500 hover:text-blue-900 my-3 text-xs">
              {" "}
              View details
            </button>
          </div>
        </article>
      )}
    </>
  );
};

export const Main = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [view, setView] = useState();
  const [loadPoke, setLoadPoke] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const getAllPokemons = async () => {
    const { data } = await axios(loadPoke);
    setLoadPoke(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        setAllPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
  };
  useEffect(() => {
    getAllPokemons();
  }, []);

  const onView = (card) => {
    setView(card.name);
  };
  const onBack = () => {
    setView("");
  };

  return (
    <div>
      <header className="text-xl font-bold pt-5">Pokemon By Aaron</header>
      <div className="flex flex-wrap justify-center">
        {allPokemons.map((pokemon, idx) => (
          <Card key={idx} {...pokemon} onView={() => onView(pokemon)} onBack={onBack} view={view} />
        ))}
      </div>
    </div>
  );
};
