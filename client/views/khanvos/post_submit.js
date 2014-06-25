Template.postSubmit.events({
	'submit form': function(e, template) {
		e.preventDefault();

		var $content = $(e.target).find('[name=content]');
		var post = {
			content: $content.val(),
			khanvoName: template.data.khanvoName,
			postNumber: template.data.postCount
		};

		Meteor.call('post', post, function(error, postId) {
			if (error) {
				throwError(error.reason);
			} else {
				$content.val('');
			} 
		});
	}
});