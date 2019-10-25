// pages/handle/handle.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: ''
  },
  unBind: function () {
    var that = this;
    wx.showModal({
      title: '解绑',
      content: '确定要解绑吗',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: app.globalData.gloUrl + 'allUsers/unbindInfo',
            data: {
              openId: that.data.openid,
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
        } else {
          console.log('用户点击取消')
          
        }
      }
    });
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var othis = this
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        othis.data.openid = res.data;
      }
    })
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
    var othis = this
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        othis.data.openid = res.data;
      }
    })
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