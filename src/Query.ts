import Pair from '../src/Pair'
interface IQuery {
    get(key: string) : Promise<string>
    set(key: string, value: string): Promise<Pair>
}
export default class Query implements IQuery {
    computer: any
    constructor (computer: any) {
        this.computer = computer
    }
    async get(key: string): Promise<string> {
        const revs = await this.computer.queryRevs({ contract: Pair })
        const pairs: Pair[] = await Promise.all(revs.map((rev) => this.computer.sync(rev)))
        pairs.filter((pair) => pair.key === key).map((pair) => pair.value)
        const max = Math.max.apply(Math, pairs.map((pair) => pair._amount))
        return pairs.find((pair) => pair._amount === max).key
    }  
    // todo: we want the type of get to be (key: string): Promise<string>
    // One way to do that is to return the object that has the highest _amount
    async set(key: string, value: string): Promise<Pair> {
        return this.computer.new(Pair, [key, value])
    }
      
}