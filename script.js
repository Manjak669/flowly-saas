const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Reveal on scroll + count-up stats
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  const suffix = el.dataset.suffix || "";
  const format = (n) => n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  if (reduced) { el.textContent = format(target); return; }
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / 1600, 1);
    el.textContent = format(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    entry.target.querySelectorAll("[data-count]").forEach(countUp);
    io.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 90}ms`;
  io.observe(el);
});

// Product mock flattens as you scroll
const mock = document.querySelector(".mock");
if (!reduced) {
  addEventListener("scroll", () => {
    const tilt = Math.max(0, 8 - scrollY / 40);
    mock.style.setProperty("--tilt", `${tilt}deg`);
  }, { passive: true });
}

// Spotlight that follows the cursor on feature cards
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// Monthly / yearly pricing switch
const billing = document.getElementById("billing");
billing.addEventListener("click", () => {
  const yearly = billing.getAttribute("aria-checked") !== "true";
  billing.setAttribute("aria-checked", String(yearly));
  document.querySelectorAll("[data-month]").forEach((el) => {
    const value = Number(yearly ? el.dataset.year : el.dataset.month);
    el.textContent = `$${Number.isInteger(value) ? value : value.toFixed(2)}`;
  });
});

// Early-access form (demo only: nothing is sent)
const form = document.getElementById("signup");
const email = document.getElementById("email");
const msg = form.querySelector(".signup__msg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!email.checkValidity() || !email.value) {
    msg.textContent = "Please enter a valid work email.";
    msg.className = "signup__msg err";
    email.setAttribute("aria-invalid", "true");
    email.focus();
    return;
  }
  email.removeAttribute("aria-invalid");
  msg.textContent = `You're on the list! We'll write to ${email.value} soon. (Demo: nothing was sent.)`;
  msg.className = "signup__msg ok";
  form.reset();
});

// Only one FAQ item open at a time
const items = document.querySelectorAll(".faq details");
items.forEach((d) => d.addEventListener("toggle", () => {
  if (d.open) items.forEach((other) => other !== d && (other.open = false));
}));

document.getElementById("year").textContent = new Date().getFullYear();
