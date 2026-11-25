"""Exercise the synthetic shell in Chromium against an ephemeral loopback server."""
import argparse
import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from playwright.sync_api import expect, sync_playwright

ROOT = Path(__file__).resolve().parents[1]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass


def run(browser, url, shots):
    desktop = browser.new_page(viewport={"width": 1536, "height": 1024})
    errors = []
    desktop.on("pageerror", lambda error: errors.append(str(error)))
    desktop.goto(url)
    expect(desktop.get_by_role("heading", name="Twilight Sanctuary", exact=True)).to_be_visible()
    for selector in (".scene-art", ".sol-sprite"):
        desktop.locator(selector).evaluate("(img) => img.decode()")
    assert desktop.locator(".sol-sprite").evaluate("(img) => img.naturalWidth > 0")
    if shots:
        desktop.screenshot(path=shots / "twilight-desktop.png", full_page=True)

    for choice, line in [
        ("Do a check-in", "A little honesty"),
        ("Look at my quests", "One small step"),
        ("Rest here awhile", "lantern"),
    ]:
        desktop.get_by_role("button", name=choice).click()
        expect(desktop.locator("#sol-line")).to_contain_text(line)
    desktop.get_by_label("Custom reply").fill("Hello, Sol.")
    desktop.get_by_role("button", name="Keep draft").click()
    expect(desktop.locator("#reply-status")).to_contain_text("Live replies are unavailable")
    expect(desktop.locator("#sol-line")).to_contain_text("lantern")

    for path, heading in {
        "daily":"Twilight Sanctuary", "quests":"Quests", "home":"Home",
        "workshop":"Workshop", "vault":"Vault", "echofield":"EchoField",
        "settings":"Settings", "player":"Player Avatar", "records":"Records",
        "companions":"Companion Vault", "check-in":"Check-In", "journal":"Daily Journal",
        "calendar":"Calendar",
    }.items():
        desktop.locator(f'a[href="#/{path}"]').first.click()
        expect(desktop.get_by_role("heading", name=heading, level=1)).to_be_visible()

    desktop.get_by_role("link", name="Open sample journal for November 23, 2026").click()
    expect(desktop.get_by_role("heading", name="November 23, 2026")).to_be_visible()
    expect(desktop.get_by_text("I made a little room", exact=False)).to_be_visible()
    desktop.get_by_role("link", name="Back to calendar").click()
    desktop.get_by_role("button", name="Next month").click()
    expect(desktop.get_by_role("heading", name="December 2026")).to_be_visible()
    desktop.get_by_role("button", name="Previous month").click()
    expect(desktop.get_by_role("heading", name="November 2026")).to_be_visible()

    desktop.locator('a[href="#/check-in"]').first.click()
    desktop.get_by_role("radio", name="Calm").check()
    desktop.get_by_role("button", name="Save sample check-in").click()
    desktop.locator('a[href="#/daily"]').first.click()
    expect(desktop.get_by_text("Sample check-in: Calm")).to_be_visible()
    expect(desktop.get_by_label("Custom reply")).to_have_value("Hello, Sol.")
    assert not errors, errors

    for width in (390, 320):
        mobile = browser.new_page(viewport={"width": width, "height": 844}, is_mobile=True, has_touch=True)
        mobile.goto(url)
        assert mobile.evaluate("document.documentElement.scrollWidth <= innerWidth"), width
        mobile.get_by_role("button", name="Rest here awhile").tap()
        expect(mobile.locator("#sol-line")).to_contain_text("lantern")
        if shots and width == 390:
            mobile.goto(url)
            mobile.locator(".sol-sprite").evaluate("(img) => img.decode()")
            mobile.screenshot(path=shots / "twilight-mobile.png", full_page=True)
        mobile.close()

    desktop.route("**/assets/*.webp", lambda route: route.abort())
    desktop.reload()
    expect(desktop.locator(".sol-sprite")).to_be_hidden()
    expect(desktop.get_by_role("button", name="Do a check-in")).to_be_visible()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--screenshots", type=Path)
    parser.add_argument("--chromium", default=None)
    args = parser.parse_args()
    if args.screenshots:
        args.screenshots.mkdir(parents=True, exist_ok=True)
    handler = functools.partial(QuietHandler, directory=ROOT)
    with ThreadingHTTPServer(("127.0.0.1", 0), handler) as server:
        Thread(target=server.serve_forever, daemon=True).start()
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(executable_path=args.chromium)
                run(browser, f"http://127.0.0.1:{server.server_port}/", args.screenshots)
                browser.close()
        finally:
            server.shutdown()
    print("Passed: all routes, scripted choices, draft input, dated journal, month navigation, sample check-in, mobile touch and overflow, missing-art fallback.")
