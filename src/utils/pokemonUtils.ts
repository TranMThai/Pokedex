
export const getBackgroundColorByType = (type: string): string => {
    switch(type){
        case 'fire': return "240, 128, 48"
        case 'water': return "104, 144, 240"
        case 'electric': return "248, 208, 48"
        case 'grass': return "120, 200, 80"
        case 'ice': return "152, 216, 216"
        case 'fighting': return "192, 48, 40"
        case 'poison': return "160, 64, 160"
        case 'ground': return "224, 192, 104"
        case 'flying': return "161, 138, 230"
        case 'psychic': return "161, 138, 230"
        case 'bug': return "168, 184, 32"
        case 'rock': return "168, 184, 32"
        case 'ghost': return "168, 184, 32"
        case 'dragon': return "112, 56, 248"
        case 'dark': return "112, 88, 72"
        case 'steel': return "112, 88, 72"
        case 'fairy': return "240, 182, 188"
        default: return "157, 160, 170"
    }
}