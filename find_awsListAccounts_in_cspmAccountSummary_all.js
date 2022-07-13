// The purpose is to check that all policies that appear in awsPolicies.json also appear in 
// cspmCloudIamPolicy.json using the arn (note: AWS used Arn) as identifier
// It also works using obj.Policies[i].PolicyName (file from AWS) with obj[j].policyName)(file from Checkpoint)

// This test can be executed using awsAuthDetails, however, there are  more policies listed by  
// in awsPolicies than in awsAuthDetails. 

// Declare variables
var fs = require('fs')
var obj,obj2,obj3, obj4
var fileName1, fileName2

var array1_name=[]
var array1_id=[]
var array1_arn=[]
var array2_name=[]
var array2_id=[]
var array2_arn=[]


//obj4=findPolicies("awsRoles_LZ0_admin.json", "cspmRoles.json")

obj4=findPolicies("./outputFiles/awsListAccounts_LZ0_admin.json", "./outputFiles/cspmAccountSummary_LZ0.json")

function findPolicies(fileName1,fileName2){
    fs.readFile(fileName1, 'utf8',  handleFile)
   // fs.readFile(fileName2, 'utf8',  handleFile2)

    function handleFile(err, data) {
        if (err) throw err
        obj = JSON.parse(data)
    
        //for(var i = 0; i < obj.Roles.length; i++)
         for(var i = 0; i < obj.Accounts.length; i++)
            {
                array1_id.push(obj.id)
                //array1_name.push(obj.Accounts[i].Name)
                //array1_arn.push(obj.Accounts[i].Arn)
            }
            console.log("1>>>>>>> Number of elements for " + fileName1 + ": " + array1_id.length)

        fs.readFile(fileName2, 'utf8',  handleFile2)           
    }

    function handleFile2(err, data) {
        if (err) throw err
        obj2 = JSON.parse(data)
        // console.log(obj.length)
        for(var j = 0; j < obj2.length; j++)
            {
                array2_id.push(obj2[j].externalId)

            }
        console.log("2>>>>>>>  Number of elements for " + fileName2 + ": " + array2_id.length)
        displayResults(fileName1,fileName2)
    }
}


function displayResults(fileName1,fileName2){
        var count=0
        for(var j = 0; j < array1_name.length; j++)
        {
            if ((array2_id.includes(array1_id[j]) === false))
            {
                console.log("The id " + array1_id[j] + " from " + fileName1 + " was not found in " + fileName2)
                //console.log("The arn " + array1_arn[j] + " from " + fileName1 + " was not found in " + fileName2)
                console.log(count + "..................................................")
                count++   
            }  
        }
        console.log("3>>>>>>> The number of elements from " + fileName1 + " not found in " + fileName2 + " is " + count)

    }





