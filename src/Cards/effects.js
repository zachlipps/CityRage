const fire = {};

// effects of cards with type = 'discard'
fire.gobbler = (buyer) => {
  buyer.stats.energy += 4;
};
fire.heal = (buyer) => {
  buyer.stats.health += 2;
};
fire.quake = () => {
  console.log('quake fired, but not implemented!');
};
fire.savant = () => {
  console.log('savant fired but not implemented!');
};

// effects of cards with type = 'keep'
fire.roar = () => {
  console.log('roar fired but not implemented!');
};
fire.shield = () => {
  console.log('savant fired but not implemented!');
};
fire.swift = () => {
  console.log('swift fired but not implemented!');
};
fire.brain_growth = () => {
  console.log('brain_growth fired but not implemented!');
};

export default fire;
