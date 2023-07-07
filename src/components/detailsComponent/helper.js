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

export const gifLineArtImageFormatter = image => {
  // TODO: Latem link should be here
  return `https://resources.kohler.com/plumbing/kohlerbrazil/lineart/${image}`;
};

export const checkForNewProducts = dateStr => {
  // Provided date
  const providedDate = new Date(dateStr);

  // Current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const difference = currentDate - providedDate;

  // Convert milliseconds to years
  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365;
  const differenceInYears = difference / millisecondsInYear;

  // Check if the difference is greater than or equal to 1 year
  if (differenceInYears >= 1) {
    return false;
  } else {
    return true;
  }
};

export const magnify = (imgID, zoom) => {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);
  /*create magnifier glass:*/
  glass = document.createElement('DIV');
  glass.setAttribute('class', 'img-magnifier-glass');
  /*insert magnifier glass:*/
  img.parentElement.insertBefore(glass, img);
  /*set background properties for the magnifier glass:*/
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = 'no-repeat';
  glass.style.backgroundSize =
    img.width * zoom + 'px ' + img.height * zoom + 'px';
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;
  /*execute a function when someone moves the magnifier glass over the image:*/
  glass.addEventListener('mousemove', moveMagnifier);
  img.addEventListener('mousemove', moveMagnifier);
  /*and also for touch screens:*/
  glass.addEventListener('touchmove', moveMagnifier);
  img.addEventListener('touchmove', moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > img.width - w / zoom) {
      x = img.width - w / zoom;
    }
    if (x < w / zoom) {
      x = w / zoom;
    }
    if (y > img.height - h / zoom) {
      y = img.height - h / zoom;
    }
    if (y < h / zoom) {
      y = h / zoom;
    }
    /*set the position of the magnifier glass:*/
    glass.style.left = x - w + 'px';
    glass.style.top = y - h + 'px';
    /*display what the magnifier glass "sees":*/
    glass.style.backgroundPosition =
      '-' + (x * zoom - w + bw) + 'px -' + (y * zoom - h + bw) + 'px';
  }
  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.scrollX;
    y = y - window.scrollY;
    return { x: x, y: y };
  }
};

export const DEFAULT_IMAGE_LINK =
  'https://kohler.scene7.com/is/image/PAWEB/Category_Template?$PDPcon$&$gradient_src=PAWEB%2Forganic-gradient&$shadow_src=PAWEB%2FBlank&$Badge1_src=PAWEB%2FBlank&$Badge4_src=PAWEB%2FBlank&$Badge3_src=PAWEB%2FBlank&$Badge2_src=PAWEB%2FBlank&$product_src=is%7BPAWEB%2Fdefault%7D';

export const PRODUCT_RESOURCE_TYPE_SPEC_DOC = 'SpecPDFFileName';
export const TECHNICAL_INFORMATION_FILES = [
  'InstallationWithoutSPPDF',
  'SpecPDFFileName',
  'HomeownersGuide',
  'PartsPDFFileName'
];
export const TECHNICAL_INFORMATION_FILES_NAMES = {
  es: {
    SpecPDFFileName: 'áspera/ Hoja de especificaciones',
    HomeownersGuide: 'guía de dueños de casa',
    InstallationWithoutSPPDF: 'Guia de instalação sem peçus de serviço',
    PartsPDFFileName: 'Peças pdf'
  },
  en: {
    SpecPDFFileName: 'áspera/ Hoja de especificaciones',
    HomeownersGuide: 'guía de dueños de casa',
    InstallationWithoutSPPDF: 'Guia de instalação sem peçus de serviço',
    PartsPDFFileName: 'Peças pdf'
  }
};
export const PRODUCT_GIF_LINE_ART_IMAGE = 'GIFLineArt';
export const PRODUCT_CAROUSEL_IMAGE = 'IMGITEMISO';
export const PRODUCT_Cut_Out_DXF = 'CutOutDXF';
export const PRODUCT_BIMRevit = 'BIMRevit';
export const PRODUCT_PLAN_3D = [
  '3DRevit',
  '3DSketchup',
  '3DDXF',
  '3DDWG',
  '3D3DS',
  '3DOBJ'
];
export const PRODUCT_PLAN_NAME_3D = {
  '3DRevit': 'Revit',
  '3DSketchup': 'Sketchup',
  '3DDXF': 'DXF',
  '3DDWG': 'DWG',
  '3D3DS': '3DS',
  '3DOBJ': 'OBJ'
};
export const PRODUCT_FRONT_NAME_2D = {
  DWGFrontView: 'DWG',
  DXFFrontView: 'DXF'
};
export const PRODUCT_PLAN_NAME_2D = {
  DWGPlanView: 'DWG',
  DXFPlanView: 'DXF'
};
export const PRODUCT_SIDE_NAME_2D = {
  DWGSideView: 'DWG',
  DXFSideView: 'DXF'
};
export const PRODUCT_Front_View_2D = ['DWGFrontView', 'DXFFrontView'];
export const PRODUCT_Plan_View_2D = ['DWGPlanView', 'DXFPlanView'];
export const PRODUCT_Side_View_2D = ['DWGSideView', 'DXFSideView'];
export const PRODUCT_ADDITIONAL_IMAGE = [
  'IMGTOP',
  'IMGFront',
  'IMGCLOSEROOMVIEW',
  'IMGOVERHEADROOMVIEW',
  'IMGCLOSEROOMVIEWInUse'
];

