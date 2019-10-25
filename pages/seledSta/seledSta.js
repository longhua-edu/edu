// pages/seledSta/seledSta.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    staList: [
      {
        baseInfoId: '岗位2',
        changciID: '场次1',
        tongguochushen: '0',
        lineid: 'cc1'
      }, {
        baseInfoId: '岗位3',
        changciID: '场次4',
        tongguochushen: '1',
        lineid: 'cc4'
      }, {
        baseInfoId: '岗位4',
        changciID: '场次5',
        tongguochushen: '2',
        lineid: 'cc5'
      }
    ],
    getOpenId: '',
    boolCc: false
  },
  // confirmSelSatAll: function () {
  //   var that = this;
  //   console.log(that.data.flag)
  //   if (that.data.flag) {
  //     //that.data.flag = false
  //     that.setData({
  //       flag: false
  //     })
  //     wx.showToast({
  //       title: '岗位信息已提交',
  //       icon: 'success',
  //       duration: 2000, // 提示的延迟时间，单位毫秒，默认：1500
  //       mask: false, // 是否显示透明蒙层，防止触摸穿透，默认：false
  //       success: function () {
  //         console.log('success')
  //       },
  //       fail: function () {
  //         console.log('fail')
  //       },
  //       complete: function () {
  //         console.log('complete')
  //         setTimeout(function () {
  //           wx.reLaunch({
  //             url: '../index/index',
  //           })
  //         }, 2000)
  //       }
  //     })
  //   } else {
  //   }
  // },
  popConfirm: function () {
    wx.showModal({
      title: '删除',
      content: '确认要删除该项吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确认回调')
        } else {
          console.log('点击取消回调')
        }
      }
    })
  },
  updateStation: function (e) {
    if (e.currentTarget.dataset.tongguochushen == 1) {
      
      wx.showToast({
        title: '审核通过，不能修改噢。',
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
    } else {
      wx.navigateTo({
        url: '../station/station?playId=' + e.currentTarget.dataset.changciid + '&gangweiID=' + e.currentTarget.dataset.gangweiid,
      })
    }
    
  },
  delThis: function (e) {
    var othis = this;
    console.log(e)
    wx.showModal({
      title: '删除',
      content: '确认要删除该项吗？',
      success: function (res) {
        if (res.confirm) {
          var len = othis.data.staList.length;
          for (var i = 0; i < len; i++) {
            if (othis.data.staList[i].lineid == e.currentTarget.dataset.lineid) {
              othis.data.staList.splice(i, 1);
              console.log(othis.data.staList)
              othis.setData({
                staList: othis.data.staList
              })
            }
          }
        } else {
          console.log('点击取消回调')
        }
      }
    })
    
  },
  getData: function () {
    var that = this;
    wx.request({
      url: app.globalData.gloUrl + 'examinee/getExamineeSignUpInfos',
      data: {
        "openId": that.data.getOpenId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('res.data.result:' + res.data.result)
        if (res.data.result == "OK") {
          that.setData({
            staList: res.data.infos
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
      },
      fail: function (errMsg) {
        wx.showToast({
          title: errMsg,
          icon: 'none',
          duration: 2000, // 提示的延迟时间，单位毫秒，默认：1500
          mask: true, // 是否显示透明蒙层，防止触摸穿透，默认：false
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        // console.log('getData_storage:' + res.data)
        // that.setData({
        //   saveData.openid：res.data
        // })
        that.data.getOpenId = res.data
        that.getData()
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