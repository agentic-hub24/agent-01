export const carouselImageFormatter = (
  skuResourceName = '',
  isNewProduct = false
) => {
  if (skuResourceName) {
    return `//kohler.scene7.com/is/image/PAWEB/Category_Template?$PDPcon$&$gradient_src=PAWEB%2Forganic-gradient&$shadow_src=PAWEB%2FBlank&$Badge1_src=PAWEB%2F${
      isNewProduct ? '2New' : 'Blank'
    }&$Badge4_src=PAWEB%2FBlank&$Badge3_src=PAWEB%2FBlank&$Badge2_src=PAWEB%2FBlank&$product_src=is{PAWEB%2F${skuResourceName}}`;
  }
  return 'https://kohler.scene7.com/is/image/PAWEB/Category_Template?$PDPcon$&$gradient_src=PAWEB%2Forganic-gradient&$shadow_src=PAWEB%2FBlank&$Badge1_src=PAWEB%2FBlank&$Badge4_src=PAWEB%2FBlank&$Badge3_src=PAWEB%2FBlank&$Badge2_src=PAWEB%2FBlank&$product_src=is%7BPAWEB%2Fdefault%7D';
};

export const imageFormatter = skuResourceName => {
  if (skuResourceName) {
    return `https://kohler.scene7.com/is/image/PAWEB/${skuResourceName}`;
  }
  return 'https://kohler.scene7.com/is/image/PAWEB/Category_Template?$PDPcon$&$gradient_src=PAWEB%2Forganic-gradient&$shadow_src=PAWEB%2FBlank&$Badge1_src=PAWEB%2FBlank&$Badge4_src=PAWEB%2FBlank&$Badge3_src=PAWEB%2FBlank&$Badge2_src=PAWEB%2FBlank&$product_src=is%7BPAWEB%2Fdefault%7D';
};

export const colorImageFormatter = colorid => {
  if (colorid) {
    return `https://kohler.scene7.com/is/image/PAWEB/swatch_${colorid}?$SwatchSS$`;
  }
};

export const selectOptions = {
  en: [
    { label: 'Sort by', value: '' },
    { label: 'Relevance', value: '' },
    { label: 'Name A-Z', value: 'ProductBrandName asc' },
    { label: 'Name Z-A', value: 'ProductBrandName desc' }
  ],
  es: [
    { label: 'Ordenar por', value: '' },
    { label: 'Relevancia', value: '' },
    { label: 'Nombre A-Z', value: 'ProductBrandName asc' },
    { label: 'Nombre Z-A', value: 'ProductBrandName desc' }
  ]
};

