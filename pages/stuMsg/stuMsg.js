// pages/stuMsg/stuMsg.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boolShow: true,
    curSetDate_birth: '2019-10-01',
    curSetDate_graduate: '2019-10-01',
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
      }, {
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
        type: 'input',
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
      }, {
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
      }
    ],
    msgExpirse: [
      {
        arr: [
          {
            name: '时间',
            type: 'input',
            eleName: 'jianli1_shijian',
            val: ''
          }, {
            name: '学校',
            type: 'input',
            eleName: 'jianli1_xuexi',
            val: ''
          }, {
            name: '职位',
            type: 'input',
            eleName: 'jianli1_zhiwu',
            val: ''
          }
        ]
      }
    ],
    addNum: 1,
    files: [],
    src: '../../images/icon/upload.png',
    filesOther: [],
    saveData: {
      openId: '',
      details: {
        "xingming": "李四",
        "shenfenzhenghao": "442787199207210031",
        "xingbie": "男",
        "biyeyuanxiao": "北京大学",
        "biyeyuanxiao1": "北京大学",
        "minzhu": "汉",
        "chushengriqi": "1992-7-21",
        "xueli": "研究生",
        "xuewei": "硕士",
        "zhuanye": "信息计算科学",
        "zhuanye1": "人工智能",
        "xuefenjidian": "90",
        "yuanxipaiming": 8,
        "yuanxirenshu": 188,
        "xuefenzhanbi": 0.7,
        "jiangxuejin": 9,
        "jiaoshizige": "是",
        "yiqianxieyi": "否",
        "putonghuadengji": "一级",
        "shengyuandi": "广东深圳",
        "shengao": "168",
        "tizhong": "65",
        "aihaotechang": "打篮球",
        "jiguan": "广东阳江",
        "zhengzhimianmao": "党员",
        "dianhua": "13725138982",
        "qqhao": "42178761861",
        "jiangchengqingkuang": "诺贝尔奖",
        "jianli1_shijian": "2009.9-2012.7",
        "jianli1_xuexi": "阳春一中",
        "jianli1_zhiwu": "学生",
        "jianli2_shijian": "2012.9-2016.7",
        "jianli2_xuexi": "北京大学",
        "jianli2_zhiwu": "学生",
        "jianli3_shijian": "2016.9-2019.7",
        "jianli3_xuexi": "北京大学",
        "jianli3_zhiwu": "学生",
        "jianli4_shijian": "",
        "jianli4_xuexi": "",
        "jianli4_zhiwu": "",
        "jianli5_shijian": "",
        "jianli5_xuexi": "",
        "jianli5_zhiwu": ""
      }
    },
    resData: {
      openId: '',
      details: {}
    },
    istrue: false,
    imgTypeItems: [
      // { type: 'zhaopian', mingcheng: '证件照', checked: 'true' },
      { type: 'chengjidan', mingcheng: '成绩单照', checked: 'true' },
      { type: 'jiangxuejinzhengshu', mingcheng: '奖学金证书照' },
      { type: 'waiyuzhengshu', mingcheng: '外语证书照' },
      { type: 'qitazhengshu', mingcheng: '其他证书照' },
      { type: 'zm_jiaoshizigezheng', mingcheng: '教师资格证照' },
      { type: 'zm_shenghuozhao', mingcheng: '生活照'},
      { type: 'zm_shenfenzheng', mingcheng: '身份证照' },
      { type: 'zm_biyezheng', mingcheng: '毕业证照' },
      { type: 'zm_xueweizheng', mingcheng: '学位证书照' }
    ],
    imgType: 'zhaopian',
    objImg: {
      openId: '',
      fileType: 'chengjidan'
    },
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
    arrFilesUrls: ['zhaopian', 'chengjidan', 'jiangxuejinzhengshu', 'waiyuzhengshu', 'qitazhengshu', 'zm_jiaoshizigezheng', 'zm_shenghuozhao', 'zm_shenfenzheng', 'zm_biyezheng', 'zm_xueweizheng']
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.data.resData.details = e.detail.value
    if (e.detail.value.xingming.length != 0 && e.detail.value.shenfenzhenghao.length != 0 && e.detail.value.xingbie.length != 0 && e.detail.value.minzhu.length != 0 && e.detail.value.chushengriqi.length != 0 && e.detail.value.qqhao.length != 0 && e.detail.value.dianhua.length != 0 && e.detail.value.shengyuandi.length != 0 && e.detail.value.jiguan.length != 0 && e.detail.value.zhengzhimianmao.length != 0 && e.detail.value.biyeshijian.length != 0) {
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
              mask: false
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
    // this.imgUpload()
  },
  imgUpload: function () {
    // wx.request({
    //   url: app.globalData.gloUrl + 'examinee/uploadImage',
    //   data: {
    //     image: '',
    //     info: {
    //       openId: this.data.resData.openId,
    //       fileType: 'zhaopian'
    //     }
    //   },
    //   method: 'POST',
    //   header: {
    //     'content-type': 'multipart/form-data'
    //   },
    //   success: function (res) {
    //     console.log('res.data.result:' + res.data.result)
    //     if (res.data.result == 'OK') {
    //       console.log('提交成功')
    //     } else {
    //       console.log('暂未提交成功，请重新提交。')
    //     }
    //   }
    // })
    
  },
  changeOrderData: function (e) {
    console.log(e)

  },
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // this.data.stuMsgData[4].curSetDate = e.detail.value
    // this.setData({
    //   stuMsgData[4]: this.data.stuMsgData
    // })
    this.setData({
      curSetDate_birth: e.detail.value
    })
  },
  bindDateChange1: function (e) {
    this.setData({
      curSetDate_graduate: e.detail.value
    })
  },
  addHandle: function () { // 增加一行个人简历
    this.data.addNum = this.data.addNum + 1
    var newLine = {
      arr: [
        {
          name: '时间',
          type: 'input',
          eleName: 'jianli' + this.data.addNum + '_shijian'
        }, {
          name: '学校',
          type: 'input',
          eleName: 'jianli' + this.data.addNum + '_xuexi'
        }, {
          name: '职位',
          type: 'input',
          eleName: 'jianli' + this.data.addNum + '_zhiwu'
        }
      ]
    }
    this.data.msgExpirse.push(newLine)
    console.log(this.data.msgExpirse)
    this.setData({
      msgExpirse: this.data.msgExpirse
    })
  },
  minuteHandle: function (e) { // 删除当前行
    this.data.addNum = this.data.addNum - 1
    var cntIndex = parseInt(e.currentTarget.dataset.index);
    console.log('当前行标：' + cntIndex)
    if (this.data.msgExpirse.length <= 1) {

    } else {
      for (var i = 0; i < this.data.msgExpirse.length; i++) {
        if (cntIndex == i) {
          this.data.msgExpirse.splice(i, 1);
          this.data.msgExpirse = this.data.msgExpirse
          this.setData({
            msgExpirse: this.data.msgExpirse
          })
          console.log(this.data.msgExpirse)
        } else {

        }
      }
    }
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
  reUpload: function () {
    var that = this;
    this.data.files = [];
    this.setData({
      files: []
    });
  },
  previewImage: function (e) { // 点击已经上传的图片查看
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  radioChangeType: function (e) {
    console.log(e.detail.value)
    this.data.imgType = e.detail.value
    this.data.objImg.fileType = e.detail.value
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
  chooseImageOther: function (e) {
    var that = this;
    this.openDialog()
    
  },
  delImg: function (idx) {
    var that = this;
    console.log(idx)
    // that.setData({
    //   filesOther: that.data.filesOther.concat(res.tempFilePaths)
    // });
  },
  previewImageOther: function (e) { // 点击已经上传的图片查看
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.filesOther // 需要预览的图片http链接列表
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
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.data.saveData.openId = res.data;
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
              // for (var k = 0; k < that.data.stuMsgData.length; k++) {
              //   if (that.data.stuMsgData[k].type == 'radio') {
              //     for (var k1 = 0; k1 < that.data.stuMsgData[k].items.length; k1++) {
              //       if (that.data.stuMsgData[k].items[k1].name == that.data.stuMsgData[k].val) {
              //         that.data.stuMsgData[k].items[k1]['checked'] = true
              //         console.log('that.data.stuMsgData[k].val:' + that.data.stuMsgData[k].val)
              //       }
              //     }
              //   }
              // }
              console.log('that.data.stuMsgData:' + JSON.stringify(that.data.stuMsgData))
              that.setData({
                stuMsgData: that.data.stuMsgData
              })
            } else {
              console.log('暂未获取成功')
            }
          }
        })
        // for (var listIdx = 0; listIdx < that.data.arrFilesUrls.length; listIdx++) {
        //   wx.request({
        //     url: app.globalData.gloUrl + 'examinee/downloadImage',
        //     data: {
        //       openId: that.data.resData.openId,
        //       fileType: that.data.arrFilesUrls[listIdx]
        //     },
        //     method: 'POST',
        //     responseType: 'arraybuffer',
        //     success: function (res) {
        //       if (res.statusCode == 200) {
        //         console.log(res)
        //         // ['zhaopian', 'chengjidan', 'jiangxuejinzhengshu', 'waiyuzhengshu', 'qitazhengshu', 'zm_jiaoshizigezheng', 'zm_shenghuozhao', 'zm_shenfenzheng', 'zm_biyezheng', 'zm_xueweizheng']
        //         if (that.data.arrFilesUrls[listIdx] == 'zhaopian') {
        //           that.data.filesUrls.zhaopian = wx.arrayBufferToBase64(res.data)
        //         } else if (that.data.arrFilesUrls[listIdx] == 'chengjidan') {
        //           that.data.filesUrls.chengjidan = wx.arrayBufferToBase64(res.data)
        //         } else if (that.data.arrFilesUrls[listIdx] == 'jiangxuejinzhengshu') {
        //           that.data.filesUrls.jiangxuejinzhengshu = wx.arrayBufferToBase64(res.data)
        //         } else if (that.data.arrFilesUrls[listIdx] == 'waiyuzhengshu') {
        //           that.data.filesUrls.waiyuzhengshu = wx.arrayBufferToBase64(res.data)
        //         } else if (that.data.arrFilesUrls[listIdx] == 'qitazhengshu') {
        //           that.data.filesUrls.qitazhengshu = wx.arrayBufferToBase64(res.data)
        //         } else if (that.data.arrFilesUrls[listIdx] == 'zm_jiaoshizigezheng') {
        //           that.data.filesUrls.zm_jiaoshizigezheng = wx.arrayBufferToBase64(res.data)
        //         } else if (that.data.arrFilesUrls[listIdx] == 'zm_shenghuozhao') {
        //           that.data.filesUrls.zm_shenghuozhao = wx.arrayBufferToBase64(res.data)
        //         } else if (that.data.arrFilesUrls[listIdx] == 'zm_shenfenzheng') {
        //           that.data.filesUrls.zm_shenfenzheng = wx.arrayBufferToBase64(res.data)
        //         } else if (that.data.arrFilesUrls[listIdx] == 'zm_biyezheng') {
        //           that.data.filesUrls.zm_biyezheng = wx.arrayBufferToBase64(res.data)
        //         } else if (that.data.arrFilesUrls[listIdx] == 'zm_xueweizheng') {
        //           that.data.filesUrls.zm_xueweizheng = wx.arrayBufferToBase64(res.data)
        //         }
        //         that.setData({
        //           filesUrls: ''
        //         })
        //       }
        //     }
        //   })
        // }
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
                }) (listIdx)
                
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