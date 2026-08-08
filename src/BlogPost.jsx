import { useParams, Link } from "react-router-dom";
import { marked } from "marked";
import { useEffect } from "react";

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

const rawPosts = import.meta.glob("./posts/*.md", { query: "?raw", import: "default", eager: true });

function getPost(slug) {
  const entry = Object.entries(rawPosts).find(([path]) =>
    path.replace("./posts/", "").replace(".md", "") === slug
  );
  if (!entry) return null;
  const { meta, body } = parseFrontmatter(entry[1]);
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || "",
    category: meta.category || "Industry News",
    excerpt: meta.excerpt || "",
    tags: (meta.tags || "").split(",").map(t => t.trim()).filter(Boolean),
    body,
  };
}

function formatDate(d) {
  if (!d) return "";
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Configure marked for clean output
marked.setOptions({ breaks: true, gfm: true });

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post) {
    return (
      <div style={{ background: T.dark, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "14px", color: T.muted, marginBottom: "16px" }}>Post not found.</div>
          <Link to="/blog" style={{ color: T.gold, fontSize: "12px", fontFamily: "monospace" }}>← Back to News</Link>
        </div>
      </div>
    );
  }

  const catColor = CATEGORY_COLORS[post.category] || T.slate;
  const html = marked(post.body);

  return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* Header */}
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/blog" style={{ fontSize: "11px", color: T.muted, textDecoration: "none", fontFamily: "monospace", letterSpacing: "1px", border: `1px solid ${T.border}`, padding: "5px 12px", borderRadius: "4px" }}>
            ← NEWS
          </Link>
          <Link to="/" style={{ fontSize: "11px", color: T.gold, textDecoration: "none", fontFamily: "monospace", letterSpacing: "1px", border: `1px solid ${T.gold}44`, padding: "5px 12px", borderRadius: "4px" }}>
            GUIDE
          </Link>
        </div>
      </div>

      {/* Post */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "36px 24px 60px" }}>

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
          <span style={{
            fontSize: "8px", letterSpacing: "1.5px", fontFamily: "monospace",
            color: catColor, background: `${catColor}14`,
            border: `1px solid ${catColor}33`, padding: "3px 8px", borderRadius: "3px",
          }}>
            {post.category.toUpperCase()}
          </span>
          <span style={{ fontSize: "10px", color: T.faint, fontFamily: "monospace" }}>{formatDate(post.date)}</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(20px, 4vw, 30px)", fontWeight: 400, color: T.text, margin: "0 0 20px", lineHeight: 1.3 }}>{post.title}</h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p style={{ fontSize: "15px", color: T.muted, margin: "0 0 28px", lineHeight: 1.7, borderLeft: `3px solid ${T.gold}`, paddingLeft: "14px", fontStyle: "italic" }}>
            {post.excerpt}
          </p>
        )}

        {/* Body */}
        <div className="blog-body" dangerouslySetInnerHTML={{ __html: html }}/>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ marginTop: "36px", paddingTop: "20px", borderTop: `1px solid ${T.border}` }}>
            <span style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "2px", color: T.faint, marginRight: "8px" }}>TAGS</span>
            {post.tags.map(tag => (
              <span key={tag} style={{ fontSize: "9px", fontFamily: "monospace", color: T.dim, background: T.card, border: `1px solid ${T.border}`, padding: "2px 8px", borderRadius: "3px", marginRight: "6px" }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Back link */}
        <div style={{ marginTop: "36px" }}>
          <Link to="/blog" style={{ fontSize: "12px", color: T.gold, textDecoration: "none", fontFamily: "monospace", letterSpacing: "1px" }}>
            ← Back to News
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${T.border}`, padding: "24px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", color: T.faint, margin: 0, fontFamily: "monospace" }}>
          SD Window & Door Guide · San Diego County · Independent resource for window and door selection
        </p>
      </div>

      {/* Blog body styles */}
      <style>{`
        .blog-body { font-size: 15px; color: ${T.muted}; line-height: 1.8; }
        .blog-body h2 { font-size: 20px; font-weight: 400; color: ${T.text}; margin: 32px 0 12px; }
        .blog-body h3 { font-size: 16px; font-weight: 400; color: ${T.text}; margin: 24px 0 10px; }
        .blog-body p { margin: 0 0 18px; }
        .blog-body strong { color: ${T.text}; font-weight: 600; }
        .blog-body em { color: ${T.gold}; font-style: italic; }
        .blog-body ul, .blog-body ol { margin: 0 0 18px; padding-left: 22px; }
        .blog-body li { margin-bottom: 7px; }
        .blog-body a { color: ${T.gold}; text-decoration: underline; }
        .blog-body a:hover { color: ${T.teal}; }
        .blog-body hr { border: none; border-top: 1px solid ${T.border}; margin: 32px 0; }
        .blog-body blockquote { border-left: 3px solid ${T.gold}; margin: 0 0 18px; padding: 10px 16px; color: ${T.dim}; font-style: italic; background: ${T.card}; border-radius: 0 4px 4px 0; }
        .blog-body code { background: ${T.card2}; padding: 1px 5px; border-radius: 3px; font-size: 13px; color: ${T.text}; }
      `}</style>
    </div>
  );
}
