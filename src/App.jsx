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
    <span style={{ fontSize:"9px", fontFamily:"monospace", letterSpacing:"1px", color, background: bg || `${color}18`, padding:"3px 8px", borderRadius:"2px", border:`1px solid ${color}33`, whiteSpace:"nowrap" }}>
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
    blurb: "The classic choice for warmth, character, and natural beauty. Solid wood doors can be stained to show grain or painted to match any color. They're the most customizable option and pair beautifully with traditional, craftsman, and transitional architecture. The tradeoff: wood requires periodic maintenance — repainting or resealing every few years — especially in coastal climates where salt air and UV accelerate wear. Look for species like mahogany, Douglas fir, or alder for exterior applications.",
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
    blurb: "The best all-around exterior door material for San Diego. Fiberglass won't warp, rot, crack, or corrode — ever. Modern fiberglass doors have deep wood-grain textures that can be gel-stained to look nearly identical to real wood, without any of the maintenance. They're also significantly better insulated than steel, reducing energy transfer and noise. Therma-Tru pioneered this category and remains the market leader. An excellent choice for coastal properties where wood maintenance is a concern.",
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
    blurb: "Steel doors are the most secure and most affordable exterior door option. They're dent-resistant, dimensionally stable (won't warp), and offer excellent security. Steel is the dominant material for basic to mid-range exterior doors. The limitations: steel conducts temperature (can feel cold or hot to the touch), is prone to rust if the finish is compromised, and offers limited design variety compared to wood or fiberglass. Most residential steel doors have an embossed wood-grain pattern — less convincing than fiberglass but functional.",
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
    blurb: "Wrought iron and steel-frame glass doors are the ultimate architectural statement entry. These doors feature slim black metal frames with large glass panels — think Mediterranean courtyards, Spanish Colonial entries, and contemporary luxury homes. The dramatic sightlines and transparency between interior and exterior are unmatched by any other door type. All-custom fabrication means every door is unique. Heavier than other door types, requiring upgraded hinges and threshold hardware.",
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
    blurb: "Vinyl and composite exterior doors are the most energy-efficient and lowest-maintenance option available. They won't warp, rot, rust, or need repainting — ever. The tradeoff is limited design variety and color options. Vinyl doors are typically available in white, beige, or a handful of standard colors and can't be repainted easily. Best suited for utilitarian or budget-focused applications where aesthetics are secondary to performance. Not common in the San Diego luxury market but worth considering for ADUs and rental properties.",
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
    blurb:"The swing door is the most common interior door type in residential construction. It hangs from hinges on one side and swings in a single direction — either into or out of the room. Swing doors are simple, reliable, easy to install, and work with virtually any door slab. They require clear floor space equal to the door's width for the swing arc, which is their main limitation in tight spaces. Available in any material, style, or size. The default choice for bedrooms, offices, and any room with adequate space.",
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
    blurb:"French doors are a pair of hinged doors — each with glass lites — that meet at the center and swing open simultaneously or independently. They're primarily a design and light-borrowing tool: the glass panels allow natural light to pass between rooms while still providing the ability to close off the space for privacy or sound. French doors are a classic architectural element in traditional, Mediterranean, and transitional homes. Available in full-lite (all glass), half-lite (glass on top, solid below), and with true divided lite or simulated divided lite glass patterns. Interior French doors are often used between a study or home office and a living area, or between a master bedroom and a sitting room.",
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
    blurb:"Interior sliding doors operate on a top-mounted or bottom-track system, gliding horizontally rather than swinging. They're the best interior door choice when swing clearance is unavailable — tight hallways, small bathrooms, walk-in closets, and compact utility rooms. Sliding doors come in several configurations: a standard bypass slider (two panels that pass each other), a single panel that slides along the wall, or a multi-panel configuration that stacks to one side. The tradeoff is that a sliding door can only cover part of the opening at a time (in bypass configurations), and the track requires maintenance to keep debris-free. Not as acoustically tight as a swing door when closed.",
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
    blurb:"Bi-fold doors are hinged panels connected in pairs that fold against each other when opened. They run on a top track and typically have a bottom guide pin. When opened, the panels accordion-fold to one or both sides, exposing the full opening width — something neither a swing door nor a bypass slider can do. Bi-fold doors are most commonly used for closets, laundry rooms, and pantry access where you want full visibility and reach into the space when open. They require only a fraction of the swing clearance of a regular door. Available in louvered, solid panel, mirrored, and glass configurations.",
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
    blurb:"A pocket door slides on a track and disappears entirely into a wall cavity — a framed pocket built between wall studs — when fully open. The result is a completely clear opening with zero door visible and zero floor space consumed. When the door is closed, it fills the opening normally. Pocket doors are the best solution for spaces where no swing arc is possible and a flush wall plane when open is desirable. They're commonly used between rooms where the door needs to completely disappear — between a great room and dining area, a master bathroom and closet, or wherever the door being 'out of the way' is the point. Pocket doors require the wall to be framed specially — best installed during construction or a full remodel.",
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
    blurb:"A barn door is a panel that slides along a surface-mounted track above the door opening rather than running inside a wall pocket or on a floor track. The hardware — the track, hangers, and rollers — is fully exposed and is often a design feature in itself. Barn doors have surged in popularity in contemporary, farmhouse, and transitional residential design over the past decade. They're practical when a pocket door isn't feasible (no wall space for a pocket) but a swing door would intrude. The main limitations are that the door panel hangs in front of the wall when open (covering wall space beside the opening) and the seal is less tight than other door types.",
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
    { id:"nanawall", website:"https://www.nanawall.com", name:"NanaWall", logo:"NW", color:T.gold, tagline:"The Glass Wall Pioneer", tier:"Ultra Premium", tierColor:T.gold, origin:"Corte Madera CA HQ / Solarlux German engineering", overview:"The originator of folding glass walls. When architects in La Jolla or Rancho Santa Fe spec a glass wall, they write NanaWall. Two entry points: the SL60 for residential remodels, and the Generation 4 lineup for architect-specified luxury builds. Eight systems covering aluminum, wood, clad, acoustic, and high-rise applications.", productLines:[
      {name:"NW Aluminum 640 — Gen4 Folding",type:"Folding/Bi-fold",material:"Thermally Broken Aluminum",description:"Flagship Generation 4 aluminum folding wall. Industry's slimmest profile at 3⁷⁄₈\" (99mm) panel intersection. Thermally broken with Bionic Turtle® technology. Gothic Arch stainless steel rollers. FourFold/SixFold panel sets allow unlimited widths. U-value 0.24 (triple LoE) / 0.34 (double LoE). Inswing or outswing. 50 standard powder coat and anodized finishes — Steel Effect (SE) colors available for a classic steel look in aluminum.",uniqueFeatures:["3⁷⁄₈\" (99mm) slimmest profile in industry","Bionic Turtle® concealed thermal break + locking channel","Gothic Arch stainless steel rollers — effortless operation","FourFold/SixFold sets — unlimited system widths","50 standard finishes + Steel Effect colors","Water rated to 9 psf (Performance Sill)","U-value 0.24 triple LoE / 0.34 double LoE"],maxWidth:"Unlimited",maxHeight:"10ft 2in",priceRange:"$$$$$",brochureUrl:"https://www.nanawall.com/sites/default/files/resources/2023-10/NanaWall-Generation-4-Brochure.pdf"},
      {name:"NW Aluminum 840 — Gen4 Folding (Tall)",type:"Folding/Bi-fold",material:"Thermally Broken Aluminum",description:"Generation 4 aluminum folding wall engineered for taller heights — up to 11ft 6in without a swing panel. Same 3⁷⁄₈\" slim profile as the 640 but with superior thermal performance (U-0.20 triple LoE). The system for monumental openings where height is as important as width. 3ft 7in max panel width. Inswing or outswing.",uniqueFeatures:["Up to 11ft 6in height (without swing panel)","3⁷⁄₈\" (99mm) same slim profile as 640","Best-in-class U-value 0.20 triple LoE / 0.31 double LoE","3ft 7in max panel width","Inswing or outswing","Water rated to 9 psf (Performance Sill)"],maxWidth:"Unlimited",maxHeight:"11ft 6in",priceRange:"$$$$$",brochureUrl:"https://www.nanawall.com/sites/default/files/resources/2023-10/NanaWall-Generation-4-Brochure.pdf"},
      {name:"NW Wood 540 — Gen4 Folding",type:"Folding/Bi-fold",material:"Wood",description:"Generation 4 premium wood folding wall. Quadruple laminated, cross-grained sustainably harvested wood frame — delivers exceptional energy efficiency (U-0.19 triple LoE, best in the Gen4 lineup) with a rich warm aesthetic. 5¹¹⁄₁₆\" (144mm) panel profile. 5 standard wood species: Sapeli Mahogany, Pine, Meranti, Western Hemlock, Red Grandis. Up to 9ft 10in height. Inswing or outswing.",uniqueFeatures:["U-value 0.19 triple LoE — best thermal in Gen4 lineup","Quadruple laminated cross-grained sustainably harvested wood","5 wood species: Mahogany, Pine, Meranti, Hemlock, Red Grandis","5¹¹⁄₁₆\" (144mm) profile","FourFold/SixFold unlimited widths","Water rated to 9 psf"],maxWidth:"Unlimited",maxHeight:"9ft 10in",priceRange:"$$$$$",brochureUrl:"https://www.nanawall.com/sites/default/files/resources/2023-10/NanaWall-Generation-4-Brochure.pdf"},
      {name:"NW Clad 740 — Gen4 Folding",type:"Folding/Bi-fold",material:"Aluminum-clad Wood",description:"Generation 4 aluminum-clad wood folding wall. Solid wood core with durable clip-on aluminum cladding on the exterior — warm wood interior, weather-resistant aluminum outside. 5¹³⁄₁₆\" (148mm) panel profile. U-value 0.20 triple LoE. Same sustainable wood core as the NW Wood 540. Up to 9ft 10in height. The system for clients who want interior wood warmth with exterior aluminum durability.",uniqueFeatures:["Solid wood core with clip-on aluminum cladding","U-value 0.20 triple LoE / 0.29 double LoE","5¹³⁄₁₆\" (148mm) profile","Warm wood interior — same species options as Wood 540","FourFold/SixFold unlimited widths","Water rated to 9 psf"],maxWidth:"Unlimited",maxHeight:"9ft 10in",priceRange:"$$$$$",brochureUrl:"https://www.nanawall.com/sites/default/files/resources/2023-10/NanaWall-Generation-4-Brochure.pdf"},
      {name:"NW Reinforced 647/847 — Midrise/High-Rise",type:"Folding/Bi-fold",material:"Reinforced Aluminum",description:"Generation 4 aluminum folding systems engineered for the higher windload requirements of midrise and high-rise buildings. The 647 carries a DP rating of +/-70 psf (CW-PG35); the 847 reaches +/-85 psf (CW-PG55). 5¼\" (133mm) reinforced profiles. The 847 reaches 11ft 6in height. Thermally broken. For mixed-use, multi-story residential, and commercial applications where standard residential systems are insufficiently rated.",uniqueFeatures:["NW 647: DP +/-70 psf / CW-PG35 — midrise rating","NW 847: DP +/-85 psf / CW-PG55 — high-rise rating","5¼\" (133mm) reinforced profile","Thermally broken","Heights to 11ft 6in (847 without swing panel)","Water rated to 9 psf Performance Sill"],maxWidth:"Unlimited",maxHeight:"11ft 6in",priceRange:"$$$$$",brochureUrl:"https://www.nanawall.com/sites/default/files/resources/2023-10/NanaWall-Generation-4-Brochure.pdf"},
      {name:"NW Acoustical 645/545 — Interior",type:"Interior Acoustical Partition",material:"Aluminum / Wood",description:"Generation 4 interior acoustical folding glass wall systems. The aluminum NW Acoustical 645 achieves up to Unit STC 45; the wood NW Acoustical 545 achieves up to Unit STC 41. Both are interior-only systems designed for conference rooms, hospitality spaces, and open-plan residential areas where acoustic separation and visual transparency are both required. Aluminum version reaches 11ft 6in; wood version up to 9ft 10in.",uniqueFeatures:["NW 645 (aluminum): up to Unit STC 45","NW 545 (wood): up to Unit STC 41","Interior systems only — not exterior weather-rated","Aluminum: 3⁷⁄₈\" (99mm) slimmest profile","Wood: 5¹¹⁄₁₆\" (144mm) warm wood aesthetic","FourFold/SixFold unlimited widths"],maxWidth:"Unlimited",maxHeight:"11ft 6in",priceRange:"$$$$$",brochureUrl:"https://www.nanawall.com/sites/default/files/resources/2023-10/NanaWall-Generation-4-Brochure.pdf"},
      {name:"NW SL60 — Residential Folding",type:"Folding/Bi-fold",material:"Thermally Broken Aluminum",description:"NanaWall's residential-focused aluminum folding glass wall — engineered in Germany, made in the USA. Combines NanaWall innovation with a more accessible price point than the Generation 4 platform. Thermally broken, floor supported, tested to 20,000 open/close cycles (equivalent to 27 years of use). U-value 0.35 double glazed / 0.25 triple glazed. Four sill options including the barefoot-friendly Low Profile Saddle Sill. Inswing or outswing. 50 standard powder coat finishes. Configurations include open corner, folding windows, window/door combos, and simulated divided lites. T24 compliant glass available. The entry point into the NanaWall lineup for residential renovation, remodel, and new construction projects.",uniqueFeatures:["Engineered in Germany, Made in USA — NanaWall quality at accessible price","U-value 0.25 with triple glazing / 0.35 double glazed","Low Profile Saddle Sill — barefoot-friendly indoor-outdoor transition","4 sill options: Low Profile Saddle, UniverSILL, Hybrid, High Performance","Tested to 20,000 cycles — 27 years equivalent","Inswing or outswing","Open corner, folding window, and window/door combo configurations","50 standard powder coat finishes + custom color matching","T24 compliant glass option available","Tamper-resistant concealed multipoint locks"],maxWidth:"Unlimited",maxHeight:"Custom",priceRange:"$$$$",brochureUrl:"https://www.nanawall.com/sites/default/files/resources/2025-08/nanawall-SL60-brochure.pdf"},
      {name:"HS/HSW — Single Track Sliding",type:"Multi-Slide",material:"Aluminum",description:"Ultra-slim single-track sliding glass wall with panel stacking or full pocket. Frameless corner and 3D corner configurations available. The NanaWall sliding system for projects where a folding wall is not appropriate — large horizontal spans, frameless corners, ultra-contemporary minimal aesthetic.",uniqueFeatures:["Frameless corner options","3D corner configurations","Panel stacking or true pocket","Minimal sightlines"],maxWidth:"50ft+",maxHeight:"14ft",priceRange:"$$$$$"},
      {name:"CW — Frameless Glass Wall",type:"Frameless",material:"Structural Glass Wall",description:"Near-invisible structural glass wall framing. Maximum transparency — virtually no frame visible. ADA compliant. Custom shapes. The system when the glass itself IS the architecture.",uniqueFeatures:["Virtually frameless","ADA compliant","Custom shapes and configurations","Maximum transparency"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$$"}
    ],frameMaterials:["Thermally Broken Aluminum","Reinforced Aluminum","Wood","Aluminum-clad Wood","Structural Glass Wall"],finishes:[{name:"Matte Black",swatch:"#1A1A1A"},{name:"Dark Bronze",swatch:"#3d2b1f"},{name:"Silver Anodized",swatch:"#c0c0c0"},{name:"White",swatch:"#f0ede6"},{name:"50 Standard Colors",swatch:"linear-gradient(135deg,#C4956A,#3A6898)"},{name:"Steel Effect SE",swatch:"linear-gradient(135deg,#3A3A3A,#707878)"}],differentiators:["Generation 4 — 8 systems across aluminum, wood, clad, reinforced, and acoustical","SL60 — residential entry point with NanaWall quality at a more accessible price","Industry's slimmest profiles — 3⁷⁄₈\" (99mm) aluminum, 5¹¹⁄₁₆\" (144mm) wood","Bionic Turtle® concealed thermal break — security + efficiency in one profile","Gothic Arch stainless steel rollers — smoothest operation in class","FourFold/SixFold panel sets — unlimited system widths","50 standard finishes + Steel Effect SE colors for steel-look in aluminum","Midrise/high-rise rated systems (DP +/-85 psf) for commercial applications","Interior acoustical systems to Unit STC 45"],idealFor:["Architect-specified luxury custom homes in La Jolla, RSF, Del Mar","Projects where the glass wall IS the design centerpiece","Contemporary, modern, and transitional architecture","Residential renovation/remodel wanting NanaWall quality (SL60)","Mixed-use and commercial where high windload rating is required","Interior acoustic partition applications"],limitations:["Highest price in category — budget should be set before specifying","10–16 week lead times on most configurations","Requires experienced NanaWall-certified installer","Folding panels operate as linked chains — not independently slideable"],sdNotes:"Architects in La Jolla, Del Mar, and RSF specify NanaWall by name. Lead with the SL60 for remodel clients on a tighter budget — its barefoot-friendly Low Profile Sill is an easy sell for the SD indoor-outdoor lifestyle. Step up to Gen4 for new construction or when the opening is the design centerpiece. 640 for standard heights, 840 for openings over 10ft. Clad 740 when the architect wants a wood interior." },
    { id:"lacantina", website:"https://www.lacantinadoors.com", name:"LaCantina", logo:"LC", color:T.teal, tagline:"The Indoor-Outdoor Specialist", tier:"Premium", tierColor:T.teal, origin:"Designed & made in California / JELD-WEN", overview:"LaCantina is a pioneer in large opening door systems — the most comprehensive range of folding, multi-slide, and swing doors from a single manufacturer. All systems share the same signature 2¾\" narrow stile and rail profiles so folding, sliding, and swing doors match perfectly across a complete door package. Six material options from budget aluminum to Contemporary Clad wood. Spans up to 65' wide on folding systems. Designed and manufactured in California. Backed by an industry-leading 10-year warranty.", productLines:[
      {name:"Folding — Aluminum",type:"Folding/Bi-fold",material:"Aluminum",description:"LaCantina's entry-level folding system. Clean contemporary 2¾\" stile profile, top hung for ease of operation and longevity. Inswing or outswing. Up to 65' wide, 10' tall, max panel width 39\". Up to 20 panels (10 each direction). U-value 0.48 standard / achieves 0.32 or less with LoE-366 argon glazing upgrade. Concealed multi-point locking. Zero-post corner and window/door combination options. HVHZ impact-rated version available.",uniqueFeatures:["Up to 65ft wide, 10ft tall","20 panels (10 each direction)","Top hung — ease of operation + longevity","Zero-post corner configurations","HVHZ impact-rated version available","Inswing or outswing","U-0.32 or better with LoE-366 argon upgrade"],maxWidth:"65ft",maxHeight:"10ft",priceRange:"$$$",brochureUrl:"https://powersproducts.com/wp-content/uploads/2023/02/la-cantina-sliding-doors-product-brochure.pdf"},
      {name:"Folding — Aluminum Thermally Controlled",type:"Folding/Bi-fold",material:"Thermally Broken Aluminum",description:"Step-up aluminum folding system with thermal breaks throughout and a proprietary core-and-fascia design enabling split interior/exterior finish colors. 2 15/16\" stile profile. U-value 0.37 standard; achieves 0.32 or less with LoE-366 argon upgrade. Best choice when energy performance matters but budget doesn't extend to clad wood.",uniqueFeatures:["Thermally broken — improved energy performance","Split interior/exterior finish colors","2 15/16\" stile profile","U-0.37 / achieves 0.32 or better with upgrade","Same configurations as aluminum system"],maxWidth:"65ft",maxHeight:"10ft",priceRange:"$$$$",brochureUrl:"https://powersproducts.com/wp-content/uploads/2023/02/la-cantina-sliding-doors-product-brochure.pdf"},
      {name:"Folding — Contemporary Clad",type:"Folding/Bi-fold",material:"Aluminum-clad Wood",description:"LaCantina's most energy-efficient folding system. Low-maintenance aluminum exterior with natural wood interior warmth. Best U-value in the folding lineup at 0.31 standard — achieves 0.32 or better standard with LoE-366 argon. Narrow 2 15/16\" clad profile. In-stock in VG Fir or Sapele Mahogany; optional Quarter Sawn White Oak, Pine, Black Walnut, Clear Alder. The system for architect-specified residential projects wanting wood interior and aluminum exterior durability.",uniqueFeatures:["U-0.31 — most energy efficient LaCantina folding system","Wood interior: VG Fir, Sapele Mahogany standard","Optional oak, pine, walnut, alder","Low-maintenance aluminum exterior","2 15/16\" slim clad profile","Zero-post corner configurations"],maxWidth:"65ft",maxHeight:"10ft",priceRange:"$$$$",brochureUrl:"https://powersproducts.com/wp-content/uploads/2023/02/la-cantina-sliding-doors-product-brochure.pdf"},
      {name:"Folding — Vinyl",type:"Folding/Bi-fold",material:"Vinyl",description:"A vinyl folding door option for clients who need vinyl continuity with their window package. Matches popular vinyl window packages. Excellent thermal performance (U-0.34 with LoE-366 argon standard). 2 15/16\" stile profile. Good for home renovations and new construction where vinyl window continuity is desired. Available in white and tan.",uniqueFeatures:["Vinyl folding door — matches vinyl window packages","U-0.34 with LoE-366 argon standard","Matches vinyl window packages","Ideal for home renovation continuity","Available in white or tan"],maxWidth:"Custom",maxHeight:"10ft",priceRange:"$$$",brochureUrl:"https://powersproducts.com/wp-content/uploads/2023/02/la-cantina-sliding-doors-product-brochure.pdf"},
      {name:"Multi-Slide — Stacking & Pocket",type:"Multi-Slide / Pocket",material:"Aluminum / Thermally Broken / Clad Wood",description:"LaCantina's multi-slide class combines the aesthetics of a lift-slide with the value of a multi-slide. Individual panels up to 8' wide and 12' tall (max 60 sq ft of glass per panel). Up to 12 panels, 6 in each direction. Stacking and full pocket configurations. Available in Aluminum (U-0.48), Aluminum Thermally Controlled (U-0.46), Aluminum Wood (U-0.41), and Contemporary Clad (U-0.34). AAMA-certified low-profile acetal wheels. Same narrow 2¾\" profiles as folding system — perfect match for mixed folding/sliding projects.",uniqueFeatures:["Panels up to 8ft wide × 12ft tall","12 panels (6 each direction)","Full pocket configurations available","U-0.34 with Contemporary Clad","AAMA-certified ACETAL wheels — quiet, smooth operation","Matches folding door profiles exactly","Flush sill option"],maxWidth:"Custom",maxHeight:"12ft",priceRange:"$$$$",brochureUrl:"https://powersproducts.com/wp-content/uploads/2023/02/la-cantina-sliding-doors-product-brochure.pdf"},
      {name:"Swing — Single & French Doors",type:"Swing Door",material:"Aluminum / Clad Wood / Wood",description:"LaCantina swing doors use the same narrow stile/rail profiles as the folding and multi-slide systems — enabling a fully matched complete door package across an entire project. Up to 7' wide, 10' tall, max panel width 42\". Available in 5 materials. U-values: Aluminum 0.55, Aluminum TC 0.53, Aluminum Wood 0.40, Contemporary Clad 0.33, Wood 0.31. Hidden twin bolt lock for minimal aesthetic. Heavy-duty architectural stainless hinges for large panel weights. Inswing and outswing.",uniqueFeatures:["Matches folding + multi-slide profiles — complete door package","Up to 7ft wide, 10ft tall","5 material options","Hidden twin bolt lock — clean minimal aesthetic","Heavy-duty architectural stainless hinges","Inswing and outswing"],maxWidth:"7ft",maxHeight:"10ft",priceRange:"$$$–$$$$",brochureUrl:"https://powersproducts.com/wp-content/uploads/2023/02/la-cantina-sliding-doors-product-brochure.pdf"}
    ],frameMaterials:["Extruded Aluminum","Thermally Broken Aluminum","Aluminum-clad Wood","Wood","Vinyl"],finishes:[{name:"Shadow Black",swatch:"#1A1A1A"},{name:"White",swatch:"#f0ede6"},{name:"Bronze Anodized",swatch:"#3d2b1f"},{name:"Clear Anodized",swatch:"#a0a8a8"},{name:"Custom Color",swatch:"linear-gradient(135deg,#7A5A3A,#3A6898)"}],differentiators:["Only major brand offering vinyl folding door","All systems share matching 2¾\" profiles — complete door package from one brand","65ft wide folding systems — widest in class","Panels up to 8ft wide × 12ft tall on multi-slide","6 material options across folding, multi-slide, and swing","HVHZ impact-rated folding available","10-year industry-leading warranty","Designed and manufactured in California"],idealFor:["High-end residential remodels wanting matched folding + sliding + swing from one brand","Projects needing vinyl folding to match vinyl window package","Contemporary architecture — San Diego custom builders","Value vs. NanaWall when budget matters","Mixed-material projects: aluminum folding with clad wood swing"],limitations:["Less architect-prestige than NanaWall at ultra-luxury level","Aluminum (non-TC) system has relatively high U-value (0.48)","Wood system not available in multi-slide"],sdNotes:"Extremely popular with San Diego custom builders — LaCantina's California manufacturing and broad dealer presence make it the practical go-to for indoor-outdoor projects at the $20K–$60K system budget range. The matched profiles across folding, multi-slide, and swing are a genuine competitive advantage: a client can spec a folding wall on the living room, a multi-slide on the bedroom, and swing doors on the dining room and every profile lines up perfectly. The vinyl folding system is the category differentiator — no other major manufacturer offers it, and it opens the door to renovation clients whose window package is vinyl. Contemporary Clad at U-0.31 is the answer when an architect wants energy performance and wood interior warmth. The HVHZ impact-rated folding system is worth knowing for any project near the coast." },
    { id:"andersen", website:"https://www.andersenwindows.com", name:"Andersen", logo:"AW", color:T.slate, tagline:"The Trusted All-Rounder", tier:"Premium", tierColor:T.slate, origin:"Family-owned, Bayport MN — 120+ years", overview:"America's largest window/door manufacturer. Excels at whole-house continuity. MultiGlide is the widest sliding wall at any price point. Product range spans the 100 Series Fibrex® composite (the smart alternative to vinyl), 400 Series alum-clad wood, E-Series large opening systems, and Weiland ultra-luxury lift-slide.", productLines:[{name:"E-Series",type:"Windows / Patio Doors / Multi-Slide / Folding",material:"Alum-clad Wood/Fibrex®",description:"Widest sliding glass wall — up to 50ft. Ball-bearing rollers, panels to 500 lbs.",uniqueFeatures:["50ft system width","50+ color options","True pocket"],maxWidth:"50ft",maxHeight:"12ft",priceRange:"$$$$",brochureUrl:"https://dolanlumber.com/wp-content/uploads/2025/08/E-Series-Consumer-Brochure.pdf"},{name:"E-Series Folding Outswing",type:"Folding",material:"Alum-clad Wood",description:"Outswing preserves interior floor space.",uniqueFeatures:["Outswing option","Matches E-Series windows"],maxWidth:"30ft",maxHeight:"10ft",priceRange:"$$$$"},{name:"400 Series",type:"Windows & Patio Doors",material:"Alum-clad Wood/Fibrex®",description:"Flagship window line. 50+ exterior colors.",uniqueFeatures:["50+ colors","Fibrex® composite","Lifetime glass warranty"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$–$$$$",brochureUrl:"https://www.hwconstruction.com/hubfs/Website%20(DO%20NOT%20DELETE)/Exterior/windows/Andersen/Andersen%20Windows%20400%20Series%20Brochure.pdf"},{name:"A-Series",type:"Windows & Doors",material:"Alum-clad Wood / Fibrex®",description:"Andersen's architect-grade premium line. The most customizable Andersen product — virtually unlimited sizes, shapes, and color combinations. Wood interior warmth with durable clad exterior. Covers the full range: casement, awning, double-hung, gliding, specialty, and patio doors. The go-to when a project demands exact custom sizing or a one-of-a-kind design detail that the 400 Series can't accommodate.",uniqueFeatures:["Virtually unlimited custom sizes","50+ exterior colors","Wood interior options","Full operating style range","Architect-specified custom configurations"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$–$$$$$",brochureUrl:"https://eastridgesupply.com/wp-content/uploads/Andersen-A-Series_Consumer_Brochure.pdf"},{name:"Weiland LiftSlide",type:"Lift & Slide",material:"Aluminum",description:"Ultra-luxury lift-and-slide. Panels to 10ft×15ft.",uniqueFeatures:["Panels up to 10ft wide","Lift mechanism","Monolithic presence"],maxWidth:"Custom",maxHeight:"15ft",priceRange:"$$$$$",brochureUrl:"https://www.prioritydoorwindow.com/wp-content/uploads/2016/01/Weiland-Brochure.pdf"},{name:"100 Series — Fibrex® Composite",type:"Windows & Patio Doors",material:"Fibrex® Composite",description:"Andersen's smart alternative to vinyl — made from Fibrex® composite material (40% reclaimed wood fiber + thermoplastic polymer). 2x stronger than vinyl, withstands temperatures up to 150°F without warping, finish is 12x thicker than painted vinyl and never needs painting. Available in 5 exterior colors including black and dark bronze — colors richer and darker than typical vinyl. Product types: single-hung, gliding, casement, awning, gliding patio doors, and specialty/fixed. Glass options include Low-E, SmartSun™, and HeatLock® coating for southern-climate solar control. Transferable warranty: 20 years on glass, 10 years on non-glass parts — carries full value to next owner. ENERGY STAR v6.0 certified.",uniqueFeatures:["Fibrex® composite — 2x stronger than vinyl, never warps","Withstands 150°F — safe in dark colors in San Diego sun","12x thicker finish than painted vinyl — no painting ever","40% reclaimed wood fiber — LEED-contributing, sustainable","5 colors including black and dark bronze","Transferable 20-yr glass / 10-yr non-glass warranty","Low-E SmartSun™ glass — ideal for SD southern-exposure windows","Full range: single-hung, gliding, casement, awning, patio door, specialty"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$–$$$",brochureUrl:"https://eastridgesupply.com/wp-content/uploads/Andersen-100_Series_Consumer_Brochure.pdf"}],frameMaterials:["Aluminum-clad Wood","Fibrex® Composite","Extruded Aluminum"],finishes:[{name:"Black",swatch:"#1A1A1A"},{name:"Dark Bronze",swatch:"#3d2b1f"},{name:"Terratone",swatch:"#7a5a3a"},{name:"Sandtone",swatch:"#5A4A30"},{name:"White",swatch:"#f0ede6"},{name:"50+ Colors (E-Series)",swatch:"linear-gradient(135deg,#e83,#3e8)"}],differentiators:["MultiGlide — widest in market at 50ft","100 Series Fibrex® — 2x stronger than vinyl, never warps, never paints","50+ exterior colors on E-Series","Weiland lift-slide for monumental walls","Best whole-house package continuity — budget to ultra-luxury in one brand","Transferable 20-year glass warranty on 100 Series"],idealFor:["Whole-house replacement packages","100 Series: vinyl-replacement clients wanting stronger, darker-color options","Traditional to transitional architecture","Clients wanting color options","San Diego heat — SmartSun™ glass for south/west exposures"],limitations:["Aluminum-clad wood needs maintenance","Higher price than Milgard on like-for-like vinyl comparison","100 Series not for large-format opening systems"],sdNotes:"Strong whole-house story for Carmel Valley, Rancho Bernardo, Encinitas. Weiland for La Jolla ultra-luxury. The 100 Series is an underused talking point in SD — it's the right answer when a client wants to replace vinyl windows and wants black or dark bronze frames without paying E-Series prices. The 150°F heat tolerance is a genuine differentiator in San Diego's sun: dark vinyl can warp and fade, Fibrex® won't. Lead with SmartSun™ glass on any south or west-facing window — it's engineered for exactly the southern-climate solar control that SD homes need." },
    { id:"marvin", website:"https://www.marvin.com", name:"Marvin", logo:"MV", color:T.rust, tagline:"The Craftsman's Choice", tier:"Luxury", tierColor:T.rust, origin:"Family-owned since 1912, Warroad MN", overview:"The architect's preferred spec for high-end residential. Coastal stainless hardware program makes it the definitive choice for San Diego waterfront properties.", productLines:[{name:"Signature Ultimate",type:"Windows / Patio Doors / Folding Doors / Multi-Slide / Lift & Slide",material:"Alum-clad Wood",description:"Flagship folding door. Wood interior, coastal stainless option.",uniqueFeatures:["Coastal stainless hardware","Custom paint match","Hurricane rated"],maxWidth:"30ft",maxHeight:"10ft",priceRange:"$$$$$",brochureUrl:"https://marvinbyeldredge.com/wp-content/uploads/marvin-ultimate-collection-catalog.pdf"},{name:"Elevate",type:"Windows & Patio Doors",material:"Ultrex® Fiberglass + Wood",description:"Ultrex® exterior (8x stronger than vinyl), wood interior.",uniqueFeatures:["Ultrex® fiberglass","Never repaints","SolarZone glass"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$$",brochureUrl:"https://marvinbyeldredge.com/wp-content/uploads/marvin-elevate-collection-catalog.pdf"},{name:"Essential",type:"Windows & Patio Doors",material:"Ultrex® Fiberglass",description:"All-fiberglass. Entry-level Marvin, full Marvin quality.",uniqueFeatures:["Paintable","Most affordable Marvin"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$",brochureUrl:"https://marvinbyeldredge.com/wp-content/uploads/marvin-essential-collection-catalog.pdf"}],frameMaterials:["Ultrex® Fiberglass","Aluminum-clad Wood"],finishes:[{name:"Black",swatch:"#1A1A1A"},{name:"White",swatch:"#f0ede6"},{name:"Ebony",swatch:"#2a2020"},{name:"Raw Linen",swatch:"#3A3020"},{name:"Custom Paint",swatch:"linear-gradient(135deg,#C4956A,#8FA8C8)"}],differentiators:["Coastal stainless hardware — for salt-air environments","Ultrex® fiberglass — 8x stronger than vinyl","Custom paint match any color","Family-owned 110+ years"],idealFor:["Coastal SD properties","Traditional/craftsman/transitional","Architect-specified luxury builds"],limitations:["Premium pricing","Wood interiors need care","Fewer frameless options"],sdNotes:"Definitive choice for La Jolla oceanfront, Del Mar bluffs, Coronado. Coastal stainless = key SD differentiator." },
    { id:"pella", website:"https://www.pella.com", name:"Pella", logo:"PW", color:T.ember, tagline:"The Design-Forward Mid-Premium All-Rounder", tier:"Premium", tierColor:T.ember, origin:"Family-owned, Pella IA — 100+ years", overview:"One of America's most recognized window and door brands, Pella bridges mainstream accessibility with genuine design depth. Known for in-between-the-glass blinds and shades, a wide color palette, and strong dealer support. Their Impervia fiberglass and Reserve wood lines bring real premium credentials, while the 250 and 350 series give budget-managed projects solid performance. Pella is well-distributed in Southern California and a familiar name to homeowners — helpful when the client already has brand awareness.", productLines:[{name:"Architect Series — Folding/Sliding",type:"Multi-Slide / Folding",material:"Alum-clad Wood / Aluminum",description:"Large-format folding and sliding door systems. Less common than NanaWall/LaCantina in SD but available for whole-house Pella continuity.",uniqueFeatures:["Whole-house continuity","Aluminum or wood clad","Custom configurations"],maxWidth:"30ft",maxHeight:"10ft",priceRange:"$$$$"},{name:"Reserve — Contemporary",type:"Windows & Doors",material:"Alum-clad Wood",description:"Contemporary take on the Reserve line. Slimmer sightlines, modern profiles, wood interior warmth with aluminum-clad exterior.",uniqueFeatures:["Contemporary profiles","Slim sightlines","Wood interior"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$$",brochureUrl:"https://bureshhomesolutions.com/wp-content/uploads/2023/08/Pella-Reserve-Windows.pdf"},{name:"Reserve — Wood",type:"Windows & Doors",material:"Alum-clad Wood",description:"Luxury aluminum-clad wood line. Interior wood warmth, durable clad exterior. Competes with Andersen E-Series.",uniqueFeatures:["Interior wood warmth","Custom sizes","Architect-specified"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$$",brochureUrl:"https://adkinsandsonswindows.com/wp-content/uploads/2024/09/Pella-Reserve-Traditional-2024-3.pdf"},{name:"Impervia — Fiberglass",type:"Windows & Doors",material:"Fiberglass",description:"Pella's flagship fiberglass line. Paintable, strong coastal performance, excellent for San Diego's salt-air zones. Competitive with Milgard Ultra.",uniqueFeatures:["Paintable any color","Stronger than vinyl","Salt-air rated"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$–$$$$",brochureUrl:"https://windowinstallationpittsburgh.com/wp-content/uploads/2022/02/Pella-Impervia-2.0-2021.pdf"},{name:"Pella 250 Series — Vinyl",type:"Windows",material:"Vinyl",description:"Entry-level vinyl. Good thermal performance, clean profiles. Best for budget-managed projects.",uniqueFeatures:["ENERGY STAR rated","Affordable","Full range of operating styles"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$",brochureUrl:"https://robertsrestorations.com/wp-content/uploads/2022/05/Pella-250-Series-Brochure.pdf"}],frameMaterials:["Vinyl","Fiberglass","Aluminum-clad Wood"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Black",swatch:"#1A1A1A"},{name:"Bronze",swatch:"#3d2b1f"},{name:"Putty",swatch:"#c8b89a"},{name:"Designer Colors",swatch:"linear-gradient(135deg,#8FA8C8,#C87A4A)"}],differentiators:["Between-the-glass blinds/shades — unique convenience feature","Strong homeowner brand recognition","Impervia fiberglass competitive with Milgard Ultra","Full range from budget vinyl to luxury wood","Good dealer support in Southern California"],idealFor:["Homeowners who arrive with Pella brand familiarity","Whole-house continuity packages mid-to-premium","Clients wanting between-the-glass blinds for privacy without cleaning"],limitations:["Folding door systems less specialized than NanaWall/LaCantina","Reserve wood requires maintenance","Less architect-specified than Marvin in ultra-luxury"],sdNotes:"Pella's Impervia fiberglass is a strong Milgard Ultra alternative — worth proposing when a client wants paintable fiberglass with a recognized brand. Between-the-glass blinds is a genuine differentiator — bring it up on any project near a neighbor or busy street where privacy matters. Pella dealer presence in SD makes stocking and service reliable." },

    { id:"weathershield", website:"https://www.weathershield.com", name:"Weather Shield", logo:"WS", color:T.plum, tagline:"The Mountain & Coastal Luxury Wood Specialist", tier:"Luxury", tierColor:T.plum, origin:"Medford WI — family-owned since 1955", overview:"A family-owned Wisconsin manufacturer with 70+ years making aluminum-clad wood windows and doors. Three distinct collections: Signature Series for the full classic range, Contemporary Series for architect-specified modern builds, and Vue Series for slim-profile transitional projects. Less brand-recognized than Andersen or Marvin in San Diego — which means better margin for the dealer and similar quality tier.", productLines:[{name:"Signature Series",type:"Windows & Patio Doors",material:"Aluminum-clad Wood",description:"Weather Shield's classic aluminum-clad wood line — the core of what they've built for 70 years. Covers the full range: double hung, casement, awning, slider, specialty shapes, sliding patio doors, and hinged patio doors. Tricore™ frame technology with welded aluminum corners and a multi-chambered composite sub-frame for thermal performance. Pine wood interior standard; factory-finished white, black, or stained options. AAMA 2605 premium exterior paint. 20-year warranty, 30-year anti-rot on clad. Zo-e-shield® glazing system for energy efficiency.",uniqueFeatures:["Full window & door range — double hung to hinged patio","Tricore™ frame — welded corners, thermal composite sub-frame","Pine interior with factory stain/finish options","AAMA 2605 exterior paint — resists fading and chalking","Zo-e-shield® glazing — Low-E, argon, Real Warm-Edge spacer","20-yr warranty / 30-yr anti-rot on clad products"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$–$$$$",brochureUrl:"https://www.qualitywindowanddoorinc.com/wp-content/uploads/2017/09/Weather-Shield-Signature-Series-Catalog.pdf"},{name:"Contemporary Series",type:"Windows & Patio Doors",material:"Aluminum-clad Wood",description:"Architect-focused contemporary collection with clean lines, minimal frame profiles, and expansive glass areas. Designed for modern and transitional high-end builds where the window is part of the design statement. Custom sizes and configurations throughout.",uniqueFeatures:["Minimal sightlines for contemporary design","Expansive glass area capability","Custom sizes and configurations","Architect-specified"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$",brochureUrl:"https://www.qualitywindowanddoorinc.com/wp-content/uploads/2017/09/Weather-Shield-Contemporary-Collection-Catalog.pdf"},{name:"Vue Series",type:"Windows & Patio Doors",material:"Aluminum-clad Wood",description:"Weather Shield's slim-profile contemporary line. Clean sightlines, modern proportions, aluminum-clad exterior with wood interior. Designed for transitional architecture where slim frames and large glass areas are the priority without going full architect-spec custom.",uniqueFeatures:["Slim contemporary profiles","Aluminum-clad exterior","Wood interior warmth","Large glass area capability"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$–$$$$",brochureUrl:"https://rockmanwindowsanddoors.com/wp-content/uploads/2022/08/Weather-shield-Vue-brochure.pdf"}],frameMaterials:["Aluminum-clad Wood","Extruded Aluminum","Vinyl"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Black",swatch:"#1A1A1A"},{name:"Bronze",swatch:"#5a3a1a"},{name:"150+ Colors",swatch:"linear-gradient(135deg,#B8A0C8,#4A7848)"},{name:"Custom Match",swatch:"linear-gradient(135deg,#8FA8C8,#C9A84C)"}],differentiators:["150+ exterior colors — widest palette in class","True custom shapes and specialty units — no upcharge","Family-owned — responsive and consistent","Strong coastal and high-elevation performance specs","Less over-specified in SD — gives rep a differentiated story"],idealFor:["Architects and designers wanting non-standard window shapes","Luxury builds wanting something other than Andersen/Marvin","Projects mixing windows and large patio door systems","High-elevation properties (Julian, Palomar, Cuyamaca)"],limitations:["Lower homeowner brand recognition than Andersen/Marvin","Lead times can be longer on full custom","Fewer dealer touchpoints locally than Andersen"],sdNotes:"Weather Shield is the brand to pull out when an architect or discerning homeowner asks 'what else is out there?' The 150+ color palette immediately differentiates from Milgard's 4 colors and Andersen's 50. Specialty custom windows for arched tops, radius, and unusual shapes are a genuine strength — no other brand handles non-standard shapes as cleanly. Worth pushing on high-elevation projects (Julian, Cuyamaca, Palomar) where the thermal and performance specs are engineered for exactly those conditions." },

    { id:"milgard", heroImage:"/milgard-hero.avif", website:"https://www.milgard.com", name:"Milgard", logo:"MG", color:T.sage, tagline:"The California Value Leader", tier:"Mid-Premium", tierColor:T.sage, origin:"Tacoma WA — serving CA since 1962", overview:"Most trusted window brand in California. Lifetime warranty, popular black Trinsic Series, and California manufacturing make it the go-to for whole-house packages.", productLines:[{name:"Moving Glass Walls",type:"Folding/Multi-Slide",material:"Aluminum",description:"Top-hung bi-fold, stacking, and pocket configurations.",uniqueFeatures:["Top-hung bi-fold","ENERGY STAR","Competitive pricing"],maxWidth:"30ft",maxHeight:"10ft",priceRange:"$$$$–$$$$$",brochureUrl:"https://energyexteriorsnw.com/wp-content/uploads/2024/05/AX550_Brochure.pdf"},{name:"Ultra C700 Series — Fiberglass",type:"Windows",material:"Fiberglass",description:"Premium fiberglass. Paintable, excellent coastal performance.",uniqueFeatures:["Paintable any color","Stronger than vinyl","Lifetime warranty"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$$"},{name:"Tuscany V400 Series — Vinyl",type:"Windows",material:"Vinyl",description:"Milgard's flagship vinyl line. Traditional beveled frame profile with more substantial sightlines than the Trinsic. Priced above Trinsic — the premium vinyl option for clients who prefer a classic look over the slim contemporary profile.",uniqueFeatures:["Flagship vinyl line","Beveled frame profile","Lifetime warranty"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$–$$$$",brochureUrl:"https://www.milgard.com/sites/default/files/brochure/MG_V400-V2_TuscanySeries_brochure_110525_DIGI.pdf"},{name:"Trinsic V300 Series — Vinyl",type:"Windows",material:"Vinyl",description:"Contemporary slim-profile vinyl. Black Trinsic is #1 in SD luxury remodels. More affordable than the Tuscany flagship — the value play within Milgard's vinyl lineup without sacrificing the modern look.",uniqueFeatures:["Slim sightlines for vinyl","Black interior/exterior","Lifetime warranty"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$",brochureUrl:"https://www.hhrexteriors.com/wp-content/uploads/2022/12/Milgard-Trinsic-brochure.pdf"},{name:"Style Line V250 Series — Vinyl",type:"Windows",material:"Vinyl",description:"Builder-grade vinyl window line. Milgard's production builder workhorse — standard sizes, fast availability, competitive pricing. Clean profile, white standard, limited colors. The go-to for tract homes and production builds in Chula Vista, Otay Ranch, and Santee where cost per unit matters.",uniqueFeatures:["Builder-grade pricing","Fast availability in standard sizes","Lifetime warranty","Full operating style range"],maxWidth:"Various",maxHeight:"Various",priceRange:"$–$$",brochureUrl:"https://www.lighthouse-windows.com/wp-content/uploads/2021/04/milgard-style_line_series-2021.pdf"},{name:"A250 Series — Thermally Broken Aluminum",type:"Windows",material:"Thermally Broken Aluminum",description:"Milgard's thermally broken aluminum window line. Commercial-grade thermal performance in a residential aluminum profile. Title 24 compliant, coastal-rated, available in casement, fixed, awning, and slider configurations. Pairs with Milgard's aluminum door systems for whole-house aluminum continuity.",uniqueFeatures:["Thermally broken frame","Title 24 compliant","Coastal salt-air rated","Pairs with Milgard aluminum doors"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$–$$$$",brochureUrl:"https://constructionwindows.com/media/wysiwyg/images/resources/aluminum-thermal/pdf/Thermal-Break-Aluminum-A250-Brochure.pdf"}],frameMaterials:["Vinyl","Fiberglass","Thermally Broken Aluminum","Extruded Aluminum"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Black",swatch:"#1A1A1A"},{name:"Bronze",swatch:"#3d2b1f"},{name:"Tan",swatch:"#8A6020"}],differentiators:["Full Lifetime Warranty — transferable","Trinsic black — #1 SD luxury remodel window","California-made — fast ETAs","Best price-to-performance for packages"],idealFor:["High-value whole-house packages","Modern homes wanting black frame","Budget-managed luxury remodels"],limitations:["Only 4–5 colors","Not for ultra-luxury spec","Dark vinyl can warp in extreme heat"],sdNotes:"Trinsic black windows everywhere in SD luxury remodels. California presence = faster ETAs. Strong for Carmel Valley, Scripps Ranch, Encinitas." },

    { id:"alpine", website:"https://www.alpinewindowsystems.com", name:"Alpine Windows", logo:"AW", color:T.teal, tagline:"The Vinyl-Only Value Specialist", tier:"Mid-Premium", tierColor:T.teal, origin:"Salt Lake City UT — Western US vinyl specialist", overview:"Alpine Windows is a vinyl-only manufacturer focused on delivering high-performance, energy-efficient windows at a competitive price point for the Western US market. They are not a luxury brand — but that's precisely their strength. For whole-house replacement projects where budget discipline matters and the client wants a clean, reliable vinyl window without paying Milgard Trinsic prices, Alpine is a compelling story. Strong ENERGY STAR compliance, good sightline profiles, and Western US distribution make them a practical choice for value-managed SD remodels.", productLines:[{name:"Alpine 70 Series",type:"Windows",material:"Vinyl",description:"Alpine's premium vinyl window line. Heavier-duty frame construction, enhanced weatherstripping, and improved thermal performance over the standard series. The right spec when you want Alpine pricing but need a more robust product — upgrade from the base line without moving to Milgard.",uniqueFeatures:["Heavier-duty frame","Enhanced weatherstripping","Improved thermal performance","Full operating style range"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$–$$$",brochureUrl:"https://cksidaho.com/wp-content/uploads/2020/04/Alpine-70-Series-Window-Brochure.pdf"},{name:"Alpine 80 Series",type:"Windows",material:"Vinyl",description:"Alpine's top-of-line vinyl window. Larger frame profile than the 70 Series, maximum structural rigidity, and the best thermal performance in the Alpine lineup. The spec for larger openings and projects where Alpine is the brand but performance requirements are higher.",uniqueFeatures:["Largest frame profile","Maximum structural rigidity","Best thermal performance in Alpine lineup","Full operating style range"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$",brochureUrl:"https://www.alpinewindowsystems.com/wp-content/uploads/sites/4/2024/06/Alpine-80-Series-Window-Brochure.pdf"}],frameMaterials:["Vinyl"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Tan / Almond",swatch:"#c8b89a"},{name:"Black",swatch:"#1A1A1A"},{name:"Bronze",swatch:"#3d2b1f"}],differentiators:["Best price-per-window in the Western US vinyl category","Strong ENERGY STAR compliance across all climate zones","Clean profiles — not builder-grade looking","Fast Western US lead times","Right-size solution when Milgard is over-budget"],idealFor:["Budget-managed whole-house vinyl replacements","Rental property and multi-unit upgrades","Secondary and back-of-house windows on premium projects","Clients who just need reliable, clean vinyl windows"],limitations:["Vinyl only — no fiberglass or wood options","Limited color selection vs. Pella or Andersen","Not appropriate for luxury or architect-specified projects","No large-format door wall systems"],sdNotes:"Alpine's sweet spot in San Diego is the Chula Vista, El Cajon, Santee, and Oceanside whole-house replacement market where the homeowner needs 15–25 windows replaced at a budget. Don't lead with Alpine on La Jolla or RSF — but when a Carmel Valley client says 'I need to stay under $X for the whole house,' Alpine lets you close the deal and still deliver a quality product. Also useful as the back-of-house or secondary window budget on projects where the main living areas get Milgard or Pella." },

    { id:"jeldwen_win", website:"https://www.jeld-wen.com", name:"JELD-WEN Windows", logo:"JW", color:T.slate, tagline:"Global Range from Budget Vinyl to Custom Wood", tier:"Premium", tierColor:T.slate, origin:"Klamath Falls OR — global manufacturer in 20+ countries", overview:"JELD-WEN is one of the world's three largest window and door manufacturers, and their window range spans from entry-level vinyl all the way to premium aluminum-clad wood. Their V-2500 and V-4500 vinyl lines are workhorses for production builders; their Siteline EX aluminum-clad wood line competes with Andersen 400 Series and Marvin Essential. In San Diego, JELD-WEN is particularly useful as a one-brand solution for builders who want to run vinyl windows through most of the house but spec a wood or fiberglass product at the primary living areas — all on one purchase order.", productLines:[{name:"Custom Series",type:"Custom Windows",material:"Wood / Clad Wood",description:"JELD-WEN's custom-order architectural line for non-standard shapes, oversized units, and architect-specified applications. Longer lead times.",uniqueFeatures:["True custom shapes","Architect-specified","Non-standard sizes"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$–$$$$$",brochureUrl:"https://cmd-jeld-wen.s3.us-east-2.amazonaws.com/assets/documents/792257261.pdf"},{name:"Siteline",type:"Windows & Doors",material:"Aluminum-clad Wood",description:"JELD-WEN's flagship residential line. Aluminum exterior, wood interior. Wide color selection, custom configurations. Competes with Andersen 400 and Marvin Essential.",uniqueFeatures:["Alum-clad durability","Interior wood warmth","Custom configurations"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$–$$$$",brochureUrl:"https://www.moldingsplus.com/wp-content/uploads/2021/02/JeldWen-Siteline-Collection.pdf"},{name:"V-4500 Series — Premium Vinyl",type:"Windows",material:"Vinyl",description:"Mid-tier vinyl with improved sightlines, better hardware, and more color options than V-2500. Good upgrade step without leaving the brand.",uniqueFeatures:["Improved sightlines","Better hardware","More color options"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$–$$$",brochureUrl:"https://7653313.fs1.hubspotusercontent-na1.net/hubfs/7653313/catalogs%20and%20product%20info/11-520A%20Premium%20Vinyl%20Catalog%20LR%20022823.pdf"},{name:"V-2500 Series — Builders Series",type:"Windows",material:"Vinyl",description:"Entry-level vinyl production window. Pre-glazed, fast availability, competitive pricing. The standard track for production builders.",uniqueFeatures:["Production builder pricing","Fast availability","Full operating style range"],maxWidth:"Various",maxHeight:"Various",priceRange:"$–$$",brochureUrl:"https://omahadoor.com/wp-content/uploads/2021/02/Jeld-Wen-Builders-Vinyl-2-2019-Windows-Patio-Drs-brochure.pdf"}],frameMaterials:["Vinyl","Aluminum-clad Wood","Extruded Aluminum"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Black",swatch:"#1A1A1A"},{name:"Bronze",swatch:"#3d2b1f"},{name:"Anodized Silver",swatch:"#a0a8a8"},{name:"Custom Painted",swatch:"linear-gradient(135deg,#8FA8C8,#A0B89A)"}],differentiators:["Widest product range — one brand from $$ vinyl to $$$$ wood","Siteline EX competes directly with Andersen 400 and Marvin Essential","AuraLast treated wood for coastal-adjacent applications","Production builder pricing on V-2500 — lowest cost per window","Global manufacturing — usually in-stock on standard sizes"],idealFor:["Production builders wanting one vendor across the whole project","Projects mixing budget vinyl (secondary) and premium wood (primary)","Whole-house packages where cost per window is the decision driver","Mid-range remodels wanting alum-clad wood without Andersen/Marvin pricing"],limitations:["Brand is less recognized by homeowners than Andersen or Milgard","Custom lead times can stretch on Siteline EX","V-2500 quality difference vs. Milgard is noticeable on close inspection","Less architect-prestige than Marvin"],sdNotes:"JELD-WEN's main value proposition in SD is the mixed-spec play: run V-4500 vinyl on all the secondary bedrooms, bathrooms, and back of house, then spec Siteline EX alum-clad wood on the living areas and primary bedroom. One vendor, one rep relationship, one purchase order. Very useful for production builders in Chula Vista, Otay Ranch, and Santee where cost per unit is everything. Siteline EX is also a legitimate Andersen 400 competitor for mid-tier custom home clients who want wood interior warmth at a better price." },

    { id:"simonton", website:"https://www.simonton.com", name:"Simonton Windows", logo:"SW", color:T.gold, tagline:"The Proven Production Vinyl Workhorse", tier:"Mid-Premium", tierColor:T.gold, origin:"Parkersburg WV — owned by Ply Gem / Cornerstone Building Brands", overview:"Simonton is one of the most widely installed vinyl window brands in the United States, with a long track record in production residential construction. Their lead San Diego product is the Daylight Max — a vinyl window engineered for maximum glass area and slim sightlines, which is exactly what the SD market wants. Broad Western US distribution, consistent quality, and competitive pricing make Simonton a reliable go-to for production remodels, investment properties, and budget whole-house replacements.", productLines:[{name:"Daylight Max — Vinyl",type:"Windows",material:"Vinyl",description:"Simonton's primary San Diego product. Engineered for maximum glass-to-frame ratio — slimmer sightlines and larger visible glass area than standard vinyl windows. ENERGY STAR certified, Low-E standard. The product to lead with in SD conversations.",uniqueFeatures:["Maximum glass area / slim sightlines","ENERGY STAR certified","Low-E glass standard","Key SD seller"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$–$$$",brochureUrl:"https://www.simonton.com/wp-content/uploads/Widen%20Assets/Documents/DaylightMax-Brochure-WEB-SPREADS.pdf"}],frameMaterials:["Vinyl"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Almond",swatch:"#c8b89a"},{name:"Desert Sand",swatch:"#c09060"},{name:"Dark Bronze",swatch:"#3d2b1f"},{name:"Black",swatch:"#1A1A1A"}],differentiators:["Daylight Max — maximum glass area, slim sightlines, the SD lead product","Broad Western US distribution — available through multiple SD dealers","Consistent quality across production runs — no surprises for builders","Good warranty program"],idealFor:["Production remodels where glass area and value matter","Investment property and rental unit upgrades","Builders needing consistent quality at volume pricing","Whole-house budget replacements in entry and mid-range price bands"],limitations:["Vinyl only — no wood or fiberglass options","Not appropriate for luxury or architect-specified projects","Ply Gem corporate ownership — less brand story than family-owned competitors"],sdNotes:"Lead with Daylight Max in every SD conversation — it's engineered around what San Diego buyers want: maximum glass, slim frames, lots of light. When a client wants a clean contemporary vinyl window at a better price than Milgard Trinsic, Daylight Max is your answer. Simonton is reliable, well-distributed locally, and easy to sell on price-per-window." },

    { id:"westernwindow", website:"https://www.westernwindowsystems.com", name:"Western Window Systems", logo:"WW", color:T.ember, tagline:"The Modern Aluminum Indoor-Outdoor Specialist", tier:"Premium", tierColor:T.ember, origin:"Phoenix AZ — founded 2003, Western US focus", overview:"Western Window Systems is one of the most architect-specified contemporary aluminum window and door brands in the Western US. Built specifically for the indoor-outdoor living market that defines coastal and desert modern architecture — large-format multi-slide, folding, and pivot doors paired with matching aluminum windows. Their systems have slim aluminum sightlines, clean contemporary profiles, and are designed to integrate with the kind of open-plan, view-maximizing architecture common in La Jolla, Del Mar, Encinitas, and Carmel Valley. Less name-recognition than Andersen or NanaWall with homeowners, but extremely well-regarded among architects and custom builders in Southern California.", productLines:[{name:"Vantage Line — Series 8000",type:"Multi-Slide / Folding / Windows",material:"Aluminum",description:"Western Window Systems' premium Vantage Line — elevated performance and refined aesthetics for the highest-end contemporary builds.",uniqueFeatures:["Premium performance tier","Refined contemporary profiles","Elevated hardware"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$$",brochureUrl:"https://westernwindowsystems.com/wp-content/uploads/2025/09/WWS_8000_Brochure_090325.pdf"},{name:"Performance Line — Series 7000",type:"Multi-Slide / Folding / Windows",material:"Aluminum",description:"Western Window Systems' Performance Line — enhanced structural and thermal performance for projects with higher wind, water, or energy requirements.",uniqueFeatures:["Enhanced structural performance","Higher wind/water ratings","Energy-efficient thermal break"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$–$$$$$",brochureUrl:"https://westernwindowsystems.com/wp-content/uploads/2022/06/Western-Window-Systems-ESIC-Series7000A-v3_0.pdf"},{name:"Classic Line — Product Guide",type:"Multi-Slide / Folding / Pocket / Windows / Pivot",material:"Aluminum",description:"Western Window Systems' Classic Line — the full range of thermally broken aluminum multi-slide, folding, pocket, window, and pivot systems for contemporary and modern architecture.",uniqueFeatures:["Full system range","Thermally broken aluminum","Contemporary profiles"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$–$$$$",brochureUrl:"https://westernwindowsystems.com/wp-content/uploads/2022/06/Western-Window-Systems-Product-Guide-V6.2_0.pdf"}],frameMaterials:["Thermally Broken Aluminum"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Black",swatch:"#1A1A1A"},{name:"Bronze",swatch:"#3d2b1f"},{name:"Champagne",swatch:"#c8b89a"},{name:"Custom Anodized",swatch:"linear-gradient(135deg,#a0a8a8,#C87A4A)"}],differentiators:["Architect-preferred slim aluminum for contemporary/modern builds","Series 600 multi-slide — the large-format modern door system in SD","Full system continuity — matching windows and doors in same profile","Flush sill option on Series 600 — true indoor-outdoor threshold","Western US focus — better local support than East Coast brands"],idealFor:["Contemporary and modern architecture","Large-format opening projects","Architect-specified builds in La Jolla, Del Mar, Carmel Valley","Clients wanting the clean aluminum look NanaWall and LaCantina don't offer"],limitations:["Aluminum only — no wood or vinyl options","Higher thermal conductivity than fiberglass or vinyl without thermal break","Less name-recognition with homeowners than NanaWall","Not available through all SD dealers — check stock"],sdNotes:"Western Window Systems is the aluminum answer to NanaWall. When an architect or builder is designing a modern flat-roof or contemporary coastal home and wants slim aluminum sightlines throughout — windows and big doors in the same profile family — this is the brand. Series 600 multi-slide is everywhere in new SD modern construction. Bring it up on any project where the client says 'I want it to feel like the wall disappears.' The flush sill is a key talking point for indoor-outdoor continuity." },

    { id:"nuvista", website:"https://www.nuvistawindows.com", name:"Nu Vista Windows", logo:"NV", color:T.teal, tagline:"Budget-Friendly Architectural Aluminum", tier:"Premium", tierColor:T.teal, origin:"Western US — architectural aluminum specialist", overview:"Nu Vista is an architectural aluminum window and door manufacturer offering a more accessible price point than Western Window Systems or IWC while staying in the aluminum category. Their products have a distinctly commercial storefront aesthetic — bulkier aluminum frames, clean sight lines, and solid construction that reads as intentionally industrial or architectural rather than residential-refined. This is a feature, not a flaw: for modern warehouses-to-loft conversions, ADUs, contemporary commercial-adjacent residential builds, and budget-minded architects who want the aluminum look without the Western Window price, Nu Vista delivers. Frames are thicker than the slim Western Window profiles, giving a more robust, structural visual character.", productLines:[{name:"Coronado Series",type:"Windows & Patio Doors",material:"Aluminum",description:"Nu Vista's Coronado Series — architectural aluminum windows and patio doors designed for the Southern California market. Clean profiles, solid construction, and competitive pricing for residential and light commercial projects.",uniqueFeatures:["Southern California market focus","Architectural aluminum profiles","Residential & light commercial","Competitive pricing"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$",brochureUrl:"https://nuvistawindows.com/index.php/en/download-blueprints?task=callelement&format=raw&item_id=272&element=8a074dca-b77d-43be-adb2-4ba9cb6cf701&method=download"},{name:"Malibu Series",type:"Windows & Patio Doors",material:"Aluminum",description:"Nu Vista's Malibu Series — architectural aluminum windows and patio doors for the Southern California residential market.",uniqueFeatures:["Southern California market focus","Architectural aluminum profiles","Residential & light commercial","Competitive pricing"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$",brochureUrl:"http://ilovemktdigital.com/nuvista/index.php/en/download-blueprints?task=callelement&format=raw&item_id=300&element=8a074dca-b77d-43be-adb2-4ba9cb6cf701&method=download"}],frameMaterials:["Extruded Aluminum"],finishes:[{name:"Anodized Clear",swatch:"#a0a8a8"},{name:"Anodized Black",swatch:"#1A1A1A"},{name:"Dark Bronze",swatch:"#3d2b1f"},{name:"Champagne",swatch:"#c8b89a"},{name:"Custom Powder Coat",swatch:"linear-gradient(135deg,#a0a8a8,#3A6898)"}],differentiators:["Budget-friendly aluminum vs. Western Window Systems and IWC","Commercial storefront aesthetic — intentionally architectural","Good for ADU, mixed-use, loft-style residential","Thicker frame profile gives structural, industrial character","Accessible price point for architect-specified aluminum"],idealFor:["Contemporary homes wanting commercial/industrial aluminum aesthetic","ADU and mixed-use projects","Budget-managed builds where Western Window Systems is over budget","Architects wanting storefront-look aluminum at residential scale","Loft conversions and warehouse-to-residential projects"],limitations:["Bulkier frames — not for slim-sightline contemporary residential","Not as refined as Western Window Systems or IWC","Less residential polish — clearly reads as commercial-adjacent","Limited folding and large-format door wall options"],sdNotes:"Nu Vista's sweet spot in San Diego is the ADU boom and the wave of contemporary spec homes in communities like North Park, Logan Heights, and City Heights where architects are deliberately going for an industrial-modern look. The commercial storefront frame aesthetic that would be a liability on a traditional Del Mar home is exactly the right call on a flat-roof modern with board-formed concrete and exposed steel. When Western Window Systems is too expensive and the client or architect wants the aluminum look with a chunkier, more structural frame, Nu Vista is the answer. Also worth specifying for any project where the windows and doors need to match an existing storefront or commercial entry element." },

    { id:"iwc", website:"https://www.intlwindow.com", name:"International Window Co.", logo:"IW", color:T.slate, tagline:"The California Commercial-Grade Aluminum Specialist", tier:"Premium", tierColor:T.slate, origin:"Richmond CA — California aluminum window manufacturer", overview:"International Window Company (IWC) is a California-based aluminum window manufacturer with a long history in both residential and commercial applications. Their thermally broken aluminum systems are particularly well-suited to the San Diego market's appetite for clean contemporary aluminum profiles, large-format openings, and commercial-grade durability in a residential setting. IWC is less commonly specified than Western Window Systems or Milgard on pure residential, but their commercial-grade construction and California manufacturing make them a strong option for high-end custom homes, mixed-use projects, ADUs, and any project where architect-specified aluminum performance is required at a competitive price.", productLines:[{name:"Keltic Series",type:"Windows & Patio Doors / Multi-Slide / Pocket Doors",material:"Aluminum",description:"IWC's Keltic Series — a comprehensive aluminum window and large-opening door system covering multi-slide, pocket, sliding glass, and hinged configurations. A strong value option for residential and light commercial projects requiring California-quality aluminum performance.",uniqueFeatures:["Multi-slide & pocket door systems","Sliding glass & hinged door options","Hinged window series","California manufactured"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$",brochureUrl:"https://www.intlwindow.com/wp-content/uploads/2013/04/IWC-Keltic_Brochure.pdf"},{name:"Ambassador Series",type:"Windows & Patio Doors",material:"Thermally Broken Aluminum",description:"IWC's Ambassador Series — a comprehensive thermally broken aluminum window and door system engineered for the California residential and light commercial market. Strong coastal and thermal performance with clean contemporary profiles.",uniqueFeatures:["Thermally broken aluminum","Residential & light commercial","California-engineered","Coastal-rated performance"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$–$$$$",brochureUrl:"https://www.intlwindow.com/pdfs/IWC-Ambassador_Brochure.pdf"},{name:"Thermally Broken Aluminum Windows",type:"Windows",material:"Thermally Broken Aluminum",description:"IWC's core residential/commercial product. Thermally broken aluminum frames in casement, fixed, awning, and picture configurations. Better thermal performance than standard aluminum, strong coastal performance.",uniqueFeatures:["Thermally broken","Coastal-rated","Commercial-grade construction"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$–$$$$"},{name:"Sliding Patio Doors — Aluminum",type:"Patio Doors",material:"Aluminum",description:"Large-format aluminum sliding doors. Heavy-duty rollers, commercial-grade track. Good for ADU and multi-unit applications where durability is critical.",uniqueFeatures:["Commercial-grade durability","Heavy-duty rollers","Large format capable"],maxWidth:"30ft",maxHeight:"10ft",priceRange:"$$$–$$$$"},{name:"Fixed / Curtain Wall Sections",type:"Custom / Commercial",material:"Aluminum",description:"Fixed glass sections and curtain wall configurations for contemporary homes blending residential and commercial aesthetics. Architect-specified.",uniqueFeatures:["Curtain wall option","Architect-specified","Large fixed glass"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$"},{name:"Custom Architectural",type:"Custom Windows",material:"Aluminum",description:"Non-standard shapes, specialty configurations, and custom-engineered units for architects. IWC's California manufacturing enables direct custom work.",uniqueFeatures:["True custom from CA factory","Non-standard shapes","Direct manufacturer support"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$–$$$$$"}],frameMaterials:["Thermally Broken Aluminum","Standard Aluminum"],finishes:[{name:"Anodized Clear",swatch:"#a0a8a8"},{name:"Anodized Black",swatch:"#1A1A1A"},{name:"Anodized Bronze",swatch:"#3d2b1f"},{name:"Dark Bronze",swatch:"#5a3a1a"},{name:"Custom Powder Coat",swatch:"linear-gradient(135deg,#3A6898,#C87A4A)"}],differentiators:["California manufacturer — direct support and faster lead times","Commercial-grade aluminum at residential pricing","Thermally broken for better energy performance than standard aluminum","Strong for ADU, mixed-use, and high-density residential","Architect-friendly — custom shapes and configurations"],idealFor:["Architect-specified contemporary and modern homes","ADU projects needing commercial-grade durability","Mixed-use and high-density residential","Custom builds wanting aluminum performance without Western Window Systems pricing","Projects requiring curtain wall or fixed glass sections"],limitations:["Aluminum only — no vinyl or wood options","Less homeowner brand recognition","Standard aluminum (non-thermally broken) has energy performance limits","Less dealer presence than Andersen or Milgard"],sdNotes:"IWC is the contractor's aluminum spec when Western Window Systems is over budget or the project has commercial-adjacent requirements — ADUs, mixed-use ground floor, multi-unit residential. California manufacturing is a genuine advantage: direct factory support, faster lead times, and the ability to get custom configurations without the long wait of a Midwest or East Coast factory order. Bring up IWC when an architect says 'I need something commercial-grade but it's a residential project.' Their thermally broken frames are a step up from standard aluminum and the coastal-rated performance is solid for SD salt-air zones." },
    { id:"windor", website:"https://www.windorsystems.com", name:"WinDor Systems", logo:"WD", color:T.sage, tagline:"Budget Vinyl Folding & Multi-Slide Doors", tier:"Mid-Premium", tierColor:T.sage, origin:"Western US — vinyl window and large door manufacturer", overview:"WinDor Systems is a vinyl window and door manufacturer whose main value in the San Diego market is their budget-friendly large-opening door systems — the 3750 Series folding door and the 2750/3750 Series multi-slide. These products bring the indoor-outdoor living experience into reach for clients whose budget rules out NanaWall, LaCantina, or Western Window Systems. Vinyl-framed, functional, and priced in the $8K-$18K range for most configurations, WinDor is the answer when a homeowner wants a folding or stacking door wall but cannot support a $30K-$50K spend. Also carries a full vinyl window line for whole-project packages.", productLines:[{name:"3750 Series Folding Door",type:"Folding / Bi-fold",material:"Vinyl",description:"WinDor's folding door — available only in the 3750 Series. Features Centor Architecture™ E3 hardware, dual interlocking weatherseal, Sentry™ multipoint locking, and a keyed access panel option for even-panel configurations. Opens fully for complete indoor-outdoor connection — the most accessible folding door option in the San Diego market.",uniqueFeatures:["Most affordable folding door in SD","Centor E3 hardware","Keyed exterior access on even-panel configs","Cardinal LoE-366 glass standard"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$",brochureUrl:"https://www.windorsystems.com/wp-content/uploads/Win-Dor_2023_Q4_brochure_for_web.pdf"},{name:"2750 & 3750 Series Multi-Slide Doors",type:"Multi-Slide",material:"Vinyl",description:"Multi-panel stacking door systems in two series. The 3750 flagship runs up to 20ft wide in 4-panel configuration with Truth Nexus 2-point locks and stainless steel rollers rated 500 lb/10,000 cycles. Cardinal LoE-366 dual-glazed tempered glass is standard on both series.",uniqueFeatures:["Up to 20ft wide (3750 4-panel)","Truth Nexus 2-point opposing lock","Stainless rollers — 500 lb/10,000 cycles","Cardinal LoE-366 standard"],maxWidth:"20ft (4-panel)",maxHeight:"8ft",priceRange:"$$",brochureUrl:"https://www.windorsystems.com/wp-content/uploads/Win-Dor_2023_Q4_brochure_for_web.pdf"},{name:"2750 & 3750 Series Sliding Doors",type:"Sliding Patio Door",material:"Vinyl",description:"Classic bypass slider in two series. Anodized aluminum track, integrated screen channel included standard, Truth Anti-Slam double-point lock. The 3750 adds a larger 3¾\" sash profile. Cardinal LoE-366 glass standard; triple-pane IG available on both.",uniqueFeatures:["Anodized aluminum track","Screen channel included standard","Truth Anti-Slam double-point lock","Triple-pane IG option"],maxWidth:"Various",maxHeight:"8ft",priceRange:"$–$$",brochureUrl:"https://www.windorsystems.com/wp-content/uploads/Win-Dor_2023_Q4_brochure_for_web.pdf"},{name:"3750 Swing Door",type:"Swing Door",material:"Vinyl",description:"The 3750 Swing Door features Sentry™ multipoint locking on both the active and inactive sash, adjustable contemporary European hinges, and anodized aluminum sill covers inside and outside. Available for new construction and replacement.",uniqueFeatures:["Sentry™ multipoint on both active & inactive sash","Adjustable European hinges","Anodized aluminum sill covers","Cardinal LoE-366 glass standard"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$",brochureUrl:"https://www.windorsystems.com/wp-content/uploads/Win-Dor_2023_Q4_brochure_for_web.pdf"},{name:"2750 & 3750 Folding Window",type:"Folding Window",material:"Vinyl",description:"Both the 2750 and 3750 series offer a folding window — an excellent budget option for pass-through and servery openings. Think kitchen window above a counter, indoor-outdoor bar, or patio servery. Operates as out-swing. Centor E3 hardware with internal multipoint shoot-bolt locking. The 2750 is the value entry point; the 3750 adds optional black interior/exterior specialty laminate. A great way to bring folding functionality to a project without a full door budget.",uniqueFeatures:["Available in both 2750 (budget) and 3750 (premium) series","Best budget servery / pass-through folding window in SD","Centor E3 hardware — same as the 3750 folding door","Internal multipoint shoot-bolt locks full sash perimeter","Cardinal LoE-366 glass standard"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$–$$",brochureUrl:"https://www.windorsystems.com/wp-content/uploads/Win-Dor_2023_Q4_brochure_for_web.pdf"},{name:"WinDor Vinyl Windows",type:"Windows",material:"Vinyl",description:"Standard vinyl window line to complement the door systems. Casement, double-hung, slider, and fixed. Good for whole-project packages.",uniqueFeatures:["Matches door line","ENERGY STAR","Budget pricing"],maxWidth:"Various",maxHeight:"Various",priceRange:"$"}],frameMaterials:["Vinyl"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Tan",swatch:"#c8b89a"},{name:"Bronze",swatch:"#3d2b1f"},{name:"Black",swatch:"#1A1A1A"}],differentiators:["3750 Series folding door — most affordable folding door in SD","2750 & 3750 Series multi-slide — budget large opening systems","2750 & 3750 Folding Window — best budget servery / pass-through option in SD","Opens indoor-outdoor living to clients under $15K","Full vinyl system — windows and big doors on one order"],idealFor:["Budget-managed remodels wanting folding or multi-slide","Clients who want indoor-outdoor but cannot support premium pricing","Kitchen servery and bar pass-through openings","Entry-point indoor-outdoor projects","Contractors needing cost-effective large opening systems"],limitations:["Vinyl only — no aluminum or wood","Bulkier frames than aluminum competitors","Not for luxury or architect-specified projects","Lower panel capacity than aluminum systems"],sdNotes:"WinDor fills the gap the premium brands leave wide open. When a homeowner asks about a door that folds all the way open and their budget is $10K-$15K, WinDor 3750 folding is the answer. The 2750/3750 Folding Window is a particularly strong upsell for kitchen remodels — clients who want a pass-through or servery window above a counter get the folding functionality at a fraction of the cost of a full door system. Lead with it any time a kitchen or bar faces a patio or pool. A smart entry point — close the project now at an accessible price, build the relationship for the next bigger job." },
    { id:"fleetwood", website:"https://www.fleetwoodusa.com", name:"Fleetwood Windows & Doors", logo:"FW", color:T.ember, tagline:"Ultra-Luxury Aluminum — The Architect's Statement System", tier:"Ultra Premium", tierColor:T.ember, origin:"Corona CA — California manufacturer since 1961, 207,000 sq ft factory", overview:"Fleetwood is the benchmark for ultra-luxury aluminum window and door systems in Southern California and one of the most architect-specified brands in the Western US high-end residential market. California-manufactured in Corona since 1961, Fleetwood is known for extraordinarily slim aluminum sightlines, massive panel sizes, thermally broken performance, and the kind of monumental glass wall presence that defines contemporary estate architecture. What sets Fleetwood apart is engineering depth — their patented Archetype Rolling System uses Swiss precision bearings at 58 HRC (vs. 40 HRC industry standard), their patented Archetype Locking System is electropolished 316 stainless steel, and their Arche-Duct flush sill drain is proprietary. Factory is solar-powered (8M+ kWh/year), recycling 100% of aluminum scrap. Kynar 500® painted finishes plus anodized colors — not powder coat. Transferable lifetime warranty. Their multi-slide, lift-and-slide, pivot, folding, and window systems regularly appear on the most expensive residential projects in La Jolla, Del Mar, Rancho Santa Fe, and Malibu.", productLines:[{name:"Multi-Slide & Pocket — Series 4070-T",type:"Multi-Slide / Pocket",material:"Thermally Broken Aluminum",description:"Fleetwood's flagship large-opening door system. Designed for maximum panel size — up to 120 sq ft per panel, 1,400 lbs capacity. The patented A4 roller uses Swiss precision bearings at 58 HRC. Patented Arche-Duct flush sill: a sub-floor linear drain system that delivers a fully flush threshold with tested water/air/energy performance. Archetype Narrow lock — 3.25\" profile. No-post corner configurations. Virtually unlimited multi-slide, pocket, and corner applications.",uniqueFeatures:["Panels up to 120 sq ft / 1,400 lbs","Patented Arche-Duct flush sill drain","Swiss A4 roller — 58 HRC bearings","Archetype Narrow lock — 3.25\" profile","No-post corner capable","Virtually unlimited panel configurations"],maxWidth:"Custom",maxHeight:"20ft panel height",priceRange:"$$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Multi-Slide & Pocket — Series 3070-T / 3070",type:"Multi-Slide / Pocket",material:"Thermally Broken Aluminum (3070-T) / Aluminum (3070)",description:"The 3070-T (thermal) and 3070 (non-thermal) are Fleetwood's most-specified multi-slide door systems. 3070: panels up to 10ft wide x 18ft tall, 2-1/16\" vertical sightline — the slimmest in its class. 3070-T adds integral thermal barriers for energy code compliance. Both offer no-post corner configurations at 90° and odd angles — no post, no jamb. Optional Arche-Duct flush sill. Curved sliding glass walls available on the 3070 (CNC roll bender, radius as tight as 12ft). Impact-rated 3070-HI also available.",uniqueFeatures:["Panels up to 10ft wide x 18ft tall","2-1/16\" vertical sightline — slimmest in class","No-post 90° and custom-angle corners","Curved sliding walls — radius as tight as 12ft","Arche-Duct flush sill option","3070-T: thermal barrier for energy code"],maxWidth:"10ft panel",maxHeight:"18ft",priceRange:"$$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Traditional Sliding Door — Series 3000-T / 3000",type:"Traditional Sliding Patio Door",material:"Thermally Broken Aluminum (3000-T) / Aluminum (3000)",description:"Fleetwood's traditional patio slider — for projects where multi-slide systems aren't needed but Fleetwood's quality and sightline consistency are. 3000: panels up to 7ft wide x 14ft tall. 3000-T: thermal frame, 6ft wide x 12ft tall. Vertical sightlines match the 3070 family for mixed-product projects. Proprietary 3-height threshold system (1-1/4\", 2\", 3\"). False jamb feature allows in-frame mullion configurations. Mulls seamlessly to Series 3800-T transoms and sidelites.",uniqueFeatures:["Matches 3070 vertical sightlines","Three threshold height options","False jamb — in-frame mullion capability","Mulls to 3800-T window wall","Archetype locking hardware","Patented A2 Swiss-bearing roller"],maxWidth:"7ft panel (3000) / 6ft panel (3000-T)",maxHeight:"14ft (3000) / 12ft (3000-T)",priceRange:"$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Pivot Door — Series 4400-T",type:"Pivot Entry Door",material:"Thermally Broken Aluminum",description:"The first weather- and energy-rated pivot door designed specifically for luxury residential — not commercial. Panels up to 160\" wide x 180\" tall, up to 1,100 lbs. Patented Arche-Duct flush sill: finished floor flows to exterior with only a thin slot drain visible. FritsJurgens In-Rail Closer integrated in the bottom rail. 5-point latching with FSB lever hardware options. The definitive large-format pivot entry for contemporary estates.",uniqueFeatures:["Panels up to 160\" wide x 180\" tall, 1,100 lbs","First weather/energy-rated residential pivot","Arche-Duct flush sill — floor continues to exterior","FritsJurgens In-Rail concealed closer","5-point latch with FSB lever options","Thermally broken for energy compliance"],maxWidth:"160in panel",maxHeight:"180in",priceRange:"$$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Hinged Door — Series 3900-T & 3200-T",type:"Hinged Entry / Passage Door",material:"Thermally Broken Aluminum",description:"Two distinct hinged door systems. 3900-T: luxury-scale panels up to 4.5ft wide x 12ft tall, 5-point locking with FSB levers, available in-swing or out-swing, keyless electronic option, Arche-Duct flush sill option, mulls to sidelites and transoms. 3200-T: narrow-profile hinged door with jamb profile under 4\" — designed for minimal sightlines. Panels up to 40\" x 108\". Four adjustable 316 stainless mortise hinges. Optional Steel Look SDL for classic steel window aesthetic in aluminum.",uniqueFeatures:["3900-T: panels up to 4.5ft x 12ft","5-point locking system — single lever actuation","FSB lever hardware — multiple styles","3200-T: sub-4\" jamb profile after burial","Steel Look SDL option on 3200-T","Adjustable stainless mortise hinges"],maxWidth:"4.5ft (3900-T) / 40in (3200-T)",maxHeight:"12ft (3900-T) / 108in (3200-T)",priceRange:"$$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Folding Door — Series 3600-T",type:"Folding / Bi-Fold",material:"Thermally Broken Aluminum",description:"Fleetwood's thermally broken folding door system. Panels up to 3.5ft wide x 12ft tall, up to 8 panels per direction. Brio carriers: 4 high-precision wheels with side-thrust bearings per intermediate panel — smooth, quiet, stable. Stainless Dual Point Lock (DPL) shoots two bolts into respective tracks. All hardware — carriers, hinges, DPL — specified for coastal/salt-air environments. No-post 90° corner configuration available. Optional integrated hinged passage door within the folding wall.",uniqueFeatures:["Brio carriers — 4-wheel precision per panel","Stainless Dual Point Lock — coast-rated","No-post 90° corner option","Integrated hinged passage door option","Up to 8 panels per direction","Thermal barrier — energy code compliant"],maxWidth:"3.5ft panel",maxHeight:"12ft",priceRange:"$$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Casement, Awning & Fixed — Series 450-T / 350-T",type:"Windows",material:"Thermally Broken Aluminum",description:"Two thermally broken casement/awning/hopper/fixed window series. 450-T: next-generation cube design — wall-to-glass dimension of only 2-9/16\", slimmest on the market. Proprietary Archetype Multi-Point Latch and Cam Handle (stainless). Convection blockers in extrusion chambers maximize insulation. Welded vent corners (not screw-joined) for lifetime performance. 350-T: Steel Look applied grid simulates classic steel window in aluminum. Both offer 4-bar concealed hinge option and hinged screens with magnetic keeper.",uniqueFeatures:["450-T: 2-9/16\" wall-to-glass — slimmest in market","Welded vent corners — not screwed","Proprietary Archetype Multi-Point Latch (S.S.)","Convection blockers in extrusion chambers","350-T: Steel Look SDL — steel aesthetic in aluminum","4-bar concealed hinge option","Max panel: 24 sq ft per vent"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Window-Wall Fixed System — Series 3800-T",type:"Fixed Windows / Window Wall",material:"Thermally Broken Aluminum",description:"Fleetwood's luxury fixed glass and window-wall system. 1-7/16\" perimeter sightline — inside or outside glaze. Factory-punched rectangular weep slots (not field-drilled like commercial storefront). 4-1/2\" frame depth mulls directly to all Fleetwood door systems for seamless facade integration. Optional operable inserts (casement, awning, hopper). Steel Look simulated divided lite option. Virtually unlimited configuration sizes determined by site wind loads.",uniqueFeatures:["1-7/16\" perimeter sightline","Factory-punched weeps — luxury finish detail","Mulls to all Fleetwood door systems","Operable inserts: casement, awning, hopper","Steel Look divided lite option","Virtually unlimited configurations"],maxWidth:"Site wind load dependent",maxHeight:"Site wind load dependent",priceRange:"$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"},{name:"Horizontal Slider — Series 330-T",type:"Windows",material:"Thermally Broken Aluminum",description:"Thermally broken horizontal sliding window. Max panel 6.5ft wide x 6ft tall. Adjustable tandem stainless roller with nylon tires — the only sliding window with adjustable tandem roller, rated to 75 lbs. Screens captured within frame depth (not projecting). Proprietary self-latching 316 stainless latch — window locks automatically on close. High-performance integral stack bar option for high-wind applications.",uniqueFeatures:["Adjustable tandem roller — 75 lb rated","Screen encapsulated within frame (no protrusion)","Self-latching 316 S.S. latch — closes locked","HP integral stack bar for high-wind","Thermal frame — energy code compliant"],maxWidth:"6.5ft panel",maxHeight:"6ft",priceRange:"$$$–$$$$",brochureUrl:"https://www.fleetwoodusa.net/Documents_Guide/Products/_General/Aluminum_Products.pdf"}],frameMaterials:["Thermally Broken Aluminum","Standard Aluminum"],finishes:[{name:"Matte Black",swatch:"#1A1A1A"},{name:"White / Bone White",swatch:"#f0ede6"},{name:"Statuary Bronze",swatch:"#3d2b1f"},{name:"Champagne Sunstorm",swatch:"#c8b89a"},{name:"Charcoal Gray",swatch:"#4a4a4a"},{name:"Kynar 500® Custom",swatch:"linear-gradient(135deg,#a0a8a8,#C04020)"},{name:"Anodized (4 colors)",swatch:"linear-gradient(135deg,#a0a8a8,#707878)"}],differentiators:["Patented Archetype Rolling System — Swiss 58 HRC bearings vs. 40 HRC industry standard","Patented Arche-Duct flush sill — sub-floor drain, tested water/air/energy performance","Patented Archetype Locking System — electropolished 316 stainless, made in USA","4070-T panels to 1,400 lbs / 120 sq ft — no competitor matches this","3070 vertical sightline: 2-1/16\" — slimmest multi-slide sightline in class","450-T window: 2-9/16\" wall-to-glass — slimmest casement on market","No-post corners on 3070, 3070-T, 3600-T","Curved sliding walls (3050/3070) — CNC roll bender, radius as tight as 12ft","Kynar 500® factory paint — not powder coat — extraordinary color retention","Solar-powered factory — 8M+ kWh/year, 100% scrap aluminum recycled","Steel Look SDL option across multiple series — steel aesthetic without steel complications","California-manufactured in Corona — fastest lead times of any luxury aluminum brand"],idealFor:["Ultra-luxury estates in La Jolla, Del Mar, RSF, Coronado","Architect-specified projects where the door or window system is the design statement","Clients wanting the absolute best aluminum door system available","Contemporary and modern architecture with monumental glass walls","Projects pairing pivot entry with multi-slide or folding door walls","Coastal estates requiring salt-air-rated stainless hardware throughout"],limitations:["Ultra-premium pricing — budget conversations start at 5 figures","Lead times on full custom configurations","Requires experienced authorized Fleetwood installer","Overkill for smaller openings or traditional architecture","Not available through all SD dealers — verify stock and authorization"],sdNotes:"Fleetwood is the first name that comes up when an architect in La Jolla, Del Mar, or Rancho Santa Fe is specifying a luxury glass wall. Know the differentiating specs cold: 4070-T panels to 1,400 lbs with Arche-Duct flush sill. 3070 at 2-1/16\" vertical sightline — slimmest multi-slide in the market. 450-T window at 2-9/16\" wall-to-glass — slimmest casement anywhere. The no-post corner on the 3070 and 3600-T is a show-stopper detail for view properties. Kynar 500® paint vs. powder coat is a quality conversation worth having with any discerning client. California manufacturing = direct factory support and faster lead times than European competitors. When a client says they want the biggest, most beautiful door system available, the answer is Fleetwood." },
    { id:"steeltraditions", website:"https://www.steeltraditions.com", name:"Steel Traditions", logo:"ST", color:T.slate, tagline:"American-Made Steel Windows & Doors", tier:"Ultra Premium", tierColor:T.slate, origin:"USA — American steel window and door manufacturer", overview:"Steel Traditions is a US-based steel window and door manufacturer producing thermally broken and non-thermally broken steel frames for residential and light commercial applications. Steel windows and doors occupy a unique design niche — the ultra-slim sight lines and industrial character of steel are impossible to replicate in aluminum, vinyl, or wood. Steel Traditions makes that look accessible to the high-end residential market without requiring full European custom fabrication lead times or pricing. Their products are specified on transitional, contemporary, Mediterranean, and Spanish Colonial architecture where the black steel frame is a deliberate design element — windows that look like they belong in a converted factory or a Parisian apartment, applied to a La Jolla or Rancho Santa Fe estate.", productLines:[{name:"Full Product Catalog",type:"Windows & Doors",material:"Thermally Broken Steel / Steel",description:"The complete Steel Traditions catalog — thermally broken and standard steel windows, entry doors, French doors, patio doors, and fixed glazing for luxury residential applications.",uniqueFeatures:["Full product range","Thermally broken & standard steel","Residential luxury specification"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$–$$$$$",brochureUrl:"https://steeltraditions.com/catalog/"},{name:"Thermally Broken Steel Casement",type:"Windows",material:"Thermally Broken Steel",description:"Steel Traditions flagship thermally broken steel casement. Ultra-slim sight lines, thermally broken for Title 24 compliance, multi-point lock. The go-to steel window for San Diego high-end residential where energy compliance is required.",uniqueFeatures:["Thermally broken — Title 24 compliant","Ultra-slim sight lines","Multi-point lock","Residential scale"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$$"},{name:"Fixed Steel Windows",type:"Windows",material:"Steel",description:"Fixed picture windows in steel. Maximum glass area with the slimmest possible frame. Architect-specified for statement walls, stair towers, and feature glazing on contemporary and transitional homes.",uniqueFeatures:["Slimmest frame available","Large glass area","Architect-specified"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$"},{name:"Steel Entry Doors",type:"Entry Doors",material:"Steel",description:"Solid steel entry doors with glass lite options. The industrial-modern statement entry — pairs with steel window lines for whole-facade continuity. Available in single, double, and oversized configurations.",uniqueFeatures:["Solid steel construction","Glass lite options","Whole-facade continuity with windows"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$–$$$$$"},{name:"Steel French Doors & Patio",type:"Patio / French",material:"Steel",description:"Steel-framed French and patio doors. Traditional divided lite or single lite. The defining element on Mediterranean, Spanish Colonial, and European-influenced architecture.",uniqueFeatures:["True divided lite option","Traditional and contemporary profiles","Steel frame durability"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$$"},{name:"Non-Thermally Broken Steel",type:"Windows & Doors",material:"Steel",description:"Standard non-thermally broken steel for interior applications, covered exterior locations, and historic or design-specific projects where thermal break is not required.",uniqueFeatures:["Slimmest possible sight lines","Interior and covered exterior","Historic restoration compatible"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$"}],frameMaterials:["Thermally Broken Steel","Standard Steel"],finishes:[{name:"Matte Black",swatch:"#1A1A1A"},{name:"Dark Bronze",swatch:"#3d2b1f"},{name:"Oil-Rubbed Bronze",swatch:"#5a3a1a"},{name:"Antique White",swatch:"#f0ede6"},{name:"Custom Powder Coat",swatch:"linear-gradient(135deg,#3A6898,#1A2028)"}],differentiators:["American-made steel — faster lead times than European custom","Thermally broken options — Title 24 compliant for California","Ultra-slim sight lines impossible to match in aluminum","Steel character unique to the material — cannot be faked","Whole-facade continuity — windows, entry, and patio doors in one system"],idealFor:["Contemporary, transitional, and Mediterranean architecture wanting the steel aesthetic","Architects specifying black steel windows as a design statement","La Jolla, RSF, and Coronado estate projects","Historic-adjacent or European-influenced residential builds","Clients who want the converted-loft or Parisian-apartment window look"],limitations:["Premium pricing","Steel requires proper finishing and maintenance program to prevent rust","Non-thermally broken does not meet Title 24 in most San Diego applications","Longer lead times than aluminum or vinyl","Fewer large-format opening options than aluminum door wall systems"],sdNotes:"Steel windows are a design statement that no other material can replicate — when an architect or client specifies them, they know exactly what they want. Steel Traditions is the go-to domestic source for that look, with thermally broken options that satisfy California Title 24. In San Diego the steel window aesthetic shows up most on Spanish Colonial and Mediterranean remodels in Coronado and Point Loma, on transitional estate homes in Rancho Santa Fe, and on contemporary loft-style builds in North Park and South Park. Black steel casement windows with divided lites on a white stucco facade is one of the most photographed architectural details in coastal SD. When you see that look on a project, Steel Traditions is the conversation." },

    { id:"frenchsteel", website:"https://www.frenchsteel.com", name:"French Steel", logo:"FS", color:T.rust, tagline:"European Design, Asian-Manufactured — Better Price, Longer Lead", tier:"Luxury", tierColor:T.rust, origin:"European-designed, Asian-manufactured — US distribution", overview:"French Steel products carry authentic European design language — true divided lite profiles, traditional French Provincial and Mediterranean aesthetics, arched and specialty shapes in steel — but are manufactured in Asia rather than domestically or in Europe. This makes French Steel the more accessible price point in the steel window and door category compared to Steel Traditions, which is American-made. The tradeoff is real: longer lead times on orders, and service and warranty resolution can be slower given the international supply chain. For budget-conscious clients who want the European steel aesthetic and have schedule flexibility, French Steel is a compelling option. For clients who need faster delivery or local service responsiveness, Steel Traditions is the stronger choice.", productLines:[{name:"French Steel Casement — Divided Lite",type:"Windows",material:"Thermally Broken Steel",description:"The signature product. True divided lite steel casement in authentic European profiles. Thermally broken for California Title 24. Available in single, double, and multi-lite configurations. The visual result is authentic; manufacturing is overseas.",uniqueFeatures:["True divided lite","Authentic European profiles","Thermally broken","Better price than domestic steel"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$–$$$$"},{name:"Pivot and Casement Entry",type:"Entry Doors",material:"Steel",description:"Steel entry doors with glass lites in European proportions. French-style double doors with divided lite glass for Mediterranean and French Provincial estate homes.",uniqueFeatures:["French double door configurations","Divided lite glass","Authentic proportions","Better price than domestic"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$"},{name:"Steel French Doors — Interior & Exterior",type:"French Doors / Patio",material:"Thermally Broken Steel",description:"Exterior and interior French door sets in divided lite steel. Opens living rooms, libraries, and master suites to terraces and courtyards. The most-requested product for Coronado, RSF, and La Jolla Mediterranean builds.",uniqueFeatures:["Divided lite steel French doors","Interior and exterior applications","Courtyard and terrace facing","Period-authentic profiles"],maxWidth:"Various",maxHeight:"Various",priceRange:"$$$–$$$$"},{name:"Fixed & Specialty Steel Windows",type:"Windows",material:"Steel",description:"Fixed steel windows in specialty shapes — arched tops, round, oval, and geometric. Specified for stair towers, entry halls, and architectural feature walls.",uniqueFeatures:["Specialty shapes — arched, round, oval","Architectural feature glazing","Better price than domestic steel"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$"},{name:"Steel Skylight & Roof Glazing",type:"Skylights / Roof",material:"Steel",description:"Steel-framed skylight and roof glazing systems. Lantern-style, ridge, and flat roof configurations for courtyard homes and estate builds.",uniqueFeatures:["Lantern and ridge skylights","Courtyard lantern configuration","Estate-scale roof glazing"],maxWidth:"Custom",maxHeight:"Custom",priceRange:"$$$$–$$$$$"}],frameMaterials:["Thermally Broken Steel","Standard Steel"],finishes:[{name:"Classic Black",swatch:"#1A1A1A"},{name:"Dark Bronze",swatch:"#3d2b1f"},{name:"Graphite",swatch:"#3A4048"},{name:"Antique Iron",swatch:"#4A4040"},{name:"Custom Patina",swatch:"linear-gradient(135deg,#3A4048,#6A5848)"}],differentiators:["Better price point than Steel Traditions — European aesthetic at lower cost","True divided lite and authentic European profile design","Specialty shapes in steel — arched, round, oval","Steel skylight and lantern systems for courtyard homes","Right choice when the client wants the look and has schedule flexibility"],idealFor:["French Provincial and Mediterranean architecture where budget matters","Clients who want the European steel aesthetic at a lower price than domestic","Projects with flexible timelines that can absorb longer lead times","Coronado, RSF, and La Jolla Mediterranean or French Provincial builds","Specialty shapes and arched windows where only steel reads correctly"],limitations:["Longer lead times than Steel Traditions — plan well ahead","Service and warranty resolution slower due to international supply chain","Not ideal for projects with tight or fixed completion schedules","Steel maintenance program required in coastal salt-air environments","Price advantage narrows when expedited shipping is required"],sdNotes:"French Steel is the value play in the steel category — you get the authentic divided lite European look at a better price than Steel Traditions, but you take on longer lead times and slower service response when issues arise. The decision matrix is simple: if the client has schedule flexibility and wants to stretch their budget further, French Steel. If the project has a hard completion date or the client values local service responsiveness, Steel Traditions. Always set lead time expectations upfront on French Steel orders — do not let a client discover mid-project that the windows are 16-20 weeks out. Communicate it clearly at the spec stage and it becomes a non-issue." },
  ],  interior_doors: [
    { id:"tmcobb_int", website:"https://www.tmcobb.com", name:"TM Cobb", logo:"TC", color:T.plum, tagline:"California's Custom Interior Door Standard", tier:"Luxury", tierColor:T.plum, origin:"Southern California — local manufacturer", overview:"The go-to interior door brand for San Diego luxury residential. TM Cobb manufactures in California, offers fully custom sizing and profiles, and carries the widest interior door selection available locally. Matching entry and interior door families is a key selling point.", productLines:[{name:"Moulded Door Catalogue 2024",type:"Interior — Moulded",material:"Moulded Composite",description:"TM Cobb's complete moulded door catalogue — covers the full range of moulded panel door styles, profiles, and finish options for interior applications.",uniqueFeatures:["Full moulded door line","Panel styles & profiles","2024 edition"],priceRange:"$$–$$$",brochureUrl:"https://tmcobb.com/wp-content/uploads/2024/02/MOLDED_DOOR_BROCHURE-2024.pdf"},{name:"TM Cobb Red Book 2025",type:"Full Line",material:"Wood / MDF / Composite",description:"The complete TM Cobb product catalog — the Red Book covers the full range of custom entry doors, interior collections, stile-and-rail profiles, shaker lines, and specialty configurations. The definitive TM Cobb specification reference.",uniqueFeatures:["Complete product catalog","Entry & interior door lines","Specification reference"],priceRange:"$$$–$$$$$",brochureUrl:"https://tmcobb.com/wp-content/uploads/2026/02/TMC_RedBook-2025.pdf"},{name:"Shaker / Flat Panel",type:"Interior — Paint or Stain Grade",material:"Solid Wood / MDF",description:"1-panel flat shaker — most specified interior door in SD luxury remodels. Available paint or stain grade.",uniqueFeatures:["Most popular current style","Paint or stain grade","Custom sizes"],priceRange:"$$$"},{name:"Stile & Rail — Multi-Panel",type:"Interior — Paint or Stain Grade",material:"Solid Wood",description:"2, 3, 5, and 6-panel stile and rail. Traditional and transitional applications.",uniqueFeatures:["Multiple panel configurations","True stile and rail construction","Furniture-quality joinery"],priceRange:"$$$"},{name:"Flush / MDF Slab",type:"Interior — Paint Grade",material:"MDF / Solid Core",description:"Flat flush door. Perfectly smooth paint-grade surface. Modern and minimalist.",uniqueFeatures:["Mirror-smooth paint surface","Solid core option","Best modern interior door"],priceRange:"$$"},{name:"Custom Router / Carved",type:"Interior — Feature Doors",material:"Solid Wood",description:"CNC or hand-carved decorative panels. Statement doors for master suites and grand entries.",uniqueFeatures:["Fully custom design","One-of-a-kind","Best with stain finish"],priceRange:"$$$$$"},{name:"French Door — Interior",type:"Interior — Glass",material:"Wood / MDF",description:"Interior French doors with glass lites. Borrows light between rooms.",uniqueFeatures:["Glass lite options","Pairs with pocket or swing hardware","Paint or stain"],priceRange:"$$$"}],frameMaterials:["Solid Wood (stain grade)","MDF (paint grade)","Wood Composite"],finishes:[{name:"Paint Grade",swatch:"#f0ede6"},{name:"Natural Stain",swatch:"#a07040"},{name:"Dark Stain",swatch:"#3a2010"},{name:"Black Paint",swatch:"#1A1A1A"},{name:"Custom Color",swatch:"linear-gradient(135deg,#1a1a1a,#f0ede6)"}],differentiators:["California manufacturer — fastest local ETAs","Widest custom interior door selection in SD","Matching entry + interior door families","Pre-hung or slab options"],idealFor:["Luxury custom homes needing custom sizes","Whole-house interior door packages","Matching stain grade to wood floors or cabinetry"],limitations:["Premium pricing vs. stock doors","Custom lead times 4–8 weeks"],sdNotes:"The most specified interior door brand in La Jolla, RSF, and Del Mar luxury builds. Contractors love the local rep support and fast turn on custom orders." },
    { id:"masonite", website:"https://www.masonite.com", name:"Masonite", logo:"MS", color:T.sage, tagline:"North America's Volume Interior Door Leader", tier:"Mid-Premium", tierColor:T.sage, origin:"Charlotte NC — largest door manufacturer in North America", overview:"The dominant volume interior door brand. Widest selection of in-stock moulded and hollow-core panel doors for production builds and remodels. Fast availability, competitive pricing, and a full range from hollow-core to solid-core fire-rated.", productLines:[{name:"Moulded Panel — Smooth",type:"Interior — Paint Grade",material:"Moulded Composite",description:"Smooth surface moulded panel. Pre-primed, ready to paint. Most common interior door in residential construction.",uniqueFeatures:["Pre-primed","Ships same week","Hollow or solid core"],priceRange:"$"},{name:"Moulded Panel — Textured",type:"Interior — Paint Grade",material:"Moulded Composite",description:"Embossed wood-grain texture moulded panel. Mimics real wood at entry-level price.",uniqueFeatures:["Embossed grain texture","Pre-primed","Fast availability"],priceRange:"$"},{name:"Solidoor — Solid Core",type:"Interior — Paint Grade",material:"Solid Core Composite",description:"Solid core for acoustic performance and a quality feel. Fire-rated versions available.",uniqueFeatures:["Acoustic performance","Fire-rated versions","Quality feel vs. hollow core"],priceRange:"$$"},{name:"Modern — Shaker / Flush",type:"Interior — Contemporary",material:"MDF / Composite",description:"Clean-line shaker and flush doors for contemporary homes. Pre-primed.",uniqueFeatures:["Contemporary profiles","Pre-primed","Competitively priced"],priceRange:"$$"}],frameMaterials:["Moulded Composite","Solid Core","MDF"],finishes:[{name:"Pre-Primed White",swatch:"#f0ede6"},{name:"Ready to Paint",swatch:"#2A3028"}],differentiators:["Best in-stock availability","Most affordable whole-house package","Fire-rated solid core options","Huge selection of profiles"],idealFor:["Production builders doing multiple units","Budget-managed whole-house packages","Secondary bedrooms and closets","Fast-turnaround remodels"],limitations:["Paint grade only — no stain grade","Moulded surface less convincing than solid wood","Hollow core lacks acoustic performance"],sdNotes:"The standard door for Carmel Valley and Scripps Ranch production remodels. Builders use Masonite for the bulk of interior doors and upgrade to TM Cobb for visible feature doors." },
    { id:"trustile", website:"https://www.trustile.com", name:"TruStile Doors", logo:"TS", color:T.gold, tagline:"The Precision MDF & Wood Door Standard", tier:"Luxury", tierColor:T.gold, origin:"Denver CO — precision door manufacturer", overview:"TruStile is the benchmark for high-end MDF interior doors in the luxury residential market. Their MDF doors are machined to exceptionally tight tolerances — flat, square, and consistent in a way that solid wood construction cannot guarantee — making them the preferred choice for architects and designers who want perfectly flat paint-grade doors that hold their finish and dimension for decades. Beyond MDF, TruStile also manufactures stain-grade interior doors in a range of wood species and offers a curated line of exterior wood entry doors. The brand is heavily specified in contemporary and transitional luxury homes where the door profile, gap consistency, and paint surface are design-critical details.", productLines:[{name:"TruStile MDF — Contemporary & Shaker",type:"Interior — Paint Grade",material:"Precision MDF",description:"TruStile's flagship product line — precision-machined MDF interior doors in an extensive range of contemporary, shaker, and transitional profiles. The MDF core is dimensionally stable and machines to razor-sharp edges, producing crisp profiles and a perfectly flat surface that accepts paint flawlessly. Available in hundreds of configurations: flat panels, v-groove, glass lites, barn door slabs, and custom panel layouts. Solid core standard. The go-to specification for luxury interiors where paint-grade door quality is a visible design element.",uniqueFeatures:["Precision-machined MDF — flat, square, dimensionally stable","Sharp crisp profiles — edges hold paint without telegraphing grain","Hundreds of panel configurations and glass lite options","Solid core standard — acoustic and tactile quality","Custom sizing — non-standard heights and widths available","ADA-compliant configurations","Barn door slabs and bi-fold available"],priceRange:"$$$$"},{name:"TruStile Wood — Stain Grade",type:"Interior — Stain Grade",material:"Solid Wood",description:"TruStile's stain-grade interior door line in a selection of premium wood species. Available in the same profiles as the MDF line — stile and rail shaker, multi-panel traditional, and contemporary flat — allowing mixed paint/stain specification within the same profile family for visual consistency. Species options include White Oak, Walnut, Alder, Cherry, Maple, and Douglas Fir.",uniqueFeatures:["Same profiles as MDF line — mix paint/stain in same project","Multiple species: White Oak, Walnut, Alder, Cherry, Maple, Fir","Custom panel configurations","Consistent with TruStile whole-house aesthetic"],priceRange:"$$$$–$$$$$"},{name:"TruStile Exterior — Wood Entry Doors",type:"Exterior Entry",material:"Solid Wood",description:"TruStile's exterior wood entry door line. Solid wood construction in the same contemporary and transitional profiles as the interior line — allowing interior and exterior doors to share the same visual profile family. Intended for protected entry applications with proper overhang. Available in single, double, and sidelite configurations.",uniqueFeatures:["Matches interior door profiles","Solid wood construction","Single, double, and sidelite configurations","Contemporary and transitional profiles"],priceRange:"$$$$$"}],frameMaterials:["Precision MDF","Solid Wood (Stain Grade)"],finishes:[{name:"Paint Grade MDF",swatch:"#f0ede6"},{name:"White Oak",swatch:"#c8a870"},{name:"Walnut",swatch:"#5a3a1a"},{name:"Alder",swatch:"#9a6a40"},{name:"Black Paint",swatch:"#1A1A1A"},{name:"Custom Color",swatch:"linear-gradient(135deg,#1a1a1a,#f0ede6)"}],differentiators:["Precision MDF — flattest, most consistent paint-grade door in the market","Same profiles available in MDF and wood — mix paint/stain on one project","Exterior wood entry doors that match the interior door family","Hundreds of panel configurations including custom glass lites","Architect and designer specified — a design-world brand with genuine credentials","Crisp machined profiles hold paint edges far longer than solid wood"],idealFor:["Luxury new construction where door quality is a visible design detail","Contemporary and transitional homes wanting perfectly flat paint-grade doors","Projects mixing paint-grade MDF and stain-grade wood in the same profile","Architects and interior designers specifying door profiles as a design element","Whole-house interior packages where consistency and quality are paramount"],limitations:["Premium pricing — significantly above Masonite and JELD-WEN","MDF is heavy — hardware and hinges must be appropriately specified","Exterior wood doors require protected installation — not for exposed entries","Lead times on custom configurations","Less widely stocked locally than TM Cobb — may require direct order"],sdNotes:"TruStile is the choice when the architect or designer is treating the interior doors as a finish element rather than a commodity item. In La Jolla, Del Mar, and Rancho Santa Fe new construction, the flat-panel MDF shaker in a dark paint or black finish is increasingly the spec over solid wood — the precision surface and edge consistency that TruStile delivers is genuinely different from what even TM Cobb's MDF line offers. White Oak stain-grade in the same profile family as the MDF doors is a strong whole-house story. Lead with TruStile any time a client or their designer says 'I want the doors to look like furniture.'" },
    { id:"jeldwen_int", website:"https://www.jeld-wen.com", name:"JELD-WEN", logo:"JW", color:T.slate, tagline:"Global Range, Local Availability", tier:"Premium", tierColor:T.slate, origin:"Klamath Falls OR — global manufacturer", overview:"One of the world's largest door manufacturers. JELD-WEN bridges the gap between Masonite's volume and TM Cobb's custom — offering a wider range of stain-grade wood options, architectural styles, and solid wood construction at competitive pricing.", productLines:[{name:"Craftsman — Stile & Rail",type:"Interior — Stain Grade",material:"Solid Wood",description:"Traditional stile and rail in multiple panel configurations. Available in stain-grade pine, fir, and alder.",uniqueFeatures:["Stain grade available","Multiple panel counts","Traditional joinery"],priceRange:"$$–$$$"},{name:"Architectural — Flush",type:"Interior — Paint Grade",material:"MDF / Hardboard",description:"Flush slab for contemporary and modern interiors. Pre-primed.",uniqueFeatures:["Smooth flush face","Solid or hollow core","Pre-primed"],priceRange:"$$"},{name:"Molded — Textured Panel",type:"Interior — Paint Grade",material:"Moulded Composite",description:"Volume textured panel door. Full range of profiles from 2-panel to 6-panel.",uniqueFeatures:["Wide profile selection","Pre-primed","Fast availability"],priceRange:"$–$$"},{name:"Glass Lite Interior",type:"Interior — Glass",material:"Wood / MDF",description:"Interior doors with decorative glass inserts. French door and partial-lite configurations.",uniqueFeatures:["Multiple glass patterns","Light-borrowing between rooms"],priceRange:"$$$"}],frameMaterials:["Solid Wood","MDF","Moulded Composite"],finishes:[{name:"Pre-Primed",swatch:"#f0ede6"},{name:"Stain Grade",swatch:"#a07040"},{name:"Natural Fir",swatch:"#c09060"},{name:"Alder",swatch:"#8a6040"}],differentiators:["Stain-grade solid wood at competitive prices","Bridge between Masonite and TM Cobb","Wide architectural style range","Glass lite interior door selection"],idealFor:["Mid-range remodels wanting stain grade without TM Cobb pricing","Projects needing glass-lite interior doors","Transitional homes needing variety of profiles"],limitations:["Less custom capability than TM Cobb","Longer lead times on stain-grade vs. stock"],sdNotes:"Strong choice for Encinitas, Oceanside, and Chula Vista remodels where clients want stain-grade wood without the TM Cobb price point." },
  ],
  skylights: [
    { id:"velux", website:"https://www.velux.com", name:"VELUX", logo:"VX", color:T.gold, tagline:"The World's #1 Skylight Brand", tier:"Premium", tierColor:T.gold, origin:"Denmark — global leader since 1941", overview:"VELUX invented the modern roof window and remains the definitive skylight brand worldwide. Best-in-class weatherproofing, motorized operation, solar-powered blinds, and the widest selection of fixed and venting skylight configurations. The No Leak Promise is a key differentiator.", productLines:[{name:"Fixed Skylight — FCM",type:"Fixed Skylight",material:"Aluminum + Laminated Glass",description:"Standard fixed skylight. Aluminum frame, low-E laminated glass. Most popular residential skylight.",uniqueFeatures:["No Leak Promise","Low-E laminated glass","Standard and deck-mount configs"],priceRange:"$$"},{name:"Solar-Powered Venting — VSS",type:"Venting Skylight",material:"Aluminum + Laminated Glass",description:"Opens and closes via solar-powered motor — no electrical wiring required. Rain sensor auto-closes.",uniqueFeatures:["Solar powered — no wiring","Rain sensor","Remote or app control","No Leak Promise"],priceRange:"$$$"},{name:"Electric Venting — VES",type:"Venting Skylight",material:"Aluminum",description:"Hardwired electric motor. For projects where solar isn't preferred.",uniqueFeatures:["Hardwired motor","App compatible","Rain sensor available"],priceRange:"$$$"},{name:"Manual Venting — VMS",type:"Venting Skylight",material:"Aluminum",description:"Hand-crank operated venting skylight. Most affordable venting option.",uniqueFeatures:["Manual crank operation","Lower cost than solar/electric","Good for accessible locations"],priceRange:"$$"},{name:"Sun Tunnel / Tubular Daylight",type:"Tubular Skylight",material:"Aluminum + Acrylic",description:"Flexible tube channels daylight into rooms without full skylight installation. Interior rooms, hallways, bathrooms.",uniqueFeatures:["No structural modification","Installs in 2 hours","Rigid or flexible tube"],priceRange:"$"}],frameMaterials:["Extruded Aluminum (standard)","Wood-lined (interior upgrade)","Copper (specialty)"],finishes:[{name:"White",swatch:"#f0ede6"},{name:"Black",swatch:"#1A1A1A"},{name:"Brushed Aluminum",swatch:"#7A7A7A"},{name:"Copper",swatch:"#b87333"}],differentiators:["No Leak Promise — industry-first warranty","Solar powered venting — no electrical rough-in needed","Rain sensor auto-close on all venting models","Sun Tunnel for rooms without roof access","#1 brand recognition — customers already asking for VELUX by name"],idealFor:["Any residential skylight application","Bathrooms and interior rooms needing light (Sun Tunnel)","Clients wanting venting without electrical work (solar)","New construction and remodel"],limitations:["Premium pricing vs. generic skylights","Curb-mount configs require additional flashing kit"],sdNotes:"San Diego's abundant sunshine makes skylights a strong upsell on any remodel. VELUX solar venting skylight is the easiest sell — no electrician needed, rain sensor auto-closes. Sun Tunnels are a fast win for dark hallways and interior bathrooms in Carmel Valley and Scripps Ranch tract homes." },
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
    { id:"tmcobb_util", website:"https://www.tmcobb.com", name:"TM Cobb", logo:"TC", color:T.plum, tagline:"Custom Wood — Secondary & Utility Doors", tier:"Luxury", tierColor:T.plum, origin:"Southern California — local manufacturer", overview:"TM Cobb's custom capability extends beyond premium entry doors into secondary exterior and interior utility doors where the project demands consistent quality throughout. When a luxury custom home needs the same wood quality in the side entry, garage access, or service door as the front entry — TM Cobb can deliver matching door families across the entire project.", productLines:[{name:"Moulded Door Catalogue 2024",type:"Interior — Moulded",material:"Moulded Composite",description:"TM Cobb's complete moulded door catalogue — covers the full range of moulded panel door styles, profiles, and finish options for interior applications.",uniqueFeatures:["Full moulded door line","Panel styles & profiles","2024 edition"],priceRange:"$$–$$$",brochureUrl:"https://tmcobb.com/wp-content/uploads/2024/02/MOLDED_DOOR_BROCHURE-2024.pdf"},{name:"TM Cobb Red Book 2025",type:"Full Line",material:"Wood / MDF / Composite",description:"The complete TM Cobb product catalog — the Red Book covers the full range of custom entry doors, interior collections, stile-and-rail profiles, shaker lines, and specialty configurations. The definitive TM Cobb specification reference.",uniqueFeatures:["Complete product catalog","Entry & interior door lines","Specification reference"],priceRange:"$$$–$$$$$",brochureUrl:"https://tmcobb.com/wp-content/uploads/2026/02/TMC_RedBook-2025.pdf"},{name:"Secondary Exterior Wood Doors",type:"Secondary Exterior",material:"Solid Wood / Composite",description:"Custom wood secondary exterior doors matching the entry door family. Side entries, garage access, service entries.",uniqueFeatures:["Matches entry door design","Custom sizes","Same species and finish as entry"],priceRange:"$$$$"},{name:"Interior Utility — Custom Wood",type:"Interior Utility",material:"Solid Wood / MDF",description:"Custom interior doors for utility and secondary spaces in luxury builds. Maintains quality throughout.",uniqueFeatures:["Consistent quality whole-house","Custom sizes","Paint or stain grade"],priceRange:"$$$"}],frameMaterials:["Solid Wood","Wood Composite","MDF"],finishes:[{name:"Custom Stain",swatch:"#5a3a1a"},{name:"Black",swatch:"#1A1A1A"},{name:"White",swatch:"#f0ede6"},{name:"Natural Wood",swatch:"#a07040"},{name:"Custom Paint",swatch:"linear-gradient(135deg,#1a1a1a,#f0ede6)"}],differentiators:["Matching door families — entry + secondary + interior from one manufacturer","Custom sizing for any opening","California manufacturer — strong local support","Maintains luxury quality in utility applications"],idealFor:["Luxury custom builds wanting consistent door quality throughout","Side entries and service doors matching the front entry","High-end remodels where even utility doors are a design statement"],limitations:["Premium pricing — overkill for purely functional utility applications","4–8 week lead times on custom"],sdNotes:"The TM Cobb utility conversation: 'You're investing in a beautiful front entry — do you want the side entry to look like an afterthought?' In La Jolla and RSF custom builds, clients almost always say no. Matching the secondary door to the entry is a relatively small upsell that makes the whole project feel intentional." },
  ],
  entry_doors: [
    { id:"thermatru", website:"https://www.thermatru.com", name:"Therma-Tru", logo:"TT", color:T.rust, tagline:"America's #1 Entry Door Brand", tier:"Premium", tierColor:T.rust, origin:"Maumee OH — Fortune Brands", overview:"Pioneered fiberglass entry doors. Leads the market in finish quality, wood-grain realism, and design variety.", productLines:[{name:"Full Product Brochure 2024",type:"Full Line",material:"Fiberglass / Steel",description:"The complete Therma-Tru 2024 product brochure — full coverage of the Fiber-Classic®, Classic-Craft®, and Pulse® lines with door styles, glass inserts, finish options, and system components.",uniqueFeatures:["Full product line overview","Door styles, glass, and finish options","2024 edition"],priceRange:"$$$–$$$$",brochureUrl:"https://mcprideroofing.com/imageserver/Reusable/thermatru/brochure.pdf"},{name:"Fiber-Classic®",type:"Fiberglass Entry",material:"Fiberglass",description:"Authentic wood grain. Gel-stainable. Won't warp or rot.",uniqueFeatures:["Gel-stain ready","ENERGY STAR","8ft heights"],priceRange:"$$$"},{name:"Pulse® Contemporary",type:"Fiberglass/Steel Entry",material:"Fiberglass or Steel",description:"Modern flush designs for contemporary architecture.",uniqueFeatures:["Flush modern","Glass inserts","Available black"],priceRange:"$$$"},{name:"Classic-Craft®",type:"Premium Fiberglass",material:"Fiberglass",description:"Top-of-line. Deep wood grain, widest design selection.",uniqueFeatures:["Deepest wood grain in fiberglass","8ft + 10ft heights","Custom glass inserts"],priceRange:"$$$$"}],frameMaterials:["Fiberglass","Steel"],finishes:[{name:"Onyx",swatch:"#1A1A1A"},{name:"White",swatch:"#f0ede6"},{name:"Walnut",swatch:"#5a3a1a"},{name:"Oak",swatch:"#9a7a4a"},{name:"Cherry",swatch:"#7a2a1a"},{name:"Custom Paint",swatch:"linear-gradient(135deg,#C87A4A,#C9A84C)"}],differentiators:["#1 fiberglass entry brand in US","Most realistic wood grain in fiberglass","Gel-stained to match any interior wood","Won't warp or corrode coastal"],idealFor:["Traditional and craftsman homes","Coastal properties needing rot-resistant entry","Clients wanting wood look, no maintenance"],limitations:["Fewer ultra-modern profiles","Custom sizes add lead time"],sdNotes:"Strong seller for La Jolla/Del Mar traditional entries. Classic-Craft stained mahogany popular in high-end entries." },
    { id:"tmcobb", website:"https://www.tmcobb.com", name:"TM Cobb", logo:"TC", color:T.plum, tagline:"Custom Wood Doors, California Craft", tier:"Luxury", tierColor:T.plum, origin:"Southern California — local manufacturer", overview:"California's custom wood door specialist. Luxury custom entry and interior doors for the SoCal market. Excellent local support and custom capability.", productLines:[{name:"Moulded Door Catalogue 2024",type:"Interior — Moulded",material:"Moulded Composite",description:"TM Cobb's complete moulded door catalogue — covers the full range of moulded panel door styles, profiles, and finish options for interior applications.",uniqueFeatures:["Full moulded door line","Panel styles & profiles","2024 edition"],priceRange:"$$–$$$",brochureUrl:"https://tmcobb.com/wp-content/uploads/2024/02/MOLDED_DOOR_BROCHURE-2024.pdf"},{name:"TM Cobb Red Book 2025",type:"Full Line",material:"Wood / MDF / Composite",description:"The complete TM Cobb product catalog — the Red Book covers the full range of custom entry doors, interior collections, stile-and-rail profiles, shaker lines, and specialty configurations. The definitive TM Cobb specification reference.",uniqueFeatures:["Complete product catalog","Entry & interior door lines","Specification reference"],priceRange:"$$$–$$$$$",brochureUrl:"https://tmcobb.com/wp-content/uploads/2026/02/TMC_RedBook-2025.pdf"},{name:"Custom Entry Doors",type:"Solid Wood Entry",material:"Solid Wood / Composite",description:"Fully custom wood entries. Any design, size, species.",uniqueFeatures:["Fully custom","Multiple species","California-made"],priceRange:"$$$$–$$$$$"},{name:"Interior Door Collections",type:"Interior Doors",material:"Wood / MDF / Composite",description:"Full interior lines — stile/rail, flush, shaker, panel.",uniqueFeatures:["Matching interior/exterior","Pre-hung options","Custom paint/stain"],priceRange:"$$$"}],frameMaterials:["Solid Wood","Wood Composite","MDF"],finishes:[{name:"Custom Stain",swatch:"#5a3a1a"},{name:"Black",swatch:"#1A1A1A"},{name:"White",swatch:"#f0ede6"},{name:"Natural Wood",swatch:"#a07040"},{name:"Custom Paint",swatch:"linear-gradient(135deg,#1a1a1a,#f0ede6)"}],differentiators:["Fully custom — any size/design/species","California manufacturer — shorter ETAs","Matching interior door families","Deep local support"],idealFor:["Custom luxury homes needing custom entry","Clients matching interior/exterior door families"],limitations:["Custom lead times 6–12 weeks","Wood entry needs coastal maintenance"],sdNotes:"Strong for RSF/La Jolla custom builds. Local manufacturer is key selling point." },

    { id:"simpson", website:"https://www.simpsondoor.com", name:"Simpson Door Company", logo:"SD", color:T.rust, tagline:"America's Premier Wood Door Craftsman", tier:"Luxury", tierColor:T.rust, origin:"McCleary WA — family-owned since 1912", overview:"Simpson Door Company is one of the oldest and most respected wood door manufacturers in the United States. Family-owned for over 110 years, they produce an extraordinary range of solid wood entry, interior, and patio doors — from classic stile-and-rail designs to bold contemporary flush panels and full-lite glass doors. Simpson is the go-to when a client or architect wants genuine solid wood craftsmanship, maximum design flexibility, and a proven track record. Their doors are widely available through the dealer network in Southern California and their lead times, while custom, are generally manageable. This is the brand to bring up when TM Cobb isn't the right fit or when the client is already familiar with and asking for Simpson by name.", productLines:[{name:"Sourcebook",type:"Full Line",material:"Solid Wood / Fiberglass",description:"The complete Simpson Door Sourcebook — the master reference for the full Simpson product line. Every door family, species, profile, glass option, and specification detail in one comprehensive catalog.",uniqueFeatures:["Complete product reference","All door families & species","Full specifications"],priceRange:"$$$–$$$$$",brochureUrl:"https://www.simpsondoor.com/literature/pdfs/Sourcebook.pdf"},{name:"Contemporary Exterior & Interior Brochure",type:"Full Line — Contemporary",material:"Solid Wood",description:"Simpson's dedicated contemporary door brochure — covers the full Contemporary Collection for both exterior entry and interior applications. Profiles, glass configurations, species options, and finish details for modern architecture.",uniqueFeatures:["Contemporary exterior & interior lines","Glass configurations & profiles","Species and finish options"],priceRange:"$$$–$$$$",brochureUrl:"https://www.simpsondoor.com/literature/pdfs/Contemporary-Doors-Brochure.pdf"},{name:"Contemporary Collection",type:"Exterior Entry — Wood",material:"Solid Wood",description:"Bold modern entry doors — flush panels, horizontal grain, full-lite glass configurations, and oversized pivot-style designs. The most-specified Simpson line for new contemporary SD builds.",uniqueFeatures:["Full-lite glass options","Horizontal grain flush panels","Pivot-ready configurations","Modern proportions"],priceRange:"$$$$"},{name:"Traditional — Stile & Rail",type:"Exterior Entry — Wood",material:"Solid Wood",description:"Classic stile-and-rail construction in 2, 3, 4, 5, and 6-panel configurations. Available in a wide range of wood species. The standard for traditional, craftsman, and transitional architecture.",uniqueFeatures:["Multiple panel counts","Wide species selection","Classic joinery","Paintable or stainable"],priceRange:"$$$–$$$$"},{name:"Fiberglass Entry",type:"Exterior Entry — Fiberglass",material:"Fiberglass",description:"Simpson's fiberglass line brings the brand's design depth to a low-maintenance material. Good alternative when wood maintenance is a concern but the client wants Simpson profiles.",uniqueFeatures:["Low maintenance","Wood-grain realism","Matches wood collection profiles"],priceRange:"$$$"},{name:"Interior Door Collection",type:"Interior — Wood",material:"Solid Wood / MDF",description:"Extensive interior wood door range — stile/rail, flush, bi-fold, pocket, and glass-lite options. Matches exterior door aesthetics for whole-house continuity.",uniqueFeatures:["Whole-house continuity","Matching exterior profiles","Paint and stain grade"],priceRange:"$$$"},{name:"Patio & French Doors — Wood",type:"Patio / French",material:"Solid Wood",description:"Wood patio door and French door systems. Pairs with large glass wall systems on projects where wood detailing is the design language.",uniqueFeatures:["True divided lite option","Wood species selection","Pairs with multi-slide systems"],priceRange:"$$$$"}],frameMaterials:["Solid Wood (Douglas Fir, Alder, Mahogany, Oak, Pine)","Fiberglass"],finishes:[{name:"Paint Grade",swatch:"#f0ede6"},{name:"Natural Fir",swatch:"#c09060"},{name:"Alder Stain",swatch:"#8a6040"},{name:"Mahogany",swatch:"#5a3a1a"},{name:"Black Paint",swatch:"#1A1A1A"},{name:"Custom",swatch:"linear-gradient(135deg,#a07040,#f0ede6)"}],differentiators:["110+ years — one of America's oldest door manufacturers","Contemporary Collection — the modern wood entry benchmark","Widest species selection of any production wood door brand","Matching entry and interior collections for whole-house continuity","Family-owned — consistent quality and brand reputation"],idealFor:["Luxury custom homes wanting solid wood throughout","Architects specifying contemporary full-lite entry doors","Traditional and craftsman homes needing stile-and-rail wood entries","Projects where whole-house entry-to-interior continuity matters","Clients who arrive asking for Simpson by name"],limitations:["Premium pricing — not budget-friendly","Wood entry requires coastal maintenance program","Custom lead times 6–10 weeks on specialty items","Less recognized by general consumers than Therma-Tru"],sdNotes:"Simpson's Contemporary Collection is one of the most architect-specified wood entry door lines in San Diego's high-end market. For La Jolla, Del Mar, and Carmel Valley contemporary builds where the entry door is a design statement — full-lite glass, horizontal grain, oversized format — this is the first call. For traditional craftsman architecture in Coronado and Point Loma, their stile-and-rail wood doors are the natural fit. The matching interior door collection makes it easy to sell the whole-house package. If a client mentions they've seen a Simpson door and want something like it, you're halfway there." },

    { id:"roguevalley", website:"https://www.roguevalleydoor.com", name:"Rogue Valley Door", logo:"RV", color:T.gold, tagline:"Oregon-Crafted Premium Wood Entry Doors", tier:"Luxury", tierColor:T.gold, origin:"Medford OR — family-owned wood door manufacturer", overview:"Rogue Valley Door is an Oregon-based premium wood door manufacturer known for exceptional craftsmanship, wide design variety, and strong customization capability. Their product is specifically the entry door — they do one thing and they do it extremely well. Where Simpson covers a broad range from entry to interior, Rogue Valley's focus is the front door as a statement piece. Their designs range from traditional mahogany stile-and-rail to bold contemporary full-lite and half-lite glass configurations. Strong in the architect and custom builder channel, and frequently specified on high-end San Diego coastal homes where the entry door is expected to make an impression.", productLines:[{name:"Full Line Catalog 2023",type:"Full Line",material:"Solid Wood",description:"The complete Rogue Valley Door product catalog — covers all door families including contemporary full-lite and half-lite, traditional mahogany stile-and-rail, alder and Douglas fir collections, oversized entries, and pivot doors. Full specifications, glass insert options, and finish details.",uniqueFeatures:["Complete product catalog","All door families & species","Glass and finish specifications"],priceRange:"$$$–$$$$$",brochureUrl:"https://www.roguevalleydoor.com/apps/default/asset/pdfs/RVD-Full-Line-Catalog-7-2023.pdf"},{name:"Contemporary — Full & Half Lite",type:"Exterior Entry — Wood",material:"Solid Wood",description:"Bold contemporary entry doors with full-lite or half-lite glass inserts. Clean lines, wide stiles, large glass areas. Competes directly with Simpson Contemporary for the modern luxury entry market.",uniqueFeatures:["Full-lite and half-lite options","Large glass configurations","Contemporary profiles"],priceRange:"$$$$–$$$$$"},{name:"Traditional Mahogany — Stile & Rail",type:"Exterior Entry — Wood",material:"Solid Mahogany",description:"Rogue Valley's signature product. Solid mahogany stile-and-rail entry doors in 2 through 8 panel configurations. Gel-stainable to any tone. The definitive luxury traditional entry in coastal San Diego.",uniqueFeatures:["Solid mahogany standard","Gel-stain ready","2 through 8 panel configurations"],priceRange:"$$$$"},{name:"Alder & Douglas Fir",type:"Exterior Entry — Wood",material:"Solid Alder / Douglas Fir",description:"Alder is the go-to for paint-grade contemporary; Douglas fir for craftsman and traditional stain finishes. Both available in all Rogue Valley profiles.",uniqueFeatures:["Paint or stain grade","Multiple profiles","Species choice"],priceRange:"$$$–$$$$"},{name:"8-Foot & Oversized Entry",type:"Exterior Entry — Wood",material:"Solid Wood",description:"Standard offering at 8ft height — Rogue Valley's bread and butter for luxury residential. 9ft and 10ft available for grand entries on estate homes.",uniqueFeatures:["8ft standard","9ft and 10ft available","Grand entry scale"],priceRange:"$$$$–$$$$$"},{name:"Pivot Entry Doors",type:"Exterior Entry — Pivot",material:"Solid Wood",description:"Large-format pivot entry doors for contemporary and transitional estate homes. Statement entries that pair with glass walls and open-plan architecture.",uniqueFeatures:["Pivot hardware ready","Large format","Statement entry"],priceRange:"$$$$$"}],frameMaterials:["Solid Mahogany","Solid Alder","Douglas Fir","Clear Pine"],finishes:[{name:"Mahogany Stain",swatch:"#5a3a1a"},{name:"Natural Alder",swatch:"#a07040"},{name:"Paint Grade White",swatch:"#f0ede6"},{name:"Black",swatch:"#1A1A1A"},{name:"Custom Stain",swatch:"linear-gradient(135deg,#5a3a1a,#a07040)"}],differentiators:["Entry door specialty — that's all they do, and they do it exceptionally","Solid mahogany as a standard offering — not an upgrade","8ft height as standard — luxury proportions without special order","Oregon family craftsmanship — consistent quality","Strong in architect and custom builder channel"],idealFor:["Luxury estates where the entry door is the focal point","Coastal SD homes needing solid mahogany traditional entry","Contemporary builds wanting full-lite glass wood statement entry","Architects specifying pivot entry doors","Clients wanting a single-vendor specialty entry door solution"],limitations:["Entry doors only — no interior door matching","Premium pricing — not for budget projects","Lead times 6–10 weeks on custom","Less distribution than Simpson in SD"],sdNotes:"Rogue Valley is the entry door specialist's entry door — when the client cares deeply about the front door as a statement, this is the brand to show them. Solid mahogany standard (not upgrade) is a genuine differentiator — most competitors charge a premium for mahogany. The 8ft height as standard is a key talking point for luxury SD homes where 6'8\" feels undersized. For Rancho Santa Fe estate homes, La Jolla single-level contemporaries, and Coronado traditional entries, Rogue Valley is often the first brand an architect will spec. Learn the pivot door line — it pairs beautifully with a Western Window Systems or NanaWall glass wall system." },
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
  { id:"projectType", section:"Your Project", question:"What best describes your project?", subtitle:"Helps us understand scope and installation approach", options:[{value:"custom_new",label:"Custom New Build",icon:"",detail:"Designing from scratch"},{value:"luxury_remodel",label:"Full Remodel",icon:"",detail:"Major renovation of existing home"},{value:"addition",label:"Room Addition / ADU",icon:"",detail:"Adding new living space"},{value:"door_replacement",label:"Window/Door Replacement",icon:"",detail:"Swapping specific openings"}] },
  { id:"pullingPermits", section:"Your Project", question:"Will this project be permitted / inspected?", subtitle:"Permitted projects in California must meet Title 24 energy code requirements", isPermits:true, condition:(a)=>a.projectType==="luxury_remodel"||a.projectType==="addition"||a.projectType==="door_replacement", options:[{value:"yes",label:"Yes — Pulling Permits",icon:"",detail:"Full inspection required — Title 24 applies"},{value:"no",label:"No Permits",icon:"",detail:"Owner or contractor managing without permits"},{value:"unsure",label:"Not Sure Yet",icon:"",detail:"I need to check with my contractor or the city"},{value:"na",label:"N/A — New Build",icon:"",detail:"New construction always requires permits"}] },
  { id:"replacementPurpose", section:"Your Project", question:"What are your goals for this window & door upgrade?", subtitle:"Select everything that applies — helps us match the right products and glazing options", isMultiSelect:true, isReplacementPurpose:true, options:[{value:"energy",label:"Energy Efficiency",icon:"",detail:"Lower utility bills, Title 24 compliance, better insulation"},{value:"sound",label:"Sound Control",icon:"",detail:"Reduce traffic, aircraft, or neighborhood noise"},{value:"aesthetic",label:"Aesthetics & Style",icon:"",detail:"Update the look, modernize, or match architecture"},{value:"functionality",label:"Functionality",icon:"",detail:"Easier operation, better hardware, modern systems"},{value:"maintenance",label:"Low Maintenance",icon:"",detail:"Eliminate painting, warping, rot, and corrosion"},{value:"durability",label:"Durability & Longevity",icon:"",detail:"Products built to last 20–30+ years in SD climate"},{value:"indoor_outdoor",label:"Indoor-Outdoor Living",icon:"",detail:"Open the wall, create a glass wall or folding system"},{value:"security",label:"Security & Safety",icon:"",detail:"Better locks, impact glass, fire-rated products"}] },
  { id:"coastalProximity", section:"Property Details", question:"Is your home within 2 miles of the ocean or bay?", subtitle:"Salt air affects frame and hardware material recommendations.", isCoastal:true, options:[{value:"yes",label:"Yes",icon:"🌊",detail:"Within 2 miles of the ocean or bay"},{value:"no",label:"No",icon:"🏠",detail:"More than 2 miles inland"},{value:"unsure",label:"Not Sure",icon:"❓",detail:"I'm not certain"}] },
  { id:"elevation", section:"Property Details", question:"Is your home above approximately 4,000 feet elevation?", subtitle:"High-elevation properties (Julian, Alpine, Mt. Laguna) require special IG unit treatment", isElevation:true, options:[{value:"yes",label:"Yes — High Elevation",icon:"",detail:"Above ~4,000 ft — Julian, Alpine, Mt. Laguna area"},{value:"no",label:"No — Standard Elevation",icon:"",detail:"Sea level to ~4,000 ft — most of San Diego County"},{value:"unsure",label:"Not Sure",icon:"",detail:"I'm not certain of my elevation"}] },
  { id:"fireZone", section:"Property Details", question:"Is your property in a designated fire hazard zone?", subtitle:"Fire zone status affects product requirements, ratings, and material selection", isFireZone:true, options:[{value:"yes_very_high",label:"Yes — Very High",icon:"",detail:"Designated Very High Fire Hazard Severity Zone"},{value:"yes_high",label:"Yes — High",icon:"",detail:"Designated High Fire Hazard Severity Zone"},{value:"yes_moderate",label:"Yes — Moderate",icon:"",detail:"Designated Moderate Fire Hazard Severity Zone"},{value:"no",label:"No / Not in Fire Zone",icon:"",detail:"Not in a designated fire hazard zone"},{value:"unsure",label:"Not Sure",icon:"",detail:"I need to check — I'll look it up"}] },
  { id:"temperedGlass", section:"Property Details", condition:(a)=>a.projectType!=="custom_new", question:"Do any of your windows or doors require tempered glass?", subtitle:"Certain locations require tempered safety glass by code — click to learn why", isTempered:true, options:[{value:"yes_know",label:"Yes — I Know Where",icon:"",detail:"I know which locations need tempered"},{value:"yes_unsure",label:"Probably — Not Sure Where",icon:"",detail:"I have some locations that might apply"},{value:"no",label:"No / Not Applicable",icon:"",detail:"No tempered locations"},{value:"unsure",label:"Not Sure — Explain It",icon:"",detail:"I'd like to understand when tempered is required"}] },
  { id:"installType", section:"Installation Type", question:"Do you know whether your project needs retrofit or new construction windows?", subtitle:"Two very different installation methods — click to learn more if unsure", educationKey:"installType", educationLabel:"Learn the difference →", options:[{value:"retrofit",label:"Retrofit / Replacement",icon:"",detail:"Installing inside existing frame — less demolition"},{value:"new_construction",label:"New Construction",icon:"",detail:"Nailing fin attached to rough framing"},{value:"both",label:"Mix of Both",icon:"",detail:"Some areas retrofit, others full"},{value:"unsure",label:"Not Sure",icon:"",detail:"I'd like help understanding"}] },
  { id:"exteriorMaterial", section:"Your Home's Exterior", condition:(a)=>a.projectType!=="custom_new", question:"What is the exterior wall covering of your home?", subtitle:"Affects how windows are flashed, sealed, and integrated", options:[{value:"stucco",label:"Stucco",icon:"",detail:"Hard plaster — most common in San Diego"},{value:"siding_wood",label:"Wood Siding",icon:"",detail:"Horizontal wood or engineered wood planks"},{value:"siding_fiber",label:"Fiber Cement Siding",icon:"",detail:"Hardieplank or similar"},{value:"brick_stone",label:"Brick or Stone",icon:"",detail:"Masonry exterior"},{value:"siding_vinyl",label:"Vinyl Siding",icon:"▦",detail:"Plastic lap siding"},{value:"mixed",label:"Mixed / Not Sure",icon:"",detail:"Multiple materials"}], columns:3 },
  { id:"hasExistingWindows", section:"Existing Windows", condition:(a)=>a.projectType!=="custom_new", question:"Are you replacing existing windows or doors?", subtitle:"If yes, we'll ask a few more questions to help with matching", options:[{value:"yes_all",label:"Yes — Replacing Everything",icon:"",detail:"Full whole-house replacement"},{value:"yes_some",label:"Yes — Replacing Some",icon:"↩",detail:"Specific rooms or openings"},{value:"no_new",label:"No — All New Openings",icon:"",detail:"New construction or new openings"}] },
  { id:"existingFrameMaterial", section:"Existing Windows", question:"What material are your existing window frames?", subtitle:"Check the frame edges and corners for clues", condition:(a)=>a.projectType!=="custom_new"&&(a.hasExistingWindows==="yes_all"||a.hasExistingWindows==="yes_some"), options:[{value:"aluminum",label:"Aluminum",icon:"⬛",detail:"Thin metal frame — very common in 1970s–2000s SD"},{value:"wood",label:"Wood",icon:"🪵",detail:"Natural or painted wood frame"},{value:"vinyl",label:"Vinyl",icon:"🔲",detail:"White/beige plastic frame"},{value:"fiberglass",label:"Fiberglass",icon:"💠",detail:"Looks like vinyl but heavier"},{value:"steel",label:"Steel",icon:"🔩",detail:"Very thin dark metal"},{value:"unsure",label:"Not Sure",icon:"❓",detail:"I'd need help identifying"}] },
  { id:"matchExistingBrand", section:"Existing Windows", question:"Are you trying to match an existing window brand or style?", subtitle:"Some clients need consistency with windows staying in place", condition:(a)=>a.projectType!=="custom_new"&&(a.hasExistingWindows==="yes_all"||a.hasExistingWindows==="yes_some"), options:[{value:"yes_match",label:"Yes — Want to Match",icon:"",detail:"Need to blend with remaining windows"},{value:"open_upgrade",label:"Open to Upgrading Style",icon:"",detail:"Happy to change the look"},{value:"no_all_new",label:"Replacing Everything",icon:"",detail:"Full replacement — no need to match"}] },
  { id:"primaryGoal", section:"Your Vision", question:"What's the primary vision for this project?", subtitle:"What outcome matters most?", options:[{value:"indoor_outdoor",label:"Indoor-Outdoor Living",icon:"",detail:"Open the wall to yard, patio, or view"},{value:"views",label:"Maximize Views & Light",icon:"",detail:"Frame the view, flood with light"},{value:"entertaining",label:"Entertaining & Flow",icon:"",detail:"Seamless flow for hosting"},{value:"complete_package",label:"Whole-House Upgrade",icon:"",detail:"Replace all windows and doors"}] },
  { id:"style", section:"Your Vision", question:"How would you describe your home's architecture?", subtitle:"Guides frame material and finish recommendations", options:[{value:"modern",label:"Modern / Contemporary",icon:"◻",detail:"Clean lines, minimal frames, black aluminum"},{value:"transitional",label:"Transitional",icon:"◈",detail:"Mix of classic and modern"},{value:"traditional",label:"Traditional / Craftsman",icon:"⬡",detail:"Warm tones, classic profiles"},{value:"coastal",label:"Coastal / Mediterranean",icon:"🌊",detail:"Salt air environment, relaxed luxury"},{value:"unsure",label:"Not Sure",icon:"❓",detail:"I'd like help figuring it out"}] },
  { id:"desiredFrame", section:"Frame Material", question:"What frame material are you looking for in your new windows?", subtitle:"Each material has distinct advantages — click to compare all", educationKey:"frameMaterial", educationLabel:"Compare frame materials →", options:[{value:"aluminum",label:"Aluminum",icon:"⬛",detail:"Slim, strong, low maintenance — ideal for modern"},{value:"wood",label:"Wood or Clad Wood",icon:"🪵",detail:"Warm interior — traditional & craftsman"},{value:"vinyl",label:"Vinyl",icon:"🔲",detail:"Affordable, energy-efficient, maintenance-free"},{value:"fiberglass",label:"Fiberglass",icon:"💠",detail:"Premium strength — excellent for coastal"},{value:"steel",label:"Steel",icon:"🔩",detail:"Ultra-thin frames — architectural statement"},{value:"unsure",label:"Help Me Decide",icon:"❓",detail:"Recommend based on my project"}], columns:3 },
  { id:"wantsLargeOpening", section:"Door System", question:"Are you looking to open up your space with a large patio door or glass wall system?", subtitle:"Think sliding walls, folding doors, or multi-panel systems", options:[{value:"yes",label:"Yes — That's the Plan",icon:"",detail:"I want to open up a wall or create an indoor-outdoor connection"},{value:"maybe",label:"Possibly — Still Deciding",icon:"",detail:"I'm curious about what's possible"},{value:"no",label:"No — Just Windows & Standard Doors",icon:"",detail:"I'm focused on windows and regular doors"}] },
  { id:"openingSize", section:"Door System", question:"What size is the main opening you want to transform?", subtitle:"Approximate width of the glass wall or main door system", condition:(a)=>a.wantsLargeOpening==="yes"||a.wantsLargeOpening==="maybe", options:[{value:"small",label:"Up to 12 feet",icon:"←→",detail:"Single room connection"},{value:"medium",label:"12–24 feet",icon:"⟵⟶",detail:"Substantial opening"},{value:"large",label:"24–40 feet",icon:"⟵——⟶",detail:"Full wall removal"},{value:"xl",label:"40+ feet or Corner",icon:"⊓",detail:"Monumental or corner system"}] },
  { id:"systemType", section:"Door System", question:"Do you have a door system type in mind?", subtitle:"Or let us recommend the right one", condition:(a)=>a.wantsLargeOpening==="yes"||a.wantsLargeOpening==="maybe", options:[{value:"folding",label:"Folding / Bi-fold",icon:"≋",detail:"Panels accordion — widest clear opening"},{value:"multislide",label:"Multi-Slide / Pocket",icon:"⇥",detail:"Panels slide, stack, or disappear"},{value:"liftslide",label:"Lift & Slide",icon:"⬆",detail:"European-style monolithic panel"},{value:"unsure",label:"Not Sure",icon:"",detail:"Help me understand the options"}] },
  { id:"budget", section:"Budget", question:"What's your approximate budget for the door system alone?", subtitle:"Excludes windows — just the main glass wall / door system", condition:(a)=>a.wantsLargeOpening==="yes"||a.wantsLargeOpening==="maybe", options:[{value:"moderate",label:"$10K – $25K",icon:"",detail:"Value-premium range"},{value:"premium",label:"$25K – $50K",icon:"",detail:"Premium range"},{value:"luxury",label:"$50K – $100K",icon:"",detail:"Luxury range"},{value:"ultra",label:"$100K+ / No Limit",icon:"",detail:"Best possible — no budget constraint"}] },
  { id:"priority", section:"Priorities", question:"What matters most in your final product?", subtitle:"Pick the one that resonates most strongly", options:[{value:"aesthetics",label:"Aesthetics & Wow Factor",icon:"",detail:"It needs to be visually stunning"},{value:"performance",label:"Performance & Durability",icon:"",detail:"Built to last in coastal SD"},{value:"value",label:"Best Value for Budget",icon:"",detail:"Quality without overpaying"},{value:"customization",label:"Total Customization",icon:"",detail:"One-of-a-kind for my home"}] },
  { id:"timeline", section:"Timeline", question:"When are you looking to move forward?", subtitle:"Helps us prioritize your inquiry", options:[{value:"now",label:"Ready Now",icon:"",detail:"Project underway or starting within 30 days"},{value:"quarter",label:"1–3 Months",icon:"",detail:"Planning, gathering quotes"},{value:"sixmonths",label:"3–6 Months",icon:"",detail:"Early planning phase"},{value:"future",label:"Just Exploring",icon:"",detail:"Thinking about it for the future"}] },
  { id:"hasDeadline", section:"Timeline", question:"Do you have a hard deadline this project must be completed by?", subtitle:"Events, move-in dates, or construction milestones can affect vendor selection", options:[{value:"yes",label:"Yes — Hard Deadline",icon:"\u{1F4C5}",detail:"There's a specific date we must hit"},{value:"soft",label:"Soft Target",icon:"",detail:"A preferred timeframe but flexible"},{value:"no",label:"No Deadline",icon:"",detail:"Whenever it's done right"}] },
  { id:"contact", section:"Contact", question:"Last step — how should we reach you?", subtitle:"A local window & door specialist will follow up within 1 business day. No spam, ever.", isContact:true },
];

function scoreVendors(answers) {
  const s = {nanawall:0,lacantina:0,andersen:0,marvin:0,milgard:0,pella:0,weathershield:0,alpine:0,jeldwen_win:0,simonton:0,westernwindow:0,nuvista:0,iwc:0,windor:0,fleetwood:0,steeltraditions:0,frenchsteel:0};
  if(answers.projectType==="custom_new"){s.nanawall+=3;s.marvin+=3;s.andersen+=2;}
  if(answers.projectType==="luxury_remodel"){s.lacantina+=3;s.andersen+=3;s.milgard+=2;}
  if(answers.projectType==="addition"){s.lacantina+=2;s.milgard+=3;s.andersen+=2;}
  if(answers.projectType==="door_replacement"){s.milgard+=3;s.lacantina+=2;}
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
  if(answers.budget==="ultra"){s.nanawall+=4;s.marvin+=4;}
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
  if(answers.projectType==="door_replacement"){s.pella+=2;}
  if(answers.budget==="moderate"){s.pella+=3;}
  if(answers.budget==="premium"){s.pella+=2;}
  if(answers.style==="transitional"){s.pella+=2;}
  if(answers.priority==="value"){s.pella+=2;}
  // Weather Shield scoring
  if(answers.projectType==="custom_new"){s.weathershield+=2;}
  if(answers.budget==="luxury"){s.weathershield+=2;}
  if(answers.budget==="ultra"){s.weathershield+=2;}
  if(answers.style==="traditional"){s.weathershield+=2;}
  if(answers.style==="coastal"){s.weathershield+=2;}
  if(answers.priority==="customization"){s.weathershield+=3;}
  if(answers.openingSize==="small"||answers.openingSize==="medium"){s.weathershield+=1;}
  // Alpine scoring — vinyl value, budget remodels
  if(answers.budget==="moderate"){s.alpine+=3;}
  if(answers.desiredFrame==="vinyl"){s.alpine+=3;}
  if(answers.projectType==="door_replacement"){s.alpine+=2;}
  if(answers.priority==="value"){s.alpine+=3;}
  if(answers.openingSize==="small"||answers.openingSize==="medium"){s.alpine+=2;}
  // JELD-WEN Windows scoring — broad range, mixed-spec
  if(answers.budget==="moderate"){s.jeldwen_win+=2;}
  if(answers.budget==="premium"){s.jeldwen_win+=2;}
  if(answers.desiredFrame==="vinyl"){s.jeldwen_win+=2;}
  if(answers.desiredFrame==="wood"){s.jeldwen_win+=2;}
  if(answers.projectType==="luxury_remodel"){s.jeldwen_win+=1;}
  if(answers.priority==="value"){s.jeldwen_win+=2;}
  // Simonton scoring — production vinyl, budget, Daylight Max
  if(answers.budget==="moderate"){s.simonton+=3;}
  if(answers.desiredFrame==="vinyl"){s.simonton+=3;}
  if(answers.priority==="value"){s.simonton+=3;}
  if(answers.projectType==="door_replacement"){s.simonton+=2;}
  if(answers.openingSize==="small"||answers.openingSize==="medium"){s.simonton+=1;}
  // Western Window Systems scoring — modern aluminum, large openings
  if(answers.systemType==="multislide"){s.westernwindow+=4;}
  if(answers.systemType==="folding"){s.westernwindow+=3;}
  if(answers.systemType==="pocket_multislide"){s.westernwindow+=4;}
  if(answers.style==="modern"){s.westernwindow+=4;}
  if(answers.desiredFrame==="aluminum"){s.westernwindow+=4;}
  if(answers.openingSize==="large"||answers.openingSize==="xl"){s.westernwindow+=3;}
  if(answers.budget==="luxury"||answers.budget==="ultra"){s.westernwindow+=2;}
  if(answers.priority==="aesthetics"){s.westernwindow+=2;}
  if(answers.projectType==="custom_new"){s.westernwindow+=2;}
  // NuVista scoring — budget architectural aluminum, ADU, commercial-adjacent
  if(answers.desiredFrame==="aluminum"){s.nuvista+=4;}
  if(answers.style==="modern"){s.nuvista+=3;}
  if(answers.projectType==="custom_new"){s.nuvista+=2;}
  if(answers.budget==="premium"){s.nuvista+=2;}
  if(answers.budget==="moderate"){s.nuvista+=2;}
  if(answers.priority==="value"){s.nuvista+=2;}
  if(answers.openingSize==="large"||answers.openingSize==="xl"){s.nuvista+=1;}
  // IWC scoring — commercial-grade aluminum, custom, architect
  if(answers.desiredFrame==="aluminum"){s.iwc+=3;}
  if(answers.style==="modern"){s.iwc+=2;}
  if(answers.projectType==="custom_new"){s.iwc+=2;}
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
  if(answers.budget==="ultra"){s.fleetwood+=5;}
  if(answers.budget==="luxury"){s.fleetwood+=3;}
  if(answers.systemType==="multislide"){s.fleetwood+=4;}
  if(answers.systemType==="liftslide"){s.fleetwood+=5;}
  if(answers.systemType==="folding"){s.fleetwood+=3;}
  if(answers.openingSize==="xl"){s.fleetwood+=4;}
  if(answers.openingSize==="large"){s.fleetwood+=3;}
  if(answers.style==="modern"){s.fleetwood+=3;}
  if(answers.desiredFrame==="aluminum"){s.fleetwood+=4;}
  if(answers.priority==="aesthetics"){s.fleetwood+=3;}
  if(answers.priority==="performance"){s.fleetwood+=2;}
  if(answers.projectType==="custom_new"){s.fleetwood+=3;}
  // Steel Traditions scoring — steel frame, modern/transitional, luxury
  if(answers.desiredFrame==="steel"){s.steeltraditions+=5;s.frenchsteel+=4;}
  if(answers.style==="modern"){s.steeltraditions+=3;}
  if(answers.style==="transitional"){s.steeltraditions+=3;s.frenchsteel+=2;}
  if(answers.style==="traditional"){s.frenchsteel+=3;s.steeltraditions+=2;}
  if(answers.style==="coastal"){s.steeltraditions+=2;s.frenchsteel+=2;}
  if(answers.budget==="luxury"||answers.budget==="ultra"){s.steeltraditions+=3;s.frenchsteel+=3;}
  if(answers.budget==="premium"){s.steeltraditions+=2;s.frenchsteel+=2;}
  if(answers.priority==="aesthetics"){s.steeltraditions+=3;s.frenchsteel+=3;}
  if(answers.priority==="customization"){s.steeltraditions+=2;s.frenchsteel+=3;}
  if(answers.projectType==="custom_new"){s.steeltraditions+=2;s.frenchsteel+=2;}
  // Fire zone — coastal stainless / fire-rated bonus
  if(answers.fireZone==="yes_very_high"||answers.fireZone==="yes_high"){s.marvin+=2;s.andersen+=1;}
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
function VendorLogo({ id, size = 52 }) {
  const s = size;
  const logos = {

    // ── NanaWall ── all-caps architectural wordmark, dark/minimal
    nanawall: (
      <svg width={s} height={s} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <rect x="6" y="22" width="40" height="1.5" fill="#9A7020" opacity="0.7"/>
        <text x="26" y="20" textAnchor="middle" fontFamily={"'Arial Narrow',Arial,sans-serif"} fontWeight="700" fontSize="9" letterSpacing="2" fill="#1A2028">NANA</text>
        <text x="26" y="33" textAnchor="middle" fontFamily={"'Arial Narrow',Arial,sans-serif"} fontWeight="300" fontSize="9" letterSpacing="2" fill="#9A7020">WALL</text>
        <text x="26" y="43" textAnchor="middle" fontFamily="monospace" fontSize="5" letterSpacing="1" fill="#4a5a54">GLASS WALLS</text>
      </svg>
    ),

    // ── LaCantina ── clean wordmark, teal accent bar
    lacantina: (
      <svg width={s} height={s} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <text x="26" y="21" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic" fontWeight="400" fontSize="8.5" fill="#1A2028" letterSpacing="0.5">La</text>
        <text x="26" y="31" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="10" fill="#2A8A80" letterSpacing="1">CANTINA</text>
        <rect x="14" y="35" width="24" height="1" rx="0.5" fill="#2A8A80" opacity="0.5"/>
        <text x="26" y="44" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="1" fill="#4a5a54">DOORS</text>
      </svg>
    ),

    // ── Andersen ── orange upward triangle mark + wordmark
    andersen: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#EEF4F2"/>
        <polygon points="32,9 41,25 23,25" fill="#E87820"/>
        <text x="32" y="38" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="9" fill="#1A2028" letterSpacing="0">ANDERSEN</text>
        <text x="32" y="50" textAnchor="middle" fontFamily="monospace" fontSize="5" letterSpacing="0" fill="#4a5a54">WINDOWS &amp; DOORS</text>
      </svg>
    ),

    // ── Andersen Skylights — same triangle, skylight subtitle
    andersen_skylight: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#EEF4F2"/>
        <polygon points="32,9 41,25 23,25" fill="#E87820"/>
        <text x="32" y="38" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="9" fill="#1A2028" letterSpacing="0">ANDERSEN</text>
        <text x="32" y="50" textAnchor="middle" fontFamily="monospace" fontSize="5" letterSpacing="0" fill="#2A8A80">SKYLIGHTS</text>
      </svg>
    ),

    // ── Marvin ── bold serif wordmark, warm linen
    marvin: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#EEF4F2"/>
        <rect x="6" y="12" width="52" height="30" rx="2" fill="#FAF6EE"/>
        <text x="32" y="33" textAnchor="middle" fontFamily={"Georgia,'Times New Roman',serif"} fontWeight="700" fontSize="15" fill="#3A3020" letterSpacing="1">Marvin</text>
        <text x="32" y="52" textAnchor="middle" fontFamily="monospace" fontSize="5" letterSpacing="0" fill="#4a5a54">WINDOWS &amp; DOORS</text>
      </svg>
    ),

    // ── Milgard ── bold red wordmark, diagonal ray
    milgard: (
      <div style={{width:s,height:s,borderRadius:6,overflow:"hidden",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"6px"}}>
        <svg viewBox="0 0 174 37" style={{width:"100%",height:"100%"}} xmlns="http://www.w3.org/2000/svg">
          <defs><polygon id="mg-p1" points="0 0 4.1998 0 4.1998 3.732 0 3.732"/><polygon id="mg-p3" points="0 0 29.0737 0 29.0737 21.024 0 21.024"/><polygon id="mg-p5" points="0 36.527 174.239 36.527 174.239 0 0 0"/></defs>
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(170.039200, 17.982100)"><mask id="mg-m2" fill="white"><use xlinkHref="#mg-p1"/></mask><path d="M1.597,1.923 L2.294,1.923 C2.559,1.923 2.7,1.791 2.7,1.579 C2.7,1.35 2.559,1.243 2.294,1.243 L1.597,1.243 L1.597,1.923 Z M2.779,2.205 L3.282,2.787 L2.691,2.787 L2.259,2.276 L1.597,2.276 L1.597,2.787 L1.085,2.787 L1.085,0.864 L2.391,0.864 C2.876,0.864 3.238,1.129 3.238,1.57 C3.238,1.879 3.053,2.099 2.779,2.205 Z M3.908,1.87 C3.908,0.838 3.114,0.255 2.1,0.255 C1.076,0.255 0.282,0.838 0.282,1.87 C0.282,2.893 1.076,3.485 2.1,3.485 C3.114,3.485 3.908,2.893 3.908,1.87 Z M4.2,1.87 C4.2,3.026 3.238,3.732 2.091,3.732 C0.944,3.732 0,3.026 0,1.87 C0,0.705 0.944,0 2.091,0 C3.238,0 4.2,0.705 4.2,1.87 Z" fill="#D6001C" mask="url(#mg-m2)"/></g>
            <g transform="translate(0.000000, 0.689800)"><mask id="mg-m4" fill="white"><use xlinkHref="#mg-p3"/></mask><polygon fill="#D6001C" mask="url(#mg-m4)" points="14.4467 18.055 5.9167 7.599 5.9167 21.024 -0.0003 21.024 -0.0003 0 6.6977 0 14.5967 10.092 22.5557 0 29.0737 0 29.0737 21.024 22.9767 21.024 22.9767 7.599"/></g>
            <mask id="mg-m6" fill="white"><use xlinkHref="#mg-p5"/></mask>
            <polygon fill="#D6001C" mask="url(#mg-m6)" points="32.856 21.714 38.983 21.714 38.983 0.69 32.856 0.69"/>
            <path d="M105.361,13.3346 L101.727,5.8856 L98.063,13.3346 L105.361,13.3346 Z M107.493,17.6896 L95.96,17.6896 L93.978,21.7136 L87.551,21.7136 L98.423,0.6906 L105.121,0.6906 L115.993,21.7136 L109.476,21.7136 L107.493,17.6896 Z" fill="#D6001C" mask="url(#mg-m6)"/>
            <path d="M132.4446,10.6314 C134.6366,10.6314 136.2286,10.0304 136.2286,7.9884 C136.2286,5.9454 134.6366,5.3454 132.4446,5.3454 L124.2146,5.3454 L124.2146,10.6314 L132.4446,10.6314 Z M135.9886,21.7134 L130.4326,15.0764 L124.2456,15.0764 L124.2456,21.7134 L118.1486,21.7134 L118.1486,0.6904 L132.8946,0.6904 C138.2716,0.6904 142.4456,3.0634 142.4456,7.8684 C142.4456,11.3824 140.2236,13.6044 136.9196,14.5664 L143.1066,21.7134 L135.9886,21.7134 Z" fill="#D6001C" mask="url(#mg-m6)"/>
            <path d="M164.2136,11.2023 C164.2136,7.4783 161.2706,5.5553 156.7646,5.5553 L151.6296,5.5553 L151.6296,16.8483 L156.7646,16.8483 C161.2706,16.8483 164.2136,14.9263 164.2136,11.2023 M170.4606,11.2023 C170.4606,17.8093 165.3246,21.7133 157.2456,21.7133 L145.5026,21.7133 L145.5026,0.6903 L157.2456,0.6903 C165.3246,0.6903 170.4606,4.5943 170.4606,11.2023" fill="#D6001C" mask="url(#mg-m6)"/>
            <polygon fill="#D6001C" mask="url(#mg-m6)" points="60.3674 16.7884 48.8224 16.7884 48.8224 0.6904 42.6964 0.6904 42.6964 21.7134 60.3674 21.7134"/>
            <path d="M76.4266,9.5504 L74.2056,13.8454 L81.3406,13.8454 L81.3406,15.7374 C79.8696,17.0884 77.8276,17.5994 75.2446,17.5994 C70.1386,17.5994 67.2556,15.3464 67.2556,11.2024 C67.2556,7.0874 70.0486,4.8344 75.1536,4.8344 C77.9776,4.8344 79.8696,5.5554 81.6716,7.1774 L86.1466,3.8734 C83.9546,1.8314 80.1996,-0.0006 75.0036,-0.0006 C66.3836,-0.0006 61.0376,4.0834 61.0376,11.2024 C61.0376,18.3204 66.3836,22.4054 75.0036,22.4054 C80.6206,22.4054 84.7646,20.5424 87.0176,17.7494 L87.0176,9.5504 L76.4266,9.5504 Z" fill="#D6001C" mask="url(#mg-m6)"/>
            <polygon fill="#132048" mask="url(#mg-m6)" points="9.2076 30.5697 7.3176 36.3377 5.8126 36.3377 4.6036 32.3247 3.3886 36.3377 1.8976 36.3377 -0.0004 30.5697 1.5496 30.5697 2.6836 34.5327 3.9216 30.5697 5.3156 30.5697 6.5536 34.5327 7.6876 30.5697"/>
            <polygon fill="#132048" mask="url(#mg-m6)" points="11.342 36.338 12.854 36.338 12.854 30.57 11.342 30.57"/>
            <polygon fill="#132048" mask="url(#mg-m6)" points="21.6711 30.5697 21.6711 36.3377 20.3441 36.3377 16.9931 32.5477 16.9931 36.3377 15.5331 36.3377 15.5331 30.5697 17.1341 30.5697 20.2111 34.0957 20.2111 30.5697"/>
            <path d="M28.9785,33.4533 C28.9785,32.4323 28.2515,31.9043 27.1395,31.9043 L25.8725,31.9043 L25.8725,35.0023 L27.1395,35.0023 C28.2515,35.0023 28.9785,34.4753 28.9785,33.4533 M30.5205,33.4533 C30.5205,35.2663 29.2525,36.3373 27.2585,36.3373 L24.3595,36.3373 L24.3595,30.5693 L27.2585,30.5693 C29.2525,30.5693 30.5205,31.6413 30.5205,33.4533" fill="#132048" mask="url(#mg-m6)"/>
            <path d="M37.8499,33.4533 C37.8499,32.3663 37.1459,31.7483 36.0039,31.7483 C34.8699,31.7483 34.1579,32.3663 34.1579,33.4533 C34.1579,34.5413 34.8619,35.1593 36.0039,35.1593 C37.1459,35.1593 37.8499,34.5413 37.8499,33.4533 M32.6229,33.4533 C32.6229,31.5013 33.9509,30.3803 36.0039,30.3803 C38.0579,30.3803 39.3919,31.5013 39.3919,33.4533 C39.3919,35.4063 38.0579,36.5273 36.0039,36.5273 C33.9509,36.5273 32.6229,35.4063 32.6229,33.4533" fill="#132048" mask="url(#mg-m6)"/>
            <polygon fill="#132048" mask="url(#mg-m6)" points="50.23 30.5697 48.34 36.3377 46.835 36.3377 45.626 32.3247 44.411 36.3377 42.92 36.3377 41.022 30.5697 42.572 30.5697 43.706 34.5327 44.944 30.5697 46.338 30.5697 47.576 34.5327 48.71 30.5697"/>
            <path d="M57.9801,34.5326 C57.9801,35.7196 56.9941,36.5266 55.1111,36.5266 C53.7761,36.5266 52.6571,36.1236 51.8411,35.3986 L52.6351,34.3596 C53.2501,34.9366 54.1031,35.2576 55.1411,35.2576 C56.0301,35.2576 56.4751,35.0766 56.4751,34.6976 C56.4751,34.3266 56.0601,34.2036 54.9921,34.1046 C53.4501,33.9556 52.0491,33.5776 52.0491,32.2916 C52.0491,31.0556 53.2501,30.3806 54.8961,30.3806 C56.0081,30.3806 57.0311,30.6776 57.7431,31.2376 L56.9791,32.2836 C56.4011,31.8306 55.7041,31.6486 54.8961,31.6406 C54.2881,31.6406 53.5541,31.7476 53.5541,32.1596 C53.5541,32.5476 54.1551,32.5966 55.0811,32.6786 C56.7791,32.8356 57.9801,33.2066 57.9801,34.5326" fill="#132048" mask="url(#mg-m6)"/>
            <path d="M65.4568,34.9037 C65.1758,34.4667 64.6568,34.3517 64.2338,34.3517 C63.8188,34.3517 63.2628,34.4667 63.2628,34.9527 C63.2628,35.4387 63.8188,35.5547 64.2338,35.5547 C64.6568,35.5547 65.1758,35.4387 65.4568,34.9947 L65.4568,34.9037 Z M66.8738,33.7747 L66.8738,35.4727 C66.8738,35.8017 66.9248,36.0737 67.0508,36.3377 L65.5678,36.3377 C65.4868,36.1977 65.4278,36.0247 65.4278,35.8677 L65.4278,35.8597 C65.1158,36.2217 64.5448,36.5027 63.8188,36.5027 C62.9518,36.5027 61.8468,36.1227 61.8468,34.9527 C61.8468,33.7827 62.9518,33.4037 63.8188,33.4037 C64.5448,33.4037 65.1158,33.6847 65.4278,34.0557 L65.4278,33.7587 C65.4278,33.0657 64.9678,32.7367 64.0708,32.7367 C63.5818,32.7367 63.0998,32.8107 62.5958,33.0907 L62.2618,32.0607 C62.8178,31.7647 63.6628,31.5917 64.3748,31.5917 C65.9388,31.5917 66.8738,32.3657 66.8738,33.7747 Z" fill="#132048" mask="url(#mg-m6)"/>
            <path d="M67.8487,36.3374 L67.8487,31.7724 L69.3087,31.7724 L69.3087,32.4984 C69.6577,31.9294 70.2657,31.6074 70.9997,31.6074 C72.1927,31.6074 72.8377,32.4564 72.8377,33.6514 L72.8377,36.3374 L71.3777,36.3374 L71.3777,33.7584 C71.3777,33.1644 71.0737,32.8194 70.5177,32.8194 C70.0357,32.8194 69.6197,33.0744 69.3087,33.6344 L69.3087,36.3374 L67.8487,36.3374 Z" fill="#132048" mask="url(#mg-m6)"/>
            <path d="M77.4426,34.6073 L77.4426,33.5033 C77.1236,33.0333 76.6646,32.8523 76.1676,32.8523 C75.3966,32.8523 74.9666,33.2973 74.9666,34.0553 C74.9666,34.8213 75.3966,35.2583 76.1676,35.2583 C76.6646,35.2583 77.1236,35.0763 77.4426,34.6073 M77.4496,32.4403 L77.4496,30.2403 L78.9106,30.2403 L78.9106,36.3373 L77.4496,36.3373 L77.4496,35.6703 C77.0866,36.1803 76.5086,36.5103 75.7606,36.5103 C74.4696,36.5103 73.5806,35.5623 73.5806,34.0553 C73.5806,32.5473 74.4696,31.6073 75.7606,31.6073 C76.5086,31.6073 77.0866,31.9293 77.4496,32.4403" fill="#132048" mask="url(#mg-m6)"/>
            <path d="M88.0711,33.4533 C88.0711,32.4323 87.3441,31.9043 86.2321,31.9043 L84.9651,31.9043 L84.9651,35.0023 L86.2321,35.0023 C87.3441,35.0023 88.0711,34.4753 88.0711,33.4533 M89.6131,33.4533 C89.6131,35.2663 88.3451,36.3373 86.3511,36.3373 L83.4521,36.3373 L83.4521,30.5693 L86.3511,30.5693 C88.3451,30.5693 89.6131,31.6413 89.6131,33.4533" fill="#132048" mask="url(#mg-m6)"/>
            <path d="M96.9424,33.4533 C96.9424,32.3663 96.2384,31.7483 95.0964,31.7483 C93.9614,31.7483 93.2504,32.3663 93.2504,33.4533 C93.2504,34.5413 93.9544,35.1593 95.0964,35.1593 C96.2384,35.1593 96.9424,34.5413 96.9424,33.4533 M91.7154,33.4533 C91.7154,31.5013 93.0424,30.3803 95.0964,30.3803 C97.1494,30.3803 98.4844,31.5013 98.4844,33.4533 C98.4844,35.4063 97.1494,36.5273 95.0964,36.5273 C93.0424,36.5273 91.7154,35.4063 91.7154,33.4533" fill="#132048" mask="url(#mg-m6)"/>
            <path d="M105.8137,33.4533 C105.8137,32.3663 105.1097,31.7483 103.9677,31.7483 C102.8327,31.7483 102.1217,32.3663 102.1217,33.4533 C102.1217,34.5413 102.8257,35.1593 103.9677,35.1593 C105.1097,35.1593 105.8137,34.5413 105.8137,33.4533 M100.5867,33.4533 C100.5867,31.5013 101.9137,30.3803 103.9677,30.3803 C106.0207,30.3803 107.3557,31.5013 107.3557,33.4533 C107.3557,35.4063 106.0207,36.5273 103.9677,36.5273 C101.9137,36.5273 100.5867,35.4063 100.5867,33.4533" fill="#132048" mask="url(#mg-m6)"/>
            <path d="M113.2766,33.2971 C113.8176,33.2971 114.2106,33.1321 114.2106,32.5721 C114.2106,32.0111 113.8176,31.8471 113.2766,31.8471 L111.2456,31.8471 L111.2456,33.2971 L113.2766,33.2971 Z M114.1516,36.3371 L112.7796,34.5161 L111.2526,34.5161 L111.2526,36.3371 L109.7476,36.3371 L109.7476,30.5701 L113.3876,30.5701 C114.7146,30.5701 115.7456,31.2201 115.7456,32.5391 C115.7456,33.5031 115.1966,34.1131 114.3816,34.3761 L115.9086,36.3371 L114.1516,36.3371 Z" fill="#132048" mask="url(#mg-m6)"/>
            <path d="M123.8441,34.5326 C123.8441,35.7196 122.8581,36.5266 120.9751,36.5266 C119.6401,36.5266 118.5211,36.1236 117.7051,35.3986 L118.4981,34.3596 C119.1141,34.9366 119.9671,35.2576 121.0051,35.2576 C121.8941,35.2576 122.3391,35.0766 122.3391,34.6976 C122.3391,34.3266 121.9241,34.2036 120.8561,34.1046 C119.3141,33.9556 117.9131,33.5776 117.9131,32.2916 C117.9131,31.0556 119.1141,30.3806 120.7601,30.3806 C121.8721,30.3806 122.8951,30.6776 123.6071,31.2376 L122.8431,32.2836 C122.2651,31.8306 121.5681,31.6486 120.7601,31.6406 C120.1521,31.6406 119.4181,31.7476 119.4181,32.1596 C119.4181,32.5476 120.0181,32.5966 120.9451,32.6786 C122.6431,32.8356 123.8441,33.2066 123.8441,34.5326" fill="#132048" mask="url(#mg-m6)"/>
          </g>
        </svg>
      </div>
    ),

    // ── Pella ── bold red wordmark on white, clean horizontal rule
    pella: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#FAFAF8"/>
        <rect x="0" y="0" width="64" height="6" rx="0" fill="#C8201A"/>
        <text x="32" y="34" textAnchor="middle" fontFamily={"'Arial Black','Arial',sans-serif"} fontWeight="900" fontSize="18" fill="#C8201A" letterSpacing="1">PELLA</text>
        <rect x="10" y="40" width="44" height="1.5" fill="#C8201A" opacity="0.35"/>
        <text x="32" y="51" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="1" fill="#4a5a54">WINDOWS &amp; DOORS</text>
        <rect x="0" y="58" width="64" height="6" rx="0" fill="#C8201A"/>
      </svg>
    ),

    // ── Weather Shield ── shield icon + stacked wordmark, mountain-blue
    weathershield: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#F8F6FA"/>
        <path d="M32,8 L44,14 L44,28 Q44,38 32,44 Q20,38 20,28 L20,14 Z" fill="#6848A0" opacity="0.15" stroke="#6848A0" strokeWidth="1.2"/>
        <text x="32" y="26" textAnchor="middle" fontFamily={"'Arial Narrow',Arial,sans-serif"} fontWeight="700" fontSize="7.5" fill="#6848A0" letterSpacing="1.5">WEATHER</text>
        <text x="32" y="35" textAnchor="middle" fontFamily={"'Arial Narrow',Arial,sans-serif"} fontWeight="700" fontSize="7.5" fill="#6848A0" letterSpacing="1.5">SHIELD</text>
        <rect x="12" y="39" width="40" height="1" fill="#6848A0" opacity="0.3"/>
        <text x="32" y="50" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="0.5" fill="#4a5a54">WINDOWS &amp; DOORS</text>
      </svg>
    ),

    // ── Alpine Windows ── mountain peak motif + wordmark, teal
    alpine: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#F0F8F6"/>
        <polygon points="32,10 50,34 14,34" fill="#2A8A80" opacity="0.12" stroke="#2A8A80" strokeWidth="1.2"/>
        <polygon points="22,20 36,34 8,34" fill="#2A8A80" opacity="0.08"/>
        <text x="32" y="46" textAnchor="middle" fontFamily={"'Arial Black',Arial,sans-serif"} fontWeight="900" fontSize="11" fill="#2A8A80" letterSpacing="0.5">ALPINE</text>
        <text x="32" y="56" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="1" fill="#4a5a54">WINDOWS</text>
      </svg>
    ),

    // ── JELD-WEN Windows ── bold hyphenated wordmark, navy slate
    jeldwen_win: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#F0F2F8"/>
        <rect x="8" y="28" width="48" height="2" fill="#3A6898" opacity="0.2"/>
        <text x="32" y="27" textAnchor="middle" fontFamily={"'Arial Black',Arial,sans-serif"} fontWeight="900" fontSize="10" fill="#3A6898" letterSpacing="0.5">JELD-WEN</text>
        <text x="32" y="38" textAnchor="middle" fontFamily={"'Arial Narrow',Arial,sans-serif"} fontWeight="400" fontSize="7" fill="#3A6898" letterSpacing="2">WINDOWS</text>
        <text x="32" y="50" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="0.5" fill="#4a5a54">DOORS &amp; MORE</text>
      </svg>
    ),

    // ── Simonton ── clean wordmark with Daylight Max callout, warm gold
    simonton: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#FAF8F0"/>
        <rect x="8" y="36" width="48" height="2.5" fill="#9A7020" opacity="0.3"/>
        <text x="32" y="30" textAnchor="middle" fontFamily={"'Arial Narrow',Arial,sans-serif"} fontWeight="700" fontSize="11" fill="#9A7020" letterSpacing="1">SIMONTON</text>
        <text x="32" y="42" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0.5" fill="#9A7020" opacity="0.6">DAYLIGHT MAX</text>
        <text x="32" y="52" textAnchor="middle" fontFamily="monospace" fontSize="3.5" letterSpacing="1" fill="#4a5a54">WINDOWS</text>
      </svg>
    ),

    // ── Western Window Systems ── clean WW monogram, ember/orange modern
    westernwindow: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#FDF5F0"/>
        <text x="32" y="30" textAnchor="middle" fontFamily={"'Arial Black',Arial,sans-serif"} fontWeight="900" fontSize="18" fill="#C04020" letterSpacing="-1">WW</text>
        <rect x="10" y="34" width="44" height="1.5" fill="#C04020" opacity="0.3"/>
        <text x="32" y="44" textAnchor="middle" fontFamily={"'Arial Narrow',Arial,sans-serif"} fontWeight="700" fontSize="6" fill="#C04020" letterSpacing="1.5">WESTERN WINDOW</text>
        <text x="32" y="53" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="1" fill="#4a5a54">SYSTEMS</text>
      </svg>
    ),

    // ── Nu Vista ── architectural aluminum wordmark, industrial slate-teal
    nuvista: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#F0F5F5"/>
        <rect x="8" y="8" width="48" height="48" rx="2" fill="none" stroke="#2A8A80" strokeWidth="1.5" opacity="0.2"/>
        <rect x="8" y="8" width="12" height="48" fill="#2A8A80" opacity="0.08"/>
        <text x="35" y="30" textAnchor="middle" fontFamily={"'Arial Black',Arial,sans-serif"} fontWeight="900" fontSize="9" fill="#2A8A80" letterSpacing="0.5">NU VISTA</text>
        <rect x="16" y="33" width="40" height="1.5" fill="#2A8A80" opacity="0.3"/>
        <text x="35" y="43" textAnchor="middle" fontFamily={"'Arial Narrow',Arial,sans-serif"} fontWeight="600" fontSize="5.5" fill="#2A8A80" letterSpacing="1">ARCHITECTURAL</text>
        <text x="35" y="52" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="1" fill="#4a5a54">ALUMINUM</text>
      </svg>
    ),

    // ── International Window Co. ── IWC monogram, slate/navy industrial
    iwc: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#F0F2F8"/>
        <rect x="8" y="8" width="48" height="48" rx="4" fill="none" stroke="#3A6898" strokeWidth="1" opacity="0.2"/>
        <text x="32" y="32" textAnchor="middle" fontFamily={"'Arial Black',Arial,sans-serif"} fontWeight="900" fontSize="16" fill="#3A6898" letterSpacing="1">IWC</text>
        <rect x="10" y="36" width="44" height="1.5" fill="#3A6898" opacity="0.25"/>
        <text x="32" y="46" textAnchor="middle" fontFamily={"'Arial Narrow',Arial,sans-serif"} fontWeight="400" fontSize="5.5" fill="#3A6898" letterSpacing="1">INTERNATIONAL</text>
        <text x="32" y="54" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="0.5" fill="#4a5a54">WINDOW CO.</text>
      </svg>
    ),

    // ── Therma-Tru ── clean wordmark with hyphen accent
    thermatru: (
      <svg width={s} height={s} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <text x="26" y="25" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="9.5" fill="#1A2028" letterSpacing="0.3">THERMA</text>
        <rect x="18" y="28" width="16" height="2" rx="1" fill="#C87A4A"/>
        <text x="26" y="38" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="9.5" fill="#C87A4A" letterSpacing="0.3">TRU</text>
        <text x="26" y="47" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0.8" fill="#4a5a54">ENTRY DOORS</text>
      </svg>
    ),

    thermatru_util: (
      <svg width={s} height={s} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <text x="26" y="25" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="9.5" fill="#1A2028" letterSpacing="0.3">THERMA</text>
        <rect x="18" y="28" width="16" height="2" rx="1" fill="#C87A4A"/>
        <text x="26" y="38" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="9.5" fill="#C87A4A" letterSpacing="0.3">TRU</text>
        <text x="26" y="47" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0.8" fill="#4a5a54">UTILITY DOORS</text>
      </svg>
    ),

    // ── TM Cobb ── California craftsman, plum accent
    tmcobb: (
      <svg width={s} height={s} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <rect x="8" y="12" width="36" height="20" rx="2" fill="#F5F0FA"/>
        <text x="26" y="21" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="400" fontSize="8" fill="#6848A0" letterSpacing="1">T M</text>
        <text x="26" y="30" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="9" fill="#1A2028" letterSpacing="1">COBB</text>
        <rect x="10" y="35" width="32" height="1" fill="#6848A0" opacity="0.4"/>
        <text x="26" y="45" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0.8" fill="#4a5a54">CUSTOM DOORS</text>
      </svg>
    ),

    tmcobb_int: (
      <svg width={s} height={s} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <rect x="8" y="12" width="36" height="20" rx="2" fill="#F5F0FA"/>
        <text x="26" y="21" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="400" fontSize="8" fill="#6848A0" letterSpacing="1">T M</text>
        <text x="26" y="30" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="9" fill="#1A2028" letterSpacing="1">COBB</text>
        <rect x="10" y="35" width="32" height="1" fill="#6848A0" opacity="0.4"/>
        <text x="26" y="45" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0.8" fill="#4a5a54">INTERIOR DOORS</text>
      </svg>
    ),

    tmcobb_util: (
      <svg width={s} height={s} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <rect x="8" y="12" width="36" height="20" rx="2" fill="#F5F0FA"/>
        <text x="26" y="21" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="400" fontSize="8" fill="#6848A0" letterSpacing="1">T M</text>
        <text x="26" y="30" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="9" fill="#1A2028" letterSpacing="1">COBB</text>
        <rect x="10" y="35" width="32" height="1" fill="#6848A0" opacity="0.4"/>
        <text x="26" y="45" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0.8" fill="#4a5a54">UTILITY DOORS</text>
      </svg>
    ),

    // ── Simpson Door ── serif wordmark, warm craftsman rust
    simpson: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#FBF5EE"/>
        <path d="M10,18 Q32,10 54,18" fill="none" stroke="#B05828" strokeWidth="1" opacity="0.3"/>
        <text x="32" y="32" textAnchor="middle" fontFamily={"Georgia,'Times New Roman',serif"} fontWeight="700" fontSize="13" fill="#B05828" letterSpacing="0.5">SIMPSON</text>
        <rect x="10" y="36" width="44" height="1.5" fill="#B05828" opacity="0.35"/>
        <text x="32" y="47" textAnchor="middle" fontFamily={"Georgia,'Times New Roman',serif"} fontWeight="400" fontSize="6" fill="#5a3a1a" letterSpacing="1.5">DOOR COMPANY</text>
        <text x="32" y="56" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="0.5" fill="#8A7060">EST. 1912</text>
      </svg>
    ),

    // ── Rogue Valley ── RV monogram + mountain arc, deep gold
    roguevalley: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
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
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
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
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#F0F8F0"/>
        <rect x="8" y="12" width="22" height="28" rx="2" fill="none" stroke="#4A7848" strokeWidth="1.5" opacity="0.35"/>
        <rect x="34" y="12" width="22" height="28" rx="2" fill="none" stroke="#4A7848" strokeWidth="1.5" opacity="0.35"/>
        <line x1="19" y1="12" x2="19" y2="40" stroke="#4A7848" strokeWidth="1" opacity="0.2"/>
        <line x1="45" y1="12" x2="45" y2="40" stroke="#4A7848" strokeWidth="1" opacity="0.2"/>
        <text x="32" y="50" textAnchor="middle" fontFamily={"'Arial Black',Arial,sans-serif"} fontWeight="900" fontSize="9" fill="#4A7848" letterSpacing="1">WinDor</text>
        <text x="32" y="59" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="0.5" fill="#4a5a54">SYSTEMS</text>
      </svg>
    ),

    // ── Fleetwood ── ultra-slim horizontal bars + wordmark, ember/terracotta
    fleetwood: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#FBF3EE"/>
        <rect x="8" y="14" width="48" height="1.2" fill="#C04020" opacity="0.5"/>
        <rect x="8" y="18" width="48" height="1.2" fill="#C04020" opacity="0.35"/>
        <rect x="8" y="22" width="48" height="1.2" fill="#C04020" opacity="0.2"/>
        <text x="32" y="37" textAnchor="middle" fontFamily={"'Arial Black',Arial,sans-serif"} fontWeight="900" fontSize="10" fill="#C04020" letterSpacing="0.5">FLEETWOOD</text>
        <rect x="8" y="41" width="48" height="1.5" fill="#C04020" opacity="0.3"/>
        <text x="32" y="51" textAnchor="middle" fontFamily={"'Arial Narrow',Arial,sans-serif"} fontWeight="600" fontSize="5.5" fill="#C04020" letterSpacing="2">WINDOWS</text>
        <text x="32" y="59" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="1" fill="#4a5a54">DOORS</text>
      </svg>
    ),

    // ── Steel Traditions ── industrial grid motif + wordmark, deep slate
    steeltraditions: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#F0F2F6"/>
        <rect x="8" y="10" width="20" height="26" rx="1" fill="none" stroke="#3A6898" strokeWidth="2" opacity="0.4"/>
        <rect x="32" y="10" width="24" height="12" rx="1" fill="none" stroke="#3A6898" strokeWidth="2" opacity="0.4"/>
        <rect x="32" y="24" width="24" height="12" rx="1" fill="none" stroke="#3A6898" strokeWidth="2" opacity="0.4"/>
        <text x="32" y="48" textAnchor="middle" fontFamily={"'Arial Black',Arial,sans-serif"} fontWeight="900" fontSize="7.5" fill="#3A6898" letterSpacing="0.5">STEEL</text>
        <text x="32" y="57" textAnchor="middle" fontFamily={"'Arial Narrow',Arial,sans-serif"} fontWeight="600" fontSize="6" fill="#3A6898" letterSpacing="1.5">TRADITIONS</text>
      </svg>
    ),

    // ── French Steel ── arched window motif + serif wordmark, deep rust
    frenchsteel: (
      <svg width={s} height={s} viewBox="0 0 64 64" style={{borderRadius:6,overflow:"hidden"}}>
        <rect width="64" height="64" rx="6" fill="#FBF3EE"/>
        <rect x="18" y="20" width="28" height="22" rx="1" fill="none" stroke="#B05828" strokeWidth="2" opacity="0.35"/>
        <path d="M18,20 Q32,8 46,20" fill="none" stroke="#B05828" strokeWidth="2" opacity="0.5"/>
        <line x1="32" y1="20" x2="32" y2="42" stroke="#B05828" strokeWidth="1" opacity="0.3"/>
        <line x1="18" y1="31" x2="46" y2="31" stroke="#B05828" strokeWidth="1" opacity="0.3"/>
        <text x="32" y="52" textAnchor="middle" fontFamily={"Georgia,'Times New Roman',serif"} fontWeight="700" fontSize="8" fill="#B05828" letterSpacing="1">FRENCH</text>
        <text x="32" y="61" textAnchor="middle" fontFamily={"Georgia,'Times New Roman',serif"} fontWeight="700" fontSize="8" fill="#B05828" letterSpacing="1">STEEL</text>
      </svg>
    ),

    // ── Masonite ── bold M mark + clean wordmark
    masonite: (
      <svg width={s} height={s} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        {/* Stylized M */}
        <path d="M14,30 L14,16 L20,24 L26,16 L32,24 L38,16 L38,30" fill="none" stroke="#4A7848" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
        <text x="26" y="43" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="8" fill="#1A2028" letterSpacing="1.5">MASONITE</text>
      </svg>
    ),

    // ── JELD-WEN ── distinctive hyphenated wordmark
    jeldwen_int: (
      <svg width={s} height={s} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <rect x="6" y="16" width="40" height="20" rx="2" fill="#EEF2FA"/>
        <text x="26" y="30" textAnchor="middle" fontFamily={"'Arial Black',Arial,sans-serif"} fontWeight="900" fontSize="10" fill="#3A6898" letterSpacing="0.5">JELD-WEN</text>
        <text x="26" y="45" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0.8" fill="#4a5a54">INTERIOR DOORS</text>
      </svg>
    ),

    // ── VELUX ── iconic red/white V mark + wordmark
    velux: (
      <svg width={s} height={s} viewBox="0 0 52 52">
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
      <svg width={s} height={s} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <text x="26" y="28" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic" fontWeight="700" fontSize="20" fill="#9A7020" opacity="0.9">CW</text>
        <rect x="10" y="32" width="32" height="1" fill="#9A7020" opacity="0.3"/>
        <text x="26" y="42" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="0.5" fill="#4a5a54">CONTRACTOR'S</text>
        <text x="26" y="48" textAnchor="middle" fontFamily="monospace" fontSize="4" letterSpacing="0.5" fill="#4a5a54">WARDROBE</text>
      </svg>
    ),

    // ── EL&amp;EL Wood Products — wood-grain feel
    elel_closet: (
      <svg width={s} height={s} viewBox="0 0 52 52">
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
      <svg width={s} height={s} viewBox="0 0 52 52">
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
      <svg width={s} height={s} viewBox="0 0 52 52">
        <rect width="52" height="52" rx="6" fill="#EEF4F2"/>
        <rect x="7" y="15" width="38" height="22" rx="3" fill="#FAF0EA"/>
        <text x="26" y="25" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="8" fill="#C87A4A" letterSpacing="2">ORE</text>
        <text x="26" y="34" textAnchor="middle" fontFamily={"'Arial',sans-serif"} fontWeight="700" fontSize="8" fill="#1A2028" letterSpacing="2">PAC</text>
        <text x="26" y="47" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0.8" fill="#4a5a54">BUILDING PRODUCTS</text>
      </svg>
    ),

    // ── ABS American Building Supply ── industrial distributor
    abs: (
      <svg width={s} height={s} viewBox="0 0 52 52">
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
      <div style={{width:s,height:s,borderRadius:"8px",background:"#FFFFFF",border:"1px solid #1c2220",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:700,color:"#9A7020",fontFamily:"monospace"}}>
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
        <div style={{position:"absolute",inset:0,background:`linear-gradient(to bottom, transparent 60%, ${T.card}99 100%)`}}/>
      </div>}
      <div style={{padding:"18px 22px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px",flexWrap:"wrap",gap:"8px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <VendorLogo id={vendor.id} size={56}/>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"7px"}}>
                <div style={{fontSize:"17px",fontWeight:500,color:T.text}}>{vendor.name}</div>
                {vendor.website&&<a href={vendor.website} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:"9px",fontFamily:"monospace",color:T.teal,textDecoration:"none",opacity:0.7,letterSpacing:"1px",border:`1px solid ${T.teal}44`,borderRadius:"3px",padding:"1px 5px",lineHeight:"14px"}}>{"↗ SITE"}</a>}
              </div>
              <div style={{fontSize:"11px",fontStyle:"italic",color:"#555555"}}>{vendor.tagline}</div>
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
            <SectionLabel color={c}>SAN DIEGO MARKET NOTES</SectionLabel>
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
          <p style={{fontSize:"13px",color:T.muted,lineHeight:1.75,marginTop:0,marginBottom:"16px"}}>{door.blurb}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:"12px"}}>
            <div>
              <SectionLabel color={c}>PROS</SectionLabel>
              {door.pros.map(p=><div key={p} style={{fontSize:"12px",color:"#606060",marginBottom:"4px"}}>{"\u2713"} {p}</div>)}
            </div>
            <div>
              <SectionLabel color="#C05040">CONS</SectionLabel>
              {door.cons.map(p=><div key={p} style={{fontSize:"12px",color:"#8A3A30",marginBottom:"4px"}}>{"\u00B7"} {p}</div>)}
            </div>
          </div>
          {door.bestFor&&<div style={{marginTop:"14px"}}>
            <SectionLabel>BEST FOR</SectionLabel>
            {door.bestFor.map(b=><div key={b} style={{fontSize:"12px",color:"#606060",marginBottom:"3px"}}>{"\u2192"} {b}</div>)}
          </div>}
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
    tagline:"California's mandatory energy code. Required on all permitted window & door replacements.",
    overview:"Title 24, Part 6 is California's Building Energy Efficiency Standards — the mandatory energy code that governs all new construction and permitted replacement windows and doors in the state. Any window or door replacement that pulls a permit must meet the current standards at time of inspection. The 2025 Title 24 Standards took effect January 1, 2026 and represent the most significant tightening of window performance requirements in over a decade.",
    iterations:[
      {name:"U-Factor (Whole Window)",detail:"U-factor measures the rate of heat transfer through the entire window assembly — glass, frame, spacer, and installation. Lower U-factor = better insulation. The 2026 standard requires U-0.30 or better for most replacement windows in San Diego County. A U-0.30 window loses heat roughly 6% slower than the previous U-0.32 standard — meaningful over an entire house.",icon:""},
      {name:"SHGC — Solar Heat Gain Coefficient",detail:"SHGC measures how much solar heat passes through the glass, from 0 (no solar gain) to 1 (all solar heat passes through). Lower SHGC = cooler interiors. San Diego's climate zones require SHGC 0.23 or less for west and south-facing windows on most permitted projects. This is the primary driver of summer cooling loads in San Diego.",icon:""},
      {name:"Climate Zone 7 — Coastal San Diego",detail:"La Jolla, Del Mar, Encinitas, Coronado, Chula Vista, National City. Mild coastal climate. U-0.30, SHGC 0.23 typically required. Prescriptive path is straightforward — most premium windows qualify. Performance path allows trade-offs between U-factor and SHGC.",icon:""},
      {name:"Climate Zone 10 — Inland San Diego",detail:"El Cajon, Santee, Escondido, Poway, Rancho Bernardo, Lakeside, Ramona. Hotter summers, larger temperature swings. SHGC requirements are stricter and U-factor requirements may also differ. Inland projects need more careful product selection — not all coastal-spec windows meet inland zone requirements.",icon:""},
      {name:"VT — Visible Transmittance",detail:"While not a compliance requirement, VT measures how much visible light passes through the glass (0–1). High VT = bright interiors. Low-E coatings that aggressively block SHGC can also reduce VT, making interiors darker. The best products (LoE-366, Solarban 60) maximize VT while minimizing SHGC — your specialist will show you samples.",icon:""},
      {name:"Prescriptive vs. Performance Path",detail:"Title 24 compliance can be demonstrated two ways. Prescriptive: every window meets the U-factor and SHGC requirements individually. Performance (CEC-approved software): the whole building is modeled — you can exceed requirements in one area to compensate in another. Performance path is more flexible but requires an energy consultant. Most residential replacements use the prescriptive path.",icon:""},
      {name:"NFRC Label",detail:"The National Fenestration Rating Council label on every window certifies the rated U-factor, SHGC, VT, and other performance values. This is what the inspector checks. Every window ordered for a permitted project must have a current NFRC label with values meeting the applicable climate zone requirements. Ask your supplier for NFRC documentation before ordering.",icon:""},
    ],
    whenRequired:[
      {location:"Any permitted window replacement",detail:"If you pull a permit to replace windows, Title 24 compliance is required at inspection — no exceptions."},
      {location:"Permitted additions and ADUs",detail:"All windows and doors in new permitted additions must meet current Title 24 standards."},
      {location:"New construction",detail:"All windows in new homes must meet Title 24 — this is confirmed by the building department at plan check."},
      {location:"Door replacements with glazing",detail:"Exterior doors with glass (sidelites, transoms, glass-panel doors) are subject to Title 24 on permitted projects."},
    ],
    temperedVsLaminated:null,
    sdNote:"San Diego spans two primary climate zones — Zone 7 (coastal) and Zone 10 (inland). Your project address determines which requirements apply. The good news: virtually all premium window brands (Andersen, Marvin, Milgard, NanaWall, LaCantina) offer product lines that comply with the 2026 standards. The key is confirming the NFRC-rated values match your climate zone before ordering. Your specialist will handle this — but it's useful to understand what you're signing off on.",
    priceImpact:"Title 24 compliant windows are not significantly more expensive than non-compliant alternatives — all major brands have compliant products at every price point. The cost of non-compliance is much higher: failed inspection, required replacement, and potential permit hold on the entire project. Never order windows for a permitted job without confirming Title 24 compliance documentation.",
  },
  {
    id:"tempered", name:"Tempered Safety Glass", icon:"⚠", color:"#C04020",
    tagline:"Code-required in hazardous locations. Breaks safely into small granules.",
    overview:"Tempered glass is heat-treated to be approximately 4× stronger than standard annealed glass. More importantly, when it does break, it shatters into small, rounded pebbles instead of large sharp shards — dramatically reducing injury risk. Building codes require tempered glass in specific locations throughout a home. It is not optional in those locations — it's law.",
    whenRequired:[
      {location:"Within 24\" of a door",detail:"Any glazing within 24 inches of a door's edge, measured horizontally, must be tempered."},
      {location:"Glazing within 18\" of the floor",detail:"Any glass that starts within 18 inches of the finished floor and is larger than 9 sq ft must be tempered."},
      {location:"Shower and bathtub enclosures",detail:"All glass in or adjacent to wet areas — shower doors, tub surrounds, and adjacent windows — must be tempered or laminated."},
      {location:"Swimming pools and hot tubs",detail:"All glazing within 5 feet of a pool or spa edge must be tempered."},
      {location:"Stairways and landings",detail:"Glass adjacent to stairs, ramps, and landings where the bottom edge is within 36\" of the walking surface."},
      {location:"Skylights",detail:"All skylights must use tempered or laminated glass — typically laminated is preferred as it holds in place if broken."},
      {location:"Fire zones (WUI)",detail:"Fire-rated tempered or laminated glass required for windows and doors in designated fire hazard zones."},
    ],
    temperedVsLaminated:"Tempered and laminated are both safety glazing — but they behave differently when broken. Tempered shatters into small pieces and falls. Laminated (two panes bonded by a plastic interlayer) cracks but holds together — the glass stays in the frame. Laminated is preferred for skylights and locations where falling glass is a concern.",
    sdNote:"In San Diego, the most common tempered triggers are: door sidelites and transoms, windows adjacent to exterior doors, poolside windows, and all windows in fire zone properties. Your specialist will flag every required location during the quote.",
    priceImpact:"Tempered glass adds approximately 10–25% to glass cost depending on size. Larger panels cost proportionally less extra. Always factor it in for poolside, shower-adjacent, and fire zone windows.",
  },
  {
    id:"lowe", name:"Low-E Glass (Low Emissivity)", icon:"☉", color:"#2A8A80",
    tagline:"The industry standard for energy efficiency. Required by California energy code.",
    overview:"Low-E (Low Emissivity) glass has a microscopically thin metallic coating — invisible to the naked eye — applied to one surface of the glass. This coating reflects infrared heat (both solar heat coming in and interior heat going out) while allowing visible light to pass through. The result: dramatically better energy performance without significantly affecting view or light transmission. Low-E glass is required by California's Title 24 energy code on virtually all new windows and replacement windows.",
    iterations:[
      {name:"Cardinal LoE-272®",detail:"One of the most widely used high-performance soft-coat Low-E coatings. Blocks 72% of solar heat gain while transmitting 72% of visible light — an excellent balance of efficiency and clarity. Standard on Andersen, Milgard, and many premium brands. A reliable all-around performer for most San Diego orientations.",icon:"2"},
      {name:"Cardinal LoE-366®",detail:"Premium high-performance coating. Blocks 95% of UV and 66% of solar heat while maintaining good visible light transmission. Best choice for west and south-facing windows in sunny San Diego where solar heat gain is a priority. Standard on Marvin Signature and Andersen E-Series premium configurations. The most specified coating for San Diego coastal projects.",icon:"3"},
      {name:"Solarban / Sunbelt Low-E",detail:"Specialty Low-E coatings engineered specifically for hot, sunny climates like San Diego. Maximizes solar heat rejection while maintaining clear views. Common in NanaWall and LaCantina large glass wall systems where solar gain through a massive glass opening would otherwise be severe.",icon:""},
      {name:"i89 Interior Surface Coating",detail:"i89 is a soft-coat Low-E coating applied to the interior-facing surface of the inner glass pane (surface 4 in a standard IGU) — rather than the traditional surface 2 or 3 positions. It adds a secondary emissivity layer that reflects interior radiant heat back into the room during cold conditions. Unlike standard Low-E coatings which primarily block solar gain, i89 is primarily an insulating coating — it improves U-factor (thermal resistance) without significantly impacting SHGC or visible light. In San Diego's mild climate, the benefit is modest but measurable in nighttime and winter conditions. i89 is most commonly specified on Andersen and Marvin products as an upgrade coating in triple-pane configurations, or in coastal San Diego projects where nighttime marine layer temperatures warrant improved insulating performance.",icon:"89"},
    ],
    sdNote:"In San Diego's climate — high sun, mild temperatures — the priority is blocking solar heat gain (keeping the house cool) more than retaining interior heat. LoE-366 or Solarban coatings on south and west-facing windows make a meaningful difference in cooling bills. Your specialist will recommend the right coating based on window orientation.",
    priceImpact:"Standard Low-E is included in virtually all premium window pricing. Upgraded coatings like LoE-366 add a modest premium — usually $5–$15 per square foot of glass.",
  },
  {
    id:"argon", name:"Argon & Krypton Gas Fill", icon:"⬡", color:"#3A6898",
    tagline:"Dense gas trapped between panes slows heat transfer. Standard on premium IGUs.",
    overview:"Insulated glass units (IGUs) consist of two or more panes of glass sealed together with a gap between them. That gap is filled with either air, argon gas, or krypton gas. Argon and krypton are inert, odorless, colorless, and completely safe — they're just denser than air, which slows heat conduction across the gap. The result is a measurably better-insulating window. Argon fill is standard on virtually all premium windows today. Krypton is used in thinner IGUs where argon won't fit.",
    iterations:[
      {name:"Air-filled IGU",detail:"Standard air between panes. Functional but least efficient. Rarely specified on premium windows — mostly entry-level products.",icon:"○"},
      {name:"Argon-filled IGU",detail:"Argon gas is approximately 34% less thermally conductive than air. Significantly improves insulating performance. Standard on all Milgard, Andersen, Marvin, and LaCantina window packages. No maintenance required — argon naturally stays in the unit for the life of the window.",icon:"Ar"},
      {name:"Krypton-filled IGU",detail:"Krypton is even denser than argon — better insulating performance in thinner gaps. Used in triple-pane windows and slim-profile units where the gap is too narrow for argon to be effective. More expensive than argon.",icon:"Kr"},
      {name:"Triple-Pane IGU",detail:"Three panes of glass with two gaps — each typically argon-filled. Dramatically better insulation (R-values of 5–8 vs. R-2–3 for standard double pane). Most relevant in cold climates. In San Diego's mild climate, the ROI is lower — standard double-pane argon-fill is usually the right call.",icon:"|||"},
    ],
    sdNote:"Argon-filled double-pane is the right specification for almost every San Diego project. Triple-pane is rarely cost-justified in San Diego's mild climate — the energy savings don't recoup the cost premium in our weather zone. Focus the budget on Low-E coating quality and frame thermal performance instead.",
    priceImpact:"Argon fill adds approximately $3–$8 per square foot of glass compared to air-fill. Virtually all premium window brands include argon as standard — it's not usually a separate line item on quotes.",
  },
  {
    id:"glazing_layers", name:"Single, Dual & Triple Pane Glass", icon:"◫", color:"#A8B8C8",
    tagline:"How many panes of glass you have is the foundation of every window's thermal performance.",
    overview:"Before coatings, gas fills, and spacers — the single most fundamental decision in window performance is how many panes of glass the unit contains. Single pane, double pane (dual), and triple pane each represent a generational leap in insulating ability, sound control, and condensation resistance. Understanding the differences helps you evaluate quotes accurately and make the right choice for San Diego's unique climate.",
    iterations:[
      {name:"Single Pane",detail:"One layer of glass with no insulating air or gas gap. The original window construction — still found in millions of pre-1980s homes across San Diego. R-value of approximately R-1. No meaningful insulating ability. Extremely poor energy performance by modern standards. High surface condensation in cool weather. Virtually no sound attenuation. In San Diego's mild climate, single-pane windows feel cold to the touch on winter nights and allow significant heat gain during summer. There is no circumstance today where a new single-pane window is specified on a residential project — it does not meet California Title 24 requirements for any permitted replacement. If your home still has single-pane windows, the energy, comfort, and sound improvement from upgrading to double-pane Low-E is dramatic and immediately noticeable.",icon:"1"},
      {name:"Double Pane (Dual Glaze IGU)",detail:"Two panes of glass sealed together with a gap — typically 1/2\" to 3/4\" — filled with air or argon gas. An Insulated Glass Unit (IGU). R-value of approximately R-2 to R-3.5 depending on gas fill, spacer, and Low-E coating. The industry standard for all residential windows since the 1990s, and the minimum required by California's Title 24 energy code. Double-pane argon-fill with a quality Low-E coating (LoE-366 or equivalent) meets or exceeds current Title 24 requirements for all San Diego climate zones. This is the correct specification for the vast majority of San Diego projects — new construction, remodels, and replacements. The combination of double-pane + argon + LoE-366 delivers an excellent U-factor (0.28–0.32 range) and low SHGC at a price point that makes sense in San Diego's mild climate.",icon:"2"},
      {name:"Triple Pane (Triple Glaze IGU)",detail:"Three panes of glass with two sealed gaps — each typically argon or krypton filled. R-value of approximately R-4.5 to R-8 depending on configuration. The highest-performing standard residential glazing available. Dramatically better insulating performance and sound attenuation than double pane. However, triple-pane comes with meaningful trade-offs: significantly heavier (affects sash weight, hardware requirements, and structural loads), more expensive (typically 30–60% premium over equivalent double-pane), reduced visible transmittance due to additional glass surfaces, and diminishing returns in mild climates. In San Diego's Climate Zone 7 and 10, the ROI on triple-pane is poor — the energy savings from R-6 vs. R-3 do not recoup the cost premium in a climate where the heating season is short and mild. Triple-pane makes strong sense in mountain properties (Julian, Pine Valley, Mt. Laguna), homes with severe noise problems (near freeways, airports, or rail), and ultra-premium projects where performance specification matters regardless of ROI. For coastal San Diego, high-quality double-pane is almost always the better investment.",icon:"3"},
    ],
    whenRequired:[
      {location:"Title 24 — All permitted replacements",detail:"Single-pane glass does not meet California Title 24 energy code requirements. Any permitted window replacement must use double-pane (at minimum) with qualifying U-factor and SHGC values."},
      {location:"High-elevation properties",detail:"Julian, Pine Valley, and Mt. Laguna properties benefit meaningfully from triple-pane — the heating season is real and extended. Budget for breather tubes on all IGU units at elevation above 4,000 ft."},
      {location:"Airport/freeway noise mitigation",detail:"Triple-pane with laminated inner pane provides the best sound attenuation available in a standard window assembly. Properties near Miramar, Lindbergh, or major freeways should evaluate triple-pane laminated configurations."},
      {location:"Ultra-premium new construction",detail:"Architects specifying Passive House or ultra-high-performance buildings will require triple-pane throughout. NanaWall and Marvin both offer triple-pane configurations in their premium lines."},
    ],
    temperedVsLaminated:null,
    sdNote:"For 95% of San Diego projects — coastal and inland — double-pane argon-fill with LoE-366 or equivalent is the right answer. It meets Title 24, delivers excellent comfort, and hits a price point that makes sense. Reserve triple-pane for Julian and mountain-area homes, severe noise situations, or when a client specifically requests maximum performance regardless of cost. Your specialist will confirm the right specification for your climate zone and project goals.",
    priceImpact:"Single-pane: do not specify on new work. Double-pane argon-fill Low-E: the baseline — included in all premium window pricing. Triple-pane: typically adds 30–60% to glass unit cost. On a whole-house replacement, triple-pane could add $8,000–$25,000+ depending on scope. In San Diego's climate, that premium is rarely recovered in energy savings — confirm the value case with your specialist before committing.",
  },
  {
    tagline:"Privacy without losing light. Dozens of patterns for every aesthetic.",
    overview:"Obscure glass is any glass that transmits light but distorts the view through it — providing visual privacy. It's used in bathrooms, sidelites, shower enclosures, stairway windows, and anywhere privacy is needed without blocking light. Obscure glass comes in a wide range of patterns — from subtle textures that barely distort to heavily frosted glass that is completely opaque. All obscure glass transmits natural light.",
    iterations:[
      {name:"Frosted / Acid-Etched",detail:"Smooth surface, uniform diffusion. The most popular obscure glass — a consistent milky appearance. Commonly used in shower enclosures, bathroom windows, and sidelites. Available in various degrees of opacity. Can be applied to one surface (one-way effect) or both sides.",icon:"▨"},
      {name:"Reeded / Ribbed",detail:"Vertical or horizontal parallel lines cast into the glass. Classic period look — popular in transitional and craftsman interiors. Slightly less diffusing than frosted — can see movement through it but no detail.",icon:"|||"},
      {name:"Flemish / Antique",detail:"Subtle irregular texture — looks like old glass, slightly wavy. Warm period character. Popular in traditional entries and sidelites. Less diffusing than frosted — figures are discernible but not detailed.",icon:"〰"},
      {name:"Rain Glass",detail:"Surface texture mimics rain running down glass — vertical streaks. Very popular currently in contemporary and transitional interiors. Good privacy with interesting visual texture. Common in shower enclosures and bathroom windows.",icon:""},
      {name:"Glue Chip",detail:"Distinctive fern-leaf or snowflake pattern created by applying hide glue that pulls chips off the glass surface as it dries. Traditional and craftsman character. Each panel is unique — no two exactly alike.",icon:""},
      {name:"Seeded Glass",detail:"Contains small air bubbles trapped in the glass — mimics antique glass. Warm, artisanal character. More light diffusion than Flemish. Popular in Mediterranean and Spanish Colonial interiors.",icon:"◦"},
    ],
    sdNote:"The most common obscure glass requests in San Diego: Rain glass for contemporary bathroom windows and showers, Frosted for sidelites where street-facing privacy matters, and Seeded or Flemish for Mediterranean and Spanish Colonial entries in Coronado, Mission Hills, and La Jolla.",
    priceImpact:"Obscure glass typically adds 15–40% to glass cost depending on pattern complexity. Custom art glass patterns (leaded, beveled, cast) can add significantly more. Standard patterns like frosted and rain are widely available and modestly priced.",
  },
  {
    id:"art_glass", name:"Art Glass & Decorative Glass", icon:"⚜", color:"#6848A0",
    tagline:"Leaded, beveled, stained, and cast glass. The entry door statement piece.",
    overview:"Art glass encompasses a broad category of decorative glass used in entry doors, sidelites, transoms, and interior windows. Unlike functional glass types, art glass is primarily a design and aesthetic choice. It ranges from simple beveled clear glass inserts to elaborate custom leaded and stained glass designs. Art glass is most commonly seen in entry door systems — it adds character, light patterns, and uniqueness to a front entry.",
    iterations:[
      {name:"Beveled Glass",detail:"Glass panels with polished angled edges that prismatically scatter light into rainbow patterns. Classic and timeless — common in traditional entry doors. Available as single bevels, beveled clusters, and full beveled panels. No color — all clear glass.",icon:"◇"},
      {name:"Leaded Glass",detail:"Individual pieces of glass held together by lead came (H-shaped lead strips). Traditional and craftsman character. Can combine clear, textured, and colored glass panes. Used in entry doors, sidelites, and period-appropriate windows.",icon:"⊞"},
      {name:"Stained Glass",detail:"Colored glass panels — either traditional copper-foil or lead came construction. Custom artistic designs. Primarily found in historic renovations, churches, and clients wanting a true art piece at the entry. Every panel is handcrafted.",icon:""},
      {name:"Cast Glass",detail:"Glass poured into a mold — creates three-dimensional texture and depth. Dramatically different from flat sheet glass. Organic, sculptural character. Custom to any design. Used in luxury entry door inserts and feature windows.",icon:""},
      {name:"Etched / Sandblasted Custom",detail:"Custom designs sandblasted or acid-etched directly onto clear glass. Any design — from simple geometric borders to complex scenic artwork. Each piece is custom and one-of-a-kind. Common in luxury entries and interior glass partitions.",icon:""},
      {name:"Dichroic Glass",detail:"Glass with a metallic coating that changes color depending on viewing angle and light source. Contemporary and dramatic — shifts between gold, blue, green, and purple. Specialty product for architectural feature installations.",icon:""},
    ],
    sdNote:"TM Cobb and Therma-Tru Classic-Craft offer the widest art glass door insert selections available through San Diego dealers. Custom leaded glass and beveled panels are the most popular for La Jolla and Del Mar traditional entries. Contemporary etched glass is common in RSF and Rancho Santa Fe modern custom builds.",
    priceImpact:"Entry-level decorative glass (beveled clusters, standard patterns) adds $200–$800 to a door. Custom leaded or etched panels: $1,000–$5,000+. Full custom stained glass: custom quote. Cast glass: $3,000–$10,000+ depending on size and complexity.",
  },
  {
    id:"tinted", name:"Tinted Glass", icon:"◑", color:"#9A7020",
    tagline:"Color tint baked into the glass. Reduces solar heat and glare. Subtle to dramatic.",
    overview:"Tinted glass has color added directly into the glass batch during manufacturing — the tint runs through the full thickness of the glass (unlike a surface film or coating). The tint reduces visible light transmission, blocks some solar heat gain, and adds a color character to the glass. Common tints are grey, bronze, green, and blue. Tinted glass is often combined with Low-E coatings for maximum performance.",
    iterations:[
      {name:"Grey Tint",detail:"The most neutral tint. Reduces brightness and glare without significantly changing color rendering. Perceived as dark glass from outside. Common in contemporary commercial and residential applications.",icon:"◑"},
      {name:"Bronze Tint",detail:"Warm amber-brown tone. Absorbs solar heat and adds a traditional, warm character. Flatters traditional and craftsman architecture. Common in 1980s–2000s construction — still popular for matching existing glass.",icon:""},
      {name:"Green Tint",detail:"Slightly green cast — appears most neutral to the eye in terms of color rendering. Good solar heat rejection. Common in automotive glass and residential windows in hot climates.",icon:""},
      {name:"Blue Tint",detail:"Cool blue cast. Contemporary character — often associated with modern curtain wall architecture. Good visible light transmission with solar heat reduction. Popular in contemporary commercial applications.",icon:""},
      {name:"Solar Control Tint (High Performance)",detail:"Advanced tinted glass formulations that maximize solar heat rejection while maintaining better visible light transmission than standard tints. Often combined with soft-coat Low-E for maximum performance in sunny climates.",icon:""},
    ],
    sdNote:"Grey and bronze tints are the most commonly requested in San Diego residential. Grey for contemporary homes wanting a moody, dramatic glass quality. Bronze for traditional homes matching existing glazing. Be aware that tinted glass in a Low-E unit can sometimes have a different appearance than clear Low-E — worth showing samples to clients before ordering.",
    priceImpact:"Standard tinted glass (grey, bronze, green) adds approximately 10–20% to glass cost. High-performance solar control tints add more. In most cases, a clear Low-E coating outperforms a tinted glass in energy efficiency while maintaining a clearer view — confirm with your specialist before specifying tint for energy reasons.",
  },
  {
    id:"acoustic", name:"Acoustic & STC-Rated Glass", icon:"⦻", color:"#8A7AB8",
    tagline:"Block traffic, aircraft, and neighbor noise. STC ratings explained.",
    overview:"Acoustic glass is any glass assembly specifically engineered to reduce sound transmission. Standard double-pane windows do reduce noise vs. single pane — but they're not optimized for it. There are two primary acoustic strategies: (1) asymmetric glass thickness, which breaks resonance between panes for economical STC gains without lamination, and (2) laminated interlayers with acoustic PVB, which deliver the highest performance. These approaches are often combined. In San Diego, acoustic glass is one of the highest-ROI upgrades available — significant freeway, flight path, and rail noise affects tens of thousands of homes.",
    iterations:[
      {name:"STC Rating — What It Means",detail:"STC (Sound Transmission Class) is the standard rating for how much sound a partition blocks. Higher STC = more sound blocked. A standard hollow-core interior door is STC 20–25. A standard double-pane window is STC 26–32. A well-designed acoustic window assembly is STC 38–50. Every 10 STC points represents roughly a halving of perceived loudness. Going from STC 28 (standard window) to STC 38 (acoustic window) cuts perceived noise roughly in half — the difference is dramatic and immediately noticeable to anyone who's lived with traffic or aircraft noise.",icon:""},
      {name:"Asymmetric Glass Thickness — Economical Gain",detail:"The most cost-effective entry point for acoustic performance — no lamination required. Glass resonates at frequencies tied to its thickness. Two panes of identical thickness can resonate in sync, actually amplifying certain frequencies. Using asymmetric pane thicknesses (e.g., 3mm + 5mm, or 4mm + 6mm) breaks this resonance — each pane has a different resonant frequency so they don't reinforce each other. This alone adds meaningful STC points at minimal cost. A standard acoustic budget spec: 4mm + 12mm argon + 6mm, both tempered. Good starting point for clients who want acoustic improvement without the laminated premium.",icon:"⊟"},
      {name:"Acoustic Laminated Glass — Highest Performance",detail:"Laminated glass with an acoustic-grade PVB (polyvinyl butyral) or SGP interlayer is the highest-performing acoustic solution in a single IGU. The interlayer acts as a sound-dampening membrane — absorbing vibration energy before it resonates through the glass. Acoustic-grade PVB (such as Saflex Quiet or DuPont SentryGlas+ Acoustic) is formulated specifically for sound and performs significantly better than standard safety PVB. Laminated adds approximately 5–8 STC points over a comparable non-laminated unit. Note: not all acoustic glass needs to be laminated — asymmetric thickness alone provides meaningful improvement; lamination is the step up when maximum performance is the goal.",icon:""},
      {name:"Wide Air Gap (Dual Pane)",detail:"The air or gas gap in an IGU also contributes to sound isolation. Standard IGUs have a 1/2\" (12mm) to 3/4\" (19mm) gap. Widening the gap to 1\" (25mm) or more improves low-frequency sound isolation — the range where traffic rumble and aircraft noise lives. The improvement is meaningful but secondary to laminated glass. Note: very wide gaps (over 25mm) can reduce thermal performance — discuss the trade-off with your specialist.",icon:"↔"},
      {name:"Triple Pane Acoustic",detail:"Triple-pane configurations add a third mass-air-mass barrier which dramatically improves acoustic performance, especially at low frequencies. A typical triple-pane acoustic spec: 6mm laminated / 12mm argon / 4mm tempered / 12mm argon / 6mm laminated can achieve STC 50–55. The downside: significant weight, cost premium, and in San Diego's mild climate the thermal ROI alone doesn't justify triple-pane — but if noise is the primary driver, the acoustic case is strong. Best for freeway-adjacent or flight-path homes where the client is serious about noise elimination.",icon:"|||"},
      {name:"Interior Secondary Glazing",detail:"A second window unit installed on the interior face of an existing window — creating a wide air gap (often 4\"+) between the original window and the secondary unit. This is the highest-performing acoustic solution short of a full triple-pane replacement, because the large air gap is particularly effective at low frequencies. Common in historic renovations where the original window can't be replaced. Can add STC 10–15 points on top of whatever the existing window already provides. Relatively niche — primarily for extreme noise situations.",icon:"⊞"},
    ],
    whenRequired:[
      {location:"Within 1/4 mile of I-5, I-15, I-805, SR-52, SR-163",detail:"Major San Diego freeways generate significant low-frequency traffic noise. Homes within a quarter mile often have measurable indoor noise levels even with standard windows closed. Acoustic laminated glass is a meaningful upgrade."},
      {location:"Under flight paths — Miramar, Lindbergh, North Island",detail:"Military and commercial aircraft generate broadband noise across all frequencies. Acoustic laminated glass with wide gap is the right specification. For homes directly under approach paths, consider triple-pane acoustic."},
      {location:"Within 500ft of rail lines (Coaster, Trolley, BNSF freight)",detail:"Rail noise is impulsive and high-energy. Standard windows do very little to block it. Acoustic laminated with asymmetric glass thickness is the right call for trackside properties."},
      {location:"Urban infill and mixed-use neighborhoods",detail:"Downtown, Hillcrest, North Park, Barrio Logan — ambient urban noise from neighbors, bars, restaurants, and street activity. Acoustic glass meaningfully improves indoor comfort."},
    ],
    temperedVsLaminated:"For acoustic performance, laminated is always preferable to tempered. Tempered glass has no interlayer — it transmits sound efficiently. Laminated glass with an acoustic PVB interlayer absorbs sound energy. If a location requires safety glazing (tempered by code) but also needs acoustic performance, specify acoustic laminated — it meets safety glazing code requirements AND performs acoustically.",
    sdNote:"This is an underutilized upsell in San Diego. Ask every client near a freeway, under a flight path, or in an urban neighborhood: 'Is traffic or aircraft noise ever a problem when your windows are closed?' The answer is usually yes. Adding acoustic laminated glass to a window package adds a modest cost — typically $8–$15 per square foot of glass — but the comfort improvement is immediate and dramatic. Clients who get acoustic glass almost never regret it.",
    priceImpact:"Acoustic laminated glass adds approximately $8–$18 per square foot of glass vs. standard double-pane. On a whole-house replacement (say, 300 sq ft of glass total), that's $2,400–$5,400 in acoustic upgrade cost. For a targeted upgrade on the noisiest elevations only (typically street-facing), the cost is a fraction of that. For triple-pane acoustic configurations, add 30–50% over standard double-pane pricing.",
  },
  {
    tagline:"Two panes bonded by a plastic interlayer. Holds together when broken. Hurricane, security, acoustic.",
    overview:"Laminated glass consists of two or more glass panes bonded together with a polyvinyl butyral (PVB) or similar plastic interlayer. When broken, the glass cracks but adheres to the interlayer — it doesn't shatter and fall like tempered glass. This makes laminated glass the preferred choice for skylights, hurricane zones, security applications, and acoustic performance. Laminated glass is also required in some fire zone applications and is increasingly common in high-performance window specifications.",
    iterations:[
      {name:"Standard PVB Laminated",detail:"Two panes bonded with a clear PVB interlayer. Glass cracks but holds in place. Meets safety glazing code requirements. Standard choice for skylights and hurricane-impact windows.",icon:"⧉"},
      {name:"Acoustic / Sound Control Laminated",detail:"PVB interlayer formulated specifically to absorb sound vibration. Dramatically reduces noise transmission — critical for properties near roads, freeways, airports, or San Diego flight paths. STC ratings of 38–50 vs. 28–32 for standard double-pane.",icon:""},
      {name:"Hurricane / Impact Laminated",detail:"Heavy-duty laminated glass designed to withstand high-wind debris impact. Required in hurricane zones. Not required in San Diego but often specified in exposed coastal locations for wind and security.",icon:""},
      {name:"Security Laminated",detail:"Multi-layer laminated glass designed to resist forced entry. Glass breaks but the interlayer holds — defeating smash-and-grab. Specified for high-value properties and commercial applications.",icon:""},
      {name:"Fire-Rated Laminated",detail:"Specialty laminated glass with fire-rating certification. Used in fire zone windows, commercial fire separation walls, and stairway enclosures. Required in designated FHSZ locations.",icon:""},
    ],
    sdNote:"Acoustic laminated glass is a strong upsell for any San Diego home near Highway 5, 15, 163, 52, or under the Miramar/North Island/Lindbergh flight path — that's a significant portion of the county. Ask the client: 'Is aircraft or traffic noise ever a problem?' It often is, and laminated acoustic glass makes a real, noticeable difference.",
    priceImpact:"Standard laminated adds approximately 20–35% to glass cost vs. tempered. Acoustic laminated adds more — roughly 30–50% premium. The comfort improvement in noise-affected locations is typically well worth it, and it's a relatively small line item on a full window package.",
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
      style={{background:isAdded?`${color}22`:"none",border:`1px solid ${isAdded?color:T.faint}`,color:isAdded?color:T.dim,padding:"4px 10px",borderRadius:"4px",cursor:"pointer",fontSize:"9px",letterSpacing:"1px",fontFamily:"monospace",transition:"all 0.18s",whiteSpace:"nowrap",display:"inline-flex",alignItems:"center",gap:"5px"}}>
      {isAdded?" IN QUOTE LIST":" ADD TO QUOTE LIST"}
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
  const [doorTypeTab,setDoorTypeTab]=useState("exterior");
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
      // Submit to Formspree
      setSubmitting(true);
      setSubmitError(false);
      const labelMap = {};
      allQs.forEach(q=>{ if(q.options) q.options.forEach(o=>{ labelMap[`${q.id}::${o.value}`]=o.label; }); });
      const answerSummary = Object.entries(answers).map(([k,v])=>{
        const q = allQs.find(q=>q.id===k);
        const label = q?.question||k;
        const val = Array.isArray(v) ? v.map(vi=>labelMap[`${k}::${vi}`]||vi).join(", ") : (labelMap[`${k}::${v}`]||v);
        return `${label}: ${val}`;
      }).join("\n");
      fetch("https://formspree.io/f/mzdkbjdn", {
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          zip: contact.zip,
          notes: contact.notes||"",
          quiz_answers: answerSummary,
        })
      })
      .then(r=>r.json())
      .then(data=>{
        setSubmitting(false);
        if(data.ok||data.next){setSubmitted(true);setMainTab("results");}
        else{setSubmitError(true);}
      })
      .catch(()=>{setSubmitting(false);setSubmitError(true);});
    }
  };
  const handleBack=()=>{
    if(step>1){const prevQ=activeQs[step-2];setStep(s=>s-1);setSelOpt(answers[prevQ?.id]||null);}
    else{setStep(0);setSelOpt(null);}
  };
  const restart=()=>{setStep(0);setAnswers({});setContact({name:"",phone:"",email:"",zip:"",notes:""});setSelOpt(null);setSubmitted(false);setPhotos([]);setScheduleFiles([]);setMainTab("quiz");};

  const mainTabs=[
    {id:"quiz",label:"Find My Product",icon:"◈"},
    {id:"vendors",label:"Vendors",icon:"",svgIcon:<><rect x="1" y="1" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/><rect x="9" y="1" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/><rect x="1" y="9" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/><rect x="9" y="9" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/><line x1="3" y1="4" x2="5" y2="4" stroke="currentColor" strokeWidth="0.8"/><line x1="11" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth="0.8"/><line x1="3" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="0.8"/><line x1="11" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="0.8"/></>},
    {id:"door_types",label:"Door Types",icon:"🚪"},
    {id:"windows",label:"Windows",icon:"⊞"},
    {id:"large_doors",label:"Patio & Door Systems",icon:"⧉"},
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
        .opt:hover{border-color:#C4CEC8!important;background:#EEF2F0!important;cursor:pointer}
        .btn:hover{opacity:.85}
        a{color:inherit}
        /* ── NAV: wraps to 2-3 rows as window narrows ── */
        .main-nav{
          display:flex;
          flex-wrap:wrap;
          gap:4px;
        }
        .nav-tab{
          padding:7px 13px;
          font-size:9px;
          white-space:nowrap;
        }

        /* ── SIDEBAR LAYOUTS ── */
        .sidebar-layout{display:flex;min-height:calc(100vh - 80px);}
        .sidebar-nav{width:190px;flex-shrink:0;border-right:1px solid #D8D4CC;padding:24px 0;overflow-y:auto;}
        .sidebar-content{flex:1;overflow-y:auto;padding:28px 32px;}
        .grid-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .grid-4col{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;}

        @media(max-width:640px){
          .nav-tab{padding:10px 12px;}
          .sidebar-layout{flex-direction:column;}
          .sidebar-nav{width:100%!important;border-right:none!important;border-bottom:1px solid #D8D4CC;padding:0;overflow-y:visible;overflow-x:auto;display:flex!important;flex-direction:row!important;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
          .sidebar-nav::-webkit-scrollbar{display:none;}
          .sidebar-nav button{flex-shrink:0;display:flex!important;flex-direction:row!important;align-items:center;gap:7px;padding:11px 14px!important;border-left:none!important;border-bottom:3px solid transparent;white-space:nowrap;width:auto!important;text-align:left;}
          .sidebar-nav .sidebar-icon{font-size:15px!important;margin-bottom:0!important;}
          .sidebar-nav .sidebar-label{display:none;}
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
              <button key={t.id} onClick={()=>setMainTab(t.id)} className="nav-tab" style={{background:mainTab===t.id?`${T.teal}18`:"none",border:`1px solid ${mainTab===t.id?T.teal:T.border}`,color:mainTab===t.id?T.teal:T.muted,borderRadius:"4px",cursor:"pointer",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"monospace",fontSize:"9px",transition:"all 0.15s",display:"inline-flex",alignItems:"center",gap:"5px"}}>
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
        <div style={{maxWidth:"660px",margin:"0 auto",padding:"clamp(16px,4vw,36px) clamp(14px,4vw,20px)",animation:"fadeUp 0.25s ease"}}>
          {step===0&&(
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:"38px",marginBottom:"10px"}}></div>
              <div style={{fontSize:"9px",letterSpacing:"5px",color:T.faint,marginBottom:"10px",fontFamily:"monospace"}}>SD WINDOW &amp; DOOR GUIDE {"\u00B7"} SAN DIEGO COUNTY</div>
              <h1 style={{fontSize:"clamp(22px,4vw,32px)",fontWeight:400,margin:"0 0 10px",lineHeight:1.25}}>Find the right window &amp; door system<br/><em style={{color:T.gold}}>for your project {"\u2014"} free expert matching</em></h1>
              <p style={{color:T.muted,fontSize:"14px",lineHeight:1.75,maxWidth:"480px",margin:"0 auto 14px"}}>San Diego's independent resource for comparing windows, doors, glass systems, and building materials. Used by homeowners, contractors, architects, and designers to research options and connect with qualified local specialists.</p>
              {/* Audience pills */}
              <div style={{display:"flex",justifyContent:"center",gap:"6px",flexWrap:"wrap",marginBottom:"22px"}}>
                {[["","Homeowners"],["","Contractors"],["","Architects"],["","Designers"]].map(([icon,label])=>(
                  <span key={label} style={{fontSize:"10px",fontFamily:"monospace",letterSpacing:"1px",color:T.dim,background:T.card,border:`1px solid ${T.border}`,padding:"4px 10px",borderRadius:"20px"}}>{icon} {label}</span>
                ))}
              </div>
              <div style={{background:`${T.gold}10`,border:`1px solid ${T.gold}33`,borderRadius:"8px",padding:"14px 18px",maxWidth:"460px",margin:"0 auto 22px",textAlign:"left"}}>
                <div style={{fontSize:"9px",letterSpacing:"3px",color:T.gold,fontFamily:"monospace",marginBottom:"8px"}}> HOW THIS WORKS</div>
                <p style={{margin:"0 0 8px",fontSize:"12px",color:T.muted,lineHeight:1.65}}>Browse the <strong style={{color:T.text}}>Vendors</strong>, <strong style={{color:T.text}}>Windows</strong>, <strong style={{color:T.text}}>Glass Guide</strong>, <strong style={{color:T.text}}>Door Types</strong>, and <strong style={{color:T.text}}>Patio &amp; Door Systems</strong> tabs to research your options at your own pace.</p>
                <p style={{margin:0,fontSize:"12px",color:T.muted,lineHeight:1.65}}>When you're ready, take the <strong style={{color:T.gold}}>5-minute assessment</strong> to get matched with the right product and a qualified local specialist {"\u2014"} free. Click <strong style={{color:T.gold}}>{""} Add to Quote List</strong> on anything that interests you along the way.</p>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))",gap:"8px",maxWidth:"460px",margin:"0 auto 26px"}}>
                {[["Free","Expert Matching"],["Free","In-Home Measure"],["Independent","Unbiased Guide"],["Local","SD Specialists"]].map(([a,b])=>(
                  <div key={a+b} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"11px 6px",textAlign:"center"}}>
                    <div style={{fontSize:"12px",fontWeight:500,color:T.gold}}>{a}</div>
                    <div style={{fontSize:"9px",color:T.dim,marginTop:"2px",lineHeight:1.3}}>{b}</div>
                  </div>
                ))}
              </div>
              <button className="btn" onClick={()=>setStep(1)} style={{background:T.gold,border:"none",color:T.text,padding:"13px 36px",borderRadius:"6px",fontSize:"14px",fontWeight:600,letterSpacing:"1px",cursor:"pointer",fontFamily:"inherit"}}>Start My Assessment {"\u2192"}</button>
              <div style={{fontSize:"11px",color:T.faint,marginTop:"10px",fontStyle:"italic"}}>No account required {"\u00B7"} No spam · Results in ~5 minutes</div>
            </div>
          )}

          {step>0&&!currentQ?.isContact&&currentQ&&(
            <div key={`q${step}`} style={{animation:"fadeUp 0.22s ease"}}>
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
