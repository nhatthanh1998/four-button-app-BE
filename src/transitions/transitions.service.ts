import { BadRequestException } from '@nestjs/common';
import {COLOR} from '../enums'
export class TransitionsService {
  private currentColor: string = COLOR.BLUE;

  get() {
    return {color: this.currentColor};
  }

  reset() {
    this.currentColor = COLOR.BLUE;
    return {color: this.currentColor};
  }

  goNext(color: string) {
    if(color in COLOR) {
        if (this.currentColor === COLOR.BLUE) {
          this.currentColor = color;
        }
        else if(this.currentColor !== COLOR.BLUE && color === COLOR.BLUE) {
          this.currentColor = color;
        }
        else {
          throw new BadRequestException("Invalid move")
        }
        return {color: this.currentColor}
    } else {
      throw new BadRequestException("color is not match the enum. It must be in [BLUE, GREEN, YELLOW]")
    }
  }
}
