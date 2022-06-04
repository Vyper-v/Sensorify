import hamburguerIcon from "./assets/hamburguer.svg?raw";
import hiddenHamburguerIcon from "./assets/hidden-hamburguer.svg?raw";

const hamburguer = (App) => {
  App.put('[aria-controls="mobile-menu"]', hamburguerIcon + hiddenHamburguerIcon);
};

export default hamburguer;
