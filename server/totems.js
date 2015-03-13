var q = require('q');
var _ = require('lodash');
var db = require('./db');
var ObjectId = require('mongojs').ObjectId;

var totems = db.collection('totems');

module.exports = {
	http: function(app) {
		app.post('/api/totems', buildTotem);
		app.get('/api/totems/:id', getTotem);
		app.post('/api/totems/:id/marker', buildMarker);
	},
	events: function(socket) {
		socket.on('join', function(room) {
			socket.join(room);

			socket.on('update-marker', function(marker) {
				updateMarker(room, marker);
				socket.broadcast.to(room).emit('update-marker', marker);
			});

			socket.on('disconnect', function() {

			});
		});
	}
};

function buildTotem(req, res) {
	req.body.options = {
		labelContent: req.body.name
	};

	var id = ObjectId(),
		totem = _.defaults(req.body, require('./totem'));

	totem.id = id;
	totem._id = id;

	totems.save(totem, function(err, totem) {
		res
			.send(totem);
	});
}

function buildMarker(req, res) {
	var marker = _.defaults(req.body, require('./marker'));
	marker.id = ObjectId();

	totems
		.update(
		{_id: ObjectId(req.params.id)},
		{$push: {'markers.models': marker}},
		function(err) {
			if (!err) {
				res.send(marker);
			} else {
				res
					.status(500)
					.send();
			}
		});
}

function getTotem(req, res) {
	totems.findOne({id: ObjectId(req.params.id)}, function(err, totem) {
		res.send(totem);
	});
}

function updateMarker(totem, marker) {
	totems
		.update(
		{_id: ObjectId(totem), 'markers.models.id': marker.id},
		{$set: {'markers.models.$': marker}});
}