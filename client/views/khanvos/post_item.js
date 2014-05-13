Template.postItem.helpers({
	submittedText: function() {
		return jQuery.timeago(new Date(this.submitted));
	},
	votedClass: function() {
		var userId = Meteor.userId();
		if (userId && !_.include(this.voters, userId)) {
			return 'btn-primary votable';
		} else {
			return 'disabled';
		}
	}
});
Template.postItem.events({
	'click .votable': function(e) {
		e.preventDefault();
		Meteor.call('vote', this._id);
	}
});