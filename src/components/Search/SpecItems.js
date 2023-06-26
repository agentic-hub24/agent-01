import { DownloadIcon } from '@components/svgs';

const SpecItems = ({ downloadLink, linkType }) => {
  return linkType !== 'technical' ? (
    <div className='block  pl-[20px]'>
      {(downloadLink?.DWGPlanView ||
        downloadLink?.DWGFrontView ||
        downloadLink?.DWGSideView) && (
        <div className='relative float-left w-2/5 min-h-1px pl-10px pr-10px'>
          <span className='font-bold text-base leading-normal font-normal'>
            2D arquivos CAD:
          </span>
          {downloadLink?.DWGPlanView && (
            <>
              <span className='block my-4px'>Plan</span>
              <ul className='p-0 my-4px list-none overflow-auto'>
                <li className='pl-[0px] border-l-0 block float-left px-[5px] '>
                  <a
                    target='_blank'
                    href={downloadLink?.DWGPlanView}
                    className='pl-[1.3em] bg-[url(https://www.br.kohler.com/images/Kohler_Download_icon_18x18.png)] bg-no-repeat'
                    rel='noreferrer'
                  >
                    DWG
                  </a>
                </li>
                <li className='pl-[5px] block float-left px-[5px]  border-l border-solid border-gray-800 border-b-0'>
                  <a
                    target='_blank'
                    href={downloadLink?.DXFPlanView}
                    rel='noreferrer'
                  >
                    DXF
                  </a>
                </li>
              </ul>
            </>
          )}
          {downloadLink?.DWGFrontView && (
            <>
              <span className='block my-4px'>Frente</span>
              <ul className='p-0 my-4px list-none overflow-auto'>
                <li className='pl-[0px] border-l-0 block float-left px-[5px] '>
                  <a
                    target='_blank'
                    href={downloadLink?.DWGFrontView}
                    className='pl-[1.3em] bg-[url(https://www.br.kohler.com/images/Kohler_Download_icon_18x18.png)] bg-no-repeat'
                    rel='noreferrer'
                  >
                    DWG
                  </a>
                </li>
                <li className='pl-[5px] block float-left px-[5px]  border-l border-solid border-gray-800 border-b-0'>
                  <a
                    target='_blank'
                    href={downloadLink?.DXFFrontView}
                    rel='noreferrer'
                  >
                    DXF
                  </a>
                </li>
              </ul>
            </>
          )}
          {downloadLink?.DWGSideView && (
            <>
              <span className='block my-4px'>Side</span>
              <ul className='p-0 my-4px list-none overflow-auto'>
                <li className='pl-[0px]  block float-left px-[5px]'>
                  <a
                    target='_blank'
                    href={downloadLink?.DWGSideView}
                    className='pl-[1.3em] bg-[url(https://www.br.kohler.com/images/Kohler_Download_icon_18x18.png)] bg-no-repeat'
                    rel='noreferrer'
                  >
                    DWG
                  </a>
                </li>
                <li className='pl-[5px] block float-left px-[5px]  border-l border-solid border-gray-800 border-b-0'>
                  <a
                    target='_blank'
                    href={downloadLink?.DXFSideView}
                    rel='noreferrer'
                  >
                    DXF
                  </a>
                </li>
              </ul>
            </>
          )}
        </div>
      )}
      <div className='koh-product-templates-3d'>
        <span>3D CAD Files:</span>
        <ul className='p-0 my-4px list-none overflow-auto'>
          <li className='pl-[0px] border-l-0 block float-left px-[5px]'>
            <a target='_blank' href={downloadLink?.ThreeDDXF} rel='noreferrer'>
              DXF
            </a>
          </li>
          <li className='pl-[5px] block float-left px-[5px]  border-l border-solid border-gray-800 border-b-0'>
            <a
              target='_blank'
              href={downloadLink?.ThreeDThreeDS}
              rel='noreferrer'
            >
              3DS
            </a>
          </li>
          <li className='pl-[5px] block float-left px-[5px]  border-l border-solid border-gray-800 border-b-0'>
            <a
              target='_blank'
              href={downloadLink?.ThreeDSketchup}
              rel='noreferrer'
            >
              SKETCHUP
            </a>
          </li>
          <li className='pl-[5px] block float-left px-[5px]  border-l border-solid border-gray-800 border-b-0'>
            <a
              target='_blank'
              href={downloadLink?.ThreeDRevit}
              rel='noreferrer'
            >
              REVIT
            </a>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className='block pl-[20px]'>
      <div>
        <ul className='p-0 my-4px list-none overflow-auto mb-[10px]'>
          {downloadLink?.InstallationWithoutSPPDF && (
            <li className='pl-[0px]  block float-left px-[5px]'>
              <a
                target='_blank'
                href={downloadLink?.InstallationWithoutSPPDF}
                className='pl-[1.3em]  bg-[1em] bg-[url(https://www.br.kohler.com/images/Adobe_PDF_file_icon_32x32.png)] bg-no-repeat'
                rel='noreferrer'
              >
                Guia de instalação sem Peças de serviço
              </a>
            </li>
          )}
          {downloadLink?.SpecPDFFileName && (
            <li className='pl-[0px]  block float-left px-[100px]'>
              <a
                target='_blank'
                href={downloadLink?.SpecPDFFileName}
                className='pl-[1.3em]  bg-[url(https://www.br.kohler.com/images/Adobe_PDF_file_icon_32x32.png)] bg-[1em] bg-no-repeat'
                rel='noreferrer'
              >
                Folha in / Spec áspera
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SpecItems;
