import React, { useEffect, useState } from "react";
import Pokemons from "../../types/Pokemons";
import api from "../../api/api";
import "./style.scss";
import PokemonCard from "../../components/PokemonCard/index";
import axios from "axios";

const Home: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemons[]>([]);
    const [next, setNext] = useState<string>("");

    useEffect(() => {
        const getPokemons = async () => {
            const res = await api.get('pokemon?offset=0&limit=100');
            setNext(res.data.next);
            setPokemons(res.data.results);
        };

        getPokemons();
    }, []);

    async function loadMore() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
            const res = await axios.get(next);
            setPokemons((prevPokemons) => [...prevPokemons, ...res.data.results]);
            setNext(res.data.next);
        }
    }

    return (
        <>
            <h2>Pokédex</h2>
            <div className="collection">
                {pokemons.map((p) => (
                    <PokemonCard key={p.name} name={p.name} />
                ))}
            </div>
            <div className="btn-center">
                <button onClick={loadMore}>Load more</button>
            </div>
        </>
    );
};

export default Home;
