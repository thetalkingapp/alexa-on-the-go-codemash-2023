'use strict';

const test = require('ask-sdk-test');
const skillHandler = require('../index.js').handler;

const skillSettings = {
  appId: 'amzn1.ask.skill.00000000-0000-0000-0000-000000000000',
  userId: 'amzn1.ask.account.VOID',
  deviceId: 'amzn1.ask.device.VOID',
  locale: 'en-US',
};

const alexaTest = new test.AlexaTest(skillHandler, skillSettings);

describe('Location Fun Skill', function() {

  describe('WhereAmIIntent - no location support', function() {
    alexaTest.test([
      {
        request: new test.IntentRequestBuilder(skillSettings, 'WhereAmIIntent').build(),
        saysLike: 'Your device does not support GeoLocation. Please use a mobile device to ask about your location.', 
        repromptsNothing: true
      },
    ]);
  });

  describe('WhereAmIIntent - with location support and permission', function() {
    const request = new test.IntentRequestBuilder(skillSettings, 'WhereAmIIntent').build();

    fakeGeoLocation(request, 41.3858043, -82.6407325);

    alexaTest.test([
      {
        request: request,
        saysLike: 'You are in Leopardwood.', repromptsNothing: true,
      },
    ]);
  });

});

function fakeGeoLocation(request, lat, long) {
    request.context.System.device.supportedInterfaces.Geolocation = {};
    request.context.System.user.permissions = {
      scopes: {
        'alexa::devices:all:geolocation:read': {
          status: 'GRANTED'
        }
      }
    };
    request.context.Geolocation = {
      coordinate: {
        latitudeInDegrees: lat,
        longitudeInDegrees: long
      }
    };
  }