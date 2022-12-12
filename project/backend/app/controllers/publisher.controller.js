const client = require('./../config/connection.js')

exports.findpublishersByName = (req,res) => {

    let publisher_name = req.query.pname;

    findPublishersByName(publisher_name,res);


   
}

function findPublishersByName(pname, res){

    client.query(`SELECT * FROM publisher WHERE LOWER(pname) LIKE LOWER('%${pname}%')`, (err,result) => {
        if (!err){
            let data = result.rows;
            res.status(200).send(data);
        }
        else{
            res.status(500).send("Error")
        }
    })
}



exports.findOne = (req,res) => {

    let pid = req.params.id;
    let publisherid = req.body
    client.query(`SELECT * from publisher where publisherid='${pid}'`, (err,result) => {
        if(!err){
            let data = result.rows[0];
            res.status(200).send(data);
        }
        else{
            res.status(500).send("Error");
        }
    })

}

exports.update = (req,res) => {

    let data = req.body;
    let {pid, pName, pAddress, pEmail, phoneNum, bankName, cardNumber} = data;
    let updateQuery = `UPDATE publisher SET publisherid='${pid}', pname='${pName}', paddress= '${pAddress}'
    pemail='${pEmail}', phonenum='${phoneNum}', bankname='${bankName}', cardnumber='${cardNumber}' WHERE publisherid= '${publisherid}'`

    client.query(updateQuery, (err,result) => {
        if (!err){
            res.status(200).send({message: "Updated Successfully! Reloading in a few seconds to see the update!"})
        }
        else{
            res.status(500).send({message: "Error"})
        }
    })
    
}

//post request 
exports.insertNewPublisher= (req,res) => {

    let data = req.body;

    let pid = Math.floor(Math.random()*1000);

    let {pName, pAddress, pEmail, phoneNum, bankName, cardNumber} = data;

    client.query(`INSERT INTO publisher(publisherid, 
        pname,paddress,pemail, phonenum, bankname, cardnumber) VALUES ('${pid}','${pName}','${pAddress}',
        '${pEmail}', '${phoneNum}', '${bankName}', '${cardNumber}')`, (err,result) => {
        if (!err){
            res.status(200).send({message: "Posted Successfully! Redirecting to the main page..."})
        }
        else{
            res.status(500).send({message: "Error"})
        }
    })
}
