import { Beer } from '../models/beer';

export const mockRandomBeers: Beer[] = [
  {
    id: 37,
    name: 'Zephyr',
    tagline: 'There’s A Storm Brewing.',
    first_brewed: '10/2008',
    description:
      'A 9.2% Double IPA aged for 21 months in a 1965 Invergordon cask with 30 kg of fresh highland strawberries. This beer is a riot of whisky, caramel and strawberry, all tempered by a toe curling bitterness enducing rapture in all who taste it. Who needs champagne?',
    image_url: 'https://images.punkapi.com/v2/37.png',
    abv: 12.5,
    ibu: 125,
    target_fg: 1016,
    target_og: 1087,
    ebc: 40,
    srm: 20,
    ph: 4.4,
    attenuation_level: 81.2,
    volume: {
      value: 20,
      unit: 'litres',
    },
    boil_volume: {
      value: 25,
      unit: 'litres',
    },
    method: {
      mash_temp: [
        {
          temp: {
            value: 65,
            unit: 'celsius',
          },
          duration: 75,
        },
      ],
      fermentation: {
        temp: {
          value: 21,
          unit: 'celsius',
        },
      },
      twist: 'Oak chips: 15g, Fresh strawberries: 3kg',
    },
    ingredients: {
      malt: [
        {
          name: 'Extra Pale',
          amount: {
            value: 6.3,
            unit: 'kilograms',
          },
        },
        {
          name: 'Caramalt',
          amount: {
            value: 0.38,
            unit: 'kilograms',
          },
        },
        {
          name: 'Crystal 150',
          amount: {
            value: 0.29,
            unit: 'kilograms',
          },
        },
      ],
      hops: [
        {
          name: 'Columbus Extract',
          amount: {
            value: 31,
            unit: 'grams',
          },
          add: 'start',
          attribute: 'bitter',
        },
        {
          name: 'Columbus',
          amount: {
            value: 19.5,
            unit: 'grams',
          },
          add: 'start',
          attribute: 'bitter',
        },
        {
          name: 'Columbus',
          amount: {
            value: 19.5,
            unit: 'grams',
          },
          add: 'middle',
          attribute: 'flavour',
        },
        {
          name: 'Centennial',
          amount: {
            value: 19.5,
            unit: 'grams',
          },
          add: 'middle',
          attribute: 'flavour',
        },
        {
          name: 'Simcoe',
          amount: {
            value: 19.5,
            unit: 'grams',
          },
          add: 'middle',
          attribute: 'flavour',
        },
        {
          name: 'Columbus',
          amount: {
            value: 19.5,
            unit: 'grams',
          },
          add: 'end',
          attribute: 'flavour',
        },
        {
          name: 'Centennial',
          amount: {
            value: 19.5,
            unit: 'grams',
          },
          add: 'end',
          attribute: 'flavour',
        },
        {
          name: 'Centennial',
          amount: {
            value: 115.5,
            unit: 'grams',
          },
          add: 'dry hop',
          attribute: 'aroma',
        },
        {
          name: 'Columbus',
          amount: {
            value: 96,
            unit: 'grams',
          },
          add: 'dry hop',
          attribute: 'aroma',
        },
        {
          name: 'Simcoe',
          amount: {
            value: 96,
            unit: 'grams',
          },
          add: 'dry hop',
          attribute: 'aroma',
        },
        {
          name: 'Amarillo',
          amount: {
            value: 77,
            unit: 'grams',
          },
          add: 'dry hop',
          attribute: 'aroma',
        },
      ],
      yeast: 'Wyeast 1272 - American Ale II™',
    },
    food_pairing: [
      'Poached eggs and smoked salmon',
      'Salt and pepper squid',
      'Key Lime Pie',
    ],
    brewers_tips:
      'Rack into a secondary fermenter and add your strawberries. Use a blow-off rather than an airlock as the fermentation can get pretty wild as the yeast starts using the sugar from the strawberries.',
    contributed_by: 'Sam Mason <samjbmason>',
  },
];
