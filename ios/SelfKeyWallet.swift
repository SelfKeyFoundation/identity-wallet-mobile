//
//  SelfKeyWallet.swift
//  IdentityWalletMobile
//
//  Created by Maycon de Mellos on 26/03/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation

@objc(SelfKeyWallet)
class SelfKeyWallet: NSObject {
  @objc
  static var userId = "123"

  @objc
  func closeApp() {
    exit(0);
  }
  
  @objc
  func getUserId(_ callback: RCTResponseSenderBlock) {
    callback([NSNull(), SelfKeyWallet.userId])
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
