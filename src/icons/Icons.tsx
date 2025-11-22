"use client";

export const PhoneIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.55499 10.3786C8.69268 10.4419 8.84779 10.4563 8.99479 10.4196C9.14178 10.3829 9.27188 10.2972 9.36366 10.1766L9.60032 9.86663C9.72452 9.70103 9.88557 9.56663 10.0707 9.47406C10.2558 9.38149 10.46 9.33329 10.667 9.33329H12.667C13.0206 9.33329 13.3598 9.47377 13.6098 9.72382C13.8598 9.97387 14.0003 10.313 14.0003 10.6666V12.6666C14.0003 13.0202 13.8598 13.3594 13.6098 13.6094C13.3598 13.8595 13.0206 14 12.667 14C9.48439 14 6.43215 12.7357 4.18171 10.4852C1.93127 8.2348 0.666992 5.18256 0.666992 1.99996C0.666992 1.64634 0.807468 1.3072 1.05752 1.05715C1.30756 0.807102 1.6467 0.666626 2.00033 0.666626H4.00033C4.35395 0.666626 4.69309 0.807102 4.94313 1.05715C5.19318 1.3072 5.33366 1.64634 5.33366 1.99996V3.99996C5.33366 4.20695 5.28547 4.4111 5.19289 4.59624C5.10032 4.78138 4.96592 4.94243 4.80033 5.06663L4.48833 5.30063C4.36594 5.39408 4.27967 5.52702 4.24419 5.67686C4.2087 5.8267 4.22618 5.98421 4.29366 6.12263C5.20478 7.9732 6.70327 9.46982 8.55499 10.3786Z"
      stroke="#101C2B"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.33301 1.33337V4.00004"
      stroke="white"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.667 1.33337V4.00004"
      stroke="white"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.6667 2.66663H3.33333C2.59695 2.66663 2 3.26358 2 3.99996V13.3333C2 14.0697 2.59695 14.6666 3.33333 14.6666H12.6667C13.403 14.6666 14 14.0697 14 13.3333V3.99996C14 3.26358 13.403 2.66663 12.6667 2.66663Z"
      stroke="white"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2 6.66663H14"
      stroke="white"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const ChevronIcon = ({ isOpen = false }: { isOpen?: boolean }) => (
  <svg
    width="17"
    height="22"
    viewBox="0 0 17 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.3s",
    }}
  >
    <path
      d="M8.46578 20.6539L7.99467 21.125L8.46578 21.5961L8.93689 21.125L8.46578 20.6539ZM9.13207 0.666341C9.13207 0.298386 8.83379 9.72622e-05 8.46582 8.78424e-05C8.09786 9.72622e-05 7.79957 0.298385 7.79957 0.666341L9.13207 0.666341ZM-0.000325742 13.13L7.99467 21.125L8.93689 20.1828L0.941894 12.1878L-0.000325742 13.13ZM8.93689 21.125L16.9319 13.13L15.9897 12.1877L7.99467 20.1828L8.93689 21.125ZM9.13212 20.6539L9.13207 0.666341L7.79957 0.666341L7.79954 20.6538L9.13212 20.6539Z"
      fill="#303535"
    />
  </svg>
);

export const ToothIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 2C10 2 8 4 8 6C8 7 8.5 7.5 9 8C9.5 8.5 10 9 10 10C10 11 9.5 11.5 9 12C8.5 12.5 8 13 8 14C8 16 10 18 10 18C10 18 12 16 12 14C12 13 11.5 12.5 11 12C10.5 11.5 10 11 10 10C10 9 10.5 8.5 11 8C11.5 7.5 12 7 12 6C12 4 10 2 10 2Z"
      fill="currentColor"
    />
  </svg>
);

