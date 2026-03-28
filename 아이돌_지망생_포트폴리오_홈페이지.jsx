import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function HopePlatform() {
  const [profiles, setProfiles] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showLanding, setShowLanding] = useState(true);

  const [loginForm, setLoginForm] = useState({ id: "" });
  const [form, setForm] = useState({
    name: "",
    age: "",
    height: "",
    specialty: "",
    description: "",
    image: "",
    video: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("hope_profiles");
    if (saved) setProfiles(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("hope_profiles", JSON.stringify(profiles));
  }, [profiles]);

  const handleLogin = () => {
    if (!loginForm.id) return;
    setUser({ id: loginForm.id });
    setShowLanding(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name) return;
    setProfiles([
      ...profiles,
      { ...form, likes: 0, views: 0, id: Date.now() },
    ]);
  };

  const handleLike = (id) => {
    setProfiles(profiles.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  };

  const handleView = (id) => {
    setProfiles(profiles.map((p) => (p.id === id ? { ...p, views: p.views + 1 } : p)));
  };

  const filtered = profiles
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.likes - a.likes);

  // 🌟 랜딩 페이지
  if (showLanding) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black text-white">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          HO✦PE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-lg opacity-80"
        >
          너의 꿈이 시작되는 곳
        </motion.p>

        <Button className="mt-8" onClick={() => setShowLanding(false)}>
          시작하기
        </Button>
      </div>
    );
  }

  // 로그인
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="p-8 bg-white/10 rounded-xl">
          <h1 className="text-3xl font-bold mb-4">HO✦PE</h1>
          <Input placeholder="아이디" onChange={(e) => setLoginForm({ id: e.target.value })} />
          <Button className="mt-4 w-full" onClick={handleLogin}>로그인</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      {/* 헤더 */}
      <div className="flex justify-between items-center p-6">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          HO✦PE
        </motion.div>
        <span>{user.id}</span>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <Input placeholder="검색" className="mb-6" value={search} onChange={(e) => setSearch(e.target.value)} />

        <Card className="mb-6 bg-white/5">
          <CardContent className="p-4 space-y-2">
            <Input name="name" placeholder="이름" onChange={handleChange} />
            <Input name="age" placeholder="나이" onChange={handleChange} />
            <Input name="height" placeholder="키" onChange={handleChange} />
            <Input name="specialty" placeholder="특기" onChange={handleChange} />
            <Input name="image" placeholder="이미지" onChange={handleChange} />
            <Input name="video" placeholder="영상" onChange={handleChange} />
            <Textarea name="description" placeholder="소개" onChange={handleChange} />
            <Button onClick={handleSubmit}>등록</Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Card key={p.id} onClick={() => handleView(p.id)} className="hover:scale-105 transition">
              <CardContent className="p-4">
                <img src={p.image} className="w-full h-52 object-cover rounded" />
                <h3 className="font-bold mt-2">{p.name}</h3>
                <p>{p.age} / {p.height}</p>
                <p>{p.specialty}</p>
                {p.video && <iframe src={p.video} className="w-full h-32 mt-2" />}
                <div className="flex justify-between mt-2">
                  <span>👍 {p.likes}</span>
                  <span>👁 {p.views}</span>
                </div>
                <Button className="mt-2 w-full" onClick={(e)=>{e.stopPropagation();handleLike(p.id)}}>좋아요</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// 🔥 파비콘/아이콘은 실제 배포 시 public 폴더에 logo.svg 추가해서 적용
