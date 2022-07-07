import { Computer } from 'bitcoin-computer-lib'
// import Pair from '../src/Pair'
import Query from '../src/Query'

describe('Key Value Store', () => {
    it('should create a Pair smart object', async () => {
        const query = new Query(new Computer({ seed: 'replace this seed' }))
        const pair = await query.set('Key', 'Value')
        
        expect(pair).toBeDefined()
        expect(pair.key).toEqual('Key')
        expect(pair.value).toEqual('Value')
    })
})

