import * as randomNormal from 'random-normal';

export class Random {
  static getInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  static getIntWithoutRepetition(min: number, max: number, exclude: number[]) {
    let value
    
    do {
      value = this.getInt(min, max)
    } while(exclude.includes(value))

    return value
  }

  static getDouble(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  static getGaussian() {
    return randomNormal();
  }
}