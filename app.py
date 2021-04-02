import random
from flask import Flask, jsonify, redirect

DEBUG = False

app = Flask(__name__)
if DEBUG:
    from flask_cors import CORS
    CORS(app)


with open("memes.txt") as f:
    FILE_CONTENTS = [i.strip() for i in f.readlines()]

@app.route("/")
def home():
    loc = random.randint(0, len(FILE_CONTENTS))
    return jsonify({
        "data": FILE_CONTENTS[loc],
        "loc": loc
    })

@app.route("/<loc>")
def getData(loc):

    try:
        loc = int(loc)
    except ValueError:
        return "Input is not an integer"

    if loc >= len(FILE_CONTENTS):
        output = jsonify({
            "data": "Invalid Location"
        })
    else:
        output = jsonify({
            "data": FILE_CONTENTS[loc]
        })
    
    return output

if __name__ == "__main__":
    app.run(debug= True)