import { APP_NAME, APP_VERSION } from "../app-properties.js";
import { getSvgIcon } from "./services/icons.service.js";
import { formatNumberWithSpaces, getNumberVariation, getRandomIntegerBetween, roundToDecimals } from "./utils/UTILS.js";
import { requestWakeLock } from "./utils/wakelock.js";

/* ########################################################### */
/* ------------------------ VARIABLES ------------------------ */
/* ########################################################### */
const HEADER = document.getElementById('header');
const MAIN = document.getElementById('main');
const FOOTER = document.getElementById('footer');
let id = 0;

/* ########################################################### */
/* ------------------------ FUNCTIONS ------------------------ */
/* ########################################################### */

/* ########################################################### */
/* ------------------------ EXECUTION ------------------------ */
/* ########################################################### */

// Keep screen awake
requestWakeLock();

// DOM initializing
HEADER.innerHTML = `<h1>${APP_NAME}</h1>`;

/* MAIN.innerHTML = `
  <span>Hello world</span>
  ${getSvgIcon('cloud-sun-rain', 'icon-xs')}
  ${getSvgIcon('cloud-sun-rain', 'icon-s')}
  ${getSvgIcon('cloud-sun-rain', 'icon-m')}
  ${getSvgIcon('cloud-sun-rain', 'icon-l')}
  ${getSvgIcon('cloud-sun-rain', 'icon-xl')}`; */

FOOTER.innerHTML = `
  <span>v ${APP_VERSION}</span>`;




const getRandomConstructions = (type, maxLevel, count) => {
  let constructions = [];
  for (let index = 0; index < count; index++) {
    let construction = new Construction(type, getRandomIntegerBetween(1, maxLevel));
    constructions.push(construction);
  }
  //constructions.sort((a, b) => {return a.type.name - b.type.name});
  //constructions.sort((a, b) => {return a.level - b.level});
  //constructions.sort((a, b) => {return a.subtype - b.subtype});
  constructions.sort((a, b) => {return a.income - b.income});
  return constructions;
}

const getSvgIconForType = (type) => {
  switch (type.name) {
    case 'Commerce': return getSvgIcon('shop', 'icon-s type-icon');
    case 'Logement': return getSvgIcon('cloud-showers-heavy', 'icon-xs type-icon');
    case 'Culturel': return getSvgIcon('cloud-showers-heavy', 'icon-xs type-icon');
    case 'Social': return getSvgIcon('cloud-showers-heavy', 'icon-xs type-icon');
    case 'Bureau': return getSvgIcon('cloud-showers-heavy', 'icon-xs type-icon');
    case 'Industrie': return getSvgIcon('cloud-showers-heavy', 'icon-xs type-icon');
  }
}

const getSvgIconForSubtype = (subtype) => {
  switch (subtype) {
    case 'Vente': return getSvgIcon('basket-shopping', 'icon-s subtype-icon');
    case 'Hôtellerie': return getSvgIcon('bed', 'icon-s subtype-icon');
    case 'Restauration': return getSvgIcon('utensils', 'icon-s subtype-icon');

    case 'Musée': return getSvgIcon('cloud-showers-heavy', 'icon-xs subtype-icon');
    case 'Théâtre': return getSvgIcon('cloud-showers-heavy', 'icon-xs subtype-icon');
    case 'Cinéma': return getSvgIcon('cloud-showers-heavy', 'icon-xs subtype-icon');
    case 'Salle de concert': return getSvgIcon('cloud-showers-heavy', 'icon-xs subtype-icon');
  }
}

