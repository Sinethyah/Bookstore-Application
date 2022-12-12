const client = require('./../config/connection.js')

exports.findByAuthorName = (req,res) =>{

    let author_fname = req.query.authorfname;

    let author_lname = req.query.authorlname;

    if (author_fname!="" && author_lname==""){
        findByAuthorfname(author_fname,res);
    }
    else if (author_lname!="" && author_fname==""){
        findByAuthorlname(author_lname,res);
    }
    else if (author_fname!="" && author_lname!=""){
        findByAuthorFullName(author_fname,author_lname,res);
    }
}

function findByAuthorfname(author_fname,res){


    client.query(`SELECT * FROM author WHERE LOWER(authorfname) LIKE LOWER('%${author_fname}%')` , (err,result) => {
        if (!err){
            let data = result.rows;
            res.status(200).send(data)
        }
        else{
            res.status(500).send({message:"Error! Authors not found"})

        }
    })

}


function findByAuthorlname(author_lname,res){


    client.query(`SELECT * FROM author WHERE LOWER(authorfname) LIKE LOWER('%${author_lname}%')` , (err,result) => {
        if (!err){
            let data = result.rows;
            res.status(200).send(data)
        }
        else{
            res.status(500).send({message:"Error! Authors not found"})

        }
    })

}


function findByAuthorFullName(author_fname, author_lname, res){


    client.query(`SELECT * FROM author WHERE LOWER(authorfname) LIKE LOWER('%${author_lname}%') and 
    LOWER(authorlname) LIKE LOWER('%${author_lname}%')` , (err,result) => {
        if (!err){
            let data = result.rows;
            res.status(200).send(data)
        }
        else{
            res.status(500).send({message:"Error! Authors not found"})

        }
    })

}

exports.findOne = (req,res) => {

    let pid = req.params.id;

    client.query(`SELECT * FROM author WHERE authorid='${pid}'`, (err,result) => {
        if (!err){
            let data = result.rows[0];
            res.status(200).send(data);
        }
        else{
            res.status(500).send("Error")
        }
    })
}

//post 
exports.insertNewAuthor = (req,res) => {

    let data = req.body;
    let {authorfname, authorlname, country} = data;
    let authorId = Math.floor(Math.random()*1000);


    client.query(`INSERT INTO author(authorid, authorfname, authorlname, country) VALUES ('${authorId}','${authorfname}', 
    '${authorlname}', '${country}')`, (err,result)=>{
        if (!err){
            res.status(200).send({message:"New Author added!"})
        }
        else{
            res.status(500).send({message:"No Author added"})
        }
    })

}

//update 
exports.update = (req,res) => {

    let pid = req.params.id;
    let data = req.body;

    let {authorid, authorfname, authorlname, country} = data;

    let updateQuery = `UPDATE author SET authorfname='${authorfname}', authorlname='${authorlname}',
    country = '${country}' WHERE authorid= '${authorid}'`

    client.query(updateQuery, (err,result)=> {
        if (!err){
            res.status(200).send({message:"Updated Successfully!"})
        }
        else{
            res.status(500).send({message:"Could not update. Error!"})
        }
    })

    

}