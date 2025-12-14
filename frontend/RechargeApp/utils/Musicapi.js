import api from './api';

// 한국 탑 100
export const syncKoreaTop100 = async () => {
  try {
    const res = await api.post('/music/sync/korea');
    return res.data;
  } catch (err) {
    console.log('🇰🇷 한국 TOP100 갱신 실패', err.response?.data || err);
    throw err.response?.data || '한국 TOP100 갱신 실패';
  }
};
// 해외 탑 100
export const syncUSTop100 = async () => {
  try {
    const res = await api.post('/music/sync/us');
    return res.data;
  } catch (err) {
    console.log('🇺🇸 US TOP100 갱신 실패', err.response?.data || err);
    throw err.response?.data || 'US TOP100 갱신 실패';
  }
};
// 플래그로 음악 조회
export const fetchMusicByFlag = async flag => {
  try {
    const res = await api.get(`/music/flag/${flag}`);
    return res.data;
  } catch (err) {
    console.log('FLAG 기반 음악 조회 실패', err.response?.data || err);
    throw err.response?.data || 'FLAG 음악 조회 실패';
  }
};
// 단일 음악 조회
export const fetchMusicDetail = async musicId => {
  try {
    const res = await api.get(`/music/${musicId}`);
    return res.data;
  } catch (err) {
    console.log('단일 음악 조회 실패', err.response?.data || err);
    throw err.response?.data || '음악 조회 실패';
  }
};
// 모든 음악 불러오기
export const fetchAllMusic = async () => {
  try {
    const res = await api.get('/music');
    return res.data;
  } catch (err) {
    console.log('전체 음악 조회 실패', err.response?.data || err);
    throw err.response?.data || '전체 음악 조회 실패';
  }
};
// 게시글 추천 음악 검색
export const searchMusic = async text => {
  try {
    const res = await api.get('/musicpost/search', {
      params: {query: text},
    });
    return res.data;
  } catch (err) {
    console.log('음악 검색 실패', err);
    return [];
  }
};
// 게시글 작성
export const createMusicPost = async payload => {
  const res = await api.post('/musicpost', payload);
  return res.data;
};
// 모든 게시글 조회
export const fetchAllMusicPosts = async () => {
  try {
    const res = await api.get('/musicpost');
    return res.data;
  } catch (err) {
    console.log('음악 게시글 목록 조회 실패:', err);
    throw err;
  }
};
// 음악 게시글 상세 페이지 조회
export const fetchMusicPostDetail = async postId => {
  const res = await api.get(`/musicpost/${postId}`);
  return res.data;
};

// 유저가 작성한 음악 게시글 목록
export const fetchUserMusicPosts = async userId => {
  const res = await api.get(`/musicpost/user/${userId}`);
  return res.data;
};

// 수정
export const updateMusicPost = async (postId, payload) => {
  const res = await api.put(`/musicpost/${postId}`, payload);
  return res.data;
};
// 삭제
export const deleteMusicPost = async postId => {
  const res = await api.delete(`/musicpost/${postId}`);
  return res.data;
};

// 콘서트 Top 목록 조회
export const fetchTopConcerts = async () => {
  try {
    const res = await api.get('/concert/top');
    return res.data;
  } catch (err) {
    console.log('콘서트 조회 실패:', err.response?.data || err);
    throw err.response?.data || '콘서트 조회 실패';
  }
};
