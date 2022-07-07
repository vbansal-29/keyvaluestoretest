import {Pair} from './Pair'

interface IQuery {
    get(key: string) : Promise<Pair []>
    set(key: string, value: string)
}

export class Query implements IQuery {
    computer: any
    pair: Pair
    constructor (computer: any) {
        this.computer = computer
    }
    async get(key: string) {
        const revs = await this.computer.queryRevs({key})
        const objects: Pair[] = await Promise.all(revs.map((rev) => this.computer.sync(rev)))
        return objects
    }
    set(key: string, value: string) {
        this.pair = this.computer.new(Pair, [key, value])
        return this.pair
    }
}