const getConstructionCompleteCard = (construction) => {
  let typeIcon = getSvgIconForType(construction.type);
  let subtypeIcon = getSvgIconForSubtype(construction.subtype);
  return `
  <div class="complete-card">
    <div class="complete-card-header">
      <span class="type-display ${construction.type.name}">${typeIcon}</span>
      <span class="name-display">${construction.name}</span>
      <span class="lvl-display lvl${construction.level}">${construction.level}</span>
    </div>
    <div class="complete-card-img" style="background-image: url('${getConstructionImgSrc(construction.subtype, construction.level)}');">
      <div class="complete-card-subtype-container">${subtypeIcon}
      </div>
    </div>
    <div class="complete-card-body">
      
      <div class="complete-card-line">
        <!--<div class="line-bloc">
          <span>Niveau</span>
          <span>${construction.level}</span>
        </div> -->
        <div class="line-bloc">
          <!-- <span>Superficie</span> -->
          <span><b>${formatNumberWithSpaces(construction.superficy)}</b> m²</span>
        </div>
      </div>

      <div class="complete-card-line">
        <span>Chiffre d'affaire</span>
        <span><b>${formatNumberWithSpaces(construction.income)}</b> €/mois</span>
      </div>

      <div class="complete-card-line">
        <span>Fonctionnement</span>
        <span><b>${formatNumberWithSpaces(construction.operating_cost)}</b> €/mois</span>
      </div>
      <!-- <div class="line-bloc">
        <span>Bénéfices</span>
        <span><b>${formatNumberWithSpaces(construction.revenue)}</b> €/mois</span>
      </div> -->

      <!-- <div class="complete-card-line"><span>Réputation</span><span>${construction.reputation_level}</span></div> -->
      <!-- <div class="complete-card-line"><span>Prix d'achat</span><span>${formatNumberWithSpaces(construction.buying_price)}€</span></div> -->
      <!-- <div class="complete-card-line"><span>Prix de revente</span><span>${formatNumberWithSpaces(construction.selling_price)}€</span></div> -->
      <div class="complete-card-line"><span><b>${formatNumberWithSpaces(construction.buying_price)}</b> € TTC</span></div>

      <button class="buy-button" onclick="onBuyClick(${construction.id})">${getSvgIcon('euro-sign', 'icon-xs')}<span>Acheter</span></button>
    </div>
  </div>`;
}

const getConstructionById = (id) => {
  return constructions.filter((a) => a.id == id)[0];
}

const onBuyClick = (id) => {
  const construction = getConstructionById(id);
  //console.table(construction);
  window.confirm(`${construction.name} a bien été acheté pour ${formatNumberWithSpaces(construction.selling_price)} €`)
}
window.onBuyClick = onBuyClick;

const getConstructionsSmallCardsContainer = (constructions) => {
  let str = '<div class="complete-cards-container">';
  constructions.forEach(construction => {
    str += getConstructionCompleteCard(construction);
  });
  str += '</div>';
  return str;
}


const TOWN_SQUARE_METER_PRICE = 250; // $/m²

const getTownSquareMeterPrice = () => {
  return TOWN_SQUARE_METER_PRICE;
}

const TYPES = {
  COMMERCIAL: {
    name: 'Commerce',
    subtypes: [
      'Vente', 'Hôtellerie', 'Restauration',
    ],
  },
  HOUSING: {
    name: 'Logement',
    subtypes: [
      'subtype1', 'subtype2',
    ],
  },
  CULTURAL: {
    name: 'Culturel',
    subtypes: [
      'Musée', 'Théâtre', 'Cinéma', 'Salle de concert',
    ],
  },
  SOCIAL: {
    name: 'Social',
    subtypes: [
      'École', 'Hôpital',
    ],
  },
  OFFICE: {
    name: 'Bureau',
    subtypes: [
      'subtype1', 'subtype2',
    ],
  },
  INDUSTRY: {
    name: 'Industrie',
    subtypes: [
      'subtype1', 'subtype2',
    ],
  },
}

class Construction {
  id;
  name;
  type; // commerce, habitation, culturel, social, bureaux, industrie
  subtype;
  level; // (influe sur toute la suite)
  superficy; // en m²
  reputation_level; //niveau de réputation minimum pour achat (est bloqué avant)
  income;
  operating_cost;
  revenue;
  buying_price;
  selling_price;

