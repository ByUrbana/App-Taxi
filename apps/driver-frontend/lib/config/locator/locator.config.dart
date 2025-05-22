// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:connectivity_plus/connectivity_plus.dart' as _i895;
import 'package:driver_flutter/config/locator/locator.dart' as _i148;
import 'package:driver_flutter/core/blocs/auth_bloc.dart' as _i183;
import 'package:driver_flutter/core/blocs/location.dart' as _i833;
import 'package:driver_flutter/core/blocs/onboarding_cubit.dart' as _i369;
import 'package:driver_flutter/core/blocs/route.dart' as _i595;
import 'package:driver_flutter/core/blocs/settings.dart' as _i322;
import 'package:driver_flutter/core/datasources/graphql_datasource.dart'
    as _i528;
import 'package:driver_flutter/core/datasources/graphql_datasource.prod.dart'
    as _i946;
import 'package:driver_flutter/core/datasources/location_datasource.dart'
    as _i615;
import 'package:driver_flutter/core/datasources/location_datasource.mock.dart'
    as _i533;
import 'package:driver_flutter/core/datasources/location_datasource.prod.dart'
    as _i553;
import 'package:driver_flutter/core/datasources/location_update_datasource.dart'
    as _i1016;
import 'package:driver_flutter/core/datasources/location_update_datasource.mock.dart'
    as _i26;
import 'package:driver_flutter/core/datasources/location_update_datasource.prod.dart'
    as _i688;
import 'package:driver_flutter/core/datasources/upload_datasource.dart'
    as _i184;
import 'package:driver_flutter/core/datasources/upload_datasource.dev.dart'
    as _i830;
import 'package:driver_flutter/core/datasources/upload_datasource.prod.dart'
    as _i363;
import 'package:driver_flutter/core/repositories/firebase_repository.dart'
    as _i123;
import 'package:driver_flutter/core/repositories/firebase_repository.mock.dart'
    as _i127;
import 'package:driver_flutter/core/repositories/firebase_repository.prod.dart'
    as _i934;
import 'package:driver_flutter/core/repositories/profile_repository.dart'
    as _i1055;
import 'package:driver_flutter/core/repositories/profile_repository.mock.dart'
    as _i161;
import 'package:driver_flutter/core/repositories/profile_repository.prod.dart'
    as _i866;
import 'package:driver_flutter/core/router/app_router.dart' as _i702;
import 'package:driver_flutter/features/announcements/data/repositories/announcements_repository.mock.dart'
    as _i835;
import 'package:driver_flutter/features/announcements/data/repositories/announcements_repository.prod.dart'
    as _i994;
import 'package:driver_flutter/features/announcements/domain/repositories/announcements_repository.dart'
    as _i271;
import 'package:driver_flutter/features/announcements/presentation/blocs/announcements.dart'
    as _i427;
import 'package:driver_flutter/features/auth/data/repositories/auth_repository.mock.dart'
    as _i369;
import 'package:driver_flutter/features/auth/data/repositories/auth_repository.prod.dart'
    as _i334;
import 'package:driver_flutter/features/auth/domain/repositories/auth_repository.dart'
    as _i1014;
import 'package:driver_flutter/features/auth/presentation/blocs/login.dart'
    as _i248;
import 'package:driver_flutter/features/auth/presentation/blocs/onboarding_cubit.dart'
    as _i69;
import 'package:driver_flutter/features/earnings/data/repositories/earnings_repository.mock.dart'
    as _i388;
import 'package:driver_flutter/features/earnings/data/repositories/earnings_repository.prod.dart'
    as _i610;
import 'package:driver_flutter/features/earnings/domain/repositories/earnings_repository.dart'
    as _i772;
import 'package:driver_flutter/features/earnings/presentation/blocs/earnings.dart'
    as _i901;
import 'package:driver_flutter/features/home/data/repositories/home_repository.mock.dart'
    as _i803;
import 'package:driver_flutter/features/home/data/repositories/home_repository.prod.dart'
    as _i19;
import 'package:driver_flutter/features/home/domain/repositories/home_repository.dart'
    as _i1026;
import 'package:driver_flutter/features/home/presentation/blocs/cancel_reason.dart'
    as _i909;
