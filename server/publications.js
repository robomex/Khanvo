Meteor.publish('khanvos', function(user) {
	if (!user) {
		return;
	} else {
		return Khanvos.find({followers: user.username});
	}
});
Meteor.publish('posts', function(khanvoName) {
	return Posts.find({khanvoName: khanvoName});
});
Meteor.publish('allUsernames', function() {
	return Meteor.users.find();
});