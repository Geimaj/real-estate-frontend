const API_URL = 'http://localhost:5000';
const emptyListing = {
  id: -1,
  listingPrice: 0,
  agentID: -1,
  buyerID: -1,
  sellerID: -1,
  propertyID: -1,
  saleAmmount: 0,
};
const emptyProperty = {
  propertyID: -1,
  bedrooms: 0,
  bathrooms: 0,
  pool: false,
  address: {
    id: 0,
    houseNumber: 0,
    street: {
      id: 0,
      name: '',
      suburb: {
        id: 0,
        name: '',
        city: {
          id: 0,
          name: '',
          country: {
            id: 0,
            name: '',
          },
        },
      },
    },
  },
};

export default {
  emptyProperty,
  emptyListing,
  getProperties() {
    return fetch(`${API_URL}/get/propertyDetails.php`).then((res) => {
      return res.json();
    });
  },
  async getProperty(id) {
    id == 0 ? id : id;
    const property = await fetch(
      `${API_URL}/get/propertyDetails.php?propertyID=${id}`,
    )
      .then((res) => res.json())
      .then((properties) => {
        return new Promise((res, rej) => res(properties[0] || emptyProperty));
      })
      .catch((error) => {
        return emptyProperty;
      });

    return property;
  },
  async addProperty(property) {
    // console.log(property);
    // return fetch(`${API_URL}/post/country.php`, {
    //   method: 'POST',
    //   body: JSON.stringify(country),
    // }).then((res) => {
    //   return res.json();
    // });
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
  getPhoto(path) {
    let result;
    if (path && path.trim() !== '') {
      result = `${API_URL}${path}`;
    } else {
      result = `${API_URL}/photos/placeholder.png`;
    }

    return encodeURI(result);
  },
  async getSuburbs() {
    return fetch(`${API_URL}/get/suburb.php`).then(async (res) => res.json());
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
    return fetch(`${API_URL}/get/country.php`).then((res) => res.json());
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
    return fetch(`${API_URL}/get/city.php`).then((res) => res.json());
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
    return fetch(`${API_URL}/get/street.php`).then((res) => res.json());
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

  async addPerson(person) {
    return fetch(`${API_URL}/post/person.php`, {
      method: 'POST',
      body: JSON.stringify(person),
    }).then((res) => {
      return res.json();
    });
  },
  async addListing(listing) {
    console.log(listing);
    return fetch(`${API_URL}/post/availible.php`, {
      method: 'POST',
      body: JSON.stringify(listing),
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
  async getAgentMax(year) {
    return fetch(`${API_URL}/get/special/agentMax.php?year=${year}`).then(
      (res) => res.json(),
    );
  },
  async getAgentAvg(year) {
    return fetch(`${API_URL}/get/special/agentAvg.php?year=${year}`).then(
      (res) => res.json(),
    );
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
      });
  },
  async getSales() {
    return fetch(`${API_URL}/get/sale.php`).then((res) => res.json());
  },
  async getAgents(year) {
    return fetch(`${API_URL}/get/stats/agents.php?year=${year}`).then((res) => {
      return res.json();
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
  async getAvailable(propertyID) {
    let params =
      propertyID && propertyID > 0 ? `?propertyID=${propertyID}` : '';
    return fetch(`${API_URL}/get/available.php${params}`).then((res) => {
      return res.json();
    });
  },
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
    let baths = search.baths.value || 0;
    let beds = search.beds.value || 0;

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
  return fetch(`${API_URL}/get/person.php`).then((res) => res.json());
}
