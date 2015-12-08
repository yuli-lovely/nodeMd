//app.js
var express=require('express');
var mongoose = require('mongoose');//映入建模没款，
var Movie=require('./models/movie');
var path=require('path');
var _=require('underscore');
var port=process.env.PORT||3000;
var app=express();
app.set('views','./views/pages');//设置视图的根目录
app.set('view engine','jade')//设置默认的模板引擎
app.use(express.static(path.join(__dirname,'public')))//__dirname当前目录,获取静态
//app.use(express.bodyParser())//提交表单的数据格式化
app.locals.moment =require('moment');
app.listen(port)
console.log("nodemd started on port "+ port)

mongoose.connect('mongodb://localhost/immooc')
// index page 路由匹配
app.get('/',function(req,res){//路由匹配规则，回调函数
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err);
    }
    res.render('index',{
    title: 'nodemd 首页',
    movies: movies
  })
  })
  
})
app.get('/movie/:id',function(req,res){//路由匹配规则，回调函数
  var id=req.params.id;
  Movie.findById(id,function(){
    res.render('detail',{
    title:'nodemd '+movie.title,
    movie:movie
   })
  })
  
})
app.get('/admin/movie',function(req,res){//路由匹配规则，回调函数
  res.render('admin',{
  	title:'nodemd 后台录入页',
    movie:{
      doctor:"",
      country:"",
      title:"",
      year:2014,
      poster:"",
      language:"",
      flash:"",
      summary:""
    }
  })
})


//admin update movie
app.get('admin/update/:id',function(res,req){
 var id=req.params.id;
 if(id){
  Movie.findById(id,function(err,movie){
    res.render('admin',{
      title:'后台更新页',
      movie:movie
    })
  })
 }
})

//admin post movie
app.get('admin/movie/new',function(req,res){
  var id=req.body.movie._id;
  var movieObj=req.body.movie;
  var _movie;
  if(id!=="undefined"){
    Movie.findById(id,function(err,movie){
      if(err){
        console.log(err);
      }
      _movie=_.extend(movie,movieObj);
      _movie.save(function(err,movie){
        if(err){
           console.log(err);
        }
        res.redirect('/movie/'+movie._id);
      })
    })
  }else{
    _movie=new Movie({
      doctor:movieObj.doctor,
      title:movieObj.title,
      country:movieObj.country,
      language:movieObj.language,
      year:movieObj.year,
      poster:movieObj.poster,
      summary:movieObj.summary,
      flash:movieObj.flash
    })
     _movie.save(function(err,movie){
        if(err){
           console.log(err);
        }
        res.redirect('/movie/'+movie._id);
      })
  }
})


app.get('/admin/list',function(req,res){//路由匹配规则，回调函数
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err);
    }
   res.render('list',{
    title:'nodemd 列表页',
    movies:movies
    })
  })
  
})

//list delete movie

app.get('admin/list',function(req,res){
 var id=req.query.id;
 if(id){
  Movie.remove({_id:id},function(err,movie){
    if(err){
      console.log(err);
    }else{
      res.json({success:1});
    }
  })
 }
})