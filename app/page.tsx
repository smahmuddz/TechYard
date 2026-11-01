"use client";

import { useEffect } from "react";
import Image from "next/image";

const EMAIL = "hello@techyard.asia";

function getRequiredElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Expected element #${id} to exist on the contact page.`);
  }
  return element as T;
}

function selectNode(node: Element | null): void {
  if (!node) return;
  const range = document.createRange();
  range.selectNodeContents(node);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

async function copyText(
  text: string,
  noteElement: HTMLElement,
  selectionNode: Element | null,
): Promise<void> {
  try {
    if (!navigator.clipboard?.writeText) {
      selectNode(selectionNode);
      noteElement.textContent = "Press Ctrl+C to copy";
      return;
    }
    await navigator.clipboard.writeText(text);
    noteElement.textContent = "Copied";
    window.setTimeout(() => {
      noteElement.textContent = "";
    }, 2500);
  } catch {
    selectNode(selectionNode);
    noteElement.textContent = "Press Ctrl+C to copy";
  }
}

export default function HomePage() {
  useEffect(() => {
    const copyButton = getRequiredElement<HTMLButtonElement>("copy");
    const copyNote = getRequiredElement<HTMLElement>("copied");
    const emailNode = getRequiredElement<HTMLElement>("mail");
    const form = getRequiredElement<HTMLFormElement>("msg");
    const draft = getRequiredElement<HTMLDivElement>("draft");
    const draftText = getRequiredElement<HTMLElement>("draft-text");
    const draftMail = getRequiredElement<HTMLAnchorElement>("draft-mail");
    const error = getRequiredElement<HTMLParagraphElement>("f-err");
    const message = getRequiredElement<HTMLTextAreaElement>("f-msg");
    const draftCopyButton = getRequiredElement<HTMLButtonElement>("draft-copy");
    const draftEditButton = getRequiredElement<HTMLButtonElement>("draft-edit");
    const draftCopyNote = getRequiredElement<HTMLElement>("draft-note-live");
    const nameInput = getRequiredElement<HTMLInputElement>("f-name");

    const handleAddressCopy = () => {
      void copyText(EMAIL, copyNote, emailNode);
    };
    const handleTopicSelection = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLElement>("[data-topic]");
      if (!link) return;
      const selectedTopic = link.dataset.topic;
      document.querySelectorAll<HTMLInputElement>('input[name="topic"]').forEach((input) => {
        input.checked = input.value === selectedTopic;
      });
    };
    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const selectedTopic = form.querySelector<HTMLInputElement>(
        'input[name="topic"]:checked',
      )?.value ?? "Something else";
      const name = nameInput.value.trim();
      const text = message.value.trim();
      if (!text) {
        error.hidden = false;
        message.setAttribute("aria-invalid", "true");
        message.focus();
        return;
      }
      error.hidden = true;
      message.removeAttribute("aria-invalid");
      const subject = selectedTopic + (name ? ` - ${name}` : "");
      const body = `Hello TechYard,\n\n${text}\n\n${name}`.trim();
      draftText.textContent = `To: ${EMAIL}\nSubject: ${subject}\n\n${body}`;
      draftMail.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      form.hidden = true;
      draft.hidden = false;
      draft.scrollIntoView({ block: "nearest", behavior: "smooth" });
    };
    const handleMessageInput = () => {
      if (message.value.trim()) {
        error.hidden = true;
        message.removeAttribute("aria-invalid");
      }
    };
    const handleDraftCopy = () => {
      void copyText(draftText.textContent ?? "", draftCopyNote, draftText);
    };
    const handleDraftEdit = () => {
      draft.hidden = true;
      form.hidden = false;
      message.focus();
    };

    copyButton.addEventListener("click", handleAddressCopy);
    document.addEventListener("click", handleTopicSelection);
    form.addEventListener("submit", handleSubmit);
    message.addEventListener("input", handleMessageInput);
    draftCopyButton.addEventListener("click", handleDraftCopy);
    draftEditButton.addEventListener("click", handleDraftEdit);

    return () => {
      copyButton.removeEventListener("click", handleAddressCopy);
      document.removeEventListener("click", handleTopicSelection);
      form.removeEventListener("submit", handleSubmit);
      message.removeEventListener("input", handleMessageInput);
      draftCopyButton.removeEventListener("click", handleDraftCopy);
      draftEditButton.removeEventListener("click", handleDraftEdit);
    };
  }, []);

  return (
    <>
    <a className={"skip"} href={"#main"}>{"Skip to content"}</a>
    <header className={"site-header"}>
      <div className={"wrap bar"}>
        <a className={"brand"} href={"#top"} aria-label={"TechYard home"}>
          <Image className={"only-light"} src={"/assets/logo.png"} alt={"TechYard"} width={120} height={26} />
          <Image className={"only-dark"} src={"/assets/logo-dark.png"} alt={"TechYard"} width={120} height={26} />
        </a>
        <nav className={"nav"} aria-label={"Main"}>
          <a className={"link"} href={"#products"}>{"Products"}</a>
          <a className={"link"} href={"#about"}>{"About"}</a>
          <a className={"link"} href={"#contact"}>{"Contact"}</a>
          <a className={"btn small"} href={"#contact"}>{"Contact us"}</a>
        </nav>
      </div>
    </header>
    <main id={"main"}>
      <section className={"hero"} id={"top"}>
        <div className={"wrap hero-grid"}>
          <div>
            <h1>
              <span>{"One yard."}</span>
{" "}
              <span>{"Three businesses."}</span>
            </h1>
            <p className={"lead"}>{" TechYard is a Bangladesh company that builds and runs digital businesses: a reselling app, an online shop and an agency for other businesses. "}</p>
            <div className={"cta-row"}>
              <a className={"btn"} href={"#products"}>{"See our products"}</a>
              <a className={"btn ghost"} href={"#contact"}>{"Contact us"}</a>
            </div>
            <p className={"where"}>
              <i aria-hidden={"true"} />
{"Based in Bangladesh"}
            </p>
          </div>
          <figure className={"plan"}>
            <svg viewBox={"0 0 520 440"} role={"group"} aria-label={"Site plan of the TechYard yard split into three lots. Select a lot to jump to that business."}>
              <rect className={"plot"} x={"8"} y={"8"} width={"504"} height={"424"} rx={"2"} />
              <path className={"tick"} d={"M8 34V8h26M486 8h26v26M512 406v26h-26M34 432H8v-26"} />
              <a className={"lot-link"} href={"#dropdoor"} aria-label={"DropDoor, reselling app"}>
                <g className={"lot a"}>
                  <path className={"shape"} d={"M38 38H266V346L210 402H38Z"} />
                  <text className={"name"} x={"62"} y={"96"} fontSize={"34"}>{" DropDoor "}</text>
                  <text className={"sub"} x={"62"} y={"122"}>{"Reselling app"}</text>
                  <text className={"sub"} x={"62"} y={"372"}>{"Android app"}</text>
                </g>
              </a>
              <a className={"lot-link"} href={"#hullor"} aria-label={"Hullor Shop, online shop"}>
                <g className={"lot b"}>
                  <path className={"shape"} d={"M322 38H482V228H282V78Z"} />
                  <text className={"name"} x={"306"} y={"112"} fontSize={"28"}>{" Hullor Shop "}</text>
                  <text className={"sub"} x={"306"} y={"138"}>{"Online shop"}</text>
                  <text className={"sub"} x={"306"} y={"204"}>{"Live"}</text>
                </g>
              </a>
              <a className={"lot-link"} href={"#agency-row"} aria-label={"Digital agency, name coming soon"}>
                <g className={"lot c"}>
                  <path className={"shape"} d={"M282 244H442L482 284V402H282Z"} />
                  <text className={"name"} x={"306"} y={"316"} fontSize={"24"}>{" Digital agency "}</text>
                  <text className={"sub"} x={"306"} y={"342"}>{"Name coming soon"}</text>
                </g>
              </a>
            </svg>
            <figcaption>
              <span>{"The shared yard: tools, know-how and one standard of work. Select a lot to jump to it."}</span>
            </figcaption>
            <dl className={"titleblock"}>
              <div>
                <dt>{"Plot"}</dt>
                <dd>{"TechYard"}</dd>
              </div>
              <div>
                <dt>{"Lots"}</dt>
                <dd>{"3 businesses"}</dd>
              </div>
              <div>
                <dt>{"Live now"}</dt>
                <dd>{"Hullor Shop"}</dd>
              </div>
              <div>
                <dt>{"Country"}</dt>
                <dd>{"Bangladesh"}</dd>
              </div>
            </dl>
          </figure>
        </div>
      </section>
      <section className={"section"} id={"products"} style={{ paddingTop: "0" }}>
        <div className={"wrap"}>
          <div className={"section-head"}>
            <h2>{"Products"}</h2>
            <p className={"section-note"}>{" Three businesses, each with its own brand and customers. "}</p>
          </div>
          <div className={"products"}>
            <article className={"product"} id={"dropdoor"}>
              <div className={"glyph navy"} aria-hidden={"true"} />
              <div>
                <p className={"kind"}>{"Dropshipping and reselling app"}</p>
                <h3>{"DropDoor"}</h3>
                <p className={"desc"}>{" An Android app where resellers sell products without holding stock. "}</p>
                <p className={"for"}>
                  <span>{"Made for"}</span>
{" People who want to resell without buying stock first. "}
                </p>
              </div>
              <div className={"aside"}>
                <span className={"chip"}>{"Android app"}</span>
                <a className={"btn small"} href={"https://play.google.com/store/apps/details?id=dropdoor.app"} target={"_blank"} rel={"noopener"}>{"Get it on Google Play"}</a>
                <a className={"btn ghost small"} href={"#contact"} data-topic={"Sell through DropDoor"}>{"Ask about DropDoor"}</a>
              </div>
            </article>
            <article className={"product"} id={"hullor"}>
              <div className={"glyph teal"} aria-hidden={"true"} />
              <div>
                <p className={"kind"}>{"Retail brand"}</p>
                <h3>{"Hullor Shop"}</h3>
                <p className={"desc"}>{" Our own shop for customers, on the web, on Android and on Facebook. "}</p>
                <p className={"for"}>
                  <span>{"Made for"}</span>
{" Customers who shop online, wherever they already are. "}
                </p>
              </div>
              <div className={"aside"}>
                <span className={"chip live"}>{"Live"}</span>
                <a className={"btn ghost small"} href={"https://tryhullor.com"} target={"_blank"} rel={"noopener"}>{"Visit tryhullor.com"}</a>
              </div>
            </article>
            <article className={"product"} id={"agency-row"}>
              <div className={"glyph lime"} aria-hidden={"true"} />
              <div>
                <p className={"kind"}>{"Digital solutions for businesses"}</p>
                <h3>{"Digital agency"}</h3>
                <p className={"desc"}>{" Digital marketing, websites and apps, Facebook page setup, video editing and content making. "}</p>
              </div>
              <div className={"aside"}>
                <span className={"chip soon"}>{"Name coming soon"}</span>
                <a className={"btn ghost small"} href={"#contact"} data-topic={"Work with the agency"}>{"Talk to us"}</a>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className={"section about"} id={"about"}>
        <div className={"wrap"}>
          <div className={"about-grid"}>
            <h2>{"How TechYard works"}</h2>
            <div className={"body"}>
              <p>{" TechYard is the parent company. Each product has its own brand, its own customers and its own team focus, while sharing tools, know-how and a single standard of work. "}</p>
              <p>{" We start small, launch fast and improve with real feedback from the people who use what we build. "}</p>
            </div>
          </div>
          <div className={"shared"}>
            <h3>{"What every business shares"}</h3>
            <ul>
              <li>
                <b>{"Tools"}</b>
                <span>{"Each team starts from the same set, not from zero."}</span>
              </li>
              <li>
                <b>{"Know-how"}</b>
                <span>{"What one product learns, the others get."}</span>
              </li>
              <li>
                <b>{"One standard of work"}</b>
                <span>{"The same bar for quality across every brand."}</span>
              </li>
            </ul>
          </div>
          <div className={"loop"}>
            <h3>{"How each product gets built"}</h3>
            <ol>
              <li>
                <b>{"Start small"}</b>
                <span>{"Build the smallest version that is useful."}</span>
              </li>
              <li>
                <b>{"Launch fast"}</b>
                <span>{"Put it in front of real people early."}</span>
              </li>
              <li>
                <b>{"Improve with feedback"}</b>
                <span>{"Let what customers say decide what comes next."}</span>
              </li>
            </ol>
            <p className={"repeat"}>{"Then we go around again."}</p>
          </div>
        </div>
      </section>
      <section className={"contact"} id={"contact"}>
        <div className={"wrap"}>
          <div className={"contact-band"}>
            <Image className={"watermark"} src={"/assets/mark-dark.png"} alt={""} aria-hidden={"true"} width={512} height={512} />
            <div className={"contact-grid"}>
              <div className={"contact-intro"}>
                <h2>{"Contact"}</h2>
                <p className={"ask"}>{" Want to work with us, sell through DropDoor or build something together? "}</p>
                <p className={"mail"}>
                  <span id={"mail"}>{"hello@techyard.asia"}</span>
                </p>
                <div className={"btn-row"}>
                  <a className={"btn"} href={"mailto:hello@techyard.asia"}>{"Email us"}</a>
                  <button className={"btn ghost"} type={"button"} id={"copy"}>{" Copy address "}</button>
                  <span className={"copied"} id={"copied"} role={"status"} aria-live={"polite"} />
                </div>
                <p className={"fb"}>
                  <a href={"https://facebook.com/"} target={"_blank"} rel={"noopener"}>{"TechYard on Facebook"}</a>
                </p>
              </div>
              <div className={"panel"}>
                <form id={"msg"} noValidate={true}>
                  <fieldset>
                    <legend>{"What is this about?"}</legend>
                    <div className={"topics"}>
                      <label>
                        <input type={"radio"} name={"topic"} value={"Sell through DropDoor"} defaultChecked={true} />
                        <span>{"Sell through DropDoor"}</span>
                      </label>
                      <label>
                        <input type={"radio"} name={"topic"} value={"Work with the agency"} />
                        <span>{"Work with the agency"}</span>
                      </label>
                      <label>
                        <input type={"radio"} name={"topic"} value={"Build something together"} />
                        <span>{"Build something together"}</span>
                      </label>
                      <label>
                        <input type={"radio"} name={"topic"} value={"Something else"} />
                        <span>{"Something else"}</span>
                      </label>
                    </div>
                  </fieldset>
                  <div className={"field"}>
                    <label htmlFor={"f-name"}>{"Your name"}</label>
                    <input id={"f-name"} name={"name"} type={"text"} autoComplete={"name"} placeholder={"Your full name"} />
                  </div>
                  <div className={"field"}>
                    <label htmlFor={"f-msg"}>{"Your message"}</label>
                    <textarea id={"f-msg"} name={"message"} rows={4} placeholder={"Tell us what you have in mind"} />
                    <p className={"err"} id={"f-err"} hidden={true}>{" Write a short message so we know how to help. "}</p>
                  </div>
                  <button className={"btn"} type={"submit"}>{"Prepare my email"}</button>
                </form>
                <div className={"draft"} id={"draft"} hidden={true}>
                  <p className={"draft-title"}>{"Your email is ready"}</p>
                  <p className={"draft-note"}>
{" Send it to "}
                    <b>{"hello@techyard.asia"}</b>
{" from your email app, or copy it. "}
                  </p>
                  <pre id={"draft-text"} />
                  <div className={"btn-row"}>
                    <a className={"btn small"} id={"draft-mail"} href={"mailto:hello@techyard.asia"}>{"Open in email app"}</a>
                    <button className={"btn ghost small"} type={"button"} id={"draft-copy"}>{" Copy message "}</button>
                    <button className={"btn ghost small"} type={"button"} id={"draft-edit"}>{" Edit "}</button>
                    <span className={"copied"} id={"draft-note-live"} role={"status"} aria-live={"polite"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer className={"site-footer"}>
      <div className={"wrap"}>
        <div className={"foot-top"}>
          <div className={"foot-brand"}>
            <Image className={"only-light"} src={"/assets/logo.png"} alt={"TechYard"} width={120} height={26} />
            <Image className={"only-dark"} src={"/assets/logo-dark.png"} alt={"TechYard"} width={120} height={26} />
            <p>{" The parent company behind DropDoor, Hullor Shop and our digital agency. "}</p>
          </div>
          <nav aria-label={"Footer products"}>
            <h4>{"Products"}</h4>
            <a href={"#dropdoor"}>{"DropDoor"}</a>
            <a href={"#hullor"}>{"Hullor Shop"}</a>
            <a href={"#agency-row"}>{"Digital agency"}</a>
          </nav>
          <nav aria-label={"Footer company"}>
            <h4>{"Company"}</h4>
            <a href={"#about"}>{"How we work"}</a>
            <a href={"#contact"}>{"Contact"}</a>
            <a href={"https://facebook.com/"} target={"_blank"} rel={"noopener"}>{"Facebook"}</a>
          </nav>
          <div className={"foot-mail"}>
            <h4>{"Write to us"}</h4>
            <p>{"hello@techyard.asia"}</p>
          </div>
        </div>
        <div className={"foot-bottom"}>
          <p>{"© 2026 TechYard. Bangladesh."}</p>
          <a href={"#top"}>{"Back to top"}</a>
        </div>
      </div>
    </footer>
    </>
  );
}
