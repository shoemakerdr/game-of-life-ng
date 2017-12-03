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
    constructor(private _gameService:GameService) {
        this.gridRowLength = 50
        this.gridColumnLength = 50
    }

    ngOnInit() {
        this.generations = 0
        this.gridRowLength = 30
        this.gridColumnLength = 30
        this._gameService.setGrid(this._gameService.newGrid(this.gridRowLength, this.gridColumnLength))
    }

    start () : void {
        this.intervalId = window.setInterval(() => {
            this.generations++
            this._gameService.setNextGameState()
        }, 30)
    }

    pause () {
        window.clearInterval(this.intervalId)
    }

    stop () : void {
        this.generations = 0
        window.clearInterval(this.intervalId)
    }

}
