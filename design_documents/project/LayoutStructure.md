# Layout Structure

## Overview

The layout system provides a consistent structure across the application with reusable layout components, header navigation, and authentication integration.

## Layout Architecture

```
FullLayout (Main Layout Container)
├── Header Component (Sticky Navigation)
│   ├── Logo & App Title
│   ├── Profile Menu
│   │   ├── User Avatar
│   │   ├── Menu Items
│   │   └── Logout Action
└── Outlet (Page Content)
```

## Core Layout Component

### FullLayout Component (`Layout/full-layout.tsx`)

```typescript
import { Outlet } from "react-router-dom";
import { Header } from "@/design-system-components/Header";
import { RiQuestionnaireLine, RiSettings5Line, RiUserLine } from "@remixicon/react";
import { msalInstance } from "@/main";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store-hook";
import { adminPermissionCheck } from "@/store/slices/userGroup.slice";
import { acquireUserName } from "@/auth-config";
import type { RootState } from "@/store";

const FullLayout = () => {
  const [userName, setUserName] = useState("");
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector((state: RootState) => state.userGroup.isAdmin);

  useEffect(() => {
    // Check admin permissions
    dispatch(adminPermissionCheck());

    // Fetch user name from token
    const fetchUserName = async () => {
      try {
        const name = await acquireUserName();
        setUserName(name || "");
      } catch (err) {
        console.error("Failed to acquire user name", err);
      }
    };

    fetchUserName();
  }, [dispatch]);

  // Define menu items
  const menuList = [
    {
      id: 1,
      name: "My Profile",
      path: import.meta.env.VITE_APP_EDIT_PROFILE_PATH,
      icon: <RiUserLine className="mr-3 text-[#797F9D]" size={18} />,
      newTab: true,
    },
    {
      id: 2,
      name: "Settings",
      path: "/settings",
      icon: <RiSettings5Line className="mr-3 text-[#797F9D]" size={18} />,
      newTab: false,
    },
    {
      id: 3,
      name: "FAQ",
      path: "/",
      icon: <RiQuestionnaireLine className="mr-3 text-[#797F9D]" size={18} />,
      newTab: false,
    },
  ];

  // Filter menu items based on permissions
  const filteredMenuList = menuList.filter(
    (item) => item.name !== "Settings" || isAdmin,
  );

  // Logout handler
  const handleLogout = async () => {
    try {
      const currentAccount = msalInstance.getActiveAccount();
      if (currentAccount) {
        await msalInstance.logoutRedirect({
          account: currentAccount,
          postLogoutRedirectUri: import.meta.env.VITE_APP_PATH,
        });
      } else {
        console.error("No active account found for logout.");
      }
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen h-full">
      <div className="w-full h-full sticky top-0 border-b z-20">
        <Header
          name={userName}
          headerName="Supplier Non Conformance"
          menuList={filteredMenuList}
          onLogout={handleLogout}
        />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default FullLayout;
```

## Header Component

### Header Structure (`design-system-components/Header/index.tsx`)

