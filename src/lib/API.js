export default {
  getProperties() {
    return new Promise((res) => {
      res([
        {
          id: 101,
          name: 'Stags Head',
          date: new Date(),
          price: 100,
          description: 'A nice place to eat pizza and drink beer',
          bedrooms: 4,
          bathrooms: 2,
          squareMeters: 1000,
          status: 'happy',
          images: ['//i.imgur.com/Lktyyg5.jpg'],
          hasPool: true,
        },
        {
          id: 102,
          name: 'Mambos',
          date: new Date(),
          price: 50,
          description: 'A Tavern of coding',
          bedrooms: 1,
          bathrooms: 1,
          squareMeters: 500,
          status: 'weird',
          images: ['//i.imgur.com/Lktyyg5.jpg'],
          hasPool: false,
        },
        {
          id: 103,
          name: 'Kirstenbosch',
          date: new Date(),
          price: 50,
          description: 'A field filled with fun',
          bedrooms: 10,
          bathrooms: 15,
          squareMeters: 5000,
          status: 'awesome',
          images: ['//i.imgur.com/Lktyyg5.jpg'],
          hasPool: true,
        },
      ]);
    });
  },
  getProperty(id) {
    id == 0 ? id : id;
    return new Promise((res) => {
      res({
        id: 101,
        name: 'Stags Head',
        date: new Date(),
        price: 100,
        description: 'A nice place to eat pizza and drink beer',
        bedrooms: 4,
        bathrooms: 2,
        squareMeters: 1000,
        status: 'happy',
        images: ['//i.imgur.com/Lktyyg5.jpg'],
        hasPool: true,
      });
    });
  },
  getAreas() {
    return new Promise((res) => {
      res(['Parklands', 'Muizemberg', 'Cape Town']);
    });
  },
};
