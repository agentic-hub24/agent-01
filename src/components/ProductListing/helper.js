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
    { label: 'Order by', value: '' },
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
    SKUColorFinishCode: { label: 'color/finish', type: 'image' },
    ProductInstallationType: { label: 'installation type', type: 'list' },
    ProductNumberofHandles: { label: 'number of identifiers', type: 'list' },
    ProductProductType: { label: 'product type', type: 'list' },
    ProductOverallWidthMm: { label: 'width', type: 'range' },
    RegionProductCategoryLocal: { label: 'category', type: 'list' },
    NumberOfHoles: { label: 'number of holes', type: 'list' },
    ProductMaterial: { label: 'material', type: 'list' },
    ProductConfiguration: { label: 'settings', type: 'list' },
    ProductShape: { label: 'bowl shape, form', type: 'list' },
    LitersPerFlush: { label: 'liters per discharge', type: 'list' },
    NightLight: { label: 'night light', type: 'list' },
    ProductLitersPerMinute: { label: 'liters per minute', type: 'range' },
    SprayType: { label: 'spray type', type: 'image' },
    ProductOverallLengthMm: { label: 'total length', type: 'range' },
    ProductNewProduct: { label: 'New', type: 'checkbox' },
    toilet_type: { label: 'toilet type', type: 'list' },
    HandleStyle: { label: 'Handle style', type: 'list' },
    TouchlessFaucet: { label: 'touchless faucet', type: 'list' },
    IntelligentToilet: { label: 'intelligent toilet', type: 'list' },
    BowlShape: { label: 'bowl shape', type: 'list' },
    BidetFunctionality: { label: 'bidet functionality', type: 'list' }
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
    showAll: 'Showall',
    buttonMDLabel: 'Categories & filters',
    colorLabel: 'Selected Color'
  },
  es: {
    filterby: 'Filtrar Por:',
    clearAll: 'Borrar Tudo',
    category: 'Categoría:',
    showAll: 'Mostrar Tudo',
    buttonMDLabel: 'Categorías y Filtros',
    colorLabel: 'Seleccione Color'
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
