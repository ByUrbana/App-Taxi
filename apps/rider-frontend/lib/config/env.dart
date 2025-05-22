import 'package:flutter_common/config/constants.dart';

import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:rider_flutter/gen/assets.gen.dart';

class Env {
  static final String serverUrl =
      dotenv.maybeGet('BASE_URL') ?? "http://${Constants.serverIp}/rider-api/";
  static final String gqlEndpoint = '${serverUrl}graphql';
  static bool isDemoMode = dotenv.maybeGet('DEMO_MODE') == 'true';
  static String appName = dotenv.maybeGet('APP_NAME') ?? "urbana";
  static String companyName = dotenv.maybeGet('COMPANY_NAME') ?? "BetterSuite";
  static String firebaseMessagingVapidKey = dotenv.maybeGet('FIREBASE_MESSAGING_VAPID_KEY') ?? "";
  static int placeSearchSearchRadius = 100000;
  static double desktopNavigationBarHeight = 96;
  static String defaultAvatar = dotenv.maybeGet('DEFAULT_AVATAR') ?? Assets.avatars.a1.path;
}
