//index.js
//获取应用实例
var QRCode = require('../../utils/weapp-qrcode.js');
var qrcode;
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    result: '',
    text: '111',
    image: '',
    saveData: {
      openId: '',
      changciId: '',
      expireTime: ''
    },
    openId: '',
    timeInterval: ''
  },
  getScancode: function () {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        // _this.setData({
        //   result: result
        // })
        wx.request({
          url: app.globalData.gloUrl + 'teacher/registerByTeacher',
          data: {
            "openId": _this.data.openId,
            "examinee_openId": result
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log('res.data.result:' + res.data.result)
            if (res.data.result == "OK") {
              _this.setData({
                result: "等待人数：" + res.data.registeration.dengdairenshu + "顺序号：" + res.data.registeration.paixu
              })
            } else {
              console.log('nook')
            }
          }
        })
      }
    })
  },
  getStorageGlobalData: function (changciId) {
    var that = this;
    var date = new Date();//实例一个时间对象；
    var year = date.getFullYear();//获取系统的年；
    var month = date.getMonth() + 1;//获取系统月份，由于月份是从0开始计算，所以要加1
    var day = date.getDate(); // 获取系统日
    var hour = date.getHours();//获取系统时间
    var minute = date.getMinutes(); //分
    var second = date.getSeconds();//秒
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.data.openId = res.data;
        that.data.saveData.openId = res.data;
        qrcode.makeCode(that.data.saveData.openId + ',' + changciId + ',' + year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second)
      }
    })
  },
  tapHandler: function () {
    // 传入字符串生成qrcode
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.data.openId = res.data;
        that.data.saveData.openId = res.data;
        that.getDefData(res.data)
        clearInterval(that.data.timeInterval)
        that.data.timeInterval = setInterval(function () {
          that.getDefData(res.data)
        }, 20000)
      }
    })
    // console.log(that.data.saveData.openId)
    // qrcode.makeCode(this.data.text)
  },
  getDefData: function (openId) {
    var that = this;
    wx.request({
      url: app.globalData.gloUrl + 'teachers/getDefaultArea',
      data: {
        "openId": openId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('res.data.result:' + res.data.result)
        if (res.data.result == "OK") {
          that.data.saveData.changciId = res.data.changciId
          that.data.saveData.expireTime = res.data.expireTime
          console.log('saveData:' + JSON.stringify(that.data.saveData))
          qrcode.makeCode(that.data.saveData.openId + ',' + that.data.saveData.changciId + ',' + that.data.saveData.expireTime)
        } else {
          console.log('nook')
        }
      }
    })
  },
  saveDefData: function (openId, changciId) {
    wx.request({
      url: app.globalData.gloUrl + 'teachers/saveDefaultArea',
      data: {
        "openId": openId,
        "changciId": changciId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('res.data.result:' + res.data.result)
        if (res.data.result == "OK") {
          console.log('saveDefDataok')
        } else {
          console.log('nook')
        }
      }
    })
  },
  save: function () {
    console.log('save')
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          qrcode.exportImage(function (path) {
            wx.saveImageToPhotosAlbum({
              filePath: path,
            })
          })
        }
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toMsg: function () {
    wx.navigateTo({
      url: '../getMsg/getMsg'
    })
  },
  selPlays: function () {
    clearInterval(this.data.timeInterval)
    wx.navigateTo({
      url: '../teacherPlays/teacherPlays'
    })
  },
  onLoad: function (options) {
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
    console.log(options)
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: '',
      width: 250,
      height: 250,
      colorDark: "#13227a",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
    // if (JSON.stringify(options) == '{}') {
    //   //this.tapHandler()
    // } else {
    //   //this.getStorageGlobalData(options.playId)
      
    // }
    
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
