import { Injectable } from '@angular/core'
import { Cell } from './cell'
import { Grid } from './grid'
import { Location } from './location'

@Injectable()
export class GameService {
    grid:Grid
    constructor () {}

    getGrid () : Grid {
        return this.grid
    }

    setGrid (grid:Grid) : void {
        this.grid = grid
    }

    getGameState () : Cell[][] {
        return this.grid.getState()
    }

    setNextGameState () : void {
        this.grid.setState(this.grid.nextState())
    }

    newGrid (rowLength:number, columnLength:number) : Grid {
        const grid = []
        for (let i = 0; i < columnLength; i++) {
            const row = []
            for (let j = 0; j < rowLength; j++) {
                row.push(new Cell(false))
            }
            grid.push(row)
        }
        return new Grid(grid)
    }

    toggleCellAt (location:Location) : void {
        this.grid.toggleCellLife(location)
    }
}
