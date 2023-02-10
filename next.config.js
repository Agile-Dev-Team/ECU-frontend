/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST
    HOST_API_KEY: 'http://localhost:8001',
    // MAPBOX
    MAPBOX_API: 'pk.eyJ1IjoicnluZGluYWxleCIsImEiOiJja3NqajVpNTMyOHVuMnVwMjQ1aTYxeTZ6In0.jSk9JMEDVGmO5LtYJ4Ejyg',
    // FIREBASE
    FIREBASE_API_KEY: '',
    FIREBASE_AUTH_DOMAIN: '',
    FIREBASE_PROJECT_ID: '',
    FIREBASE_STORAGE_BUCKET: '',
    FIREBASE_MESSAGING_SENDER_ID: '',
    FIREBASE_APPID: '',
    FIREBASE_MEASUREMENT_ID: '',
    // AWS COGNITO
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0
    AUTH0_CLIENT_ID: '',
    AUTH0_DOMAIN: '',
    REACT_APP_AWS_ACCESS_KEY: 'AKIA3N3BFZMWDPTHE3G3',
    REACT_APP_AWS_SECRET_ACCESS_KEY: '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'
  },
});
