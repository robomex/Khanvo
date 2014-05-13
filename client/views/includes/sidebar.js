Template.sidebar.helpers({
	khanvo: function() {
		return Khanvos.find();
	},
	activeRouteClass: function(/* route names */) {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop();

		var active = _.any(args, function(name) {
			return Router.current().route.name === name
		});
		return active && 'active';
	}
});

Template.khanvoList.helpers({
	activeRouteClass: function(/* route names */) {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop();

		var active = _.any(args, function(name) {
			return Router.current().path.substring(1) === name
		});
		return active && 'active';
	}
});

