import React, { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [showLanding, setShowLanding] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loginId, setLoginId] = useState("");

  const [page, setPage] = useState("main");
  const [selectedProfile, setSelectedProfile] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "",
    height: "",
    specialty: "",
    description: "",
    image: "",
    video: "",
    country: "korea"
  });

  // 저장 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("hope_profiles");
    if (saved) setProfiles(JSON.parse(saved));
  }, []);

  // 저장
  useEffect(() => {
    localStorage.setItem("hope_profiles", JSON.stringify(profiles));
  }, [profiles]);

  // 등록
  const handleSubmit = () => {
    if (!form.name) return;

    setProfiles([
      ...profiles,
      { ...form, likes: 0, views: 0, id: Date.now() }
    ]);
  };

  // 좋아요
  const handleLike = (id) => {
    setProfiles(
      profiles.map((p) =>
        p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p
      )
    );
  };

  // 조회수
  const handleView = (id) => {
    setProfiles(
      profiles.map((p) =>
        p.id === id ? { ...p, views: (p.views || 0) + 1 } : p
      )
    );
  };

  // 필터
  const filtered = profiles
    .filter((p) => {
      const match = p.name.toLowerCase().includes(search.toLowerCase());

      if (selectedCountry === "all") return match;
      return match && p.country === selectedCountry;
    })
    .sort((a, b) => (b.likes || 0) - (a.likes || 0));

  // ================= 상세 =================
  const DetailPage = () => {
    if (!selectedProfile) return null;

    return (
      <div style={styles.detail}>
        <button onClick={() => setPage("main")}>← 뒤로가기</button>

        <img
          src={selectedProfile.image || "https://via.placeholder.com/300"}
          alt="profile"
          style={{ width: "300px", borderRadius: "20px" }}
        />

        <h2>{selectedProfile.name}</h2>
        <p>{selectedProfile.age} / {selectedProfile.height}</p>
        <p>{selectedProfile.specialty}</p>
        <p>{selectedProfile.description}</p>
        <p>👍 {selectedProfile.likes} 👁 {selectedProfile.views}</p>

        {selectedProfile.video && (
          <iframe
            width="400"
            height="250"
            src={selectedProfile.video.replace("watch?v=", "embed/")}
            title="video"
            frameBorder="0"
            allowFullScreen
          />
        )}
      </div>
    );
  };

  // ================= 랭킹 =================
  const RankingPage = () => {
    const ranked = [...profiles]
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 10);

    return (
      <div style={styles.container}>
        <h2>🔥 인기 랭킹 TOP 10</h2>

        {ranked.map((p, i) => (
          <div key={p.id} style={styles.rankCard}>
            <span>#{i + 1}</span>

            <img
              src={p.image || "https://via.placeholder.com/100"}
              alt="profile"
              width="80"
            />

            <div>
              <h3>{p.name}</h3>
              <p>👍 {p.likes}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ================= 헤더 =================
  const Header = () => (
    <div style={styles.header}>
      <h2 style={styles.logo}>HO✦PE</h2>

      <div style={styles.menu}>
        <button onClick={() => setPage("main")}>홈</button>
        <button onClick={() => setPage("ranking")}>랭킹</button>

        <div style={styles.dropdownWrap}>
          <button onClick={() => setShowDropdown(!showDropdown)}>
            HOPER ▼
          </button>

          {showDropdown && (
            <div style={styles.dropdown}>
              <div onClick={() => { setSelectedCountry("all"); setShowDropdown(false); }}>전체</div>
              <div onClick={() => { setSelectedCountry("korea"); setShowDropdown(false); }}>🇰🇷 한국</div>
              <div onClick={() => { setSelectedCountry("japan"); setShowDropdown(false); }}>🇯🇵 일본</div>
              <div onClick={() => { setSelectedCountry("thai"); setShowDropdown(false); }}>🇹🇭 태국</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ================= 랜딩 =================
  if (showLanding) {
    return (
      <div style={styles.landing}>
        <h1 style={styles.logo}>HO✦PE</h1>
        <button onClick={() => setShowLanding(false)}>시작하기</button>
      </div>
    );
  }

  // ================= 로그인 =================
  if (!user) {
    return (
      <div style={styles.center}>
        <h1>HO✦PE</h1>
        <input onChange={(e) => setLoginId(e.target.value)} />
        <button onClick={() => setUser({ id: loginId })}>로그인</button>
      </div>
    );
  }

  // ================= 페이지 분기 =================
  if (page === "detail") return <DetailPage />;
  if (page === "ranking") return <><Header /><RankingPage /></>;

  // ================= 메인 =================
  return (
    <div>
      <Header />

      <div style={styles.container}>
        <input
          placeholder="검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={styles.form}>
          <input placeholder="이름" onChange={(e)=>setForm({...form,name:e.target.value})}/>
          <input placeholder="나이" onChange={(e)=>setForm({...form,age:e.target.value})}/>
          <input placeholder="키" onChange={(e)=>setForm({...form,height:e.target.value})}/>
          <input placeholder="특기" onChange={(e)=>setForm({...form,specialty:e.target.value})}/>
          <input placeholder="이미지URL" onChange={(e)=>setForm({...form,image:e.target.value})}/>
          <input placeholder="영상URL" onChange={(e)=>setForm({...form,video:e.target.value})}/>

          <select onChange={(e)=>setForm({...form, country:e.target.value})}>
            <option value="korea">🇰🇷 한국</option>
            <option value="japan">🇯🇵 일본</option>
            <option value="thai">🇹🇭 태국</option>
          </select>

          <button onClick={handleSubmit}>등록</button>
        </div>

        {filtered.map((p) => (
          <div
            key={p.id}
            style={styles.card}
            onClick={() => {
              handleView(p.id);
              setSelectedProfile(p);
              setPage("detail");
            }}
          >
            <img
              src={p.image || "https://via.placeholder.com/200"}
              alt="profile"
              width="200"
            />

            <h3>{p.name}</h3>
            <p>{p.age} / {p.height}</p>
            <p>{p.specialty}</p>

            <p>
              {p.country === "korea" && "🇰🇷 한국"}
              {p.country === "japan" && "🇯🇵 일본"}
              {p.country === "thai" && "🇹🇭 태국"}
            </p>

            <p>👍 {p.likes || 0} 👁 {p.views || 0}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike(p.id);
              }}
            >
              좋아요
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ================= 스타일 =================
const styles = {
  landing: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "black",
    color: "white"
  },
  logo: {
    fontSize: "40px",
    background: "linear-gradient(to right, pink, purple, blue)",
    WebkitBackgroundClip: "text",
    color: "transparent"
  },
  center: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    padding: "20px"
  },
  form: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    margin: "20px 0"
  },
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    margin: "10px",
    borderRadius: "12px",
    cursor: "pointer"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ddd"
  },
  menu: {
    display: "flex",
    gap: "10px"
  },
  dropdownWrap: {
    position: "relative"
  },
  dropdown: {
    position: "absolute",
    top: "30px",
    background: "white",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
  },
  detail: {
    padding: "30px",
    textAlign: "center"
  },
  rankCard: {
    display: "flex",
    gap: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    margin: "10px 0"
  }
};