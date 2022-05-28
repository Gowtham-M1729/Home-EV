import pymongo
from flask import Flask, jsonify, request, session, redirect, url_for
import uuid
from passlib.hash import pbkdf2_sha256
from flask_cors import CORS, cross_origin
from bson.json_util import dumps, loads
import os
import math
import random
import smtplib
from datetime import datetime

app = Flask(__name__)
app.secret_key = b'\xcc^\x91\xea\x17-\xd0W\x03\xa7\xf8J0\xac8\xc5'
CORS(app, support_credentials=True)
# scheduler=APScheduler()
# app.config['CORS_HEADERS'] = 'Content-Type'
# url = "mongodb+srv://user1234:<password>@cluster0.72wkf1c.mongodb.net/?retryWrites=true&w=majority"
# client = pymongo.MongoClient(url)
# db = client.customer_details
# Database
# client = pymongo.MongoClient('localhost', 27017)
# db = client.user_login_system
url = "mongodb+srv://user1234:59dLdTzaKaqimTt@user.vl67u.mongodb.net/user_login_system?retryWrites=true&w=majority"
client = pymongo.MongoClient(url)
db = client.customer_details
dbpl = client.plug_points
dbp = client.providers
dbq=client.queue


class User:
    def start_session(self, user):
        print(user)
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        return jsonify(user), 200

    def signup(self, name, email, password,mob_no,reg_no):
        # print(request.form)

        # Create the user object
        user = {
            "_id": uuid.uuid4().hex,
            "c_name": name,
            "c_email": email,
            "mobile_no":mob_no,
            "car_reg":reg_no,
            "password": password
        }

        # Encrypt the password
        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        # Check for existing email address
        if db.users.find_one({"c_email": user['c_email']}):
            return jsonify({"error": "Email address already in use"}), 400

        if db.users.insert_one(user):
            self.start_session(user)
            return jsonify({"message":"Succesfully signed up"})

        return jsonify({"error": "Signup failed"}), 400

    def login(self, email, password):
        print("Hello", email, password)

        user = db.users.find_one({
            "c_email": email
        })
        print(user)
        # print(pbkdf2_sha256.verify(password, user['password']))
        if user and pbkdf2_sha256.verify(password, user['password']):
            print("Login sucessful")
            self.start_session(user)
            return jsonify({"message":"Sucessfully Logged in"})

        return jsonify({"error": "Invalid login credentials"}), 401




class provider:
    def start_session(self, provider):
        print(provider)
        del provider['password']
        session['logged_in'] = True
        session['provider'] = provider
        return jsonify(provider), 200
    def apply(self, name, email, password,mob_no,lat,long):
        # print(request.form)
        print("dfg")
        # Create the provider object
        provider = {
            "_id": uuid.uuid4().hex,
            "p_name": name,
            "p_email": email,
            "mobile_no": mob_no,
            "latitude": lat,
            "longitude": long,
            "password": password
        }
        print("dfg")
        # Encrypt the password
        provider['password'] = pbkdf2_sha256.encrypt(provider['password'])

        # Check for existing email address
        if dbp.provide.find_one({"p_email": provider['p_email']}):
            return jsonify({"error": "Email address already in use"}), 400
        print("dfg")
        if dbp.provide.insert_one(provider):
            self.start_session(provider)
            return jsonify({"message":"Succesfully signed up"})

        return jsonify({"error": "Signup failed"}), 400

    def login(self, email, password):
        print("Hello", email, password)

        provider = dbp.provide.find_one({
            "p_email": email
        })
        print(provider)
        # print(pbkdf2_sha256.verify(password, provider['password']))
        if provider and pbkdf2_sha256.verify(password, provider['password']):
            print("Login sucessful")
            self.start_session(provider)
            return jsonify({"message":"Sucessfully Logged in"})

        return jsonify({"error": "Invalid login credentials"}), 401



class plug_points:
    def update(self,plu_point,name,mob_no):
        pp = {
            "_id": uuid.uuid4().hex,
            "p_name": name,
            "mob_no":mob_no,
            "plu_point":plu_point
        }
        dbpl.plug.insert_one(pp)
        return "Suceessfully Updated"
    def delete(self,plu_point,mob_no):
        pp = {
            "_id": uuid.uuid4().hex,
            "p_name": name,
            "mobile_no":mob_no,
            "plu_point":plu_point
        }
        dbpl.plug.remove({"plu_point":plu_point,"mob_no":mob_no})
        return "Sucessfully Removed"


import math


