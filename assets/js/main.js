
      // ============================================================
      // INIT LUCIDE ICONS
      // ============================================================
      lucide.createIcons();

      // ============================================================
      // THEME TOGGLE
      // ============================================================
      (function () {
        const html = document.documentElement;
        const toggle = document.getElementById("themeToggle");
        const saved = localStorage.getItem("theme");

        // Apply saved or system preference
        if (saved === "light") {
          html.classList.remove("dark");
          html.classList.add("light");
        } else if (saved === "dark") {
          html.classList.add("dark");
          html.classList.remove("light");
        } else {
          // Default light
          html.classList.add("light");
          html.classList.remove("dark");
        }

        toggle.addEventListener("click", () => {
          if (html.classList.contains("dark")) {
            html.classList.remove("dark");
            html.classList.add("light");
            localStorage.setItem("theme", "light");
          } else {
            html.classList.remove("light");
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
          }
          // Re-render icons for theme toggle
          lucide.createIcons();
        });
      })();

      // ============================================================
      // MOBILE MENU
      // ============================================================
      (function () {
        const hamburger = document.getElementById("hamburger");
        const mobileMenu = document.getElementById("mobileMenu");
        const mobileLinks = document.querySelectorAll(".mobile-link");

        hamburger.addEventListener("click", () => {
          const isOpen = mobileMenu.classList.toggle("open");
          hamburger.classList.toggle("active");
          hamburger.setAttribute("aria-expanded", isOpen);
        });

        mobileLinks.forEach((link) => {
          link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
          });
        });
      })();

      // ============================================================
      // TYPING EFFECT
      // ============================================================
      (function () {
        const el = document.getElementById("typingText");
        const words = [
          "Laravel",
          "Next.js",
          "React Native",
          "REST API Architecture",
          "Full-Stack Development",
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
          const current = words[wordIndex];
          if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
          } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
          }

          let delay = isDeleting ? 50 : 100;

          if (!isDeleting && charIndex === current.length) {
            delay = 2000;
            isDeleting = true;
          } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 400;
          }

          setTimeout(type, delay);
        }

        type();
      })();

      // ============================================================
      // SCROLL REVEAL
      // ============================================================
      (function () {
        const reveals = document.querySelectorAll(".reveal");

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px",
          },
        );

        reveals.forEach((el) => observer.observe(el));
      })();

      // ============================================================
      // PROJECT FILTERS
      // ============================================================
      (function () {
        const buttons = document.querySelectorAll(".filter-btn");
        const items = document.querySelectorAll(".project-item");

        buttons.forEach((btn) => {
          btn.addEventListener("click", () => {
            // Active state
            buttons.forEach((b) => {
              b.classList.remove("active", "bg-[#10B981]", "text-[#0A0A0A]");
              b.classList.add("glass", "text-[#94A3B8]");
            });
            btn.classList.add("active", "bg-[#10B981]", "text-[#0A0A0A]");
            btn.classList.remove("glass", "text-[#94A3B8]");

            const filter = btn.dataset.filter;

            items.forEach((item) => {
              const cats = item.dataset.category || "";
              if (filter === "all" || cats.includes(filter)) {
                item.style.display = "";
                requestAnimationFrame(() => {
                  item.style.opacity = "1";
                  item.style.transform = "translateY(0)";
                });
              } else {
                item.style.opacity = "0";
                item.style.transform = "translateY(12px)";
                setTimeout(() => {
                  item.style.display = "none";
                }, 300);
              }
            });
          });
        });

        // Set initial active
        document
          .querySelector('.filter-btn[data-filter="all"]')
          .classList.add("active", "bg-[#10B981]", "text-[#0A0A0A]");
        document
          .querySelector('.filter-btn[data-filter="all"]')
          .classList.remove("glass", "text-[#94A3B8]");
      })();

      // ============================================================
      // ACTIVE NAV LINK ON SCROLL
      // ============================================================
      (function () {
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".nav-link");

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                  if (link.dataset.section === id) {
                    link.classList.add("text-[#10B981]");
                    link.classList.remove("text-[#94A3B8]");
                  } else {
                    link.classList.remove("text-[#10B981]");
                    link.classList.add("text-[#94A3B8]");
                  }
                });
              }
            });
          },
          {
            rootMargin: "-40% 0px -55% 0px",
          },
        );

        sections.forEach((section) => observer.observe(section));
      })();

      // ============================================================
      // BACK TO TOP
      // ============================================================
      (function () {
        const btn = document.getElementById("backToTop");

        window.addEventListener("scroll", () => {
          if (window.scrollY > 600) {
            btn.classList.add("visible");
          } else {
            btn.classList.remove("visible");
          }
        });

        btn.addEventListener("click", () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      })();

      // ============================================================
      // COPY EMAIL
      // ============================================================
      (function () {
        const toast = document.getElementById("copyToast");
        const copyBtns = document.querySelectorAll(".copy-email");

        copyBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            const email = btn.dataset.email;
            navigator.clipboard
              .writeText(email)
              .then(() => {
                toast.classList.add("visible");
                setTimeout(() => {
                  toast.classList.remove("visible");
                }, 2000);
              })
              .catch(() => {
                // Fallback
                const textarea = document.createElement("textarea");
                textarea.value = email;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                toast.classList.add("visible");
                setTimeout(() => {
                  toast.classList.remove("visible");
                }, 2000);
              });
          });
        });
      })();

      // ============================================================
      // CONTACT FORM VALIDATION
      // ============================================================
      (function () {
        const form = document.getElementById("contactForm");
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        function showError(input, show) {
          const error = input.parentElement.querySelector(".error-msg");
          if (error) {
            error.classList.toggle("hidden", !show);
          }
          input.classList.toggle("border-red-500", show);
          input.classList.toggle("border-[#1E293B]", !show);
        }

        function validateEmail(value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        form.addEventListener("submit", (e) => {
          e.preventDefault();
          let valid = true;

          // Name
          if (!name.value.trim()) {
            showError(name, true);
            valid = false;
          } else {
            showError(name, false);
          }

          // Email
          if (!validateEmail(email.value.trim())) {
            showError(email, true);
            valid = false;
          } else {
            showError(email, false);
          }

          // Message
          if (!message.value.trim()) {
            showError(message, true);
            valid = false;
          } else {
            showError(message, false);
          }

          if (valid) {
            const subject = encodeURIComponent(
              `Portfolio Inquiry from ${name.value.trim()}`,
            );
            const body = encodeURIComponent(
              `Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\n\n${message.value.trim()}`,
            );
            window.location.href = `mailto:mralihamza276@gmail.com?subject=${subject}&body=${body}`;
          }
        });

        // Real-time validation
        [name, email, message].forEach((input) => {
          input.addEventListener("input", () => {
            if (input === email) {
              showError(
                input,
                input.value.trim() && !validateEmail(input.value.trim()),
              );
            } else {
              showError(input, !input.value.trim());
            }
          });
        });
      })();

      // ============================================================
      // IMAGE FALLBACK HANDLER
      // ============================================================
      (function () {
        // For images that fail to load, show the fallback content
        document.querySelectorAll("img[onerror]").forEach((img) => {
          if (img.complete && img.naturalWidth === 0) {
            img.style.display = "none";
            const fallback = img.parentElement.querySelector(
              ".img-fallback-content",
            );
            if (fallback) fallback.classList.remove("hidden");
          }
        });
      })();

      // ============================================================
      // SMOOTH SCROLL FOR ANCHOR LINKS (with offset for fixed nav)
      // ============================================================
      (function () {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href === "#") return;
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              const offset = 80;
              const top =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                offset;
              window.scrollTo({ top, behavior: "smooth" });
            }
          });
        });
      })();

      // ============================================================
      // INITIAL FILTER BUTTON STYLES
      // ============================================================
      (function () {
        const buttons = document.querySelectorAll(".filter-btn");
        buttons.forEach((btn) => {
          if (!btn.classList.contains("active")) {
            btn.classList.add("glass", "text-[#94A3B8]");
          }
        });
      })();
    
