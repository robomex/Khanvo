Meteor.publish('khanvos', function(user) {
	if (!user) {
		return;
	} else {
		return Khanvos.find({followers: user.username});
	}
});
Meteor.publish('posts', function(khanvoName, readStart) {
	khanvo = Khanvos.findOne({khanvoName: khanvoName});
	var limit = parseInt(khanvo.postCount - 10);
	return Posts.find({$and: [ {khanvoName: khanvoName}, {postNumber: {$gt: limit}}]});
});
Meteor.publish('allUsernames', function() {
	return Meteor.users.find();
});