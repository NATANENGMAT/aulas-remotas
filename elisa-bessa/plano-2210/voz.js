'use strict';
(()=>{
 const player=new Audio();player.preload='auto';let enabled=true,unlocked=false,current='';
 const clean=s=>String(s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
 const mascot=document.getElementById('mascot');
 function status(s){mascot.classList.toggle('speaking',s);const label=document.getElementById('voiceState');if(label)label.textContent=s?'Falando…':'Toque para ouvir';}
 function stop(){player.pause();player.currentTime=0;status(false);if('speechSynthesis'in window)window.speechSynthesis.cancel();}
 function say(text){current=clean(text);if(!enabled||!unlocked||!current)return;stop();const src=(window.HELPER_VOICES||{})[current];if(src){player.src=src;player.play().catch(()=>{status(false);const l=document.getElementById('voiceState');if(l)l.textContent='Toque para ouvir';});return;}if('speechSynthesis'in window){const u=new SpeechSynthesisUtterance(current);u.lang='pt-BR';u.rate=.97;u.onstart=()=>status(true);u.onend=u.onerror=()=>status(false);window.speechSynthesis.speak(u);}}
 player.addEventListener('playing',()=>status(true));player.addEventListener('ended',()=>status(false));player.addEventListener('pause',()=>status(false));player.addEventListener('error',()=>status(false));
 window.HelperVoice={say,stop,unlock(){unlocked=true;enabled=true;},toggle(){enabled=!enabled;if(!enabled)stop();return enabled;},get enabled(){return enabled;}};
 mascot.addEventListener('click',()=>{unlocked=true;if(!enabled){enabled=true;document.getElementById('audio').setAttribute('aria-pressed','true');}say(current||clean(document.querySelector('.question')?.textContent));});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
})();
