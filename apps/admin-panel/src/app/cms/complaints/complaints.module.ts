import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintsRoutingModule } from './complaints-routing.module';
import { ComplaintsListComponent } from './complaints-list/complaints-list.component';
import { TagColorService } from '@urbana/admin-panel/src/app/@services/tag-color/tag-color.service';
import { SharedModule } from '@urbana/admin-panel/src/app/@components/shared.module';


@NgModule({
  declarations: [ComplaintsListComponent],
  imports: [
    CommonModule,
    ComplaintsRoutingModule,
    SharedModule
  ],
  providers: [TagColorService]
})
export class ComplaintsModule { }
