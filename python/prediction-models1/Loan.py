import pandas as pd
import pickle
from sklearn.preprocessing import StandardScaler
def Loan_pred(Gender, Married, Dependents, Education, Self_Employed, 
              ApplicantIncome, LoanAmount, Credit_History, Property_Area):
    columns = ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 
               'ApplicantIncome', 'LoanAmount', 'Credit_History', 'Property_Area']
    new_data = [Gender, Married, Dependents, Education, Self_Employed, 
                ApplicantIncome, LoanAmount, Credit_History, Property_Area]
    new_df = pd.DataFrame([new_data], columns=columns)
    new_df['Gender'] = new_df['Gender'].apply(lambda x: 1 if x == 'Male' else 0)
    new_df['Married'] = new_df['Married'].apply(lambda x: 1 if x == 'Married' else 0)
    new_df['Education'] = new_df['Education'].apply(lambda x: 1 if x == 'Graduate' else 0)
    new_df['Self_Employed'] = new_df['Self_Employed'].apply(lambda x: 1 if x == 'Yes' else 0)
    new_df['Dependents'] = new_df['Dependents'].astype(int)
    new_df['Property_Area'] = new_df['Property_Area'].map({'Urban': 0, 'Rural': 1, 'Semiurban': 2})
    sc=StandardScaler()
    new_df=sc.fit_transform(new_df)
    try:
        with open("model.pkl", "rb") as gc: 
            model = pickle.load(gc)
        prediction = model.predict(new_df)
        print(prediction)
        return prediction[0]

    except Exception as e:
        return f"Error loading the model or making prediction: {e}"
processed_data = Loan_pred('Male', 'Married', '2', 'Graduate', 'No', 5000, 150, 1, 'Urban')
print(processed_data)
