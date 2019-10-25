// pages/plays/plays.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    boolCc: false,
    listArr: [
      {
        name: '场次1',
        img: '../../images/icon/play.png'
      }, {
        name: '场次2',
        img: '../../images/icon/play.png'
      }, {
        name: '场次3',
        img: '../../images/icon/play.png'
      }, {
        name: '场次4',
        img: '../../images/icon/play.png'
      }
    ],
    gloOpenId: '',
    moredata: '上拉加载更多..'
  },
  buttonClick: function (e) {
    //点击事件点击之后 e.detail.type == 传入组件的text值
    console.log('hahaaha:' + e.detail.ccid);
    wx.request({
      url: app.globalData.gloUrl + 'teachers/saveDefaultArea',
      data: {
        "openId": this.data.gloOpenId,
        "changciId": e.detail.ccid
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('res.data.result:' + res.data.result)
        if (res.data.result == "OK") {
          console.log('保存默认场次成功')
          wx.navigateTo({
            url: '../teacherIndex/teacherIndex?playId=' + e.detail.ccid
          })
        } else {
          console.log('nook')
        }
      }
    })
    
    // switch (e.detail.type) {
    //   case '场次1':
    //     console.log('场次1')
    //     wx.navigateTo({
    //       url: '../station/station?playId=1'
    //     })
    //     break;
    //   case '场次2':
    //     console.log('场次2')
    //     wx.navigateTo({
    //       url: '../station/station?playId=2'
    //     })
    //     break;
    //   case '场次3':
    //     console.log('场次3')
    //     wx.navigateTo({
    //       url: '../station/station?playId=3'
    //     })
    //     break;
    //   default:
    //     console.log('其他场次')
    //     wx.navigateTo({
    //       url: '../station/station?playId=0'
    //     })
    //     //
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  unBind: function () {
    wx.request({
      url: app.globalData.gloUrl + 'allUsers/unbindInfo',
      data: {
        openId: this.data.gloOpenId,
        type: '1'
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
  onLoad: function (options) {
    var othis = this;
    this.data.listArr = []
    this.setData({
      listArr: []
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        othis.data.gloOpenId = res.data;
        console.log('openid:' + othis.data.gloOpenId)
      }
    })
    wx.request({
      url: app.globalData.gloUrl + 'teachers/getExamAreas',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('res.data.result:' + res.data.result)
        if (res.data.result == "OK") {
          if (res.data.areas.length != 0) {
            othis.setData({
              boolCc: false
            })
            othis.setData({
              listArr: res.data.areas
            })
            console.log('listArr:' + JSON.stringify(othis.data.listArr))
          } else {
            // 暂无场次信息
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
    // var that = this;
    // var timeoutF;
    // clearTimeout(timeoutF);
    // if (that.data.flag) {
    //   that.data.flag = false;
    //   wx.showLoading({
    //     title: '玩命加载中'
    //   })
    //   timeoutF = setTimeout(function () {
    //     var loadOnce = {
    //       name: '场次1',
    //       img: '../../images/icon/play.png'
    //     }
    //     that.data.listArr.push(loadOnce)
    //     that.setData({
    //       listArr: that.data.listArr
    //     })
    //     wx.hideLoading();
    //     that.data.flag = true
    //   }, 3000)
    // } else {
    //   return false;
    // }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})