export const PDP_LABELS = {
  es: {
    colorName: 'Color:',
    storelocatorButtonLabel: 'Donde Comprar',
    home: 'Inicio',
    specFileLabel: 'Dimensiones y Medidas',
    characteristics: 'Características',
    installation: 'Instalación',
    material: 'Material',
    resources: 'Recursos',
    cadTemplate: 'modelos de CAD',
    cadFiles2D: 'Archivos CAD 2D:',
    plan: 'Plan',
    front: 'Fuente',
    side: 'Lado',
    cadFiles3D: 'Archivos CAD 3D:',
    supportService: 'Servicio y Soporte',
    supportServiceQ: '¿Tiene alguna pregunta sobre este producto?',
    contactUs: 'Llámanos:',
    contactUsNumber: '+001-920 451 4418 ext. 74418',
    contactUsNumberLink: 'tel:+0019204514418,74418',
    contactUsTime: '8:00am - 5:00pm  (Zona Horaria Central)',
    contactUsDay: 'De Lunes a Viernes',
    emailUS: 'Escríbenos',
    careAndCleaning: 'Cuidado y Limpieza',
    careCleaningLink: 'cuidado-y-limpieza',
    guarantee: 'Información de la Garantía',
    warrantyLink: 'garantía-información',
    technicalInformation: 'Información Técnica',
    dimension: 'Dimensión',
    paresWellWith: 'COMBINA PERFECTAMENTE CON',
    similarProducts: 'Productos Similares',
    cutOutTemplates: 'Plantilla de recorte',
    bimRevit: 'BIM Revit',
    twitterText: 'Estoy compartiendo en twitter!',
    collection: 'Colección',
    technology: 'Tecnología'
  },
  en: {
    colorName: 'Color:',
    home: 'Home',
    storelocatorButtonLabel: 'Store Locator',
    specFileLabel: 'Dimensions & Measurements',
    characteristics: 'Features',
    installation: 'Installation',
    material: 'Material',
    resources: 'Resource',
    cadTemplate: 'CAD Modules',
    cadFiles2D: 'CAD Files 2D:',
    plan: 'Plan',
    front: 'Front',
    side: 'Side',
    cadFiles3D: 'CAD Files 3D:',
    supportService: 'Service & Support',
    supportServiceQ: 'Have a question about this product?',
    contactUs: 'Call us:',
    contactUsNumber: '1800-103-2244',
    contactUsNumberLink: 'tel:+1800-103-2244',
    contactUsTime: '10:00hrs to 18:00hrs (IST)',
    contactUsDay: 'Monday to Saturday',
    emailUS: 'Email Us',
    careAndCleaning: 'Care and Cleaning tips',
    careCleaningLink: 'care-and-cleaning',
    guarantee: 'Warranty Information',
    warrantyLink: 'warranty',
    technicalInformation: 'Technical Information',
    dimension: 'Dimensions',
    paresWellWith: 'Pairs Well With',
    similarProducts: 'Similar Products',
    cutOutTemplates: 'Cut out Templates',
    bimRevit: 'BIM Revit',
    twitterText: 'I am sharing on twitter!',
    collection: 'Collection',
    technology: 'Technology'
  }
};

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
    label: 'Ayúdenos a mejorar este sitio',
    ariaLabel: 'Help us Improve this Site ',
    visible: true,
    buttonBrandColor: 'None',
    ctaType: 'Text Link'
  }
};
