// pages/stuMsg3/stuMsg3.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuMsgData: [
      {
        title: 'title',
        cont: '学历信息',
        val: ''
      }, {
        name: '本科毕业院校',
        type: 'input',
        eleName: 'biyeyuanxiao',
        val: ''
      }, {
        name: '本科专业',
        type: 'input',
        eleName: 'zhuanye',
        val: ''
      }, {
        name: '研究生毕业院校',
        type: 'input',
        eleName: 'biyeyuanxiao1',
        val: ''
      }, {
        name: '研究生专业',
        type: 'input',
        eleName: 'zhuanye1',
        val: ''
      }, {
        name: '最高学历',
        type: 'input',
        eleName: 'xueli',
        val: ''
      }, {
        name: '最高学位',
        type: 'input',
        eleName: 'xuewei',
        val: ''
      }, {
        name: '学分占比',
        type: 'input',
        eleName: 'xuefenzhanbi',
        val: ''
      }, {
        name: '学分绩点',
        type: 'input',
        eleName: 'xuefenjidian',
        val: ''
      }, {
        name: '院系排名',
        type: 'input',
        eleName: 'yuanxipaiming',
        val: ''
      }, {
        name: '院系人数',
        type: 'input',
        eleName: 'yuanxirenshu',
        val: ''
      }, {
        name: '奖惩情况',
        type: 'input',
        eleName: 'jiangchengqingkuang',
        val: ''
      }
    ],
    resData: {
      openId: '',
      details: {}
    },
    objOther: {},
    objKeys: {}
  },
  goBack: function () {
    wx.reLaunch({
      url: '../stuMsg2/stuMsg2?keyMsg=' + this.data.objKeys
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.data.resData.details = e.detail.value
    app.globalData.objSaveData3 = e.detail.value
    wx.reLaunch({
      url: '../stuMsg4/stuMsg4?schoolMsg=' + JSON.stringify(e.detail.value) + '&otherMsg=' + this.data.objOther + '&keyMsg=' + this.data.objKeys
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options.keyMsg:' + options.keyMsg + 'options.otherMsg:' + options.otherMsg)
    this.data.objOther = options.otherMsg
    this.data.objKeys = options.keyMsg
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
                    if (that.data.stuMsgData[n].eleName == 'xuefenzhanbi') {
                      that.data.stuMsgData[n].val = Number(res.data.detail[resKey]).toFixed(2)
                    } else {
                      that.data.stuMsgData[n].val = res.data.detail[resKey]
                    }
                    
                    console.log('resKey:' + resKey + '-----' + 'res.data.detail.resKey:' + res.data.detail[resKey])

                  }
                }
              }
              // for (var resKey1 in res.data.detail) {
              //   if (resKey1 == 'chushengriqi') {
              //     that.data.curSetDate_birth = that.getMyDate(res.data.detail[resKey1])
              //     that.setData({
              //       curSetDate_birth: that.getMyDate(res.data.detail[resKey1])
              //     })
              //   } else if (resKey1 == 'biyeshijian') {
              //     that.data.curSetDate_graduate = that.getMyDate(res.data.detail[resKey1])
              //     that.setData({
              //       curSetDate_graduate: that.getMyDate(res.data.detail[resKey1])
              //     })
              //   }
              // }
              console.log('that.data.stuMsgData:' + JSON.stringify(that.data.stuMsgData))
              that.setData({
                stuMsgData: that.data.stuMsgData
              })
              if (JSON.stringify(app.globalData.objSaveData3) != '{}') { // 保存上一次填写
                console.log('app.globalData.objSaveData3:-----------------' + JSON.stringify(app.globalData.objSaveData3))
                for (var saveIdx in app.globalData.objSaveData3) {
                  console.log('saveIdx:' + saveIdx)
                  for (var saveIdxIn = 0; saveIdxIn < that.data.stuMsgData.length; saveIdxIn++) {
                    if (that.data.stuMsgData[saveIdxIn].eleName == saveIdx) {
                      that.data.stuMsgData[saveIdxIn].val = app.globalData.objSaveData3[saveIdx]
                    }
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