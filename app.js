//app.js
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        if (res) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wxed53838a5b6e0e55',
              secret: '12c27f0ce8e4a0298f5ada6d251934b2',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            method: 'GET',
            success: function (response) { // 拿到openid后 传给后台 后台返回是否绑定，如果绑定了是什么角色
              console.log(response.data)
              wx.setStorage({ // 存储openid
                key: 'openid',
                data: response.data.openid
              })
              wx.request({
                url: that.globalData.gloUrl + 'allUsers/getBindInfo',
                data: {
                  "openId": response.data.openid,
                  "type": "0" //（如果是老师，这里填”1”）
                },
                method: 'POST',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log('res.data.result:' + res.data.result)
                  if (res.data.result == "OK") {
                    if (res.data.type == "98") { // 未绑定
                      wx.reLaunch({
                        url: '../getMsg/getMsg',
                      })
                    } else if (res.data.type == "0") { // 学生
                      wx.reLaunch({
                        url: '../index/index',
                      })
                    } else if (res.data.type == "1") { // 老师
                      wx.reLaunch({
                        url: '../teacherPlays/teacherPlays',
                      })
                    }
                  } else {
                    console.log('nook')
                    wx.showToast({
                      title: res.data.result,
                      icon: 'none',
                      duration: 2000, // 提示的延迟时间，单位毫秒，默认：1500
                      mask: false, // 是否显示透明蒙层，防止触摸穿透，默认：false
                      success: function () {
                        console.log('success')
                      },
                      fail: function () {
                        console.log('fail')
                      },
                      complete: function () {
                        console.log('complete')
                      }
                    })
                  }
                }
              })
              // if (1) { // 暂未绑定
              //   // 去绑定页面
              // } else { // 已绑定
              //   if ('stu') { // 学生
              //     // 直接跳转到流程选择页面
              //   } else { // 教师
              //     //
              //   }
              // }
            }
          })
        } else {
          console.log('login fail')
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    testData: '123123',
    gloUrl: 'http://113.89.56.138:58080/',
    objSaveData1: {},
    objSaveData2: {},
    objSaveData3: {}
  }
})