// pages/getMsg/getMsg.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    src: '../../images/icon/upload.png',
    birthDate: '',
    graduDate: '',
    // saveData: {
    //   openid: '',
    //   name: '',
    //   sex: '',
    //   idCard: '',
    //   qqNum: '',
    //   mbphone: '',
    //   nation: '',
    //   birthDate: '',
    //   fromWhere: '',
    //   homeWhere: '',
    //   party: '',
    //   graduDate: '',
    //   time: ''
    // },
    saveData: {
      openId: '',
      xingming: '',
      shenfenzhenghao: '',
      qqhao: '',
      dianhua: '',
      type: ''
    },
    result: ''
  },
  getScancode: function () {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        _this.setData({
          result: result
        })
      }
    })
  },
  bindBirthDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      birthDate: e.detail.value
    })
    this.data.saveData.birthDate = e.detail.value
  },
  bindgraduDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      graduDate: e.detail.value
    })
    this.data.saveData.graduDate = e.detail.value
  },
  iptVal_name: function (e) {
    console.log('iptVal_name:' + e.detail.value)
    this.data.saveData.xingming = e.detail.value
  },
  iptVal_sex: function (e) {
    this.data.saveData.sex = e.detail.value
  },
  iptVal_idCard: function (e) {
    console.log('iptVal_idCard:' + e.detail.value)
    this.data.saveData.shenfenzhenghao = e.detail.value
    
  },
  iptVal_qq: function (e) {
    console.log('iptVal_qq:' + e.detail.value)
    this.data.saveData.qqhao = e.detail.value
  },
  iptVal_mbphone: function (e) {
    console.log('iptVal_mbphone:' + e.detail.value)
    this.data.saveData.dianhua = e.detail.value
  },
  iptVal_nation: function (e) {
    this.data.saveData.nation = e.detail.value
  },
  iptVal_from: function (e) {
    this.data.saveData.fromWhere = e.detail.value
  },
  iptVal_home: function (e) {
    this.data.saveData.homeWhere = e.detail.value
  },
  iptVal_party: function (e) {
    this.data.saveData.party = e.detail.value
  },
  iptVal_js: function (e) {
    console.log(e.detail.value)
    this.data.saveData.type = e.detail.value
  },
  getData_storage: function () {
    let that = this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        // console.log('getData_storage:' + res.data)
        // that.setData({
        //   saveData.openid：res.data
        // })
        that.data.saveData.openId = res.data;
        that.data.saveData.type = "0";
        console.log('that.saveData:' + JSON.stringify(that.data.saveData))
        that.goBind()
      }
    })
  },
  confirmTo: function (e) {
    if (this.data.saveData.xingming.length != 0 && this.data.saveData.shenfenzhenghao.length != 0 && this.data.saveData.shenfenzhenghao.length != 0 && this.data.saveData.qqhao.length != 0 && this.data.saveData.dianhua.length != 0) {
      this.getData_storage()
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
    // wx.navigateTo({
    //   url: '../getMsg/getMsg'
    // })
  },
  goBind:function () {
    wx.request({
      url: app.globalData.gloUrl + 'allUsers/bindInfo',
      data: this.data.saveData,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('res.data.result:' + res.data.result)
        if (res.data.result == 'OK') {
          if (res.data.type == '0') { // 学生
            wx.reLaunch({
              url: '../index/index',
            })
          } else if (res.data.type == '1') { // 老师
            wx.reLaunch({
              url: '../teacherPlays/teacherPlays',
            })
          }
        } else {
          console.log('暂未绑定成功，请重新绑定。')
        }
      }
    })
  },
  chooseImage: function (e) {
    var that = this;
    if (this.data.files.length == 0) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.setData({
            files: that.data.files.concat(res.tempFilePaths)
          });
        }
      })
    } else {
      //
    }
  },
  previewImage: function (e) { // 点击已经上传的图片查看
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
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