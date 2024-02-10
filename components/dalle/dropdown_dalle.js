import download from 'downloadjs';
import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { DataEco2Image } from '../../data/eco2image';
export const DropdownDalle = ({ imageSrc }) => {
  return (
    <Menu>
      <Menu.Button className="text-gray-600 hover:text-gray-900 hover:scale-150 transition duration-150">
        <EllipsisVerticalIcon className="h-10 w-10" aria-hidden="true" />
      </Menu.Button>
      <Menu.Items className="absolute left-0 z-50 w-48 py-2 mt-2 bg-white rounded-md shadow-lg focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${
                active ? 'bg-gray-100' : ''
              } block px-4 py-2 text-sm text-gray-700`}
              href="#"
              onClick={() =>
                download(
                  `data:image/jpeg;base64,${imageSrc}`,
                  `dalle-image-${Date.now()}.jpeg`,
                  `image/jpeg`
                )
              }
            >
              {DataEco2Image.Download}
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${
                active ? 'bg-gray-100' : ''
              } block px-4 py-2 text-sm text-gray-700`}
              href="#"
              onClick={() =>
                download(
                  `data:image/jpeg;base64,${imageSrc}`,
                  `dalle-image-${Date.now()}.png`,
                  `image/png`
                )
              }
            >
              {DataEco2Image.DownloadPNG}
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
