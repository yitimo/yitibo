import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBarComponent } from './user-bar.component';
import { MaterialModule } from '../-material/material.module';
import { StatusCardComponent } from './status-card/status-card.component';
import { StatusImgComponent } from './status-card/simg/status-img.component';
import { StatusTextComponent } from './status-card/text/status-text.component';
import { StatusRetweetedComponent } from './status-card/retweeted/status-retweeted.component';
import { StatusUserComponent } from './status-card/user/status-user.component';
import { SSexPipe } from './status-card/user/ssex.pipe';
import { DialogPopupComponent } from './popup/dialog.component';
import { YTBPullDirective } from './ytb-pull/ytb-pull.component';

@NgModule({
    declarations: [
        UserBarComponent, StatusCardComponent, StatusImgComponent,
        StatusTextComponent, StatusRetweetedComponent, StatusUserComponent,
        SSexPipe, DialogPopupComponent, YTBPullDirective
    ],
    imports: [ CommonModule, MaterialModule ],
    exports: [
        CommonModule, MaterialModule, YTBPullDirective,
        UserBarComponent, StatusCardComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
