const fire = {};

// effects of cards with type = 'discard'
fire.gobbler = (consumer) => {
  consumer.stats.energy += 4;
};
fire.power_up = (consumer) => {
  consumer.stats.energy += 8;
};
fire.super_saiyan = (consumer) => {
  consumer.stats.energy += 12;
};
fire.heal = (consumer) => {
  consumer.stats.health += 2;
};
fire.miracle = (consumer) => {
  consumer.stats.health += 5;
};
fire.quake = (consumer, room) => {
  const players = room.players;
  for (const key in players) {
    if (players[key].uid !== consumer.uid) {
      players[key].stats.health -= 1;
    }
  }
};
fire.apocalypse = (consumer, room) => {
  const players = room.players;
  for (const key in players) {
    if (players[key].uid !== consumer.uid) {
      players[key].stats.health -= 3;
    }
  }
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
