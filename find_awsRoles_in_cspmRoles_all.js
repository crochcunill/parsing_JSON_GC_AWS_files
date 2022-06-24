// The purpose is to check that all policies that appear in awsPolicies.json also appear in 
// cspmCloudIamPolicy.json using the arn (note: AWS used Arn) as identifier
// It also works using obj.Policies[i].PolicyName (file from AWS) with obj[j].policyName)(file from Checkpoint)

// This test can be executed using awsAuthDetails, however, there are  more policies listed by  
// in awsPolicies than in awsAuthDetails. 

// Declare variables
var fs = require('fs')
var obj,obj2,obj3, obj4
var fileName1, fileName2

var array1=[]
var array2=[]

obj4=findPolicies("awsRoles_LZ0_admin.json", "cspmRoles.json")


function findPolicies(fileName1,fileName2){
    fs.readFile(fileName1, 'utf8',  handleFile)
   // fs.readFile(fileName2, 'utf8',  handleFile2)

    function handleFile(err, data) {
        if (err) throw err
        obj = JSON.parse(data)
       // console.log(obj.length)
        //for(var i = 0; i < obj.Roles.length; i++)
         for(var i = 0; i < obj.Roles.length; i++)
            {
                //array1.push(obj.Roles[i].Arn)
                //array1.push(obj.Roles[i].RoleName)
                array1.push(obj.Roles[i].RoleId)
      
             
            }
            console.log("1>>>>>>> Number of elements for " + fileName1 + ": " + array1.length)

        fs.readFile(fileName2, 'utf8',  handleFile2)           
    }

    function handleFile2(err, data) {
        if (err) throw err
        obj2 = JSON.parse(data)
        // console.log(obj.length)
        for(var j = 0; j < obj2.length; j++)
            {
                //array2.push(obj2[j].arn)
                //array2.push(obj2[j].name)
                array2.push(obj2[j].externalId)
            }
        console.log("2>>>>>>>  Number of elements for " + fileName2 + ": " + array2.length)
        displayResults(fileName1,fileName2)
    }
}


function displayResults(fileName1,fileName2){
        var count=0
        for(var j = 0; j < array1.length; j++)
        {
           if (array2.includes(array1[j]) === false) {
            console.log("The arn " + array1[j] + " from " + fileName1 + " was not found in " + fileName2)
            count++
        }
          // else   console.log("all ducky")    
        }
        console.log("3>>>>>>> The number of elements from " + fileName1 + " not found in " + fileName2 + " is " + count)

    }





