import Enum from './enum'

const options = [
    { value: 1, label: "L'eau" },
    { value: 2, label: 'Le feu' }
]

export default class Categories extends Enum {
    static values() { return options }

    static getName(id: string, values: { value: string; label: string }[]) {
        const found = values.find((value) => value.value === id);
        return found ? found.label : ""; // ou une valeur par défaut
    }
}
