angular.module('firebase.config', [])
  .constant('FBURL', 'radiant-torch-6133.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','google'])

  .constant('loginRedirectPath', '/login');
