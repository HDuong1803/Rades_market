import CONFIG_CONTRACT from '../../config.json';
export interface IToken {
  contract_address: string;
  decimals: number;
  symbol: string;
  name: string;
  logo: string;
}

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';

const uuid = () => {
  var h = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  var k = [
    'x',
    'x',
    'x',
    'x',
    'x',
    'x',
    'x',
    'x',
    '-',
    'x',
    'x',
    'x',
    'x',
    '-',
    '4',
    'x',
    'x',
    'x',
    '-',
    'y',
    'x',
    'x',
    'x',
    '-',
    'x',
    'x',
    'x',
    'x',
    'x',
    'x',
    'x',
    'x',
    'x',
    'x',
    'x',
    'x',
  ];
  var u = '',
    i = 0,
    rb = (Math.random() * 0xffffffff) | 0;
  while (i++ < 36) {
    var c = k[i - 1],
      r = rb & 0xf,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    u += c == '-' || c == '4' ? c : h[v];
    rb = i % 8 == 0 ? (Math.random() * 0xffffffff) | 0 : rb >> 4;
  }
  return `x${u}`.split('-').join('');
};

const removeAccent = (str: string) => {
  var from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
    to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
  for (let i = 0; i < from.length; i++) {
    str = str.replace(RegExp(from[i], 'gi'), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, ' ')
    .replace(/-+/g, ' ');

  return str;
};

const GENRE = [
  'Acoustic',
  'Alternative',
  'Blues',
  'Classical',
  'Country',
  'Dance',
  'Electronic',
  'Hip Hop',
  'Indie',
  'Pop',
  'R&B',
];

const MOOD = ['Happy', 'Sad', 'Romantic', 'Angry', 'Relax', 'Party'];

const INSTRUMENT = ['Piano', 'Guitar', 'Violin', 'Drum', 'Bass', 'Saxophone'];

const Constant = {
  ZERO_ADDRESS,
  ZERO_BYTES32,
  MAX_FILE_UPLOAD: 10,
  LIMIT_MESSAGE: 25,
  EXPIRE_TIME: 24 * 60 * 60 * 1000,
  PATH_UPLOAD_FILE: '../upload_file/',
  NETWORK_STATUS_CODE: {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    EXPIRE: 498,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  NETWORK_STATUS_MESSAGE: {
    EMPTY: 'Empty',
    SUCCESS: 'Success',
    BAD_REQUEST: 'Bad request',
    EXPIRE: 'Expire time',
    UNAUTHORIZED: 'Unauthorized',
    NOT_FOUND: 'Not found',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    NOT_ENOUGH_RIGHT: 'Not Enough Rights',
  },
  CONFIG_CONTRACT,
  ROOT_PATH: __dirname.replace('build\\src\\constants', ''),
  MUSIC_MARKET_EVENT: {
    ListSong: 'ListSong',
    BuySong: 'BuySong',
  },
  ATTRIBUTES: {
    GENRE,
    MOOD,
    INSTRUMENT,
  },
};

export { Constant, uuid, removeAccent };
