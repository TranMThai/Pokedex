type PokemonSpecies = {
    base_happiness: string;
    capture_rate: string;
    evolution_chain: {url: string};
    growth_rate: {
        name: string
    };
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        }
    }[]
    genera: {
        genus: string;
        language: {
            name: string
        }
    }[]
}