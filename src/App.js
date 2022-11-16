import React ,{useState,useEffect,useRef} from "react";
import "./style.css";

export default function App() {
  const elementRef = useRef();
  const[quran,setQuran] = useState([])
  const [chapters,setChapters]=useState([])
  const [chapter,setChapter]=useState([])
  function handleChapter(e){
    const id = parseInt(e.target.dataset.id)+1
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf/${id}.json`)
    .then(res=>res.json()).then((data)=>{
     console.log(data.chapter)
     setChapter(data.chapter)
    })
  }
  useEffect(()=>{
    const divElement = elementRef.current;
    console.log(divElement)
    fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/info.json')
    .then(res=>res.json()).then((data)=>{
     const qr = data.quran
     setChapters(data.chapters)
      setQuran(qr)
    })
  },[])
  return (
    <div dir="rtl" className="wrapper">
      <div className="chapters-list">
        {chapters.map((a,i)=>
        <p ref={elementRef} data-id={i} onClick={handleChapter} key={i}>{i} {a.arabicname}</p>
        )}
      </div>
      <div className="chapter">
        {chapter.map((ch,i)=>{
          return <span key={i}>{ch.text} {i+1} </span>
        })}
      </div>
    </div>
  );
}
