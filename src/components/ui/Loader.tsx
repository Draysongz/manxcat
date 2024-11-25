import React, { useState, useEffect } from 'react';

const Loader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                setLoading(false);
            }, 3500); // Simulated loading time of 3 seconds
        };

        // Check if the window has loaded
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        // Clean up event listener
        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    return (!loading ? null : (
        <main className="loader">
            <div className="mb-4">
                <h1 className='font-extrabold text-4xl top-[150px]'>
                    MANX CAT
                </h1>
            </div>
            {/* <div className="spinnerContainer p-5 rounded-full bg-[#EFD0CA] mb-12">
                <div className="spinner"></div>
                <img
                    className="centerImage"
                    src="loader-cat.png"  // Your central image
                    alt="Center"
                />
            </div> */}
        </main>
    ));
};

export default Loader;
