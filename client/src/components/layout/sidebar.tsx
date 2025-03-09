'use client';

import { BotIcon, CircleArrowOutDownLeftIcon, CircleDollarSignIcon, DollarSign, DollarSignIcon, GitGraphIcon, LogOut, LogsIcon, ParkingMeterIcon, PlayCircleIcon, SettingsIcon, TvIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationItem {
  name: string;
  href: string;
  icon: JSX.Element;
  badge?: string;
}

const navigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    name: 'Financial Advisor',
    href: '/dashboard/advisor',
    icon: <BotIcon />,
  },
  {
    name: 'Personal Assitant',
    href: '/dashboard/personal-assistant',
    icon: <BotIcon />,
  },
  {
    name: 'Stock Analysis',
    href: '/dashboard/stock-analyzer',
    icon: <ParkingMeterIcon />,
  },
  {
    name: 'Loan Status And Credit Score',
    href: '/dashboard/loanstatus',
    icon: <SettingsIcon/>,
  },
  {
    name: 'Fraud Detection',
    href: '/dashboard/frauddetection',
    icon: <SettingsIcon/>,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: <SettingsIcon/>,
  },
];

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col h-screen bg-[#0f1729] text-white">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center h-16 flex-shrink-0 px-4">
          <span className="ml-2 text-xl font-semibold">I ❤️ Finance</span>
        </div>
        <nav className="flex-1 px-4 pb-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                pathname === item.href ? 'bg-white text-[#0f1729] font-medium' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
              {item.badge && <span className="ml-auto bg-gray-700 text-xs px-2 py-0.5 rounded-md">{item.badge}</span>}
            </Link>
          ))}
        </nav>
        <div className="px-4 pb-8">
          <button className="flex items-center px-4 py-3 text-sm text-gray-300 rounded-lg hover:bg-gray-700 w-full">
            <LogOut />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Icon components for better readability and reusability
function DashboardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
