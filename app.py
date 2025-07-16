from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    failed = "me"
    if request.method == "POST":
        code = request.form["num1"] + request.form["num2"] + request.form["num3"] + request.form["num4"]
        if code == "7129":
            failed = "False"
        else:
            failed = "True"
    return render_template("index.html", failed=failed)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