  constructor(type, level) {
    this.id = id;
    id ++;
    this.type = type;
    this.subtype = this.type.subtypes[getRandomIntegerBetween(0, this.type.subtypes.length -1)];
    this.name = getRandomName(this.subtype);
    this.level = level;
    this.superficy = roundToDecimals(getNumberVariation(getFixedSuperficy(this.subtype, this.level)), 2);
    this.reputation_level = this.level + getRandomIntegerBetween(0, 1);
    this.income = roundToDecimals(getNumberVariation(getFixedIncome(this.subtype, this.level, this.superficy)), 2);
    this.operating_cost = roundToDecimals(getNumberVariation(getFixedOperatingCost(this.subtype, this.level, this.superficy)), 2);
    this.revenue = roundToDecimals((this.income - this.operating_cost), 2);
    this.buying_price = roundToDecimals((this.superficy * getTownSquareMeterPrice() * 10) + (8 * this.income), 2);
    this.selling_price = roundToDecimals(this.buying_price / 10 * (getRandomIntegerBetween(7, 9)), 2);
  }

  /* constructor(name, type, subtype, level, superficy, reputation_level, income, operating_cost, revenue, buying_price, selling_price) {
    this.name = name;
    this.type = type;
    this.subtype = subtype;
    this.level = level;
    this.superficy = superficy;
    this.reputation_level = reputation_level;
    this.income = income;
    this.operating_cost = operating_cost;
    this.revenue = revenue;
    this.buying_price = buying_price;
    this.selling_price = selling_price;
  } */

  log() {
    console.log(`
              Nom : ${this.name}
             Type : ${this.type.name}
        Sous-type : ${this.subtype}
           Niveau : ${this.level}
       Superficie : ${formatNumberWithSpaces(this.superficy)} m²
       Réputation : ${this.reputation_level}

Chiffre d'affaire : ${formatNumberWithSpaces(this.income)} €/mois
    Fonctionement : ${formatNumberWithSpaces(this.operating_cost)} €/mois
        Bénéfices : ${formatNumberWithSpaces(this.revenue)} €/mois

     Prix d'achat : ${formatNumberWithSpaces(this.buying_price)}€
  Prix de revente : ${formatNumberWithSpaces(this.selling_price)}€
      `);
  }

  toJson() {
    return `
      {
        name: '${this.name}',
      }
    `;
  }

  upgrade() {
    if (this.level != 5) {
      this.level += 1;
      this.superficy = roundToDecimals(getNumberVariation(getFixedSuperficy(this.subtype, this.level)), 2);
      this.reputation_level = this.level + getRandomIntegerBetween(0, 1);
      this.income = roundToDecimals(getNumberVariation(getFixedIncome(this.subtype, this.level, this.superficy)), 2);
      this.operating_cost = roundToDecimals(getNumberVariation(getFixedOperatingCost(this.subtype, this.level, this.superficy)), 2);
      this.revenue = roundToDecimals((this.income - this.operating_cost), 2);
      this.buying_price = roundToDecimals((this.superficy * getTownSquareMeterPrice() * 10) + (8 * this.income), 2);
      this.selling_price = roundToDecimals(this.buying_price / 10 * 9, 2);
    }
  }
}

