Template.rightbar.helpers({
	followedClass: function() {
		var userId = Meteor.userId();
		if (userId && !_.include(this.followers, userId)) {
			return 'btn-primary followable';
		} else {
			return 'disabled';
		}
	},
	isMember: function() {
		var userId = Meteor.userId();
		if (userId && _.include(this.members, userId)) {
			return true;
		}
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
