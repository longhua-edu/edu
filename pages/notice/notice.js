// pages/notice/notice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: [
      {
        "content": "1温馨提示：北京考点网络预报名时间截至11月5日下午4点；长春考点网络预报名时间截至11月9日下午4点；重庆考点网络预报名时间截至11月13日4点。",
        "edittime": 1509753264000,
        "id": 10,
        "isNew": 0
      }, {
        "content": "2各位考生，龙华区教育系统赴外招聘（北京考点）资格审查现场，由原“北京师范大学邱季端体育馆”改为“北京师范大学就业指导中心学十六楼南侧140会议室”，请相互转告。",
        "edittime": 1521707657000,
        "id": 19,
        "isNew": 0
      }, {
        "content": "3考生你好！深圳市龙华区2019年8月购买服务测试已开通，测试时间：8月24-25日23:59，测试链接：https://ks.wjx.top/jq/40005251.aspx，请及时在线上完成测试，谢谢！",
        "edittime": 1561603228000,
        "id": 23,
        "isNew": 0
      }
    ],
    btns: ["面试招聘", "通知公告", "工作动态"],
    cons: [
      {
        title: '1',
        arrList: []
      },
      {
        title: '2',
        arrList: [
          {
            tit: 'tit',
            content: '1温馨提示：北京考点网络预报名时间截至11月5日下午4点；长春考点网络预报名时间截至11月9日下午4点；重庆考点网络预报名时间截至11月13日4点。',
            edittime: '2019-10-01'
          }, {
            tit: 'tit2',
            content: '2各位考生，龙华区教育系统赴外招聘（北京考点）资格审查现场，由原“北京师范大学邱季端体育馆”改为“北京师范大学就业指导中心学十六楼南侧140会议室”，请相互转告。',
            edittime: '2019-10-01'
          }, {
            tit: 'tit3',
            content: '2各位考生，龙华区教育系统赴外招聘（北京考点）资格审查现场，由原“北京师范大学邱季端体育馆”改为“北京师范大学就业指导中心学十六楼南侧140会议室”，请相互转告。2各位考生，龙华区教育系统赴外招聘（北京考点）资格审查现场，由原“北京师范大学邱季端体育馆”改为“北京师范大学就业指导中心学十六楼南侧140会议室”，请相互转告。2各位考生，龙华区教育系统赴外招聘（北京考点）资格审查现场，由原“北京师范大学邱季端体育馆”改为“北京师范大学就业指导中心学十六楼南侧140会议室”，请相互转告。',
            edittime: '2019-10-01'
          }
        ]
      },
      {
        title: '3',
        arrList: []
      }
    ],
    active: 0
  },
  toggle: function (e) {
    //console.log(e.currentTarget.dataset.index)
    this.setData({
      //设置active的值为用户点击按钮的索引值
      active: e.currentTarget.dataset.index,
    })
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
          url: app.globalData.gloUrl + 'examinee/getAllAnnounces',
          data: {
            "openId": res.data
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log('res.data.result:' + res.data.result)
            if (res.data.result == "OK") {
              if (res.data.announces.length == 0) {
                // that.data.notice
                that.setData({
                  notice: res.data.announces
                })
                that.data.cons[1].arrList = res.data.announces
                that.setData({
                  cons: that.data.cons
                })
              } else {
                that.setData({
                  notice: res.data.announces
                })
                for (var annIdx = 0; annIdx < res.data.announces.length; annIdx++) {
                  // edittime
                  res.data.announces[annIdx].edittime = that.getMyDate(res.data.announces[annIdx].edittime)
                }
                that.data.cons[1].arrList = res.data.announces
                that.setData({
                  cons: that.data.cons
                })
              }
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