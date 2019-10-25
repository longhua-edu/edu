// pages/stuMsg2/stuMsg2.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pthArray: ['一甲', '一乙', '二甲', '二乙', '三甲', '三乙', '无'],
    pthIndex: 0,
    pthIndexText: '一甲',
    stuMsgData: [
      {
        title: 'title',
        cont: '其他信息'
      }, {
        name: '英语级别',
        type: 'input',
        eleName: 'yingyudengji',
        val: ''
      }, {
        name: '是否有教师资格证',
        type: 'radio',
        eleName: 'jiaoshizige',
        items: [
          { name: '是', value: '是' },
          { name: '否', value: '否' }
        ],
        val: ''
      }, {
        name: '是否已签协议',
        type: 'radio',
        eleName: 'yiqianxieyi',
        items: [
          { name: '是', value: '是' },
          { name: '否', value: '否' }
        ],
        val: ''
      }, {
        name: '普通话证等级',
        type: 'select',
        eleName: 'putonghuadengji',
        val: ''
      }, {
        name: '身高',
        type: 'input',
        eleName: 'shengao',
        val: ''
      }, {
        name: '体重',
        type: 'input',
        eleName: 'tizhong',
        val: ''
      }, {
        name: '爱好特长',
        type: 'input',
        eleName: 'aihaotechang',
        val: ''
      }, {
        name: '奖学金情况',
        type: 'input',
        eleName: 'jiangchengqingkuang',
        val: ''
      }
    ],
    resData: {
      openId: '',
      details: {}
    },
    objKey: {}
  },
  bindPickerChange: function (e) {
    this.setData({
      pthIndex: e.detail.value
    })
    this.setData({
      pthIndexText: this.data.pthArray[e.detail.value]
    })
  },
  goBack: function () {
    wx.reLaunch({
      url: '../stuMsg1/stuMsg1'
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.data.resData.details = e.detail.value
    app.globalData.objSaveData2 = e.detail.value
    wx.reLaunch({
      url: '../stuMsg3/stuMsg3?otherMsg=' + JSON.stringify(e.detail.value) + '&keyMsg=' + this.data.objKey
    })
    
    // this.imgUpload()
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
    console.log('options:' + options.keyMsg)
    this.data.objKey = options.keyMsg
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
                if (resKey1 == 'putonghuadengji') {
                  var curSel = 0
                  if (res.data.detail[resKey1] == '一甲' || res.data.detail[resKey1].indexOf('一甲') != -1) {
                    curSel = 0
                  } else if (res.data.detail[resKey1] == '一乙' || res.data.detail[resKey1].indexOf('一乙') != -1) {
                    curSel = 1
                  } else if (res.data.detail[resKey1] == '二甲' || res.data.detail[resKey1].indexOf('二甲') != -1) {
                    curSel = 2
                  } else if (res.data.detail[resKey1] == '二乙' || res.data.detail[resKey1].indexOf('二乙') != -1) {
                    curSel = 3
                  } else if (res.data.detail[resKey1] == '三甲' || res.data.detail[resKey1].indexOf('三甲') != -1) {
                    curSel = 4
                  } else if (res.data.detail[resKey1] == '三乙' || res.data.detail[resKey1].indexOf('三乙') != -1) {
                    curSel = 5
                  } else if (res.data.detail[resKey1] == '无' || res.data.detail[resKey1].indexOf('无') != -1) {
                    curSel = 6
                  }
                  
                  that.setData({
                    pthIndex: curSel
                  })
                  // that.data.pthIndexText = res.data.detail[resKey1]
                  that.setData({
                    pthIndexText: that.data.pthArray[curSel]
                  })
                }
              }
              
              console.log('that.data.stuMsgData:' + JSON.stringify(that.data.stuMsgData))
              that.setData({
                stuMsgData: that.data.stuMsgData
              })
              if (JSON.stringify(app.globalData.objSaveData2) != '{}') { // 保存上一次填写
                console.log('app.globalData.objSaveData2:-----------------' + JSON.stringify(app.globalData.objSaveData2))
                for (var saveIdx in app.globalData.objSaveData2) {
                  console.log('saveIdx:' + saveIdx)
                  for (var saveIdxIn = 0; saveIdxIn < that.data.stuMsgData.length; saveIdxIn++) {
                    if (that.data.stuMsgData[saveIdxIn].eleName == saveIdx) {
                      that.data.stuMsgData[saveIdxIn].val = app.globalData.objSaveData2[saveIdx]
                    }
                  }
                }

                for (var saveIdx1 in app.globalData.objSaveData2) {
                  if (saveIdx1 == 'putonghuadengji') {
                    var curSel1 = 0
                    if (app.globalData.objSaveData2[saveIdx1] == '一甲' || app.globalData.objSaveData2[saveIdx1].indexOf('一甲') != -1) {
                      curSel1 = 0
                    } else if (app.globalData.objSaveData2[saveIdx1] == '一乙' || app.globalData.objSaveData2[saveIdx1].indexOf('一乙') != -1) {
                      curSel1 = 1
                    } else if (app.globalData.objSaveData2[saveIdx1] == '二甲' || app.globalData.objSaveData2[saveIdx1].indexOf('二甲') != -1) {
                      curSel1 = 2
                    } else if (app.globalData.objSaveData2[saveIdx1] == '二乙' || app.globalData.objSaveData2[saveIdx1].indexOf('二乙') != -1) {
                      curSel1 = 3
                    } else if (app.globalData.objSaveData2[saveIdx1] == '三甲' || app.globalData.objSaveData2[saveIdx1].indexOf('三甲') != -1) {
                      curSel1 = 4
                    } else if (app.globalData.objSaveData2[saveIdx1] == '三乙' || app.globalData.objSaveData2[saveIdx1].indexOf('三乙') != -1) {
                      curSel1 = 5
                    } else if (app.globalData.objSaveData2[saveIdx1] == '无' || app.globalData.objSaveData2[saveIdx1].indexOf('无') != -1) {
                      curSel1 = 6
                    }

                    that.setData({
                      pthIndex: curSel1
                    })
                    // that.data.pthIndexText = res.data.detail[resKey1]
                    that.setData({
                      pthIndexText: that.data.pthArray[curSel1]
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