import 'package:driver_flutter/features/home/presentation/blocs/home.dart'
    as _i220;
import 'package:driver_flutter/features/payment_methods/data/repositories/payment_methods_repository.mock.dart'
    as _i576;
import 'package:driver_flutter/features/payment_methods/data/repositories/payment_methods_repository.prod.dart'
    as _i486;
import 'package:driver_flutter/features/payment_methods/domain/repositories/payment_methods_repository.dart'
    as _i615;
import 'package:driver_flutter/features/payment_methods/presentation/blocs/payment_methods.dart'
    as _i273;
import 'package:driver_flutter/features/payout_methods/data/repositories/payout_methods_repository.mock.dart'
    as _i557;
import 'package:driver_flutter/features/payout_methods/data/repositories/payout_methods_repository.prod.dart'
    as _i840;
import 'package:driver_flutter/features/payout_methods/domain/repositories/payout_methods_repository.dart'
    as _i588;
import 'package:driver_flutter/features/payout_methods/presentation/blocs/add_bank_transfer_payout_method_form_cubit.dart'
    as _i132;
import 'package:driver_flutter/features/payout_methods/presentation/blocs/payout_accounts.dart'
    as _i701;
import 'package:driver_flutter/features/payout_methods/presentation/blocs/payout_methods.dart'
    as _i614;
import 'package:driver_flutter/features/profile/data/repositories/profile_repository.mock.dart'
    as _i790;
import 'package:driver_flutter/features/profile/data/repositories/profile_repository.prod.dart'
    as _i187;
import 'package:driver_flutter/features/profile/domain/repositories/profile_repository.dart'
    as _i960;
import 'package:driver_flutter/features/profile/presentation/blocs/feedbacks_summary.dart'
    as _i223;
import 'package:driver_flutter/features/profile/presentation/blocs/profile.dart'
    as _i14;
import 'package:driver_flutter/features/redeem_gift_card/data/repositories/redeem_gift_card_repository.mock.dart'
    as _i453;
import 'package:driver_flutter/features/redeem_gift_card/data/repositories/redeem_gift_card_repository.prod.dart'
    as _i150;
import 'package:driver_flutter/features/redeem_gift_card/domain/repositories/redeem_gift_card_repository.dart'
    as _i593;
import 'package:driver_flutter/features/redeem_gift_card/presentation/blocs/redeem_gift_card.dart'
    as _i893;
import 'package:driver_flutter/features/ride_history/data/repositories/ride_history_repository.mock.dart'
    as _i124;
import 'package:driver_flutter/features/ride_history/data/repositories/ride_history_repository.prod.dart'
    as _i598;
import 'package:driver_flutter/features/ride_history/domain/repositories/ride_history_repository.dart'
    as _i605;
import 'package:driver_flutter/features/ride_history/presentation/blocs/report_issue.dart'
    as _i413;
import 'package:driver_flutter/features/ride_history/presentation/blocs/ride_history.dart'
    as _i394;
import 'package:driver_flutter/features/wallet/data/repositories/wallet_repository.mock.dart'
    as _i889;
import 'package:driver_flutter/features/wallet/data/repositories/wallet_repository.prod.dart'
    as _i1071;
import 'package:driver_flutter/features/wallet/domain/repositories/wallet_repository.dart'
    as _i807;
import 'package:driver_flutter/features/wallet/presentation/blocs/top_up_wallet.dart'
    as _i914;
import 'package:driver_flutter/features/wallet/presentation/blocs/wallet.dart'
    as _i826;
import 'package:get_it/get_it.dart' as _i174;
import 'package:graphql/client.dart' as _i763;
import 'package:injectable/injectable.dart' as _i526;

const String _dev = 'dev';
const String _prod = 'prod';

