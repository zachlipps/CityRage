import shuffle from 'lodash/shuffle';

// dummyCards for testing
const cards = [
  // bellow are cards with type='discard'
  {
    title: 'Quake',
    cost: 3,
    type: 'Discard',
    ability: 'deal 1 dmg to all other players',
    effect: 'quake',
  },
  {
    title: 'Apocalypse',
    cost: 6,
    type: 'Discard',
    ability: 'deal 3 dmg to all other players',
    effect: 'apocalypse',
  },
  {
    title: 'Gobbler',
    cost: 3,
    type: 'Discard',
    ability: '+4 energy',
    effect: 'gobbler',
  },
  {
    title: 'PowerUp!',
    cost: 6,
    type: 'Discard',
    ability: '+8 energy',
    effect: 'power_up',
  },
  {
    title: 'Super Saiyan!',
    cost: 8,
    type: 'Discard',
    ability: '+12 energy',
    effect: 'super_saiyan',
  },
  {
    title: 'Heal',
    cost: 2,
    type: 'Discard',
    ability: 'Gain 2 health',
    effect: 'heal',
  },
  {
    title: 'Miracle',
    cost: 6,
    type: 'Discard',
    ability: 'Gain 5 health',
    effect: 'miracle',
  },
  {
    title: 'Savant',
    cost: 5,
    type: 'Discard',
    ability: 'Take another turn after this one',
    effect: 'savant',
  },
  // bellow are cards with type='keep'
  {
    title: 'Roar',
    cost: 2,
    type: 'Keep',
    ability: 'your attk + 1',
    effect: 'roar',
  },
  {
    title: 'Shield',
    cost: 3,
    type: 'Keep',
    ability: 'all dmg to you - 1',
    effect: 'shield',
  },

  {
    title: 'Swift',
    cost: 2,
    type: 'Keep',
    ability: 'roll die: -1 dmg if <3',
    effect: 'swift',
  },
  {
    title: 'Brain Growth',
    cost: 2,
    type: 'Keep',
    ability: 'Add a 1 to your dice on submission',
    effect: 'brain_growth',
  },
];
// dummyCards for testing

const market = {
  deck: shuffle(cards),
  face_up: [],
  discarded: [],
};

export default market;
