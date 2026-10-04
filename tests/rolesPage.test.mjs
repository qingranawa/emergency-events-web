import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = async (path) => readFile(new URL(path, import.meta.url), "utf8").catch(() => "");
const [rolesHtml, viteConfig, siteNav, archiveApp, roleIndex, homeApp, gameplaySection] = await Promise.all([
  read("../roles.html"),
  read("../vite.config.js"),
  read("../src/components/layout/SiteNav.jsx"),
  read("../src/components/roles/RoleArchiveApp.jsx"),
  read("../src/components/roles/RoleIndex.jsx"),
  read("../src/components/home/HomeApp.jsx"),
  read("../src/components/mechanisms/GameplayLayerSection.jsx"),
]);

const rolesModule = await import(new URL("../src/data/roles.js", import.meta.url)).catch(() => null);

test("Roles is a dedicated Vite page while all existing pages remain build inputs", () => {
  assert.match(rolesHtml, /<title>[^<]*角色/);
  assert.match(rolesHtml, /src\/roles-main\.jsx/);
  assert.match(viteConfig, /main:\s*["']index\.html["']/);
  assert.match(viteConfig, /dlrc:\s*["']dlrc\.html["']/);
  assert.match(viteConfig, /factions:\s*["']factions\.html["']/);
  assert.match(viteConfig, /mechanisms:\s*["']mechanisms\.html["']/);
  assert.match(viteConfig, /roles:\s*["']roles\.html["']/);
});

test("shared navigation exposes Roles as an active page link", () => {
  assert.match(siteNav, /\{ label: "角色", id: "roles", href: "roles\.html" \}/);
  assert.match(siteNav, /roles:\s*"角色"/);
  assert.doesNotMatch(siteNav, /label: "角色", id: "roles", pending: true/);
});

test("role data contains all required dossiers with stable, unique deep links", () => {
  assert.ok(rolesModule, "src/data/roles.js should export the role archive data");
  const { roleDossiers } = rolesModule;
  assert.ok(Array.isArray(roleDossiers));
  assert.equal(new Set(roleDossiers.map(({ id }) => id)).size, roleDossiers.length);
  assert.deepEqual(
    roleDossiers.filter(({ category }) => category === "d-class").map(({ id }) => id),
    ["d9341", "d11424-veteran", "d7294", "d00341", "d20384", "d11424-lucky", "d2179", "d217"],
  );
  assert.deepEqual(
    roleDossiers.filter(({ category }) => category === "scientist").map(({ id }) => id),
    ["bright", "clef", "kondraki", "gears", "iceberg", "light", "maynard"],
  );
  assert.deepEqual(
    roleDossiers.filter(({ category }) => category === "scp-939").map(({ id }) => id),
    ["scp939-53", "scp939-89", "scp939-101"],
  );
  assert.deepEqual(
    roleDossiers.filter(({ category }) => category === "scp-augmentation").map(({ id }) => id),
    ["scp096", "scp049", "scp106", "scp079", "scp173", "scp0492"],
  );
  for (const dossier of roleDossiers) {
    assert.ok(dossier.name && dossier.roleType && dossier.baseRole && dossier.faction, `${dossier.id} needs identity fields`);
    assert.ok(dossier.health && dossier.badge && Array.isArray(dossier.passives) && Array.isArray(dossier.actives), `${dossier.id} needs player-facing profile fields`);
  }
});

test("player-facing data keeps role boundaries and capability blockers explicit", () => {
  assert.ok(rolesModule, "src/data/roles.js should export the role archive data");
  const { roleDossiers, roleArchiveFacts, roleImplementationStatus } = rolesModule;
  const byId = Object.fromEntries(roleDossiers.map((dossier) => [dossier.id, dossier]));
  assert.equal(byId["d11424-veteran"].name, "D-11424 · 老兵");
  assert.equal(byId["d11424-lucky"].name, "D-11424 · 倒霉幸运儿");
  assert.equal(byId.maynard.baseRole, "Scientist");
  assert.equal(byId.maynard.faction, "SCP");
  assert.equal(byId["scp939-89"].actives.length, 0);
  assert.equal(byId.scp106.notes.some((note) => note.status === "UNSUPPORTED"), true);
  assert.equal(roleArchiveFacts.allocation.dClassExample.variantCount, 6);
  assert.equal(roleArchiveFacts.allocation.dClassExample.vanillaCount, 2);
  assert.equal(roleArchiveFacts.validation.logicTests, "313 / 313");
  assert.ok(roleImplementationStatus.some(({ subject, status }) => /Bright/.test(subject) && status === "BLOCKED"));
  assert.ok(roleImplementationStatus.some(({ subject, status }) => /Player List/.test(subject) && status === "BLOCKED"));
});

test("every dossier remains directly addressable, and M07 entry points link to Roles", () => {
  assert.match(archiveApp, /<RoleIndex/);
  assert.match(archiveApp, /roleDossiers\.map/);
  assert.match(archiveApp, /id=\{dossier\.id\}/);
  assert.match(roleIndex, /href=\{`#\$\{dossier\.id\}`\}/);
  assert.match(homeApp, /roles\.html/);
  assert.match(gameplaySection, /roles\.html/);
});
