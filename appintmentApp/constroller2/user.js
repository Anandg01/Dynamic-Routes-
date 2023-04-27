const user=require('../model2/user');
const { all } = require('../rount2/admin');

exports.getuser=(req, res)=>{
user.findAll()
.then(data=>{
    res.json(data)
})
.catch(err=>console.log(err))
}

exports.postuser=(req, res)=>{
 user.create({
    name:'pankaj',
    email:'pk@gmail.com',
    PhoneNumber:3455443
 })
 .then(()=>{
    console.log('data added')
    res.send(`<h1>Data added</h1>`)
})
 .catch(err=>console.log(err))
}

exports.postadd=(req, res)=>{
    const ob=req.body;
    const id= ob.id;
  const obj={name:ob.name, email:ob.email, PhoneNumber:ob.PhoneNumber}
    console.log(req.body);
  if(id){
  user.findByPk(id)
  .then(persion=>{
     persion.name=ob.name;
     persion.email=ob.email;
     persion.PhoneNumber=ob.PhoneNumber;
     return persion.save();
  }).then(()=>{
        res.json(ob);
    console.log("persion delails updated")
})
  .catch(err=>console.log(err))
  }
else{
    user.create(obj)
    .then(()=>{
       return  user.findAll()
    })
    .then(alld=>{
     res.json(alld[alld.length-1])

    })
    .catch()
}
}

exports.deleteById=(req, res)=>{
    const id= req.params.id;
 console.log(id)
 user.findByPk(id).then(result=>{
    return result.destroy();
 })
 .then(()=>{
    console.log('user data destroy')
    res.json({status:true});
})
 .catch(err=>console.log(err))
}