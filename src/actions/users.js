import {database} from '../firebase';
// import {bindActionCreators} 
const usersRef = database.ref('users');


export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    displayName: user.displayName,
    uid: user.uid,
    photoURL: user.photoURL
  };
};


// export const showOnlineUsers = () => {
//   var array = [];
//   database.ref('/users').on('value', (snapshot) => {               
//     snapshot.forEach(user =>{           
//       if (user.val().currentlyOn) {          
//         array.push(user.val().displayName);
//         console.log('Whos here', user.val().displayName);
//       }
//     });
//   }); 
//   console.log(array);
//   return (dispatch) =>{
//     dispatch(showOnlineUsersAction(array));
//   };
// };

// export const showOnlineUsersAction = (playersOnline) =>{
//   console.log('playersOnline', playersOnline);
//   return {
//     type: 'UPDATE_PLAYERS',
//     playersOnline
//   };
// };

export const showOnlineUsersAction = () =>{
  
  return {
    type: 'UPDATE_PLAYERS'  
  };
};



export const startListeningForUsers = () =>{
  return (dispatch) =>{
    usersRef.on('value', (snapshot) =>{
      dispatch(addUser(snapshot.val()));            
      dispatch(showOnlineUsersAction());
    });
    
  };
};
