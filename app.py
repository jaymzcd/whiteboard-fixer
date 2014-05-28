import os
import subprocess
from flask import Flask, render_template, request, url_for, redirect, send_from_directory
from werkzeug import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '/tmp/'


@app.route("/", methods=['POST', 'GET'])
def upload():
    if request.method == 'POST':
        f = request.files['userfile']
        filename = secure_filename(f.filename)
        outname = 'clean-{}'.format(filename)
        path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        out_path = os.path.join(app.config['UPLOAD_FOLDER'], outname)
        f.save(path)
        subprocess.call(['./scripts/cleanup.sh', path, out_path])
        return url_for('uploaded_file', filename=outname)
    return render_template('upload.html')


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
