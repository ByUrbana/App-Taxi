import { NgModule } from '@angular/core';
import { SharedModule } from '@urbana/admin-panel/src/app/@components/shared.module';

import { FinancialsRoutingModule } from './financials-routing.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    FinancialsRoutingModule
  ]
})
export class FinancialsModule { }
