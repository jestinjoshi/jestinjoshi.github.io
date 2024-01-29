(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{2882:function(e,a,t){Promise.resolve().then(t.bind(t,6147)),Promise.resolve().then(t.bind(t,3100))},6147:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return Contact}});var s=t(7437);function Contact(){return(0,s.jsx)("section",{id:"contact",className:"py-10",children:(0,s.jsxs)("div",{className:"custom-container px-4 mx-auto",children:[(0,s.jsx)("h2",{className:"text-3xl section-heading mb-10",children:"Contact"}),(0,s.jsx)("div",{className:"contact-wrap",children:(0,s.jsxs)("form",{action:"dialog",className:"flex gap-10 flex-wrap",children:[(0,s.jsx)("input",{type:"text",name:"name",id:"name",placeholder:"Name","aria-label":"Name",className:"flex-1 p-4 rounded-md bg-slate-900"}),(0,s.jsx)("input",{type:"email",name:"email",id:"email",placeholder:"Email","aria-label":"Email",className:"flex-1 p-4 rounded-md bg-slate-900"}),(0,s.jsx)("textarea",{rows:4,name:"message",id:"message",placeholder:"Message","aria-label":"Message",className:"w-full p-4 rounded-md bg-slate-900 resize-none"}),(0,s.jsx)("input",{type:"submit",value:"Send",className:"send py-4 px-12 text-white rounded-md cursor-pointer"})]})})]})})}},3100:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return Intro}});var s=t(7437),n=t(6691),l=t.n(n),i={src:"/_next/static/media/avatar.ff573f76.png",height:1245,width:1245,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAJ1BMVEVMaXEGBAILCAUYCwcYGBgKCAUFBAIKBgIOCAQFBQMIBQMMCAQOCQVuyqhvAAAADXRSTlMA/jAcCkrR0LiR89zFM7+b7AAAAAlwSFlzAAALEwAACxMBAJqcGAAAADRJREFUeJwticENwCAMxM4XoIF2/3kRof7YkiXJocI8raKv1xXx5f/yrpgwLLUBsKx+DHMDFEIAoR3JjJIAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},r=t(2265);let c=["Hello","Bonjour","Namaste","Hola","Ciao","Salam","Nǐ hǎo"],o=0,d=0,m=!1,u=100;function Intro(){let[e,a]=(0,r.useState)(" "),handleTyping=()=>{if(c[o].length>=d&&!m){u=100,a(c[o].substring(0,d));let e=c[o].length===d;e&&(m=!0,u=2e3),d++}else if(u=25,a(c[o].substring(-1,d-2)),1==--d){m=!1,o++;let e=o>c.length-1;e&&(o=0)}};return(0,r.useEffect)(()=>{let e=setTimeout(handleTyping,u);return()=>{clearTimeout(e)}},[e]),(0,s.jsx)("section",{id:"about",className:"py-10",children:(0,s.jsx)("div",{className:"custom-container px-4 mx-auto",children:(0,s.jsxs)("div",{className:"flex justify-center gap-20 flex-wrap items-center",children:[(0,s.jsxs)("div",{className:"avatar-wrap relative w-full sm:w-[300px]",children:[(0,s.jsx)(l(),{priority:!0,className:"relative z-10 rounded-full mx-auto backdrop-blur-sm",alt:"Avatar",width:300,height:300,src:i}),(0,s.jsx)("div",{id:"shape"})]}),(0,s.jsxs)("div",{className:"about flex-1",children:[(0,s.jsxs)("h1",{className:"text-5xl mb-5",children:[e.length?e:"",(0,s.jsx)("span",{className:"cursor"}),", I'm Jestin"]}),(0,s.jsxs)("p",{className:"text-lg mb-5",children:["I am a frontend web developer with a track record of ",(()=>{let e=new Date,a=e.getFullYear();return 6>e.getMonth()&&a--,Math.abs(2018-a)})(),"+ years in developing websites across diverse categories, including blogs, e-commerce, dashboards, and static sites. I love solving complex problems with cutting-edge web technologies, implementing challenging UI interactions and components; and collaborating with talented teams."]}),(0,s.jsx)("p",{className:"text-lg mb-5",children:"I am always eager to learn new skills and explore new challenges. Currently, I'm keen on delving into backend technologies, continuous integration and continuous deployment (CI/CD), and database development."})]})]})})})}}},function(e){e.O(0,[986,971,472,744],function(){return e(e.s=2882)}),_N_E=e.O()}]);