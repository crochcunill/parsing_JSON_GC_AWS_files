

// Declare variables
var fs = require('fs')
var obj
var fileName

//obj=myFileLength("rolesCSPM.json"
//obj=myFileLength("policiesCSPM3.json")
//obj=myFileLength("policiesAWS.json")
obj=myFileLength("awsAccountSummary_LZ0.json")

//obj= fs.readFile('rolesCSPM.json', 'utf8',  handleFile)
//obj= fs.readFile('policiesCSPM.json', 'utf8',  handleFile)


// Write the callback function
function myFileLength(fileName){
    fs.readFile(fileName, 'utf8',  handleFile)
    function handleFile(err, data) {
        if (err) throw err
        obj = JSON.parse(data)
        console.log(obj.length)
        for(var i = 0; i < obj.length; i++)
            {
               console.log(i + "         "+ obj[i].cloudAccountId)
            }



       // console.log("Number of elements for " + fileName + ": " + obj.RoleDetailList.length)
    }
}