const getFixedSuperficy = (subtype, level) => {
  let superficy = 0;
  switch (subtype) {
    // COMMERCIAL -----------------------------------------
    case 'Vente':
      switch (level) {
        case 1: superficy = 30; break;
        case 2: superficy = 60; break;
        case 3: superficy = 120; break;
        case 4: superficy = 400; break;
        case 5: superficy = 1000; break;
        default: break;
      } break;
    case 'Hôtellerie':
      switch (level) {
        case 1: superficy = 200; break;
        case 2: superficy = 600; break;
        case 3: superficy = 1250; break;
        case 4: superficy = 2500; break;
        case 5: superficy = 5000; break;
        default: break;
      } break;
    case 'Restauration':
      switch (level) {
        case 1: superficy = 25; break;
        case 2: superficy = 50; break;
        case 3: superficy = 75; break;
        case 4: superficy = 150; break;
        case 5: superficy = 300; break;
        default: break;
      } break;
    // CULTURAL -----------------------------------------
    case 'Musée':
      switch (level) {
        case 1: superficy = 20; break;
        case 2: superficy = 50; break;
        case 3: superficy = 120; break;
        case 4: superficy = 400; break;
        case 5: superficy = 1000; break;
        default: break;
      } break;
    case 'Théâtre':
      switch (level) {
        case 1: superficy = 20; break;
        case 2: superficy = 50; break;
        case 3: superficy = 120; break;
        case 4: superficy = 400; break;
        case 5: superficy = 1000; break;
        default: break;
      } break;
    case 'Cinéma':
      switch (level) {
        case 1: superficy = 20; break;
        case 2: superficy = 50; break;
        case 3: superficy = 120; break;
        case 4: superficy = 400; break;
        case 5: superficy = 1000; break;
        default: break;
      } break;
    case 'Salle de concert':
      switch (level) {
        case 1: superficy = 20; break;
        case 2: superficy = 50; break;
        case 3: superficy = 120; break;
        case 4: superficy = 400; break;
        case 5: superficy = 1000; break;
        default: break;
      } break;
    // COMMERCIAL -----------------------------------------
    case 'École':
      switch (level) {
        case 1: superficy = 20; break;
        case 2: superficy = 50; break;
        case 3: superficy = 120; break;
        case 4: superficy = 400; break;
        case 5: superficy = 1000; break;
        default: break;
      } break;
    case 'Hôpital':
      switch (level) {
        case 1: superficy = 20; break;
        case 2: superficy = 50; break;
        case 3: superficy = 120; break;
        case 4: superficy = 400; break;
        case 5: superficy = 1000; break;
        default: break;
      } break;
    // HOUSING, OFFICE, INDUSTRY -----------------------------------------
    case 'subtype1':
      switch (level) {
        case 1: superficy = 20; break;
        case 2: superficy = 50; break;
        case 3: superficy = 120; break;
        case 4: superficy = 400; break;
        case 5: superficy = 1000; break;
        default: break;
      } break;
    case 'subtype2':
      switch (level) {
        case 1: superficy = 20; break;
        case 2: superficy = 50; break;
        case 3: superficy = 120; break;
        case 4: superficy = 400; break;
        case 5: superficy = 1000; break;
        default: break;
      } break;
    default: break;
  }
  return superficy;
}

