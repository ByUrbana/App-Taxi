import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  CouponListQuery,
  GiftBatchListQuery,
} from '@urbana/admin-panel/generated/graphql';
import { TableService } from '@urbana/admin-panel/src/app/@services/table-service';
import { TagColorService } from '@urbana/admin-panel/src/app/@services/tag-color/tag-color.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-gift-batch-list',
  templateUrl: './gift-batch-list.component.html',
})
export class GiftBatchListComponent implements OnInit {
  query?: Observable<ApolloQueryResult<GiftBatchListQuery>>;

  constructor(
    public route: ActivatedRoute,
    public tableService: TableService,
    public tagColor: TagColorService,
  ) {}

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.giftBatches));
  }
}
