import React, { useEffect } from 'react';
import Header from "./include/Header";
import Sidebar from "./include/Sidebar";
import Footer from "./include/Footer";
import { useLocation } from 'react-router-dom';


function Dashboard({ children }) {
    const location = useLocation();

    useEffect(() => {
        const links = [
            `/assets/admin/css/bootstrap.min.css`,
        ];

        const scripts = [
           
        ];

        // Function to create and append link elements
        links.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href.replace('%PUBLIC_URL%', process.env.PUBLIC_URL);
            link.type = 'text/css';
            link.id = 'bootstrap-style';
            document.head.appendChild(link);
        });

        // Function to create and append script elements
        scripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src.replace('%PUBLIC_URL%', process.env.PUBLIC_URL);
            script.defer = true;
            document.body.appendChild(script);
        });

        // Cleanup function to remove all added link and script elements
        return () => {
            links.forEach(href => {
                try {
                    const link = document.querySelector(`link[href="${href.replace('%PUBLIC_URL%', process.env.PUBLIC_URL)}"]`);
                    if (link && link.parentNode) {
                        link.parentNode.removeChild(link);
                    }
                } catch (error) {
                    console.error(`Failed to remove link: ${href}`, error);
                }
            });
            scripts.forEach(src => {
                try {
                    const script = document.querySelector(`script[src="${src.replace('%PUBLIC_URL%', process.env.PUBLIC_URL)}"]`);
                    if (script && script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                } catch (error) {
                    console.error(`Failed to remove script: ${src}`, error);
                }
            });
        };
    }, [location.pathname]);
    return (
        <div id='layout-wrapper'>
            <Header />
            <Sidebar />
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;
