// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: [],
    six: [{ id: 1, text: "语文", img: "img/语文.png" },
      { id: 2, text: "数学", img: "img/数学2-.png" },
      { id: 3, text: "英语", img: "img/英语.png" },
      { id: 4, text: "化学", img: "img/化学.png" },
      { id: 5, text: "物理", img: "img/物理.png" },
      { id: 6, text: "科学", img: "img/科学.png" },
      { id: 7, text: "生物", img: "img/生物.png" },
      { id: 8, text: "地理", img: "img/地理.png" },
      { id: 9, text: "历史", img: "img/历史技师.png" },
      { id: 10, text: "道德与政治", img: "img/政治.png" },
      { id: 11, text: "历史与社会", img: "img/社会关系.png" },
      { id: 12, text: "其他", img: "img/其他.png" },
    ],
    recommend:[],
  },
  getImageList:function(){
    wx.request({
      url: "http://127.0.0.1:4000/bannerlist",
      success: (res) => {
        this.setData({ pic: res.data });
      }
    })
  },
  value: function (e) {
    if(e){
       value = e.detail.value;
    }
    var value = e.detail.value;
       wx.navigateTo({
        url: '/pages/search/search?value=' + value,
      })
  },
  getrecommend(){
    wx.request({
      url: 'http://127.0.0.1:4000/recommend',
      success:(res)=>{
          this.setData({recommend:res.data});
      }
    })
  },
  xueke:function(e){
    var text = "";
    if (e) {
      text = e.target.text;
    }
    //this.value();
    var text=e.target.dataset.text;
    console.log(text)
    wx.navigateTo
    ({
      url:"/pages/search/search?text="+text,
    })
  },
  grade:function(e){
    var grade = "";
    if (e) {
      grade= e.target.grade;
    }
    var grade=e.target.dataset.grade;
    console.log(grade)
    wx.navigateTo({
      url: '/pages/search/search?grade='+grade,
    })
  },
  tt: function () {
    wx.setNavigationBarTitle({
      title: '首页'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getImageList();
    this.getrecommend();
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