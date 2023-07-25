import { HiOutlineDownload } from 'react-icons/hi';
import {
  PDP_LABELS,
  TECHNICAL_INFORMATION_FILES_NAMES
} from '@components/detailsComponent/helper';

const SpecItems = ({ downloadLink, linkType, locale }) => {
  return linkType !== 'technical' ? (
    <div className='block  pl-[20px]'>
      {(downloadLink?.DWGPlanView ||
        downloadLink?.DWGFrontView ||
        downloadLink?.DWGSideView) && (
        <div className='relative float-left w-2/5 min-h-1px pl-10px pr-10px'>
          <span className='font-bold text-base leading-normal font-normal'>
            {PDP_LABELS[locale].cadFiles2D}
          </span>
          {downloadLink?.DWGPlanView && (
            <>
              <span className='block my-4px'>{PDP_LABELS[locale].plan}</span>
              <div className='flex'>
                <span className='flex'>
                  <HiOutlineDownload size={20} />
                </span>
                <ul className='flex p-0 my-4px list-none overflow-auto pl-2'>
                  <li className='pl-[0px] border-l-0 block float-left px-[5px] '>
                    <a
                      target='_blank'
                      href={downloadLink?.DWGPlanView}
                      className=''
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
              </div>
            </>
          )}
          {downloadLink?.DWGFrontView && (
            <>
              <span className='block my-4px'>{PDP_LABELS[locale].front}</span>
              <div className='flex'>
                <span className='flex'>
                  <HiOutlineDownload size={20} />
                </span>
                <ul className='flex p-0 my-4px list-none overflow-auto pl-2'>
                  <li className='pl-[0px] border-l-0 block float-left px-[5px] '>
                    <a
                      target='_blank'
                      href={downloadLink?.DWGFrontView}
                      className=''
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
              </div>
            </>
          )}
          {downloadLink?.DWGSideView && (
            <>
              <span className='block my-4px'>{PDP_LABELS[locale].side}</span>
              <div className='flex'>
                <span className='flex'>
                  <HiOutlineDownload size={20} />
                </span>
                <ul className='flex p-0 my-4px list-none overflow-auto pl-2'>
                  <li className='pl-[0px]  block float-left px-[5px]'>
                    <a
                      target='_blank'
                      href={downloadLink?.DWGSideView}
                      className=''
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
              </div>
            </>
          )}
        </div>
      )}
      <div className='koh-product-templates-3d'>
        <span>{PDP_LABELS[locale].cadFiles3D}</span>
        <div className='flex'>
          <span className='flex'>
            <HiOutlineDownload size={20} />
          </span>
          <ul className='flex p-0 my-4px list-none overflow-auto pl-2'>
            <li className='pl-[0px] border-l-0 block float-left px-[5px]'>
              <a
                target='_blank'
                href={downloadLink?.ThreeDDXF}
                rel='noreferrer'
              >
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
    </div>
  ) : (
    <div className='pl-[20px]'>
      <ul className='flex flex-col p-0 my-4px list-none overflow-auto mb-[10px]'>
        {downloadLink?.InstallationWithoutSPPDF && (
          <li className='pl-[0px] flex float-left px-[5px]'>
            <a
              target='_blank'
              href={downloadLink?.InstallationWithoutSPPDF}
              className=''
              rel='noreferrer'
            >
              {
                TECHNICAL_INFORMATION_FILES_NAMES[locale]
                  .InstallationWithoutSPPDF
              }
            </a>
          </li>
        )}
        {downloadLink?.SpecPDFFileName && (
          <li className='pl-[0px] flex float-left px-[100px]'>
            <a
              target='_blank'
              href={downloadLink?.SpecPDFFileName}
              className=''
              rel='noreferrer'
            >
              {TECHNICAL_INFORMATION_FILES_NAMES[locale].SpecPDFFileName}
            </a>
          </li>
        )}
        {downloadLink?.HomeguideWithSPPDF && (
          <li className='pl-[0px]  flex float-left px-[100px]'>
            <a
              target='_blank'
              href={downloadLink?.HomeguideWithSPPDF}
              className=''
              rel='noreferrer'
            >
              {TECHNICAL_INFORMATION_FILES_NAMES[locale].HomeownersGuide}
            </a>
          </li>
        )}
        {downloadLink?.HomeguideWithoutSPPDF && (
          <li className='pl-[0px]  flex float-left px-[100px]'>
            <a
              target='_blank'
              href={downloadLink?.HomeguideWithoutSPPDF}
              className=''
              rel='noreferrer'
            >
              {TECHNICAL_INFORMATION_FILES_NAMES[locale].HomeguideWithoutSPPDF}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SpecItems;
