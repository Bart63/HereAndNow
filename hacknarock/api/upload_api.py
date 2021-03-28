import os
from upload import app
from flask import request, jsonify, json, Blueprint
from werkzeug.utils import secure_filename
from database import Room

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

upload_route = Blueprint('upload_route', __name__, template_folder='templates')

@upload_route.route('/file-upload', methods=['POST'])
def upload_file():
	if 'file' not in request.files:
		resp = jsonify({'message' : 'No file part in the request'})
		resp.status_code = 400
		return resp
	file = request.files['file']
	if file.filename == '':
		resp = jsonify({'message' : 'No file selected for uploading'})
		resp.status_code = 400
		return resp
	if file and allowed_file(file.filename):
		filename = secure_filename(file.filename)
		path_to_file = os.path.join(app.config['UPLOAD_FOLDER'], filename)
		file.save(path_to_file)
		data = json.loads(request.data)
		room_id = data['room_id']
		room = Room.query.get(room_id)
		room.main_image = path_to_file
		db.session.commit()
		resp = jsonify({'message' : 'File successfully uploaded'})
		resp.status_code = 201
		return resp
	else:
		resp = jsonify({'message' : 'Allowed file types are txt, pdf, png, jpg, jpeg, gif'})
		resp.status_code = 400
		return resp