export const filterMapping = [
  {
    en: {
      ProductNewProduct: { label: 'New', type: 'checkbox' },
      SKUColorFinishCode: { label: 'color/finish', type: 'image' },
      ProductInstallationType: { label: 'installation type', type: 'list' },
      ProductNumberofHandles: { label: 'number of handles', type: 'list' },
      ProductProductType: { label: 'product type', type: 'list' },
      ProductOverallWidthMm: { label: 'size - front to back', type: 'range' },
      RegionProductCategoryLocal: { label: 'category', type: 'list' },
      NumberOfHoles: { label: 'number of holes', type: 'list' },
      ProductMaterial: { label: 'material', type: 'list' },
      ProductConfiguration: { label: 'settings', type: 'list' },
      ProductShape: { label: 'shape', type: 'list' },
      LitersPerFlush: { label: 'liters per discharge', type: 'list' },
      NightLight: { label: 'night light', type: 'list' },
      ProductLitersPerMinute: { label: 'LITERS PER FLUSH', type: 'list' },
      SprayType: { label: 'spray type', type: 'list' },
      ProductOverallLengthMm: { label: 'size - side to side', type: 'range' },
      toilet_type: { label: 'toilet type', type: 'list' },
      HandleStyle: { label: 'Handle type', type: 'list' },
      TouchlessFaucet: { label: 'touchless', type: 'list' },
      IntelligentToilet: { label: 'intelligent toilet', type: 'list' },
      BowlShape: { label: 'bowl shape', type: 'list' },
      BidetFunctionality: { label: 'bidet functionality', type: 'list' },
      ProductBrandNameDisplay: { label: 'Collection', type: 'list' }
    },
    es: {
      ProductNewProduct: { label: 'Nuevos Productos', type: 'checkbox' },
      SKUColorFinishCode: { label: 'color/acabado', type: 'image' },
      ProductInstallationType: { label: 'tipo de instalación', type: 'list' },
      ProductNumberofHandles: {
        label: 'NÚMERO DE MANERALES',
        type: 'list'
      },
      ProductProductType: { label: 'tipo de producto', type: 'list' },
      ProductOverallWidthMm: { label: 'Ancho Total (mm)', type: 'range' },
      RegionProductCategoryLocal: { label: 'categoría', type: 'list' },
      NumberOfHoles: { label: 'número de agujeros', type: 'list' },
      ProductMaterial: { label: 'material', type: 'list' },
      ProductConfiguration: { label: 'ajustes', type: 'list' },
      ProductShape: { label: 'forma', type: 'list' },
      LitersPerFlush: { label: 'litros por descarga', type: 'list' },
      NightLight: { label: 'Luz NOCTURNA', type: 'list' },
      ProductLitersPerMinute: { label: 'litros por LIMPIAR', type: 'list' },
      SprayType: { label: 'TIPO SPRAY', type: 'list' },
      ProductOverallLengthMm: { label: 'longitud Total (mm)', type: 'range' },
      toilet_type: { label: 'TIPO DE SANITARIO', type: 'list' },
      HandleStyle: { label: 'tipo de Mango', type: 'list' },
      TouchlessFaucet: { label: 'sin contacto', type: 'list' },
      IntelligentToilet: { label: 'baño inteligente', type: 'list' },
      BowlShape: { label: 'forma CÓNCAVA', type: 'list' },
      BidetFunctionality: { label: 'funcionalidad de bidé', type: 'list' },
      ProductBrandNameDisplay: { label: 'COLECCIÓN', type: 'list' }
    }
  }
];

export const filterImageFormatter = value => {
  if (value) {
    return `https://kohler.scene7.com/is/image/PAWEB/swatch_${value}?$SwatchSS$`;
  }
  return 'https://kohler.scene7.com/is/image/PAWEB/Category_Template?$PDPcon$&$gradient_src=PAWEB%2Forganic-gradient&$shadow_src=PAWEB%2FBlank&$Badge1_src=PAWEB%2FBlank&$Badge4_src=PAWEB%2FBlank&$Badge3_src=PAWEB%2FBlank&$Badge2_src=PAWEB%2FBlank&$product_src=is%7BPAWEB%2Fdefault%7D';
};

export const staticLabelsPLP = {
  en: {
    filterby: 'Filter by:',
    clearAll: 'Clear all',
    category: 'Category:',
    showAll: 'Show all',
    buttonMDLabel: 'Categories & filters',
    colorLabel: 'Selected Color',
    searchForLabel: 'Search results for',
    totalProductLabel: 'Search results',
    product: 'Products',
    spec: 'Spec',
    tech: 'Technical Information Downloads',
    template: 'Template & Symbol Downloads',
    didYouMean: 'Did you mean?',
    selectCategoryLabel: 'Select a Category',
    noProductFound:
      'Sorry! No product found in this combination. Please reset the filter and try again.'
  },
  es: {
    filterby: 'Filtrar Por:',
    clearAll: 'Borrar Tudo',
    category: 'Categoría:',
    showAll: 'Mostrar Tudo',
    buttonMDLabel: 'Categorías y Filtros',
    colorLabel: 'Seleccione Color',
    searchForLabel: 'Buscar resultados para',
    totalProductLabel: 'Resultados',
    product: 'Productos',
    spec: 'Especificación',
    tech: 'Descargar Información Técnica',
    template: 'Descargar Plantillas y Símbolos',
    didYouMean: '¿Querías decir?',
    selectCategoryLabel: 'Seleccione una categoría',
    noProductFound:
      '¡Lo siento! No se ha encontrado ningún producto en esta combinación. Restablece el filtro y vuelve a intentarlo.'
  }
};

