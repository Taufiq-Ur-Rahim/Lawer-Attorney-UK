import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import PageTitle from './include/PageTitle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../Utils/Axios';
import { toast } from 'react-toastify';
import { server_ip } from '../../Utils/Data';
import { Store } from '../../Utils/Store';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Attorneys({ title }) {
    const { state } = useContext(Store);
    const { UserInfo } = state;
    const navigate = useNavigate();
    const [attorneys, setAttorneys] = useState([]);
    const [filteredAttorneys, setFilteredAttorneys] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = useQuery();
    const searchTerm = query.get("search") || "";

    // Check authentication on component mount
    useEffect(() => {
        const checkAuth = () => {
            const userFromStorage = localStorage.getItem("UserInfo");
            if (!userFromStorage) {
                toast.error("Please login to view attorneys");
                navigate('/login');
                return false;
            }
            return true;
        };

        if (!checkAuth()) return;
        get_all_attorneys();
    }, [navigate]);

    const get_all_attorneys = async () => {
        try {
            const { data } = await api.get(`/lawyer/get_all_attorney`);
            if (Array.isArray(data)) {
                setAttorneys(data);
                filterAttorneys(data, searchTerm);
            } else {
                toast.error('Unexpected response format');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to fetch attorneys');
        } finally {
            setLoading(false);
        }
    };

    const filterAttorneys = (attorneys, searchTerm) => {
        const filtered = attorneys.filter((attorney) => {
            const lowercaseFilter = searchTerm.toLowerCase();
            const fullName = `${attorney.firstName} ${attorney.lastName}`.toLowerCase();
            const practiceArea = (attorney.practiceArea || "").toLowerCase();
            const expertise = (attorney.expertise || "").toLowerCase();
            const address = (attorney.address || "").toLowerCase();

            return (
                fullName.includes(lowercaseFilter) ||
                practiceArea.includes(lowercaseFilter) ||
                expertise.includes(lowercaseFilter) ||
                address.includes(lowercaseFilter)
            );
        });

        setFilteredAttorneys(filtered);
    };

    useEffect(() => {
        filterAttorneys(attorneys, searchTerm);
    }, [searchTerm, attorneys]);

    // Don't render if not authenticated
    if (!localStorage.getItem("UserInfo")) {
        return <div>Redirecting to login...</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Helmet><title>{title}</title></Helmet>
            <PageTitle title={title} showSearchBar={true} />
            <div className="parallax-section">
                <div className="container">
                    <div className="row">
                        {filteredAttorneys.length > 0 ? (
                            filteredAttorneys.map((attorney) => (
                                <div className="col-md-3 col-sm-6" key={attorney._id}>
                                    <Link to={`/attorney-details?data=${encodeURIComponent(JSON.stringify(attorney))}`}>
                                        <div className="team-thumb">
                                            <div className="thumb-image">
                                                {attorney.image ?
                                                    <img src={`${server_ip}/${attorney.image}`} className="img-fluid lawimg" alt="" />
                                                    :
                                                    <img src={`/assets/website/images/avatar-1.jpg`} className="img-fluid lawimg" alt="" />
                                                }
                                            </div>
                                            <h4>{attorney.firstName} {attorney.lastName}</h4>
                                            <h5>Attorney</h5>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <p className='text-danger text-center'>No Attorneys Found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style>{`
                .thumb-image {
                    width: 100%;
                    height: 300px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f8f9fa;  
                    aspect-ratio: 1 / 2;  
                }

                .thumb-image img {
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                    aspect-ratio: 1 / 2;  
                }
            `}</style>
        </>
    );
}

export default Attorneys;
