cube(`Meteorites`, {
  sql: `SELECT * FROM meteorite_data`,

  measures: {
    count: {
      sql: `id`,
      type: `count`,
    },
    totalMass: {
      sql: `mass`,
      type: `sum`,
    },
  },

  dimensions: {
    name: {
      sql: `name`,
      type: `string`,
    },

    location: {
      type: "geo",
      latitude: {
        sql: `latitude`,
      },
      longitude: {
        sql: `longitude`,
      },
    },

    country: {
      sql: `country`,
      type: `string`,
    },

    region: {
      sql: `region`,
      type: `string`,
    },

    discoveryType: {
      sql: `discovery_type`,
      type: `string`,
    },

    mass: {
      sql: `mass`,
      type: `number`,
    },

    year: {
      sql: `year`,
      type: `number`,
    },
  },
});
