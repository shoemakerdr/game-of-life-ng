import { Cell } from '../cell'
import { Grid } from '../grid'

const cell = () => new Cell(true)

describe('getSurrounding method', () => {
    const grid = new Grid([[cell(),cell(),cell()],[cell(),cell(),cell()],[cell(),cell(),cell()]])
    describe('given a valid location', () => {
        const location = {row: 1, column: 1}
        it('should return a location object with correct surrounding indexes', () => {
            /*
            { row: row, column: column - 1 },
            { row: row + 1, column: column - 1 },
            { row: row + 1, column: column},
            { row: row + 1, column: column + 1 },
            { row: row, column: column + 1 },
            { row: row - 1, column: column + 1 },
            { row: row - 1, column: column },
            { row: row - 1, column: column - 1 },
            */
            const expected = [
                {row: 1, column: 0},
                {row: 2, column: 0},
                {row: 2, column: 1},
                {row: 2, column: 2},
                {row: 1, column: 2},
                {row: 0, column: 2},
                {row: 0, column: 1},
                {row: 0, column: 0},
            ]
            const actual = grid.getSurrounding(location)
            expect(actual).toEqual(expected)
        })
    })
})

describe('filterSurroundingByBounds method', () => {
    const grid = new Grid([[cell(),cell(),cell()],[cell(),cell(),cell()],[cell(),cell(),cell()]])
    describe('given a valid location', () => {
        const location = {row: 0, column: 0}
        it('should filter out any location objects with invalid indexes', () => {
            const expected = [
                {row: 1, column: 0},
                {row: 1, column: 1},
                {row: 0, column: 1},
            ]
            const surrounding = grid.getSurrounding(location)
            const actual = grid.filterSurroundingByBounds(surrounding)
            expect(actual).toEqual(expected)
        })
    })
})