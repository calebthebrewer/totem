var q = require('q');
var _ = require('lodash');
var db = require('./db');
var ObjectId = require('mongojs').ObjectId;

var totems = db.collection('totems');

var rooms = {};

module.exports = {
	http: function(app) {
		app.post('/api/totems', buildTotem);
		app.get('/api/totems/search', searchTotems);
		app.get('/api/totems/:id', getTotem);
		app.post('/api/totems/:id/marker', buildMarker);
	},
	events: function(socket) {
		socket.on('join', function(room) {
			socket.join(room);
			if (!rooms[room]) rooms[room] = {};

			socket.on('update-marker', function(marker) {
				if (!rooms[room][socket.id]) rooms[room][socket.id] = marker.id;
				updateMarker(room, marker);
				socket.broadcast.to(room).emit('update-marker', marker);
			});

			socket.on('disconnect', function() {
				var markerId = rooms[room][socket.id];
				socket.broadcast.to(room).emit('remove-marker', markerId);
				removeMarker(room, markerId);
				delete rooms[room][socket.id];
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

function searchTotems(req, res) {
	var query = req.query.name;

	totems
		.find({name: new RegExp('.*' + query + '.*')}, function(err, totems) {
			if (!err) {
				res.send(totems);
			} else {
				res
					.status(500)
					.send();
			}
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
		if (!err) {
			if (totem) {
				res.send(totem);
			} else {
				res
					.status(404)
					.send();
			}
		} else {
			res
				.status(500)
				.send();
		}
	});
}

function updateMarker(totem, marker) {
	totems
		.update(
		{_id: ObjectId(totem), 'markers.models.id': marker.id},
		{$set: {'markers.models.$': marker}});
}

function removeMarker(totem, markerId) {
	totems
		.update(
		{_id: ObjectId(totem), 'markers.models.id': markerId},
		{$slice: {'markers.models.$': 1}}
	);
}