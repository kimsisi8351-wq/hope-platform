import React, { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("main");
  const [selected, setSelected] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [profiles, setProfiles] = useState([]);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };

    if (file) reader.readAsDataURL(file);
  };

  const openDetail = (p) => {
    setSelected(p);
    setPage("detail");
  };

  // 🔐 로그인
  if (!user) {
    return (
      <div style={styles.loginWrap}>
        <h1 style={styles.logo}>HO✦PE</h1>
        <input
          placeholder="아이디 입력"
          onChange={(e) => setUser({ id: e.target.value })}
          style={styles.input}
        />
      </div>
    );
  }

  // 📄 상세페이지
  if (page === "detail" && selected) {
    return (
      <div style={styles.detailWrap}>
        <button onClick={() => setPage("main")}>← 뒤로</button>

        <img
          src={selected.image || "https://via.placeholder.com/300"}
          alt="profile"
          style={styles.detailImg}
        />

        <h2>{selected.name}</h2>
        <p>{selected.age} / {selected.height}</p>
        <p>{selected.specialty}</p>
        <p>👍 {selected.likes}</p>
      </div>
    );
  }

  // 📌 헤더
  const Header = () => (
    <div style={styles.header}>
      <h2 style={styles.logo}>HO✦PE</h2>

      <div style={styles.menu}>
        <button onClick={() => setPage("main")}>홈</button>
        <button onClick={() => setPage("notice")}>공지사항</button>

        <div style={styles.dropdownWrap}>
          <button onClick={() => setShowDropdown(!showDropdown)}>
            HOPER ▼
          </button>

          {showDropdown && (
            <div style={styles.dropdown}>
              <div>🇰🇷 한국</div>
              <div>🇯🇵 일본</div>
              <div>🇹🇭 태국</div>
            </div>
          )}
        </div>

        <button onClick={() => setPage("policy")}>운영정책</button>
        <button onClick={() => setPage("support")}>고객센터</button>
      </div>
    </div>
  );

  // 🏠 메인페이지
  const Main = () => (
    <div>
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
        {profiles.map((p) => (
          <div key={p.id} style={styles.card} onClick={() => openDetail(p)}>
            <img src={p.image} alt="profile" style={styles.cardImg} />
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

  return (
    <div style={styles.container}>
      <Header />

      <div style={styles.content}>
        {page === "main" && <Main />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "sans-serif",
    background: "#f8f9ff",
    minHeight: "100vh"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "white"
  },

  logo: {
    fontSize: "30px",
    background: "linear-gradient(to right, pink, purple)",
    WebkitBackgroundClip: "text",
    color: "transparent"
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
    top: "35px",
    background: "white",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },

  form: {
    marginBottom: "20px"
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
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    cursor: "pointer"
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
    borderRadius: "10px"
  },

  loginWrap: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  input: {
    padding: "10px"
  },

  content: {
    padding: "30px"
  }
};