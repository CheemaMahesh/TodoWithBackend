const express=require('express');
const port=8000;
const path=require('path');

const db=require('./config/mongoose');
const TodoList=require('./models/todos');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

const Todos=[{
    name:"Complete the task-1",
    category:"personal",
    date:"06/07/2023"
},
{
    name:"Complete the task-2",
    category:"work",
    date:"06/07/2023"
},
{
    name:"Complete the task-3",
    category:"Cleaning",
    date:"06/07/2023"
},
{
    name:"Complete the task-4",
    category:"other",
    date:"06/07/2023"
}];

const ids=[];


// rendering home page
app.get('/',function(req,res){
    TodoList.find({}).then(function(todos){
    
        // res.render("list", {kindOfDay: day, newItem:FoundItems});
        return res.render('home',{
            title: "Todo List",
            todos: todos
        });
    
      })
       .catch(function(err){
        console.log(err);
      })
});
app.post('/create-todo',function(req,res){
   
    TodoList.create({
        name:req.body.name,
        date:req.body.date,
        category:req.body.category
    });
    // console.log(req.body);

    return res.redirect('/');
});

// var ids=0;
let idss=[];
app.get('/get-id/',function(req,res){
    // console.log(req.query.id);
    idss.push(req.query.id);
    return res.redirect('back');
    // ids.push()
});
app.post('/delete-todos',function(req,res){

    for(let i=0;i<idss.length;i++){
        TodoList.findByIdAndDelete(idss[i]).then(function(){
            // console.log(idss[i]);
        }).catch(function(err){
            console.log(err);
        })
    }


    return res.redirect('back');
})


app.listen(port,function(err){
    if(err){
        console.log("====================================Error:-",err);
        return;
    }
    console.log("server is up and running on port : ",port);
})