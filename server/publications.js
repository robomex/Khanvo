Meteor.publish('khanvos', function() {
	return Khanvos.find({followers: this.userId});
});
Meteor.publish('posts', function(khanvoName) {
	return Posts.find({khanvoName: khanvoName});
});
Meteor.publish('allUsernames', function() {
	return Meteor.users.find();
});