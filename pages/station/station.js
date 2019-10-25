// pages/station/station.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    flag: true,
    stationItems: [
      { bianhao: '1', mingcheng: '岗位1', tips: false },
      { bianhao: '2', mingcheng: '岗位2', tips: false },
      { bianhao: '3', mingcheng: '岗位3', tips: false },
      { bianhao: '4', mingcheng: '岗位4', tips: false },
      { bianhao: '5', mingcheng: '岗位5', tips: false },
      { bianhao: '6', mingcheng: '岗位6', tips: false },
      { bianhao: '1', mingcheng: '岗位1', tips: false },
      { bianhao: '2', mingcheng: '岗位2', tips: false, checked: 'true' },
      { bianhao: '3', mingcheng: '岗位3', tips: false },
      { bianhao: '4', mingcheng: '岗位4', tips: false },
      { bianhao: '5', mingcheng: '岗位5', tips: false },
      { bianhao: '6', mingcheng: '岗位6', tips: false },
      { bianhao: '1', mingcheng: '岗位1', tips: false },
      { bianhao: '2', mingcheng: '岗位2', tips: false },
      { bianhao: '3', mingcheng: '岗位3', tips: false },
      { bianhao: '4', mingcheng: '岗位4', tips: false },
      { bianhao: '5', mingcheng: '岗位5', tips: false },
      { bianhao: '6', mingcheng: '岗位6', tips: false },
      { bianhao: '1', mingcheng: '岗位1', tips: false },
      { bianhao: '2', mingcheng: '岗位2', tips: false },
      { bianhao: '3', mingcheng: '岗位3', tips: false },
      { bianhao: '4', mingcheng: '岗位4', tips: false },
      { bianhao: '5', mingcheng: '岗位5', tips: false },
      { bianhao: '6', mingcheng: '岗位6', tips: false }
    ],
    boolCc: false,
    seled: '',
    selId: '',
    oldSelId: '',
    isUpdate: false,
    curY: 0,
    curInpVal: ''
  },
  searchVal0: function (e) {
    this.setData({
      curInpVal: e.detail.value
    })
  },
  searchVal: function (e) {
    var othis = this
    for (var j = 0; j < othis.data.stationItems.length; j++) {
      othis.data.stationItems[j].tips = false
    }
    if (othis.data.curInpVal.length != 0) {
      for (var i = 0; i < othis.data.stationItems.length; i++) {
        (function (i) {
          if (othis.data.stationItems[i].mingcheng.indexOf(othis.data.curInpVal) !== -1) {
            // othis.data.stationItems[i]
            othis.data.stationItems[i].tips = true
            othis.setData({
              stationItems: othis.data.stationItems
            })
            othis.setData({
              curY: i * 40
            })
            
          }
        })(i)
      }
      wx.pageScrollTo({
        scrollTop: othis.data.curY,
        duration: 400
      });
    }
    
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e)
    this.data.seled = e.detail.value
    for (var staIdx = 0; staIdx < this.data.stationItems.length; staIdx++) {
      if (this.data.stationItems[staIdx].mingcheng == e.detail.value) {
        this.data.selId = this.data.stationItems[staIdx].id
      }
    }
  },
  submitSelSta: function () {
    var that = this
    wx.request({
      url: app.globalData.gloUrl + 'examinee/saveSignInfo',
      data: {
        openId: this.data.openId,
        stationId: this.data.selId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('res.data.result:' + res.data.result)
        if (res.data.result == 'OK') {
          console.log('提交成功')
          wx.showToast({
            title: '岗位信息已提交',
            icon: 'success',
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
              setTimeout(function () {
                wx.reLaunch({
                  url: '../index/index',
                })
              }, 2000)
            }
          })
        } else {
          console.log(res.data.message)
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000, // 提示的延迟时间，单位毫秒，默认：1500
            mask: false
          })
          that.setData({
            flag: true
          })
        }
      }
    })
  },
  submitUpdateSta: function () {
    var that = this
    wx.request({
      url: app.globalData.gloUrl + 'examinee/updateSignUpStation',
      data: {
        openId: this.data.openId,
        oldStationId: this.data.oldSelId,
        newStationId: this.data.selId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('res.data.result:' + res.data.result)
        if (res.data.result == 'OK') {
          console.log('修改成功')
          wx.showToast({
            title: '岗位信息已修改',
            icon: 'success',
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
              setTimeout(function () {
                wx.reLaunch({
                  url: '../index/index',
                })
              }, 2000)
            }
          })
        } else {
          console.log(res.data.message)
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000, // 提示的延迟时间，单位毫秒，默认：1500
            mask: false
          })
          that.setData({
            flag: true
          })
        }
      }
    })
  },
  openConfirm: function () {
    var that = this
    wx.showModal({
      title: '已选岗位',
      content: this.data.seled,
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          if (that.data.isUpdate) {
            that.submitUpdateSta()
          } else {
            that.submitSelSta()
          }
          
        } else {
          console.log('用户点击取消')
          that.setData({
            flag: true
          })
        }
      }
    });
  },
  confirmSelSat: function () {
    var that = this;
    console.log(that.data.flag)
    if (that.data.flag) {
      //that.data.flag = false
      that.setData({
        flag: false
      })
      if (that.data.seled.length == 0) { // 判断是否有选择岗位
        wx.showToast({
          title: '请选择一个岗位',
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
            that.setData({
              flag: true
            })
          }
        })
      } else {
        that.openConfirm()
      }
    } else {
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var othis = this;
    // this.setData({
    //   stationItems: []
    // })
    console.log('options:' + JSON.stringify(options))
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        othis.data.openId = res.data
        wx.request({
          url: app.globalData.gloUrl + 'examinee/getStations',
          data: {
            'openId': othis.data.openId,
            'changciID': options.playId
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log('res.data.result:' + res.data.result)
            if (res.data.result == "OK") {
              if (res.data.stations.length != 0) {
                othis.setData({
                  boolCc: false
                })
                othis.setData({
                  stationItems: res.data.stations
                })
                for (var checkedIdx = 0; checkedIdx < othis.data.stationItems.length; checkedIdx++) {
                  if (othis.data.stationItems[checkedIdx].checked == 'true') {
                    othis.data.seled = othis.data.stationItems[checkedIdx].mingcheng
                    othis.data.selId = othis.data.stationItems[checkedIdx].id
                    othis.data.isUpdate = true;
                    othis.data.oldSelId = othis.data.stationItems[checkedIdx].id
                  } else {
                    delete othis.data.stationItems[checkedIdx].checked
                  }
                  if (othis.data.stationItems[checkedIdx].id == options.gangweiID) {
                    othis.data.stationItems[checkedIdx].checked = 'true'
                    othis.data.seled = othis.data.stationItems[checkedIdx].mingcheng
                    othis.data.selId = othis.data.stationItems[checkedIdx].id
                    othis.data.isUpdate = true;
                    othis.data.oldSelId = othis.data.stationItems[checkedIdx].id
                  }

                }
                othis.setData({
                  stationItems: othis.data.stationItems
                })
              } else {
                // 暂无岗位信息
                othis.setData({
                  boolCc: true
                })
              }
            } else {
              console.log('nook')
            }
          }
        })
      },
      fail: function (errMsg) {
        wx.showToast({
          title: errMsg,
          icon: 'none',
          duration: 2000, // 提示的延迟时间，单位毫秒，默认：1500
          mask: false
        })
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