const getFixedOperatingCost = (subtype, level, superficy) => {
  let operatingCost = 0;
  switch (subtype) {
    // COMMERCIAL -----------------------------------------
    case 'Vente':
      switch (level) {
        case 1: operatingCost = 250 * superficy; break;
        case 2: operatingCost = 500 * superficy; break;
        case 3: operatingCost = 750 * superficy; break;
        case 4: operatingCost = 1900 * superficy; break;
        case 5: operatingCost = 5000 * superficy; break;
        default: break;
      } break;
    case 'Hôtellerie':
      switch (level) {
        case 1: operatingCost = 400 * superficy; break;
        case 2: operatingCost = 900 * superficy; break;
        case 3: operatingCost = 1200 * superficy; break;
        case 4: operatingCost = 3250 * superficy; break;
        case 5: operatingCost = 7000 * superficy; break;
        default: break;
      } break;
    case 'Restauration':
      switch (level) {
        case 1: operatingCost = 175 * superficy; break;
        case 2: operatingCost = 380 * superficy; break;
        case 3: operatingCost = 600 * superficy; break;
        case 4: operatingCost = 1200 * superficy; break;
        case 5: operatingCost = 3000 * superficy; break;
        default: break;
      } break;
    // CULTURAL -----------------------------------------
    case 'Musée':
      switch (level) {
        case 1: operatingCost = 20 * superficy; break;
        case 2: operatingCost = 50 * superficy; break;
        case 3: operatingCost = 120 * superficy; break;
        case 4: operatingCost = 400 * superficy; break;
        case 5: operatingCost = 1000 * superficy; break;
        default: break;
      } break;
    case 'Théâtre':
      switch (level) {
        case 1: operatingCost = 20 * superficy; break;
        case 2: operatingCost = 50 * superficy; break;
        case 3: operatingCost = 120 * superficy; break;
        case 4: operatingCost = 400 * superficy; break;
        case 5: operatingCost = 1000 * superficy; break;
        default: break;
      } break;
    case 'Cinéma':
      switch (level) {
        case 1: operatingCost = 20 * superficy; break;
        case 2: operatingCost = 50 * superficy; break;
        case 3: operatingCost = 120 * superficy; break;
        case 4: operatingCost = 400 * superficy; break;
        case 5: operatingCost = 1000 * superficy; break;
        default: break;
      } break;
    case 'Salle de concert':
      switch (level) {
        case 1: operatingCost = 20 * superficy; break;
        case 2: operatingCost = 50 * superficy; break;
        case 3: operatingCost = 120 * superficy; break;
        case 4: operatingCost = 400 * superficy; break;
        case 5: operatingCost = 1000 * superficy; break;
        default: break;
      } break;
    // COMMERCIAL -----------------------------------------
    case 'École':
      switch (level) {
        case 1: operatingCost = 20 * superficy; break;
        case 2: operatingCost = 50 * superficy; break;
        case 3: operatingCost = 120 * superficy; break;
        case 4: operatingCost = 400 * superficy; break;
        case 5: operatingCost = 1000 * superficy; break;
        default: break;
      } break;
    case 'Hôpital':
      switch (level) {
        case 1: operatingCost = 20 * superficy; break;
        case 2: operatingCost = 50 * superficy; break;
        case 3: operatingCost = 120 * superficy; break;
        case 4: operatingCost = 400 * superficy; break;
        case 5: operatingCost = 1000 * superficy; break;
        default: break;
      } break;
    // HOUSING, OFFICE, INDUSTRY -----------------------------------------
    case 'subtype1':
      switch (level) {
        case 1: operatingCost = 20 * superficy; break;
        case 2: operatingCost = 50 * superficy; break;
        case 3: operatingCost = 120 * superficy; break;
        case 4: operatingCost = 400 * superficy; break;
        case 5: operatingCost = 1000 * superficy; break;
        default: break;
      } break;
    case 'subtype2':
      switch (level) {
        case 1: operatingCost = 20 * superficy; break;
        case 2: operatingCost = 50 * superficy; break;
        case 3: operatingCost = 120 * superficy; break;
        case 4: operatingCost = 400 * superficy; break;
        case 5: operatingCost = 1000 * superficy; break;
        default: break;
      } break;
    default: break;
  }
  return operatingCost;
}

