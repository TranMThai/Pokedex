import Type from "./Type.ts"

type Pokemon = {
    id: number;
    name: string;
    types: Type[]
    sprites: {
        'front_default': string
        other:{
            'official-artwork': {
                front_default: string;
            }
        }
    }
}
export default Pokemon