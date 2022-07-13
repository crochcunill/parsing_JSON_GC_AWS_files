// Change the name of the file and the node, and you get the number of elements

// Declare variables
var fs = require('fs')
var obj,obj2,obj3, obj4
var fileName1, fileName2

var array1=[]
var array2=[]

//obj=myFileLength("./outputFiles/awsListAccounts_LZ0_admin.json","Accounts", "obj.Accounts.length")
obj=myFileLength("./outputFiles/cspmAccountSummary_LZ0.json","Accounts", "obj.length")
//obj3=myFileLength("./outputFiles/awsAuthDetails_LZ0.json", "Roles","obj.RoleDetailList.length")

//obj2=myFileLength("./outputFiles/awsPolicies_LZ0.json", "Policies","obj.Policies.length")
//obj4=findPolicies("./outputFiles/cspmAccountSummary_LZ0.json", "awsPolicies_LZ0.json","obj.Policies.length")



// Write the callback function
function myFileLength(fileName,elementName, element){
    fs.readFile(fileName, 'utf8',  handleFile)
    function handleFile(err, data) {
        if (err) throw err
        obj = JSON.parse(data)
       // console.log(obj.length)
      //  for(var i = 0; i < obj.Roles.length; i++)
       //     {
       //        console.log(i + "         "+ obj.Roles[i].Arn)
       //     }



        console.log("Number of " + elementName + " elements for " + fileName + ": " + eval(element))
    }
}



