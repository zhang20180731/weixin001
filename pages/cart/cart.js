// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    id:"",
    cartcontent: [],
    del:1,
    count:"",
    total:"",
    arr :[],
    value:"",
    s:"",
    check:1,
    reslength:"",
    stotal:""
  },
   /*点击加号*/
  add: function (e) {
    this.setData({ id: e.target.dataset.id})
    if(this.data.id!=undefined){
      wx.request({
        url: 'http://127.0.0.1:4000/getcount',
        data:{id:this.data.id},
        success:(res)=>{
          var count = Number(res.data[0].count) +1
          this.setData({ count: count})
          wx.request({
            url: 'http://127.0.0.1:4000/update',
            data: { id:this.data.id,count:this.data.count},
            success:(res)=>{
              wx.request({
                url: 'http://127.0.0.1:4000/cartcontent',
                success: (res) => {
                  this.setData({ cartcontent: res.data })
                  if (e.target.dataset.id != undefined && this.data.del == 1 && this.data.check == 1)                   {
                    wx.request({
                      url: 'http://127.0.0.1:4000/getTotal',
                      data: { id: e.target.dataset.id },
                      success: (res) => {
                        var total = Number(res.data[0].price.slice(1)) * Number(res.data[0].count)
                        this.data.arr.push(total)
                        var sum = "";
                        var s = Number(sum)
                        for (var i = 0; i < this.data.arr.length; i++) {
                          s += Number(this.data.arr[i])
                          var newtotal = s.toFixed(2)
                          this.setData({ s: newtotal })
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        }
      })  
    }  
  },
  /*点击减号*/
  incream:function(e){
    this.setData({ id: e.target.dataset.id })
    if (this.data.id != undefined) {
      wx.request({
        url: 'http://127.0.0.1:4000/getcount',
        data: { id: this.data.id },
        success: (res) => {
          //console.log(this.data.count);
          if(res.data[0].count<=1){return}
          else{
            var count = Number(res.data[0].count) - 1
           // console.log(count);
            this.setData({ count: count })
            wx.request({
              url: 'http://127.0.0.1:4000/update',
              data: { id: this.data.id, count: this.data.count },
              success: (res) => {
                wx.request({
                  url: 'http://127.0.0.1:4000/cartcontent',
                  success: (res) => {
                    this.setData({ cartcontent: res.data })
                  }
                })
              }
            })
          }
        }
      })
    } 
  },
  content:function(){
     wx.request({
       url: 'http://127.0.0.1:4000/cartcontent',
       success:(res)=>{
         console.log(res.data.length)
         this.setData({cartcontent:res.data,reslength:res.data.length})
       }
    })
  },
  direction:function(){
    if (this.data.del == 1) { this.setData({ del: 0 })}
    else { this.setData({ del: 1 }) }
  },
  checkboxChange: function (e) {
    if(this.data.check==0){
       this.setData({check:1})
    }
    else if(this.data.check==1){this.setData({check:0})}
    this.setData({ value: e.target.dataset.id})
    if (e.target.dataset.id!=undefined&&this.data.del==1&&this.data.check==1){
      wx.request({
        url: 'http://127.0.0.1:4000/getTotal',
        data: { id: e.target.dataset.id},
        success:(res)=>{
            var total = Number(res.data[0].price.slice(1)) * Number(res.data[0].count)
            this.data.arr.push(total)
            var sum="";
            var s=Number(sum)
            for(var i=0;i<this.data.arr.length;i++){
               s+=Number(this.data.arr[i])
              var newtotal = s.toFixed(2)
               this.setData({s:newtotal})
            }
        }
      })
    }
    if (this.data.del == 1 && this.data.check == 0) {
      wx.request({
        url: 'http://127.0.0.1:4000/getTotal',
        data: { id: e.target.dataset.id },
        success: (res) => {
          var total = this.data.s - Number(res.data[0].price.slice(1)) * Number(res.data[0].count)
          console.log(total)
          var Total=total.toFixed(2)
          this.setData({ s: Total })  
        }
      })
    } 
  },
  remove:function(){
    if(this.data.del==0 &&this. data.check==0){
        wx.request({
          url: 'http://127.0.0.1:4000/del',
          data: { id: this.data.value },
          success: (res) => {
            wx.request({
              url: 'http://127.0.0.1:4000/cartcontent',
              success: (res) => {
                this.setData({ cartcontent: res.data })
              }
            })
          }
        }) 
    }
  },
  tt:function(){
    wx.setNavigationBarTitle({
      title:'购物车'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tt();
    this.content();
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
