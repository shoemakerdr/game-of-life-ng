import { Cell } from '../cell'
import { Grid } from '../grid'
import { debug } from 'util';

const cell = isAlive => isAlive ? new Cell(true) : new Cell(false)
const newLocation = (row, column) => {return {row: row, column: column}}
const newGrid = (rowLength, columnLength) => {
    const grid = []
    for (let i = 0; i < columnLength; i++) {
        const row = []
        for (let j = 0; j < rowLength; j++) {
            row.push(cell(false))
        }
        grid.push(row)
    }
    return new Grid(grid)
}
const newGridLiving = (rowLength, columnLength) => {
    const grid = []
    for (let i = 0; i < columnLength; i++) {
        const row = []
        for (let j = 0; j < rowLength; j++) {
            row.push(cell(true))
        }
        grid.push(row)
    }
    return new Grid(grid)
}
function compareGridStates (actual:Cell[][], expected:Cell[][]) : void {
    if (actual.length !== expected.length && actual[0].length !== expected[0].length)
        fail('lengths of grid states are not the same')
    for (let row = 0; row < actual[0].length; row++) {
        for (let column = 0; column < actual[0].length; column++) {
            if (actual[row][column].getIsLiving() !== expected[row][column].getIsLiving())
                fail(`expected ${actual[row][column].getIsLiving()} to equal ${expected[row][column].getIsLiving()} at row ${row}, column ${column}`)
        }
    }
}

describe('getSurrounding method', () => {
    const grid = newGrid(3,3)
    describe('given a valid location', () => {
        const location = {row: 1, column: 1}
        it('should return a location object with correct surrounding indexes', () => {
            const expected = [
                newLocation(1,0),
                newLocation(2,0),
                newLocation(2,1),
                newLocation(2,2),
                newLocation(1,2),
                newLocation(0,2),
                newLocation(0,1),
                newLocation(0,0),
            ]
            const actual = grid.getSurrounding(location)
            expect(actual).toEqual(expected)
        })
    })
    describe('given an invalid location of two negative indexes', () => {
        const location = {row: -2, column: -2}
        it('should return an empty array', () => {
            const expected = []
            const actual = grid.getSurrounding(location)
            expect(actual).toEqual(expected)
        })
    })
    describe('given an invalid location of one negative index', () => {
        const location = {row: -1, column: 1}
        it('should return an empty array', () => {
            const expected = []
            const actual = grid.getSurrounding(location)
            expect(actual).toEqual(expected)
        })
    })
    describe('given an invalid location with one index over the bounds', () => {
        const location = {row: 3, column: 4}
        it('should return an empty array', () => {
            const expected = []
            const actual = grid.getSurrounding(location)
            expect(actual).toEqual(expected)
        })
    })
})

describe('filterSurrounding method', () => {
    const grid = newGrid(3,3)
    describe('given an array with some valid locations', () => {
        const surrounding = grid.getSurrounding({row: 0, column: 0})
        it('should filter out any neighbors with invalid locations', () => {
            const expected = [
                newLocation(1,0),
                newLocation(1,1),
                newLocation(0,1),
            ]
            const actual = grid.filterSurrounding(surrounding)
            expected.forEach(location => expect(actual).toContain(location))
        })
    })
    describe('given an array with 3 valid locations', () => {
        const surrounding = grid.getSurrounding({row: 0, column: 2})
        it('should filter out any neighbors with invalid locations', () => {
            const expected = [
                newLocation(1,1),
                newLocation(1,2),
                newLocation(0,1),
            ]
            const actual = grid.filterSurrounding(surrounding)
            expected.forEach(location => expect(actual).toContain(location))
        })
    })
    describe('given an array of valid locations', () => {
        const surrounding = grid.getSurrounding({row: 1, column: 1})
        it('should return all given  locations', () => {
            const expected = [
                newLocation(1,0),
                newLocation(2,0),
                newLocation(2,1),
                newLocation(2,2),
                newLocation(1,2),
                newLocation(0,2),
                newLocation(0,1),
                newLocation(0,0),
            ]
            const actual = grid.filterSurrounding(surrounding)
            expected.forEach(location => expect(actual).toContain(location))
        })
    })
    describe('given an empty array', () => {
        it('should return an empty array', () => {
            const expected = []
            const actual = grid.filterSurrounding([])
            expect(actual.length).toEqual(0)
        })
    })
})

