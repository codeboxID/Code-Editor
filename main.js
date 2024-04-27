const nav = document.createElement("nav")
nav.className = "icon-bar";
document.body.appendChild(nav)

function navigasiIcon(idNav, title, link, action, alt, src, fungsi) {
  let navLinkWithIcon = document.createElement("div");
  navLinkWithIcon.className = "nav-icon custom-tooltip"; // Combine classes
  navLinkWithIcon.id = idNav;
  navLinkWithIcon.setAttribute('data-tooltip', title); // Menggunakan data-tooltip untuk menyimpan judul alternatif
  if (link && action) {
      navLinkWithIcon.addEventListener("click", function () {
          window.open(link, action);
      });
  }
  if (typeof fungsi === "function") {
      navLinkWithIcon.onclick = fungsi;
  }
  nav.appendChild(navLinkWithIcon);

  let navIcon = document.createElement("img");
  navIcon.className = "navicon";
  navIcon.alt = alt;
  navIcon.src = src;
  navLinkWithIcon.appendChild(navIcon);
}




navigasiIcon("", "Home CodeBox Doc", "https://codebox.my.id", "_blank", "home", "https://img.codebox.my.id/home.png",)
navigasiIcon("","Full and Normall screen","","","full and normal screen","https://img.codebox.my.id/fullScreen.png",toggleFullScreen)
navigasiIcon("", "Run Code", "", "", "Run Code", "https://img.codebox.my.id/run.png", executeCode)
navigasiIcon("","Open Full Code","","","open code","https://img.codebox.my.id/open-code.png",closeView)
navigasiIcon("full", "Full Web view", "", "", "home", "https://img.codebox.my.id/full-web.png", executeFull)
navigasiIcon("closeOutput", "Defult Web View", "", "", "home", "https://img.codebox.my.id/close.png", closeOutput)
navigasiIcon("","Copy Code","","","copy","https://img.codebox.my.id/copy.png",copyText)
navigasiIcon("","Dwonload Code","","","dwonload","https://img.codebox.my.id/dwonload.png",downloadText)
navigasiIcon("","New Tab Code Editor","/index.html","_blank","new-tab","https://img.codebox.my.id/new-tab.png",)

const elem = document.documentElement;
let isFullScreen = false; // Track fullscreen state

function toggleFullScreen() {
  if (!isFullScreen) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    isFullScreen = true; // Update state after entering fullscreen
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    isFullScreen = false; // Update state after exiting fullscreen
  }
}



var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "htmlmixed",
    theme: "material-darker",
    lineNumbers: true,
    autoCloseTags: true,
    matchTags: { bothTags: true },
    matchBrackets: true,
    styleActiveLine: true,
    lineWrapping: true,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    gutters: ["CodeMirror-lint-markers"],
    lint: true
});

function executeCode() {
    var code = editor.getValue();
    var iframe = document.createElement('iframe');
    document.getElementById('output').innerHTML = '';
    document.getElementById('output').appendChild(iframe);

    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(code);
    iframeDocument.close();
}

const closeIcon = document.getElementById("closeOutput")
const fullIcon = document.getElementById("full");
const output = document.getElementById('output');

output.style.display = ""
closeIcon.style.display = "none";
fullIcon.style.display = "block";

function closeView() {
    if (output.style.display === "block") { 
      output.style.display = "none";
    } else {
      output.style.display = "block";
    }
  }

function executeFull() {
    output.classList.add('full-mode');

    if (closeIcon.style.display === "none") {
        output.style.display = "block";
        closeIcon.style.display = "block";
        fullIcon.style.display = "none"
    }
}

function closeOutput() {
    output.classList.remove('full-mode');

    if (fullIcon.style.display === "none") {
        output.style.display = "block";
        closeIcon.style.display = "none";
        fullIcon.style.display = "block";
    }
}

function copyText() {
  var text = editor.getValue();

  if (text.trim() === "") {
      alert("⚠︎ code is empty!");
      return;
  }

  navigator.clipboard.writeText(text)
      .then(() => {
          alert("Code copied successfully!");
      })
      .catch(err => {
          console.error('Failed to copy Code: ', err);
          alert("⚠︎ Failed to copy Code!");
      });
}

function downloadText() {
  var text = editor.getValue();

  if (text.trim() === "") {
      alert("⚠︎ Code is empty!");
      return;
  }

  var fileName = prompt("Enter file name:", "codebox-editor.html");

  if (fileName === null || fileName.trim() === "") {
      alert("⚠︎ File name cannot be empty!");
      return;
  }


  var blob = new Blob([text], { type: "text/plain" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

//done all