import React, { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("main");
  const [showDropdown, setShowDropdown] = useState(false);

  // 🔐 로그인 페이지
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

  // 📌 헤더
  const Header = () => (
    <div style={styles.header}>
      <h2 style={styles.logo}>HO✦PE</h2>

      <div style={styles.menu}>

        <button onClick={() => setPage("notice")}>공지사항</button>

        {/* 드롭다운 */}
        <div
          style={styles.dropdownWrap}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button>HOPER ▼</button>

          {showDropdown && (
            <div style={styles.dropdown}>
              <div onClick={() => setPage("korea")}>한국</div>
              <div onClick={() => setPage("japan")}>일본</div>
              <div onClick={() => setPage("thai")}>태국</div>
            </div>
          )}
        </div>

        <button onClick={() => setPage("policy")}>운영정책</button>
        <button onClick={() => setPage("support")}>고객센터</button>
      </div>
    </div>
  );

  // 📄 페이지들
  const MainPage = () => (
    <div>
      <h2>메인페이지</h2>
      <p>여기에 기존 프로필 기능 붙이면 됨</p>
    </div>
  );

  const Notice = () => (
    <div>
      <h2>📢 공지사항</h2>
      <p>서비스 오픈 안내</p>
    </div>
  );

  const Policy = () => (
    <div>
      <h2>📜 운영정책</h2>
      <p>부적절한 콘텐츠 금지</p>
    </div>
  );

  const Support = () => (
    <div>
      <h2>📞 고객센터</h2>
      <p>support@hope.com</p>
    </div>
  );

  const Korea = () => <h2>🇰🇷 한국 HOPER</h2>;
  const Japan = () => <h2>🇯🇵 일본 HOPER</h2>;
  const Thai = () => <h2>🇹🇭 태국 HOPER</h2>;

  return (
    <div>
      <Header />

      <div style={styles.content}>
        {page === "main" && <MainPage />}
        {page === "notice" && <Notice />}
        {page === "policy" && <Policy />}
        {page === "support" && <Support />}
        {page === "korea" && <Korea />}
        {page === "japan" && <Japan />}
        {page === "thai" && <Thai />}
      </div>
    </div>
  );
}

const styles = {
  loginWrap: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    borderBottom: "1px solid #ddd"
  },

  logo: {
    fontSize: "28px",
    background: "linear-gradient(to right, pink, purple)",
    WebkitBackgroundClip: "text",
    color: "transparent"
  },

  menu: {
    display: "flex",
    gap: "15px",
    alignItems: "center"
  },

  dropdownWrap: {
    position: "relative"
  },

  dropdown: {
    position: "absolute",
    top: "30px",
    left: 0,
    background: "white",
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px"
  },

  content: {
    padding: "20px"
  },

  input: {
    padding: "10px",
    marginTop: "10px"
  }
};