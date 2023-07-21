import { IPackage, TOKEN } from "@/_types_";

export const packages: IPackage[] = [
  {
    key: 'matic-01',
    amount: 500,
    bg: 'matic-bg.jpg',
    icon: 'matic.png',
    token: TOKEN.MATIC,
  },
  {
    key: 'matic-02',
    amount: 1000,
    bg: 'matic-bg.jpg',
    icon: 'matic.png',
    token: TOKEN.MATIC,
  },
  {
    key: 'matic-03',
    amount: 2000,
    bg: 'matic-bg.jpg',
    icon: 'matic.png',
    token: TOKEN.MATIC,
  },
  {
    key: 'usdt-01',
    amount: 500,
    bg: 'usdt-bg.png',
    icon: 'usdt.png',
    token: TOKEN.USDT,
  },
  {
    key: 'usdt-02',
    amount: 1000,
    bg: 'usdt-bg.png',
    icon: 'usdt.png',
    token: TOKEN.USDT,
  },
  {
    key: 'usdt-03',
    amount: 2000,
    bg: 'usdt-bg.png',
    icon: 'usdt.png',
    token: TOKEN.USDT,
  }
]

export const NUMBER_PATTERN = '/^[0-9]*\.?[0-9]*$/';