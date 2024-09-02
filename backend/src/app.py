# UNITS
from flask import Flask, request, jsonify 
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

# STAR FLASK
app = Flask(__name__)
# CONNECTION TO MONGODB
app.config["MONGO_URI"] = 'mongodb://localhost/db_database'
mongo = PyMongo(app)

CORS(app)

# TAHE THE USERS COLLECTIONS
db = mongo.db.users

# ROUTES
# CREATE USER
@app.route('/users', methods=['POST'])
def createUsers():
  user_data = {
    'name' : request.json['name'],
    'email' : request.json['email'],
    'password' : request.json['password']
  }
  id = db.insert_one(user_data)
  return jsonify(str(id.inserted_id))

# TAKE ALL USERS 
@app.route('/users', methods=['GET'])
def getUsers():
  users = []
  for doc in db.find():
    users.append({
      '_id' : str(ObjectId(doc['_id'])),
      'name' : doc['name'],
      'email' : doc['email'],
      'password' : doc['password'],
    })
  return jsonify(users)

# GET USER BY ID
@app.route('/user/<id>', methods=['GET'])
def getUser(id):
  user = db.find_one({'_id' : ObjectId(id)})
  print(user['name'])
  return jsonify({
    '_id' : str(ObjectId(user['_id'])),
    'name' : user['name'],
    'email' : user['email'],
    'password' : user['password']
  })

# DELETE USER
@app.route('/user/<id>', methods=['DELETE'])
def deleteUsers(id):
  db.delete_one({'_id' : ObjectId(id)})
  return jsonify({'msg' : 'Usuario eliminado con exito'})

# UPDATE USER
@app.route('/user/<id>', methods=['PUT'])
def updateUsers(id):
  print(id)
  db.update_one({'_id' : ObjectId(id)}, {'$set': {
    'name' : request.json['name'],
    'email' : request.json['email'],
    'password' : request.json['password']
  }})
  return jsonify({'msg' : 'Usuario actualizado con exito'})

# RUN APP
if __name__ == "__main__":
  app.run(debug = True)
