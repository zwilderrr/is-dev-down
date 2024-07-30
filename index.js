const AUTHORS = ["zwilderrr", "anonymous"];
const STATUSES = {
  zwilderrr: [
    "yes lol",
    "it works for me?",
    "why do you even have to ask?",
    "only for you",
    "no, but that can't be right",
    "yes but only because you're trying to be productive",
    "try not asking such deep philosophical questions about the world",
    "no, but it will be once *your favorite coworker* deploys",
    "only a little bit",
    "if you start crying, maybe",
    "*evil laugh*",
  ],
  anonymous: [
    "idk, it's been a while, and I feel it coming",
    "no, but pretty close to yes soon",
  ],
};

function getRandomNumber(n) {
  return Math.floor(Math.random() * n);
}

function getAuthorStatus() {
  const author = AUTHORS[getRandomNumber(AUTHORS.length)];
  const author_responses = STATUSES[author];
  const status = author_responses[getRandomNumber(author_responses.length)];
  return { author, status };
}

function setStatus() {
  const { author, status } = getAuthorStatus();
  const authorEl = document.querySelector("#author");
  const statusEl = document.querySelector("#status");

  if (author !== "anonymous") {
    authorEl.setAttribute("target", "_blank");
    authorEl.setAttribute("href", `https://twitter.com/${author}`);
    authorEl.textContent = `@${author}`;
  } else {
    authorEl.textContent = "anonymous";
  }

  statusEl.textContent = status;
}

function showTerms() {
  const main = document.querySelector("#main");
  const h1 = document.createElement("h1");
  h1.textContent = "Terms and conditions";

  const p = document.createElement("p");
  p.style = "font-size: 16px; font-weight: 400; line-height: 20px";
  p.textContent = `
        Someone somewhere out there will probably sue us if we don't say this: By using this site or submitting any content to it, either directly or indirectly, you or any entity (legal or otherwise) you have a direct or indirect relationship with, agree to wave any and all rights to take any legal action in any form against the site, its creators or any entity associated with it.
        `;
  main.innerHTML = "";
  h1.appendChild(p);
  main.appendChild(h1);
}

function checkLocation() {
  const path = window.location.pathname;

  if (path.includes("is-dev-down") || path === "/") {
    setStatus();
    setFooter("home");
    updateVisitCount();
    return;
  }

  if (path === "/terms") {
    showTerms();
    setFooter("nav");
    return;
  }

  window.location.href = "https://isdevdown.info";
}

function setFooter(page) {
  const footerNav = document.querySelector("#footer-nav");
  if (page === "home") {
    footerNav.textContent = "terms";
    footerNav.setAttribute("href", "http://isdevdown.info/terms");
  } else {
    footerNav.textContent = "home";
    footerNav.setAttribute("href", "http://isdevdown.info/");
  }
}

async function updateVisitCount() {
  try {
    const response = await fetch(
      "https://d4zmncw0w8.execute-api.us-east-2.amazonaws.com/prod/visit-count"
    );
    const { body } = await response.json();
    document.getElementById(
      "visit-count"
    ).innerHTML = `This page has been viewed <strong>${body.padStart(
      7,
      "0"
    )}</strong> times!`;
  } catch (error) {
    console.error("Error updating visit count:", error);
  }
}

checkLocation();
