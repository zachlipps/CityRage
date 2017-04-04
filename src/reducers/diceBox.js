import { database } from '../firebase';

const 

export default function (state = [], action) {
  switch (action.type) {
    case 'ROLL_DICE' :
      console.log('I am the roll DICE reducer');
      return 'ROLL DICE';
    default:
      return state;
  }
} 