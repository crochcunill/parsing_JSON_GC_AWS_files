
// Declare variables
var fs = require('fs')
var obj,obj2,obj3, obj4
var fileName1, fileName2

var array1=[]
var array2=[]

obj4=findPolicies("userID.txt", "cspmCloudIamPolicy.json")
//obj4=findPolicies("userID.txt", "cspmAccountSummary_LZ0.json")
function findPolicies(fileName1,fileName2){
    fs.readFile(fileName1, 'utf8',  handleFile)
    

    function handleFile(err, data) {
        if (err) throw err
        const allFileContents = fs.readFileSync('userID.txt', 'utf-8');
        allFileContents.split(/\r?\n/).forEach(line =>  {  
  
            array1.push(`${line}`)
        
          })

            console.log("1- Number of elements for " + fileName1 + ": " + array1.length)

        fs.readFile(fileName2, 'utf8',  handleFile2)           
        }

        function handleFile2(err, data) {
                if (err) throw err
                obj = JSON.parse(data)
                // console.log(obj.length)
                for(var j = 0; j < obj.length; j++)
                    {
                    if ((array2.includes(obj[j].externalAccountId) === false)){
                        array2.push(obj[j].externalAccountId)
                        //array2.push(obj[j].externalId)

                    }     

                }
                console.log("1- Number of elements for " + fileName2 + ": " + array2.length)
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
            //console.log("......................." + count)
            } 
        }
        console.log(">>>>>>> The number of elements from " + fileName1 + " not found in " + fileName2 + " is " + count)

    }









/*

const fs = require('fs');
var i=0

const allFileContents = fs.readFileSync('userID.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line =>  {  
  console.log(i + "   "+ `${line}`);
  i++
});
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

*/