```typescript
import { useNavigate } from "react-router-dom";
import { PopoverArrow } from "@radix-ui/react-popover";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/egc-logo.svg";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { RiLogoutCircleRLine } from "@remixicon/react";

// Profile Avatar Component
export const Profile = ({ name }: { name: string }) => {
  return (
    <div className="flex relative items-center gap-2 cursor-pointer">
      <span className="flex items-center justify-center rounded-full h-10 w-10 bg-headernotification-background text-[#052760] p-2">
        <p className="text-sm font-semibold">
          {name &&
            (() => {
              const nameParts = name.split(" ");
              if (nameParts.length >= 2) {
                const firstNameInitial = nameParts[0][0];
                const lastNameInitial = nameParts[nameParts.length - 1][0];
                return `${firstNameInitial}${lastNameInitial}`.toLocaleUpperCase();
              } else if (nameParts.length === 1) {
                return nameParts[0][0].toLocaleUpperCase();
              }
              return "";
            })()}
        </p>
      </span>
      <p className="text-[#052760] text-sm font-medium">{name}</p>
    </div>
  );
};

// Type Definitions
type ListItemsType = {
  id: number;
  name: string;
  icon: React.ReactNode;
  path: string;
  newTab?: boolean;
};

interface ProfileMenuProps {
  menuList: ListItemsType[];
  onLogout: () => void;
}

// Profile Menu Component
const ProfileMenu: React.FC<ProfileMenuProps> = ({ menuList, onLogout }) => {
  return (
    <div>
      <div className="min-w-0 text-sm">
        {menuList?.map((listItem) =>
          listItem.newTab ? (
            <a
              key={listItem.id}
              href={listItem.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center cursor-pointer bg-white hover:bg-gray-100 p-2 border-b-2 text-[#797F9D]"
            >
              {listItem.icon}
              {listItem.name}
            </a>
          ) : (
            <NavLink
              key={listItem.id}
              to={listItem.path}
              className="flex items-center cursor-pointer bg-white hover:bg-gray-100 p-2 border-b-2 text-[#797F9D]"
            >
              {listItem.icon}
              {listItem.name}
            </NavLink>
          )
        )}
        <div
          className="flex items-center cursor-pointer bg-white hover:bg-gray-100 p-2 text-red-600"
          onClick={onLogout}
        >
          <RiLogoutCircleRLine color="red" className="mr-3" size={18} />
          Sign Out
        </div>
      </div>
    </div>
  );
};

// Header Props Interface
export interface HeaderProps {
  name: string;
  headerName?: string;
  menuList: ListItemsType[];
  onLogout: () => void;
  className?: string;
}

// Main Header Component
export const Header: React.FC<HeaderProps> = ({
  name,
  headerName,
  menuList,
  onLogout,
  className,
}) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className={`flex justify-between bg-white h-16 px-4 ${className}`}>
      {/* Left Section - Logo & Title */}
      <div className="flex justify-start items-center">
        <div>
          <img
            src={logo}
            alt="EGC"
            onClick={handleHome}
            className="cursor-pointer"
          />
        </div>
        <div className="px-2">
          <h1 className="text-heading font-inter font-semibold text-xl">
            {headerName}
          </h1>
        </div>
      </div>

      {/* Right Section - Profile Menu */}
      <div className="flex items-center w-auto gap-4">
        <Popover>
          <PopoverTrigger>
            <Profile name={name} />
          </PopoverTrigger>
          <PopoverContent align="end" alignOffset={-20} className="w-40 p-0">
            <div className="text-gray-200">
              <PopoverArrow fill="CurrentColor" width={10} height={8} />
            </div>
            <ProfileMenu menuList={menuList} onLogout={onLogout} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
```

## Layout Features

### 1. Sticky Header

- Fixed at top of viewport
- Maintains visibility during scroll
- Z-index layering for proper stacking

### 2. User Profile Display

- Automatic initials generation
- Handles single and full names
- Avatar with consistent styling

### 3. Dynamic Menu System

- Role-based menu filtering
- External and internal links
- Active link highlighting
- Icon support

### 4. Responsive Design

- Flexbox layout
- Mobile-friendly navigation
- Adaptive spacing

## Layout Styling

### Container Styles

```typescript
className = "flex flex-col min-h-screen h-full";
```

### Header Styles

```typescript
className = "w-full h-full sticky top-0 border-b z-20";
```

### Header Component Styles

```typescript
className = "flex justify-between bg-white h-16 px-4";
```

## Usage in Routes

```typescript
import FullLayout from "./Layout/full-layout";
import { SupplierNonConformancePage } from "./pages/SupplierNonConformance";

const routes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      {
        path: "/",
        element: <SupplierNonConformancePage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
];
```

## Key Principles

### 1. Separation of Concerns

- Layout logic separate from page content
- Reusable header component
- Centralized authentication handling

### 2. Composition

- Uses React Router's `<Outlet />` for child routes
- Composable menu items
- Modular components

### 3. State Management

- Redux for permissions
- Local state for UI interactions
- Session storage for user data

### 4. Performance

- Minimal re-renders
- Memoized components where needed
- Efficient event handlers

## Customization Options

### Change App Title

```typescript
<Header
  name={userName}
  headerName="Your App Name"
  menuList={filteredMenuList}
  onLogout={handleLogout}
/>
```

### Add Menu Items

```typescript
const menuList = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    icon: <RiDashboardLine className="mr-3" size={18} />,
    newTab: false,
  },
  // Add more items...
];
```

### Conditional Menu Items

```typescript
const filteredMenuList = menuList.filter((item) => {
  if (item.name === "Admin Panel" && !isAdmin) return false;
  if (item.name === "Settings" && !hasSettingsAccess) return false;
  return true;
});
```

## Best Practices

1. **Keep layout logic minimal** - Focus on structure, not business logic
2. **Use semantic HTML** - Proper heading hierarchy
3. **Maintain accessibility** - ARIA labels and keyboard navigation
4. **Responsive design** - Mobile-first approach
5. **Consistent spacing** - Use Tailwind utilities
6. **Performance** - Lazy load heavy components
7. **Error boundaries** - Wrap layout in error boundary
