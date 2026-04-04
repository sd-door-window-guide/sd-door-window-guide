import { useState } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const T = {
  dark:   "#F5F2EB",
  card:   "#FFFFFF",
  card2:  "#EEF2F0",
  border: "#D8D4CC",
  gold:   "#9A7020",
  teal:   "#2A8A80",
  rust:   "#B05828",
  slate:  "#3A6898",
  sage:   "#4A7848",
  plum:   "#6848A0",
  ember:  "#C04020",
  text:   "#1A2028",
  muted:  "#5A6868",
  dim:    "#8A9898",
  faint:  "#B8C4C0",
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Pill({ label, color = T.gold, bg }) {
  return (
    <span style={{ fontSize:"9px", fontFamily:"monospace", letterSpacing:"2px", color:"#fff", background: bg || color, padding:"3px 9px", borderRadius:"3px", whiteSpace:"nowrap", fontWeight:600, textTransform:"uppercase" }}>
      {label}
    </span>
  );
}
function SectionLabel({ children, color = T.dim }) {
  return <div style={{ fontSize:"9px", letterSpacing:"4px", color, fontFamily:"monospace", marginBottom:"8px" }}>{children}</div>;
}
function PriceTag({ price, color = T.gold }) {
  return <span style={{ fontSize:"14px", color, letterSpacing:"2px" }}>{price}</span>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// DOOR TYPES DATA
// ═══════════════════════════════════════════════════════════════════════════════
const exteriorDoorTypes = [
  {
    id: "wood_ext",
    name: "Wood",
    icon: "",
    color: T.rust,
    price: "$$$$",
    leadTime: "4–12 weeks (custom); 1–2 weeks (stock)",
    blurb: "The classic for warmth and custom beauty — stainable, fully paintable, and any size. Requires resealing every few years; not ideal for coastal moisture or fire zones.",
    pros: ["Unmatched natural beauty", "Fully paintable and stainable", "Completely custom sizes/designs", "Best acoustic performance"],
    cons: ["Requires periodic repainting/sealing", "Can warp or crack in extreme moisture", "Higher maintenance than fiberglass or steel"],
    bestFor: ["Traditional, craftsman, Mediterranean homes", "Clients wanting natural grain stain finish", "Custom architectural statements"],
    fireNote: "Standard wood does NOT meet WUI (Wildland-Urban Interface) fire requirements. Fire-rated solid core or fire-rated fiberglass required in fire zones.",
    vendors: ["TM Cobb", "Therma-Tru Classic-Craft (simulated)", "Custom mills"],
    finishOptions: ["Any stain", "Any paint", "Natural / clear coat", "Gel stain for grain pop"],
  },
  {
    id: "fiberglass_ext",
    name: "Fiberglass",
    icon: "",
    color: T.teal,
    price: "$$$–$$$$",
    leadTime: "1–3 weeks (standard); 4–6 weeks (custom paint/glass)",
    blurb: "Best all-around for San Diego. Won't warp, rot, or corrode, and modern textures can mimic real wood grain convincingly. Low-maintenance even in coastal climates.",
    pros: ["Won't warp, rot, or corrode", "Can mimic real wood grain convincingly", "Excellent insulation / energy efficiency", "Low maintenance — no repainting needed for decades", "Available fire-rated for WUI zones"],
    cons: ["High-quality fiberglass can approach wood pricing", "Texture painting requires skilled finisher for wood look", "Fewer fully custom profile options vs. wood"],
    bestFor: ["Coastal and high-humidity locations", "Clients wanting wood look without wood upkeep", "Fire zone properties"],
    fireNote: "Fire-rated fiberglass doors are available and meet WUI requirements. Specify fire rating when in designated fire hazard zone.",
    vendors: ["Therma-Tru", "Plastpro", "ProVia"],
    finishOptions: ["Factory-primed (paintable)", "Gel stain (wood-look)", "Factory finish colors", "Custom paint"],
  },
  {
    id: "steel_ext",
    name: "Steel",
    icon: "⬛",
    color: T.slate,
    price: "$$–$$$",
    leadTime: "1–2 weeks (standard); 3–4 weeks (custom)",
    blurb: "Most affordable and most secure exterior door material. Solid foam-core insulation, won't warp — but conducts heat and will rust if the finish is scratched.",
    pros: ["Most affordable option", "Excellent security — hardest to kick in", "Won't warp or twist", "Good basic insulation (polyurethane foam core)"],
    cons: ["Conducts temperature (thermal bridging)", "Can dent", "Will rust if surface is scratched and unpainted", "Limited design aesthetic vs. wood/fiberglass"],
    bestFor: ["Secondary entries, garage access doors", "Budget-conscious whole-house projects", "Security-first applications"],
    fireNote: "Steel doors can meet fire ratings. Verify specific fire-rating certification when required for WUI or interior fire separation.",
    vendors: ["Therma-Tru (Pulse)", "JELD-WEN", "Masonite"],
    finishOptions: ["Factory-primed (paintable)", "Factory colors (white, black, bronze)", "Custom paint"],
  },
  {
    id: "iron_ext",
    name: "Wrought Iron / Steel Frame + Glass",
    icon: "",
    color: T.plum,
    price: "$$$$$",
    leadTime: "8–16 weeks (all custom)",
    blurb: "The architectural statement entry. Slim black metal frames with large glass panels — all custom, all dramatic. Long lead times and premium pricing.",
    pros: ["Unmatched visual drama and presence", "Slim frames — maximum glass visibility", "Extremely durable and secure", "Custom to exact dimensions and design"],
    cons: ["Highest price point — all custom", "Long lead times (custom fabrication)", "Metal conducts temperature", "Requires experienced installer"],
    bestFor: ["Spanish, Mediterranean, and Tuscan architecture", "Modern luxury entry statements", "Courtyard gates and passages"],
    fireNote: "Consult manufacturer — fire-rated iron/glass configurations exist but are specialty. Verify with building department for WUI compliance.",
    vendors: ["Cantera Doors", "Rocky Mountain Hardware (custom)", "Local fabricators"],
    finishOptions: ["Flat black (most popular)", "Bronze", "Aged iron patina", "Custom powder coat"],
  },
  {
    id: "vinyl_ext",
    name: "Vinyl / Composite",
    icon: "",
    color: T.sage,
    price: "$$–$$$",
    leadTime: "1–2 weeks",
    blurb: "Zero maintenance, best energy efficiency. Very limited color and style options — best for ADUs, secondary entries, and rental properties rather than primary entries.",
    pros: ["Zero maintenance required", "Best energy efficiency of all door types", "Will never warp, rot, or rust", "Lowest long-term cost"],
    cons: ["Very limited color and design options", "Cannot be repainted", "Lower-end aesthetic — not appropriate for luxury entries", "Less common in premium residential"],
    bestFor: ["ADUs and accessory structures", "Rental properties", "Secondary and utility entries", "Budget remodels"],
    fireNote: "Standard vinyl does not meet fire ratings. Consult code requirements for fire zone applications.",
    vendors: ["ProVia", "JELD-WEN", "Milgard (composite)"],
    finishOptions: ["White", "Beige / Sandstone", "Bronze (limited)", "Clay"],
  },
];

const interiorDoorOperations = [
  {
    id:"swing",
    label:"Swing Door",
    icon:"↪",
    color:T.slate,
    tagline:"The universal interior door — hinged, single-action",
    blurb:"The standard interior door — hinged, single-action, works anywhere with room for the swing arc. Best acoustic seal of any interior door type.",
    pros:["Simplest operation — no track or pocket","Works with any door slab style","Easy to install and adjust","Best acoustic seal when closed","Most hardware options available"],
    cons:["Requires swing clearance — unusable in very tight spaces","Door arc can interfere with furniture placement","Cannot be left partially open without a door stop"],
    bestFor:["Bedrooms","Home offices","Dining rooms","Any room with adequate floor space"],
    variants:["Single swing (standard)","Double swing / saloon doors","Barn-style swing (surface-mounted hinge)"],
    sdContext:"The standard interior door throughout San Diego residential. When in doubt, it's a swing door.",
  },
  {
    id:"french",
    label:"French Doors",
    icon:"⊞",
    color:T.rust,
    tagline:"Double glass doors that borrow light and open spaces visually",
    blurb:"Double glass-panel doors that share light between rooms while still closing off the space. A classic detail for home offices, dining rooms, and master suites.",
    pros:["Borrow light between rooms","Classic, elegant appearance","Can open both panels for a full-width opening","Wide variety of glass and divided lite options","Available in wood, fiberglass, and steel"],
    cons:["Both doors need swing clearance","Center meeting point can rattle if not latched","Less acoustic privacy than solid doors","Requires more wall space than a single swing door"],
    bestFor:["Home office to living room connection","Dining room to kitchen or hallway","Master bedroom to sitting room or balcony","Library or study with natural light needs"],
    variants:["Full-lite (all glass)","Half-lite (glass over solid panel)","True divided lite (individual glass panes)","Simulated divided lite (applied grilles)","Single French door (one panel with glass lites)"],
    sdContext:"French doors on a home office or study are a signature detail in La Jolla, Coronado, and Del Mar traditional homes. Steel French doors from French Steel or Steel Traditions have become a popular contemporary take on the classic.",
  },
  {
    id:"sliding",
    label:"Sliding Doors",
    icon:"⇄",
    color:T.teal,
    tagline:"Space-efficient doors that glide on a track — no swing needed",
    blurb:"Slides horizontally on a track — no swing clearance needed. The go-to for closets, tight bathrooms, and compact spaces.",
    pros:["No swing clearance needed — ideal for tight spaces","Clean contemporary look","Multi-panel options for wide openings","Available in glass for light borrowing"],
    cons:["Bypass sliders can only expose half the opening at a time","Track can collect dust and debris","Less acoustic performance than swing doors","Hardware and track must be well-installed for smooth operation"],
    bestFor:["Closet doors (bypass is the classic closet door)","Small bathrooms and powder rooms","Pantry and utility room access","Contemporary open-plan homes separating zones"],
    variants:["Bypass slider (two panels passing each other)","Single panel slider (slides to one side)","Multi-panel stacking slider","Mirror panel bypass (common for closets)"],
    sdContext:"Bypass closet sliders are nearly universal in San Diego residential construction. Single-panel sliders on a barn door track are popular in contemporary and farmhouse-style SD remodels.",
  },
  {
    id:"bifold",
    label:"Bi-Fold Doors",
    icon:"⟩⟨",
    color:T.sage,
    tagline:"Folding panels that maximize opening width in minimal space",
    blurb:"Hinged panels that fold accordion-style, exposing the full opening width. The standard closet door — best when you need full visibility into the space.",
    pros:["Full opening width when folded — best closet access","Minimal clearance required to operate","Wide variety of styles including louvered and mirrored","Can span large openings with multiple panel sets"],
    cons:["Not as architecturally refined as other door types","Bottom guide pin can be a trip hazard or pop out of track","Center fold point can flex or warp on lower-quality units","Not ideal for acoustic privacy"],
    bestFor:["Reach-in closets (the classic application)","Laundry room and utility room access","Pantry doors","Mechanical room access"],
    variants:["2-panel bi-fold (single pair)","4-panel bi-fold (two pairs, stacks to both sides)","Louvered bi-fold (ventilated — classic for closets)","Mirror bi-fold","Glass panel bi-fold"],
    sdContext:"Louvered bi-fold closet doors are common throughout older San Diego residential stock. Modern remodels typically upgrade to bypass sliders or barn doors, but bi-folds remain practical for reach-in closets where full access matters.",
  },
  {
    id:"pocket",
    label:"Pocket Doors",
    icon:"⬚",
    color:T.plum,
    tagline:"The space-free door — slides entirely into the wall",
    blurb:"Slides entirely into a wall cavity and disappears when open. Zero floor space used — but requires special wall framing, best done during construction or full remodel.",
    pros:["Zero floor space consumed — door fully disappears","Clean flush wall plane when open","Perfect for tight spaces with no swing room","Can create a completely open plan when desired"],
    cons:["Wall must be framed as a pocket — harder to retrofit","Cannot run plumbing or electrical in pocket wall","Hardware access is limited when door is recessed","Sound seal is less effective than swing doors","Track and rollers require occasional maintenance"],
    bestFor:["Master bathroom to closet connections","Kitchen to dining room pass-throughs","Great room flex space dividers","Anywhere zero swing clearance is available"],
    variants:["Single panel pocket","Double bi-parting pocket (two panels disappear into opposite walls)","Glass panel pocket (borrows light when closed)","Barn-track pocket hybrid"],
    sdContext:"Double bi-parting glass pocket doors between great room and covered outdoor room are a signature move in La Jolla and Del Mar custom builds. TM Cobb custom shaker in paint grade is the most specified interior pocket door panel in SD luxury remodels.",
  },
  {
    id:"barn",
    label:"Barn Doors",
    icon:"⊟",
    color:T.gold,
    tagline:"Surface-mounted sliding doors — the modern-rustic statement",
    blurb:"Hangs on a surface-mounted track and slides in front of the wall. Statement hardware, easy retrofit — but covers wall space beside the opening when open.",
    pros:["Statement hardware — a design element in itself","No wall framing required — easier retrofit than pocket doors","Large panel sizes possible","Wide variety of styles from rustic plank to modern flush"],
    cons:["Panel hangs on wall beside opening when open — uses wall space","Not acoustically tight — light gap around all edges","Not ADA compliant in most configurations","Hardware quality varies widely — invest in quality track and rollers"],
    bestFor:["Laundry rooms and utility rooms","Home office to hallway","Master bathroom or closet access","Pantry and mudroom entries","Any space where barn door aesthetic fits the design"],
    variants:["Single barn door (slides to one side)","Double barn door (two panels slide to opposite sides)","Bypass barn door (two panels on parallel tracks)","Glass panel barn door","Shiplap / plank barn door"],
    sdContext:"Barn doors are extremely popular in San Diego transitional and farmhouse-adjacent remodels. The Emtek barn door hardware line is the most specified in SD luxury residential — the quality of the hardware is as visible as the door itself, so don't spec cheap track on an expensive project.",
  },
  {
    id:"dutch",
    label:"Dutch Doors",
    icon:"⊟",
    color:T.ember,
    tagline:"Split horizontally — top and bottom operate independently",
    blurb:"A Dutch door is split horizontally at mid-height, allowing the top half and bottom half to open and close independently. When the full door is open, it functions as a standard swing door. When just the top half is open, it creates a counter-like opening — ventilation and communication without full access. Dutch doors are a classic feature in craftsman, coastal cottage, farmhouse, and traditional residential architecture. They're most often used at kitchen back doors, laundry room entries, nurseries, mudrooms, and home office pass-throughs. Practically, they're a charming functional detail — rare enough to be a conversation piece, common enough in the SD market to have solid vendor options.",
    pros:["Top and bottom operate independently — ventilation without full access","Classic craftsman and coastal cottage aesthetic","Keep children or pets contained while maintaining airflow","Works as a counter for pass-through applications"],
    cons:["Latch mechanism at the split requires alignment — can wear over time","More expensive than a standard swing door","Not suitable for every architectural style","Most common in wood — limited fiberglass options"],
    bestFor:["Kitchen back door or secondary entry","Mudroom and laundry room exterior access","Nurseries and children's rooms","Coastal cottage, craftsman, and farmhouse homes"],
    variants:["Exterior Dutch door (most common)","Interior Dutch door (less common — home office or nursery)","Dutch door with glass lites in top half"],
    sdContext:"Dutch doors are a classic detail in Point Loma and Coronado craftsman homes, and in the beach cottage stock of Ocean Beach and Pacific Beach. Rogue Valley and Simpson both offer wood Dutch doors. TM Cobb can custom-build interior Dutch doors.",
  },
  {
    id:"utility",
    label:"Utility & Service Doors",
    icon:"⬡",
    color:T.muted,
    tagline:"Functional doors for garages, laundry, and service areas",
    blurb:"Utility doors are the workhorse interior and secondary exterior doors found throughout every home — the door from the garage into the house, the laundry room door, the mechanical room door, the door from the mudroom to the backyard. These doors are functional first and decorative second. Key considerations are fire rating (garage-to-living-space doors are code-required to be fire-rated in California), insulation, durability, and security. Most utility doors are hollow-core or solid-core in paint-grade wood or fiberglass. Steel utility doors are used where security and fire rating are the priority. These are not glamorous products, but they're non-negotiable on every project.",
    pros:["Affordable and widely available","Fire-rated options for code compliance","Fiberglass resists moisture and rot in garages and laundry rooms","Easy to paint and maintain"],
    cons:["Limited design options — functional not decorative","Hollow-core options lack acoustic performance","Steel can rust in humid environments without maintenance"],
    bestFor:["Garage-to-living-space access (fire-rated required by code)","Laundry room exterior access","Mechanical room and storage room access","Secondary exterior entries (side doors, back doors)"],
    variants:["Hollow-core swing (lightest, least expensive — interiors only)","Solid-core swing (better acoustics and feel)","Fiberglass utility (exterior laundry and garage entries)","Steel utility with insulated foam core (garage exterior)","Fire-rated steel or fiberglass (garage-to-house — code required)"],
    sdContext:"California code requires a fire-rated door between an attached garage and living space — this is a non-negotiable on every attached garage project. Therma-Tru's fire-rated utility line is the most commonly spec'd for this application in SD. Always ask about the garage access door when selling an entry door — it's a natural upsell and a code requirement the client may not know about.",
  },
];

const interiorDoorTypes = [
  {
    id: "moulded",
    name: "Moulded Panel",
    icon: "▦",
    color: T.gold,
    price: "$–$$",
    leadTime: "In stock to 1–2 weeks",
    blurb: "Moulded panel doors are the most common interior door in residential construction. They're made from a composite skin pressed over a hollow or solid core, giving the appearance of a raised or flat panel door. The surface mimics wood but is actually a smooth composite material — it accepts paint beautifully but cannot be stained to show grain. The workhorse of interior doors: affordable, consistent, widely available, and works in most settings. Pre-primed and ready to paint. Great value for whole-house interior packages.",
    pros: ["Most affordable option", "Widely available — fast lead times", "Pre-primed — ready to paint", "Consistent appearance panel to panel"],
    cons: ["Cannot be stained (composite surface)", "Hollow-core versions lack acoustic performance", "Not appropriate for high-end custom settings"],
    bestFor: ["Production homes and remodels", "Paint-grade whole-house packages", "Secondary bedrooms and closets"],
    vendors: ["Masonite", "JELD-WEN", "TM Cobb"],
    finishOptions: ["Paint only (pre-primed white)", "Any paint color"],
    grades: ["Paint Grade only"],
  },
  {
    id: "stile_rail",
    name: "Stile & Rail",
    icon: "⬡",
    color: T.teal,
    price: "$$$–$$$$",
    leadTime: "2–6 weeks (standard); 6–10 weeks (custom)",
    blurb: "Stile and rail doors are the traditional, furniture-quality interior door. They're constructed from solid vertical stiles and horizontal rails joined together, with flat or raised panels inset between them — the same way fine furniture is built. This construction allows the door to expand and contract with seasonal humidity changes without warping. Available in both paint grade and stain grade wood species. The most versatile door type: appropriate for traditional, transitional, and even contemporary homes depending on panel design.",
    pros: ["True furniture-quality construction", "Available stain grade or paint grade", "Expands/contracts naturally — won't warp", "Wide range of panel styles: flat, raised, shaker, arch"],
    cons: ["Higher cost than moulded", "Longer lead times for custom sizes/species", "Heavier than hollow-core options"],
    bestFor: ["Custom homes and high-end remodels", "Stain grade applications with visible wood grain", "Traditional, craftsman, and transitional architecture"],
    vendors: ["TM Cobb", "Karona", "Simpson Door", "Custom mills"],
    finishOptions: ["Stain grade (natural wood grain)", "Paint grade (primed, any color)", "Pre-finished factory"],
    grades: ["Paint Grade", "Stain Grade"],
  },
  {
    id: "shaker",
    name: "Shaker",
    icon: "◻",
    color: T.slate,
    price: "$$–$$$",
    leadTime: "1–4 weeks",
    blurb: "The Shaker door is the most popular interior door style in the current market — and for good reason. Its clean, minimal design with a single flat recessed panel works equally well in modern, transitional, and casual-contemporary homes. It's the interior door equivalent of a white t-shirt: simple, elegant, and matches everything. Available in moulded composite (paint only) or solid wood stile and rail construction (paint or stain). The TM Cobb 1-panel flat shaker is the most specified interior door in San Diego luxury remodels right now.",
    pros: ["Most versatile style — works in any modern or transitional home", "Available in many price points (composite to solid wood)", "Clean aesthetic pairs with modern cabinetry", "Easy to paint cleanly due to flat panel"],
    cons: ["Extremely common — less distinctive if uniqueness matters", "Moulded shaker can look flat vs. solid wood version"],
    bestFor: ["Modern, contemporary, and transitional homes", "Whole-house consistency in current design trends", "Clients wanting a clean minimal interior"],
    vendors: ["TM Cobb", "Masonite", "JELD-WEN", "Simpson Door"],
    finishOptions: ["Paint grade (pre-primed)", "Stain grade (solid wood versions)", "Factory white", "Any custom color"],
    grades: ["Paint Grade", "Stain Grade (solid wood versions)"],
  },
  {
    id: "raised_moulding",
    name: "Raised Panel / Raised Moulding",
    icon: "◈",
    color: T.rust,
    price: "$$–$$$",
    leadTime: "1–4 weeks (standard); 4–8 weeks (custom profiles)",
    blurb: "Raised panel doors have panels that project forward from the door face, creating depth and shadow lines. The raised profile adds dimension and formality — historically the signature of traditional American residential architecture. Common in colonial, classical, and formal traditional homes. Available in moulded composite (paint grade) or solid wood stile and rail (paint or stain grade). The profile of the raised panel matters a lot — cathedral, ogee, and flat-top are common choices that each read differently in a space.",
    pros: ["Adds traditional character and dimension", "Widely available at many price points", "Works beautifully in formal and traditional interiors"],
    cons: ["Can feel dated in modern contexts", "More surface area in panel profile — harder to paint cleanly", "Limited stain grade options in raised moulded versions"],
    bestFor: ["Traditional, colonial, and formal interiors", "Homes with crown moulding and built-in details", "Clients wanting classic American interior character"],
    vendors: ["Masonite", "JELD-WEN", "TM Cobb", "Karona"],
    finishOptions: ["Paint grade (pre-primed)", "Stain grade (solid wood)", "Any paint color"],
    grades: ["Paint Grade", "Stain Grade"],
  },
  {
    id: "router_carved",
    name: "Router Carved / CNC Carved",
    icon: "",
    color: T.plum,
    price: "$$$$–$$$$$",
    leadTime: "4–10 weeks (all custom)",
    blurb: "Router carved and CNC carved doors are custom pieces where a router or CNC machine carves decorative patterns, geometric designs, or architectural details directly into a solid wood door face. This is the highest expression of custom interior doors — often seen in Mediterranean, Spanish Colonial, and Moroccan-influenced interiors. Designs can range from simple geometric patterns to elaborate floral or architectural motifs. Every door is one-of-a-kind. These are statement pieces, not whole-house doors.",
    pros: ["Completely unique — custom to client's design vision", "Unmatched decorative impact", "Pairs with premium hardware beautifully"],
    cons: ["Very high cost — specialty fabrication", "Long lead times", "Not appropriate for casual or modern interiors"],
    bestFor: ["Feature entry doors and master bedroom doors", "Mediterranean, Spanish, and Moroccan-influenced homes", "Clients who want an architectural art piece"],
    vendors: ["Cantera Doors", "Custom local fabricators", "Simpson Door (custom program)"],
    finishOptions: ["Stain (shows carving depth best)", "Paint", "Glazed finish (antique effect)"],
    grades: ["Stain Grade only (to show carving)"],
  },
  {
    id: "mdf",
    name: "MDF / Paint Grade Flush",
    icon: "▬",
    color: T.sage,
    price: "$–$$",
    leadTime: "In stock to 1 week",
    blurb: "MDF (Medium Density Fiberboard) doors are the most popular paint-grade interior door for contemporary and modern homes. The surface is perfectly smooth — no wood grain — which produces flawlessly smooth paint finish without any grain telegraphing through. MDF doesn't expand or contract with humidity changes like solid wood, making it dimensionally stable and paintable without cracking. It's heavier than hollow-core doors and has a satisfying solid feel. The flat flush version is the cleanest modern interior door available. MDF cannot be stained.",
    pros: ["Perfectly smooth paint surface — zero grain", "Dimensionally stable — won't warp", "Heavier, more solid feel than hollow-core", "Best paint-grade surface in class"],
    cons: ["Cannot be stained — paint only", "Heavy — requires solid hinges", "Susceptible to moisture damage if unfinished edge is exposed", "Less character than wood stile and rail"],
    bestFor: ["Modern and contemporary interiors", "Flush / slab door aesthetic", "Anywhere a perfect paint finish is the goal"],
    vendors: ["TM Cobb", "Masonite", "JELD-WEN", "Algoma"],
    finishOptions: ["Paint grade only (any color)", "Factory white primer"],
    grades: ["Paint Grade only"],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// PATIO & LARGE DOOR SYSTEMS DATA
// ═══════════════════════════════════════════════════════════════════════════════
const largeDoorSystems = [
  {
    id: "folding",
    name: "Folding / Bi-fold Door Systems",
    bg: "◇",
    icon: `<svg width="34" height="28" viewBox="0 0 34 28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="2" width="28" height="24" rx="0.5" stroke-width="2"/><line x1="11.5" y1="2" x2="11.5" y2="26" stroke-width="1.2"/><line x1="18.5" y1="2" x2="18.5" y2="26" stroke-width="1.2"/><line x1="25.5" y1="2" x2="25.5" y2="26" stroke-width="1.2"/><rect x="27" y="3.5" width="4" height="21" rx="0.3" stroke-width="0.9" opacity="0.55"/><rect x="20" y="3.5" width="4" height="21" rx="0.3" stroke-width="0.9" opacity="0.55"/><rect x="13" y="3.5" width="4" height="21" rx="0.3" stroke-width="0.9" opacity="0.55"/><rect x="6" y="3.5" width="4" height="21" rx="0.3" stroke-width="0.9" opacity="0.55"/><polyline points="25.5,2 32.5,14 25.5,26" stroke-width="1.1" opacity="0.75"/><polyline points="18.5,2 25.5,14 18.5,26" stroke-width="1.1" opacity="0.75"/><polyline points="11.5,2 18.5,14 11.5,26" stroke-width="1.1" opacity="0.75"/><polyline points="4.5,2 11.5,14 4.5,26" stroke-width="1.1" opacity="0.75"/><line x1="4.5" y1="11" x2="1" y2="11" stroke-width="1.8"/><line x1="4.5" y1="17" x2="1" y2="17" stroke-width="1.8"/><line x1="7" y1="14" x2="10" y2="14" stroke-width="1.1" opacity="0.9"/><polyline points="9,12.3 10.8,14 9,15.7" stroke-width="1.1" opacity="0.9"/><line x1="14" y1="14" x2="17" y2="14" stroke-width="1.1" opacity="0.9"/><polyline points="16,12.3 17.8,14 16,15.7" stroke-width="1.1" opacity="0.9"/><line x1="21" y1="14" x2="24" y2="14" stroke-width="1.1" opacity="0.9"/><polyline points="23,12.3 24.8,14 23,15.7" stroke-width="1.1" opacity="0.9"/><line x1="28" y1="14" x2="31" y2="14" stroke-width="1.1" opacity="0.9"/><polyline points="30,12.3 31.8,14 30,15.7" stroke-width="1.1" opacity="0.9"/></svg>`,
    color: T.gold,
    price: "$$$$–$$$$$",
    leadTime: "8–16 weeks (custom); some stock configs 4–6 weeks",
    tagline: "Maximum clear opening. The accordion wall.",
    blurb: "Folding doors — also called bi-fold or accordion doors — consist of multiple panels hinged together that fold to one or both sides of the opening like an accordion. When fully open, they create the widest possible clear span of any door system, with no panels obstructing the opening at all. This is the system most people picture when they imagine a home that fully opens to the outdoors. The panels stack neatly at one or both jambs. Hardware travels on a top track; most modern systems are also bottom-guided for stability on large configurations.",
    howItWorks: "Panels are connected by hinges at their edges. As you push or pull, they fold on themselves and stack. A lead panel — the first panel in the stack — typically has a handle and initiates the fold. Panels travel on a top track and a bottom guide or track. High-end systems like NanaWall use precision German hardware with virtually zero friction regardless of panel weight.",
    configurations: [
      { name: "Single-fold (all panels to one side)", detail: "All panels stack at one jamb. Leaves full open space on the opposite side. Most common configuration." },
      { name: "Bi-parting / center-fold", detail: "Panels split and fold to both sides from the center. Creates symmetrical opening. Common on very wide systems." },
      { name: "Corner fold (L-shape)", detail: "Two walls open simultaneously — panels fold away from a structural corner post. The ultimate indoor-outdoor statement." },
      { name: "Zero Post Corner", detail: "Two walls of folding panels meet at a corner with no structural post — the panels themselves carry the load at the corner junction. Creates a completely unobstructed opening with no vertical element interrupting the view or the flow. Requires careful engineering; available on select systems including NanaWall and LaCantina." },
      { name: "90° and 180° folding", detail: "Panels can fold completely flat against the wall (180°) or stop at 90° for partial opening." },
    ],
    frameOptions: ["Aluminum (most common — structural strength for large panels)", "Aluminum-clad Wood (warm interior, weather-resistant exterior)", "Vinyl (LaCantina, WinDor — budget to mid-range configurations)", "Fiberglass (limited — Marvin Signature)"],
    glassOptions: ["Tempered safety glass (required for all door systems)", "Low-E insulated glass (standard on all premium systems)", "Laminated glass (enhanced acoustic + safety)", "Tinted / privacy glass", "Argon-filled IGUs for enhanced thermal performance"],
    thresholdTypes: [
      { name: "ADA / Low-profile threshold", detail: "Near-flush. Small raised lip only. Best for barefoot indoor-outdoor flow. Required for ADA compliance." },
      { name: "Standard threshold", detail: "Slight step-up. More water-resistant than ADA threshold." },
      { name: "Recessed track (flush floor)", detail: "Track sits flush with finished floor. Maximum visual seamlessness. Requires coordination during rough framing." },
    ],
    pros: ["Maximum clear opening — widest of any system", "Dramatic architectural impact", "Individual panels can be opened partially", "Corner configurations possible", "Can incorporate a swing door 'pass door' within the system"],
    cons: ["Panels stack on one side — reduces usable wall space when open", "Requires clear floor space for outswing if outswing configuration", "More moving parts than sliding systems", "Higher maintenance on hardware vs. sliding", "Panels cannot operate independently (all fold together)"],
    bestFor: ["Indoor-outdoor living rooms and great rooms", "Entertaining and open-plan living", "Clients wanting the 'wow factor' open-wall experience", "Openings 8ft–40ft wide"],
    operatingTip: "For openings under 20ft, a single-fold to one side is simplest. Over 20ft, bi-parting center-fold or multiple stacking configurations are preferred. Always consider where panels stack when open — that wall space becomes temporarily occupied.",
    vendors: ["NanaWall (ultra-premium, widest customization)", "LaCantina (premium, vinyl option)", "WinDor (budget vinyl folding & multi-slide)", "Andersen E-Series Folding", "Marvin Signature Ultimate Bi-Fold", "Milgard Moving Glass Walls"],
    fireNote: "Folding door systems in fire zones require fire-rated glazing and certified hardware. NanaWall and LaCantina both offer fire-rated configurations. Verify rating with building department before specifying.",
    sdContext: "The most requested system in La Jolla, Del Mar, and RSF custom homes. Clients who have seen a NanaWall in a neighbor's home are often already sold — they just need help choosing the right configuration and vendor.",
  },
  {
    id: "liftslide",
    name: "Lift & Slide Door Systems",
    bg: "⬆",
    icon: `<svg width="34" height="28" viewBox="0 0 34 28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="1.5" width="31" height="25" rx="1.5" stroke-width="2.2"/><rect x="3.5" y="3.5" width="13" height="21" rx="0.5" stroke-width="1.3" opacity="0.9"/><rect x="3.5" y="3.5" width="13" height="21" rx="0.5" fill="currentColor" fill-opacity="0.08" stroke-width="0"/><line x1="7" y1="5.5" x2="11" y2="10" stroke-width="1.1" opacity="0.35" stroke-linecap="round"/><line x1="10" y1="5.5" x2="15" y2="11.5" stroke-width="1.1" opacity="0.25" stroke-linecap="round"/><rect x="18.5" y="3.5" width="13" height="21" rx="0.5" stroke-width="1.3" opacity="0.6"/><rect x="18.5" y="3.5" width="13" height="21" rx="0.5" fill="currentColor" fill-opacity="0.05" stroke-width="0"/><line x1="21" y1="5.5" x2="25" y2="10" stroke-width="1" opacity="0.2" stroke-linecap="round"/><line x1="24" y1="5.5" x2="29" y2="11.5" stroke-width="1" opacity="0.15" stroke-linecap="round"/><line x1="15.5" y1="11" x2="15.5" y2="17.5" stroke-width="2" opacity="0.8"/><circle cx="15.5" cy="10.2" r="1.4" fill="currentColor" stroke="none" opacity="0.75"/><circle cx="15.5" cy="18.3" r="1.4" fill="currentColor" stroke="none" opacity="0.75"/><line x1="6" y1="14" x2="9.5" y2="14" stroke-width="1.3" opacity="0.7"/><polyline points="8.2,12.3 10.2,14 8.2,15.7" stroke-width="1.3" opacity="0.8"/><line x1="12" y1="22" x2="12" y2="18.5" stroke-width="1.2" opacity="0.55"/><polyline points="10.2,19.8 12,17.8 13.8,19.8" stroke-width="1.2" opacity="0.6"/></svg>`,
    color: T.slate,
    price: "$$$$–$$$$$",
    leadTime: "10–16 weeks",
    tagline: "European engineering. Monolithic glass. Effortless.",
    blurb: "Lift-and-slide systems are the European luxury standard for large glass openings. Unlike standard sliding doors where panels drag on the track, a lift-and-slide panel lifts slightly off its bottom seal when the handle is turned — compressing the weather seal when closed for a near-perfect seal, then floating nearly frictionlessly on precision ball bearings when operated. Single panels can be 10ft wide × 15ft tall and weigh up to 1,000 lbs, yet move with one finger. The aesthetic is monumental — huge, unbroken sheets of glass creating a wall that moves.",
    howItWorks: "When the handle is turned, a cam mechanism lifts the panel approximately 3–5mm off its bottom seal. The panel now floats on ball-bearing rollers with virtually no friction. Slide it open. Turn the handle back and the panel drops back onto its seal — weather-tight. This lift-and-compress action achieves dramatically better weatherstripping performance than standard sliding doors.",
    configurations: [
      { name: "Single panel + fixed panel", detail: "One large operating panel slides in front of one fixed panel. Classic for openings 8ft–16ft wide. Simplest and most elegant." },
      { name: "Two operating panels (bi-parting)", detail: "Two panels slide toward opposite jambs. Opens from the center. Good for centered openings." },
      { name: "Multiple panels stacking", detail: "3–4 panels — some fixed, some operating — stacking at one end. For very wide openings." },
      { name: "Corner lift-slide", detail: "Two walls of lift-slide meeting at a corner post. The Weiland/Andersen corner configuration is a signature luxury element." },
    ],
    frameOptions: ["Aluminum (Andersen Weiland, NanaWall — ultra-slim profiles)", "Aluminum-clad Wood (Marvin Signature — wood interior warmth)", "All-aluminum thermally broken (for maximum glass area and slim sightlines)"],
    glassOptions: ["Monolithic tempered insulated glass (standard — single large panes)", "Structural laminated glass for panels over 10ft tall", "Low-E triple-pane for cold climates (less relevant in SD)", "Tinted or ceramic frit for solar control on west-facing walls"],
    thresholdTypes: [
      { name: "Lift-and-compress threshold (standard)", detail: "Panel lifts off seal to operate. Near-flush when closed. The defining feature of lift-slide systems." },
      { name: "Flush floor track", detail: "Track recessed to floor level. Available on select systems — requires planning during construction." },
    ],
    pros: ["Best weather seal of any large opening system", "Monolithic glass presence — no visible panel joints", "One-finger operation despite enormous panel weight", "Superior energy performance when closed", "Most impressive single panel sizes available"],
    cons: ["Individual panels are large and heavy — cannot partially open a single panel", "Fewer total configurations vs. folding or multi-slide", "Premium pricing — lift mechanism adds cost", "Requires level, true rough opening (heavy panels are unforgiving)"],
    bestFor: ["Clients who want one massive glass wall panel rather than multiple narrow panels", "Oceanfront and view properties where unbroken sightlines are paramount", "Modern and minimalist architecture — maximum glass, minimum frame", "Openings 8ft–30ft wide"],
    operatingTip: "Lift-and-slide is the right recommendation when the client says 'I want it to look like one big piece of glass.' The panel-width-to-frame ratio is unmatched. If they want 'fully open like the outdoors,' add a second operating panel or combine with a pocket.",
    vendors: ["Andersen Weiland (best in class — up to 15ft tall)", "Marvin Signature Lift & Slide", "NanaWall (select lift-slide configurations)", "Schüco (European specialty — special order)"],
    fireNote: "Large monolithic glass panels in fire zones must be fire-rated glazing. Laminated fire-rated glass is available for lift-slide applications. Verify with manufacturer and local building department.",
    sdContext: "The Weiland lift-slide is the go-to for ultra-luxury La Jolla oceanfront homes. One 10ft × 15ft panel of structural glass framing a Pacific view is a signature Weiland moment. Marvin's lift-slide is the architect-specified version for craftsman and transitional coastal homes.",
  },
  {
    id: "multislide",
    name: "Multi-Slide Door Systems",
    bg: "▥",
    icon: `<svg width="32" height="28" viewBox="0 0 32 28" fill="none" stroke="currentColor" stroke-linecap="round"><rect x="1.5" y="2" width="29" height="24" rx="0.5" stroke-width="2"/><line x1="11.5" y1="2" x2="11.5" y2="26" stroke-width="1.2"/><line x1="21" y1="2" x2="21" y2="26" stroke-width="1.2"/><rect x="3" y="3.5" width="7" height="21" rx="0.3" stroke-width="0.9" opacity="0.7"/><rect x="13" y="3.5" width="7" height="21" rx="0.3" stroke-width="0.9" opacity="0.7"/><rect x="22.5" y="3.5" width="7" height="21" rx="0.3" stroke-width="0.9" opacity="0.7"/><path d="M5,13.5 L8,14.5 L5,15.5" stroke-width="1.3"/><path d="M14.5,13.5 L17.5,14.5 L14.5,15.5" stroke-width="1.3"/></svg>`,
    color: T.teal,
    price: "$$$–$$$$$",
    leadTime: "6–14 weeks",
    tagline: "Panels glide and stack. Clean, effortless, quiet.",
    blurb: "Multi-slide systems consist of multiple large panels that slide on a track and stack behind one another at one or both ends of the opening. Unlike pocket systems, the stacked panels remain visible (though out of the way) when open. Multi-slide is the most popular large-opening system in the current market — it's simpler mechanically than folding, easier to operate, and the large glass panels provide an unbroken glass aesthetic even when closed. Panels can be 3ft to 6ft wide and up to 12ft tall, creating an almost seamless glass wall.",
    howItWorks: "Each panel travels independently on its own track. Multiple tracks are layered front-to-back — the front panel travels furthest, the rear panel moves the shortest distance. When fully open, panels are stacked in a neat row at one side. Premium systems use ball-bearing rollers so that even 500-lb panels glide with one finger of effort.",
    configurations: [
      { name: "Stacking (all to one side)", detail: "All panels glide and stack at one jamb. Most common. Clean look when closed and open." },
      { name: "Bi-parting (split to both sides)", detail: "Panels split from center and stack at both jambs. Creates central opening — great for centered openings." },
      { name: "Stacking with fixed panel", detail: "Some panels fixed, others slide and stack in front of fixed panels. Maximizes glass area." },
      { name: "Offset stacking", detail: "Panels stack in an offset pattern — each panel slightly behind the previous — minimizing stack depth." },
    ],
    frameOptions: ["Aluminum (standard — handles the largest panels)", "Aluminum-clad Wood (Andersen, Marvin — wood interior)", "Fiberglass (Marvin Elevate — coastal performance)"],
    glassOptions: ["Tempered insulated glass (standard)", "Low-E coatings (SolarZone, LoE-366)", "Laminated for acoustic performance", "Floor-to-ceiling structural glass on premium systems", "Tinted for privacy or solar control"],
    thresholdTypes: [
      { name: "Low-profile threshold", detail: "Slight raised lip. Most common on residential multi-slide." },
      { name: "Flush / recessed track", detail: "Track recessed into slab. Completely seamless floor transition. Requires planning during construction." },
      { name: "Lift-and-slide threshold", detail: "Panel lifts slightly off track when operating, compresses the seal when in closed position. Superior weather seal." },
    ],
    pros: ["Simpler operation than folding — panels glide individually", "Large panel sizes — fewer visible vertical frame lines", "Lower maintenance than folding (fewer pivot points)", "Unbroken glass aesthetic when closed", "Individual panels can be opened without operating entire system"],
    cons: ["Stacked panels reduce wall space at one side", "Not as dramatic as folding when fully open (stack is visible)", "Deep jamb pocket needed at stacking end", "Wide systems require careful sub-sill waterproofing"],
    bestFor: ["Modern and contemporary homes where minimal sightlines are key", "Clients wanting ease of operation over full open drama", "Openings 8ft–50ft", "Whole-house glazing packages with consistent aesthetic"],
    operatingTip: "Multi-slide is the right recommendation when the client says 'I want it to look like a glass wall' when closed, and wants individual panel operability. If they say 'I want it completely open,' lean toward pocket or folding.",
    vendors: ["Andersen E-Series MultiGlide (widest — 50ft)", "NanaWall HS/HSW Single Track", "LaCantina Multi-Slide", "Milgard Moving Glass Walls", "Marvin Multi-Slide"],
    fireNote: "Multi-slide systems in fire zones require fire-rated glass and frame certification. Consult manufacturer for specific fire-rated configurations. Some systems offer WUI-compliant configurations.",
    sdContext: "The Andersen MultiGlide at 50ft is a spec favorite for wide-open ocean-view homes in La Jolla Shores and Del Mar. Milgard's multi-slide is the value play for Carmel Valley and Encinitas remodels.",
  },
  {
    id: "pocket_exterior",
    name: "Pocketing Multi-Slide (Exterior)",
    bg: "▶",
    icon: `<svg width="32" height="28" viewBox="0 0 32 28" fill="none" stroke="currentColor" stroke-linecap="round"><line x1="2" y1="2" x2="2" y2="26" stroke-width="2"/><line x1="2" y1="2" x2="30" y2="2" stroke-width="1.5" opacity="0.45"/><line x1="2" y1="26" x2="30" y2="26" stroke-width="1.5" opacity="0.45"/><rect x="2" y="2" width="13" height="24" rx="0.3" stroke-width="1.6"/><rect x="3.5" y="3.5" width="10" height="21" rx="0.3" stroke-width="0.9" opacity="0.7"/><line x1="19" y1="2" x2="19" y2="26" stroke-width="2.2"/><line x1="30" y1="2" x2="30" y2="26" stroke-width="2.2"/><rect x="19" y="2" width="11" height="24" fill="currentColor" opacity="0.08" stroke="none"/><line x1="20" y1="4" x2="28" y2="11" stroke-width="0.9" opacity="0.32"/><line x1="20" y1="11" x2="28" y2="18" stroke-width="0.9" opacity="0.32"/><line x1="20" y1="18" x2="28" y2="25" stroke-width="0.9" opacity="0.32"/><path d="M8,13.5 L11.5,14.5 L8,15.5" stroke-width="1.3"/><line x1="15" y1="14.5" x2="19" y2="14.5" stroke-width="1.1" stroke-dasharray="1.8,1.4" opacity="0.6"/></svg>`,
    color: T.rust,
    price: "$$$$–$$$$$",
    leadTime: "10–18 weeks (wall pocket must be framed in advance)",
    tagline: "The wall disappears. Panels hide completely inside the wall.",
    blurb: "A pocketing multi-slide system is the most seamless large-opening solution available. The panels don't stack visibly — they slide entirely into a pocket built into the wall cavity, completely disappearing from view when open. The result: a pure open connection between interior and exterior with zero visible panels, zero track ends, nothing to interrupt the view or the flow. This is a more complex and expensive installation because the wall pocket must be framed, insulated, and finished during construction. It's difficult to add retroactively without major wall surgery.",
    howItWorks: "A pocket cavity is framed into the wall equal in depth to the number of panels × panel width. The track runs continuously from the opening into the pocket. Panels slide on the track and disappear one-by-one into the wall. A sub-sill waterproofing system is critical to prevent moisture intrusion into the pocket cavity.",
    configurations: [
      { name: "Single-direction pocket", detail: "All panels slide and pocket to one side of the opening. Wall on that side must accommodate the full stack depth." },
      { name: "Bi-parting pocket", detail: "Panels split and pocket into both walls. Opening is perfectly centered and both walls pocket simultaneously." },
      { name: "Pocket + fixed panel", detail: "Some panels fixed, operating panels pocket around them. Used when one jamb wall cannot accommodate full pocket depth." },
    ],
    frameOptions: ["Aluminum (most common for exterior pocket)", "Aluminum-clad Wood (Andersen, LaCantina)", "Thermally broken aluminum (NanaWall, LaCantina premium)"],
    glassOptions: ["Tempered insulated (standard)", "Low-E coatings required for energy code", "Structural glass options on NanaWall pocket systems", "Laminated glass for acoustic performance near roads or pools"],
    thresholdTypes: [
      { name: "Flush recessed track (preferred)", detail: "Track at floor level — completely seamless when open. Requires coordination with slab or sub-floor. This is the system most clients are imagining." },
      { name: "Low-profile threshold", detail: "Small raised track — easier to retrofit. Less seamless but functional." },
    ],
    pros: ["Most seamless solution — panels are completely hidden when open", "Zero visual obstruction — pure open connection to outdoors", "Maximum 'wow' factor — the wall literally disappears", "No panels blocking views or access when open"],
    cons: ["Most expensive system — pocket cavity adds significant framing/cost", "Requires planning during rough framing (very difficult to add later)", "Pocket cavity requires careful waterproofing", "Access to panels for cleaning requires partial opening", "Fewer vendors offer true pocketing exterior systems"],
    bestFor: ["New construction where pocket can be framed in advance", "Full remodels where walls are already open", "Clients who want zero visual interruption when open", "Luxury homes where cost is secondary to the experience"],
    operatingTip: "Always confirm with the contractor that the pocket wall can be framed before specifying a pocket system. Ask about the sub-sill waterproofing plan — moisture in the pocket cavity is the most common failure point on these systems.",
    vendors: ["NanaWall HS Pocket", "LaCantina Pocket Multi-Slide", "Andersen MultiGlide (pocket configuration)", "Milgard (pocket option on select configs)"],
    fireNote: "Pocket systems in fire zones require same fire-rated glass and frame as other large opening systems. Additionally, the pocket cavity itself may require fire-blocking per local code. Verify with building department and fire marshal.",
    sdContext: "The pocket system is what clients in Fairbanks Ranch, Santaluz, and coastal La Jolla want when they say 'I want the wall to just disappear.' It's the top specification for new custom builds. For remodels, confirm pocket framing feasibility before the client falls in love with this option.",
  },
  {
    id: "patio_traditional",
    name: "Traditional Patio / Sliding Glass Doors",
    bg: "⬛",
    icon: `<svg width="32" height="28" viewBox="0 0 32 28" fill="none" stroke="currentColor" stroke-linecap="round"><rect x="1.5" y="2" width="29" height="24" rx="0.5" stroke-width="2"/><line x1="16" y1="2" x2="16" y2="26" stroke-width="1.2"/><rect x="3" y="3.5" width="11.5" height="21" rx="0.3" stroke-width="0.9" opacity="0.8"/><rect x="17.5" y="3.5" width="11.5" height="21" rx="0.3" stroke-width="0.9" opacity="0.42"/><path d="M7,13.5 L10,14.5 L7,15.5" stroke-width="1.3"/></svg>`,
    color: T.sage,
    price: "$$–$$$",
    leadTime: "1–4 weeks (standard); 4–8 weeks (custom sizes)",
    tagline: "The classic. Two panels, one slides. Simple and proven.",
    blurb: "The traditional sliding patio door — two panels side by side, one fixed and one sliding — is the most widely used exterior door system in American residential construction. It's simple, affordable, widely available, and works in virtually any home. The operating panel slides on a bottom track and is guided by a top channel. Modern versions from premium brands like Andersen and Milgard have improved dramatically in energy performance, smooth operation, and frame aesthetics. For a basic bedroom-to-patio connection or secondary outdoor access, the traditional slider remains a practical and cost-effective choice.",
    howItWorks: "Two panels sit in parallel tracks — one fixed, one sliding. The sliding panel rides on rollers at the bottom and is guided (not carried) at the top. The handle engages a latch or hook bolt to secure it when closed. Modern premium rollers are smooth and durable; roller quality varies significantly by brand and price point.",
    configurations: [
      { name: "2-panel (1 fixed, 1 slide)", detail: "Standard. One panel fixed, one slides. Opening is half the total frame width." },
      { name: "3-panel (1 slide, 2 fixed)", detail: "Operating panel centered or to one side. Wider overall unit, same operating width." },
      { name: "4-panel (2 slide, 2 fixed)", detail: "Two operating panels slide toward both sides. Opens more of the unit." },
      { name: "Bypass (2 sliding panels)", detail: "Both panels slide past each other. No fixed panel — maximum flexibility for interior applications." },
    ],
    frameOptions: ["Vinyl (most common — Milgard Tuscany/Trinsic)", "Aluminum-clad Wood (Andersen 400 Series)", "Fiberglass (Marvin Elevate)", "Aluminum (commercial and contemporary applications)"],
    glassOptions: ["Standard Low-E insulated glass", "Tempered safety glass (required)", "Tinted for privacy", "Obscure / frosted for bathroom applications"],
    thresholdTypes: [
      { name: "Standard raised track", detail: "Slight step-up over track. Most common. Functional weather seal." },
      { name: "Low-profile / ADA threshold", detail: "Minimal step. Better for barefoot access and ADA compliance." },
    ],
    pros: ["Most affordable large door option", "Widely available — fast lead times", "Simple operation — no learning curve", "Available in many frame materials and sizes", "Good energy performance on premium brands"],
    cons: ["Maximum opening is only half the total frame width", "Track can collect debris — requires cleaning", "Less architectural impact than folding or multi-slide", "Bottom track is a trip hazard vs. lift-slide or flush systems"],
    bestFor: ["Secondary outdoor access points", "Budget-conscious projects", "Master bedroom to patio connections on smaller scales", "Any opening where simplicity and value are the priority"],
    operatingTip: "If a client asks for a 'nicer slider,' the answer is Andersen 200 Series or Milgard Trinsic. If they want significantly more opening width, move them to a multi-slide system conversation.",
    vendors: ["Milgard (Trinsic, Tuscany, Ultra)", "Andersen (200 Series, 400 Series)", "Marvin (Essential, Elevate)", "JELD-WEN (mid-range value)"],
    fireNote: "Standard sliding doors are available with fire-rated glass for WUI zones. Specify tempered + fire-rated IGU. Verify frame fire rating with manufacturer when required.",
    sdContext: "The Milgard Trinsic slider in black is the standard for Carmel Valley and Scripps Ranch master bedroom patio connections. Fast ETAs and competitive pricing make it a strong option for builders doing multiple units.",
  },
];

const paintVsStain = {
  paint: {
    label: "Paint Grade",
    color: T.slate,
    blurb: "Paint grade doors are made from wood species, composites, or MDF that are intended to be painted — not stained. The door may have small knots, finger joints, or slight grain variations that will be hidden under paint. Paint grade is the right choice when: you want a specific color, you have a modern or minimal interior, or you're doing a whole-house package and want consistency without the cost of stain grade.",
    when: ["Modern and contemporary homes", "Whole-house budget packages", "Any color other than natural wood", "Matching painted millwork and trim"],
  },
  stain: {
    label: "Stain Grade",
    color: T.rust,
    blurb: "Stain grade doors are made from select wood — clear grain, no knots, carefully matched for color and figure. They're meant to be stained to show off the natural wood beauty. Stain grade costs more because the material selection is more rigorous and the finishing process is more complex. It's the right choice when wood warmth and natural character are central to the design vision. Common in craftsman, traditional, and transitional homes.",
    when: ["Natural wood aesthetic is central to the design", "Traditional, craftsman, and warm interiors", "When doors are a design focal point", "Matching stained millwork, floors, or cabinetry"],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// VENDOR DATA (condensed)
// ═══════════════════════════════════════════════════════════════════════════════
const vendors = {
  windows_doors: [
    { id:"nanawall", heroImage:"/nw-aluminum-640-fairway-edge-dining-room-21.avif", sells:["Folding Glass Walls","Big Door Systems"], website:"https://www.nanawall.com", name:"NanaWall", logo:"NW", color:T.gold, tagline:"The Glass Wall Pioneer", tier:"Ultra Premium", tierColor:T.gold, origin:"Corte Madera CA HQ / Solarlux German engineering", overview:"The originator of folding glass walls — architects write NanaWall on the spec sheet first. SL60 for residential remodels, Generation 4 for architect-specified luxury builds.", productLines:[
      {name:"NW Aluminum 640 — Gen4 Folding",type:"Folding/Bi-fold",material:"Thermally Broken Aluminum",description:"Flagship Generation 4 aluminum folding wall. Industry's slimmest profile at 3⁷⁄₈\" (99mm) panel intersection. Thermally broken with Bionic Turtle® technology. Gothic Arch stainless steel rollers. FourFold/SixFold panel sets allow unlimited widths. U-value 0.24 (triple LoE) / 0.34 (double LoE). Inswing or outswing. 50 standard powder coat and anodized finishes — Steel Effect (SE) colors available for a classic steel look in aluminum.",uniqueFeatures:["3⁷⁄₈\" (99mm) slimmest profile in industry","Bionic Turtle® concealed thermal break + locking channel","Gothic Arch stainless steel rollers — effortless operation","FourFold/SixFold sets — unlimited system widths","50 standard finishes + Steel Effect colors","Water rated to 9 psf (Performance Sill)","U-value 0.24 triple LoE / 0.34 double LoE"],maxWidth:"Unlimited",maxHeight:"10ft 2in",priceRange:"$$$$$",brochureUrl:"https://www.nanawall.com/sites/default/files/resources/2023-10/NanaWall-Generation-4-Brochure.pdf"},
      {name:"NW Aluminum 840 — Gen4 Folding (Tall)",type:"Folding/Bi-fold",material:"Thermally Broken Aluminum",description:"Generation 4 aluminum folding wall engineered for taller heights — up to 11ft 6in without a swing panel. Same 3⁷⁄₈\" slim profile as the 640 but with superior thermal performance (U-0.20 triple LoE). The system for monumental openings where height is as important as width. 3ft 7in max panel width. Inswing or outswing.",uniqueFeatures:["Up to 11ft 6in height (without swing panel)","3⁷⁄₈\" (99mm) same slim profile as 640","Best-in-class U-value 0.20 triple LoE / 0.31 double LoE","3ft 7in max panel width","Inswing or outswing","Water rated to 9 psf (Performance Sill)"],maxWidth:"Unlimited",maxHeight:"11ft 6in",priceRange:"$$$$$",brochureUrl:"https://www.nanawall.com/sites/default/files/resources/2023-10/NanaWall-Generation-4-Brochure.pdf"},
      {name:"NW Wood 540 — Gen4 Folding",type:"Folding/Bi-fold",material:"Wood",description:"Generation 4 premium wood folding wall. Quadruple laminated, cross-grained sustainably harvested wood frame — delivers exceptional energy efficiency (U-0.19 triple LoE, best in the Gen4 lineup) with a rich warm aesthetic. 5¹¹⁄₁₆\" (144mm) panel profile. 5 standard wood species: Sapeli Mahogany, Pine, Meranti, Western Hemlock, Red Grandis. Up to 9ft 10in height. Inswing or outswing.",uniqueFeatures:["U-value 0.19 triple LoE — best thermal in Gen4 lineup","Quadruple laminated cross-grained sustainably harvested wood","5 wood species: Mahogany, Pine, Meranti, Hemlock, Red Grandis","5¹¹⁄₁₆\" (144mm) profile","FourFold/SixFold unlimited widths","Water rated to 9 psf"],maxWidth:"Unlimited",maxHeight:"9ft 10in",priceRange:"$$$$$",brochureUrl:"https://www.nanawall.com/sites/default/files/resources/2023-10/NanaWall-Generation-4-Brochure.pdf"},
      {name:"NW Clad 740 — Gen4 Folding",type:"Folding/Bi-fold",material:"Aluminum-clad Wood",description:"Generation 4 aluminum-clad wood folding wall. Solid wood core with durable clip-on aluminum cladding on the exterior — warm wood interior, weather-resistant aluminum outside. 5¹³⁄₁₆\" (148mm) panel profile. U-value 0.20 triple LoE. Same sustainable wood core as the NW Wood 540. Up to 9ft 10in height. The system for clients who want interior wood warmth with exterior aluminum durability.",uniqueFeatures:["Solid wood core with clip-on aluminum cladding","U-value 0.20 triple LoE / 0.29 double LoE","5¹³⁄₁₆\" (148mm) profile","Warm wood interior — same species options as Wood 540","FourFold/SixFold unlimited widths","Water rated to 9 psf"],maxWidth:"Unlimited",maxHeight:"9ft 10in",priceRange:"$$$$$",brochureUrl:"https://www.nanawall.com/sites/default/files/resources/2023-10/NanaWall-Generation-4-Brochure.pdf"},
      {name:"NW Reinforced 647/847 — Midrise/High-Rise",type:"Folding/Bi-fold",material:"Reinforced Aluminum",description:"Generation 4 aluminum folding systems engineered for the higher windload requirements of midrise and high-rise buildings. The 647 carries a DP rating of +/-70 psf (CW-PG35); the 847 reaches +/-85 psf (CW-PG55). 5¼\" (133mm) reinforced profiles. The 847 reaches 11ft 6in height. Thermally broken. For mixed-use, multi-story residential, and commercial applications where standard residential systems are insufficiently rated.",uniqueFeatures:["NW 647: DP +/-70 psf / CW-PG35 — midrise rating","NW 847: DP +/-85 psf / CW-PG55 — high-rise rating","5¼\" (133mm) reinforced profile","Thermally broken","Heights to 11ft 6in (847 without swing panel)","Water rated to 9 psf Performance Sill"],maxWidth:"Unlimited",maxHeight:"11ft 6in",priceRange:"$$$$$",brochureUrl:"https://www.nanawall.com/sites/default/files/resources/2023-10/NanaWall-Generation-4-Brochure.pdf"},
      {name:"NW Acoustical 645/545 — Interior",type:"Interior Acoustical Partition",material:"Aluminum / Wood",description:"Generation 4 interior acoustical folding glass wall systems. The aluminum NW Acoustical 645 achieves up to Unit STC 45; the wood NW Acoustical 545 achieves up to Unit STC 41. Both are interior-only systems designed for conference rooms, hospitality spaces, and open-plan residential areas where acoustic separation and visual transparency are both required. Aluminum version reaches 11ft 6in; wood version up to 9ft 10in.",uniqueFeatures:["NW 645 (aluminum): up to Unit STC 45","NW 545 (wood): up to Unit STC 41","Interior systems only — not exterior weather-rated","Aluminum: 3⁷⁄₈\" (99mm) slimmest profile","Wood: 5¹¹⁄₁₆\" (144mm) warm wood aesthetic","FourFold/SixFold unlimited widths"],maxWidth:"Unlimited",maxHeight:"11ft 6in",priceRange:"$$$$$",brochureUrl:"https://www.nanawall.com/sites/default/files/resources/2023-10/NanaWall-Generation-4-Brochure.pdf"},
      {name:"NW SL60 — Residential Folding",type:"Folding/Bi-fold",material:"Thermally Broken Aluminum",description:"NanaWall's residential-focused aluminum folding glass wall — engineered in Germany, made in the USA. Combines NanaWall innovation with a more accessible price point than the Generation 4 platform. Thermally broken, floor supported, tested to 20,000 open/close cycles (equivalent to 27 years of use). U-value 0.35 double glazed / 0.25 triple glazed. Four sill options including the barefoot-friendly Low Profile Saddle Sill. Inswing or outswing. 50 standard powder coat finishes. Configurations include open corner, folding windows, window/door combos, and simulated divided lites. T24 compliant glass available. The entry point into the NanaWall lineup for residential renovation, remodel, and new construction projects.",uniqueFeatures:["Engineered in Germany, Made in USA — NanaWall quality at accessible price","U-value 0.25 with triple glazing / 0.35 double glazed","Low Profile Saddle Sill — barefoot-friendly indoor-outdoor transition","4 sill options: Low Profile Saddle, UniverSILL, Hybrid, High Performance","Tested to 20,000 cycles — 27 years equivalent","Inswing or outswing","Open corner, folding window, and window/door combo configurations","50 standard powder coat finishes + custom color matching","T24 compliant glass option available","Tamper-resistant concealed multipoint locks"],maxWidth:"Unlimited",maxHeight:"Custom",priceRange:"$$$$",brochureUrl:"https://www.nanawall.com/sites/default/files/resources/2025-08/nanawall-SL60-brochure.pdf"},
      {name:"HS/HSW — Single Track Sliding",type:"Multi-Slide",material:"Aluminum",description:"Ultra-slim single-track sliding glass wall with panel stacking or full pocket. Frameless corner and 3D corner configurations available. The NanaWall sliding system for projects where a folding wall is not appropriate — large horizontal spans, frameless corners, ultra-contemporary minimal aesthetic.",uniqueFeatures:["Frameless corner options","3D corner configurations","Panel stacking or true pocket","Minimal sightlines"],maxWidth:"50ft+",maxHeight:"14ft",priceRange:"$$$$$"},
      {name:"CW — Frameless Glass Wall",type:"Frameless",material:"Structural Glass Wall",description:"Near-invisible structural glass wall framing. Maximum transparency — virtually no frame visible. ADA compliant. Custom shapes. The system when the glass itself IS the architecture.",uniqueFeatures:["Virtually frameless","ADA compliant","Custom shapes and configurations","Maximum transparency"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$$"}
    ],frameMaterials:["Thermally Broken Aluminum","Reinforced Aluminum","Wood","Aluminum-clad Wood","Structural Glass Wall"],finishes:[{name:"Matte Black",swatch:"#1A1A1A"},{name:"Dark Bronze",swatch:"#3d2b1f"},{name:"Silver Anodized",swatch:"#c0c0c0"},{name:"White",swatch:"#f0ede6"},{name:"50 Standard Colors",swatch:"linear-gradient(135deg,#C4956A,#3A6898)"},{name:"Steel Effect SE",swatch:"linear-gradient(135deg,#3A3A3A,#707878)"}],differentiators:["Generation 4 — 8 systems across aluminum, wood, clad, reinforced, and acoustical","SL60 — residential entry point with NanaWall quality at a more accessible price","Industry's slimmest profiles — 3⁷⁄₈\" (99mm) aluminum, 5¹¹⁄₁₆\" (144mm) wood","Bionic Turtle® concealed thermal break — security + efficiency in one profile","Gothic Arch stainless steel rollers — smoothest operation in class","FourFold/SixFold panel sets — unlimited system widths","50 standard finishes + Steel Effect SE colors for steel-look in aluminum","Midrise/high-rise rated systems (DP +/-85 psf) for commercial applications","Interior acoustical systems to Unit STC 45"],idealFor:["Architect-specified luxury custom homes in La Jolla, RSF, Del Mar","Projects where the glass wall IS the design centerpiece","Contemporary, modern, and transitional architecture","Residential renovation/remodel wanting NanaWall quality (SL60)","Mixed-use and commercial where high windload rating is required","Interior acoustic partition applications"],limitations:["Highest price in category — budget should be set before specifying","10–16 week lead times on most configurations","Requires experienced NanaWall-certified installer","Folding panels operate as linked chains — not independently slideable"],sdNotes:"NanaWall's key advantage is its bottom-rolling track — it hangs from below rather than a header above, requiring fewer structural modifications and making it easier to retrofit into existing homes. Commonly specified on architect-designed custom homes in La Jolla and Rancho Santa Fe where engineering constraints make top-hung systems impractical." },
    { id:"lacantina", heroImage:"/lacantina-hero.jpg", sells:["Folding Glass Walls","Big Door Systems","California Rooms","Patio Doors"], website:"https://www.lacantinadoors.com", name:"LaCantina", logo:"LC", color:T.teal, tagline:"The Indoor-Outdoor Specialist", tier:"Premium", tierColor:T.teal, origin:"Designed & made in California / JELD-WEN", overview:"California-made folding, multi-slide, and swing door systems in 6 materials including vinyl — the go-to for indoor-outdoor living at the $20K–$60K range. Matched 2¾\" profiles across all systems is the key differentiator.", productLines:[
      {name:"Folding — Aluminum",type:"Folding/Bi-fold",material:"Aluminum",description:"LaCantina's entry-level folding system. Clean contemporary 2¾\" stile profile, top hung for ease of operation and longevity. Inswing or outswing. Up to 65' wide, 10' tall, max panel width 39\". Up to 20 panels (10 each direction). U-value 0.48 standard / achieves 0.32 or less with LoE-366 argon glazing upgrade. Concealed multi-point locking. Zero-post corner and window/door combination options. HVHZ impact-rated version available.",uniqueFeatures:["Up to 65ft wide, 10ft tall","20 panels (10 each direction)","Top hung — ease of operation + longevity","Zero-post corner configurations","HVHZ impact-rated version available","Inswing or outswing","U-0.32 or better with LoE-366 argon upgrade"],maxWidth:"65ft",maxHeight:"10ft",priceRange:"$$$",brochureUrl:"https://powersproducts.com/wp-content/uploads/2023/02/la-cantina-sliding-doors-product-brochure.pdf"},
      {name:"Folding — Aluminum Thermally Controlled",type:"Folding/Bi-fold",material:"Thermally Broken Aluminum",description:"Step-up aluminum folding system with thermal breaks throughout and a proprietary core-and-fascia design enabling split interior/exterior finish colors. 2 15/16\" stile profile. U-value 0.37 standard; achieves 0.32 or less with LoE-366 argon upgrade. Best choice when energy performance matters but budget doesn't extend to clad wood.",uniqueFeatures:["Thermally broken — improved energy performance","Split interior/exterior finish colors","2 15/16\" stile profile","U-0.37 / achieves 0.32 or better with upgrade","Same configurations as aluminum system"],maxWidth:"65ft",maxHeight:"10ft",priceRange:"$$$$",brochureUrl:"https://powersproducts.com/wp-content/uploads/2023/02/la-cantina-sliding-doors-product-brochure.pdf"},
      {name:"Folding — Contemporary Clad",type:"Folding/Bi-fold",material:"Aluminum-clad Wood",description:"LaCantina's most energy-efficient folding system. Low-maintenance aluminum exterior with natural wood interior warmth. Best U-value in the folding lineup at 0.31 standard — achieves 0.32 or better standard with LoE-366 argon. Narrow 2 15/16\" clad profile. In-stock in VG Fir or Sapele Mahogany; optional Quarter Sawn White Oak, Pine, Black Walnut, Clear Alder. The system for architect-specified residential projects wanting wood interior and aluminum exterior durability.",uniqueFeatures:["U-0.31 — most energy efficient LaCantina folding system","Wood interior: VG Fir, Sapele Mahogany standard","Optional oak, pine, walnut, alder","Low-maintenance aluminum exterior","2 15/16\" slim clad profile","Zero-post corner configurations"],maxWidth:"65ft",maxHeight:"10ft",priceRange:"$$$$",brochureUrl:"https://powersproducts.com/wp-content/uploads/2023/02/la-cantina-sliding-doors-product-brochure.pdf"},
      {name:"Folding — Vinyl",type:"Folding/Bi-fold",material:"Vinyl",description:"A vinyl folding door option for clients who need vinyl continuity with their window package. Matches popular vinyl window packages. Excellent thermal performance (U-0.34 with LoE-366 argon standard). 2 15/16\" stile profile. Good for home renovations and new construction where vinyl window continuity is desired. Available in white and tan.",uniqueFeatures:["Vinyl folding door — matches vinyl window packages","U-0.34 with LoE-366 argon standard","Matches vinyl window packages","Ideal for home renovation continuity","Available in white or tan"],maxWidth:"Custom",maxHeight:"10ft",priceRange:"$$$",brochureUrl:"https://powersproducts.com/wp-content/uploads/2023/02/la-cantina-sliding-doors-product-brochure.pdf"},
      {name:"Multi-Slide — Stacking & Pocket",type:"Multi-Slide / Pocket",material:"Aluminum / Thermally Broken / Clad Wood",description:"LaCantina's multi-slide class combines the aesthetics of a lift-slide with the value of a multi-slide. Individual panels up to 8' wide and 12' tall (max 60 sq ft of glass per panel). Up to 12 panels, 6 in each direction. Stacking and full pocket configurations. Available in Aluminum (U-0.48), Aluminum Thermally Controlled (U-0.46), Aluminum Wood (U-0.41), and Contemporary Clad (U-0.34). AAMA-certified low-profile acetal wheels. Same narrow 2¾\" profiles as folding system — perfect match for mixed folding/sliding projects.",uniqueFeatures:["Panels up to 8ft wide × 12ft tall","12 panels (6 each direction)","Full pocket configurations available","U-0.34 with Contemporary Clad","AAMA-certified ACETAL wheels — quiet, smooth operation","Matches folding door profiles exactly","Flush sill option"],maxWidth:"Custom",maxHeight:"12ft",priceRange:"$$$$",brochureUrl:"https://powersproducts.com/wp-content/uploads/2023/02/la-cantina-sliding-doors-product-brochure.pdf"},
      {name:"Swing — Single & French Doors",type:"Swing Door",material:"Aluminum / Clad Wood / Wood",description:"LaCantina swing doors use the same narrow stile/rail profiles as the folding and multi-slide systems — enabling a fully matched complete door package across an entire project. Up to 7' wide, 10' tall, max panel width 42\". Available in 5 materials. U-values: Aluminum 0.55, Aluminum TC 0.53, Aluminum Wood 0.40, Contemporary Clad 0.33, Wood 0.31. Hidden twin bolt lock for minimal aesthetic. Heavy-duty architectural stainless hinges for large panel weights. Inswing and outswing.",uniqueFeatures:["Matches folding + multi-slide profiles — complete door package","Up to 7ft wide, 10ft tall","5 material options","Hidden twin bolt lock — clean minimal aesthetic","Heavy-duty architectural stainless hinges","Inswing and outswing"],maxWidth:"7ft",maxHeight:"10ft",priceRange:"$$$–$$$$",brochureUrl:"https://powersproducts.com/wp-content/uploads/2023/02/la-cantina-sliding-doors-product-brochure.pdf"}
    ],frameMaterials:["Extruded Aluminum","Thermally Broken Aluminum","Aluminum-clad Wood","Wood","Vinyl"],finishes:[{name:"Shadow Black",swatch:"#1A1A1A"},{name:"White",swatch:"#f0ede6"},{name:"Bronze Anodized",swatch:"#3d2b1f"},{name:"Clear Anodized",swatch:"#a0a8a8"},{name:"Custom Color",swatch:"linear-gradient(135deg,#7A5A3A,#3A6898)"}],differentiators:["Only major brand offering vinyl folding door","All systems share matching 2¾\" profiles — complete door package from one brand","65ft wide folding systems — widest in class","Panels up to 8ft wide × 12ft tall on multi-slide","6 material options across folding, multi-slide, and swing","HVHZ impact-rated folding available","10-year industry-leading warranty","Designed and manufactured in California"],idealFor:["High-end residential remodels wanting matched folding + sliding + swing from one brand","Projects needing vinyl folding to match vinyl window package","Contemporary architecture — San Diego custom builders","Value vs. NanaWall when budget matters","Mixed-material projects: aluminum folding with clad wood swing"],limitations:["Less architect-prestige than NanaWall at ultra-luxury level","Aluminum (non-TC) system has relatively high U-value (0.48)","Wood system not available in multi-slide"],sdNotes:"The most popular folding and sliding glass wall brand in San Diego homes. If you want to open your living room to the backyard or pool, LaCantina is likely what your neighbors have. Available in aluminum, wood, and vinyl — making it accessible at multiple price points." },
    { id:"andersen", heroImage:"/andersen-hero.jpeg", sells:["Windows","Patio Doors","Big Door Systems"], website:"https://www.andersenwindows.com", name:"Andersen", logo:"AW", color:T.slate, tagline:"The Trusted All-Rounder", tier:"Premium", tierColor:T.slate, origin:"Family-owned, Bayport MN — 120+ years", overview:"America's largest window and door manufacturer. Strong whole-house continuity from 100 Series Fibrex® to Weiland ultra-luxury lift-slide. MultiGlide is the widest sliding wall at any price point.", productLines:[{name:"E-Series",type:"Windows / Patio Doors / Multi-Slide / Folding",material:"Alum-clad Wood/Fibrex®",description:"Widest sliding glass wall — up to 50ft. Ball-bearing rollers, panels to 500 lbs.",uniqueFeatures:["50ft system width","50+ color options","True pocket"],maxWidth:"50ft",maxHeight:"12ft",priceRange:"$$$$",brochureUrl:"https://dolanlumber.com/wp-content/uploads/2025/08/E-Series-Consumer-Brochure.pdf"},{name:"E-Series Folding Outswing",type:"Folding",material:"Alum-clad Wood",description:"Outswing preserves interior floor space.",uniqueFeatures:["Outswing option","Matches E-Series windows"],maxWidth:"30ft",maxHeight:"10ft",priceRange:"$$$$"},{name:"400 Series",type:"Windows & Patio Doors",material:"Alum-clad Wood/Fibrex®",description:"Flagship window line. 50+ exterior colors.",uniqueFeatures:["50+ colors","Fibrex® composite","Lifetime glass warranty"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$–$$$$",brochureUrl:"https://www.hwconstruction.com/hubfs/Website%20(DO%20NOT%20DELETE)/Exterior/windows/Andersen/Andersen%20Windows%20400%20Series%20Brochure.pdf"},{name:"A-Series",type:"Windows & Doors",material:"Alum-clad Wood / Fibrex®",description:"Andersen's architect-grade premium line. The most customizable Andersen product — virtually unlimited sizes, shapes, and color combinations. Wood interior warmth with durable clad exterior. Covers the full range: casement, awning, double-hung, gliding, specialty, and patio doors. The go-to when a project demands exact custom sizing or a one-of-a-kind design detail that the 400 Series can't accommodate.",uniqueFeatures:["Virtually unlimited custom sizes","50+ exterior colors","Wood interior options","Full operating style range","Architect-specified custom configurations"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$–$$$$$",brochureUrl:"https://eastridgesupply.com/wp-content/uploads/Andersen-A-Series_Consumer_Brochure.pdf"},{name:"Weiland LiftSlide",type:"Lift & Slide",material:"Aluminum",description:"Ultra-luxury lift-and-slide. Panels to 10ft×15ft.",uniqueFeatures:["Panels up to 10ft wide","Lift mechanism","Monolithic presence"],maxWidth:"Custom",maxHeight:"15ft",priceRange:"$$$$$",brochureUrl:"https://www.prioritydoorwindow.com/wp-content/uploads/2016/01/Weiland-Brochure.pdf"},{name:"100 Series — Fibrex® Composite",type:"Windows & Patio Doors",material:"Fibrex® Composite",description:"Andersen's smart alternative to vinyl — made from Fibrex® composite material (40% reclaimed wood fiber + thermoplastic polymer). 2x stronger than vinyl, withstands temperatures up to 150°F without warping, finish is 12x thicker than painted vinyl and never needs painting. Available in 5 exterior colors including black and dark bronze — colors richer and darker than typical vinyl. Product types: single-hung, gliding, casement, awning, gliding patio doors, and specialty/fixed. Glass options include Low-E, SmartSun™, and HeatLock® coating for southern-climate solar control. Transferable warranty: 20 years on glass, 10 years on non-glass parts — carries full value to next owner. ENERGY STAR v6.0 certified.",uniqueFeatures:["Fibrex® composite — 2x stronger than vinyl, never warps","Withstands 150°F — safe in dark colors in San Diego sun","12x thicker finish than painted vinyl — no painting ever","40% reclaimed wood fiber — LEED-contributing, sustainable","5 colors including black and dark bronze","Transferable 20-yr glass / 10-yr non-glass warranty","Low-E SmartSun™ glass — ideal for SD southern-exposure windows","Full range: single-hung, gliding, casement, awning, patio door, specialty"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$–$$$",brochureUrl:"https://eastridgesupply.com/wp-content/uploads/Andersen-100_Series_Consumer_Brochure.pdf"}],frameMaterials:["Aluminum-clad Wood","Fibrex® Composite","Extruded Aluminum"],finishes:[{name:"Black",swatch:"#1A1A1A"},{name:"Dark Bronze",swatch:"#3d2b1f"},{name:"Terratone",swatch:"#7a5a3a"},{name:"Sandtone",swatch:"#5A4A30"},{name:"White",swatch:"#f0ede6"},{name:"50+ Colors (E-Series)",swatch:"linear-gradient(135deg,#e83,#3e8)"}],differentiators:["MultiGlide — widest in market at 50ft","100 Series Fibrex® — 2x stronger than vinyl, never warps, never paints","50+ exterior colors on E-Series","Weiland lift-slide for monumental walls","Best whole-house package continuity — budget to ultra-luxury in one brand","Transferable 20-year glass warranty on 100 Series"],idealFor:["Whole-house replacement packages","100 Series: vinyl-replacement clients wanting stronger, darker-color options","Traditional to transitional architecture","Clients wanting color options","San Diego heat — SmartSun™ glass for south/west exposures"],limitations:["Aluminum-clad wood needs maintenance","Higher price than Milgard on like-for-like vinyl comparison","100 Series not for large-format opening systems"],sdNotes:"One of the most trusted window brands in America with a product for every budget — from affordable Fibrex® composite to ultra-luxury lift-slide systems. If you want black window frames without paying premium prices, the 100 Series is worth a close look. Strong warranty and wide local availability." },
    { id:"marvin", heroImage:"/marvin-hero.avif", sells:["Windows","Patio Doors","Big Door Systems"], website:"https://www.marvin.com", name:"Marvin", logo:"MV", color:T.rust, tagline:"The Craftsman's Choice", tier:"Luxury", tierColor:T.rust, origin:"Family-owned since 1912, Warroad MN", overview:"The architect's preferred spec for high-end residential. Coastal stainless hardware program makes it the definitive choice for San Diego waterfront properties.", productLines:[{name:"Signature Ultimate",type:"Windows / Patio Doors / Folding Doors / Multi-Slide / Lift & Slide",material:"Alum-clad Wood",description:"Flagship folding door. Wood interior, coastal stainless option.",uniqueFeatures:["Coastal stainless hardware","Custom paint match","Hurricane rated"],maxWidth:"30ft",maxHeight:"10ft",priceRange:"$$$$$",brochureUrl:"https://marvinbyeldredge.com/wp-content/uploads/marvin-ultimate-collection-catalog.pdf"},{name:"Elevate",type:"Windows & Patio Doors",material:"Ultrex® Fiberglass + Wood",description:"Ultrex® exterior (8x stronger than vinyl), wood interior.",uniqueFeatures:["Ultrex® fiberglass","Never repaints","SolarZone glass"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$$",brochureUrl:"https://marvinbyeldredge.com/wp-content/uploads/marvin-elevate-collection-catalog.pdf"},{name:"Essential",type:"Windows & Patio Doors",material:"Ultrex® Fiberglass",description:"All-fiberglass. Entry-level Marvin, full Marvin quality.",uniqueFeatures:["Paintable","Most affordable Marvin"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$",brochureUrl:"https://marvinbyeldredge.com/wp-content/uploads/marvin-essential-collection-catalog.pdf"}],frameMaterials:["Ultrex® Fiberglass","Aluminum-clad Wood"],finishes:[{name:"Black",swatch:"#1A1A1A"},{name:"White",swatch:"#f0ede6"},{name:"Ebony",swatch:"#2a2020"},{name:"Raw Linen",swatch:"#3A3020"},{name:"Custom Paint",swatch:"linear-gradient(135deg,#C4956A,#8FA8C8)"}],differentiators:["Coastal stainless hardware — for salt-air environments","Ultrex® fiberglass — 8x stronger than vinyl","Custom paint match any color","Family-owned 110+ years"],idealFor:["Coastal SD properties","Traditional/craftsman/transitional","Architect-specified luxury builds"],limitations:["Premium pricing","Wood interiors need care","Fewer frameless options"],sdNotes:"A favorite among architects and designers for coastal San Diego homes. Known for beautiful wood interiors, exceptional coastal performance, and a full program designed specifically for salt-air environments. If you're within a mile of the water, Marvin's coastal hardware package is worth specifying." },
    { id:"pella", heroImage:"/pella-hero.jpg", sells:["Windows","Patio Doors"], website:"https://www.pella.com", name:"Pella", logo:"PW", color:T.ember, tagline:"The Design-Forward Mid-Premium All-Rounder", tier:"Premium", tierColor:T.ember, origin:"Family-owned, Pella IA — 100+ years", overview:"Recognized name with real design depth — between-the-glass blinds, Impervia fiberglass, and Reserve wood lines. Good when clients arrive with brand familiarity and strong SD dealer support.", productLines:[{name:"Architect Series — Folding/Sliding",type:"Multi-Slide / Folding",material:"Alum-clad Wood / Aluminum",description:"Large-format folding and sliding door systems. Less common than NanaWall/LaCantina in SD but available for whole-house Pella continuity.",uniqueFeatures:["Whole-house continuity","Aluminum or wood clad","Custom configurations"],maxWidth:"30ft",maxHeight:"10ft",priceRange:"$$$$"},{name:"Reserve — Contemporary",type:"Windows & Doors",material:"Alum-clad Wood",description:"Contemporary take on the Reserve line. Slimmer sightlines, modern profiles, wood interior warmth with aluminum-clad exterior.",uniqueFeatures:["Contemporary profiles","Slim sightlines","Wood interior"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$$",brochureUrl:"https://bureshhomesolutions.com/wp-content/uploads/2023/08/Pella-Reserve-Windows.pdf"},{name:"Reserve — Wood",type:"Windows & Doors",material:"Alum-clad Wood",description:"Luxury aluminum-clad wood line. Interior wood warmth, durable clad exterior. Competes with Andersen E-Series.",uniqueFeatures:["Interior wood warmth","Custom sizes","Architect-specified"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$$",brochureUrl:"https://adkinsandsonswindows.com/wp-content/uploads/2024/09/Pella-Reserve-Traditional-2024-3.pdf"},{name:"Impervia — Fiberglass",type:"Windows & Doors",material:"Fiberglass",description:"Pella's flagship fiberglass line. Paintable, strong coastal performance, excellent for San Diego's salt-air zones. Competitive with Milgard Ultra.",uniqueFeatures:["Paintable any color","Stronger than vinyl","Salt-air rated"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$–$$$$",brochureUrl:"https://windowinstallationpittsburgh.com/wp-content/uploads/2022/02/Pella-Impervia-2.0-2021.pdf"},{name:"Pella 250 Series — Vinyl",type:"Windows",material:"Vinyl",description:"Entry-level vinyl. Good thermal performance, clean profiles. Best for budget-managed projects.",uniqueFeatures:["ENERGY STAR rated","Affordable","Full range of operating styles"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$",brochureUrl:"https://robertsrestorations.com/wp-content/uploads/2022/05/Pella-250-Series-Brochure.pdf"}],frameMaterials:["Vinyl","Fiberglass","Aluminum-clad Wood"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Black",swatch:"#1A1A1A"},{name:"Bronze",swatch:"#3d2b1f"},{name:"Putty",swatch:"#c8b89a"},{name:"Designer Colors",swatch:"linear-gradient(135deg,#8FA8C8,#C87A4A)"}],differentiators:["Between-the-glass blinds/shades — unique convenience feature","Strong homeowner brand recognition","Impervia fiberglass competitive with Milgard Ultra","Full range from budget vinyl to luxury wood","Good dealer support in Southern California"],idealFor:["Homeowners who arrive with Pella brand familiarity","Whole-house continuity packages mid-to-premium","Clients wanting between-the-glass blinds for privacy without cleaning"],limitations:["Folding door systems less specialized than NanaWall/LaCantina","Reserve wood requires maintenance","Less architect-specified than Marvin in ultra-luxury"],sdNotes:"A well-known brand with a genuinely useful feature: between-the-glass blinds and shades built into the window frame. No dusting, no cords — great for privacy near neighbors or busy streets. Their Impervia fiberglass line is a strong choice for coastal homes that need low maintenance." },

    { id:"weathershield", heroImage:"/weathershield-hero.jpg", sells:["Windows","Patio Doors"], website:"https://www.weathershield.com", name:"Weather Shield", logo:"WS", color:T.plum, tagline:"The Mountain & Coastal Luxury Wood Specialist", tier:"Luxury", tierColor:T.plum, origin:"Medford WI — family-owned since 1955", overview:"Family-owned Wisconsin manufacturer with 150+ exterior colors and true custom specialty shapes. Less recognized than Andersen or Marvin — but the same quality tier at a competitive price.", productLines:[{name:"Signature Series",type:"Windows & Patio Doors",material:"Aluminum-clad Wood",description:"Weather Shield's classic aluminum-clad wood line — the core of what they've built for 70 years. Covers the full range: double hung, casement, awning, slider, specialty shapes, sliding patio doors, and hinged patio doors. Tricore™ frame technology with welded aluminum corners and a multi-chambered composite sub-frame for thermal performance. Pine wood interior standard; factory-finished white, black, or stained options. AAMA 2605 premium exterior paint. 20-year warranty, 30-year anti-rot on clad. Zo-e-shield® glazing system for energy efficiency.",uniqueFeatures:["Full window & door range — double hung to hinged patio","Tricore™ frame — welded corners, thermal composite sub-frame","Pine interior with factory stain/finish options","AAMA 2605 exterior paint — resists fading and chalking","Zo-e-shield® glazing — Low-E, argon, Real Warm-Edge spacer","20-yr warranty / 30-yr anti-rot on clad products"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$–$$$$",brochureUrl:"https://www.qualitywindowanddoorinc.com/wp-content/uploads/2017/09/Weather-Shield-Signature-Series-Catalog.pdf"},{name:"Contemporary Series",type:"Windows & Patio Doors",material:"Aluminum-clad Wood",description:"Architect-focused contemporary collection with clean lines, minimal frame profiles, and expansive glass areas. Designed for modern and transitional high-end builds where the window is part of the design statement. Custom sizes and configurations throughout.",uniqueFeatures:["Minimal sightlines for contemporary design","Expansive glass area capability","Custom sizes and configurations","Architect-specified"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$",brochureUrl:"https://www.qualitywindowanddoorinc.com/wp-content/uploads/2017/09/Weather-Shield-Contemporary-Collection-Catalog.pdf"},{name:"Vue Series",type:"Windows & Patio Doors",material:"Aluminum-clad Wood",description:"Weather Shield's slim-profile contemporary line. Clean sightlines, modern proportions, aluminum-clad exterior with wood interior. Designed for transitional architecture where slim frames and large glass areas are the priority without going full architect-spec custom.",uniqueFeatures:["Slim contemporary profiles","Aluminum-clad exterior","Wood interior warmth","Large glass area capability"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$–$$$$",brochureUrl:"https://rockmanwindowsanddoors.com/wp-content/uploads/2022/08/Weather-shield-Vue-brochure.pdf"}],frameMaterials:["Aluminum-clad Wood","Extruded Aluminum","Vinyl"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Black",swatch:"#1A1A1A"},{name:"Bronze",swatch:"#5a3a1a"},{name:"150+ Colors",swatch:"linear-gradient(135deg,#B8A0C8,#4A7848)"},{name:"Custom Match",swatch:"linear-gradient(135deg,#8FA8C8,#C9A84C)"}],differentiators:["150+ exterior colors — widest palette in class","True custom shapes and specialty units — no upcharge","Family-owned — responsive and consistent","Strong coastal and high-elevation performance specs","Less over-specified in SD — gives rep a differentiated story"],idealFor:["Architects and designers wanting non-standard window shapes","Luxury builds wanting something other than Andersen/Marvin","Projects mixing windows and large patio door systems","High-elevation properties (Julian, Palomar, Cuyamaca)"],limitations:["Lower homeowner brand recognition than Andersen/Marvin","Lead times can be longer on full custom","Fewer dealer touchpoints locally than Andersen"],sdNotes:"A family-owned manufacturer with over 150 exterior color options — far more than most brands. If your home has an unusual color scheme, specialty window shapes, or design details that standard brands can't match, Weather Shield is worth exploring. Strong performance in both coastal and high-elevation San Diego properties." },

    { id:"milgard", sells:["Windows","Patio Doors","Big Door Systems"], heroImage:"/milgard-hero.avif", website:"https://www.milgard.com", name:"Milgard", logo:"MG", color:T.sage, tagline:"The California Value Leader", tier:"Mid-Premium", tierColor:T.sage, origin:"Tacoma WA — local factory in Temecula, CA with strong SoCal service department", overview:"Most trusted window brand in California. Lifetime warranty, popular black Trinsic Series, and California manufacturing make it the go-to for whole-house packages.", productLines:[{name:"Moving Glass Walls",type:"Folding/Multi-Slide",material:"Aluminum",description:"Top-hung bi-fold, stacking, and pocket configurations.",uniqueFeatures:["Top-hung bi-fold","ENERGY STAR","Competitive pricing"],maxWidth:"30ft",maxHeight:"10ft",priceRange:"$$$$–$$$$$",brochureUrl:"https://energyexteriorsnw.com/wp-content/uploads/2024/05/AX550_Brochure.pdf"},{name:"Ultra C700 Series — Fiberglass",type:"Windows",material:"Fiberglass",description:"Premium fiberglass. Paintable, excellent coastal performance.",uniqueFeatures:["Paintable any color","Stronger than vinyl","Lifetime warranty"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$$"},{name:"Tuscany V400 Series — Vinyl",type:"Windows",material:"Vinyl",description:"Milgard's flagship vinyl line. Traditional beveled frame profile with more substantial sightlines than the Trinsic. Priced above Trinsic — the premium vinyl option for clients who prefer a classic look over the slim contemporary profile.",uniqueFeatures:["Flagship vinyl line","Beveled frame profile","Lifetime warranty"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$–$$$$",brochureUrl:"https://www.milgard.com/sites/default/files/brochure/MG_V400-V2_TuscanySeries_brochure_110525_DIGI.pdf"},{name:"Trinsic V300 Series — Vinyl",type:"Windows",material:"Vinyl",description:"Contemporary slim-profile vinyl. Black Trinsic is #1 in SD luxury remodels. More affordable than the Tuscany flagship — the value play within Milgard's vinyl lineup without sacrificing the modern look.",uniqueFeatures:["Slim sightlines for vinyl","Black interior/exterior","Lifetime warranty"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$",brochureUrl:"https://www.hhrexteriors.com/wp-content/uploads/2022/12/Milgard-Trinsic-brochure.pdf"},{name:"Style Line V250 Series — Vinyl",type:"Windows",material:"Vinyl",description:"Builder-grade vinyl window line. Milgard's production builder workhorse — standard sizes, fast availability, competitive pricing. Clean profile, white standard, limited colors. The go-to for tract homes and production builds in Chula Vista, Otay Ranch, and Santee where cost per unit matters.",uniqueFeatures:["Builder-grade pricing","Fast availability in standard sizes","Lifetime warranty","Full operating style range"],maxWidth:"Various",maxHeight:"Various",priceRange:"$–$$",brochureUrl:"https://www.lighthouse-windows.com/wp-content/uploads/2021/04/milgard-style_line_series-2021.pdf"},{name:"A250 Series — Thermally Broken Aluminum",type:"Windows",material:"Thermally Broken Aluminum",description:"Milgard's thermally broken aluminum window line. Commercial-grade thermal performance in a residential aluminum profile. Title 24 compliant, coastal-rated, available in casement, fixed, awning, and slider configurations. Pairs with Milgard's aluminum door systems for whole-house aluminum continuity.",uniqueFeatures:["Thermally broken frame","Title 24 compliant","Coastal salt-air rated","Pairs with Milgard aluminum doors"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$–$$$$",brochureUrl:"https://constructionwindows.com/media/wysiwyg/images/resources/aluminum-thermal/pdf/Thermal-Break-Aluminum-A250-Brochure.pdf"}],frameMaterials:["Vinyl","Fiberglass","Thermally Broken Aluminum","Extruded Aluminum"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Black",swatch:"#1A1A1A"},{name:"Bronze",swatch:"#3d2b1f"},{name:"Tan",swatch:"#8A6020"}],differentiators:["Full Lifetime Warranty — transferable","Trinsic black — #1 SD luxury remodel window","California-made — fast ETAs","Best price-to-performance for packages"],idealFor:["High-value whole-house packages","Modern homes wanting black frame","Budget-managed luxury remodels"],limitations:["Only 4–5 colors","Not for ultra-luxury spec","Dark vinyl can warp in extreme heat"],sdNotes:"Trinsic black windows everywhere in SD luxury remodels. California presence = faster ETAs. Strong for Carmel Valley, Scripps Ranch, Encinitas." },

    { id:"alpine", heroImage:"/alpine-hero.jpg", sells:["Windows"], website:"https://www.alpinewindowsystems.com", name:"Alpine Windows", logo:"AW", color:T.teal, tagline:"The Vinyl-Only Value Specialist", tier:"Mid-Premium", tierColor:T.teal, origin:"Salt Lake City UT — Western US vinyl specialist", overview:"Vinyl-only Western US manufacturer — best price-per-window when budget discipline matters and the client wants clean profiles without the builder-grade look.", productLines:[{name:"Alpine 70 Series",type:"Windows",material:"Vinyl",description:"Alpine's premium vinyl window line. Heavier-duty frame construction, enhanced weatherstripping, and improved thermal performance over the standard series. The right spec when you want Alpine pricing but need a more robust product — upgrade from the base line without moving to Milgard.",uniqueFeatures:["Heavier-duty frame","Enhanced weatherstripping","Improved thermal performance","Full operating style range"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$–$$$",brochureUrl:"https://cksidaho.com/wp-content/uploads/2020/04/Alpine-70-Series-Window-Brochure.pdf"},{name:"Alpine 80 Series",type:"Windows",material:"Vinyl",description:"Alpine's top-of-line vinyl window. Larger frame profile than the 70 Series, maximum structural rigidity, and the best thermal performance in the Alpine lineup. The spec for larger openings and projects where Alpine is the brand but performance requirements are higher.",uniqueFeatures:["Largest frame profile","Maximum structural rigidity","Best thermal performance in Alpine lineup","Full operating style range"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$",brochureUrl:"https://www.alpinewindowsystems.com/wp-content/uploads/sites/4/2024/06/Alpine-80-Series-Window-Brochure.pdf"}],frameMaterials:["Vinyl"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Tan / Almond",swatch:"#c8b89a"},{name:"Black",swatch:"#1A1A1A"},{name:"Bronze",swatch:"#3d2b1f"}],differentiators:["Best price-per-window in the Western US vinyl category","Strong ENERGY STAR compliance across all climate zones","Clean profiles — not builder-grade looking","Fast Western US lead times","Right-size solution when Milgard is over-budget"],idealFor:["Budget-managed whole-house vinyl replacements","Rental property and multi-unit upgrades","Secondary and back-of-house windows on premium projects","Clients who just need reliable, clean vinyl windows"],limitations:["Vinyl only — no fiberglass or wood options","Limited color selection vs. Pella or Andersen","Not appropriate for luxury or architect-specified projects","No large-format door wall systems"],sdNotes:"A solid, reliable vinyl window at a budget-friendly price — clean looking without feeling cheap. A good fit for whole-house window replacements where value matters and you don't need luxury-tier features. Widely used in San Diego's inland communities." },

    { id:"jeldwen_win", heroImage:"/jeldwen-hero.jpg", sells:["Windows","Patio Doors"], website:"https://www.jeld-wen.com", name:"JELD-WEN Windows", logo:"JW", color:T.slate, tagline:"Global Range from Budget Vinyl to Custom Wood", tier:"Premium", tierColor:T.slate, origin:"Klamath Falls OR — global manufacturer in 20+ countries", overview:"One of the world's largest manufacturers — widest range from budget vinyl to premium alum-clad wood on a single PO. The mixed-spec play: V-4500 vinyl back-of-house, Siteline wood on the living areas.", productLines:[{name:"Custom Series",type:"Custom Windows",material:"Wood / Clad Wood",description:"JELD-WEN's custom-order architectural line for non-standard shapes, oversized units, and architect-specified applications. Longer lead times.",uniqueFeatures:["True custom shapes","Architect-specified","Non-standard sizes"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$–$$$$$",brochureUrl:"https://cmd-jeld-wen.s3.us-east-2.amazonaws.com/assets/documents/792257261.pdf"},{name:"Siteline",type:"Windows & Doors",material:"Aluminum-clad Wood",description:"JELD-WEN's flagship residential line. Aluminum exterior, wood interior. Wide color selection, custom configurations. Competes with Andersen 400 and Marvin Essential.",uniqueFeatures:["Alum-clad durability","Interior wood warmth","Custom configurations"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$–$$$$",brochureUrl:"https://www.moldingsplus.com/wp-content/uploads/2021/02/JeldWen-Siteline-Collection.pdf"},{name:"V-4500 Series — Premium Vinyl",type:"Windows",material:"Vinyl",description:"Mid-tier vinyl with improved sightlines, better hardware, and more color options than V-2500. Good upgrade step without leaving the brand.",uniqueFeatures:["Improved sightlines","Better hardware","More color options"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$–$$$",brochureUrl:"https://7653313.fs1.hubspotusercontent-na1.net/hubfs/7653313/catalogs%20and%20product%20info/11-520A%20Premium%20Vinyl%20Catalog%20LR%20022823.pdf"},{name:"V-2500 Series — Builders Series",type:"Windows",material:"Vinyl",description:"Entry-level vinyl production window. Pre-glazed, fast availability, competitive pricing. The standard track for production builders.",uniqueFeatures:["Production builder pricing","Fast availability","Full operating style range"],maxWidth:"Various",maxHeight:"Various",priceRange:"$–$$",brochureUrl:"https://omahadoor.com/wp-content/uploads/2021/02/Jeld-Wen-Builders-Vinyl-2-2019-Windows-Patio-Drs-brochure.pdf"}],frameMaterials:["Vinyl","Aluminum-clad Wood","Extruded Aluminum"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Black",swatch:"#1A1A1A"},{name:"Bronze",swatch:"#3d2b1f"},{name:"Anodized Silver",swatch:"#a0a8a8"},{name:"Custom Painted",swatch:"linear-gradient(135deg,#8FA8C8,#A0B89A)"}],differentiators:["Widest product range — one brand from $$ vinyl to $$$$ wood","Siteline EX competes directly with Andersen 400 and Marvin Essential","AuraLast treated wood for coastal-adjacent applications","Production builder pricing on V-2500 — lowest cost per window","Global manufacturing — usually in-stock on standard sizes"],idealFor:["Production builders wanting one vendor across the whole project","Projects mixing budget vinyl (secondary) and premium wood (primary)","Whole-house packages where cost per window is the decision driver","Mid-range remodels wanting alum-clad wood without Andersen/Marvin pricing"],limitations:["Brand is less recognized by homeowners than Andersen or Milgard","Custom lead times can stretch on Siteline EX","V-2500 quality difference vs. Milgard is noticeable on close inspection","Less architect-prestige than Marvin"],sdNotes:"A global manufacturer with one of the widest product ranges available — from entry-level vinyl all the way to premium wood windows. Useful if you want to mix window types across your home (standard vinyl in bedrooms, premium wood in living areas) without juggling multiple vendors." },

    { id:"simonton", heroImage:"/simonton-hero.jpg", sells:["Windows","Patio Doors"], website:"https://www.simonton.com", name:"Simonton Windows", logo:"SW", color:T.gold, tagline:"The Proven Production Vinyl Workhorse", tier:"Mid-Premium", tierColor:T.gold, origin:"Parkersburg WV — owned by Ply Gem / Cornerstone Building Brands", overview:"One of the most widely installed vinyl brands in the US. Daylight Max delivers maximum glass area and slim sightlines — exactly what the SD market wants at a competitive price.", productLines:[{name:"Daylight Max — Vinyl",type:"Windows",material:"Vinyl",description:"Simonton's primary San Diego product. Engineered for maximum glass-to-frame ratio — slimmer sightlines and larger visible glass area than standard vinyl windows. ENERGY STAR certified, Low-E standard. The product to lead with in SD conversations.",uniqueFeatures:["Maximum glass area / slim sightlines","ENERGY STAR certified","Low-E glass standard","Key SD seller"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$–$$$",brochureUrl:"https://www.simonton.com/wp-content/uploads/Widen%20Assets/Documents/DaylightMax-Brochure-WEB-SPREADS.pdf"}],frameMaterials:["Vinyl"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Almond",swatch:"#c8b89a"},{name:"Desert Sand",swatch:"#c09060"},{name:"Dark Bronze",swatch:"#3d2b1f"},{name:"Black",swatch:"#1A1A1A"}],differentiators:["Daylight Max — maximum glass area, slim sightlines, the SD lead product","Broad Western US distribution — available through multiple SD dealers","Consistent quality across production runs — no surprises for builders","Good warranty program"],idealFor:["Production remodels where glass area and value matter","Investment property and rental unit upgrades","Builders needing consistent quality at volume pricing","Whole-house budget replacements in entry and mid-range price bands"],limitations:["Vinyl only — no wood or fiberglass options","Not appropriate for luxury or architect-specified projects","Ply Gem corporate ownership — less brand story than family-owned competitors"],sdNotes:"Built around maximum glass area and slim frames — which means more light and better views for your money. A popular choice for San Diego homeowners who want a clean, contemporary vinyl window at a competitive price point. The Daylight Max series is their standout product locally." },

    { id:"westernwindow", heroImage:"/western-hero.jpg", sells:["Windows","Big Door Systems","Patio Doors"], website:"https://www.westernwindowsystems.com", name:"Western Window Systems", logo:"WW", color:T.ember, tagline:"The Modern Aluminum Indoor-Outdoor Specialist", tier:"Premium", tierColor:T.ember, origin:"Phoenix AZ — founded 2003, Western US focus", overview:"Phoenix-based aluminum specialist known for slim sightlines and the Series 8000 multi-slide. The architect's aluminum choice at the premium tier for contemporary San Diego builds.", productLines:[{name:"Vantage Line — Series 8000",type:"Multi-Slide / Folding / Windows",material:"Aluminum",description:"Western Window Systems' premium Vantage Line — elevated performance and refined aesthetics for the highest-end contemporary builds.",uniqueFeatures:["Premium performance tier","Refined contemporary profiles","Elevated hardware"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$$",brochureUrl:"https://westernwindowsystems.com/wp-content/uploads/2025/09/WWS_8000_Brochure_090325.pdf"},{name:"Performance Line — Series 7000",type:"Multi-Slide / Folding / Windows",material:"Aluminum",description:"Western Window Systems' Performance Line — enhanced structural and thermal performance for projects with higher wind, water, or energy requirements.",uniqueFeatures:["Enhanced structural performance","Higher wind/water ratings","Energy-efficient thermal break"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$–$$$$$",brochureUrl:"https://westernwindowsystems.com/wp-content/uploads/2022/06/Western-Window-Systems-ESIC-Series7000A-v3_0.pdf"},{name:"Classic Line — Product Guide",type:"Multi-Slide / Folding / Pocket / Windows / Pivot",material:"Aluminum",description:"Western Window Systems' Classic Line — the full range of thermally broken aluminum multi-slide, folding, pocket, window, and pivot systems for contemporary and modern architecture.",uniqueFeatures:["Full system range","Thermally broken aluminum","Contemporary profiles"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$–$$$$",brochureUrl:"https://westernwindowsystems.com/wp-content/uploads/2022/06/Western-Window-Systems-Product-Guide-V6.2_0.pdf"}],frameMaterials:["Thermally Broken Aluminum"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Black",swatch:"#1A1A1A"},{name:"Bronze",swatch:"#3d2b1f"},{name:"Champagne",swatch:"#c8b89a"},{name:"Custom Anodized",swatch:"linear-gradient(135deg,#a0a8a8,#C87A4A)"}],differentiators:["Architect-preferred slim aluminum for contemporary/modern builds","Series 600 multi-slide — the large-format modern door system in SD","Full system continuity — matching windows and doors in same profile","Flush sill option on Series 600 — true indoor-outdoor threshold","Western US focus — better local support than East Coast brands"],idealFor:["Contemporary and modern architecture","Large-format opening projects","Architect-specified builds in La Jolla, Del Mar, Carmel Valley","Clients wanting the clean aluminum look NanaWall and LaCantina don't offer"],limitations:["Aluminum only — no wood or vinyl options","Higher thermal conductivity than fiberglass or vinyl without thermal break","Less name-recognition with homeowners than NanaWall","Not available through all SD dealers — check stock"],sdNotes:"A premium aluminum window and door brand popular on contemporary San Diego custom homes. Known for slim, elegant frames that maximize your view and let in more light. If your home has a modern or minimalist aesthetic, Western Window Systems is worth considering." },

    { id:"nuvista", heroImage:"/nuvistahero2.jpg", sells:["Windows","Patio Doors"], website:"https://www.nuvistawindows.com", name:"Nu Vista Windows", logo:"NV", color:T.teal, tagline:"Budget-Friendly Architectural Aluminum", tier:"Premium", tierColor:T.teal, origin:"Western US — architectural aluminum specialist", overview:"Southern California architectural aluminum at an accessible price point — intentionally commercial storefront aesthetic. The right call when the design calls for chunky industrial frames.", productLines:[{name:"Coronado Series",type:"Windows & Patio Doors",material:"Aluminum",description:"Nu Vista's Coronado Series — architectural aluminum windows and patio doors designed for the Southern California market. Clean profiles, solid construction, and competitive pricing for residential and light commercial projects.",uniqueFeatures:["Southern California market focus","Architectural aluminum profiles","Residential & light commercial","Competitive pricing"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$",brochureUrl:"https://nuvistawindows.com/index.php/en/download-blueprints?task=callelement&format=raw&item_id=272&element=8a074dca-b77d-43be-adb2-4ba9cb6cf701&method=download"},{name:"Malibu Series",type:"Windows & Patio Doors",material:"Aluminum",description:"Nu Vista's Malibu Series — architectural aluminum windows and patio doors for the Southern California residential market.",uniqueFeatures:["Southern California market focus","Architectural aluminum profiles","Residential & light commercial","Competitive pricing"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$",brochureUrl:"http://ilovemktdigital.com/nuvista/index.php/en/download-blueprints?task=callelement&format=raw&item_id=300&element=8a074dca-b77d-43be-adb2-4ba9cb6cf701&method=download"}],frameMaterials:["Extruded Aluminum"],finishes:[{name:"Anodized Clear",swatch:"#a0a8a8"},{name:"Anodized Black",swatch:"#1A1A1A"},{name:"Dark Bronze",swatch:"#3d2b1f"},{name:"Champagne",swatch:"#c8b89a"},{name:"Custom Powder Coat",swatch:"linear-gradient(135deg,#a0a8a8,#3A6898)"}],differentiators:["Budget-friendly aluminum vs. Western Window Systems and IWC","Commercial storefront aesthetic — intentionally architectural","Good for ADU, mixed-use, loft-style residential","Thicker frame profile gives structural, industrial character","Accessible price point for architect-specified aluminum"],idealFor:["Contemporary homes wanting commercial/industrial aluminum aesthetic","ADU and mixed-use projects","Budget-managed builds where Western Window Systems is over budget","Architects wanting storefront-look aluminum at residential scale","Loft conversions and warehouse-to-residential projects"],limitations:["Bulkier frames — not for slim-sightline contemporary residential","Not as refined as Western Window Systems or IWC","Less residential polish — clearly reads as commercial-adjacent","Limited folding and large-format door wall options"],sdNotes:"Architectural aluminum with a distinctly industrial, modern character — chunky frames that are a deliberate design statement rather than a limitation. A good fit for contemporary builds, ADUs, and loft-style homes where the commercial aesthetic is exactly what you're going for." },

    { id:"iwc", heroImage:"/iwc-hero.jpg", sells:["Windows","Patio Doors","Big Door Systems"], website:"https://www.intlwindow.com", name:"International Window Co.", logo:"IW", color:T.slate, tagline:"The California Commercial-Grade Aluminum Specialist", tier:"Premium", tierColor:T.slate, origin:"Richmond CA — California aluminum window manufacturer", overview:"California-made thermally broken aluminum with commercial-grade durability. Architect-friendly for custom shapes and configurations at competitive pricing versus Western Window Systems.", productLines:[{name:"Keltic Series",type:"Windows & Patio Doors / Multi-Slide / Pocket Doors",material:"Aluminum",description:"IWC's Keltic Series — a comprehensive aluminum window and large-opening door system covering multi-slide, pocket, sliding glass, and hinged configurations. A strong value option for residential and light commercial projects requiring California-quality aluminum performance.",uniqueFeatures:["Multi-slide & pocket door systems","Sliding glass & hinged door options","Hinged window series","California manufactured"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$",brochureUrl:"https://www.intlwindow.com/wp-content/uploads/2013/04/IWC-Keltic_Brochure.pdf"},{name:"Ambassador Series",type:"Windows & Patio Doors",material:"Thermally Broken Aluminum",description:"IWC's Ambassador Series — a comprehensive thermally broken aluminum window and door system engineered for the California residential and light commercial market. Strong coastal and thermal performance with clean contemporary profiles.",uniqueFeatures:["Thermally broken aluminum","Residential & light commercial","California-engineered","Coastal-rated performance"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$–$$$$",brochureUrl:"https://www.intlwindow.com/pdfs/IWC-Ambassador_Brochure.pdf"},{name:"Thermally Broken Aluminum Windows",type:"Windows",material:"Thermally Broken Aluminum",description:"IWC's core residential/commercial product. Thermally broken aluminum frames in casement, fixed, awning, and picture configurations. Better thermal performance than standard aluminum, strong coastal performance.",uniqueFeatures:["Thermally broken","Coastal-rated","Commercial-grade construction"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$–$$$$"},{name:"Sliding Patio Doors — Aluminum",type:"Patio Doors",material:"Aluminum",description:"Large-format aluminum sliding doors. Heavy-duty rollers, commercial-grade track. Good for ADU and multi-unit applications where durability is critical.",uniqueFeatures:["Commercial-grade durability","Heavy-duty rollers","Large format capable"],maxWidth:"30ft",maxHeight:"10ft",priceRange:"$$$–$$$$"},{name:"Fixed / Curtain Wall Sections",type:"Custom / Commercial",material:"Aluminum",description:"Fixed glass sections and curtain wall configurations for contemporary homes blending residential and commercial aesthetics. Architect-specified.",uniqueFeatures:["Curtain wall option","Architect-specified","Large fixed glass"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$"},{name:"Custom Architectural",type:"Custom Windows",material:"Aluminum",description:"Non-standard shapes, specialty configurations, and custom-engineered units for architects. IWC's California manufacturing enables direct custom work.",uniqueFeatures:["True custom from CA factory","Non-standard shapes","Direct manufacturer support"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$–$$$$$"}],frameMaterials:["Thermally Broken Aluminum","Standard Aluminum"],finishes:[{name:"Anodized Clear",swatch:"#a0a8a8"},{name:"Anodized Black",swatch:"#1A1A1A"},{name:"Anodized Bronze",swatch:"#3d2b1f"},{name:"Dark Bronze",swatch:"#5a3a1a"},{name:"Custom Powder Coat",swatch:"linear-gradient(135deg,#3A6898,#C87A4A)"}],differentiators:["California manufacturer — direct support and faster lead times","Commercial-grade aluminum at residential pricing","Thermally broken for better energy performance than standard aluminum","Strong for ADU, mixed-use, and high-density residential","Architect-friendly — custom shapes and configurations"],idealFor:["Architect-specified contemporary and modern homes","ADU projects needing commercial-grade durability","Mixed-use and high-density residential","Custom builds wanting aluminum performance without Western Window Systems pricing","Projects requiring curtain wall or fixed glass sections"],limitations:["Aluminum only — no vinyl or wood options","Less homeowner brand recognition","Standard aluminum (non-thermally broken) has energy performance limits","Less dealer presence than Andersen or Milgard"],sdNotes:"California-made aluminum windows with commercial-grade construction — built to last in demanding coastal and urban environments. A strong option for modern homes, ADUs, and projects where durability and clean aluminum profiles are priorities." },
    { id:"windor", heroImage:"/windor-hero.jpg", sells:["Big Door Systems","Windows","Patio Doors"], website:"https://www.windorsystems.com", name:"WinDor Systems", logo:"WD", color:T.sage, tagline:"Budget Vinyl Folding & Multi-Slide Doors", tier:"Mid-Premium", tierColor:T.sage, origin:"Western US — vinyl window and large door manufacturer", overview:"Budget-friendly vinyl folding and multi-slide systems — brings indoor-outdoor living to projects under $15K where NanaWall and LaCantina are out of reach.", productLines:[{name:"3750 Series Folding Door",type:"Folding / Bi-fold",material:"Vinyl",description:"WinDor's folding door — available only in the 3750 Series. Features Centor Architecture™ E3 hardware, dual interlocking weatherseal, Sentry™ multipoint locking, and a keyed access panel option for even-panel configurations. Opens fully for complete indoor-outdoor connection — the most accessible folding door option in the San Diego market.",uniqueFeatures:["Most affordable folding door in SD","Centor E3 hardware","Keyed exterior access on even-panel configs","Cardinal LoE-366 glass standard"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$",brochureUrl:"https://www.windorsystems.com/wp-content/uploads/Win-Dor_2023_Q4_brochure_for_web.pdf"},{name:"2750 & 3750 Series Multi-Slide Doors",type:"Multi-Slide",material:"Vinyl",description:"Multi-panel stacking door systems in two series. The 3750 flagship runs up to 20ft wide in 4-panel configuration with Truth Nexus 2-point locks and stainless steel rollers rated 500 lb/10,000 cycles. Cardinal LoE-366 dual-glazed tempered glass is standard on both series.",uniqueFeatures:["Up to 20ft wide (3750 4-panel)","Truth Nexus 2-point opposing lock","Stainless rollers — 500 lb/10,000 cycles","Cardinal LoE-366 standard"],maxWidth:"20ft (4-panel)",maxHeight:"8ft",priceRange:"$$",brochureUrl:"https://www.windorsystems.com/wp-content/uploads/Win-Dor_2023_Q4_brochure_for_web.pdf"},{name:"2750 & 3750 Series Sliding Doors",type:"Sliding Patio Door",material:"Vinyl",description:"Classic bypass slider in two series. Anodized aluminum track, integrated screen channel included standard, Truth Anti-Slam double-point lock. The 3750 adds a larger 3¾\" sash profile. Cardinal LoE-366 glass standard; triple-pane IG available on both.",uniqueFeatures:["Anodized aluminum track","Screen channel included standard","Truth Anti-Slam double-point lock","Triple-pane IG option"],maxWidth:"Various",maxHeight:"8ft",priceRange:"$–$$",brochureUrl:"https://www.windorsystems.com/wp-content/uploads/Win-Dor_2023_Q4_brochure_for_web.pdf"},{name:"3750 Swing Door",type:"Swing Door",material:"Vinyl",description:"The 3750 Swing Door features Sentry™ multipoint locking on both the active and inactive sash, adjustable contemporary European hinges, and anodized aluminum sill covers inside and outside. Available for new construction and replacement.",uniqueFeatures:["Sentry™ multipoint on both active & inactive sash","Adjustable European hinges","Anodized aluminum sill covers","Cardinal LoE-366 glass standard"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$",brochureUrl:"https://www.windorsystems.com/wp-content/uploads/Win-Dor_2023_Q4_brochure_for_web.pdf"},{name:"2750 & 3750 Folding Window",type:"Folding Window",material:"Vinyl",description:"Both the 2750 and 3750 series offer a folding window — an excellent budget option for pass-through and servery openings. Think kitchen window above a counter, indoor-outdoor bar, or patio servery. Operates as out-swing. Centor E3 hardware with internal multipoint shoot-bolt locking. The 2750 is the value entry point; the 3750 adds optional black interior/exterior specialty laminate. A great way to bring folding functionality to a project without a full door budget.",uniqueFeatures:["Available in both 2750 (budget) and 3750 (premium) series","Best budget servery / pass-through folding window in SD","Centor E3 hardware — same as the 3750 folding door","Internal multipoint shoot-bolt locks full sash perimeter","Cardinal LoE-366 glass standard"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$–$$",brochureUrl:"https://www.windorsystems.com/wp-content/uploads/Win-Dor_2023_Q4_brochure_for_web.pdf"},{name:"WinDor Vinyl Windows",type:"Windows",material:"Vinyl",description:"Standard vinyl window line to complement the door systems. Casement, double-hung, slider, and fixed. Good for whole-project packages.",uniqueFeatures:["Matches door line","ENERGY STAR","Budget pricing"],maxWidth:"Various",maxHeight:"Various",priceRange:"$"}],frameMaterials:["Vinyl"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Tan",swatch:"#c8b89a"},{name:"Bronze",swatch:"#3d2b1f"},{name:"Black",swatch:"#1A1A1A"}],differentiators:["3750 Series folding door — most affordable folding door in SD","2750 & 3750 Series multi-slide — budget large opening systems","2750 & 3750 Folding Window — best budget servery / pass-through option in SD","Opens indoor-outdoor living to clients under $15K","Full vinyl system — windows and big doors on one order"],idealFor:["Budget-managed remodels wanting folding or multi-slide","Clients who want indoor-outdoor but cannot support premium pricing","Kitchen servery and bar pass-through openings","Entry-point indoor-outdoor projects","Contractors needing cost-effective large opening systems"],limitations:["Vinyl only — no aluminum or wood","Bulkier frames than aluminum competitors","Not for luxury or architect-specified projects","Lower panel capacity than aluminum systems"],sdNotes:"The most affordable folding and multi-slide door systems available in San Diego — bringing the indoor-outdoor wall experience within reach for budgets under $15K. Also worth considering for kitchen servery and bar pass-through windows. A practical entry point into the glass wall lifestyle." },
    { id:"fleetwood", heroImage:"/fleetwood-hero.jpeg", sells:["Windows","Big Door Systems","Entry Doors"], website:"https://www.fleetwoodusa.com", name:"Fleetwood Windows & Doors", logo:"FW", color:T.ember, tagline:"Ultra-Luxury Aluminum — The Architect's Statement System", tier:"Ultra Premium", tierColor:T.ember, origin:"Corona CA — California manufacturer since 1961, 207,000 sq ft factory", overview:"The benchmark for ultra-luxury aluminum in Southern California — Corona-manufactured since 1961. Patented Swiss-bearing rollers, flush sill drains, and the slimmest sightlines in the market. Kynar 500® paint, transferable lifetime warranty.", productLines:[{name:"Multi-Slide & Pocket — Series 4070-T",type:"Multi-Slide / Pocket",material:"Thermally Broken Aluminum",description:"Fleetwood's flagship large-opening door system. Designed for maximum panel size — up to 120 sq ft per panel, 1,400 lbs capacity. The patented A4 roller uses Swiss precision bearings at 58 HRC. Patented Arche-Duct flush sill: a sub-floor linear drain system that delivers a fully flush threshold with tested water/air/energy performance. Archetype Narrow lock — 3.25\" profile. No-post corner configurations. Virtually unlimited multi-slide, pocket, and corner applications.",uniqueFeatures:["Panels up to 120 sq ft / 1,400 lbs","Patented Arche-Duct flush sill drain","Swiss A4 roller — 58 HRC bearings","Archetype Narrow lock — 3.25\" profile","No-post corner capable","Virtually unlimited panel configurations"],maxWidth:"Custom",maxHeight:"20ft panel height",priceRange:"$$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Multi-Slide & Pocket — Series 3070-T / 3070",type:"Multi-Slide / Pocket",material:"Thermally Broken Aluminum (3070-T) / Aluminum (3070)",description:"The 3070-T (thermal) and 3070 (non-thermal) are Fleetwood's most-specified multi-slide door systems. 3070: panels up to 10ft wide x 18ft tall, 2-1/16\" vertical sightline — the slimmest in its class. 3070-T adds integral thermal barriers for energy code compliance. Both offer no-post corner configurations at 90° and odd angles — no post, no jamb. Optional Arche-Duct flush sill. Curved sliding glass walls available on the 3070 (CNC roll bender, radius as tight as 12ft). Impact-rated 3070-HI also available.",uniqueFeatures:["Panels up to 10ft wide x 18ft tall","2-1/16\" vertical sightline — slimmest in class","No-post 90° and custom-angle corners","Curved sliding walls — radius as tight as 12ft","Arche-Duct flush sill option","3070-T: thermal barrier for energy code"],maxWidth:"10ft panel",maxHeight:"18ft",priceRange:"$$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Traditional Sliding Door — Series 3000-T / 3000",type:"Traditional Sliding Patio Door",material:"Thermally Broken Aluminum (3000-T) / Aluminum (3000)",description:"Fleetwood's traditional patio slider — for projects where multi-slide systems aren't needed but Fleetwood's quality and sightline consistency are. 3000: panels up to 7ft wide x 14ft tall. 3000-T: thermal frame, 6ft wide x 12ft tall. Vertical sightlines match the 3070 family for mixed-product projects. Proprietary 3-height threshold system (1-1/4\", 2\", 3\"). False jamb feature allows in-frame mullion configurations. Mulls seamlessly to Series 3800-T transoms and sidelites.",uniqueFeatures:["Matches 3070 vertical sightlines","Three threshold height options","False jamb — in-frame mullion capability","Mulls to 3800-T window wall","Archetype locking hardware","Patented A2 Swiss-bearing roller"],maxWidth:"7ft panel (3000) / 6ft panel (3000-T)",maxHeight:"14ft (3000) / 12ft (3000-T)",priceRange:"$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Pivot Door — Series 4400-T",type:"Pivot Entry Door",material:"Thermally Broken Aluminum",description:"The first weather- and energy-rated pivot door designed specifically for luxury residential — not commercial. Panels up to 160\" wide x 180\" tall, up to 1,100 lbs. Patented Arche-Duct flush sill: finished floor flows to exterior with only a thin slot drain visible. FritsJurgens In-Rail Closer integrated in the bottom rail. 5-point latching with FSB lever hardware options. The definitive large-format pivot entry for contemporary estates.",uniqueFeatures:["Panels up to 160\" wide x 180\" tall, 1,100 lbs","First weather/energy-rated residential pivot","Arche-Duct flush sill — floor continues to exterior","FritsJurgens In-Rail concealed closer","5-point latch with FSB lever options","Thermally broken for energy compliance"],maxWidth:"160in panel",maxHeight:"180in",priceRange:"$$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Hinged Door — Series 3900-T & 3200-T",type:"Hinged Entry / Passage Door",material:"Thermally Broken Aluminum",description:"Two distinct hinged door systems. 3900-T: luxury-scale panels up to 4.5ft wide x 12ft tall, 5-point locking with FSB levers, available in-swing or out-swing, keyless electronic option, Arche-Duct flush sill option, mulls to sidelites and transoms. 3200-T: narrow-profile hinged door with jamb profile under 4\" — designed for minimal sightlines. Panels up to 40\" x 108\". Four adjustable 316 stainless mortise hinges. Optional Steel Look SDL for classic steel window aesthetic in aluminum.",uniqueFeatures:["3900-T: panels up to 4.5ft x 12ft","5-point locking system — single lever actuation","FSB lever hardware — multiple styles","3200-T: sub-4\" jamb profile after burial","Steel Look SDL option on 3200-T","Adjustable stainless mortise hinges"],maxWidth:"4.5ft (3900-T) / 40in (3200-T)",maxHeight:"12ft (3900-T) / 108in (3200-T)",priceRange:"$$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Folding Door — Series 3600-T",type:"Folding / Bi-Fold",material:"Thermally Broken Aluminum",description:"Fleetwood's thermally broken folding door system. Panels up to 3.5ft wide x 12ft tall, up to 8 panels per direction. Brio carriers: 4 high-precision wheels with side-thrust bearings per intermediate panel — smooth, quiet, stable. Stainless Dual Point Lock (DPL) shoots two bolts into respective tracks. All hardware — carriers, hinges, DPL — specified for coastal/salt-air environments. No-post 90° corner configuration available. Optional integrated hinged passage door within the folding wall.",uniqueFeatures:["Brio carriers — 4-wheel precision per panel","Stainless Dual Point Lock — coast-rated","No-post 90° corner option","Integrated hinged passage door option","Up to 8 panels per direction","Thermal barrier — energy code compliant"],maxWidth:"3.5ft panel",maxHeight:"12ft",priceRange:"$$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Casement, Awning & Fixed — Series 450-T / 350-T",type:"Windows",material:"Thermally Broken Aluminum",description:"Two thermally broken casement/awning/hopper/fixed window series. 450-T: next-generation cube design — wall-to-glass dimension of only 2-9/16\", slimmest on the market. Proprietary Archetype Multi-Point Latch and Cam Handle (stainless). Convection blockers in extrusion chambers maximize insulation. Welded vent corners (not screw-joined) for lifetime performance. 350-T: Steel Look applied grid simulates classic steel window in aluminum. Both offer 4-bar concealed hinge option and hinged screens with magnetic keeper.",uniqueFeatures:["450-T: 2-9/16\" wall-to-glass — slimmest in market","Welded vent corners — not screwed","Proprietary Archetype Multi-Point Latch (S.S.)","Convection blockers in extrusion chambers","350-T: Steel Look SDL — steel aesthetic in aluminum","4-bar concealed hinge option","Max panel: 24 sq ft per vent"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Window-Wall Fixed System — Series 3800-T",type:"Fixed Windows / Window Wall",material:"Thermally Broken Aluminum",description:"Fleetwood's luxury fixed glass and window-wall system. 1-7/16\" perimeter sightline — inside or outside glaze. Factory-punched rectangular weep slots (not field-drilled like commercial storefront). 4-1/2\" frame depth mulls directly to all Fleetwood door systems for seamless facade integration. Optional operable inserts (casement, awning, hopper). Steel Look simulated divided lite option. Virtually unlimited configuration sizes determined by site wind loads.",uniqueFeatures:["1-7/16\" perimeter sightline","Factory-punched weeps — luxury finish detail","Mulls to all Fleetwood door systems","Operable inserts: casement, awning, hopper","Steel Look divided lite option","Virtually unlimited configurations"],maxWidth:"Site wind load dependent",maxHeight:"Site wind load dependent",priceRange:"$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Horizontal Slider — Series 330-T",type:"Windows",material:"Thermally Broken Aluminum",description:"Thermally broken horizontal sliding window. Max panel 6.5ft wide x 6ft tall. Adjustable tandem stainless roller with nylon tires — the only sliding window with adjustable tandem roller, rated to 75 lbs. Screens captured within frame depth (not projecting). Proprietary self-latching 316 stainless latch — window locks automatically on close. High-performance integral stack bar option for high-wind applications.",uniqueFeatures:["Adjustable tandem roller — 75 lb rated","Screen encapsulated within frame (no protrusion)","Self-latching 316 S.S. latch — closes locked","HP integral stack bar for high-wind","Thermal frame — energy code compliant"],maxWidth:"6.5ft panel",maxHeight:"6ft",priceRange:"$$$–$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"}],frameMaterials:["Thermally Broken Aluminum","Standard Aluminum"],finishes:[{name:"Matte Black",swatch:"#1A1A1A"},{name:"White / Bone White",swatch:"#f0ede6"},{name:"Statuary Bronze",swatch:"#3d2b1f"},{name:"Champagne Sunstorm",swatch:"#c8b89a"},{name:"Charcoal Gray",swatch:"#4a4a4a"},{name:"Kynar 500® Custom",swatch:"linear-gradient(135deg,#a0a8a8,#C04020)"},{name:"Anodized (4 colors)",swatch:"linear-gradient(135deg,#a0a8a8,#707878)"}],differentiators:["Patented Archetype Rolling System — Swiss 58 HRC bearings vs. 40 HRC industry standard","Patented Arche-Duct flush sill — sub-floor drain, tested water/air/energy performance","Patented Archetype Locking System — electropolished 316 stainless, made in USA","4070-T panels to 1,400 lbs / 120 sq ft — no competitor matches this","3070 vertical sightline: 2-1/16\" — slimmest multi-slide sightline in class","450-T window: 2-9/16\" wall-to-glass — slimmest casement on market","No-post corners on 3070, 3070-T, 3600-T","Curved sliding walls (3050/3070) — CNC roll bender, radius as tight as 12ft","Kynar 500® factory paint — not powder coat — extraordinary color retention","Solar-powered factory — 8M+ kWh/year, 100% scrap aluminum recycled","Steel Look SDL option across multiple series — steel aesthetic without steel complications","California-manufactured in Corona — fastest lead times of any luxury aluminum brand"],idealFor:["Ultra-luxury estates in La Jolla, Del Mar, RSF, Coronado","Architect-specified projects where the door or window system is the design statement","Clients wanting the absolute best aluminum door system available","Contemporary and modern architecture with monumental glass walls","Projects pairing pivot entry with multi-slide or folding door walls","Coastal estates requiring salt-air-rated stainless hardware throughout"],limitations:["Ultra-premium pricing — budget conversations start at 5 figures","Lead times on full custom configurations","Requires experienced authorized Fleetwood installer","Overkill for smaller openings or traditional architecture","Not available through all SD dealers — verify stock and authorization"],sdNotes:"The most specified ultra-luxury window and door brand in La Jolla, Del Mar, and Rancho Santa Fe. If you've seen a stunning floor-to-ceiling glass wall on a coastal estate, there's a good chance it's Fleetwood. Known for panels so large and smooth they feel like magic to operate — and priced accordingly." },
    { id:"steeltraditions", heroImage:"/steeltraditions-hero.jpg", sells:["Windows","Entry Doors","Patio Doors","Big Door Systems"], website:"https://www.steeltraditions.com", name:"Steel Traditions", logo:"ST", color:T.slate, tagline:"American-Made Steel Windows & Doors", tier:"Ultra Premium", tierColor:T.slate, origin:"USA — American steel window and door manufacturer", overview:"American-made thermally broken steel windows and doors — the ultra-slim industrial aesthetic no aluminum or vinyl can replicate. Title 24 compliant for California with faster lead times than European alternatives.", productLines:[{name:"Full Product Catalog",type:"Windows & Doors",material:"Thermally Broken Steel / Steel",description:"The complete Steel Traditions catalog — thermally broken and standard steel windows, entry doors, French doors, patio doors, and fixed glazing for luxury residential applications.",uniqueFeatures:["Full product range","Thermally broken & standard steel","Residential luxury specification"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$–$$$$$",brochureUrl:"https://steeltraditions.com/catalog/"},{name:"Thermally Broken Steel Casement",type:"Windows",material:"Thermally Broken Steel",description:"Steel Traditions flagship thermally broken steel casement. Ultra-slim sight lines, thermally broken for Title 24 compliance, multi-point lock. The go-to steel window for San Diego high-end residential where energy compliance is required.",uniqueFeatures:["Thermally broken — Title 24 compliant","Ultra-slim sight lines","Multi-point lock","Residential scale"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$$"},{name:"Fixed Steel Windows",type:"Windows",material:"Steel",description:"Fixed picture windows in steel. Maximum glass area with the slimmest possible frame. Architect-specified for statement walls, stair towers, and feature glazing on contemporary and transitional homes.",uniqueFeatures:["Slimmest frame available","Large glass area","Architect-specified"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$"},{name:"Steel Entry Doors",type:"Entry Doors",material:"Steel",description:"Solid steel entry doors with glass lite options. The industrial-modern statement entry — pairs with steel window lines for whole-facade continuity. Available in single, double, and oversized configurations.",uniqueFeatures:["Solid steel construction","Glass lite options","Whole-facade continuity with windows"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$–$$$$$"},{name:"Steel French Doors & Patio",type:"Patio / French",material:"Steel",description:"Steel-framed French and patio doors. Traditional divided lite or single lite. The defining element on Mediterranean, Spanish Colonial, and European-influenced architecture.",uniqueFeatures:["True divided lite option","Traditional and contemporary profiles","Steel frame durability"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$$"},{name:"Non-Thermally Broken Steel",type:"Windows & Doors",material:"Steel",description:"Standard non-thermally broken steel for interior applications, covered exterior locations, and historic or design-specific projects where thermal break is not required.",uniqueFeatures:["Slimmest possible sight lines","Interior and covered exterior","Historic restoration compatible"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$"}],frameMaterials:["Thermally Broken Steel","Standard Steel"],finishes:[{name:"Matte Black",swatch:"#1A1A1A"},{name:"Dark Bronze",swatch:"#3d2b1f"},{name:"Oil-Rubbed Bronze",swatch:"#5a3a1a"},{name:"Antique White",swatch:"#f0ede6"},{name:"Custom Powder Coat",swatch:"linear-gradient(135deg,#3A6898,#1A2028)"}],differentiators:["American-made steel — faster lead times than European custom","Thermally broken options — Title 24 compliant for California","Ultra-slim sight lines impossible to match in aluminum","Steel character unique to the material — cannot be faked","Whole-facade continuity — windows, entry, and patio doors in one system"],idealFor:["Contemporary, transitional, and Mediterranean architecture wanting the steel aesthetic","Architects specifying black steel windows as a design statement","La Jolla, RSF, and Coronado estate projects","Historic-adjacent or European-influenced residential builds","Clients who want the converted-loft or Parisian-apartment window look"],limitations:["Premium pricing","Steel requires proper finishing and maintenance program to prevent rust","Non-thermally broken does not meet Title 24 in most San Diego applications","Longer lead times than aluminum or vinyl","Fewer large-format opening options than aluminum door wall systems"],sdNotes:"Steel windows create a look that simply cannot be replicated in aluminum or vinyl — ultra-thin frames with a timeless industrial elegance. Commonly seen on Spanish Colonial, Mediterranean, and contemporary homes in Coronado, Point Loma, and Rancho Santa Fe. If you've admired black-framed divided lite windows, this is the brand." },

    { id:"frenchsteel", heroImage:"/frenchsteel-hero.jpg", sells:["Windows","Entry Doors","Big Door Systems","Skylights"], website:"https://www.frenchsteel.com", name:"French Steel", logo:"FS", color:T.rust, tagline:"European Design, Asian-Manufactured — Better Price, Longer Lead", tier:"Luxury", tierColor:T.rust, origin:"European-designed, Asian-manufactured — US distribution", overview:"European-designed divided lite steel at a better price than domestic — authentic look with Asian manufacturing. The value play in the steel category for clients with schedule flexibility.", productLines:[{name:"French Steel Casement — Divided Lite",type:"Windows",material:"Thermally Broken Steel",description:"The signature product. True divided lite steel casement in authentic European profiles. Thermally broken for California Title 24. Available in single, double, and multi-lite configurations. The visual result is authentic; manufacturing is overseas.",uniqueFeatures:["True divided lite","Authentic European profiles","Thermally broken","Better price than domestic steel"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$–$$$$"},{name:"Pivot and Casement Entry",type:"Entry Doors",material:"Steel",description:"Steel entry doors with glass lites in European proportions. French-style double doors with divided lite glass for Mediterranean and French Provincial estate homes.",uniqueFeatures:["French double door configurations","Divided lite glass","Authentic proportions","Better price than domestic"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$"},{name:"Steel French Doors — Interior & Exterior",type:"French Doors / Patio",material:"Thermally Broken Steel",description:"Exterior and interior French door sets in divided lite steel. Opens living rooms, libraries, and master suites to terraces and courtyards. The most-requested product for Coronado, RSF, and La Jolla Mediterranean builds.",uniqueFeatures:["Divided lite steel French doors","Interior and exterior applications","Courtyard and terrace facing","Period-authentic profiles"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$–$$$$"},{name:"Fixed & Specialty Steel Windows",type:"Windows",material:"Steel",description:"Fixed steel windows in specialty shapes — arched tops, round, oval, and geometric. Specified for stair towers, entry halls, and architectural feature walls.",uniqueFeatures:["Specialty shapes — arched, round, oval","Architectural feature glazing","Better price than domestic steel"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$"},{name:"Steel Skylight & Roof Glazing",type:"Skylights / Roof",material:"Steel",description:"Steel-framed skylight and roof glazing systems. Lantern-style, ridge, and flat roof configurations for courtyard homes and estate builds.",uniqueFeatures:["Lantern and ridge skylights","Courtyard lantern configuration","Estate-scale roof glazing"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$–$$$$$"}],frameMaterials:["Thermally Broken Steel","Standard Steel"],finishes:[{name:"Classic Black",swatch:"#1A1A1A"},{name:"Dark Bronze",swatch:"#3d2b1f"},{name:"Graphite",swatch:"#3A4048"},{name:"Antique Iron",swatch:"#4A4040"},{name:"Custom Patina",swatch:"linear-gradient(135deg,#3A4048,#6A5848)"}],differentiators:["Better price point than Steel Traditions — European aesthetic at lower cost","True divided lite and authentic European profile design","Specialty shapes in steel — arched, round, oval","Steel skylight and lantern systems for courtyard homes","Right choice when the client wants the look and has schedule flexibility"],idealFor:["French Provincial and Mediterranean architecture where budget matters","Clients who want the European steel aesthetic at a lower price than domestic","Projects with flexible timelines that can absorb longer lead times","Coronado, RSF, and La Jolla Mediterranean or French Provincial builds","Specialty shapes and arched windows where only steel reads correctly"],limitations:["Longer lead times than Steel Traditions — plan well ahead","Service and warranty resolution slower due to international supply chain","Not ideal for projects with tight or fixed completion schedules","Steel maintenance program required in coastal salt-air environments","Price advantage narrows when expedited shipping is required"],sdNotes:"Authentic European divided lite steel windows and doors at a more accessible price than domestic alternatives. A strong option if you love the look of black steel windows and want to make your budget work harder — just plan ahead, as lead times are longer than domestic brands." },
  ],  interior_doors: [
    { id:"tmcobb_int", sells:["Interior Doors"], website:"https://www.tmcobb.com", heroImage:"/tmcobbhero.jpg", name:"TM Cobb", logo:"TC", color:T.plum, tagline:"California's Custom Interior Door Standard", tier:"Luxury", tierColor:T.plum, origin:"Southern California — local manufacturer", overview:"California's go-to custom interior door brand for luxury residential. Widest local selection, custom sizing, and matching entry/interior door families from one manufacturer.", productLines:[{name:"Moulded Door Catalogue 2024",type:"Interior — Moulded",material:"Moulded Composite",description:"TM Cobb's complete moulded door catalogue — covers the full range of moulded panel door styles, profiles, and finish options for interior applications.",uniqueFeatures:["Full moulded door line","Panel styles & profiles","2024 edition"],priceRange:"$$–$$$",brochureUrl:"https://tmcobb.com/wp-content/uploads/2024/02/MOLDED_DOOR_BROCHURE-2024.pdf"},{name:"TM Cobb Red Book 2025",type:"Full Line",material:"Wood / MDF / Composite",description:"The complete TM Cobb product catalog — the Red Book covers the full range of custom entry doors, interior collections, stile-and-rail profiles, shaker lines, and specialty configurations. The definitive TM Cobb specification reference.",uniqueFeatures:["Complete product catalog","Entry & interior door lines","Specification reference"],priceRange:"$$$–$$$$$",brochureUrl:"https://tmcobb.com/wp-content/uploads/2026/02/TMC_RedBook-2025.pdf"},{name:"Shaker / Flat Panel",type:"Interior — Paint or Stain Grade",material:"Solid Wood / MDF",description:"1-panel flat shaker — most specified interior door in SD luxury remodels. Available paint or stain grade.",uniqueFeatures:["Most popular current style","Paint or stain grade","Custom sizes"],priceRange:"$$$"},{name:"Stile & Rail — Multi-Panel",type:"Interior — Paint or Stain Grade",material:"Solid Wood",description:"2, 3, 5, and 6-panel stile and rail. Traditional and transitional applications.",uniqueFeatures:["Multiple panel configurations","True stile and rail construction","Furniture-quality joinery"],priceRange:"$$$"},{name:"Flush / MDF Slab",type:"Interior — Paint Grade",material:"MDF / Solid Core",description:"Flat flush door. Perfectly smooth paint-grade surface. Modern and minimalist.",uniqueFeatures:["Mirror-smooth paint surface","Solid core option","Best modern interior door"],priceRange:"$$"},{name:"Custom Router / Carved",type:"Interior — Feature Doors",material:"Solid Wood",description:"CNC or hand-carved decorative panels. Statement doors for master suites and grand entries.",uniqueFeatures:["Fully custom design","One-of-a-kind","Best with stain finish"],priceRange:"$$$$$"},{name:"French Door — Interior",type:"Interior — Glass",material:"Wood / MDF",description:"Interior French doors with glass lites. Borrows light between rooms.",uniqueFeatures:["Glass lite options","Pairs with pocket or swing hardware","Paint or stain"],priceRange:"$$$"}],frameMaterials:["Solid Wood (stain grade)","MDF (paint grade)","Wood Composite"],finishes:[{name:"Paint Grade",swatch:"#f0ede6"},{name:"Natural Stain",swatch:"#a07040"},{name:"Dark Stain",swatch:"#3a2010"},{name:"Black Paint",swatch:"#1A1A1A"},{name:"Custom Color",swatch:"linear-gradient(135deg,#1a1a1a,#f0ede6)"}],differentiators:["California manufacturer — fastest local ETAs","Widest custom interior door selection in SD","Matching entry + interior door families","Pre-hung or slab options"],idealFor:["Luxury custom homes needing custom sizes","Whole-house interior door packages","Matching stain grade to wood floors or cabinetry"],limitations:["Premium pricing vs. stock doors","Custom lead times 4–8 weeks"],sdNotes:"California's most popular custom interior door brand for luxury homes. If you want doors that are sized, profiled, and finished exactly to your vision — and you want them to match your entry door — TM Cobb is the go-to. Made locally, which means faster delivery and easier support if anything needs attention." },
    { id:"masonite", sells:["Interior Doors","Entry Doors"], website:"https://www.masonite.com", name:"Masonite", logo:"MS", color:T.sage, tagline:"North America's Volume Interior Door Leader", tier:"Mid-Premium", tierColor:T.sage, origin:"Charlotte NC — largest door manufacturer in North America", overview:"The dominant volume interior door brand. Widest selection of in-stock moulded and hollow-core panel doors for production builds and remodels. Fast availability, competitive pricing, and a full range from hollow-core to solid-core fire-rated.", productLines:[{name:"Moulded Panel — Smooth",type:"Interior — Paint Grade",material:"Moulded Composite",description:"Smooth surface moulded panel. Pre-primed, ready to paint. Most common interior door in residential construction.",uniqueFeatures:["Pre-primed","Ships same week","Hollow or solid core"],priceRange:"$"},{name:"Moulded Panel — Textured",type:"Interior — Paint Grade",material:"Moulded Composite",description:"Embossed wood-grain texture moulded panel. Mimics real wood at entry-level price.",uniqueFeatures:["Embossed grain texture","Pre-primed","Fast availability"],priceRange:"$"},{name:"Solidoor — Solid Core",type:"Interior — Paint Grade",material:"Solid Core Composite",description:"Solid core for acoustic performance and a quality feel. Fire-rated versions available.",uniqueFeatures:["Acoustic performance","Fire-rated versions","Quality feel vs. hollow core"],priceRange:"$$"},{name:"Modern — Shaker / Flush",type:"Interior — Contemporary",material:"MDF / Composite",description:"Clean-line shaker and flush doors for contemporary homes. Pre-primed.",uniqueFeatures:["Contemporary profiles","Pre-primed","Competitively priced"],priceRange:"$$"}],frameMaterials:["Moulded Composite","Solid Core","MDF"],finishes:[{name:"Pre-Primed White",swatch:"#f0ede6"},{name:"Ready to Paint",swatch:"#2A3028"}],differentiators:["Best in-stock availability","Most affordable whole-house package","Fire-rated solid core options","Huge selection of profiles"],idealFor:["Production builders doing multiple units","Budget-managed whole-house packages","Secondary bedrooms and closets","Fast-turnaround remodels"],limitations:["Paint grade only — no stain grade","Moulded surface less convincing than solid wood","Hollow core lacks acoustic performance"],sdNotes:"The standard door for Carmel Valley and Scripps Ranch production remodels. Builders use Masonite for the bulk of interior doors and upgrade to TM Cobb for visible feature doors." },
    { id:"trustile", sells:["Interior Doors"], website:"https://www.trustile.com", name:"TruStile Doors", logo:"TS", color:T.gold, tagline:"The Precision MDF & Wood Door Standard", tier:"Luxury", tierColor:T.gold, origin:"Denver CO — precision door manufacturer", overview:"TruStile is the benchmark for high-end MDF interior doors in the luxury residential market. Their MDF doors are machined to exceptionally tight tolerances — flat, square, and consistent in a way that solid wood construction cannot guarantee — making them the preferred choice for architects and designers who want perfectly flat paint-grade doors that hold their finish and dimension for decades. Beyond MDF, TruStile also manufactures stain-grade interior doors in a range of wood species and offers a curated line of exterior wood entry doors. The brand is heavily specified in contemporary and transitional luxury homes where the door profile, gap consistency, and paint surface are design-critical details.", productLines:[{name:"TruStile MDF — Contemporary & Shaker",type:"Interior — Paint Grade",material:"Precision MDF",description:"TruStile's flagship product line — precision-machined MDF interior doors in an extensive range of contemporary, shaker, and transitional profiles. The MDF core is dimensionally stable and machines to razor-sharp edges, producing crisp profiles and a perfectly flat surface that accepts paint flawlessly. Available in hundreds of configurations: flat panels, v-groove, glass lites, barn door slabs, and custom panel layouts. Solid core standard. The go-to specification for luxury interiors where paint-grade door quality is a visible design element.",uniqueFeatures:["Precision-machined MDF — flat, square, dimensionally stable","Sharp crisp profiles — edges hold paint without telegraphing grain","Hundreds of panel configurations and glass lite options","Solid core standard — acoustic and tactile quality","Custom sizing — non-standard heights and widths available","ADA-compliant configurations","Barn door slabs and bi-fold available"],priceRange:"$$$$"},{name:"TruStile Wood — Stain Grade",type:"Interior — Stain Grade",material:"Solid Wood",description:"TruStile's stain-grade interior door line in a selection of premium wood species. Available in the same profiles as the MDF line — stile and rail shaker, multi-panel traditional, and contemporary flat — allowing mixed paint/stain specification within the same profile family for visual consistency. Species options include White Oak, Walnut, Alder, Cherry, Maple, and Douglas Fir.",uniqueFeatures:["Same profiles as MDF line — mix paint/stain in same project","Multiple species: White Oak, Walnut, Alder, Cherry, Maple, Fir","Custom panel configurations","Consistent with TruStile whole-house aesthetic"],priceRange:"$$$$–$$$$$"},{name:"TruStile Exterior — Wood Entry Doors",type:"Exterior Entry",material:"Solid Wood",description:"TruStile's exterior wood entry door line. Solid wood construction in the same contemporary and transitional profiles as the interior line — allowing interior and exterior doors to share the same visual profile family. Intended for protected entry applications with proper overhang. Available in single, double, and sidelite configurations.",uniqueFeatures:["Matches interior door profiles","Solid wood construction","Single, double, and sidelite configurations","Contemporary and transitional profiles"],priceRange:"$$$$$"}],frameMaterials:["Precision MDF","Solid Wood (Stain Grade)"],finishes:[{name:"Paint Grade MDF",swatch:"#f0ede6"},{name:"White Oak",swatch:"#c8a870"},{name:"Walnut",swatch:"#5a3a1a"},{name:"Alder",swatch:"#9a6a40"},{name:"Black Paint",swatch:"#1A1A1A"},{name:"Custom Color",swatch:"linear-gradient(135deg,#1a1a1a,#f0ede6)"}],differentiators:["Precision MDF — flattest, most consistent paint-grade door in the market","Same profiles available in MDF and wood — mix paint/stain on one project","Exterior wood entry doors that match the interior door family","Hundreds of panel configurations including custom glass lites","Architect and designer specified — a design-world brand with genuine credentials","Crisp machined profiles hold paint edges far longer than solid wood"],idealFor:["Luxury new construction where door quality is a visible design detail","Contemporary and transitional homes wanting perfectly flat paint-grade doors","Projects mixing paint-grade MDF and stain-grade wood in the same profile","Architects and interior designers specifying door profiles as a design element","Whole-house interior packages where consistency and quality are paramount"],limitations:["Premium pricing — significantly above Masonite and JELD-WEN","MDF is heavy — hardware and hinges must be appropriately specified","Exterior wood doors require protected installation — not for exposed entries","Lead times on custom configurations","Less widely stocked locally than TM Cobb — may require direct order"],sdNotes:"TruStile is the choice when the architect or designer is treating the interior doors as a finish element rather than a commodity item. In La Jolla, Del Mar, and Rancho Santa Fe new construction, the flat-panel MDF shaker in a dark paint or black finish is increasingly the spec over solid wood — the precision surface and edge consistency that TruStile delivers is genuinely different from what even TM Cobb's MDF line offers. White Oak stain-grade in the same profile family as the MDF doors is a strong whole-house story. Lead with TruStile any time a client or their designer says 'I want the doors to look like furniture.'" },
    { id:"jeldwen_int", sells:["Interior Doors"], website:"https://www.jeld-wen.com", name:"JELD-WEN", logo:"JW", color:T.slate, tagline:"Global Range, Local Availability", tier:"Premium", tierColor:T.slate, origin:"Klamath Falls OR — global manufacturer", overview:"Bridges the gap between Masonite's volume pricing and TM Cobb's custom — stain-grade wood, architectural styles, and solid construction at competitive pricing.", productLines:[{name:"Craftsman — Stile & Rail",type:"Interior — Stain Grade",material:"Solid Wood",description:"Traditional stile and rail in multiple panel configurations. Available in stain-grade pine, fir, and alder.",uniqueFeatures:["Stain grade available","Multiple panel counts","Traditional joinery"],priceRange:"$$–$$$"},{name:"Architectural — Flush",type:"Interior — Paint Grade",material:"MDF / Hardboard",description:"Flush slab for contemporary and modern interiors. Pre-primed.",uniqueFeatures:["Smooth flush face","Solid or hollow core","Pre-primed"],priceRange:"$$"},{name:"Molded — Textured Panel",type:"Interior — Paint Grade",material:"Moulded Composite",description:"Volume textured panel door. Full range of profiles from 2-panel to 6-panel.",uniqueFeatures:["Wide profile selection","Pre-primed","Fast availability"],priceRange:"$–$$"},{name:"Glass Lite Interior",type:"Interior — Glass",material:"Wood / MDF",description:"Interior doors with decorative glass inserts. French door and partial-lite configurations.",uniqueFeatures:["Multiple glass patterns","Light-borrowing between rooms"],priceRange:"$$$"}],frameMaterials:["Solid Wood","MDF","Moulded Composite"],finishes:[{name:"Pre-Primed",swatch:"#f0ede6"},{name:"Stain Grade",swatch:"#a07040"},{name:"Natural Fir",swatch:"#c09060"},{name:"Alder",swatch:"#8a6040"}],differentiators:["Stain-grade solid wood at competitive prices","Bridge between Masonite and TM Cobb","Wide architectural style range","Glass lite interior door selection"],idealFor:["Mid-range remodels wanting stain grade without TM Cobb pricing","Projects needing glass-lite interior doors","Transitional homes needing variety of profiles"],limitations:["Less custom capability than TM Cobb","Longer lead times on stain-grade vs. stock"],sdNotes:"A reliable mid-range interior door option with more style and finish variety than big-box alternatives, including genuine stain-grade wood. A good fit for San Diego homeowners who want quality interior doors without the premium pricing of a fully custom manufacturer." },
  ],
  skylights: [
    { id:"velux", sells:["Skylights"], website:"https://www.velux.com", name:"VELUX", logo:"VX", color:T.gold, tagline:"The World's #1 Skylight Brand", tier:"Premium", tierColor:T.gold, origin:"Denmark — global leader since 1941", overview:"The world's #1 skylight brand — solar-powered venting with rain sensor, No Leak Promise, and Sun Tunnels for interior rooms. The brand clients already ask for by name.", productLines:[{name:"Fixed Skylight — FCM",type:"Fixed Skylight",material:"Aluminum + Laminated Glass",description:"Standard fixed skylight. Aluminum frame, low-E laminated glass. Most popular residential skylight.",uniqueFeatures:["No Leak Promise","Low-E laminated glass","Standard and deck-mount configs"],priceRange:"$$"},{name:"Solar-Powered Venting — VSS",type:"Venting Skylight",material:"Aluminum + Laminated Glass",description:"Opens and closes via solar-powered motor — no electrical wiring required. Rain sensor auto-closes.",uniqueFeatures:["Solar powered — no wiring","Rain sensor","Remote or app control","No Leak Promise"],priceRange:"$$$"},{name:"Electric Venting — VES",type:"Venting Skylight",material:"Aluminum",description:"Hardwired electric motor. For projects where solar isn't preferred.",uniqueFeatures:["Hardwired motor","App compatible","Rain sensor available"],priceRange:"$$$"},{name:"Manual Venting — VMS",type:"Venting Skylight",material:"Aluminum",description:"Hand-crank operated venting skylight. Most affordable venting option.",uniqueFeatures:["Manual crank operation","Lower cost than solar/electric","Good for accessible locations"],priceRange:"$$"},{name:"Sun Tunnel / Tubular Daylight",type:"Tubular Skylight",material:"Aluminum + Acrylic",description:"Flexible tube channels daylight into rooms without full skylight installation. Interior rooms, hallways, bathrooms.",uniqueFeatures:["No structural modification","Installs in 2 hours","Rigid or flexible tube"],priceRange:"$"}],frameMaterials:["Extruded Aluminum (standard)","Wood-lined (interior upgrade)","Copper (specialty)"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Black",swatch:"#1A1A1A"},{name:"Brushed Aluminum",swatch:"#7A7A7A"},{name:"Copper",swatch:"#b87333"}],differentiators:["No Leak Promise — industry-first warranty","Solar powered venting — no electrical rough-in needed","Rain sensor auto-close on all venting models","Sun Tunnel for rooms without roof access","#1 brand recognition — customers already asking for VELUX by name"],idealFor:["Any residential skylight application","Bathrooms and interior rooms needing light (Sun Tunnel)","Clients wanting venting without electrical work (solar)","New construction and remodel"],limitations:["Premium pricing vs. generic skylights","Curb-mount configs require additional flashing kit"],sdNotes:"The world's most trusted skylight brand — if natural light and ventilation matter to you, VELUX is the name to know. Their solar-powered venting skylight opens and closes automatically (even in rain) with no electrical wiring required. Sun Tunnels bring daylight into interior rooms and hallways that have no roof access." },
    { id:"andersen_skylight", website:"https://www.andersenwindows.com/skylights", name:"Andersen Skylights", logo:"AS", color:T.teal, tagline:"Window Quality Applied to the Roof", tier:"Premium", tierColor:T.teal, origin:"Bayport MN — extension of Andersen Windows", overview:"Andersen's skylight line brings the same quality standards as their window line. Best for projects already specifying Andersen windows — creates a unified aesthetic and single-vendor relationship. Strong energy performance and matching finish options.", productLines:[{name:"Fixed Roof Window",type:"Fixed Skylight",material:"Fibrex® Composite + Glass",description:"Fixed skylight in Fibrex® composite frame. Matches Andersen window aesthetic.",uniqueFeatures:["Matches Andersen window line","Fibrex® frame","Low-E glass"],priceRange:"$$–$$$"},{name:"Venting Roof Window",type:"Venting Skylight",material:"Fibrex® Composite",description:"Manually or electrically operated venting. Matches Andersen product line.",uniqueFeatures:["Matching Andersen finish options","Manual or electric","Integrates with Andersen whole-house package"],priceRange:"$$$"}],frameMaterials:["Fibrex® Composite","Aluminum-clad"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Black Satin",swatch:"#1A1A1A"},{name:"Sandtone",swatch:"#5A4A30"}],differentiators:["Matches Andersen window product line aesthetically","Single vendor for windows + skylights","Fibrex® composite frame — won't rot or corrode"],idealFor:["Projects already specifying Andersen windows","Clients wanting whole-house product consistency"],limitations:["Less skylight-specific specialization than VELUX","Smaller product line than VELUX"],sdNotes:"Best specified when the client is already getting Andersen E-Series windows — lets you consolidate the order and simplify the install." },
  ],
  closet: [
    { id:"contractors_wardrobe", website:"https://www.contractorswardrobe.com", name:"Contractor's Wardrobe", logo:"CW", color:T.gold, tagline:"Premium Closet & Wardrobe Door Systems", tier:"Premium", tierColor:T.gold, origin:"California — specialty wardrobe and closet door manufacturer", overview:"Contractor's Wardrobe is a leading specialty manufacturer of wardrobe and closet door systems. Known for their mirrored bypass doors, sliding wardrobe systems, and custom-fit closet door solutions. A go-to for builders and remodelers who need clean, professionally finished closet door packages.", productLines:[{name:"Mirrored Bypass Sliding Doors",type:"Closet — Sliding",material:"Mirror + Aluminum Frame",description:"Classic mirrored bypass doors on overhead track. Standard and custom sizes. Multiple frame finish options.",uniqueFeatures:["Mirrored panels","Overhead track — no floor track","Multiple frame finishes"],priceRange:"$$–$$$"},{name:"Glass & Panel Bypass Doors",type:"Closet — Sliding",material:"Glass / Laminate + Aluminum",description:"Bypass sliding doors in frosted glass, clear glass, or laminate panel. Modern aesthetic.",uniqueFeatures:["Frosted or clear glass options","Laminate panel colors","Clean contemporary look"],priceRange:"$$$"},{name:"Bi-Fold Wardrobe Doors",type:"Closet — Bi-fold",material:"Mirror / Laminate / Wood",description:"Bi-fold closet doors in mirror, laminate, and wood configurations. Standard and custom widths.",uniqueFeatures:["Mirror, glass, or laminate","Standard and custom sizing","Multiple frame finishes"],priceRange:"$$–$$$"},{name:"Custom Wardrobe Systems",type:"Closet — Custom",material:"Various",description:"Fully custom wardrobe door systems for non-standard openings and designer specifications.",uniqueFeatures:["Custom dimensions","Custom frame colors","Specialty glass and panel options"],priceRange:"$$$–$$$$"}],frameMaterials:["Extruded Aluminum (standard)","Wood-wrapped frames","Powder-coated steel"],finishes:[{name:"Bright Brass",swatch:"#9A7020"},{name:"Satin Nickel",swatch:"#6A6A6A"},{name:"Oil-Rubbed Bronze",swatch:"#3a2a1a"},{name:"Matte Black",swatch:"#1A1A1A"},{name:"White",swatch:"#f0ede6"},{name:"Chrome",swatch:"#4A4A4A"}],differentiators:["Specialty wardrobe door focus — deeper product knowledge than general door brands","Mirrored bypass doors in custom sizes","Wide frame finish selection to match hardware","Strong builder and remodeler program"],idealFor:["Master bedroom wardrobe and walk-in closet doors","Any closet needing mirrored or glass sliding doors","Remodels replacing builder-grade bypass doors with premium alternatives"],limitations:["Closet door systems only — not a full closet organizer vendor","Custom sizes add lead time"],sdNotes:"Strong add-on to any interior door package. When you're speccing TM Cobb interior doors, bring up Contractor's Wardrobe for the closet bypasses — it keeps the project's finish quality consistent throughout." },
    { id:"elel_closet", website:"https://www.elelwoodproducts.com", name:"EL&EL Wood Products", logo:"EL", color:T.teal, tagline:"California Wood Products — Closet & Millwork", tier:"Mid-Premium", tierColor:T.teal, origin:"California — regional wood products manufacturer and distributor", overview:"EL&EL is a California-based wood products company supplying closet components, millwork, and interior wood products through dealer networks. A practical, builder-friendly source for closet shelving components, wood panels, and millwork packages for production and custom builds alike.", productLines:[{name:"Closet Shelving Components",type:"Closet — Shelving",material:"Melamine / Wood",description:"Melamine and wood closet shelving components. Double hang rods, shelves, drawers — builder and custom configurations.",uniqueFeatures:["Builder program pricing","Melamine and wood options","Mix-and-match components"],priceRange:"$–$$"},{name:"Wood Panel Products",type:"Millwork / Panels",material:"Plywood / MDF / Hardwood",description:"Hardwood plywood, MDF panels, and specialty wood panels for cabinetry, closets, and millwork.",uniqueFeatures:["Wide species selection","Sheet goods and components","California sourced"],priceRange:"$$"},{name:"Interior Millwork Packages",type:"Millwork",material:"Wood / MDF",description:"Casing, base, crown, and millwork packages for whole-house interior finishing.",uniqueFeatures:["Coordinated millwork packages","Custom profiles available","Matches door and window casing"],priceRange:"$$–$$$"}],frameMaterials:["Melamine","MDF","Hardwood Plywood","Solid Wood"],finishes:[{name:"White Melamine",swatch:"#f0ede6"},{name:"Almond",swatch:"#d4c09a"},{name:"Natural Wood",swatch:"#a07040"},{name:"Custom Laminate",swatch:"linear-gradient(135deg,#f0ede6,#5a3a1a)"}],differentiators:["California manufacturer — fast regional availability","Closet components plus millwork under one roof","Builder-friendly program and pricing","Wood panel products for custom cabinetry and closets"],idealFor:["Production builders needing closet component packages","Projects combining closet shelving with interior millwork","Budget-managed builds wanting wood products without custom pricing"],limitations:["Component-based — not a full custom closet design service","Less finish variety than specialty closet brands"],sdNotes:"A natural pairing for production builders who want closet components and millwork handled through one trusted relationship alongside their door and window package. EL&EL handles the closet components and millwork — keeping the project flowing through a single coordinated supply chain." },
    { id:"orepac", website:"https://www.orepac.com", name:"Orepac Building Products", logo:"OP", color:T.rust, tagline:"Pacific Northwest Building Products Distributor", tier:"Mid-Premium", tierColor:T.rust, origin:"Oregon — major Pacific Northwest building products distributor", overview:"Orepac is a major regional building products distributor supplying doors, windows, millwork, and closet/shelving products across the Western US. They carry a broad range of closet and storage products alongside interior doors, making them a one-stop distributor for builders managing complex supply chains.", productLines:[{name:"Closet Organizer Systems",type:"Closet",material:"Melamine / Wire / Laminate",description:"Closet organizer systems from multiple manufacturers. Wire, melamine, and laminate configurations.",uniqueFeatures:["Multiple manufacturer options","Wire through laminate spectrum","Builder volume pricing"],priceRange:"$–$$$"},{name:"Interior Door Packages",type:"Interior Doors",material:"Various",description:"Interior door packages — hollow core, solid core, moulded panel, and shaker — through distribution.",uniqueFeatures:["Wide brand selection","Pre-hung packages","Volume builder pricing"],priceRange:"$–$$$"},{name:"Millwork & Moulding",type:"Millwork",material:"Wood / MDF",description:"Interior millwork, casing, base, crown, and stair parts through distribution.",uniqueFeatures:["Wide profile selection","Coordinates with door packages","Builder program"],priceRange:"$$"}],frameMaterials:["Various — distributor carries multiple brands"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Natural",swatch:"#a07040"},{name:"Various",swatch:"linear-gradient(135deg,#f0ede6,#1a0f0a)"}],differentiators:["Broad distributor — doors, closet, millwork under one order","Strong builder volume pricing","Western US distribution network","One purchase order for multiple product categories"],idealFor:["Production builders managing multiple product categories","Projects needing closet + interior doors + millwork from one source","Volume builders wanting streamlined ordering"],limitations:["Distributor — not a specialty manufacturer with unique products","Less design-focused than specialty brands"],sdNotes:"Orepac is a logistics and volume play — useful when a builder wants to consolidate closet, millwork, and interior door ordering into a single distributor relationship alongside their window and exterior door package." },
  ],
  utility: [
    { id:"thermatru_util", website:"https://www.thermatru.com", name:"Therma-Tru", logo:"TT", color:T.rust, tagline:"Fiberglass & Steel Utility Doors", tier:"Premium", tierColor:T.rust, origin:"Maumee OH — Fortune Brands", overview:"Beyond their flagship entry doors, Therma-Tru manufactures a full range of utility and secondary exterior doors in fiberglass and steel. Garage access doors, laundry room entries, side entries, and secondary exterior doors — all with the same quality and weatherproofing as their entry door line.", productLines:[{name:"Fiber-Classic® — Utility Sizes",type:"Utility Exterior",material:"Fiberglass",description:"Fiberglass utility doors in standard utility sizes. Won't warp, rot, or corrode. Outperforms steel for secondary entries.",uniqueFeatures:["Won't warp or rot","Insulated core","ENERGY STAR"],priceRange:"$$$"},{name:"Pulse® Steel — Utility",type:"Utility Exterior",material:"Steel",description:"Steel utility doors for garage access, side entries, laundry rooms. Security-focused and affordable.",uniqueFeatures:["Security-grade steel","Insulated foam core","Fire-rated versions available"],priceRange:"$$"},{name:"Fire-Rated Door Units",type:"Fire-Rated",material:"Steel / Fiberglass",description:"20-minute and 90-minute fire-rated door units for garage-to-living-space separation. Code-required in attached garages.",uniqueFeatures:["Code-compliant fire rating","Pre-hung units available","Steel or fiberglass"],priceRange:"$$–$$$"}],frameMaterials:["Fiberglass","Steel"],finishes:[{name:"Pre-Primed White",swatch:"#f0ede6"},{name:"Factory Colors",swatch:"#8A6020"},{name:"Paintable",swatch:"#2A3028"}],differentiators:["Fire-rated units for garage separation (code required)","Fiberglass outperforms steel for moisture-prone secondary entries","Same Therma-Tru quality as entry door line","Easy to bundle with entry door order"],idealFor:["Garage-to-living-space access doors (fire-rated required)","Laundry room and side entry exterior doors","Any secondary exterior door needing fiberglass durability"],limitations:["Not as decorative as entry door line","Custom sizes add lead time"],sdNotes:"Always ask about garage access when selling a Therma-Tru entry door — the fire-rated garage door is a code requirement in attached garages and a natural add-to the order. Quick upsell, easy approval." },
    { id:"abs", website:"https://www.absdoors.com", name:"ABS (American Building Supply)", logo:"AB", color:T.slate, tagline:"Western US Door & Millwork Distributor", tier:"Mid-Premium", tierColor:T.slate, origin:"Stockton CA — major Western US distributor", overview:"ABS is one of the largest door and millwork distributors in the Western United States, supplying exterior and interior doors, frames, and related products through a dealer network. They carry a wide portfolio of manufacturers for secondary and utility door applications, making them a practical source for utility door packages at volume.", productLines:[{name:"Utility Exterior Doors — Steel",type:"Utility Exterior",material:"Steel",description:"Steel pre-hung utility doors for secondary entries. Multiple manufacturers through distribution.",uniqueFeatures:["Pre-hung units","Multiple manufacturer options","Builder volume pricing"],priceRange:"$$"},{name:"Utility Exterior Doors — Fiberglass",type:"Utility Exterior",material:"Fiberglass",description:"Fiberglass utility doors through distribution. Better moisture resistance than steel.",uniqueFeatures:["Fiberglass durability","Pre-hung options","Multiple brands"],priceRange:"$$–$$$"},{name:"Hollow Metal Frames",type:"Frames",material:"Steel",description:"Hollow metal door frames for commercial and semi-commercial applications.",uniqueFeatures:["Commercial-grade frames","Fire-rated assemblies","Welded or KD"],priceRange:"$$"},{name:"Interior Utility Doors",type:"Interior",material:"Solid Core / Fire-Rated",description:"Solid core and fire-rated interior doors for mechanical rooms, utility spaces, and separation walls.",uniqueFeatures:["Fire-rated options","Solid core for acoustics","Pre-hung available"],priceRange:"$$"}],frameMaterials:["Steel","Fiberglass","Hollow Metal"],finishes:[{name:"Pre-Primed",swatch:"#f0ede6"},{name:"Galvanized Steel",swatch:"#a0a8a8"},{name:"Various",swatch:"linear-gradient(135deg,#e0ddd5,#3a3a3a)"}],differentiators:["Major Western US distributor — broad product access","Strong pre-hung utility door packages","Hollow metal frames for commercial and semi-commercial","Volume pricing for builders doing multiple units"],idealFor:["Production builders needing utility door packages at volume","Commercial and semi-commercial utility applications","Secondary entries, mechanical rooms, utility spaces"],limitations:["Distributor — not a specialty manufacturer","Less design-focused — primarily utilitarian products"],sdNotes:"ABS is the practical call when a builder needs a volume of utility and secondary doors quickly. Useful for ADU projects and production builds where the secondary entries are just functional — leave the entry door conversation for Therma-Tru and TM Cobb." },
    { id:"elel_util", website:"https://www.elelwoodproducts.com", name:"EL&EL Wood Products", logo:"EL", color:T.teal, tagline:"California Wood & Millwork — Utility Applications", tier:"Mid-Premium", tierColor:T.teal, origin:"California — regional wood products manufacturer and distributor", overview:"EL&EL's wood product lines extend into utility door applications — interior wood doors, millwork packages, and wood components used in utility and secondary door installations. Their California presence and builder relationships make them a convenient source when wood utility doors or interior components are needed alongside a larger package.", productLines:[{name:"Interior Wood Utility Doors",type:"Interior Utility",material:"Solid Core Wood / MDF",description:"Solid core interior doors for utility, mechanical, and secondary room applications. Pre-hung options.",uniqueFeatures:["Solid core — acoustic and security","Pre-hung available","Paint grade"],priceRange:"$$"},{name:"Wood Panel Components",type:"Millwork",material:"Plywood / MDF",description:"Panel products for utility rooms, garages, and secondary space finishing.",uniqueFeatures:["Builder pricing","Sheet goods and components","Fast regional availability"],priceRange:"$–$$"}],frameMaterials:["Solid Core Wood","MDF","Plywood"],finishes:[{name:"Pre-Primed",swatch:"#f0ede6"},{name:"Natural Wood",swatch:"#a07040"},{name:"White Melamine",swatch:"#f0ede6"}],differentiators:["California regional availability — fast delivery","Pairs with closet components (same vendor, one order)","Builder-friendly pricing and relationships","Wood utility doors for projects wanting wood over steel"],idealFor:["Interior utility doors in wood-preferred applications","Projects already ordering EL&EL closet components — easy add","Builder packages combining millwork and utility doors"],limitations:["More limited utility door selection vs. dedicated door manufacturers","Best used as part of a larger EL&EL package"],sdNotes:"EL&EL works best when a builder is already sourcing closet components from them — adding utility interior doors to the same order simplifies the supply chain and builds your relationship as the person who made the whole package easy." },
    { id:"tmcobb_util", sells:["Entry Doors","Interior Doors"], website:"https://www.tmcobb.com", heroImage:"/tmcobbhero.jpg", name:"TM Cobb", logo:"TC", color:T.plum, tagline:"Custom Wood — Secondary & Utility Doors", tier:"Luxury", tierColor:T.plum, origin:"Southern California — local manufacturer", overview:"TM Cobb's custom capability extends to secondary exterior and utility doors — matching the entry door family throughout the project for whole-home consistency.", productLines:[{name:"Moulded Door Catalogue 2024",type:"Interior — Moulded",material:"Moulded Composite",description:"TM Cobb's complete moulded door catalogue — covers the full range of moulded panel door styles, profiles, and finish options for interior applications.",uniqueFeatures:["Full moulded door line","Panel styles & profiles","2024 edition"],priceRange:"$$–$$$",brochureUrl:"https://tmcobb.com/wp-content/uploads/2024/02/MOLDED_DOOR_BROCHURE-2024.pdf"},{name:"TM Cobb Red Book 2025",type:"Full Line",material:"Wood / MDF / Composite",description:"The complete TM Cobb product catalog — the Red Book covers the full range of custom entry doors, interior collections, stile-and-rail profiles, shaker lines, and specialty configurations. The definitive TM Cobb specification reference.",uniqueFeatures:["Complete product catalog","Entry & interior door lines","Specification reference"],priceRange:"$$$–$$$$$",brochureUrl:"https://tmcobb.com/wp-content/uploads/2026/02/TMC_RedBook-2025.pdf"},{name:"Secondary Exterior Wood Doors",type:"Secondary Exterior",material:"Solid Wood / Composite",description:"Custom wood secondary exterior doors matching the entry door family. Side entries, garage access, service entries.",uniqueFeatures:["Matches entry door design","Custom sizes","Same species and finish as entry"],priceRange:"$$$$"},{name:"Interior Utility — Custom Wood",type:"Interior Utility",material:"Solid Wood / MDF",description:"Custom interior doors for utility and secondary spaces in luxury builds. Maintains quality throughout.",uniqueFeatures:["Consistent quality whole-house","Custom sizes","Paint or stain grade"],priceRange:"$$$"}],frameMaterials:["Solid Wood","Wood Composite","MDF"],finishes:[{name:"Custom Stain",swatch:"#5a3a1a"},{name:"Black",swatch:"#1A1A1A"},{name:"White",swatch:"#f0ede6"},{name:"Natural Wood",swatch:"#a07040"},{name:"Custom Paint",swatch:"linear-gradient(135deg,#1a1a1a,#f0ede6)"}],differentiators:["Matching door families — entry + secondary + interior from one manufacturer","Custom sizing for any opening","California manufacturer — strong local support","Maintains luxury quality in utility applications"],idealFor:["Luxury custom builds wanting consistent door quality throughout","Side entries and service doors matching the front entry","High-end remodels where even utility doors are a design statement"],limitations:["Premium pricing — overkill for purely functional utility applications","4–8 week lead times on custom"],sdNotes:"For homeowners investing in a premium entry door, TM Cobb can match that quality all the way through the home — including side entries, garage access doors, and utility spaces. Keeps the whole home feeling intentional and cohesive rather than premium at the front and afterthought everywhere else." },
  ],
  entry_doors: [
    { id:"thermatru", heroImage:"/thermatru-hero.jpg", sells:["Entry Doors"], website:"https://www.thermatru.com", name:"Therma-Tru", logo:"TT", color:T.rust, tagline:"America's #1 Entry Door Brand", tier:"Premium", tierColor:T.rust, origin:"Maumee OH — Fortune Brands", overview:"America's #1 entry door brand — pioneered fiberglass entry. Most realistic wood grain in fiberglass, gel-stainable, and won't warp or corrode in coastal conditions.", productLines:[{name:"Full Product Brochure 2024",type:"Full Line",material:"Fiberglass / Steel",description:"The complete Therma-Tru 2024 product brochure — full coverage of the Fiber-Classic®, Classic-Craft®, and Pulse® lines with door styles, glass inserts, finish options, and system components.",uniqueFeatures:["Full product line overview","Door styles, glass, and finish options","2024 edition"],priceRange:"$$$–$$$$",brochureUrl:"https://mcprideroofing.com/imageserver/Reusable/thermatru/brochure.pdf"},{name:"Fiber-Classic®",type:"Fiberglass Entry",material:"Fiberglass",description:"Authentic wood grain. Gel-stainable. Won't warp or rot.",uniqueFeatures:["Gel-stain ready","ENERGY STAR","8ft heights"],priceRange:"$$$"},{name:"Pulse® Contemporary",type:"Fiberglass/Steel Entry",material:"Fiberglass or Steel",description:"Modern flush designs for contemporary architecture.",uniqueFeatures:["Flush modern","Glass inserts","Available black"],priceRange:"$$$"},{name:"Classic-Craft®",type:"Premium Fiberglass",material:"Fiberglass",description:"Top-of-line. Deep wood grain, widest design selection.",uniqueFeatures:["Deepest wood grain in fiberglass","8ft + 10ft heights","Custom glass inserts"],priceRange:"$$$$"}],frameMaterials:["Fiberglass","Steel"],finishes:[{name:"Onyx",swatch:"#1A1A1A"},{name:"White",swatch:"#f0ede6"},{name:"Walnut",swatch:"#5a3a1a"},{name:"Oak",swatch:"#9a7a4a"},{name:"Cherry",swatch:"#7a2a1a"},{name:"Custom Paint",swatch:"linear-gradient(135deg,#C87A4A,#C9A84C)"}],differentiators:["#1 fiberglass entry brand in US","Most realistic wood grain in fiberglass","Gel-stained to match any interior wood","Won't warp or corrode coastal"],idealFor:["Traditional and craftsman homes","Coastal properties needing rot-resistant entry","Clients wanting wood look, no maintenance"],limitations:["Fewer ultra-modern profiles","Custom sizes add lead time"],sdNotes:"America's #1 fiberglass entry door brand — if you love the look of a stained wood entry door but don't want the maintenance, Therma-Tru's fiberglass replicates the grain and warmth so convincingly most people can't tell the difference. Won't warp, rot, or corrode — ideal for coastal San Diego homes." },
    { id:"tmcobb", sells:["Entry Doors","Interior Doors"], website:"https://www.tmcobb.com", heroImage:"/tmcobbhero.jpg", name:"TM Cobb", logo:"TC", color:T.plum, tagline:"Custom Wood Doors, California Craft", tier:"Luxury", tierColor:T.plum, origin:"Southern California — local manufacturer", overview:"California's custom wood door specialist for luxury entry and interior doors. Fully custom sizing, multiple species, and strong local support with shorter ETAs than out-of-state competitors.", productLines:[{name:"Moulded Door Catalogue 2024",type:"Interior — Moulded",material:"Moulded Composite",description:"TM Cobb's complete moulded door catalogue — covers the full range of moulded panel door styles, profiles, and finish options for interior applications.",uniqueFeatures:["Full moulded door line","Panel styles & profiles","2024 edition"],priceRange:"$$–$$$",brochureUrl:"https://tmcobb.com/wp-content/uploads/2024/02/MOLDED_DOOR_BROCHURE-2024.pdf"},{name:"TM Cobb Red Book 2025",type:"Full Line",material:"Wood / MDF / Composite",description:"The complete TM Cobb product catalog — the Red Book covers the full range of custom entry doors, interior collections, stile-and-rail profiles, shaker lines, and specialty configurations. The definitive TM Cobb specification reference.",uniqueFeatures:["Complete product catalog","Entry & interior door lines","Specification reference"],priceRange:"$$$–$$$$$",brochureUrl:"https://tmcobb.com/wp-content/uploads/2026/02/TMC_RedBook-2025.pdf"},{name:"Custom Entry Doors",type:"Solid Wood Entry",material:"Solid Wood / Composite",description:"Fully custom wood entries. Any design, size, species.",uniqueFeatures:["Fully custom","Multiple species","California-made"],priceRange:"$$$$–$$$$$"},{name:"Interior Door Collections",type:"Interior Doors",material:"Wood / MDF / Composite",description:"Full interior lines — stile/rail, flush, shaker, panel.",uniqueFeatures:["Matching interior/exterior","Pre-hung options","Custom paint/stain"],priceRange:"$$$"}],frameMaterials:["Solid Wood","Wood Composite","MDF"],finishes:[{name:"Custom Stain",swatch:"#5a3a1a"},{name:"Black",swatch:"#1A1A1A"},{name:"White",swatch:"#f0ede6"},{name:"Natural Wood",swatch:"#a07040"},{name:"Custom Paint",swatch:"linear-gradient(135deg,#1a1a1a,#f0ede6)"}],differentiators:["Fully custom — any size/design/species","California manufacturer — shorter ETAs","Matching interior door families","Deep local support"],idealFor:["Custom luxury homes needing custom entry","Clients matching interior/exterior door families"],limitations:["Custom lead times 6–12 weeks","Wood entry needs coastal maintenance"],sdNotes:"California's leading custom wood door maker — if you want a front door that makes a statement and is built exactly to your specifications, TM Cobb is the local standard. Multiple species, finishes, and designs, all manufactured nearby for faster lead times." },

    { id:"simpson", sells:["Entry Doors","Interior Doors"], website:"https://www.simpsondoor.com", heroImage:"/simpsonhero.webp", name:"Simpson Door Company", logo:"SD", color:T.rust, tagline:"America's Premier Wood Door Craftsman", tier:"Luxury", tierColor:T.rust, origin:"McCleary WA — family-owned since 1912", overview:"110+ year family-owned wood door manufacturer with the widest species selection available. Contemporary Collection is the most architect-specified wood entry door line in SD's high-end market.", productLines:[{name:"Sourcebook",type:"Full Line",material:"Solid Wood / Fiberglass",description:"The complete Simpson Door Sourcebook — the master reference for the full Simpson product line. Every door family, species, profile, glass option, and specification detail in one comprehensive catalog.",uniqueFeatures:["Complete product reference","All door families & species","Full specifications"],priceRange:"$$$–$$$$$",brochureUrl:"https://www.simpsondoor.com/literature/pdfs/Sourcebook.pdf"},{name:"Contemporary Exterior & Interior Brochure",type:"Full Line — Contemporary",material:"Solid Wood",description:"Simpson's dedicated contemporary door brochure — covers the full Contemporary Collection for both exterior entry and interior applications. Profiles, glass configurations, species options, and finish details for modern architecture.",uniqueFeatures:["Contemporary exterior & interior lines","Glass configurations & profiles","Species and finish options"],priceRange:"$$$–$$$$",brochureUrl:"https://www.simpsondoor.com/literature/pdfs/Contemporary-Doors-Brochure.pdf"},{name:"Contemporary Collection",type:"Exterior Entry — Wood",material:"Solid Wood",description:"Bold modern entry doors — flush panels, horizontal grain, full-lite glass configurations, and oversized pivot-style designs. The most-specified Simpson line for new contemporary SD builds.",uniqueFeatures:["Full-lite glass options","Horizontal grain flush panels","Pivot-ready configurations","Modern proportions"],priceRange:"$$$$"},{name:"Traditional — Stile & Rail",type:"Exterior Entry — Wood",material:"Solid Wood",description:"Classic stile-and-rail construction in 2, 3, 4, 5, and 6-panel configurations. Available in a wide range of wood species. The standard for traditional, craftsman, and transitional architecture.",uniqueFeatures:["Multiple panel counts","Wide species selection","Classic joinery","Paintable or stainable"],priceRange:"$$$–$$$$"},{name:"Fiberglass Entry",type:"Exterior Entry — Fiberglass",material:"Fiberglass",description:"Simpson's fiberglass line brings the brand's design depth to a low-maintenance material. Good alternative when wood maintenance is a concern but the client wants Simpson profiles.",uniqueFeatures:["Low maintenance","Wood-grain realism","Matches wood collection profiles"],priceRange:"$$$"},{name:"Interior Door Collection",type:"Interior — Wood",material:"Solid Wood / MDF",description:"Extensive interior wood door range — stile/rail, flush, bi-fold, pocket, and glass-lite options. Matches exterior door aesthetics for whole-house continuity.",uniqueFeatures:["Whole-house continuity","Matching exterior profiles","Paint and stain grade"],priceRange:"$$$"},{name:"Patio & French Doors — Wood",type:"Patio / French",material:"Solid Wood",description:"Wood patio door and French door systems. Pairs with large glass wall systems on projects where wood detailing is the design language.",uniqueFeatures:["True divided lite option","Wood species selection","Pairs with multi-slide systems"],priceRange:"$$$$"}],frameMaterials:["Solid Wood (Douglas Fir, Alder, Mahogany, Oak, Pine)","Fiberglass"],finishes:[{name:"Paint Grade",swatch:"#f0ede6"},{name:"Natural Fir",swatch:"#c09060"},{name:"Alder Stain",swatch:"#8a6040"},{name:"Mahogany",swatch:"#5a3a1a"},{name:"Black Paint",swatch:"#1A1A1A"},{name:"Custom",swatch:"linear-gradient(135deg,#a07040,#f0ede6)"}],differentiators:["110+ years — one of America's oldest door manufacturers","Contemporary Collection — the modern wood entry benchmark","Widest species selection of any production wood door brand","Matching entry and interior collections for whole-house continuity","Family-owned — consistent quality and brand reputation"],idealFor:["Luxury custom homes wanting solid wood throughout","Architects specifying contemporary full-lite entry doors","Traditional and craftsman homes needing stile-and-rail wood entries","Projects where whole-house entry-to-interior continuity matters","Clients who arrive asking for Simpson by name"],limitations:["Premium pricing — not budget-friendly","Wood entry requires coastal maintenance program","Custom lead times 6–10 weeks on specialty items","Less recognized by general consumers than Therma-Tru"],sdNotes:"A 110-year-old family-owned manufacturer making some of the most beautiful solid wood entry and interior doors available. If you've seen a dramatic full-glass contemporary entry door or a richly stained traditional front door on a San Diego luxury home, it may well be a Simpson. Matching entry and interior collections make the whole home feel cohesive." },

    { id:"roguevalley", sells:["Entry Doors"], website:"https://www.roguevalleydoor.com", name:"Rogue Valley Door", logo:"RV", color:T.gold, tagline:"Oregon-Crafted Premium Wood Entry Doors", tier:"Luxury", tierColor:T.gold, origin:"Medford OR — family-owned wood door manufacturer", overview:"Oregon entry door specialist — solid mahogany as standard (not an upgrade), 8ft height as standard, and bold contemporary full-lite configurations. One thing done exceptionally well.", productLines:[{name:"Full Line Catalog 2023",type:"Full Line",material:"Solid Wood",description:"The complete Rogue Valley Door product catalog — covers all door families including contemporary full-lite and half-lite, traditional mahogany stile-and-rail, alder and Douglas fir collections, oversized entries, and pivot doors. Full specifications, glass insert options, and finish details.",uniqueFeatures:["Complete product catalog","All door families & species","Glass and finish specifications"],priceRange:"$$$–$$$$$",brochureUrl:"https://www.roguevalleydoor.com/apps/default/asset/pdfs/RVD-Full-Line-Catalog-7-2023.pdf"},{name:"Contemporary — Full & Half Lite",type:"Exterior Entry — Wood",material:"Solid Wood",description:"Bold contemporary entry doors with full-lite or half-lite glass inserts. Clean lines, wide stiles, large glass areas. Competes directly with Simpson Contemporary for the modern luxury entry market.",uniqueFeatures:["Full-lite and half-lite options","Large glass configurations","Contemporary profiles"],priceRange:"$$$$–$$$$$"},{name:"Traditional Mahogany — Stile & Rail",type:"Exterior Entry — Wood",material:"Solid Mahogany",description:"Rogue Valley's signature product. Solid mahogany stile-and-rail entry doors in 2 through 8 panel configurations. Gel-stainable to any tone. The definitive luxury traditional entry in coastal San Diego.",uniqueFeatures:["Solid mahogany standard","Gel-stain ready","2 through 8 panel configurations"],priceRange:"$$$$"},{name:"Alder & Douglas Fir",type:"Exterior Entry — Wood",material:"Solid Alder / Douglas Fir",description:"Alder is the go-to for paint-grade contemporary; Douglas fir for craftsman and traditional stain finishes. Both available in all Rogue Valley profiles.",uniqueFeatures:["Paint or stain grade","Multiple profiles","Species choice"],priceRange:"$$$–$$$$"},{name:"8-Foot & Oversized Entry",type:"Exterior Entry — Wood",material:"Solid Wood",description:"Standard offering at 8ft height — Rogue Valley's bread and butter for luxury residential. 9ft and 10ft available for grand entries on estate homes.",uniqueFeatures:["8ft standard","9ft and 10ft available","Grand entry scale"],priceRange:"$$$$–$$$$$"},{name:"Pivot Entry Doors",type:"Exterior Entry — Pivot",material:"Solid Wood",description:"Large-format pivot entry doors for contemporary and transitional estate homes. Statement entries that pair with glass walls and open-plan architecture.",uniqueFeatures:["Pivot hardware ready","Large format","Statement entry"],priceRange:"$$$$$"}],frameMaterials:["Solid Mahogany","Solid Alder","Douglas Fir","Clear Pine"],finishes:[{name:"Mahogany Stain",swatch:"#5a3a1a"},{name:"Natural Alder",swatch:"#a07040"},{name:"Paint Grade White",swatch:"#f0ede6"},{name:"Black",swatch:"#1A1A1A"},{name:"Custom Stain",swatch:"linear-gradient(135deg,#5a3a1a,#a07040)"}],differentiators:["Entry door specialty — that's all they do, and they do it exceptionally","Solid mahogany as a standard offering — not an upgrade","8ft height as standard — luxury proportions without special order","Oregon family craftsmanship — consistent quality","Strong in architect and custom builder channel"],idealFor:["Luxury estates where the entry door is the focal point","Coastal SD homes needing solid mahogany traditional entry","Contemporary builds wanting full-lite glass wood statement entry","Architects specifying pivot entry doors","Clients wanting a single-vendor specialty entry door solution"],limitations:["Entry doors only — no interior door matching","Premium pricing — not for budget projects","Lead times 6–10 weeks on custom","Less distribution than Simpson in SD"],sdNotes:"An Oregon craftsman that specializes exclusively in entry doors — and does it exceptionally well. Solid mahogany is standard, not an upgrade. 8-foot height is standard, not an upsell. If your front door is a design priority and you want something genuinely special, Rogue Valley is worth a look." },
    { id:"dovecreek", website:"https://www.dovecreekdoors.com", name:"Dovecreek Doors", logo:"DC", color:T.sage, tagline:"San Diego's Custom Wood Entry Door Craftsman", tier:"Luxury", tierColor:T.sage, origin:"San Diego CA — local custom wood door fabricator", overview:"Dovecreek Doors is a San Diego-based custom wood door fabricator — the local craftsman option for clients who want a truly one-of-a-kind entry door built by someone who knows the San Diego market, the local architecture, and can meet face-to-face with the homeowner, architect, or contractor. Where Simpson and Rogue Valley are production manufacturers shipping from the Pacific Northwest, Dovecreek is a local shop: shorter communication loops, site visits possible, and the kind of bespoke attention that a custom entry door at the luxury level deserves. For the client who wants to say their door was made locally in San Diego, or for the architect who wants direct fabricator access during the design process, Dovecreek is the right conversation.", productLines:[{name:"Custom Solid Wood Entry — Any Species",type:"Exterior Entry — Custom Wood",material:"Solid Wood",description:"Fully custom solid wood entry doors in any species the client specifies — mahogany, walnut, white oak, alder, Douglas fir, teak, and more. Any size, any profile, any design. No catalog — every door is drawn and built to order.",uniqueFeatures:["Fully custom — no catalog limits","Any wood species","Any size including oversized","Built in San Diego"],priceRange:"$$$$–$$$$$"},{name:"Contemporary Flush & Plank",type:"Exterior Entry — Contemporary",material:"Solid Wood",description:"Flush panel and horizontal plank entry doors for modern and contemporary architecture. Clean face, book-matched veneers or solid plank construction. The local answer to Simpson Contemporary at custom scale.",uniqueFeatures:["Flush and plank profiles","Book-matched veneer option","Custom dimensions","Modern profiles"],priceRange:"$$$$–$$$$$"},{name:"Stile & Rail — Traditional & Transitional",type:"Exterior Entry — Traditional",material:"Solid Wood",description:"Custom stile-and-rail entry doors in 2 through 8-panel configurations. Available in any wood species. Traditional, craftsman, and transitional architecture.",uniqueFeatures:["Custom panel count","Any species stain or paint grade","Traditional joinery"],priceRange:"$$$$"},{name:"Glass Lite Entry Doors",type:"Exterior Entry — Glass",material:"Solid Wood",description:"Custom entry doors with glass lite inserts — full lite, half lite, sidelite configurations. Glass selection coordinated with the client. Custom proportions and profiles.",uniqueFeatures:["Custom glass lite placement","Full and half lite","Sidelite coordination"],priceRange:"$$$$–$$$$$"},{name:"Double Door & Grand Entry Systems",type:"Exterior Entry — Grand",material:"Solid Wood",description:"Double door sets, transom combinations, and full grand entry systems with sidelites and transoms. Built to the exact opening dimensions of the project.",uniqueFeatures:["Double door sets","Transom and sidelite coordination","Grand entry scale","Site-measured"],priceRange:"$$$$$"}],frameMaterials:["Solid Wood","Custom Species"],finishes:[{name:"Natural Wood — Clear",swatch:"#c09060"},{name:"Custom Stain — Any Tone",swatch:"linear-gradient(135deg,#5a3a1a,#c09060)"},{name:"Paint Grade",swatch:"#f0ede6"},{name:"Black Paint",swatch:"#1A1A1A"},{name:"Two-Tone Custom",swatch:"linear-gradient(135deg,#1A2028,#c09060)"}],differentiators:["Local San Diego fabricator — face-to-face access, site visits possible","Fully custom — no catalog, no standard sizes, no limits","Any wood species including exotic and reclaimed","Direct fabricator relationship for architects and designers","Shorter communication loop than out-of-state production manufacturers"],idealFor:["Clients who want a locally made one-of-a-kind entry door","Architects wanting direct fabricator collaboration during design","Custom homes with non-standard opening sizes or unusual proportions","Clients who value local craftsmanship and the made-in-San-Diego story","High-end remodels where the entry door is a signature design element"],limitations:["Custom lead times — plan 8–14 weeks minimum for complex doors","Higher per-door cost than production manufacturers for standard profiles","No interior door line — entry doors only","Capacity limits — not suitable for large production runs","Less brand recognition than Simpson or Rogue Valley with homeowners"],sdNotes:"Dovecreek is the card to play when a client or architect wants something nobody else on the street will have. The local fabricator story resonates strongly in the La Jolla, Del Mar, and Rancho Santa Fe market where bespoke and locally sourced are genuine selling points. For an architect who has an unusual opening, a non-standard height, or a very specific design vision, Dovecreek can draw it, build it, and install it without the communication overhead of a production manufacturer 1,000 miles away. Lead time conversation is important — set expectations at 8-14 weeks minimum and frame it as the cost of true custom craft. The 'made in San Diego' story is a genuine differentiator that no other entry door vendor in the lineup can match." },
  ],
};

// ─── HARDWARE DATA ─────────────────────────────────────────────────────────────
const hardwareCategories = [
  {
    id:"entry_sets", label:"Entry Door Sets", icon:"", color:T.gold,
    description:"Complete entry locksets — handle, lock, deadbolt, and trim. The first impression of every home.",
    emtekNote:"Emtek's entry sets are the most customizable in the residential market — choose your body style, then independently select your rosette, lever or knob style, and finish. Mix-and-match flexibility no other brand matches at this price point.",
    svgKey:"monolithic",
    types:[
      {name:"Monolithic Entry Set",detail:"Lever and deadbolt on a single continuous backplate — no separate rosettes. The cleanest, most modern entry hardware aesthetic. The unbroken vertical line from lever to deadbolt reads as architectural rather than hardware. Emtek's most popular entry set for contemporary and transitional SD homes.",highlight:true},
      {name:"Separate Handle + Deadbolt",detail:"Lever set and deadbolt on individual rosettes. More traditional and versatile — allows mixing rosette shapes between the handle and lock. Better for craftsman, traditional, and transitional entries where independent proportions look right."},
      {name:"Single Cylinder Deadbolt",detail:"Key outside, thumb turn inside. Standard residential security. Emtek's deadbolts available in every finish and rosette shape — mix with any lever or knob set."},
      {name:"Double Cylinder Deadbolt",detail:"Key required on both sides — no thumb turn. For doors with glass panels where someone could break the glass and reach a thumb-turn. Check local fire code — some jurisdictions restrict in sleeping areas."},
      {name:"Multi-Point Lock Body",detail:"Locks at 3+ points simultaneously — top, middle, and bottom. Common on European doors and NanaWall systems. Dramatically more secure and air-tight than single-point. Emtek makes multi-point trim in any finish."},
    ],
    vendors:["Emtek","Baldwin","Rocky Mountain Hardware","Schlage"]
  },
  {
    id:"knobs_levers", label:"Interior Knobs & Levers", icon:"", color:T.teal,
    description:"Emtek's fully modular interior system — mix lever style, rosette shape, and finish independently for every door.",
    emtekNote:"Over 40 lever styles, 10 rosette shapes, 12 finishes — every combination available. Standardize on one finish across the house while varying the lever profile by room or taste.",
    svgKey:"lever",
    types:[
      {name:"Passage Lever / Knob",detail:"Non-locking — rotates freely both sides. For hallways, living areas, closets. The most common interior hardware type. Every Emtek lever style available as passage."},
      {name:"Privacy Lever / Knob",detail:"Button or turn-lock on interior side only. For bedrooms and bathrooms. Emergency release from outside with a pin. Matches passage sets exactly — consistent look throughout."},
      {name:"Dummy Set",detail:"Fixed, non-functional pull — for closet doors, wardrobe bypasses, and decorative applications. Single or double dummy (both sides). No latch mechanism."},
      {name:"Customizable Rosettes",detail:"The rosette is the backplate the lever mounts to — and Emtek lets you choose it independently. Shapes: Round, Oval, Rectangular, Square, Egg, and more. Round = traditional; rectangular = contemporary. Same lever, different rosette — completely different character.",highlight:true},
      {name:"Glass & Crystal Knobs",detail:"Clear crystal, art glass, and porcelain knobs — Geneva, Jasper, and others. Extremely popular in transitional SD interiors. Crystal knob on a satin brass or matte black rosette is a current design staple."},
      {name:"Lever Profiles",detail:"40+ lever profiles: streamlined contemporary (Arched, Slim, Helios), substantial traditional (Trellis, Freestone, Melon), and artistic statement levers. Browse by category: Modern · Transitional · Traditional · Art Deco."},
    ],
    vendors:["Emtek","Baldwin","Rocky Mountain Hardware","Nostalgic Warehouse"]
  },
  {
    id:"long_pulls", label:"Long Door Pulls", icon:"⬌", color:T.slate,
    description:"Statement pulls for modern entry doors, glass walls, and sliding panels. 12\" to 36\" and beyond.",
    emtekNote:"Emtek's Modern pull line: 12\", 18\", 24\", and 36\" lengths in solid brass. All standard finishes. Matching interior pulls for pocket and sliding doors in shorter lengths. Same finish family, whole-house cohesion.",
    svgKey:"pull",
    types:[
      {name:"Long Exterior Pull (18\"–36\")",detail:"Statement pull for contemporary and modern entry doors — mounted on the push side, paired with a concealed lock or multipoint on the latch side. The architectural scale transforms a standard door into an entry statement. Emtek's stainless and matte black pulls are most popular in SD contemporary homes.",highlight:true},
      {name:"Double-Sided Pull Set",detail:"Matching long pulls on both sides — interior and exterior. For glass panel doors or entries without a traditional lever. Requires a separate concealed lock (hookbolt, deadbolt, or multipoint) for security."},
      {name:"Pocket Door Pull",detail:"Slim recessed or edge pull — doesn't protrude beyond the door face, allowing the door to slide into the wall pocket. Available as flush (inset into door) or edge pull (on door edge). Emtek makes coordinated pocket hardware in matching finishes."},
      {name:"Sliding Door Pull",detail:"Through-bolt or surface-mount pull for barn doors and sliding panels. Scale reads well on the larger face of a sliding door. Emtek's sliding hardware includes coordinated track and hanger in matching finishes."},
      {name:"Tubular & Bar Pulls",detail:"Round-bar pulls in various diameters. Available in round, square, and hexagonal bar profiles. Contemporary commercial character — common on modern entry doors as a minimal alternative to flat blade pulls."},
    ],
    vendors:["Emtek","Rocky Mountain Hardware","FSB","Sugatsune"]
  },
  {
    id:"barn_door", label:"Barn Door Hardware", icon:"⟺", color:T.rust,
    description:"Exposed track and hanger systems for sliding barn doors. Industrial to refined — complete coordinated systems.",
    emtekNote:"Emtek's barn door hardware is a complete system — track, hangers, floor guide, and pull available as a coordinated package in matching finishes. Track lengths 4ft–12ft standard; custom available. All solid steel construction.",
    svgKey:"barn",
    types:[
      {name:"Standard Exposed Track & Hanger",detail:"Flat or round steel track above the door, with visible hanger hardware the door rolls on. Intentionally visible and architectural. Emtek's flat track and round track systems in Flat Black, Satin Nickel, and Antique Brass.",highlight:true},
      {name:"J-Track (Low Clearance)",detail:"J-shaped track requires less clearance above the door — useful when ceiling height is limited or when the door needs to sit closer to the wall. Good for retrofit applications."},
      {name:"Bypass Barn Door Hardware",detail:"Two-door bypass — one door slides in front of the other on parallel tracks. Covers a wider opening without requiring double the wall space. Common in laundry rooms, closet conversions, and wide hallway openings."},
      {name:"Soft-Close Hardware",detail:"Hydraulic damper in the hanger slows and cushions the door at the end-stop. Eliminates slamming. Emtek offers soft-close hangers that retrofit onto their standard track. Strongly recommended on solid wood or heavy door panels."},
      {name:"Floor Guide",detail:"Small guide at the door's lower edge — prevents the bottom from swinging away from the wall. Required on all barn door installations. Emtek's guide is a minimalist profile nearly invisible when the door is in place."},
      {name:"Flush Pull for Barn Doors",detail:"Recessed flush pull allows barn door to slide without a protruding handle catching the wall or frame. Emtek's flush pulls available as round, square, or rectangular insets in coordinating finishes."},
    ],
    vendors:["Emtek","Schlage","Sugatsune","Häfele"]
  },
  {
    id:"smart_lock", label:"Keyless & Smart Lock Entry", icon:"", color:T.sage,
    description:"Keypad, WiFi, and app-controlled entry. Emtek smart locks match the same lever styles and rosettes as standard hardware.",
    emtekNote:"Emtek's Smart Connected series uses the same lever profiles and rosettes as their standard line — your smart lock looks identical to every other piece of Emtek hardware in the house. Works with Apple Home, Google Home, Alexa, and the Emtek app.",
    svgKey:"smart",
    types:[
      {name:"Keypad Entry (No App)",detail:"Numeric keypad replaces the key — enter a code to unlock. No connectivity, no app required. Simple, reliable, and more secure than a physical key (codes can be changed instantly, no lost keys). Integrates seamlessly with any Emtek entry lever set."},
      {name:"WiFi Smart Lock + App Control",detail:"Full WiFi connectivity — lock or unlock remotely from anywhere via the Emtek Smart Lock app. Receive activity notifications, see full entry history. Works on home WiFi without a separate hub. Includes keypad for physical access.",highlight:true},
      {name:"Bluetooth Smart Lock",detail:"Bluetooth-only — control from your phone within ~30ft range. No WiFi required. Simpler setup, better battery life. Unlocks automatically as you approach. Cannot unlock remotely — best for clients who want smart features without always-on connectivity."},
      {name:"Z-Wave / Whole-Home Integration",detail:"Z-Wave and Zigbee protocol locks integrate with Control4, Lutron, Crestron, and SmartThings. Door unlocks trigger lights, thermostats, cameras, and security. Recommended when a home automation system is already specified."},
      {name:"App Features",detail:"Remote lock/unlock from anywhere · Real-time push notifications · Per-user access codes with activity logs · Scheduled access (cleaners, contractors) · Temporary time-limited guest codes · Auto-lock timer · Battery monitoring with 30-day advance warning · Apple Home, Google Home, Alexa voice control."},
      {name:"Backup Key Access",detail:"All Emtek smart locks include a hidden key cylinder — covered by a flip-down cover. Ensures you're never locked out in a power or battery failure. Battery life typically 1–2 years depending on usage frequency."},
    ],
    vendors:["Emtek Smart Connected","Schlage Encode","Yale Assure","Kwikset Halo"]
  },
  {
    id:"hinges_pivots", label:"Hinges & Pivots", icon:"↻", color:T.plum,
    description:"Structural hardware for swinging doors. Pivots enable oversized statement entries.",
    emtekNote:"Emtek hinges available in every finish to match their lever and entry set families. Heavy-duty options for doors up to 400lbs.",
    svgKey:null,
    types:[
      {name:"Ball Bearing Hinge",detail:"Smooth, silent, durable — ball bearings eliminate friction and noise. Recommended for any door over 50lbs or any frequently-used door. Available 3.5\" and 4.5\" to match door weight and size."},
      {name:"Floor Pivot Set",detail:"Pivot hardware at floor and top of door — oversized doors (8ft+) swing smoothly without visible side hinges. Door appears to rotate from a single central axis. Concealed floor mechanism nearly invisible."},
      {name:"Offset Pivot",detail:"Pivot point is offset from the door's face — the door swings outward, appearing to float. Contemporary and dramatic. Common in modern luxury entries where the door is a design statement."},
      {name:"Concealed Hinge",detail:"No visible hardware when closed — fully mortised into door edge and frame. European cabinetry style. Clean, minimal. Common on high-end interior doors and ultra-contemporary entries."},
    ],
    vendors:["Emtek","Rocky Mountain Hardware","Sugatsune","SOSS Invisible Hinges"]
  },
];


const hardwareFinishes = [
  {name:"Matte Black",swatch:"#1e1e1e",popular:true},{name:"Satin Nickel",swatch:"#6A6A6A",popular:true},
  {name:"Polished Chrome",swatch:"#4A4A4A",popular:false},{name:"Antique Brass",swatch:"#8a6a2a",popular:false},
  {name:"Satin Brass",swatch:"#c9a44a",popular:true},{name:"Oil-Rubbed Bronze",swatch:"#3a2a1a",popular:true},
  {name:"Brushed Gold",swatch:"#b89040",popular:true},{name:"Polished Nickel",swatch:"#b0b8b0",popular:false},
  {name:"Stainless Steel",swatch:"#a8aaaa",popular:true},{name:"Venetian Bronze",swatch:"#4a3020",popular:false},
  {name:"Flat Black",swatch:"#141414",popular:false},{name:"Antique Pewter",swatch:"#7a7a7a",popular:false},
];

const finishGuide = {
  "Matte Black":"Most popular in SD luxury residential right now. Pairs with modern/contemporary architecture, black-frame Trinsic windows, white or greige interiors. Works with Emtek, Baldwin, Rocky Mountain Hardware.",
  "Satin Nickel":"Most versatile — works in traditional, transitional, and modern. Easy to keep clean. Available from every major vendor. Best for whole-house consistency.",
  "Polished Chrome":"Classic and bright. Best in traditional and coastal homes. Shows fingerprints more than satin. Less popular currently but timeless in the right setting.",
  "Antique Brass":"Coming back strongly in high-end transitional interiors. Pairs beautifully with warm wood tones and white cabinetry. Look for unlacquered brass for natural patina.",
  "Satin Brass":"The current luxury designer favorite. Unlacquered brass patinas naturally — each piece becomes unique. Pairs with warm interiors, wood floors, stone countertops. Emtek and Rocky Mountain Hardware have excellent brass programs.",
  "Oil-Rubbed Bronze":"Traditional and coastal. Dark warm tone with subtle highlight rub. Popular in Mediterranean and Spanish-style homes. Common in La Jolla and Coronado traditional entries.",
  "Brushed Gold":"Similar to satin brass but brighter and more consistent. Popular in contemporary luxury. Pairs with black accents for a two-tone modern look.",
  "Stainless Steel":"Right choice for coastal properties in direct salt-air exposure. Won't corrode or pit. Marvin and NanaWall both offer coastal stainless hardware programs.",
  "Flat Black":"Similar to matte black but lower sheen. Slightly more casual. Good for rustic modern and industrial aesthetics.",
  "Polished Nickel":"Warmer than chrome, brighter than satin nickel. Classic and refined. Common in traditional and transitional luxury homes.",
  "Venetian Bronze":"Similar to oil-rubbed bronze but warmer. Popular in Mediterranean architecture. Pairs with terracotta, warm stone, aged wood.",
  "Antique Pewter":"Muted, aged appearance. Works in transitional and farmhouse interiors. Pairs with aged wood and stone.",
};

// ═══════════════════════════════════════════════════════════════════════════════
// QUESTIONNAIRE DATA
// ═══════════════════════════════════════════════════════════════════════════════
const buildQuestions = () => [
  { id:"whoAreYou", section:"About You", question:"Which best describes you?", subtitle:"Helps us tailor our recommendations and follow-up to your role", options:[{value:"homeowner",label:"Homeowner",icon:"",detail:"It's my home — I'm making the decisions"},{value:"contractor",label:"Contractor / Builder",icon:"",detail:"Building or remodeling on behalf of a client"},{value:"architect",label:"Architect",icon:"",detail:"Specifying products for a project"},{value:"designer",label:"Interior Designer",icon:"",detail:"Selecting finishes and products for a client"}] },
  { id:"needsInstall", section:"About You", question:"Are you looking for installation services?", subtitle:"Qualified local dealers offer free in-home measure for clients who purchase and install through them", isInstall:true, options:[{value:"yes_install",label:"Yes — Full Install",icon:"",detail:"I need supply and professional installation"},{value:"yes_measure",label:"Measure & Quote Only",icon:"",detail:"I'd like a free measure and quote first"},{value:"no_supply",label:"Supply Only",icon:"",detail:"I have my own installer — just need product"},{value:"unsure",label:"Not Sure Yet",icon:"",detail:"I'd like to discuss options"}] },
  { id:"otherServices", section:"About You", question:"Are you looking for any other building services or materials?", subtitle:"Many local dealers carry far more than windows and doors — check everything that applies", isMultiSelect:true, isOtherServices:true, options:[{value:"lumber",label:"Lumber & Framing",icon:"",detail:"Dimensional lumber, engineered wood, framing"},{value:"decking",label:"Decking & Outdoor",icon:"",detail:"Deck boards, railings, fencing, outdoor materials"},{value:"building_materials",label:"Building Materials",icon:"",detail:"Drywall, insulation, roofing, concrete products"},{value:"kitchen_bath",label:"Kitchen & Bath",icon:"",detail:"Cabinetry, countertops, fixtures, tile"},{value:"none",label:"Windows & Doors Only",icon:"",detail:"Just focused on windows and doors for now"}] },
  { id:"projectType", section:"Your Project", question:"What best describes your project?", subtitle:"Select all that apply", isMultiSelect:true, options:[{value:"custom_new",label:"Custom New Build",icon:"",detail:"Designing from scratch"},{value:"luxury_remodel",label:"Full Remodel",icon:"",detail:"Major renovation of existing home"},{value:"addition",label:"Room Addition / ADU",icon:"",detail:"Adding new living space"},{value:"door_replacement",label:"Window/Door Replacement",icon:"",detail:"Swapping specific openings"}] },
  { id:"pullingPermits", section:"Your Project", question:"Will this project be permitted / inspected?", subtitle:"Permitted projects in California must meet Title 24 energy code requirements", isPermits:true, condition:(a)=>Array.isArray(a.projectType)&&(a.projectType.includes("luxury_remodel")||a.projectType.includes("addition")||a.projectType.includes("door_replacement")), options:[{value:"yes",label:"Yes — Pulling Permits",icon:"",detail:"Full inspection required — Title 24 applies"},{value:"no",label:"No Permits",icon:"",detail:"Owner or contractor managing without permits"},{value:"unsure",label:"Not Sure Yet",icon:"",detail:"I need to check with my contractor or the city"},{value:"na",label:"N/A — New Build",icon:"",detail:"New construction always requires permits"}] },
  { id:"replacementPurpose", section:"Your Project", question:"What are your goals for this window & door upgrade?", subtitle:"Select everything that applies — helps us match the right products and glazing options", isMultiSelect:true, isReplacementPurpose:true, options:[{value:"energy",label:"Energy Efficiency",icon:"",detail:"Lower utility bills, Title 24 compliance, better insulation"},{value:"sound",label:"Sound Control",icon:"",detail:"Reduce traffic, aircraft, or neighborhood noise"},{value:"aesthetic",label:"Aesthetics & Style",icon:"",detail:"Update the look, modernize, or match architecture"},{value:"functionality",label:"Functionality",icon:"",detail:"Easier operation, better hardware, modern systems"},{value:"maintenance",label:"Low Maintenance",icon:"",detail:"Eliminate painting, warping, rot, and corrosion"},{value:"durability",label:"Durability & Longevity",icon:"",detail:"Products built to last 20–30+ years in SD climate"},{value:"indoor_outdoor",label:"Indoor-Outdoor Living",icon:"",detail:"Open the wall, create a glass wall or folding system"},{value:"security",label:"Security & Safety",icon:"",detail:"Better locks, impact glass, fire-rated products"}] },
  { id:"coastalProximity", section:"Property Details", question:"Is your home within 2 miles of the ocean or bay?", subtitle:"Salt air affects frame and hardware material recommendations.", isCoastal:true, options:[{value:"yes",label:"Yes",icon:"🌊",detail:"Within 2 miles of the ocean or bay"},{value:"no",label:"No",icon:"🏠",detail:"More than 2 miles inland"},{value:"unsure",label:"Not Sure",icon:"❓",detail:"I'm not certain"}] },
  { id:"elevation", section:"Property Details", question:"Is your home above approximately 4,000 feet elevation?", subtitle:"High-elevation homes (Julian, Pine Valley, Mt. Laguna) require specially treated glass units to prevent seal failure and fogging.", isElevation:true, options:[{value:"yes",label:"Yes",icon:"⛰️",detail:"Above ~4,000 ft"},{value:"no",label:"No",icon:"🏠",detail:"Standard elevation"},{value:"unsure",label:"Not Sure",icon:"❓",detail:"I'm not certain"}] },
  { id:"fireZone", section:"Property Details", question:"Is your property in a designated fire hazard zone?", subtitle:"Fire zone properties in San Diego require SFM-rated windows and doors. You can check your zone at the CAL FIRE website.", isFireZone:true, options:[{value:"yes",label:"Yes",icon:"🔥",detail:"Designated fire hazard zone"},{value:"no",label:"No",icon:"🏠",detail:"Not in a fire zone"},{value:"unsure",label:"Not Sure",icon:"❓",detail:"I'll need to check"}] },
  { id:"temperedGlass", section:"Property Details", condition:(a)=>!Array.isArray(a.projectType)||!a.projectType.includes("custom_new"), question:"Do any of your windows require tempered safety glass?", subtitle:"All doors include tempered glass by default. For windows, code requires tempered near stairs, wet areas, and large low openings — your specialist will confirm.", isTempered:true, options:[{value:"yes",label:"Yes",icon:"🔲",detail:"Some window locations need tempered"},{value:"no",label:"No",icon:"🏠",detail:"Standard glass is fine"},{value:"unsure",label:"Not Sure",icon:"❓",detail:"I'm not certain"}] },
  { id:"installType", section:"Installation Type", question:"Do you know whether your project needs retrofit or new construction windows?", subtitle:"Two very different installation methods — click to learn more if unsure", educationKey:"installType", educationLabel:"Learn the difference →", options:[{value:"retrofit",label:"Retrofit / Replacement",icon:"",detail:"Installing inside existing frame — less demolition"},{value:"new_construction",label:"New Construction",icon:"",detail:"Nailing fin attached to rough framing"},{value:"both",label:"Mix of Both",icon:"",detail:"Some areas retrofit, others full"},{value:"unsure",label:"Not Sure",icon:"",detail:"I'd like help understanding"}] },
  { id:"exteriorMaterial", section:"Your Home's Exterior", condition:(a)=>!Array.isArray(a.projectType)||!a.projectType.includes("custom_new"), question:"What is the exterior wall covering of your home?", subtitle:"Affects how windows are flashed, sealed, and integrated", options:[{value:"stucco",label:"Stucco",icon:"",detail:"Hard plaster — most common in San Diego"},{value:"siding_wood",label:"Wood Siding",icon:"",detail:"Horizontal wood or engineered wood planks"},{value:"siding_fiber",label:"Fiber Cement Siding",icon:"",detail:"Hardieplank or similar"},{value:"brick_stone",label:"Brick or Stone",icon:"",detail:"Masonry exterior"},{value:"siding_vinyl",label:"Vinyl Siding",icon:"▦",detail:"Plastic lap siding"},{value:"mixed",label:"Mixed / Not Sure",icon:"",detail:"Multiple materials"}], columns:3 },
  { id:"hasExistingWindows", section:"Existing Windows", condition:(a)=>!Array.isArray(a.projectType)||!a.projectType.includes("custom_new"), question:"Are you replacing existing windows or doors?", subtitle:"If yes, we'll ask a few more questions to help with matching", options:[{value:"yes_all",label:"Yes — Replacing Everything",icon:"",detail:"Full whole-house replacement"},{value:"yes_some",label:"Yes — Replacing Some",icon:"↩",detail:"Specific rooms or openings"},{value:"no_new",label:"No — All New Openings",icon:"",detail:"New construction or new openings"}] },
  { id:"existingFrameMaterial", section:"Existing Windows", question:"What material are your existing window frames?", subtitle:"Check the frame edges and corners for clues", condition:(a)=>!Array.isArray(a.projectType)||!a.projectType.includes("custom_new")&&(a.hasExistingWindows==="yes_all"||a.hasExistingWindows==="yes_some"), options:[{value:"aluminum",label:"Aluminum",icon:"⬛",detail:"Thin metal frame — very common in 1970s–2000s SD"},{value:"wood",label:"Wood",icon:"🪵",detail:"Natural or painted wood frame"},{value:"vinyl",label:"Vinyl",icon:"🔲",detail:"White/beige plastic frame"},{value:"fiberglass",label:"Fiberglass",icon:"💠",detail:"Looks like vinyl but heavier"},{value:"steel",label:"Steel",icon:"🔩",detail:"Very thin dark metal"},{value:"unsure",label:"Not Sure",icon:"❓",detail:"I'd need help identifying"}] },
  { id:"matchExistingBrand", section:"Existing Windows", question:"Are you trying to match an existing window brand or style?", subtitle:"Some clients need consistency with windows staying in place", condition:(a)=>!Array.isArray(a.projectType)||!a.projectType.includes("custom_new")&&(a.hasExistingWindows==="yes_all"||a.hasExistingWindows==="yes_some"), options:[{value:"yes_match",label:"Yes — Want to Match",icon:"",detail:"Need to blend with remaining windows"},{value:"open_upgrade",label:"Open to Upgrading Style",icon:"",detail:"Happy to change the look"},{value:"no_all_new",label:"Replacing Everything",icon:"",detail:"Full replacement — no need to match"}] },
  { id:"primaryGoal", section:"Your Vision", question:"What's the primary vision for this project?", subtitle:"What outcome matters most?", options:[{value:"indoor_outdoor",label:"Indoor-Outdoor Living",icon:"",detail:"Open the wall to yard, patio, or view"},{value:"views",label:"Maximize Views & Light",icon:"",detail:"Frame the view, flood with light"},{value:"entertaining",label:"Entertaining & Flow",icon:"",detail:"Seamless flow for hosting"},{value:"complete_package",label:"Whole-House Upgrade",icon:"",detail:"Replace all windows and doors"}] },
  { id:"style", section:"Your Vision", question:"How would you describe your home's architecture?", subtitle:"Guides frame material and finish recommendations", options:[{value:"modern",label:"Modern / Contemporary",icon:"◻",detail:"Clean lines, minimal frames, black aluminum"},{value:"transitional",label:"Transitional",icon:"◈",detail:"Mix of classic and modern"},{value:"traditional",label:"Traditional / Craftsman",icon:"⬡",detail:"Warm tones, classic profiles"},{value:"coastal",label:"Coastal / Mediterranean",icon:"🌊",detail:"Salt air environment, relaxed luxury"},{value:"unsure",label:"Not Sure",icon:"❓",detail:"I'd like help figuring it out"}] },
  { id:"desiredFrame", section:"Frame Material", question:"What frame material are you looking for in your new windows?", subtitle:"Each material has distinct advantages — click to compare all", educationKey:"frameMaterial", educationLabel:"Compare frame materials →", options:[{value:"aluminum",label:"Aluminum",icon:"⬛",detail:"Slim, strong, low maintenance — ideal for modern"},{value:"wood",label:"Wood or Clad Wood",icon:"🪵",detail:"Warm interior — traditional & craftsman"},{value:"vinyl",label:"Vinyl",icon:"🔲",detail:"Affordable, energy-efficient, maintenance-free"},{value:"fiberglass",label:"Fiberglass",icon:"💠",detail:"Premium strength — excellent for coastal"},{value:"steel",label:"Steel",icon:"🔩",detail:"Ultra-thin frames — architectural statement"},{value:"unsure",label:"Help Me Decide",icon:"❓",detail:"Recommend based on my project"}], columns:3 },
  { id:"wantsLargeOpening", section:"Door System", question:"Are you looking to open up your space with a large patio door or glass wall system?", subtitle:"Think sliding walls, folding doors, or multi-panel systems", options:[{value:"yes",label:"Yes — That's the Plan",icon:"",detail:"I want to open up a wall or create an indoor-outdoor connection"},{value:"maybe",label:"Possibly — Still Deciding",icon:"",detail:"I'm curious about what's possible"},{value:"no",label:"No — Just Windows & Standard Doors",icon:"",detail:"I'm focused on windows and regular doors"}] },
  { id:"openingSize", section:"Door System", question:"What size is the main opening you want to transform?", subtitle:"Approximate width of the glass wall or main door system", condition:(a)=>a.wantsLargeOpening==="yes"||a.wantsLargeOpening==="maybe", options:[{value:"small",label:"Up to 12 feet",icon:"←→",detail:"Single room connection"},{value:"medium",label:"12–24 feet",icon:"⟵⟶",detail:"Substantial opening"},{value:"large",label:"24–40 feet",icon:"⟵——⟶",detail:"Full wall removal"},{value:"xl",label:"40+ feet or Corner",icon:"⊓",detail:"Monumental or corner system"}] },
  { id:"systemType", section:"Door System", question:"Do you have a door system type in mind?", subtitle:"Or let us recommend the right one", condition:(a)=>a.wantsLargeOpening==="yes"||a.wantsLargeOpening==="maybe", options:[{value:"folding",label:"Folding / Bi-fold",icon:"≋",detail:"Panels accordion — widest clear opening"},{value:"multislide",label:"Multi-Slide / Pocket",icon:"⇥",detail:"Panels slide, stack, or disappear"},{value:"liftslide",label:"Lift & Slide",icon:"⬆",detail:"European-style monolithic panel"},{value:"unsure",label:"Not Sure",icon:"",detail:"Help me understand the options"}] },
  { id:"budget", section:"Budget", question:"What's your approximate budget for the door system alone?", subtitle:"Excludes windows — just the main glass wall / door system", condition:(a)=>a.wantsLargeOpening==="yes"||a.wantsLargeOpening==="maybe", options:[{value:"entry",label:"Under $10K",icon:"",detail:"Entry-level systems"},{value:"moderate",label:"$10K – $25K",icon:"",detail:"Value-premium range"},{value:"premium",label:"$25K – $50K",icon:"",detail:"Premium range"},{value:"luxury",label:"$50K – $100K",icon:"",detail:"Luxury range"}] },
  { id:"priority", section:"Priorities", question:"What matters most in your final product?", subtitle:"Pick the one that resonates most strongly", options:[{value:"aesthetics",label:"Aesthetics & Wow Factor",icon:"",detail:"It needs to be visually stunning"},{value:"performance",label:"Performance & Durability",icon:"",detail:"Built to last in coastal SD"},{value:"value",label:"Best Value for Budget",icon:"",detail:"Quality without overpaying"},{value:"customization",label:"Total Customization",icon:"",detail:"One-of-a-kind for my home"}] },
  { id:"timeline", section:"Timeline", question:"When are you looking to move forward?", subtitle:"Helps us prioritize your inquiry", options:[{value:"now",label:"Ready Now",icon:"",detail:"Project underway or starting within 30 days"},{value:"quarter",label:"1–3 Months",icon:"",detail:"Planning, gathering quotes"},{value:"sixmonths",label:"3–6 Months",icon:"",detail:"Early planning phase"},{value:"future",label:"Just Exploring",icon:"",detail:"Thinking about it for the future"}] },
  { id:"hasDeadline", section:"Timeline", question:"Do you have a hard deadline this project must be completed by?", subtitle:"Events, move-in dates, or construction milestones can affect vendor selection", options:[{value:"yes",label:"Yes — Hard Deadline",icon:"\u{1F4C5}",detail:"There's a specific date we must hit"},{value:"soft",label:"Soft Target",icon:"",detail:"A preferred timeframe but flexible"},{value:"no",label:"No Deadline",icon:"",detail:"Whenever it's done right"}] },
  { id:"contact", section:"Contact", question:"Last step — how should we reach you?", subtitle:"A local window & door specialist will follow up within 1 business day. No spam, ever.", isContact:true },
];

function scoreVendors(answers) {
  const s = {nanawall:0,lacantina:0,andersen:0,marvin:0,milgard:0,pella:0,weathershield:0,alpine:0,jeldwen_win:0,simonton:0,westernwindow:0,nuvista:0,iwc:0,windor:0,fleetwood:0,steeltraditions:0,frenchsteel:0};
  if(Array.isArray(answers.projectType)&&answers.projectType.includes("custom_new")){s.nanawall+=3;s.marvin+=3;s.andersen+=2;}
  if(Array.isArray(answers.projectType)&&answers.projectType.includes("luxury_remodel")){s.lacantina+=3;s.andersen+=3;s.milgard+=2;}
  if(Array.isArray(answers.projectType)&&answers.projectType.includes("addition")){s.lacantina+=2;s.milgard+=3;s.andersen+=2;}
  if(Array.isArray(answers.projectType)&&answers.projectType.includes("door_replacement")){s.milgard+=3;s.lacantina+=2;}
  if(answers.style==="modern"){s.nanawall+=3;s.lacantina+=3;s.milgard+=2;}
  if(answers.style==="transitional"){s.andersen+=3;s.lacantina+=2;s.milgard+=2;}
  if(answers.style==="traditional"){s.marvin+=4;s.andersen+=3;}
  if(answers.style==="coastal"){s.marvin+=4;s.andersen+=2;}
  if(answers.openingSize==="small"){s.milgard+=3;s.lacantina+=2;}
  if(answers.openingSize==="medium"){s.lacantina+=3;s.andersen+=3;s.milgard+=2;}
  if(answers.openingSize==="large"){s.nanawall+=3;s.andersen+=3;s.lacantina+=2;}
  if(answers.openingSize==="xl"){s.nanawall+=4;s.andersen+=3;s.marvin+=2;}
  if(answers.budget==="moderate"){s.milgard+=4;s.lacantina+=2;}
  if(answers.budget==="premium"){s.lacantina+=4;s.andersen+=3;s.milgard+=2;}
  if(answers.budget==="luxury"){s.nanawall+=3;s.marvin+=3;s.andersen+=3;s.lacantina+=2;}
  if(answers.budget==="entry"){s.windor+=5;s.milgard+=3;}
  if(answers.priority==="aesthetics"){s.nanawall+=4;s.lacantina+=2;s.marvin+=2;}
  if(answers.priority==="performance"){s.marvin+=4;s.andersen+=3;s.nanawall+=2;}
  if(answers.priority==="value"){s.milgard+=4;s.lacantina+=3;s.andersen+=2;}
  if(answers.priority==="customization"){s.nanawall+=4;s.marvin+=3;s.andersen+=2;}
  if(answers.systemType==="folding"){s.nanawall+=3;s.lacantina+=3;s.andersen+=2;s.milgard+=2;}
  if(answers.systemType==="multislide"){s.andersen+=4;s.milgard+=3;s.lacantina+=2;}
  if(answers.systemType==="liftslide"){s.marvin+=4;s.andersen+=4;}
  if(answers.desiredFrame==="wood"){s.marvin+=3;s.andersen+=2;}
  if(answers.desiredFrame==="fiberglass"){s.marvin+=3;s.milgard+=2;s.pella+=2;s.weathershield+=1;}
  if(answers.desiredFrame==="vinyl"){s.milgard+=3;s.lacantina+=2;s.pella+=2;}
  if(answers.desiredFrame==="wood"){s.marvin+=3;s.andersen+=2;s.weathershield+=2;}
  // Pella scoring
  if(Array.isArray(answers.projectType)&&answers.projectType.includes("door_replacement")){s.pella+=2;}
  if(answers.budget==="moderate"){s.pella+=3;}
  if(answers.budget==="premium"){s.pella+=2;}
  if(answers.style==="transitional"){s.pella+=2;}
  if(answers.priority==="value"){s.pella+=2;}
  // Weather Shield scoring
  if(Array.isArray(answers.projectType)&&answers.projectType.includes("custom_new")){s.weathershield+=2;}
  if(answers.budget==="luxury"){s.weathershield+=2;}
  
  if(answers.style==="traditional"){s.weathershield+=2;}
  if(answers.style==="coastal"){s.weathershield+=2;}
  if(answers.priority==="customization"){s.weathershield+=3;}
  if(answers.openingSize==="small"||answers.openingSize==="medium"){s.weathershield+=1;}
  // Alpine scoring — vinyl value, budget remodels
  if(answers.budget==="moderate"){s.alpine+=3;}
  if(answers.desiredFrame==="vinyl"){s.alpine+=3;}
  if(Array.isArray(answers.projectType)&&answers.projectType.includes("door_replacement")){s.alpine+=2;}
  if(answers.priority==="value"){s.alpine+=3;}
  if(answers.openingSize==="small"||answers.openingSize==="medium"){s.alpine+=2;}
  // JELD-WEN Windows scoring — broad range, mixed-spec
  if(answers.budget==="moderate"){s.jeldwen_win+=2;}
  if(answers.budget==="premium"){s.jeldwen_win+=2;}
  if(answers.desiredFrame==="vinyl"){s.jeldwen_win+=2;}
  if(answers.desiredFrame==="wood"){s.jeldwen_win+=2;}
  if(Array.isArray(answers.projectType)&&answers.projectType.includes("luxury_remodel")){s.jeldwen_win+=1;}
  if(answers.priority==="value"){s.jeldwen_win+=2;}
  // Simonton scoring — production vinyl, budget, Daylight Max
  if(answers.budget==="moderate"){s.simonton+=3;}
  if(answers.desiredFrame==="vinyl"){s.simonton+=3;}
  if(answers.priority==="value"){s.simonton+=3;}
  if(Array.isArray(answers.projectType)&&answers.projectType.includes("door_replacement")){s.simonton+=2;}
  if(answers.openingSize==="small"||answers.openingSize==="medium"){s.simonton+=1;}
  // Western Window Systems scoring — modern aluminum, large openings
  if(answers.systemType==="multislide"){s.westernwindow+=4;}
  if(answers.systemType==="folding"){s.westernwindow+=3;}
  if(answers.systemType==="pocket_multislide"){s.westernwindow+=4;}
  if(answers.style==="modern"){s.westernwindow+=4;}
  if(answers.desiredFrame==="aluminum"){s.westernwindow+=4;}
  if(answers.openingSize==="large"||answers.openingSize==="xl"){s.westernwindow+=3;}
  if(answers.budget==="luxury"){s.westernwindow+=2;}
  if(answers.priority==="aesthetics"){s.westernwindow+=2;}
  if(Array.isArray(answers.projectType)&&answers.projectType.includes("custom_new")){s.westernwindow+=2;}
  // NuVista scoring — budget architectural aluminum, ADU, commercial-adjacent
  if(answers.desiredFrame==="aluminum"){s.nuvista+=4;}
  if(answers.style==="modern"){s.nuvista+=3;}
  if(Array.isArray(answers.projectType)&&answers.projectType.includes("custom_new")){s.nuvista+=2;}
  if(answers.budget==="premium"){s.nuvista+=2;}
  if(answers.budget==="moderate"){s.nuvista+=2;}
  if(answers.priority==="value"){s.nuvista+=2;}
  if(answers.openingSize==="large"||answers.openingSize==="xl"){s.nuvista+=1;}
  // IWC scoring — commercial-grade aluminum, custom, architect
  if(answers.desiredFrame==="aluminum"){s.iwc+=3;}
  if(answers.style==="modern"){s.iwc+=2;}
  if(Array.isArray(answers.projectType)&&answers.projectType.includes("custom_new")){s.iwc+=2;}
  if(answers.priority==="performance"){s.iwc+=2;}
  if(answers.priority==="customization"){s.iwc+=2;}
  if(answers.budget==="premium"||answers.budget==="luxury"){s.iwc+=1;}
  // WinDor scoring — budget vinyl folding and multislide
  if(answers.systemType==="folding"){s.windor+=3;}
  if(answers.systemType==="multislide"){s.windor+=3;}
  if(answers.budget==="moderate"){s.windor+=4;}
  if(answers.desiredFrame==="vinyl"){s.windor+=3;}
  if(answers.priority==="value"){s.windor+=4;}
  if(answers.openingSize==="large"||answers.openingSize==="medium"){s.windor+=2;}
  // Fleetwood scoring — ultra-luxury aluminum, large openings, modern
  if(answers.budget==="luxury"){s.fleetwood+=4;}
  if(answers.systemType==="multislide"){s.fleetwood+=4;}
  if(answers.systemType==="liftslide"){s.fleetwood+=5;}
  if(answers.systemType==="folding"){s.fleetwood+=3;}
  if(answers.openingSize==="xl"){s.fleetwood+=4;}
  if(answers.openingSize==="large"){s.fleetwood+=3;}
  if(answers.style==="modern"){s.fleetwood+=3;}
  if(answers.desiredFrame==="aluminum"){s.fleetwood+=4;}
  if(answers.priority==="aesthetics"){s.fleetwood+=3;}
  if(answers.priority==="performance"){s.fleetwood+=2;}
  if(Array.isArray(answers.projectType)&&answers.projectType.includes("custom_new")){s.fleetwood+=3;}
  // Steel Traditions scoring — steel frame, modern/transitional, luxury
  if(answers.desiredFrame==="steel"){s.steeltraditions+=5;s.frenchsteel+=4;}
  if(answers.style==="modern"){s.steeltraditions+=3;}
  if(answers.style==="transitional"){s.steeltraditions+=3;s.frenchsteel+=2;}
  if(answers.style==="traditional"){s.frenchsteel+=3;s.steeltraditions+=2;}
  if(answers.style==="coastal"){s.steeltraditions+=2;s.frenchsteel+=2;}
  if(answers.budget==="luxury"){s.steeltraditions+=3;s.frenchsteel+=3;}
  if(answers.budget==="premium"){s.steeltraditions+=2;s.frenchsteel+=2;}
  if(answers.priority==="aesthetics"){s.steeltraditions+=3;s.frenchsteel+=3;}
  if(answers.priority==="customization"){s.steeltraditions+=2;s.frenchsteel+=3;}
  if(Array.isArray(answers.projectType)&&answers.projectType.includes("custom_new")){s.steeltraditions+=2;s.frenchsteel+=2;}
  // Fire zone — coastal stainless / fire-rated bonus
  if(answers.fireZone==="yes"){s.marvin+=2;s.andersen+=1;}
  if(answers.style==="coastal"||answers.exteriorMaterial==="stucco"){s.marvin+=1;}
  const allV = vendors.windows_doors.reduce((acc,v)=>({...acc,[v.id]:v}),{});
  return Object.entries(s).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([key,score])=>({key,score,brand:allV[key]})).filter(x=>x.brand);
}

// ═══════════════════════════════════════════════════════════════════════════════
// SMALL COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════
function ProductLineCard({line,color}) {
  const [open,setOpen]=useState(false);
  return (
    <div onClick={()=>setOpen(o=>!o)} style={{background:T.card2,border:`1px solid ${open?color+"55":T.border}`,borderRadius:"8px",overflow:"hidden",cursor:"pointer",transition:"border-color 0.18s"}}>
      <div style={{padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginBottom:"3px"}}>
            <span style={{fontSize:"13px",fontWeight:500,color:T.text}}>{line.name}</span>
            <Pill label={line.type} color={color}/>
            <span style={{fontSize:"11px",color}}>{line.priceRange}</span>
          </div>
          <div style={{fontSize:"11px",color:T.dim}}>{line.material}</div>
        </div>
        <span style={{color:T.faint,fontSize:"10px",marginLeft:"10px"}}>{open?"▲":"▼"}</span>
      </div>
      {open&&<div style={{padding:"0 16px 14px",borderTop:`1px solid ${T.border}`}}>
        <p style={{fontSize:"12px",color:T.muted,lineHeight:1.65,margin:"12px 0 10px"}}>{line.description}</p>
        {(line.maxWidth||line.maxHeight)&&<div style={{display:"flex",gap:"16px",marginBottom:"8px"}}>
          {line.maxWidth&&<div><span style={{fontSize:"8px",letterSpacing:"2px",color:T.faint,fontFamily:"monospace"}}>MAX W </span><span style={{fontSize:"12px",color:"#606060"}}>{line.maxWidth}</span></div>}
          {line.maxHeight&&<div><span style={{fontSize:"8px",letterSpacing:"2px",color:T.faint,fontFamily:"monospace"}}>MAX H </span><span style={{fontSize:"12px",color:"#606060"}}>{line.maxHeight}</span></div>}
        </div>}
        {line.uniqueFeatures&&<div><SectionLabel>{`KEY FEATURES`}</SectionLabel>{line.uniqueFeatures.map(f=><div key={f} style={{fontSize:"12px",color:"#606060",marginBottom:"3px"}}>{"\u2713"} {f}</div>)}</div>}
        {line.brochureUrl&&<a href={line.brochureUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{display:"inline-flex",alignItems:"center",gap:"5px",marginTop:"10px",fontSize:"10px",fontFamily:"monospace",letterSpacing:"1px",color:T.teal,textDecoration:"none",border:`1px solid ${T.teal}44`,borderRadius:"4px",padding:"4px 10px"}}>{"↓ BROCHURE PDF"}</a>}
      </div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VENDOR LOGO SVGs — faithful brand-identity representations
// ═══════════════════════════════════════════════════════════════════════════════
function VendorLogo({ id, size = 52, wide = false }) {
  const s = size;
  const w = wide ? Math.round(size * 2.4) : size;
  const h = wide ? Math.round(size * 0.8) : size;
  const logos = {

    // ── NanaWall ── all-caps architectural wordmark, dark/minimal
    nanawall: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"8px 12px"}}>
        <svg viewBox="0 0 180 40" style={{width:"100%",height:"100%"}} xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <g fill="#231F20">
              <polygon points="0 37.79 4.093 37.79 4.093 13.323 28.734 39.14 28.734 4.963 24.642 4.963 24.642 29.214 0 3.396"/>
              <path d="M49.663,27.603 C49.663,23.641 47.269,20.288 43.045,20.288 C38.997,20.288 36.602,23.815 36.602,27.603 C36.602,31.435 38.909,35.004 43.045,35.004 C47.312,35.004 49.663,31.609 49.663,27.603 Z M53.364,37.79 L49.445,37.79 L49.445,34.612 L49.359,34.612 C47.791,36.92 45.353,38.488 42.436,38.488 C36.21,38.488 32.683,33.306 32.683,27.472 C32.683,21.9 36.385,16.805 42.306,16.805 C45.309,16.805 47.747,18.372 49.359,20.81 L49.445,20.81 L49.445,17.416 L53.364,17.416 L53.364,37.79 Z"/>
              <path d="M62.456,20.157 L62.543,20.157 C63.762,17.981 66.2,16.806 68.681,16.806 C74.429,16.806 75.909,20.681 75.909,25.644 L75.909,37.79 L71.99,37.79 L71.99,26.123 C71.99,22.639 71.512,20.288 67.506,20.288 C62.456,20.288 62.456,24.73 62.456,28.43 L62.456,37.79 L58.538,37.79 L58.538,17.416 L62.456,17.416 L62.456,20.157 Z"/>
              <polygon points="166.848 37.79 170.765 37.79 170.765 0 166.848 0"/>
              <polygon points="176.016 37.79 179.934 37.79 179.934 0 176.016 0"/>
              <path d="M96.283,27.603 C96.283,23.641 93.888,20.288 89.665,20.288 C85.616,20.288 83.222,23.815 83.222,27.603 C83.222,31.435 85.528,35.004 89.665,35.004 C93.931,35.004 96.283,31.609 96.283,27.603 Z M99.983,37.79 L96.065,37.79 L96.065,34.612 L95.977,34.612 C94.41,36.92 91.972,38.488 89.056,38.488 C82.829,38.488 79.303,33.306 79.303,27.472 C79.303,21.9 83.004,16.805 88.925,16.805 C91.929,16.805 94.367,18.372 95.977,20.81 L96.065,20.81 L96.065,17.416 L99.983,17.416 L99.983,37.79 Z"/>
              <polygon points="112.512 28.474 121.785 4.266 131.059 28.474 140.246 4.963 144.687 4.963 131.059 39.098 121.785 15.021 112.512 39.098 98.884 4.963 103.325 4.963"/>
              <path d="M158.069,27.603 C158.069,23.641 155.674,20.288 151.451,20.288 C147.401,20.288 145.008,23.815 145.008,27.603 C145.008,31.435 147.315,35.004 151.451,35.004 C155.718,35.004 158.069,31.609 158.069,27.603 Z M161.77,37.79 L157.851,37.79 L157.851,34.612 L157.764,34.612 C156.197,36.92 153.759,38.488 150.842,38.488 C144.616,38.488 141.089,33.306 141.089,27.472 C141.089,21.9 144.789,16.805 150.71,16.805 C153.715,16.805 156.153,18.372 157.764,20.81 L157.851,20.81 L157.851,17.416 L161.77,17.416 L161.77,37.79 Z"/>
            </g>
          </g>
        </svg>
      </div>
    ),

    // ── LaCantina ── clean wordmark, teal accent bar
    lacantina: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"4px 8px"}}>
        <svg viewBox="0 0 285 53.5" style={{width:"100%",height:"100%"}} xmlns="http://www.w3.org/2000/svg">
          <g>
            <g>
              <path d="M85.3,18.2a2.3,2.3,0,0,1,2.4-2.3A2.3,2.3,0,0,1,90,18.2V33.1h8.7a2.1,2.1,0,0,1,2.1,2.2,2.1,2.1,0,0,1-2.1,2.1h-11a2.3,2.3,0,0,1-2.4-2.3V18.2" fill="#59595b"/>
              <path d="M116.1,31.6v-.8a8.3,8.3,0,0,0-2.9-.6c-2,0-3.2.8-3.2,2.3h0c0,1.3,1,2,2.5,2s3.6-1.2,3.6-2.9m-10.6,1.1h0c0-3.5,2.7-5.2,6.6-5.2a11.9,11.9,0,0,1,4,.7v-.3c0-1.9-1.2-2.9-3.5-2.9a9.6,9.6,0,0,0-3.2.4h-.7a1.8,1.8,0,0,1-1.9-1.9,2,2,0,0,1,1.2-1.8,15.8,15.8,0,0,1,5.2-.8,7.7,7.7,0,0,1,5.5,1.8,7.1,7.1,0,0,1,1.8,5.2v7.5a2.2,2.2,0,0,1-2.3,2.2,2.1,2.1,0,0,1-2.2-1.9h0a6.1,6.1,0,0,1-4.9,2.1c-3.1,0-5.6-1.8-5.6-5" fill="#59595b"/>
              <path d="M126.6,26.8h0a10.9,10.9,0,0,1,11.1-11,11.6,11.6,0,0,1,7.2,2.2,2.4,2.4,0,0,1,.9,1.8,2.3,2.3,0,0,1-2.4,2.3,2.9,2.9,0,0,1-1.4-.4,6.7,6.7,0,0,0-4.3-1.6c-3.6,0-6.2,3-6.2,6.7h0c0,3.7,2.5,6.7,6.2,6.7a6.9,6.9,0,0,0,4.6-1.6,2.5,2.5,0,0,1,1.4-.6,2.2,2.2,0,0,1,2.2,2.2,2.5,2.5,0,0,1-.8,1.7,10.6,10.6,0,0,1-7.6,2.7,10.8,10.8,0,0,1-10.9-11" fill="#59595b"/>
              <path d="M164.6,28.5l-3-7.1-2.9,7.1h5.9m-13.2,5.9,7.4-16.8a2.9,2.9,0,0,1,2.8-1.9h.2a2.8,2.8,0,0,1,2.7,1.9L172,34.4a2.9,2.9,0,0,1,.2.9,2.2,2.2,0,0,1-2.2,2.3,2.6,2.6,0,0,1-2.3-1.6l-1.4-3.4h-9.4l-1.5,3.5a2.4,2.4,0,0,1-2.1,1.5,2.2,2.2,0,0,1-2.2-2.2,1.9,1.9,0,0,1,.3-1" fill="#59595b"/>
              <path d="M178.1,18.3a2.3,2.3,0,0,1,2.3-2.3h.5a2.8,2.8,0,0,1,2.4,1.3l9.1,11.9v-11a2.3,2.3,0,0,1,4.6,0v17a2.3,2.3,0,0,1-2.3,2.3h-.2a2.7,2.7,0,0,1-2.4-1.4l-9.4-12.3V35.3a2.3,2.3,0,1,1-4.6,0v-17" fill="#59595b"/>
              <path d="M209.4,20.4h-4.5a2.2,2.2,0,1,1,0-4.3h13.7a2.1,2.1,0,0,1,2.1,2.1,2.1,2.1,0,0,1-2.1,2.2h-4.5V35.2a2.4,2.4,0,0,1-2.4,2.4,2.3,2.3,0,0,1-2.3-2.4V20.4" fill="#59595b"/>
              <path d="M226.5,18.2a2.3,2.3,0,0,1,2.3-2.3,2.3,2.3,0,0,1,2.4,2.3v17a2.4,2.4,0,1,1-4.7,0v-17" fill="#59595b"/>
              <path d="M239.2,18.3a2.3,2.3,0,0,1,2.3-2.3h.5a2.8,2.8,0,0,1,2.4,1.3l9.1,11.9v-11a2.3,2.3,0,0,1,4.6,0v17a2.3,2.3,0,0,1-2.3,2.3h-.2a2.7,2.7,0,0,1-2.4-1.4l-9.4-12.3V35.3a2.3,2.3,0,0,1-4.6,0v-17" fill="#59595b"/>
              <path d="M277.4,28.5l-3-7.1-2.9,7.1h5.9m-13.2,5.9,7.4-16.8a2.9,2.9,0,0,1,2.8-1.9h.2a2.8,2.8,0,0,1,2.7,1.9l7.5,16.8a2.9,2.9,0,0,1,.2.9,2.2,2.2,0,0,1-2.2,2.3,2.6,2.6,0,0,1-2.3-1.6l-1.4-3.4h-9.4l-1.5,3.5a2.4,2.4,0,0,1-2.1,1.5,2.2,2.2,0,0,1-2.2-2.2,1.9,1.9,0,0,1,.3-1" fill="#59595b"/>
            </g>
            <g>
              <path d="M69,.1a.7.7,0,0,0-.8,0l-1.5,1V52.4a13,13,0,0,1,1.5,1,.7.7,0,0,0,.8,0,.5.5,0,0,0,.3-.5V.6A.5.5,0,0,0,69,.1Z" fill="#59595b"/>
              <path d="M73.5.1a.7.7,0,0,0-.8,0l-1.5,1V52.4a13,13,0,0,1,1.5,1,.7.7,0,0,0,.8,0,.5.5,0,0,0,.3-.5V.6A.5.5,0,0,0,73.5.1Z" fill="#59595b"/>
              <path d="M2.4,10.4l20.5,36,12.4,2L3.6,10.2Z" fill="#59595b"/>
              <path d="M52.1,13.1a.8.8,0,0,1,.4-.4L66.2,0,4.7,10.1,46.9,50.3l19.3,3.1L52.5,40.8c-.2-.1-.3-.2-.3-.4a1.2,1.2,0,0,1-.3-.9V14A2,2,0,0,1,52.1,13.1Z" fill="#59595b"/>
              <path d="M7.8,26.8,1.6,10.6H1A1.3,1.3,0,0,0,0,12V40.5a9.2,9.2,0,0,0,.1,1.6,1.2,1.2,0,0,0,.6.6l.5.2h.3l13.2,2.1ZM1.6,43Z" fill="#59595b"/>
            </g>
          </g>
        </svg>
      </div>
    ),

    // ── Andersen ── orange upward triangle mark + wordmark
    andersen: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"6px 10px"}}>
        <svg viewBox="0 0 1316.94 192.4" style={{width:"100%",height:"auto"}} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <polygon fill="#f26924" points="0 192.26 0 0 192.26 0 0 192.26"/>
          <polygon fill="#f26924" points="384.51 192.26 384.51 0 192.26 0 384.51 192.26"/>
          <polygon fill="#fff" points="192.26 0 192.26 192.26 384.51 192.26 192.26 0"/>
          <polygon fill="#001722" points="192.26 0 192.26 192.26 0 192.26 192.26 0"/>
          <g fill="#001722">
            <polygon points="417.87 154.83 428.78 191.38 438.47 191.38 445.65 170.2 452.82 191.38 462.51 191.38 473.42 154.83 463.48 154.83 457.18 178.44 449.43 154.83 441.86 154.83 434.11 178.44 427.81 154.83 417.87 154.83"/>
            <rect height="36.55" width="9.5" x="500.51" y="154.83"/>
            <polygon points="552.38 191.38 552.38 169.04 569.93 191.38 579.38 191.38 579.38 154.83 569.93 154.83 569.93 177.18 552.38 154.83 542.88 154.83 542.88 191.38 552.38 191.38"/>
            <path d="M642.88,166.15c-.94-2.21-2.22-4.15-3.86-5.82s-3.54-2.99-5.72-4c-2.18-1-4.51-1.5-7.01-1.5h-14.06v36.55h14.06c2.52,0,4.87-.5,7.05-1.5,2.18-1,4.09-2.34,5.72-4.03s2.91-3.63,3.83-5.84c.92-2.21,1.38-4.51,1.38-6.91,0-2.42-.47-4.74-1.4-6.95Zm-9.24,11.04c-.47,1.24-1.15,2.32-2.03,3.22-.89,.9-1.98,1.62-3.27,2.13-1.29,.52-2.76,.78-4.41,.78h-2.18v-20.45h2.18c1.62,0,3.07,.26,4.36,.78,1.29,.52,2.38,1.23,3.27,2.13s1.57,1.99,2.06,3.25-.73,2.62-.73,4.07-.24,2.85-.71,4.1Z"/>
            <path d="M712.87,165.52c-1-2.34-2.4-4.39-4.19-6.13-1.79-1.74-3.93-3.11-6.42-4.1-2.49-.99-5.2-1.48-8.14-1.48s-5.69,.49-8.16,1.48c-2.47,.99-4.6,2.35-6.38,4.1-1.78,1.74-3.16,3.79-4.17,6.13-1,2.34-1.5,4.87-1.5,7.58s.5,5.25,1.5,7.58c1,2.34,2.39,4.39,4.17,6.13,1.78,1.74,3.9,3.11,6.38,4.1,2.47,.98,5.19,1.48,8.16,1.48s5.66-.49,8.14-1.48c2.49-.99,4.63-2.35,6.42-4.1,1.79-1.74,3.19-3.79,4.19-6.13s1.5-4.87,1.5-7.58-.5-5.24-1.5-7.58Zm-9.26,11.61c-.55,1.23-1.3,2.3-2.25,3.2s-2.06,1.61-3.3,2.1c-1.24,.5-2.56,.75-3.95,.75s-2.71-.25-3.95-.75c-1.24-.5-2.34-1.2-3.27-2.1s-1.68-1.97-2.23-3.2c-.55-1.23-.83-2.57-.83-4.03s.28-2.8,.83-4.03c.55-1.23,1.29-2.3,2.23-3.2,.94-.9,2.03-1.61,3.27-2.11s2.56-.75,3.95-.75,2.7,.25,3.95,.75c1.24,.5,2.34,1.21,3.3,2.11s1.7,1.97,2.25,3.2-.83,2.57-.83,4.03-.28,2.8-.83,4.03Z"/>
            <polygon points="741.19 154.83 752.09 191.38 761.79 191.38 768.95 170.2 776.13 191.38 785.82 191.38 796.74 154.83 786.8 154.83 780.49 178.44 772.74 154.83 765.18 154.83 757.42 178.44 751.12 154.83 741.19 154.83"/>
            <path d="M848.84,156.77c-1.81-.97-3.7-1.7-5.67-2.2-1.97-.5-3.86-.75-5.67-.75-1.93,0-3.69,.29-5.26,.88-1.57,.58-2.89,1.4-3.98,2.45-1.08,1.05-1.92,2.31-2.52,3.78s-.9,3.11-.9,4.92,.28,3.31,.85,4.48c.56,1.18,1.31,2.15,2.23,2.93,.92,.78,1.97,1.4,3.15,1.86,1.18,.47,2.38,.9,3.62,1.29,1.03,.35,1.91,.68,2.64,.97,.73,.29,1.31,.61,1.77,.95s.78,.71,.97,1.12c.2,.4,.29,.88,.29,1.43,0,.9-.38,1.72-1.14,2.42-.76,.71-1.91,1.07-3.47,1.07-1.36,0-2.73-.3-4.12-.92-1.39-.61-2.8-1.55-4.22-2.81l-4.07,7.66c3.94,2.75,8.23,4.12,12.85,4.12,2.23,0,4.22-.3,5.99-.9,1.77-.6,3.25-1.44,4.46-2.52s2.13-2.38,2.76-3.91c.63-1.52,.95-3.21,.95-5.09,0-2.78-.72-5.04-2.16-6.77-1.43-1.73-3.71-3.11-6.81-4.15-.78-.26-1.56-.5-2.35-.73-.79-.23-1.5-.49-2.13-.8-.63-.3-1.14-.67-1.53-1.09-.39-.42-.58-.95-.58-1.6,0-.94,.39-1.69,1.17-2.27s1.78-.88,3-.88c.97,0,1.97,.2,3.01,.61,1.03,.4,2.07,1.02,3.1,1.86l3.78-7.42Z"/>
            <path d="M950.73,182.71l.73-.68c.9-.84,1.7-1.64,2.4-2.4,.69-.76,1.32-1.51,1.87-2.25l-5.38-5.19c-1.23,1.65-2.81,3.4-4.75,5.24l-4.6-4.84c1.26-.64,2.32-1.29,3.18-1.91,.85-.63,1.55-1.29,2.08-1.99,.54-.69,.91-1.43,1.14-2.22,.23-.79,.34-1.67,.34-2.64,0-1.42-.28-2.74-.85-3.95-.56-1.21-1.36-2.27-2.37-3.18-1.02-.9-2.22-1.61-3.61-2.1-1.39-.5-2.91-.75-4.55-.75s-3.11,.25-4.51,.75c-1.39,.5-2.59,1.19-3.61,2.08s-1.82,1.95-2.4,3.17c-.58,1.23-.88,2.56-.88,3.98,0,2.13,.94,4.38,2.81,6.74l.63,.73-1.02,.48c-1.19,.55-2.2,1.09-3.03,1.62-.83,.54-1.57,1.17-2.25,1.91-.9,.97-1.54,1.98-1.91,3.03-.37,1.05-.56,2.25-.56,3.61,0,1.52,.29,2.92,.88,4.19,.58,1.28,1.39,2.38,2.42,3.32,1.03,.94,2.26,1.67,3.69,2.18,1.42,.52,2.99,.78,4.7,.78,4,0,8.19-1.45,12.56-4.36l3.2,3.35h11.83l-8.18-8.68Zm-17.06,1.21c-.58,0-1.12-.09-1.62-.27-.5-.18-.95-.42-1.33-.73-.39-.3-.7-.68-.93-1.12-.23-.44-.34-.91-.34-1.43,0-1.42,1.14-2.85,3.45-4.27l5.77,6.2c-1.72,1.07-3.38,1.6-5,1.6Zm3.15-15.76c-1.91-2.07-2.86-3.69-2.86-4.84,0-.88,.29-1.6,.88-2.18,.58-.58,1.31-.88,2.18-.88,.94,0,1.7,.33,2.3,1,.59,.66,.9,1.45,.9,2.35,0,1.68-1.13,3.2-3.4,4.55Z"/>
            <path d="M1060.23,166.15c-.94-2.21-2.22-4.15-3.86-5.82-1.63-1.67-3.54-2.99-5.72-4s-4.51-1.5-7.01-1.5h-14.06v36.55h14.06c2.52,0,4.87-.5,7.05-1.5s4.09-2.34,5.72-4.03c1.63-1.68,2.91-3.63,3.83-5.84,.92-2.21,1.38-4.51,1.38-6.91,0-2.42-.47-4.74-1.4-6.95Zm-9.24,11.04c-.47,1.24-1.15,2.32-2.03,3.22-.89,.9-1.98,1.62-3.27,2.13-1.29,.52-2.76,.78-4.41,.78h-2.18v-20.45h2.18c1.62,0,3.07,.26,4.36,.78,1.29,.52,2.38,1.23,3.27,2.13s1.57,1.99,2.06,3.25c.49,1.26,.73,2.62,.73,4.07,0,1.49-.24,2.85-.71,4.1Z"/>
            <path d="M1130.22,165.52c-1-2.34-2.4-4.39-4.19-6.13-1.79-1.74-3.93-3.11-6.42-4.1-2.49-.99-5.2-1.48-8.14-1.48s-5.69,.49-8.16,1.48c-2.47,.99-4.6,2.35-6.38,4.1s-3.16,3.79-4.17,6.13c-1,2.34-1.5,4.87-1.5,7.58s.5,5.25,1.5,7.58c1,2.34,2.39,4.39,4.17,6.13s3.9,3.11,6.38,4.1c2.47,.98,5.19,1.48,8.16,1.48s5.66-.49,8.14-1.48c2.49-.99,4.63-2.35,6.42-4.1,1.79-1.74,3.19-3.79,4.19-6.13,1-2.34,1.5-4.87,1.5-7.58s-.5-5.24-1.5-7.58Zm-9.26,11.61c-.55,1.23-1.3,2.3-2.25,3.2s-2.06,1.61-3.3,2.1c-1.24,.5-2.56,.75-3.95,.75s-2.71-.25-3.95-.75c-1.24-.5-2.34-1.2-3.27-2.1-.94-.9-1.68-1.97-2.23-3.2s-.83-2.57-.83-4.03,.28-2.8,.83-4.03c.55-1.23,1.29-2.3,2.23-3.2,.94-.9,2.03-1.61,3.27-2.11s2.56-.75,3.95-.75,2.7,.25,3.95,.75c1.24,.5,2.34,1.21,3.3,2.11,.95,.9,1.7,1.97,2.25,3.2,.55,1.23,.83,2.57,.83,4.03s-.28,2.8-.83,4.03Z"/>
            <path d="M1200.27,165.52c-1-2.34-2.4-4.39-4.19-6.13-1.79-1.74-3.93-3.11-6.43-4.1-2.49-.99-5.2-1.48-8.14-1.48s-5.69,.49-8.16,1.48c-2.47,.99-4.6,2.35-6.38,4.1s-3.16,3.79-4.17,6.13c-1,2.34-1.5,4.87-1.5,7.58s.5,5.25,1.5,7.58c1,2.34,2.39,4.39,4.17,6.13,1.78,1.74,3.91,3.11,6.38,4.1,2.47,.98,5.19,1.48,8.16,1.48s5.66-.49,8.14-1.48c2.49-.99,4.63-2.35,6.43-4.1,1.79-1.74,3.19-3.79,4.19-6.13,1-2.34,1.5-4.87,1.5-7.58s-.5-5.24-1.5-7.58Zm-9.26,11.61c-.55,1.23-1.3,2.3-2.25,3.2s-2.06,1.61-3.3,2.1c-1.24,.5-2.56,.75-3.95,.75s-2.7-.25-3.95-.75-2.33-1.2-3.27-2.1c-.94-.9-1.68-1.97-2.22-3.2-.55-1.23-.83-2.57-.83-4.03s.28-2.8,.83-4.03c.54-1.23,1.29-2.3,2.22-3.2,.94-.9,2.03-1.61,3.27-2.11s2.56-.75,3.95-.75,2.7,.25,3.95,.75,2.34,1.21,3.3,2.11c.95,.9,1.7,1.97,2.25,3.2,.55,1.23,.83,2.57,.83,4.03s-.28,2.8-.83,4.03Z"/>
            <path d="M1251.89,176.4c2.62-.61,4.6-1.79,5.94-3.52s2.01-3.98,2.01-6.77c0-1.55-.25-3.01-.75-4.36-.5-1.36-1.24-2.56-2.23-3.59s-2.24-1.85-3.76-2.45c-1.52-.6-3.3-.9-5.33-.9h-14.78v36.56h9.5v-14.06l9.07,14.06h11.83l-11.5-14.98Zm-3.3-6.4c-1,.78-2.44,1.17-4.31,1.17h-1.79v-9.02h1.79c1.87,0,3.31,.39,4.31,1.17,1,.78,1.5,1.89,1.5,3.35s-.5,2.56-1.5,3.34Z"/>
            <path d="M1315.44,156.77c-1.81-.97-3.7-1.7-5.67-2.2-1.97-.5-3.86-.75-5.67-.75-1.94,0-3.69,.29-5.26,.88-1.57,.58-2.89,1.4-3.98,2.45s-1.93,2.31-2.52,3.78c-.6,1.47-.9,3.11-.9,4.92s.28,3.31,.85,4.48c.56,1.18,1.31,2.15,2.23,2.93s1.97,1.4,3.15,1.86c1.18,.47,2.38,.9,3.62,1.29,1.03,.35,1.91,.68,2.64,.97,.73,.29,1.31,.61,1.77,.95,.45,.34,.78,.71,.97,1.12,.2,.4,.29,.88,.29,1.43,0,.9-.38,1.72-1.14,2.42-.76,.71-1.91,1.07-3.47,1.07-1.36,0-2.73-.3-4.12-.92-1.39-.61-2.8-1.55-4.22-2.81l-4.07,7.66c3.94,2.75,8.23,4.12,12.85,4.12,2.23,0,4.22-.3,5.99-.9,1.76-.6,3.25-1.44,4.46-2.52,1.21-1.08,2.13-2.38,2.76-3.91,.63-1.52,.95-3.21,.95-5.09,0-2.78-.72-5.04-2.15-6.77-1.44-1.73-3.71-3.11-6.81-4.15-.78-.26-1.56-.5-2.35-.73-.79-.23-1.5-.49-2.13-.8-.63-.3-1.14-.67-1.53-1.09-.39-.42-.58-.95-.58-1.6,0-.94,.39-1.69,1.17-2.27s1.78-.88,3.01-.88c.97,0,1.97,.2,3,.61,1.04,.4,2.07,1.02,3.1,1.86l3.78-7.42Z"/>
            <path d="M471.66,.19l53.87,120.4h-25.68l-7.98-17.93h-40.4l-7.98,17.93h-25.61L471.66,.19Zm10.83,81.54l-10.76-24.96-10.9,24.96s21.66,0,21.66,0Z"/>
            <path d="M623.74,67.82V2.32h23.78V123.01l-71.14-67.77V120.74h-23.71V.12l71.07,67.7Z"/>
            <path d="M714.44,2.61c18.54,0,33.04,7.36,43.11,17.34,10.54,10.59,15.81,24.51,15.81,41.76s-5.27,31.12-15.81,41.61c-11.61,11.52-25.98,17.27-43.11,17.27h-31.4V2.68h31.4v-.08Zm-.07,23.5h-7.68V96.95h7.91c21.27,0,35.13-14.12,35.13-35.42,0-21.11-14.11-35.42-35.36-35.42Z"/>
            <path d="M875.1,2.32V25.95h-47.43v23.78h35.57v23.64h-35.57v23.78h47.43v23.57h-71.14V2.32h71.14Z"/>
            <path d="M905.37,2.61h38.5c13.14,0,23.76,4.96,30.88,12.01,7.18,7.18,11.42,13.74,11.42,26.79v3.07c0,7.95-2.49,15.44-7.46,22.46-4.15,5.8-7.42,8.27-14.12,10.9l27.44,42.75h-28.98l-33.88-52.19v52.19h-23.71l-.08-117.98Zm56.36,39.53c0-4.29-1.56-8.08-4.68-11.35-3.08-2.99-8.92-4.68-14.64-4.68h-13.32V58.67h9.15v.07h7.91c8.64,0,15.59-7.61,15.59-16.61Z"/>
            <path d="M1051.89,97.36c6.55,0,13.78-5.44,13.78-11.98,0-10.77-14.46-12.27-22.61-15.1-14.39-4.9-27.09-16.71-27.09-32.78,0-19.89,16.14-35.92,36.03-35.92,18.14,0,33.17,13.45,35.61,30.95l-23.54,4.97c0-6.48-5.44-11.92-11.92-11.92s-12.03,5.44-12.03,11.99c0,10.63,13.46,13.45,21.65,15.89,14.89,4.29,28.02,15.64,28.02,32.06,0,19.89-17.86,35.96-37.72,35.96-18.25,0-34.75-13.38-37.43-30.95l23.54-5.01c0,6.58,7.16,11.95,13.81,11.95l-.11-.11Z"/>
            <path d="M1191.46,2.32V25.95h-47.43v23.78h35.57v23.64h-35.57v23.78h47.43v23.57h-71.14V2.32h71.14Z"/>
            <path d="M1293.12,67.82V2.32h23.78V123.01l-71.14-67.77V120.74h-23.71V.12l71.07,67.7Z"/>
          </g>
        </svg>
      </div>
    ),

    // ── Andersen Skylights — same triangle, skylight subtitle
    andersen_skylight: (
      <svg width={w} height={h} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#EEF4F2"/>
        <polygon points="32,9 41,25 23,25" fill="#E87820"/>
        <text x="32" y="38" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="9" fill="#1A2028" letterSpacing="0">ANDERSEN</text>
        <text x="32" y="50" textAnchor="middle" fontFamily="monospace" fontSize="5" letterSpacing="0" fill="#2A8A80">SKYLIGHTS</text>
      </svg>
    ),

    // ── Marvin ── bold serif wordmark, warm linen
    marvin: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"2px 4px"}}>
        <img src="/marvinlogo.png" alt="Marvin" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── Milgard ── bold red wordmark, diagonal ray
    milgard: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"6px 12px"}}>
        <img src="/milgard_logo.svg" alt="Milgard" style={{width:"100%",height:"auto",objectFit:"contain"}}/>
      </div>
    ),

    // ── Pella ── bold red wordmark on white, clean horizontal rule
    pella: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#000",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img src="/pellalogo.png" alt="Pella" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── Weather Shield ── shield icon + stacked wordmark, mountain-blue
    weathershield: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"4px 8px"}}>
        <img src="/weathershield-logo.jpg" alt="Weather Shield" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── Alpine Windows ── mountain peak motif + wordmark, teal
    alpine: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"4px 8px"}}>
        <img src="/alpine-logo.jpg" alt="Alpine" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── JELD-WEN Windows ── bold hyphenated wordmark, navy slate
    jeldwen_win: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"4px 8px"}}>
        <img src="/jeldwen-logo.png" alt="JELD-WEN" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── Simonton ── clean wordmark with Daylight Max callout, warm gold
    simonton: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"4px 8px"}}>
        <img src="/simonton-logo.png" alt="Simonton" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── Western Window Systems ── clean WW monogram, ember/orange modern
    westernwindow: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"4px 6px"}}>
        <img src="/western-logo.png" alt="Western Window Systems" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── Nu Vista ── architectural aluminum wordmark, industrial slate-teal
    nuvista: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"4px 8px"}}>
        <img src="/nuvista-logo.png" alt="Nu Vista" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── International Window Co. ── IWC monogram, slate/navy industrial
    iwc: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:T.card,display:"flex",alignItems:"center",justifyContent:"center",padding:"4px 8px"}}>
        <img src="/iwc-logo.png" alt="IWC" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── Therma-Tru ── real SVG logo, viewBox cropped to content
    thermatru: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"4px 8px"}}>
        <svg viewBox="9 338 882 223" style={{width:"100%",height:"100%"}} xmlns="http://www.w3.org/2000/svg">
          <path fill="#7f8082" d="M19 348.53c26.82 0 53.64-.03 80.47.02-.04 16.45.1 32.91-.08 49.37 7.47 1 15.09-.11 22.61.27 5.4.23 10.8.03 16.2.08.07-16.62-.73-33.3.17-49.89 6.58.33 13.18.04 19.78.17.13 40.81.02 81.62.05 122.43-6.68-.03-13.37.17-20.05-.12-.37-17.14.1-34.32-.2-51.45-12.82.16-25.65.01-38.47.07-.02 17.17.01 34.35-.01 51.52H79.53c-.02-33.84.01-67.68-.01-101.52-6.82-.04-13.64.04-20.46-.04-.15 33.85 0 67.7-.07 101.55-6.66.01-13.32.02-19.98 0-.06-33.85.07-67.7-.06-101.55-6.65.06-13.3.03-19.95.03v-20.94Zm152.54.01c19.31-.02 38.61-.02 57.92 0 .02 6.97.02 13.95 0 20.92-12.66.04-25.32-.01-37.98.02-.06 10.11.09 20.22-.08 30.33 12.2-.03 24.39-.01 36.59-.01-.09 7.05-.23 14.1-.23 21.14-12.11.19-24.22-.09-36.33.13.05 9.58.11 19.16-.03 28.75 12.7-.08 25.4.05 38.09-.07-.04 7.08 0 14.16-.02 21.25h-57.94c0-40.82-.02-81.64.01-122.46Zm70.45-.01c12.33 0 24.67-.01 37.01 0 10.17.26 20.52 4.53 26.6 12.92 7.32 9.15 9.45 21.62 7.54 32.99-1.53 8.34-4.7 16.81-11.06 22.69-4.33 4.34-10.08 7.01-15.99 8.41.11.86.41 1.65.92 2.38 9.19 14.39 18.67 28.59 27.73 43.06-7.87 0-15.74.1-23.61-.04-1.62-1.15-2.21-3.19-3.28-4.77-7.78-12.56-15.41-25.22-23.17-37.79-.77-1.37-1.4-2.85-2.64-3.86-.12 15.49.01 30.98-.05 46.47-6.71.03-13.42 0-20.14.01.17-40.82-.1-81.65.14-122.47m19.98 21.21c-.28 12.42.18 24.87-.22 37.28 8.29-.58 17.61 1.84 24.93-3.23 10.86-7.77 9.3-28.12-3.86-32.61-6.69-2.3-13.91-1.21-20.85-1.44Zm58.17-20.94c9.26-.64 18.59-.09 27.88-.28 9.54 30.45 19.1 60.93 28.27 91.5 1.14-.19 1.77-.89 1.91-2.09 8.44-28.02 17.13-55.95 25.71-83.93.8-1.75.7-3.99 2.05-5.43 9.11-.12 18.23.01 27.34-.06.07 40.83-.17 81.68.12 122.5-6.73-.07-13.47.1-20.2-.1-.34-30.52.05-61.06-.05-91.58l-.95 1.35c-8.81 30.09-18.02 60.05-26.79 90.15-5.68.35-11.38.14-17.07.11-7.2-24.11-14.57-48.16-21.78-72.27-2.1-6.57-3.75-13.3-6.11-19.79-.26 30.67-.13 61.43-.07 92.12-6.71-.07-13.43.14-20.13-.12-.33-40.69-.09-81.4-.13-122.08Zm162.12-.03c5.27-.56 10.6-.09 15.9-.26 14.96 40.85 30.18 81.59 45 122.48-7.31.02-14.61 0-21.92.01-3.83-10.54-7.61-21.1-11.56-31.59-12.82.11-25.65.1-38.46 0-3.96 10.43-7.71 20.94-11.49 31.44-7.35.34-14.72.05-22.07.15 14.78-40.77 29.95-81.41 44.6-122.23m7.86 31.78c-4.16 12.46-8.23 24.95-12.2 37.47 8.25 0 16.5-.02 24.76.01-4.34-12.44-7.9-25.2-12.56-37.48Zm142.42-32.01c29.49-.03 58.99-.01 88.49-.01 9.21-.06 19.19.02 27.14 5.37 12.57 8.14 18.23 24.33 16.06 38.81-1.6 11.18-6.68 22.79-16.83 28.67-3.21 2.37-7.34 2.73-10.72 4.72 9.54 15.11 19.45 29.99 28.93 45.14-8.08-.08-16.16-.01-24.23-.04-8.47-14.57-17.47-28.84-26.15-43.29-.8-1.02-1.11-2.66-2.51-3 .15 15.43.07 30.86.29 46.29-6.73 0-13.47.02-20.2-.01 0-33.79-.08-67.58.04-101.36-6.8-.04-13.71-.49-20.46.24.2 33.73.01 67.46.1 101.19-6.66-.09-13.32-.09-19.98-.01.09-33.71-.1-67.44.1-101.15-6.62-.97-13.41-.05-20.08-.19 0-7.12-.02-14.25.01-21.37m80.09 20.93c.22 12.51 0 25.03.1 37.54 7.43-.44 15.32 1.29 22.35-1.81 11.94-5.63 12.76-24.19 2.84-32.09-7.41-5.14-16.84-3.27-25.29-3.64Zm54.34-20.94c6.76-.02 13.52.02 20.28-.02-.1 27.18-.04 54.36-.02 81.55.2 7.57 2.48 16.27 9.55 20.26 5.83 2.87 13.23 2.73 18.85-.56 7.09-4.72 8.71-13.84 8.88-21.75.05-26.49-.02-52.98.03-79.47 6.64-.02 13.28-.03 19.92 0 .03 26.48 0 52.97.02 79.45-.26 11.16-2 23.19-9.56 31.94-8.54 10.2-22.79 16.18-35.97 12.85-9.25-1.49-17.66-7.03-23.3-14.42-5.96-7.08-7.46-16.63-8.29-25.55-.6-28.09.08-56.19-.39-84.28Zm99.4.98c4.61-1.45 9.92.53 12.7 4.43 2.25 2.83 2.17 6.68 1.79 10.09-1.45 6.04-8.34 10.29-14.39 8.43-5.55-1.16-9.7-6.81-9.13-12.46.45-4.89 4.13-9.5 9.03-10.49Zm-310.29-6.47c7.27.37 14.51-.14 21.77.23 1.96-.29 3.93-.32 5.89.02 2-.28 4.01-.35 6.01-.01 2.02-.3 4.06-.31 6.09.01 2-.35 4.02-.3 6.03 0 1.99-.35 4-.29 6-.01 3.64-.42 7.29.1 10.96-.2-.01 40.68 0 81.35-.01 122.02-20.92.24-41.86-.02-62.78.13-.01-40.73-.09-81.46.04-122.19Zm8.61 58.41c-1.24 1.46-2.46 3.47-1.01 5.26 1.57 2.27 5.02.55 5.44-1.71-.1-2.29-2.25-3.83-4.43-3.55Zm80.8 81.02c8.64-1.73 18.24-.29 25.31 5.21 8.72 6.02 13.63 16.9 12.72 27.44-.38 8.23-4.57 16.09-10.92 21.29-7.09 6.22-17.17 8.43-26.34 6.74-11.48-2.26-21.14-11.52-24.04-22.82-1.61-7.51-.97-15.69 2.86-22.45 4.18-7.74 11.83-13.49 20.41-15.41Zm3.22 9.86c-6.69 1.15-12.34 6.22-14.8 12.46-3.96 9.25-.1 21.14 8.74 26.04 6.12 3.47 14.06 3.44 20.05-.31 6.93-4.06 10.76-12.58 9.76-20.48-1-11.15-12.63-20.45-23.75-17.71Zm61.92-9.71c7.95-1.76 16.72-.9 23.73 3.44 9.06 5.29 15.29 15.41 15.17 26 .37 9.96-4.57 19.88-12.65 25.7-8.3 6.11-19.75 7.64-29.38 4.02-6.78-2.5-12.4-7.56-16.14-13.67-5.05-8.66-5.51-19.89-.93-28.83 3.86-8.19 11.47-14.34 20.2-16.66Zm4.09 9.71c-9.66 1.63-16.66 11.17-16.42 20.77.22 6.91 3.89 13.52 9.66 17.33 5.39 3.29 12.37 3.99 18.18 1.38 8.85-3.6 14.25-14.12 11.92-23.41-1.61-10.48-12.89-18.64-23.34-16.07Zm84.89 1.88c1.82-7.32 9.19-12.47 16.63-12.31 9.2-.32 18.37 7.73 17.57 17.24-3.44-.49-6.92-.26-10.37-.37-1.15-2.84-2.51-6.71-6.31-6.61-5.38-1.26-9.33 5.72-5.85 9.88 4.19 4.26 10.85 4.12 15.69 7.43 11.52 6.07 11.39 25.07.06 31.27-8.76 5.7-21.98 2.99-27.52-5.93-1.74-2.74-2.5-5.96-2.78-9.16 3.85-.06 7.72-.04 11.59-.03.63 2.47 1.43 5.36 3.86 6.67 4.2 2.72 10.63.48 12.11-4.35.94-3.42-.67-7.49-3.94-9.02-5.79-3.23-13.23-3.91-17.68-9.24-3.78-4.1-4.3-10.25-3.06-15.47Zm-230.81-11.38c7.48.24 15-.35 22.46.58 6.01.88 12.14 2.87 16.57 7.21 5.13 5.55 8.4 12.89 8.64 20.49.74 11.4-5.41 23.4-15.97 28.27-10.09 3.98-21.12 2.65-31.7 2.97.03-19.84.03-39.68 0-59.52Zm10.92 10.32c.07 12.95.07 25.91 0 38.86 6.58.49 13.67-.21 19.16-4.2 8.62-7.05 8.95-21.55.85-29.1-5.14-5.27-13.09-5.7-20.01-5.56Zm176.38-10.25c7.04.01 14.09-.11 21.14.06 6.64.12 13.45 3.58 16.36 9.77 5.99 10.57-.91 26.17-13.37 27.5 5.09 7.5 10.79 14.59 15.94 22.06-4.32.04-8.63-.07-12.94.07-4.68-6.1-8.81-12.61-13.29-18.86-.88-1.22-1.43-2.9-2.91-3.51.01 7.44-.23 14.88.31 22.3-3.75.01-7.5.01-11.24-.01-.03-19.79-.03-39.59 0-59.38Zm10.63 10.25c.02 5.94.12 11.89-.05 17.83 4.83.65 10.44 1.14 14.72-1.75 4.55-3.63 4.04-11.51-.94-14.48-4.22-2.19-9.15-1.65-13.73-1.6Z"/>
        </svg>
      </div>
    ),

    thermatru_util: (
      <svg width={w} height={h} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <text x="26" y="25" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="9.5" fill="#1A2028" letterSpacing="0.3">THERMA</text>
        <rect x="18" y="28" width="16" height="2" rx="1" fill="#C87A4A"/>
        <text x="26" y="38" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="9.5" fill="#C87A4A" letterSpacing="0.3">TRU</text>
        <text x="26" y="47" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0.8" fill="#4a5a54">UTILITY DOORS</text>
      </svg>
    ),

    // ── TM Cobb ── real logo
    tmcobb: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"6px 10px"}}>
        <img src="/tmcobblogo.png" alt="TM Cobb" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    tmcobb_int: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"6px 10px"}}>
        <img src="/tmcobblogo.png" alt="TM Cobb" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    tmcobb_util: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"6px 10px"}}>
        <img src="/tmcobblogo.png" alt="TM Cobb" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── Simpson Door ── serif wordmark, warm craftsman rust
    simpson: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"6px 10px"}}>
        <img src="/simpsonlogo.jpg" alt="Simpson Door Company" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── Rogue Valley ── RV monogram + mountain arc, deep gold
    roguevalley: (
      <svg width={w} height={h} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#FAF7EC"/>
        <path d="M12,40 Q22,20 32,16 Q42,20 52,40" fill="none" stroke="#9A7020" strokeWidth="1.5" opacity="0.25"/>
        <text x="32" y="31" textAnchor="middle" fontFamily={"'Arial Black',Arial,sans-serif"} fontWeight="900" fontSize="13" fill="#9A7020" letterSpacing="1">RV</text>
        <rect x="12" y="35" width="40" height="1.5" fill="#9A7020" opacity="0.3"/>
        <text x="32" y="45" textAnchor="middle" fontFamily={"'Arial Narrow',Arial,sans-serif"} fontWeight="700" fontSize="6" fill="#9A7020" letterSpacing="1.5">ROGUE VALLEY</text>
        <text x="32" y="54" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="1" fill="#4a5a54">DOOR</text>
      </svg>
    ),

    // ── Dovecreek ── woodgrain texture motif + DC monogram, local sage green
    dovecreek: (
      <svg width={w} height={h} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#F2F7F0"/>
        <path d="M10,22 Q20,18 32,22 Q44,26 54,22" fill="none" stroke="#4A7848" strokeWidth="1" opacity="0.25"/>
        <path d="M10,28 Q20,24 32,28 Q44,32 54,28" fill="none" stroke="#4A7848" strokeWidth="1" opacity="0.2"/>
        <path d="M10,34 Q20,30 32,34 Q44,38 54,34" fill="none" stroke="#4A7848" strokeWidth="1" opacity="0.15"/>
        <text x="32" y="32" textAnchor="middle" fontFamily={"Georgia,'Times New Roman',serif"} fontWeight="700" fontSize="11" fill="#4A7848" letterSpacing="1">DC</text>
        <rect x="12" y="36" width="40" height="1.2" fill="#4A7848" opacity="0.3"/>
        <text x="32" y="46" textAnchor="middle" fontFamily={"Georgia,'Times New Roman',serif"} fontWeight="400" fontSize="6.5" fill="#4A7848" letterSpacing="1">DOVECREEK</text>
        <text x="32" y="55" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="0.5" fill="#4a5a54">SAN DIEGO</text>
      </svg>
    ),

    // ── WinDor Systems ── budget vinyl big doors, window-and-door icon, sage green
    windor: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"4px 6px"}}>
        <img src="/windor-logo.png" alt="WinDor" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── Fleetwood ── ultra-slim horizontal bars + wordmark, ember/terracotta
    fleetwood: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:T.card,display:"flex",alignItems:"center",justifyContent:"center",padding:"4px 8px"}}>
        <img src="/fleetwood-logo.png" alt="Fleetwood" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── Steel Traditions ── industrial grid motif + wordmark, deep slate
    steeltraditions: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"4px 8px"}}>
        <img src="/steeltraditions-logo.png" alt="Steel Traditions" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── French Steel ── arched window motif + serif wordmark, deep rust
    frenchsteel: (
      <div style={{width:w,height:h,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"4px 8px"}}>
        <img src="/frenchsteel-logo.png" alt="French Steel" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      </div>
    ),

    // ── Masonite ── bold M mark + clean wordmark
    masonite: (
      <svg width={w} height={h} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        {/* Stylized M */}
        <path d="M14,30 L14,16 L20,24 L26,16 L32,24 L38,16 L38,30" fill="none" stroke="#4A7848" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
        <text x="26" y="43" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="8" fill="#1A2028" letterSpacing="1.5">MASONITE</text>
      </svg>
    ),

    // ── JELD-WEN ── distinctive hyphenated wordmark
    jeldwen_int: (
      <svg width={w} height={h} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <rect x="6" y="16" width="40" height="20" rx="2" fill="#EEF2FA"/>
        <text x="26" y="30" textAnchor="middle" fontFamily={"'Arial Black',Arial,sans-serif"} fontWeight="900" fontSize="10" fill="#3A6898" letterSpacing="0.5">JELD-WEN</text>
        <text x="26" y="45" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0.8" fill="#4a5a54">INTERIOR DOORS</text>
      </svg>
    ),

    // ── VELUX ── iconic red/white V mark + wordmark
    velux: (
      <svg width={w} height={h} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        {/* Red rounded rectangle brand block */}
        <rect x="8" y="9" width="36" height="22" rx="4" fill="#CC1010"/>
        {/* White V shape inside */}
        <path d="M16,14 L26,26 L36,14" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="26" y="42" textAnchor="middle" fontFamily={"'Arial Black',Arial,sans-serif"} fontWeight="900" fontSize="12" fill="#1A2028" letterSpacing="1">VELUX</text>
      </svg>
    ),

    // ── Contractor's Wardrobe ── CW monogram, refined
    contractors_wardrobe: (
      <svg width={w} height={h} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <text x="26" y="28" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic" fontWeight="700" fontSize="20" fill="#9A7020" opacity="0.9">CW</text>
        <rect x="10" y="32" width="32" height="1" fill="#9A7020" opacity="0.3"/>
        <text x="26" y="42" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="0.5" fill="#4a5a54">CONTRACTOR'S</text>
        <text x="26" y="48" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="0.5" fill="#4a5a54">WARDROBE</text>
      </svg>
    ),

    // ── EL&amp;EL Wood Products — wood-grain feel
    elel_closet: (
      <svg width={w} height={h} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        {/* Wood grain lines */}
        <rect x="8" y="14" width="36" height="2" rx="1" fill="#a07040" opacity="0.3"/>
        <rect x="8" y="18" width="36" height="1.5" rx="1" fill="#a07040" opacity="0.2"/>
        <rect x="8" y="21" width="36" height="1" rx="1" fill="#a07040" opacity="0.15"/>
        <text x="26" y="30" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="12" fill="#2A8A80" letterSpacing="1">EL&amp;EL</text>
        <text x="26" y="40" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0.6" fill="#4a5a54">WOOD PRODUCTS</text>
        <text x="26" y="47" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="0.5" fill="#C4CEC8">CLOSET</text>
      </svg>
    ),

    elel_util: (
      <svg width={w} height={h} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <rect x="8" y="14" width="36" height="2" rx="1" fill="#a07040" opacity="0.3"/>
        <rect x="8" y="18" width="36" height="1.5" rx="1" fill="#a07040" opacity="0.2"/>
        <rect x="8" y="21" width="36" height="1" rx="1" fill="#a07040" opacity="0.15"/>
        <text x="26" y="30" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="12" fill="#2A8A80" letterSpacing="1">EL&amp;EL</text>
        <text x="26" y="40" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0.6" fill="#4a5a54">WOOD PRODUCTS</text>
        <text x="26" y="47" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="0.5" fill="#C4CEC8">UTILITY</text>
      </svg>
    ),

    // ── Orepac ── Pacific NW distributor, industrial
    orepac: (
      <svg width={w} height={h} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <rect x="7" y="15" width="38" height="22" rx="3" fill="#FAF0EA"/>
        <text x="26" y="25" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="8" fill="#C87A4A" letterSpacing="2">ORE</text>
        <text x="26" y="34" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="8" fill="#1A2028" letterSpacing="2">PAC</text>
        <text x="26" y="47" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0.8" fill="#4a5a54">BUILDING PRODUCTS</text>
      </svg>
    ),

    // ── ABS American Building Supply ── industrial distributor
    abs: (
      <svg width={w} height={h} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <text x="26" y="28" textAnchor="middle" fontFamily={"'Arial Black',Arial,sans-serif"} fontWeight="900" fontSize="18" fill="#3A6898" letterSpacing="1">ABS</text>
        <rect x="8" y="32" width="36" height="1.5" fill="#3A6898" opacity="0.3"/>
        <text x="26" y="41" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="0.4" fill="#4a5a54">AMERICAN BUILDING</text>
        <text x="26" y="47" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="0.4" fill="#4a5a54">SUPPLY</text>
      </svg>
    ),
  };

  const svg = logos[id];
  if (!svg) {
    // fallback: styled monogram
    return (
      <div style={{width:w,height:h,borderRadius:"8px",background:"#FFFFFF",border:"1px solid #1c2220",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:700,color:"#9A7020",fontFamily:"monospace"}}>
        {id.substring(0,2).toUpperCase()}
      </div>
    );
  }
  return svg;
}

function VendorCard({vendor, favorites, setFavorites}) {
  const [section,setSection]=useState("overview");
  const c=vendor.color||T.gold;
  const fProps={favorites,setFavorites};
  return (
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"12px",overflow:"hidden",borderTop:`3px solid ${c}`}}>
      {vendor.heroImage&&<div style={{width:"100%",height:"180px",overflow:"hidden",position:"relative"}}>
        <img src={vendor.heroImage} alt={vendor.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}}/>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(to bottom, transparent 70%, ${T.card}88 100%)`}}/>
      </div>}
      <div style={{padding:"18px 22px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px",flexWrap:"wrap",gap:"8px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <VendorLogo id={vendor.id} size={72} wide={true}/>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"7px"}}>
                <div style={{fontSize:"17px",fontWeight:500,color:T.text}}>{vendor.name}</div>
                {vendor.website&&<a href={vendor.website} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:"9px",fontFamily:"monospace",color:T.teal,textDecoration:"none",opacity:0.7,letterSpacing:"1px",border:`1px solid ${T.teal}44`,borderRadius:"3px",padding:"1px 5px",lineHeight:"14px"}}>{"↗ SITE"}</a>}
              </div>
              <div style={{fontSize:"11px",fontStyle:"italic",color:"#555555"}}>{vendor.tagline}</div>
              {vendor.sells&&vendor.sells.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginTop:"5px"}}>
                {vendor.sells.map(tag=>(
                  <span key={tag} style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:"0.5px",color:T.dim,background:"transparent",border:`1px solid ${T.border}`,borderRadius:"10px",padding:"2px 7px"}}>{tag}</span>
                ))}
              </div>}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
            <Pill label={vendor.tier} color={vendor.tierColor||c}/>
            {favorites&&<AddToFavBtn vendorName={vendor.name} productName={null} color={c} {...fProps}/>}
          </div>
        </div>
        <div style={{display:"flex",gap:0,borderBottom:`1px solid ${T.border}`,flexWrap:"wrap"}}>
          {(()=>{
            const hasBrochures = (vendor.productLines||[]).some(l=>l.brochureUrl);
            const tabs = ["overview","products","finishes","fit",...(hasBrochures?["brochures"]:[])];
            return tabs.map(t=>(
              <button key={t} onClick={()=>setSection(t)} style={{background:"none",border:"none",borderBottom:`2px solid ${section===t?c:"transparent"}`,color:section===t?T.text:T.dim,padding:"10px 13px",cursor:"pointer",fontSize:"9px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"monospace"}}>
                {t}
              </button>
            ));
          })()}
        </div>
      </div>
      <div style={{padding:"16px 22px 20px"}}>
        {section==="overview"&&<div>
          <p style={{fontSize:"13px",color:T.muted,lineHeight:1.7,marginTop:0,marginBottom:"14px"}}>{vendor.overview}</p>
          <SectionLabel>ORIGIN</SectionLabel>
          <div style={{fontSize:"12px",color:"#555555",marginBottom:"14px"}}>{vendor.origin}</div>
          {vendor.sdNotes&&<div style={{background:`${c}10`,border:`1px solid ${c}33`,borderRadius:"6px",padding:"11px 14px"}}>
            <SectionLabel color={c}>IN SAN DIEGO</SectionLabel>
            <div style={{fontSize:"12px",color:T.muted,lineHeight:1.6}}>{vendor.sdNotes}</div>
          </div>}
        </div>}
        {section==="products"&&<div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {vendor.productLines.map(l=>(
            <div key={l.name}>
              <ProductLineCard line={l} color={c}/>
              {favorites&&<div style={{marginTop:"4px",textAlign:"right"}}>
                <AddToFavBtn vendorName={vendor.name} productName={l.name} color={c} {...fProps}/>
              </div>}
            </div>
          ))}
        </div>}
        {section==="finishes"&&<div>
          <SectionLabel>FRAME MATERIALS</SectionLabel>
          <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"18px"}}>{vendor.frameMaterials.map(m=><Pill key={m} label={m} color={c}/>)}</div>
          <SectionLabel>FINISHES &amp; COLORS</SectionLabel>
          <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
            {vendor.finishes.map(f=>(
              <div key={f.name} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"}}>
                <div style={{width:"28px",height:"28px",borderRadius:"50%",background:f.swatch,border:`1px solid ${T.faint}`}}/>
                <span style={{fontSize:"8px",color:T.dim,fontFamily:"monospace",maxWidth:"36px",textAlign:"center",lineHeight:1.2}}>{f.name}</span>
              </div>
            ))}
          </div>
        </div>}
        {section==="fit"&&<div>
          <SectionLabel color={c}>IDEAL FOR</SectionLabel>
          <div style={{marginBottom:"14px"}}>{vendor.idealFor.map(f=><div key={f} style={{fontSize:"12px",color:"#606060",marginBottom:"4px"}}>{"\u2713"} {f}</div>)}</div>
          <SectionLabel color={c}>DIFFERENTIATORS</SectionLabel>
          <div style={{marginBottom:"14px"}}>{vendor.differentiators.map(d=><div key={d} style={{fontSize:"12px",color:"#606060",marginBottom:"4px"}}>{"\u2022"} {d}</div>)}</div>
          <SectionLabel color="#C05040">LIMITATIONS</SectionLabel>
          {vendor.limitations.map(l=><div key={l} style={{fontSize:"11px",color:"#8A3A30",marginBottom:"3px"}}>{"\u00B7"} {l}</div>)}
        </div>}
        {section==="brochures"&&<div>
          <SectionLabel color={c}>PRODUCT BROCHURES</SectionLabel>
          <div style={{display:"flex",flexDirection:"column",gap:"10px",marginTop:"8px"}}>
            {(vendor.productLines||[]).filter(l=>l.brochureUrl).map(l=>(
              <a key={l.name} href={l.brochureUrl} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:T.card2,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"13px 16px",textDecoration:"none",transition:"border-color 0.15s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=c}
                onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
                <div>
                  <div style={{fontSize:"13px",color:T.text,fontWeight:500,marginBottom:"2px"}}>{l.name}</div>
                  <div style={{fontSize:"10px",color:T.dim,fontFamily:"monospace",letterSpacing:"0.5px"}}>{l.type}{l.priceRange?` · ${l.priceRange}`:""}</div>
                </div>
                <span style={{fontSize:"10px",fontFamily:"monospace",color:c,letterSpacing:"1px",border:`1px solid ${c}44`,borderRadius:"4px",padding:"4px 10px",flexShrink:0,marginLeft:"12px"}}>{"↓ PDF"}</span>
              </a>
            ))}
          </div>
        </div>}
      </div>
    </div>
  );
}

function DoorTypeCard({door,type}) {
  const [tab,setTab]=useState("overview");
  const c=door.color;
  return (
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"12px",overflow:"hidden",borderTop:`3px solid ${c}`}}>
      <div style={{padding:"18px 22px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px",flexWrap:"wrap",gap:"8px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <span style={{fontSize:"28px"}}>{door.icon}</span>
            <div>
              <div style={{fontSize:"17px",fontWeight:500,color:T.text}}>{door.name}</div>
              <div style={{display:"flex",alignItems:"center",gap:"10px",marginTop:"3px"}}>
                <PriceTag price={door.price} color={c}/>
                <span style={{fontSize:"10px",fontFamily:"monospace",color:T.dim}}>{"\u00B7"}</span>
                <span style={{fontSize:"10px",fontFamily:"monospace",color:T.dim,letterSpacing:"1px"}}>ETA: {door.leadTime}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:0,borderBottom:`1px solid ${T.border}`}}>
          {["overview","specs","fire"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{background:"none",border:"none",borderBottom:`2px solid ${tab===t?c:"transparent"}`,color:tab===t?T.text:T.dim,padding:"10px 13px",cursor:"pointer",fontSize:"9px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"monospace"}}>
              {t==="fire"?" fire":t}
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:"16px 22px 20px"}}>
        {tab==="overview"&&<div>
          <p style={{fontSize:"13px",color:T.text,lineHeight:1.6,marginTop:0,marginBottom:"14px",fontStyle:"italic"}}>{door.blurb}</p>
          {door.bestFor&&<div style={{marginBottom:"14px"}}>
            <SectionLabel>BEST FOR</SectionLabel>
            {door.bestFor.map(b=><div key={b} style={{fontSize:"12px",color:"#606060",marginBottom:"4px"}}>{"\u2192"} {b}</div>)}
          </div>}
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:"12px"}}>
            <div>
              <SectionLabel color={c}>PROS</SectionLabel>
              {door.pros.map(p=><div key={p} style={{fontSize:"12px",color:"#4A7848",marginBottom:"4px"}}>{"\u2713"} {p}</div>)}
            </div>
            <div>
              <SectionLabel color="#C05040">CONS</SectionLabel>
              {door.cons.map(p=><div key={p} style={{fontSize:"12px",color:"#8A3A30",marginBottom:"4px"}}>{"\u00B7"} {p}</div>)}
            </div>
          </div>
        </div>}
        {tab==="specs"&&<div>
          <SectionLabel>VENDORS</SectionLabel>
          <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"16px"}}>{door.vendors.map(v=><Pill key={v} label={v} color={c}/>)}</div>
          {door.finishOptions&&<div style={{marginBottom:"14px"}}>
            <SectionLabel>FINISH OPTIONS</SectionLabel>
            {door.finishOptions.map(f=><div key={f} style={{fontSize:"12px",color:"#606060",marginBottom:"3px"}}>{"\u2022"} {f}</div>)}
          </div>}
          {door.grades&&<div>
            <SectionLabel>AVAILABLE GRADES</SectionLabel>
            {door.grades.map(g=><Pill key={g} label={g} color={c}/>)}
          </div>}
        </div>}
        {tab==="fire"&&<div>
          <div style={{background:"#FEF0EE",border:"1px solid #E87A6A44",borderRadius:"8px",padding:"14px 16px"}}>
            <SectionLabel color="#C05040"> FIRE ZONE NOTES</SectionLabel>
            <p style={{fontSize:"13px",color:"#885858",lineHeight:1.7,margin:0}}>{door.fireNote}</p>
          </div>
          <div style={{marginTop:"14px",background:`${T.gold}10`,border:`1px solid ${T.gold}33`,borderRadius:"6px",padding:"12px 14px"}}>
            <SectionLabel color={T.gold}>NOT SURE IF YOU'RE IN A FIRE ZONE?</SectionLabel>
            <p style={{fontSize:"12px",color:T.muted,lineHeight:1.6,margin:"0 0 8px"}}>Check your property address on the CAL FIRE official address lookup tool.</p>
            <a href="https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones" target="_blank" rel="noopener noreferrer" style={{fontSize:"11px",fontFamily:"monospace",color:T.gold,letterSpacing:"1px"}}>CHECK MY ADDRESS {"\u2192"} osfm.fire.ca.gov</a>
          </div>
        </div>}
      </div>
    </div>
  );
}

function PaintStainGuide() {
  const [active,setActive]=useState("paint");
  const g=paintVsStain[active];
  return (
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"12px",overflow:"hidden",marginBottom:"20px"}}>
      <div style={{padding:"18px 22px 0"}}>
        <div style={{fontSize:"9px",letterSpacing:"4px",color:T.dim,marginBottom:"6px",fontFamily:"monospace"}}>IMPORTANT {"\u2014"} INTERIOR DOORS</div>
        <div style={{fontSize:"17px",fontWeight:400,marginBottom:"12px",color:T.text}}>Paint Grade vs. <em style={{color:T.gold}}>Stain Grade</em></div>
        <div style={{display:"flex",gap:0,borderBottom:`1px solid ${T.border}`}}>
          {["paint","stain"].map(t=>(
            <button key={t} onClick={()=>setActive(t)} style={{background:"none",border:"none",borderBottom:`2px solid ${active===t?paintVsStain[t].color:"transparent"}`,color:active===t?T.text:T.dim,padding:"7px 16px",cursor:"pointer",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"monospace"}}>
              {paintVsStain[t].label}
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:"16px 22px 18px"}}>
        <p style={{fontSize:"13px",color:T.muted,lineHeight:1.75,marginTop:0,marginBottom:"14px"}}>{g.blurb}</p>
        <SectionLabel color={g.color}>CHOOSE THIS WHEN</SectionLabel>
        {g.when.map(w=><div key={w} style={{fontSize:"12px",color:"#606060",marginBottom:"4px"}}>{"\u2192"} {w}</div>)}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GLASS GUIDE DATA
// ═══════════════════════════════════════════════════════════════════════════════
const glassGuide = [
  {
    id:"title24", name:"Title 24 Energy Compliance", icon:"★", color:"#3A6898",
    tagline:"California's mandatory energy code — required on all permitted window & door replacements.",
    overview:"Title 24 is California's energy standard governing all permitted window and door replacements. The 2026 standards require U-0.30 or better and SHGC 0.23 or less for most San Diego projects.",
    iterations:[
      {name:"U-Factor",detail:"Measures heat transfer through the whole window. Lower = better insulation. Requirement: U-0.30 or better for most SD replacements.",icon:""},
      {name:"SHGC",detail:"Solar Heat Gain Coefficient — how much solar heat passes through. Requirement: 0.23 or less for west/south-facing windows in SD.",icon:""},
      {name:"Climate Zone 7 — Coastal SD",detail:"La Jolla, Del Mar, Encinitas, Coronado, Chula Vista. U-0.30, SHGC 0.23. Most premium windows qualify.",icon:""},
      {name:"Climate Zone 10 — Inland SD",detail:"El Cajon, Santee, Escondido, Poway, Lakeside. Stricter SHGC requirements — more careful product selection needed.",icon:""},
      {name:"NFRC Label",detail:"Certifies rated U-factor and SHGC. The inspector checks this. Every window on a permitted project must have a current NFRC label.",icon:""},
    ],
    whenRequired:[
      {location:"Any permitted window replacement",detail:"If you pull a permit, Title 24 compliance is required — no exceptions."},
      {location:"Additions and ADUs",detail:"All windows in new permitted additions must meet current standards."},
      {location:"Exterior doors with glass",detail:"Sidelites, transoms, and glass-panel doors are subject to Title 24."},
    ],
    sdNote:"SD spans Climate Zones 7 (coastal) and 10 (inland). All major brands offer compliant products — confirm the NFRC values match your zone before ordering.",
    priceImpact:"Compliant windows are not significantly more expensive. Non-compliance means failed inspection and required replacement — always confirm documentation before ordering.",
  },
  {
    id:"tempered", name:"Tempered Safety Glass", icon:"⚠", color:"#C04020",
    tagline:"Code-required in hazardous locations. Breaks into safe granules.",
    overview:"Tempered glass is ~4× stronger than standard glass and shatters into small rounded pieces instead of sharp shards. Required by code in specific locations — not optional.",
    whenRequired:[
      {location:"Within 24\" of a door",detail:"Any glazing within 24\" of a door's edge must be tempered."},
      {location:"Within 18\" of the floor",detail:"Glass starting within 18\" of the floor and over 9 sq ft must be tempered."},
      {location:"Showers & tubs",detail:"All glass in or adjacent to wet areas must be tempered or laminated."},
      {location:"Pool / spa within 5ft",detail:"All glazing within 5 feet of pool or spa edge."},
      {location:"Skylights",detail:"All skylights require tempered or laminated — laminated preferred as it stays in place."},
      {location:"Fire zones (WUI)",detail:"Fire-rated glazing required in FHSZ zones."},
    ],
    temperedVsLaminated:"Tempered shatters into granules and falls. Laminated cracks but stays in the frame. Laminated is preferred for skylights and anywhere falling glass is a concern.",
    sdNote:"Most common SD triggers: door sidelites, poolside windows, fire zone properties. Your specialist will flag every required location.",
    priceImpact:"Adds ~10–25% to glass cost depending on size. Always factor in for poolside, shower-adjacent, and fire zone windows.",
  },
  {
    id:"lowe", name:"Low-E Glass", icon:"☉", color:"#2A8A80",
    tagline:"Industry standard for energy efficiency. Required by Title 24.",
    overview:"Microscopically thin metallic coating that reflects heat while letting light through. Required on virtually all new and replacement windows in California.",
    iterations:[
      {name:"LoE-272®",detail:"Blocks 72% of solar heat, transmits 72% visible light. Reliable all-around performer — standard on Andersen, Milgard, and most premium brands.",icon:"2"},
      {name:"LoE-366®",detail:"Blocks 95% of UV, 66% of solar heat. Best for west and south-facing windows. Standard on Marvin Signature and Andersen E-Series — the most specified coating for SD coastal projects.",icon:"3"},
      {name:"Solarban / Sunbelt",detail:"Engineered for hot sunny climates. Maximum solar rejection. Common in NanaWall and LaCantina large glass wall systems.",icon:""},
      {name:"i89 Interior Coating",detail:"Applied to the interior glass surface — improves insulating U-factor without affecting SHGC. Most useful for nighttime and winter conditions. Available on Andersen and Marvin.",icon:"89"},
    ],
    sdNote:"Prioritize blocking solar heat (SHGC) over retaining interior heat. LoE-366 on south and west-facing windows makes a meaningful difference in cooling bills.",
    priceImpact:"Standard Low-E included in virtually all premium pricing. Upgraded coatings add $5–15 per sq ft.",
  },
  {
    id:"argon", name:"Argon & Krypton Gas Fill", icon:"⬡", color:"#3A6898",
    tagline:"Dense gas between panes slows heat transfer. Standard on premium IGUs.",
    overview:"Argon and krypton are inert gases denser than air — they slow heat conduction across the gap between panes, improving insulation. Standard on all premium windows.",
    iterations:[
      {name:"Air-filled",detail:"Standard air between panes. Least efficient. Mostly entry-level products.",icon:"○"},
      {name:"Argon-filled",detail:"34% less thermally conductive than air. Standard on Milgard, Andersen, Marvin, LaCantina. No maintenance required for the life of the window.",icon:"Ar"},
      {name:"Krypton-filled",detail:"Denser than argon. Used in triple-pane and slim-profile IGUs where the gap is too narrow for argon. More expensive.",icon:"Kr"},
      {name:"Triple-Pane",detail:"Three panes, two gaps. R-5 to R-8. Best insulation — but rarely cost-justified in SD's mild climate. Mostly for Julian/mountain homes.",icon:"|||"},
    ],
    sdNote:"Argon double-pane is right for almost every SD project. Triple-pane ROI is poor in SD's mild climate — focus budget on Low-E coating quality instead.",
    priceImpact:"Argon adds ~$3–8 per sq ft vs. air-fill. Included as standard in most premium window pricing.",
  },
  {
    id:"glazing_layers", name:"Single, Dual & Triple Pane", icon:"◫", color:"#A8B8C8",
    tagline:"The foundation of every window's thermal performance.",
    overview:"Single pane doesn't meet Title 24 and is never specified on new work. Double-pane argon Low-E is the right call for almost all SD projects. Triple-pane makes sense for mountain properties and serious noise situations.",
    iterations:[
      {name:"Single Pane",detail:"R-1. Does not meet Title 24. Found in pre-1980s homes — upgrade to double-pane delivers dramatic comfort improvement.",icon:"1"},
      {name:"Double Pane (Standard)",detail:"R-2 to R-3.5. Industry standard since the 1990s. Double-pane + argon + LoE-366 is the correct spec for the vast majority of SD projects.",icon:"2"},
      {name:"Triple Pane",detail:"R-4.5 to R-8. 30–60% cost premium over double-pane. Poor ROI in SD's mild climate. Best for Julian/mountain properties, severe noise situations, or ultra-premium builds.",icon:"3"},
    ],
    whenRequired:[
      {location:"All permitted replacements",detail:"Single-pane does not meet Title 24. Double-pane minimum required."},
      {location:"High-elevation (Julian, Pine Valley)",detail:"Triple-pane is cost-justified — real heating season."},
      {location:"Airport/freeway noise",detail:"Triple-pane laminated gives best sound attenuation for flight path and freeway homes."},
    ],
    sdNote:"Double-pane argon LoE-366 is right for 95% of SD projects. Reserve triple-pane for mountain homes or serious noise situations.",
    priceImpact:"Double-pane included in all premium pricing. Triple-pane adds 30–60% to glass cost — confirm the value case before specifying.",
  },
  {
    id:"obscure", name:"Obscure Glass", icon:"▨", color:"#6A8898",
    tagline:"Privacy without losing light. Dozens of patterns for every aesthetic.",
    overview:"Transmits light but distorts the view — used in bathrooms, sidelites, showers, and anywhere privacy is needed without blocking light.",
    iterations:[
      {name:"Frosted / Acid-Etched",detail:"Smooth, uniform milky diffusion. Most popular obscure glass — showers, bathroom windows, sidelites.",icon:"▨"},
      {name:"Reeded / Ribbed",detail:"Parallel vertical lines. Classic craftsman and transitional look. Can see movement but not detail.",icon:"|||"},
      {name:"Flemish / Antique",detail:"Subtle irregular texture, slightly wavy — warm period character. Traditional entries and sidelites.",icon:"〰"},
      {name:"Rain Glass",detail:"Vertical streaks mimicking rain. Popular in contemporary and transitional interiors. Common in showers and bathroom windows.",icon:""},
      {name:"Seeded Glass",detail:"Small air bubbles — mimics antique glass. Warm artisanal character. Popular in Mediterranean and Spanish Colonial interiors.",icon:"◦"},
    ],
    sdNote:"Most common in SD: Rain glass for contemporary bathrooms, Frosted for street-facing sidelites, Seeded/Flemish for Mediterranean entries in Coronado and La Jolla.",
    priceImpact:"Adds 15–40% to glass cost. Standard patterns (frosted, rain) are widely available and modestly priced.",
  },
  {
    id:"art_glass", name:"Art Glass & Decorative Glass", icon:"⚜", color:"#6848A0",
    tagline:"Leaded, beveled, stained, and cast glass for entry doors.",
    overview:"Decorative glass used in entry doors, sidelites, and transoms. Primarily an aesthetic choice — adds character, light patterns, and uniqueness to a front entry.",
    iterations:[
      {name:"Beveled Glass",detail:"Polished angled edges that scatter light into rainbow patterns. Timeless — common in traditional entry doors. No color.",icon:"◇"},
      {name:"Leaded Glass",detail:"Individual glass pieces held by lead came. Traditional and craftsman character — combines clear, textured, and colored panes.",icon:"⊞"},
      {name:"Stained Glass",detail:"Custom colored panels, copper-foil or lead came. Handcrafted art pieces for historic renovations and luxury entries.",icon:""},
      {name:"Cast Glass",detail:"Poured into a mold — 3D texture and depth. Sculptural, organic character. Custom luxury entry inserts.",icon:""},
      {name:"Etched / Sandblasted",detail:"Custom designs sandblasted onto clear glass. Any pattern, one-of-a-kind. Common in luxury entries and interior partitions.",icon:""},
    ],
    sdNote:"TM Cobb and Therma-Tru offer the widest art glass selections through SD dealers. Beveled and leaded panels dominate La Jolla and Del Mar traditional entries. Etched glass is common in RSF contemporary builds.",
    priceImpact:"Beveled clusters: $200–$800. Custom leaded/etched: $1,000–$5,000+. Cast glass: $3,000–$10,000+ depending on size.",
  },
  {
    id:"tinted", name:"Tinted Glass", icon:"◑", color:"#9A7020",
    tagline:"Color baked into the glass. Reduces solar heat and glare.",
    overview:"Color added during manufacturing runs through the full glass thickness. Reduces light and solar heat gain. Often combined with Low-E for maximum performance.",
    iterations:[
      {name:"Grey",detail:"Most neutral tint. Reduces glare without changing color rendering. Common in contemporary residential and commercial.",icon:"◑"},
      {name:"Bronze",detail:"Warm amber-brown. Traditional character. Common in 1980s–2000s construction — popular for matching existing glass.",icon:""},
      {name:"Green",detail:"Slightly green cast — most neutral to the eye. Good solar heat rejection. Common in hot climates.",icon:""},
      {name:"Blue",detail:"Cool blue cast. Contemporary character. Popular in modern commercial applications.",icon:""},
    ],
    sdNote:"Grey and bronze are most common in SD residential. Note: clear Low-E usually outperforms tinted glass on energy efficiency while maintaining a clearer view.",
    priceImpact:"Standard tints add ~10–20% to glass cost. Confirm with your specialist whether Low-E alone meets your performance goals before adding tint.",
  },
  {
    id:"acoustic", name:"Acoustic & STC-Rated Glass", icon:"⦻", color:"#8A7AB8",
    tagline:"Block traffic, aircraft, and rail noise. STC ratings explained.",
    overview:"Acoustic glass reduces sound transmission through asymmetric glass thickness and/or laminated interlayers. In SD, one of the highest-ROI glass upgrades available — significant freeway and flight path noise affects tens of thousands of homes.",
    iterations:[
      {name:"STC Rating",detail:"Sound Transmission Class — higher = more blocked. Standard double-pane: STC 26–32. Acoustic window: STC 38–50. Every 10 STC points roughly halves perceived loudness.",icon:""},
      {name:"Asymmetric Glass Thickness",detail:"Using different pane thicknesses (e.g. 4mm + 6mm) breaks resonance between panes — meaningful STC gain at minimal cost. Best entry-level acoustic spec.",icon:"⊟"},
      {name:"Acoustic Laminated",detail:"Laminated glass with acoustic PVB interlayer absorbs sound vibration. Adds ~5–8 STC points over non-laminated. Highest single-pane performance.",icon:""},
      {name:"Wide Air Gap",detail:"Widening the gap to 25mm+ improves low-frequency isolation (traffic rumble, aircraft). Secondary to laminated glass.",icon:"↔"},
    ],
    whenRequired:[
      {location:"Within 1/4 mile of I-5, I-15, I-805, SR-52, SR-163",detail:"Homes near major SD freeways benefit meaningfully from acoustic laminated glass."},
      {location:"Under Miramar, Lindbergh, North Island flight paths",detail:"Acoustic laminated with wide gap. Triple-pane acoustic for homes directly under approach paths."},
      {location:"Within 500ft of rail (Coaster, Trolley, BNSF)",detail:"Acoustic laminated with asymmetric thickness — best choice for trackside properties."},
    ],
    temperedVsLaminated:"For acoustic performance, always use laminated — not tempered. Laminated absorbs sound; tempered transmits it. Acoustic laminated meets safety glazing code AND performs acoustically.",
    sdNote:"Ask every client near a freeway or flight path: 'Is noise ever a problem with windows closed?' The answer is usually yes. Acoustic glass adds $8–15/sqft — the comfort improvement is immediate and clients never regret it.",
    priceImpact:"Acoustic laminated adds ~$8–18 per sq ft vs. standard double-pane. For a targeted upgrade on street-facing windows only, total cost is modest.",
  },
  {
    id:"laminated", name:"Laminated Glass", icon:"⧉", color:"#4A7878",
    tagline:"Bonded panes stay together when broken. Skylights, security, acoustic.",
    overview:"Two panes bonded by a PVB interlayer — glass cracks but stays in the frame rather than falling. Preferred for skylights, hurricane zones, security, and acoustic applications.",
    iterations:[
      {name:"Standard PVB Laminated",detail:"Clear PVB interlayer. Glass holds in place when broken. Standard for skylights and hurricane-impact windows.",icon:"⧉"},
      {name:"Acoustic Laminated",detail:"Acoustic-grade PVB absorbs sound vibration. STC 38–50. Best for SD homes near freeways, flight paths, and rail.",icon:""},
      {name:"Hurricane / Impact",detail:"Heavy-duty laminated for high-wind debris. Not required in SD but common in exposed coastal locations for security.",icon:""},
      {name:"Security Laminated",detail:"Multi-layer laminated resists forced entry — defeats smash-and-grab. For high-value properties.",icon:""},
      {name:"Fire-Rated Laminated",detail:"Certified fire-rating for WUI fire zones, commercial fire walls, and stairway enclosures.",icon:""},
    ],
    sdNote:"Acoustic laminated is a strong upsell for any home near Hwy 5, 15, 163, 52, or under SD flight paths. Ask the client about noise — it's often a problem, and laminated makes a real difference.",
    priceImpact:"Standard laminated adds ~20–35% to glass cost. Acoustic laminated adds 30–50%. A targeted upgrade on noisy elevations only is a fraction of a full-house premium.",
  },
];


// ═══════════════════════════════════════════════════════════════════════════════
// GLASS GUIDE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
function GlassGuideTab() {
  const [activeGlass, setActiveGlass] = useState("tempered");
  const [activeIter, setActiveIter] = useState(null);
  const g = glassGuide.find(x=>x.id===activeGlass)||glassGuide[0];
  return (
    <div className="sidebar-layout">
      {/* Left nav */}
      <div className="sidebar-nav">
        <div style={{fontSize:"9px",letterSpacing:"3px",color:T.faint,fontFamily:"monospace",padding:"12px 16px",whiteSpace:"nowrap"}} className="sidebar-label">GLASS TYPES</div>
        {glassGuide.map(glass=>(
          <button key={glass.id} onClick={()=>{setActiveGlass(glass.id);setActiveIter(null);}} style={{display:"block",width:"100%",textAlign:"left",background:activeGlass===glass.id?`${glass.color}12`:"none",border:"none",borderLeft:`3px solid ${activeGlass===glass.id?glass.color:"transparent"}`,padding:"12px 16px",cursor:"pointer",transition:"all 0.15s"}}>
            <div className="sidebar-icon" style={{fontSize:"20px",marginBottom:"4px"}}>{glass.icon}</div>
            <div className="sidebar-label" style={{fontSize:"11px",color:activeGlass===glass.id?glass.color:T.dim,lineHeight:1.3,letterSpacing:"0.5px"}}>{glass.name}</div>
          </button>
        ))}
      </div>
      {/* Main content */}
      <div className="sidebar-content" key={activeGlass}>
        {/* Header */}
        <div style={{background:`${g.color}0e`,border:`1px solid ${g.color}33`,borderRadius:"12px",padding:"22px 26px",marginBottom:"20px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",right:"-10px",top:"-10px",fontSize:"100px",opacity:0.04,color:g.color,lineHeight:1}}>{g.icon}</div>
          <div style={{fontSize:"9px",letterSpacing:"4px",color:g.color,fontFamily:"monospace",marginBottom:"6px"}}>GLASS GUIDE</div>
          <div style={{fontSize:"22px",fontWeight:400,color:T.text,marginBottom:"4px"}}>{g.name}</div>
          <div style={{fontSize:"13px",fontStyle:"italic",color:g.color,marginBottom:"12px"}}>{g.tagline}</div>
          <p style={{margin:0,fontSize:"13px",color:T.muted,lineHeight:1.75,maxWidth:"680px"}}>{g.overview}</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(440px,100%),1fr))",gap:"14px"}}>
          {/* Iterations / types */}
          {g.iterations&&<div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"18px 22px"}}>
            <SectionLabel color={g.color}>TYPES &amp; VARIATIONS</SectionLabel>
            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              {g.iterations.map(it=>(
                <div key={it.name} onClick={()=>setActiveIter(activeIter===it.name?null:it.name)} style={{background:activeIter===it.name?`${g.color}0e`:T.card2,border:`1px solid ${activeIter===it.name?g.color+"55":T.border}`,borderRadius:"8px",padding:"13px 15px",cursor:"pointer",transition:"all 0.15s"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom: activeIter===it.name?"8px":"0"}}>
                    <div style={{width:"28px",height:"28px",borderRadius:"6px",background:`${g.color}18`,border:`1px solid ${g.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",color:g.color,fontFamily:"monospace",flexShrink:0}}>{it.icon}</div>
                    <div style={{fontSize:"13px",color:activeIter===it.name?T.text:"#bbb",fontWeight:activeIter===it.name?500:400,flex:1}}>{it.name}</div>
                    <span style={{color:T.faint,fontSize:"9px"}}>{activeIter===it.name?"▲":"▼"}</span>
                  </div>
                  {activeIter===it.name&&<div style={{fontSize:"12px",color:T.muted,lineHeight:1.7,paddingLeft:"38px"}}>{it.detail}</div>}
                </div>
              ))}
            </div>
          </div>}
          {/* When required (tempered) */}
          {g.whenRequired&&<div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"18px 22px"}}>
            <SectionLabel color={g.color}>WHEN IT'S REQUIRED BY CODE</SectionLabel>
            {g.whenRequired.map(r=>(
              <div key={r.location} style={{background:T.card2,borderRadius:"7px",padding:"12px 14px",marginBottom:"8px",borderLeft:`3px solid ${g.color}55`}}>
                <div style={{fontSize:"12px",fontWeight:500,color:"#484848",marginBottom:"4px"}}>{r.location}</div>
                <div style={{fontSize:"11px",color:T.dim,lineHeight:1.5}}>{r.detail}</div>
              </div>
            ))}
            {g.temperedVsLaminated&&<div style={{background:`${g.color}10`,border:`1px solid ${g.color}33`,borderRadius:"7px",padding:"13px 15px",marginTop:"12px"}}>
              <SectionLabel color={g.color}>TEMPERED VS. LAMINATED</SectionLabel>
              <p style={{margin:0,fontSize:"12px",color:T.muted,lineHeight:1.7}}>{g.temperedVsLaminated}</p>
            </div>}
          </div>}
          {/* SD note + price */}
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"18px 22px"}}>
            <div style={{background:"#F0F5F2",border:`1px solid ${T.gold}33`,borderRadius:"7px",padding:"13px 15px",marginBottom:"14px"}}>
              <SectionLabel color={T.gold}>SAN DIEGO NOTES</SectionLabel>
              <p style={{margin:0,fontSize:"12px",color:T.muted,lineHeight:1.7}}>{g.sdNote}</p>
            </div>
            <div style={{background:`${g.color}10`,border:`1px solid ${g.color}33`,borderRadius:"7px",padding:"13px 15px"}}>
              <SectionLabel color={g.color}>PRICE IMPACT</SectionLabel>
              <p style={{margin:0,fontSize:"12px",color:T.muted,lineHeight:1.7}}>{g.priceImpact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAVORITES / QUOTE CART SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════
const SIZE_PRESETS = ["Custom","Up to 4ft wide","4–6ft wide","6–8ft wide","8–12ft wide","12–16ft wide","16–20ft wide","20ft+ / Full wall","Not sure yet"];
const QTY_OPTS = [1,2,3,4,5,6,8,10,"Custom qty"];

function AddToFavBtn({vendorName, productName, color, favorites, setFavorites}) {
  const key = productName ? `${vendorName}||${productName}` : vendorName;
  const isAdded = favorites.some(f=>f.key===key);
  const handleAdd = e => {
    e.stopPropagation();
    if(isAdded) {
      setFavorites(p=>p.filter(f=>f.key!==key));
    } else {
      setFavorites(p=>[...p,{
        key, vendorName,
        productName: productName||null,
        qty: 1,
        customQty: "",
        size: "Custom",
        customSize: "",
        location: "",
        notes: "",
        id: Date.now()+Math.random()
      }]);
    }
  };
  return (
    <button onClick={handleAdd}
      style={{
        background: isAdded ? color : T.card,
        border: `2px solid ${isAdded ? color : "#C8D0CC"}`,
        color: isAdded ? "#fff" : T.dim,
        padding:"6px 14px",
        borderRadius:"6px",
        cursor:"pointer",
        fontSize:"10px",
        letterSpacing:"0.5px",
        fontFamily:"monospace",
        fontWeight:600,
        transition:"all 0.18s",
        whiteSpace:"nowrap",
        display:"inline-flex",
        alignItems:"center",
        gap:"6px",
        boxShadow: isAdded ? `0 2px 6px ${color}44` : "0 1px 3px rgba(0,0,0,0.08)"
      }}>
      {isAdded ? "✓ IN QUOTE LIST" : "+ ADD TO QUOTE LIST"}
    </button>
  );
}

function CartItemRow({f, setFavorites}) {
  const update = (field, val) => setFavorites(p=>p.map(x=>x.id===f.id?{...x,[field]:val}:x));
  const inpStyle = {background:T.card2,border:`1px solid ${T.border}`,color:T.text,padding:"6px 9px",borderRadius:"5px",fontSize:"11px",outline:"none",fontFamily:"inherit",width:"100%"};
  const labelStyle = {fontSize:"8px",letterSpacing:"2px",color:T.faint,fontFamily:"monospace",marginBottom:"4px",display:"block"};
  return (
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"10px",overflow:"hidden",marginBottom:"8px"}}>
      {/* Header row */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 15px 10px",borderBottom:`1px solid ${T.border}`,gap:"8px",flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:"13px",color:T.text,fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{f.vendorName}</div>
          {f.productName&&<div style={{fontSize:"11px",color:T.dim,marginTop:"1px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{f.productName}</div>}
        </div>
        <button onClick={()=>setFavorites(p=>p.filter(x=>x.id!==f.id))} style={{background:"none",border:"none",color:"#8A3A30",cursor:"pointer",fontSize:"16px",padding:"0 2px",lineHeight:1,flexShrink:0}}>{"\u2715"}</button>
      </div>
      {/* Cart fields */}
      <div style={{padding:"12px 15px 14px",display:"grid",gridTemplateColumns:"80px 1fr 1fr",gap:"10px",alignItems:"start"}}>
        {/* Quantity */}
        <div>
          <span style={labelStyle}>QTY / COUNT</span>
          <select value={f.qty} onChange={e=>update("qty",e.target.value)} style={{...inpStyle,cursor:"pointer"}}>
            {QTY_OPTS.map(q=><option key={q} value={q}>{q}</option>)}
          </select>
          {f.qty==="Custom qty"&&(
            <input type="number" min="1" placeholder="Enter qty" value={f.customQty} onChange={e=>update("customQty",e.target.value)} style={{...inpStyle,marginTop:"5px"}}/>
          )}
        </div>
        {/* Rough size */}
        <div>
          <span style={labelStyle}>ROUGH SIZE / WIDTH</span>
          <select value={f.size} onChange={e=>update("size",e.target.value)} style={{...inpStyle,cursor:"pointer"}}>
            {SIZE_PRESETS.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
          {f.size==="Custom"&&(
            <input type="text" placeholder='e.g. "10ft wide × 9ft tall"' value={f.customSize} onChange={e=>update("customSize",e.target.value)} style={{...inpStyle,marginTop:"5px"}}/>
          )}
        </div>
        {/* Location in home */}
        <div>
          <span style={labelStyle}>LOCATION IN HOME</span>
          <input type="text" placeholder='e.g. "Living room west wall"' value={f.location} onChange={e=>update("location",e.target.value)} style={inpStyle}/>
        </div>
      </div>
      {/* Notes */}
      <div style={{padding:"0 15px 14px"}}>
        <span style={labelStyle}>NOTES / QUESTIONS (finish preference, glass type, concerns{"\u2026"})</span>
        <textarea placeholder="Any specifics your specialist should know about this item…" value={f.notes} onChange={e=>update("notes",e.target.value)} rows={2} style={{...inpStyle,resize:"vertical"}}/>
      </div>
    </div>
  );
}

function FavoritesPanel({favorites, setFavorites}) {
  if(favorites.length===0) return (
    <div style={{background:T.card2,border:`2px dashed ${T.border}`,borderRadius:"10px",padding:"28px",textAlign:"center"}}>
      <div style={{fontSize:"28px",opacity:.25,marginBottom:"10px"}}>{"\u2606"}</div>
      <div style={{fontSize:"11px",color:T.faint,fontFamily:"monospace",letterSpacing:"2px",marginBottom:"6px"}}>YOUR QUOTE LIST IS EMPTY</div>
      <div style={{fontSize:"12px",color:"#C4CEC8",lineHeight:1.6}}>Browse vendors, door types, and door systems<br/>then click <strong style={{color:"#3a4838"}}>{"\u2606"} Add to Quote List</strong> on anything that interests you.</div>
    </div>
  );
  return (
    <div>
      {favorites.map(f=><CartItemRow key={f.id} f={f} setFavorites={setFavorites}/>)}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
const sectionColors = {"About You":T.teal,"Your Project":T.gold,"Property Details":T.ember,"Installation Type":T.teal,"Your Home's Exterior":T.sage,"Existing Windows":T.rust,"Your Vision":T.plum,"Frame Material":T.slate,"Door System":T.rust,"Budget":T.sage,"Priorities":T.gold,"Timeline":T.teal,"Contact":T.gold};

export default function App() {
  const [mainTab,setMainTab]=useState("quiz");
  // quiz state
  const allQs=buildQuestions();
  const [answers,setAnswers]=useState({});
  const [step,setStep]=useState(0);
  const [selOpt,setSelOpt]=useState(null);
  const [contact,setContact]=useState({name:"",phone:"",email:"",zip:"",notes:""});
  const [photos,setPhotos]=useState([]);
  const [scheduleFiles,setScheduleFiles]=useState([]);
  const [submitted,setSubmitted]=useState(false);
  const [submitting,setSubmitting]=useState(false);
  const [submitError,setSubmitError]=useState(false);
  // favorites state
  const [favorites,setFavorites]=useState([]);
  // vendor catalog state
  const [vendorCat,setVendorCat]=useState("windows_doors");
  const [tierFilter,setTierFilter]=useState("all");
  const [materialFilter,setMaterialFilter]=useState("all");
  // door type state
  const [doorTypeTab,setDoorTypeTab]=useState("operation");
  const [openOp,setOpenOp]=useState(null);
  const [largeDoorSub,setLargeDoorSub]=useState("folding");
  const [windowSub,setWindowSub]=useState("frame_materials");
  // hardware state
  const [selFinish,setSelFinish]=useState(null);
  const [hwOpen,setHwOpen]=useState(null);
  // ref for photo input
  const photoRef = { current: null };

  const activeQs=allQs.filter(q=>!q.condition||q.condition(answers));
  const totalSteps=activeQs.length;
  const currentQ=step>0?activeQs[step-1]:null;
  const progress=step===0?0:Math.round(((step-1)/(totalSteps-1))*100);
  const recs=submitted?scoreVendors(answers):[];
  const sColor=currentQ?(sectionColors[currentQ.section]||T.gold):T.gold;

  const handleNext=()=>{
    if(currentQ&&!currentQ.isContact){
      if(currentQ.isMultiSelect){
        if(!selOpt||selOpt.length===0)return;
        setAnswers(p=>({...p,[currentQ.id]:selOpt}));
      } else {
        if(!selOpt)return;
        setAnswers(p=>({...p,[currentQ.id]:selOpt}));
      }
      setSelOpt(null);
    }
    if(step<totalSteps)setStep(s=>s+1);
    else{
      setSubmitting(true);
      setSubmitError(false);
      const labelMap={};
      allQs.forEach(q=>{if(q.options)q.options.forEach(o=>{labelMap[`${q.id}::${o.value}`]=o.label;});});
      const answerSummary=Object.entries(answers).map(([k,v])=>{
        const q=allQs.find(q=>q.id===k);
        const label=q?.question||k;
        const val=Array.isArray(v)?v.map(vi=>labelMap[`${k}::${vi}`]||vi).join(", "):(labelMap[`${k}::${v}`]||v);
        return `${label}: ${val}`;
      }).join("\n");
      const recs=scoreVendors(answers);
      const topRecs=recs.slice(0,3).map((r,i)=>`#${i+1}: ${r.brand.name} (${r.brand.tier}) — ${r.brand.tagline}`).join("\n");
      fetch("https://formspree.io/f/mzdkbjdn",{
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify({name:contact.name,email:contact.email,phone:contact.phone,zip:contact.zip,notes:contact.notes||"",top_recommendations:topRecs,quiz_answers:answerSummary})
      })
      .then(r=>r.json())
      .then(data=>{setSubmitting(false);if(data.ok||data.next){setSubmitted(true);setMainTab("results");}else{setSubmitError(true);}})
      .catch(()=>{setSubmitting(false);setSubmitError(true);});
    }
  };
  const handleBack=()=>{
    if(step>1){const prevQ=activeQs[step-2];setStep(s=>s-1);setSelOpt(answers[prevQ?.id]||null);}
    else{setStep(0);setSelOpt(null);}
  };
  const restart=()=>{setStep(0);setAnswers({});setContact({name:"",phone:"",email:"",zip:"",notes:""});setSelOpt(null);setSubmitted(false);setPhotos([]);setScheduleFiles([]);setMainTab("quiz");};

  const mainTabs=[
    {id:"quiz",label:"Find My Fit",icon:"◈"},
    {id:"vendors",label:"Vendors",icon:"",svgIcon:<><rect x="1" y="1" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/><rect x="9" y="1" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/><rect x="1" y="9" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/><rect x="9" y="9" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/><line x1="3" y1="4" x2="5" y2="4" stroke="currentColor" strokeWidth="0.8"/><line x1="11" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth="0.8"/><line x1="3" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="0.8"/><line x1="11" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="0.8"/></>},
    {id:"door_types",label:"Door Types",icon:"🚪"},
    {id:"windows",label:"Windows",icon:"⊞"},
    {id:"large_doors",label:"Patio Systems",icon:"⧉"},
    {id:"glass_guide",label:"Glass Guide",icon:"◑"},
    {id:"hardware",label:"Hardware",icon:"",svgIcon:<><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1"/><circle cx="8" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="1"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/><line x1="8" y1="1.5" x2="8" y2="3.5" stroke="currentColor" strokeWidth="0.8"/><line x1="8" y1="12.5" x2="8" y2="14.5" stroke="currentColor" strokeWidth="0.8"/><line x1="1.5" y1="8" x2="3.5" y2="8" stroke="currentColor" strokeWidth="0.8"/><line x1="12.5" y1="8" x2="14.5" y2="8" stroke="currentColor" strokeWidth="0.8"/><line x1="3" y1="3" x2="4.4" y2="4.4" stroke="currentColor" strokeWidth="0.8"/><line x1="11.6" y1="11.6" x2="13" y2="13" stroke="currentColor" strokeWidth="0.8"/><line x1="13" y1="3" x2="11.6" y2="4.4" stroke="currentColor" strokeWidth="0.8"/><line x1="4.4" y1="11.6" x2="3" y2="13" stroke="currentColor" strokeWidth="0.8"/></>},
    {id:"favorites",label:"Quote List"+(favorites.length>0?" ("+favorites.length+")":""),icon:"",svgIcon:<><rect x="2.5" y="1" width="11" height="14" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1"/><line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="0.9"/><line x1="5" y1="7.5" x2="11" y2="7.5" stroke="currentColor" strokeWidth="0.9"/><line x1="5" y1="10" x2="11" y2="10" stroke="currentColor" strokeWidth="0.9"/><line x1="5" y1="12.5" x2="8.5" y2="12.5" stroke="currentColor" strokeWidth="0.9"/></>},
  ];
  if(submitted)mainTabs.splice(1,0,{id:"results",label:"My Results",icon:""});

  return (
    <div style={{fontFamily:"Cormorant Garamond,Palatino Linotype,Georgia,serif",background:T.dark,minHeight:"100vh",color:T.text}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&display=swap');
        *{box-sizing:border-box;} input,textarea{font-family:inherit;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#E8E4DC}::-webkit-scrollbar-thumb{background:#B8C4C0;border-radius:2px}
        .opt{cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,0.08);} .opt:hover{border-color:#9abaB6!important;background:#EEF2F0!important;transform:translateY(-1px);box-shadow:0 3px 8px rgba(0,0,0,0.12)!important;}
        .btn:hover{opacity:.85}
        a{color:inherit}
        /* ── NAV: wraps to 2-3 rows as window narrows ── */
        .main-nav{
          display:flex;
          flex-wrap:wrap;
          gap:4px;
        }
        .nav-tab{
          padding:7px 10px;
          font-size:9px;
          white-space:nowrap;
        }

        /* ── SIDEBAR LAYOUTS ── */
        .sidebar-layout{display:flex;min-height:calc(100vh - 80px);}
        .sidebar-nav{width:190px;flex-shrink:0;border-right:1px solid #D8D4CC;padding:24px 0;overflow-y:auto;}
        .sidebar-content{flex:1;overflow-y:auto;padding:28px 32px;}
        .grid-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .grid-4col{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;}

        /* ── LANDING TWO-COLUMN ── */
        .landing-layout{display:flex;gap:28px;align-items:stretch;}
        .landing-hero{flex:0 0 55%;position:relative;border-radius:12px;overflow:hidden;min-height:420px;}
        .landing-side{flex:1;display:flex;flex-direction:column;justify-content:center;gap:14px;}
        @media(max-width:700px){
          .landing-layout{flex-direction:column;}
          .landing-hero{min-height:220px;flex:none;}
        }

        /* ── WINDOW OP GRID ── */
        .win-op-grid{display:grid;grid-template-columns:auto 1fr;gap:20px;align-items:start;}
        @media(max-width:600px){
          .win-op-grid{grid-template-columns:1fr;}
        }

        @media(max-width:640px){
          .main-nav{gap:3px;}
          .nav-tab{padding:8px 7px;font-size:8px;letter-spacing:1px;}
          .sidebar-layout{flex-direction:column;}
          .sidebar-nav{width:100%!important;border-right:none!important;border-bottom:1px solid #D8D4CC;padding:0;overflow-y:visible;overflow-x:auto;display:flex!important;flex-direction:row!important;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
          .sidebar-nav::-webkit-scrollbar{display:none;}
          .sidebar-nav button{flex-shrink:0;display:flex!important;flex-direction:row!important;align-items:center;gap:7px;padding:11px 14px!important;border-left:none!important;border-bottom:3px solid transparent;white-space:nowrap;width:auto!important;text-align:left;}
          .sidebar-nav .sidebar-icon{font-size:15px!important;margin-bottom:0!important;}
          .sidebar-nav .sidebar-label{display:block;font-size:9px!important;letter-spacing:0.5px!important;}
          .sidebar-content{padding:16px 14px!important;}
          .grid-2col{grid-template-columns:1fr!important;}
          .grid-4col{grid-template-columns:1fr 1fr!important;}
          .vendor-grid{grid-template-columns:1fr!important;}
          .card-pad{padding:14px!important;}
          .section-pad{padding:20px 14px!important;}
        }
        @media(max-width:400px){
          .nav-tab{padding:10px 8px!important;letter-spacing:1px!important;}
          .grid-4col{grid-template-columns:1fr!important;}
        }
      `}</style>

      {/* Header */}
      <div style={{background:"#FFFFFF",borderBottom:`1px solid ${T.border}`,boxShadow:"0 1px 8px rgba(0,0,0,0.06)"}}>
        {/* Brand row */}
        <div style={{padding:"12px 24px 8px",display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:"6px"}}>
          <div>
            <div style={{display:"flex",alignItems:"baseline",gap:"8px",flexWrap:"wrap"}}>
              <div style={{fontSize:"18px",letterSpacing:"-0.3px",fontWeight:400}}>SD <em style={{color:T.gold}}>Window &amp; Door</em> Guide</div>
              <div style={{fontSize:"9px",letterSpacing:"3px",color:T.dim,fontFamily:"monospace",whiteSpace:"nowrap"}}>SAN DIEGO COUNTY</div>
            </div>
            <div style={{fontSize:"10px",color:T.faint,marginTop:"2px",fontStyle:"italic",letterSpacing:"0.3px"}}>Find the right window &amp; door system for your project {"\u2014"} free expert matching</div>
          </div>
        </div>
        {/* Nav row — always full width, always scrollable */}
        <div style={{padding:"0 24px 10px"}}>
          <div className="main-nav">
            {mainTabs.map(t=>(
              <button key={t.id} onClick={()=>setMainTab(t.id)} className="nav-tab" style={{background:mainTab===t.id?`${T.teal}18`:"none",border:`1px solid ${mainTab===t.id?T.teal:T.border}`,color:mainTab===t.id?T.teal:T.muted,borderRadius:"4px",cursor:"pointer",letterSpacing:"1px",textTransform:"uppercase",fontFamily:"monospace",fontSize:"9px",transition:"all 0.15s",display:"inline-flex",alignItems:"center",gap:"4px"}}>
                {t.svgIcon ? (
                  <svg viewBox="0 0 16 16" width="13" height="13" style={{display:"inline-block",verticalAlign:"middle",opacity:mainTab===t.id?1:0.65}}>
                    {t.svgIcon}
                  </svg>
                ) : t.icon}
                {" "}{t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── QUIZ ─── */}
      {(mainTab==="quiz")&&(
        <div style={{maxWidth:"960px",margin:"0 auto",padding:"clamp(16px,4vw,36px) clamp(14px,4vw,20px)",animation:"fadeUp 0.25s ease"}}>
          {step===0&&(
            <div className="landing-layout">
              {/* ── Left: Hero image ── */}
              <div className="landing-hero">
                <img src="/sd-hero.jpg" alt="San Diego coastline" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 40%"}}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom, rgba(20,28,26,0.05) 0%, rgba(20,28,26,0.75) 100%)"}}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"clamp(16px,3vw,30px)",textAlign:"left"}}>
                  <div style={{fontSize:"9px",letterSpacing:"5px",color:"rgba(255,255,255,0.85)",marginBottom:"8px",fontFamily:"monospace",textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>SD WINDOW & DOOR GUIDE · SAN DIEGO COUNTY</div>
                  <h1 style={{fontSize:"clamp(18px,2.6vw,30px)",fontWeight:400,margin:"0 0 8px",lineHeight:1.2,color:"#FFFFFF",textShadow:"0 1px 8px rgba(0,0,0,0.5), 0 2px 20px rgba(0,0,0,0.35)"}}>Find the right window & door system<br/><em style={{color:"#E8C87A"}}>for your project — free expert matching</em></h1>
                  <p style={{color:"rgba(255,255,255,0.85)",fontSize:"12px",lineHeight:1.6,margin:0,textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>San Diego's independent resource for comparing windows, doors, and glass systems.</p>
                </div>
              </div>

              {/* ── Right: Content panel ── */}
              <div className="landing-side">
                {/* Audience pills */}
                <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                  {[["","Homeowners"],["","Contractors"],["","Architects"],["","Designers"]].map(([icon,label])=>(
                    <span key={label} style={{fontSize:"10px",fontFamily:"monospace",letterSpacing:"1px",color:T.dim,background:T.card,border:`1px solid ${T.border}`,padding:"4px 10px",borderRadius:"20px"}}>{icon} {label}</span>
                  ))}
                </div>
                {/* How This Works */}
                <div style={{background:`${T.gold}10`,border:`1px solid ${T.gold}33`,borderRadius:"8px",padding:"14px 18px",textAlign:"left"}}>
                  <div style={{fontSize:"9px",letterSpacing:"3px",color:T.gold,fontFamily:"monospace",marginBottom:"8px"}}> HOW THIS WORKS</div>
                  <p style={{margin:"0 0 8px",fontSize:"12px",color:T.muted,lineHeight:1.65}}>Browse the <strong style={{color:T.text}}>Vendors</strong>, <strong style={{color:T.text}}>Windows</strong>, <strong style={{color:T.text}}>Glass Guide</strong>, <strong style={{color:T.text}}>Door Types</strong>, and <strong style={{color:T.text}}>Patio &amp; Door Systems</strong> tabs to research your options at your own pace.</p>
                  <p style={{margin:0,fontSize:"12px",color:T.muted,lineHeight:1.65}}>When you're ready, take the <strong style={{color:T.gold}}>5-minute assessment</strong> to get matched with the right product and a qualified local specialist {"\u2014"} free. Click <strong style={{color:T.gold}}>{""} Add to Quote List</strong> on anything that interests you along the way.</p>
                </div>
                {/* Feature tiles */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px"}}>
                  {[["Free","Expert Matching"],["Free","In-Home Measure"],["Independent","Unbiased Guide"],["Local","SD Specialists"]].map(([a,b])=>(
                    <div key={a+b} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"11px 6px",textAlign:"center"}}>
                      <div style={{fontSize:"12px",fontWeight:500,color:T.gold}}>{a}</div>
                      <div style={{fontSize:"9px",color:T.dim,marginTop:"2px",lineHeight:1.3}}>{b}</div>
                    </div>
                  ))}
                </div>
                {/* CTA */}
                <div style={{textAlign:"center"}}>
                  <button className="btn" onClick={()=>setStep(1)} style={{background:T.gold,border:`3px solid #9A6E10`,color:T.text,padding:"14px 40px",borderRadius:"6px",fontSize:"15px",fontWeight:700,letterSpacing:"1px",cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 14px rgba(0,0,0,0.15)",width:"100%"}}>Start My Assessment {"\u2192"}</button>
                  <div style={{fontSize:"11px",color:T.faint,marginTop:"8px",fontStyle:"italic"}}>No account required {"\u00B7"} No spam · Results in ~5 minutes</div>
                </div>
              </div>
            </div>
          )}

          {step>0&&!currentQ?.isContact&&currentQ&&(
            <div key={`q${step}`} style={{animation:"fadeUp 0.22s ease",maxWidth:"660px",margin:"0 auto"}}>
              <div style={{marginBottom:"26px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
                  <span style={{fontSize:"9px",fontFamily:"monospace",color:sColor,letterSpacing:"2px"}}>{currentQ.section.toUpperCase()} · Q{step}/{totalSteps}</span>
                  <span style={{fontSize:"9px",fontFamily:"monospace",color:T.faint}}>{progress}%</span>
                </div>
                <div style={{height:"2px",background:"#F8F5F0",borderRadius:"1px"}}>
                  <div style={{height:"100%",width:`${progress}%`,background:sColor,borderRadius:"1px",transition:"width 0.35s ease"}}/>
                </div>
              </div>

              <h2 style={{fontSize:"clamp(17px,2.8vw,24px)",fontWeight:400,margin:"0 0 5px",lineHeight:1.25}}>{currentQ.question}</h2>
              <p style={{color:T.dim,fontSize:"13px",margin:"0 0 14px"}}>{currentQ.subtitle}</p>

              {/* Permits / Title 24 education */}
              {currentQ.isPermits&&(
                <div style={{background:"#EEF2FA",border:`1px solid ${T.slate}44`,borderRadius:"8px",padding:"12px 16px",marginBottom:"18px"}}>
                  <div style={{fontSize:"9px",letterSpacing:"3px",color:T.slate,marginBottom:"6px",fontFamily:"monospace"}}> TITLE 24 — CALIFORNIA ENERGY CODE</div>
                  <div style={{fontSize:"12px",color:"#3a4858",lineHeight:1.6}}>Any permitted window or door replacement in California must meet Title 24 energy standards — minimum U-factor of 0.30 and SHGC requirements based on your climate zone. Your specialist will confirm compliance for your specific project before ordering.</div>
                </div>
              )}
              {/* Replacement purpose info */}
              {currentQ.isReplacementPurpose&&(
                <div style={{background:"#F2EEF8",border:`1px solid ${T.plum}44`,borderRadius:"8px",padding:"12px 16px",marginBottom:"18px"}}>
                  <div style={{fontSize:"9px",letterSpacing:"3px",color:T.plum,marginBottom:"6px",fontFamily:"monospace"}}>{"\u2726"} SELECT ALL THAT APPLY</div>
                  <p style={{fontSize:"12px",color:"#7a6a8a",lineHeight:1.6,margin:0}}>Your goals directly influence product recommendations {"\u2014"} acoustic laminated glass for sound control, LoE-366 coatings for energy performance, stainless hardware for coastal durability. The more you tell us, the better your match.</p>
                </div>
              )}

              {/* Coastal proximity education */}
              {currentQ.isCoastal&&(
                <div style={{background:"#EEF2FA",border:`1px solid ${T.teal}44`,borderRadius:"8px",padding:"12px 16px",marginBottom:"18px"}}>
                  <div style={{fontSize:"9px",letterSpacing:"3px",color:T.teal,marginBottom:"6px",fontFamily:"monospace"}}> WHY IT MATTERS</div>
                  <div style={{fontSize:"12px",color:"#2a4a46",lineHeight:1.6}}>Salt air accelerates corrosion on frames, hardware, and seals. Homes within 2 miles of the coast require specific materials and finish upgrades to maintain performance and warranty coverage.</div>
                </div>
              )}
              {/* Elevation education */}
              {currentQ.isElevation&&(
                <div style={{background:"#EEF5EE",border:`1px solid ${T.sage}44`,borderRadius:"8px",padding:"12px 16px",marginBottom:"18px"}}>
                  <div style={{fontSize:"9px",letterSpacing:"3px",color:T.sage,marginBottom:"6px",fontFamily:"monospace"}}> HIGH ELEVATION</div>
                  <div style={{fontSize:"12px",color:"#3a4a38",lineHeight:1.6}}>Homes above ~4,000 ft require insulated glass units with breather tubes to prevent seal failure and fogging caused by pressure differentials at altitude. This must be specified at the factory — flag it with your specialist before ordering.</div>
                </div>
              )}
              {currentQ.isFireZone&&(
                <div style={{background:"#FEF0EE",border:"1px solid #E87A6A44",borderRadius:"8px",padding:"14px 16px",marginBottom:"18px"}}>
                  <div style={{fontSize:"9px",letterSpacing:"3px",color:T.ember,marginBottom:"6px",fontFamily:"monospace"}}> WHY THIS MATTERS</div>
                  <p style={{fontSize:"13px",color:"#885858",lineHeight:1.65,margin:"0 0 10px"}}>Properties in Very High or High Fire Hazard Severity Zones (FHSZ) are subject to stricter building code requirements. Certain window and door materials, ratings, and installation methods are mandated. Knowing your zone status before specifying products saves costly changes later.</p>
                  <a href="https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones" target="_blank" rel="noopener noreferrer" style={{fontSize:"11px",fontFamily:"monospace",color:T.ember,letterSpacing:"1px",textDecoration:"none"}}>
                     CHECK MY ADDRESS AT OSFM.FIRE.CA.GOV →
                  </a>
                </div>
              )}

              {/* Tempered glass education */}
              {currentQ.isTempered&&(
                <div style={{background:"#EEF2FA",border:`1px solid ${T.slate}44`,borderRadius:"8px",padding:"14px 16px",marginBottom:"18px"}}>
                  <div style={{fontSize:"9px",letterSpacing:"3px",color:T.slate,marginBottom:"8px",fontFamily:"monospace"}}> WHEN IS TEMPERED GLASS REQUIRED?</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:"6px",marginBottom:"10px"}}>
                    {[["Within 24\" of a door","Any glazing within 24\" of a door's edge"],["Within 18\" of the floor","Glass starting within 18\" of the floor (over 9 sq ft)"],["Showers & tubs","All glass in or adjacent to wet areas"],["Pool / spa within 5ft","All glazing within 5 feet of pool or spa edge"],["Skylights","All skylights require tempered or laminated"],["Fire zones (WUI)","Fire-rated glazing required in FHSZ zones"]].map(([loc,detail])=>(
                      <div key={loc} style={{background:"#EEF2FA",borderRadius:"5px",padding:"9px 11px",borderLeft:`2px solid ${T.slate}55`}}>
                        <div style={{fontSize:"11px",fontWeight:500,color:"#4A6898",marginBottom:"2px"}}>{loc}</div>
                        <div style={{fontSize:"10px",color:"#2A4A70",lineHeight:1.4}}>{detail}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize:"11px",color:"#2A4A70",lineHeight:1.5}}>Not sure? Answer "Not Sure — Explain It" and your specialist will identify every required location during the quote.</div>
                  <button onClick={()=>setMainTab("glass_guide")} style={{marginTop:"10px",background:"none",border:`1px solid ${T.slate}44`,color:T.slate,padding:"5px 12px",borderRadius:"4px",cursor:"pointer",fontSize:"9px",letterSpacing:"1px",fontFamily:"monospace"}}>READ FULL GLASS GUIDE {"\u2192"}</button>
                </div>
              )}

              {currentQ.educationKey==="installType"&&(
                <div style={{background:`${T.teal}10`,border:`1px solid ${T.teal}33`,borderRadius:"6px",padding:"12px 14px",marginBottom:"16px"}}>
                  <p style={{fontSize:"12px",color:"#6a9a96",lineHeight:1.65,margin:"0 0 8px"}}><strong style={{color:T.teal}}>Retrofit</strong> = install inside your existing frame (less demolition). <strong style={{color:T.gold}}>New Construction</strong> = nailing fin attaches to rough framing (used in new builds AND full gut remodels). An existing home can take either type {"\u2014"} but the installation approach and cost are very different.</p>
                </div>
              )}

              {currentQ.educationKey==="frameMaterial"&&(
                <div style={{background:`${T.slate}10`,border:`1px solid ${T.slate}33`,borderRadius:"6px",padding:"12px 14px",marginBottom:"16px"}}>
                  <p style={{fontSize:"12px",color:"#6a7a96",lineHeight:1.65,margin:0}}>Visit the <strong style={{color:T.slate}}>Door Types</strong> or <strong style={{color:T.slate}}>Vendor Profiles</strong> tabs for in-depth explanations of each frame material.</p>
                </div>
              )}

              {/* Installation free measure callout */}
              {currentQ.isInstall&&(
                <div style={{background:"#EEF5EE",border:`1px solid ${T.sage}44`,borderRadius:"8px",padding:"14px 16px",marginBottom:"18px"}}>
                  <div style={{fontSize:"9px",letterSpacing:"3px",color:T.sage,marginBottom:"8px",fontFamily:"monospace"}}> FREE IN-HOME MEASURE</div>
                  <p style={{fontSize:"13px",color:"#7a9a7a",lineHeight:1.65,margin:"0 0 8px"}}>Local dealers matched through this guide offer a <strong style={{color:T.text}}>free in-home measure</strong> for clients who purchase and install through them. A measure technician will document every opening, confirm rough sizes, flag code requirements, and prepare a precise quote {"\u2014"} at no charge.</p>
                  <p style={{fontSize:"12px",color:T.dim,lineHeight:1.5,margin:0}}>Supply-only clients are welcome too {"\u2014"} your specialist can work from your measurements or a window/door schedule.</p>
                </div>
              )}

              {/* Other services info */}
              {currentQ.isOtherServices&&(
                <div style={{background:"#F2EEF8",border:`1px solid ${T.plum}44`,borderRadius:"8px",padding:"14px 16px",marginBottom:"18px"}}>
                  <div style={{fontSize:"9px",letterSpacing:"3px",color:T.plum,marginBottom:"8px",fontFamily:"monospace"}}> FULL-SERVICE LOCAL DEALERS</div>
                  <p style={{fontSize:"13px",color:"#9a8aaa",lineHeight:1.65,margin:"0 0 6px"}}>Many of the dealers in our network carry a full range of building materials beyond windows and doors {"\u2014"} lumber, decking, roofing, drywall, insulation, and kitchen and bath products. Letting us know what your project needs helps us match you with the right specialist for each category.</p>
                  <p style={{fontSize:"11px",color:T.dim,margin:0}}>Select all that apply {"\u2014"} you can choose multiple options below.</p>
                </div>
              )}

              {/* Option grid — multi-select or single select */}
              {currentQ.isMultiSelect ? (
                <div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:"9px",marginBottom:"14px"}}>
                    {currentQ.options.map(opt=>{
                      const sel = Array.isArray(selOpt)&&selOpt.includes(opt.value);
                      const toggleMulti = ()=>{
                        if(opt.value==="none"){
                          setSelOpt(["none"]);
                        } else {
                          setSelOpt(prev=>{
                            const arr = Array.isArray(prev)?prev.filter(v=>v!=="none"):[];
                            return arr.includes(opt.value)?arr.filter(v=>v!==opt.value):[...arr,opt.value];
                          });
                        }
                      };
                      return (
                        <div key={opt.value} className="opt" onClick={toggleMulti} style={{background:sel?`${sColor}18`:T.card,border:`2px solid ${sel?sColor:"#C8D0CC"}`,borderRadius:"10px",padding:"15px 13px",transition:"all 0.15s",position:"relative",boxShadow:sel?`0 0 0 1px ${sColor}44`:"0 1px 3px rgba(0,0,0,0.08)"}}>
                          {sel&&<div style={{position:"absolute",top:"8px",right:"10px",width:"16px",height:"16px",borderRadius:"50%",background:sColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"9px",color:T.dark,fontWeight:700}}>{"\u2713"}</div>}
                          <div style={{fontSize:"19px",marginBottom:"5px"}}>{opt.icon}</div>
                          <div style={{fontSize:"13px",fontWeight:sel?500:400,color:sel?T.text:"#484848",marginBottom:"3px"}}>{opt.label}</div>
                          <div style={{fontSize:"11px",color:T.dim,lineHeight:1.4}}>{opt.detail}</div>
                        </div>
                      );
                    })}
                  </div>
                  {Array.isArray(selOpt)&&selOpt.length>0&&!selOpt.includes("none")&&(
                    <div style={{background:`${sColor}10`,border:`1px solid ${sColor}33`,borderRadius:"6px",padding:"9px 13px",marginBottom:"14px"}}>
                      <div style={{fontSize:"10px",color:sColor,fontFamily:"monospace",letterSpacing:"1px"}}>SELECTED: {selOpt.map(v=>currentQ.options.find(o=>o.value===v)?.label).join(" · ")}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{display:"grid",gridTemplateColumns:currentQ.columns===3?"repeat(3,minmax(0,1fr))":"repeat(auto-fill,minmax(min(180px,100%),1fr))",gap:"9px",marginBottom:"22px"}}>
                  {currentQ.options.map(opt=>{
                    const isSel=selOpt===opt.value;
                    return (
                      <div key={opt.value} className="opt" onClick={()=>setSelOpt(opt.value)} style={{background:isSel?`${sColor}18`:T.card,border:`2px solid ${isSel?sColor:"#C8D0CC"}`,borderRadius:"10px",padding:currentQ.columns===3?"13px 11px":"15px 13px",transition:"all 0.15s",boxShadow:isSel?`0 0 0 1px ${sColor}44`:"0 1px 3px rgba(0,0,0,0.08)"}}>
                        <div style={{fontSize:currentQ.columns===3?"17px":"19px",marginBottom:"5px"}}>{opt.icon}</div>
                        <div style={{fontSize:currentQ.columns===3?"12px":"13px",fontWeight:isSel?500:400,color:isSel?T.text:"#484848",marginBottom:"3px"}}>{opt.label}</div>
                        <div style={{fontSize:"11px",color:T.dim,lineHeight:1.4}}>{opt.detail}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div style={{display:"flex",justifyContent:"space-between",marginTop: currentQ.isMultiSelect?"0":"0"}}>
                <button onClick={handleBack} style={{background:"none",border:`1px solid ${T.border}`,color:T.dim,padding:"9px 16px",borderRadius:"6px",cursor:"pointer",fontSize:"13px",fontFamily:"inherit"}}>{"\u2190"} Back</button>
                <button className="btn" onClick={handleNext}
                  disabled={currentQ.isMultiSelect?(!(Array.isArray(selOpt)&&selOpt.length>0)):!selOpt}
                  style={{background:(currentQ.isMultiSelect?(Array.isArray(selOpt)&&selOpt.length>0):selOpt)?sColor:"#F8F5F0",border:"none",color:(currentQ.isMultiSelect?(Array.isArray(selOpt)&&selOpt.length>0):selOpt)?T.dark:"#C4CEC8",padding:"9px 24px",borderRadius:"6px",cursor:"pointer",fontSize:"13px",fontWeight:600,fontFamily:"inherit",transition:"all 0.2s"}}>
                  {step===totalSteps-1?"Almost Done →":"Next →"}
                </button>
              </div>
            </div>
          )}

          {step>0&&currentQ?.isContact&&(
            <div key="contact" style={{animation:"fadeUp 0.22s ease",maxWidth:"660px",margin:"0 auto"}}>
              <div style={{marginBottom:"26px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
                  <span style={{fontSize:"9px",fontFamily:"monospace",color:T.gold,letterSpacing:"2px"}}>CONTACT {"\u00B7"} FINAL STEP</span>
                  <span style={{fontSize:"9px",fontFamily:"monospace",color:T.faint}}>98%</span>
                </div>
                <div style={{height:"2px",background:"#F8F5F0",borderRadius:"1px"}}><div style={{height:"100%",width:"98%",background:T.gold,borderRadius:"1px"}}/></div>
              </div>
              <h2 style={{fontSize:"22px",fontWeight:400,margin:"0 0 5px"}}>{currentQ.question}</h2>
              <p style={{color:T.dim,fontSize:"13px",margin:"0 0 22px"}}>{currentQ.subtitle}</p>

              {/* Quote list summary */}
              {favorites.length>0&&(
                <div style={{background:`${T.gold}0e`,border:`1px solid ${T.gold}33`,borderRadius:"8px",padding:"14px 16px",marginBottom:"18px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
                    <div style={{fontSize:"9px",letterSpacing:"3px",color:T.gold,fontFamily:"monospace"}}>{"\u2605"} YOUR QUOTE LIST — {favorites.length} ITEM{favorites.length!==1?"S":""}</div>
                    <button onClick={()=>setMainTab("favorites")} style={{background:"none",border:`1px solid ${T.gold}44`,color:T.gold,padding:"3px 9px",borderRadius:"3px",cursor:"pointer",fontSize:"8px",letterSpacing:"1px",fontFamily:"monospace"}}>EDIT LIST</button>
                  </div>
                  {favorites.map(f=>{
                    const qtyDisplay = f.qty==="Custom qty"?(f.customQty||"?"):f.qty;
                    const sizeDisplay = f.size==="Custom"?(f.customSize||"size TBD"):f.size;
                    return (
                      <div key={f.id} style={{background:T.card2,borderRadius:"6px",padding:"9px 12px",marginBottom:"6px",borderLeft:`2px solid ${T.gold}55`}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"8px",flexWrap:"wrap"}}>
                          <div>
                            <div style={{fontSize:"12px",color:"#484848",fontWeight:500}}>{f.vendorName}{f.productName?<span style={{color:T.dim,fontWeight:400}}> {"\u2014"} {f.productName}</span>:""}</div>
                            {f.location&&<div style={{fontSize:"10px",color:T.dim,marginTop:"2px"}}> {f.location}</div>}
                          </div>
                          <div style={{display:"flex",gap:"8px",flexShrink:0}}>
                            <span style={{fontSize:"9px",fontFamily:"monospace",color:T.gold,background:`${T.gold}15`,padding:"2px 7px",borderRadius:"3px"}}>QTY: {qtyDisplay}</span>
                            <span style={{fontSize:"9px",fontFamily:"monospace",color:T.teal,background:`${T.teal}15`,padding:"2px 7px",borderRadius:"3px"}}>{sizeDisplay}</span>
                          </div>
                        </div>
                        {f.notes&&<div style={{fontSize:"10px",color:T.dim,marginTop:"5px",fontStyle:"italic",lineHeight:1.4}}>{f.notes}</div>}
                      </div>
                    );
                  })}
                  <div style={{fontSize:"10px",color:T.dim,marginTop:"8px",lineHeight:1.5}}>Your specialist will use these details to prepare relevant pricing, lead times, and samples before your consultation.</div>
                </div>
              )}
              {favorites.length===0&&(
                <div style={{background:T.card2,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"12px 15px",marginBottom:"18px"}}>
                  <div style={{fontSize:"9px",letterSpacing:"2px",color:T.faint,fontFamily:"monospace",marginBottom:"4px"}}>{"\u2606"} QUOTE LIST IS EMPTY</div>
                  <div style={{fontSize:"12px",color:T.dim,lineHeight:1.5}}>Browse the <button onClick={()=>setMainTab("vendors")} style={{background:"none",border:"none",color:T.gold,cursor:"pointer",fontSize:"12px",padding:0,fontFamily:"inherit",textDecoration:"underline"}}>Vendors</button>, <button onClick={()=>setMainTab("windows")} style={{background:"none",border:"none",color:T.gold,cursor:"pointer",fontSize:"12px",padding:0,fontFamily:"inherit",textDecoration:"underline"}}>Windows</button>, <button onClick={()=>setMainTab("door_types")} style={{background:"none",border:"none",color:T.gold,cursor:"pointer",fontSize:"12px",padding:0,fontFamily:"inherit",textDecoration:"underline"}}>Door Types</button>, or <button onClick={()=>setMainTab("large_doors")} style={{background:"none",border:"none",color:T.gold,cursor:"pointer",fontSize:"12px",padding:0,fontFamily:"inherit",textDecoration:"underline"}}>Patio Systems</button> tabs and click {"\u2606"} Add to Quote List on anything that interests you.</div>
                </div>
              )}

              <div style={{display:"flex",flexDirection:"column",gap:"13px",marginBottom:"22px"}}>
                {[{k:"name",l:"Your Name *",p:"First & Last Name",t:"text"},{k:"phone",l:"Phone Number *",p:"Best number to reach you",t:"tel"},{k:"email",l:"Email Address",p:"We'll email your results here",t:"email"},{k:"zip",l:"Project Zip Code",p:"92037, 92067, 92130…",t:"text"}].map(f=>(
                  <div key={f.k}>
                    <div style={{fontSize:"9px",letterSpacing:"2px",color:T.dim,marginBottom:"5px",fontFamily:"monospace"}}>{f.l}</div>
                    <input type={f.t} placeholder={f.p} value={contact[f.k]} onChange={e=>setContact(p=>({...p,[f.k]:e.target.value}))} style={{width:"100%",background:T.card,border:`1px solid ${T.border}`,color:T.text,padding:"10px 13px",borderRadius:"6px",fontSize:"14px",outline:"none"}}/>
                  </div>
                ))}
                <div>
                  <div style={{fontSize:"9px",letterSpacing:"2px",color:T.dim,marginBottom:"5px",fontFamily:"monospace"}}>ADDITIONAL DETAILS</div>
                  <textarea placeholder="Tell us more about your project…" value={contact.notes} onChange={e=>setContact(p=>({...p,notes:e.target.value}))} rows={3} style={{width:"100%",background:T.card,border:`1px solid ${T.border}`,color:T.text,padding:"10px 13px",borderRadius:"6px",fontSize:"14px",outline:"none",resize:"vertical"}}/>
                </div>

                {/* Schedule / documents upload */}
                <div>
                  <div style={{fontSize:"9px",letterSpacing:"2px",color:T.dim,marginBottom:"5px",fontFamily:"monospace"}}>DOOR &amp; WINDOW SCHEDULE <span style={{color:T.faint}}>(OPTIONAL)</span></div>
                  <div style={{background:`${T.teal}0a`,border:`1px solid ${T.teal}33`,borderRadius:"6px",padding:"10px 13px",marginBottom:"8px"}}>
                    <div style={{fontSize:"10px",color:"#5a9a96",lineHeight:1.6}}>Have a door/window schedule with sizes and locations? Upload it here {"\u2014"} PDF, Excel, or Word. Your specialist will review it before your consultation and prepare pricing based on your actual openings.</div>
                  </div>
                  <div onClick={()=>document.getElementById("scheduleInput").click()} style={{border:`2px dashed ${T.border}`,borderRadius:"8px",padding:"16px",textAlign:"center",cursor:"pointer",background:"#EEF4F2"}}>
                    <div style={{fontSize:"20px",marginBottom:"4px"}}></div>
                    <div style={{fontSize:"13px",color:T.muted}}>Upload schedule / drawings or <span style={{color:T.teal}}>click to browse</span></div>
                    <div style={{fontSize:"10px",color:T.dim,marginTop:"3px"}}>PDF, Excel, Word, or image files accepted</div>
                  </div>
                  <input id="scheduleInput" type="file" accept=".pdf,.xlsx,.xls,.docx,.doc,.csv,image/*" multiple onChange={e=>{const files=Array.from(e.target.files).map(f=>({name:f.name,size:(f.size/1024).toFixed(0)+"KB",id:Date.now()+Math.random()}));setScheduleFiles(p=>[...p,...files]);}} style={{display:"none"}}/>
                  {scheduleFiles.length>0&&<div style={{marginTop:"8px",display:"flex",flexDirection:"column",gap:"5px"}}>
                    {scheduleFiles.map(f=>(
                      <div key={f.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:T.card,border:`1px solid ${T.border}`,borderRadius:"5px",padding:"7px 11px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                          <span style={{fontSize:"14px"}}></span>
                          <div><div style={{fontSize:"12px",color:"#484848"}}>{f.name}</div><div style={{fontSize:"10px",color:T.dim}}>{f.size}</div></div>
                        </div>
                        <button onClick={()=>setScheduleFiles(p=>p.filter(x=>x.id!==f.id))} style={{background:"none",border:"none",color:"#8A3A30",cursor:"pointer",fontSize:"14px"}}>{"\u2715"}</button>
                      </div>
                    ))}
                  </div>}
                </div>

                {/* Photo upload */}
                <div>
                  <div style={{fontSize:"9px",letterSpacing:"2px",color:T.dim,marginBottom:"8px",fontFamily:"monospace"}}>UPLOAD PHOTOS <span style={{color:T.faint}}>(OPTIONAL)</span></div>
                  <div onClick={()=>document.getElementById("photoInput").click()} style={{border:`2px dashed ${T.border}`,borderRadius:"8px",padding:"20px",textAlign:"center",cursor:"pointer",background:"#EEF4F2"}}>
                    <div style={{fontSize:"22px",marginBottom:"6px"}}></div>
                    <div style={{fontSize:"13px",color:T.muted}}>Drop photos or <span style={{color:T.gold}}>click to browse</span></div>
                    <div style={{fontSize:"10px",color:T.dim,marginTop:"3px"}}>Existing windows, exterior walls, opening area</div>
                  </div>
                  <input id="photoInput" type="file" accept="image/*" multiple onChange={e=>{Array.from(e.target.files).forEach(f=>{const r=new FileReader();r.onload=ev=>setPhotos(p=>[...p,{name:f.name,url:ev.target.result}]);r.readAsDataURL(f);});}} style={{display:"none"}}/>
                  {photos.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"12px"}}>{photos.map((p,i)=>(
                    <div key={i} style={{position:"relative"}}>
                      <img src={p.url} alt="" style={{width:"72px",height:"72px",objectFit:"cover",borderRadius:"5px",border:`1px solid ${T.border}`}}/>
                      <button onClick={()=>setPhotos(prev=>prev.filter((_,idx)=>idx!==i))} style={{position:"absolute",top:"-5px",right:"-5px",background:"#C05040",border:"none",borderRadius:"50%",width:"16px",height:"16px",cursor:"pointer",fontSize:"9px",color:"#fff"}}>{"\u2715"}</button>
                    </div>
                  ))}</div>}
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <button onClick={handleBack} style={{background:"none",border:`1px solid ${T.border}`,color:T.dim,padding:"9px 16px",borderRadius:"6px",cursor:"pointer",fontSize:"13px",fontFamily:"inherit"}}>{"\u2190"} Back</button>
                <button className="btn" onClick={handleNext} disabled={!contact.name||!contact.phone||submitting} style={{background:contact.name&&contact.phone?T.gold:"#F8F5F0",border:"none",color:contact.name&&contact.phone?T.dark:"#C4CEC8",padding:"10px 26px",borderRadius:"6px",cursor:"pointer",fontSize:"14px",fontWeight:600,fontFamily:"inherit"}}>{submitting?"Sending\u2026":"See My Results \u2192"}</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── RESULTS ─── */}
      {mainTab==="results"&&submitted&&(
        <div style={{maxWidth:"1000px",margin:"0 auto",padding:"32px 20px",animation:"fadeUp 0.3s ease"}}>
          <div style={{background:`${T.teal}15`,border:`1px solid ${T.teal}44`,borderRadius:"10px",padding:"14px 20px",marginBottom:"24px",display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{fontSize:"22px"}}>✓</div>
            <div>
              <div style={{fontSize:"13px",fontWeight:600,color:T.teal,marginBottom:"2px"}}>Request received — we'll be in touch within 1 business day.</div>
              <div style={{fontSize:"12px",color:T.muted}}>Your personalized recommendations are ready below. A local specialist will follow up at {contact.email||contact.phone}.</div>
            </div>
          </div>
          <div style={{textAlign:"center",marginBottom:"28px"}}>
            <div style={{fontSize:"9px",letterSpacing:"5px",color:T.faint,marginBottom:"8px",fontFamily:"monospace"}}>YOUR PERSONALIZED RESULTS</div>
            <h2 style={{fontSize:"clamp(20px,3.5vw,28px)",fontWeight:400,margin:"0 0 8px"}}>{contact.name?`${contact.name.split(" ")[0]}, here are `:"Here are "}your <em style={{color:T.gold}}>top matches</em></h2>
            {answers.fireZone&&(answers.fireZone==="yes_very_high"||answers.fireZone==="yes_high")&&(
              <div style={{background:"#FEF0EE",border:"1px solid #E87A6A44",borderRadius:"8px",padding:"12px 16px",maxWidth:"500px",margin:"0 auto 16px"}}>
                <div style={{fontSize:"9px",letterSpacing:"2px",color:T.ember,marginBottom:"4px",fontFamily:"monospace"}}> FIRE ZONE NOTE</div>
                <div style={{fontSize:"12px",color:"#885858",lineHeight:1.6}}>Your property is in a {answers.fireZone==="yes_very_high"?"Very High":"High"} FHSZ. Your specialist will confirm fire-rated product requirements before finalizing specifications.</div>
              </div>
            )}
          </div>
          {recs[0]&&(()=>{const top=recs[0].brand;return(
            <div style={{background:"#EEF5F2",border:`1px solid ${top.color}44`,borderRadius:"12px",padding:"22px 26px",marginBottom:"14px",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,right:0,background:T.gold,color:T.dark,fontSize:"9px",letterSpacing:"3px",padding:"5px 12px",fontFamily:"monospace",fontWeight:700,borderBottomLeftRadius:"6px"}}>#1 MATCH</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px",flexWrap:"wrap",gap:"8px"}}>
                <div><div style={{fontSize:"22px",fontWeight:500}}>{top.name}</div><div style={{fontSize:"12px",fontStyle:"italic",color:top.color}}>{top.tagline}</div></div>
                <Pill label={top.tier} color={top.tierColor||top.color}/>
              </div>
              <p style={{color:T.muted,fontSize:"13px",lineHeight:1.7,marginBottom:"14px"}}>{top.idealFor.join(" · ")}</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(200px,100%),1fr))",gap:"5px"}}>{top.differentiators.slice(0,4).map(d=><div key={d} style={{fontSize:"11px",color:"#606060"}}>{"\u2713"} {d}</div>)}</div>
            </div>
          );})()}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(260px,100%),1fr))",gap:"12px",marginBottom:"22px"}}>
            {recs.slice(1,3).map((rec,i)=>(
              <div key={rec.key} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"16px 18px",borderTop:`3px solid ${rec.brand.color}`}}>
                <div style={{fontSize:"9px",letterSpacing:"2px",color:T.faint,marginBottom:"5px",fontFamily:"monospace"}}>#{i+2} MATCH</div>
                <div style={{fontSize:"16px",fontWeight:500,marginBottom:"2px"}}>{rec.brand.name}</div>
                <div style={{fontSize:"11px",fontStyle:"italic",color:rec.brand.color,marginBottom:"10px"}}>{rec.brand.tagline}</div>
                {rec.brand.differentiators.slice(0,2).map(d=><div key={d} style={{fontSize:"11px",color:"#555555",marginBottom:"3px"}}>{"\u2022"} {d}</div>)}
              </div>
            ))}
          </div>
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"16px 20px",marginBottom:"14px"}}>
            <SectionLabel>YOUR PROJECT PROFILE</SectionLabel>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:"10px"}}>
              {Object.entries(answers).map(([key,val])=>{const q=allQs.find(q=>q.id===key);const opt=q?.options?.find(o=>o.value===val);if(!q||!opt)return null;return(<div key={key}><div style={{fontSize:"8px",letterSpacing:"1px",color:T.faint,fontFamily:"monospace",marginBottom:"2px"}}>{q.section}</div><div style={{fontSize:"12px",color:"#606060"}}>{opt.icon} {opt.label}</div></div>);})}
            </div>
          </div>
          <div style={{background:"#F0F5F2",border:`1px solid ${T.gold}44`,borderRadius:"10px",padding:"18px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
            <div>
              <SectionLabel color={T.gold}>NEXT STEP</SectionLabel>
              <div style={{fontSize:"14px",color:T.text}}>A local specialist will follow up within 1 business day.</div>
              <div style={{fontSize:"11px",color:T.dim,marginTop:"2px"}}>We'll review your project profile and photos before calling.</div>
            </div>
            <button onClick={restart} style={{background:"none",border:`1px solid ${T.border}`,color:T.dim,padding:"8px 14px",borderRadius:"6px",cursor:"pointer",fontSize:"10px",fontFamily:"inherit",letterSpacing:"1px"}}>Start Over</button>
          </div>
        </div>
      )}

      {/* ─── VENDORS ─── */}
      {mainTab==="vendors"&&(
        <div style={{padding:"26px",maxWidth:"1200px",margin:"0 auto",animation:"fadeUp 0.25s ease"}}>
          <div style={{display:"flex",gap:0,borderBottom:`1px solid ${T.border}`,marginBottom:"22px",flexWrap:"wrap"}}>
            {[
              {id:"windows_doors",label:"Windows & Door Systems",color:T.gold},
              {id:"entry_doors",label:"Entry Doors",color:T.rust},
              {id:"interior_doors",label:"Interior Doors",color:T.plum},
              {id:"skylights",label:"Skylights",color:T.teal},
              {id:"closet",label:"Closet & Storage",color:T.sage},
              {id:"utility",label:"Utility & Garage",color:T.slate},
            ].map(t=>(
              <button key={t.id} onClick={()=>{setVendorCat(t.id);setTierFilter("all");setMaterialFilter("all");}} style={{background:"none",border:"none",borderBottom:`2px solid ${vendorCat===t.id?t.color:"transparent"}`,color:vendorCat===t.id?T.text:T.dim,padding:"10px 16px",cursor:"pointer",fontSize:"9px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"monospace",whiteSpace:"nowrap"}}>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{display:"flex",gap:"12px",flexWrap:"wrap",alignItems:"flex-start",marginBottom:"20px",background:T.card,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"10px 14px"}}>
            {/* Tier filter */}
            <div style={{display:"flex",gap:"6px",flexWrap:"wrap",alignItems:"center"}}>
              <span style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:"2px",color:T.faint,marginRight:"2px"}}>TIER</span>
              {["all","Ultra Premium","Luxury","Premium","Mid-Premium"].map(t=>(
                <button key={t} onClick={()=>setTierFilter(t)} style={{background:tierFilter===t?`${T.gold}18`:"none",border:`1px solid ${tierFilter===t?T.gold:T.border}`,color:tierFilter===t?T.gold:T.dim,padding:"3px 10px",borderRadius:"4px",cursor:"pointer",fontSize:"9px",letterSpacing:"1px",fontFamily:"monospace"}}>
                  {t==="all"?"All":t}
                </button>
              ))}
            </div>
            {/* Vertical divider */}
            <div style={{width:"1px",background:T.border,alignSelf:"stretch",flexShrink:0,minHeight:"24px"}}/>
            {/* Material filter */}
            {(()=>{
              const isAluminum = m => m && m.toLowerCase().includes("aluminum") && !m.toLowerCase().includes("clad");
              const isFiberglass = m => m && (m.toLowerCase().includes("fiberglass") || m.toLowerCase().includes("fibrex"));
              const isSteel = m => m && m.toLowerCase().includes("steel") && !m.toLowerCase().includes("powder");
              const normalizeMat = m => isAluminum(m) ? "Aluminum" : isFiberglass(m) ? "Fiberglass / Composite" : isSteel(m) ? "Steel" : m;
              const allMaterials = (vendors[vendorCat]||[]).flatMap(v=>v.frameMaterials||[]);
              const normalizedMaterials = allMaterials.map(normalizeMat);
              const uniqueMaterials = ["all",...Array.from(new Set(normalizedMaterials)).sort()];
              const matLabels = {
                "all":"All Materials",
                "Aluminum":"Aluminum",
                "Vinyl":"Vinyl",
                "Fiberglass / Composite":"Fiberglass / Composite",
                "Steel":"Steel",
                "Aluminum-clad Wood":"Alum-Clad Wood",
                "Solid Wood (stain grade)":"Solid Wood",
                "Solid Wood":"Solid Wood",
                "MDF (paint grade)":"MDF",
                "MDF":"MDF",
                "Moulded Composite":"Moulded Comp.",
                "Solid Core":"Solid Core",
                "Wood Composite":"Wood Comp.",
              };
              return uniqueMaterials.length > 2 ? (
                <div style={{display:"flex",gap:"6px",flexWrap:"wrap",alignItems:"center"}}>
                  <span style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:"2px",color:T.faint,marginRight:"2px"}}>MATERIAL</span>
                  {uniqueMaterials.map(m=>{
                    const label = m==="all"?"All":(matLabels[m]||m);
                    return (
                      <button key={m} onClick={()=>setMaterialFilter(m)} style={{background:materialFilter===m?`${T.teal}18`:"none",border:`1px solid ${materialFilter===m?T.teal:T.border}`,color:materialFilter===m?T.teal:T.dim,padding:"3px 10px",borderRadius:"4px",cursor:"pointer",fontSize:"9px",letterSpacing:"1px",fontFamily:"monospace"}}>
                        {label}
                      </button>
                    );
                  })}
                </div>
              ) : null;
            })()}
          </div>
          <div className="vendor-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(460px,100%),1fr))",gap:"14px"}}>
            {(vendors[vendorCat]||[]).filter(v=>{
              const tierOk = tierFilter==="all"||v.tier===tierFilter;
              const mats = v.frameMaterials||[];
              const matOk = materialFilter==="all"||(
                materialFilter==="Aluminum" ? mats.some(m=>m&&m.toLowerCase().includes("aluminum")&&!m.toLowerCase().includes("clad")) :
                materialFilter==="Fiberglass / Composite" ? mats.some(m=>m&&(m.toLowerCase().includes("fiberglass")||m.toLowerCase().includes("fibrex"))) :
                materialFilter==="Steel" ? mats.some(m=>m&&m.toLowerCase().includes("steel")&&!m.toLowerCase().includes("powder")) :
                mats.includes(materialFilter));
              return tierOk && matOk;
            }).map(v=><VendorCard key={v.id} vendor={v} favorites={favorites} setFavorites={setFavorites}/>)}
            <div style={{background:T.card2,border:`2px dashed ${T.border}`,borderRadius:"12px",padding:"28px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",minHeight:"160px"}}>
              <div style={{fontSize:"24px",opacity:.3,marginBottom:"8px"}}>+</div>
              <div style={{fontSize:"11px",color:T.faint,fontFamily:"monospace",letterSpacing:"2px"}}>MORE VENDORS</div>
              <div style={{fontSize:"10px",color:"#4A7848",marginTop:"4px"}}>Adding soon</div>
            </div>
          </div>
        </div>
      )}

      {/* ─── DOOR TYPES ─── */}
      {mainTab==="door_types"&&(
        <div style={{padding:"26px",maxWidth:"1200px",margin:"0 auto",animation:"fadeUp 0.25s ease"}}>
          <div style={{display:"flex",gap:0,borderBottom:`1px solid ${T.border}`,marginBottom:"22px"}}>
            {[{id:"operation",label:"Door Operation Types",color:T.gold},{id:"exterior",label:"Exterior Materials",color:T.rust},{id:"interior",label:"Interior Materials",color:T.teal}].map(t=>(
              <button key={t.id} onClick={()=>setDoorTypeTab(t.id)} style={{background:"none",border:"none",borderBottom:`2px solid ${doorTypeTab===t.id?t.color:"transparent"}`,color:doorTypeTab===t.id?T.text:T.dim,padding:"10px 18px",cursor:"pointer",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"monospace"}}>
                {t.label}
              </button>
            ))}
          </div>

          {doorTypeTab==="exterior"&&(
            <div>
              <div style={{marginBottom:"20px"}}>
                <SectionLabel color={T.rust}>5 EXTERIOR DOOR MATERIALS</SectionLabel>
                <p style={{margin:0,fontSize:"13px",color:T.muted,maxWidth:"600px",lineHeight:1.65}}>Material selection is the most important decision for an exterior door. It determines longevity, maintenance requirements, design options, and fire zone compliance. Each card below explains a material in depth {"\u2014"} including a fire zone tab for properties in San Diego{"'"}s high-risk areas.</p>
              </div>
              <div style={{background:"#F0F4FA",border:"1px solid #7A9ABB55",borderRadius:"10px",padding:"14px 18px",marginBottom:"20px",display:"flex",gap:"12px",alignItems:"flex-start"}}>
                <div style={{fontSize:"20px",lineHeight:1,flexShrink:0,marginTop:"2px"}}>&#9729;</div>
                <div style={{fontSize:"12px",color:"#5A6A7A",lineHeight:1.65}}>
                  <span style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:"2px",color:T.slate,display:"block",marginBottom:"5px"}}>OVERHANG & EXPOSURE</span>
                  Min. <strong>24" overhang</strong> required for most exterior doors. Wood and clad-wood need more — check the install manual. <strong>Fiberglass and steel</strong> are most tolerant of direct exposure; <strong>wood</strong> requires the most protection. Warranty claims in exposed conditions are routinely denied.
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(420px,1fr))",gap:"14px"}}>
                {exteriorDoorTypes.map(d=><DoorTypeCard key={d.id} door={d} type="exterior"/>)}
              </div>
            </div>
          )}

          {doorTypeTab==="interior"&&(
            <div>
              <div style={{marginBottom:"20px"}}>
                <SectionLabel color={T.teal}>INTERIOR DOOR TYPES</SectionLabel>
                <p style={{margin:0,fontSize:"13px",color:T.muted,maxWidth:"600px",lineHeight:1.65}}>Interior doors define the finish quality of a home. From budget moulded panels to fully custom router-carved statement pieces, the right door depends on architecture, budget, and whether the client wants paint or stain grade.</p>
              </div>
              <PaintStainGuide/>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(420px,1fr))",gap:"14px"}}>
                {interiorDoorTypes.map(d=><DoorTypeCard key={d.id} door={d} type="interior"/>)}
              </div>

              {/* ── POCKET DOOR DEEP DIVE ── */}
              <div style={{marginTop:"36px",marginBottom:"16px"}}>
                <SectionLabel color={T.plum}>INTERIOR POCKET DOORS & FRAMES</SectionLabel>
                <p style={{margin:"0 0 20px",fontSize:"13px",color:T.muted,maxWidth:"700px",lineHeight:1.65}}>Pocket doors are one of the most misunderstood interior products in residential construction. Getting the frame right at rough-in is everything {"—"} the door panel itself is the easy part.</p>
              </div>

              {/* How it works + warning card */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(260px,100%),1fr))",gap:"14px",marginBottom:"14px"}}>
                <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"12px",padding:"20px"}}>
                  <div style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:"1.5px",color:T.plum,marginBottom:"10px"}}>HOW IT WORKS</div>
                  <p style={{margin:"0 0 10px",fontSize:"12px",color:T.text,lineHeight:1.75}}>A pocket door frame (also called a pocket kit) is a metal stud-and-track assembly installed inside the wall during rough framing. The door panel hangs from overhead rollers on a top track and slides horizontally into the cavity. A bottom floor guide keeps the door from swinging while in the pocket.</p>
                  <p style={{margin:0,fontSize:"12px",color:T.text,lineHeight:1.75}}>Because the kit lives inside the wall, it must be specified and installed before drywall. You cannot add a pocket door to an existing finished wall without opening it entirely. This makes frame selection a one-time decision with long-term consequences.</p>
                </div>
                <div style={{background:"#FFF7F0",border:`2px solid ${T.rust}`,borderRadius:"12px",padding:"20px"}}>
                  <div style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:"1.5px",color:T.rust,marginBottom:"10px"}}>CRITICAL INSTALLATION ADVICE</div>
                  <p style={{margin:"0 0 10px",fontSize:"12px",color:T.text,lineHeight:1.75,fontWeight:600}}>Never spec the cheapest pocket frame. Always upgrade to a reinforced heavy-duty mid-grade frame or better.</p>
                  <p style={{margin:"0 0 10px",fontSize:"12px",color:T.text,lineHeight:1.75}}>Standard-grade pocket kits use lighter gauge metal that is prone to bowing and warping over time — especially with heavier door panels (solid core, solid wood, oversized). Once a pocket frame bows, the door binds, jumps the track, or stops seating properly when closed.</p>
                  <p style={{margin:0,fontSize:"12px",color:T.rust,lineHeight:1.75,fontWeight:600}}>Replacing a pocket frame requires tearing open the entire wall, removing drywall, patching, repainting, and re-trimming. The labor cost of a frame replacement far exceeds the cost difference between standard and heavy-duty at initial install. Invest correctly the first time.</p>
                </div>
              </div>

              {/* Frame grade comparison */}
              <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"12px",padding:"20px",marginBottom:"14px"}}>
                <div style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:"1.5px",color:T.plum,marginBottom:"14px"}}>FRAME GRADE COMPARISON</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px"}}>
                  {[
                    {grade:"Standard / Budget",price:"$",color:T.muted,who:"Johnson Hardware basic, generic box store kits",pros:["Lowest cost","Available at any lumber yard","Fine for hollow-core light doors"],cons:["Light gauge metal — prone to bowing","Not rated for heavy or oversized panels","Track can warp under load over time","Frame replacement is expensive — avoid this outcome"],verdict:"Acceptable only for light hollow-core interior doors in low-traffic locations. Not recommended for solid core, solid wood, or any door over 24 lbs."},
                    {grade:"Mid-Grade Reinforced",price:"$$",color:T.teal,who:"Johnson Hardware heavy-duty, Häfele, Cavity Slider",pros:["Heavier gauge steel — resists bowing","Rated for solid core and solid wood panels","Better track quality — smoother long-term operation","The recommended minimum for any quality installation"],cons:["Moderately more expensive than basic","Requires correct rough opening sizing"],verdict:"The recommended standard for all quality residential construction. Handles solid core, solid wood, and panels up to standard 8ft height reliably."},
                    {grade:"Premium / Commercial",price:"$$$",color:T.gold,who:"Cavity Slider, Häfele Pro, EL&EL heavy-duty",pros:["Commercial-grade steel — virtually zero flex","Handles oversized and very heavy panels","Soft-close integrated or field-installed","Best long-term investment on luxury builds"],cons:["Higher upfront cost","May require professional installer specification"],verdict:"The right choice for oversized doors, high-frequency use, solid wood statement panels, and any luxury build where long-term performance is expected."},
                  ].map(f=>(
                    <div key={f.grade} style={{background:`${f.color}08`,border:`1px solid ${f.color}25`,borderRadius:"8px",padding:"14px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
                        <span style={{fontSize:"10px",fontWeight:700,color:f.color,fontFamily:"monospace"}}>{f.grade}</span>
                        <span style={{fontSize:"12px",color:f.color,fontWeight:700}}>{f.price}</span>
                      </div>
                      <div style={{fontSize:"10px",color:T.muted,marginBottom:"8px",fontStyle:"italic"}}>{f.who}</div>
                      {f.pros.map((p,i)=><div key={i} style={{display:"flex",gap:"5px",marginBottom:"3px"}}><span style={{color:f.color,fontSize:"9px",marginTop:"2px"}}>+</span><span style={{fontSize:"10px",color:T.text,lineHeight:1.4}}>{p}</span></div>)}
                      <div style={{margin:"8px 0 4px",height:"1px",background:T.border}}/>
                      {f.cons.map((c,i)=><div key={i} style={{display:"flex",gap:"5px",marginBottom:"3px"}}><span style={{color:T.muted,fontSize:"9px",marginTop:"2px"}}>{"\u2013"}</span><span style={{fontSize:"10px",color:T.muted,lineHeight:1.4}}>{c}</span></div>)}
                      <div style={{marginTop:"10px",padding:"8px",background:`${f.color}10`,borderRadius:"6px"}}>
                        <div style={{fontSize:"10px",color:f.color,lineHeight:1.5,fontWeight:600}}>{f.verdict}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frame manufacturers */}
              <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"12px",padding:"20px",marginBottom:"14px"}}>
                <div style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:"1.5px",color:T.plum,marginBottom:"14px"}}>POCKET FRAME MANUFACTURERS</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"12px"}}>
                  {[
                    {name:"Johnson Hardware",grade:"Standard to Heavy-Duty",color:T.slate,desc:"The most widely distributed pocket door frame brand in North America. Available at most lumber yards and building supply houses. Their 1500 Series standard frame is common on production builds; the 2000 and Commercial series step up to heavier gauge for quality installations. Johnson is the baseline — specify the right series for the job.",recommended:"2000 Series or above for solid core and solid wood panels.",available:"Widely available through Dixieline and local lumber yards."},
                    {name:"Cavity Slider",grade:"Mid-Grade to Premium",color:T.teal,desc:"A specialist pocket door frame brand with a strong reputation among custom builders and finish carpenters. Cavity Slider frames use heavier gauge steel, have cleaner track systems, and are engineered specifically for smooth long-term performance. Their Triumph and Jumbo series handle oversized and heavy panels well. Less commonly stocked than Johnson — may require order.",recommended:"Triumph or Jumbo series for luxury residential and oversized openings.",available:"Order through specialty hardware suppliers; ask about Dixieline availability."},
                    {name:"EL&EL Wood Products",grade:"Premium Custom",color:T.sage,desc:"EL&EL brings their custom wood products expertise to pocket door systems. Where Johnson and Cavity Slider are metal-frame kit systems, EL&EL offers premium wood-trimmed pocket door assemblies suited to high-end finish work. Best when the pocket door needs to integrate seamlessly with custom millwork, paneling, or high-end trim packages. A luxury option for statement installations.",recommended:"For luxury custom builds where the pocket door is a design feature, not just a functional element.",available:"Through EL&EL — specify with your millwork package."},
                    {name:"H\u00e4fele",grade:"Mid-Grade to Premium",color:T.gold,desc:"H\u00e4fele is a German hardware manufacturer known for quality architectural hardware and specialty systems. Their pocket door kits are well-engineered, come with integrated soft-close options, and are specified frequently on European-influenced luxury builds and contemporary homes. H\u00e4fele hardware is widely used in high-end kitchen and cabinet work, so specifying their pocket system means consistent hardware language throughout the project.",recommended:"When soft-close is required or when the project uses H\u00e4fele hardware elsewhere for consistency.",available:"Through architectural hardware suppliers and specialty distributors."},
                  ].map(m=>(
                    <div key={m.name} style={{border:`1px solid ${m.color}30`,borderRadius:"10px",padding:"14px",background:`${m.color}06`}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"4px"}}>
                        <span style={{fontWeight:700,fontSize:"12px",color:m.color}}>{m.name}</span>
                        <span style={{fontSize:"9px",fontFamily:"monospace",color:T.muted,textAlign:"right",maxWidth:"100px",lineHeight:1.3}}>{m.grade}</span>
                      </div>
                      <p style={{margin:"6px 0 8px",fontSize:"11px",color:T.text,lineHeight:1.65}}>{m.desc}</p>
                      <div style={{fontSize:"10px",color:m.color,marginBottom:"4px",fontWeight:600}}>{m.recommended}</div>
                      <div style={{fontSize:"10px",color:T.muted,fontStyle:"italic"}}>{m.available}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware + door panel note */}
              <div style={{background:`${T.plum}08`,border:`1px solid ${T.plum}25`,borderRadius:"12px",padding:"18px"}}>
                <div style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:"1.5px",color:T.plum,marginBottom:"8px"}}>HARDWARE & DOOR PANEL NOTES</div>
                <p style={{margin:"0 0 8px",fontSize:"12px",color:T.text,lineHeight:1.75}}>Pocket doors cannot use standard knobs or levers — the door sits flush with the wall face when closed. Specify recessed edge pulls (flush with the door face) and a recessed privacy latch or passage set. Emtek, Rocky Mountain Hardware, and Baldwin all make quality pocket door hardware. Emtek is the most widely available in San Diego at multiple price points.</p>
                <p style={{margin:0,fontSize:"12px",color:T.text,lineHeight:1.75}}>For door panels: TM Cobb paint-grade shaker is the most specified pocket door panel in SD luxury remodels. Masonite and Simpson offer solid-core and solid wood options. For heavy solid wood panels (over 40 lbs), always confirm panel weight compatibility with the pocket frame before specifying.</p>
              </div>
            </div>
          )}

          {doorTypeTab==="operation"&&(
            <div>
              <div style={{marginBottom:"20px"}}>
                <SectionLabel color={T.gold}>DOOR OPERATION TYPES</SectionLabel>
                <p style={{margin:0,fontSize:"13px",color:T.muted,maxWidth:"660px",lineHeight:1.65}}>How a door operates is separate from what it{"'"}s made of. Swing, slide, fold, or disappear into a wall {"—"} each operation type has a different space requirement, aesthetic, and best use. This guide covers all the interior door types you{"'"}ll find in a home.</p>
              </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(440px,100%),1fr))",gap:"14px"}}>
                  {interiorDoorOperations.map(op=>{
                    const isOpen=openOp===op.id;
                    return (
                      <div key={op.id} style={{background:T.card,border:`1px solid ${isOpen?op.color:T.border}`,borderRadius:"12px",overflow:"hidden",transition:"border-color 0.2s"}}>
                        {/* Header */}
                        <div onClick={()=>setOpenOp(isOpen?null:op.id)} style={{padding:"18px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:"14px"}}>
                          <div style={{width:"40px",height:"40px",borderRadius:"8px",background:`${op.color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"18px",color:op.color,fontFamily:"monospace",border:`1px solid ${op.color}30`}}>
                            {op.id==="utility"?(
                              <svg width="28" height="28" viewBox="0 0 28 28">
                                {/* door frame */}
                                <rect x="5" y="3" width="18" height="22" rx="1" fill="none" stroke={op.color} strokeWidth="1.5" opacity="0.8"/>
                                {/* louvered slats — angled lines suggesting ventilation */}
                                {[7,10,13,16,19].map(y=>(
                                  <line key={y} x1="7" y1={y} x2="21" y2={y+2} stroke={op.color} strokeWidth="1.3" opacity="0.75" strokeLinecap="round"/>
                                ))}
                                {/* door knob */}
                                <circle cx="19" cy="14" r="1.2" fill={op.color} opacity="0.7"/>
                              </svg>
                            ):op.id==="barn"?(
                              <svg width="28" height="28" viewBox="0 0 28 28">
                                {/* rail */}
                                <rect x="2" y="5" width="24" height="2.5" rx="1.2" fill={op.color} opacity="0.85"/>
                                {/* left wheel */}
                                <circle cx="7" cy="5" r="2.2" fill="none" stroke={op.color} strokeWidth="1.4"/>
                                <circle cx="7" cy="5" r="0.7" fill={op.color}/>
                                {/* right wheel */}
                                <circle cx="21" cy="5" r="2.2" fill="none" stroke={op.color} strokeWidth="1.4"/>
                                <circle cx="21" cy="5" r="0.7" fill={op.color}/>
                                {/* door panel */}
                                <rect x="4" y="9" width="20" height="16" rx="1" fill="none" stroke={op.color} strokeWidth="1.5" opacity="0.8"/>
                                {/* door handle */}
                                <rect x="18" y="16" width="1.2" height="4" rx="0.6" fill={op.color} opacity="0.7"/>
                              </svg>
                            ):op.id==="french"?(
                              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                {/* outer door frame */}
                                <rect x="2" y="2" width="24" height="24" rx="1" fill="none" stroke={op.color} strokeWidth="1.5" opacity="0.65"/>
                                {/* center mullion — where doors meet when closed */}
                                <line x1="14" y1="2" x2="14" y2="26" stroke={op.color} strokeWidth="1" opacity="0.35" strokeDasharray="2 1.5"/>
                                {/* LEFT panel — hinged on left jamb, swinging out-left (foreshortened parallelogram) */}
                                <path d="M 2,3 L 11,6 L 11,22 L 2,25 Z" fill={`${op.color}20`} stroke={op.color} strokeWidth="1.3"/>
                                {/* left knob — on free edge of left panel */}
                                <circle cx="10" cy="14" r="1.2" fill={op.color} opacity="0.9"/>
                                {/* left hinge marks */}
                                <line x1="2" y1="7" x2="4" y2="7.5" stroke={op.color} strokeWidth="1" opacity="0.6" strokeLinecap="round"/>
                                <line x1="2" y1="21" x2="4" y2="21.5" stroke={op.color} strokeWidth="1" opacity="0.6" strokeLinecap="round"/>
                                {/* left swing arc */}
                                <path d="M 11,6 A 9.5 9.5 0 0 0 2.5,3" stroke={op.color} strokeWidth="1.1" strokeDasharray="1.8 1.3" strokeLinecap="round" opacity="0.6"/>
                                {/* left arc arrowhead */}
                                <polyline points="4.5,2.2 2.2,3.2 3.5,5.5" fill="none" stroke={op.color} strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" opacity="0.75"/>
                                {/* RIGHT panel — hinged on right jamb, swinging out-right (mirror) */}
                                <path d="M 26,3 L 17,6 L 17,22 L 26,25 Z" fill={`${op.color}20`} stroke={op.color} strokeWidth="1.3"/>
                                {/* right knob */}
                                <circle cx="18" cy="14" r="1.2" fill={op.color} opacity="0.9"/>
                                {/* right hinge marks */}
                                <line x1="26" y1="7" x2="24" y2="7.5" stroke={op.color} strokeWidth="1" opacity="0.6" strokeLinecap="round"/>
                                <line x1="26" y1="21" x2="24" y2="21.5" stroke={op.color} strokeWidth="1" opacity="0.6" strokeLinecap="round"/>
                                {/* right swing arc */}
                                <path d="M 17,6 A 9.5 9.5 0 0 1 25.5,3" stroke={op.color} strokeWidth="1.1" strokeDasharray="1.8 1.3" strokeLinecap="round" opacity="0.6"/>
                                {/* right arc arrowhead */}
                                <polyline points="23.5,2.2 25.8,3.2 24.5,5.5" fill="none" stroke={op.color} strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" opacity="0.75"/>
                              </svg>
                            ):op.id==="pocket"?(
                              <svg width="28" height="28" viewBox="0 0 28 28">
                                {/* pocket cavity — dotted frame */}
                                <rect x="13" y="4" width="13" height="20" rx="1" fill="none" stroke={op.color} strokeWidth="1.4" strokeDasharray="2.2 1.8" opacity="0.6"/>
                                {/* door panel sliding in from the left */}
                                <rect x="3" y="4" width="12" height="20" rx="1" fill={`${op.color}18`} stroke={op.color} strokeWidth="1.5" opacity="0.9"/>
                                {/* door handle on trailing edge */}
                                <rect x="4.5" y="13" width="1.2" height="3.5" rx="0.6" fill={op.color} opacity="0.8"/>
                                {/* motion arrow */}
                                <line x1="9" y1="14" x2="13.5" y2="14" stroke={op.color} strokeWidth="1" opacity="0.5" strokeDasharray="1.5 1"/>
                              </svg>
                            ):op.id==="dutch"?(
                              <svg width="28" height="28" viewBox="0 0 28 28">
                                {/* outer door frame */}
                                <rect x="5" y="3" width="18" height="22" rx="1" fill="none" stroke={op.color} strokeWidth="1.5" opacity="0.8"/>
                                {/* horizontal split line */}
                                <line x1="5" y1="13.5" x2="23" y2="13.5" stroke={op.color} strokeWidth="1.5" opacity="0.9"/>
                                {/* top half window — small inset rect */}
                                <rect x="8" y="5.5" width="12" height="6" rx="0.8" fill={`${op.color}20`} stroke={op.color} strokeWidth="1" opacity="0.8"/>
                                {/* bottom knob */}
                                <circle cx="19.5" cy="19" r="1.4" fill={op.color} opacity="0.8"/>
                                {/* top lock / thumb turn */}
                                <rect x="18.5" y="10" width="2" height="2.5" rx="0.5" fill={op.color} opacity="0.75"/>
                              </svg>
                            ):op.id==="swing"?(
                              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                {/* outer door frame */}
                                <rect x="3" y="2" width="18" height="24" rx="1" fill="none" stroke={op.color} strokeWidth="1.5" opacity="0.7"/>
                                {/* door panel — shown swung open ~50°, foreshortened, hinged left */}
                                {/* panel as a parallelogram: top-left at hinge (3,3), swings right and into depth */}
                                <path d="M 3,3 L 14,5 L 14,23 L 3,25 Z" fill={`${op.color}20`} stroke={op.color} strokeWidth="1.3" opacity="0.9"/>
                                {/* lockset / knob on free edge of panel */}
                                <circle cx="12.5" cy="14.5" r="1.3" fill={op.color} opacity="0.9"/>
                                {/* hinge marks on left jamb */}
                                <line x1="3" y1="7" x2="5.5" y2="7.4" stroke={op.color} strokeWidth="1.1" opacity="0.6" strokeLinecap="round"/>
                                <line x1="3" y1="21" x2="5.5" y2="21.4" stroke={op.color} strokeWidth="1.1" opacity="0.6" strokeLinecap="round"/>
                                {/* swing arc from free corner to closed position */}
                                <path d="M 14,5 A 11.2 11.2 0 0 1 21,3" stroke={op.color} strokeWidth="1.2" strokeDasharray="2 1.5" strokeLinecap="round" opacity="0.65"/>
                                {/* arrowhead at arc end */}
                                <polyline points="19,2.2 21.2,3.2 20,5.2" fill="none" stroke={op.color} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" opacity="0.8"/>
                              </svg>
                            ):op.id==="sliding"?(
                              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                {/* track rail top */}
                                <rect x="2" y="4" width="24" height="2" rx="1" fill={op.color} opacity="0.45"/>
                                {/* track rail bottom */}
                                <rect x="2" y="22" width="24" height="2" rx="1" fill={op.color} opacity="0.45"/>
                                {/* back panel — left, faded */}
                                <rect x="3" y="6" width="13" height="16" rx="0.5" fill="none" stroke={op.color} strokeWidth="1.2" opacity="0.35"/>
                                {/* front panel — right, overlapping, the one in motion */}
                                <rect x="12" y="6" width="13" height="16" rx="0.5" fill={`${op.color}18`} stroke={op.color} strokeWidth="1.5"/>
                                {/* handle on front panel */}
                                <rect x="13.5" y="12.5" width="1.2" height="4" rx="0.6" fill={op.color} opacity="0.85"/>
                                {/* rightward motion arrow on front panel */}
                                <line x1="17.5" y1="14" x2="22.5" y2="14" stroke={op.color} strokeWidth="1.3" strokeLinecap="round"/>
                                <polyline points="20,11.5 23,14 20,16.5" fill="none" stroke={op.color} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round"/>
                              </svg>
                            ):op.id==="bifold"?(
                              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                {/* top track */}
                                <rect x="2" y="4" width="24" height="1.8" rx="0.9" fill={op.color} opacity="0.45"/>
                                {/* bottom track */}
                                <rect x="2" y="22.2" width="24" height="1.8" rx="0.9" fill={op.color} opacity="0.45"/>
                                {/* left jamb pin */}
                                <circle cx="3.5" cy="5" r="1.2" fill={op.color} opacity="0.6"/>
                                {/* right jamb pin */}
                                <circle cx="24.5" cy="5" r="1.2" fill={op.color} opacity="0.6"/>
                                {/* left pair: panel A (attached to left jamb) */}
                                <rect x="3" y="6" width="5.5" height="16" rx="0.5" fill={`${op.color}20`} stroke={op.color} strokeWidth="1.4"/>
                                {/* left pair: panel B (folds toward center) */}
                                <rect x="9.5" y="6" width="5.5" height="16" rx="0.5" fill={`${op.color}10`} stroke={op.color} strokeWidth="1.2" opacity="0.7"/>
                                {/* left hinge pivot dot */}
                                <circle cx="9.2" cy="14" r="1.4" fill={op.color} opacity="0.8"/>
                                {/* right pair: panel C (folds toward center) */}
                                <rect x="13" y="6" width="5.5" height="16" rx="0.5" fill={`${op.color}10`} stroke={op.color} strokeWidth="1.2" opacity="0.7"/>
                                {/* right pair: panel D (attached to right jamb) */}
                                <rect x="19.5" y="6" width="5.5" height="16" rx="0.5" fill={`${op.color}20`} stroke={op.color} strokeWidth="1.4"/>
                                {/* right hinge pivot dot */}
                                <circle cx="18.8" cy="14" r="1.4" fill={op.color} opacity="0.8"/>
                                {/* left fold arrow — panels accordion toward left */}
                                <polyline points="11.5,11 9,14 11.5,17" fill="none" stroke={op.color} strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" opacity="0.65"/>
                                {/* right fold arrow — mirror */}
                                <polyline points="16.5,11 19,14 16.5,17" fill="none" stroke={op.color} strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" opacity="0.65"/>
                              </svg>
                            ):(
                              <span style={{fontSize:"18px"}}>{op.icon}</span>
                            )}
                          </div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}>
                              <span style={{fontWeight:700,fontSize:"13px",color:T.text,fontFamily:"monospace",letterSpacing:"0.5px"}}>{op.label}</span>
                            </div>
                            <div style={{fontSize:"11px",color:T.muted,fontStyle:"italic"}}>{op.tagline}</div>
                          </div>
                          <div style={{fontSize:"18px",color:op.color,fontFamily:"monospace",flexShrink:0,transform:isOpen?"rotate(90deg)":"none",transition:"transform 0.2s"}}>{"›"}</div>
                        </div>

                        {/* Expanded */}
                        {isOpen&&(
                          <div style={{borderTop:`1px solid ${T.border}`,padding:"18px 20px 20px",display:"flex",flexDirection:"column",gap:"14px"}}>
                            <p style={{margin:0,fontSize:"12px",color:T.text,lineHeight:1.75}}>{op.blurb}</p>

                            <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:"12px"}}>
                              <div style={{background:`${op.color}08`,border:`1px solid ${op.color}20`,borderRadius:"8px",padding:"12px"}}>
                                <div style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:"1.5px",color:op.color,marginBottom:"8px"}}>ADVANTAGES</div>
                                {op.pros.map((p,i)=>(
                                  <div key={i} style={{display:"flex",gap:"6px",marginBottom:"5px",alignItems:"flex-start"}}>
                                    <span style={{color:op.color,fontSize:"10px",marginTop:"1px",flexShrink:0}}>{"+"}</span>
                                    <span style={{fontSize:"11px",color:T.text,lineHeight:1.5}}>{p}</span>
                                  </div>
                                ))}
                              </div>
                              <div style={{background:"#00000005",border:`1px solid ${T.border}`,borderRadius:"8px",padding:"12px"}}>
                                <div style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:"1.5px",color:T.muted,marginBottom:"8px"}}>LIMITATIONS</div>
                                {op.cons.map((c,i)=>(
                                  <div key={i} style={{display:"flex",gap:"6px",marginBottom:"5px",alignItems:"flex-start"}}>
                                    <span style={{color:T.muted,fontSize:"10px",marginTop:"1px",flexShrink:0}}>{"\u2013"}</span>
                                    <span style={{fontSize:"11px",color:T.muted,lineHeight:1.5}}>{c}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:"12px"}}>
                              <div>
                                <div style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:"1.5px",color:T.muted,marginBottom:"6px"}}>BEST FOR</div>
                                {op.bestFor.map((b,i)=>(
                                  <div key={i} style={{display:"flex",gap:"6px",marginBottom:"4px",alignItems:"flex-start"}}>
                                    <span style={{color:op.color,fontSize:"9px",marginTop:"2px",flexShrink:0}}>{"▸"}</span>
                                    <span style={{fontSize:"11px",color:T.text,lineHeight:1.5}}>{b}</span>
                                  </div>
                                ))}
                              </div>
                              <div>
                                <div style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:"1.5px",color:T.muted,marginBottom:"6px"}}>VARIATIONS</div>
                                {op.variants.map((v,i)=>(
                                  <div key={i} style={{display:"flex",gap:"6px",marginBottom:"4px",alignItems:"flex-start"}}>
                                    <span style={{color:T.dim,fontSize:"9px",marginTop:"2px",flexShrink:0}}>{"◦"}</span>
                                    <span style={{fontSize:"11px",color:T.muted,lineHeight:1.5}}>{v}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div style={{background:`${T.gold}10`,border:`1px solid ${T.gold}30`,borderRadius:"8px",padding:"12px"}}>
                              <div style={{fontSize:"9px",fontFamily:"monospace",letterSpacing:"1.5px",color:T.gold,marginBottom:"6px"}}>SAN DIEGO CONTEXT</div>
                              <p style={{margin:0,fontSize:"11px",color:T.text,lineHeight:1.65}}>{op.sdContext}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
            </div>
          )}
        </div>
      )}

      {/* ─── WINDOWS ─── */}
      {mainTab==="windows"&&(()=>{
        const windowNavItems=[
          {id:"frame_materials",label:"Frame Materials",icon:"◻",color:T.slate},
          {id:"operation_types",label:"Operation Types",icon:"↔",color:T.teal},
          {id:"finishes",label:"Finishes by Frame",icon:"◑",color:T.gold},
          {id:"glazing",label:"Glazing Options",icon:"⬡",color:T.sage},
          {id:"sd_specs",label:"SD Climate Guide",icon:"☀",color:T.rust},
        ];
        const active=windowNavItems.find(n=>n.id===windowSub)||windowNavItems[0];

        // ── FRAME MATERIALS data
        const frameMaterials=[
          {
            id:"vinyl",name:"Vinyl (uPVC)",icon:"◼",color:T.slate,
            tagline:"Best value in California. The most-installed window frame material in SD.",
            overview:"Extruded uPVC frames — thermally broken by design, zero painting, impervious to salt air. The dominant residential window material in San Diego at every price point.",
            pros:["Zero maintenance — never paint, stain, or seal","Excellent thermal performance — hollow chambers trap air","Impervious to moisture and coastal salt air","Most competitive price point","Lifetime warranties from major manufacturers","Available in black, white, bronze, tan from major brands"],
            cons:["Limited color options (typically 4–6 per brand)","Dark vinyl (especially black) can absorb heat and expand slightly in extreme temperatures","Sightlines slightly wider than aluminum — more frame visible","Cannot match custom or unusual colors","Lower perceived prestige vs. aluminum or wood for ultra-luxury"],
            sdNote:"Black vinyl (Milgard Trinsic) dominates SD luxury remodels. Slim sightlines read as architectural, not plastic. For coastal homes, vinyl outperforms aluminum-clad wood — no paint to fail, no metal to pit.",
            brands:["Milgard (Trinsic, Ultra, Tuscany)","Andersen (A-Series, 100 Series)","JELD-WEN","PlyGem"],
            priceRange:"$$ — Most competitive per unit",
          },
          {
            id:"fiberglass",name:"Fiberglass (Ultrex® / Pultruded)",icon:"◈",color:T.teal,
            tagline:"Strongest residential frame material. 8x stronger than vinyl. Paintable any color.",
            overview:"Pultruded glass fiber frames — 8× stronger than vinyl, paintable to any color, and dimensionally stable enough to maintain seals for decades. The right answer when vinyl can't be painted to a custom color.",
            pros:["Paintable to any color — unlimited color matching","8x stronger than vinyl at same thickness","Thinner sightlines than vinyl at equivalent strength","Dimensionally stable — minimal thermal expansion/contraction","Long-term durability — will not rot, corrode, or warp","Best seal longevity due to matched thermal expansion with glass"],
            cons:["Higher price than vinyl","Heavier than aluminum for large openings","Paint requires recoating eventually (unlike factory-applied vinyl color)","Fewer brands offer fiberglass vs. vinyl or aluminum"],
            sdNote:"The answer for coastal properties needing a custom paint color — RSF and La Jolla builds frequently need a specific exterior color to match stucco. Marvin Elevate and Milgard Ultra are both readily available through SD dealers.",
            brands:["Marvin (Elevate, Essential — Ultrex®)","Milgard (Ultra Series)","Andersen (A-Series Fibrex® composite)","Pella (Impervia)"],
            priceRange:"$$$ — Mid-premium",
          },
          {
            id:"aluminum",name:"Aluminum",icon:"⊟",color:T.gold,
            tagline:"Slimmest sightlines. Architectural-grade. Specify thermally broken for energy code.",
            overview:"Slimmest possible sightlines with the best frame-to-glass ratio of any material. Specify thermally broken — non-TB aluminum won't meet California Title 24.",
            pros:["Slimmest sightlines of any frame material — most glass visible","Extremely strong — suitable for large spans","Anodized or powder-coated — fade resistant, wide color range","Pairs naturally with contemporary and modern architecture","Long lifespan — structural integrity maintained indefinitely"],
            cons:["Thermally broken required for Title 24 — adds cost","Conducts heat/cold more than vinyl or fiberglass without thermal break","In direct salt-air (beachfront), powder coat can fail over time — specify marine-grade","Higher cost than vinyl","Heavy — large aluminum window units require careful installation"],
            sdNote:"Standard spec on modern and contemporary custom homes in La Jolla and RSF. Always specify thermally broken for permitted projects. For beachfront within 500ft of ocean, specify anodized (not powder-coated) or switch to fiberglass.",
            brands:["NanaWall (SL70, HS systems)","LaCantina (aluminum folding/slide)","Western Window Systems","Arcadia Custom","Fleetwood"],
            priceRange:"$$$$  — Premium to ultra-premium",
          },
          {
            id:"wood",name:"Wood Interior / Aluminum-Clad",icon:"",color:T.rust,
            tagline:"Warmth inside, weather protection outside. The architect's window for luxury residential.",
            overview:"Real wood interior stainable to match floors and millwork, aluminum-clad exterior that handles weather without painting. The architect's window for luxury residential.",
            pros:["Real wood interior — matches floors, millwork, and cabinetry","Aluminum exterior — weather-resistant without painting","Warmest aesthetic of any window type","Highest perceived luxury and craftsmanship","Custom interior stain colors available","Multiple wood species (pine, fir, oak, maple)"],
            cons:["Wood interior requires periodic care in humid environments","Heavier than vinyl or aluminum","Higher cost","Salt air can compromise aluminum clad over time in direct ocean exposure","Custom sizes and configurations add significant lead time"],
            sdNote:"The window for whole-house La Jolla and RSF projects where floors, cabinetry, and window frames are all specified to match. Marvin's coastal stainless hardware program handles La Jolla oceanfront without corrosion.",
            brands:["Marvin (Signature, Elevate — clad wood)","Andersen (E-Series — alum-clad Fibrex®)","LaCantina (Clad Wood folding)","Pella (Architect Series)"],
            priceRange:"$$$$–$$$$$ — Luxury",
          },
          {
            id:"composite",name:"Composite & Fibrex®",icon:"⊕",color:T.sage,
            tagline:"Engineered hybrid. Better than vinyl, more affordable than fiberglass.",
            overview:"Wood fiber + thermoplastic resin — stronger and more dimensionally stable than vinyl, paintable, and more affordable than fiberglass. Andersen's Fibrex® is the standout product in this category.",
            pros:["Paintable — wider color options than vinyl","Stronger and more dimensionally stable than standard vinyl","Won't rot, corrode, or require sealing","More affordable than fiberglass","Longer paint adhesion than wood — better exterior durability"],
            cons:["Fewer manufacturers offer true composite vs. vinyl or fiberglass","Not as strong as pultruded fiberglass","Paint still requires eventual recoating","Andersen Fibrex® is proprietary — only available in Andersen products"],
            sdNote:"Andersen Fibrex® is what makes the A-Series and 100-Series competitive against Milgard Trinsic. Bridges the gap between vinyl and full custom-color fiberglass cleanly.",
            brands:["Andersen (Fibrex® — A-Series, 100 Series)","Simonton","ProVia"],
            priceRange:"$$–$$$ — Mid range",
          },
        ];

        // ── OPERATION TYPES data
        const operationTypes=[
          {
            id:"casement",name:"Casement",icon:"casement",color:T.teal,
            tagline:"Hinged on the side. Opens outward like a door. Best ventilation of any operable window.",
            overview:"Hinged on one side, cranks outward. When fully open, the entire window area is unobstructed — the only window type that captures 100% of its opening as ventilation.",
            howItWorks:"A worm-gear crank at the sill pushes the sash outward on concealed friction hinges. Higher-end units use multi-point locking — one handle engages locks at multiple points simultaneously.",
            configurations:["Single — one sash, hinged left or right","Double — two sashes, fixed center post","French — two sashes, no center post, push-out only","Combination — casement + fixed center","Stacked — casement over awning"],
            bestFor:["Maximum ventilation","Coastal breeze capture","Contemporary and craftsman homes","Kitchens and hard-to-reach locations"],
            limitations:["Needs clear exterior swing space","Screen on interior","Not ideal in very windy exposures","French casement not available from all manufacturers"],
          },
          {
            id:"double_hung",name:"Double-Hung",icon:"double_hung",color:T.slate,
            tagline:"Both sashes slide. America's most familiar window. Tilts in for cleaning.",
            overview:"Two independently operable sashes slide vertically. Both can open simultaneously for top-and-bottom ventilation, and both tilt inward for cleaning without exterior access.",
            howItWorks:"Each sash rides in its own channel with spring or weight balancers that hold it at any position. A tilt-in mechanism releases the sash from its channel for cleaning without going outside.",
            configurations:["Standard — both sashes operable","Single-hung — lower sash only (lower cost)","Paired flanking a fixed center","Stacked for tall openings"],
            bestFor:["Traditional and craftsman homes","Upper floors — tilt-in for easy cleaning","Top-and-bottom adjustable ventilation","Works in almost any architectural style"],
            limitations:["Only 50% open at once","Heavy sightlines in contemporary settings","Balancers need maintenance over time"],
          },
          {
            id:"awning",name:"Awning",icon:"awning",color:T.gold,
            tagline:"Hinged at top. Opens ~30° outward from bottom. Rain-resistant ventilation.",
            overview:"Hinged at the top, cranks outward from the bottom ~25–30°. The angled sash sheds rain while still ventilating — the window you can leave open when it drizzles.",
            howItWorks:"A worm-gear crank at the sill or side pushes the bottom of the sash outward. Multi-point locks pull the sash tight against the frame when closed for a solid compression weather seal.",
            configurations:["Single — standalone in high or narrow openings","Under picture — ventilation below a fixed view window","Stacked — graduated ventilation on a tall wall","Over casement — combined unit"],
            bestFor:["High wall placement for privacy + ventilation","Bathrooms and utility rooms","Coastal — can stay open in light rain","Contemporary stacked configurations"],
            limitations:["Limited airflow vs. casement","Not egress-rated in most configurations","Standard crank not for large/heavy sashes — use gas strut"],
          },
          {
            id:"gas_strut_awning",name:"Gas Strut Awning",icon:"gas_strut",color:T.ember,
            tagline:"Opens a full 90°. Large-format pass-through. No crank — push to open, gas holds it there.",
            overview:"Uses compressed gas struts instead of a crank — opens a full 90° and holds itself there with no operator needed. The technology behind kitchen pass-through windows and large-format openings.",
            howItWorks:"Heavy-duty gas struts between the fixed frame and sash extend when you push the sash outward, lifting and holding it at 90°. Light finger pressure opens or closes it — no crank, no handle.",
            configurations:["Single large panel — 4'–6' wide","Pass-through / serving window over a counter","Stacked pair for dramatic opening wall","Multiple side-by-side units"],
            bestFor:["Kitchen pass-through to patio or bar","Indoor-outdoor entertaining setups","Large ventilation in contemporary homes","Where a crank operator is impractical"],
            limitations:["Higher cost than standard awning","Gas struts need replacement every 10–15 years","4–8 week lead time — not stocked","Heavier sash requires robust header","Screen on interior only"],
            sdNote:"One of the hottest SD specs right now. A kitchen gas strut pass-through connecting to the patio bar — stools at the exterior sill — is a feature that sells homes in La Jolla, Del Mar, and RSF.",
          },
          {
            id:"sliding",name:"Sliding / Gliding",icon:"sliding",color:T.rust,
            tagline:"Sash glides horizontally. No crank mechanism. Simple and clean.",
            overview:"One or two sashes glide horizontally on a track. No crank — just grab and slide. Simple, clean, and space-efficient where outswing isn't possible.",
            howItWorks:"The operable sash rides on a bottom track guided by a top channel. Better units have ball-bearing rollers. A simple lever latch provides locking.",
            configurations:["2-lite — one fixed, one operable","3-lite XOX — two operable + fixed center","Tall slider — portrait orientation"],
            bestFor:["Contemporary and modern homes","Wide horizontal openings","Where outswing isn't possible","Beach and outdoor-facing rooms"],
            limitations:["Only 50% open at once","Track collects dirt and debris","Less weather-tight than casement"],
          },
          {
            id:"picture",name:"Picture / Fixed",icon:"picture",color:T.sage,
            tagline:"Non-operable. Maximum glass, minimum frame. The view window.",
            overview:"Fixed, non-operable. Maximum glass with minimum frame — the best thermal performance and thinnest sightlines of any window type. Always pair with operable units nearby for ventilation.",
            howItWorks:"The sash is glazed directly into the frame with no moving parts. Sizes are limited only by glass weight and structural support.",
            configurations:["Standard rectangle — any size","Custom shapes — arch, circle, trapezoid","Fixed center flanked by operable units","Floor-to-ceiling statement windows"],
            bestFor:["Primary view windows","Where ventilation isn't needed","Statement living room and bedroom windows","Contemporary and modern homes"],
            limitations:["No ventilation","Not egress-rated","Upper floors require exterior access to clean"],
          },
          {
            id:"bay_bow",name:"Bay & Bow",icon:"bay_bow",color:T.plum,
            tagline:"Projects outward from the wall. Creates interior depth and panoramic views.",
            overview:"Projects outward from the wall on three facets (bay) or a gentle curve (bow), adding 12\"–18\" of interior depth usable as a window seat or shelf. A structural addition requiring header support.",
            howItWorks:"The center unit is typically a picture or double-hung; side units are casement or double-hung, all joined by a structural head and seat board. The roof above requires its own treatment.",
            configurations:["30° bay — dramatic angular projection","45° bay — shallower, tighter spaces","Bow (4-unit) — gentle curve","Garden bay — kitchen herb window"],
            bestFor:["Traditional and craftsman homes","Window seats and interior depth","Panoramic views","Kitchens, breakfast nooks, and master bedrooms"],
            limitations:["Structural addition — requires permits","Higher cost","Roof treatment requires planning","Exterior cleaning can be difficult"],
          },
          {
            id:"specialty",name:"Specialty / Geometric",icon:"specialty",color:T.ember,
            tagline:"Circles, arches, triangles, trapezoids. Architectural accent windows.",
            overview:"Any non-rectangular shape — circles, arches, triangles, trapezoids. Fixed only, used as architectural accent elements above entries, in gable ends, or at stair landings.",
            howItWorks:"Each specialty window is manufactured to a specific template — custom-curved sashes or multi-piece assemblies. Installation requires a matching rough opening and custom trim.",
            configurations:["Half-round — above a door or window","Full circle / oculus — gable statement","Quarter-round — corner accent","Trapezoid — follows roofline in vaulted spaces","Triangle — gable end"],
            bestFor:["Entry door transoms","Gable end accents","Stair landings","Mediterranean and craftsman styles"],
            limitations:["Fixed only — no ventilation","Longer lead times","Custom trim required","Higher cost than standard units"],
          },
        ];

        // ── SVG operation illustrations
        function WinOpSVG({type,color}){
          const c=color||T.teal;
          const bg="#EEF4F2";
          const fr="#EEF4F0";
          const gl="#2A8A8030";
          const gls="#2A8A8050";
          const svgs={
            casement:(
              <svg viewBox="0 0 160 200" width="160" height="200">
                <rect width="160" height="200" fill={bg} rx="4"/>
                {/* outer thick frame */}
                <rect x="5" y="8" width="150" height="162" fill={gl} stroke={fr} strokeWidth="4" rx="1"/>
                {/* inner inset line */}
                <rect x="13" y="16" width="134" height="146" fill="none" stroke={fr} strokeWidth="1.5"/>
                {/* interior glass — full opening (ghost closed) */}
                <rect x="13" y="16" width="134" height="146" fill={gls} opacity="0.5"/>
                {/* ghost closed sash — dashed */}
                <rect x="19" y="22" width="122" height="134" fill={gl} stroke={c} strokeWidth="1" strokeDasharray="3,2" opacity="0.25"/>

                {/* === OPEN SASH — left-hinged, ~15° outswing === */}
                {/* Wider sash face — barely open, parallelogram */}
                <polygon points="19,22 110,14 110,162 19,156" fill={gl} stroke={fr} strokeWidth="2"/>
                {/* inner glass */}
                <polygon points="27,30 102,23 102,154 27,148" fill={gls} stroke={fr} strokeWidth="1"/>
                {/* reflection on sash glass */}
                <line x1="40" y1="42" x2="80" y2="60" stroke={fr} strokeWidth="1.5" opacity="0.4"/>
                <line x1="40" y1="56" x2="80" y2="74" stroke={fr} strokeWidth="1" opacity="0.22"/>

                {/* 3D edge — right side of sash showing depth */}
                <polygon points="110,14 120,18 120,158 110,162" fill={gl} stroke={fr} strokeWidth="1.2" opacity="0.7"/>
                {/* top edge depth */}
                <polygon points="19,22 110,14 120,18 19,26" fill={gl} stroke={fr} strokeWidth="1" opacity="0.5"/>

                {/* hinge indicator — lines from left hinge midpoint to top-right and bottom-right glass corners */}
                <line x1="27" y1="89" x2="102" y2="23" stroke={c} strokeWidth="1.8" opacity="0.7"/>
                <line x1="27" y1="89" x2="102" y2="154" stroke={c} strokeWidth="1.8" opacity="0.7"/>

                {/* outer perimeter lines */}
                <line x1="13" y1="16" x2="147" y2="16" stroke={fr} strokeWidth="1.5"/>
                <line x1="13" y1="162" x2="147" y2="162" stroke={fr} strokeWidth="1.5"/>
                <line x1="13" y1="16" x2="13" y2="162" stroke={fr} strokeWidth="1.5"/>
                <line x1="147" y1="16" x2="147" y2="162" stroke={fr} strokeWidth="1.5"/>

                <text x="80" y="186" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity="0.65">LEFT-HINGED OUTSWING</text>
              </svg>
            ),
            double_hung:(
              <svg viewBox="0 0 140 200" width="140" height="200">
                <rect width="140" height="200" fill={bg} rx="4"/>
                {/* outer thick frame */}
                <rect x="5" y="6" width="130" height="162" fill={gl} stroke={fr} strokeWidth="4" rx="1"/>
                {/* inner inset line */}
                <rect x="12" y="13" width="116" height="148" fill="none" stroke={fr} strokeWidth="1.5"/>
                {/* bottom panel fill — drawn first, behind */}
                <rect x="12" y="88" width="116" height="73" fill={gl}/>
                {/* bottom glass */}
                <rect x="24" y="100" width="92" height="49" fill={gls}/>
                {/* bottom panel — UP arrow, centered in bottom glass */}
                <line x1="70" y1="130" x2="70" y2="116" stroke={fr} strokeWidth="1.8" opacity="0.7"/>
                <polygon points="66,116 74,116 70,110" fill={fr} opacity="0.7"/>
                {/* top panel fill — drawn on top */}
                <rect x="12" y="13" width="116" height="81" fill={gl}/>
                {/* top glass */}
                <rect x="24" y="25" width="92" height="57" fill={gls}/>
                {/* top panel — DOWN arrow, centered in top glass */}
                <line x1="70" y1="48" x2="70" y2="62" stroke={fr} strokeWidth="1.8" opacity="0.7"/>
                <polygon points="66,62 74,62 70,68" fill={fr} opacity="0.7"/>
                {/* === explicit sash lines === */}
                {/* outer perimeter */}
                <line x1="12" y1="13" x2="128" y2="13" stroke={fr} strokeWidth="1.5"/>
                <line x1="12" y1="161" x2="128" y2="161" stroke={fr} strokeWidth="1.5"/>
                <line x1="12" y1="13" x2="12" y2="161" stroke={fr} strokeWidth="1.5"/>
                <line x1="128" y1="13" x2="128" y2="161" stroke={fr} strokeWidth="1.5"/>
                {/* top glass box */}
                <line x1="24" y1="25" x2="116" y2="25" stroke={fr} strokeWidth="1.2"/>
                <line x1="24" y1="82" x2="116" y2="82" stroke={fr} strokeWidth="1.2"/>
                <line x1="24" y1="25" x2="24" y2="82" stroke={fr} strokeWidth="1.2"/>
                <line x1="116" y1="25" x2="116" y2="82" stroke={fr} strokeWidth="1.2"/>
                {/* top panel bottom edge — the only center line */}
                <line x1="12" y1="94" x2="128" y2="94" stroke={fr} strokeWidth="1.5"/>
                {/* bottom glass box */}
                <line x1="24" y1="100" x2="116" y2="100" stroke={fr} strokeWidth="1.2"/>
                <line x1="24" y1="149" x2="116" y2="149" stroke={fr} strokeWidth="1.2"/>
                <line x1="24" y1="100" x2="24" y2="149" stroke={fr} strokeWidth="1.2"/>
                <line x1="116" y1="100" x2="116" y2="149" stroke={fr} strokeWidth="1.2"/>
                <text x="70" y="186" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity="0.65">BOTH SASHES SLIDE</text>
              </svg>
            ),
            awning:(
              <svg viewBox="0 0 210 148" width="210" height="148">
                <rect width="210" height="148" fill={bg} rx="4"/>

                {/* === FRAME — front face === */}
                <rect x="16" y="24" width="10" height="94" fill={gl} stroke={fr} strokeWidth="2"/>
                <rect x="184" y="24" width="10" height="94" fill={gl} stroke={fr} strokeWidth="2"/>
                <rect x="16" y="24" width="178" height="10" fill={gl} stroke={fr} strokeWidth="2"/>
                <rect x="16" y="118" width="178" height="10" fill={gl} stroke={fr} strokeWidth="2"/>
                <rect x="20" y="28" width="170" height="90" fill="none" stroke={fr} strokeWidth="1.2"/>

                {/* open gap at bottom 1/4 — shows through */}
                <rect x="26" y="96" width="158" height="22" fill={gls} opacity="0.5"/>

                {/* === SASH — covers top 3/4, bottom barely open === */}
                {/* slightly wider at bottom since it has swung toward viewer */}
                <polygon points="26,34 184,34 190,96 20,96" fill={gl} stroke={fr} strokeWidth="2"/>
                {/* inner glass face — more inset for thicker sash */}
                <polygon points="38,42 172,42 178,90 32,90" fill={gls} stroke={fr} strokeWidth="1"/>
                {/* reflection */}
                <line x1="50" y1="52" x2="70" y2="78" stroke={fr} strokeWidth="1.5" opacity="0.4"/>
                <line x1="64" y1="52" x2="84" y2="78" stroke={fr} strokeWidth="1" opacity="0.22"/>
                {/* 3D edge — underside of sash visible at bottom (sash tilted toward viewer) */}
                <polygon points="20,96 190,96 192,103 18,103" fill={gl} stroke={fr} strokeWidth="1.2" opacity="0.75"/>
                {/* 3D left side edge */}
                <polygon points="26,34 20,96 18,103 24,37" fill={gl} stroke={fr} strokeWidth="1" opacity="0.6"/>
                {/* 3D right side edge */}
                <polygon points="184,34 190,96 192,103 186,37" fill={gl} stroke={fr} strokeWidth="1" opacity="0.6"/>

                {/* === OPERATOR — single center arm with up arrow === */}
                <line x1="105" y1="118" x2="105" y2="96" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.75"/>
                <polygon points="101,100 109,100 105,94" fill={c} opacity="0.75"/>

                <text x="105" y="142" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity="0.65">TOP-HINGED — OPENS FROM BOTTOM</text>
              </svg>
            ),
            gas_strut_awning:(
              <svg viewBox="0 0 210 148" width="210" height="148">
                <rect width="210" height="148" fill={bg} rx="4"/>

                {/* === SASH — above frame, hinged at top rail, tilted outward past 90° === */}
                {/* Free end closer to viewer = wider at top, narrows at hinge */}
                <polygon points="16,56 194,56 202,22 8,22" fill={gl} stroke={fr} strokeWidth="2.5"/>
                {/* inner glass on sash face */}
                <polygon points="21,53 189,53 197,26 13,26" fill={gls} stroke={fr} strokeWidth="1"/>
                {/* reflection line on sash glass */}
                <line x1="38" y1="48" x2="62" y2="30" stroke={fr} strokeWidth="1.5" opacity="0.35"/>
                <line x1="50" y1="48" x2="74" y2="30" stroke={fr} strokeWidth="1" opacity="0.2"/>

                {/* handle at center top of sash */}
                <path d="M 98,22 Q 105,16 112,22" fill="none" stroke={fr} strokeWidth="2.5" strokeLinecap="round"/>

                {/* hinge line — frame top / sash bottom meeting point */}
                <rect x="16" y="54" width="178" height="5" fill={c} opacity="0.25"/>

                {/* === FRAME — front face === */}
                {/* left rail */}
                <rect x="16" y="56" width="10" height="68" fill={gl} stroke={fr} strokeWidth="2"/>
                {/* right rail */}
                <rect x="184" y="56" width="10" height="68" fill={gl} stroke={fr} strokeWidth="2"/>
                {/* bottom sill */}
                <rect x="16" y="124" width="178" height="10" fill={gl} stroke={fr} strokeWidth="2"/>
                {/* frame opening — interior */}
                <rect x="26" y="56" width="158" height="68" fill={gls} opacity="0.7"/>

                {/* === GAS STRUTS — one each side === */}
                {/* left strut: left rail mid-height → sash bottom-left corner */}
                <line x1="20" y1="98" x2="19" y2="48" stroke={c} strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
                <circle cx="20" cy="98" r="3.5" fill={c} opacity="0.85"/>
                <circle cx="19" cy="48" r="3.5" fill={c} opacity="0.85"/>

                {/* right strut: right rail mid-height → sash bottom-right corner */}
                <line x1="190" y1="98" x2="191" y2="48" stroke={c} strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
                <circle cx="190" cy="98" r="3.5" fill={c} opacity="0.85"/>
                <circle cx="191" cy="48" r="3.5" fill={c} opacity="0.85"/>

                {/* === COUNTER — full width === */}
                <rect x="0" y="134" width="210" height="10" fill={gl} stroke={fr} strokeWidth="1.5" opacity="0.8"/>
                <text x="105" y="141" textAnchor="middle" fill={c} fontSize="6" fontFamily="monospace" opacity="0.5">PASS-THROUGH COUNTER</text>

                <text x="105" y="146" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity="0">.</text>
              </svg>
            ),

            sliding:(
              <svg viewBox="0 0 200 140" width="200" height="140">
                <rect width="200" height="140" fill={bg} rx="4"/>
                {/* outer thick frame */}
                <rect x="5" y="8" width="190" height="124" fill={gl} stroke={fr} strokeWidth="4" rx="1"/>
                {/* inner inset line */}
                <rect x="12" y="15" width="176" height="110" fill="none" stroke={fr} strokeWidth="1.5"/>
                {/* right panel fill — drawn first, behind */}
                <rect x="91" y="15" width="97" height="110" fill={gl}/>
                {/* right glass — left sash hidden behind left panel */}
                <rect x="103" y="27" width="73" height="86" fill={gls}/>
                {/* right panel — reflection lines */}
                <line x1="118" y1="52" x2="140" y2="78" stroke={fr} strokeWidth="1.8" opacity="0.55"/>
                <line x1="128" y1="52" x2="150" y2="78" stroke={fr} strokeWidth="1.8" opacity="0.55"/>
                {/* left panel fill — drawn on top */}
                <rect x="12" y="15" width="91" height="110" fill={gl}/>
                {/* left glass */}
                <rect x="24" y="27" width="67" height="86" fill={gls}/>
                {/* left panel — reflection lines */}
                <line x1="32" y1="36" x2="54" y2="62" stroke={fr} strokeWidth="1.8" opacity="0.55"/>
                <line x1="42" y1="36" x2="64" y2="62" stroke={fr} strokeWidth="1.8" opacity="0.55"/>
                {/* left panel — arrow */}
                <line x1="34" y1="92" x2="62" y2="92" stroke={fr} strokeWidth="1.8" opacity="0.7"/>
                <polygon points="62,88 62,96 70,92" fill={fr} opacity="0.7"/>
                {/* === explicit sash lines === */}
                {/* outer perimeter */}
                <line x1="12" y1="15" x2="12" y2="125" stroke={fr} strokeWidth="1.5"/>
                <line x1="188" y1="15" x2="188" y2="125" stroke={fr} strokeWidth="1.5"/>
                <line x1="12" y1="15" x2="188" y2="15" stroke={fr} strokeWidth="1.5"/>
                <line x1="12" y1="125" x2="188" y2="125" stroke={fr} strokeWidth="1.5"/>
                {/* left glass box — full sash visible */}
                <line x1="24" y1="27" x2="91" y2="27" stroke={fr} strokeWidth="1.2"/>
                <line x1="24" y1="113" x2="91" y2="113" stroke={fr} strokeWidth="1.2"/>
                <line x1="24" y1="27" x2="24" y2="113" stroke={fr} strokeWidth="1.2"/>
                <line x1="91" y1="27" x2="91" y2="113" stroke={fr} strokeWidth="1.2"/>
                {/* left panel right outer edge — the only center line */}
                <line x1="103" y1="15" x2="103" y2="125" stroke={fr} strokeWidth="1.5"/>
                {/* right glass box — no left sash, glass starts at x=103 */}
                <line x1="103" y1="27" x2="176" y2="27" stroke={fr} strokeWidth="1.2"/>
                <line x1="103" y1="113" x2="176" y2="113" stroke={fr} strokeWidth="1.2"/>
                <line x1="176" y1="27" x2="176" y2="113" stroke={fr} strokeWidth="1.2"/>
                {/* right panel right outer edge */}
                <line x1="188" y1="15" x2="188" y2="125" stroke={fr} strokeWidth="1.5"/>
              </svg>
            ),

            picture:(
              <svg viewBox="0 0 120 100" width="120" height="100">
                <rect width="120" height="100" fill={bg} rx="4"/>
                {/* outer frame */}
                <rect x="10" y="8" width="100" height="84" rx="2" fill={gl} stroke={fr} strokeWidth="6"/>
                {/* inner sash */}
                <rect x="18" y="16" width="84" height="68" fill={gls} stroke={fr} strokeWidth="1.5"/>
                {/* mountain view silhouette */}
                <polygon points="22,72 46,42 62,57 80,32 100,72" fill={c} opacity="0.08"/>
                <rect x="18" y="72" width="84" height="12" fill={c} opacity="0.04"/>
                {/* glass reflection lines */}
                <line x1="32" y1="24" x2="55" y2="60" stroke={fr} strokeWidth="2" opacity="0.4"/>
                <line x1="43" y1="24" x2="66" y2="60" stroke={fr} strokeWidth="1.2" opacity="0.22"/>
                <text x="60" y="98" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity="0.6">FIXED {"\u2014"} NO OPERATION</text>
              </svg>
            ),
            bay_bow:(
              <svg viewBox="0 0 220 140" width="220" height="140">
                <rect width="220" height="140" fill={bg} rx="4"/>
                {/* outer wall frame */}
                <rect x="8" y="22" width="204" height="96" fill="none" stroke={fr} strokeWidth="2.5" rx="1"/>
                {/* left angled side panel — outer frame */}
                <polygon points="8,22 72,8 72,132 8,118" fill={gl} stroke={fr} strokeWidth="2.5"/>
                {/* left panel inner sash */}
                <polygon points="16,30 64,18 64,122 16,110" fill={gls} stroke={fr} strokeWidth="1.2"/>
                {/* right angled side panel — outer frame */}
                <polygon points="148,8 212,22 212,118 148,132" fill={gl} stroke={fr} strokeWidth="2.5"/>
                {/* right panel inner sash */}
                <polygon points="156,18 204,30 204,110 156,122" fill={gls} stroke={fr} strokeWidth="1.2"/>
                {/* center front panel — outer frame */}
                <rect x="72" y="8" width="76" height="124" fill={gl} stroke={fr} strokeWidth="2.5" rx="1"/>
                {/* center panel inner sash */}
                <rect x="80" y="16" width="60" height="108" fill={gls} stroke={fr} strokeWidth="1.2"/>
                {/* glass reflection lines on center panel */}
                <line x1="95" y1="32" x2="118" y2="76" stroke={fr} strokeWidth="2" opacity="0.4"/>
                <line x1="106" y1="32" x2="129" y2="76" stroke={fr} strokeWidth="1.2" opacity="0.22"/>
              </svg>
            ),
            specialty:(
              <svg viewBox="0 0 200 110" width="200" height="110">
                <rect width="200" height="110" fill={bg} rx="4"/>

                {/* ── ROUND / OCULUS ── centered at x=30 */}
                <circle cx="30" cy="46" r="22" fill={gl} stroke={fr} strokeWidth="3"/>
                <circle cx="30" cy="46" r="18" fill={gls}/>
                <text x="30" y="78" textAnchor="middle" fill={c} fontSize="6" fontFamily="monospace" opacity="0.65">ROUND</text>

                {/* ── TRIANGLE ── centered at x=100 */}
                <polygon points="100,12  130,72  70,72" fill={gl} stroke={fr} strokeWidth="3"/>
                <polygon points="100,17  125,68  75,68" fill={gls}/>
                <text x="100" y="82" textAnchor="middle" fill={c} fontSize="6" fontFamily="monospace" opacity="0.65">TRIANGLE</text>

                {/* ── RAKE — right trapezoid: left/bottom/right square, top diagonal ── */}
                <polygon points="148,22  188,68  148,68" fill="none"/>
                <polygon points="148,68  188,68  188,28  148,22" fill={gl} stroke={fr} strokeWidth="3"/>
                <polygon points="151,65  185,65  185,31  151,25" fill={gls}/>
                <text x="170" y="82" textAnchor="middle" fill={c} fontSize="6" fontFamily="monospace" opacity="0.65">RAKE</text>

                <text x="100" y="96" textAnchor="middle" fill={c} fontSize="6.5" fontFamily="monospace" opacity="0.5">SPECIALTY / GEOMETRIC</text>
              </svg>
            ),
          };
          return svgs[type]||null;
        }

        // ── FINISHES data
        const finishesData=[
          {
            material:"Vinyl",color:T.slate,
            intro:"Vinyl color is integral to the frame — it runs through the full profile and never needs repainting. The color selection is limited compared to other materials, but the major brands cover the most popular San Diego specifications.",
            finishTypes:[
              {name:"Factory White",detail:"The default and most widely available. Bright white interior and exterior. Pairs with white trim and traditional or transitional interiors. Not available in custom shades — it's standard white.",swatch:"#f0ede6"},
              {name:"Black (Black Satin / Matte Black)",detail:"The dominant SD luxury remodel specification right now. Milgard Trinsic black and Andersen A-Series black are both extremely popular. Interior and exterior are both black. Pairs with white or light interiors for a dramatic architectural contrast.",swatch:"#1A1A1A"},
              {name:"Bronze",detail:"Medium warm bronze — reads as dark brown with warm undertones. Traditional and craftsman character. Common in 1990s–2010s homes — still popular for matching existing windows in remodels.",swatch:"#3d2b1f"},
              {name:"Tan / Sandtone",detail:"A warm beige-tan — common in stucco-exterior homes throughout San Diego. Blends with beige or earth-toned stucco rather than contrasting against it. Practical and popular in Rancho Bernardo and Scripps Ranch tract homes.",swatch:"#8A6020"},
            ],
            sdGuidance:"The Milgard Trinsic black window is arguably the single most-specified window in SD luxury remodels. It reads slim and architectural — not plastic — because of the narrow sightline. For coastal properties, black vinyl is the maintenance-free alternative to black powder-coated aluminum.",
          },
          {
            material:"Fiberglass",color:T.teal,
            intro:"Fiberglass frames can be painted — the surface accepts paint adhesion far better than vinyl and holds paint longer than wood. This is the key differentiator: any Sherwin-Williams or Benjamin Moore color code can be applied to a fiberglass window.",
            finishTypes:[
              {name:"Factory White",detail:"Applied during manufacturing — the most common specification. Factory finishes on fiberglass have better adhesion and longevity than field-painted.",swatch:"#f0ede6"},
              {name:"Factory Black",detail:"Available from Milgard Ultra and Marvin Essential as a factory-applied black. More durable than field painting.",swatch:"#1A1A1A"},
              {name:"Custom Paint (Any Color)",detail:"The major advantage of fiberglass. Field painting by a painter is straightforward — fiberglass accepts latex and oil-based paints with a light sanding. Match to any Sherwin-Williams color. Marvin Elevate is available in Ultrex® factory colors or fully custom.",swatch:"linear-gradient(135deg,#4a8a7a,#c87a4a,#8fa8c8)"},
              {name:"Stain (Wood-Interior Units)",detail:"On aluminum-clad wood or fiberglass with wood interiors (Marvin Elevate), the interior can be stained in any color to match wood floors, beams, or millwork. The exterior is painted or factory-coated.",swatch:"#7a4a1a"},
            ],
            sdGuidance:"For RSF and La Jolla projects that need a specific exterior color to match a custom stucco palette, fiberglass with custom paint is the answer. A house with a custom exterior color needs a window that matches — vinyl can't do it, aluminum may not hold up in direct coastal exposure, but fiberglass handles both.",
          },
          {
            material:"Aluminum",color:T.gold,
            intro:"Aluminum frames are finished by powder coating (most common) or anodizing (preferred for coastal). Both processes are applied to the raw aluminum extrusion before or after fabrication. The color range is extensive.",
            finishTypes:[
              {name:"Powder Coat — Matte Black",detail:"The architectural standard for contemporary homes. Powder coat is a dry paint electrostatically applied and oven-cured — very durable inland. In direct salt air, powder coat can begin to chalk or pit over time. Best for homes 1+ miles from direct ocean.",swatch:"#1e1e1e"},
              {name:"Powder Coat — Custom Colors",detail:"Aluminum takes powder coat in virtually any color — standard RAL or custom match. NanaWall, LaCantina, and Andersen all offer extensive color libraries. Many architects specify a RAL code to match cladding, roofing, or door systems for a fully unified exterior.",swatch:"linear-gradient(135deg,#1a1a1a,#4a7a6a,#c9a84c)"},
              {name:"Anodized (Clear / Dark Bronze)",detail:"Anodizing electrochemically converts the aluminum surface to aluminum oxide — a ceramic-like finish that is integral to the metal (not a coating). Anodized finishes do not peel, chip, or corrode in salt air. The preferred specification for beachfront aluminum. Available in clear (silver), dark bronze, and black.",swatch:"#5a4030"},
              {name:"Dual Finish (Interior / Exterior)",detail:"Premium aluminum windows allow specifying different finishes for interior and exterior faces. Common application: black exterior (to match window wall) + white interior (to match drywall/trim). NanaWall and Andersen E-Series both offer dual-finish programs.",swatch:"linear-gradient(90deg,#1a1a1a 50%,#f0ede6 50%)"},
            ],
            sdGuidance:"For La Jolla beachfront, always specify anodized over powder coat for any aluminum element in direct ocean exposure — the 92037 ocean air is aggressive. Anodizing is meaningfully more expensive but eliminates the maintenance problem that powder coat creates in that environment. For homes a mile or more inland, powder coat performs fine.",
          },
          {
            material:"Aluminum-Clad Wood",color:T.rust,
            intro:"The split finish system: an aluminum exterior (powder-coated or factory-finished) handles weather exposure, while the interior wood surface is stained or painted to match interior finishes. This is the system that allows the interior of a window to perfectly match wood floors and millwork.",
            finishTypes:[
              {name:"Exterior — Factory Colors (Aluminum Clad)",detail:"The aluminum exterior clad is factory-finished in a range of colors. Marvin offers the broadest palette with 50+ Ultrex® colors and unlimited custom paint match. Andersen E-Series offers 50+ color options.",swatch:"#2a2a2a"},
              {name:"Interior — Natural Wood Stain",detail:"The wood interior (pine, fir, maple, or oak depending on manufacturer) is stained to any color — matching floors, millwork, cabinetry, or exposed beams. This is the defining visual feature of alum-clad wood windows.",swatch:"#a07040"},
              {name:"Interior — White or Custom Paint",detail:"The wood interior can be painted rather than stained — common in contemporary homes where a clean white interior is desired regardless of the exterior color. Painted interior is slightly easier to touch up than stained.",swatch:"#f0ede6"},
              {name:"Marvin Coastal Stainless Hardware",detail:"For oceanfront properties, Marvin's coastal stainless hardware program replaces all exposed hardware (handles, locks, hinges, fasteners) with marine-grade stainless steel. Standard hardware will corrode within a few years in direct salt air — the coastal program eliminates this.",swatch:"#a8aaaa"},
            ],
            sdGuidance:"The interior stain match is where the sale closes. Pull out the stain samples, get a piece of the client's floor material, and show them how the window interior stain matches the floor. When a client sees that the window frame and the hardwood floor are the same stain color, the project feels like a considered whole rather than an assembly of parts.",
          },
        ];

        // ── GLAZING OPTIONS (SD-specific)
        const glazingOptions=[
          {name:"Standard Low-E Double Pane",color:T.slate,detail:"The baseline for all SD residential windows. Low-E coating + argon fill meets Title 24 in both CZ7 and CZ10. This is what comes standard from all major manufacturers."},
          {name:"LoE-366 / High-Performance Low-E",color:T.teal,detail:"Triple-silver Low-E coating (Cardinal LoE-366 or equivalent) for maximum solar heat rejection with high visible transmittance. Spec this for west and south-facing elevations in SD's sunny climate."},
          {name:"i89 (Surface 4 Coating)",color:T.gold,detail:"Applied to the interior glass surface — improves U-factor without changing visible appearance. Recommended add-on for thermally broken aluminum windows to push Title 24 compliance."},
          {name:"Acoustic / STC-Rated Glass",color:T.sage,detail:"Acoustic laminated glass unit for freeway, flight path, and rail noise reduction. See the Glass Guide → Acoustic section for full STC detail."},
          {name:"Tempered Safety Glass",color:T.rust,detail:"Required in all windows within 18\" of the floor, within 24\" of a door, and in all windows in bathrooms. Standard from most manufacturers in these locations — confirm with your spec."},
          {name:"Laminated Glass",color:T.plum,detail:"For security, hurricane zones, and acoustic applications. Holds together when broken unlike tempered. Required in some skylights and high-wind zones."},
        ];

        // ── SD CLIMATE data
        const sdClimateItems=[
          {icon:"",title:"Solar Heat Gain (SHGC) in SD",color:T.gold,body:"San Diego is sunny year-round — solar heat gain is the primary energy concern, not cold-weather heat loss. Specify low SHGC (0.22–0.26) on south and west elevations to reduce AC load. East and north elevations can use a slightly higher SHGC (0.27–0.30) to allow morning warmth without afternoon overheating."},
          {icon:"",title:"Coastal Salt Air — Frame Selection",color:T.teal,body:"Within 500ft of direct ocean: specify anodized aluminum, fiberglass, or vinyl only. Powder-coated aluminum will begin to deteriorate. Aluminum-clad wood with marine-grade hardware (Marvin coastal stainless) is acceptable at this range. 500ft–1mi: powder coat is acceptable with periodic cleaning. Beyond 1mi: standard specifications apply."},
          {icon:"",title:"Elevation — Breather Tubes",color:T.slate,body:"Above 4,000ft (Julian at 4,235ft, Mt. Laguna at ~6,000ft, Pine Valley at ~3,900ft), IGU seals can be stressed by the pressure differential at elevation. Specify breather tubes on all double-pane IGUs for properties at or above 4,000ft. This is a commonly missed spec detail — most dealers need to be asked specifically."},
          {icon:"",title:"Fire Zone Glazing",color:T.rust,body:"FHSZ Very High properties require fire-rated glazing — tempered is not sufficient. Fire-rated laminated glass or ceramic glass is required in designated FHSZ zones. Check the CAL FIRE lookup before specifying standard glazing on any hillside or inland San Diego project."},
          {icon:"",title:"Title 24 (CZ7 vs CZ10)",color:T.sage,body:"San Diego County spans Climate Zone 7 (coastal) and Climate Zone 10 (inland/desert-transitional). CZ10 has stricter U-factor requirements. Most of San Diego proper (La Jolla, Coronado, Mission Hills) is CZ7. Ramona, El Cajon, Santee, and the eastern portions are CZ10. Confirm the climate zone before finalizing the glazing spec for any permitted project."},
          {icon:"",title:"Standard SD Window Spec",color:T.plum,body:"For a typical San Diego residential project in CZ7: Double-pane IGU · Argon fill · Low-E (LoE-272 or LoE-366) · U-factor ≤ 0.30 · SHGC ≤ 0.23 · Thermally broken frame (aluminum) or vinyl/fiberglass. This spec meets code, performs well in the mild climate, and is available from every major vendor without premium pricing."},
        ];

        return (
          <div className="sidebar-layout" style={{animation:"fadeUp 0.25s ease"}}>
            {/* Left nav */}
            <div className="sidebar-nav" style={{width:"200px"}}>
              <div style={{fontSize:"9px",letterSpacing:"3px",color:T.faint,fontFamily:"monospace",padding:"12px 18px",whiteSpace:"nowrap"}} className="sidebar-label">WINDOW GUIDE</div>
              {windowNavItems.map(n=>(
                <button key={n.id} onClick={()=>setWindowSub(n.id)} style={{display:"block",width:"100%",textAlign:"left",background:windowSub===n.id?`${n.color}12`:"none",border:"none",borderLeft:`3px solid ${windowSub===n.id?n.color:"transparent"}`,padding:"13px 18px",cursor:"pointer",transition:"all 0.15s"}}>
                  <div className="sidebar-icon" style={{fontSize:"18px",color:windowSub===n.id?n.color:"#333333",marginBottom:"4px"}}>{n.icon}</div>
                  <div className="sidebar-label" style={{fontSize:"11px",color:windowSub===n.id?n.color:T.dim,letterSpacing:"1px",lineHeight:1.3}}>{n.label}</div>
                </button>
              ))}
            </div>

            {/* Main content */}
            <div className="sidebar-content" key={windowSub}>

              {/* ══ FRAME MATERIALS ══ */}
              {windowSub==="frame_materials"&&(
                <div>
                  <div style={{background:`${T.slate}0e`,border:`1px solid ${T.slate}33`,borderRadius:"12px",padding:"22px 26px",marginBottom:"24px"}}>
                    <div style={{fontSize:"9px",letterSpacing:"4px",color:T.slate,fontFamily:"monospace",marginBottom:"6px"}}>WINDOW GUIDE</div>
                    <div style={{fontSize:"22px",fontWeight:400,marginBottom:"6px"}}>Frame <em style={{color:T.slate}}>Materials</em></div>
                    <p style={{margin:0,fontSize:"13px",color:T.muted,lineHeight:1.75,maxWidth:"720px"}}>Frame material is the most consequential decision in a window specification {"\u2014"} it determines durability, color options, sightline width, maintenance requirements, and overall cost. San Diego's coastal climate, fire zones, and year-round sun create a specific set of requirements that differ from most of the country.</p>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                    {frameMaterials.map(mat=>(
                      <div key={mat.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"12px",overflow:"hidden",borderLeft:`4px solid ${mat.color}`}}>
                        <div style={{padding:"18px 22px 14px"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"10px",marginBottom:"10px"}}>
                            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                              <div style={{width:"36px",height:"36px",borderRadius:"8px",background:`${mat.color}18`,border:`1px solid ${mat.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"}}>{mat.icon}</div>
                              <div>
                                <div style={{fontSize:"17px",fontWeight:500,color:T.text}}>{mat.name}</div>
                                <div style={{fontSize:"11px",fontStyle:"italic",color:mat.color,marginTop:"2px"}}>{mat.tagline}</div>
                              </div>
                            </div>
                            <Pill label={mat.priceRange} color={mat.color}/>
                          </div>
                          <p style={{margin:"0 0 16px",fontSize:"13px",color:T.muted,lineHeight:1.75}}>{mat.overview}</p>
                          <div className="grid-2col" style={{marginBottom:"14px"}}>
                            <div style={{background:T.card2,borderRadius:"8px",padding:"13px 15px"}}>
                              <SectionLabel color={mat.color}>PROS</SectionLabel>
                              {mat.pros.map(p=><div key={p} style={{fontSize:"11px",color:"#606060",marginBottom:"5px",display:"flex",gap:"6px"}}><span style={{color:mat.color,flexShrink:0}}>{"\u2713"}</span>{p}</div>)}
                            </div>
                            <div style={{background:T.card2,borderRadius:"8px",padding:"13px 15px"}}>
                              <SectionLabel color="#C05040">CONS</SectionLabel>
                              {mat.cons.map(c=><div key={c} style={{fontSize:"11px",color:"#7a5a54",marginBottom:"5px",display:"flex",gap:"6px"}}><span style={{flexShrink:0}}>{"\u00B7"}</span>{c}</div>)}
                            </div>
                          </div>
                          <div style={{background:`${mat.color}0a`,border:`1px solid ${mat.color}22`,borderRadius:"7px",padding:"12px 15px",marginBottom:"12px"}}>
                            <SectionLabel color={mat.color}>SAN DIEGO NOTES</SectionLabel>
                            <p style={{margin:0,fontSize:"12px",color:T.muted,lineHeight:1.65}}>{mat.sdNote}</p>
                          </div>
                          <div>
                            <SectionLabel color={mat.color}>AVAILABLE FROM</SectionLabel>
                            <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>{mat.brands.map(b=><Pill key={b} label={b} color={mat.color}/>)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ══ OPERATION TYPES ══ */}
              {windowSub==="operation_types"&&(
                <div>
                  <div style={{background:`${T.teal}0e`,border:`1px solid ${T.teal}33`,borderRadius:"12px",padding:"22px 26px",marginBottom:"24px"}}>
                    <div style={{fontSize:"9px",letterSpacing:"4px",color:T.teal,fontFamily:"monospace",marginBottom:"6px"}}>WINDOW GUIDE</div>
                    <div style={{fontSize:"22px",fontWeight:400,marginBottom:"6px"}}>Operation <em style={{color:T.teal}}>Types</em></div>
                    <p style={{margin:0,fontSize:"13px",color:T.muted,lineHeight:1.75,maxWidth:"720px"}}>How a window opens determines how much air it can move, what architecture it suits, and where it can be placed. Each operation type has specific strengths {"\u2014"} the right mix for a home depends on orientation, room function, and aesthetic.</p>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
                    {operationTypes.map(op=>(
                      <div key={op.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"12px",overflow:"hidden"}}>
                        <div style={{padding:"18px 22px 20px"}}>
                          <div className="win-op-grid">
                            {/* Illustration */}
                            <div style={{background:"#EEF5EE",border:`1px solid ${op.color}22`,borderRadius:"10px",padding:"12px",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px"}}>
                              <div style={{fontSize:"8px",letterSpacing:"2px",color:op.color,fontFamily:"monospace",marginBottom:"4px"}}>ILLUSTRATION</div>
                              <WinOpSVG type={op.id} color={op.color}/>
                            </div>
                            {/* Content */}
                            <div>
                              <div style={{display:"flex",alignItems:"baseline",gap:"10px",marginBottom:"6px",flexWrap:"wrap"}}>
                                <div style={{fontSize:"17px",fontWeight:500,color:T.text}}>{op.name}</div>
                                <div style={{fontSize:"11px",fontStyle:"italic",color:op.color}}>{op.tagline}</div>
                              </div>
                              <p style={{margin:"0 0 14px",fontSize:"13px",color:T.muted,lineHeight:1.75}}>{op.overview}</p>
                              <div style={{background:T.card2,borderRadius:"8px",padding:"12px 14px",marginBottom:"12px"}}>
                                <SectionLabel color={op.color}>HOW IT WORKS</SectionLabel>
                                <p style={{margin:0,fontSize:"12px",color:T.muted,lineHeight:1.65}}>{op.howItWorks}</p>
                              </div>
                              <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:"10px"}}>
                                <div>
                                  <SectionLabel color={op.color}>CONFIGURATIONS</SectionLabel>
                                  {op.configurations.map(c=><div key={c} style={{fontSize:"11px",color:"#606060",marginBottom:"4px",paddingLeft:"8px",borderLeft:`2px solid ${op.color}44`}}>{c}</div>)}
                                </div>
                                <div>
                                  <SectionLabel color={op.color}>BEST FOR</SectionLabel>
                                  {op.bestFor.map(b=><div key={b} style={{fontSize:"11px",color:"#606060",marginBottom:"4px",display:"flex",gap:"5px"}}><span style={{color:op.color,flexShrink:0}}>{"\u2192"}</span>{b}</div>)}
                                  {op.limitations&&<div style={{marginTop:"10px"}}>
                                    <SectionLabel color="#C05040">LIMITATIONS</SectionLabel>
                                    {op.limitations.map(l=><div key={l} style={{fontSize:"11px",color:"#8A3A30",marginBottom:"3px"}}>{"\u00B7"} {l}</div>)}
                                  </div>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ══ FINISHES BY FRAME ══ */}
              {windowSub==="finishes"&&(
                <div>
                  <div style={{background:`${T.gold}0e`,border:`1px solid ${T.gold}33`,borderRadius:"12px",padding:"22px 26px",marginBottom:"24px"}}>
                    <div style={{fontSize:"9px",letterSpacing:"4px",color:T.gold,fontFamily:"monospace",marginBottom:"6px"}}>WINDOW GUIDE</div>
                    <div style={{fontSize:"22px",fontWeight:400,marginBottom:"6px"}}>Finishes <em style={{color:T.gold}}>by Frame Material</em></div>
                    <p style={{margin:0,fontSize:"13px",color:T.muted,lineHeight:1.75,maxWidth:"720px"}}>Available colors and finish types vary entirely by frame material. Vinyl is limited to 4{"\u2013"}6 factory colors. Aluminum can be powder-coated or anodized to almost any color. Fiberglass can be field-painted. Aluminum-clad wood splits interior and exterior finishes independently. Understanding this matrix is essential for spec conversations with architects and designers.</p>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
                    {finishesData.map(fd=>(
                      <div key={fd.material} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"12px",overflow:"hidden",borderTop:`3px solid ${fd.color}`}}>
                        <div style={{padding:"18px 22px 20px"}}>
                          <div style={{fontSize:"16px",fontWeight:500,color:T.text,marginBottom:"4px"}}>{fd.material}</div>
                          <p style={{margin:"0 0 16px",fontSize:"13px",color:T.muted,lineHeight:1.7}}>{fd.intro}</p>
                          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(220px,100%),1fr))",gap:"10px",marginBottom:"14px"}}>
                            {fd.finishTypes.map(ft=>(
                              <div key={ft.name} style={{background:T.card2,borderRadius:"8px",overflow:"hidden",border:`1px solid ${T.border}`}}>
                                {/* Color swatch bar */}
                                <div style={{height:"28px",background:ft.swatch,borderBottom:`1px solid ${T.border}`}}/>
                                <div style={{padding:"10px 12px"}}>
                                  <div style={{fontSize:"11px",fontWeight:500,color:"#484848",marginBottom:"4px"}}>{ft.name}</div>
                                  <div style={{fontSize:"10px",color:T.dim,lineHeight:1.5}}>{ft.detail}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div style={{background:`${fd.color}0a`,border:`1px solid ${fd.color}22`,borderRadius:"7px",padding:"12px 15px"}}>
                            <SectionLabel color={fd.color}>SD SPEC GUIDANCE</SectionLabel>
                            <p style={{margin:0,fontSize:"12px",color:T.muted,lineHeight:1.65}}>{fd.sdGuidance}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ══ GLAZING OPTIONS ══ */}
              {windowSub==="glazing"&&(
                <div>
                  <div style={{background:`${T.sage}0e`,border:`1px solid ${T.sage}33`,borderRadius:"12px",padding:"22px 26px",marginBottom:"24px"}}>
                    <div style={{fontSize:"9px",letterSpacing:"4px",color:T.sage,fontFamily:"monospace",marginBottom:"6px"}}>WINDOW GUIDE</div>
                    <div style={{fontSize:"22px",fontWeight:400,marginBottom:"6px"}}>Glazing <em style={{color:T.sage}}>Options</em></div>
                    <p style={{margin:0,fontSize:"13px",color:T.muted,lineHeight:1.75,maxWidth:"720px"}}>The glass unit inside the frame performs most of the thermal and acoustic work. Frame material matters, but glazing specification {"\u2014"} Low-E coating type, gas fill, glass thickness, and lamination — often has more impact on comfort and energy bills than the frame itself. See the Glass Guide tab for comprehensive glazing detail.</p>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:"12px",marginBottom:"20px"}}>
                    {glazingOptions.map(g=>(
                      <div key={g.name} style={{background:T.card,border:`1px solid ${g.color}33`,borderRadius:"10px",padding:"16px 18px",borderLeft:`3px solid ${g.color}`}}>
                        <div style={{fontSize:"13px",fontWeight:500,color:T.text,marginBottom:"6px"}}>{g.name}</div>
                        <div style={{fontSize:"12px",color:T.muted,lineHeight:1.65}}>{g.detail}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{background:"#F0F5F2",border:`1px solid ${T.gold}33`,borderRadius:"10px",padding:"16px 20px"}}>
                    <SectionLabel color={T.gold}>GLASS GUIDE REFERENCE</SectionLabel>
                    <p style={{margin:"0 0 10px",fontSize:"13px",color:T.muted,lineHeight:1.7}}>For comprehensive glazing detail {"\u2014"} STC ratings, Low-E coating comparisons, Title 24 compliance paths, acoustic glass specs, and single vs. dual vs. triple pane analysis — see the dedicated Glass Guide tab.</p>
                    <button onClick={()=>setMainTab("glass_guide")} style={{background:T.gold,border:"none",color:T.text,padding:"8px 18px",borderRadius:"5px",cursor:"pointer",fontSize:"10px",letterSpacing:"2px",fontFamily:"monospace",fontWeight:700}}>OPEN GLASS GUIDE {"\u2192"}</button>
                  </div>
                </div>
              )}

              {/* ══ SD CLIMATE GUIDE ══ */}
              {windowSub==="sd_specs"&&(
                <div>
                  <div style={{background:`${T.rust}0e`,border:`1px solid ${T.rust}33`,borderRadius:"12px",padding:"22px 26px",marginBottom:"24px"}}>
                    <div style={{fontSize:"9px",letterSpacing:"4px",color:T.rust,fontFamily:"monospace",marginBottom:"6px"}}>WINDOW GUIDE</div>
                    <div style={{fontSize:"22px",fontWeight:400,marginBottom:"6px"}}>San Diego <em style={{color:T.rust}}>Climate Spec Guide</em></div>
                    <p style={{margin:0,fontSize:"13px",color:T.muted,lineHeight:1.75,maxWidth:"720px"}}>San Diego's climate creates specific window specification requirements that differ from most US markets. Coastal salt air, fire zones, year-round solar gain, and occasional mountain elevations each influence what should be specified. This guide covers the SD-specific considerations every rep and contractor should know.</p>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:"12px",marginBottom:"20px"}}>
                    {sdClimateItems.map(item=>(
                      <div key={item.title} style={{background:T.card,border:`1px solid ${item.color}33`,borderRadius:"10px",padding:"18px 22px",display:"grid",gridTemplateColumns:"40px 1fr",gap:"14px",alignItems:"start"}}>
                        <div style={{fontSize:"24px",textAlign:"center",marginTop:"2px"}}>{item.icon}</div>
                        <div>
                          <div style={{fontSize:"14px",fontWeight:500,color:T.text,marginBottom:"6px"}}>{item.title}</div>
                          <p style={{margin:0,fontSize:"13px",color:T.muted,lineHeight:1.75}}>{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{background:"#EEF4F2",border:`1px solid ${T.teal}33`,borderRadius:"10px",padding:"18px 22px"}}>
                    <SectionLabel color={T.teal}>STANDARD SD WINDOW SPEC {"\u2014"} QUICK REFERENCE</SectionLabel>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"8px"}}>
                      {[
                        {label:"Glass Unit",value:"Double pane IGU"},
                        {label:"Gas Fill",value:"Argon"},
                        {label:"Low-E",value:"LoE-272 or LoE-366"},
                        {label:"U-Factor",value:"≤ 0.30 (CZ7)"},
                        {label:"SHGC",value:"≤ 0.23 (south/west)"},
                        {label:"Frame",value:"Thermally broken reqd. (aluminum)"},
                        {label:"Coastal",value:"Anodized or fiberglass/vinyl"},
                        {label:"Fire Zone",value:"Fire-rated laminated glass"},
                      ].map(s=>(
                        <div key={s.label} style={{background:T.card2,borderRadius:"6px",padding:"10px 12px"}}>
                          <div style={{fontSize:"8px",letterSpacing:"2px",color:T.teal,fontFamily:"monospace",marginBottom:"3px"}}>{s.label}</div>
                          <div style={{fontSize:"12px",color:"#484848"}}>{s.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        );
      })()}

      {/* ─── PATIO & LARGE DOOR SYSTEMS ─── */}
      {mainTab==="large_doors"&&(()=>{
        const sys = largeDoorSystems.find(s=>s.id===largeDoorSub)||largeDoorSystems[0];
        return (
          <div className="sidebar-layout" style={{animation:"fadeUp 0.25s ease"}}>
            {/* Left nav */}
            <div className="sidebar-nav" style={{width:"200px"}}>
              <div style={{fontSize:"9px",letterSpacing:"3px",color:T.faint,fontFamily:"monospace",padding:"12px 18px",whiteSpace:"nowrap"}} className="sidebar-label">SYSTEM TYPES</div>
              {largeDoorSystems.map(s=>(
                <button key={s.id} onClick={()=>setLargeDoorSub(s.id)} style={{display:"block",width:"100%",textAlign:"left",background:largeDoorSub===s.id?`${s.color}12`:"none",border:"none",borderLeft:`3px solid ${largeDoorSub===s.id?s.color:"transparent"}`,padding:"13px 18px",cursor:"pointer",transition:"all 0.15s"}}>
                  <div style={{width:"52px",height:"46px",marginBottom:"4px",overflow:"visible"}}><div style={{transform:"scale(1.6)",transformOrigin:"top left",color:largeDoorSub===s.id?s.color:"#555555"}} dangerouslySetInnerHTML={{__html:s.icon}}/></div>
                  <div className="sidebar-label" style={{fontSize:"11px",color:largeDoorSub===s.id?s.color:T.dim,letterSpacing:"1px",lineHeight:1.3}}>{s.name.split("(")[0].split("/")[0].trim()}</div>
                  <div className="sidebar-label" style={{fontSize:"10px",color:largeDoorSub===s.id?s.color+"aa":T.faint,marginTop:"2px",fontStyle:"italic"}}>{s.price}</div>
                </button>
              ))}
            </div>

            {/* Main content */}
            <div className="sidebar-content" key={largeDoorSub}>
              {/* Header */}
              <div style={{background:`${sys.color}0e`,border:`1px solid ${sys.color}33`,borderRadius:"12px",padding:"22px 26px",marginBottom:"22px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",right:"-10px",top:"-10px",fontSize:"100px",opacity:0.04,color:sys.color,lineHeight:1}}>{sys.bg}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"10px",marginBottom:"12px"}}>
                  <div>
                    <div style={{fontSize:"9px",letterSpacing:"4px",color:sys.color,fontFamily:"monospace",marginBottom:"6px"}}>DOOR SYSTEM GUIDE</div>
                    <div style={{fontSize:"22px",fontWeight:400,color:T.text,lineHeight:1.2}}>{sys.name}</div>
                    <div style={{fontSize:"13px",fontStyle:"italic",color:sys.color,marginTop:"4px"}}>{sys.tagline}</div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"6px"}}>
                    <div style={{fontSize:"9px",letterSpacing:"2px",color:T.faint,fontFamily:"monospace"}}>PRICE RANGE</div>
                    <div style={{fontSize:"16px",color:sys.color,letterSpacing:"2px"}}>{sys.price}</div>
                    <div style={{fontSize:"9px",letterSpacing:"1px",color:T.faint,fontFamily:"monospace",textAlign:"right"}}>ETA: {sys.leadTime}</div>
                  </div>
                </div>
                <p style={{margin:0,fontSize:"13px",color:T.muted,lineHeight:1.75,maxWidth:"720px"}}>{sys.blurb}</p>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(480px,1fr))",gap:"16px"}}>

                {/* How it works */}
                <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"18px 22px"}}>
                  <SectionLabel color={sys.color}>HOW IT WORKS</SectionLabel>
                  <p style={{margin:0,fontSize:"13px",color:T.muted,lineHeight:1.75}}>{sys.howItWorks}</p>
                </div>

                {/* Configurations */}
                <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"18px 22px"}}>
                  <SectionLabel color={sys.color}>CONFIGURATIONS</SectionLabel>
                  <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                    {sys.configurations.map(c=>(
                      <div key={c.name} style={{background:T.card2,borderRadius:"7px",padding:"12px 14px",borderLeft:`3px solid ${sys.color}55`}}>
                        <div style={{fontSize:"13px",fontWeight:500,color:"#484848",marginBottom:"4px"}}>{c.name}</div>
                        <div style={{fontSize:"12px",color:T.dim,lineHeight:1.5}}>{c.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Frame options */}
                <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"18px 22px"}}>
                  <SectionLabel color={sys.color}>FRAME OPTIONS</SectionLabel>
                  {sys.frameOptions.map(f=><div key={f} style={{fontSize:"12px",color:"#606060",marginBottom:"6px",paddingLeft:"10px",borderLeft:`2px solid ${sys.color}44`}}>{f}</div>)}
                  {sys.hardwareNotes&&<div style={{marginTop:"14px"}}>
                    <SectionLabel color={sys.color}>HARDWARE NOTES</SectionLabel>
                    <p style={{margin:0,fontSize:"12px",color:T.muted,lineHeight:1.65}}>{sys.hardwareNotes}</p>
                  </div>}
                </div>

                {/* Glass & threshold */}
                <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"18px 22px"}}>
                  <SectionLabel color={sys.color}>GLASS OPTIONS</SectionLabel>
                  {sys.glassOptions.map(g=><div key={g} style={{fontSize:"12px",color:"#606060",marginBottom:"5px"}}>{"\u25FB"} {g}</div>)}
                  {sys.thresholdTypes&&<div style={{marginTop:"14px"}}>
                    <SectionLabel color={sys.color}>THRESHOLD TYPES</SectionLabel>
                    {sys.thresholdTypes.map(t=>(
                      <div key={t.name} style={{background:T.card2,borderRadius:"6px",padding:"10px 12px",marginBottom:"7px"}}>
                        <div style={{fontSize:"12px",fontWeight:500,color:"#484848",marginBottom:"3px"}}>{t.name}</div>
                        <div style={{fontSize:"11px",color:T.dim,lineHeight:1.5}}>{t.detail}</div>
                      </div>
                    ))}
                  </div>}
                </div>

                {/* Pros & Cons */}
                <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"18px 22px"}}>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(260px,100%),1fr))",gap:"14px"}}>
                    <div>
                      <SectionLabel color={sys.color}>PROS</SectionLabel>
                      {sys.pros.map(p=><div key={p} style={{fontSize:"12px",color:"#606060",marginBottom:"5px"}}>{"\u2713"} {p}</div>)}
                    </div>
                    <div>
                      <SectionLabel color="#C05040">CONS</SectionLabel>
                      {sys.cons.map(c=><div key={c} style={{fontSize:"12px",color:"#8A3A30",marginBottom:"5px"}}>{"\u00B7"} {c}</div>)}
                    </div>
                  </div>
                  {sys.bestFor&&<div style={{marginTop:"14px",borderTop:`1px solid ${T.border}`,paddingTop:"12px"}}>
                    <SectionLabel>BEST FOR</SectionLabel>
                    {sys.bestFor.map(b=><div key={b} style={{fontSize:"12px",color:"#606060",marginBottom:"4px"}}>{"\u2192"} {b}</div>)}
                  </div>}
                </div>

                {/* Vendors */}
                <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"18px 22px"}}>
                  <SectionLabel color={sys.color}>VENDORS FOR THIS SYSTEM</SectionLabel>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>{sys.vendors.map(v=><Pill key={v} label={v} color={sys.color}/>)}</div>
                </div>

                {/* Overhang & exposure note */}
                <div style={{background:"#F0F4FA",border:"1px solid #7A9ABB44",borderRadius:"10px",padding:"16px 20px",gridColumn:"1/-1"}}>
                  <SectionLabel color={T.slate}>☁ OVERHANG & WEATHER EXPOSURE</SectionLabel>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"10px",marginTop:"8px"}}>
                    <div style={{flex:"1 1 180px",fontSize:"12px",color:"#5A6A7A",lineHeight:1.6}}><strong>Min. 24" overhang</strong> required by most manufacturers for aluminum systems. Wood and clad-wood typically need 36"+. Always check the product's install manual.</div>
                    <div style={{flex:"1 1 180px",fontSize:"12px",color:"#5A6A7A",lineHeight:1.6}}><strong>Aluminum-only</strong> (NanaWall, LaCantina, Fleetwood) most weather-tolerant. <strong>Wood & clad-wood</strong> most vulnerable — verify overhang spec before finalizing.</div>
                    <div style={{flex:"1 1 180px",fontSize:"12px",color:"#5A6A7A",lineHeight:1.6}}><strong>Flush sills</strong> (NanaWall Low Profile, multi-slide thresholds) offer less water resistance — covered overhead protection is especially important for these.</div>
                  </div>
                </div>

                {/* Fire zone */}
                <div style={{background:"#FEF0EE",border:"1px solid #E87A6A44",borderRadius:"10px",padding:"18px 22px",gridColumn:"1/-1"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"10px"}}>
                    <div style={{flex:1}}>
                      <SectionLabel color={T.ember}> FIRE ZONE NOTES</SectionLabel>
                      <p style={{margin:"0 0 10px",fontSize:"13px",color:"#885858",lineHeight:1.7}}>{sys.fireNote}</p>
                      <a href="https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones" target="_blank" rel="noopener noreferrer" style={{fontSize:"10px",fontFamily:"monospace",color:T.ember,letterSpacing:"1px",textDecoration:"none"}}>CHECK ADDRESS AT OSFM.FIRE.CA.GOV {"\u2192"}</a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        );
      })()}


      {/* ─── HARDWARE ─── */}
      {mainTab==="hardware"&&(
        <div style={{padding:"26px",maxWidth:"1200px",margin:"0 auto",animation:"fadeUp 0.25s ease"}}>

          {/* Header */}
          <div style={{background:"#EEF5EE",border:`1px solid ${T.gold}44`,borderRadius:"12px",padding:"22px 28px",marginBottom:"22px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",right:"20px",top:"10px",fontSize:"80px",opacity:0.04,color:T.gold}}></div>
            <div style={{fontSize:"9px",letterSpacing:"4px",color:T.gold,fontFamily:"monospace",marginBottom:"6px"}}>HARDWARE GUIDE</div>
            <div style={{fontSize:"22px",fontWeight:400,marginBottom:"6px"}}>Door Hardware by <em style={{color:T.gold}}>Emtek</em></div>
            <p style={{margin:"0 0 14px",fontSize:"13px",color:T.muted,lineHeight:1.75,maxWidth:"680px"}}>Emtek is the most customizable residential hardware line available {"\u2014"} lever style, rosette shape, and finish are all selected independently, giving every project a bespoke look without custom pricing. Our hardware guide covers every category from entry sets to smart locks.</p>
            <a href="https://www.emtek.com" target="_blank" rel="noopener noreferrer" style={{fontSize:"10px",fontFamily:"monospace",color:T.gold,letterSpacing:"2px",textDecoration:"none"}}>EMTEK.COM {"\u2192"}</a>
          </div>

          {/* Finish selector */}
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"12px",padding:"20px 22px",marginBottom:"22px"}}>
            <div style={{fontSize:"9px",letterSpacing:"3px",color:T.slate,marginBottom:"6px",fontFamily:"monospace"}}>STEP 1 {"\u2014"} CHOOSE YOUR FINISH</div>
            <div style={{fontSize:"13px",color:T.muted,marginBottom:"14px"}}>Finish selection is the foundation of hardware specification {"\u2014"} it should be consistent with hinges, cabinet pulls, plumbing, and light fixtures throughout the space.</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(90px,1fr))",gap:"8px",marginBottom:selFinish?"14px":"0"}}>
              {hardwareFinishes.map(f=>(
                <div key={f.name} onClick={()=>setSelFinish(selFinish===f.name?null:f.name)} style={{background:selFinish===f.name?"#F8F5F0":T.card2,border:`1px solid ${selFinish===f.name?T.slate:T.border}`,borderRadius:"8px",padding:"10px 8px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",transition:"all 0.15s"}}>
                  <div style={{width:"28px",height:"28px",borderRadius:"50%",background:f.swatch,border:`1px solid ${T.faint}`}}/>
                  <div style={{fontSize:"9px",color:selFinish===f.name?T.text:T.dim,textAlign:"center",lineHeight:1.3}}>{f.name}</div>
                  {f.popular&&<span style={{fontSize:"7px",fontFamily:"monospace",color:T.gold,letterSpacing:"1px"}}>POP</span>}
                </div>
              ))}
            </div>
            {selFinish&&(
              <div style={{background:`${T.slate}10`,border:`1px solid ${T.slate}33`,borderRadius:"8px",padding:"13px 15px",animation:"fadeUp 0.2s ease"}}>
                <SectionLabel color={T.slate}>{selFinish.toUpperCase()} — SD GUIDANCE</SectionLabel>
                <div style={{fontSize:"13px",color:T.muted,lineHeight:1.65}}>{finishGuide[selFinish]}</div>
              </div>
            )}
          </div>

          <div style={{fontSize:"9px",letterSpacing:"3px",color:T.faint,marginBottom:"14px",fontFamily:"monospace"}}>STEP 2 {"\u2014"} HARDWARE CATEGORIES</div>

          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            {hardwareCategories.map(cat=>{
              const isOpen = hwOpen===cat.id;

              // SVG illustrations per category
              const svgs = {
                monolithic:(
                  <svg viewBox="0 0 120 220" width="120" height="220" style={{display:"block"}}>
                    {/* Door panel */}
                    <rect x="10" y="5" width="100" height="210" rx="3" fill="#F2EEEA" stroke="#C8C8C4" strokeWidth="1.5"/>
                    {/* Monolithic backplate */}
                    <rect x="72" y="55" width="16" height="110" rx="3" fill="#333333" stroke={cat.color} strokeWidth="0.8" opacity="0.9"/>
                    {/* Lever */}
                    <rect x="72" y="82" width="32" height="8" rx="3" fill={cat.color} opacity="0.85"/>
                    <rect x="80" y="78" width="8" height="16" rx="2" fill={cat.color} opacity="0.7"/>
                    {/* Keyhole */}
                    <circle cx="80" cy="130" r="4" fill="none" stroke={cat.color} strokeWidth="1.2" opacity="0.7"/>
                    <rect x="78" y="130" width="4" height="7" rx="1" fill="none" stroke={cat.color} strokeWidth="1.2" opacity="0.7"/>
                    {/* Label */}
                    <text x="60" y="200" textAnchor="middle" fill="#444444" fontSize="7" fontFamily="monospace">MONOLITHIC SET</text>
                  </svg>
                ),
                lever:(
                  <svg viewBox="0 0 120 200" width="120" height="200" style={{display:"block"}}>
                    <rect x="10" y="5" width="100" height="190" rx="3" fill="#F2EEEA" stroke="#C8C8C4" strokeWidth="1.5"/>
                    {/* Oval rosette */}
                    <ellipse cx="80" cy="80" rx="10" ry="18" fill="#E0E0DC" stroke={cat.color} strokeWidth="0.8" opacity="0.9"/>
                    {/* Lever arm */}
                    <rect x="80" y="74" width="28" height="7" rx="3" fill={cat.color} opacity="0.85"/>
                    <rect x="78" y="70" width="8" height="20" rx="3" fill={cat.color} opacity="0.7"/>
                    {/* Round rosette for deadbolt */}
                    <circle cx="80" cy="128" r="10" fill="#E0E0DC" stroke={cat.color} strokeWidth="0.8" opacity="0.7"/>
                    <circle cx="80" cy="128" r="4" fill="none" stroke={cat.color} strokeWidth="1.2" opacity="0.6"/>
                    <text x="60" y="182" textAnchor="middle" fill="#444444" fontSize="7" fontFamily="monospace">LEVER + ROSETTE</text>
                  </svg>
                ),
                pull:(
                  <svg viewBox="0 0 120 220" width="120" height="220" style={{display:"block"}}>
                    <rect x="10" y="5" width="100" height="210" rx="3" fill="#F2EEEA" stroke="#C8C8C4" strokeWidth="1.5"/>
                    {/* Long pull bar */}
                    <rect x="76" y="45" width="10" height="130" rx="5" fill={cat.color} opacity="0.85"/>
                    {/* End caps */}
                    <circle cx="81" cy="48" r="6" fill={cat.color} opacity="0.7"/>
                    <circle cx="81" cy="172" r="6" fill={cat.color} opacity="0.7"/>
                    {/* Mounting screws */}
                    <circle cx="81" cy="75" r="2" fill="#C0C0BC" opacity="0.8"/>
                    <circle cx="81" cy="145" r="2" fill="#C0C0BC" opacity="0.8"/>
                    <text x="60" y="202" textAnchor="middle" fill="#444444" fontSize="7" fontFamily="monospace">18" DOOR PULL</text>
                  </svg>
                ),
                barn:(
                  <svg viewBox="0 0 160 180" width="160" height="180" style={{display:"block"}}>
                    {/* Wall */}
                    <rect x="5" y="20" width="150" height="5" rx="2" fill="#E0E0DC"/>
                    {/* Track */}
                    <rect x="8" y="22" width="144" height="6" rx="3" fill={cat.color} opacity="0.6"/>
                    {/* Hanger wheels */}
                    <circle cx="50" cy="31" r="5" fill="#333333" stroke={cat.color} strokeWidth="1"/>
                    <circle cx="80" cy="31" r="5" fill="#333333" stroke={cat.color} strokeWidth="1"/>
                    {/* Door panel */}
                    <rect x="20" y="36" width="90" height="130" rx="2" fill="#F2EEEA" stroke="#C8C8C4" strokeWidth="1.5"/>
                    {/* Wood grain lines */}
                    {[60,75,90,105,120,135].map(y=>(
                      <line key={y} x1="22" y1={y} x2="108" y2={y} stroke="#C8C8C4" strokeWidth="0.8"/>
                    ))}
                    {/* Flush pull */}
                    <rect x="96" y="92" width="8" height="28" rx="2" fill={cat.color} opacity="0.8"/>
                    {/* Floor guide */}
                    <rect x="55" y="165" width="20" height="5" rx="2" fill="#333333" stroke={cat.color} strokeWidth="0.6" opacity="0.7"/>
                    <text x="80" y="178" textAnchor="middle" fill="#444444" fontSize="7" fontFamily="monospace">BARN DOOR TRACK SYSTEM</text>
                  </svg>
                ),
                smart:(
                  <svg viewBox="0 0 120 220" width="120" height="220" style={{display:"block"}}>
                    <rect x="10" y="5" width="100" height="210" rx="3" fill="#F2EEEA" stroke="#C8C8C4" strokeWidth="1.5"/>
                    {/* Keypad body */}
                    <rect x="62" y="50" width="36" height="80" rx="5" fill="#D8EED8" stroke={cat.color} strokeWidth="0.8" opacity="0.9"/>
                    {/* Keypad dots */}
                    {[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>(
                      <circle key={i} cx={70+(i%3)*10} cy={64+Math.floor(i/3)*12} r="2.5" fill={cat.color} opacity={0.5+i*0.04}/>
                    ))}
                    {/* Lever below */}
                    <rect x="62" y="108" width="28" height="7" rx="3" fill={cat.color} opacity="0.8"/>
                    <rect x="70" y="104" width="8" height="20" rx="2" fill={cat.color} opacity="0.65"/>
                    {/* WiFi signal */}
                    <text x="80" y="155" textAnchor="middle" fill={cat.color} fontSize="14" opacity="0.6"></text>
                    {/* App phone */}
                    <rect x="65" y="165" width="22" height="32" rx="3" fill="#D8D8EE" stroke={cat.color} strokeWidth="0.8" opacity="0.8"/>
                    <rect x="68" y="170" width="16" height="16" rx="2" fill={cat.color} opacity="0.3"/>
                    <circle cx="76" cy="192" r="2" fill={cat.color} opacity="0.5"/>
                    <text x="60" y="210" textAnchor="middle" fill="#444444" fontSize="7" fontFamily="monospace">SMART LOCK + APP</text>
                  </svg>
                ),
              };

              return (
                <div key={cat.id} style={{background:T.card,border:`1px solid ${isOpen?cat.color+"66":T.border}`,borderRadius:"10px",overflow:"hidden",transition:"border-color 0.2s"}}>
                  {/* Category header */}
                  <div onClick={()=>setHwOpen(isOpen?null:cat.id)} style={{padding:"16px 20px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                      <div style={{width:"40px",height:"40px",borderRadius:"8px",background:`${cat.color}18`,border:`1px solid ${cat.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",flexShrink:0}}>{cat.icon}</div>
                      <div>
                        <div style={{fontSize:"14px",fontWeight:500,color:isOpen?T.text:"#484848"}}>{cat.label}</div>
                        <div style={{fontSize:"11px",color:T.dim,marginTop:"2px"}}>{cat.description}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                      <span style={{fontSize:"9px",fontFamily:"monospace",color:cat.color,letterSpacing:"1px",opacity:0.7}}>EMTEK</span>
                      <span style={{color:T.faint,fontSize:"11px"}}>{isOpen?"▲":"▼"}</span>
                    </div>
                  </div>

                  {isOpen&&(
                    <div style={{borderTop:`1px solid ${T.border}`,animation:"fadeUp 0.2s ease"}}>
                      {/* Emtek note banner */}
                      <div style={{background:`${cat.color}0c`,borderBottom:`1px solid ${cat.color}22`,padding:"12px 20px",display:"flex",gap:"10px",alignItems:"flex-start"}}>
                        <span style={{color:cat.color,fontSize:"14px",flexShrink:0,marginTop:"1px"}}>{"\u25C8"}</span>
                        <div>
                          <div style={{fontSize:"9px",letterSpacing:"2px",color:cat.color,fontFamily:"monospace",marginBottom:"3px"}}>EMTEK ADVANTAGE</div>
                          <div style={{fontSize:"12px",color:T.muted,lineHeight:1.6}}>{cat.emtekNote}</div>
                        </div>
                      </div>

                      {/* Illustration + types grid */}
                      <div style={{padding:"20px"}} className={cat.svgKey&&svgs[cat.svgKey]?"win-op-grid":""}>

                        {/* SVG Illustration */}
                        {cat.svgKey&&svgs[cat.svgKey]&&(
                          <div style={{background:"#EEF4F2",border:`1px solid ${cat.color}22`,borderRadius:"10px",padding:"16px",display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",minWidth:"150px"}}>
                            <div style={{fontSize:"9px",letterSpacing:"2px",color:cat.color,fontFamily:"monospace",marginBottom:"2px"}}>ILLUSTRATION</div>
                            {svgs[cat.svgKey]}
                            <div style={{fontSize:"9px",color:T.dim,textAlign:"center",lineHeight:1.4,maxWidth:"130px"}}>{cat.visual?.desc}</div>
                          </div>
                        )}

                        {/* Types */}
                        <div>
                          <div style={{fontSize:"9px",letterSpacing:"2px",color:T.faint,fontFamily:"monospace",marginBottom:"10px"}}>TYPES &amp; OPTIONS</div>
                          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:"8px"}}>
                            {cat.types.map(t=>(
                              <div key={t.name} style={{background:t.highlight?`${cat.color}0e`:T.card2,border:`1px solid ${t.highlight?cat.color+"44":T.border}`,borderRadius:"7px",padding:"13px 15px"}}>
                                <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"5px"}}>
                                  {t.highlight&&<span style={{color:cat.color,fontSize:"9px"}}>{"\u2605"}</span>}
                                  <div style={{fontSize:"12px",fontWeight:500,color:t.highlight?"#ddd":"#bbb"}}>{t.name}</div>
                                </div>
                                <div style={{fontSize:"11px",color:T.dim,lineHeight:1.55}}>{t.detail}</div>
                              </div>
                            ))}
                          </div>

                          {/* Vendors */}
                          <div style={{marginTop:"14px",paddingTop:"12px",borderTop:`1px solid ${T.border}`}}>
                            <div style={{fontSize:"9px",letterSpacing:"2px",color:cat.color,fontFamily:"monospace",marginBottom:"8px"}}>VENDORS</div>
                            <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>{cat.vendors.map(v=><Pill key={v} label={v} color={cat.color}/>)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div style={{marginTop:"22px",background:`${T.gold}10`,border:`1px solid ${T.gold}33`,borderRadius:"10px",padding:"16px 20px"}}>
            <SectionLabel color={T.gold}>FINISH CONSISTENCY NOTE</SectionLabel>
            <p style={{margin:0,fontSize:"13px",color:T.muted,lineHeight:1.7}}>Hardware finish should be consistent across all visible hardware in a space {"\u2014"} door handles, hinges, cabinet pulls, plumbing, and light fixtures. Mixing two finishes intentionally (e.g., matte black + satin brass) can be a strong design move when done deliberately. When in doubt, commit to one finish throughout. Emtek's broad line means every category from entry sets to barn doors is available in the same finish family.</p>
          </div>
        </div>
      )}


      {/* ─── GLASS GUIDE ─── */}
      {mainTab==="glass_guide"&&<GlassGuideTab/>}

      {/* ─── FAVORITES ─── */}
      {mainTab==="favorites"&&(
        <div style={{maxWidth:"960px",margin:"0 auto",padding:"clamp(16px,4vw,30px) clamp(14px,4vw,24px)",animation:"fadeUp 0.25s ease"}}>
          <div style={{marginBottom:"24px"}}>
            <div style={{fontSize:"9px",letterSpacing:"4px",color:T.faint,fontFamily:"monospace",marginBottom:"8px"}}>YOUR QUOTE LIST</div>
            <h2 style={{fontSize:"22px",fontWeight:400,margin:"0 0 8px"}}>Items for <em style={{color:T.gold}}>Quoting &amp; Consultation</em></h2>
            <p style={{margin:0,fontSize:"13px",color:T.muted,lineHeight:1.65,maxWidth:"540px"}}>Fill in quantity, rough size, and location for each item {"\u2014"} your matched specialist will use these details to prepare pricing, lead times, and samples before your consultation. The more detail you add, the more useful your first meeting will be.</p>
          </div>
          <FavoritesPanel favorites={favorites} setFavorites={setFavorites}/>
          {favorites.length>0&&(
            <div style={{marginTop:"20px",background:"#F0F5F2",border:`1px solid ${T.gold}44`,borderRadius:"10px",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
              <div>
                <SectionLabel color={T.gold}>READY TO SUBMIT?</SectionLabel>
                <div style={{fontSize:"13px",color:T.text}}>Complete the quote request to connect with a matched local specialist.</div>
              </div>
              <button onClick={()=>{setMainTab("quiz");if(step===0)setStep(1);}} style={{background:T.gold,border:"none",color:T.text,padding:"10px 20px",borderRadius:"6px",cursor:"pointer",fontSize:"13px",fontWeight:600,fontFamily:"inherit"}}>
                {submitted?"View My Results →":"Start Quote Request →"}
              </button>
            </div>
          )}
          <div style={{marginTop:"16px",background:T.card,border:`1px solid ${T.border}`,borderRadius:"10px",padding:"16px 20px"}}>
            <SectionLabel color={T.dim}>BROWSE TO ADD MORE</SectionLabel>
            <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
              {[{id:"vendors",label:"Vendors",icon:"◻"},{id:"door_types",label:"Door Types",icon:""},{id:"large_doors",label:"Patio & Door Systems",icon:"⬛"},{id:"glass_guide",label:"Glass Guide",icon:"◑"},{id:"hardware",label:"Hardware",icon:""}].map(t=>(
                <button key={t.id} onClick={()=>setMainTab(t.id)} style={{background:T.card2,border:`1px solid ${T.border}`,color:T.dim,padding:"7px 13px",borderRadius:"5px",cursor:"pointer",fontSize:"10px",letterSpacing:"1px",fontFamily:"monospace"}}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── FOOTER ─── */}
      <div style={{borderTop:`1px solid ${T.border}`,background:"#EEF5F2",marginTop:"40px",padding:"32px 28px 24px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(220px,100%),1fr))",gap:"28px",marginBottom:"28px"}}>
            {/* Brand */}
            <div>
              <div style={{fontSize:"15px",marginBottom:"6px"}}>SD <em style={{color:T.gold}}>Window &amp; Door</em> Guide</div>
              <div style={{fontSize:"10px",fontStyle:"italic",color:T.faint,marginBottom:"10px",lineHeight:1.5}}>Find the right window &amp; door system for your project {"\u2014"} free expert matching</div>
              <div style={{fontSize:"10px",color:T.dim,lineHeight:1.7}}>San Diego County's independent resource for windows, doors, glass systems, and building materials. Serving homeowners, contractors, architects, and designers across La Jolla, Del Mar, Carmel Valley, Rancho Santa Fe, Encinitas, Solana Beach, and greater San Diego.</div>
            </div>
            {/* What we cover */}
            <div>
              <div style={{fontSize:"9px",letterSpacing:"3px",color:T.faint,fontFamily:"monospace",marginBottom:"10px"}}>WHAT WE COVER</div>
              {["Window & door replacement","Custom home windows & doors","Folding & multi-slide door systems","Window walls & glass walls","Coastal remodel specifications","Fire zone (FHSZ) compliance","Glass types & performance glazing","Frame materials & finishes","Entry & interior doors","Architectural door systems"].map(item=>(
                <div key={item} style={{fontSize:"11px",color:T.dim,marginBottom:"3px"}}>{"\u2192"} {item}</div>
              ))}
            </div>
            {/* Who we serve */}
            <div>
              <div style={{fontSize:"9px",letterSpacing:"3px",color:T.faint,fontFamily:"monospace",marginBottom:"10px"}}>WHO WE SERVE</div>
              {[["","Homeowners","Replacement windows, remodels, coastal homes"],["","Contractors & Builders","Product specs, lead times, volume sourcing"],["","Architects","System specs, fire zone compliance, custom sizing"],["","Interior Designers","Finishes, glass types, hardware matching"]].map(([icon,role,desc])=>(
                <div key={role} style={{marginBottom:"10px"}}>
                  <div style={{fontSize:"12px",color:"#606060",marginBottom:"2px"}}>{icon} {role}</div>
                  <div style={{fontSize:"10px",color:T.dim,lineHeight:1.4}}>{desc}</div>
                </div>
              ))}
            </div>
            {/* SD service areas */}
            <div>
              <div style={{fontSize:"9px",letterSpacing:"3px",color:T.faint,fontFamily:"monospace",marginBottom:"10px"}}>SERVICE AREAS</div>
              {[["La Jolla","92037 · Luxury coastal remodels"],["Rancho Santa Fe","92067 · Custom estate builds"],["Del Mar","92014 · Coastal replacement windows"],["Carmel Valley","92130 · Production & custom builds"],["Encinitas","92024 · Transitional & modern remodels"],["Solana Beach","92075 · Coastal window walls"],["Coronado","92118 · Historic & coastal restoration"],["Bird Rock / PB","92109 · Urban remodels"],["Olivenhain","92024 · Custom homes & ADUs"],["Greater San Diego","All coastal communities"]].map(([area,desc])=>(
                <div key={area} style={{marginBottom:"6px"}}>
                  <div style={{fontSize:"11px",color:"#606060"}}>{area} <span style={{color:T.faint,fontSize:"10px"}}>{"\u2014"} {desc}</span></div>
                </div>
              ))}
            </div>
          </div>
          {/* Bottom bar */}
          <div style={{borderTop:`1px solid ${T.border}`,paddingTop:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px"}}>
            <div style={{fontSize:"10px",color:T.faint}}>{"\u00A9"} 2025 SD Window &amp; Door Guide · San Diego, CA · Independent resource · Not affiliated with any manufacturer</div>
            <div style={{display:"flex",gap:"16px"}}>
              {["Window Replacement","Folding Doors","Glass Guide","Door Types","Get a Quote"].map(link=>(
                <button key={link} onClick={()=>setMainTab(link==="Get a Quote"?"quiz":link==="Glass Guide"?"glass_guide":link==="Door Types"?"door_types":link.includes("Door")?"large_doors":"quiz")} style={{background:"none",border:"none",color:T.faint,cursor:"pointer",fontSize:"10px",fontFamily:"inherit",padding:0,textDecoration:"underline",textDecorationColor:T.dim}}>{link}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
