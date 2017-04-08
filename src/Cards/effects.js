const fire = {};

fire.gobbler = (buyer) => {
  buyer.stats.energy += 4;
};

fire.heal = (buyer) => {
  buyer.stats.health += 2;
};

export default fire;
