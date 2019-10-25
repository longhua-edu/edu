//index.js
//获取应用实例
const app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {
    motto: '您好',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: '',
    imgUrls: [
      // '../../images/bg/bg1.jpg',
      // '../../images/bg/bg2.jpg',
      '../../images/bg/bg10.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    duration: 1000,
    staList: [
      {
        baseInfoId: '岗位2',
        changciID: '场次1',
        tongguochushen: '1',
        lineid: 'cc1'
      }, {
        baseInfoId: '岗位3',
        changciID: '场次4',
        tongguochushen: '1',
        lineid: 'cc4'
      }, {
        baseInfoId: '岗位4',
        changciID: '场次5',
        tongguochushen: '1',
        lineid: 'cc5'
      }
    ],
    beforeStaList: [],
    swiperH: '', // swiper高度
    nowIdx: 0, // 当前swiper索引
    imgList: [ // 图片列表
      { imgUrl: '../../images/icon/index/5.png', kaodian: '龙华区1', mingcheng: '民治中学 数学1', tongguochushen: 0},
      { imgUrl: '../../images/icon/index/5.png', kaodian: '龙华区2', mingcheng: '民治中学 数学2', tongguochushen: 1},
      { imgUrl: '../../images/icon/index/5.png', kaodian: '龙华区3', mingcheng: '民治中学 数学3', tongguochushen: 2}
    ],
    indicatorDots2: true
  },
  //获取swiper高度
  getHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth - 2 * 10;//获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;
    var sH = winWid * imgh / imgw + "px"
    this.setData({
      swiperH: sH//设置高度
    })
  },
  //swiper滑动事件
  swiperChange: function (e) {
    this.setData({
      nowIdx: e.detail.current
    })
  },
  gogogog: function () {
    wx.navigateTo({
      url: '../station/station',
    })
  },
  unBind: function () {
    wx.request({
      url: app.globalData.gloUrl + 'allUsers/unbindInfo',
      data: {
        openId: this.data.openid,
        type: '0'
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('res.data.result:' + res.data.result)
        if (res.data.result == 'OK') {
          console.log('解绑成功')
          wx.reLaunch({
            url: '../getMsg/getMsg',
          })
        } else {
          console.log('暂未解绑成功，请重新解绑。')
        }
      }
    })
  },
  toEditMsg: function () { // 跳转到编辑个人信息
    // wx.navigateTo({
    //   url: '../stuMsg/stuMsg',
    // })
    wx.navigateTo({
      url: '../stuMsg1/stuMsg1',
    })
  },
  toSelPlay: function () {
    wx.navigateTo({
      url: '../plays/plays',
    })
  },
  toSeeStation: function () {
    wx.navigateTo({
      url: '../seledSta/seledSta',
    })
  },
  toOnDuty: function () {
    wx.navigateTo({
      url: '../onDuty/onDuty',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindTextTap: function () {
    wx.navigateTo({
      url: '../getMsg/getMsg'
    })
  },
  getOpenid: function () {
    var othis = this
    wx.login({
      success (res) {
        console.log(res)
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
            success: function (response) {
              console.log(response.data)
              othis.setData({
                openid: response.data.openid
              })
            }
          })
        } else {
          console.log('login fail')
        }
      }
    })
  },
  toProcess: function () {
    wx.navigateTo({
      url: '../process/process',
    })
  },
  getData: function () {
    var that = this;
    that.data.beforeStaList = []
    wx.request({
      url: app.globalData.gloUrl + 'examinee/getExamineeSignUpInfos',
      data: {
        "openId": this.data.openid
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('res.data.result:' + res.data.result)
        if (res.data.result == "OK") {
          for (var gd = 0; gd < res.data.infos.length; gd++) {
            if (res.data.infos[gd].tongguochushen == '1') {
              that.data.beforeStaList = that.data.beforeStaList.concat(res.data.infos[gd])
            }
          }
          console.log('that.data.beforeStaList:' + JSON.stringify(that.data.beforeStaList))
          that.setData({
            staList: that.data.beforeStaList
          })
          that.setData({
            imgList: res.data.infos
          })

          // if (res.data.infos.length != 0) {
          //   that.setData({
          //     boolCc: false
          //   })
          //   that.setData({
          //     staList: res.data.infos
          //   })
          //   console.log('listArr:' + JSON.stringify(that.data.listArr))
          // } else {
          //   // 暂无场次信息
          //   that.setData({
          //     boolCc: true
          //   })
          // }
        } else {
          console.log('nook')
          wx.showToast({
            title: res.data.message,
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
  },
  onLoad: function () {
    var othis = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        othis.data.openid = res.data;
      }
    })
    // 使用 Mock
    // API.ajax('', function (res) {
    //   //这里既可以获取模拟的res
    //   console.log("mockjs:" + JSON.stringify(res))
    //   // that.setData({
    //   //   list: res.data
    //   // })
    // });
  },
  onShow: function () {
    var othis = this
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        othis.data.openid = res.data;
        othis.getData()
      }
    })
    othis.getHeight()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
