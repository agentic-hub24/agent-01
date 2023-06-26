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

export const selectOptions = [
  { label: 'Order by', value: '' },
  { label: 'Relevance', value: '' },
  { label: 'Name A-Z', value: 'ProductBrandName asc' },
  { label: 'Name Z-A', value: 'ProductBrandName desc' }
];

export const filterMapping = [
  {
    SKUColorFinishCode: { label: 'color/finish', type: 'image' },
    ProductInstallationType: { label: 'installation type', type: 'list' },
    ProductNumberofHandles: { label: 'number of identifiers', type: 'list' },
    ProductProductType_PT: { label: 'product type', type: 'list' },
    ProductOverallWidthMm: { label: 'width', type: 'range' },
    ProductATGDefaultCategory_PT: { label: 'category', type: 'list' },
    NumberOfHoles: { label: 'number of holes', type: 'list' },
    ProductMaterial_PT: { label: 'material', type: 'list' },
    ProductConfiguration_PT: { label: 'settings', type: 'list' },
    ProductShape_PT: { label: 'bowl shape, form', type: 'list' },
    LitersPerFlush: { label: 'liters per discharge', type: 'list' },
    NightLight_PT: { label: 'night light', type: 'list' },
    ProductLitersPerMinute: { label: 'liters per minute', type: 'range' },
    SprayType: { label: 'spray type', type: 'image' },
    ProductOverallLengthMm: { label: 'total length', type: 'range' }
  }
];

export const filterImageFormatter = value => {
  if (value) {
    return `https://kohler.scene7.com/is/image/PAWEB/swatch_${value}?$SwatchSS$`;
  }
  return 'https://kohler.scene7.com/is/image/PAWEB/Category_Template?$PDPcon$&$gradient_src=PAWEB%2Forganic-gradient&$shadow_src=PAWEB%2FBlank&$Badge1_src=PAWEB%2FBlank&$Badge4_src=PAWEB%2FBlank&$Badge3_src=PAWEB%2FBlank&$Badge2_src=PAWEB%2FBlank&$product_src=is%7BPAWEB%2Fdefault%7D';
};

export const staticLabelsPLP = {
  filterby: 'Filtrar Por:',
  clearAll: 'Limpar Tudo',
  category: 'Categoria:',
  showAll: 'Mostre Tudo',
  buttonMDLabel: 'Categorias e Filtros'
};

export const DEFAULT_IMAGE_LINK =
  'https://kohler.scene7.com/is/image/PAWEB/Category_Template?$PDPcon$&$gradient_src=PAWEB%2Forganic-gradient&$shadow_src=PAWEB%2FBlank&$Badge1_src=PAWEB%2FBlank&$Badge4_src=PAWEB%2FBlank&$Badge3_src=PAWEB%2FBlank&$Badge2_src=PAWEB%2FBlank&$product_src=is%7BPAWEB%2Fdefault%7D';

export const CTAObject = {
  internalTitle: 'Latem - Help us Improve this Site - CTA PT',
  label: 'Ajude-nos a Melhorar este Site',
  ariaLabel: 'Help us Improve this Site ',
  visible: true,
  buttonBrandColor: 'None',
  ctaType: 'Text Link'
};
