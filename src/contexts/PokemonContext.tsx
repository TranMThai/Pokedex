import React, { createContext, useContext, useEffect, useState } from "react";
import Pokemon from "../types/Pokemon";
import api from "../api/api";
import Type from "../types/Type";
import axios from "axios";
import EvolutionChain, { EvolvesTo } from "../types/EvolutionChain";
import { backGroundColorType } from "../constants/pokemonConstants";
import { IPokemon } from "../pages/Detail";

interface IPokemonContextProviderProps {
    children: React.ReactNode;
    pokemon: Pokemon | undefined
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface IPokemonValue {
    pokemon: Pokemon | undefined
    species: PokemonSpecies | undefined;
    strongness: string[] | undefined;
    weakness: string[] | undefined;
    pokemonChain: IPokemon[] | undefined;
    evolutionChain: EvolutionChain | undefined;
}

export const PokemonContext = createContext<IPokemonValue>({
    pokemon: undefined,
    species: undefined,
    strongness: undefined,
    weakness: undefined,
    pokemonChain: undefined,
    evolutionChain: undefined
});

export const usePokemon = () => {
    return useContext(PokemonContext)
}

export const PokemonProvider = ({ children, pokemon, setLoading }: IPokemonContextProviderProps): JSX.Element => {

    const [species, setSpecies] = useState<PokemonSpecies>()
    const [type, setType] = useState<Type[]>([])
    const [weakness, setWeakness] = useState<string[]>([])
    const [strongness, setStrongness] = useState<string[]>([])
    const [evolutionChain, setEvolutionChain] = useState<EvolutionChain>()
    const [pokemonChain, setPokemonChain] = useState<IPokemon[]>([]);

    useEffect(() => {
        if (pokemon) {
            const getPokemonSpecies = async () => {
                const res = await api.get(`pokemon-species/${pokemon.id}`)
                setSpecies(res.data)
            }
            getPokemonSpecies();
        }
    }, [pokemon])

    useEffect(() => {
        if (species) {
            const getType = async (url: string) => {
                const res = await axios.get(url)
                setType(p => [...p, res.data])
            }
            pokemon?.types.forEach(t => {
                getType(t.type.url)
            })
        }
    }, [species])


    useEffect(() => {
        const weaknesses = new Set(weakness)
        const strongnesses = new Set(strongness)
        type.forEach(t => {

            t.damage_relations.no_damage_to.forEach(d => {
                weaknesses.add(d.name)
            })
            t.damage_relations.double_damage_from.forEach(d => {
                weaknesses.add(d.name)
            })

            t.damage_relations.no_damage_from.forEach(d => {
                strongnesses.add(d.name)
            })
            t.damage_relations.double_damage_to.forEach(d => {
                strongnesses.add(d.name)
            })
        })

        const weaknessesClone = [...weaknesses]
        const strongnessesClone = [...strongnesses]

        setWeakness(weaknessesClone.filter(e => !strongnessesClone.includes(e) && e !== pokemon?.types[0].type.name && e !== pokemon?.types[1]?.type.name))
        setStrongness(strongnessesClone.filter(e => !weaknessesClone.includes(e) && e !== pokemon?.types[0].type.name && e !== pokemon?.types[1]?.type.name))

    }, [type])

    useEffect(() => {
        if (species) {
            const getEvolutionChain = async () => {
                const res = await axios.get(species.evolution_chain.url)
                setEvolutionChain(res.data)
            }
            getEvolutionChain();
        }
    }, [species])

    useEffect(() => {

        if (evolutionChain) {
            const getSpecies = async (url: string): Promise<IPokemon> => {
                const resSpe = await axios.get(url)
                const resPo = await axios.get(resSpe.data.varieties[0].pokemon.url)
                const pokemon: Pokemon = resPo.data
                const type = pokemon.types[0].type.name === 'normal' && pokemon.types.length > 1 ? pokemon.types[1].type.name : pokemon.types[0].type.name
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other['official-artwork'].front_default,
                    color: backGroundColorType.get(type)
                }
            }

            const getEvolutionList = async (evo: EvolvesTo): Promise<IPokemon[]> => {
                const evolutionList: IPokemon[] = []

                const traverse = async (evo: EvolvesTo) => {
                    if (!evo || !evo.species.url) {
                        return
                    }
                    const pokemon: IPokemon = await getSpecies(evo.species.url)
                    evolutionList.push(pokemon)
                    await traverse(evo.evolves_to[0])
                }

                await traverse(evo)
                return evolutionList
            }

            const fetch = async () => {
                const species: IPokemon[] = await getEvolutionList(evolutionChain.chain)
                setPokemonChain(species)
                setLoading(false)
            }
            fetch()
        }

    }, [evolutionChain])

    return (
        <PokemonContext.Provider value={{ pokemon, species, strongness, weakness, pokemonChain, evolutionChain }}>
            {children}
        </PokemonContext.Provider>
    )
}
