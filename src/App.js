import React, { useState, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
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

  // 로컬 저장
  useEffect(() => {
    const saved = localStorage.getItem("hope_profiles");
    if (saved) setProfiles(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("hope_profiles", JSON.stringify(profiles));
  }, [profiles]);

  // 이미지 업로드
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

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

  const handleView = (profile) => {
    setProfiles(
      profiles.map((p) =>
        p.id === profile.id ? { ...p, views: (p.views || 0) + 1 } : p
      )
    );
    setSelected(profile);
    setPage("detail");
  };

  const filtered = profiles
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.likes - a.likes); // 🔥 랭킹

  // 로그인 페이지
  if (page === "login") {
    return (
      <div style={styles.login}>
        <h1 style={styles.logo}>HO✦PE</h1>
        <input
          placeholder="아이디 입력"
          onChange={(e) => setLoginId(e.target.value)}
          style={styles.input}
        />
        <button
          style={styles.btn}
          onClick={() => {
            setUser(loginId);
            setPage("main");
          }}
        >
          로그인
        </button>
      </div>
    );
  }

  // 상세 페이지
  if (page === "detail" && selected) {
    return (
      <div style={styles.page}>
        <TopNav setPage={setPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <div style={styles.detail}>
          <img src={selected.image} style={styles.detailImg} alt="profile" />
          <h1>{selected.name}</h1>
          <p>{selected.age} / {selected.height}</p>
          <p>{selected.specialty}</p>
          <p>❤️ {selected.likes} 👁 {selected.views}</p>

          <button onClick={() => setPage("main")} style={styles.btn}>
            뒤로가기
          </button>
        </div>
      </div>
    );
  }

  // 메인 페이지
  return (
    <div style={styles.page}>
      <TopNav setPage={setPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* HERO */}
      <div style={styles.hero}>
        YOUR DREAM STARTS HERE
      </div>

      {/* 검색 */}
      <div style={styles.searchBox}>
        <input
          placeholder="검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* 등록 */}
      <div style={styles.form}>
        <input placeholder="이름" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="나이" onChange={(e)=>setForm({...form,age:e.target.value})}/>
        <input placeholder="키" onChange={(e)=>setForm({...form,height:e.target.value})}/>
        <input placeholder="특기" onChange={(e)=>setForm({...form,specialty:e.target.value})}/>
        
        <input type="file" onChange={handleImageUpload} />

        <button onClick={handleSubmit}>등록</button>
      </div>

      {/* 카드 */}
      <div style={styles.grid}>
        {filtered.map((p, i) => (
          <div key={p.id} style={styles.card} onClick={() => handleView(p)}>
            <div style={styles.rank}>#{i + 1}</div>
            <img src={p.image} style={styles.img} alt="profile" />
            <h3>{p.name}</h3>
            <p>{p.specialty}</p>
            <p>❤️ {p.likes}</p>
            <button
              onClick={(e)=>{
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

/* 🔥 상단 네비 */
function TopNav({ setPage, menuOpen, setMenuOpen }) {
  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>HO✦PE</h2>

      <div style={styles.menu}>
        <span onClick={()=>setPage("main")}>홈</span>
        <span onClick={()=>alert("공지사항")}>공지사항</span>

        <div
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ position: "relative" }}
        >
          HOPER ▾
          {menuOpen && (
            <div style={styles.dropdown}>
              <div>🇰🇷 한국</div>
              <div>🇯🇵 일본</div>
              <div>🇹🇭 태국</div>
            </div>
          )}
        </div>

        <span onClick={()=>alert("운영정책")}>운영정책</span>
        <span onClick={()=>alert("고객센터")}>고객센터</span>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#0f0f14",
    minHeight: "100vh",
    color: "white"
  },

  login: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px"
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    background: "black"
  },

  menu: {
    display: "flex",
    gap: "20px",
    cursor: "pointer"
  },

  dropdown: {
    position: "absolute",
    top: "25px",
    background: "white",
    color: "black",
    padding: "10px",
    borderRadius: "6px"
  },

  logo: {
    color: "#ff4dff"
  },

  hero: {
    height: "250px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "black",
    fontSize: "30px"
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    margin: "20px"
  },

  input: {
    padding: "10px",
    borderRadius: "6px"
  },

  form: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
    gap: "20px",
    padding: "20px"
  },

  card: {
    background: "#1c1c25",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    position: "relative"
  },

  rank: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "gold",
    color: "black",
    padding: "5px"
  },

  img: {
    width: "100%",
    height: "200px",
    objectFit: "cover"
  },

  detail: {
    textAlign: "center",
    padding: "40px"
  },

  detailImg: {
    width: "300px",
    borderRadius: "10px"
  },

  btn: {
    padding: "10px 20px",
    background: "#ff4dff",
    border: "none",
    color: "white",
    cursor: "pointer"
  }
};