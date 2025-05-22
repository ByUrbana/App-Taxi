import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { FleetZonePricesQuery } from '@urbana/admin-panel/generated/graphql';
import { TableService } from '@urbana/admin-panel/src/app/@services/table-service';
import { TagColorService } from '@urbana/admin-panel/src/app/@services/tag-color/tag-color.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-fleet-view-zone-prices',
  templateUrl: './fleet-view-zone-prices.component.html',
})
export class FleetViewZonePricesComponent implements OnInit {
  query?: Observable<ApolloQueryResult<FleetZonePricesQuery>>;

  constructor(
    private route: ActivatedRoute,
    public tagColor: TagColorService,
    public tableService: TableService
  ) {}

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.zonePrices));
  }
}