# Python 3 program for the
# haversine formula
def haversine(lat1, lon1, lat2, lon2):
    # distance between latitudes
    # and longitudes
    dLat = (lat2 - lat1) * math.pi / 180.0
    dLon = (lon2 - lon1) * math.pi / 180.0

    # convert to radians
    lat1 = (lat1) * math.pi / 180.0
    lat2 = (lat2) * math.pi / 180.0

    # apply formulae
    a = (pow(math.sin(dLat / 2), 2) +
         pow(math.sin(dLon / 2), 2) *
         math.cos(lat1) * math.cos(lat2));
    rad = 6371
    c = 2 * math.asin(math.sqrt(a))
    return rad * c

def sendotp(email):
    digits = "0123456789"
    OTP = ""
    for i in range(6):
        OTP += digits[math.floor(random.random() * 10)]
    otp = OTP + " is your OTP"
    msg = otp
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login("gowtham1842001@gmail.com", "wnjityvchfaiastn")
    emailid = email
    s.sendmail('&&&&&&&&&&&', emailid, msg)
    return OTP


def queue():
    body = request.json
    print(body)
    print(body['email'], body['password'])
    return User().signup(body['name'], body['email'], body['password'],body['mob_no'],body['reg_no'])

@app.route('/')
def home():
    return  "Hello World..........."


@app.route('/home')
def test():
    return  "Hello ..."


@app.route('/user/signup', methods=['POST'])
def signup():
    body = request.json
    print(body)
    print(body['email'], body['password'])
    return User().signup(body['name'], body['email'], body['password'],body['mob_no'],body['reg_no'])


@app.route('/user/signout')
def signout():
    return User().signout()

@app.route('/user/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    if request.method == 'POST':
        body = request.json
        print(body)
        return  User().login(body['email'], body['password'])


@app.route('/plugpoints/update',methods=['POST'])
def update():
    body = request.json
    print(body)
    return plug_points().update(body['plu_point'],body['name'],body['mob_no'])


@app.route('/plugpoints/delete',methods=['POST'])
def delete():
    body = request.json
    print(body)
    return plug_points().delete(body['plu_point'],body['mob_no'])

@app.route('/provider/apply', methods=['POST'])
def apply():
    body = request.json
    print(body)
    print(body['email'], body['password'])
    return provider().apply(body['name'], body['email'], body['password'],body['mob_no'],body['lat'],body['long'])


@app.route('/provider/signout')
def signoutprovider():
    return provider().signout()


@app.route('/provider/login', methods=['POST'])
def loginprovider():
    if request.method == 'POST':
        body = request.json
        print(body)
        return  provider().login(body['email'], body['password'])


@app.route('/dashboard',methods=['POST'])
@cross_origin(supports_credentials=True)
def requestdetails():
    if request.method == 'POST':
        body = request.json
        cursor=dbp.provide.find({"longitude": body['long'],"latitude":body['lat']})
        print(cursor)
        plug_data=[]
        for i in cursor:
            plug_data.append(list(dbpl.plug.find({"p_name":i["p_name"]})))
        plug_json=dumps(plug_data)
        list_cur = list(cursor)
        json_data = dumps(list_cur)
        data={
            "user":json_data,
            "plug":plug_json
        }
        return data


@app.route('/getcoordinates',methods=['POST'])
@cross_origin(supports_credentials=True)
def getCoordinates():
    if request.method == 'POST':
        body = request.json
        data = dbp.provide
        lst = []
        for post in data.find({}, {'_id': 0}):
            lat=post['latitude']
            long=post['longitude']
            name=post['p_name']
            mob_no=post['mobile_no']
            if haversine(float(body['lat']),float(body['long']),float(lat),float(long))<=20:
                lst.append({
                    "longitude":long,
                    "latitude":lat,
                    "name":name,
                    "mob_no":mob_no
                })
            print(post)
        print(lst)
        return jsonify(lst)


@app.route('/user/otp', methods=['POST'])
async def sendotp():
    if request.method == 'POST':
        body = request.json
        print(body)
        k=sendotp(body['email'])
        wait(30)
        a = input("Enter Your OTP >>: ")
        if a == OTP:
            print("Verified")
        else:
            print("Please Check your OTP again")

@app.route('/device/otp', methods=['POST'])
async def receievotp():
    if request.method == 'POST':
        body = request.json
        print(body)
        otp=body['OTP']


@app.route('/user/Queue', methods=['POST'])
def queue():
    body = request.json
    print(body)
    print(body['email'])
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    data = {'email': email,
            'initial_time':current_time, 'otp':OTP}
    dbq.queue.insert_one(data)

if __name__ == "__main__":
    # TODO Valid return statements for all routes
    # TODO to filter correct values from database
    app.run(debug=True)
