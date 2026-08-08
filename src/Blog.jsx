import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const T = {
  dark:   "#F5F2EB",
  card:   "#FFFFFF",
  card2:  "#F8F5F0",
  text:   "#1C1C1A",
  muted:  "#4A4A44",
  dim:    "#7A7A72",
  faint:  "#A8A89E",
  border: "#E0DDD6",
  gold:   "#9A7020",
  teal:   "#2A7A6A",
  sage:   "#4A7848",
  slate:  "#3A5878",
  rust:   "#8A3820",
  ember:  "#8A4820",
};

const CATEGORY_COLORS = {
  "Price Updates":  T.rust,
  "New Products":   T.teal,
  "SD Market":      T.gold,
  "Industry News":  T.slate,
  "Fire & Code":    T.ember,
  "Deals":          T.sage,
};

// Parse frontmatter from raw markdown string
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  match[1].split("\n").forEach(line => {
    const i = line.indexOf(":");
    if (i === -1) return;
    const key = line.slice(0, i).trim();
    const val = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = val;
  });
  return { meta, body: match[2].trim() };
}

// Load all posts via Vite glob import
const rawPosts = import.meta.glob("./posts/*.md", { query: "?raw", import: "default", eager: true });

function buildPosts() {
  return Object.entries(rawPosts)
    .map(([path, raw]) => {
      const slug = path.replace("./posts/", "").replace(".md", "");
      const { meta, body } = parseFrontmatter(raw);
      return {
        slug,
        title: meta.title || slug,
        date: meta.date || "",
        category: meta.category || "Industry News",
        excerpt: meta.excerpt || "",
        tags: (meta.tags || "").split(",").map(t => t.trim()).filter(Boolean),
        body,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

const ALL_POSTS = buildPosts();
const CATEGORIES = ["All", ...Array.from(new Set(ALL_POSTS.map(p => p.category)))];

function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d + "T12:00:00");
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All"
    ? ALL_POSTS
    : ALL_POSTS.filter(p => p.category === activeCategory);

  return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* Header */}
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Pivot door mark */}
          <svg width="22" height="34" viewBox="0 0 18 28" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="1" width="16" height="26" rx="0.5" stroke={T.text} strokeWidth="2"/>
            <rect x="2.5" y="2.5" width="13" height="23" rx="0.5" stroke={T.text} strokeWidth="1"/>
            <polygon points="1,0.5 10,2.5 10,25.5 1,27.5" fill="none" stroke={T.gold} strokeWidth="2"/>
            <line x1="9" y1="13" x2="9" y2="17" stroke={T.gold} strokeWidth="1.8"/>
          </svg>
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div style={{ fontSize: "16px", fontWeight: 400, color: T.text, lineHeight: 1 }}>
                SD <em style={{ color: T.gold }}>Window & Door</em> Guide
              </div>
            </Link>
            <div style={{ fontSize: "9px", letterSpacing: "3px", color: T.dim, fontFamily: "monospace", marginTop: "3px" }}>SAN DIEGO COUNTY</div>
          </div>
        </div>
        <Link to="/" style={{ fontSize: "11px", color: T.gold, textDecoration: "none", fontFamily: "monospace", letterSpacing: "1px", border: `1px solid ${T.gold}44`, padding: "5px 12px", borderRadius: "4px" }}>
          ← BACK TO GUIDE
        </Link>
      </div>

      {/* Hero */}
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: "36px 24px 28px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ fontSize: "9px", letterSpacing: "4px", fontFamily: "monospace", color: T.gold, marginBottom: "10px" }}>SD WINDOW & DOOR GUIDE</div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 400, color: T.text, margin: "0 0 10px", lineHeight: 1.2 }}>
            Industry News <em style={{ color: T.gold }}>& Market Updates</em>
          </h1>
          <p style={{ fontSize: "14px", color: T.muted, margin: 0, lineHeight: 1.7, maxWidth: "560px" }}>
            Price changes, new product launches, local market intel, and code updates — straight from the San Diego building products trade.
          </p>
        </div>
      </div>

      {/* Category filters */}
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: "10px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "2px", color: T.faint, marginRight: "4px" }}>FILTER</span>
          {CATEGORIES.map(cat => {
            const active = activeCategory === cat;
            const color = CATEGORY_COLORS[cat] || T.slate;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                background: active ? `${color}18` : "none",
                border: `1px solid ${active ? color : T.border}`,
                color: active ? color : T.dim,
                padding: "4px 12px", borderRadius: "4px", cursor: "pointer",
                fontSize: "9px", letterSpacing: "1px", fontFamily: "monospace",
              }}>
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Post list */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "28px 24px" }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", color: T.faint, padding: "48px 0" }}>No posts in this category yet.</div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filtered.map(post => {
            const catColor = CATEGORY_COLORS[post.category] || T.slate;
            return (
              <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: T.card, border: `1px solid ${T.border}`, borderRadius: "10px",
                  padding: "20px 24px", transition: "box-shadow 0.15s, border-color 0.15s",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: "8px", letterSpacing: "1.5px", fontFamily: "monospace",
                      color: catColor, background: `${catColor}14`,
                      border: `1px solid ${catColor}33`, padding: "3px 8px", borderRadius: "3px",
                    }}>
                      {post.category.toUpperCase()}
                    </span>
                    <span style={{ fontSize: "10px", color: T.faint, fontFamily: "monospace" }}>{formatDate(post.date)}</span>
                  </div>
                  <h2 style={{ fontSize: "17px", fontWeight: 400, color: T.text, margin: "0 0 8px", lineHeight: 1.35 }}>{post.title}</h2>
                  <p style={{ fontSize: "13px", color: T.muted, margin: "0 0 12px", lineHeight: 1.65 }}>{post.excerpt}</p>
                  {post.tags.length > 0 && (
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {post.tags.map(tag => (
                        <span key={tag} style={{ fontSize: "9px", fontFamily: "monospace", color: T.faint, background: T.card2, border: `1px solid ${T.border}`, padding: "2px 7px", borderRadius: "3px" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${T.border}`, padding: "24px", textAlign: "center", marginTop: "20px" }}>
        <p style={{ fontSize: "11px", color: T.faint, margin: 0, fontFamily: "monospace" }}>
          SD Window & Door Guide · San Diego County · Independent resource for window and door selection
        </p>
      </div>
    </div>
  );
}
