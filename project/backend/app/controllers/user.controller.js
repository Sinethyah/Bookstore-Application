const client = require('./../config/connection.js')

let currentuser="";

exports.findUsersByFullName = (req,res) => {

    
    let user_fname = req.query.userfname;
    console.log(user_fname)

    let user_lname = req.query.userlname;
    console.log(user_lname);

    if (user_fname!="" && user_lname==""){
        console.log(1)
        findUsersByuserfname(user_fname,res);
    }
    else if (user_lname!="" && user_fname==""){
        console.log(2)
        findUsersByuserlname(user_lname,res);
    }
    else if (user_fname!="" && user_lname!=""){
        console.log(3)
        findUsersByuserFullName(user_fname,user_lname,res);
    }


    
}

exports.findAllUsers = (req, res) => {
    //console.log(req.query.user)

    if (!req.query.user){
        //console.log(1)
        client.query(`SELECT userid, userfname FROM userlibrary`, (err,result) => {
            if (!err){
                let data = result.rows;
                console.log(data)
                res.status(200).send(data);
            }
            else{
                console.log(err)
                res.status(500).send("Error")
            }
        })
    }
    else{
        //console.log(2);
        console.log(req.query.user);
        currentuser = req.query.user
    }

    

}

function findUsersByuserfname(user_fname, res){

    client.query(`SELECT * FROM userlibrary WHERE LOWER(userfname) LIKE LOWER('%${user_fname}%')`, (err,result) => {
        if (!err){
            let data = result.rows;
            console.log(data)
            res.status(200).send(data);
        }
        else{
            console.log(err)
            res.status(500).send("Error")
        }
    })
}


function findUsersByuserlname(user_lname, res){

    client.query(`SELECT * FROM userlibrary WHERE LOWER(userlname) LIKE LOWER('%${user_lname}%')`, (err,result) => {
        if (!err){
            let data = result.rows;
            console.log(data)
            res.status(200).send(data);
        }
        else{
            console.log(err)
            res.status(500).send("Error")
        }
    })
}

function  findUsersByuserFullName(user_fname,user_lname,res){

    client.query(`SELECT * FROM userlibrary WHERE LOWER(userlname) LIKE '%${user_lname}%' and LOWER(userfname) LIKE '%${user_fname}%'`, (err,result) => {
        if (!err){
            let data = result.rows;
            console.log(data)
            res.status(200).send(data);
        }
        else{
            console.log(err)
            res.status(500).send("Error")
        }
    })

}


exports.findOne = (req,res) => {

    let pid = req.params.id;
    client.query(`SELECT * from userlibrary where userid='${pid}'`, (err,result) => {
        if(!err){
            //console.log(result);
            let data = result.rows[0];
            //console.log(data);
            res.status(200).send(data);
        }
        else{
            res.status(500).send("Error");
        }
    })

}

exports.update = (req,res) => {

    let data = req.body;
    console.log(data)
    let {userID, Userfname, Userlname, BAddress, SAddress, PhoneNum, bankName, cardNumber} = data;
    let updateQuery = `UPDATE userlibrary SET userfname='${Userfname}', userlname='${Userlname}',
    baddress='${BAddress}', saddress='${SAddress}', phonenum='${PhoneNum}', bankname='${bankName}', cardnumber='${cardNumber}' WHERE userid= '${userID}'`

    client.query(updateQuery, (err,result) => {
        if (!err){
            res.status(200).send({message: "Updated Successfully! Reloading in a few seconds to see the update!"})
        }
        else{
            console.log(err);
            res.status(500).send({message: "Error"})
        }
    })
    
}

//post request 
exports.insertNewUser = (req,res) => {

    let data = req.body;
    console.log(data)

    let userID = Math.floor(Math.random()*1000);

    let {Userfname, Userlname, BAddress, SAddress, PhoneNum, bankName, cardNumber} = data;
    let updateQuery = `INSERT INTO userlibrary(userid,userfname,userlname,baddress,saddress,phonenum,bankname, cardnumber) 
    VALUES('${userID}','${Userfname}', '${Userlname}', '${BAddress}','${SAddress}','${PhoneNum}','${bankName}', '${cardNumber}')`

    client.query(updateQuery, (err,result) => {
        if (!err){
            res.status(200).send({message: "Posted Successfully! Redirecting to the main page..."})
        }
        else{
            console.log(err);
            res.status(500).send({message: "Error"})
        }
    })
}
