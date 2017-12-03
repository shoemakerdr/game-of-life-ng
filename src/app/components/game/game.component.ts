import { Component, OnInit } from '@angular/core'
import { GameService } from '../../services/game.service'
import { clearTimeout } from 'timers';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
    gridRowLength:number
    gridColumnLength:number
    intervalId:number
    generations:number
    canPaint:boolean
    constructor(private _gameService:GameService) {}

    ngOnInit() {
        this.generations = 0
        this.gridRowLength = 30
        this.gridColumnLength = 30
        this._gameService.setGrid(this._gameService.getRandomGrid(this.gridRowLength, this.gridColumnLength))
        this.start()
    }

    newRandom () : void {
        this._gameService.setGrid(this._gameService.getRandomGrid(this.gridRowLength, this.gridColumnLength))        
    }

    start () : void {
        window.clearInterval(this.intervalId)
        this.intervalId = window.setInterval(() => {
            this.generations++
            this._gameService.setNextGameState()
        }, 100)
    }

    pause () {
        window.clearInterval(this.intervalId)
    }

    clear () : void {
        this.generations = 0
        window.clearInterval(this.intervalId)
        this._gameService.setGrid(this._gameService.newGrid(this.gridRowLength, this.gridColumnLength))
    }

    togglePaint () : void {
        this.canPaint = !this.canPaint
    }

    paint (cell) : void {
        if (this.canPaint)
            cell.setIsLiving(true)
    }

}
