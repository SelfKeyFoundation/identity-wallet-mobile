//
//  SelfKeyWallet.m
//  IdentityWalletMobile
//
//  Created by Maycon de Mellos on 26/03/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(SelfKeyWallet, NSObject)
RCT_EXTERN_METHOD(closeApp)
RCT_EXTERN_METHOD(getUserId: (RCTResponseSenderBlock)callback)
@end
