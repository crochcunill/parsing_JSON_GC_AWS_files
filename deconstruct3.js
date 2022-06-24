// The purpose is to check that all policies that appear in awsAuthDetail.json also appear in awsPolicies_LZ0.json

// Declare variables
var fs = require('fs')
var obj,obj2,obj3, obj4
var fileName1, fileName2

var array1=[]
var array2=[]
//obj=myFileLength("rolesCSPM.json")
//obj=myFileLength("policiesCSPM3.json")

//obj=myFileLength("awsRoles_LZ0.json","Roles", "obj.Roles.length")
//obj3=myFileLength("awsAuthDetails_LZ0.json", "Roles","obj.RoleDetailList.length")

//obj2=myFileLength("awsPolicies_LZ0.json", "Policies","obj.Policies.length")
obj4=findPolicies("awsAuthDetails_LZ0.json", "awsPolicies_LZ0.json","obj.Policies.length")




function findPolicies(fileName1,fileName2, element){
    fs.readFile(fileName1, 'utf8',  handleFile)
    fs.readFile(fileName2, 'utf8',  handleFile2)

    function handleFile(err, data) {
        if (err) throw err
        obj = JSON.parse(data)
       // console.log(obj.length)
        for(var i = 0; i < obj.Policies.length; i++)
            {
                array1.push(obj.Policies[i].Arn)

            }
            console.log("Number of elements for " + fileName1 + ": " + array1.length)
        }

   function handleFile2(err, data) {
        if (err) throw err
        obj = JSON.parse(data)
          // console.log(obj.length)
        for(var i = 0; i < obj.Policies.length; i++)
               {
               array2.push(obj.Policies[i].Arn)
          }
          console.log("Number of elements for " + fileName1 + ": " + array2.length)
       }

       console.log("Number of elements for " + fileName1 + ": " + array1.length)
       console.log("Number of elements for " + fileName1 + ": " + array2.length)
}



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



