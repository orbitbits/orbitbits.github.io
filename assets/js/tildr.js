document.addEventListener("DOMContentLoaded",()=>{const d=window.matchMedia("(prefers-reduced-motion: reduce)").matches,m=document.getElementById("mainNav"),p=document.getElementById("heroBg"),u=document.getElementById("heroGrid");let l=!1;window.addEventListener("scroll",()=>{l||(window.requestAnimationFrame(()=>{const t=window.scrollY;m&&m.classList.toggle("scrolled",t>40),d||(p&&(p.style.transform=`translate3d(0, ${t*.16}px, 0)`),u&&(u.style.transform=`translate3d(0, ${t*.08}px, 0)`)),l=!1}),l=!0)},{passive:!0});const f={"linux-install":"curl -fsSL https://orbitbits.com/tildr/linux.sh | sh","linux-uninstall":"curl -fsSL https://orbitbits.com/tildr/linux.sh | sh -s -- --uninstall","macos-install":"curl -fsSL https://orbitbits.com/tildr/macos.sh | sh","macos-uninstall":"curl -fsSL https://orbitbits.com/tildr/macos.sh | sh -s -- --uninstall","arch-install":"yay -S tildr-bin","arch-uninstall":"yay -Rdd tildr-bin","deb-install":`# Import GPG key
curl -fsSL https://packages.orbitbits.com/keys/orbitbits.gpg \\
  | sudo gpg --dearmor -o /usr/share/keyrings/orbitbits.gpg

# Add repository
echo "deb [signed-by=/usr/share/keyrings/orbitbits.gpg] https://packages.orbitbits.com/deb stable main" \\
  | sudo tee /etc/apt/sources.list.d/orbitbits.list

# Install
sudo apt update && sudo apt install tildr`,"deb-uninstall":`# Remove package
sudo apt remove tildr

# Remove repository
sudo rm /etc/apt/sources.list.d/orbitbits.list

# Remove GPG key
sudo rm /usr/share/keyrings/orbitbits.gpg

# Update package list
sudo apt update`,"rpm-install":`# Import GPG key
sudo rpm --import https://packages.orbitbits.com/keys/orbitbits.gpg

# Add repository
sudo dnf config-manager addrepo \\
  --from-repofile=https://packages.orbitbits.com/rpm/orbitbits.repo

# Install
sudo dnf install tildr`,"rpm-uninstall":`# Remove package
sudo dnf remove tildr

# Remove repository
sudo rm /etc/yum.repos.d/orbitbits.repo`};document.querySelectorAll(".tab-pane").forEach(t=>{const n=t.querySelectorAll(".os-tab"),s=t.querySelector(".install-code"),r=t.querySelector(".copy-btn");n.forEach(i=>{i.addEventListener("click",()=>{n.forEach(c=>c.classList.remove("active")),i.classList.add("active"),s&&(s.textContent=f[i.dataset.os]??"")})}),r&&s&&r.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(s.textContent)}catch{return}const i=r.querySelector("span");r.classList.add("copied"),i&&(i.textContent="Copied"),window.setTimeout(()=>{r.classList.remove("copied"),i&&(i.textContent="Copy")},1800)})});const g={"tildr-example":`[core]
repo = "~/.dotfiles"

[git]
auto_commit = true`};document.querySelectorAll(".code-block").forEach(t=>{t.textContent=g[t.dataset.code]??""});const o=document.getElementById("tildrTerminalScreen"),y=[{type:"command",text:"tildr init"},{type:"output",text:"Created repo at ~/.dotfiles",className:"is-muted"},{type:"output",text:"Created config at ~/.config/tildr/config.toml",className:"is-muted"},{type:"spacer"},{type:"command",text:"tildr add ~/.config/nvim"},{type:"output",text:"ACTION    FILE",className:"is-strong"},{type:"output",text:"Added     ~/.config/nvim/init.lua",className:"is-info"},{type:"output",text:"Added     ~/.config/nvim/lua/plugins.lua",className:"is-info"},{type:"output",text:"2 files added",className:"is-success"},{type:"spacer"},{type:"command",text:"tildr status --counter"},{type:"output",text:`Managed: 24
Linked: 24
Missing: 0`,className:"is-strong"},{type:"spacer"},{type:"command",text:"tildr doctor"},{type:"output",text:`Checking environment...
Repository   OK
Config       OK
Git          OK
Permissions  OK
Disk         OK (6K)
Symlinks     OK
`,className:"is-strong"}],a=t=>new Promise(n=>{window.setTimeout(n,t)});function e(t,n=""){if(!o)return null;const s=document.createElement("span");return s.className=`tildr-terminal__line ${n}`.trim(),s.textContent=t,o.appendChild(s),o.scrollTop=o.scrollHeight,s}async function b(t){if(!o)return;const n=document.createElement("span");n.className="tildr-terminal__line is-command";const s=document.createElement("span");s.className="tildr-terminal__prompt",s.textContent="$ ";const r=document.createElement("span"),i=document.createElement("span");i.className="tildr-terminal__cursor",i.textContent="\u258B",n.append(s,r,i),o.appendChild(n);for(const c of t)r.textContent+=c,o.scrollTop=o.scrollHeight,await a(40);i.remove()}async function h(){if(o){if(d){o.innerHTML="",e("$ tildr init","is-command"),e("Created repo at ~/.dotfiles","is-muted"),e("Created config at ~/.config/tildr/config.toml","is-muted"),e("",""),e("$ tildr add ~/.config/nvim","is-command"),e("ACTION    FILE","is-strong"),e("Added     ~/.config/nvim/init.lua","is-info"),e("Added     ~/.config/nvim/lua/plugins.lua","is-info"),e("2 files added","is-success"),e("",""),e("$ tildr status --counter","is-command"),e("Managed: 24  Linked: 24  Missing: 0","is-strong");return}for(;;){o.innerHTML="";for(const t of y){if(t.type==="spacer"){e(""),await a(180);continue}if(t.type==="command"){await b(t.text),await a(320);continue}e(t.text,t.className),await a(220)}await a(2200)}}}h()});
