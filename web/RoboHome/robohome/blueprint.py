from flask import Blueprint, jsonify

bp = Blueprint('item', __name__, url_prefix='/arduino')

@bp.route('/status/<int:status>/', methods=['GET', 'PUT', 'POST'])
def postFromArduino(status):
    print "Post recieved: ", status
    return jsonify({})