const getFixedIncome = (subtype, level, superficy) => {
  let income = 0;
  switch (subtype) {
    // COMMERCIAL -----------------------------------------
    case 'Vente':
      switch (level) {
        case 1: income = 300 * superficy; break;
        case 2: income = 750 * superficy; break;
        case 3: income = 1200 * superficy; break;
        case 4: income = 4000 * superficy; break;
        case 5: income = 10000 * superficy; break;
        default: break;
      } break;
    case 'Hôtellerie':
      switch (level) {
        case 1: income = 500 * superficy; break;
        case 2: income = 1000 * superficy; break;
        case 3: income = 2000 * superficy; break;
        case 4: income = 5000 * superficy; break;
        case 5: income = 100000 * superficy; break;
        default: break;
      } break;
    case 'Restauration':
      switch (level) {
        case 1: income = 200 * superficy; break;
        case 2: income = 500 * superficy; break;
        case 3: income = 900 * superficy; break;
        case 4: income = 4000 * superficy; break;
        case 5: income = 10000 * superficy; break;
        default: break;
      } break;
    // CULTURAL -----------------------------------------
    case 'Musée':
      switch (level) {
        case 1: income = 20 * superficy; break;
        case 2: income = 50 * superficy; break;
        case 3: income = 120 * superficy; break;
        case 4: income = 400 * superficy; break;
        case 5: income = 1000 * superficy; break;
        default: break;
      } break;
    case 'Théâtre':
      switch (level) {
        case 1: income = 20 * superficy; break;
        case 2: income = 50 * superficy; break;
        case 3: income = 120 * superficy; break;
        case 4: income = 400 * superficy; break;
        case 5: income = 1000 * superficy; break;
        default: break;
      } break;
    case 'Cinéma':
      switch (level) {
        case 1: income = 20 * superficy; break;
        case 2: income = 50 * superficy; break;
        case 3: income = 120 * superficy; break;
        case 4: income = 400 * superficy; break;
        case 5: income = 1000 * superficy; break;
        default: break;
      } break;
    case 'Salle de concert':
      switch (level) {
        case 1: income = 20 * superficy; break;
        case 2: income = 50 * superficy; break;
        case 3: income = 120 * superficy; break;
        case 4: income = 400 * superficy; break;
        case 5: income = 1000 * superficy; break;
        default: break;
      } break;
    // COMMERCIAL -----------------------------------------
    case 'École':
      switch (level) {
        case 1: income = 20 * superficy; break;
        case 2: income = 50 * superficy; break;
        case 3: income = 120 * superficy; break;
        case 4: income = 400 * superficy; break;
        case 5: income = 1000 * superficy; break;
        default: break;
      } break;
    case 'Hôpital':
      switch (level) {
        case 1: income = 20 * superficy; break;
        case 2: income = 50 * superficy; break;
        case 3: income = 120 * superficy; break;
        case 4: income = 400 * superficy; break;
        case 5: income = 1000 * superficy; break;
        default: break;
      } break;
    // HOUSING, OFFICE, INDUSTRY -----------------------------------------
    case 'subtype1':
      switch (level) {
        case 1: income = 20 * superficy; break;
        case 2: income = 50 * superficy; break;
        case 3: income = 120 * superficy; break;
        case 4: income = 400 * superficy; break;
        case 5: income = 1000 * superficy; break;
        default: break;
      } break;
    case 'subtype2':
      switch (level) {
        case 1: income = 20 * superficy; break;
        case 2: income = 50 * superficy; break;
        case 3: income = 120 * superficy; break;
        case 4: income = 400 * superficy; break;
        case 5: income = 1000 * superficy; break;
        default: break;
      } break;
    default: break;
  }
  return income;
}

