import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BROWSING_REGISTRIES } from '../../S100_Registry/Concept/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // js-cookie 라이브러리 임포트
import { ENTER_REGI } from '../../Common/PageLinks';

const Browsing = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async () => {
        try {
            const response = await axios.get(BROWSING_REGISTRIES, {
                params: {
                    search_term: searchTerm,
                    page: page,
                    page_size: pageSize,
                }
            });
            setResults(response.data.results);
            setTotalItems(response.data.total_items);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [page, pageSize]);

    const connectToRegistry = (e, registry) => {
        Cookies.set('REGISTRY_NAME', registry.name, { expires: 7 }); // REGISTRY_NAME을 쿠키에 저장
        navigate(ENTER_REGI(registry.uniformResourceIdentifier));
    };

    const handleSearch = () => {
        setPage(1); // 검색 시 페이지를 1로 초기화
        fetchData();
    };

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setPage(1); // 페이지 크기 변경 시 페이지를 1로 초기화
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '50px' }}>
                <div style={{ display: 'flex', width: '100%', maxWidth: '600px', borderRadius: '15px', border: '1px solid #dfe1e5', padding: '10px 20px', backgroundColor: '#fff' }}>
                    <input
                        type="text"
                        placeholder="레지스트리 이름 검색 ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '16px' }}
                    />
                    <button className='btn btn-outline-secondary' onClick={handleSearch}>Search</button>
                </div>
            </div>

            <div className='p-5'>
                <div>{totalItems} results found</div>
                <div>
                    {results.map((registry) => (
                        <div key={registry._id} onClick={(e) => connectToRegistry(e, registry)}>
                            <div className='card regi-card mb-4'>
                                <div className="card-body">
                                    <h4>{registry.name}</h4>
                                    <div>Last updated : {registry.dateOfLastChange}</div>
                                    <div>Description : {registry.contentSummary}</div>
                                    <div style={{color : 'gray'}}>http://bluemap.kr:21804/{registry.uniformResourceIdentifier}</div>
                                </div>
                            </div>
                        </div>    
                    ))}
                </div>
            </div>
            <div className='p-5' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <select className='form-select form-select-sm' value={pageSize} onChange={handlePageSizeChange}>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <label style={{ marginLeft: '10px' }}>rows per page</label>
                </div>
                <nav aria-label="Page navigation" style={{ display: 'flex', justifyContent: 'center' }}>
                    <ul className="pagination">
                        <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(page - 1)} disabled={page <= 1}>
                                Previous
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, i) => (
                            <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => setPage(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            
        </>
    );
};

export default Browsing;
