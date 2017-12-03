import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { GameService } from './services/game.service'
import { GameComponent } from './components/game/game.component'

@NgModule({
    declarations: [
        AppComponent,
        GameComponent
    ],
    imports: [
        BrowserModule,
    ],
    providers: [GameService],
    bootstrap: [AppComponent]
})
export class AppModule { }
