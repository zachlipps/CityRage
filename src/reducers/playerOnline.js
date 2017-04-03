import {database} from '../firebase.js';

export default function(state = [], action) {
  switch (action.type) {
  case 'ADD_ONLINEPLAYER' : 
    return 'lol';
  default: 
    console.log('reducer', state);
    return state;
  }
}


function showNames() {
  var array = [];
  database.ref('/users').on('value', (snapshot) => {               
    snapshot.forEach(user =>{           
      if (user.val().currentlyOn) {          
        array.push(user.val().displayName);
        console.log('Whos here', user.val().displayName);
      }
    });
  }); 
  console.log(array);
  return array;
}