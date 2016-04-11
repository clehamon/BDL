angular.module('firebase.config', [])
  .constant('FBURL', 'idpteam22.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','google'])

  .constant('loginRedirectPath', '/login');
