import { Icon } from "@iconify/react";
import ProfileInfo from "./ProfileInfo";
import { useState } from "react";

export default function Profile() {
  const [profileFocused, setProfileFocused] = useState(false);

  return (
    <div className='relative'>
      <div
        onClick={(e) => setProfileFocused(!profileFocused)}
        className='hover:cursor-pointer bg-black-400 relative profile w-[50px] h-[50px]  rounded-full'>
        <Icon
          width='100%'
          icon='mdi-account-circle-outline'
          className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
        />
      </div>
      {profileFocused && <ProfileInfo />}
    </div>
  );
}
