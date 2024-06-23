export type Species = {
    name: string;
    url: string;
}

export type EvolvesTo = {
    evolves_to: EvolvesTo[]
    species: Species
}

type EvolutionChain = {
    chain: EvolvesTo
}

export default EvolutionChain