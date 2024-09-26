#import "AppDelegate.h"

#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTBundleURLProvider.h>
// import header
#import "RNCConfig.h"


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // react-native-config로부터 환경 변수에서 Google Maps API 키를 불러옵니다.
  NSString *apiKey = [RNCConfig envFor:@"GOOGLE_MAPS_API_KEY"];
  [GMSServices provideAPIKey:apiKey]; // 환경 변수로부터 가져온 API 키 사용
  
  self.moduleName = @"MatzipApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
