Template.createKhanvo.events({
	'submit form': function(e) {
		e.preventDefault();

		var khanvo = {
			khanvoName: $(e.target).find('[name=khanvoName]').val(),
			description: $(e.target).find('[name=description]').val()
		};

		Meteor.call('khanvo', khanvo, function(error, id) {
			if (error) {
				// display the error to the user
				throwError(error.reason);
				if (error.error === 302)
					Router.go('khanvo', {_id: error.details})
			} else {
				Router.go('khanvo', {khanvoName: khanvo.khanvoName});
			}
		});
	}
});