export const ArrowRightIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.33203 6H14.6654M14.6654 6L9.66536 1M14.6654 6L9.66536 11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LocationIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71404 8.61929 10.8333 10 10.8333Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 1.66666C7.23858 1.66666 5 3.90524 5 6.66666C5 11.25 10 18.3333 10 18.3333C10 18.3333 15 11.25 15 6.66666C15 3.90524 12.7614 1.66666 10 1.66666Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowLeftIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.668 6H1.33464M1.33464 6L6.33464 1M1.33464 6L6.33464 11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const NumberIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.832 16.568C14.0385 16.6628 14.2712 16.6845 14.4917 16.6294C14.7122 16.5744 14.9073 16.4458 15.045 16.265L15.4 15.8C15.5863 15.5516 15.8279 15.35 16.1056 15.2111C16.3833 15.0723 16.6895 15 17 15H20C20.5304 15 21.0391 15.2107 21.4142 15.5858C21.7893 15.9609 22 16.4696 22 17V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22C15.2261 22 10.6477 20.1036 7.27208 16.7279C3.89642 13.3523 2 8.7739 2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H7C7.53043 2 8.03914 2.21071 8.41421 2.58579C8.78929 2.96086 9 3.46957 9 4V7C9 7.31049 8.92771 7.61672 8.78885 7.89443C8.65 8.17214 8.44839 8.41371 8.2 8.6L7.732 8.951C7.54842 9.09118 7.41902 9.29059 7.36579 9.51535C7.31256 9.74012 7.33878 9.97638 7.44 10.184C8.80668 12.9599 11.0544 15.2048 13.832 16.568Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EmailIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 7L13.009 12.727C12.7039 12.9042 12.3573 12.9976 12.0045 12.9976C11.6517 12.9976 11.3051 12.9042 11 12.727L2 7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Instagram2Icon = ({ className = "" }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_204_536)">
      <path
        d="M14.1666 1.6665H5.83329C3.53211 1.6665 1.66663 3.53198 1.66663 5.83317V14.1665C1.66663 16.4677 3.53211 18.3332 5.83329 18.3332H14.1666C16.4678 18.3332 18.3333 16.4677 18.3333 14.1665V5.83317C18.3333 3.53198 16.4678 1.6665 14.1666 1.6665Z"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3334 9.47476C13.4362 10.1683 13.3178 10.8766 12.9948 11.4989C12.6719 12.1213 12.161 12.6259 11.5347 12.9412C10.9085 13.2564 10.1987 13.3661 9.50653 13.2547C8.81431 13.1433 8.17484 12.8165 7.67907 12.3207C7.1833 11.825 6.85648 11.1855 6.7451 10.4933C6.63371 9.80106 6.74343 9.09134 7.05865 8.46507C7.37386 7.83881 7.87853 7.32788 8.50086 7.00496C9.12319 6.68205 9.8315 6.56359 10.525 6.66643C11.2325 6.77133 11.8874 7.10098 12.3931 7.60669C12.8988 8.11239 13.2285 8.76733 13.3334 9.47476Z"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5834 5.4165H14.5917"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_204_536">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const TelegramIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_204_541)">
      <path
        d="M12.1134 18.0716C12.145 18.1505 12.2001 18.2179 12.2711 18.2646C12.3421 18.3113 12.4258 18.3352 12.5107 18.333C12.5957 18.3308 12.678 18.3027 12.7466 18.2524C12.8151 18.2021 12.8666 18.1321 12.8942 18.0516L18.3109 2.2183C18.3375 2.14446 18.3426 2.06455 18.3255 1.98793C18.3085 1.9113 18.2699 1.84113 18.2144 1.78561C18.1589 1.7301 18.0887 1.69154 18.0121 1.67446C17.9355 1.65737 17.8555 1.66246 17.7817 1.68913L1.94837 7.1058C1.86795 7.13338 1.7979 7.1849 1.7476 7.25344C1.69731 7.32199 1.66918 7.40428 1.66701 7.48926C1.66483 7.57425 1.6887 7.65787 1.73542 7.7289C1.78214 7.79993 1.84947 7.85497 1.92837 7.88663L8.53671 10.5366C8.74561 10.6203 8.93542 10.7453 9.09468 10.9043C9.25394 11.0633 9.37936 11.2529 9.46337 11.4616L12.1134 18.0716Z"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.2116 1.78906L9.09497 10.9049"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_204_541">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const WhatsappIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.8097 3.16192C11.7615 -3.65154 0.0971649 1.29012 0.0925817 10.9021C0.0925817 12.8234 0.595823 14.697 1.55464 16.3516L0 22L5.80698 20.4857C13.0531 24.3998 21.9959 19.2024 21.9996 10.9076C21.9996 7.99634 20.863 5.25647 18.7959 3.19767L18.8097 3.16192ZM20.1681 10.8774C20.1626 17.8742 12.482 22.2438 6.40738 18.6726L6.07739 18.4764L2.63995 19.3701L3.56119 16.0289L3.34211 15.6852C-0.438159 9.66739 3.90493 1.80253 11.0658 1.80253C13.4986 1.80253 15.782 2.75126 17.5016 4.46998C19.2203 6.17404 20.1681 8.45741 20.1681 10.8774Z"
      fill="currentColor"
    />
    <path
      d="M16.0475 13.116L16.0393 13.1847C14.0236 12.18 13.8127 12.0462 13.5524 12.4367C13.3718 12.7071 12.8457 13.3204 12.6871 13.5019C12.5267 13.6806 12.3672 13.6944 12.0949 13.5706C11.8199 13.4331 10.9372 13.1444 9.89222 12.2094C9.07824 11.4806 8.53192 10.5869 8.37059 10.3119C8.10201 9.84805 8.66391 9.78205 9.1754 8.81405C9.26707 8.62155 9.22032 8.4703 9.15249 8.33371C9.08374 8.19621 8.5365 6.84871 8.30734 6.31155C8.08734 5.77621 7.86093 5.84405 7.69135 5.84405C7.16336 5.79821 6.77745 5.80555 6.43737 6.15938C4.9579 7.78555 5.33097 9.46305 6.59687 11.2469C9.08466 14.5029 10.4101 15.1024 12.8338 15.9347C13.4882 16.1428 14.085 16.1135 14.5571 16.0456C15.0832 15.9622 16.1768 15.3847 16.405 14.7385C16.6388 14.0922 16.6388 13.556 16.57 13.4322C16.5022 13.3085 16.3225 13.2397 16.0475 13.116Z"
      fill="currentColor"
    />
  </svg>
);

export const TimeIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 6V12L16 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
