import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function Hello() {

  const [facts, setFacts] = useState(initialFacts);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    
    async function fetchFacts() {
      
      const { data: fact, error } = await supabase
      .from('fact')
      .select('*')
      setFacts(fact);
      console.log(fact);

    }
  fetchFacts();
  }, [])
  
  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm}/>
      {showForm && <NewFactForm setFacts={setFacts} setShowForm={setShowForm}/>}
      <main className="main">
        <CategoryFilter />
        <FactList facts={facts}/>
      </main>
    </>
  );
}

function Header({showForm, setShowForm}) {
  const title = "React Project";
  return (
    <header className="header">
    <div className="logo">
      <img src="./logo.png" alt="My Website" />
      <h1>{title}</h1>
    </div>
    <button className="btn btn-large btn-open" onClick={() => setShowForm(show => !show)}>
      {showForm ? "Close" : "Share A Fact"}
      </button>
  </header>
  )
}

function NewFactForm({setFacts, setShowForm}) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");

  let textLength = text.length;

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(text && source && isValidHttpUrl(source) && category && textLength <= 200) {
      const newFact = {
        id: Math.round(Math.random() * 1000),
        text,
        source,
        category,
        votesFalse: 0,
        votesInteresting: 0,
        votesMindblowing: 0,
        createdIn: new Date().getFullYear(),

      };
      setFacts(currentFacts => [...currentFacts, newFact]);
      setText('');
      setSource('');
      setCategory('');
    }

    setShowForm(false);
  }
  return (
  <form className="fact-form" onSubmit={handleSubmit}>
      <input
       type="text" 
       placeholder="Share News..." 
       required 
       value={text}
       onChange={e => setText(e.target.value)}
       />
      <span>{200 - textLength}</span>
      <input 
        type="text" 
        placeholder="Trustworthy Source..."
        required
        value={source} 
        onChange={e => setSource(e.target.value)}
        />
      <select 
        name="" 
        id=""
        required
        value={category}
        onChange={e => setCategory(e.target.value)}
        >
      <option value="">Choose Category:</option>

        {
          CATEGORIES.map(c => (
            <option key={c.name} value={c.name}>{c.name.toUpperCase()}</option>

          ))
        }
      
      </select>
      <button className="btn btn-large">Post</button>
  </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-category">All</button>
        </li>
        {CATEGORIES.map((c) => (
          <li key={c.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: c.color }}
            >
              {c.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({facts}) {
   
  return (
    <section>
      <ul className="fact-list">
        {facts.map((fact) => (
          <Fact key={fact.id} factObj={fact} test={fact.id} />
        ))}
      </ul>
    </section>
  );
}

function Fact({ factObj }) {
  // const {fact} = props;
  return (
    <li className="fact">
      <p>
        {factObj.text}
        <a className="source" href={factObj.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find(
            (cat) => cat.name === factObj.category
          ).color,
        }}
      >
        {factObj.category}
      </span>
      <div className="vote-btn">
        <button>👍{factObj.votesInteresting}</button>
        <button>🤯 {factObj.votesMindblowing}</button>
        <button>⛔ {factObj.votesFalse}</button>
      </div>
    </li>
  );
}
export default Hello;
