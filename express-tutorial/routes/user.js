var express=require('express');
var router=express.Router();

router.get('/:id', (req, res)=>{
    res.send('Received a GET requset, param:'+req.params.id);
}); 

router.post('/', (req, res)=>{
    console.log(JSON.stringify(req.body, null, 2)); // json 형태로 받은 것을 깔끔히 정리
    res.json({
        success: true,
        user : req.body.username
        
    });
    
});

router.put('/', (req, res)=>{
    res.status(400).json({message:'Hey, you. Bad Request!'});
});

router.delete('/', (req,res)=>{
    res.send('Received a DELETE request');
});

module.exports = router;