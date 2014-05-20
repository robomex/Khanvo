Khanvos = new Meteor.Collection('khanvos');

Meteor.methods({
	khanvo: function(khanvoAttributes) {
		var user = Meteor.user(),
			khanvoWithSameName = Khanvos.findOne({khanvoName: khanvoAttributes.khanvoName});

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Goddammit, you need to login to create a new Khanvo");

		// ensure the khanvo has a name
		if (!khanvoAttributes.khanvoName)
			throw new Meteor.Error(422, "Your Khanvo needs a name, yo");

		// check that there are no previous Khanvos with the same name
		if (khanvoAttributes.khanvoName && khanvoWithSameName) {
			throw new Meteor.Error(302, 'This name has already been taken', khanvoWithSameName._id);
		}

		// pick out whitelisted keys
		var khanvo = _.extend(_.pick(khanvoAttributes, 'khanvoName', 'description'), {
			userId: user._id,
			creator: user.username,
			submitted: new Date().getTime(),
			followers: [],
			lastPoster: user._id
		});

		var khanvoId = Khanvos.insert(khanvo);

		return khanvoId;
	},
	follow: function(khanvoId) {
		var user = Meteor.user();
		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, 'You need to login to follow, fool');
		Khanvos.update({
			_id: khanvoId,
			followers: {$ne: user._id}
		}, {
			$addToSet: {followers: user._id}
		});
	}
});