import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function PageTitle({ title, showSearchBar }) {
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (filter.trim() !== "") {
            navigate(`/attorneys?search=${encodeURIComponent(filter)}`);
        }
    };

    return (
        <>
            <div className="pageTitle" style={styles.pageTitle}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 col-sm-6">
                            <h1 className="page-heading" style={styles.pageHeading}>{title}</h1>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="breadCrumb" style={styles.breadCrumb}>
                                <Link to="/">Home</Link> / <span>{title}</span>
                            </div>
                        </div>
                    </div>
                    {showSearchBar && (
                        <div className="row justify-content-center mt-3">
                            <div className="col-md-12">
                                <div className="search-bar" style={styles.searchBar}>
                                    <form
                                        className="form-inline ml-auto"
                                        method="POST"
                                        onSubmit={handleSubmit}
                                        style={styles.form}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="form-control"
                                            style={styles.searchInput}
                                            value={filter}
                                            onChange={(e) => setFilter(e.target.value)}
                                        />
                                        <button type="submit" className="btn" style={styles.searchButton}>
                                            <FaSearch />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

const styles = {
    pageTitle: {
        padding: '20px 0',
        backgroundColor: '#f8f9fa',
    },
    pageHeading: {
        fontSize: '1.5rem',
        marginBottom: '0',
    },
    breadCrumb: {
        fontSize: '1rem',
        color: '#6c757d',
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: '400px',  
        width: '100%',
        margin: '0 auto',
    },
    searchInput: {
        flex: 1,
        padding: '0.5rem 0.75rem',
        border: '1px solid #ced4da',
        borderRadius: '4px 0 0 4px',
        fontSize: '0.875rem',
        outline: 'none',
        marginRight: '-1px',  
    },
    searchButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: '1px solid #dc3545',
        borderRadius: '0 4px 4px 0',
        fontSize: '0.875rem',
        cursor: 'pointer',
        outline: 'none',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',  
    },
};

export default PageTitle;
