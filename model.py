# -*- coding: utf-8 -*-
"""
Created on Thu Apr  8 22:55:01 2021

@author: anshu
"""

import pandas as pd
import numpy as np
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score
import xgboost as xgb
import pickle

#settings for xgboost model
param = {
    'max_depth': 8,
    'eta': 0.03,
    'objective': 'binary:hinge',
    'num_class': 1} 
epochs = 25


#Loading data
sb_data=pd.read_csv("./data/Shill_Bidding_Dataset.csv",header=0)

#converting data to numpy arry
data_copy=sb_data.copy()
df=data_copy.to_numpy()
x,y=df[:,3:12],df[:,12]
y=y.astype('int')

#oversampling data 
oversampling = SMOTE()
x, y = oversampling.fit_resample(x, y)

#preparing data
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0)
train = xgb.DMatrix(X_train, label=y_train)
test = xgb.DMatrix(X_test, label=y_test)

#training model
model = xgb.train(param, train, epochs)
predictions = model.predict(test)
print('Acuuracy of prediction = %s' % (accuracy_score(y_test, predictions)*100), end="%\n")

#saving model
pickle.dump(model, open('model.pkl','wb'))