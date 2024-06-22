import Type from "./Type.ts"

type Pokemon = {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        }
    }[];
    abilities: {
        ability: { name: string };
        is_hidden: boolean;
        slot: number
    }[]
    sprites: {
        front_default: string
        other: {
            'official-artwork': {
                front_default: string;
            };
            showdown: {
                front_default: string;
                back_default: string;
            }
        }
    };
    stats: {
        base_stat: number;
        stat: {
            name: string;
        }
    }[]
}
export default Pokemon