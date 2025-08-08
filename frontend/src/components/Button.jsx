import React from 'react';

export default function Button({ children, ...props }) {
    return (
        <button
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            {...props}
        >
            {children}
        </button>
    );
}
