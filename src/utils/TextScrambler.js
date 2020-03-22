export default function({
  el,
  percent = 0.28,
  time = 35,
  phrases = [],
  interval = 800
}) {
  const chars = "!<>-_\\/[]{}—=+*^?$()#____----";
  let frameRequest = undefined;
  let queueList = [];
  let frame = 0;
  let scramblerPromise = undefined;

  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

  const update = async () => {
    let output = "";
    let complete = 0;
    for (const queue of queueList) {
      let { from, to, start, end, char } = queue;
      if (frame >= end) {
        complete++;
        output += to;
      } else if (frame >= start) {
        if (!char || Math.random() < percent) {
          char = randomChar();
          queue.char = char;
        }
        output += `<span style='color: #a2a1a1;'>${char}</span>`;
      } else {
        output += from;
      }
    }
    // console.log(output, complete, queue.length, frame);
    el.innerHTML = output;
    if (complete === queueList.length) {
      scramblerPromise();
    } else {
      frameRequest = requestAnimationFrame(update);
      frame++;
    }
  };

  const setText = async newText => {
    const oldText = el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => (scramblerPromise = resolve));
    queueList = [];
    for (let i = 0; i < length; i++) {
      const start = Math.floor(Math.random() * time);
      const obj = {
        from: oldText[i] || "",
        to: newText[i] || "",
        start,
        end: start + Math.floor(Math.random() * time)
      };
      queueList = [...queueList, obj];
    }
    cancelAnimationFrame(frameRequest);
    frame = 0;
    update();
    return promise;
  };

  let counter = 0;
  let task = undefined;
  const next = () => {
    setText(phrases[counter]).then(() => {
      task = setTimeout(next, interval);
    });
    counter = (counter + 1) % phrases.length;
  };

  const start = () => {
    if (!task) next();
  };

  const stop = () => {
    if (task) {
      clearTimeout(task);
      task = undefined;
    }
  };

  return {
    start,
    stop
  };
}
