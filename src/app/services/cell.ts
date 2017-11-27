import { Location } from './location'

export class Cell {
    isLiving:boolean
    location:Location
    constructor (isLiving:boolean, location:Location) {
        this.isLiving = isLiving
        this.location = location
        this.newLivingCell = this.newLivingCell.bind(this)
        this.newDeadCell = this.newDeadCell.bind(this)
    }

    getIsLiving () : boolean {
        return this.isLiving
    }

    nextGenerationCell (neighbors:number) : Cell {
        const newCell = {
            0: this.newDeadCell,
            1: this.newDeadCell,
            2: this.isLiving ? this.newLivingCell : this.newDeadCell,
            3: this.newLivingCell,
            4: this.newDeadCell,
            5: this.newDeadCell,
            6: this.newDeadCell,
            7: this.newDeadCell,
            8: this.newDeadCell,
        }
        return newCell[neighbors]()
    }

    newLivingCell () : Cell {
        return new Cell(true, this.location)
    }

    newDeadCell () : Cell {
        return new Cell(false, this.location)
    }
}