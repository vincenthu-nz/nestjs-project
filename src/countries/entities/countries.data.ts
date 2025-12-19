export type CountryItem = {
  name: string; // New Zealand
  iso2: string; // NZ
  iso3: string; // NZL
  callingCode: string; // +64
  icon: string; // flag:nz-4x3 (Iconify)
  popular?: boolean;
};

export const COUNTRIES: CountryItem[] = [
  {
    name: 'New Zealand',
    iso2: 'NZ',
    iso3: 'NZL',
    callingCode: '+64',
    icon: 'flag:nz-4x3',
    popular: true,
  },
  {
    name: 'Australia',
    iso2: 'AU',
    iso3: 'AUS',
    callingCode: '+61',
    icon: 'flag:au-4x3',
    popular: true,
  },
  {
    name: 'China',
    iso2: 'CN',
    iso3: 'CHN',
    callingCode: '+86',
    icon: 'flag:cn-4x3',
    popular: true,
  },
  {
    name: 'Taiwan',
    iso2: 'TW',
    iso3: 'TWN',
    callingCode: '+886',
    icon: 'flag:tw-4x3',
    popular: true,
  },
  {
    name: 'United States',
    iso2: 'US',
    iso3: 'USA',
    callingCode: '+1',
    icon: 'flag:us-4x3',
    popular: true,
  },
  {
    name: 'United Kingdom',
    iso2: 'GB',
    iso3: 'GBR',
    callingCode: '+44',
    icon: 'flag:gb-4x3',
    popular: true,
  },
];
