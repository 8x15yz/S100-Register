import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CHECK_AUTH } from '../api';
import { useNavigate } from 'react-router-dom';
import { getOwnRegistries } from './GetRegistery';
import {SIGN_IN, ACCESS, CREATE_REGI, ENTER_REGI} from '../../Common/PageLinks';

function MyMain() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [ownRegistries, setOwnRegistries] = useState([]);
    const [guestRegistries, setGuestRegistries] = useState([]);

    const handleCreateRegi = () => {navigate(CREATE_REGI)};

    useEffect(() => {
        sessionStorage.removeItem('USER_SERIAL');
        const token = localStorage.getItem('jwt');

        if (token) {
            // 사용자 정보를 가져오기 위해 API 요청 보내기
            axios.get(CHECK_AUTH, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setUserInfo(response.data.user);
            })
            .catch(error => {
                if (error.response) {
                    setError(error.response.data.error);
                    if (error.response.status === 401) {
                        navigate(SIGN_IN);
                    }
                } else {
                    setError(error.message);
                }
            });
        } else {
            setError('No token found');
            navigate(SIGN_IN); // 토큰이 없을 경우 로그인 페이지로 리디렉션
        }

        const fetchData = async () => {
            try {
                const result = await getOwnRegistries("owner");
                setOwnRegistries(result);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, [navigate]);

    const connectToRegistry = (e, registry) => {
        // sessionStorage.setItem('REGISTRY_URI', registry.uniformResourceIdentifier);
        sessionStorage.setItem('REGISTRY_NAME', registry.name);
        console.log(registry);
        navigate(ENTER_REGI(registry.uniformResourceIdentifier));
    };
    
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='p-5'>
                <div style={{ backgroundColor: '#F8F8F8', width: '70vw'}} className='p-3'>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} className='mb-3'>
                        <div style={{display: 'flex'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.75rem" height="1.5rem" viewBox="0 0 24 24"><path fill="currentColor" d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14z"></path></svg>
                            <h5 style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold'}}>관리자 권한</h5>
                        </div>
                        <button className='btn btn-outline-secondary btn-sm' onClick={handleCreateRegi} style={{ display: 'flex', alignItems: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"></path></svg>
                            <div style={{ marginLeft: '8px' }}>
                                신규 레지스트리 추가
                            </div>
                        </button>
                    </div>
                    {ownRegistries.length === 0 ? (
                        <>
                            <p>아직 등록한 레지스트리가 없습니다.</p>
                            <button className='btn btn-outline-secondary btn-sm' onClick={handleCreateRegi} style={{ display: 'flex', alignItems: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"></path></svg>
                                <div style={{ marginLeft: '8px' }}>
                                    신규 레지스트리 추가
                                </div>
                            </button>
                        </>
                    ) : (
                        <div>
                            {ownRegistries.map((registry) => (
                                <div key={registry._id} onClick={(e) => connectToRegistry(e, registry)}>
                                    <div className='card regi-card mb-4' style={{}}>
                                        <div className="card-body">
                                            <h4>{registry.name}</h4>
                                            <div>개설일 : {registry.dateOfLastChange}</div>
                                            <div>상세 : {registry.contentSummary}</div>
                                            <div style={{color : 'gray'}}>{registry.uniformResourceIdentifier}.registry</div>
                                        </div>
                                    </div>
                                </div>    
                            ))}
                        </div>
                    )}
                </div>
                <div style={{ backgroundColor: '#F8F8F8', width: '70vw'}} className='p-3 mt-4'>
                    <div style={{display: 'flex'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="currentColor" d="M13.753 2c1.158 0 2.111.875 2.234 2h1.763a2.25 2.25 0 0 1 2.245 2.096L20 6.25v13.505a2.25 2.25 0 0 1-2.096 2.244l-.154.006H6.25a2.25 2.25 0 0 1-2.245-2.096L4 19.755V6.25a2.25 2.25 0 0 1 2.096-2.245L6.25 4h1.763a2.247 2.247 0 0 1 2.234-2zm0 4.493h-3.506a2.24 2.24 0 0 1-1.865-.992L6.25 5.5a.75.75 0 0 0-.743.648L5.5 6.25v13.505c0 .38.282.693.648.743l.102.007h11.5a.75.75 0 0 0 .743-.649l.007-.101V6.25a.75.75 0 0 0-.648-.743L17.75 5.5h-2.132a2.24 2.24 0 0 1-1.865.993m.997 7.502c.69 0 1.25.56 1.25 1.25v.5c0 1.846-1.472 2.754-4 2.754s-4-.909-4-2.756v-.498c0-.69.56-1.25 1.25-1.25zm-.25 1.5h-5v.248c0 .827.695 1.256 2.5 1.256s2.5-.428 2.5-1.254zm-2.5-7.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m0 1.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2M13.753 3.5h-3.506a.747.747 0 1 0 0 1.493h3.506a.747.747 0 1 0 0-1.493"></path></svg>
                        <h5 style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold'}}>게스트 권한</h5>
                    </div>
                    {guestRegistries.length === 0 ? (
                        <>
                            <p>아직 초대받은 레지스트리가 없습니다.</p>
                        </>
                    ) : (
                        <div>
                            {guestRegistries.map((registry) => (
                                <div key={registry._id} onClick={(e) => connectToRegistry(e, registry)}>
                                    <div className='card regi-card mb-4' style={{}}>
                                        <div className="card-body">
                                            <h4>{registry.name}</h4>
                                            <div>개설일 : {registry.dateOfLastChange}</div>
                                            <div>상세 : {registry.contentSummary}</div>
                                            <div style={{color : 'gray'}}>{registry.uniformResourceIdentifier}.registry</div>
                                        </div>
                                    </div>
                                </div>    
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyMain;
