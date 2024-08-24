import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto, ProductTCP } from '../common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  @MessagePattern({ cmd: ProductTCP.CREATE })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern({ cmd: ProductTCP.FIND_ALL })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: ProductTCP.FIND_ONE })
  findOne(@Payload('id', ParseIntPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: ProductTCP.UPDATE })
  update(
    // @Param('id', ParseIntPipe) id: string,
    // @Body() updateProductDto: UpdateProductDto,
    @Payload() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: ProductTCP.DELETE })
  remove(@Payload('id', ParseIntPipe) id: string) {
    return this.productsService.remove(+id);
  }
}