export const DEFAULT_IMAGE_LINK =
  'https://kohler.scene7.com/is/image/PAWEB/Category_Template?$PDPcon$&$gradient_src=PAWEB%2Forganic-gradient&$shadow_src=PAWEB%2FBlank&$Badge1_src=PAWEB%2FBlank&$Badge4_src=PAWEB%2FBlank&$Badge3_src=PAWEB%2FBlank&$Badge2_src=PAWEB%2FBlank&$product_src=is%7BPAWEB%2Fdefault%7D';

export const CTAObject = {
  es: {
    internalTitle: 'Latem - Help us Improve this Site - CTA PT',
    label: 'Ayúdenos a mejorar este sitio',
    ariaLabel: 'Help us Improve this Site ',
    visible: true,
    buttonBrandColor: 'None',
    ctaType: 'Text Link'
  },
  en: {
    internalTitle: 'Latem - Help us Improve this Site - CTA PT',
    label: 'Help us Improve this Site',
    ariaLabel: 'Help us Improve this Site ',
    visible: true,
    buttonBrandColor: 'None',
    ctaType: 'Text Link'
  }
};

export const formatterHeader = header => {
  return header.replace(/\+/g, ' ');
};

export const SHOWALL_LABELS = {
  es: {
    categoryButton: 'Categorías y Filtros',
    category: 'Categoría'
  },
  en: {
    categoryButton: 'Category & Filters',
    category: 'Category'
  }
};

