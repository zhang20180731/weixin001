// pages/search/search.js
Page({
  data: {
    text:"",
    list:[],
    value:"",
    grade:""
  },
  getsearch:function(){
      wx.request({
        url: 'http://127.0.0.1:4000/search',
        method: "POST",
        header: {"Content-Type":"application/x-www-form-urlencoded"},
        data: { text: this.data.text, grade: this.data.grade,value:this.data.value},
        success: (res) => {
          this.setData({list:res.data})
        }
      }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.text);
    console.log(options.value);
    console.log(options.grade);
    //this.setData({ grade: options.grade, text: options.text, value: options.value})
    if(options.text!=undefined&&options.value==undefined&&options.grade==undefined){
      this.setData({text:options.text})
    }
    if (options.value != undefined && options.text == undefined && options.grade == undefined) {
      this.setData({value: options.value})
    }
    if (options.grade!= undefined && options.value == undefined && options.text== undefined) {
      this.setData({ grade: options.grade})
    }
    this.getsearch();
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