import { Component, OnInit } from '@angular/core'
import { GameService } from '../../services/game.service'

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
    gameService:GameService
    constructor(gameService:GameService) {
        this.gameService = gameService
    }

    ngOnInit() {
        this.generations = 0
        this.gridRowLength = 30
        this.gridColumnLength = 30
        this.gameService.setGrid(this.gameService.getRandomGrid(this.gridRowLength, this.gridColumnLength))
        this.start()
    }

    newRandom () : void {
        this.gameService.setGrid(this.gameService.getRandomGrid(this.gridRowLength, this.gridColumnLength))        
    }

    start () : void {
        const self = this
        window.clearInterval(this.intervalId)
        this.intervalId = window.setInterval(() => {
            self.generations++
            self.gameService.setNextGameState()
        }, 100)
    }

    pause () {
        window.clearInterval(this.intervalId)
    }

    clear () : void {
        this.generations = 0
        window.clearInterval(this.intervalId)
        this.gameService.setGrid(this.gameService.newGrid(this.gridRowLength, this.gridColumnLength))
    }

    togglePaint () : void {
        this.canPaint = !this.canPaint
    }

    paint (cell) : void {
        if (this.canPaint)
            cell.setIsLiving(true)
    }

}
