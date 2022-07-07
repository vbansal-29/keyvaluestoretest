export class Pair {
    key: string
    value: string
    readonly _amount: number

    constructor (key: string, value: string) {
        this.key = key
        this.value = value
    }
}
