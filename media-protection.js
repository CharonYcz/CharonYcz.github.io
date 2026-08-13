(()=>{
  const mediaSelector="img,video";
  const isMediaEvent=(event)=>event.target instanceof Element&&event.target.closest(mediaSelector);

  document.addEventListener("contextmenu",(event)=>{
    if(isMediaEvent(event)) event.preventDefault();
  });
  document.addEventListener("dragstart",(event)=>{
    if(isMediaEvent(event)) event.preventDefault();
  });
  window.addEventListener("keydown",(event)=>{
    if((event.ctrlKey||event.metaKey)&&["s","u","i"].includes(event.key.toLowerCase())) event.preventDefault();
  });
  document.querySelectorAll("img").forEach((image)=>{ image.draggable=false; });
  document.querySelectorAll("video").forEach((video)=>{
    video.controls=false;
    video.disablePictureInPicture=true;
    video.setAttribute("controlsList","nodownload noplaybackrate noremoteplayback");
  });

  const precisePointer=window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
  if(!precisePointer.matches||reducedMotion.matches) return;

  const style=document.createElement("style");
  style.textContent=`
    @media (hover: hover) and (pointer: fine) {
      html, body, a, button, [role="button"], input, textarea, select, summary, label { cursor: none !important; }
      .portfolio-cursor {
        position: fixed;
        left: 0;
        top: 0;
        width: 9px;
        height: 9px;
        border-radius: 999px;
        background: #a970ff;
        box-shadow: 0 0 14px rgba(169,112,255,.8);
        pointer-events: none;
        z-index: 2147483647;
        opacity: 0;
        transform: translate3d(-50%,-50%,0);
        transition: width .18s ease, height .18s ease, opacity .18s ease, background .18s ease, box-shadow .18s ease;
        will-change: left, top, width, height;
      }
      .portfolio-cursor::after {
        content: "";
        position: absolute;
        inset: -9px;
        border: 1px solid rgba(169,112,255,.55);
        border-radius: inherit;
        transition: inset .18s ease, border-color .18s ease, background .18s ease;
      }
      .portfolio-cursor.is-visible { opacity: 1; }
      .portfolio-cursor.is-interactive {
        width: 18px;
        height: 18px;
        background: linear-gradient(135deg,#a970ff,#ff7a45);
        box-shadow: 0 0 22px rgba(255,122,69,.48), 0 0 16px rgba(169,112,255,.58);
      }
      .portfolio-cursor.is-interactive::after {
        inset: -7px;
        border-color: rgba(255,164,116,.75);
        background: rgba(169,112,255,.08);
      }
      .portfolio-cursor.is-pressed {
        width: 13px;
        height: 13px;
      }
    }
  `;
  document.head.appendChild(style);

  const cursor=document.createElement("span");
  cursor.className="portfolio-cursor";
  cursor.setAttribute("aria-hidden","true");
  document.body.appendChild(cursor);

  const interactiveSelector='a,button,[role="button"],input,textarea,select,summary,label,.project-card,.related-project-card';
  document.addEventListener("pointermove",(event)=>{
    if(event.pointerType&&event.pointerType!=="mouse") return;
    cursor.style.left=event.clientX+"px";
    cursor.style.top=event.clientY+"px";
    cursor.classList.add("is-visible");
    const target=event.target instanceof Element?event.target:null;
    cursor.classList.toggle("is-interactive",Boolean(target&&target.closest(interactiveSelector)));
  },{passive:true});
  document.addEventListener("pointerdown",()=>cursor.classList.add("is-pressed"),{passive:true});
  document.addEventListener("pointerup",()=>cursor.classList.remove("is-pressed"),{passive:true});
  document.addEventListener("pointercancel",()=>cursor.classList.remove("is-pressed"),{passive:true});
  document.documentElement.addEventListener("mouseleave",()=>cursor.classList.remove("is-visible"));
  window.addEventListener("blur",()=>cursor.classList.remove("is-visible"));
})();