// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouterGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

part of 'app_router.dart';

/// generated route for
/// [AddPayoutAccountScreen]
class AddPayoutAccountRoute extends PageRouteInfo<AddPayoutAccountRouteArgs> {
  AddPayoutAccountRoute({
    Key? key,
    required PayoutMethodEntity payoutMethod,
    List<PageRouteInfo>? children,
  }) : super(
          AddPayoutAccountRoute.name,
          args: AddPayoutAccountRouteArgs(
            key: key,
            payoutMethod: payoutMethod,
          ),
          initialChildren: children,
        );

  static const String name = 'AddPayoutAccountRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      final args = data.argsAs<AddPayoutAccountRouteArgs>();
      return AddPayoutAccountScreen(
        key: args.key,
        payoutMethod: args.payoutMethod,
      );
    },
  );
}

class AddPayoutAccountRouteArgs {
  const AddPayoutAccountRouteArgs({
    this.key,
    required this.payoutMethod,
  });

  final Key? key;

  final PayoutMethodEntity payoutMethod;

  @override
  String toString() {
    return 'AddPayoutAccountRouteArgs{key: $key, payoutMethod: $payoutMethod}';
  }
}

/// generated route for
/// [AnnouncementsScreen]
class AnnouncementsRoute extends PageRouteInfo<void> {
  const AnnouncementsRoute({List<PageRouteInfo>? children})
      : super(
          AnnouncementsRoute.name,
          initialChildren: children,
        );

  static const String name = 'AnnouncementsRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const AnnouncementsScreen();
    },
  );
}

/// generated route for
/// [AuthScreen]
class AuthRoute extends PageRouteInfo<void> {
  const AuthRoute({List<PageRouteInfo>? children})
      : super(
          AuthRoute.name,
          initialChildren: children,
        );

  static const String name = 'AuthRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const AuthScreen();
    },
  );
}

/// generated route for
/// [EarningsScreen]
class EarningsRoute extends PageRouteInfo<void> {
  const EarningsRoute({List<PageRouteInfo>? children})
      : super(
          EarningsRoute.name,
          initialChildren: children,
        );

  static const String name = 'EarningsRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const EarningsScreen();
    },
  );
}

/// generated route for
/// [EditPhoneNumberScreen]
class EditPhoneNumberRoute extends PageRouteInfo<void> {
  const EditPhoneNumberRoute({List<PageRouteInfo>? children})
      : super(
          EditPhoneNumberRoute.name,
          initialChildren: children,
        );

  static const String name = 'EditPhoneNumberRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const EditPhoneNumberScreen();
    },
  );
}

/// generated route for
/// [FeedbacksSummaryScreen]
class FeedbacksSummaryRoute extends PageRouteInfo<void> {
  const FeedbacksSummaryRoute({List<PageRouteInfo>? children})
      : super(
          FeedbacksSummaryRoute.name,
          initialChildren: children,
        );

  static const String name = 'FeedbacksSummaryRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const FeedbacksSummaryScreen();
    },
  );
}

/// generated route for
/// [HomeScreen]
class HomeRoute extends PageRouteInfo<void> {
  const HomeRoute({List<PageRouteInfo>? children})
      : super(
          HomeRoute.name,
          initialChildren: children,
        );

  static const String name = 'HomeRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const HomeScreen();
    },
  );
}

/// generated route for
/// [LanguageSettingsScreen]
class LanguageSettingsRoute extends PageRouteInfo<void> {
  const LanguageSettingsRoute({List<PageRouteInfo>? children})
      : super(
          LanguageSettingsRoute.name,
          initialChildren: children,
        );

  static const String name = 'LanguageSettingsRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const LanguageSettingsScreen();
    },
  );
}

/// generated route for
/// [MapSettingsScreen]
class MapSettingsRoute extends PageRouteInfo<void> {
  const MapSettingsRoute({List<PageRouteInfo>? children})
      : super(
          MapSettingsRoute.name,
          initialChildren: children,
        );

  static const String name = 'MapSettingsRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const MapSettingsScreen();
    },
  );
}

/// generated route for
/// [NavigationScreen]
class NavigationRoute extends PageRouteInfo<void> {
  const NavigationRoute({List<PageRouteInfo>? children})
      : super(
          NavigationRoute.name,
          initialChildren: children,
        );

  static const String name = 'NavigationRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const NavigationScreen();
    },
  );
}

/// generated route for
/// [PaymentMethodsScreen]
class PaymentMethodsRoute extends PageRouteInfo<void> {
  const PaymentMethodsRoute({List<PageRouteInfo>? children})
      : super(
          PaymentMethodsRoute.name,
          initialChildren: children,
        );

