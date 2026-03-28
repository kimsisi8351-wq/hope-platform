import React, { useState, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("landing");
  const [profiles, setProfiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [loginId, setLoginId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
      { ...form, likes: 0, views: 0, id: Date.now() }
    ]);
    setForm({ name: "", age: "", height: "", specialty: "", image: "" });
  };

  const handleLike = (id) => {
    setProfiles(
      profiles.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const handleView = (id) => {
    setProfiles(
      profiles.map((p) =>
        p.id === id ? { ...p, views: p.views + 1 } : p
      )
    );
  };

  const filtered = profiles
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.likes - a.likes);

  // 🔥 Landing
  if (page === "landing") {
    return (
      <div style={styles.landing}>
        <h1 style={styles.logo}>HO✦PE</h1>
        <p style={{ opacity: 0.7 }}>GLOBAL AUDITION PLATFORM</p>
        <button onClick={() => setPage("login")} style={styles.mainBtn}>
          시작하기
        </button>
      </div>
    );
  }

  // 🔥 Login
  if (page === "login") {
    return (
      <div style={styles.center}>
        <h1 style={styles.logo}>HO✦PE</h1>
        <input
          placeholder="아이디"
          onChange={(e) => setLoginId(e.target.value)}
          style={styles.input}
        />
        <button
          style={styles.mainBtn}
          onClick={() => setPage("main")}
        >
          로그인
        </button>
      </div>
    );
  }

  // 🔥 상세페이지
  if (page === "detail" && selected) {
    return (
      <div style={styles.detailWrap}>
        <button onClick={() => setPage("main")} style={styles.backBtn}>
          ← 돌아가기
        </button>

        <img
          src={selected.image || "https://via.placeholder.com/400"}
          alt="profile"
          style={styles.detailImg}
        />

        <h1>{selected.name}</h1>
        <p>{selected.age} / {selected.height}</p>
        <p>{selected.specialty}</p>
        <p>👍 {selected.likes} 👁 {selected.views}</p>
      </div>
    );
  }

  return (
    <div>
      {/* 🔥 NAV */}
      <div style={styles.nav}>
        <h2 style={styles.logo}>HO✦PE</h2>

        <div style={styles.menu}>
          <button>홈</button>
          <button>공지사항</button>

          <div style={styles.dropdownWrap}>
            <button onClick={() => setMenuOpen(!menuOpen)}>HOPER ▾</button>

            {menuOpen && (
              <div style={styles.dropdown}>
                <div>🇰🇷 한국</div>
                <div>🇯🇵 일본</div>
                <div>🇹🇭 태국</div>
              </div>
            )}
          </div>

          <button>운영정책</button>
          <button>고객센터</button>
        </div>
      </div>

      {/* 🔥 HERO */}
      <div style={styles.hero}>
        <h1>YOUR DREAM STARTS HERE</h1>
      </div>

      {/* 🔥 CONTENT */}
      <div style={styles.container}>
        <input
          placeholder="검색"
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
          <input placeholder="이미지 URL" onChange={(e)=>setForm({...form,image:e.target.value})}/>
          <button onClick={handleSubmit}>등록</button>
        </div>

        {/* 카드 */}
        <div style={styles.grid}>
          {filtered.map((p) => (
            <div
              key={p.id}
              style={styles.card}
              onClick={() => {
                handleView(p.id);
                setSelected(p);
                setPage("detail");
              }}
            >
              <img
                src={p.image || "https://via.placeholder.com/200"}
                alt="profile"
                style={styles.cardImg}
              />

              <div style={styles.cardBody}>
                <h3>{p.name}</h3>
                <p>{p.specialty}</p>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  landing: {
    height: "100vh",
    background: "black",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  center: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  logo: {
    background: "linear-gradient(to right, pink, purple)",
    WebkitBackgroundClip: "text",
    color: "transparent"
  },

  mainBtn: {
    marginTop: "20px",
    padding: "10px 30px",
    border: "none",
    cursor: "pointer"
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    borderBottom: "1px solid #eee",
    background: "white"
  },

  menu: {
    display: "flex",
    gap: "15px"
  },

  dropdownWrap: {
    position: "relative"
  },

  dropdown: {
    position: "absolute",
    top: "40px",
    right: 0,
    background: "white",
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
  },

  hero: {
    height: "300px",
    background: "black",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40px",
    fontWeight: "bold"
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px"
  },

  search: {
    padding: "12px",
    width: "100%",
    marginBottom: "20px"
  },

  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px"
  },

  card: {
    borderRadius: "12px",
    overflow: "hidden",
    background: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer"
  },

  cardImg: {
    width: "100%",
    height: "250px",
    objectFit: "cover"
  },

  cardBody: {
    padding: "15px"
  },

  detailWrap: {
    padding: "40px",
    textAlign: "center"
  },

  detailImg: {
    width: "300px",
    borderRadius: "12px"
  },

  backBtn: {
    marginBottom: "20px"
  }
};