import React, { useState } from 'react';
import { Package } from 'lucide-react';

const Image = ({ source, width = 'w-10', height = 'h-10', className = '' }) => {
    const [hasError, setHasError] = useState(false);

    if (!source || hasError) {
        return (
            <div className={`w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 ${className}`}>
                <Package className="w-5 h-5" />
            </div>
        );
    }

    return (
        <img
            src={source}
            alt="Product"
            onError={() => setHasError(true)}
            className={`w-10 h-10 rounded-lg object-cover border border-gray-200 shadow-xs bg-white ${className}`}
        />
    );
};

export default Image;