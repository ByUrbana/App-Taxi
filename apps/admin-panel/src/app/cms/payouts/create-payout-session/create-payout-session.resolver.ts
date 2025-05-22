import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  CreatePayoutSessionFieldsGQL,
  CreatePayoutSessionFieldsQuery,
  CreatePayoutSessionGQL,
  PayoutMethodsGQL,
  PayoutMethodsQuery,
} from '@urbana/admin-panel/generated/graphql';
import { TableService } from '@urbana/admin-panel/src/app/@services/table-service';

export const createPayoutSessionResolver: ResolveFn<
  ApolloQueryResult<CreatePayoutSessionFieldsQuery>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const tableService = inject(TableService);
  const gql = inject(CreatePayoutSessionFieldsGQL);
  return gql.fetch();
};
