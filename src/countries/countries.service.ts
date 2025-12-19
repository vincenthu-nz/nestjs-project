import { ListCountriesQueryDto } from './dto/list-countries.query';
import { COUNTRIES, CountryItem } from './entities/countries.data';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CountriesService {
  list(query: ListCountriesQueryDto): CountryItem[] {
    let items = [...COUNTRIES];

    // popular=true to return only popular countries
    if (query.popular === 'true') {
      items = items.filter((x) => x.popular);
    }

    // 搜索
    if (query.q?.trim()) {
      const q = query.q.trim().toLowerCase();
      items = items.filter((x) => {
        return (
          x.name.toLowerCase().includes(q) ||
          x.iso2.toLowerCase().includes(q) ||
          x.iso3.toLowerCase().includes(q) ||
          x.callingCode.replace('+', '').includes(q.replace('+', ''))
        );
      });
    }

    // popular first, then by name
    items.sort((a, b) => {
      const ap = a.popular ? 0 : 1;
      const bp = b.popular ? 0 : 1;
      if (ap !== bp) return ap - bp;
      return a.name.localeCompare(b.name);
    });

    if (query.limit) {
      items = items.slice(0, query.limit);
    }

    return items;
  }
}
