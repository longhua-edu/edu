// components/button-list/button-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: String,
    img: String,
    ccid: String,
    hideRight: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  
  methods: {
    buttonClick: function () {
      this.triggerEvent('myevent', { type: this.data.text, ccid: this.data.ccid });
    }
  }
})
