import React from 'react'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Navbar,
    Typography,
    IconButton,
    Button,
    Input,
    Avatar
  } from "@material-tailwind/react";
//   import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
  import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
  import { Dropdown } from "flowbite-react";
  
 import {BellIcon} from '../assets/icons'
  
  function ClockIcon() {
    return (
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.99998 14.9C9.69736 14.9 11.3252 14.2257 12.5255 13.0255C13.7257 11.8252 14.4 10.1974 14.4 8.49998C14.4 6.80259 13.7257 5.17472 12.5255 3.97449C11.3252 2.77426 9.69736 2.09998 7.99998 2.09998C6.30259 2.09998 4.67472 2.77426 3.47449 3.97449C2.27426 5.17472 1.59998 6.80259 1.59998 8.49998C1.59998 10.1974 2.27426 11.8252 3.47449 13.0255C4.67472 14.2257 6.30259 14.9 7.99998 14.9ZM8.79998 5.29998C8.79998 5.0878 8.71569 4.88432 8.56566 4.73429C8.41563 4.58426 8.21215 4.49998 7.99998 4.49998C7.7878 4.49998 7.58432 4.58426 7.43429 4.73429C7.28426 4.88432 7.19998 5.0878 7.19998 5.29998V8.49998C7.20002 8.71213 7.28434 8.91558 7.43438 9.06558L9.69678 11.3288C9.7711 11.4031 9.85934 11.4621 9.95646 11.5023C10.0536 11.5425 10.1577 11.5632 10.2628 11.5632C10.3679 11.5632 10.472 11.5425 10.5691 11.5023C10.6662 11.4621 10.7544 11.4031 10.8288 11.3288C10.9031 11.2544 10.9621 11.1662 11.0023 11.0691C11.0425 10.972 11.0632 10.8679 11.0632 10.7628C11.0632 10.6577 11.0425 10.5536 11.0023 10.4565C10.9621 10.3593 10.9031 10.2711 10.8288 10.1968L8.79998 8.16878V5.29998Z"
          fill="#90A4AE"
        />
      </svg>
    );
  }

  const NavBar = () => {
  return (
    <>
        <div className="p-4  h-[60px] border-b flex">
            <div className="flex flex-grow items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="flex-shrink-0">
                    Navbar
                </Typography>
                <div className="ml-auto flex items-center gap-1 md:mr-4">
                    
                </div>
                <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <form className="flex-1 max-w-[300px]">
                            <div className="relative">
                            <Input className='w-60' icon={<MagnifyingGlassIcon className="h-6 w-6" />} label="Search" />
                            </div>
                        </form>
                        <button variant="ghost" size="icon" className="rounded-full relative">
                            <BellIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                            3
                            </span>
                        </button>
                    </div>
                </div>

        
                <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar className="h-6 w-6 border border-gray-900 p-0.5" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"/>
                }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">KALISA Kelly</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item>Update Profile</Dropdown.Item>
                    <Dropdown.Item>View medical report</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Log out</Dropdown.Item>
                </Dropdown>
                <div className="relative flex w-full gap-2 md:w-max">
                </div>
            </div>
        </div>
    </>
  )
}

export default NavBar