Khanvos = new Meteor.Collection('khanvos');
Khanvos.allow({
	update: ownsDocument
});

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
			members: [],
			lastPoster: user._id,
			postCount: 0
		});

		var khanvoId = Khanvos.insert(khanvo);

		if (user.profile.following.length <= 5) {
			Khanvos.update({
				_id: khanvoId,
				followers: {$ne: user._id}
			}, {
				$addToSet: {followers: user.username, members: user.username}
			});
			
			Meteor.users.update({
				_id: user._id
			}, {
				$addToSet: {'profile.following': khanvoId}
			});

			var postHack = {$set:{}};
			postHack.$set[khanvoId] = khanvo.postCount;
			Meteor.users.update(user._id, postHack);


		} else {
			throw new Meteor.Error(420, "You're already following FIVE");
		};

		return khanvoId;
	},
	follow: function(khanvoId) {
		var user = Meteor.user();
		var khanvo = Khanvos.findOne({_id: khanvoId});
		//var setReadLoc = profile.following.khanvoId.read;
		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, 'You need to login to follow, fool');
		if (user.profile.following.length <= 5) {
			Khanvos.update({
				_id: khanvoId,
				followers: {$ne: user._id}
			}, {
				$addToSet: {followers: user.username}
			});
			
			Meteor.users.update({
				_id: user._id
			}, {
				$addToSet: {'profile.following': khanvoId}//,
				//$set: {setReadLoc: khanvo.postCount}
			});

			var postHack = {$set:{}};
			postHack.$set[khanvoId] = khanvo.postCount;
			Meteor.users.update(user._id, postHack);


		} else {
			throw new Meteor.Error(420, "You're already following FIVE");
		}
	},
	newGuy: function(newMember) {
		var newbie = Meteor.users.findOne({username: newMember.newMember});
		var khanvo = Khanvos.findOne({_id: newMember.khanvoId});
		var thisKhanvo = newMember.khanvoId;

		if (newbie.profile.following.length <= 15) {
			Khanvos.update({
				_id: newMember.khanvoId,
				followers: {$ne: newbie._id}
			}, {
				$addToSet: {followers: newbie.username, members: newbie.username}
			});
			
			//var followingIndex = 0;
			//var modifier = {};
			//modifier["profile.following." + followingIndex + ".read"] = khanvo.postCount;

			Meteor.users.update({
				_id: newbie._id
			}, {
				$addToSet: {'profile.following': newMember.khanvoId}
				//$push: {'thisKhanvo': khanvo.postCount}//,
				//$setOnInsert: modifier
			});


			var postHack = {$set:{}};
			postHack.$set[thisKhanvo] = khanvo.postCount;
			Meteor.users.update(newbie._id, postHack);
			
			/* this is the shit that works


			console.log(newbie.profile.following);
			console.log(newMember.khanvoId.toString());
			var followingIndex = 0;
			//var followingIndex = _.indexOf(newbie.profile.following, newMember.khanvoId);
			//var modifier = {$set: {}};
			var modifier = {$set: {}};
			modifier.$push["profile.following." + followingIndex + ".read"] = khanvo.postCount;
			Meteor.users.update(newbie._id, modifier);


			*/


			//var setReadLoc = newbie.profile.following.thisKhanvo;
			//Meteor.users.profile.following.thisKhanvo.update({
			/*var index = 0;
			var setModifier = {};
			setModifier['profile.following.' + index + '.read'] = khanvo.postCount;
				//set['profile.following.' + thisKhanvo + '.read'] = khanvo.postCount;
				//set['profile.following[0]read'] = khanvo.postCount;

			Meteor.users.update({
				_id: newbie._id
			}, {
				$set: setModifier
			});*/


		} else {
				throw new Meteor.Error(420, "You're already following FIVE");
		}
	}
});
