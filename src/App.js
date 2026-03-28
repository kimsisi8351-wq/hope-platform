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
    description: "",
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

  const handleView = (id) => {
    setProfiles(
      profiles.map((p) =>
        p.id === id ? { ...p, views: p.views + 1 } : p
      )
    );
  };

 const filtered = profiles
  .filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => b.likes - a.likes);

  if (showLanding) {
    return (
      <div style={styles.landing}>
        <h1 style={styles.logo}>HO✦PE</h1>
        <p>너의 꿈이 시작되는 곳</p>
        <button onClick={() => setShowLanding(false)}>시작하기</button>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.center}>
        <h1>HO✦PE</h1>
        <input
          placeholder="아이디"
          onChange={(e) => setLoginId(e.target.value)}
        />
        <button onClick={() => setUser({ id: loginId })}>로그인</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>HO✦PE</h1>

      <input
        placeholder="검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        <input placeholder="이름" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="나이" onChange={(e)=>setForm({...form,age:e.target.value})}/>
        <input placeholder="키" onChange={(e)=>setForm({...form,height:e.target.value})}/>
        <input placeholder="특기" onChange={(e)=>setForm({...form,specialty:e.target.value})}/>
        <input placeholder="이미지URL" onChange={(e)=>setForm({...form,image:e.target.value})}/>
        <input placeholder="영상URL" onChange={(e)=>setForm({...form,video:e.target.value})}/>
        <button onClick={handleSubmit}>등록</button>
      </div>

      {filtered.map((p) => (
        <div key={p.id} style={styles.card} onClick={()=>handleView(p.id)}>
        <img src={p.image || "https://via.placeholder.com/200"} width="200" />
          <h3>{p.name || "이름 없음"}</h3>
          <p>{p.age} / {p.height}</p>
          <p>{p.specialty}</p>
          <p>👍 {p.likes} 👁 {p.views}</p>
          <button onClick={(e)=>{e.stopPropagation();handleLike(p.id)}}>좋아요</button>
        </div>
      ))}
    </div>
  );
}

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