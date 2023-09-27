const express= require('express');
const app=express();
const path=require('path')
const request = require('request'); 
const axios = require('axios');

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static('public'));

app.get('/results',(req,res)=>{

    let query=req.query.search;
    
    // Define the URL you want to send a GET request to
    const apiUrl ='https://api.themoviedb.org/3/search/movie?api_key=9067514b28eaa3db850bdef3691c7b7c&query='+query;
    
    // Send a GET request
    axios.get(apiUrl)
      .then((response) => {
        // Handle the response data
        // console.log('Response Data:', response.data);
        let data=response.data;
        res.render('movies',{data:data , searchQuery:query})
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      });


    // request('https://api.themoviedb.org/3/search/movie?api_key=9067514b28eaa3db850bdef3691c7b7c&query='+query ,(error,response,body)=>{
    //     if(error){
    //         console.log(error);
    //     }
    //     let data=JSON.parse(body);
    //     res.render('movies',{data:data , searchQuery:query})
    // })
})

app.get('/search',(req,res)=>{
    res.render('search');
});
app.listen(3000,()=>{
    console.log('server started at port 3000')
})