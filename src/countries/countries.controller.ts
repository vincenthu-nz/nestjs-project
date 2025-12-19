import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { ListCountriesQueryDto } from './dto/list-countries.query';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  list(@Query() query: ListCountriesQueryDto) {
    return this.countriesService.list(query);
  }
}
