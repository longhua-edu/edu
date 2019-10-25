// pages/onDuty/onDuty.js
var QRCode = require('../../utils/weapp-qrcode.js');
var qrcode;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
    text: '111',
    image: '',
    saveData: {
      openid: ''
    },
    openId: '',
    istrue: false
  },
  openDialog: function () {
    this.setData({
      istrue: true
    })
  },
  closeDialog: function () {
    this.setData({
      istrue: false
    })
  },
  getScancode: function () {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        var arrRes = res.result.split(",")
        // _this.setData({
        //   result: result
        // })
        wx.request({
          url: app.globalData.gloUrl + 'examinee/register',
          data: {
            "openId": _this.data.openId,
            "changciId": arrRes[1],
            "expireTime": arrRes[2]
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
      }
    })
  },
  tapHandler: function () {
    // 传入字符串生成qrcode
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        // console.log('getData_storage:' + res.data)
        // that.setData({
        //   saveData.openid：res.data
        // })
        that.data.saveData.openid = res.data;
        console.log('that.saveData:' + JSON.stringify(that.data.saveData))
        qrcode.makeCode(that.data.saveData.openid)
        that.openDialog()
      }
    })
    // console.log(that.data.saveData.openid)
    // qrcode.makeCode(this.data.text)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.data.openId
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.data.openId = res.data;
      }
    })
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: "",
      width: 250,
      height: 250,
      colorDark: "#13227a",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
    // this.tapHandler()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})