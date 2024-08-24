import React from 'react';

const Card = ({ imageSrc, onEdit, onDelete }) => {
    return (
        <div className="relative max-w-2xl rounded-lg overflow-hidden shadow-lg bg-white">
            <img 
                src={imageSrc} 
                alt="Media" 
                className="w-[810px] h-[450px] object-cover" 
            />
            <div className="absolute top-2 right-2 flex space-x-2">
                {/* Edit Button */}
                <button className="p-2 bg-white rounded-full shadow-md" onClick={onEdit}>
                    <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                </button>

                {/* Delete Button */}
                <button className="p-2 bg-white rounded-full shadow-md" onClick={onDelete}>
                    <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Card;
