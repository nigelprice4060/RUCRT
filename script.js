"use strict";
const team = window.TEAM;
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
const safeUrl = (value) => {
  if (!value || !String(value).trim()) return "";
  try {
    const u = new URL(value, location.href);
    return ["https:", "http:", "mailto:"].includes(u.protocol) ? u.href : "";
  } catch {
    return "";
  }
};
const link = (url, label, cls = "button") =>
  safeUrl(url)
    ? /* HTML */ `
        <a class="${cls}" href="${esc(safeUrl(url))}">${esc(label)}</a>
      `
    : "";
document.querySelectorAll("[data-link]").forEach((a) => {
  const url = safeUrl(team[a.dataset.link]);
  if (url) a.href = url;
  else a.remove();
});
const toggle = document.querySelector(".menu-toggle"),
  nav = document.querySelector("nav");
function closeMenu() {
  toggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
}
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
    toggle.focus();
  }
});
function fill(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}
fill(
  "meeting-details",
  [
    ["Day", team.meetingDay],
    ["Time", team.meetingTime],
    ["Location", team.meetingLocation],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) => /* HTML */ `
        <dt>${k}</dt>
        <dd>${esc(v)}</dd>
      `,
    )
    .join(""),
);
fill(
  "sponsor-actions",
  link(team.sponsorshipPacket, "View sponsorship packet →") +
    link(
      team.sponsorshipEmail ? "mailto:" + team.sponsorshipEmail : "",
      "Talk sponsorship →",
      "text-link",
    ),
);
if (team.nextEvent.name) {
  const ev = team.nextEvent;
  fill(
    "next-event",
    /* HTML */ `
      <h3>${esc(ev.name)}</h3>
      <p>${[ev.date, ev.location].filter(Boolean).map(esc).join(" · ")}</p>
      ${link(ev.url, "Event details →", "text-link")}
    `,
  );
}
fill(
  "merch-details",
  /* HTML */ `<dl>${[
    ["Price", team.merch.price],
    ["Sizes", team.merch.sizes],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) => /* HTML */ `
        <dt>${k}</dt>
        <dd>${esc(v)}</dd>
      `,
    )
    .join("")}</dl>` + link(team.merch.orderUrl, "Order team gear →"),
);
if (team.merch.quarterZipImage && document.getElementById("quarter-image")) {
  const img = document.getElementById("quarter-image");
  img.src = team.merch.quarterZipImage;
  img.alt = "Rutgers Combat Robotics quarter zip";
  img.parentElement.classList.remove("placeholder-image");
}
fill(
  "board",
  team.board
    .map(
      (group, i) => /* HTML */ `
        <section class="board-group" id="group-${i}">
          <div class="section-heading">
            <h2>${esc(group.title.toUpperCase())}</h2>
            <span class="eyebrow">${String(i + 1).padStart(2, "0")} / THE TEAM</span>
          </div>
          <div class="member-grid">
            ${group.members
              .map(
                (m) => /* HTML */ `
                  <article class="member-card">
                    <div class="portrait">
                      <img
                        src="${esc(m.image || "NoTexture.png")}"
                        alt="${esc(m.image ? m.name : "Portrait placeholder for " + m.name)}"
                        loading="lazy"
                      />
                    </div>
                    <h3>${esc(m.name)}</h3>
                    <p class="role">${esc(m.role)}</p>
                    ${
                      m.major
                        ? /* HTML */ `
                            <p class="bio">${esc(m.major)}</p>
                          `
                        : ""
                    }${
                      m.bio
                        ? /* HTML */ `
                            <p class="bio">${esc(m.bio)}</p>
                          `
                        : ""
                    }${link(m.link, "Connect →", "text-link")}
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>
      `,
    )
    .join(""),
);
const tabs = document.querySelector(".board-tabs");
if (tabs)
  tabs.innerHTML = team.board
    .map(
      (g, i) => /* HTML */ `
        <a href="#group-${i}">${esc(g.title)}</a>
      `,
    )
    .join("");
if (team.robots.length)
  fill(
    "robot-roster",
    /* HTML */ `
      <div class="section-heading" style="margin-top:55px"><h2>OUR ROBOTS</h2></div>
      <div class="member-grid">
        ${team.robots
          .map(
            (r) => /* HTML */ `
              <article class="member-card">
                <img
                  src="${esc(r.image || "NoTexture.png")}"
                  alt="${esc(r.name || "Robot image placeholder")}"
                  loading="lazy"
                />
                <h3>${esc(r.name)}</h3>
                <p>${esc(r.description)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    `,
  );
document.querySelectorAll("img").forEach((img) =>
  img.addEventListener(
    "error",
    () => {
      if (!img.src.endsWith("/NoTexture.png")) {
        img.src = "NoTexture.png";
        img.alt = "Image placeholder";
      }
    },
    { once: true },
  ),
);
