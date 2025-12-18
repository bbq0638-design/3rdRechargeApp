Recharge Movie AI - Core Routing Logic

이 파일은 Recharge 영화 AI의 '기준 문서이자 실행 로직'이다.

[중요 철학]

- 이 AI는 영화를 직접 추천하지 않는다.
- 사용자의 자연어 입력을 분석해
  1. 어떤 '메인 분기'에 해당하는지 판단하고
  2. TMDB가 실행할 수 있는 '검색 전략'으로 변환한다.

[메인 분기(Main Branch) - 고정]

1. SIMILAR_BY_TITLE
2. WEATHER
3. MOOD
4. RECHARGE_IMMERSIVE_CONTINUE ⭐ 핵심 분기

[서브 분기(Sub Branch)]

- GENRE_EXPLICIT (명시적 장르 요청일 때만)

[LLM(OpenAI)]

- 메인 분기가 아니다.
- 위 분기들로 매핑되지 않는 애매한 표현을
  '의미 번역'해서 다시 메인 분기로 귀결시키는 역할만 한다.
  """

from enum import Enum
from typing import Optional, Dict, Any
import re

# =========================================================

# Intent 정의

# =========================================================

class Intent(str, Enum):
SIMILAR_BY_TITLE = "SIMILAR_BY_TITLE"
WEATHER = "WEATHER"
MOOD = "MOOD"
RECHARGE_IMMERSIVE_CONTINUE = "RECHARGE_IMMERSIVE_CONTINUE"
GENRE_EXPLICIT = "GENRE_EXPLICIT"
LLM_FALLBACK = "LLM_FALLBACK"

# =========================================================

# 공통 유틸

# =========================================================

def normalize_text(text: str) -> str:
"""
사용자 입력 정규화 - 불필요한 공백 제거 - 소문자 처리 (영문 대비)
"""
return re.sub(r"\s+", " ", text.strip().lower())

# =========================================================

# 1️⃣ SIMILAR_BY_TITLE

# =========================================================

def extract_seed_title(text: str) -> Optional[str]:
"""
'OOO 같은 영화', 'OOO 비슷한 영화' 패턴에서
기준 영화 제목(seedTitle)을 추출한다.

    이 분기는 '추천'이 아니라 '탐색'에 가깝기 때문에
    AI 해석을 최소화하고, TMDB API로 바로 위임한다.
    """

    patterns = [
        r"(.+?) 같은 영화",
        r"(.+?) 비슷한 영화",
        r"(.+?)이랑 비슷",
        r"(.+?)과 비슷",
        r"(.+?) 같은 느낌",
    ]

    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return match.group(1).strip()

    return None

# =========================================================

# 2️⃣ WEATHER

# =========================================================

WEATHER_KEYWORDS = [
"날씨", "비", "비 오는", "맑은", "흐린",
"눈", "더운", "추운", "장마"
]

def is_weather_request(text: str) -> bool:
"""
외부 환경(날씨)이 영화 선택의 기준일 때
"""
return any(k in text for k in WEATHER_KEYWORDS)

# =========================================================

# 3️⃣ MOOD

# =========================================================

MOOD_KEYWORDS = [
"기분", "우울", "행복", "신나",
"피곤", "힐링", "감성", "무기력",
"불안", "허전"
]

def is_mood_request(text: str) -> bool:
"""
사용자의 내적 상태(기분)가 중심일 때
"""
return any(k in text for k in MOOD_KEYWORDS)

# =========================================================

# 4️⃣ RECHARGE_IMMERSIVE_CONTINUE ⭐⭐⭐ 핵심

# =========================================================

RECHARGE_KEYWORDS = [
"충전", "전기차",
"차에서", "차 안",
"기다리", "대기",
"가볍게", "보기 편한",
"작은 화면", "핸드폰", "태블릿",
"몰입", "집에 가서", "이어", "마저"
]

def is_recharge_immersive_request(text: str) -> bool:
"""
Recharge 철학 기반 분기 판별

    이 분기는 다음 질문에 답하기 위해 존재한다.

    ❓ 이 영화는
       - 차 안 / 작은 화면 환경에서도
       - 짧은 시간 안에 진입이 가능하고
       - 충전이 끝난 뒤에도
         '집에 가서 마저 보고 싶다'는 감정을
         만들어낼 수 있는가?

    중요한 점:
    - '충전 시간'을 러닝타임 제한으로 쓰지 않는다.
    - 영화의 완주가 목적이 아니다.
    - 목적은 '이야기 안으로 들어가는 진입점'을 만드는 것이다.

    따라서 이 분기는
    - 장르가 무엇인가? ❌
    - 기분이 어떤가? ❌
    가 아니라,

    - 초반 몰입이 쉬운가?
    - 모바일 환경에서도 이해가 깨지지 않는가?
    - 중단 후에도 이어볼 의지가 생길 수 있는가?

    를 기준으로 TMDB 검색 전략을 만든다.
    """
    return any(k in text for k in RECHARGE_KEYWORDS)

# =========================================================

# 5️⃣ GENRE_EXPLICIT (서브 분기)

# =========================================================

GENRE_KEYWORDS = {
"액션": "Action",
"로맨스": "Romance",
"코미디": "Comedy",
"sf": "Science Fiction",
"판타지": "Fantasy",
"공포": "Horror",
"스릴러": "Thriller",
"애니메이션": "Animation",
"드라마": "Drama",
}

def extract_genre(text: str) -> Optional[str]:
"""
사용자가 장르를 '명시적으로' 말했을 때만 동작하는 서브 분기
"""
for kor, eng in GENRE_KEYWORDS.items():
if kor in text:
return eng
return None

# =========================================================

# 메인 라우터

# =========================================================

def route_movie_request(
user_text: str,
charge_minutes: Optional[int] = None
) -> Dict[str, Any]:
"""
Recharge 영화 AI 메인 라우터

    입력:
    - user_text: 사용자 자연어 입력
    - charge_minutes: 충전 남은 시간 (선택)

    출력:
    - intent: 메인/서브 분기
    - route: tmdb | llm
    - payload: TMDB 검색 전략 또는 LLM 컨텍스트
    """

    text = normalize_text(user_text)

    # 1️⃣ SIMILAR_BY_TITLE (최우선)
    seed = extract_seed_title(text)
    if seed:
        return {
            "intent": Intent.SIMILAR_BY_TITLE,
            "route": "tmdb",
            "payload": {
                "seedTitle": seed
            }
        }

    # 2️⃣ WEATHER
    if is_weather_request(text):
        return {
            "intent": Intent.WEATHER,
            "route": "tmdb",
            "payload": {
                "strategy": {
                    "prefer_genres": ["Fantasy", "Adventure"],
                    "min_vote": 6.5
                }
            }
        }

    # 3️⃣ MOOD
    if is_mood_request(text):
        return {
            "intent": Intent.MOOD,
            "route": "tmdb",
            "payload": {
                "strategy": {
                    "prefer_genres": ["Drama", "Comedy"],
                    "min_vote": 6.5
                }
            }
        }

    # 4️⃣ RECHARGE_IMMERSIVE_CONTINUE (핵심)
    if is_recharge_immersive_request(text):
        return {
            "intent": Intent.RECHARGE_IMMERSIVE_CONTINUE,
            "route": "tmdb",
            "payload": {
                "strategy": {
                    # Recharge 핵심 전략 플래그들
                    "fast_start": True,              # 초반 전개 빠름
                    "mobile_friendly": True,         # 작은 화면 친화
                    "low_cognitive_load": True,      # 이해 부담 낮음
                    "likely_to_continue": True,      # 이어보기 의지
                    "charge_minutes": charge_minutes
                }
            }
        }

    # 5️⃣ GENRE_EXPLICIT (서브)
    genre = extract_genre(text)
    if genre:
        return {
            "intent": Intent.GENRE_EXPLICIT,
            "route": "tmdb",
            "payload": {
                "strategy": {
                    "prefer_genres": [genre],
                    "min_vote": 6.0
                }
            }
        }

    # ❗ 어디에도 안 걸리면 LLM에게 의미 해석 위임
    return {
        "intent": Intent.LLM_FALLBACK,
        "route": "llm",
        "payload": {
            "userText": user_text,
            "context": {
                "chargeMinutes": charge_minutes
            }
        }
    }
