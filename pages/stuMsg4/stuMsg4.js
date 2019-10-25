// pages/stuMsg4/stuMsg4.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrList: [
      // {
      //   jianli1_shijian: '2019',
      //   jianli1_xuexi: 'xxx',
      //   jianli1_zhiwu: 'qqq'
      // }, {
      //   jianli2_shijian: '2020',
      //   jianli2_xuexi: 'xxx',
      //   jianli2_zhiwu: 'qqq'
      // }, {
      //   jianli3_shijian: '2021',
      //   jianli3_xuexi: 'xxx',
      //   jianli3_zhiwu: 'qqq'
      // }
    ],
    istrue: false,
    time: '1',
    depart: '2',
    work: '3',
    objSchool: {},
    objOther: {},
    objKeys: {},
    objExpMeg: {},
    resData: {
      openId: '',
      details: {}
    },
    expLen: 0
  },
  openDialog: function () {
    this.setData({
      istrue: true
    })
  },
  closeDialog: function () {
    this.setData({
      istrue: false
    })
  },
  confirmDia: function () {
    this.data.expLen = this.data.arrList.length
    // var obj = {
    //   a1: this.data.time,
    //   a2: this.data.depart,
    //   a3: this.data.work
    // }
    this.data.expLen += 1
    var obj = {}
    obj['jianli' + this.data.expLen + '_shijian'] = this.data.time,
    obj['jianli' + this.data.expLen + '_xuexi'] = this.data.depart
    obj['jianli' + this.data.expLen + '_zhiwu'] = this.data.work
    this.data.arrList.push(obj)
    this.setData({
      arrList: this.data.arrList
    })
    this.setData({
      istrue: false
    })
    console.log('arrList: ' + JSON.stringify(this.data.arrList))
  },
  goBack: function () {
    wx.reLaunch({
      url: '../stuMsg3/stuMsg3?otherMsg=' + this.data.objOther + '&keyMsg=' + this.data.objKeys
    })
  },
  confirmSubmit: function (e) {
    var that = this
    var newObjArrList1 = {}
    console.log('relunch-------------------------：' + JSON.stringify(this.data.arrList))
    for (var i = 0; i < this.data.arrList.length; i++) {
      Object.assign(newObjArrList1, this.data.arrList[i])
    }
    console.log('newObjArrList1:' + JSON.stringify(newObjArrList1))
    this.data.objExpMeg = newObjArrList1
    this.data.resData.details = Object.assign(JSON.parse(this.data.objSchool), JSON.parse(this.data.objOther), JSON.parse(this.data.objKeys), this.data.objExpMeg)
    console.log('resData.details:' + JSON.stringify(this.data.resData.details))
    wx.request({
      url: app.globalData.gloUrl + 'examinee/saveDetails',
      data: this.data.resData,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('res.data.result:' + res.data.result)
        if (res.data.result == 'OK') {
          console.log('提交成功')
          wx.showToast({
            title: '提交成功',
            icon: 'none',
            duration: 2000, // 提示的延迟时间，单位毫秒，默认：1500
            mask: false,
            complete: function () {
              console.log('complete')
              // wx.reLaunch({
              //   url: '../index/index'
              // })
              that.goNext()
            }
          })
        } else {
          console.log('暂未提交成功，请重新提交。')
          wx.showToast({
            title: '暂未提交成功，请重新提交。' + res.data.message,
            icon: 'none',
            duration: 2000, // 提示的延迟时间，单位毫秒，默认：1500
            mask: true
          })
        }
      }
    })

  },
  goNext: function () {
    var newObjArrList = {}
    console.log('relunch-------------------------：' + JSON.stringify(this.data.arrList))
    for (var i = 0; i < this.data.arrList.length; i++) {
      Object.assign(newObjArrList, this.data.arrList[i])
    }
    console.log('newObjArrList:' + JSON.stringify(newObjArrList))
    wx.reLaunch({
      url: '../stuMsg5/stuMsg5?schoolMsg=' + this.data.objSchool + '&otherMsg=' + this.data.objOther + '&keyMsg=' + this.data.objKeys + '&expMeg=' + JSON.stringify(newObjArrList)
    })
  },
  changeTime: function (e) {
    console.log(e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  changeDepart: function (e) {
    this.setData({
      depart: e.detail.value
    })
  },
  changeWork: function (e) {
    this.setData({
      work: e.detail.value
    })
  },
  hanAdd: function () {
    this.setData({
      time: ''
    })
    this.setData({
      depart: ''
    })
    this.setData({
      work: ''
    })
    this.openDialog()
    
  },
  hanMinus: function (e) {
    this.data.expLen = this.data.arrList.length
    
    var cntIndex = parseInt(e.currentTarget.dataset.index);
    console.log('当前行标：' + cntIndex)
    if (this.data.arrList.length <= 1) {

    } else {
      this.data.expLen -= 1
      for (var i = 0; i < this.data.arrList.length; i++) {
        if (cntIndex == i) {
          this.data.arrList.splice(i, 1);
          this.data.arrList = this.data.arrList
          this.setData({
            arrList: this.data.arrList
          })
          console.log(this.data.arrList)
        } else {

        }
      }
      for (var hanIdx = 0; hanIdx < this.data.arrList.length; hanIdx++) {
        if (hanIdx < cntIndex) {
          this.data.arrList[hanIdx]['jianli' + (hanIdx + 1) + '_shijian'] = this.data.arrList[hanIdx]['jianli' + (hanIdx + 1) + '_shijian']
          this.data.arrList[hanIdx]['jianli' + (hanIdx + 1) + '_xuexi'] = this.data.arrList[hanIdx]['jianli' + (hanIdx + 1) + '_xuexi']
          this.data.arrList[hanIdx]['jianli' + (hanIdx + 1) + '_zhiwu'] = this.data.arrList[hanIdx]['jianli' + (hanIdx + 1) + '_zhiwu']
        } else {
          this.data.arrList[hanIdx]['jianli' + (hanIdx + 1) + '_shijian'] = this.data.arrList[hanIdx]['jianli' + (hanIdx + 1 + 1) + '_shijian']
          this.data.arrList[hanIdx]['jianli' + (hanIdx + 1) + '_xuexi'] = this.data.arrList[hanIdx]['jianli' + (hanIdx + 1 + 1) + '_xuexi']
          this.data.arrList[hanIdx]['jianli' + (hanIdx + 1) + '_zhiwu'] = this.data.arrList[hanIdx]['jianli' + (hanIdx + 1 + 1) + '_zhiwu']
        }
        
      }
      this.setData({
        arrList: this.data.arrList
      })
      console.log('arrList: ' + JSON.stringify(this.data.arrList))
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options.keyMsg:' + options.keyMsg + 'options.otherMsg:' + options.otherMsg + 'options.schoolMsg:' + options.schoolMsg)
    this.data.objSchool = options.schoolMsg
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
              that.setData({
                arrList: []
              })
              for (var jianliIdx in res.data.detail) {
                if (jianliIdx.indexOf("_shijian") != -1) {
                  that.data.expLen += 1
                }
              }
              //console.log('that.data.expLen:' + that.data.expLen)
              // that.data.arrList.length = that.data.expLen
              for (var idx = 0; idx < that.data.expLen; idx++) {
                // that.data.arrList[idx]
                that.data.arrList[idx] = {}
                for (var jianliIdxn in res.data.detail) {
                  if (jianliIdxn.indexOf((idx + 1) + '_') != -1) {
                    console.log('jianliIdxn:' + jianliIdxn + ',' + 'idx + 1:' + (idx + 1))
                    that.data.arrList[idx][jianliIdxn] = res.data.detail[jianliIdxn]
                  }
                  
                }
              }
              console.log('that.data.arrList-request:' + JSON.stringify(that.data.arrList))
              that.setData({
                arrList: that.data.arrList
              })
            } else {
              console.log('暂未获取成功')
            }
          }
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