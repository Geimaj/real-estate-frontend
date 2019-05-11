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
    return path.trim() == ''
      ? `${API_URL}/photos/placeholder.png`
      : `${API_URL}${path}`;
  },
  async getSuburbs() {
    return fetch(`${API_URL}/get/suburb.php`).then((res) => res.json());
  },
  async getCountries() {
    return fetch(`${API_URL}/get/country.php`).then((res) => res.json());
  },
  async getCities() {
    return fetch(`${API_URL}/get/city.php`).then((res) => res.json());
  },
};
