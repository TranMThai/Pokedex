import React, { useEffect, useState } from "react";
import Pokemons from "../../types/Pokemons";
import api from "../../api/api";
import "./style.scss";
import PokemonCard from "../../components/PokemonCard/index";
import axios from "axios";
import Search from "../../components/Search";

const Home: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemons[]>([]);
    const [next, setNext] = useState<string | null>("");

    const getPokemons = async () => {
        const res = await api.get('pokemon?offset=0&limit=100');
        setNext(res.data.next);
        setPokemons(res.data.results);
    };

    useEffect(() => {
        getPokemons();
    }, []);

    useEffect(() => {
        if (!next) {
            const target = document.querySelector('.load-btn') as HTMLElement
            target.style.display = 'none'
        } else {
            const target = document.querySelector('.load-btn') as HTMLElement
            target.style.display = 'inline'
        }
    }, [next])

    async function loadMore() {
        if (next) {
            const res = await axios.get(next);
            setPokemons((prevPokemons) => [...prevPokemons, ...res.data.results]);
            setNext(res.data.next);
        }
    }
    
    return (
        <>
            <h2>Pokédex</h2>
            <Search
                getPokemons={getPokemons}
                setPokemons={setPokemons}
                setNext={setNext}
            />
            <div className="collection">
                {pokemons.map((p) => (
                    <PokemonCard key={p.name} name={p.name} />
                ))}
            </div>
            <div className="btn-center">
                <button className="load-btn" onClick={loadMore}>Load more</button>
            </div>
        </>
    );
};

export default Home;
