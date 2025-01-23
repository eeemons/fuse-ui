import { ReactNode } from 'react';


interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;

}

export const Button = ({children, onClick, className}: ButtonProps) => {
    return (
        <button className={`bg-red-600 ${className}`} onClick={onClick}>{children}</button>
    );
};