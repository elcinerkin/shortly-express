Shortly.createUserView = Backbone.View.extend({
  className: 'creator',

  template: Templates['login'],

  events: {
    'submit': 'login'
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },

  login: function(e) {
    e.preventDefault();
    var $username = this.$el.find('#username');
    var $password = this.$el.find('#password');

    console.log($username.val());
    console.log($password.val());

    var user = new Shortly.User({username : $username.val(), password : $password.val()});
    user.on('sync', this.success, this);
    user.on('error', this.failure, this);
    user.save({});
    $username.val('');
    $password.val('');
  },

  success: function(user) {
    this.stopSpinner();
    var view = new Shortly.LoginView({ model: user });
    this.$el.find('.message').append(view.render().$el.hide().fadeIn());
  },

  failure: function(model, res) {
    this.stopSpinner();
    this.$el.find('#username')
      .val('invalid username or password');
    return this;
  },

  startSpinner: function() {
    this.$el.find('img').show();
    this.$el.find('form input[type=submit]').attr('disabled', 'true');
    this.$el.find('.message')
      .html('')
      .removeClass('error');
  },

  stopSpinner: function() {
    this.$el.find('img').fadeOut('fast');
    this.$el.find('form input[type=submit]').attr('disabled', null);
    this.$el.find('.message')
      .html('')
      .removeClass('error');
  }
});
