import React, { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("main");
  const [selectedProfile, setSelectedProfile] = useState(null);

  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    age: "",
    height: "",
    specialty: "",
    image: "",
    youtube: ""
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
      { ...form, likes: 0, views: 0, id: Date.now() }
    ]);
  };

  const handleLike = (id) => {
    setProfiles(
      profiles.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const handleView = (profile) => {
    setSelectedProfile(profile);
    setPage("detail");
  };

  const filtered = profiles
    .filter((p) =>
      (p.name || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.likes - a.likes);

  // 🔐 로그인 페이지
  if (!user) {
    return (
      <div style={styles.center}>
        <h1 style={styles.logo}>HO✦PE</h1>
        <input
          placeholder="아이디 입력"
          onChange={(e) => setUser({ id: e.target.value })}
        />
      </div>
    );
  }

  // 📄 상세 페이지
  if (page === "detail" && selectedProfile) {
    return (
      <div style={{ padding: "20px" }}>
        <button onClick={() => setPage("main")}>← 뒤로</button>

        <h2>{selectedProfile.name}</h2>

        <img
          src={selectedProfile.image || "https://via.placeholder.com/300"}
          alt="profile"
          width="300"
        />

        <p>{selectedProfile.age} / {selectedProfile.height}</p>
        <p>{selectedProfile.specialty}</p>

        {/* 유튜브 */}
        {selectedProfile.youtube && (
          <iframe
            width="100%"
            height="300"
            src={selectedProfile.youtube.replace("watch?v=", "embed/")}
            title="youtube"
          />
        )}

        <p>👍 {selectedProfile.likes}</p>
      </div>
    );
  }

  // 🏠 메인 페이지
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={styles.logo}>HO✦PE</h1>

      {/* 검색 */}
      <input
        placeholder="검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 등록 */}
      <div>
        <input placeholder="이름" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="나이" onChange={(e)=>setForm({...form,age:e.target.value})}/>
        <input placeholder="키" onChange={(e)=>setForm({...form,height:e.target.value})}/>
        <input placeholder="특기" onChange={(e)=>setForm({...form,specialty:e.target.value})}/>
        <input placeholder="이미지URL" onChange={(e)=>setForm({...form,image:e.target.value})}/>
        <input placeholder="유튜브URL" onChange={(e)=>setForm({...form,youtube:e.target.value})}/>
        <button onClick={handleSubmit}>등록</button>
      </div>

      {/* 랭킹 TOP3 */}
      <h2>🔥 인기 TOP</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        {filtered.slice(0, 3).map((p) => (
          <div key={p.id} style={styles.rankCard}>
            <img src={p.image} width="100" alt="rank"/>
            <p>{p.name}</p>
            <p>👍 {p.likes}</p>
          </div>
        ))}
      </div>

      {/* 리스트 */}
      <div style={styles.grid}>
        {filtered.map((p) => (
          <div key={p.id} style={styles.card}>
            <img
              src={p.image || "https://via.placeholder.com/200"}
              width="200"
              alt="profile"
            />

            <h3>{p.name}</h3>

            <p>👍 {p.likes}</p>

            <button onClick={()=>handleLike(p.id)}>좋아요</button>
            <button onClick={()=>handleView(p)}>상세보기</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  center: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    fontSize: "40px",
    background: "linear-gradient(to right, pink, purple)",
    WebkitBackgroundClip: "text",
    color: "transparent"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 200px)",
    gap: "10px"
  },
  card: {
    border: "1px solid #ddd",
    padding: "10px"
  },
  rankCard: {
    border: "2px solid gold",
    padding: "10px"
  }
};