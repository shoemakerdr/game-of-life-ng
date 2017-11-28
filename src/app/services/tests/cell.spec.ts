import { Cell } from '../cell'

describe('nextGenerationCell method', () => {
    describe('when cell instance is living', () => {
        const cell = new Cell(true)
        it('should return a dead cell when given 0 neighbors', () => {
            const nextCell = cell.nextGenerationCell(0)
            expect(nextCell.getIsLiving()).toEqual(false)
        })
        it('should return a living cell when given 2 neighbors', () => {
            const nextCell = cell.nextGenerationCell(2)
            expect(nextCell.getIsLiving()).toEqual(true)
        })
        it('should return a living cell when given 3 neighbors', () => {
            const nextCell = cell.nextGenerationCell(3)
            expect(nextCell.getIsLiving()).toEqual(true)
        })
        it('should return a dead cell when given 4 neighbors', () => {
            const nextCell = cell.nextGenerationCell(4)
            expect(nextCell.getIsLiving()).toEqual(false)
        })
    })
    describe('when cell instance is dead', () => {
        const cell = new Cell(false)
        it('should return a dead cell when given 0 neighbors', () => {
            const nextCell = cell.nextGenerationCell(0)
            expect(nextCell.getIsLiving()).toEqual(false)
        })
        it('should return a dead cell when given 2 neighbors', () => {
            const nextCell = cell.nextGenerationCell(2)
            expect(nextCell.getIsLiving()).toEqual(false)
        })
        it('should return a living cell when given 3 neighbors', () => {
            const nextCell = cell.nextGenerationCell(3)
            expect(nextCell.getIsLiving()).toEqual(true)
        })
        it('should return a dead cell when given 4 neighbors', () => {
            const nextCell = cell.nextGenerationCell(4)
            expect(nextCell.getIsLiving()).toEqual(false)
        })
    })
})