const API_URL = 'http://localhost:5000';

export default {
  getProperties() {
    return fetch(`${API_URL}/get/property.php`).then((res) => res.json());
  },
  async getProperty(id) {
    id == 0 ? id : id;
    const property = await fetch(
      `${API_URL}/get/propertyPhoto.php?id=${id}`,
    ).then((res) => res.json());

    property.photos = property.photos.map((photo) => this.getPhoto(photo.path));
    return property;
  },
  getAreas() {
    return new Promise((res) => {
      res(['Parklands', 'Muizemberg', 'Cape Town']);
    });
  },
  getPhoto(path) {
    let result;
    if (!path || path.trim() === '') {
      result = `${API_URL}/photos/placeholder.png`;
    } else {
      result = `${API_URL}${path}`;
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
  async getPeople() {
    return fetch(`${API_URL}/get/person.php`).then((res) => res.json());
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
  async getAgents(year) {
    return fetch(`${API_URL}/get/stats/agents.php?year=${year}`).then((res) => {
      return res.json();
    });
  },
  async getAvailable(year) {
    return fetch(`${API_URL}/get/available.php`).then((res) => {
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
    { id: 1, name: 'Suburb', endpoint: `${API_URL}/get/suburb` },
  ],
  async searchAvailable(search) {
    console.log(search);

    if (search.searchType.id === this.searchTypes[0].id) {
      let cityID = (search && search.id) || -1;
      let url = `${search.searchType.endpoint}?cityID=${cityID}&minPrice=${
        search.price.min
      }&maxPrice=${search.price.max}`;
      console.log(url);
      return fetch(url).then((res) => res.json());
    } else {
      console.log('search burbs');
    }

    // return fetch(`${API_URL}/get/available.php`).then((res) => {
    //   return res.json();
    // });
  },
};
