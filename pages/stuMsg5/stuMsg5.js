// pages/stuMsg5/stuMsg5.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filesUrlsZhaopian: '',
    filesUrlsChengjidan: '',
    filesUrlsJiangxuejinzhengshu: '',
    filesUrlsWaiyuzhengshu: '',
    filesUrlsQitazhengshu: '',
    filesUrlsZm_jiaoshizigezheng: '',
    filesUrlsZm_shenghuozhao: '',
    filesUrlsZm_shenfenzheng: '',
    filesUrlsZm_biyezheng: '',
    filesUrlsZm_xueweizheng: '',
    getImgLen: 0,
    arrFilesUrls: ['zhaopian', 'chengjidan', 'jiangxuejinzhengshu', 'waiyuzhengshu', 'qitazhengshu', 'zm_jiaoshizigezheng', 'zm_shenghuozhao', 'zm_shenfenzheng', 'zm_biyezheng', 'zm_xueweizheng'],
    istrue: false,
    imgTypeItems: [
      // { type: 'zhaopian', mingcheng: '证件照', checked: 'true' },
      { type: 'chengjidan', mingcheng: '成绩单照', checked: 'true' },
      { type: 'jiangxuejinzhengshu', mingcheng: '奖学金证书照' },
      { type: 'waiyuzhengshu', mingcheng: '外语证书照' },
      { type: 'qitazhengshu', mingcheng: '其他证书照' },
      { type: 'zm_jiaoshizigezheng', mingcheng: '教师资格证照' },
      { type: 'zm_shenghuozhao', mingcheng: '生活照' },
      { type: 'zm_shenfenzheng', mingcheng: '身份证照' },
      { type: 'zm_biyezheng', mingcheng: '毕业证照' },
      { type: 'zm_xueweizheng', mingcheng: '学位证书照' }
    ],
    imgType: 'zhaopian',
    objImg: {
      openId: '',
      fileType: 'chengjidan'
    },
    resData: {
      openId: '',
      details: {}
    },
    addNum: 1,
    files: [],
    src: '../../images/icon/upload.png',
    filesOther: [],
    uploadCount: 0,
    filesUrls: {
      zhaopian: '',
      chengjidan: '',
      jiangxuejinzhengshu: '',
      waiyuzhengshu: '',
      qitazhengshu: '',
      zm_jiaoshizigezheng: '',
      zm_shenghuozhao: '',
      zm_shenfenzheng: '',
      zm_biyezheng: '',
      zm_xueweizheng: ''
    },
    objSchool: {},
    objOther: {},
    objKeys: {},
    objExpMeg: {}
  },
  previewImage: function (e) { // 点击已经上传的图片查看
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  previewImageOther: function (e) { // 点击已经上传的图片查看
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.filesOther // 需要预览的图片http链接列表
    })
  },
  goHome: function () {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  goBack: function () {
    wx.reLaunch({
      url: '../stuMsg4/stuMsg4?otherMsg=' + JSON.stringify(this.data.objOther) + '&keyMsg=' + JSON.stringify(this.data.objKeys) + '&schoolMsg=' + JSON.stringify(this.data.objSchool)
    })
  },
  confirmSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.data.resData.details = Object.assign(this.data.objSchool, this.data.objOther, this.data.objKeys, this.data.objExpMeg)
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
              wx.reLaunch({
                url: '../index/index'
              })
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
  closeDialog_confirm: function () {
    var that = this;
    this.setData({
      istrue: false
    })
    // this.data.objImg.fileType
    that.data.objImg.openId = that.data.resData.openId
    console.log('plus:' + this.data.filesOther.length + this.data.getImgLen)
    if (this.data.filesOther.length + this.data.getImgLen <= 8) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var tempFilesSize1 = res.tempFiles[0].size // 获取图片的大小，单位B
          console.log('tempFilesSize1:' + tempFilesSize1)
          if (tempFilesSize1 <= 2000000) { // 图片小于或者等于2M时 可以执行获取图片
            that.data.uploadCount = that.data.uploadCount + 1
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            wx.showToast({
              title: '正在上传...',
              icon: 'loading',
              mask: true,
              duration: 1000
            })
            var tempFilePaths = res.tempFilePaths

            wx.uploadFile({
              url: app.globalData.gloUrl + 'examinee/uploadImage',
              filePath: res.tempFilePaths[0],
              name: 'image',
              header: {
                "Content-Type": "multipart/form-data",
                'accept': 'application/json'
              },
              formData: {
                info: JSON.stringify(that.data.objImg)
              },
              success(resp) {
                const data = JSON.parse(resp.data)
                //do something
                console.log('upload success:' + typeof data)
                if (data['result'] == 'NOK') {
                  console.log('上传失败')
                  wx.showToast({
                    title: '上传失败',
                    icon: 'none',
                    duration: 2000, // 提示的延迟时间，单位毫秒，默认：1500
                    mask: false
                  })
                } else {
                  console.log('上传成功')
                  wx.showToast({
                    title: '上传成功',
                    icon: 'none',
                    duration: 2000, // 提示的延迟时间，单位毫秒，默认：1500
                    mask: false
                  })
                  that.setData({
                    filesOther: that.data.filesOther.concat(res.tempFilePaths)
                  });
                }
              }
            })
          } else { // 图片大于2M，弹出一个提示框
            wx.showToast({
              title: '上传图片不能大于2M!', // 标题
              icon: 'none' // 图标 none不使用图标，详情看官方文档
            })
          }

          // for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          //   wx.uploadFile({
          //     url: app.globalData.gloUrl + 'examinee/uploadImage',
          //     filePath: res.tempFilePaths[i],
          //     name: 'image',
          //     header: {
          //       "Content-Type": "multipart/form-data",
          //       'accept': 'application/json'
          //     },
          //     formData: {
          //       info: JSON.stringify(that.data.objImg)
          //     },
          //     success(resp) {
          //       const data = JSON.parse(resp.data)
          //       //do something
          //       console.log('upload success:' + typeof data)
          //       if (data['result'] == 'NOK') {
          //         console.log('上传失败')
          //         // that.data.filesOther.splice(i, 1)
          //         // that.setData({
          //         //   filesOther: that.data.filesOther
          //         // });
          //         console.log(that.data.filesOther)
          //       } else {
          //         console.log('上传成功')

          //       }
          //     },
          //     fail: function (res) {
          //       wx.showModal({
          //         title: '错误提示',
          //         content: '上传图片失败',
          //         showCancel: false,
          //         success: function (res) {
          //           that.setData({
          //             filesOther: []
          //           });
          //         }
          //       })
          //     }
          //   })
          // }
        }
      })
    } else {
      wx.showToast({
        title: '最多只能上传9张图片',
        icon: 'none',
        duration: 3000
      });
    }
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
  chooseImageOther: function (e) {
    var that = this;
    this.openDialog()

  },
  radioChangeType: function (e) {
    console.log(e.detail.value)
    this.data.imgType = e.detail.value
    this.data.objImg.fileType = e.detail.value
  },
  chooseImage: function (e) {
    var that = this;
    that.data.objImg.openId = that.data.resData.openId
    that.data.objImg.fileType = 'zhaopian'
    if (this.data.files.length == 0) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          // that.setData({
          //   files: that.data.files.concat(res.tempFilePaths)
          // });
          var tempFilesSize = res.tempFiles[0].size // 获取图片的大小，单位B
          if (tempFilesSize <= 2000000) { // 图片小于或者等于2M时 可以执行获取图片
            wx.uploadFile({
              url: app.globalData.gloUrl + 'examinee/uploadImage',
              filePath: res.tempFilePaths[0],
              name: 'image',
              header: {
                "Content-Type": "multipart/form-data",
                'accept': 'application/json'
              },
              formData: {
                info: JSON.stringify(that.data.objImg)
              },
              success(resp) {
                const data = JSON.parse(resp.data)
                //do something
                console.log('upload success:' + typeof data)
                if (data['result'] == 'NOK') {
                  console.log('上传失败')
                  wx.showToast({
                    title: '上传失败',
                    icon: 'none',
                    duration: 1000, // 提示的延迟时间，单位毫秒，默认：1500
                    mask: false
                  })
                  that.setData({
                    files: []
                  });
                } else {
                  console.log('上传成功')
                  wx.showToast({
                    title: '上传成功',
                    icon: 'none',
                    duration: 1000, // 提示的延迟时间，单位毫秒，默认：1500
                    mask: false
                  })
                  that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                  });
                }
              }
            })
          } else { // 图片大于2M，弹出一个提示框
            wx.showToast({
              title: '上传图片不能大于2M!', // 标题
              icon: 'none' // 图标 none不使用图标，详情看官方文档
            })
          }

        }
      })
    } else {
      //
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options.keyMsg:' + options.keyMsg + 'options.otherMsg:' + options.otherMsg + 'options.schoolMsg:' + options.schoolMsg + 'options.expMeg:' + options.expMeg)
    var that = this;
    
    this.data.objSchool = JSON.parse(options.schoolMsg)
    this.data.objOther = JSON.parse(options.otherMsg)
    this.data.objKeys = JSON.parse(options.keyMsg)
    this.data.objExpMeg = JSON.parse(options.expMeg)
    
    
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.data.resData.openId = res.data;
        wx.request({
          url: app.globalData.gloUrl + 'examinee/getImageInfos',
          data: {
            openId: that.data.resData.openId
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function (res) {
            that.data.arrFilesUrls = []
            if (res.data.result == "OK") {
              for (var i = 0; i < res.data.imageInfos.length; i++) {
                that.data.arrFilesUrls.push(res.data.imageInfos[i].fileType)
              }
              for (var listIdx = 0; listIdx < that.data.arrFilesUrls.length; listIdx++) {
                (function (listIdx) {
                  wx.request({
                    url: app.globalData.gloUrl + 'examinee/downloadImage',
                    data: {
                      openId: that.data.resData.openId,
                      fileType: that.data.arrFilesUrls[listIdx]
                    },
                    method: 'POST',
                    responseType: 'arraybuffer',
                    success: function (res) {
                      if (res.statusCode == 200) {
                        console.log(res)
                        if (that.data.arrFilesUrls[listIdx] == 'zhaopian') {
                          that.setData({
                            filesUrlsZhaopian: wx.arrayBufferToBase64(res.data)
                          })
                        } else if (that.data.arrFilesUrls[listIdx] == 'chengjidan') {
                          that.setData({
                            filesUrlsChengjidan: wx.arrayBufferToBase64(res.data)
                          })
                          that.data.getImgLen += 1;
                        } else if (that.data.arrFilesUrls[listIdx] == 'jiangxuejinzhengshu') {
                          that.setData({
                            filesUrlsJiangxuejinzhengshu: wx.arrayBufferToBase64(res.data)
                          })
                          that.data.getImgLen += 1;
                        } else if (that.data.arrFilesUrls[listIdx] == 'waiyuzhengshu') {
                          that.setData({
                            filesUrlsWaiyuzhengshu: wx.arrayBufferToBase64(res.data)
                          })
                          that.data.getImgLen += 1;
                        } else if (that.data.arrFilesUrls[listIdx] == 'qitazhengshu') {
                          that.setData({
                            filesUrlsQitazhengshu: wx.arrayBufferToBase64(res.data)
                          })
                          that.data.getImgLen += 1;
                        } else if (that.data.arrFilesUrls[listIdx] == 'zm_jiaoshizigezheng') {
                          that.setData({
                            filesUrlsZm_jiaoshizigezheng: wx.arrayBufferToBase64(res.data)
                          })
                          that.data.getImgLen += 1;
                        } else if (that.data.arrFilesUrls[listIdx] == 'zm_shenghuozhao') {
                          that.setData({
                            filesUrlsZm_shenghuozhao: wx.arrayBufferToBase64(res.data)
                          })
                          that.data.getImgLen += 1;
                        } else if (that.data.arrFilesUrls[listIdx] == 'zm_shenfenzheng') {
                          that.setData({
                            filesUrlsZm_shenfenzheng: wx.arrayBufferToBase64(res.data)
                          })
                          that.data.getImgLen += 1;
                        } else if (that.data.arrFilesUrls[listIdx] == 'zm_biyezheng') {
                          that.setData({
                            filesUrlsZm_biyezheng: wx.arrayBufferToBase64(res.data)
                          })
                          that.data.getImgLen += 1;
                        } else if (that.data.arrFilesUrls[listIdx] == 'zm_xueweizheng') {
                          that.setData({
                            filesUrlsZm_xueweizheng: wx.arrayBufferToBase64(res.data)
                          })
                          that.data.getImgLen += 1;
                        }
                      }
                      that.setData({
                        getImgLen: that.data.getImgLen
                      })
                      console.log('that.data.getImgLen:' + that.data.getImgLen)
                    }
                  })
                })(listIdx)

              }
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