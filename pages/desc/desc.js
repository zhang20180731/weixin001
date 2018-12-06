// pages/desc/desc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic:"",
    Tab:0,
    id:"",
    desc:[],
    descpic:[],
    state:"",
    cartnum:"",
    ishide:1,
    num:1
  },
  getdestails:function(){
    wx.request({
      url:"http://127.0.0.1:4000/desc",
      data:{id:this.data.id},
      success:(res)=>{
        //this.setData({desc:res.data})
        console.log(res.data[0].descpic)
        var descpic = res.data[0].descpic.split(",")
        this.setData({ desc: res.data,descpic:descpic})
      }
    })
  },
  change:function(e){
     var e=e.currentTarget.dataset.id
     this.setData({Tab:e})
  },
  /*点击加号*/
  add: function () {
    var num = this.data.num;
    num++;
    var state = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      state: state
    })
  },
  /*点击减号*/
  incream: function () {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var state = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      state: state
    })
  },
  gotocart:function(){
     wx.reLaunch({
       url: '/pages/cart/cart',
     })
  },
  addgwc:function(){
    this.setData({ cartnum: this.data.num})
    this.setData({ishide:0})
    console.log(this.data.cartnum)
    if (this.data.cartnum!=undefined){
      wx.request({
        url: 'http://127.0.0.1:4000/cart',
        method: "POST",
        data: { id: this.data.id,cartnum:this.data.cartnum},
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: (res) => {
          wx.showToast({
            title: '添加购物车成功',
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ id: options.id })
    this.getdestails();
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