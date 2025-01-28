import { FC, ReactNode, useState } from "react";

interface SidebarLinkItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
  isExternal?: boolean;
}

interface SidebarComponentProps {
  children?: ReactNode;
  defaultOpen?: boolean;
  position?: "left" | "right";
  width?: string;
  className?: string;
  toggleIcon?: ReactNode;
  links?: SidebarLinkItem[];
  header?: {
    title?: string;
    subtitle?: string;
  };
  darkMode?: boolean;
  iconSize?: "small" | "medium" | "large";
  showCloseButton?: boolean;
  onStateChange?: (isOpen: boolean) => void;
}

const HamburgerIcon: FC<{ darkMode?: boolean; size?: SidebarComponentProps["iconSize"] }> = ({ darkMode, size = "small" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6"
  };

  return (
    <svg
      className={`${sizeClasses[size]} ${darkMode ? "text-gray-200" : "text-gray-700"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

const CloseIcon: FC<{ darkMode?: boolean; size?: SidebarComponentProps["iconSize"] }> = ({ darkMode, size = "small" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6"
  };

  return (
    <svg
      className={`${sizeClasses[size]} ${darkMode ? "text-gray-200" : "text-gray-700"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

const Sidebar = ({
  children,
  defaultOpen = false,
  position = "left",
  width = "w-64",
  className = "",
  toggleIcon,
  links = [],
  header,
  darkMode = false,
  iconSize = "small",
  showCloseButton = true,
  onStateChange,
}: SidebarComponentProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onStateChange?.(newState);
  };

  const handleClose = () => {
    setIsOpen(false);
    onStateChange?.(false);
  };

  const handleLinkClick = (link: SidebarLinkItem) => {
    if (link.onClick) {
      link.onClick();
    }
    if (!link.isExternal) {
      handleClose();
    }
  };

  return (
    <div className="relative">
      {/* Toggle Button - Always visible */}
      <button
        onClick={handleToggle}
        className={`
          fixed top-4 ${position === "left" ? "left-4" : "right-4"}
          z-50 ${iconSize === "small" ? "p-2" : iconSize === "medium" ? "p-2.5" : "p-3"} 
          rounded-lg shadow-lg transition-all duration-200 ease-in-out
          ${darkMode 
            ? "bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-200" 
            : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"}
          border
          ${isOpen ? "ring-2 ring-blue-500" : ""}
        `}
        aria-label="Toggle Sidebar"
        title="Toggle Sidebar"
      >
        {toggleIcon || <HamburgerIcon darkMode={darkMode} size={iconSize} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 bottom-0
          ${position === "left" ? "left-0" : "right-0"}
          ${width}
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen 
            ? "translate-x-0" 
            : position === "left"
              ? "-translate-x-full"
              : "translate-x-full"
          }
          flex flex-col shadow-xl
          ${darkMode 
            ? "bg-gray-800 text-gray-100 border-gray-700" 
            : "bg-white text-gray-900 border-gray-200"}
          ${className}
        `}
      >
        {/* Main content container */}
        <div className="flex-1 overflow-y-auto">
          {/* Header with Title and Close Button */}
          <div className="relative">
            {showCloseButton && (
              <button
                onClick={handleClose}
                className={`
                  absolute top-2 right-2 z-10
                  p-1.5 rounded-lg transition-colors
                  ${darkMode
                    ? "hover:bg-gray-700 text-gray-200"
                    : "hover:bg-gray-100 text-gray-700"}
                `}
                aria-label="Close Sidebar"
                title="Close Sidebar"
              >
                <CloseIcon darkMode={darkMode} size={iconSize} />
              </button>
            )}
            
            {/* Header Content */}
            {header && (
              <div className={`px-4 pt-3 ${header.subtitle ? "pb-2" : "pb-1"} mr-10`}>
                {header.title && (
                  <h2 className="text-lg font-semibold">{header.title}</h2>
                )}
                {header.subtitle && (
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {header.subtitle}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Links Section */}
          {links.length > 0 && (
            <nav className="px-2 py-1">
              <div className="pr-8">
                <ul className="space-y-1">
                  {links.map((link, index) => (
                    <li key={index}>
                      {link.href ? (
                        <a
                          href={link.href}
                          target={link.isExternal ? "_blank" : undefined}
                          rel={link.isExternal ? "noopener noreferrer" : undefined}
                          onClick={() => handleLinkClick(link)}
                          className={`
                            flex items-center px-3 py-2 rounded-lg transition-colors
                            ${darkMode
                              ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}
                          `}
                        >
                          {link.icon && (
                            <span className="mr-3">{link.icon}</span>
                          )}
                          <span>{link.label}</span>
                          {link.isExternal && (
                            <svg
                              className={`ml-2 w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          )}
                        </a>
                      ) : (
                        <button
                          onClick={() => handleLinkClick(link)}
                          className={`
                            w-full flex items-center px-3 py-2 rounded-lg transition-colors
                            ${darkMode
                              ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}
                          `}
                        >
                          {link.icon && (
                            <span className="mr-3">{link.icon}</span>
                          )}
                          <span>{link.label}</span>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}

          {/* Children Content */}
          {children && (
            <div className={`px-4 py-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {children}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export { Sidebar };
export type { SidebarComponentProps as SidebarProps, SidebarLinkItem as SidebarLink };
