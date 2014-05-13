Template.rightbar.helpers({
	followedClass: function() {
		var userId = Meteor.userId();
		if (userId && !_.include(this.followers, userId)) {
			return 'btn-primary followable';
		} else {
			return 'disabled';
		}
	}
});

Template.rightbar.events({
	'click .followable': function(e) {
		e.preventDefault();
		Meteor.call('follow', this._id);
	}
});

Template.rightbar.rendered = function() {
  $('[data-toggle=offcanvas]').on('click', function() {
    $('.row-offcanvas').toggleClass('active');
  });
};