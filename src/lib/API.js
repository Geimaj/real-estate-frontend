const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://nameless-temple-89949.herokuapp.com';

const emptyCountry = {
  id: null,
  name: '',
};
const emptyCity = {
  id: null,
  name: '',
  country: emptyCountry,
};
const emptySuburb = {
  id: null,
  name: '',
  city: emptyCity,
};

const emptyStreet = {
  id: null,
  name: '',
  suburb: emptySuburb,
};

const emptyAddress = {
  id: null,
  houseNumber: '',
  street: emptyStreet,
};

const emptyProperty = {
  propertyID: -1,
  bedrooms: 0,
  bathrooms: 0,
  pool: false,
  address: emptyAddress,
};

const emptyListing = {
  id: -1,
  listingPrice: 0,
  listingDate: null,
  agentID: -1,
  buyerID: -1,
  sellerID: -1,
  propertyID: -1,
  saleAmmount: 0,
  suburbID: -1,
  address: emptyAddress,
  photo: '',
  pool: false,
  beds: 0,
  baths: 0,
};

async function getAvailable(propertyID) {
  let params = propertyID && propertyID > 0 ? `?propertyID=${propertyID}` : '';
  return fetch(`${API_URL}/get/available.php${params}`)
    .then((res) => {
      return res.json();
    })
    .then((properties) => {
      return propertyID ? properties[0] : properties;
    })
    .catch((error) => {
      return emptyListing;
    });
}

