// pages/msgList/msgList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [
      {
        src: '../../images/icon/personMsg/5.png',
        title: '性别',
        cont: '--'
      }, {
        src: '../../images/icon/personMsg/2.png',
        title: '民族',
        cont: '--'
      }, {
        src: '../../images/icon/personMsg/6.png',
        title: '出生日期',
        cont: '--'
      }, {
        src: '../../images/icon/personMsg/4.png',
        title: '手机号',
        cont: '--'
      }, {
        src: '../../images/icon/personMsg/3.png',
        title: '身份证号',
        cont: '--'
      }, {
        src: '../../images/icon/personMsg/4.png',
        title: 'qq号',
        cont: '--'
      }, {
        src: '../../images/icon/personMsg/1.png',
        title: '籍贯',
        cont: '--'
      }
    ],
    myName: '--'
  },
  getMyDate: function (str) {
    var oDate = new Date(str),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth() + 1,
      oDay = oDate.getDate(),
      oHour = oDate.getHours(),
      oMin = oDate.getMinutes(),
      oSen = oDate.getSeconds(),
      oTime = oYear + '-' + this.addZero(oMonth) + '-' + this.addZero(oDay)
    return oTime;
  },
  addZero: function (num) {
    if (parseInt(num) < 10) {
      num = '0' + num;
    }
    return num;
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
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        wx.request({
          url: app.globalData.gloUrl + 'allUsers/getBaseInfo',
          data: {
            "openId": res.data,
            "type": "0" //（如果是老师，这里填”1”）
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log('res.data.result:' + res.data.result)
            if (res.data.result == "OK") {
              that.data.myName = res.data.baseInfo.xingming
              that.data.userList[0].cont = res.data.baseInfo.xingbie
              that.data.userList[1].cont = res.data.baseInfo.minzhu
              that.data.userList[2].cont = res.data.baseInfo.chushengriqi
              that.data.userList[3].cont = res.data.baseInfo.dianhua
              that.data.userList[4].cont = res.data.baseInfo.shenfenzhenghao
              that.data.userList[5].cont = res.data.baseInfo.qqhao
              that.data.userList[6].cont = res.data.baseInfo.jiguan
              that.data.userList[2].cont = that.getMyDate(that.data.userList[2].cont)
              that.setData({
                userList: that.data.userList
              })
              that.setData({
                myName: that.data.myName
              })
            } else {
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
          },
          fail: function (err) {
            wx.showToast({
              title: err,
              icon: 'none',
              duration: 2000
            })
          }
        })
      },
      fail: function (errMsg) {
        wx.showToast({
          title: errMsg,
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