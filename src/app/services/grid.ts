import { Cell } from './cell'
import { Location } from './location'
import { Bounds } from './bounds'

export class Grid {
    state:Cell[][]
    bounds:Bounds
    constructor (state:Cell[][]) {
        this.state = state
        this.bounds = {
            rowLower: 0,
            rowUpper: state[0].length,
            columnLower: 0,
            columnUpper: state.length,
        }
    }

    nextState () : Cell[][] {
        // TODO: implement nextState
        const next = [[]]
        return next
    }

    getNeighbors (location:Location) : number {
        // TODO: implement getNeighbors
        const surrounding = this.filterSurroundingByBounds(this.getSurrounding(location))
        return 0
    }

    filterSurroundingByBounds (surrounding:Location[]) : Location[] {
        const { rowLower, rowUpper, columnLower, columnUpper } = this.bounds
        return surrounding.filter(location => {
            const { row, column } = location
            return row >= rowLower && row <= rowUpper
                && column >= columnLower && column <= columnUpper
        })
    }

    getSurrounding (location:Location) : Location [] {
        const { row, column } = location
        const surrounding = [
            { row: row, column: column - 1 },
            { row: row + 1, column: column - 1 },
            { row: row + 1, column: column},
            { row: row + 1, column: column + 1 },
            { row: row, column: column + 1 },
            { row: row - 1, column: column + 1 },
            { row: row - 1, column: column },
            { row: row - 1, column: column - 1 },
        ]
        return surrounding
    }
}