  static const String name = 'PaymentMethodsRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const PaymentMethodsScreen();
    },
  );
}

/// generated route for
/// [PayoutAccountListScreen]
class PayoutAccountListRoute extends PageRouteInfo<void> {
  const PayoutAccountListRoute({List<PageRouteInfo>? children})
      : super(
          PayoutAccountListRoute.name,
          initialChildren: children,
        );

  static const String name = 'PayoutAccountListRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const PayoutAccountListScreen();
    },
  );
}

/// generated route for
/// [PayoutAccountsScreen]
class PayoutAccountsRoute extends PageRouteInfo<void> {
  const PayoutAccountsRoute({List<PageRouteInfo>? children})
      : super(
          PayoutAccountsRoute.name,
          initialChildren: children,
        );

  static const String name = 'PayoutAccountsRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const PayoutAccountsScreen();
    },
  );
}

/// generated route for
/// [ProfileInfoScreen]
class ProfileInfoRoute extends PageRouteInfo<void> {
  const ProfileInfoRoute({List<PageRouteInfo>? children})
      : super(
          ProfileInfoRoute.name,
          initialChildren: children,
        );

  static const String name = 'ProfileInfoRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const ProfileInfoScreen();
    },
  );
}

/// generated route for
/// [ProfileParentScreen]
class ProfileParentRoute extends PageRouteInfo<void> {
  const ProfileParentRoute({List<PageRouteInfo>? children})
      : super(
          ProfileParentRoute.name,
          initialChildren: children,
        );

  static const String name = 'ProfileParentRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const ProfileParentScreen();
    },
  );
}

/// generated route for
/// [ProfileScreen]
class ProfileRoute extends PageRouteInfo<void> {
  const ProfileRoute({List<PageRouteInfo>? children})
      : super(
          ProfileRoute.name,
          initialChildren: children,
        );

  static const String name = 'ProfileRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const ProfileScreen();
    },
  );
}

/// generated route for
/// [RideHistoryDetailsScreen]
class RideHistoryDetailsRoute
    extends PageRouteInfo<RideHistoryDetailsRouteArgs> {
  RideHistoryDetailsRoute({
    Key? key,
    required OrderEntity entity,
    List<PageRouteInfo>? children,
  }) : super(
          RideHistoryDetailsRoute.name,
          args: RideHistoryDetailsRouteArgs(
            key: key,
            entity: entity,
          ),
          initialChildren: children,
        );

  static const String name = 'RideHistoryDetailsRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      final args = data.argsAs<RideHistoryDetailsRouteArgs>();
      return RideHistoryDetailsScreen(
        key: args.key,
        entity: args.entity,
      );
    },
  );
}

class RideHistoryDetailsRouteArgs {
  const RideHistoryDetailsRouteArgs({
    this.key,
    required this.entity,
  });

  final Key? key;

  final OrderEntity entity;

  @override
  String toString() {
    return 'RideHistoryDetailsRouteArgs{key: $key, entity: $entity}';
  }
}

/// generated route for
/// [RideHistoryScreen]
class RideHistoryRoute extends PageRouteInfo<void> {
  const RideHistoryRoute({List<PageRouteInfo>? children})
      : super(
          RideHistoryRoute.name,
          initialChildren: children,
        );

  static const String name = 'RideHistoryRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const RideHistoryScreen();
    },
  );
}

/// generated route for
/// [SettingsParentScreen]
class SettingsParentRoute extends PageRouteInfo<void> {
  const SettingsParentRoute({List<PageRouteInfo>? children})
      : super(
          SettingsParentRoute.name,
          initialChildren: children,
        );

  static const String name = 'SettingsParentRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const SettingsParentScreen();
    },
  );
}

/// generated route for
/// [SettingsScreen]
class SettingsRoute extends PageRouteInfo<void> {
  const SettingsRoute({List<PageRouteInfo>? children})
      : super(
          SettingsRoute.name,
          initialChildren: children,
        );

  static const String name = 'SettingsRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const SettingsScreen();
    },
  );
}

/// generated route for
/// [WalletParentScreen]
class WalletParentRoute extends PageRouteInfo<void> {
  const WalletParentRoute({List<PageRouteInfo>? children})
      : super(
          WalletParentRoute.name,
          initialChildren: children,
        );

  static const String name = 'WalletParentRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const WalletParentScreen();
    },
  );
}

/// generated route for
/// [WalletScreen]
class WalletRoute extends PageRouteInfo<void> {
  const WalletRoute({List<PageRouteInfo>? children})
      : super(
          WalletRoute.name,
          initialChildren: children,
        );

  static const String name = 'WalletRoute';

  static PageInfo page = PageInfo(
    name,
    builder: (data) {
      return const WalletScreen();
    },
  );
}
