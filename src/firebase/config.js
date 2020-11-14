import Firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyAgJQTXN6fDEc7nhpsXXXxvAPl0a-RdOoQ',
  authDomain: 'advisory-board-68f3f.firebaseapp.com',
  databaseURL: 'https://advisory-board-68f3f.firebaseio.com/',
  projectId: 'advisory-board-68f3f',
  storageBucket: 'advisory-board-68f3f.appspot.com',
  messagingSenderId: '328776166384',
  appId: '1:328776166384:web:1a7dbe0970be9b4ee38b35',
};

export default Firebase.initializeApp(firebaseConfig);
