// Hybrid web component
// function increaseCount(host) {
//   host.count += 1;
// }
const genericFrameUtils = {
  open(host) {
    host.displayPre = false
  },
  close(host) {
    host.displayPre = true
  },
  refresh(host) {
    var temp = host.frameSrc
    host.frameSrc = ""
    setTimeout(() => host.frameSrc = temp, 100)
  }
}

const GenericFrame = {
  displayPre: true,
  frameSrc: {
    connect: (host) => {
      host.frameSrc = host.getAttribute('src')
    }
  },
  render: ({ displayPre, frameSrc, title }) => html`
    <style>
    .full-wh {
      width: 100%;
      height: 100%;
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
          <h2>${title}</h2>
          <button class="open-btn" onclick=${genericFrameUtils.open}>
            Start
          </button>
        </div>
      ` : html`
        <div class="frame-overlay">
          <button class="refresh-btn" onclick=${genericFrameUtils.refresh}>
            <i class="fas fa-sync-alt"></i>
          </button>
          <button class="close-btn" onclick=${genericFrameUtils.close}>
            <i class="fas fa-times"></i>
          </button>
        </div>
        <iframe src="${frameSrc}" class="full-wh" frameborder="0" allowfullscreen style="max-width:100%"></iframe>
      `
      }
    `
};
    // <button onclick="${increaseCount}">
    //   Count: ${count}
    // </button>

define('generic-frame-plugin', GenericFrame);