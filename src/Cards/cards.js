import shuffle from 'lodash/shuffle';

// dummyCards for testing
const cards = [
  {
    title: 'Quake',
    cost: 1,
    type: 'Discard',
    ability: 'deal 1 dmg to all players',
  },
  {
    title: 'Roar',
    cost: 2,
    type: 'Keep',
    ability: 'your attk + 1',
  },
  {
    title: 'Shield',
    cost: 3,
    type: 'Keep',
    ability: 'all dmg to you - 1',
  },
  {
    title: 'Gobbler',
    cost: 3,
    type: 'Discard',
    ability: 'energy + 1',
  },
  {
    title: 'Swift',
    cost: 2,
    type: 'Keep',
    ability: 'roll die: -1 dmg if <3',
  },
  {
    title: 'Heal',
    cost: 2,
    type: 'Discard',
    ability: 'Gain 2 health',
  },
  {
    title: 'Savant',
    cost: 5,
    type: 'Discard',
    ability: 'Take another turn after this one',
  },
  {
    title: 'Savant',
    cost: 2,
    type: 'Keep',
    ability: 'Add a 1 to your dice on submission',
  },
];
// dummyCards for testing

const market = {
  deck: shuffle(cards),
  face_up: [],
  discarded: [],
};

export default market;
