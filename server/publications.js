Meteor.publish('khanvos', function() {
	return Khanvos.find();
});
Meteor.publish('posts', function(khanvoName) {
	return Posts.find({khanvoName: khanvoName});
});