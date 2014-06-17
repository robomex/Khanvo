Template.rightbar.helpers({
	followedClass: function() {
		var user = Meteor.user();
		if (user && !_.include(this.followers, user.username)) {
			return 'btn-primary followable';
		} else {
			return 'disabled';
		}
	},
	isMember: function() {
		var user = Meteor.user();
		if (user && _.include(this.members, user.username)) {
			return true;
		}
	},
	member: function(khanvoName) {
		return Khanvos.find({khanvoName: khanvoName}, {_id: 0, members: 1});
	}
});

Template.rightbar.settings = function() {
	return {
		position: "bottom",
		limit: 5,
		rules: [
			{
				collection: Meteor.users,
				field: "username",
				template: Template.userPill
			}
		]
	}
};

Template.rightbar.events({
	'click .followable': function(e) {
		e.preventDefault();
		Meteor.call('follow', this._id);
	},
	'submit form': function(e) {
		e.preventDefault();

		var $newMember = $(e.target).find('[name=newMember]');
		var newGuy = {
			newMember: $newMember.val(),
			khanvoId: this._id
		};

		Meteor.call('newGuy', newGuy, function(error, id) {
			if (error) {
				// display the error to the user
				throwError(error.reason);
			} else {
				$newMember.val('');
			}
		});
	}
});

Meteor.subscribe('allUsernames');