export const filterValueMap = {
  en: {
    'Bathroom Sink Faucets': [
      'SKUColorFinishCode',
      'ProductInstallationType',
      'HandleStyle',
      'NumberOfHoles'
    ],

    'Bathroom Sinks': [
      'SKUColorFinishCode',
      'ProductMaterial',
      'ProductOverallLengthMm',
      'ProductOverallWidthMm',
      'ProductInstallationType',
      'ProductShape'
    ],

    Toilets: [
      'ProductNewProduct',
      'SKUColorFinishCode',
      'toilet_type',
      'LitersPerFlush',
      'BowlShape'
    ],

    'Toilet Seats': [
      'ProductNewProduct',
      'SKUColorFinishCode',
      'BowlShape',
      'NightLight',
      'BidetFunctionality'
    ],

    Bathing: [
      'SKUColorFinishCode',
      'ProductMaterial',
      'ProductInstallationType'
    ],

    Bidets: ['SKUColorFinishCode'],

    'Bidet Faucets': ['SKUColorFinishCode'],

    'Bathroom Accessories': ['SKUColorFinishCode', 'ProductProductType'],

    'Bathroom Furniture': ['SKUColorFinishCode', 'ProductProductType'],

    'Bath Faucets': [
      'SKUColorFinishCode',
      'HandleStyle',
      'ProductInstallationType'
    ],

    'Bath Spouts': ['SKUColorFinishCode'],

    Showerheads: [
      'SKUColorFinishCode',
      'ProductLitersPerMinute',
      'SprayType',
      'ProductShape'
    ],

    'Shower Faucets': [
      'SKUColorFinishCode',
      'SprayType',
      'NumberOfHoles',
      'HandleStyle'
    ],

    Handshowers: ['SKUColorFinishCode', 'ProductLitersPerMinute', 'SprayType'],

    Rainheads: ['SKUColorFinishCode', 'ProductLitersPerMinute', 'ProductShape'],

    'Body Sprays': [],

    Columns: ['SKUColorFinishCode'],

    'Shower Valves': [],

    'Shower Valve Trim': ['SKUColorFinishCode', 'NumberOfHoles', 'HandleStyle'],

    'Bath and Shower Fittings': ['SKUColorFinishCode', 'ProductProductType'],

    'Shower Enclosures': ['SKUColorFinishCode', 'ProductBrandNameDisplay'],

    'Commercial Faucets': ['SKUColorFinishCode'],

    'Commercial Urinals': [
      'SKUColorFinishCode',
      'ProductProductType',
      'ProductInstallationType',
      'LitersPerFlush'
    ],

    'Commercial Toilets': [
      'SKUColorFinishCode',
      'ProductInstallationType',
      'ProductLitersPerMinute'
    ],

    'Commercial Flushometers': [
      'SKUColorFinishCode',
      'ProductProductType',
      'ProductLitersPerMinute'
    ],

    'Kitchen Faucets': [
      'ProductNewProduct',
      'SKUColorFinishCode',
      'ProductNumberofHandles',
      'TouchlessFaucet'
    ],

    'Kitchen Sinks': [
      'SKUColorFinishCode',
      'ProductMaterial',
      'ProductInstallationType'
    ],

    'Kitchen Accessories': ['SKUColorFinishCode', 'ProductProductType']
  },
  es: {
    'Grifería de Lavabo': [
      'SKUColorFinishCode',
      'ProductInstallationType',
      'HandleStyle',
      'NumberOfHoles'
    ],

    Lavabos: [
      'SKUColorFinishCode',
      'ProductMaterial',
      'ProductOverallLengthMm',
      'ProductOverallWidthMm',
      'ProductInstallationType',
      'ProductShape'
    ],

    Sanitarios: [
      'ProductNewProduct',
      'SKUColorFinishCode',
      'toilet_type',
      'LitersPerFlush',
      'BowlShape'
    ],

    'Asiento para Sanitarios': [
      'ProductNewProduct',
      'SKUColorFinishCode',
      'BowlShape',
      'NightLight',
      'BidetFunctionality'
    ],

    Bañeras: [
      'SKUColorFinishCode',
      'ProductMaterial',
      'ProductInstallationType'
    ],

    Bidés: ['SKUColorFinishCode'],

    'Grifería de Bidé': ['SKUColorFinishCode'],

    'Accesorios de Baño': ['SKUColorFinishCode', 'ProductProductType'],

    'Muebles de Baño': ['SKUColorFinishCode', 'ProductProductType'],

    'Grifería de Baño': [
      'SKUColorFinishCode',
      'HandleStyle',
      'ProductInstallationType'
    ],

    'Griferías de Bañera': ['SKUColorFinishCode'],

    'Cabezas de ducha': [
      'SKUColorFinishCode',
      'ProductLitersPerMinute',
      'SprayType',
      'ProductShape'
    ],

    'Grifería de Ducha': [
      'SKUColorFinishCode',
      'SprayType',
      'NumberOfHoles',
      'HandleStyle'
    ],

    'Duchas de mano': [
      'SKUColorFinishCode',
      'ProductLitersPerMinute',
      'SprayType'
    ],

    'Cabezas de Lluvia': [
      'SKUColorFinishCode',
      'ProductLitersPerMinute',
      'ProductShape'
    ],

    Rociadores: [],

    Columnas: ['SKUColorFinishCode'],

    'Válvulas de Ducha': [],

    'Accesorios de Baño y Ducha': ['SKUColorFinishCode', 'ProductProductType'],

    'Manerales de Ducha': [
      'SKUColorFinishCode',
      'NumberOfHoles',
      'HandleStyle'
    ],

    'Recubrimientos para Ducha': [
      'SKUColorFinishCode',
      'ProductBrandNameDisplay'
    ],

    'Grifería Institucional': ['SKUColorFinishCode'],

    'Urinarios Institucionales': [
      'SKUColorFinishCode',
      'ProductProductType',
      'ProductInstallationType',
      'LitersPerFlush'
    ],

    'Sanitarios Institucionales': [
      'SKUColorFinishCode',
      'ProductInstallationType',
      'LitersPerFlush'
    ],

    'Fluxómetros Institucionales': [
      'SKUColorFinishCode',
      'ProductProductType',
      'ProductLitersPerMinute'
    ],

    'Grifería de Cocina': [
      'ProductNewProduct',
      'SKUColorFinishCode',
      'ProductNumberofHandles',
      'TouchlessFaucet'
    ],

    'Fregaderos de cocina': [
      'SKUColorFinishCode',
      'ProductMaterial',
      'ProductInstallationType'
    ],

    'Accesorios de Cocina': ['SKUColorFinishCode', 'ProductProductType']
  }
};