const getConstructionImgSrc = (subtype, level) => {
  let imgSrc = '';
  switch (subtype) {
    // COMMERCIAL -----------------------------------------
    case 'Vente':
      switch (level) {
        case 1: imgSrc = './medias/images/vente-1.jpeg'; break;
        case 2: imgSrc = './medias/images/vente-2.jpeg'; break;
        case 3: imgSrc = './medias/images/vente-3.jpeg'; break;
        case 4: imgSrc = './medias/images/vente-4.jpeg'; break;
        case 5: imgSrc = './medias/images/vente-5.jpeg'; break;
        default: break;
      } break;
    case 'Hôtellerie':
      switch (level) {
        case 1: imgSrc = './medias/images/hotel-1.jpeg'; break;
        case 2: imgSrc = './medias/images/hotel-2.jpeg'; break;
        case 3: imgSrc = './medias/images/hotel-3.jpeg'; break;
        case 4: imgSrc = './medias/images/hotel-4.jpeg'; break;
        case 5: imgSrc = './medias/images/hotel-5.jpeg'; break;
        default: break;
      } break;
    case 'Restauration':
      switch (level) {
        case 1: imgSrc = './medias/images/resto-1.jpeg'; break;
        case 2: imgSrc = './medias/images/resto-2.jpeg'; break;
        case 3: imgSrc = './medias/images/resto-3.jpeg'; break;
        case 4: imgSrc = './medias/images/resto-4.jpeg'; break;
        case 5: imgSrc = './medias/images/resto-5.jpeg'; break;
        default: break;
      } break;
    // CULTURAL -----------------------------------------
    case 'Musée':
      switch (level) {
        case 1: imgSrc = 20; break;
        case 2: imgSrc = 50; break;
        case 3: imgSrc = 120; break;
        case 4: imgSrc = 400; break;
        case 5: imgSrc = 1000; break;
        default: break;
      } break;
    case 'Théâtre':
      switch (level) {
        case 1: imgSrc = 20; break;
        case 2: imgSrc = 50; break;
        case 3: imgSrc = 120; break;
        case 4: imgSrc = 400; break;
        case 5: imgSrc = 1000; break;
        default: break;
      } break;
    case 'Cinéma':
      switch (level) {
        case 1: imgSrc = 20; break;
        case 2: imgSrc = 50; break;
        case 3: imgSrc = 120; break;
        case 4: imgSrc = 400; break;
        case 5: imgSrc = 1000; break;
        default: break;
      } break;
    case 'Salle de concert':
      switch (level) {
        case 1: imgSrc = 20; break;
        case 2: imgSrc = 50; break;
        case 3: imgSrc = 120; break;
        case 4: imgSrc = 400; break;
        case 5: imgSrc = 1000; break;
        default: break;
      } break;
    // COMMERCIAL -----------------------------------------
    case 'École':
      switch (level) {
        case 1: imgSrc = 20; break;
        case 2: imgSrc = 50; break;
        case 3: imgSrc = 120; break;
        case 4: imgSrc = 400; break;
        case 5: imgSrc = 1000; break;
        default: break;
      } break;
    case 'Hôpital':
      switch (level) {
        case 1: imgSrc = 20; break;
        case 2: imgSrc = 50; break;
        case 3: imgSrc = 120; break;
        case 4: imgSrc = 400; break;
        case 5: imgSrc = 1000; break;
        default: break;
      } break;
    // HOUSING, OFFICE, INDUSTRY -----------------------------------------
    case 'subtype1':
      switch (level) {
        case 1: imgSrc = 20; break;
        case 2: imgSrc = 50; break;
        case 3: imgSrc = 120; break;
        case 4: imgSrc = 400; break;
        case 5: imgSrc = 1000; break;
        default: break;
      } break;
    case 'subtype2':
      switch (level) {
        case 1: imgSrc = 20; break;
        case 2: imgSrc = 50; break;
        case 3: imgSrc = 120; break;
        case 4: imgSrc = 400; break;
        case 5: imgSrc = 1000; break;
        default: break;
      } break;
    default: break;
  }
  return imgSrc;
}

const VENTE_NAMES = ['Fleurs', 'Mobilier', 'Lingerie', 'Fringues', 'Menuiserie', 'Miam miam', 'Sport'];
const VENTE_ADDONS = ['3000', 'City', 'Market', 'Super', 'Masters', 'Pro'];

const HOTELLERIE_NAMES = ['Cozy', 'Golden Artus', 'The St-Paul', 'Downtown Grand', 'Mr Ferbant\'s'];
const HOTELLERIE_ADDONS = ['Resort', 'Inn', 'Hotel'];

const RESTAURATION_NAMES = ['Ol\' Simon\'s', 'Georges\'', 'Geoffrey\'s', 'Rachel\'s', 'M.Boon\'s', 'Audrey\'s', 'Mama Diana \'s'];
const RESTAURATION_ADDONS = ['Tapas', 'Grill', 'Burgers', 'Pizzas', 'Sushis', 'Salads'];

