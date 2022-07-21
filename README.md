# parsing_JSON_GC_AWS_files





# Extracting the information from Cloud Guard API


There are two possible commands you can use 

curl -s -u <login>:<password> https://api.dome9.com/v2/CloudIamRole


or 

curl -X GET   https://api.dome9.com/v2/CloudIamRole  -H 'Accept: application/json'     -H 'Authorization: Basic <token>'




# Two different test approach
Probably using GitHub actions
Using AWS CLI commands, Count different AWS artifacts and then save the results to file
Use a second script, to read the file, run the count again and compare. Display any change


Compare results from AWS CLI with CloudGuard API



Result file to be mailed

Perhaps two workflows