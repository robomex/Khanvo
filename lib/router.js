Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { 
		return Meteor.subscribe('khanvos'); 
	}
});

Router.map(function() {
	this.route('khan', {path: '/'});
	this.route('createKhanvo', {path: '/create'});
	this.route('khanvo', {
		path: '/:khanvoName',
		waitOn: function() {
			return Meteor.subscribe('posts', this.params.khanvoName);
		},
		data: function() { return Khanvos.findOne({khanvoName: this.params.khanvoName}); },
	});
});
var requireLogin = function(pause) {
	if (! Meteor.user()) {
		if (Meteor.loggingIn())
			this.render(this.loadingTemplate);
		else
			this.render('accessDenied');
		pause();
	}
}
Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'createKhanvo'});
Router.onBeforeAction(function() { clearErrors() });