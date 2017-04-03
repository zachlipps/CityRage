import {database} from '../firebase';

export default function(state = [], action) {
  switch (action.type) {
  case 'UPDATE_PLAYERS' :
    console.log('action.playersOnline', action.playersOnline); 
    return showOnlineUsers();
  default:     
    return state;
  }
}



export const showOnlineUsers = () => {
  var array = [];
  database.ref('/users').on('value', (snapshot) => {               
    snapshot.forEach(user =>{           
      if (user.val().currentlyOn) {          
        array.push(user.val().displayName);
        console.log('Whos here', user.val().displayName);
      }
    });
  }); 
  console.log('showOnlineUsers', array);
  return array;
};
