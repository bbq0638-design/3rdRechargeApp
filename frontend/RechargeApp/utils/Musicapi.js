import api from './api';

export const syncKoreaTop100 = async () => {
  try {
    const res = await api.post('/music/sync/korea');
    return res.data;
  } catch (err) {
    console.log('🇰🇷 한국 TOP100 갱신 실패', err.response?.data || err);
    throw err.response?.data || '한국 TOP100 갱신 실패';
  }
};

export const syncUSTop100 = async () => {
  try {
    const res = await api.post('/music/sync/us');
    return res.data;
  } catch (err) {
    console.log('🇺🇸 US TOP100 갱신 실패', err.response?.data || err);
    throw err.response?.data || 'US TOP100 갱신 실패';
  }
};

export const fetchMusicByFlag = async flag => {
  try {
    const res = await api.get(`/music/flag/${flag}`);
    return res.data;
  } catch (err) {
    console.log('FLAG 기반 음악 조회 실패', err.response?.data || err);
    throw err.response?.data || 'FLAG 음악 조회 실패';
  }
};

export const fetchMusicDetail = async musicId => {
  try {
    const res = await api.get(`/music/${musicId}`);
    return res.data;
  } catch (err) {
    console.log('단일 음악 조회 실패', err.response?.data || err);
    throw err.response?.data || '음악 조회 실패';
  }
};

export const fetchAllMusic = async () => {
  try {
    const res = await api.get('/music');
    return res.data;
  } catch (err) {
    console.log('전체 음악 조회 실패', err.response?.data || err);
    throw err.response?.data || '전체 음악 조회 실패';
  }
};