export default {
  emptyProperty,
  emptyListing,
  emptyCountry,
  emptyCity,
  emptySuburb,
  emptyStreet,
  emptyAddress,
  getProperties() {
    return fetch(`${API_URL}/get/propertyDetails.php`)
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        return [];
      });
  },
  async getProperty(id) {
    if (id >= 0) {
      return fetch(`${API_URL}/get/propertyDetails.php?propertyID=${id}`)
        .then((res) => res.json())
        .then((property) => {
          return property[0] || emptyProperty;
        })
        .catch((error) => {
          return emptyProperty;
        });
    } else {
      return new Promise((res, rej) => {
        res(emptyProperty);
      });
    }
  },
  async addAddress(address) {
    return fetch(`${API_URL}/post/address.php`, {
      method: 'POST',
      body: JSON.stringify(address),
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.log('API.addAddress error');
        console.log(error);
      });
  },
  async updateAddress(address) {
    return fetch(`${API_URL}/put/address.php`, {
      method: 'PUT',
      body: JSON.stringify(address),
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.log('API.updateAddress error');
        console.log(error);
      });
  },
  async addProperty(property) {
    console.log(property);
    return fetch(`${API_URL}/post/property.php`, {
      method: 'POST',
      body: JSON.stringify(property),
    }).then((res) => {
      return res.json();
    });
  },
  async updateProperty(property) {
    console.log(property);
    return fetch(`${API_URL}/put/property.php`, {
      method: 'PUT',
      body: JSON.stringify(property),
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.log('API.updateProperty error');
        console.log(error);
      });
  },
  async getPropertyPhotos(id) {
    let photos = [{ id: '', path: '' }];
    const propertyPhotos = await fetch(
      `${API_URL}/get/propertyPhoto.php?propertyID=${id}`,
    )
      .then((res) => res.json())
      .then((res) => (photos = res));

    photos = photos.map((photo) => this.getPhoto(photo.path));
    return photos;
  },
  getAreas() {
    return new Promise((res) => {
      res(['Parklands', 'Muizemberg', 'Cape Town']);
    });
  },
  getPhoto,
  async getSuburbs() {
    return fetch(`${API_URL}/get/suburb.php`)
      .then(async (res) => res.json())
      .catch((error) => {
        return [];
      });
  },
  async addSuburb(suburb) {
    return fetch(`${API_URL}/post/suburb.php`, {
      method: 'POST',
      body: JSON.stringify({
        name: suburb.name,
        zip: suburb.zip,
        cityID: suburb.city.id,
      }),
    }).then((res) => {
      return res.json();
    });
  },
  async getCountries() {
    return fetch(`${API_URL}/get/country.php`)
      .then((res) => res.json())
      .catch((error) => {
        return [];
      });
  },
  async addCountry(country) {
    return fetch(`${API_URL}/post/country.php`, {
      method: 'POST',
      body: JSON.stringify(country),
    }).then((res) => {
      return res.json();
    });
  },
  async getCities() {
    return fetch(`${API_URL}/get/city.php`)
      .then((res) => res.json())
      .catch((error) => {
        return [];
      });
  },
  async addCity(city) {
    return fetch(`${API_URL}/post/city.php`, {
      method: 'POST',
      body: JSON.stringify({
        name: city.name,
        countryID: city.country.id,
      }),
    }).then((res) => {
      return res.json();
    });
  },
  async getStreets() {
    return fetch(`${API_URL}/get/street.php`)
      .then((res) => res.json())
      .catch((error) => {
        return [];
      });
  },
  async addStreet(street) {
    return fetch(`${API_URL}/post/street.php`, {
      method: 'POST',
      body: JSON.stringify({
        name: street.name,
        suburbID: street.suburb.id,
      }),
    }).then((res) => {
      return res.json();
    });
  },
  async updateStreet(street) {
    return fetch(`${API_URL}/put/street.php`, {
      method: 'PUT',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: street.id,
        name: street.name,
        suburbID: street.suburb.id,
      }),
    }).then((res) => {
      return res.json();
    });
  },

  async addListing(listing) {
    return fetch(`${API_URL}/post/available.php`, {
      method: 'POST',
      body: JSON.stringify(listing),
    }).then((res) => {
      return res.json();
    });
  },
  async updateListing(listing) {
    return fetch(`${API_URL}/put/available.php`, {
      method: 'PUT',
      body: JSON.stringify(listing),
    }).then((res) => {
      return res.json();
    });
  },
  async addPerson(person) {
    return fetch(`${API_URL}/post/person.php`, {
      method: 'POST',
      body: JSON.stringify(person),
    }).then((res) => {
      return res.json();
    });
  },
  async updatePerson(person) {
    return fetch(`${API_URL}/put/person.php`, {
      method: 'POST',
      body: JSON.stringify(person),
    }).then((res) => {
      return res.json();
    });
  },
  async addAgent(agent) {
    let parms = {
      id: agent,
    };
    return fetch(`${API_URL}/post/agent.php`, {
      method: 'POST',
      body: JSON.stringify(parms),
    }).then((res) => {
      return res.json();
    });
  },
  async addBuyer(buyer) {
    let parms = {
      id: buyer,
    };
    return fetch(`${API_URL}/post/buyer.php`, {
      method: 'POST',
      body: JSON.stringify(parms),
    }).then((res) => {
      return res.json();
    });
  },
  async addSeller(seller) {
    let parms = {
      id: seller,
    };
    return fetch(`${API_URL}/post/seller.php`, {
      method: 'POST',
      body: JSON.stringify(parms),
    }).then((res) => {
      return res.json();
    });
  },
  async getAgentMax(year) {
    return fetch(`${API_URL}/get/special/agentMax.php?year=${year}`)
      .then((res) => res.json())
      .catch((error) => {
        return [];
      });
  },
  async getAgentAvg(year) {
    return fetch(`${API_URL}/get/special/agentAvg.php?year=${year}`)
      .then((res) => res.json())
      .catch((error) => {
        return [];
      });
  },
  async getSaleYears() {
    return fetch(`${API_URL}/get/sale.php`)
      .then((res) => res.json())
      .then((sales) => {
        let years = [];
        let result = sales
          .map((sale) => new Date(sale.date).getUTCFullYear())
          .sort()
          .filter((year) => years.indexOf(year) <= -1 && years.push(year)); //remove duplicates

        return years;
      })
      .catch((error) => {
        return [];
      });
  },
  async getSales() {
    return fetch(`${API_URL}/get/sale.php`)
      .then((res) => res.json())
      .catch((error) => []);
  },
  async getSalesDetails() {
    return fetch(`${API_URL}/get/salesDetails.php`)
      .then((res) => res.json())
      .catch((error) => []);
  },
  async getAgentStats(year) {
    return fetch(`${API_URL}/get/stats/agents.php?year=${year}`)
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        return [];
      });
  },
  async getSellers() {
    return fetch(`${API_URL}/get/seller.php`).then((res) => {
      return res.json();
    });
  },
  async getBuyers() {
    return fetch(`${API_URL}/get/buyer.php`).then((res) => {
      return res.json();
    });
  },
  async makeSale(listing) {
    return fetch(`${API_URL}/post/sale.php`, {
      method: 'POST',
      body: JSON.stringify(listing),
    }).then((res) => {
      return res.json();
    });
  },
  getAvailable,
  searchTypes: [
    {
      id: 0,
      name: 'City',
      endpoint: `${API_URL}/get/special/cityMinMax.php`,
      params: ['cityID', 'minPrice', 'maxPrice'],
    },
    { id: 1, name: 'Suburb', endpoint: `${API_URL}/get/search/search.php` },
  ],
  bedBathItems: Array.apply(null, Array(5)).map((x, i) => {
    return {
      text: `${i}+`,
      value: i,
    };
  }),
  poolItems: [
    {
      text: 'Any',
      value: '1,0',
    },
    {
      text: 'Pool',
      value: '1',
    },
    {
      text: 'No Pool',
      value: '0',
    },
  ],
  async searchAvailable(search) {
    console.log(search);

    let cityID =
      search && search.search && search.searchType.id == 0
        ? search.search.id
        : -1;
    let suburbID =
      search && search.search && search.searchType.id == 1
        ? search.search.id
        : -1;
    let minPrice = search.price.min || 0;
    let maxPrice = search.price.max || -1;
    let pool = search.pool.value;
    let baths = search.baths >= 1 ? search.baths : 0;
    let beds = search.beds >= 1 ? search.beds : 0;

    let url = `${API_URL}/get/search/search.php?cityID=${cityID}&\
suburbID=${suburbID}&\
minPrice=${minPrice}&\
maxPrice=${maxPrice}&\
pool=${pool}&\
beds=${beds}&\
baths=${baths}`;

    url = encodeURI(url);

    console.log(url);
    return fetch(url).then((res) => res.json());
  },
  getAgents,
  getPeople,
  peopleTypes: [
    { text: 'All', data: getPeople },
    {
      text: 'Agents',
      data: getAgents,
    },
    { text: 'Buyers', data: getBuyers },
    { text: 'Sellers', data: getSellers },
  ],
  deletePerson(person) {
    console.log(person);
  },
};

function getBuyers() {
  return fetch(`${API_URL}/get/buyer.php`).then((res) => res.json());
}

function getSellers() {
  return fetch(`${API_URL}/get/seller.php`).then((res) => res.json());
}

function getAgents() {
  return fetch(`${API_URL}/get/agent.php`).then((res) => res.json());
}

async function getPeople() {
  return fetch(`${API_URL}/get/person.php`)
    .then((res) => res.json())
    .catch((error) => []);
}

function getPhoto(path) {
  let result;
  if (path && path.trim() !== '') {
    result = `${API_URL}${path}`;
  } else {
    result = `${API_URL}/photos/placeholder.png`;
  }

  return encodeURI(result);
}
