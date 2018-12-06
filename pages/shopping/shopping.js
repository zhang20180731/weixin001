var app=getApp()
Page({
  data: {
    content:[
      ["全部", "七年级", "八年级", "九年级"],
      ["全部", "历史与社会", "英语", "数学", "语文", "生物", "科学", "化学", "物理", "道德与法治", "地理", "历史"],
      ["全部", "鲁教版", "浙教版", "沪科版", "北师大版", "仁爱版", "沪粤版", "外研版", "冀教版", "湘教版", "苏教版", "可粤版", "教科版", "华东师大版", "人教版"]],
    currentTab:-1,
    list:[],
    click:1,
    id:''
  },
  navbarTap:function(e){
    this.setData({ 
        currentTab:e.target.dataset.id
      })
  },
  getBooks:function(){
      wx.request({
        url: 'http://127.0.0.1:4000/getbooks',
        success:(res)=>{
          this.setData({list:res.data});
        }
      })
  },
  ys:function(){
    if(this.data.click==1){this.setData({click:0})}
    else{this.setData({click:1})}
  },
  getIndex:function(e){
    this.setData({id:e.currentTarget.dataset.id})
    wx.navigateTo({
      url: '/pages/desc/desc?id='+this.data.id,
    })
  },
  getexplore:function(e){
     var content=e.detail.value;
     console.log(content)
     wx.request({
       url:'http://127.0.0.1:4000/explore',
       data:{content:content},
       method:"GET",
       success:(res)=>{
         this.setData({list:res.data})
       }
     })
  },
  addCart(e){
    console.log(e.target.dataset.id)
    this.setData({id: e.target.dataset.id})
    wx.request({
      url: 'http://127.0.0.1:4000/cart',
      method: "POST",
      data: { id: this.data.id,cartnum:1},
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: (res) => {
        wx.showToast({
          title: '添加购物车成功',
        })
      }
    }) 
  },
  tt: function () {
    wx.setNavigationBarTitle({
      title: '书城'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getBooks();
     this.tt();
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