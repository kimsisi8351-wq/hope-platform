import React, { useState, useEffect } from "react";

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    age: "",
    height: "",
    specialty: "",
    image: ""
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
      { ...form, likes: 0, id: Date.now() }
    ]);
  };

  const handleLike = (id) => {
    setProfiles(
      profiles.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const filtered = profiles.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      {/* 🔥 NAV */}
      <div style={styles.nav}>
        <h2 style={styles.logo}>HO✦PE</h2>
        <div style={styles.menu}>
          <span>공지사항</span>
          <span>HOPER</span>
          <span>운영정책</span>
          <span>고객센터</span>
        </div>
      </div>

      {/* 🔥 HERO */}
      <div style={styles.hero}>
        <h1>YOUR DREAM STARTS HERE</h1>
      </div>

      {/* 🔥 검색 */}
      <div style={styles.searchBox}>
        <input
          placeholder="지원자 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* 🔥 등록 */}
      <div style={styles.form}>
        <input placeholder="이름" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="나이" onChange={(e)=>setForm({...form,age:e.target.value})}/>
        <input placeholder="키" onChange={(e)=>setForm({...form,height:e.target.value})}/>
        <input placeholder="특기" onChange={(e)=>setForm({...form,specialty:e.target.value})}/>
        <input placeholder="이미지 URL" onChange={(e)=>setForm({...form,image:e.target.value})}/>
        <button onClick={handleSubmit}>등록</button>
      </div>

      {/* 🔥 카드 */}
      <div style={styles.grid}>
        {filtered.map((p) => (
          <div key={p.id} style={styles.card}>
            <img
              src={p.image || "https://via.placeholder.com/300"}
              style={styles.img}
              alt="profile"
            />
            <div style={styles.cardBody}>
              <h3>{p.name}</h3>
              <p>{p.age} / {p.height}</p>
              <p>{p.specialty}</p>
              <div style={styles.likeRow}>
                ❤️ {p.likes}
                <button onClick={()=>handleLike(p.id)}>좋아요</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#0f0f14",
    minHeight: "100vh",
    color: "white",
    fontFamily: "sans-serif"
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    background: "black"
  },

  logo: {
    color: "#ff4dff"
  },

  menu: {
    display: "flex",
    gap: "20px",
    cursor: "pointer"
  },

  hero: {
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "black",
    fontSize: "28px",
    fontWeight: "bold"
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    margin: "30px 0"
  },

  input: {
    padding: "10px",
    width: "300px",
    borderRadius: "8px"
  },

  form: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px"
  },

  card: {
    background: "#1c1c25",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "0.3s",
    cursor: "pointer"
  },

  img: {
    width: "100%",
    height: "250px",
    objectFit: "cover"
  },

  cardBody: {
    padding: "15px"
  },

  likeRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  }
};