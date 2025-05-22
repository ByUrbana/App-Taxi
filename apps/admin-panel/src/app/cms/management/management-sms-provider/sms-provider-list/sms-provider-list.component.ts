import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableService } from '@urbana/admin-panel/src/app/@services/table-service';
import { environment } from '@urbana/admin-panel/src/environments/environment';

@Component({
  selector: 'app-sms-provider-list',
  templateUrl: './sms-provider-list.component.html',
})
export class SMSProviderListComponent {
  serverUrl = environment.root;

  constructor(
    public route: ActivatedRoute,
    public tableService: TableService,
  ) {}
}
