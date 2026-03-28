import React, { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [showLanding, setShowLanding] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loginId, setLoginId] = useState("");

  const [form, setForm] = useState({
    name: "",
    age: "",
    height: "",
    specialty: "",
    image: "",
    video: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("hope_profiles");
    if (saved) setProfiles(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("hope_profiles", JSON.stringify(profiles));
  }, [profiles]);

  const handleSubmit = () => {
    if (!form.name) return;

    setProfiles([
      ...profiles,
      {
        ...form,
        likes: 0,
        views: 0,
        id: Date.now()
      }
    ]);
  };

  const handleLike = (id) => {
    setProfiles(
      profiles.map((p) =>
        p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p
      )
    );
  };

  const handleView = (id) => {
    setProfiles(
      profiles.map((p) =>
        p.id === id ? { ...p, views: (p.views || 0) + 1 } : p
      )
    );
  };

  const filtered = profiles
    .filter((p) =>
      (p.name || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (b.likes || 0) - (a.likes || 0));

  // 랜딩
  if (showLanding) {
    return (
      <div style={styles.landing}>
        <h1 style={styles.logo}>HO✦PE</h1>
        <p>너의 꿈이 시작되는 곳</p>
        <button onClick={() => setShowLanding(false)}>시작하기</button>
      </div>
    );
  }

  // 로그인
  if (!user) {
    return (
      <div style={styles.center}>
        <h1>HO✦PE</h1>
        <input
          placeholder="아이디"
          onChange={(e) => setLoginId(e.target.value)}
        />
        <button onClick={() => setUser({ id: loginId })}>
          로그인
        </button>
      </div>
    );
  }

  // 메인
  return (
return (
  <div style={{ padding: "20px", fontFamily: "sans-serif" }}>

    {/* 헤더 */}
    <div style={{ marginBottom: "30px" }}>
      <h1 style={{
        fontSize: "40px",
        background: "linear-gradient(to right, pink, purple)",
        WebkitBackgroundClip: "text",
        color: "transparent"
      }}>
        HO✦PE
      </h1>
      <p>아이돌 지망생 플랫폼</p>
    </div>

    {/* 검색 */}
    <input
      placeholder="이름 검색..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px"
      }}
    />

    {/* 등록 카드 */}
    <div style={{
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "30px"
    }}>
      <h3>프로필 등록</h3>

      <input placeholder="이름" onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <input placeholder="나이" onChange={(e)=>setForm({...form,age:e.target.value})}/>
      <input placeholder="키" onChange={(e)=>setForm({...form,height:e.target.value})}/>
      <input placeholder="특기" onChange={(e)=>setForm({...form,specialty:e.target.value})}/>
      <input placeholder="이미지 URL" onChange={(e)=>setForm({...form,image:e.target.value})}/>

      <button onClick={handleSubmit}>등록</button>
    </div>

    {/* 카드 리스트 */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px"
    }}>
      {filtered.map((p) => (
        <div key={p.id} style={{
          border: "1px solid #eee",
          borderRadius: "15px",
          padding: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>

          <img
            src={p.image || "https://via.placeholder.com/200"}
            style={{ width: "100%", borderRadius: "10px" }}
            alt="profile"
          />

          <h3>{p.name || "이름 없음"}</h3>

          <p>{p.age || "-"} / {p.height || "-"}</p>
          <p>{p.specialty || "-"}</p>

          <p>👍 {p.likes || 0} 👁 {p.views || 0}</p>

          <button onClick={(e)=>{
            e.stopPropagation();
            handleLike(p.id);
          }}>
            좋아요
          </button>
        </div>
      ))}
    </div>

  </div>
);

const styles = {
  landing: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
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
  card: {
    border: "1px solid gray",
    margin: "10px",
    padding: "10px"
  }
};