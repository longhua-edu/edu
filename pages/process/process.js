// pages/process/process.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toEditMsg: function () { // 跳转到编辑个人信息
    wx.navigateTo({
      url: '../stuMsg/stuMsg',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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