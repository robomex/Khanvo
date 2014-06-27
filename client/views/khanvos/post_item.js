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
	},
	samePoster: function() {

		if (this.lastPoster == this.author) {
			return true;
		};
	}
});
Template.postItem.events({
	'click .votable': function(e) {
		e.preventDefault();
		Meteor.call('vote', this._id);
	}//,
	/*$('.post-content').waypoint(function() {
		//e.preventDefault();
		var khanvo = Khanvos.findOne({khanvoName: this.khanvoName});
		console.log(khanvo);
		var khanvoId = khanvo._id;
		var seenHack = {$set:{}};
		var user = Meteor.user();
		seenHack.$set[khanvoId] = this.postNumber;
		Meteor.users.update(user._id, seenHack);
		//Meteor.users.update({_id: Meteor.user()}, {$set: {khanvoId: this.postNumber}});
	})*/
});
Template.postItem.rendered = function() {
	$('.post-content').waypoint(function() {
		//e.preventDefault();
		//console.log(this.rr);
		Meteor.call('read', this.title);
	});
};








