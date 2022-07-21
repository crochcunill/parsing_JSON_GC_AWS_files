
import os

import subprocess
import datetime
from os.path import exists

# First export the variables
AWS_ACCESS_KEY_ID="ASIAU3S6ZAK4KNR5K23T"
AWS_SECRET_ACCESS_KEY="rNb3GrAZ/pH4cMP25f5WuvENusF2zq7clMHdfQZu"
AWS_SESSION_TOKEN="FwoGZXIvYXdzEOH//////////wEaDC3Y9eoM/rULB2ecOyLvAVXxbvHWaTUEv/hANItXRNuWmdpUyZMBcasFJvxzckRSfGGcipJV4apxQ7Mqqbb6DIh8oAu3JDb16073rlbwoAWTLrmHflohAFsQA268QMNpwVMP0s6YSUJH3qKQ4CtC0S9t46aKaELHIKSC5d3F0Ebx9bSmUc9/40c4CoW7SrnJTe1Dn6JzV+1ak18eU4RXBxmHNZpfGY6LqRXdMVc2WNzynj2kBKjEC2OK258xxPCg5AN7VT057n0Nt/bDdt9IWyuYhp8W8DXugZzT/Y3xzRpg3iuoZhZQz0A7ZwFI/PgDFKyN8phbV0wh0Ny1a8E2KMak25YGMjKjwWh7oxVMBE/2LH6VvlvIK6C1XFJkr4tUmgk3v4I2iW6igHI32nG/o+VymsQ211xQQQ=="
AWS_DEFAULT_REGION="ca-central-1"




os.environ['AWS_ACCESS_KEY_ID'] = str(AWS_ACCESS_KEY_ID)
os.environ['AWS_SECRET_ACCESS_KEY'] = str(AWS_SECRET_ACCESS_KEY)
os.environ['AWS_SESSION_TOKEN'] = str(AWS_SESSION_TOKEN)
os.environ['AWS_DEFAULT_REGION'] = str(AWS_DEFAULT_REGION)

awsAccountUsed="BCGOV_MASTER_admin_umafubc9"


##############################################
# Functions
##############################################

def saveValues(Name,Value,flag):
    with open(resultsFile, 'a') as f:
        if flag: #if true save with a comma at the end
            f.write('   '+ Name.rstrip('\r\n') + ' : ' +Value.rstrip('\r\n')+ ',\n')
        else:# false no comma
            f.write('   '+ Name.rstrip('\r\n') + ' : ' +Value.rstrip('\r\n')+ '\n')
                
            
def addQuotes(Value):
    return '\"'+ Value.rstrip('\r\n') + '\"'           

def addTab(Value):
    return '   '+ Value     


def getOutput():
    if os.path.exists('./borrar.json'):
        fp = open('./borrar.json', "r")
        output=fp.read()
        fp.close()
        os.remove('./borrar.json')
        return output

def getOutputApi(fileName,node):
    if os.path.exists(fileName):    
        os.system( ' jq \'.' + node + ' | length\' '+ fileName + ' > borrar.json')
        output=getOutput()
        return output

    
def closeResultsFile():
    with open(resultsFile, 'a') as f:
        f.write('   \"TestInformation\": ' +' {\n')
        f.write('       \"DateTime\" : "' +str(datetime.datetime.now())+ '",\n')
        f.write('       \"awsAccountUsed\" : "' + awsAccountUsed + '",\n')
        f.write('       \"AWS_DEFAULT_REGION\" : "' + str(AWS_DEFAULT_REGION) + '"\n')
        f.write('   }\n')
        f.write('}')

def delFile(fileName):
    if os.path.exists(fileName):
        os.remove(fileName)
        return

##############################################
# Checks the existence of the results file, if already exist it will be deleted...
##############################################
resultsFile="./resultsPoliciesInRoles.json"

if os.path.exists(resultsFile):
    print("Script will remove  the existing file " + resultsFile)
    os.remove(resultsFile)

print("Script will (re)create the file " + resultsFile)
with open(resultsFile, 'w') as f:
    f.write('{\n')




############################################################################################
########   Gathering the data section
############################################################################################
os.system('aws iam  get-account-authorization-details | jq \'.RoleDetailList[] | {RoleName, RoleId}\' > apiResults.json')
os.system('jq -r \'[.[]] | @csv\' apiResults.json > apiResults.txt') #Convert the json file to csv, makes life easier for next iteration

##############################################
# Now, it checks the number of accounts associated to each of the organizational units
##############################################    
myApiResults=open('./apiResults.txt',"r")


#with open(resultsFile, 'a') as f:
#        f.write(addTab(addQuotes('OrganizationsInformation')) +' : {\n')

for line in myApiResults:
    myLine = line.replace('\"',"").replace('\'',"").split(",") #We get the Id and the Name of the organizational Units
    os.system('aws iam list-attached-role-policies --role-name ' + myLine[0] + ' | jq \'.AttachedPolicies | length\' > borrar.json')
    #os.system('aws iam list-role-policies --role-name ' + myLine[0] + ' | jq \'.AttachedPolicies | length\' > borrar.json')
    
    #aws iam list-attached-role-policies --role-name AWSServiceRoleForAccessAnalyzer
    output=getOutput() 
    saveValues(addTab(addQuotes('attachedPoliciesToRole_'+myLine[0])),output,True)
    








delFile('./apiResults.txt')
delFile('./apiResults.json')

closeResultsFile()


#Perhaps check how many   "AttachedManagedPolicies":  are associated to each role
#conserving the number and the name will be another test of stability