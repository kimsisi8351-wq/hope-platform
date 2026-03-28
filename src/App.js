import React, { useState, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("main");
  const [selected, setSelected] = useState(null);

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
        p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p
      )
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const openDetail = (p) => {
    setSelected(p);
    setPage("detail");
  };

  const filtered = profiles
    .filter((p) =>
      (p.name || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (b.likes || 0) - (a.likes || 0));

  // 🔥 상세 페이지
  if (page === "detail" && selected) {
    return (
      <div style={styles.detailWrap}>
        <button onClick={() => setPage("main")} style={styles.backBtn}>
          ← 뒤로
        </button>

        <img
          src={selected.image || "https://via.placeholder.com/400"}
          alt="profile"
          style={styles.detailImg}
        />

        <h1>{selected.name}</h1>

        <p>{selected.age} / {selected.height}</p>
        <p>{selected.specialty}</p>

        {/* 유튜브 */}
        {selected.youtube && (
          <iframe
            width="100%"
            height="300"
            src={selected.youtube.replace("watch?v=", "embed/")}
            title="youtube"
          />
        )}

        <p style={{ fontSize: "20px" }}>
          👍 {selected.likes}
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>

      {/* 헤더 */}
      <div style={styles.header}>
        <h1 style={styles.logo}>HO✦PE</h1>
      </div>

      {/* 검색 */}
      <input
        placeholder="검색..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* 등록 */}
      <div style={styles.form}>
        <input placeholder="이름" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="나이" onChange={(e)=>setForm({...form,age:e.target.value})}/>
        <input placeholder="키" onChange={(e)=>setForm({...form,height:e.target.value})}/>
        <input placeholder="특기" onChange={(e)=>setForm({...form,specialty:e.target.value})}/>
        <input placeholder="유튜브 링크" onChange={(e)=>setForm({...form,youtube:e.target.value})}/>
        <input type="file" onChange={handleImageUpload} />

        <button onClick={handleSubmit}>등록</button>
      </div>

      {/* 카드 */}
      <div style={styles.grid}>
        {filtered.map((p) => (
          <div
            key={p.id}
            style={styles.card}
            onClick={() => openDetail(p)}
          >
            <img
              src={p.image || "https://via.placeholder.com/200"}
              alt="profile"
              style={styles.cardImg}
            />

            <h3>{p.name}</h3>
            <p>👍 {p.likes}</p>

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

const styles = {
  container: {
    padding: "20px",
    fontFamily: "sans-serif",
    background: "#f8f9ff",
    minHeight: "100vh"
  },

  header: {
    marginBottom: "20px"
  },

  logo: {
    fontSize: "40px",
    background: "linear-gradient(to right, #ff7eb3, #7a5cff)",
    WebkitBackgroundClip: "text",
    color: "transparent"
  },

  search: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "1px solid #ddd"
  },

  form: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "30px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "10px",
    borderRadius: "15px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "0.2s"
  },

  cardImg: {
    width: "100%",
    borderRadius: "10px"
  },

  detailWrap: {
    padding: "20px",
    textAlign: "center"
  },

  detailImg: {
    width: "300px",
    borderRadius: "15px"
  },

  backBtn: {
    marginBottom: "20px"
  }
};