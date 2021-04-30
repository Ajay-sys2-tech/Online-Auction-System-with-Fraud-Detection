# -*- coding: utf-8 -*-
"""
Created on Thu Apr  8 23:15:33 2021

@author: Anshuman Raj
"""
import numpy as np
import pickle
import pandas as pd
import xgboost as xgb
from flask import Flask, render_template, request
conv_dict={0:"Normal Bidder",1: "Suspicious Bidder"}
#making the flask app
app = Flask('fraud_dtection')


@app.route('/')
def show_predict_bidder_form():
    return render_template('/predictorform.html')

@app.route('/results', methods=['POST'])
def results():
    form = request.form
    if request.method == 'POST':
# Loading model to compare the results
        model = pickle.load(open('model.pkl','rb'))
        Bidder_ID= request.form['Bidder_ID']
        
#Getting the data
        sb_data=pd.read_csv("./data/Shill_Bidding_Dataset.csv",header=0)
        df=sb_data.to_numpy()
        x=df[int(Bidder_ID):int(Bidder_ID)+2,3:12]
        dtest=xgb.DMatrix(x)
        num_status=model.predict(dtest)
        status=conv_dict[num_status[0]]
#returning all the required values to result
        return render_template('resultsform.html', Bidder_ID=Bidder_ID,   predicted_status=status, Bidder_Tendency=x[0][0], Bidding_Ratio=x[0][1],
        Successive_Outbidding=x[0][2],
        Last_Bidding=x[0][3],
        Winning_Ratio=x[0][7])

app.run("localhost", "9999", debug=True)