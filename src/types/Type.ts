type Name = {
    name: string
}

type Type = {
    damage_relations:{
        double_damage_from: Name[];
        double_damage_to: Name[];
        half_damage_from: Name[];
        half_damage_to: Name[];
        no_damage_from: Name[];
        no_damage_to: Name[];
    }
}

export default Type