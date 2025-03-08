# Feature 1 :- Automated Personalized Categorization Of Each Transaction

## Concepts 
A user will have a network of contacts. By contacts i mean a list of upi id and the bank account name. 
With the bank account name. We will try to find out the category of the Transaction with the bank account name 
with the help of ai.


## Flow

Case 1: 
suppose when a newly created user is logged in and tries to send 
some money to a upi id through a normal voice query or plain text. Our system will check whether 
the upi id is present in the users network. If its not present then just say user not found in network. Try 
scanning the qr.

Case 2:
suppose when a newly created user is logged in and tries to send 
some money to a upi id by scanning a qr code. Our system will check whether 
the upi id is present in the users network. If its present then get the category and do further payments.
If its not present then try to get the account name of the scanned upi id and then fetch the kind of account using 
an ai. and then do further payments.

Case 3:
Suppose a user already exists and have a large network and he tries to do a  Transaction without scanning 
qr bcz the receivers upi id and account name will be already present inside the users network. But There maybe 
many users with same name and for that we do some kinda template literals. ie in NLP query user will be saying like 
send X money to "@username@upi" and suggestions will be displayed in real time. and user can select the right guy.




## 

