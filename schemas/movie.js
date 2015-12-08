// //app.js
var mongoose = require('mongoose');//映入建模没款，
var MovieSchema=new mongoose.Schema({//调用方法 
  doctor:String,
  title:String,
  language:String,
  country:String,
  summary:String,
  flash:String,
  poster:String,
  year:Number,
  meta:{//更新时间的记录
    createAt:{
      type:Date,
      default:Date.now()
    },
    updateAt:
    {
      type:Date,
      default:Date.now()
    }
  }
})
//为模式添加哟个方法，每次存取数据都调用此方法
MovieSchema.pre('save',function(){
  if(this.isNew){
    this.meta.createAt=this.meta.updateAt=Date.now();
  }
  else{
    this.meta.updateAt=Date.now();
  }
  next();//下一步的存储流程
})

//下面是 一些静态的方法，不会直接与数据库做交互，只能通过model编译实例化以后才具有这个方法
MovieSchema.statics={
  fetch:function(cb){//取出数据库中的所有数据
    return this.find({}).sort('meta.updateAt').exec(cb);//执行回调函数//按照取出来的更新时间排序    
  },
  findById:function(id,cb){
    return this.findOne({_id:id}).exec(cb);//执行回调函数
    
  }
}

//通过模式调用导出

module.exports=MovieSchema;
// var express=require('express');
// var port=process.env.PORT||3000;
// var path=require('path');
// var app=express();
// app.set('views','./views/pages');//设置视图的根目录
// app.set('view engine','jade')//设置默认的模板引擎
// app.use(express.static(path.join(__dirname,'bower_components')))//__dirname当前目录,获取静态
// //app.use(express.bodyParser())//提交表单的数据格式化
// app.listen(port)
// console.log("nodemd started on port "+ port)


// // index page 路由匹配
// app.get('/',function(req,res){//路由匹配规则，回调函数
//   res.render('index',{
//   	title:'nodemd 首页',
//     movies:[{
//       title:'机械战警',
//       _id:1,
//       poster:"http://172.16.40.26:9510/static/images/videoimage1.png"
//     },
//     {
//       title:'机械战警',
//       _id:2,
//       poster:"http://172.16.40.26:9510/static/images/videoimage1.png"
//     },
//     {
//       title:'机械战警',
//       _id:3,
//       poster:"http://172.16.40.26:9510/static/images/videoimage1.png"
//     },
//     {
//       title:'机械战警',
//       _id:4,
//       poster:"http://172.16.40.26:9510/static/images/videoimage1.png"
//     },
//     {
//       title:'机械战警',
//       _id:5,
//       poster:"http://172.16.40.26:9510/static/images/videoimage1.png"
//     },
//     {
//       title:'机械战警',
//       _id:6,
//       poster:"http://172.16.40.26:9510/static/images/videoimage1.png"
//     }]
//   })
// })
// app.get('/movie/:id',function(req,res){//路由匹配规则，回调函数
//   res.render('detail',{
//   	title:'nodemd 详情页',
//     movie:{
//       doctor:"何塞，帕瓦利亚",
//       country:"美国",
//       title:"机械战警",
//       year:2014,
//       poster:"http://172.16.40.26:9510/index/widget/1",
//       language:"英语",
//       flash:"http://static.youku.com/v1.0.0581/v/swf/loader.swf",
//       summary:"《我们15个》第一季平顶之上是一个大型生活实验节目要靠自己的能力接通水、电、燃气，搭建一切生活空间，创造自己的生活。"
//     }
   
//   })
// })
// app.get('/admin/movie',function(req,res){//路由匹配规则，回调函数
//   res.render('admin',{
//   	title:'nodemd 后台录入页',
//     movie:{
//       doctor:"",
//       country:"",
//       title:"",
//       year:2014,
//       poster:"",
//       language:"",
//       flash:"",
//       summary:""
//     }
//   })
// })
// app.get('/admin/list',function(req,res){//路由匹配规则，回调函数
//   res.render('list',{
//   	title:'nodemd 列表页',
//     movies:[{
//       _id:1,
//        doctor:"何塞，帕瓦利亚",
//       country:"美国",
//       title:"机械战警",
//       year:2014,
//       poster:"http://172.16.40.26:9510/index/widget/1",
//       language:"英语",
//       flash:"http://static.youku.com/v1.0.0581/v/swf/loader.swf",
//       summary:"《我们15个》第一季平顶之上是一个大型生活实验节目要靠自己的能力接通水、电、燃气，搭建一切生活空间，创造自己的生活。"
//     },
//     {
//       _id:2,
//        doctor:"何塞，帕瓦利亚",
//       country:"美国",
//       title:"机械战警",
//       year:2014,
//       poster:"http://172.16.40.26:9510/index/widget/1",
//       language:"英语",
//       flash:"http://static.youku.com/v1.0.0581/v/swf/loader.swf",
//       summary:"《我们15个》第一季平顶之上是一个大型生活实验节目要靠自己的能力接通水、电、燃气，搭建一切生活空间，创造自己的生活。"
//     },
//     {
//       _id:3,
//       doctor:"何塞，帕瓦利亚",
//       country:"美国",
//       title:"机械战警",
//       year:2014,
//       poster:"http://172.16.40.26:9510/index/widget/1",
//       language:"英语",
//       flash:"http://static.youku.com/v1.0.0581/v/swf/loader.swf",
//       summary:"《我们15个》第一季平顶之上是一个大型生活实验节目要靠自己的能力接通水、电、燃气，搭建一切生活空间，创造自己的生活。"
//     }]
//   })
// })