extension GetItInjectableX on _i174.GetIt {
// initializes the registration of main-scope dependencies inside of GetIt
  _i174.GetIt init({
    String? environment,
    _i526.EnvironmentFilter? environmentFilter,
  }) {
    final gh = _i526.GetItHelper(
      this,
      environment,
      environmentFilter,
    );
    final serviceModule = _$ServiceModule();
    gh.factory<_i763.GraphQLClient>(() => serviceModule.create());
    gh.singleton<_i369.OnboardingCubit>(() => _i369.OnboardingCubit());
    gh.singleton<_i322.SettingsCubit>(() => _i322.SettingsCubit());
    gh.singleton<_i702.AppRouter>(() => _i702.AppRouter());
    gh.singleton<_i69.OnboardingCubit>(() => _i69.OnboardingCubit());
    gh.lazySingleton<_i595.RouteCubit>(() => _i595.RouteCubit());
    gh.lazySingleton<_i895.Connectivity>(() => serviceModule.connectivity);
    gh.lazySingleton<_i1014.AuthRepository>(
      () => _i369.AuthRepositoryMock(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i960.ProfileRepository>(
      () => _i790.ProfileRepositoryMock(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i588.PayoutMethodsRepository>(
      () => _i557.PayoutMethodsRepositoryMock(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i123.FirebaseRepository>(
      () => _i127.FirebaseRepositoryMock(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i184.UploadDatasource>(
      () => _i830.UploadDatasourceMock(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i593.RedeemGiftCardRepository>(
      () => _i453.RedeemGiftCardRepositoryMock(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i893.RedeemGiftCardBloc>(
        () => _i893.RedeemGiftCardBloc(gh<_i593.RedeemGiftCardRepository>()));
    gh.lazySingleton<_i772.EarningsRepository>(
      () => _i388.EarningsRepositoryMock(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i615.PaymentMethodsRepository>(
      () => _i576.PaymentMethodsRepositoryMock(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i615.LocationDatasource>(
      () => _i533.LocationDatasourceImpl(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i605.RideHistoryRepository>(
      () => _i124.RideHistoryRepositoryMock(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i1016.LocationUpdateDatasource>(
      () => _i26.LocationUpdateDatasourceMock(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i1026.HomeRepository>(
      () => _i803.HomeRepositoryMock(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i1055.ProfileRepository>(
      () => _i161.ProfileRepositoryMock(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i271.AnnouncementsRepository>(
      () => _i835.AnnouncementsRepositoryMock(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i807.WalletRepository>(
      () => _i889.WalletRepositoryMock(),
      registerFor: {_dev},
    );
    gh.lazySingleton<_i901.EarningsBloc>(
        () => _i901.EarningsBloc(gh<_i772.EarningsRepository>()));
    gh.lazySingleton<_i184.UploadDatasource>(
      () => _i363.UploadDatasourceImpl(),
      registerFor: {_prod},
    );
    gh.lazySingleton<_i914.TopUpWalletBloc>(
        () => _i914.TopUpWalletBloc(gh<_i807.WalletRepository>()));
    gh.lazySingleton<_i223.FeedbacksSummaryCubit>(
        () => _i223.FeedbacksSummaryCubit(gh<_i960.ProfileRepository>()));
    gh.lazySingleton<_i14.ProfileBloc>(
        () => _i14.ProfileBloc(gh<_i960.ProfileRepository>()));
    gh.lazySingleton<_i183.AuthBloc>(
        () => _i183.AuthBloc(gh<_i1055.ProfileRepository>()));
    gh.lazySingleton<_i248.LoginBloc>(
        () => _i248.LoginBloc(gh<_i1014.AuthRepository>()));
    gh.lazySingleton<_i528.GraphqlDatasource>(() => _i946.GraphqlDatasourceImpl(
          client: gh<_i763.GraphQLClient>(),
          connectivity: gh<_i895.Connectivity>(),
        ));
    gh.lazySingleton<_i772.EarningsRepository>(
      () => _i610.EarningsRepositoryImpl(gh<_i528.GraphqlDatasource>()),
      registerFor: {_prod},
    );
    gh.lazySingleton<_i271.AnnouncementsRepository>(
      () => _i994.AnnouncementsRepositoryImpl(gh<_i528.GraphqlDatasource>()),
      registerFor: {_prod},
    );
    gh.lazySingleton<_i588.PayoutMethodsRepository>(
      () => _i840.PayoutMethodsRepositoryImpl(gh<_i528.GraphqlDatasource>()),
      registerFor: {_prod},
    );
    gh.lazySingleton<_i909.CancelReasonCubit>(
        () => _i909.CancelReasonCubit(gh<_i1026.HomeRepository>()));
    gh.lazySingleton<_i615.LocationDatasource>(
      () => _i553.LocationDatasourceImpl(),
      registerFor: {_prod},
    );
    gh.lazySingleton<_i1016.LocationUpdateDatasource>(
      () => _i688.LocationUpdateDatasourceImpl(gh<_i528.GraphqlDatasource>()),
      registerFor: {_prod},
    );
    gh.lazySingleton<_i413.ReportIssueCubit>(
        () => _i413.ReportIssueCubit(gh<_i605.RideHistoryRepository>()));
    gh.lazySingleton<_i593.RedeemGiftCardRepository>(
      () => _i150.RedeemGiftCardRepositoryImpl(gh<_i528.GraphqlDatasource>()),
      registerFor: {_prod},
    );
    gh.lazySingleton<_i132.AddBankTransferPayoutMethodFormCubit>(() =>
        _i132.AddBankTransferPayoutMethodFormCubit(
            gh<_i588.PayoutMethodsRepository>()));
    gh.lazySingleton<_i614.PayoutMethodsBloc>(
        () => _i614.PayoutMethodsBloc(gh<_i588.PayoutMethodsRepository>()));
    gh.lazySingleton<_i701.PayoutAccountsBloc>(
        () => _i701.PayoutAccountsBloc(gh<_i588.PayoutMethodsRepository>()));
    gh.lazySingleton<_i833.LocationBloc>(() => _i833.LocationBloc(
          gh<_i615.LocationDatasource>(),
          gh<_i1016.LocationUpdateDatasource>(),
        ));
    gh.lazySingleton<_i826.WalletBloc>(
        () => _i826.WalletBloc(gh<_i807.WalletRepository>()));
    gh.lazySingleton<_i960.ProfileRepository>(
      () => _i187.ProfileRepositoryProd(gh<_i528.GraphqlDatasource>()),
      registerFor: {_prod},
    );
    gh.lazySingleton<_i1014.AuthRepository>(
      () => _i334.LoginRepositoryImpl(gh<_i528.GraphqlDatasource>()),
      registerFor: {_prod},
    );
    gh.lazySingleton<_i394.RideHistoryBloc>(
        () => _i394.RideHistoryBloc(gh<_i605.RideHistoryRepository>()));
    gh.lazySingleton<_i427.AnnouncementsBloc>(
        () => _i427.AnnouncementsBloc(gh<_i271.AnnouncementsRepository>()));
    gh.lazySingleton<_i220.HomeBloc>(() => _i220.HomeBloc(
          gh<_i1026.HomeRepository>(),
          gh<_i123.FirebaseRepository>(),
        ));
    gh.lazySingleton<_i273.PaymentMethodsBloc>(
        () => _i273.PaymentMethodsBloc(gh<_i615.PaymentMethodsRepository>()));
    gh.lazySingleton<_i1055.ProfileRepository>(
      () => _i866.ProfileRepositoryProd(gh<_i528.GraphqlDatasource>()),
      registerFor: {_prod},
    );
    gh.lazySingleton<_i605.RideHistoryRepository>(
      () => _i598.RideHistoryRepositoryImpl(gh<_i528.GraphqlDatasource>()),
      registerFor: {_prod},
    );
    gh.lazySingleton<_i1026.HomeRepository>(
      () => _i19.HomeRepositoryImpl(gh<_i528.GraphqlDatasource>()),
      registerFor: {_prod},
    );
    gh.lazySingleton<_i807.WalletRepository>(
      () => _i1071.WalletRepositoryImpl(gh<_i528.GraphqlDatasource>()),
      registerFor: {_prod},
    );
    gh.lazySingleton<_i615.PaymentMethodsRepository>(
      () => _i486.PaymentMethodsRepositoryImpl(gh<_i528.GraphqlDatasource>()),
      registerFor: {_prod},
    );
    gh.lazySingleton<_i123.FirebaseRepository>(
      () => _i934.FirebaseRepositoryImpl(gh<_i528.GraphqlDatasource>()),
      registerFor: {_prod},
    );
    return this;
  }
}

class _$ServiceModule extends _i148.ServiceModule {}
