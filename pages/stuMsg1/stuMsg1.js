// pages/stuMsg1/stuMsg1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuMsgData: [
      {
        title: 'title',
        cont: '请填写个人关键信息(必填)'
      }, {
        name: '姓名',
        type: 'input',
        eleName: 'xingming',
        mustFill: true,
        val: ''
      }, {
        name: '身份证号',
        type: 'input',
        eleName: 'shenfenzhenghao',
        mustFill: true,
        val: ''
      }, {
        name: '性别',
        type: 'radio',
        eleName: 'xingbie',
        items: [
          { name: '男', value: '男' },
          { name: '女', value: '女' }
        ],
        mustFill: true,
        val: ''
      }, {
        name: '民族',
        type: 'input',
        eleName: 'minzhu',
        mustFill: true,
        val: ''
      }, {
        name: '出生日期',
        type: 'date',
        eleName: 'chushengriqi',
        curSetDate: '',
        mustFill: true,
        val: ''
      }, {
        name: 'qq号',
        type: 'input',
        eleName: 'qqhao',
        mustFill: true,
        val: ''
      }, {
        name: '手机号码',
        type: 'input',
        eleName: 'dianhua',
        mustFill: true,
        val: ''
      }, {
        name: '生源地',
        type: 'input',
        eleName: 'shengyuandi',
        mustFill: true,
        val: ''
      }, {
        name: '籍贯',
        type: 'input',
        eleName: 'jiguan',
        mustFill: true,
        val: ''
      }, {
        name: '政治面貌',
        type: 'input',
        eleName: 'zhengzhimianmao',
        mustFill: true,
        val: ''
      }, {
        name: '毕业时间',
        type: 'date',
        eleName: 'biyeshijian',
        curSetDate: '',
        mustFill: true,
        val: ''
      }
    ],
    curSetDate_birth: '2019-10-01',
    curSetDate_graduate: '2019-10-01',
    resData: {
      openId: '',
      details: {}
    }
  },
  bindDateChange: function (e) {
    this.setData({
      curSetDate_birth: e.detail.value
    })
  },
  bindDateChange1: function (e) {
    this.setData({
      curSetDate_graduate: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.data.resData.details = e.detail.value
    if (e.detail.value.xingming.length != 0 && e.detail.value.shenfenzhenghao.length != 0 && e.detail.value.xingbie.length != 0 && e.detail.value.minzhu.length != 0 && e.detail.value.chushengriqi.length != 0 && e.detail.value.qqhao.length != 0 && e.detail.value.dianhua.length != 0 && e.detail.value.shengyuandi.length != 0 && e.detail.value.jiguan.length != 0 && e.detail.value.zhengzhimianmao.length != 0 && e.detail.value.biyeshijian.length != 0) {
      // wx.request({
      //   url: app.globalData.gloUrl + 'examinee/saveDetails',
      //   data: this.data.resData,
      //   method: 'POST',
      //   header: {
      //     'content-type': 'application/json'
      //   },
      //   success: function (res) {
      //     console.log('res.data.result:' + res.data.result)
      //     if (res.data.result == 'OK') {
      //       console.log('提交成功')
      //       wx.showToast({
      //         title: '提交成功',
      //         icon: 'none',
      //         duration: 2000, // 提示的延迟时间，单位毫秒，默认：1500
      //         mask: false
      //       })
      //     } else {
      //       console.log('暂未提交成功，请重新提交。')
      //       wx.showToast({
      //         title: '暂未提交成功，请重新提交。' + res.data.message,
      //         icon: 'none',
      //         duration: 2000, // 提示的延迟时间，单位毫秒，默认：1500
      //         mask: true
      //       })
      //     }
      //   }
      // })
      console.log("relunch----------------------------:" + JSON.stringify(e.detail.value))
      app.globalData.objSaveData1 = e.detail.value
      
      wx.reLaunch({
        url: '../stuMsg2/stuMsg2?keyMsg=' + JSON.stringify(e.detail.value)
      })
    } else {
      wx.showToast({
        title: '请完善个人信息',
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
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.data.resData.openId = res.data;
        wx.request({
          url: app.globalData.gloUrl + 'examinee/getExamineeDetails',
          data: {
            openId: that.data.resData.openId
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log('res.data.result:' + res.data.result)
            if (res.data.result == 'OK') {
              console.log('获取成功' + that.data.stuMsgData)
              // res.data.detail
              for (var n = 0; n < that.data.stuMsgData.length; n++) {
                for (var resKey in res.data.detail) {
                  if (that.data.stuMsgData[n].eleName == resKey) {
                    that.data.stuMsgData[n].val = res.data.detail[resKey]
                    console.log('resKey:' + resKey + '-----' + 'res.data.detail.resKey:' + res.data.detail[resKey])

                  }
                }
              }
              for (var resKey1 in res.data.detail) {
                if (resKey1 == 'chushengriqi') {
                  that.data.curSetDate_birth = that.getMyDate(res.data.detail[resKey1])
                  that.setData({
                    curSetDate_birth: that.getMyDate(res.data.detail[resKey1])
                  })
                } else if (resKey1 == 'biyeshijian') {
                  that.data.curSetDate_graduate = that.getMyDate(res.data.detail[resKey1])
                  that.setData({
                    curSetDate_graduate: that.getMyDate(res.data.detail[resKey1])
                  })
                }
              }
              console.log('that.data.stuMsgData:' + JSON.stringify(that.data.stuMsgData))
              that.setData({
                stuMsgData: that.data.stuMsgData
              })
              if (JSON.stringify(app.globalData.objSaveData1) != '{}') { // 保存上一次填写
                console.log('app.globalData.objSaveData1:-----------------' + JSON.stringify(app.globalData.objSaveData1))
                for (var saveIdx in app.globalData.objSaveData1) {
                  console.log('saveIdx:' + saveIdx)
                  for (var saveIdxIn = 0; saveIdxIn < that.data.stuMsgData.length; saveIdxIn++) {
                    if (that.data.stuMsgData[saveIdxIn].eleName == saveIdx) {
                      that.data.stuMsgData[saveIdxIn].val = app.globalData.objSaveData1[saveIdx]
                    }
                  }
                }

                for (var saveIdx1 in app.globalData.objSaveData1) {
                  if (saveIdx1 == 'chushengriqi') {
                    that.data.curSetDate_birth = that.getMyDate(app.globalData.objSaveData1[saveIdx1])
                    that.setData({
                      curSetDate_birth: that.getMyDate(app.globalData.objSaveData1[saveIdx1])
                    })
                  } else if (saveIdx1 == 'biyeshijian') {
                    that.data.curSetDate_graduate = that.getMyDate(app.globalData.objSaveData1[saveIdx1])
                    that.setData({
                      curSetDate_graduate: that.getMyDate(app.globalData.objSaveData1[saveIdx1])
                    })
                  }
                }

                that.setData({
                  stuMsgData: that.data.stuMsgData
                })
              }
            } else {
              console.log('暂未获取成功')
            }
          }
        })
        // wx.request({
        //   url: app.globalData.gloUrl + 'examinee/getImageInfos',
        //   data: {
        //     openId: that.data.resData.openId
        //   },
        //   header: {
        //     'content-type': 'application/json'
        //   },
        //   method: 'POST',
        //   success: function (res) {
        //     that.data.arrFilesUrls = []
        //     if (res.data.result == "OK") {
        //       for (var i = 0; i < res.data.imageInfos.length; i++) {
        //         that.data.arrFilesUrls.push(res.data.imageInfos[i].fileType)
        //       }
        //       for (var listIdx = 0; listIdx < that.data.arrFilesUrls.length; listIdx++) {
        //         (function (listIdx) {
        //           wx.request({
        //             url: app.globalData.gloUrl + 'examinee/downloadImage',
        //             data: {
        //               openId: that.data.resData.openId,
        //               fileType: that.data.arrFilesUrls[listIdx]
        //             },
        //             method: 'POST',
        //             responseType: 'arraybuffer',
        //             success: function (res) {
        //               if (res.statusCode == 200) {
        //                 console.log(res)
        //                 if (that.data.arrFilesUrls[listIdx] == 'zhaopian') {
        //                   that.setData({
        //                     filesUrlsZhaopian: wx.arrayBufferToBase64(res.data)
        //                   })
        //                 } else if (that.data.arrFilesUrls[listIdx] == 'chengjidan') {
        //                   that.setData({
        //                     filesUrlsChengjidan: wx.arrayBufferToBase64(res.data)
        //                   })
        //                   that.data.getImgLen += 1;
        //                 } else if (that.data.arrFilesUrls[listIdx] == 'jiangxuejinzhengshu') {
        //                   that.setData({
        //                     filesUrlsJiangxuejinzhengshu: wx.arrayBufferToBase64(res.data)
        //                   })
        //                   that.data.getImgLen += 1;
        //                 } else if (that.data.arrFilesUrls[listIdx] == 'waiyuzhengshu') {
        //                   that.setData({
        //                     filesUrlsWaiyuzhengshu: wx.arrayBufferToBase64(res.data)
        //                   })
        //                   that.data.getImgLen += 1;
        //                 } else if (that.data.arrFilesUrls[listIdx] == 'qitazhengshu') {
        //                   that.setData({
        //                     filesUrlsQitazhengshu: wx.arrayBufferToBase64(res.data)
        //                   })
        //                   that.data.getImgLen += 1;
        //                 } else if (that.data.arrFilesUrls[listIdx] == 'zm_jiaoshizigezheng') {
        //                   that.setData({
        //                     filesUrlsZm_jiaoshizigezheng: wx.arrayBufferToBase64(res.data)
        //                   })
        //                   that.data.getImgLen += 1;
        //                 } else if (that.data.arrFilesUrls[listIdx] == 'zm_shenghuozhao') {
        //                   that.setData({
        //                     filesUrlsZm_shenghuozhao: wx.arrayBufferToBase64(res.data)
        //                   })
        //                   that.data.getImgLen += 1;
        //                 } else if (that.data.arrFilesUrls[listIdx] == 'zm_shenfenzheng') {
        //                   that.setData({
        //                     filesUrlsZm_shenfenzheng: wx.arrayBufferToBase64(res.data)
        //                   })
        //                   that.data.getImgLen += 1;
        //                 } else if (that.data.arrFilesUrls[listIdx] == 'zm_biyezheng') {
        //                   that.setData({
        //                     filesUrlsZm_biyezheng: wx.arrayBufferToBase64(res.data)
        //                   })
        //                   that.data.getImgLen += 1;
        //                 } else if (that.data.arrFilesUrls[listIdx] == 'zm_xueweizheng') {
        //                   that.setData({
        //                     filesUrlsZm_xueweizheng: wx.arrayBufferToBase64(res.data)
        //                   })
        //                   that.data.getImgLen += 1;
        //                 }
        //               }
        //               that.setData({
        //                 getImgLen: that.data.getImgLen
        //               })
        //               console.log('that.data.getImgLen:' + that.data.getImgLen)
        //             }
        //           })
        //         })(listIdx)

        //       }
        //     }
        //   }
        // })

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