// The purpose is to check that all policies that appear in awsPolicies_LZ0_admin.json also appear in 
// cspmCloudIamPolicy.json using the arn 

// Compares arn, Name and Id

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


obj4=findPolicies("awsPolicies_LZ0_admin.json", "cspmCloudIamPolicy.json")

function findPolicies(fileName1,fileName2){
    fs.readFile(fileName1, 'utf8',  handleFile)


    function handleFile(err, data) {
        if (err) throw err
        obj = JSON.parse(data)
        
       // console.log(obj.length)
        for(var i = 0; i < obj.Policies.length; i++)
            {
                array1_name.push(obj.Policies[i].PolicyName)
                array1_id.push(obj.Policies[i].PolicyId)
                array1_arn.push(obj.Policies[i].Arn)
            }
            console.log("1- Number of elements for " + fileName1 + ": " + array1_name.length)

        fs.readFile(fileName2, 'utf8',  handleFile2)           
        }

        function handleFile2(err, data) {
                if (err) throw err
                obj = JSON.parse(data)
                // console.log(obj.length)
                for(var j = 0; j < obj.length; j++)
                    {
                    array2_name.push(obj[j].policyName)
                    array2_id.push(obj[j].policyId)
                    array2_arn.push(obj[j].arn)
                }
                console.log("2- Number of elements for " + fileName2 + ": " + array2_name.length)
                displayResults(fileName1,fileName2)
            }
}


function displayResults(fileName1,fileName2){
        var count=0
        //for(var j = 0; j < array1.length; j++)
        for(var j = 0; j < 10; j++)
        {
           if ((array2_name.includes(array1_name[j]) === false) || (array2_id.includes(array1_id[j]) === false)|| (array2_arn.includes(array1_arn[j]) === false) )
            
            {
            console.log("The name " + array1_name[j] + " from " + fileName1 + " was not found in " + fileName2 + " or ")
            console.log("The id " + array1_id[j] + " from " + fileName1 + " was not found in " + fileName2)
            console.log("The arn " + array1_arn[j] + " from " + fileName1 + " was not found in " + fileName2)
            console.log(count + "..................................................")
            count++   

            } 
        }
        console.log(">>>>>>> The number of elements from " + fileName1 + " not found in " + fileName2 + " is " + count)

    }





