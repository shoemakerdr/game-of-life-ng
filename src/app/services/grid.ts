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

    getState () : Cell[][] {
        return this.state
    }

    nextState () : Cell[][] {
        return this.getState().map((row, r) => {
            return row.map((column, c) => {
                const neighbors = this.getLivingNeighbors({row: r, column: c})
                return column.nextGenerationCell(neighbors)
            })
        })
    }

    toggleCell (location:Location) : void {
        const { row, column } = location
        const cell = this.state[row][column]
        this.state[row][column] = new Cell(!cell.getIsLiving())
    }

    getLivingNeighbors (location:Location) : number {
        const surrounding = this.filterSurrounding(this.getSurrounding(location))
        const neighbors = surrounding.filter(location => this.isCellLiving(location))
        return neighbors.length
    }

    filterSurrounding (surrounding:Location[]) : Location[] {
        return surrounding.filter(location => this.isValidLocation(location))
    }

    getSurrounding (location:Location) : Location [] {
        const { row, column } = location
        if (!this.isValidLocation(location))
            return []
        return [
            { row: row, column: column - 1 },
            { row: row + 1, column: column - 1 },
            { row: row + 1, column: column},
            { row: row + 1, column: column + 1 },
            { row: row, column: column + 1 },
            { row: row - 1, column: column + 1 },
            { row: row - 1, column: column },
            { row: row - 1, column: column - 1 },
        ]
    }

    isValidLocation (location:Location) : boolean {
        const { rowLower, rowUpper, columnLower, columnUpper } = this.bounds
        const { row, column } = location
        return row >= rowLower && row < rowUpper
            && column >= columnLower && column < columnUpper
    }

    isCellLiving (location:Location) : boolean {
        const { row, column } = location
        return this.getState()[row][column].getIsLiving()
    }
}