const getRandomName = (subtype) => {
  let name = '';
  switch (subtype) {
    // COMMERCIAL -----------------------------------------
    case 'Vente': { name = `${VENTE_NAMES[getRandomIntegerBetween(0, VENTE_NAMES.length - 1)]} ${VENTE_ADDONS[getRandomIntegerBetween(0, VENTE_ADDONS.length - 1)]}`; } break;
    case 'Hôtellerie': { name = `${HOTELLERIE_NAMES[getRandomIntegerBetween(0, HOTELLERIE_NAMES.length - 1)]} ${HOTELLERIE_ADDONS[getRandomIntegerBetween(0, HOTELLERIE_ADDONS.length - 1)]}`; } break;
    case 'Restauration': { name = `${RESTAURATION_NAMES[getRandomIntegerBetween(0, RESTAURATION_NAMES.length - 1)]} ${RESTAURATION_ADDONS[getRandomIntegerBetween(0, RESTAURATION_ADDONS.length - 1)]}`; } break;
    // CULTURAL -----------------------------------------
    case 'Musée': { name = `${VENTE_NAMES[getRandomIntegerBetween(0, VENTE_NAMES.length - 1)]} ${VENTE_ADDONS[getRandomIntegerBetween(0, VENTE_ADDONS.length - 1)]}`; } break;
    case 'Théâtre': { name = `${VENTE_NAMES[getRandomIntegerBetween(0, VENTE_NAMES.length - 1)]} ${VENTE_ADDONS[getRandomIntegerBetween(0, VENTE_ADDONS.length - 1)]}`; } break;
    case 'Cinéma': { name = `${VENTE_NAMES[getRandomIntegerBetween(0, VENTE_NAMES.length - 1)]} ${VENTE_ADDONS[getRandomIntegerBetween(0, VENTE_ADDONS.length - 1)]}`; } break;
    case 'Salle de concert': { name = `${VENTE_NAMES[getRandomIntegerBetween(0, VENTE_NAMES.length - 1)]} ${VENTE_ADDONS[getRandomIntegerBetween(0, VENTE_ADDONS.length - 1)]}`; } break;
    // COMMERCIAL -----------------------------------------
    case 'École': { name = `${VENTE_NAMES[getRandomIntegerBetween(0, VENTE_NAMES.length - 1)]} ${VENTE_ADDONS[getRandomIntegerBetween(0, VENTE_ADDONS.length - 1)]}`; } break;
    case 'Hôpital': { name = `${VENTE_NAMES[getRandomIntegerBetween(0, VENTE_NAMES.length - 1)]} ${VENTE_ADDONS[getRandomIntegerBetween(0, VENTE_ADDONS.length - 1)]}`; } break;
    // HOUSING, OFFICE, INDUSTRY -----------------------------------------
    case 'subtype1': { name = `${VENTE_NAMES[getRandomIntegerBetween(0, VENTE_NAMES.length - 1)]} ${VENTE_ADDONS[getRandomIntegerBetween(0, VENTE_ADDONS.length - 1)]}`; } break;
    case 'subtype2': { name = `${VENTE_NAMES[getRandomIntegerBetween(0, VENTE_NAMES.length - 1)]} ${VENTE_ADDONS[getRandomIntegerBetween(0, VENTE_ADDONS.length - 1)]}`; } break;
    default: break;
  }
  return name;
}

const getNewCommercialConstruction = (type, level) => {
  let construction = new Construction(type, level);
  return construction;
}

/* console.log('coucou');
let const1 = getNewCommercialConstruction(TYPES.COMMERCIAL, 1);
const1.log();
const1.upgrade();
const1.log();
const1.upgrade();
const1.log();
 */
const constructions = getRandomConstructions(TYPES.COMMERCIAL, 5, 20);
MAIN.innerHTML = `${getConstructionsSmallCardsContainer(constructions)}`;