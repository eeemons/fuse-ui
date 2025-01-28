import {
  ReactNode,
  createContext,
  useContext,
  useState,
  cloneElement,
  isValidElement,
  Children,
} from "react";

type AccordionContextType = {
  activeIndex: string | null;
  setActiveIndex: (index: string | null) => void;
};

const AccordionContext = createContext<AccordionContextType>({
  activeIndex: null,
  setActiveIndex: () => null,
});

type AccordionProps = {
  children: ReactNode;
  className?: string;
  defaultIndex?: string;
};

type AccordionItemProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  id: string;
};

type AccordionTriggerProps = {
  children: ReactNode;
  className?: string;
  id: string;
  disabled?: boolean;
};

type AccordionContentProps = {
  children: ReactNode;
  className?: string;
  id: string;
};

export const Accordion = ({
  children,
  className = "",
  defaultIndex,
}: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<string | null>(
    defaultIndex ?? null
  );

  return (
    <AccordionContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className={`w-full ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({
  children,
  className = "",
  disabled = false,
  id,
}: AccordionItemProps) => {
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            disabled,
            id,
          } as React.ComponentProps<typeof AccordionTrigger>);
        }
        return child;
      })}
    </div>
  );
};

export const AccordionTrigger = ({
  children,
  className = "",
  disabled = false,
  id,
}: AccordionTriggerProps) => {
  const { activeIndex, setActiveIndex } = useContext(AccordionContext);
  const isActive = activeIndex === id;

  const handleClick = () => {
    if (!disabled) {
      setActiveIndex(isActive ? null : id);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex w-full items-center justify-between p-4 text-left text-sm font-medium ${
        disabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-50"
      } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
      aria-expanded={isActive}
      disabled={disabled}
      id={`trigger-${id}`}
    >
      {children}
      <svg
        className={`h-5 w-5 transform text-gray-500 transition-transform duration-200 ${
          isActive ? "rotate-180" : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
};

export const AccordionContent = ({
  children,
  className = "",
  id,
}: AccordionContentProps) => {
  const { activeIndex } = useContext(AccordionContext);
  const isActive = activeIndex === id;

  return (
    <div
      id={`content-${id}`}
      className={`overflow-hidden transition-all duration-200 ${
        isActive ? "max-h-96" : "max-h-0"
      } ${className}`}
      role="region"
      aria-labelledby={`trigger-${id}`}
    >
      <div className="p-4">{children}</div>
    </div>
  );
};