describe('getLivingNeighbors method', () => {
    describe('when given an invalid cell location', () => {
        const grid = newGridLiving(3,3)
        const location = {row: -1, column: 1}
        it('should return 0', () => {
            const actual = grid.getLivingNeighbors(location)
            expect(actual).toEqual(0)
        })
    })
    describe('when given a valid cell location with 3 living neighbors', () => {
        const grid = newGridLiving(3,3)
        const location = {row: 0, column: 0}
        it('should return 3', () => {
            const actual = grid.getLivingNeighbors(location)
            expect(actual).toEqual(3)
        })
    })
    describe('when given a valid cell location with 5 living neighbors', () => {
        const grid = newGridLiving(3,3)
        const location = {row: 0, column: 1}
        it('should return 5', () => {
            const actual = grid.getLivingNeighbors(location)
            expect(actual).toEqual(5)
        })
    })
    describe('when given a valid cell location with 8 living neighbors', () => {
        const grid = newGridLiving(3,3)
        const location = {row: 1, column: 1}
        it('should return 8', () => {
            const actual = grid.getLivingNeighbors(location)
            expect(actual).toEqual(8)
        })
    })
    describe('when given a valid cell location with 0 living neighbors', () => {
        const grid = newGrid(3,3)
        const location = {row: 0, column: 2}
        it('should return 0', () => {
            const actual = grid.getLivingNeighbors(location)
            expect(actual).toEqual(0)
        })
    })
    describe('when given a valid cell location with 2 living neighbors', () => {
        const grid = new Grid([
            [cell(true), cell(true), cell(false)],
            [cell(false), cell(true), cell(false)],
            [cell(false), cell(false), cell(false)]
        ])
        const location = {row: 1, column: 1}
        it('should return 2', () => {
            const actual = grid.getLivingNeighbors(location)
            expect(actual).toEqual(2)
        })
    })
    describe('when given a valid cell location with 6 living neighbors', () => {
        const grid = new Grid([
            [cell(true), cell(true), cell(false)],
            [cell(false), cell(false), cell(true)],
            [cell(true), cell(true), cell(true)]
        ])
        const location = {row: 1, column: 1}
        it('should return 6', () => {
            const actual = grid.getLivingNeighbors(location)
            expect(actual).toEqual(6)
        })
    })
})

describe('toggleCell method', () => {
    describe('when given a valid cell location with a dead cell', () => {
        const grid = newGrid(3,3)
        const location = {row: 0, column: 0}
        it('will change that cell to living', () => {
            const expected = [
                [cell(true), cell(false), cell(false)],
                [cell(false), cell(false), cell(false)],
                [cell(false), cell(false), cell(false)]
            ]
            grid.toggleCell(location)
            compareGridStates(grid.getState(), expected)
        })
    })
    describe('when given a valid cell location with a living cell', () => {
        const grid = newGridLiving(3,3)
        const location = {row: 0, column: 0}
        it('will change that cell to dead', () => {
            const expected = [
                [cell(false), cell(true), cell(true)],
                [cell(true), cell(true), cell(true)],
                [cell(true), cell(true), cell(true)]
            ]
            grid.toggleCell(location)
            compareGridStates(grid.getState(), expected)
        })
    })
})

describe('nextState method', () => {
    describe('when the grid\'s state contains no living cells', () => {
        const grid = newGrid(3,3)
        it('will change return a grid state of no living cells', () => {
            const expected = [
                [cell(false), cell(false), cell(false)],
                [cell(false), cell(false), cell(false)],
                [cell(false), cell(false), cell(false)]
            ]
            compareGridStates(grid.nextState(), expected)
        })
    })
})