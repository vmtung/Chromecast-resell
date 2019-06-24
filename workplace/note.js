// Hybrid web component
// function increaseCount(host) {
//   host.count += 1;
// }
function openNote(host) {
  host.displayPre = false
}
function closeNote(host) {
  host.displayPre = true
}
function onSrcChange(host, event) {
  host.frameSrc = event.target.value
}
function refreshNote(host) {
  var temp = host.frameSrc
  host.frameSrc = ""
  setTimeout(() => host.frameSrc = temp, 100)
  
}

const NotePlugin = {
  displayPre: true,
  frameSrc: undefined,
  render: ({ displayPre, frameSrc = 'https://www.taskade.com/e/zBRQmL5YWoQEDyyD/embed' }) => html`
    <style>
    .full-wh {
      width: 100%;
      height: 100%;
    }
    .src-input {
      width: 90%;
      margin: 10px;
      padding: 5px;
      min-height: 30px;
      font-size: 16px;
    }
    .open-btn {
      padding: 10px;
      border-radius: 5px;
      color: white;
      background-color: green;
    }
    .frame-overlay {
      position: absolute;
      top: 10px;
      right: 10px;
      opacity: 0;
      transition: 1s;
    }
    .frame-overlay:hover {
      opacity: 1;
    }
    .close-btn {
      background-color: red;
      color: white;
      border-radius: 5px;
    }
    </style>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.9.0/css/all.css">
      ${
        displayPre ? html`
        <div id="note-pre" class="full-wh" style="background-color: bisque; display: flex; justify-content: center; align-items: center; flex-direction: column;">
          <h2>Taskade Notes</h2>
          <input class="src-input" placeholder="Taskade embed URL" value="https://www.taskade.com/e/zBRQmL5YWoQEDyyD/embed" oninput=${onSrcChange}></input>
          <button class="open-btn" onclick=${openNote}>
            Start
          </button>
        </div>
      ` : html`
        <div class="frame-overlay">
          <button class="refresh-btn" onclick=${refreshNote}>
            <i class="fas fa-sync-alt"></i>
          </button>
          <button class="close-btn" onclick=${closeNote}>
            <i class="fas fa-times"></i>
          </button>
        </div>
        <iframe id="note-iframe" class="taskade-embed full-wh" scrolling="yes" frameborder="no" src="${frameSrc}"></iframe>
      `
      }
    `
};
    // <button onclick="${increaseCount}">
    //   Count: ${count}
    // </button>

define('note-plugin', NotePlugin);