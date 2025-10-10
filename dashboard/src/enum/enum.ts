interface EnumValue {
    value: any;
    label: string;
}

export default class Enum {
    values<T extends EnumValue>(values: T[]): T[] {
        return values;
    }

    getName(id: any, values: EnumValue[]): string | undefined {
        return values.find(value => value.value === id)?.label;
    }
}