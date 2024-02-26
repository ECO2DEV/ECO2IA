import download from 'downloadjs';
import { Menu } from '@headlessui/react';
import {  ArrowDownOnSquareIcon } from '@heroicons/react/20/solid';

export const DropdownPoints = ({ imageSrc }) => {
  return (
    <Menu>
      <Menu.Button className="text-[#f5f5f59f] hover:text-gray-900 hover:scale-150 transition duration-150">
        <ArrowDownOnSquareIcon className="h-9 w-h-9 " aria-hidden="true" />
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
                  `renovhome-image-${Date.now()}.jpeg`,
                  `image/jpeg`
                )
              }
            >
              Download JPEG
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
                  `renovhome-image-${Date.now()}.png`,
                  `image/png`
                )
              }
            >
              Download PNG
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
